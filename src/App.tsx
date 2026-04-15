import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import {
  ChevronDown, CheckCircle, MessageCircle, Star, Target, ArrowRight,
  Brain, ShieldCheck, LineChart, EyeOff, Sparkles, Clock, 
  Activity, BookOpen, Award, Users, Crosshair, ChevronRight,
  BarChart, Zap, Search, AlertCircle, Phone, Quote,
  Instagram, Facebook, Linkedin, Twitter, Mail,
  Monitor, Puzzle, TrendingUp, HelpCircle, ChevronUp
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useInView as useIOInView } from "react-intersection-observer";

// ── Lazy video — only loads when scrolled into view ─────────────────────
function LazyVideo({ src, className = "" }: { src: string; className?: string }) {
  const { ref, inView } = useIOInView({ triggerOnce: true, rootMargin: "200px" });
  return (
    <div ref={ref}>
      {inView ? (
        <video
          className={className}
          controls
          preload="metadata"
          controlsList="nodownload"
          playsInline
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div className={`${className} bg-gray-900 flex items-center justify-center`}>
          <div className="w-12 h-12 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

// ── Scroll-triggered animation wrapper ────────────────────────────────────
function FadeIn({ children, className = "", delay = 0, direction = "up" }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const dirMap = { up: { y: 32 }, down: { y: -32 }, left: { x: 32 }, right: { x: -32 }, none: {} };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Animated counter for stats ────────────────────────────────────────────
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);
  return <span ref={ref}>{isInView ? `${display.toLocaleString()}${suffix}` : `0${suffix}`}</span>;
}

// ── Configuration & Shared ────────────────────────────────────────────────
const WHATSAPP_URL = "https://wa.me/918400979997?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20demo%20session.";
const FORM_SECTION_ID = "application-form";

function scrollToForm() {
  document.getElementById(FORM_SECTION_ID)?.scrollIntoView({ behavior: "smooth" });
}

// ── Shared UI Details ─────────────────────────────────────────────────────
const Tooltip = ({ text, children }: { text: string, children: React.ReactNode }) => (
  <div className="group relative inline-flex">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] hidden md:block">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#111111]" />
    </div>
  </div>
);

const Badge = ({ icon: Icon, text, subtext }: any) => (
  <div className="flex items-center gap-2 sm:gap-3 bg-white p-2 sm:p-3 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] w-full sm:w-auto">
    <div className="w-8 h-8 shrink-0 bg-[#FFD600] flex items-center justify-center border-2 border-[#111111]">
      <Icon className="w-4 h-4 text-[#111111]" />
    </div>
    <div className="flex flex-col">
      <span className="font-black text-[10px] sm:text-xs uppercase tracking-widest text-[#111111] leading-none">{text}</span>
      {subtext && <span className="text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{subtext}</span>}
    </div>
  </div>
);

// ── Components ────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-200 bg-white ${scrolled ? "py-2 md:py-3 border-b-4 border-[#111111] shadow-[0_4px_0px_#111111]" : "py-4 md:py-5 border-b border-gray-200"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <img src="/images/logo-side-black.svg" alt="ChessWize" className="h-10 sm:h-12 md:h-14 w-auto" />
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <a href="#methodology" className="hover:text-[#111111] transition-colors">How It Works</a>
            <a href="#curriculum" className="hover:text-[#111111] transition-colors">Programs</a>
            <a href="#faculty" className="hover:text-[#111111] transition-colors">Our Coaches</a>
            <a href="#pricing" className="hover:text-[#111111] transition-colors">Pricing</a>
          </div>
          <div className="hidden lg:block w-px h-6 bg-gray-200" />
          <button onClick={scrollToForm} className="flex items-center justify-center gap-2 bg-[#111111] text-[#FFD600] px-4 md:px-6 py-2 md:py-3 font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#222222] transition-colors border-2 border-[#111111] shadow-[2px_2px_0px_#FFD600] md:shadow-[4px_4px_0px_#FFD600] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#FFD600] md:hover:shadow-[2px_2px_0px_#FFD600] active:translate-y-[4px] active:shadow-none">
            <span className="hidden sm:inline">Book Free Demo</span>
            <span className="sm:hidden">Free Demo</span>
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function TopStrip() {
  return (
    <div className="bg-[#FFD600] w-full py-2.5 text-center mt-[72px] md:mt-[88px] relative z-40 border-b-2 border-[#111111]">
      <p className="text-[#111111] text-[9px] md:text-[10px] lg:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em] flex items-center justify-center gap-2 md:gap-3 px-2">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#111111] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#111111]"></span>
        </span>
        🎉 Free Demo Class Available — Book Your Child's First Session Today!
      </p>
    </div>
  );
}

function Hero() {
  const [formData, setFormData] = useState({ name: "", phone: "", age: "" });

  const handleMiniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, I'd like to book a free demo class for my child.\nName: ${formData.name}\nPhone: ${formData.phone}\nChild's Age: ${formData.age}`;
    window.open(`https://wa.me/918400979997?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="relative pt-8 md:pt-12 pb-16 md:pb-24 bg-white border-b-4 border-[#111111] overflow-hidden">
      <div className="bg-subtle-grid absolute inset-0 opacity-60" />
      
      {/* Generated hero background - remove this div to revert */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none">
        <img src="/images/hero-bg-pattern.webp" alt="" className="w-full h-full object-cover" loading="eager" width="1376" height="768" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-12 relative z-10">
        
        {/* Left: Hero Image + Copy */}
        <div className="w-full lg:w-7/12 flex flex-col items-start text-left">
          
          <div className="inline-flex items-center gap-2 md:gap-3 bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] p-1 pr-3 md:pr-4 mb-6 md:mb-8">
            <div className="bg-[#FFD600] text-[#111111] font-black text-[8px] md:text-[9px] uppercase tracking-widest px-2 py-1">TRUSTED</div>
            <span className="text-[#111111] font-bold text-[8px] md:text-[10px] uppercase tracking-wider">1,500+ students trained across 15+ countries since 2017</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-[#111111] leading-[1.05] mb-6 md:mb-8 uppercase break-words">
            Professional Online <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">Chess Coaching for Kids.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-10 max-w-xl font-bold leading-relaxed border-l-4 border-[#FFD600] pl-4 md:pl-6">
            Structured, level-based online chess classes for ages 5–16. Small batches, experienced coaches, and a curriculum that builds real skills — not just moves.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-10 md:mb-12 w-full">
            <Tooltip text="Kids learn to think before they act">
              <Badge icon={Brain} text="Sharper Focus" subtext="Think 3 Moves Ahead" />
            </Tooltip>
            <Tooltip text="Small batches, personal attention">
              <Badge icon={ShieldCheck} text="1-on-1 & Groups" subtext="Max 4 Per Batch" />
            </Tooltip>
            <Tooltip text="From beginner to tournament-ready">
              <Badge icon={Target} text="All Levels" subtext="Beginner → Advanced" />
            </Tooltip>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 bg-gray-50 p-3 md:p-4 border-2 border-[#111111] shadow-[4px_4px_0px_#111111] w-full sm:w-auto">
            <div className="flex -space-x-3 shrink-0">
              {[
                "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-20.png",
                "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-21.png",
                "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-26.png"
              ].map((img, i) => (
                <img key={i} src={img} alt="Parent Testimonial" className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-[#111111] object-cover" loading="lazy" />
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 mb-0.5 md:mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current text-[#111111]" />)}
              </div>
              <p className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Our Star Parents</p>
            </div>
          </div>
        </div>

        {/* Right: The Diagnostic Entry */}
        <div className="w-full lg:w-5/12 relative mt-6 lg:mt-0">
          {/* Generated hero girl image - visible on mobile, replaces old hero image. Remove this block to revert */}
          <div className="lg:hidden w-full mb-6 rounded-sm overflow-hidden border-4 border-[#111111] shadow-[6px_6px_0px_#FFD600]">
            <img src="/images/hero-girl-chess.webp" alt="Young Indian girl smiling while playing chess" className="w-full aspect-[4/3] object-cover" loading="eager" fetchPriority="high" width="896" height="1200" />
          </div>
          <div className="hidden lg:block absolute top-4 -right-4 w-full h-full bg-[#FFD600] border-4 border-[#111111]" />
          <div className="bg-white border-4 border-[#111111] p-6 md:p-10 relative z-10 flex flex-col">
            
            <div className="flex justify-between items-start border-b-2 border-gray-100 pb-4 md:pb-6 mb-4 md:mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#111111] uppercase tracking-tight leading-none mb-1 md:mb-2">Book a Free Demo</h3>
                <p className="text-gray-500 text-[9px] md:text-xs font-bold uppercase tracking-widest">See the difference in one class</p>
              </div>
              <Activity className="w-6 h-6 md:w-8 md:h-8 text-gray-300 shrink-0" />
            </div>
            
            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              <p className="text-xs md:text-sm font-bold text-gray-700 leading-relaxed">
                Your child gets a live 1-on-1 session with an experienced coach. We assess their level, understand their interests, and show you exactly how we teach.
              </p>
              
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-start md:items-center gap-2 md:gap-3 text-[10px] md:text-xs font-black text-[#111111] uppercase tracking-wide">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 shrink-0 mt-0.5 md:mt-0" /> Live 1-on-1 session with a coach
                </li>
                <li className="flex items-start md:items-center gap-2 md:gap-3 text-[10px] md:text-xs font-black text-[#111111] uppercase tracking-wide">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 shrink-0 mt-0.5 md:mt-0" /> Understand your child's current level
                </li>
                <li className="flex items-start md:items-center gap-2 md:gap-3 text-[10px] md:text-xs font-black text-[#111111] uppercase tracking-wide">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 shrink-0 mt-0.5 md:mt-0" /> Get a personalised learning plan
                </li>
              </ul>
            </div>
            
            <button onClick={scrollToForm} className="w-full bg-[#111111] text-[#FFD600] rounded-sm py-4 md:py-5 font-black text-sm md:text-lg uppercase tracking-widest border-2 border-[#111111] shadow-[4px_4px_0px_#FFD600] md:shadow-[6px_6px_0px_#FFD600] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FFD600] md:hover:shadow-[4px_4px_0px_#FFD600] active:translate-y-[4px] md:active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-2 md:gap-3">
              Book Free Demo Class <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <p className="text-center text-[8px] md:text-[9px] font-black text-gray-400 mt-3 md:mt-4 uppercase tracking-[0.2em]">100% Free • No Payment Required • No Obligation</p>
          </div>
        </div>

      </div>
    </section>
  );
}

function DeepCognitiveQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", age: "" });

  const questions = [
    {
      q: "1. Has your child shown interest in chess or board games before?",
      options: [
        { text: "Not yet — they mostly play on screens", points: 3 },
        { text: "A little — they know some basics", points: 1 },
        { text: "Yes — they play regularly and enjoy it", points: 0 }
      ]
    },
    {
      q: "2. What happens when your child loses a game or doesn't get their way?",
      options: [
        { text: "They get upset, cry, or give up quickly", points: 3 },
        { text: "They're disappointed but move on", points: 1 },
        { text: "They try to understand what went wrong", points: 0 }
      ]
    },
    {
      q: "3. How much time does your child spend on phones or tablets daily?",
      options: [
        { text: "3+ hours — it's a daily struggle", points: 3 },
        { text: "1-2 hours — we try to limit it", points: 1 },
        { text: "Less than 1 hour — they prefer other activities", points: 0 }
      ]
    },
    {
      q: "4. Does your child struggle to sit and focus on homework or reading?",
      options: [
        { text: "Yes — constant reminders and fights", points: 3 },
        { text: "Sometimes — depends on the subject", points: 1 },
        { text: "No — they can focus well on their own", points: 0 }
      ]
    },
    {
      q: "5. What is your main goal for enrolling them in chess?",
      options: [
        { text: "Reduce screen time and build better habits", points: 3 },
        { text: "Improve concentration and academic performance", points: 1 },
        { text: "Prepare them for chess tournaments and competitions", points: 0 }
      ]
    }
  ];

  const handleAnswer = (points: number) => {
    setScore(prev => prev + points);
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setStep(questions.length);
      setAnalyzing(true);
      setTimeout(() => setAnalyzing(false), 2500);
    }
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, I took the quiz on ChessWize and I'm interested in a free demo class.\nName: ${formData.name}\nPhone: ${formData.phone}\nChild's Age: ${formData.age}`;
    window.open(`https://wa.me/918400979997?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const getDiagnosis = () => {
    if (score >= 10) return { title: "YOUR CHILD NEEDS STRUCTURED GUIDANCE", text: "Screen time and short attention spans are common challenges. The good news? Chess is one of the most effective ways to build focus, patience, and discipline. Our beginner-friendly program is designed exactly for kids like yours.", color: "text-red-600", bg: "bg-red-50" };
    if (score >= 5) return { title: "GREAT FOUNDATION — READY TO GROW", text: "Your child already has some good habits. With structured chess training, they can develop sharper thinking, better concentration, and the confidence to tackle harder challenges — in chess and in school.", color: "text-orange-600", bg: "bg-orange-50" };
    return { title: "YOUR CHILD IS A NATURAL!", text: "They already show strong focus and problem-solving skills. Chess will take these abilities to the next level — tournament preparation, advanced strategy, and competitive confidence.", color: "text-green-600", bg: "bg-green-50" };
  };

  return (
    <section id="assessments" className="py-16 md:py-24 bg-[#111111] text-white border-b-4 border-[#FFD600] relative overflow-hidden">
      <div className="absolute inset-0 bg-subtle-grid opacity-10" />
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        
        {step === 0 && (
          <div className="text-center">
            {/* Generated quiz child image - remove this block to revert */}
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#FFD600] shadow-[4px_4px_0px_#FFD600]">
              <img src="/images/quiz-child-thinking.webp" alt="Child thinking about chess" className="w-full h-full object-cover" loading="lazy" width="1024" height="1024" />
            </div>
            <div className="inline-flex items-center gap-2 bg-[#111111] border-2 border-gray-800 text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] px-4 py-2 mb-6">
              <Search className="w-4 h-4" /> Quick Assessment
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1.1] mb-6">
              Is your child ready <br className="hidden sm:block"/><span className="text-[#FFD600] bg-gray-900 px-2 leading-tight">for chess?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-400 font-bold max-w-2xl mx-auto mb-10">
              Answer 5 simple questions about your child. We'll tell you which program is the best fit — and whether chess can help with the challenges you're facing.
            </p>
            <button onClick={() => setStep(1)} className="bg-white text-[#111111] px-8 md:px-12 py-4 md:py-5 font-black text-sm md:text-lg uppercase tracking-widest border-4 border-[#111111] shadow-[6px_6px_0px_#FFD600] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#FFD600] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-3 mx-auto">
              Take the Quiz <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">5 Questions • Takes 30 Seconds • Instant Result</p>
          </div>
        )}

        {step > 0 && step <= questions.length && (
          <div className="bg-white border-4 border-[#FFD600] shadow-[8px_8px_0px_#FFD600] md:shadow-[16px_16px_0px_#FFD600] rounded-sm p-6 md:p-12 text-[#111111] w-full">
            <div className="flex justify-between items-center mb-6 md:mb-8 border-b-2 border-gray-200 pb-4">
              <span className="font-black text-gray-400 uppercase tracking-widest text-[10px] md:text-xs">Question 0{step} of 0{questions.length}</span>
              <div className="flex gap-1 md:gap-2">
                {questions.map((_, i) => (
                  <div key={i} className={`h-1.5 w-6 md:w-8 border border-[#111111] ${i < step ? 'bg-[#FFD600]' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>
            <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight mb-6 md:mb-8 leading-snug">
              {questions[step - 1].q}
            </h3>
            <div className="space-y-3 md:space-y-4">
              {questions[step - 1].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.points)} className="w-full text-left p-4 md:p-6 border-2 border-gray-300 hover:border-[#111111] hover:bg-gray-50 font-bold text-sm md:text-lg transition-colors flex items-center justify-between group rounded-sm">
                  {opt.text}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-[#111111] transition-colors shrink-0 ml-4" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step > questions.length && (
          <div className="bg-white border-4 border-[#FFD600] shadow-[8px_8px_0px_#FFD600] md:shadow-[16px_16px_0px_#FFD600] rounded-sm p-6 md:p-12 text-[#111111] text-center w-full">
            {analyzing ? (
              <div className="py-16 md:py-24 flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-gray-200 border-t-[#FFD600] rounded-full animate-spin mb-6" />
                <span className="font-black text-gray-400 uppercase tracking-widest text-[10px] md:text-xs">Analyzing Responses...</span>
                <p className="text-xs md:text-sm text-gray-500 font-bold mt-2 uppercase tracking-widest">Finding the best program for your child</p>
              </div>
            ) : (
              <div className="text-left md:text-center">
                <div className="inline-flex items-center justify-center bg-[#111111] text-[#FFD600] px-4 py-1.5 border-2 border-[#111111] font-black text-[10px] uppercase tracking-[0.2em] mb-6">
                  Analysis Complete
                </div>
                
                <div className={`p-6 md:p-8 border-4 border-[#111111] mb-8 ${getDiagnosis().bg}`}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Diagnostic Result:</p>
                  <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-tight mb-4 ${getDiagnosis().color}`}>
                    {getDiagnosis().title}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-700 font-bold leading-relaxed">
                    {getDiagnosis().text}
                  </p>
                  <div className="mt-6 p-4 bg-white border-2 border-dashed border-gray-300 text-xs md:text-sm font-bold text-gray-600">
                    <span className="text-[#111111] font-black uppercase">What we recommend:</span> Start with a free demo class. Our coach will work with your child 1-on-1 and create a personalised learning roadmap.
                  </div>
                </div>

                <div className="max-w-md mx-auto border-t-2 border-gray-200 pt-8 mt-8">
                  <h4 className="text-lg md:text-xl font-black uppercase tracking-tight mb-6 text-center">Book Your Free Demo Class</h4>
                  <form onSubmit={handleQuizSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Parent's Name</label>
                      <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-[#111111] outline-none font-bold text-[#111111] text-sm md:text-base rounded-sm" placeholder="e.g. Rahul Sharma" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">WhatsApp Number</label>
                      <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-[#111111] outline-none font-bold text-[#111111] text-sm md:text-base rounded-sm" placeholder="+91" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Child's Age (Must be 5+)</label>
                      <select required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-[#111111] outline-none font-bold text-[#111111] text-sm md:text-base rounded-sm appearance-none">
                        <option value="" disabled>Select Age</option>
                        {Array.from({length: 12}, (_, i) => i + 5).map(a => <option key={a} value={a}>{a} Years Old</option>)}
                      </select>
                    </div>
                    <button type="submit" className="w-full mt-4 bg-[#111111] text-[#FFD600] py-4 font-black text-sm md:text-base uppercase tracking-widest border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2">
              Unlock Report & Book Demo <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </form>
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

function NeurologicalImpact() {
  return (
    <section id="methodology" className="py-16 md:py-24 bg-white border-b-4 border-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16">
            <h2 className="text-xs md:text-sm font-black text-gray-400 uppercase tracking-widest mb-3 md:mb-4">Why Chess Works</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.1]">
              Chess doesn't just teach moves. <br className="sm:hidden" /><span className="text-white bg-[#111111] px-2 py-1 transform inline-block rotate-1 mt-1 sm:mt-0">It builds brains.</span>
            </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { 
              step: "Step 01", title: "Better Focus & Patience",
              desc: "In chess, one careless move can lose the game. Kids naturally learn to slow down, think carefully, and pay attention — skills that directly improve homework and exam performance.",
              metric: "Parents report 2x better focus",
              img: "/images/focus-child.webp"
            },
            { 
              step: "Step 02", title: "Less Screen Time, More Thinking",
              desc: "Chess replaces mindless scrolling with active problem-solving. Instead of consuming content, your child starts creating strategies — a habit that carries into every part of life.",
              metric: "Avg. 1.5 hrs/day off screens",
              img: "/images/screen-free.webp"
            },
            { 
              step: "Step 03", title: "Confidence That Lasts",
              desc: "Winning a game after thinking 5 moves ahead gives kids a sense of achievement no video game can match. They learn to handle losses gracefully and come back stronger.",
              metric: "Kids who stick with it love it",
              img: "/images/confidence-win.webp"
            }
          ].map((item, i) => (
            <div key={i} className="flex flex-col h-full">
              <div className="flex flex-col h-full bg-gray-50 border-4 border-[#111111] shadow-[4px_4px_0px_#111111] md:shadow-[8px_8px_0px_#111111] overflow-hidden">
              {/* Generated card image - remove img tag to revert */}
              <div className="w-full h-40 md:h-48 overflow-hidden border-b-4 border-[#111111]">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5 md:p-8 flex flex-col flex-1">
                <span className="text-[8px] md:text-[10px] font-black text-[#FFD600] bg-[#111111] w-fit px-2 md:px-3 py-1 uppercase tracking-widest mb-4 md:mb-6">{item.step}</span>
                <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 md:mb-4 text-[#111111]">{item.title}</h4>
                <p className="text-xs md:text-sm font-bold text-gray-600 leading-relaxed flex-1 mb-6 md:mb-8">{item.desc}</p>
                
                <div className="pt-4 md:pt-6 border-t-2 border-gray-200">
                  <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Measured Outcome</span>
                  <span className="text-base md:text-lg font-black text-green-600 uppercase tracking-tight">{item.metric}</span>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Curriculum() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const programs = [
    { level: "Beginners", badge: "Ages 5-8", details: ["Learn how each piece moves and captures", "Simple checkmates your child can do in 2 moves", "Fun puzzles that make learning feel like a game"] },
    { level: "Intermediate", badge: "Ages 8-12", details: ["Tactics like pins, forks, and skewers", "How to plan attacks and control the board", "Practice games with coach feedback after every session"] },
    { level: "Advanced & Tournament", badge: "Ages 10-16+", details: ["Build a personalised opening repertoire", "Deep calculation and visualisation training", "Tournament preparation and competitive mindset"] }
  ];

  return (
    <section id="curriculum" className="py-16 md:py-24 bg-gray-50 border-b-4 border-[#111111] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#111111] border-2 border-gray-800 text-gray-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6">
            <BookOpen className="w-3 h-3 md:w-4 md:h-4" /> Academic Structure
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tight mb-4 md:mb-6">
            A Curriculum Built On <span className="text-[#FFD600] inline-block border-b-4 border-[#111111]">Outcomes</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-600 font-bold max-w-2xl mx-auto">Age-appropriate programs that take your child from "I don't know the rules" to "I just won my first tournament" — step by step.</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {programs.map((p, i) => (
            <div key={i} className={`bg-white border-4 border-[#111111] rounded-sm overflow-hidden shadow-[4px_4px_0px_#111111] md:shadow-[8px_8px_0px_#111111] transition-all cursor-pointer ${openIndex === i ? 'md:translate-x-2 md:-translate-y-2 md:shadow-[12px_12px_0px_#FFD600]' : 'hover:-translate-y-1'}`} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              <div className="p-4 md:p-8 flex justify-between items-center bg-white z-10 relative border-b-4 border-transparent">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                  <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 bg-[#FFD600] border-2 border-[#111111] items-center justify-center font-black text-lg md:text-xl shrink-0">
                    0{i+1}
                  </div>
                  <div>
                    <div className="flex items-center flex-wrap gap-2 md:gap-3 mb-1">
                      <span className="sm:hidden text-lg font-black text-[#FFD600] mr-1">0{i+1}</span>
                      <h3 className="text-lg md:text-2xl font-black text-[#111111] uppercase leading-none">{p.level}</h3>
                      <span className="text-[8px] md:text-[10px] font-black px-2 py-1 bg-[#111111] text-white uppercase tracking-widest">{p.badge}</span>
                    </div>
                  </div>
                </div>
                <div className={`w-8 h-8 md:w-10 md:h-10 border-2 border-[#111111] flex items-center justify-center transition-colors shrink-0 ${openIndex === i ? 'bg-[#FFD600]' : 'bg-gray-100'}`}>
                  <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 text-[#111111] transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                </div>
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t-4 border-[#111111] bg-gray-50">
                    <div className="p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {p.details.map((detail, j) => (
                        <div key={j} className="flex items-start gap-2 md:gap-3">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0" />
                          <span className="text-xs md:text-sm text-[#111111] font-bold leading-snug">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mentors() {
  const coaches = [
    { name: "Coach Rahul Sharma", role: "Senior Chess Coach", rating: "Rated", img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-20.png", focus: "Beginner Training", exp: "8+", desc: "Specialises in transforming complete beginners into confident players with structured, actionable lessons." },
    { name: "Coach Arjun Mehta", role: "Tournament Prep Specialist", rating: "FIDE", img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-21.png", focus: "Tournament Prep", exp: "10+", desc: "Deep expertise in advanced positional play and competitive strategy. Has groomed multiple students for state and national-level competitions." },
    { name: "Coach Sneha Patel", role: "Junior Cohort Lead", rating: "Rated", img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-26.png", focus: "Confidence Building", exp: "6+", desc: "Excels at building confidence in young learners, especially girls, making chess approachable and exciting." },
  ];

  return (
    <section id="faculty" className="py-16 md:py-24 bg-gray-50 border-b-4 border-[#111111]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#111111] border-2 border-gray-800 text-gray-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6">
            <Users className="w-3 h-3 md:w-4 md:h-4" /> Our Coaches
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tight">
            Your child learns from <br className="hidden sm:block"/> <span className="bg-[#FFD600] px-2 md:px-3 py-1 transform inline-block rotate-1 border-4 border-[#111111] shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111] mt-2 md:mt-4">experienced coaches.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {coaches.map((c, i) => (
            <div key={i} className="bg-white rounded-sm border-4 border-[#111111] shadow-[6px_6px_0px_#111111] md:shadow-[8px_8px_0px_#111111] overflow-hidden flex flex-col transform transition-transform hover:-translate-y-2">
              <div className="h-56 md:h-72 overflow-hidden border-b-4 border-[#111111] relative">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" loading="lazy" />
                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-[#FFD600] text-[#111111] text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-2 md:px-3 py-1 md:py-1.5 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] md:shadow-[4px_4px_0px_#111111]">
                  FIDE {c.rating}
                </div>
              </div>
              <div className="p-4 md:p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl md:text-2xl font-black text-[#111111] uppercase">{c.name}</h3>
                  <span className="text-[#FFD600] font-black text-xs bg-[#111111] px-2 py-0.5">{c.exp} Yrs</span>
                </div>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-3">{c.role}</p>
                <p className="text-xs md:text-sm font-bold text-gray-600 leading-relaxed mb-4 flex-1">{c.desc}</p>
                <div className="mt-auto flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-wider text-[#111111] bg-[#FFF4E5] p-2 md:p-3 border-2 border-[#111111] rounded-sm">
                  <Target className="w-3 h-3 md:w-4 md:h-4 text-[#B45309] shrink-0" /> <span className="truncate">Specialty: {c.focus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowAClassWorks() {
  const steps = [
    { icon: <Monitor className="w-6 h-6 md:w-8 md:h-8" />, title: "Join via Zoom", desc: "Your child logs in from home. All they need is a laptop or tablet with internet." },
    { icon: <Users className="w-6 h-6 md:w-8 md:h-8" />, title: "Meet the Coach", desc: "A friendly, experienced coach greets them and starts with a quick warm-up puzzle." },
    { icon: <Puzzle className="w-6 h-6 md:w-8 md:h-8" />, title: "Learn & Play", desc: "45 minutes of interactive lessons — tactics, puzzles, and live games on a shared board." },
    { icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />, title: "Homework & Progress", desc: "After class, they get fun puzzles to practice. Parents receive a progress update on WhatsApp." },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 border-b-4 border-[#111111] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FFD600] border-4 border-[#111111] text-[#111111] font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6 shadow-[2px_2px_0px_#111111]">
            <BookOpen className="w-3 h-3 md:w-4 md:h-4" /> Inside a Class
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tight leading-none">
            Here's what a <span className="text-[#FFD600] bg-[#111111] px-2 md:px-3 py-1 inline-block transform -rotate-1 border-2 border-[#111111]">class looks like</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="bg-white border-4 border-[#111111] p-5 md:p-6 shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111] h-full">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FFD600] border-4 border-[#111111] flex items-center justify-center mb-4 shadow-[2px_2px_0px_#111111]">
                  {step.icon}
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Step {i + 1}</div>
                <h3 className="text-lg md:text-xl font-black text-[#111111] uppercase tracking-tight mb-2">{step.title}</h3>
                <p className="text-xs md:text-sm font-bold text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 text-[#FFD600]">
                  <ChevronRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Generated online class image - remove this block to revert */}
        <div className="w-full max-w-3xl mx-auto mt-10 md:mt-14 rounded-sm overflow-hidden border-4 border-[#111111] shadow-[6px_6px_0px_#FFD600] md:shadow-[8px_8px_0px_#FFD600]">
          <img src="/images/online-class-laptop.webp" alt="What an online chess class looks like on Zoom" className="w-full aspect-video object-cover" loading="lazy" width="1376" height="768" />
          <div className="bg-[#111111] px-4 py-2 text-center">
            <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">A real ChessWize class in progress — live on Zoom</p>
          </div>
        </div>

        <div className="text-center mt-10 md:mt-14">
          <button onClick={scrollToForm} className="bg-[#FFD600] text-[#111111] px-8 md:px-12 py-4 md:py-5 font-black uppercase tracking-widest text-sm md:text-base border-4 border-[#111111] shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] active:translate-y-[4px] active:shadow-none transition-all inline-flex items-center gap-2">
            Book a Free Demo Class <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is this live or recorded?", a: "100% live. Every class is taught in real-time by a coach on Zoom. Your child can ask questions, interact, and get instant feedback. We don't use any pre-recorded content." },
    { q: "What if my child misses a class?", a: "No worries — we offer makeup classes. Just let us know on WhatsApp and we'll schedule a replacement session within the same week." },
    { q: "What platform do you use?", a: "Classes happen on Zoom with a shared chess board (Lichess or Chess.com). Your child just needs a laptop or tablet with a stable internet connection." },
    { q: "Can I sit with my child during the class?", a: "Absolutely! Especially for younger kids (5-7), we encourage parents to sit in for the first few classes. After that, most kids are comfortable on their own." },
    { q: "What age is right to start chess?", a: "We take children from age 5 onwards. If your child can count to 10 and follow simple instructions, they're ready. Our Beginners program is designed specifically for young learners." },
    { q: "How is this different from YouTube or chess apps?", a: "Apps and videos can't correct mistakes, adapt to your child's level, or build a relationship. Our coaches personalise every lesson, track progress, and keep your child motivated week after week." },
    { q: "Do you prepare kids for tournaments?", a: "Yes! Our Advanced & Tournament program is specifically designed for competitive play. Many of our students have won state and national-level tournaments." },
    { q: "What's your refund policy?", a: "If you're not happy after the first 2 classes, we refund 100% — no questions asked. Just send us a WhatsApp message. That's it." },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white border-b-4 border-[#111111]">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#111111] border-2 border-gray-800 text-gray-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6">
            <HelpCircle className="w-3 h-3 md:w-4 md:h-4" /> Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tight leading-none">
            Parents always <span className="text-[#FFD600]">ask us</span>
          </h2>
        </div>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`border-4 border-[#111111] transition-all ${open === i ? 'shadow-[4px_4px_0px_#FFD600] md:shadow-[6px_6px_0px_#FFD600]' : 'shadow-[2px_2px_0px_#111111] md:shadow-[4px_4px_0px_#111111]'}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 md:p-5 bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <span className="font-black text-sm md:text-base text-[#111111] uppercase tracking-tight pr-4">{faq.q}</span>
                {open === i ? <ChevronUp className="w-5 h-5 shrink-0 text-[#FFD600]" /> : <ChevronDown className="w-5 h-5 shrink-0 text-gray-400" />}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-5 pb-4 md:pb-5 border-t-2 border-gray-200 pt-4">
                      <p className="text-xs md:text-sm font-bold text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-14">
          <p className="text-sm font-bold text-gray-500 mb-4">Still have questions?</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#111111] text-white px-6 md:px-8 py-3 md:py-4 font-black uppercase tracking-widest text-xs md:text-sm border-4 border-[#111111] shadow-[4px_4px_0px_#FFD600] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#FFD600] active:translate-y-[4px] active:shadow-none transition-all">
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    { name: "Group Batch", price: "₹2,999", classPrice: "₹375 per class", period: "/mo", features: ["8 live classes per month", "Small batches — max 4 students", "Regular progress updates for parents", "Access to practice puzzles & homework"], popular: false },
    { name: "1-on-1 Private", price: "₹5,999", classPrice: "₹750 per class", period: "/mo", features: ["8 private 1-on-1 classes", "Personalised learning plan for your child", "Weekly feedback shared with parents", "Direct WhatsApp access to the coach"], popular: true },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#111111] text-white border-b-4 border-[#FFD600]">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 md:mb-6">
            Affordable plans that <br className="sm:hidden" /><span className="bg-[#FFD600] text-[#111111] px-2 md:px-3 py-1 transform inline-block -rotate-1 border-2 border-[#111111] mt-2 sm:mt-0">fit your budget.</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-400 font-bold">Less than the cost of a math tutor. More impact on their future.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 max-w-4xl mx-auto px-2 sm:px-0">
          {plans.map((plan, i) => (
            <div key={i} className={`bg-white rounded-sm p-5 md:p-8 border-4 border-transparent relative transition-transform ${plan.popular ? "border-[#FFD600] shadow-[6px_6px_0px_#FFD600] md:shadow-[12px_12px_0px_#FFD600] sm:-translate-y-4" : "border-gray-700 shadow-[6px_6px_0px_#333333] sm:mt-4"}`}>
              {plan.popular && (
                <div className="absolute -top-4 md:-top-5 left-1/2 transform -translate-x-1/2 bg-[#FFD600] text-[#111111] font-black px-4 md:px-6 py-1.5 md:py-2 border-4 border-[#111111] text-[10px] md:text-sm uppercase tracking-widest shadow-[4px_4px_0px_#111111] whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl md:text-3xl font-black text-[#111111] uppercase mb-3 md:mb-4 text-center mt-2 md:mt-0">{plan.name}</h3>
              <div className="text-center mb-4 md:mb-6">
                <span className="text-4xl md:text-6xl font-black text-[#111111] tracking-tighter">{plan.price}</span>
                <span className="text-gray-500 font-bold ml-1 text-sm md:text-base">{plan.period}</span>
              </div>
              <div className="text-center bg-[#FFF4E5] border-2 border-[#111111] text-[#B45309] font-black text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 w-fit mx-auto mb-8 md:mb-10 uppercase tracking-widest shadow-[2px_2px_0px_#111111]">
                Only {plan.classPrice}
              </div>
              <ul className="space-y-4 md:space-y-5 mb-8 md:mb-12">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start md:items-center gap-3 md:gap-4 text-sm md:text-base font-bold text-gray-800 leading-snug">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0 mt-0.5 md:mt-0" /> {feature}
                  </li>
                ))}
              </ul>
              <button onClick={scrollToForm} className={`w-full py-4 md:py-5 font-black uppercase tracking-widest text-sm md:text-lg border-4 border-[#111111] transition-transform shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] md:hover:shadow-[4px_4px_0px_#111111] active:translate-y-[4px] md:active:translate-y-[6px] active:shadow-none rounded-sm ${plan.popular ? 'bg-[#FFD600] text-[#111111]' : 'bg-[#111111] text-white'}`}>
                Lock This Price
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-10 md:mt-16 bg-[#111111] border-4 border-[#FFD600] p-5 md:p-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 md:gap-8 shadow-[4px_4px_0px_#FFD600] md:shadow-[8px_8px_0px_#FFD600] text-center sm:text-left">
          <div className="w-14 h-14 md:w-20 md:h-20 bg-[#FFD600] border-4 border-[#111111] shrink-0 flex items-center justify-center shadow-[4px_4px_0px_#111111]">
            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-[#111111]" />
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#FFD600] mb-2">100% Money-Back Guarantee</h4>
            <p className="text-gray-300 font-bold leading-relaxed text-xs md:text-sm">
              Not happy after the first 2 classes? We'll refund every rupee. No questions asked. No forms. Just send us a WhatsApp message. That's how confident we are.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", age: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, I'd like to book a free demo class for my child.\nName: ${formData.name}\nPhone: ${formData.phone}\nChild's Age: ${formData.age}`;
    window.open(`https://wa.me/918400979997?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id={FORM_SECTION_ID} className="py-16 md:py-24 bg-white border-b-4 border-[#111111] relative overflow-hidden">
      <div className="bg-subtle-grid absolute inset-0 opacity-40" />
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-12 md:gap-16 items-center relative z-10">
        
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="inline-flex items-center justify-center lg:justify-start gap-2 bg-green-100 text-green-700 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6 border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" /> Free Demo Available
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] uppercase tracking-tight mb-6 md:mb-8 leading-none">
            Your child is one class away from <br className="hidden sm:block lg:hidden"/><span className="bg-[#FFD600] px-2 py-1 transform inline-block -rotate-1 border-4 border-[#111111] shadow-[6px_6px_0px_#111111] md:shadow-[8px_8px_0px_#111111] mt-2">loving chess.</span>
          </h2>
          <p className="text-base md:text-xl text-gray-700 font-bold mb-8 md:mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Fill in your details and we'll call you within 2 hours to schedule your child's free demo class. No payment needed.
          </p>

          {/* Generated parent-child image - smaller, beside copy. Remove this block to revert */}
          <div className="hidden lg:block w-full max-w-xs mx-auto lg:mx-0 mb-8 rounded-sm overflow-hidden border-4 border-[#111111] shadow-[4px_4px_0px_#FFD600]">
            <img src="/images/parent-child-chess.webp" alt="Mother and child bonding over a chess game" className="w-full aspect-[4/3] object-cover" loading="lazy" width="896" height="1200" />
          </div>
          
          <div className="space-y-4 md:space-y-6 max-w-sm mx-auto lg:mx-0">
            <div className="flex items-center gap-4 md:gap-6 bg-white p-4 md:p-6 border-4 border-[#111111] shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111] text-left">
              <Phone className="w-6 h-6 md:w-8 md:h-8 text-[#111111] shrink-0" />
              <div>
                <p className="font-black text-gray-400 uppercase tracking-widest text-[10px] md:text-xs mb-0.5 md:mb-1">Call or WhatsApp Us</p>
                <p className="font-black text-xl md:text-2xl text-[#111111]">+91-8400979997</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 md:p-12 border-4 border-[#111111] shadow-[8px_8px_0px_#111111] md:shadow-[16px_16px_0px_#111111] relative mt-4 md:mt-0">
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-[#111111] text-[#FFD600] font-black uppercase tracking-widest text-[10px] md:text-xs px-3 md:px-5 py-2 md:py-3 border-4 border-[#111111] transform rotate-3 shadow-[4px_4px_0px_#FFD600]">
              Fast-Track
            </div>
            
            <div className="space-y-4 md:space-y-6 mt-2 md:mt-4">
              <div>
                <label className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5 md:mb-2 block">Your Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 md:px-5 py-3 md:py-4 bg-gray-50 border-4 border-gray-200 focus:border-[#111111] focus:bg-[#FFF4E5] outline-none transition-colors font-bold text-[#111111] text-base md:text-lg rounded-sm" placeholder="e.g. Rahul Sharma" />
              </div>
              
              <div>
                <label className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5 md:mb-2 block">WhatsApp Number</label>
                <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 md:px-5 py-3 md:py-4 bg-gray-50 border-4 border-gray-200 focus:border-[#111111] focus:bg-[#FFF4E5] outline-none transition-colors font-bold text-[#111111] text-base md:text-lg rounded-sm" placeholder="+91" />
              </div>

              <div>
                <label className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5 md:mb-2 block">Child's Age</label>
                <select required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full px-4 md:px-5 py-3 md:py-4 bg-gray-50 border-4 border-gray-200 focus:border-[#111111] focus:bg-[#FFF4E5] outline-none transition-colors font-bold text-[#111111] text-base md:text-lg rounded-sm appearance-none">
                  <option value="" disabled>Select Age</option>
                  {Array.from({length: 12}, (_, i) => i + 5).map(a => <option key={a} value={a}>{a} Years Old</option>)}
                </select>
              </div>

              <button type="submit" className="w-full mt-4 md:mt-6 bg-[#FFD600] text-[#111111] py-4 md:py-5 font-black text-base md:text-xl uppercase tracking-widest border-4 border-[#111111] shadow-[4px_4px_0px_#111111] md:shadow-[8px_8px_0px_#111111] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] md:hover:shadow-[6px_6px_0px_#111111] active:translate-y-[4px] md:active:translate-y-[8px] active:shadow-none transition-all flex items-center justify-center gap-2 md:gap-3">
                Book Free Demo Class <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <p className="text-[8px] md:text-[10px] text-center font-black uppercase text-gray-400 tracking-widest mt-3 md:mt-4">We'll call you within 2 hours • No spam, ever.</p>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#111111] pt-16 md:pt-24 pb-8 border-t-8 border-[#FFD600]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <img src="/images/logo-side-white.svg" alt="ChessWize" className="h-10 sm:h-12 md:h-14 w-auto mb-6" />
            <p className="text-gray-400 font-bold text-sm leading-relaxed mb-8 max-w-sm">
              Structured, level-based chess training designed to build strategic thinking, discipline, and competitive confidence. 7+ years of experience, 1500+ students trained across 15+ countries.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/chess.wize/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white flex items-center justify-center border-2 border-transparent hover:border-[#FFD600] hover:-translate-y-1 transition-all rounded-sm group">
                <Instagram className="w-5 h-5 text-[#111111]" />
              </a>
              <a href="https://www.facebook.com/chesswize" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white flex items-center justify-center border-2 border-transparent hover:border-[#FFD600] hover:-translate-y-1 transition-all rounded-sm group">
                <Facebook className="w-5 h-5 text-[#111111]" />
              </a>
              <a href="https://www.linkedin.com/company/chesswize/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white flex items-center justify-center border-2 border-transparent hover:border-[#FFD600] hover:-translate-y-1 transition-all rounded-sm group">
                <Linkedin className="w-5 h-5 text-[#111111]" />
              </a>
              <a href="mailto:chesswize79@gmail.com" className="w-10 h-10 bg-white flex items-center justify-center border-2 border-transparent hover:border-[#FFD600] hover:-translate-y-1 transition-all rounded-sm group">
                <Mail className="w-5 h-5 text-[#111111]" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            <div className="flex flex-col">
              <h4 className="text-[#FFD600] font-black text-xs uppercase tracking-widest mb-6">Assessments</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-400">
                <li><a href="#assessments" className="hover:text-white transition-colors">Take the Quiz</a></li>
                <li><a href="#assessments" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#assessments" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#methodology" className="hover:text-white transition-colors">Our Coaches</a></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="text-[#FFD600] font-black text-xs uppercase tracking-widest mb-6">Programs</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-400">
                <li><a href="#curriculum" className="hover:text-white transition-colors">Beginners (Ages 5-8)</a></li>
                <li><a href="#curriculum" className="hover:text-white transition-colors">Intermediate (Ages 8-12)</a></li>
                <li><a href="#curriculum" className="hover:text-white transition-colors">Advanced & Tournament</a></li>
                <li><a href="#faculty" className="hover:text-white transition-colors">Meet Our Coaches</a></li>
              </ul>
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <h4 className="text-[#FFD600] font-black text-xs uppercase tracking-widest mb-6">Support</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-400">
                <li><a href="mailto:chesswize79@gmail.com" className="hover:text-white transition-colors">chesswize79@gmail.com</a></li>
                <li><a href="tel:+918400979997" className="hover:text-white transition-colors">+91-8400979997</a></li>
                <li><span className="hover:text-white transition-colors">Araaji No 988, H.no 05 Rajiv Vihar Naubasta, Kanpur 208021</span></li>
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
          <p>© 2025 ChessWize. All Rights Reserved.</p>
          <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Refunds</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LiveBookingToast() {
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
          className="hidden sm:flex fixed bottom-6 left-6 z-[60] bg-white border-4 border-[#111111] p-3 md:p-4 shadow-[4px_4px_0px_#FFD600] md:shadow-[8px_8px_0px_#FFD600] items-center gap-3 md:gap-4 max-w-[280px] md:max-w-[320px]"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 border-2 border-[#111111] rounded-sm flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
          </div>
          <div>
            <p className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5 md:mb-1">{booking.time}</p>
            <p className="text-xs md:text-sm font-black text-[#111111] leading-tight uppercase tracking-tight">{booking.name} <br className="sm:hidden"/>Booked a Demo</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StickyMobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111111] border-t-4 border-[#FFD600] p-3 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.3)] pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <div className="flex flex-col">
        <span className="font-black text-white uppercase text-base leading-none mb-1">Free Demo Class</span>
        <span className="text-[8px] font-black text-[#FFD600] uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#FFD600] rounded-full animate-pulse" /> Limited Slots This Week
        </span>
      </div>
      <button onClick={scrollToForm} className="bg-[#FFD600] text-[#111111] px-6 py-2.5 font-black uppercase tracking-widest text-xs border-2 border-[#111111] shadow-[2px_2px_0px_#111111] active:translate-y-[2px] active:shadow-none">
        Book Now
      </button>
    </div>
  );
}

function StatBar() {
  const stats = [
    { value: 7, suffix: "+", label: "Years of Experience" },
    { value: 1500, suffix: "+", label: "Students Trained" },
    { value: 15, suffix: "+", label: "Countries Reached" },
    { value: 99, suffix: "%", label: "Parent Satisfaction" }
  ];

  return (
    <div className="bg-[#111111] py-8 border-b-4 border-[#FFD600]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-800">
        {stats.map((s, i) => (
          <FadeIn key={i} delay={i * 0.1} className={`text-center ${i % 2 === 0 ? "border-l-0" : ""}`}>
            <div className="text-2xl md:text-4xl font-black text-[#FFD600] mb-1"><AnimatedNumber value={s.value} suffix={s.suffix} /></div>
            <div className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">{s.label}</div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function ScreenTimeCalculator() {
  const [hours, setHours] = useState(14);
  
  const lostHoursYear = hours * 52;
  const skillsMastered = Math.floor(lostHoursYear / 20); // arbitrary metric for dramatic effect
  
  return (
    <section className="py-16 md:py-24 bg-white border-b-4 border-[#111111] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6 border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            <LineChart className="w-3 h-3 md:w-4 md:h-4" /> Every Parent Should See This
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#111111] uppercase tracking-tight mb-4 md:mb-6 leading-none">
            What if that <span className="text-red-500">screen time</span> became <span className="text-green-600">chess time?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-600 font-bold max-w-2xl mx-auto">
            Most kids spend 10-20 hours a week on phones. Imagine if even half of that went into learning chess. Here's what that looks like.
          </p>
        </div>

        {/* Generated phone-vs-chess banner - remove this block to revert */}
        <div className="w-full max-w-4xl mx-auto mb-10 md:mb-14 rounded-sm overflow-hidden border-4 border-[#111111] shadow-[6px_6px_0px_#111111] md:shadow-[8px_8px_0px_#111111]">
          <img src="/images/phone-vs-chess.webp" alt="Screen time vs chess time — the contrast" className="w-full aspect-[21/9] object-cover" loading="lazy" width="1584" height="672" />
        </div>

        <div className="bg-gray-50 border-4 border-[#111111] shadow-[8px_8px_0px_#111111] md:shadow-[12px_12px_0px_#111111] p-5 sm:p-8 md:p-12 rounded-sm max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
          
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <label className="text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest mb-4 md:mb-6 block text-center md:text-left">
              Weekly Screen Time: <span className="text-xl md:text-2xl text-[#111111] ml-2 block sm:inline mt-1 sm:mt-0">{hours} hrs</span>
            </label>
            <input 
              type="range" 
              min="2" 
              max="40" 
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="w-full h-3 md:h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#111111]"
            />
            <div className="flex justify-between text-[10px] md:text-xs font-bold text-gray-400 mt-3 md:mt-4 uppercase">
              <span>2 hrs</span>
              <span>40+ hrs</span>
            </div>
            
            <div className="mt-8 md:mt-10 p-4 md:p-5 border-2 border-orange-200 bg-orange-50 rounded-sm">
              <h4 className="font-black text-orange-600 uppercase mb-1.5 md:mb-2 text-sm md:text-base">Did You Know?</h4>
              <p className="text-xs md:text-sm font-bold text-orange-900 leading-relaxed">
                Studies show that children who play chess regularly score <span className="bg-orange-200 px-1">15-20% higher</span> in maths and reading. Chess builds the same skills your child needs for school — focus, logic, and problem-solving.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
            <h4 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 border-b-2 border-gray-200 pb-3 md:pb-4 text-center md:text-left">With ChessWize instead:</h4>
            
            <div className="bg-white border-2 border-[#111111] p-4 md:p-5 shadow-[4px_4px_0px_#111111] transform transition-transform hover:-translate-y-1">
              <p className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Hours of Focused Learning (Per Year)</p>
              <p className="text-3xl md:text-4xl font-black text-[#111111]">{lostHoursYear}</p>
            </div>
            
            <div className="bg-white border-2 border-[#111111] p-4 md:p-5 shadow-[4px_4px_0px_#111111] transform transition-transform hover:-translate-y-1">
              <p className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Chess Puzzles & Patterns Learned</p>
              <p className="text-3xl md:text-4xl font-black text-green-500">{skillsMastered}+</p>
            </div>
            
            <button onClick={scrollToForm} className="w-full bg-[#111111] text-[#FFD600] py-3 md:py-4 font-black text-sm md:text-lg uppercase tracking-widest border-2 border-[#111111] shadow-[2px_2px_0px_#FFD600] md:shadow-[4px_4px_0px_#FFD600] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#FFD600] md:hover:shadow-[2px_2px_0px_#FFD600] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 md:gap-3">
              Book a Free Demo <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

function GrowthProjector() {
  const [months, setMonths] = useState(6);
  
  // Exponential curve simulation for FIDE rating equivalent
  const baseline = 400;
  const projectedRating = Math.floor(baseline + (months * 120 * Math.pow(1.05, months)));
  const percentImprovement = Math.floor(((projectedRating - baseline) / baseline) * 100);

  return (
    <section className="py-16 md:py-24 bg-[#111111] text-white border-b-4 border-[#FFD600] relative">
      {/* Generated dark section texture - remove this div to revert */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none">
        <img src="/images/dark-section-texture.webp" alt="" className="w-full h-full object-cover" loading="lazy" width="1376" height="768" />
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-12 md:gap-16 items-center relative z-10">
        
        <div className="w-full lg:w-5/12 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4 md:mb-6 leading-none">
            Watch your child <span className="text-[#FFD600]">grow</span> month after month.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 font-bold mb-6 md:mb-8">
            Chess improvement isn't instant — but it compounds. The longer they train, the sharper they get. Here's what our students typically achieve.
          </p>
          
          <div className="mb-8 md:mb-10 text-left">
            <label className="text-xs md:text-sm font-black text-gray-400 uppercase tracking-widest mb-3 md:mb-4 block text-center md:text-left">
              Months of Training: <span className="text-[#FFD600] text-lg md:text-xl ml-2 block sm:inline mt-1 sm:mt-0">{months} Months</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="24" 
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
              className="w-full h-3 md:h-4 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#FFD600]"
            />
            <div className="flex justify-between text-[8px] md:text-[10px] font-bold text-gray-600 mt-2 md:mt-3 uppercase">
              <span>Month 1</span>
              <span>Year 2</span>
            </div>
          </div>

          <ul className="space-y-3 md:space-y-4 text-left inline-block lg:block mx-auto">
            <li className="flex items-start md:items-center gap-2 md:gap-3 text-[10px] md:text-sm">
              <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-green-500 shrink-0 mt-0.5 md:mt-0" />
              <span className="font-bold text-gray-300">Based on progress of 1,500+ students.</span>
            </li>
            <li className="flex items-start md:items-center gap-2 md:gap-3 text-[10px] md:text-sm">
              <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-green-500 shrink-0 mt-0.5 md:mt-0" />
              <span className="font-bold text-gray-300">Rating = chess skill level (higher is better).</span>
            </li>
          </ul>
        </div>

        <div className="w-full lg:w-7/12 relative mt-4 md:mt-0">
          {/* Generated growth king image - remove this div to revert */}
          <div className="hidden lg:block absolute -top-10 -right-10 w-40 h-52 opacity-25 rotate-3 pointer-events-none z-0">
            <img src="/images/growth-king.webp" alt="" className="w-full h-full object-cover rounded-sm" loading="lazy" width="896" height="1200" />
          </div>
          <div className="bg-white rounded-sm p-6 md:p-8 border-4 border-[#FFD600] shadow-[8px_8px_0px_#FFD600] md:shadow-[16px_16px_0px_#FFD600] text-[#111111] relative z-10">
            <div className="absolute -top-4 -left-4 md:-top-5 md:-left-5 bg-[#111111] text-white font-black px-3 md:px-4 py-1.5 md:py-2 border-2 border-[#FFD600] text-[10px] md:text-xs uppercase tracking-widest">
              Live Projection
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-6 md:gap-8 mb-8 md:mb-10 border-b-2 border-gray-200 pb-6 md:pb-8 text-center sm:text-left">
              <div>
                <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Rating</p>
                <div className="text-4xl md:text-6xl font-black text-[#111111] tracking-tighter">
                  {projectedRating} <span className="text-lg md:text-xl text-gray-400">ELO</span>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Skill Growth</p>
                <div className="text-3xl md:text-4xl font-black text-green-500 tracking-tight">
                  +{percentImprovement}%
                </div>
              </div>
            </div>

            <div className="h-32 md:h-48 w-full flex items-end gap-1 md:gap-2 border-l-2 border-b-2 border-[#111111] pt-4 pr-2 pb-0 pl-0 relative">
              {Array.from({ length: 12 }).map((_, i) => {
                const isActive = i < (months / 2);
                const height = Math.max(10, (i + 1) * (i + 1) * 0.7); // exponential curve
                return (
                  <div key={i} className="flex-1 flex flex-col justify-end h-full relative group">
                    <motion.div 
                      initial={false}
                      animate={{ height: `${height}%`, backgroundColor: isActive ? '#FFD600' : '#E5E7EB' }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="w-full border-t-2 border-r-2 border-[#111111] rounded-tr-sm"
                    />
                  </div>
                );
              })}
              <div className="absolute -bottom-5 md:-bottom-6 left-0 text-[8px] md:text-xs font-bold text-gray-400">Start</div>
              <div className="absolute -bottom-5 md:-bottom-6 right-0 text-[8px] md:text-xs font-bold text-gray-400">24 Months</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function SuccessStories() {
  const testimonials = [
    { 
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-20.png", 
      name: "Rupali", 
      title: "Parent from Lucknow", 
      quote: "Chesswize has been an incredible experience for my son, Aadvik! The coaches are patient and engaging, making each lesson exciting. I've noticed a big improvement in his thinking skills and concentration. He looks forward to every session, and I'm so happy with his progress. Highly recommend!" 
    },
    { 
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-21.png", 
      name: "Monika", 
      title: "Parent from Kanpur", 
      quote: "My daughter, Anika, has shown amazing progress since joining Chesswize! The coaches make learning fun and engaging, helping her improve focus and problem-solving skills. She looks forward to every session, and I'm so happy to see her confidence grow. Highly recommend!" 
    },
    { 
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-26.png", 
      name: "Anjana", 
      title: "Parent from Mumbai", 
      quote: "My daughter, Ishita, has shown amazing progress since joining Chesswize! The coaches are patient and engaging, making learning fun. She has improved her focus and problem-solving skills. She looks forward to every session, and I'm so happy with her growth. Highly recommend!" 
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#111111] border-b-4 border-[#FFD600] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#FFD600] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] text-[#111111] font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6">
            <Quote className="w-3 h-3 md:w-4 md:h-4" /> Verified Reviews
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
            Parents Across India <br className="hidden sm:block"/>❤️ <span className="text-[#FFD600] underline decoration-[#FFD600] decoration-4 underline-offset-4 md:underline-offset-8">ChessWize</span>
          </h3>
        </div>

        {/* Video Testimonials */}
        <div className="mb-16 md:mb-20">
          <h4 className="text-center text-xs md:text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Hear Directly From Parents</h4>
          <div className="flex flex-col gap-6 md:gap-8 max-w-2xl mx-auto">
            {[
              "https://chesswize.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-07-at-22.51.22.mp4",
              "https://chesswize.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-07-at-22.51.22-1.mp4",
            ].map((src, i) => (
              <div key={i} className="bg-white border-4 border-[#FFD600] shadow-[6px_6px_0px_#FFD600] md:shadow-[8px_8px_0px_#FFD600] rounded-sm overflow-hidden">
                <LazyVideo src={src} className="w-full aspect-video bg-black" />
              </div>
            ))}
          </div>
        </div>

        {/* Written Testimonials - always one row, horizontal scroll on mobile */}
        <div className="flex gap-4 md:gap-6 mt-8 overflow-x-auto pb-6 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible hide-scrollbar">
          {testimonials.map((t, i) => (
            <div key={i} className="relative group min-w-[75vw] sm:min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink md:flex-1 snap-center">
              {/* Layered background cards for depth */}
              <div className="absolute inset-0 bg-[#FFD600] translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3 rounded-sm" />
              <div className="absolute inset-0 bg-[#FFD600]/50 translate-x-1 translate-y-1 md:translate-x-1.5 md:translate-y-1.5 rounded-sm" />
              
              <div className="relative bg-white rounded-sm border-2 border-[#111111] p-5 md:p-6 flex flex-col h-full">
                {/* Avatar + name inline */}
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full border-2 border-[#111111] object-cover shrink-0" loading="lazy" />
                  <div>
                    <p className="font-black text-[#111111] text-sm uppercase leading-tight">{t.name}</p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{t.title}</p>
                  </div>
                </div>
                
                <div className="flex gap-0.5 text-[#111111] mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                
                <p className="font-bold text-[#111111] text-xs md:text-sm leading-relaxed italic flex-1">"{t.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StarPerformers() {
  const stars = [
    { 
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-30.png", 
      name: "Mikaeel", 
      quote: "We are extremely grateful to ChessWize and Tarun Sir for the incredible guidance and mentorship they have provided to Mikaeel. Under Tarun Sir's expert coaching, Mikaeel's chess skills have improved significantly, and his confidence in the game has grown immensely." 
    },
    { 
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-28.png", 
      name: "Saanvika", 
      quote: "Enrolling Saanvika in ChessWize has been one of the best decisions we made for her chess journey. Tarun Sir's patient and insightful coaching has helped her develop a deep understanding of the game. Since joining ChessWize, Saanvika has won five tournaments!" 
    },
    { 
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-29.png", 
      name: "Avyukt", 
      quote: "My son started at the basic level, and Chesswize made his learning journey incredible! His teacher quickly recognized his strengths and guided him to the next stage with patience and encouragement. Thanks to Chesswize, he advanced much faster than I expected." 
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 border-b-4 border-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#111111] border-2 border-gray-800 text-gray-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6">
            <Award className="w-3 h-3 md:w-4 md:h-4" /> Achievements
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tight leading-none">
            Our Star <span className="bg-[#FFD600] px-3 py-1 border-4 border-[#111111] shadow-[4px_4px_0px_#111111] transform -rotate-1 inline-block mt-2">Students</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {stars.map((s, i) => (
            <div key={i} className="bg-white border-4 border-[#111111] shadow-[4px_4px_0px_#111111] md:shadow-[8px_8px_0px_#111111] p-4 md:p-8 flex flex-col relative transform transition-transform hover:-translate-y-2">
              <div className="w-full aspect-square bg-gray-100 border-4 border-[#111111] overflow-hidden mb-4 md:mb-6 shadow-[2px_2px_0px_#111111] md:shadow-[4px_4px_0px_#111111]">
                <img src={s.img} alt={s.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" loading="lazy" />
              </div>
              <h4 className="text-lg md:text-2xl font-black text-[#111111] uppercase tracking-tight mb-3 md:mb-4 border-b-2 border-gray-200 pb-3 md:pb-4">{s.name}</h4>
              <p className="text-xs md:text-sm font-bold text-gray-700 leading-relaxed italic">"{s.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CohortPlacementQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", age: "" });

  const questions = [
    {
      q: "1. What is your child's current chess experience?",
      options: [
        { text: "Absolute beginner (Doesn't know the rules)", points: 1 },
        { text: "Knows how pieces move, plays casually", points: 2 },
        { text: "Plays regularly and wants to win tournaments", points: 3 }
      ]
    },
    {
      q: "2. How does your child prefer to learn?",
      options: [
        { text: "Needs 1-on-1 attention to stay focused", points: 1 },
        { text: "Learns well with a peer or a friend", points: 2 },
        { text: "Thrives in a competitive group setting", points: 3 }
      ]
    },
    {
      q: "3. What is your primary goal for them?",
      options: [
        { text: "Reduce screen time and build basic focus", points: 1 },
        { text: "Improve academic performance through logic", points: 2 },
        { text: "Achieve a FIDE rating and win medals", points: 3 }
      ]
    }
  ];

  const handleAnswer = (points: number) => {
    setScore(prev => prev + points);
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setStep(questions.length);
      setAnalyzing(true);
      setTimeout(() => setAnalyzing(false), 2000);
    }
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, I completed the Cohort Placement Quiz.\nName: ${formData.name}\nPhone: ${formData.phone}\nChild's Age: ${formData.age}\nI'd like to book my free trial for the recommended program.`;
    window.open(`https://wa.me/918400979997?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const getPlacement = () => {
    if (score >= 8) return { title: "ADVANCED COMPUTATION BATCH", text: "Your child is ready for intense tactical training. We recommend our Elite 1-on-1 program or our Advanced Tournament Batch to fast-track their FIDE rating.", color: "text-blue-600", bg: "bg-blue-50" };
    if (score >= 5) return { title: "TACTICAL EXECUTION COHORT", text: "They have the basics down. We recommend our Intermediate Group Batch to build positional understanding, healthy competition, and deep-focus habits.", color: "text-green-600", bg: "bg-green-50" };
    return { title: "BASELINE PROTOCOL (BEGINNERS)", text: "This is the perfect starting point. We recommend our Beginner 1-on-1 or Small Group program to gently build their attention span while learning the core mechanics.", color: "text-[#B45309]", bg: "bg-[#FFF4E5]" };
  };

  return (
    <section id="assessments" className="py-20 md:py-24 bg-white border-b-4 border-[#111111] relative overflow-hidden">
      <div className="bg-subtle-grid absolute inset-0 opacity-40" />
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        
        {step === 0 && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white border-2 border-[#111111] text-[#111111] font-black text-[10px] uppercase tracking-[0.2em] px-4 py-2 mb-6 shadow-[2px_2px_0px_#111111]">
              <Users className="w-4 h-4" /> Placement Engine
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.1] mb-6 text-[#111111]">
              Find the exact right program <br className="hidden sm:block"/><span className="bg-[#FFD600] px-2 leading-tight border-2 border-[#111111] shadow-[4px_4px_0px_#111111] transform rotate-1 inline-block mt-2">for your child.</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 font-bold max-w-2xl mx-auto mb-10">
              Not sure whether to choose 1-on-1, Group, Beginner, or Advanced? Take this 3-question placement quiz. We'll match them with the perfect cohort.
            </p>
            <button onClick={() => setStep(1)} className="bg-[#111111] text-[#FFD600] px-8 md:px-12 py-4 md:py-5 font-black text-sm md:text-lg uppercase tracking-widest border-2 border-[#111111] shadow-[6px_6px_0px_#FFD600] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#FFD600] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-3 mx-auto">
              Start Placement Quiz <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step > 0 && step <= questions.length && (
          <div className="bg-white border-4 border-[#111111] shadow-[8px_8px_0px_#111111] md:shadow-[12px_12px_0px_#111111] rounded-sm p-6 md:p-10 text-[#111111] w-full">
            <div className="flex justify-between items-center mb-6 md:mb-8 border-b-2 border-gray-200 pb-4">
              <span className="font-black text-gray-400 uppercase tracking-widest text-[10px] md:text-xs">Question 0{step} of 0{questions.length}</span>
              <div className="flex gap-1 md:gap-2">
                {questions.map((_, i) => (
                  <div key={i} className={`h-1.5 w-6 md:w-8 border border-[#111111] ${i < step ? 'bg-[#FFD600]' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-6 md:mb-8 leading-snug">
              {questions[step - 1].q}
            </h3>
            <div className="space-y-3 md:space-y-4">
              {questions[step - 1].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.points)} className="w-full text-left p-4 md:p-5 border-2 border-gray-300 hover:border-[#111111] hover:bg-[#FFD600]/10 font-bold text-sm md:text-base transition-colors flex items-center justify-between group rounded-sm">
                  {opt.text}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-[#111111] transition-colors shrink-0 ml-4" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step > questions.length && (
          <div className="bg-white border-4 border-[#111111] shadow-[8px_8px_0px_#111111] md:shadow-[12px_12px_0px_#111111] rounded-sm p-6 md:p-10 text-[#111111] text-center w-full">
            {analyzing ? (
              <div className="py-12 md:py-16 flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-[#111111] border-t-[#FFD600] rounded-full animate-spin mb-6" />
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight animate-pulse text-[#111111]">Scanning Cohorts...</h3>
                <p className="text-xs md:text-sm text-gray-500 font-bold mt-2 uppercase tracking-widest">Finding the perfect match</p>
              </div>
            ) : (
              <div className="text-left md:text-center">
                <div className="inline-flex items-center justify-center bg-[#111111] text-[#FFD600] px-4 py-1.5 border-2 border-[#111111] font-black text-[10px] uppercase tracking-[0.2em] mb-6">
                  Match Found
                </div>
                
                <div className={`p-6 md:p-8 border-4 border-[#111111] mb-8 ${getPlacement().bg}`}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Recommended Program:</p>
                  <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 ${getPlacement().color}`}>
                    {getPlacement().title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 font-bold leading-relaxed">
                    {getPlacement().text}
                  </p>
                </div>

                <div className="max-w-md mx-auto border-t-2 border-gray-200 pt-8 mt-8">
                  <h4 className="text-lg md:text-xl font-black uppercase tracking-tight mb-6 text-center">Claim Your Spot In This Cohort</h4>
                  <form onSubmit={handleQuizSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Parent's Name</label>
                      <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-[#111111] outline-none font-bold text-[#111111] text-sm md:text-base rounded-sm" placeholder="e.g. Rahul Sharma" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">WhatsApp Number</label>
                      <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-[#111111] outline-none font-bold text-[#111111] text-sm md:text-base rounded-sm" placeholder="+91" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Child's Age</label>
                      <select required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-2 border-[#111111] outline-none font-bold text-[#111111] text-sm md:text-base rounded-sm appearance-none">
                        <option value="" disabled>Select Age</option>
                        {Array.from({length: 12}, (_, i) => i + 5).map(a => <option key={a} value={a}>{a} Years Old</option>)}
                      </select>
                    </div>
                    <button type="submit" className="w-full mt-4 bg-[#FFD600] text-[#111111] py-4 font-black text-sm md:text-base uppercase tracking-widest border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111111] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2">
                      Book Trial For This Cohort <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </form>
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true } as any);
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-white min-h-screen text-[#111111] font-sans selection:bg-[#FFD600] selection:text-[#111111]">
      <Navbar />
      <TopStrip />
      <Hero />
      <StatBar />
      <ScreenTimeCalculator />
      <GrowthProjector />
      <CohortPlacementQuiz />
      <NeurologicalImpact />
      <Curriculum />
      <Mentors />
      <SuccessStories />
      <StarPerformers />
      <HowAClassWorks />
      <FAQ />
      <Pricing />
      <ContactFormSection />
      <Footer />
      <LiveBookingToast />
      <StickyMobileCTA />
    </div>
  );
}