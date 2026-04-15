import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle } from 'lucide-react';

export default function LiveBookingToast() {
  const [visible, setVisible] = useState(false);
  const [booking, setBooking] = useState({ name: "Priya", time: "2 mins ago" });

  useEffect(() => {
    const names = ["Rahul from Mumbai", "Sneha from Delhi", "Amit from Bangalore", "Neha from Pune"];
    const times = ["Just now", "2 mins ago", "5 mins ago", "Just now"];
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * names.length);
      setBooking({ name: names[randomIdx], time: times[randomIdx] });
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="hidden sm:flex fixed bottom-6 left-6 z-[60] bg-[#FAFAFA] border-4 border-[#0F172A] p-3 md:p-4 shadow-brutal-yellow md:shadow-brutal-yellow items-center gap-3 md:gap-4 max-w-[280px] md:max-w-[320px]"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 border-2 border-[#0F172A] rounded-sm flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
          </div>
          <div>
            <p className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5 md:mb-1">{booking.time}</p>
            <p className="text-xs md:text-sm font-black text-[#0F172A] leading-tight uppercase tracking-tight">{booking.name} <br className="sm:hidden"/>Booked a Demo</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
