import { forwardRef } from 'react'
import { cn } from './cn'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm'|'md'|'lg'
}
const Button = forwardRef<HTMLButtonElement, Props>(({ className, variant='default', size='md', ...props}, ref) => {
  const base = 'inline-flex items-center justify-center rounded-2xl font-medium transition active:scale-[.98] shadow-sm focus:outline-none focus:ring-2 focus:ring-black/30 dark:focus:ring-white/30'
  const variants = {
    default: 'bg-yellow text-matte hover:bg-yellow/80',
    outline: 'border border-matte bg-matte hover:bg-yellow/10 text-silver',
    ghost: 'bg-transparent hover:bg-yellow/10 text-yellow',
  } as const
  const sizes = { sm: 'h-8 px-3', md: 'h-10 px-4', lg: 'h-12 px-6 text-lg' } as const
  return <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
})
export default Button
