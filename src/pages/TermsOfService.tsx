import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] font-sans selection:bg-[#FFD600] selection:text-[#0F172A]">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#0F172A] transition-colors mb-8 md:mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Terms of Service</h1>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-12">Last Updated: April 15, 2026</p>
        
        <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
          <p>
            Please read these Terms of Service ("Terms") carefully before using the ChessWize website and online chess coaching services operated by us.
          </p>

          <h3>1. Acceptance of Terms</h3>
          <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access our services.</p>

          <h3>2. Description of Service</h3>
          <p>ChessWize provides online chess coaching for children aged 5-16. Classes are conducted live over Zoom by experienced coaches. We offer free demo sessions to prospective students, followed by paid enrollment plans (Group Batch or 1-on-1 Private).</p>

          <h3>3. User Responsibilities</h3>
          <ul>
            <li><strong>Accuracy of Information:</strong> You agree to provide accurate, current, and complete information during the registration or booking process (e.g., parent's name, WhatsApp number, child's age).</li>
            <li><strong>Parental Consent:</strong> If the student is under the age of 18, a parent or legal guardian must agree to these terms and supervise the initial sessions if needed.</li>
            <li><strong>Technical Requirements:</strong> You are responsible for ensuring your child has access to a reliable internet connection and a compatible device (laptop or tablet) to attend the Zoom classes.</li>
          </ul>

          <h3>4. Payment and Billing</h3>
          <p>For paid coaching plans, payment is required in advance. Pricing details are outlined on our website and are subject to change. We will notify you of any price changes before your next billing cycle.</p>

          <h3>5. Intellectual Property</h3>
          <p>All content, curriculum materials, puzzles, graphics, and logos provided during our classes or on our website are the intellectual property of ChessWize. You may not reproduce, distribute, or create derivative works without our express written consent.</p>

          <h3>6. Limitation of Liability</h3>
          <p>In no event shall ChessWize, nor its coaches, directors, or employees, be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of our services.</p>

          <h3>7. Governing Law</h3>
          <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>

          <h3>8. Contact Information</h3>
          <p>If you have any questions about these Terms, please contact us at <strong>chesswize79@gmail.com</strong> or via WhatsApp at <strong>+91-8400979997</strong>.</p>
        </div>
      </div>
    </div>
  );
}
