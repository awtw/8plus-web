
"use client";
import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase";

export default function LoginPage() {
  const supabase = createSupabaseBrowser();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendMagic = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    setMsg(error ? error.message : "Magic link sent. Check your inbox.");
  };

  return (
    <div className="py-12 max-w-md">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      <p className="text-sm text-slate-600 mt-2">Use email magic link.</p>
      <div className="mt-4 space-y-3">
        <input className="border px-3 py-2 rounded w-full" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="px-4 py-2 rounded bg-black text-white" onClick={sendMagic}>Send Link</button>
        {msg && <p className="text-sm mt-2">{msg}</p>}
      </div>
    </div>
  );
}
