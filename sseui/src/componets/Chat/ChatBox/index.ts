import { MessageInterface } from "../../../hooks/useSEE";

export { ChatBox } from "./ChatBox";

export interface ChatMessageProps {
  message: MessageInterface;
  referenceDate: Date;
}
