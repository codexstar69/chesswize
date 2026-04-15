import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number").max(15, "Phone number is too long"),
  age: z.string().min(1, "Please select an age"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  buttonText?: string;
  buttonTheme?: "dark" | "yellow";
}

export default function BookingForm({ buttonText = "Book Free Demo Class", buttonTheme = "dark" }: BookingFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema)
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      const msg = `Hi, I'd like to book a free demo class for my child.\nName: ${data.name}\nPhone: ${data.phone}\nChild's Age: ${data.age}`;
      window.open(`https://wa.me/918400979997?text=${encodeURIComponent(msg)}`, "_blank");
      toast.success("Redirecting to WhatsApp...");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const buttonClasses = buttonTheme === "dark" 
    ? "bg-[#0F172A] text-[#FFD600] border-[#0F172A] shadow-brutal-yellow md:shadow-brutal-yellow hover:shadow-brutal-yellow md:hover:shadow-brutal-yellow"
    : "bg-[#FFD600] text-[#0F172A] border-[#0F172A] shadow-brutal-soft md:shadow-brutal-soft hover:shadow-brutal-soft md:hover:shadow-brutal-soft";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left w-full">
      <div>
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Parent's Name</label>
        <input 
          {...register("name")}
          type="text" 
          className={`w-full px-4 py-3 bg-[#F8FAFC] border-2 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-[#0F172A] focus:border-[#0F172A]'} focus:bg-[#FFF4E5] outline-none transition-colors font-bold text-[#0F172A] text-sm md:text-base rounded-sm`} 
          placeholder="e.g. Rahul Sharma" 
        />
        {errors.name && <p className="text-red-500 text-xs font-bold mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">WhatsApp Number</label>
        <input 
          {...register("phone")}
          type="tel" 
          className={`w-full px-4 py-3 bg-[#F8FAFC] border-2 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[#0F172A] focus:border-[#0F172A]'} focus:bg-[#FFF4E5] outline-none transition-colors font-bold text-[#0F172A] text-sm md:text-base rounded-sm`} 
          placeholder="+91" 
        />
        {errors.phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Child's Age (Must be 5+)</label>
        <select 
          {...register("age")}
          className={`w-full px-4 py-3 bg-[#F8FAFC] border-2 ${errors.age ? 'border-red-500 focus:border-red-500' : 'border-[#0F172A] focus:border-[#0F172A]'} focus:bg-[#FFF4E5] outline-none transition-colors font-bold text-[#0F172A] text-sm md:text-base rounded-sm appearance-none`}
        >
          <option value="" disabled selected>Select Age</option>
          {Array.from({length: 12}, (_, i) => i + 5).map(a => <option key={a} value={a}>{a} Years Old</option>)}
        </select>
        {errors.age && <p className="text-red-500 text-xs font-bold mt-1">{errors.age.message}</p>}
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`w-full mt-4 py-4 md:py-5 font-black text-sm md:text-lg uppercase tracking-widest border-2 rounded-sm hover:translate-y-[2px] active:translate-y-[4px] md:active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-2 md:gap-3 ${buttonClasses}`}
      >
        {isSubmitting ? 'Processing...' : buttonText} <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </form>
  );
}
