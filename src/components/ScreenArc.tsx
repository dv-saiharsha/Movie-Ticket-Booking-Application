export default function ScreenArc() {
  return (
    <div className="relative w-full flex flex-col items-center my-6">
      <div className="mb-2 text-3xl font-extrabold text-darkred tracking-widest drop-shadow text-center select-none">SCREEN</div>
      <svg viewBox="0 0 600 180" className="w-full h-32">
        <defs>
          <path id="curve" d="M 40 160 Q 300 20 560 160" />
        </defs>
        <use href="#curve" fill="transparent" stroke="#8B1414" strokeWidth="7" />
      </svg>
    </div>
  )
}
