import axiosInstance from "../axiosConfig"

export type purchaseContentResponse = {
  message: string
}

export const purchaseContentAPI = async (contentId: string) => {
  try {
    const res = await axiosInstance.post<purchaseContentResponse>(
      `/purchase/purchaseContent/${contentId}`
    )

    if (res.status === 200 || res.status === 201) {
      return res.data
    } else {
      throw new Error(res.data.message || "Fetching content failed")
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

export type purchasedContentBody = {
  id: string
  title: string
  user: string
  purchaseDate: string
}

export type getAllPurchasedContentsResponse = {
  message: string
  data: purchasedContentBody[]
}

export const getAllPurchasedContents = async (authorId: string) => {
  try {
    const res = await axiosInstance.get<getAllPurchasedContentsResponse>(
      `/purchase/getAllAuthorPurchases/${authorId}`
    )

    if (res.status === 200 || res.status === 201) {
      return res.data
    } else {
      throw new Error(res.data.message || "Fetching content failed")
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}
