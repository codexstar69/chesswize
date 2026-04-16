import React, { useState, useEffect, useRef } from "react";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import LiveBookingToast from "../components/layout/LiveBookingToast";
import StickyMobileCTA from "../components/layout/StickyMobileCTA";
import BookingForm from "../components/ui/BookingForm";
import LazyVideo from "../components/ui/LazyVideo";
import EmblaCarousel from "../components/ui/EmblaCarousel";
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
  return <span ref={ref} className="font-display tracking-tight">{isInView ? `${display.toLocaleString()}${suffix}` : `0${suffix}`}</span>;
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
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#0F172A] text-white text-[10px] font-bold uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] hidden md:block">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0F172A]" />
    </div>
  </div>
);

const Badge = ({ icon: Icon, text, subtext }: any) => (
  <div className="flex items-center gap-2 sm:gap-3 bg-[#FAFAFA] bg-noise p-2 sm:p-3 border-2 border-[#0F172A] shadow-brutal-soft hover:-translate-y-1 hover:shadow-premium transition-all cursor-pointer w-full sm:w-auto">
    <div className="w-8 h-8 shrink-0 bg-[#FFD600] flex items-center justify-center border-2 border-[#0F172A] shadow-sm">
      <Icon className="w-4 h-4 text-[#0F172A]" />
    </div>
    <div className="flex flex-col">
      <span className="font-black text-[10px] sm:text-xs uppercase tracking-widest text-[#0F172A] leading-none">{text}</span>
      {subtext && <span className="text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{subtext}</span>}
    </div>
  </div>
);

// ── Components ────────────────────────────────────────────────────────────

function TopStrip() {
  return (
    <div className="bg-[#FFD600] w-full py-2.5 text-center mt-[72px] md:mt-[88px] relative z-40 border-b-2 border-[#0F172A]">
      <p className="text-[#0F172A] text-[9px] md:text-[10px] lg:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em] flex items-center justify-center gap-2 md:gap-3 px-2">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F172A] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F172A]"></span>
        </span>
        🎉 Free Demo Class Available — Book Your Child's First Session Today!
      </p>
    </div>
  );
}

function Hero() {
  

  return (
    <section className="relative pt-8 md:pt-12 pb-16 md:pb-24 bg-[#FAFAFA] border-b-4 border-[#0F172A] overflow-hidden">
      <div className="absolute inset-0 glow-blue opacity-50 pointer-events-none" />
      <div className="bg-subtle-grid absolute inset-0 opacity-60" />
      
      {/* Generated hero background - remove this div to revert */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none">
        <img src="/images/hero-bg-pattern.webp" alt="" className="w-full h-full object-cover" loading="eager" width="1376" height="768" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-12 relative z-10">
        
        {/* Left: Hero Image + Copy */}
        <div className="w-full lg:w-7/12 flex flex-col items-start text-left">
          
          <div className="inline-flex items-center gap-2 md:gap-3 bg-[#FAFAFA] border-2 border-[#0F172A] shadow-brutal-soft p-1 pr-3 md:pr-4 mb-6 md:mb-8">
            <div className="bg-[#FFD600] text-[#0F172A] font-black text-[8px] md:text-[9px] uppercase tracking-widest px-2 py-1">TRUSTED</div>
            <span className="text-[#0F172A] font-bold text-[8px] md:text-[10px] uppercase tracking-wider">1,500+ students trained across 15+ countries since 2017</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3rem] font-black tracking-tighter text-[#0F172A] leading-[1.05] mb-6 md:mb-8 uppercase break-words">
            Professional Online{' '}
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
          
          <div className="flex items-center gap-4 md:gap-6 bg-[#F8FAFC] p-3 md:p-4 border-2 border-[#0F172A] shadow-brutal-soft w-full sm:w-auto">
            <div className="flex -space-x-3 shrink-0">
              {[
                "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-20.png",
                "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-21.png",
                "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-26.png"
              ].map((img, i) => (
                <img key={i} src={img} alt="Parent Testimonial" className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-[#0F172A] object-cover" loading="lazy" />
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 mb-0.5 md:mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current text-[#0F172A]" />)}
              </div>
              <p className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Our Star Parents</p>
            </div>
          </div>
        </div>

        {/* Right: The Diagnostic Entry */}
        <div className="w-full lg:w-5/12 relative mt-6 lg:mt-0">
          {/* Generated hero girl image - visible on mobile, replaces old hero image. Remove this block to revert */}
          <div className="lg:hidden w-full mb-6 rounded-sm overflow-hidden border-4 border-[#0F172A] shadow-brutal-yellow">
            <img src="/images/hero-girl-chess.webp" alt="Young Indian girl smiling while playing chess" className="w-full aspect-[4/3] object-cover" loading="eager" fetchPriority="high" width="896" height="1200" />
          </div>
          <div className="hidden lg:block absolute top-4 -right-4 w-full h-full bg-[#FFD600] border-4 border-[#0F172A]" />
          <div className="bg-[#FAFAFA] border-4 border-[#0F172A] p-6 md:p-10 relative z-10 flex flex-col">
            <div className="flex justify-between items-start border-b-2 border-gray-100 pb-4 md:pb-6 mb-4 md:mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#0F172A] uppercase tracking-tight leading-none mb-1 md:mb-2">Book a Free Demo</h3>
                <p className="text-gray-500 text-[9px] md:text-xs font-bold uppercase tracking-widest">See the difference in one class</p>
              </div>
              <Activity className="w-6 h-6 md:w-8 md:h-8 text-gray-300 shrink-0" />
            </div>
            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              <p className="text-xs md:text-sm font-bold text-gray-700 leading-relaxed">
                Your child gets a live 1-on-1 session with an experienced coach. We assess their level, understand their interests, and show you exactly how we teach.
              </p>
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-start md:items-center gap-2 md:gap-3 text-[10px] md:text-xs font-black text-[#0F172A] uppercase tracking-wide">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 shrink-0 mt-0.5 md:mt-0" /> Live 1-on-1 session with a coach
                </li>
                <li className="flex items-start md:items-center gap-2 md:gap-3 text-[10px] md:text-xs font-black text-[#0F172A] uppercase tracking-wide">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 shrink-0 mt-0.5 md:mt-0" /> Understand your child's current level
                </li>
                <li className="flex items-start md:items-center gap-2 md:gap-3 text-[10px] md:text-xs font-black text-[#0F172A] uppercase tracking-wide">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 shrink-0 mt-0.5 md:mt-0" /> Get a personalised learning plan
                </li>
              </ul>
            </div>
            <BookingForm buttonTheme="dark" buttonText="Book Free Demo Class" />
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
    <section id="assessments" className="py-16 md:py-24 bg-[#0F172A] text-white border-b-4 border-[#FFD600] relative overflow-hidden">
      <div className="absolute inset-0 bg-subtle-grid opacity-10" />
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        
        {step === 0 && (
          <div className="text-center">
            {/* Generated quiz child image - remove this block to revert */}
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#FFD600] shadow-brutal-yellow">
              <img src="/images/quiz-child-thinking.webp" alt="Child thinking about chess" className="w-full h-full object-cover" loading="lazy" width="1024" height="1024" />
            </div>
            <div className="inline-flex items-center gap-2 bg-[#0F172A] border-2 border-gray-800 text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] px-4 py-2 mb-6">
              <Search className="w-4 h-4" /> Quick Assessment
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1.1] mb-6">
              Is your child ready <br className="hidden sm:block"/><span className="text-[#FFD600] bg-gray-900 px-2 leading-tight">for chess?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-400 font-bold max-w-2xl mx-auto mb-10">
              Answer 5 simple questions about your child. We'll tell you which program is the best fit — and whether chess can help with the challenges you're facing.
            </p>
            <button onClick={() => setStep(1)} className="bg-[#FAFAFA] text-[#0F172A] px-8 md:px-12 py-4 md:py-5 font-black text-sm md:text-lg uppercase tracking-widest border-4 border-[#0F172A] shadow-brutal-yellow hover:translate-y-[2px] hover:shadow-brutal-yellow active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-3 mx-auto">
              Take the Quiz <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">5 Questions • Takes 30 Seconds • Instant Result</p>
          </div>
        )}

        {step > 0 && step <= questions.length && (
          <div className="bg-[#FAFAFA] border-4 border-[#FFD600] shadow-brutal-yellow md:shadow-brutal-yellow rounded-sm p-6 md:p-12 text-[#0F172A] w-full">
            <div className="flex justify-between items-center mb-6 md:mb-8 border-b-2 border-gray-200 pb-4">
              <span className="font-black text-gray-400 uppercase tracking-widest text-[10px] md:text-xs">Question 0{step} of 0{questions.length}</span>
              <div className="flex gap-1 md:gap-2">
                {questions.map((_, i) => (
                  <div key={i} className={`h-1.5 w-6 md:w-8 border border-[#0F172A] ${i < step ? 'bg-[#FFD600]' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>
            <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight mb-6 md:mb-8 leading-snug">
              {questions[step - 1].q}
            </h3>
            <div className="space-y-3 md:space-y-4">
              {questions[step - 1].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.points)} className="w-full text-left p-4 md:p-6 border-2 border-gray-300 hover:border-[#0F172A] hover:bg-[#F8FAFC] font-bold text-sm md:text-lg transition-colors flex items-center justify-between group rounded-sm">
                  {opt.text}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-[#0F172A] transition-colors shrink-0 ml-4" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step > questions.length && (
          <div className="bg-[#FAFAFA] border-4 border-[#FFD600] shadow-brutal-yellow md:shadow-brutal-yellow rounded-sm p-6 md:p-12 text-[#0F172A] text-center w-full">
            {analyzing ? (
              <div className="py-16 md:py-24 flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-gray-200 border-t-[#FFD600] rounded-full animate-spin mb-6" />
                <span className="font-black text-gray-400 uppercase tracking-widest text-[10px] md:text-xs">Analyzing Responses...</span>
                <p className="text-xs md:text-sm text-gray-500 font-bold mt-2 uppercase tracking-widest">Finding the best program for your child</p>
              </div>
            ) : (
              <div className="text-left md:text-center">
                <div className="inline-flex items-center justify-center bg-[#0F172A] text-[#FFD600] px-4 py-1.5 border-2 border-[#0F172A] font-black text-[10px] uppercase tracking-[0.2em] mb-6">
                  Analysis Complete
                </div>
                
                <div className={`p-6 md:p-8 border-4 border-[#0F172A] mb-8 ticket-edge ${getDiagnosis().bg}`}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Diagnostic Result:</p>
                  <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-tight mb-4 ${getDiagnosis().color}`}>
                    {getDiagnosis().title}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-700 font-bold leading-relaxed">
                    {getDiagnosis().text}
                  </p>
                  <div className="mt-6 p-4 bg-[#FAFAFA] border-2 border-dashed border-gray-300 text-xs md:text-sm font-bold text-gray-600">
                    <span className="text-[#0F172A] font-black uppercase">What we recommend:</span> Start with a free demo class. Our coach will work with your child 1-on-1 and create a personalised learning roadmap.
                  </div>
                </div>

                <div className="max-w-md mx-auto border-t-2 border-gray-200 pt-8 mt-8">
                  <h4 className="text-lg md:text-xl font-black uppercase tracking-tight mb-6 text-center">Book Your Free Demo Class</h4>
                  <BookingForm buttonTheme="dark" buttonText="Unlock Report & Book Demo" />
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
    <section id="methodology" className="py-16 md:py-24 bg-[#FAFAFA] border-b-4 border-[#0F172A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16">
            <h2 className="text-xs md:text-sm font-black text-gray-400 uppercase tracking-widest mb-3 md:mb-4">Why Chess Works</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.1]">
              Chess doesn't just teach moves. <br className="sm:hidden" /><span className="text-white bg-[#0F172A] px-2 py-1 transform inline-block rotate-1 mt-1 sm:mt-0">It builds brains.</span>
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
              <div className="flex flex-col h-full bg-[#F8FAFC] border-4 border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft overflow-hidden">
              {/* Generated card image - remove img tag to revert */}
              <div className="w-full h-40 md:h-48 overflow-hidden border-b-4 border-[#0F172A]">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5 md:p-8 flex flex-col flex-1">
                <span className="text-[8px] md:text-[10px] font-black text-[#FFD600] bg-[#0F172A] w-fit px-2 md:px-3 py-1 uppercase tracking-widest mb-4 md:mb-6">{item.step}</span>
                <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 md:mb-4 text-[#0F172A]">{item.title}</h4>
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
    <section id="curriculum" className="py-16 md:py-24 bg-[#F8FAFC] border-b-4 border-[#0F172A] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0F172A] border-2 border-gray-800 text-gray-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6">
            <BookOpen className="w-3 h-3 md:w-4 md:h-4" /> Academic Structure
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] uppercase tracking-tight mb-4 md:mb-6">
            A Curriculum Built On <span className="text-[#FFD600] inline-block border-b-4 border-[#0F172A]">Outcomes</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-600 font-bold max-w-2xl mx-auto">Age-appropriate programs that take your child from "I don't know the rules" to "I just won my first tournament" — step by step.</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {programs.map((p, i) => (
            <div key={i} className={`bg-[#FAFAFA] border-4 border-[#0F172A] rounded-sm overflow-hidden shadow-brutal-soft md:shadow-brutal-soft transition-all cursor-pointer ${openIndex === i ? 'md:translate-x-2 md:-translate-y-2 md:shadow-brutal-yellow' : 'hover:-translate-y-1'}`} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              <div className="p-4 md:p-8 flex justify-between items-center bg-[#FAFAFA] z-10 relative border-b-4 border-transparent">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                  <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 bg-[#FFD600] border-2 border-[#0F172A] items-center justify-center font-display font-black text-lg md:text-xl shrink-0 shadow-sm">
                    0{i+1}
                  </div>
                  <div>
                    <div className="flex items-center flex-wrap gap-2 md:gap-3 mb-1">
                      <span className="sm:hidden text-lg font-black text-[#FFD600] mr-1">0{i+1}</span>
                      <h3 className="text-lg md:text-2xl font-black text-[#0F172A] uppercase leading-none">{p.level}</h3>
                      <span className="text-[8px] md:text-[10px] font-black px-2 py-1 bg-[#0F172A] text-white uppercase tracking-widest">{p.badge}</span>
                    </div>
                  </div>
                </div>
                <div className={`w-8 h-8 md:w-10 md:h-10 border-2 border-[#0F172A] flex items-center justify-center transition-colors shrink-0 ${openIndex === i ? 'bg-[#FFD600]' : 'bg-gray-100'}`}>
                  <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 text-[#0F172A] transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                </div>
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t-4 border-[#0F172A] bg-[#F8FAFC]">
                    <div className="p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {p.details.map((detail, j) => (
                        <div key={j} className="flex items-start gap-2 md:gap-3">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0" />
                          <span className="text-xs md:text-sm text-[#0F172A] font-bold leading-snug">{detail}</span>
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
    { name: "Tarun Sir", role: "Founder & Head Coach", rating: "FIDE Rated", img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-20.png", focus: "Strategy & Mentorship", exp: "7+", students: "1,500+", achievement: "Built ChessWize from 3 students to a 15-country academy", desc: "FIDE-rated player and the driving force behind ChessWize. Tarun Sir personally designed the level-based curriculum used across all batches. Known for his ability to spot a child's unique strengths within the first session, he has coached students who've gone on to win state championships, FIDE-rated tournaments, and national-level medals. Parents describe him as 'the coach who actually cares.'" },
    { name: "Coach Priya", role: "Beginner & Junior Specialist", rating: "Rated", img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-26.png", focus: "Young Learners (Ages 5-8)", exp: "5+", students: "400+", achievement: "100% retention rate in her beginner batches", desc: "Priya makes chess feel like a game, not a class. She uses storytelling, character-based piece introductions, and mini-challenges to keep 5-8 year olds engaged for the full 45 minutes. Parents of shy or first-time learners specifically request her. She's trained over 400 young beginners, many of whom moved up to intermediate within 4 months." },
    { name: "Coach Arjun", role: "Advanced & Tournament Coach", rating: "FIDE Rated", img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-21.png", focus: "FIDE Rating & Competitions", exp: "8+", students: "300+", achievement: "12 students achieved FIDE ratings under his coaching", desc: "Arjun is the coach serious players ask for. With deep expertise in opening theory, positional play, and endgame technique, he prepares students for FIDE-rated and national-level tournaments. His students have collectively won 30+ medals at state and national events. He runs weekly mock tournaments and post-game analysis sessions that simulate real competition pressure." },
  ];

  return (
    <section id="faculty" className="py-16 md:py-24 bg-[#F8FAFC] border-b-4 border-[#0F172A]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0F172A] border-2 border-gray-800 text-gray-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6">
            <Users className="w-3 h-3 md:w-4 md:h-4" /> Our Coaches
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] uppercase tracking-tight">
            Your child learns from <br className="hidden sm:block"/> <span className="bg-[#FFD600] px-2 md:px-3 py-1 transform inline-block rotate-1 border-4 border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft mt-2 md:mt-4">experienced coaches.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {coaches.map((c, i) => (
            <div key={i} className="bg-[#FAFAFA] rounded-sm border-4 border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft overflow-hidden flex flex-col transform transition-transform hover:-translate-y-2">
              <div className="h-56 md:h-72 overflow-hidden border-b-4 border-[#0F172A] relative">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" loading="lazy" />
                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-[#FFD600] text-[#0F172A] text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-2 md:px-3 py-1 md:py-1.5 border-2 border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft">
                  FIDE {c.rating}
                </div>
              </div>
              <div className="p-4 md:p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl md:text-2xl font-black text-[#0F172A] uppercase">{c.name}</h3>
                  <span className="text-[#FFD600] font-black text-xs bg-[#0F172A] px-2 py-0.5">{c.exp} Yrs</span>
                </div>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-3">{c.role}</p>
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="text-[8px] md:text-[9px] font-black px-2 py-0.5 bg-green-100 text-green-700 border border-green-300 uppercase tracking-widest">{c.students} Students</span>
                  <span className="text-[8px] md:text-[9px] font-black px-2 py-0.5 bg-blue-100 text-blue-700 border border-blue-300 uppercase tracking-widest">{c.rating}</span>
                </div>
                <p className="text-xs md:text-sm font-bold text-gray-600 leading-relaxed mb-4 flex-1">{c.desc}</p>
                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-wider text-[#0F172A] bg-[#FFF4E5] p-2 md:p-3 border-2 border-[#0F172A] rounded-sm">
                    <Target className="w-3 h-3 md:w-4 md:h-4 text-[#B45309] shrink-0" /> <span className="truncate">Specialty: {c.focus}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[10px] md:text-xs font-black uppercase tracking-wider text-green-700 bg-green-50 p-2 md:p-3 border-2 border-green-200 rounded-sm">
                    <Award className="w-3 h-3 md:w-4 md:h-4 text-green-600 shrink-0 mt-0.5" /> <span>{c.achievement}</span>
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

function HowAClassWorks() {
  const steps = [
    { icon: <Monitor className="w-6 h-6 md:w-8 md:h-8" />, title: "Join via Zoom", time: "2 min setup", desc: "Your child logs in from home — all they need is a laptop or tablet with internet. Parents receive a Zoom link on WhatsApp 30 minutes before class. Camera is optional for shy kids; many start audio-only and turn on video once they're comfortable.", parent: "You'll get a reminder + link on WhatsApp so you never miss a session." },
    { icon: <Users className="w-6 h-6 md:w-8 md:h-8" />, title: "Meet the Coach", time: "First 5 min", desc: "A friendly, experienced coach greets your child by name and starts with a quick warm-up puzzle to get their brain engaged. For first-timers, the coach spends extra time making them feel safe — no pressure, no judgement, just fun.", parent: "Parents can sit in for the first few classes. Most kids are independent by session 3." },
    { icon: <Puzzle className="w-6 h-6 md:w-8 md:h-8" />, title: "Learn & Play", time: "35 min core", desc: "The main lesson covers a specific concept — like forks, pins, or checkmate patterns — using a shared interactive board on Lichess. The coach explains, demonstrates, then lets your child try. Every session includes at least one live game where the coach watches and gives real-time tips.", parent: "Lessons are structured by level. Your child is never overwhelmed or bored." },
    { icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />, title: "Homework & Progress", time: "After class", desc: "After class, your child gets 3-5 fun puzzles matched to what they learned. These take about 10-15 minutes and reinforce the lesson. Parents receive a WhatsApp message summarising what was covered, how the child performed, and what to practice.", parent: "You'll always know exactly where your child stands — no guessing." },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC] border-b-4 border-[#0F172A] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FFD600] border-4 border-[#0F172A] text-[#0F172A] font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6 shadow-brutal-soft">
            <BookOpen className="w-3 h-3 md:w-4 md:h-4" /> Inside a Class
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] uppercase tracking-tight leading-none">
            Here's what a <span className="text-[#FFD600] bg-[#0F172A] px-2 md:px-3 py-1 inline-block transform -rotate-1 border-2 border-[#0F172A]">class looks like</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="bg-[#FAFAFA] border-4 border-[#0F172A] p-5 md:p-6 shadow-brutal-soft md:shadow-brutal-soft h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FFD600] border-4 border-[#0F172A] flex items-center justify-center shadow-brutal-soft">
                    {step.icon}
                  </div>
                  <span className="text-[8px] md:text-[9px] font-black text-white bg-[#0F172A] px-2 py-1 uppercase tracking-widest">{step.time}</span>
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Step {i + 1}</div>
                <h3 className="text-lg md:text-xl font-black text-[#0F172A] uppercase tracking-tight mb-2">{step.title}</h3>
                <p className="text-xs md:text-sm font-bold text-gray-600 leading-relaxed mb-4 flex-1">{step.desc}</p>
                <div className="mt-auto pt-3 border-t-2 border-dashed border-gray-200">
                  <p className="text-[9px] md:text-[10px] font-black text-green-700 uppercase tracking-wider flex items-start gap-1.5">
                    <ShieldCheck className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0 mt-0.5" /> {step.parent}
                  </p>
                </div>
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
        <div className="w-full max-w-3xl mx-auto mt-10 md:mt-14 rounded-sm overflow-hidden border-4 border-[#0F172A] shadow-brutal-yellow md:shadow-brutal-yellow">
          <img src="/images/online-class-laptop.webp" alt="What an online chess class looks like on Zoom" className="w-full aspect-video object-cover" loading="lazy" width="1376" height="768" />
          <div className="bg-[#0F172A] px-4 py-2 text-center">
            <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">A real ChessWize class in progress — live on Zoom</p>
          </div>
        </div>

        <div className="text-center mt-10 md:mt-14">
          <button onClick={scrollToForm} className="bg-[#FFD600] text-[#0F172A] px-8 md:px-12 py-4 md:py-5 font-black uppercase tracking-widest text-sm md:text-base border-4 border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft hover:translate-y-[2px] hover:shadow-brutal-soft active:translate-y-[4px] active:shadow-none transition-all inline-flex items-center gap-2">
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
    { q: "How do I know my child is actually improving?", a: "After every class, your coach sends a WhatsApp summary — what was taught, how your child performed, and what to practice. Monthly, you get a detailed progress report covering puzzles solved, concepts mastered, rating changes, and areas to work on. You'll never have to guess." },
    { q: "What if my child is too shy or introverted?", a: "Many of our best students started as shy kids. Camera is optional for the first few sessions. Coaches are trained to gently encourage participation without pressure. Most shy children start unmuting and engaging by week 2-3. Chess actually helps introverted kids build confidence because success comes from thinking, not talking." },
    { q: "Is chess really better than coding or math classes for brain development?", a: "They develop different skills, but chess has a unique advantage: it builds focus, patience, and emotional regulation simultaneously. Research from the University of Memphis found chess-playing students scored 17% higher in reading and maths. Unlike coding, chess requires zero screen-based creation — it's pure strategic thinking. Many parents enrol their kids in both chess and coding, and find chess improves their performance in everything else." },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-[#FAFAFA] border-b-4 border-[#0F172A]">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0F172A] border-2 border-gray-800 text-gray-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6">
            <HelpCircle className="w-3 h-3 md:w-4 md:h-4" /> Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] uppercase tracking-tight leading-none">
            Parents always <span className="text-[#FFD600]">ask us</span>
          </h2>
        </div>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`border-4 border-[#0F172A] transition-all ${open === i ? 'shadow-brutal-yellow md:shadow-brutal-yellow' : 'shadow-brutal-soft md:shadow-brutal-soft'}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 md:p-5 bg-[#FAFAFA] hover:bg-[#F8FAFC] transition-colors text-left"
              >
                <span className="font-black text-sm md:text-base text-[#0F172A] uppercase tracking-tight pr-4">{faq.q}</span>
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
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#0F172A] text-white px-6 md:px-8 py-3 md:py-4 font-black uppercase tracking-widest text-xs md:text-sm border-4 border-[#0F172A] shadow-brutal-yellow hover:translate-y-[2px] hover:shadow-brutal-yellow active:translate-y-[4px] active:shadow-none transition-all">
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
    <section id="pricing" className="py-16 md:py-24 bg-[#0F172A] text-white border-b-4 border-[#FFD600]">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 md:mb-6">
            Affordable plans that <br className="sm:hidden" /><span className="bg-[#FFD600] text-[#0F172A] px-2 md:px-3 py-1 transform inline-block -rotate-1 border-2 border-[#0F172A] mt-2 sm:mt-0">fit your budget.</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-400 font-bold">Less than the cost of a math tutor. More impact on their future.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 max-w-4xl mx-auto px-2 sm:px-0">
          {plans.map((plan, i) => (
            <div key={i} className={`bg-[#FAFAFA] rounded-sm p-5 md:p-8 border-4 border-transparent relative transition-transform ${plan.popular ? "border-[#FFD600] shadow-brutal-yellow md:shadow-brutal-yellow sm:-translate-y-4" : "border-gray-700 shadow-[6px_6px_0px_#333333] sm:mt-4"}`}>
              {plan.popular && (
                <div className="absolute -top-4 md:-top-5 left-1/2 transform -translate-x-1/2 bg-[#FFD600] text-[#0F172A] font-black px-4 md:px-6 py-1.5 md:py-2 border-4 border-[#0F172A] text-[10px] md:text-sm uppercase tracking-widest shadow-brutal-soft whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] uppercase mb-3 md:mb-4 text-center mt-2 md:mt-0">{plan.name}</h3>
              <div className="text-center mb-4 md:mb-6">
                <span className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tighter">{plan.price}</span>
                <span className="text-gray-500 font-bold ml-1 text-sm md:text-base">{plan.period}</span>
              </div>
              <div className="text-center bg-[#FFF4E5] border-2 border-[#0F172A] text-[#B45309] font-black text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 w-fit mx-auto mb-8 md:mb-10 uppercase tracking-widest shadow-brutal-soft">
                Only {plan.classPrice}
              </div>
              <ul className="space-y-4 md:space-y-5 mb-8 md:mb-12">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start md:items-center gap-3 md:gap-4 text-sm md:text-base font-bold text-gray-800 leading-snug">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0 mt-0.5 md:mt-0" /> {feature}
                  </li>
                ))}
              </ul>
              <button onClick={scrollToForm} className={`w-full py-4 md:py-5 font-black uppercase tracking-widest text-sm md:text-lg border-4 border-[#0F172A] transition-transform shadow-brutal-soft md:shadow-brutal-soft hover:translate-y-[2px] hover:shadow-brutal-soft md:hover:shadow-brutal-soft active:translate-y-[4px] md:active:translate-y-[6px] active:shadow-none rounded-sm ${plan.popular ? 'bg-[#FFD600] text-[#0F172A]' : 'bg-[#0F172A] text-white'}`}>
                Lock This Price
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-10 md:mt-16 bg-[#0F172A] border-4 border-[#FFD600] p-5 md:p-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 md:gap-8 shadow-brutal-yellow md:shadow-brutal-yellow text-center sm:text-left">
          <div className="w-14 h-14 md:w-20 md:h-20 bg-[#FFD600] border-4 border-[#0F172A] shrink-0 flex items-center justify-center shadow-brutal-soft">
            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-[#0F172A]" />
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
    <section id={FORM_SECTION_ID} className="py-16 md:py-24 bg-[#FAFAFA] border-b-4 border-[#0F172A] relative overflow-hidden">
      <div className="bg-subtle-grid absolute inset-0 opacity-40" />
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-12 md:gap-16 items-center relative z-10">
        
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="inline-flex items-center justify-center lg:justify-start gap-2 bg-green-100 text-green-700 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6 border-2 border-[#0F172A] shadow-brutal-soft">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" /> Free Demo Available
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0F172A] uppercase tracking-tight mb-6 md:mb-8 leading-none">
            Your child is one class away from <br className="hidden sm:block lg:hidden"/><span className="bg-[#FFD600] px-2 py-1 transform inline-block -rotate-1 border-4 border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft mt-2">loving chess.</span>
          </h2>
          <p className="text-base md:text-xl text-gray-700 font-bold mb-8 md:mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Fill in your details and we'll call you within 2 hours to schedule your child's free demo class. No payment needed.
          </p>

          {/* Generated parent-child image - smaller, beside copy. Remove this block to revert */}
          <div className="hidden lg:block w-full max-w-xs mx-auto lg:mx-0 mb-8 rounded-sm overflow-hidden border-4 border-[#0F172A] shadow-brutal-yellow">
            <img src="/images/parent-child-chess.webp" alt="Mother and child bonding over a chess game" className="w-full aspect-[4/3] object-cover" loading="lazy" width="896" height="1200" />
          </div>
          
          <div className="space-y-4 md:space-y-6 max-w-sm mx-auto lg:mx-0">
            <div className="flex items-center gap-4 md:gap-6 bg-[#FAFAFA] p-4 md:p-6 border-4 border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft text-left">
              <Phone className="w-6 h-6 md:w-8 md:h-8 text-[#0F172A] shrink-0" />
              <div>
                <p className="font-black text-gray-400 uppercase tracking-widest text-[10px] md:text-xs mb-0.5 md:mb-1">Call or WhatsApp Us</p>
                <p className="font-black text-xl md:text-2xl text-[#0F172A]">+91-8400979997</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="bg-[#FAFAFA] p-6 sm:p-8 md:p-12 border-4 border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft relative mt-4 md:mt-0">
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-[#0F172A] text-[#FFD600] font-black uppercase tracking-widest text-[10px] md:text-xs px-3 md:px-5 py-2 md:py-3 border-4 border-[#0F172A] transform rotate-3 shadow-brutal-yellow">
              Fast-Track
            </div>
            <div className="mt-2 md:mt-4">
              <BookingForm buttonTheme="yellow" buttonText="Book Free Demo Class" />
              <p className="text-[8px] md:text-[10px] text-center font-black uppercase text-gray-400 tracking-widest mt-3 md:mt-4">We'll call you within 2 hours • No spam, ever.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
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
    <div className="bg-[#0F172A] py-8 border-b-4 border-[#FFD600]">
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
    <section className="py-16 md:py-24 bg-[#FAFAFA] border-b-4 border-[#0F172A] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6 border-2 border-[#0F172A] shadow-brutal-soft">
            <LineChart className="w-3 h-3 md:w-4 md:h-4" /> Every Parent Should See This
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#0F172A] uppercase tracking-tight mb-4 md:mb-6 leading-none">
            What if that <span className="text-red-500">screen time</span> became <span className="text-green-600">chess time?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-600 font-bold max-w-2xl mx-auto">
            Most kids spend 10-20 hours a week on phones. Imagine if even half of that went into learning chess. Here's what that looks like.
          </p>
        </div>

        {/* Generated phone-vs-chess banner - remove this block to revert */}
        <div className="w-full max-w-4xl mx-auto mb-10 md:mb-14 rounded-sm overflow-hidden border-4 border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft">
          <img src="/images/phone-vs-chess.webp" alt="Screen time vs chess time — the contrast" className="w-full aspect-[21/9] object-cover" loading="lazy" width="1584" height="672" />
        </div>

        <div className="bg-[#F8FAFC] border-4 border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft p-5 sm:p-8 md:p-12 rounded-sm max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
          
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <label className="text-xs md:text-sm font-black text-gray-500 uppercase tracking-widest mb-4 md:mb-6 block text-center md:text-left">
              Weekly Screen Time: <span className="text-xl md:text-2xl text-[#0F172A] ml-2 block sm:inline mt-1 sm:mt-0">{hours} hrs</span>
            </label>
            <input 
              type="range" 
              min="2" 
              max="40" 
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="w-full h-3 md:h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0F172A]"
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
            
            <div className="bg-[#FAFAFA] border-2 border-[#0F172A] p-4 md:p-5 shadow-brutal-soft transform transition-transform hover:-translate-y-1">
              <p className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Hours of Focused Learning (Per Year)</p>
              <p className="text-3xl md:text-4xl font-black text-[#0F172A]">{lostHoursYear}</p>
            </div>
            
            <div className="bg-[#FAFAFA] border-2 border-[#0F172A] p-4 md:p-5 shadow-brutal-soft transform transition-transform hover:-translate-y-1">
              <p className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Chess Puzzles & Patterns Learned</p>
              <p className="text-3xl md:text-4xl font-black text-green-500">{skillsMastered}+</p>
            </div>
            
            <button onClick={scrollToForm} className="w-full bg-[#0F172A] text-[#FFD600] py-3 md:py-4 font-black text-sm md:text-lg uppercase tracking-widest border-2 border-[#0F172A] shadow-brutal-yellow md:shadow-brutal-yellow hover:translate-y-[2px] hover:shadow-brutal-yellow md:hover:shadow-brutal-yellow active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 md:gap-3">
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
    <section className="py-16 md:py-24 bg-[#0F172A] text-white border-b-4 border-[#FFD600] relative">
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
          <div className="bg-[#FAFAFA] rounded-sm p-6 md:p-8 border-4 border-[#FFD600] shadow-brutal-yellow md:shadow-brutal-yellow text-[#0F172A] relative z-10">
            <div className="absolute -top-4 -left-4 md:-top-5 md:-left-5 bg-[#0F172A] text-white font-black px-3 md:px-4 py-1.5 md:py-2 border-2 border-[#FFD600] text-[10px] md:text-xs uppercase tracking-widest">
              Live Projection
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-6 md:gap-8 mb-8 md:mb-10 border-b-2 border-gray-200 pb-6 md:pb-8 text-center sm:text-left">
              <div>
                <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Rating</p>
                <div className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tighter">
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

            <div className="h-32 md:h-48 w-full flex items-end gap-1 md:gap-2 border-l-2 border-b-2 border-[#0F172A] pt-4 pr-2 pb-0 pl-0 relative">
              {Array.from({ length: 12 }).map((_, i) => {
                const isActive = i < (months / 2);
                const height = Math.max(10, (i + 1) * (i + 1) * 0.7); // exponential curve
                return (
                  <div key={i} className="flex-1 flex flex-col justify-end h-full relative group">
                    <motion.div 
                      initial={false}
                      animate={{ height: `${height}%`, backgroundColor: isActive ? '#FFD600' : '#E5E7EB' }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="w-full border-t-2 border-r-2 border-[#0F172A] rounded-tr-sm"
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
      title: "Mother of Aadvik (Age 8) · Lucknow", 
      quote: "Aadvik couldn't sit still for 10 minutes before ChessWize. After 3 months with Tarun Sir, he learned forks, pins, and basic endgames — and his school teacher told us his maths concentration has improved dramatically. He went from zero chess knowledge to winning his school's inter-house tournament!" 
    },
    { 
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-21.png", 
      name: "Monika", 
      title: "Mother of Anika (Age 11) · Kanpur", 
      quote: "Anika was spending 3+ hours daily on her phone. We enrolled her in ChessWize as an experiment. Within 6 weeks, she was solving 15 tactical puzzles a day on her own — voluntarily! Her screen time dropped to under 45 minutes. The coaches taught her the Sicilian Defense and she used it to win her first district-level tournament." 
    },
    { 
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-26.png", 
      name: "Anjana", 
      title: "Mother of Ishita (Age 6) · Mumbai", 
      quote: "I was worried Ishita was too young for chess. But the beginner batch made it so playful — they used stories to teach how each piece moves. By month 2, she was checkmating me! Her coach sends us a WhatsApp progress update after every single class. That level of care is rare." 
    },
    { 
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-20.png", 
      name: "Vikram", 
      title: "Father of Arjun (Age 13) · Bangalore", 
      quote: "Arjun was already playing chess casually, but had no structure. ChessWize gave him a proper opening repertoire, taught him positional concepts like outposts and pawn structures, and prepared him for FIDE-rated tournaments. He went from unrated to 1250 ELO in 8 months. The Advanced batch is seriously rigorous." 
    },
    { 
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-26.png", 
      name: "Priya", 
      title: "Mother of Diya (Age 9) · Hyderabad", 
      quote: "Diya is a shy child and I was nervous about online classes. But her coach was so patient — camera was optional for the first few sessions. By week 3, Diya was unmuting herself to answer puzzle questions. She's now solved over 500 puzzles on Lichess and recently placed 3rd in a state-level U-10 event. Chess gave her confidence nothing else could." 
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0F172A] border-b-4 border-[#FFD600] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#FFD600] border-2 border-[#0F172A] shadow-brutal-soft text-[#0F172A] font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6">
            <Quote className="w-3 h-3 md:w-4 md:h-4" /> Verified Reviews
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
            Parents Across India <br className="hidden sm:block"/>❤️ <span className="text-[#FFD600] underline decoration-[#FFD600] decoration-4 underline-offset-4 md:underline-offset-8">ChessWize</span>
          </h3>
        </div>

        {/* Video Testimonials - Embla carousel on mobile, 4-col grid on desktop */}
        <div className="mb-16 md:mb-20">
          <h4 className="text-center text-xs md:text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Hear Directly From Parents</h4>
          <EmblaCarousel desktopGrid desktopCols={4}>
            {[
              "/20250924_224436.mp4",
              "/VID-20250914-WA0001.mp4",
              "/VID-20250916-WA0013.mp4",
              "/VID-20251006-WA0003.mp4"
            ].map((src, i) => (
              <div key={i} className="bg-[#0F172A] border-4 border-[#FFD600] shadow-brutal-yellow rounded-sm overflow-hidden aspect-[9/16]">
                <LazyVideo src={src} className="w-full h-full" />
              </div>
            ))}
          </EmblaCarousel>
        </div>

        {/* Written Testimonials - Embla carousel on mobile, grid on desktop */}
        <EmblaCarousel desktopGrid desktopCols={3}>
          {testimonials.map((t, i) => (
            <div key={i} className="relative group h-full">
              <div className="absolute inset-0 bg-[#FFD600] translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3 rounded-sm" />
              <div className="absolute inset-0 bg-[#FFD600]/50 translate-x-1 translate-y-1 md:translate-x-1.5 md:translate-y-1.5 rounded-sm" />
              <div className="relative bg-[#FAFAFA] rounded-sm border-2 border-[#0F172A] p-4 md:p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <img src={t.img} alt={t.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#0F172A] object-cover shrink-0" loading="lazy" />
                  <div>
                    <p className="font-black text-[#0F172A] text-sm uppercase leading-tight">{t.name}</p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{t.title}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 text-[#0F172A] mb-3">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="font-bold text-[#0F172A] text-xs md:text-sm leading-relaxed italic flex-1">"{t.quote}"</p>
              </div>
            </div>
          ))}
        </EmblaCarousel>
      </div>
    </section>
  );
}

function StarPerformers() {
  const stars = [
    { 
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-30.png", 
      name: "Mikaeel", 
      age: "Age 10",
      badges: ["FIDE Rated 1180+", "3 Tournament Wins"],
      timeline: "Joined as beginner in Mar 2023 → Won district championship by Nov 2023",
      quote: "We are extremely grateful to ChessWize and Tarun Sir for the incredible guidance. Mikaeel went from not knowing how to castle to winning his first FIDE-rated tournament in just 8 months. His rating jumped from unrated to 1180+, and he now studies openings on his own every morning before school." 
    },
    { 
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-28.png", 
      name: "Saanvika", 
      age: "Age 9",
      badges: ["5 Tournament Wins", "State Champion U-10"],
      timeline: "Joined intermediate batch in Jan 2023 → State champion by Dec 2023",
      quote: "Enrolling Saanvika in ChessWize has been one of the best decisions we made. Tarun Sir's coaching helped her master tactical patterns like discovered attacks and back-rank mates. Since joining, Saanvika has won five tournaments including the UP State Championship U-10 — and her school grades went up too!" 
    },
    { 
      img: "https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-29.png", 
      name: "Avyukt", 
      age: "Age 7",
      badges: ["Fastest Promotion", "200+ Puzzles Solved"],
      timeline: "Joined beginner batch in Jun 2024 → Moved to intermediate in just 10 weeks",
      quote: "Avyukt started at the absolute basic level — he didn't even know how the knight moves. His coach recognised his pattern-recognition ability early and gave him extra puzzle challenges. In just 10 weeks, he solved over 200 puzzles on Lichess and was promoted to the intermediate batch — the fastest promotion in ChessWize history!" 
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC] border-b-4 border-[#0F172A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#0F172A] border-2 border-gray-800 text-gray-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6">
            <Award className="w-3 h-3 md:w-4 md:h-4" /> Achievements
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] uppercase tracking-tight leading-none">
            Our Star <span className="bg-[#FFD600] px-3 py-1 border-4 border-[#0F172A] shadow-brutal-soft transform -rotate-1 inline-block mt-2">Students</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {stars.map((s, i) => (
            <div key={i} className="bg-[#FAFAFA] border-4 border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft p-4 md:p-8 flex flex-col h-full relative transform transition-transform hover:-translate-y-2">
              <div className="w-full aspect-square bg-gray-100 border-4 border-[#0F172A] overflow-hidden mb-4 md:mb-6 shadow-brutal-soft md:shadow-brutal-soft shrink-0">
                <img src={s.img} alt={s.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" loading="lazy" />
              </div>
              <div className="flex items-center justify-between mb-2 shrink-0">
                <h4 className="text-lg md:text-2xl font-black text-[#0F172A] uppercase tracking-tight">{s.name}</h4>
                <span className="text-[9px] md:text-[10px] font-black px-2 py-1 bg-[#0F172A] text-white uppercase tracking-widest">{s.age}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3 shrink-0">
                {s.badges.map((b, j) => (
                  <span key={j} className="text-[8px] md:text-[9px] font-black px-2 py-0.5 bg-[#FFD600] text-[#0F172A] border border-[#0F172A] uppercase tracking-widest">{b}</span>
                ))}
              </div>
              <div className="text-[9px] md:text-[10px] font-black text-green-700 bg-green-50 border border-green-200 px-3 py-2 mb-4 uppercase tracking-wider shrink-0">
                <TrendingUp className="w-3 h-3 inline mr-1.5 -mt-0.5" />{s.timeline}
              </div>
              <p className="text-xs md:text-sm font-bold text-gray-700 leading-relaxed italic flex-1">"{s.quote}"</p>
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
    <section id="assessments" className="py-20 md:py-24 bg-[#FAFAFA] border-b-4 border-[#0F172A] relative overflow-hidden">
      <div className="bg-subtle-grid absolute inset-0 opacity-40" />
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        
        {step === 0 && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#FAFAFA] border-2 border-[#0F172A] text-[#0F172A] font-black text-[10px] uppercase tracking-[0.2em] px-4 py-2 mb-6 shadow-brutal-soft">
              <Users className="w-4 h-4" /> Placement Engine
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.1] mb-6 text-[#0F172A]">
              Find the exact right program <br className="hidden sm:block"/><span className="bg-[#FFD600] px-2 leading-tight border-2 border-[#0F172A] shadow-brutal-soft transform rotate-1 inline-block mt-2">for your child.</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 font-bold max-w-2xl mx-auto mb-10">
              Not sure whether to choose 1-on-1, Group, Beginner, or Advanced? Take this 3-question placement quiz. We'll match them with the perfect cohort.
            </p>
            <button onClick={() => setStep(1)} className="bg-[#0F172A] text-[#FFD600] px-8 md:px-12 py-4 md:py-5 font-black text-sm md:text-lg uppercase tracking-widest border-2 border-[#0F172A] shadow-brutal-yellow hover:translate-y-[2px] hover:shadow-brutal-yellow active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-3 mx-auto">
              Start Placement Quiz <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step > 0 && step <= questions.length && (
          <div className="bg-[#FAFAFA] border-4 border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft rounded-sm p-6 md:p-10 text-[#0F172A] w-full">
            <div className="flex justify-between items-center mb-6 md:mb-8 border-b-2 border-gray-200 pb-4">
              <span className="font-black text-gray-400 uppercase tracking-widest text-[10px] md:text-xs">Question 0{step} of 0{questions.length}</span>
              <div className="flex gap-1 md:gap-2">
                {questions.map((_, i) => (
                  <div key={i} className={`h-1.5 w-6 md:w-8 border border-[#0F172A] ${i < step ? 'bg-[#FFD600]' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-6 md:mb-8 leading-snug">
              {questions[step - 1].q}
            </h3>
            <div className="space-y-3 md:space-y-4">
              {questions[step - 1].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.points)} className="w-full text-left p-4 md:p-5 border-2 border-gray-300 hover:border-[#0F172A] hover:bg-[#FFD600]/10 font-bold text-sm md:text-base transition-colors flex items-center justify-between group rounded-sm">
                  {opt.text}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-[#0F172A] transition-colors shrink-0 ml-4" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step > questions.length && (
          <div className="bg-[#FAFAFA] border-4 border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft rounded-sm p-6 md:p-10 text-[#0F172A] text-center w-full">
            {analyzing ? (
              <div className="py-12 md:py-16 flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-[#0F172A] border-t-[#FFD600] rounded-full animate-spin mb-6" />
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight animate-pulse text-[#0F172A]">Scanning Cohorts...</h3>
                <p className="text-xs md:text-sm text-gray-500 font-bold mt-2 uppercase tracking-widest">Finding the perfect match</p>
              </div>
            ) : (
              <div className="text-left md:text-center">
                <div className="inline-flex items-center justify-center bg-[#0F172A] text-[#FFD600] px-4 py-1.5 border-2 border-[#0F172A] font-black text-[10px] uppercase tracking-[0.2em] mb-6">
                  Match Found
                </div>
                
                <div className={`p-6 md:p-8 border-4 border-[#0F172A] mb-8 ${getPlacement().bg}`}>
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
                  <BookingForm buttonTheme="yellow" buttonText="Book Trial For This Cohort" />
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}



function FounderStory() {
  return (
    <section className="py-16 md:py-24 bg-[#FAFAFA] border-b-4 border-[#0F172A] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FFD600] border-2 border-[#0F172A] shadow-brutal-soft text-[#0F172A] font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" /> The Story Behind ChessWize
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] uppercase tracking-tight leading-none">
            Why I started <span className="bg-[#FFD600] px-2 md:px-3 py-1 transform inline-block -rotate-1 border-4 border-[#0F172A] shadow-brutal-soft mt-2">teaching chess.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
          <div className="w-full lg:w-5/12 shrink-0">
            <div className="relative">
              <div className="absolute top-3 -right-3 md:top-4 md:-right-4 w-full h-full bg-[#FFD600] border-4 border-[#0F172A]" />
              <div className="relative border-4 border-[#0F172A] overflow-hidden bg-gray-100 shadow-brutal-soft">
                <img src="https://chesswize.com/wp-content/uploads/2025/03/Untitled-design-20.png" alt="Tarun — Founder of ChessWize" className="w-full aspect-[3/4] object-cover" loading="lazy" />
                <div className="absolute bottom-0 left-0 right-0 bg-[#0F172A] px-4 py-3 text-center">
                  <p className="text-[#FFD600] font-black text-sm md:text-base uppercase tracking-widest">Tarun · Founder & Head Coach</p>
                  <p className="text-gray-400 font-bold text-[9px] md:text-[10px] uppercase tracking-widest mt-0.5">FIDE Rated · 7+ Years · 1,500+ Students</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12">
            <div className="space-y-5 md:space-y-6 text-sm md:text-base font-bold text-gray-700 leading-relaxed">
              <p className="text-lg md:text-xl font-black text-[#0F172A] leading-snug">
                "I started ChessWize in 2017 with just 3 students and a Zoom link. Today, we've trained over 1,500 kids across 15+ countries. But the reason I started hasn't changed."
              </p>
              <p>
                I was coaching a 9-year-old boy in Lucknow who was brilliant — sharp memory, quick thinker — but his parents were worried sick. He was spending 4-5 hours a day on mobile games. His grades were slipping. He couldn't sit through a 30-minute homework session without reaching for his phone.
              </p>
              <p>
                Within 8 weeks of structured chess training, something shifted. He started <span className="text-[#0F172A] font-black">choosing puzzles over YouTube</span>. His mother called me, almost in tears, saying he'd sat through an entire exam without fidgeting for the first time. That moment changed everything for me.
              </p>
              <p>
                I realised chess wasn't just a game — it was a <span className="text-[#0F172A] font-black">tool that could rewire how children think</span>. It teaches patience in a world of instant gratification. It builds focus when everything around them is designed to distract. And it gives them a sense of achievement that no video game can match.
              </p>
              <p>
                That's why every coach at ChessWize is trained not just in chess, but in <span className="text-[#0F172A] font-black">how children learn</span>. We don't just teach moves — we build thinkers.
              </p>
            </div>

            <div className="mt-8 md:mt-10 p-5 md:p-6 bg-[#0F172A] border-4 border-[#0F172A] shadow-brutal-yellow text-white">
              <Quote className="w-8 h-8 text-[#FFD600] mb-3" />
              <p className="text-base md:text-lg font-black italic leading-relaxed text-gray-200">
                "Every child who joins ChessWize gets the same thing — a coach who genuinely cares about their growth, not just their rating."
              </p>
              <p className="text-[#FFD600] font-black text-xs uppercase tracking-widest mt-4">— Tarun, Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true } as any);
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-[#0F172A] font-sans selection:bg-[#FFD600] selection:text-[#0F172A]">
      <TopNav />
      <Hero />
      <StatBar />
      <ScreenTimeCalculator />
      <GrowthProjector />
      <CohortPlacementQuiz />
      <NeurologicalImpact />
      <Curriculum />
      <Mentors />
      <FounderStory />
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