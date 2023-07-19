export { useMessagesApi } from "./messagesApi";

export interface SendMessageInterface {
    channel: string
    body: MessageDataInterface
}

export interface MessageDataInterface {
    userId: string
    message: string
}