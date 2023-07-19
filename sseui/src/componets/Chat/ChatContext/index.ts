import { ReactElement } from "react";
import { MessageInterface } from "../../../hooks/useSEE";
export { useChat } from "./ChatContext";

export interface ChatProviderProps {
  children: ReactElement;
}

export interface ChatContextProviderInterface {
  channels: ChannelsType;
  channelsFilter: string[];
  activeChannel: string;
  updateActiveChannel: (channel: string) => void;
  isModalActive: boolean;
  toggleModal: () => void;
  newChannel: (channel: string) => void;
  filterChannels: (search: string) => void;
  markAsReadChannel: () => void;
  getMessages: (channel: string) => MessageInterface[];
  sendMessage: (message: string) => void;
  boxMessages: MessageInterface[];
}

export type ChannelsType = Record<string, ChannelInterface>;

export interface ChannelInterface {
  name: string;
  last: number;
  unRead: number;
  date?: Date;
  message?: string;
}
