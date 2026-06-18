"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      const data = await res.json();
      setErrorMsg(data.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-3 py-8">
        <div className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <path
              d="M4.5 10.5L8 14L15.5 6.5"
              stroke="#4f46e5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-xl font-medium text-border-primary leading-7.5">
            Message sent!
          </p>
        </div>
        <p className="text-lg font-normal text-[#64748b] leading-7">
          We&apos;ll get back to you within 4 hours on business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-brand-hover hover:underline w-fit mt-1"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <p className="text-xl font-normal text-[#64748b] leading-7.5">
        Prefer to write?
      </p>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-name"
          className="text-md font-medium text-border-primary leading-6"
        >
          Your name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          placeholder="e.g. James Mitchell"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-white border border-[#d4d4d4] rounded-lg text-lg font-normal text-border-primary placeholder:text-[#737373] leading-7 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] focus:outline-none focus:border-[#818cf8] focus:ring-2 focus:ring-[#818cf8]/20 transition-colors"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-email"
          className="text-md font-medium text-border-primary leading-6"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-white border border-[#d4d4d4] rounded-lg text-lg font-normal text-border-primary placeholder:text-[#737373] leading-7 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] focus:outline-none focus:border-[#818cf8] focus:ring-2 focus:ring-[#818cf8]/20 transition-colors"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="text-md font-medium text-border-primary leading-6"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          required
          placeholder="Tell us what you need help with"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3.5 py-3 bg-white border border-[#d4d4d4] rounded-lg text-lg font-normal text-border-primary placeholder:text-[#737373] leading-7 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:border-[#818cf8] focus:ring-2 focus:ring-[#818cf8]/20 transition-colors resize-y"
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="text-sm font-medium text-red-500">{errorMsg}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex items-center justify-center gap-1.5 w-full px-4.5 py-3 bg-brand-hover border-2 border-white/12 rounded-sm text-md font-semibold text-white leading-md shadow-brand hover:bg-[#4338ca] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
        {status !== "sending" && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
            className="opacity-70 shrink-0"
          >
            <path
              d="M4 10h12M12 6l4 4-4 4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </form>
  );
}
