// This is a simple loading spinner component using the provided Flaticon SVG
// Attribution: Loading icons created by meaicon - Flaticon

export default function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <img
        src="/loading-flaticon.svg"
        alt="Loading..."
        className="w-16 h-16 animate-spin"
        style={{ animationDuration: '1s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}
      />
      <span className="mt-2 text-silver text-sm">Loading...</span>
    </div>
  )
}
