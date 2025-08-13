import { cn } from './cn'
export default function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('rounded-2xl bg-matte shadow-lg p-6 text-silver border border-matte', className)}>{children}</div>
}
