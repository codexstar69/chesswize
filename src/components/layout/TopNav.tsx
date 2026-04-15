import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#application-form';
      return;
    }
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "py-2 md:py-3 border-b-[3px] border-[#0F172A] glass-nav shadow-premium" : "py-4 md:py-5 border-b border-slate-200 bg-[#FAFAFA]"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 md:gap-4">
            <img src="/images/logo-side-black.svg" alt="ChessWize" className="h-10 sm:h-12 md:h-14 w-auto" />
          </Link>
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
              {location.pathname === '/' ? (
                <>
                  <a href="#methodology" className="hover:text-[#0F172A] transition-colors">How It Works</a>
                  <a href="#curriculum" className="hover:text-[#0F172A] transition-colors">Programs</a>
                  <a href="#faculty" className="hover:text-[#0F172A] transition-colors">Our Coaches</a>
                  <a href="#pricing" className="hover:text-[#0F172A] transition-colors">Pricing</a>
                </>
              ) : (
                <>
                  <Link to="/#methodology" className="hover:text-[#0F172A] transition-colors">How It Works</Link>
                  <Link to="/#curriculum" className="hover:text-[#0F172A] transition-colors">Programs</Link>
                  <Link to="/#faculty" className="hover:text-[#0F172A] transition-colors">Our Coaches</Link>
                  <Link to="/#pricing" className="hover:text-[#0F172A] transition-colors">Pricing</Link>
                </>
              )}
            </div>
            <div className="hidden lg:block w-px h-6 bg-gray-200" />
            <button onClick={scrollToForm} className="flex items-center justify-center gap-2 bg-[#0F172A] text-[#FFD600] px-4 md:px-6 py-2 md:py-3 font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#222222] transition-colors border-2 border-[#0F172A] shadow-brutal-yellow md:shadow-brutal-yellow hover:translate-y-[2px] hover:shadow-brutal-yellow md:hover:shadow-brutal-yellow active:translate-y-[4px] active:shadow-none">
              <span className="hidden sm:inline">Book Free Demo</span>
              <span className="sm:hidden">Free Demo</span>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </nav>
      {/* Top Strip */}
      {location.pathname === '/' && (
        <div className="bg-[#FFD600] w-full py-2.5 text-center mt-[72px] md:mt-[88px] relative z-40 border-b-2 border-[#0F172A]">
          <p className="text-[#0F172A] text-[9px] md:text-[10px] lg:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em] flex items-center justify-center gap-2 md:gap-3 px-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F172A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F172A]"></span>
            </span>
            🎉 Free Demo Class Available — Book Your Child's First Session Today!
          </p>
        </div>
      )}
    </>
  );
}
