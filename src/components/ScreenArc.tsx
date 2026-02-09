
export default function ScreenArc() {
  return (
    <div className="relative w-full flex flex-col items-center my-10">
      <div className="mb-4 text-xs font-bold text-gray-500 uppercase tracking-[0.5em] select-none text-center glow-text">SCREEN THIS WAY</div>
      <div className="w-full max-w-2xl h-10 bg-gradient-to-b from-figma-accent/20 to-transparent rounded-t-[50%] blur-sm"></div>
      <div className="w-full max-w-2xl h-1 bg-gradient-to-r from-transparent via-figma-accent to-transparent mt-[-4px] shadow-[0_0_20px_rgba(247,37,133,0.5)]"></div>
    </div>
  )
}

