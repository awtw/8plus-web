"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendMagic = async () => {
    setMsg(email ? "Phase 2: Supabase Auth 會在這裡啟用。" : "請先輸入 Email。");
  };

  return (
    <div className="section-shell py-12 sm:py-16 lg:py-20">
      <div className="surface-card mx-auto max-w-xl p-6 sm:p-8">
        <span className="eyebrow">Admin</span>
        <h1 className="display-title mt-5 text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.04em]">
          Admin Login
        </h1>
        <p className="body-lead mt-4">
          Phase 2: Supabase Auth integration will land here.
        </p>

        <div className="mt-6 space-y-3">
          <label className="block text-sm font-medium text-[color:var(--fg-2)]">
            Email
            <input
              className="mt-2 w-full rounded-full border border-border/80 bg-background px-4 py-3 text-sm outline-none transition-shadow focus-visible:shadow-[0_0_0_2px_var(--accent)]"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button
            className="brand-button-primary inline-flex items-center justify-center"
            onClick={sendMagic}
          >
            Send Link
          </button>
          {msg && <p className="text-sm text-[color:var(--muted)]">{msg}</p>}
        </div>
      </div>
    </div>
  );
}
