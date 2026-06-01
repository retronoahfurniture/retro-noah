export default function GalleryLoading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-9 w-28 bg-[#EEECE8] animate-pulse mb-2" />
          <div className="h-4 w-20 bg-[#EEECE8] animate-pulse" />
        </div>
        <div className="h-9 w-28 bg-[#EEECE8] animate-pulse" />
      </div>
      <div className="flex gap-4 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-5 w-16 bg-[#EEECE8] animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] bg-[#EEECE8] animate-pulse" />
        ))}
      </div>
    </div>
  )
}
