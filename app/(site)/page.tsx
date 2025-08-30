
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="py-16">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Engineering · UX · Consulting</h1>
      <p className="mt-4 text-lg text-slate-600 max-w-2xl">
        I build clean, reliable web products and consult on product/UX. Book a session or browse my work.
      </p>
      <div className="mt-6 flex gap-3">
        <a href="/projects" className="px-4 py-2 rounded-lg border">View Projects</a>
        <a href="/booking" className="px-4 py-2 rounded-lg bg-black text-white">Book Time</a>
      </div>
    </section>
  );
}
