export default function ProductsLoading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-9 w-28 bg-[#EEECE8] animate-pulse mb-2" />
          <div className="h-4 w-20 bg-[#EEECE8] animate-pulse" />
        </div>
        <div className="h-9 w-32 bg-[#EEECE8] animate-pulse" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 bg-[#EEECE8] animate-pulse" />
        ))}
      </div>
    </div>
  )
}
