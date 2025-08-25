
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="py-16">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Engineering · UX · Consulting</h1>
      <p className="mt-4 text-lg text-slate-600 max-w-2xl">
        I build clean, reliable web products and consult on product/UX. Book a session or browse my work.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/projects" className="px-4 py-2 rounded-lg border">View Projects</Link>
        <Link href="/booking" className="px-4 py-2 rounded-lg bg-black text-white">Book Time</Link>
      </div>
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-semibold text-xl">Recent Posts</h2>
          <ul className="mt-4 list-disc list-inside text-slate-700">
            <li><Link href="/blog/hello-8plus">Hello 8plus</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-xl">Highlights</h2>
          <p className="mt-2 text-slate-700">Frontend systems, Next.js, content platforms, booking & auth integrations.</p>
        </div>
      </div>
    </section>
  );
}
