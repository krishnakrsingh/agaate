import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Clock,
  CloudArrowUp,
  FileText,
  PaperPlaneRight,
  Sparkle,
  X
} from "@phosphor-icons/react";
import { ExtendedJobPosition, jobs } from "@/data/careers-data";
import { EASE } from "@/components/common/motion";

const STEPS = ["Candidate Info", "Experience & Resume", "Confirm & Submit"];

const CONFETTI = [
  { x: -70, y: -60, color: "var(--color-moss)" },
  { x: 70, y: -55, color: "var(--color-terracotta)" },
  { x: -90, y: 20, color: "var(--color-forest)" },
  { x: 90, y: 25, color: "var(--color-moss)" },
  { x: -55, y: 70, color: "var(--color-terracotta)" },
  { x: 55, y: 75, color: "var(--color-forest)" },
  { x: -25, y: -85, color: "var(--color-moss)" },
  { x: 25, y: -88, color: "var(--color-terracotta)" },
];

type Props = {
  job: ExtendedJobPosition | null;
  onClose: () => void;
};

export default function ApplicationModal({ job, onClose }: Props) {
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        <motion.div
          className="absolute inset-0 bg-forest-deep/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={onClose}
        />
        <motion.div
          className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2.5rem] border border-border bg-cream p-6 shadow-2xl md:p-10"
          initial={{ opacity: 0, scale: 0.88, y: 44 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", bounce: 0.28, duration: 0.55 }}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-forest/65 shadow-sm transition-colors hover:text-forest hover:bg-forest/10"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="space-y-8 text-left">
            <div className="pr-10">
              <span className="font-jet text-[9px] tracking-widest uppercase text-terracotta font-bold block mb-1">
                Agaate AgTech Recruitment Portal
              </span>
              <h3 className="font-serif text-3xl text-forest-deep font-bold">
                {activeJob?.title}
              </h3>
              <span className="font-mono text-[10px] text-forest/60 block mt-1">
                {activeJob?.dept} · {activeJob?.loc} · {activeJob?.type}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {applied ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-forest/10 bg-card p-8 text-center"
                >
                  <motion.span
                    className="pointer-events-none absolute h-40 w-40 rounded-full border border-moss/40"
                    animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.span
                    className="pointer-events-none absolute h-40 w-40 rounded-full border border-terracotta/40"
                    animate={{ scale: [1, 2.3], opacity: [0.6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                  />
                  {CONFETTI.map((c, i) => (
                    <motion.span
                      key={i}
                      className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
                      style={{ background: c.color }}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                      animate={{ x: c.x, y: c.y, scale: 1, opacity: 0 }}
                      transition={{
                        duration: 1.8,
                        delay: 0.3 + i * 0.09,
                        repeat: Infinity,
                        repeatDelay: 0.6,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                  <svg viewBox="0 0 64 64" className="relative h-20 w-20">
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="var(--color-forest)"
                      strokeWidth="3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.7, ease: EASE }}
                    />
                    <motion.path
                      d="M20 33 L29 42 L45 24"
                      fill="none"
                      stroke="var(--color-forest)"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, ease: EASE, delay: 0.55 }}
                    />
                  </svg>
                  <h4 className="relative mt-6 font-serif text-3xl font-bold text-forest-deep">
                    Application Successfully Logged!
                  </h4>
                  <p className="relative mt-3 max-w-xs text-xs leading-relaxed text-forest/75">
                    Thank you, <strong>{name}</strong>! Your application for <strong>{activeJob.title}</strong> has been logged in our HR system. Our operations team will evaluate your profile and contact you within 48 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="steps"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="space-y-6"
                >
                  {/* Step Stepper */}
                  <div>
                    <div className="mb-2 flex items-center justify-between font-mono text-[9px] font-bold tracking-widest text-forest/40">
                      {STEPS.map((label, i) => (
                        <span key={label} className={step === i + 1 ? "text-forest font-bold" : ""}>
                          {String(i + 1).padStart(2, "0")} {label.toUpperCase()}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="h-1.5 flex-1 overflow-hidden rounded-full bg-border"
                        >
                          {step >= n && (
                            <motion.div
                              className="h-full rounded-full bg-forest"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.45, ease: EASE }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="min-h-[260px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        {step === 1 && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-[10px] font-mono tracking-wider text-forest/70 mb-1.5 uppercase font-semibold">
                                Target Open Role *
                              </label>
                              <select
                                value={selectedRoleId}
                                onChange={(e) => setSelectedRoleId(e.target.value)}
                                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-xs font-serif font-bold text-forest-deep focus:border-forest focus:outline-none"
                              >
                                {jobs.map((j) => (
                                  <option key={j.id} value={j.id}>
                                    {j.title} ({j.loc})
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono tracking-wider text-forest/70 mb-1.5 uppercase font-semibold">
                                Your Full Name *
                              </label>
                              <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-xs focus:border-forest focus:outline-none"
                                placeholder="e.g. Sandeep Phogat"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] font-mono tracking-wider text-forest/70 mb-1.5 uppercase font-semibold">
                                  Phone Number *
                                </label>
                                <input
                                  required
                                  type="tel"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-xs focus:border-forest focus:outline-none"
                                  placeholder="e.g. +91 99887 76655"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-mono tracking-wider text-forest/70 mb-1.5 uppercase font-semibold">
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-xs focus:border-forest focus:outline-none"
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
                                <label className="block text-[10px] font-mono tracking-wider text-forest/70 mb-1.5 uppercase font-semibold">
                                  Experience Level *
                                </label>
                                <select
                                  value={exp}
                                  onChange={(e) => setExp(e.target.value)}
                                  className="w-full bg-card border border-border rounded-xl px-3 py-3 text-xs font-semibold text-forest-deep focus:border-forest focus:outline-none"
                                >
                                  <option>Fresh Graduate (CSAUAT / Ag Institute)</option>
                                  <option>1-3 Years</option>
                                  <option>3-5 Years</option>
                                  <option>5+ Years</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[10px] font-mono tracking-wider text-forest/70 mb-1.5 uppercase font-semibold">
                                  Key Crop / Tech Expertise
                                </label>
                                <input
                                  type="text"
                                  value={cropExp}
                                  onChange={(e) => setCropExp(e.target.value)}
                                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-xs focus:border-forest focus:outline-none"
                                  placeholder="e.g. Solanaceae IPM / Drip Fertigation / Drone Remote Sensing"
                                />
                              </div>
                            </div>

                            {/* Resume Drag and Drop Box */}
                            <div>
                              <label className="block text-[10px] font-mono tracking-wider text-forest/70 mb-1.5 uppercase font-semibold">
                                Resume Drag & Drop Upload
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
                                    ? "border-forest bg-forest/10"
                                    : resumeFile
                                    ? "border-moss bg-moss/5"
                                    : "border-border bg-card hover:border-forest/40"
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
                                    <FileText className="h-7 w-7 text-moss" />
                                    <div className="text-left">
                                      <p className="font-jet text-xs font-bold text-forest-deep truncate max-w-[200px]">
                                        {resumeFile.name}
                                      </p>
                                      <p className="font-mono text-[9px] text-forest/50">
                                        {(resumeFile.size / 1024).toFixed(1)} KB · File Attached
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setResumeFile(null);
                                      }}
                                      className="ml-2 text-forest/40 hover:text-terracotta text-xs"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <CloudArrowUp className="h-8 w-8 text-forest/50 mb-2" />
                                    <p className="font-jet text-xs font-semibold text-forest-deep">
                                      Drag & drop your resume PDF here, or <span className="text-terracotta underline">browse</span>
                                    </p>
                                    <p className="font-mono text-[9px] text-forest/45 mt-1">
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
                            <div className="rounded-2xl border border-border bg-card p-5 space-y-2 text-xs">
                              <h5 className="font-jet text-[9px] font-bold uppercase tracking-widest text-terracotta mb-2">
                                Application Details Summary
                              </h5>
                              <p className="text-forest-deep">
                                <strong>Role:</strong> {activeJob.title} ({activeJob.loc})
                              </p>
                              <p className="text-forest-deep">
                                <strong>Candidate Name:</strong> {name || "Not provided"}
                              </p>
                              <p className="text-forest-deep">
                                <strong>Phone:</strong> {phone || "Not provided"}
                              </p>
                              <p className="text-forest-deep">
                                <strong>Email:</strong> {email || "Not provided"}
                              </p>
                              <p className="text-forest-deep">
                                <strong>Experience Level:</strong> {exp}
                              </p>
                              <p className="text-forest-deep">
                                <strong>Expertise Focus:</strong> {cropExp || "General Agronomy"}
                              </p>
                              <p className="text-forest-deep">
                                <strong>Resume Attached:</strong> {resumeFile ? resumeFile.name : "Simulated Profile Upload"}
                              </p>
                            </div>
                            <p className="text-xs text-forest/70">
                              By submitting, your candidate profile is dispatched directly to Agaate operations HR. Response guaranteed within 48 hours.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-3">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handleBackStep}
                        className="cursor-pointer rounded-xl border border-border bg-card px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-forest/70 transition-colors hover:text-forest-deep"
                      >
                        Back
                      </button>
                    )}
                    <motion.button
                      onClick={handleNextStep}
                      disabled={step === 1 ? !name || !phone : false}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-forest-deep py-3.5 text-xs font-bold uppercase tracking-wider text-cream shadow-md transition-all hover:bg-forest disabled:cursor-not-allowed disabled:bg-forest/40"
                      whileHover={{ scale: step === 1 && (!name || !phone) ? 1 : 1.02 }}
                      whileTap={{ scale: step === 1 && (!name || !phone) ? 1 : 0.98 }}
                    >
                      <span>{step === 3 ? "Submit Application" : "Continue"}</span>
                      <PaperPlaneRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="border-t border-border/50 pt-4 text-[9px] font-mono text-forest/40 flex justify-between items-center text-left">
              <span className="flex items-center gap-1">
                <Sparkle className="h-3 w-3 text-terracotta" />
                AG-HR-RECRUITMENT-ENGINE
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> 48h Response SLA
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
