import React from "react"
import { MdOutlineNotifications } from "react-icons/md"

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-gray-100 px-6 py-4 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center"></div>

      {/* User Section */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V7a2 2 0 00-2-2H8a2 2 0 00-2 2v7c0 .554-.225 1.105-.595 1.595L4 17h5m4 0v1a3 3 0 01-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <img
          src="https://i.postimg.cc/sgCFDkr7/Adidas.jpg" // Replace with the profile image path
          alt="Profile"
          className="h-8 w-8 rounded-full"
        />
      </div>
    </div>
  )
}

export default Header
