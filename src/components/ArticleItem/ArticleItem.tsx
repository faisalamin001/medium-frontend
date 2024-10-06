import React from "react"
import { useNavigate } from "react-router-dom"
import { publishedContentBody } from "../../api/contentAPI/contentAPI"

type ArticleItemProps = {
  content: publishedContentBody
}

const ArticleItem = (props: ArticleItemProps) => {
  const navigate = useNavigate()
  const { title, description, author, tag, type, createdAt, id } = props.content

  return (
    <div
      className=" p-6 cursor-pointer hover:bg-gray-200 rounded-lg shadow-lg bg-gray-100 my-4  mx-auto"
      onClick={() => navigate(id)}
    >
      {/* Top Section */}
      <div className="flex items-start justify-between ">
        <div className="flex items-start">
          {/* Profile Avatar */}
          <img
            src="../../../public/favicon.png" // Placeholder for the avatar image
            alt="Profile Avatar"
            className="w-12 h-12 rounded-full border  bg-gray-200 mr-4"
          />

          {/* User Info */}
          <div>
            <h3 className="text-lg font-semibold">{author} </h3>
            <p className="text-sm ">
              {new Date(createdAt).toDateString()} •{" "}
              <span className="text-blue-400">Posted on Medium</span>
            </p>
          </div>
        </div>

        {/* Article type */}
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-gray-500 bg-gray-200 mt-2">
          {type.toLocaleUpperCase()}
        </span>
      </div>

      {/* Post Title */}
      <h2 className="mt-4 text-2xl text-gray-600 font-bold">{title}</h2>

      {/* trim the description , dont show full */}
      <p className="mt-2  text-gray-500">
        {description.length > 150
          ? description.slice(0, 150) + "..."
          : description}
      </p>
    </div>
  )
}

export default ArticleItem
