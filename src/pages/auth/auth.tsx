import { useEffect, useState } from "react"
import { Form, Input, Button, Select } from "antd"
import {
  loginUser,
  LoginUserBody,
  RegisterUserBody,
} from "../../api/authAPI/authAPI"
import { registerUser } from "../../api/authAPI/authAPI"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useUserStore } from "../../store/userStore"
import { useNavigate } from "react-router-dom"

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true)
  const { user, token, setUser, setToken } = useUserStore()
  const navigate = useNavigate()

  // Redirect to dashboard if the user is logged in
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser)

      if (!token || !user) {
        setToken(storedToken)
        setUser(parsedUser)
      }

      navigate("/")
    } else if (token && user) {
      navigate("/")
    }
  }, [user, token, navigate, setUser, setToken])

  const { mutate: registerUserMutation, isLoading } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (payload: RegisterUserBody) => registerUser(payload),
    onSuccess: (response) => {
      toast.success(response.message)
    },
    onError: (error: Error) => {
      console.log("ERROR::userRegister => ", error.message)
      toast.error(error.message)
    },
  })
  const { mutate: loginUserMutation, isLoading: isLogginin } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (payload: LoginUserBody) => loginUser(payload),
    onSuccess: (response) => {
      const { data, token } = response
      localStorage.setItem("user", JSON.stringify(data))
      localStorage.setItem("token", token)
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
      })
      setToken(token)
      toast.success(response.message)
      navigate("/")
    },
    onError: (error: Error) => {
      console.log("ERROR::userRegister => ", error.message)
      toast.error(error.message)
    },
  })

  const handleSubmit = (values: RegisterUserBody) => {
    if (isSignUp) {
      registerUserMutation(values)
    } else {
      loginUserMutation(values)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-center text-2xl font-semibold mb-4">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <Form onFinish={handleSubmit} layout="vertical">
          {isSignUp && (
            <>
              <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Select placeholder="Select User Type">
                  <Select.Option value="user">User</Select.Option>
                  <Select.Option value="author">Author</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>
            </>
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading || isLogginin}
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <Button type="link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? "Already have an account? Login"
              : "Need an account? Sign Up"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
