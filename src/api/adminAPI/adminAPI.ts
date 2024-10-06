import axiosInstance from "../axiosConfig"

export type Author = {
  id: string
  name: string
  email: string
  role: string
  isVerified: boolean
}
export type getAllAuthorsResponse = {
  message: string
  authors: Author[]
}

export const getAllAuthors = async () => {
  try {
    const res = await axiosInstance.get<getAllAuthorsResponse>(
      "/user/getAllAuthors"
    )

    if (res.status === 200 || res.status === 201) {
      return res.data
    } else {
      throw new Error(res.data.message || "Fetching authors failed")
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

type approveAuthorResponse = {
  message: string
}

export const approveAuthor = async (authorId: string, action: string) => {
  try {
    const res = await axiosInstance.put<approveAuthorResponse>(
      `/user/verifyAuthor/${authorId}`,
      { action }
    )

    if (res.status === 200 || res.status === 201) {
      return res.data
    } else {
      throw new Error(res.data.message || "Approving author failed")
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}
