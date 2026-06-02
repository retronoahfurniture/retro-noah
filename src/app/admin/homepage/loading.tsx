export default function HomepageLoading() {
  return (
    <div>
      <div className="mb-8">
        <div className="h-9 w-36 bg-[#EEECE8] animate-pulse mb-2" />
        <div className="h-4 w-64 bg-[#EEECE8] animate-pulse" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white border border-[#EEECE8] p-5">
            <div className="h-4 w-32 bg-[#EEECE8] animate-pulse mb-1" />
            <div className="h-3 w-48 bg-[#EEECE8] animate-pulse mb-3" />
            <div className="aspect-[16/9] bg-[#EEECE8] animate-pulse mb-3" />
            <div className="h-8 bg-[#EEECE8] animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
