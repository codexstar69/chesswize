import React from 'react';
import { Instagram, Facebook, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WHATSAPP_URL = "https://wa.me/918400979997?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20demo%20session.";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] pt-16 md:pt-24 pb-24 md:pb-8 border-t-8 border-[#FFD600] relative overflow-hidden">
      <div className="absolute inset-0 glow-yellow opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <img src="/images/logo-side-white.svg" alt="ChessWize" className="h-10 sm:h-12 md:h-14 w-auto mb-6 drop-shadow-md" />
            <p className="text-gray-400 font-bold text-sm leading-relaxed mb-8 max-w-sm">
              Structured, level-based chess training designed to build strategic thinking, discipline, and competitive confidence. 7+ years of experience, 1500+ students trained across 15+ countries.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/chess.wize/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#FAFAFA] flex items-center justify-center border-[3px] border-transparent hover:border-[#FFD600] hover:-translate-y-1 shadow-brutal-soft transition-all rounded-sm group">
                <Instagram className="w-5 h-5 text-[#0F172A]" />
              </a>
              <a href="https://www.facebook.com/chesswize" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#FAFAFA] flex items-center justify-center border-[3px] border-transparent hover:border-[#FFD600] hover:-translate-y-1 shadow-brutal-soft transition-all rounded-sm group">
                <Facebook className="w-5 h-5 text-[#0F172A]" />
              </a>
              <a href="https://www.linkedin.com/company/chesswize/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#FAFAFA] flex items-center justify-center border-[3px] border-transparent hover:border-[#FFD600] hover:-translate-y-1 shadow-brutal-soft transition-all rounded-sm group">
                <Linkedin className="w-5 h-5 text-[#0F172A]" />
              </a>
              <a href="mailto:chesswize79@gmail.com" className="w-10 h-10 bg-[#FAFAFA] flex items-center justify-center border-[3px] border-transparent hover:border-[#FFD600] hover:-translate-y-1 shadow-brutal-soft transition-all rounded-sm group">
                <Mail className="w-5 h-5 text-[#0F172A]" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            <div className="flex flex-col">
              <h4 className="text-[#FFD600] font-black text-xs uppercase tracking-widest mb-6">Assessments</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-400">
                <li><Link to="/#assessments" className="hover:text-white transition-colors">Take the Quiz</Link></li>
                <li><Link to="/#methodology" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link to="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/#faculty" className="hover:text-white transition-colors">Our Coaches</Link></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="text-[#FFD600] font-black text-xs uppercase tracking-widest mb-6">Programs</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-400">
                <li><Link to="/#curriculum" className="hover:text-white transition-colors">Beginners (Ages 5-8)</Link></li>
                <li><Link to="/#curriculum" className="hover:text-white transition-colors">Intermediate (Ages 8-12)</Link></li>
                <li><Link to="/#curriculum" className="hover:text-white transition-colors">Advanced & Tournament</Link></li>
                <li><Link to="/#faculty" className="hover:text-white transition-colors">Meet Our Coaches</Link></li>
              </ul>
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <h4 className="text-[#FFD600] font-black text-xs uppercase tracking-widest mb-6">Support</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-400">
                <li><a href="mailto:chesswize79@gmail.com" className="hover:text-white transition-colors">chesswize79@gmail.com</a></li>
                <li><a href="tel:+918400979997" className="hover:text-white transition-colors">+91-8400979997</a></li>
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> WhatsApp Us
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t-2 border-gray-800 pt-8 flex flex-col items-center gap-4 text-center text-[10px] md:text-xs font-black text-gray-600 uppercase tracking-widest">
          <p>© 2026 ChessWize. All Rights Reserved.</p>
          <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link to="/refunds" className="hover:text-gray-300 transition-colors">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
