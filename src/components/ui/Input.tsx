import { cn } from './cn'
export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('w-full h-10 rounded-2xl border border-matte px-3 outline-none focus:ring-2 focus:ring-yellow focus:border-yellow bg-matte text-silver', props.className)} />
}
