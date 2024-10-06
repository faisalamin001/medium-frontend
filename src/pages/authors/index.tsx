import React from "react"
import { Table, Button } from "antd"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getAllAuthors, approveAuthor } from "../../api/adminAPI/adminAPI"
import toast from "react-hot-toast"

type Record = {
  key: string
  approved: boolean
}

const Authors = () => {
  const [authors, setAuthors] = React.useState<any[]>([])

  const { isLoading, refetch, isFetching, isRefetching } = useQuery({
    queryKey: ["getAllAuthors"],
    queryFn: async () => await getAllAuthors(),
    onSuccess: (response) => {
      const structuredAuthors = response.authors.map((author) => ({
        key: author.id,
        name: author.name,
        email: author.email,
        approved: author.isVerified,
      }))
      setAuthors(structuredAuthors)
    },
    onError: (error: Error) => {
      console.log("ERROR::getAllAuthors => ", error.message)
    },
    refetchOnWindowFocus: false,
  })

  const { mutate: registerUserMutation, isLoading: isApprovingAuthor } =
    useMutation({
      mutationKey: ["approveAuthor"],
      mutationFn: async (payload: { authorId: string; action: string }) =>
        approveAuthor(payload.authorId, payload.action),
      onSuccess: (response) => {
        toast.success(response.message)
        refetch()
      },
      onError: (error: Error) => {
        console.log("ERROR::userRegister => ", error.message)
        toast.error(error.message)
      },
    })

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Approval Status",
      dataIndex: "approved",
      key: "approved",
      render: (approved: Record) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-lg ${
            approved ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {approved ? "Approved" : "Pending"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: Record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            onClick={() => handleApproveAuthor(record)}
            disabled={record.approved}
          >
            Approve
          </Button>
          <Button
            type="default"
            danger
            onClick={() => handleApproveAuthor(record)}
            disabled={!record.approved}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ]

  const handleApproveAuthor = (record: Record) => {
    registerUserMutation({
      authorId: record.key,
      action: record.approved ? "reject" : "approve",
    })
  }

  return (
    <div className=" mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Authors Approval
      </h2>
      <Table
        columns={columns}
        loading={isLoading || isApprovingAuthor || isFetching || isRefetching}
        dataSource={authors}
        pagination={false}
      />
    </div>
  )
}

export default Authors
