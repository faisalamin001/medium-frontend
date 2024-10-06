import { useState } from "react"
import { Skeleton } from "antd"
import ArticleItem from "../../components/ArticleItem/ArticleItem"
// import { useUserStore } from "../../store/userStore"
import { useQuery } from "@tanstack/react-query"
import {
  getAllPublishedContents,
  publishedContentBody,
} from "../../api/contentAPI/contentAPI"

const Contents = () => {
  // const user = useUserStore((state) => state.user)
  const [allPublishedContents, setAllPublishedContents] = useState<
    publishedContentBody[]
  >([])

  const { isLoading, isFetching, isRefetching } = useQuery({
    queryKey: ["getAllPublishedContents"],
    queryFn: async () => await getAllPublishedContents(),
    onSuccess: (response) => {
      setAllPublishedContents(response.data)
    },
    onError: (error: Error) => {
      console.log("ERROR::getAllPublishedContents => ", error.message)
    },
    refetchOnWindowFocus: false,
  })
  return (
    <div>
      {isLoading || isRefetching || isRefetching ? (
        <div className=" p-6 rounded-lg shadow-lg bg-gray-100 my-4  mx-auto">
          <Skeleton active />
        </div>
      ) : (
        allPublishedContents.map((content) => (
          <ArticleItem key={content.id} content={content} />
        ))
      )}
    </div>
  )
}

export default Contents
