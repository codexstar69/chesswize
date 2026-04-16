import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, CheckCircle, Wifi, Monitor, Brain, Trophy, Gamepad2, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Anti-spam helpers ─────────────────────────────────────────────────────
const MIN_SUBMIT_TIME_MS = 6000; // reject submissions faster than 6 seconds

async function generateFingerprint(mountTime: number): Promise<string> {
  const raw = [
    navigator.userAgent,
    screen.width,
    screen.height,
    screen.colorDepth,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    mountTime.toString(),
  ].join('|');
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Schema ────────────────────────────────────────────────────────────────
const bookingSchema = z.object({
  // Step 1
  childName: z.string().min(2, "Must be at least 2 characters").regex(/^[a-zA-Z\s]*$/, "Name cannot contain numbers"),
  age: z.string().min(1, "Please select an age"),
  city: z.string().min(2, "Please enter your city"),
  
  // Step 2
  experience: z.string().min(1, "Please select experience level"),
  device: z.string().min(1, "Please confirm device access"),
  internet: z.string().min(1, "Please confirm internet stability"),
  
  // Step 3
  goal: z.string().min(1, "Please select a primary goal"),
  concern: z.string().min(10, "Please share a bit more (at least 10 characters)").refine(s => !/(http|www|\.com|\.org|\.net)/i.test(s), "Links are not allowed"),
  
  // Step 4
  parentName: z.string().min(2, "Must be at least 2 characters").regex(/^[a-zA-Z\s]*$/, "Name cannot contain numbers"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Please enter a valid email address"),
  captcha: z.string().min(1, "Please answer the math question"),
  website: z.string().max(0, ""), // honeypot
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  buttonText?: string;
  buttonTheme?: "dark" | "yellow";
}

const inputBase = "w-full px-4 py-3 bg-[#F8FAFC] border-2 focus:bg-[#FFF4E5] outline-none transition-colors font-bold text-[#0F172A] text-sm md:text-base rounded-sm";
const errBorder = "border-red-500 focus:border-red-500";
const okBorder = "border-[#0F172A] focus:border-[#0F172A]";
const labelCls = "text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block";
const errMsg = "text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider";

// Selection Card Component
function SelectionCard({ icon: Icon, title, desc, selected, onClick, error }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 border-4 rounded-sm cursor-pointer transition-all transform hover:-translate-y-1 ${selected ? 'border-[#FFD600] bg-[#FFF4E5] shadow-brutal-soft' : 'border-gray-200 bg-[#FAFAFA] hover:border-[#0F172A]'} ${error ? 'border-red-500' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 shrink-0 border-2 ${selected ? 'bg-[#FFD600] border-[#0F172A]' : 'bg-gray-100 border-gray-300'}`}>
          <Icon className={`w-5 h-5 ${selected ? 'text-[#0F172A]' : 'text-gray-500'}`} />
        </div>
        <div>
          <h4 className={`font-black text-sm uppercase tracking-tight mb-1 ${selected ? 'text-[#0F172A]' : 'text-gray-600'}`}>{title}</h4>
          <p className="text-[10px] font-bold text-gray-500 leading-snug">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function BookingForm({ buttonText = "Submit Application", buttonTheme = "dark" }: BookingFormProps) {
  const mountTimeRef = useRef(Date.now());
  const [fingerprint, setFingerprint] = useState('');
  const [step, setStep] = useState(1);
  const [captchaMath, setCaptchaMath] = useState({ a: 0, b: 0, ans: 0 });

  useEffect(() => {
    mountTimeRef.current = Date.now();
    generateFingerprint(mountTimeRef.current).then(setFingerprint);
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptchaMath({ a, b, ans: a + b });
  }, []);

  const { register, handleSubmit, trigger, setValue, watch, formState: { errors, isSubmitting } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { website: '', experience: '', device: '', internet: '', goal: '' },
    mode: "onTouched",
  });

  const watchExperience = watch("experience");
  const watchDevice = watch("device");
  const watchInternet = watch("internet");
  const watchGoal = watch("goal");

  const onSubmit = async (data: BookingFormData) => {
    if (localStorage.getItem('cw_demo_booked')) {
      toast.error("You've already requested a demo recently!"); return;
    }
    if (data.website) return;
    if (Date.now() - mountTimeRef.current < MIN_SUBMIT_TIME_MS) {
      toast.error("Suspicious activity detected."); return;
    }
    if (!fingerprint) { toast.error("Security check failed. Please refresh."); return; }
    if (parseInt(data.captcha) !== captchaMath.ans) {
      toast.error("Incorrect math answer."); return;
    }

    try {
      const msg = [
        `*🚨 NEW APPLICATION 🚨*`,
        `*Parent:* ${data.parentName} | *Phone:* ${data.phone}`,
        `*Email:* ${data.email}`,
        `*Child:* ${data.childName} (${data.age} yrs) | *City:* ${data.city}`,
        `*Level:* ${data.experience}`,
        `*Setup:* ${data.device} + ${data.internet}`,
        `*Goal:* ${data.goal}`,
        `*Concern:* ${data.concern}`,
        `[fp:${fingerprint.slice(0, 8)}]`,
      ].join('\n');
      
      localStorage.setItem('cw_demo_booked', Date.now().toString());
      window.open(`https://wa.me/918400979997?text=${encodeURIComponent(msg)}`, "_blank");
      toast.success("Application Submitted! Redirecting...");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const nextStep = async (fieldsToValidate: (keyof BookingFormData)[]) => {
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep(prev => prev + 1);
  };

  const buttonClasses = buttonTheme === "dark"
    ? "bg-[#0F172A] text-[#FFD600] border-[#0F172A] shadow-brutal-yellow md:shadow-brutal-yellow hover:shadow-brutal-yellow md:hover:shadow-brutal-yellow"
    : "bg-[#FFD600] text-[#0F172A] border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft hover:shadow-brutal-soft md:hover:shadow-brutal-soft";

  return (
    <div className="w-full">
      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-6 md:mb-8">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex-1 flex flex-col items-center gap-2 relative">
            <div className={`w-full h-1.5 md:h-2 border-2 border-[#0F172A] rounded-full transition-colors ${step >= num ? 'bg-[#FFD600]' : 'bg-gray-200'}`} />
            <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest ${step >= num ? 'text-[#0F172A]' : 'text-gray-400'}`}>
              Step {num}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left w-full relative min-h-[350px]">
        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden opacity-0">
          <input {...register("website")} type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {/* STEP 1: Basics */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0F172A] mb-1">Let's start with the student</h3>
              <p className="text-xs font-bold text-gray-500 mb-6">We tailor every class to the child's age and location.</p>
            </div>
            
            <div>
              <label className={labelCls}>Child's First Name</label>
              <input {...register("childName")} type="text" className={`${inputBase} ${errors.childName ? errBorder : okBorder}`} placeholder="e.g. Aarav" />
              {errors.childName && <p className={errMsg}>{errors.childName.message}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Age (Must be 5+)</label>
                <select {...register("age")} className={`${inputBase} appearance-none ${errors.age ? errBorder : okBorder}`} defaultValue="">
                  <option value="" disabled>Select Age</option>
                  {Array.from({length: 12}, (_, i) => i + 5).map(a => <option key={a} value={a}>{a} Years Old</option>)}
                </select>
                {errors.age && <p className={errMsg}>{errors.age.message}</p>}
              </div>
              <div>
                <label className={labelCls}>City / Location</label>
                <input {...register("city")} type="text" className={`${inputBase} ${errors.city ? errBorder : okBorder}`} placeholder="e.g. Lucknow" />
                {errors.city && <p className={errMsg}>{errors.city.message}</p>}
              </div>
            </div>
            
            <button type="button" onClick={() => nextStep(["childName", "age", "city"])} className={`w-full mt-6 py-4 font-black text-sm uppercase tracking-widest border-2 rounded-sm hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 ${buttonClasses}`}>
              Next: Experience <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Experience & Setup */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0F172A] mb-1">Assess their level & setup</h3>
              <p className="text-xs font-bold text-gray-500 mb-4">This helps us assign the right coach for the demo.</p>
            </div>

            <div>
              <label className={labelCls}>Current Chess Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SelectionCard icon={Gamepad2} title="Absolute Beginner" desc="Doesn't know how pieces move yet" selected={watchExperience === "Beginner"} error={!!errors.experience} onClick={() => { setValue("experience", "Beginner"); trigger("experience"); }} />
                <SelectionCard icon={Trophy} title="Knows the Basics" desc="Plays casually, knows the rules" selected={watchExperience === "Intermediate"} error={!!errors.experience} onClick={() => { setValue("experience", "Intermediate"); trigger("experience"); }} />
              </div>
              {errors.experience && <p className={errMsg}>{errors.experience.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Device for Class</label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { setValue("device", "Laptop/iPad"); trigger("device"); }} className={`flex-1 p-2 border-2 rounded-sm text-xs font-black uppercase ${watchDevice === "Laptop/iPad" ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-[#FAFAFA] text-gray-500 border-gray-300 hover:border-[#0F172A]'} ${errors.device ? errBorder : ''}`}>
                    <Monitor className="w-4 h-4 mx-auto mb-1" /> Laptop/iPad
                  </button>
                  <button type="button" onClick={() => { setValue("device", "Mobile Only"); trigger("device"); }} className={`flex-1 p-2 border-2 rounded-sm text-xs font-black uppercase ${watchDevice === "Mobile Only" ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-[#FAFAFA] text-gray-500 border-gray-300 hover:border-[#0F172A]'} ${errors.device ? errBorder : ''}`}>
                    Mobile Only
                  </button>
                </div>
                {errors.device && <p className={errMsg}>{errors.device.message}</p>}
              </div>
              
              <div>
                <label className={labelCls}>Internet Quality</label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { setValue("internet", "Good Wifi"); trigger("internet"); }} className={`flex-1 p-2 border-2 rounded-sm text-xs font-black uppercase ${watchInternet === "Good Wifi" ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-[#FAFAFA] text-gray-500 border-gray-300 hover:border-[#0F172A]'} ${errors.internet ? errBorder : ''}`}>
                    <Wifi className="w-4 h-4 mx-auto mb-1" /> Good Wi-Fi
                  </button>
                  <button type="button" onClick={() => { setValue("internet", "Mobile Data"); trigger("internet"); }} className={`flex-1 p-2 border-2 rounded-sm text-xs font-black uppercase ${watchInternet === "Mobile Data" ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-[#FAFAFA] text-gray-500 border-gray-300 hover:border-[#0F172A]'} ${errors.internet ? errBorder : ''}`}>
                    Mobile Data
                  </button>
                </div>
                {errors.internet && <p className={errMsg}>{errors.internet.message}</p>}
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(1)} className="py-4 px-5 font-black text-sm uppercase border-2 border-[#0F172A] rounded-sm bg-gray-100 text-[#0F172A] hover:bg-gray-200 transition-colors"><ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /></button>
              <button type="button" onClick={() => nextStep(["experience", "device", "internet"])} className={`flex-1 py-4 font-black text-sm uppercase tracking-widest border-2 rounded-sm hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 ${buttonClasses}`}>Next: Goals <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* STEP 3: Goals & Concerns */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0F172A] mb-1">What are your goals?</h3>
              <p className="text-xs font-bold text-gray-500 mb-4">We want to make sure we're aligned with your expectations.</p>
            </div>

            <div>
              <label className={labelCls}>Primary Goal</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SelectionCard icon={Brain} title="Brain Development" desc="Improve focus, math skills & reduce screen time" selected={watchGoal === "Brain Development"} error={!!errors.goal} onClick={() => { setValue("goal", "Brain Development"); trigger("goal"); }} />
                <SelectionCard icon={Trophy} title="Competitive Play" desc="Prepare for tournaments & get a rating" selected={watchGoal === "Tournaments"} error={!!errors.goal} onClick={() => { setValue("goal", "Tournaments"); trigger("goal"); }} />
              </div>
              {errors.goal && <p className={errMsg}>{errors.goal.message}</p>}
            </div>

            <div>
              <label className={labelCls}>Tell us about your child's learning challenges (if any)</label>
              <textarea {...register("concern")} rows={3} className={`${inputBase} resize-none ${errors.concern ? errBorder : okBorder}`} placeholder="e.g. Spends too much time on iPad, struggles to sit still for 10 mins..." />
              {errors.concern && <p className={errMsg}>{errors.concern.message}</p>}
            </div>
            
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(2)} className="py-4 px-5 font-black text-sm uppercase border-2 border-[#0F172A] rounded-sm bg-gray-100 text-[#0F172A] hover:bg-gray-200 transition-colors"><ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /></button>
              <button type="button" onClick={() => nextStep(["goal", "concern"])} className={`flex-1 py-4 font-black text-sm uppercase tracking-widest border-2 rounded-sm hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 ${buttonClasses}`}>Final Step <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* STEP 4: Contact & Verification */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-sm mb-4">
              <p className="text-xs font-bold text-green-800 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" /> Perfect! Where should we send the Zoom link and syllabus?
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Parent's Name</label>
                <input {...register("parentName")} type="text" className={`${inputBase} ${errors.parentName ? errBorder : okBorder}`} placeholder="e.g. Rahul Sharma" />
                {errors.parentName && <p className={errMsg}>{errors.parentName.message}</p>}
              </div>
              <div>
                <label className={labelCls}>WhatsApp Number</label>
                <input {...register("phone")} type="tel" className={`${inputBase} ${errors.phone ? errBorder : okBorder}`} placeholder="e.g. 9876543210" />
                {errors.phone && <p className={errMsg}>{errors.phone.message}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Email Address</label>
                <input {...register("email")} type="email" className={`${inputBase} ${errors.email ? errBorder : okBorder}`} placeholder="name@email.com" />
                {errors.email && <p className={errMsg}>{errors.email.message}</p>}
              </div>
              <div>
                <label className={labelCls}>Human Verification</label>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 border-2 border-gray-300 px-3 py-3 rounded-sm font-black text-[#0F172A] whitespace-nowrap shrink-0">
                    {captchaMath.a} + {captchaMath.b} =
                  </div>
                  <input {...register("captcha")} type="number" className={`${inputBase} ${errors.captcha ? errBorder : okBorder}`} placeholder="?" />
                </div>
                {errors.captcha && <p className={errMsg}>{errors.captcha.message}</p>}
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setStep(3)} className="py-4 px-5 font-black text-sm uppercase border-2 border-[#0F172A] rounded-sm bg-gray-100 text-[#0F172A] hover:bg-gray-200 transition-colors"><ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /></button>
              <button type="submit" disabled={isSubmitting} className={`flex-1 py-4 font-black text-sm uppercase tracking-widest border-2 rounded-sm hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 ${buttonClasses}`}>
                {isSubmitting ? 'Processing...' : buttonText} <ShieldAlert className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[9px] text-center font-bold text-gray-400 uppercase tracking-widest mt-2">By submitting, you confirm you are a human parent, not a bot.</p>
          </div>
        )}
      </form>
    </div>
  );
}
