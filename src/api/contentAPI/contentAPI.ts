import axiosInstance from "../axiosConfig"

export type contentBody = {
  title: string
  description: string
  type: string
  tag: string[]
}

type createContentResponse = {
  message: string
}

export const createContentAPI = async (authorId: string, body: contentBody) => {
  try {
    const res = await axiosInstance.post<createContentResponse>(
      `/content/create/${authorId}`,
      body
    )

    if (res.status === 200 || res.status === 201) {
      return res.data
    } else {
      throw new Error(res.data.message || "Creating content failed")
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

export type authorContentBody = {
  id: string
  title: string
  description: string
  type: string
  tag: string[]
  isPublished: boolean
}

type getAllAuthorContentResponse = {
  message: string
  data: authorContentBody[]
}

export const getAllAuthorContent = async (authorId: string) => {
  try {
    const res = await axiosInstance.get<getAllAuthorContentResponse>(
      `/content/getAllAuthorContent/${authorId}`
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

export type publishedContentBody = {
  id: string
  title: string
  description: string
  type: string
  tag: string[]
  author: string
  createdAt: string
  restricted: boolean
}

export type getAllPublishedContentsResponse = {
  message: string
  data: publishedContentBody[]
}

export const getAllPublishedContents = async () => {
  try {
    const res = await axiosInstance.get<getAllPublishedContentsResponse>(
      `/content/getAllPublishedContents`
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

type getContentByIdResponse = {
  message: string
  data: publishedContentBody
}

export const getContentById = async (contentId: string) => {
  try {
    const res = await axiosInstance.get<getContentByIdResponse>(
      `/content/getContentById/${contentId}`
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

type getAllContentsResponse = {
  message: string
  data: publishedContentBody[]
}

export const getAllContents = async () => {
  try {
    const res = await axiosInstance.get<getAllContentsResponse>(
      `/content/getAllContents`
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

type publishContentResponse = {
  message: string
}

export const publishContent = async (contentId: string, action: string) => {
  try {
    const res = await axiosInstance.put<publishContentResponse>(
      `/content/publishContent/${contentId}`,
      {
        action,
      }
    )

    if (res.status === 200 || res.status === 201) {
      return res.data
    } else {
      throw new Error(res.data.message || "Publishing content failed")
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}
