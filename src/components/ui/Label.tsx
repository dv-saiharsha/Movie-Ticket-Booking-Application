export default function Label({children, htmlFor}:{children:React.ReactNode; htmlFor?:string}) {
  return <label htmlFor={htmlFor} className="block text-sm font-medium text-silver mb-1">{children}</label>
}
