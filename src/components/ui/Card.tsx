import { cn } from './cn'
export default function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('rounded-2xl shadow-lg p-6 text-primary border border-secondary bg-white/90 backdrop-blur-sm', className)}>{children}</div>
}
