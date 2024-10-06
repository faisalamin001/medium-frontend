import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import PurchaseModal from "../../../components/PurchaseModal/PurchaseModal"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  getContentById,
  publishedContentBody,
} from "../../../api/contentAPI/contentAPI"
import { useUserStore } from "../../../store/userStore"
import { Skeleton, Button } from "antd"
import toast from "react-hot-toast"
import { requestPermission } from "../../../api/permissionAPI/permissionAPI"

const ContentDetail = () => {
  const user = useUserStore((state) => state.user)
  const [content, setContent] = useState<publishedContentBody>()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const { isLoading, isFetching, isRefetching, refetch } = useQuery({
    queryKey: ["getContentById"],
    queryFn: async () => await getContentById(id || ""),
    onSuccess: (response) => {
      setContent(response.data)
    },
    onError: (error: Error) => {
      console.log("ERROR::getContentById => ", error.message)
    },
    refetchOnWindowFocus: false,
  })

  const {
    mutate: requestPermissionMutate,
    isLoading: isRequestPermissionLoading,
  } = useMutation({
    mutationKey: ["requestPermission"],
    mutationFn: async (payload: { id: string }) =>
      requestPermission(payload.id),
    onSuccess: (response) => {
      toast.success(response.message)
    },
    onError: (error: Error) => {
      console.log("ERROR::requestPermission => ", error.message)
      toast.error(error.message)
    },
  })

  const showModal = () => {
    setOpen(true)
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mx-auto text-gray-800">
      {
        // show skeleton while loading
        isLoading || isFetching || isRefetching ? (
          <div className=" p-6 rounded-lg shadow-lg bg-gray-100 my-4  mx-auto">
            <Skeleton active />
          </div>
        ) : null
      }
      {/* Navigation Back */}
      <div className="mb-4" onClick={() => navigate(-1)}>
        <button className="flex items-center text-blue-500">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Heading */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold leading-snug">{content?.title}</h1>
        </div>

        {/* Tag Section */}
        {content?.tag && (
          <div className="my-4">
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {content.tag}
            </span>
          </div>
        )}

        {/* Handle the restricted style */}
        <p
          className={`text-lg tracking-wide w-full leading-relaxed mb-4 ${
            content?.restricted && "my-5 py-5 text-4xl text-gray-400"
          }`}
        >
          {content?.description}
        </p>
      </div>

      {
        // only show the footer if the content is restricted
        content?.restricted && (
          <div className="mt-6 flex justify-end gap-3 items-center">
            <Button
              onClick={showModal}
              className="bg-green-500 text-white rounded-md px-6 py-5 shadow hover:bg-green-600"
            >
              Purchase
            </Button>

            <Button
              loading={isRequestPermissionLoading}
              onClick={() => requestPermissionMutate({ id: id || "" })}
              className="bg-blue-500 text-white rounded-md px-6 py-5 shadow hover:bg-blue-600"
            >
              Request Access
            </Button>
          </div>
        )
      }

      {id && (
        <PurchaseModal
          setOpen={setOpen}
          open={open}
          id={id}
          refetch={refetch}
        />
      )}
    </div>
  )
}

export default ContentDetail
