import React, { useState } from "react"
import { Table, Button } from "antd"
import { useNavigate } from "react-router-dom"
import {
  getAllContents,
  publishContent,
  publishedContentBody,
} from "../../api/contentAPI/contentAPI"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"

const PendingContents = () => {
  const navigate = useNavigate()
  const [allContents, setAllContents] = useState<publishedContentBody[]>([])

  const { isLoading, isFetching, isRefetching, refetch } = useQuery({
    queryKey: ["getAllAuthorContent"],
    queryFn: async () => await getAllContents(),
    onSuccess: (response) => {
      const contents = response.data.map((content) => {
        return { ...content, key: content.id }
      })
      setAllContents(contents)
    },
    onError: (error: Error) => {
      console.log("ERROR::getAllAuthorContent => ", error.message)
    },
    refetchOnWindowFocus: false,
  })

  const { mutate: updateContentMutation, isLoading: isUpdatingContent } =
    useMutation({
      mutationKey: ["approveContent"],
      mutationFn: async (payload: { contentId: string; action: string }) =>
        publishContent(payload.contentId, payload.action),
      onSuccess: (response) => {
        toast.success(response.message)
        refetch()
      },
      onError: (error: Error) => {
        console.log("ERROR::approveContent => ", error.message)
        toast.error(error.message)
      },
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
      title: "Author",
      dataIndex: "author",
      key: "author",
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
        <div className="flex space-x-2">
          <Button type="primary" onClick={() => handleApprove(record.key)}>
            Approve
          </Button>
          <Button type="danger" onClick={() => handleReject(record.key)}>
            Reject
          </Button>
        </div>
      ),
    },
  ]

  const handleRowClick = (key) => {
    navigate(`/dashboard/contents/${key}`) // Adjust the URL path as needed
  }

  const handleApprove = (key) => {
    // Implement the logic for approving the article here
    console.log(`Approved article with key: ${key}`)
    updateContentMutation({
      contentId: key,
      action: "publish",
    })
  }

  const handleReject = (key) => {
    // Implement the logic for rejecting the article here
    console.log(`Rejected article with key: ${key}`)
    updateContentMutation({
      contentId: key,
      action: "unpublish",
    })
  }

  return (
    <div className=" mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Pending Contents
      </h2>
      <Table
        loading={isLoading || isRefetching || isFetching || isUpdatingContent}
        columns={columns}
        dataSource={allContents}
        pagination={false}
      />
    </div>
  )
}

export default PendingContents
