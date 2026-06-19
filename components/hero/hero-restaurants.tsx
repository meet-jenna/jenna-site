"use client"

import HeroDashboard from "./hero-dashboard"

export default function HeroRestaurants({ activeView }: { activeView: number }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#1A1815]">
      {/* Single luxury-restaurant backdrop */}
      <img
        src="/hero/restaurant-calls.png"
        alt="Cartoon illustration of a luxury restaurant"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* Frameless dashboard floating on top of the photo */}
      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6 md:p-10 lg:p-14">
        <div className="relative w-full h-full overflow-hidden rounded-[8px] shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
          <HeroDashboard activeView={activeView} />
        </div>
      </div>
    </div>
  )
}
