
export default function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} 8plus. Built with Next.js. </p>
        <p className="mt-2">Metaphysics & UIX longform at <a className="underline" href="https://shuyan.art" target="_blank">shuyan.art</a>.</p>
      </div>
    </footer>
  );
}
