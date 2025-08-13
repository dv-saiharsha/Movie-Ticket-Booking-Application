export default function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-full bg-yellow text-matte px-2.5 py-1 text-xs font-semibold shadow-sm border border-yellow">{children}</span>
}
