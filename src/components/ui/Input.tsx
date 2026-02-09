import { cn } from './cn'
export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('w-full h-10 rounded-lg border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-figma-accent focus:border-figma-accent text-gray-900 bg-white placeholder:text-gray-400', props.className)} />
}
