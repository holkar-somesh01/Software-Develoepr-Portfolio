import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
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
  "ERP", "CRM", "API Development", "UI/UX", "Other"
];

const budgets = ["₹5K - ₹10K", "₹10K - ₹25K", "₹25K - ₹50K", "₹50K+", "Let's Discuss"];
const timelines = ["Immediately", "1 Week", "2-4 Weeks", "1-2 Months", "Flexible"];

export default function ConsultationModal({ isOpen, onClose }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [status, setStatus] = useState('idle'); // idle | success | error

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setTimeout(() => setStatus('idle'), 300);
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

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus('success');
      reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0 }}
            className="relative w-full max-w-[700px] max-h-[95vh] sm:max-h-[90vh] flex flex-col bg-[#0f0f18] border border-white/10 sm:rounded-2xl rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)] overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex-none p-5 sm:p-6 border-b border-white/10 bg-[#0a0a0f]/50 backdrop-blur-xl relative">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 flex items-center justify-center border border-[#00d4ff]/30 shadow-[0_0_15px_rgba(0,212,255,0.1)]">
                    <Calendar className="w-6 h-6 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Book a Free Consultation
                    </h2>
                    <p className="text-sm sm:text-base text-slate-400 mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Let's discuss your idea and build something amazing together.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 sm:p-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Request Sent Successfully
                  </h3>
                  <p className="text-slate-400 max-w-md mx-auto mb-8">
                    Thank you! I've received your request and will contact you within 24 hours.
                  </p>
                  <div className="flex gap-4">
                    <button onClick={() => setStatus('idle')} className="px-6 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-medium">
                      Book Another
                    </button>
                    <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-black font-semibold hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all">
                      Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form id="consultation-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Error Toast */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm font-medium">Unable to send request. Please try again later.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <InputGroup error={errors.name}>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name *</label>
                      <input 
                        {...register("name", { required: true, minLength: 3 })}
                        className={cn("w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all", errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500 animate-shake")}
                        placeholder="John Doe"
                      />
                    </InputGroup>

                    {/* Email */}
                    <InputGroup error={errors.email}>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Email *</label>
                      <input 
                        type="email"
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        className={cn("w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all", errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500 animate-shake")}
                        placeholder="john@example.com"
                      />
                    </InputGroup>

                    {/* Phone */}
                    <InputGroup>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone Number</label>
                      <input 
                        {...register("phone")}
                        className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </InputGroup>

                    {/* Company */}
                    <InputGroup>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Company / Organization</label>
                      <input 
                        {...register("company")}
                        className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all"
                        placeholder="Acme Inc."
                      />
                    </InputGroup>

                    {/* Project Type */}
                    <InputGroup error={errors.projectType}>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Project Type *</label>
                      <select 
                        {...register("projectType", { required: true })}
                        className={cn("w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all appearance-none cursor-pointer", errors.projectType && "border-red-500 focus:border-red-500 focus:ring-red-500 animate-shake")}
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map(pt => <option key={pt} value={pt} className="bg-[#0f0f18] text-white">{pt}</option>)}
                      </select>
                    </InputGroup>

                    {/* Budget */}
                    <InputGroup error={errors.budget}>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Budget *</label>
                      <select 
                        {...register("budget", { required: true })}
                        className={cn("w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all appearance-none cursor-pointer", errors.budget && "border-red-500 focus:border-red-500 focus:ring-red-500 animate-shake")}
                      >
                        <option value="">Select budget range</option>
                        {budgets.map(b => <option key={b} value={b} className="bg-[#0f0f18] text-white">{b}</option>)}
                      </select>
                    </InputGroup>

                    {/* Timeline */}
                    <InputGroup error={errors.timeline} className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Timeline *</label>
                      <select 
                        {...register("timeline", { required: true })}
                        className={cn("w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all appearance-none cursor-pointer", errors.timeline && "border-red-500 focus:border-red-500 focus:ring-red-500 animate-shake")}
                      >
                        <option value="">Select timeline</option>
                        {timelines.map(t => <option key={t} value={t} className="bg-[#0f0f18] text-white">{t}</option>)}
                      </select>
                    </InputGroup>

                    {/* Description */}
                    <InputGroup error={errors.description} className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Project Description *</label>
                      <textarea 
                        {...register("description", { required: true, minLength: 30, maxLength: 1000 })}
                        rows={4}
                        className={cn("w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all resize-none custom-scrollbar", errors.description && "border-red-500 focus:border-red-500 focus:ring-red-500 animate-shake")}
                        placeholder="Tell me about your project goals, features, and requirements..."
                      />
                      <p className="text-xs text-slate-500 mt-1.5 text-right">Min 30 chars</p>
                    </InputGroup>

                    {/* Agreement Checkbox */}
                    <InputGroup error={errors.agreement} className="sm:col-span-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center pt-0.5">
                          <input 
                            type="checkbox" 
                            {...register("agreement", { required: true })}
                            className="peer w-5 h-5 appearance-none border-2 border-white/20 rounded-md checked:border-[#00d4ff] checked:bg-[#00d4ff] transition-all focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/50 cursor-pointer"
                          />
                          <CheckCircle className="w-3.5 h-3.5 text-black absolute top-[6px] left-[3px] opacity-0 peer-checked:opacity-100 pointer-events-none" />
                        </div>
                        <span className={cn("text-sm text-slate-300 group-hover:text-white transition-colors", errors.agreement && "text-red-400")}>
                          I agree to share these details for project discussion. *
                        </span>
                      </label>
                    </InputGroup>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            {status !== 'success' && (
              <div className="flex-none p-4 sm:p-5 border-t border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md">
                <button
                  type="submit"
                  form="consultation-form"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all relative overflow-hidden group",
                    isSubmitting 
                      ? "bg-white/10 text-white/50 cursor-not-allowed" 
                      : "bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-black hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:scale-[1.01] active:scale-[0.99]"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Send Consultation Request</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function InputGroup({ children, error, className }) {
  return (
    <div className={className}>
      {children}
      {error && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error.type === 'required' ? 'This field is required' : 'Invalid input'}
        </p>
      )}
    </div>
  );
}
