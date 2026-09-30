export function FaqList({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <div className="services-faq">
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
