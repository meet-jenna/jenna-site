#!/usr/bin/env bash
# Detached dev-server launcher for jenna-site.
#
# Why this exists: when an AI agent (or any short-lived terminal) starts
# `npm run dev` directly, the dev server is parented to that terminal's
# session. As soon as the terminal exits, the kernel sends SIGHUP/SIGTERM
# to the whole process group and Vite dies — which looked exactly like
# "the dev server dies on every change" because each change kicked off
# a new agent turn that tore down the previous shell.
#
# This script starts Vite in its OWN session via `setsid`-equivalent
# semantics (Python's start_new_session=True). The resulting process is
# reparented to launchd (PID 1) and survives any shell teardown. Logs go
# to /tmp/jenna-dev/vite.log; the PID is written to /tmp/jenna-dev/vite.pid.
#
# Usage:
#   scripts/dev-server.sh start      # start (idempotent)
#   scripts/dev-server.sh stop       # stop
#   scripts/dev-server.sh restart    # stop + start
#   scripts/dev-server.sh status     # show pid + last log lines
#   scripts/dev-server.sh logs       # tail logs

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUN_DIR="/tmp/jenna-dev"
LOG_FILE="$RUN_DIR/vite.log"
PID_FILE="$RUN_DIR/vite.pid"
PORT=5173

mkdir -p "$RUN_DIR"

is_running() {
  [[ -f "$PID_FILE" ]] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null
}

port_pid() {
  lsof -ti:"$PORT" 2>/dev/null | head -1
}

cmd_start() {
  if is_running; then
    echo "already running (pid $(cat "$PID_FILE"))"
    return 0
  fi
  if [[ -n "$(port_pid)" ]]; then
    echo "port $PORT busy (pid $(port_pid)) but no pid file — adopting"
    port_pid > "$PID_FILE"
    return 0
  fi

  python3 - "$PROJECT_DIR" "$LOG_FILE" "$PID_FILE" <<'PY'
import os, subprocess, sys
project_dir, log_file, pid_file = sys.argv[1], sys.argv[2], sys.argv[3]
os.chdir(project_dir)
log = open(log_file, 'a')
log.write('\n--- start ---\n'); log.flush()
env = {**os.environ, 'NODE_OPTIONS': '--max-old-space-size=4096'}
p = subprocess.Popen(
    ['npx', 'vite'],
    env=env,
    stdin=subprocess.DEVNULL,
    stdout=log,
    stderr=subprocess.STDOUT,
    start_new_session=True,
    close_fds=True,
)
with open(pid_file, 'w') as f:
    f.write(str(p.pid))
print(f"started pid={p.pid}")
PY

  sleep 2
  if is_running; then
    echo "ok — http://localhost:$PORT/"
  else
    echo "failed to stay up. tail of log:"
    tail -n 20 "$LOG_FILE"
    return 1
  fi
}

cmd_stop() {
  if is_running; then
    pid="$(cat "$PID_FILE")"
    pkill -P "$pid" 2>/dev/null || true
    kill "$pid" 2>/dev/null || true
    sleep 1
    kill -9 "$pid" 2>/dev/null || true
  fi
  if [[ -n "$(port_pid)" ]]; then
    port_pid | xargs -r kill -9 2>/dev/null || true
  fi
  rm -f "$PID_FILE"
  echo "stopped"
}

cmd_status() {
  if is_running; then
    echo "running pid=$(cat "$PID_FILE") on http://localhost:$PORT/"
  else
    echo "not running"
  fi
  echo "--- last log lines ---"
  tail -n 10 "$LOG_FILE" 2>/dev/null || echo "(no log yet)"
}

cmd_logs() {
  tail -n 200 -f "$LOG_FILE"
}

case "${1:-status}" in
  start)   cmd_start ;;
  stop)    cmd_stop ;;
  restart) cmd_stop; cmd_start ;;
  status)  cmd_status ;;
  logs)    cmd_logs ;;
  *) echo "usage: $0 {start|stop|restart|status|logs}"; exit 2 ;;
esac
