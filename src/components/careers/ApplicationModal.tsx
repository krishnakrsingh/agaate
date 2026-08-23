import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Clock,
  CloudArrowUp,
  FileText,
  PaperPlaneRight,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import { ExtendedJobPosition, jobs } from "@/data/careers-data";
import { EASE } from "@/components/common/motion";

const STEPS = ["Candidate Info", "Experience & Resume", "Confirm & Submit"];

const CONFETTI = [
  { x: -70, y: -60, color: "#a3e635" },
  { x: 70, y: -55, color: "#5d7d37" },
  { x: -90, y: 20, color: "#143d31" },
  { x: 90, y: 25, color: "#a3e635" },
  { x: -55, y: 70, color: "#5d7d37" },
  { x: 55, y: 75, color: "#143d31" },
  { x: -25, y: -85, color: "#a3e635" },
  { x: 25, y: -88, color: "#5d7d37" },
];

type Props = {
  job: ExtendedJobPosition | null;
  isOpen?: boolean;
  onClose: () => void;
};

export default function ApplicationModal({ job, isOpen = true, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [applied, setApplied] = useState(false);

  // Form fields
  const [selectedRoleId, setSelectedRoleId] = useState<string>(job?.id ?? jobs[0]?.id ?? "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [exp, setExp] = useState("1-3 Years");
  const [cropExp, setCropExp] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !job) return null;

  const activeJob = jobs.find((j) => j.id === selectedRoleId) || job || jobs[0];

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setResumeFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setApplied(true);
      setTimeout(() => {
        onClose();
      }, 4500);
    }
  };

  const handleBackStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (!job && !selectedRoleId) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-[#143d31]/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-[#143d31]/10 bg-[#f4f8f5] p-6 text-[#143d31] shadow-2xl md:p-8"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-5 top-5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#143d31]/15 bg-white text-[#143d31] shadow-xs transition-colors hover:bg-[#143d31]/5"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="space-y-6 text-left">
            {/* Header info */}
            <div className="pr-10">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#5d7d37] font-bold block mb-1">
                Agaate Career Portal
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#143d31] font-bold">
                {activeJob?.title}
              </h3>
              <span className="font-mono text-xs text-[#4f624f] block mt-1">
                {activeJob?.dept} · {activeJob?.loc} · {activeJob?.type}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {applied ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#143d31]/10 bg-white p-8 text-center shadow-xs"
                >
                  {CONFETTI.map((c, i) => (
                    <motion.span
                      key={i}
                      className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
                      style={{ background: c.color }}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                      animate={{ x: c.x, y: c.y, scale: 1, opacity: 0 }}
                      transition={{
                        duration: 1.8,
                        delay: 0.2 + i * 0.08,
                        repeat: Infinity,
                        repeatDelay: 0.8,
                        ease: "easeOut",
                      }}
                    />
                  ))}

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#143d31] text-[#a3e635] mb-4">
                    <Check className="h-8 w-8 text-[#a3e635]" weight="bold" />
                  </div>

                  <h4 className="font-display text-2xl font-bold text-[#143d31]">
                    Application Submitted!
                  </h4>
                  <p className="mt-2.5 max-w-sm font-sans text-xs leading-relaxed text-[#4f624f]">
                    Thank you, <strong>{name}</strong>! Your profile for{" "}
                    <strong>{activeJob.title}</strong> has been received by our talent team. We will
                    review your details and reach out within 48 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="steps"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Step Indicators */}
                  <div>
                    <div className="mb-2 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37]">
                      {STEPS.map((label, i) => (
                        <span
                          key={label}
                          className={step === i + 1 ? "text-[#143d31] font-bold" : "opacity-60"}
                        >
                          {String(i + 1).padStart(2, "0")} {label}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#143d31]/10"
                        >
                          {step >= n && (
                            <motion.div
                              className="h-full rounded-full bg-[#143d31]"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.4, ease: EASE }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="min-h-[250px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25, ease: EASE }}
                      >
                        {step === 1 && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-[11px] font-mono tracking-wider text-[#143d31] mb-1.5 uppercase font-semibold">
                                Target Role *
                              </label>
                              <select
                                value={selectedRoleId}
                                onChange={(e) => setSelectedRoleId(e.target.value)}
                                className="w-full bg-white border border-[#143d31]/15 rounded-xl px-4 py-3 text-xs font-mono font-bold text-[#143d31] focus:border-[#143d31] focus:outline-none"
                              >
                                {jobs.map((j) => (
                                  <option key={j.id} value={j.id}>
                                    {j.title} ({j.loc})
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono tracking-wider text-[#143d31] mb-1.5 uppercase font-semibold">
                                Full Name *
                              </label>
                              <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white border border-[#143d31]/15 rounded-xl px-4 py-3 text-xs text-[#143d31] focus:border-[#143d31] focus:outline-none"
                                placeholder="e.g. Sandeep Phogat"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-mono tracking-wider text-[#143d31] mb-1.5 uppercase font-semibold">
                                  Mobile Number *
                                </label>
                                <input
                                  required
                                  type="tel"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="w-full bg-white border border-[#143d31]/15 rounded-xl px-4 py-3 text-xs text-[#143d31] focus:border-[#143d31] focus:outline-none"
                                  placeholder="e.g. +91 99887 76655"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-mono tracking-wider text-[#143d31] mb-1.5 uppercase font-semibold">
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="w-full bg-white border border-[#143d31]/15 rounded-xl px-4 py-3 text-xs text-[#143d31] focus:border-[#143d31] focus:outline-none"
                                  placeholder="e.g. candidate@agaate.in"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-mono tracking-wider text-[#143d31] mb-1.5 uppercase font-semibold">
                                  Experience Level *
                                </label>
                                <select
                                  value={exp}
                                  onChange={(e) => setExp(e.target.value)}
                                  className="w-full bg-white border border-[#143d31]/15 rounded-xl px-3 py-3 text-xs font-semibold text-[#143d31] focus:border-[#143d31] focus:outline-none"
                                >
                                  <option>Fresh Graduate (Agri / Tech)</option>
                                  <option>1-3 Years</option>
                                  <option>3-5 Years</option>
                                  <option>5+ Years</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] font-mono tracking-wider text-[#143d31] mb-1.5 uppercase font-semibold">
                                  Key Agronomy / Tech Expertise
                                </label>
                                <input
                                  type="text"
                                  value={cropExp}
                                  onChange={(e) => setCropExp(e.target.value)}
                                  className="w-full bg-white border border-[#143d31]/15 rounded-xl px-4 py-3 text-xs text-[#143d31] focus:border-[#143d31] focus:outline-none"
                                  placeholder="e.g. Solanaceae IPM / Drip Fertigation"
                                />
                              </div>
                            </div>

                            {/* Resume Upload */}
                            <div>
                              <label className="block text-[11px] font-mono tracking-wider text-[#143d31] mb-1.5 uppercase font-semibold">
                                Resume Upload (PDF / DOC)
                              </label>
                              <div
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  setIsDragging(true);
                                }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleFileDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
                                  isDragging
                                    ? "border-[#143d31] bg-[#143d31]/10"
                                    : resumeFile
                                    ? "border-[#5d7d37] bg-[#5d7d37]/5"
                                    : "border-[#143d31]/20 bg-white hover:border-[#143d31]/40"
                                }`}
                              >
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  onChange={handleFileSelect}
                                  accept=".pdf,.doc,.docx"
                                  className="hidden"
                                />
                                {resumeFile ? (
                                  <div className="flex items-center gap-3">
                                    <FileText className="h-7 w-7 text-[#5d7d37]" />
                                    <div className="text-left">
                                      <p className="font-mono text-xs font-bold text-[#143d31] truncate max-w-[200px]">
                                        {resumeFile.name}
                                      </p>
                                      <p className="font-mono text-[9px] text-[#4f624f]">
                                        {(resumeFile.size / 1024).toFixed(1)} KB · Attached
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setResumeFile(null);
                                      }}
                                      className="ml-2 font-mono text-xs text-[#5d7d37] hover:underline"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <CloudArrowUp className="h-8 w-8 text-[#5d7d37] mb-2" />
                                    <p className="font-sans text-xs font-semibold text-[#143d31]">
                                      Drag & drop resume PDF here, or{" "}
                                      <span className="text-[#5d7d37] underline">browse</span>
                                    </p>
                                    <p className="font-mono text-[9px] text-[#4f624f]/70 mt-1">
                                      Supports PDF, DOC, DOCX up to 10MB
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 3 && (
                          <div className="space-y-4 leading-relaxed">
                            <div className="rounded-2xl border border-[#143d31]/10 bg-white p-5 space-y-2 text-xs font-sans">
                              <h5 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5d7d37] mb-2">
                                Application Summary
                              </h5>
                              <p className="text-[#143d31]">
                                <strong>Role:</strong> {activeJob.title} ({activeJob.loc})
                              </p>
                              <p className="text-[#143d31]">
                                <strong>Name:</strong> {name || "Not provided"}
                              </p>
                              <p className="text-[#143d31]">
                                <strong>Phone:</strong> {phone || "Not provided"}
                              </p>
                              {email && (
                                <p className="text-[#143d31]">
                                  <strong>Email:</strong> {email}
                                </p>
                              )}
                              <p className="text-[#143d31]">
                                <strong>Experience:</strong> {exp}
                              </p>
                              {cropExp && (
                                <p className="text-[#143d31]">
                                  <strong>Focus Area:</strong> {cropExp}
                                </p>
                              )}
                              <p className="text-[#143d31]">
                                <strong>Resume:</strong>{" "}
                                {resumeFile ? resumeFile.name : "Profile Submission"}
                              </p>
                            </div>

                            <p className="font-sans text-xs text-[#4f624f]">
                              By submitting, your candidate profile is dispatched directly to Agaate
                              talent acquisition. Response guaranteed within 48 hours.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handleBackStep}
                        className="cursor-pointer rounded-full border border-[#143d31]/15 bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#143d31] transition-colors hover:bg-[#143d31]/5"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={step === 1 ? !name || !phone : false}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#143d31] py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#1a4d3e] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span>{step === 3 ? "Submit Application" : "Continue"}</span>
                      <PaperPlaneRight className="h-4 w-4 text-[#a3e635]" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Modal footer status */}
            <div className="border-t border-[#143d31]/10 pt-3 text-[10px] font-mono text-[#4f624f]/70 flex justify-between items-center">
              <span className="flex items-center gap-1">
                <Sparkle className="h-3 w-3 text-[#5d7d37]" />
                AGAATE TALENT DESK
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> 48h Response SLA
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
