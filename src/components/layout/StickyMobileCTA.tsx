import React from 'react';

export default function StickyMobileCTA() {
  const scrollToForm = () => {
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-dark border-t-[3px] border-[#FFD600] p-3 px-4 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.5)] pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <div className="flex flex-col">
        <span className="font-black text-white uppercase text-base leading-none mb-1">Free Demo Class</span>
        <span className="text-[8px] font-black text-[#FFD600] uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#FFD600] rounded-full animate-pulse" /> Limited Slots This Week
        </span>
      </div>
      <button onClick={scrollToForm} className="bg-[#FFD600] text-[#0F172A] px-6 py-2.5 font-black uppercase tracking-widest text-xs border-2 border-[#0F172A] shadow-brutal-soft active:translate-y-[2px] active:shadow-none">
        Book Now
      </button>
    </div>
  );
}
