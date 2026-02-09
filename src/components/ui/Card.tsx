import { cn } from './cn'
export default function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('rounded-2xl shadow-xl p-6 text-figma-text border border-black/5 bg-white backdrop-blur-md', className)}>{children}</div>
}

