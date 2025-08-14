
// Offers page: Shows available coupon codes and offers
import Card from '../components/ui/Card'

export default function Offers() {
  // List of available offers
  const offers = [
    {title:'CINE10', desc:'Flat 10% off on tickets + snacks', code:'CINE10'},
    {title:'B1G1 TUE', desc:'Buy 1 Get 1 on Tuesdays', code:'TUEB1G1'},
    {title:'STU20', desc:'20% off with student ID', code:'STU20'},
  ]
  return (
  <div className="min-h-screen flex flex-col justify-between ">
      <div className="container py-6 grid gap-4 grid-cols-1">
        {/* Render each offer as a card */}
        {offers.map(o => (
          <Card key={o.title} className="space-y-2 group border-orange text-black">
            <h3 className="font-semibold text-black">{o.title}</h3>
            <p className="text-sm text-black">{o.desc}</p>
            <div className="text-xs text-black/80">Use code: {o.code}</div>
            {/* Button to copy coupon code to clipboard */}
            <button
              className="mt-2 px-3 py-1 rounded-full text-lightgrey font-semibold shadow transition-all duration-150 ease-in-out opacity-0 group-hover:opacity-100 bg-darkred"
              onClick={()=>navigator.clipboard.writeText(o.code)}
            >
              Apply Coupon
            </button>
          </Card>
        ))}
      </div>
  <footer className="w-full text-center py-4 text-xs text-black">Developed by Venkata Sai Harshith Danda</footer>
    </div>
  )
}
