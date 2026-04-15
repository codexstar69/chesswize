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

