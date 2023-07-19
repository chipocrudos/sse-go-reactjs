import { MessageDataInterface } from "../../api";

export { useSSE } from "./useSSE";

export interface MessageInterface {
  EventName: string;
  Data: {};
}

export interface ClientInteface {
  ID: string;
}

export type EventMessagesType = Record<string, MessagesType>;

export type MessagesType = Record<number, MessageInterface>;

export interface MessageInterface {
  channel: string;
  id: number;
  data: MessageDataInterface;
  time: Date;
  isOwner?: boolean;
}

export type UnreadType = Record<string, UnreadInterface>;

export interface UnreadInterface {
  counter: number;
  time?: Date;
  message?: string;
}
