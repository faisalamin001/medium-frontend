import { Form, Input, Select, Button } from "antd"
import { contentBody } from "../../api/contentAPI/contentAPI"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { createContentAPI } from "../../api/contentAPI/contentAPI"
import { useUserStore } from "../../store/userStore"

const { TextArea } = Input
const { Option } = Select

const CreateContent = () => {
  const user = useUserStore((state) => state.user)
  const [form] = Form.useForm()

  const { mutate: createContentMutation, isLoading } = useMutation({
    mutationKey: ["createContent"],
    mutationFn: async (payload: { authorId: string; body: contentBody }) =>
      createContentAPI(payload.authorId, payload.body),
    onSuccess: (response) => {
      toast.success(response.message)
      form.resetFields()
    },
    onError: (error: Error) => {
      console.log("ERROR::userRegister => ", error.message)
      toast.error(error.message)
    },
  })

  const onFinish = (values: contentBody) => {
    if (!user) return
    createContentMutation({ authorId: user.id, body: values })
  }

  return (
    <div className="flex flex-col items-center gap-6 justify-center w-full mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create New Content
      </h2>
      <div className="w-full lg:w-1/2 flex items-center justify-center py-8 ">
        <Form
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4 w-full"
          form={form}
        >
          {/* Title */}
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input the title!" },
              {
                max: 80,
                message: "Title cannot be more than 80 characters!",
              },
            ]}
          >
            <Input placeholder="Enter the title" className="p-2" />
          </Form.Item>

          {/* Tag */}
          <Form.Item
            label="Tag"
            name="tag"
            rules={[
              { required: true, message: "Please input a tag!" },

              { max: 20, message: "Tag cannot be more than 20 characters!" },
            ]}
          >
            <Input placeholder="Enter a tag" className="p-2" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
              {
                max: 1000,
                message: "Description cannot be more than 1000 characters!",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Enter the description"
              className="p-2"
            />
          </Form.Item>

          {/* Type */}
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select a type!" }]}
          >
            <Select placeholder="Select type">
              <Option value="article">Article</Option>
              <Option value="novel">Novel</Option>
              <Option value="digest">Digest</Option>
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              loading={isLoading}
              htmlType="submit"
              className="w-full bg-blue-500 mt-6 py-5 hover:bg-blue-600 text-white"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default CreateContent
