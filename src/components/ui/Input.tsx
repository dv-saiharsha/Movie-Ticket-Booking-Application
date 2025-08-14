import { cn } from './cn'
export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('w-full h-10 rounded-2xl border border-teal px-3 outline-none focus:ring-2 focus:ring-teal focus:border-teal text-darkteal bg-cream', props.className)} />
}
