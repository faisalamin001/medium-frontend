import axiosInstance from "../axiosConfig"

export type RegisterUserBody = {
  email: string
  password: string
  name: string
  role: string
}

type RegisterUserResponse = {
  message: string
  data?: RegisterUserBody
}

export const registerUser = async (body: RegisterUserBody) => {
  try {
    const res = await axiosInstance.post<RegisterUserResponse>(
      "/auth/register",
      body
    )

    if (res.status === 200 || res.status === 201) {
      return res.data
    } else {
      throw new Error(res.data.message || "Registration failed")
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

export type LoginUserBody = {
  email: string
  password: string
}

export type loginUserResponse = {
  message: string
  token: string
  data: {
    id: string
    name: string
    email: string
    role: string
  }
}

export const loginUser = async (body: LoginUserBody) => {
  try {
    const res = await axiosInstance.post<loginUserResponse>("/auth/login", body)

    if (res.status === 200 || res.status === 201) {
      return res.data
    } else {
      throw new Error(res.data.message || "Login failed")
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}
