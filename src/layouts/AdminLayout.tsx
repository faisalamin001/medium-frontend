import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar/Sidebar"
import Header from "../components/Header/Header"

export const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="transition-all w-64 bg-gray-100">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        {/* Header */}
        <div>
          <Header />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
