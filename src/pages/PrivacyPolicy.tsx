import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] font-sans selection:bg-[#FFD600] selection:text-[#0F172A]">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#0F172A] transition-colors mb-8 md:mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Privacy Policy</h1>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-12">Last Updated: April 15, 2026</p>
        
        <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
          <p>
            At ChessWize ("we", "our", or "us"), your privacy is our priority. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our online chess coaching services.
          </p>

          <h3>1. Information We Collect</h3>
          <p>We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our services, such as when you book a free demo or contact us. This includes:</p>
          <ul>
            <li><strong>Personal Details:</strong> Name, WhatsApp number, email address, and your child's age or chess experience level.</li>
            <li><strong>Usage Data:</strong> Information automatically collected when you visit our website (e.g., IP address, browser type, pages viewed) to improve our ad campaigns (e.g., Meta Pixel, Google Analytics).</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>We use the information we collect or receive to:</p>
          <ul>
            <li>Schedule and manage your free demo class or regular coaching sessions.</li>
            <li>Communicate with you via WhatsApp, email, or phone regarding your child's progress, class schedules, or support.</li>
            <li>Deliver targeted advertising to you on third-party platforms like Meta (Facebook/Instagram) and Google, in compliance with their advertising policies.</li>
            <li>Analyze website usage to improve our user experience and marketing efforts.</li>
          </ul>

          <h3>3. Information Sharing</h3>
          <p>We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following situations:</p>
          <ul>
            <li><strong>Service Providers:</strong> With third-party vendors who perform services for us (e.g., Zoom for classes, Vercel for hosting, Google/Meta for marketing analytics).</li>
            <li><strong>Legal Obligations:</strong> If required to do so by law or in response to valid requests by public authorities.</li>
          </ul>

          <h3>4. Your Rights</h3>
          <p>You have the right to request access to the personal information we hold about you, or ask that your personal information be corrected, updated, or deleted. You may also opt-out of our marketing communications at any time by contacting us.</p>

          <h3>5. Contact Us</h3>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <p>
            <strong>Email:</strong> chesswize79@gmail.com<br />
            <strong>Phone/WhatsApp:</strong> +91-8400979997
          </p>
        </div>
      </div>
    </div>
  );
}
