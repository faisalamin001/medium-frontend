import React from "react"
import { Table, Button } from "antd"
import { useNavigate } from "react-router-dom"
import {
  authorPermissionRequest,
  getAuthorPermissionRequests,
  grantPermission,
} from "../../api/permissionAPI/permissionAPI"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"

const GrantAccess = () => {
  const navigate = useNavigate()

  const [allPermissionRequests, setAllPermissionRequests] = React.useState<
    authorPermissionRequest[]
  >([])

  const { isLoading, refetch, isFetching, isRefetching } = useQuery({
    queryKey: ["allPermissionRequests"],
    queryFn: async () => await getAuthorPermissionRequests(),
    onSuccess: (response) => {
      const structuredRequests = response.data.map((request) => ({
        key: request.id,
        ...request,
      }))
      setAllPermissionRequests(structuredRequests)
    },
    onError: (error: Error) => {
      console.log("ERROR::allPermissionRequests => ", error.message)
    },
    refetchOnWindowFocus: false,
  })

  const { mutate: grantPermissionMutate, isLoading: grantPermissionLoading } =
    useMutation({
      mutationKey: ["grantPermission"],
      mutationFn: async (payload: { id: string }) =>
        grantPermission(payload.id),
      onSuccess: (response) => {
        toast.success(response.message)
        refetch()
      },
      onError: (error: Error) => {
        console.log("ERROR::grantPermission => ", error.message)
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
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toDateString(),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleGrantAccess(record)}
          disabled={record.accessGranted}
        >
          Grant Access
        </Button>
      ),
    },
  ]

  const handleRowClick = (key) => {
    navigate(`/dashboard/contents/${key}`) // Adjust the URL path as needed
  }

  const handleGrantAccess = (record) => {
    grantPermissionMutate({ id: record.permissionId })
  }

  return (
    <div className=" mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Grant Access to Articles
      </h2>
      <Table
        columns={columns}
        loading={
          isLoading || isFetching || isRefetching || grantPermissionLoading
        }
        dataSource={allPermissionRequests}
        pagination={false}
      />
    </div>
  )
}

export default GrantAccess
