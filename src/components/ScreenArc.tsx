export default function ScreenArc() {
  return (
    <div className="relative w-full flex flex-col items-center my-4">
      <svg viewBox="0 0 500 120" className="w-full h-16">
        <defs>
          <path id="curve" d="M 20 100 Q 250 10 480 100" />
        </defs>
        <use href="#curve" fill="transparent" stroke="#fee36e" strokeWidth="3"/>
        <text width="500">
          <textPath href="#curve" startOffset="50%" textAnchor="middle" className="fill-white tracking-[0.3em] text-sm font-bold">
            SCREEN
          </textPath>
        </text>
      </svg>
    </div>
  )
}
