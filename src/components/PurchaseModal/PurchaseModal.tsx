// @ts-nocheck
import React, { useState } from "react"
import { Modal, Input, Button, Form } from "antd"
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs"
import images from "react-payment-inputs/images"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { purchaseContentAPI } from "../../api/purchaseAPI/purchaseAPI"
import { useUserStore } from "../../store/userStore"

type PurchaseModalProps = {
  setOpen: (open: boolean) => void
  open: boolean
  id: string
  refetch: () => void
}

const PurchaseModal = (props: PurchaseModalProps) => {
  const { open, setOpen, id, refetch } = props
  const user = useUserStore((state) => state.user)

  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs()
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCvc] = useState("")
  const showModal = () => {
    setOpen(true)
  }
  const { mutate: purchaseContent, isLoading } = useMutation({
    mutationKey: ["purchaseContent"],
    mutationFn: async (payload: { id: string }) =>
      purchaseContentAPI(payload.id),
    onSuccess: (response) => {
      toast.success(response.message)
      setOpen(false)
      refetch()
    },
    onError: (error: Error) => {
      console.log("ERROR::purchaseContent => ", error.message)
      toast.error(error.message)
    },
  })

  const handleOk = () => {
    purchaseContent({ id })
  }
  const handleCancel = () => {
    setCardNumber("")
    setExpiryDate("")
    setCvc("")
    setOpen(false)
  }
  return (
    <>
      <Modal
        title="Complete Your Purchase"
        open={open}
        centered
        width={500}
        onOk={handleOk}
        confirmLoading={isLoading}
        onCancel={handleCancel}
        footer={null} // Custom footer with button below
        className="p-6 "
      >
        {/* Form Section */}
        <Form layout="vertical" className="mt-4 space-y-4">
          {/* Name Input */}
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input
              placeholder="Enter your full name"
              className="rounded-md border-gray-300"
            />
          </Form.Item>

          {/* Email Address Input */}
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email address"
              className="rounded-md border-gray-300"
            />
          </Form.Item>

          {/* Payment Inputs */}
          <Form.Item
            rules={[
              {
                required: false,
              },
            ]}
            label="Payment Information"
          >
            <PaymentInputsWrapper
              {...wrapperProps}
              className=" rounded-lg w-full my-2"
            >
              <svg
                {...getCardImageProps({ images })}
                className="w-10 h-6 mr-3"
              />
              <input
                {...getCardNumberProps()}
                className="focus:outline-none  pb-1 mb-2 w-full"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <div className="flex space-x-2">
                <input
                  {...getExpiryDateProps()}
                  className="focus:outline-none  pb-1 mb-2 w-1/2"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                <input
                  {...getCVCProps()}
                  className="focus:outline-none  pb-1 mb-2 w-1/2"
                  placeholder="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </div>
            </PaymentInputsWrapper>
          </Form.Item>

          {/* Footer Section with Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              onClick={handleOk}
              loading={isLoading}
              className="w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Complete Purchase
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default PurchaseModal
