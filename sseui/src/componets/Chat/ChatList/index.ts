import { ChannelInterface } from "../ChatContext";

export { ChatList } from "./ChatList";

export interface ChatElementProps {
    activeChannel: string
    channel: ChannelInterface
    handlerClick: (channel:string) => void
}