export type SendFeedbackPayload = {
  phone: string
  name: string
  comment?: string
}

export type SendFeedback = (payload: SendFeedbackPayload) => Promise<any>

export type FeedbackContextProps = {
  sendFeedback: SendFeedback
}
