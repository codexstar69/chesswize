import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] font-sans selection:bg-[#FFD600] selection:text-[#0F172A]">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#0F172A] transition-colors mb-8 md:mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Refund & Cancellation Policy</h1>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-12">Last Updated: April 15, 2026</p>
        
        <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
          <p>
            At ChessWize, we are confident in the quality of our online chess coaching and the positive impact it has on our students. We want you to feel completely secure when enrolling your child in our programs.
          </p>

          <h3>1. 100% Money-Back Guarantee (First 2 Classes)</h3>
          <p>We offer a straightforward, no-questions-asked refund policy for new enrollments:</p>
          <ul>
            <li>If you or your child are not satisfied with the coaching, curriculum, or experience after attending the <strong>first two (2) paid classes</strong>, you are eligible for a full refund.</li>
            <li>To claim this refund, you must notify us via WhatsApp (+91-8400979997) or email (chesswize79@gmail.com) within <strong>48 hours</strong> after the completion of the second class.</li>
            <li>We will process the 100% refund of your initial payment without requiring you to fill out any forms or answer any questions.</li>
          </ul>

          <h3>2. Cancellations After the Guarantee Period</h3>
          <p>Once the initial two-class guarantee period has passed, the following cancellation terms apply:</p>
          <ul>
            <li><strong>Monthly Plans:</strong> You may cancel your monthly subscription at any time. Cancellations will take effect at the end of the current billing cycle. We do not provide prorated refunds for partially used months.</li>
            <li><strong>Missed Classes:</strong> We do not offer refunds for individual classes missed by the student. However, if you notify us in advance via WhatsApp, we will gladly schedule a <strong>makeup class</strong> within the same week, subject to coach availability.</li>
          </ul>

          <h3>3. Coach Cancellations</h3>
          <p>In the rare event that a coach must cancel or reschedule a class due to unforeseen circumstances (e.g., technical issues, illness), we will notify you immediately and provide a free makeup session at a time convenient for you. If a makeup session cannot be arranged, you will be credited for that class.</p>

          <h3>4. Refund Processing Time</h3>
          <p>Approved refunds will be processed and credited back to your original method of payment (bank transfer, UPI, or credit card) within 5-7 business days.</p>

          <h3>5. Contact Us for Refunds</h3>
          <p>To request a refund or cancellation, please contact our support team:</p>
          <p>
            <strong>WhatsApp/Phone:</strong> +91-8400979997<br />
            <strong>Email:</strong> chesswize79@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
