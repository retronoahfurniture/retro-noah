import type { Metadata } from 'next'
import AdminNav from './AdminNav'

export const metadata: Metadata = {
  title: 'Admin | Retro Noah',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">
      <AdminNav />
      <main className="flex-1 min-w-0 p-6 lg:p-10">{children}</main>
    </div>
  )
}
