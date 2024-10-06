import axiosInstance from "../axiosConfig"

export type permissionBody = {
  role: string
  permission: string[]
}

export type getAllPermissionsResponse = {
  message: string
  data: permissionBody[]
}

export const requestPermission = async (contendId: string) => {
  try {
    const res = await axiosInstance.post<getAllPermissionsResponse>(
      `/permission/requestPermission/${contendId}`
    )

    if (res.status === 200 || res.status === 201) {
      return res.data
    } else {
      throw new Error(res.data.message || "Fetching permission failed")
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

export type authorPermissionRequest = {
  id: string
  title: string
  user: string
  accessGranted: boolean
  date: string
  permissionId: string
}

export type authorPermissionRequestsResponse = {
  message: string
  data: authorPermissionRequest[]
}

export const getAuthorPermissionRequests = async () => {
  try {
    const res = await axiosInstance.get<authorPermissionRequestsResponse>(
      `/permission/authorPermissionRequests`
    )

    if (res.status === 200 || res.status === 201) {
      return res.data
    } else {
      throw new Error(res.data.message || "Fetching permission failed")
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

export type grantPermissionResponse = {
  message: string
  data: []
}

export const grantPermission = async (permissionId: string) => {
  try {
    const res = await axiosInstance.post<grantPermissionResponse>(
      `/permission/grantPermission/${permissionId}`
    )

    if (res.status === 200 || res.status === 201) {
      return res.data
    } else {
      throw new Error(res.data.message || "Fetching permission failed")
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}
