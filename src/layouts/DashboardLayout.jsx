import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"


export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Header/>

        <main className="p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}
