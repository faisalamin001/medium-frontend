import React, { useState } from "react"
import { Table, Button } from "antd"
import { useNavigate } from "react-router-dom"
import {
  authorContentBody,
  getAllAuthorContent,
} from "../../api/contentAPI/contentAPI"
import { useQuery } from "@tanstack/react-query"
import { useUserStore } from "../../store/userStore"

const MyContents = () => {
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const [allAuthorContents, setAllAuthorContents] = useState<
    authorContentBody[]
  >([])

  const { isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["getAllAuthorContent"],
    queryFn: async () => await getAllAuthorContent(user?.id || ""),
    onSuccess: (response) => {
      const contents = response.data.map((content) => {
        return { ...content, key: content.id }
      })
      setAllAuthorContents(contents)
    },
    onError: (error: Error) => {
      console.log("ERROR::getAllAuthorContent => ", error.message)
    },
    refetchOnWindowFocus: false,
  })

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <a
          onClick={() => handleRowClick(record.key)}
          className="text-blue-500 hover:underline"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Status",
      dataIndex: "isPublished",
      key: "isPublished",
      // show like badge
      render: (text) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-lg ${
            text ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {text ? "Published" : "Pending"}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toDateString(),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleRowClick(record.key)}>
          See More
        </Button>
      ),
    },
  ]

  const handleRowClick = (key) => {
    navigate(`/dashboard/contents/${key}`) // Adjust the URL path as needed
  }

  return (
    <div className=" mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">My Contents</h2>
      <Table
        columns={columns}
        loading={isLoading || isFetching || isRefetching}
        dataSource={allAuthorContents}
        pagination={false}
      />
    </div>
  )
}

export default MyContents
