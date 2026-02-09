import { TicketPercent, Copy, Tag } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/ui/Button'

// cspell:ignore TUEB Venkata Harshith Danda

export default function Offers() {
  const offers = [
    {title:'Welcome Offer', desc:'Flat 10% off on your first booking + snacks', code:'CINE10', color: 'from-blue-600 to-blue-400'},
    {title:'Tuesday Treat', desc:'Buy 1 Get 1 Free on all Tuesday shows', code:'TUEB1G1', color: 'from-purple-600 to-purple-400'},
    {title:'Student Special', desc:'20% off with valid Student ID', code:'STU20', color: 'from-green-600 to-green-400'},
  ]

  const [copied, setCopied] = useState<string | null>(null)

  const copyCode = (code: string) => {
      navigator.clipboard.writeText(code);
      setCopied(code);
      setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="min-h-screen bg-figma-bg text-white pt-24 pb-12 px-4 selection:bg-figma-accent selection:text-white font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-figma-accent pl-4 flex items-center gap-3">
            <Tag className="text-figma-accent" />
            Exclusive Offers
        </h1>
        
        <div className="grid gap-6">
            {offers.map(o => (
            <div key={o.title} className="bg-figma-card rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group hover:border-figma-accent/50 hover:shadow-[0_0_30px_rgba(247,37,133,0.15)] transition-all duration-300">
                {/* Decorative Glow */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br ${o.color} blur-[50px] opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                
                <div className={`w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner`}>
                    <TicketPercent size={28} className="text-figma-accent" />
                </div>

                <div className="flex-1 text-center sm:text-left z-10">
                    <h3 className="font-bold text-2xl text-white mb-2 tracking-tight">{o.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{o.desc}</p>
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-black/40 border border-white/10 text-figma-accent font-mono tracking-widest text-lg font-bold shadow-lg">
                        {o.code}
                    </div>
                </div>

                <Button 
                    variant="outline"
                    className="shrink-0 border-figma-accent text-figma-accent hover:bg-figma-accent hover:text-white z-10 transition-all duration-300 min-w-[120px]"
                    onClick={() => copyCode(o.code)}
                >
                    {copied === o.code ? 'Copied!' : <><Copy size={16} className="mr-2"/> Copy Code</>}
                </Button>
            </div>
            ))}
        </div>
      </div>
      
      <footer className="mt-12 w-full text-center text-xs text-gray-500">
          Developed by Venkata Sai Harshith Danda
      </footer>
    </div>
  )
}
