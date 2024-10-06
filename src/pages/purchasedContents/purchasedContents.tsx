import React, { useState } from "react"
import { Table } from "antd"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
  getAllPurchasedContents,
  purchasedContentBody,
} from "../../api/purchaseAPI/purchaseAPI"
import { useUserStore } from "../../store/userStore"

const PurchasedContents = () => {
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const [purchasedContent, setPurchasedContent] = useState<
    purchasedContentBody[]
  >([])

  const { isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["getAllPurchasedContents"],
    queryFn: async () => await getAllPurchasedContents(user?.id || ""),
    onSuccess: (response) => {
      const purchasedData = response.data.map((item) => {
        return {
          key: item.id,
          ...item,
        }
      })
      setPurchasedContent(purchasedData)
    },
    onError: (error: Error) => {
      console.log("ERROR::getAllPurchasedContents => ", error.message)
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
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      render: (text) => new Date(text).toDateString(),
    },
  ]

  const handleRowClick = (key: string) => {
    navigate(`/dashboard/contents/${key}`) // Adjust the URL path as needed
  }

  return (
    <div className=" mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Purchased Contents
      </h2>
      <Table
        columns={columns}
        loading={isLoading || isFetching || isRefetching}
        dataSource={purchasedContent}
        pagination={false}
      />
    </div>
  )
}

export default PurchasedContents
