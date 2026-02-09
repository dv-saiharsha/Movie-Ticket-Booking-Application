import { forwardRef } from 'react'
import { cn } from './cn'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'glass'
  size?: 'sm'|'md'|'lg'
}
const Button = forwardRef<HTMLButtonElement, Props>(({ className, variant='default', size='md', ...props}, ref) => {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition active:scale-[.98] shadow-sm focus:outline-none focus:ring-2 focus:ring-figma-accent/50'
  const variants = {
  default: 'bg-figma-accent text-white hover:bg-red-600 font-bold shadow-[0_4px_14px_0_rgba(217,67,67,0.39)]',
  outline: 'border border-figma-accent text-figma-accent bg-transparent hover:bg-figma-accent/10',
  ghost: 'bg-transparent text-white hover:bg-white/10',
  glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
  } as const
  const sizes = { sm: 'h-8 px-3', md: 'h-10 px-4', lg: 'h-12 px-6 text-lg' } as const
  return <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
})
export default Button
