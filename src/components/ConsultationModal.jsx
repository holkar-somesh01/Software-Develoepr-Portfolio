import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, X, CheckCircle2, AlertCircle, Loader2, 
  ChevronDown, MessageSquare, Send, Sparkles, Phone, Mail, User, Building, Clock, DollarSign
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const projectTypes = [
  "Business Website", "Portfolio Website", "Landing Page", 
  "Admin Dashboard", "Mobile Application", "SaaS Platform", 
  "Full-Stack Web App", "ERP / CRM Solution", "API Development", "UI/UX Redesign", "Other"
];

const budgets = [
  "₹5K - ₹10K", "₹10K - ₹25K", "₹25K - ₹50K", "₹50K - ₹1L", "₹1L+", "Flexible / Let's Discuss"
];

const timelines = [
  "Immediately (Urgent)", "Within 1 Week", "2 - 4 Weeks", "1 - 2 Months", "Flexible"
];

export default function ConsultationModal({ isOpen, onClose }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm();
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const descriptionValue = watch('description') || '';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 300);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const onSubmit = async (data) => {
    try {
      setStatus('idle');
      setErrorMessage('');

      // 1. Submit consultation to Laravel Backend Database
      const apiUrl = (import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '') + '/consultation';
      const backendPromise = fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          company: data.company || null,
          project_type: data.projectType || null,
          budget: data.budget || null,
          timeline: data.timeline || null,
          details: data.description || null,
        })
      })
      .then(res => res.json())
      .catch(err => {
        console.warn('Consultation API submission unreachable or failed:', err);
        return null;
      });

      // 2. Dual-dispatch to EmailJS
      const templateParams = {
        name: data.name,
        email: data.email,
        phone: data.phone || 'N/A',
        company: data.company || 'N/A',
        projectType: data.projectType,
        budget: data.budget,
        timeline: data.timeline,
        description: data.description,
        currentDate: new Date().toLocaleString(),
        browser: navigator.userAgent,
        platform: navigator.platform,
        currentUrl: window.location.href,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key';

      const emailJsPromise = emailjs.send(serviceId, templateId, templateParams, publicKey).catch(err => {
        console.warn('EmailJS send error:', err);
        return null;
      });

      const [apiRes, emailRes] = await Promise.all([backendPromise, emailJsPromise]);

      if ((apiRes && apiRes.success) || emailRes) {
        setSubmittedData(data);
        setStatus('success');
        reset();
      } else {
        setStatus('error');
        setErrorMessage('Unable to connect to the server. Please check your internet connection or reach out directly via WhatsApp.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('A transmission error occurred while sending your request. Please try again or reach out on WhatsApp.');
    }
  };

  const handleBookAnother = () => {
    setStatus('idle');
    setSubmittedData(null);
    setErrorMessage('');
    reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
            className="relative w-full max-w-[680px] max-h-[92vh] flex flex-col bg-[#0f0f18] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex-none p-5 sm:p-6 border-b border-white/10 bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-black/60 relative">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center border border-cyan-500/30 shadow-[0_0_15px_rgba(0,212,255,0.15)] flex-shrink-0">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-extrabold text-white font-heading tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Book a Free Consultation
                      </h2>
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        15-Min Strategy Call
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Discuss your software project architecture, scope, budget & timeline with Someshwar.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {status === 'success' ? (
                /* ============================================================ */
                /* HIGH-IMPACT SUCCESS STATE                                    */
                /* ============================================================ */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-6 sm:py-8 text-center space-y-6"
                >
                  {/* Pulsing Glowing Check Icon */}
                  <div className="relative inline-flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-emerald-400/10 animate-ping pointer-events-none"></div>
                  </div>

                  {/* Success Titles */}
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-2">
                      Request Confirmed & Dispatched
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Consultation Request Received!
                    </h3>
                    <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2 leading-relaxed">
                      Thank you, <strong className="text-white">{submittedData?.name || 'there'}</strong>! I have received your project details and am reviewing your requirements.
                    </p>
                  </div>

                  {/* Details Card */}
                  <div className="max-w-md mx-auto p-4 rounded-xl bg-black/50 border border-white/10 text-left space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <span className="text-slate-400">Confirmation Sent To:</span>
                      <span className="font-semibold text-cyan-300 font-mono truncate max-w-[200px]">{submittedData?.email}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <span className="text-slate-400">Project Category:</span>
                      <span className="font-semibold text-purple-300">{submittedData?.projectType || 'Software Consultation'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Estimated Response Time:</span>
                      <span className="font-semibold text-emerald-400">Within 12 - 24 Hours</span>
                    </div>
                  </div>

                  {/* WhatsApp Quick Contact Prompt */}
                  <div className="max-w-md mx-auto p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-300 flex items-center justify-between gap-3">
                    <div className="text-left">
                      <div className="font-bold text-emerald-300">Need instant project discussion?</div>
                      <div className="text-[11px] text-slate-400">Connect with Someshwar directly on WhatsApp.</div>
                    </div>
                    <a 
                      href={`https://wa.me/918482816761?text=${encodeURIComponent(`Hi Someshwar! I just booked a consultation on your website for ${submittedData?.projectType || 'my project'}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors flex items-center gap-1.5 flex-shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Chat Now
                    </a>
                  </div>

                  {/* Action Buttons with High-Contrast Styles */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleBookAnother}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        color: '#f8fafc',
                        border: '1px solid rgba(255, 255, 255, 0.18)'
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all hover:bg-white/15"
                    >
                      Book Another Inquiry
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
                        color: '#0a0a0f'
                      }}
                      className="w-full sm:w-auto px-7 py-2.5 rounded-xl font-extrabold text-xs tracking-wide shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Done & Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ============================================================ */
                /* CONSULTATION FORM STATE                                      */
                /* ============================================================ */
                <form id="consultation-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5" noValidate>
                  {/* Error Banner (if submission failed) */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start justify-between gap-3 text-rose-300"
                      >
                        <div className="flex items-start gap-2.5">
                          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-xs text-rose-200">Submission Alert</div>
                            <p className="text-xs text-rose-300/90 mt-0.5">{errorMessage || 'Unable to submit request. Please try again.'}</p>
                          </div>
                        </div>
                        <a 
                          href="https://wa.me/918482816761"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-[11px] font-semibold border border-rose-500/30 flex-shrink-0"
                        >
                          Use WhatsApp
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4.5">
                    {/* Full Name */}
                    <InputWrapper label="Full Name" required error={errors.name?.message}>
                      <div className="relative">
                        <input 
                          type="text"
                          {...register("name", { 
                            required: "Full name is required",
                            minLength: { value: 2, message: "Name must be at least 2 characters" }
                          })}
                          placeholder="Someshwar Holkar"
                          className={cn(
                            "w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors",
                            errors.name && "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                          )}
                        />
                      </div>
                    </InputWrapper>

                    {/* Email */}
                    <InputWrapper label="Email Address" required error={errors.email?.message}>
                      <div className="relative">
                        <input 
                          type="email"
                          {...register("email", { 
                            required: "Email address is required",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" }
                          })}
                          placeholder="client@company.com"
                          className={cn(
                            "w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors",
                            errors.email && "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                          )}
                        />
                      </div>
                    </InputWrapper>

                    {/* Phone / WhatsApp */}
                    <InputWrapper label="Phone / WhatsApp Number" error={errors.phone?.message}>
                      <input 
                        type="tel"
                        {...register("phone")}
                        placeholder="+91 98765 43210 (Optional)"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      />
                    </InputWrapper>

                    {/* Company / Brand */}
                    <InputWrapper label="Company / Brand Name">
                      <input 
                        type="text"
                        {...register("company")}
                        placeholder="Company or Startup (Optional)"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      />
                    </InputWrapper>

                    {/* Project Type Dropdown */}
                    <InputWrapper label="Service / Project Category" required error={errors.projectType?.message}>
                      <div className="relative">
                        <select 
                          {...register("projectType", { required: "Please select a project category" })}
                          className={cn(
                            "w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors appearance-none cursor-pointer pr-10",
                            errors.projectType && "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                          )}
                        >
                          <option value="" className="bg-[#12121c] text-slate-400">Select project category</option>
                          {projectTypes.map(pt => (
                            <option key={pt} value={pt} className="bg-[#12121c] text-white py-1">{pt}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </InputWrapper>

                    {/* Budget Dropdown */}
                    <InputWrapper label="Estimated Budget Range" required error={errors.budget?.message}>
                      <div className="relative">
                        <select 
                          {...register("budget", { required: "Please select an estimated budget" })}
                          className={cn(
                            "w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors appearance-none cursor-pointer pr-10",
                            errors.budget && "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                          )}
                        >
                          <option value="" className="bg-[#12121c] text-slate-400">Select budget estimate</option>
                          {budgets.map(b => (
                            <option key={b} value={b} className="bg-[#12121c] text-white py-1">{b}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </InputWrapper>

                    {/* Timeline Dropdown */}
                    <InputWrapper label="Target Timeline Slot" required error={errors.timeline?.message} className="sm:col-span-2">
                      <div className="relative">
                        <select 
                          {...register("timeline", { required: "Please choose your expected timeline" })}
                          className={cn(
                            "w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors appearance-none cursor-pointer pr-10",
                            errors.timeline && "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                          )}
                        >
                          <option value="" className="bg-[#12121c] text-slate-400">Select expected delivery timeline</option>
                          {timelines.map(t => (
                            <option key={t} value={t} className="bg-[#12121c] text-white py-1">{t}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </InputWrapper>

                    {/* Description Textarea */}
                    <InputWrapper 
                      label="Project Description & Specific Requirements" 
                      required 
                      error={errors.description?.message} 
                      className="sm:col-span-2"
                    >
                      <div className="relative">
                        <textarea 
                          rows={4}
                          {...register("description", { 
                            required: "Please briefly describe your project goals", 
                            minLength: { value: 15, message: "Please provide at least 15 characters describing your project" },
                            maxLength: { value: 1500, message: "Description cannot exceed 1500 characters" }
                          })}
                          placeholder="Tell me about what you are looking to build, required features, third-party integrations, target audience, or current tech stack..."
                          className={cn(
                            "w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none custom-scrollbar leading-relaxed",
                            errors.description && "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                          )}
                        />
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                          <span>Include key goals & deliverables</span>
                          <span className={cn(descriptionValue.length >= 15 ? "text-cyan-400" : "text-slate-500")}>
                            {descriptionValue.length} / 1500 chars
                          </span>
                        </div>
                      </div>
                    </InputWrapper>

                    {/* Terms Agreement Checkbox */}
                    <div className="sm:col-span-2 pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer group">
                        <input 
                          type="checkbox"
                          {...register("agreement", { required: "Please accept to proceed" })}
                          className="mt-0.5 w-4 h-4 rounded border border-white/20 bg-black/60 checked:bg-cyan-500 checked:border-cyan-500 focus:ring-1 focus:ring-cyan-500 cursor-pointer transition-colors"
                        />
                        <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">
                          I agree to share these project specifications with Someshwar Holkar for scheduling a private technical consultation.
                        </span>
                      </label>
                      {errors.agreement && (
                        <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          <span>{errors.agreement.message}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Footer Submit Button */}
            {status !== 'success' && (
              <div className="flex-none p-4 sm:p-5 border-t border-white/10 bg-[#0a0a0f]/90 backdrop-blur-md flex items-center justify-between gap-4">
                <div className="hidden sm:block text-[11px] text-slate-400">
                  🔒 Strictly Confidential & NDA Compliant
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="consultation-form"
                    disabled={isSubmitting}
                    className={cn(
                      "flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20",
                      isSubmitting
                        ? "bg-white/10 text-white/50 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-black hover:shadow-cyan-500/35 hover:scale-[1.01] active:scale-[0.99]"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span className="text-white">Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function InputWrapper({ label, required, error, children, className }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
        {label} {required && <span className="text-cyan-400 font-bold">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
