import logo from "../../../public/logo.png"
import { IoHomeSharp } from "react-icons/io5"
import { IoIosCreate } from "react-icons/io"
import { HiUsers } from "react-icons/hi"
import { FaTableList } from "react-icons/fa6"
import { BiSolidPurchaseTag } from "react-icons/bi"
import { FaLock } from "react-icons/fa"
import { MdArticle } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom"
import { useUserStore } from "../../store/userStore"

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, clearUser } = useUserStore() // Assuming user object contains role information

  const isActive = (path: string) => location.pathname?.includes(path)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    clearUser()
    navigate("/auth")
  }

  // Conditional Rendering based on Role
  const renderLinks = () => {
    switch (user?.role) {
      case "admin":
        return (
          <>
            <a
              href="#"
              onClick={() => navigate("/dashboard/contents")}
              className={`flex font-medium text-lg items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-300 ${
                isActive("/dashboard/contents")
                  ? "bg-gray-200 text-gray-900"
                  : ""
              }`}
            >
              <IoHomeSharp className="h-5 w-5 mr-3" />
              Contents
            </a>
            <a
              href="#"
              onClick={() => navigate("/dashboard/authors")}
              className={`flex font-medium text-lg items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-300 ${
                isActive("/dashboard/authors")
                  ? "bg-gray-200 text-gray-900"
                  : ""
              }`}
            >
              <HiUsers className="h-5 w-5 mr-3" />
              Authors
            </a>
            <a
              href="#"
              onClick={() => navigate("/dashboard/pendingcontents")}
              className={`flex font-medium text-lg items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-300 ${
                isActive("/dashboard/pendingcontents")
                  ? "bg-gray-200 text-gray-900"
                  : ""
              }`}
            >
              <FaTableList className="h-5 w-5 mr-3" />
              Pending Contents
            </a>
          </>
        )

      case "author":
        return (
          <>
            <a
              href="#"
              onClick={() => navigate("/dashboard/mycontents")}
              className={`flex font-medium text-lg items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-300 ${
                isActive("/dashboard/mycontents")
                  ? "bg-gray-200 text-gray-900"
                  : ""
              }`}
            >
              <MdArticle className="h-5 w-5 mr-3" />
              My Contents
            </a>
            <a
              href="#"
              onClick={() => navigate("/dashboard/create")}
              className={`flex font-medium text-lg items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-300 ${
                isActive("/dashboard/contents/create")
                  ? "bg-gray-200 text-gray-900"
                  : ""
              }`}
            >
              <IoIosCreate className="h-5 w-5 mr-3" />
              Create Content
            </a>
            <a
              href="#"
              onClick={() => navigate("/dashboard/purchasedcontents")}
              className={`flex font-medium text-lg items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-300 ${
                isActive("/dashboard/purchasedcontents")
                  ? "bg-gray-200 text-gray-900"
                  : ""
              }`}
            >
              <BiSolidPurchaseTag className="h-5 w-5 mr-3" />
              Purchased Contents
            </a>
            <a
              href="#"
              onClick={() => navigate("/dashboard/grantaccess")}
              className={`flex font-medium text-lg items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-300 ${
                isActive("/dashboard/grantaccess")
                  ? "bg-gray-200 text-gray-900"
                  : ""
              }`}
            >
              <FaLock className="h-5 w-5 mr-3" />
              Grant Access
            </a>
          </>
        )

      case "user":
        return (
          <>
            <a
              href="#"
              onClick={() => navigate("/dashboard/contents")}
              className={`flex font-medium text-lg items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-300 ${
                isActive("/dashboard/contents")
                  ? "bg-gray-200 text-gray-900"
                  : ""
              }`}
            >
              <IoHomeSharp className="h-5 w-5 mr-3" />
              Contents
            </a>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="h-screen w-64 bg-gray-100 flex flex-col justify-between shadow-md">
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Logo / Branding */}
        <div className="py-3 px-4">
          <img src={logo} alt="Logo" className="h-full w-full mx-auto" />
        </div>

        {/* Navigation Links */}
        <nav className="mt-8">{renderLinks()}</nav>
      </div>

      <div className="px-4 py-6">
        <button
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
