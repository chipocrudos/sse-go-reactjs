import { createContext, useContext, useEffect, useState } from "react";
import {
  ChannelsType,
  ChatContextProviderInterface,
  ChatProviderProps,
} from ".";
import { useMessagesApi } from "../../../api";
import { useSSE } from "../../../hooks";
import { MessageInterface, MessagesType } from "../../../hooks/useSEE";

export const ChatContext = createContext<ChatContextProviderInterface | null>(
  null
);

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [activeChannel, setActiveChannel] = useState<string>("");
  const [isModalActive, setIsModalActive] = useState(false);
  const [channels, setChannels] = useState<ChannelsType>({} as ChannelsType);
  const [channelsFilter, setChannelsFilter] = useState<string[]>([]);
  const [isUpdateChat, setIsUpdateChat] = useState<boolean>(false);
  const [boxMessages, setBoxMessages] = useState<MessageInterface[]>([]);

  const { userId, messages, unread, markAsRead, addMessageListener } = useSSE();

  const { sendMessageApi } = useMessagesApi();

  useEffect(() => {
    const updateChannels = { ...channels };
    for (const chan of Object.keys(channels)) {
      // updateChannels[chan].unRead =
      //   (unread[chan].counter | 0) * Number(chan != activeChannel);
      if (chan == activeChannel) {
        setIsUpdateChat(updateChannels[chan].date != unread[chan]?.time);
        updateChannels[chan].unRead = 0;
        updateChannels[chan].date = unread[chan]?.time;
        updateChannels[chan].message = unread[chan]?.message;
      } else {
        updateChannels[chan].unRead = unread[chan]?.counter | 0;
      }
    }
    setChannels(updateChannels);
  }, [unread]);

  useEffect(() => {
    setChannelsFilter(Object.keys(channels));
  }, [channels]);

  useEffect(() => {
    if (!isUpdateChat) return;
    setBoxMessages(getMessages(activeChannel));

    setIsUpdateChat(false);
  }, [isUpdateChat]);

  const updateActiveChannel = (channel: string) => {
    setActiveChannel(channel);
    markAsReadChannel();
  };

  const toggleModal = () => {
    setIsModalActive((prev) => !prev);
  };

  const newChannel = (channel: string) => {
    if (channels != undefined && channels[channel]) return;

    setChannels((prev) => {
      const newChannels = { ...prev };

      newChannels[channel] = {
        name: channel,
        unRead: 0,
        last: 0,
      };

      return newChannels;
    });
    toggleModal();
    addMessageListener(channel);
  };

  const filterChannels = (search: string) => {
    const filter = Object.keys(channels).filter((chan) =>
      chan.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setChannelsFilter(filter);
  };

  const getMessages = (channel: string) => {
    const newMessages: MessageInterface[] = [];
    const filterMessages: MessagesType = messages[channel];

    if (!channel || filterMessages == undefined) return newMessages;

    for (const values of Object.values(filterMessages)) {
      newMessages.push({
        ...values,
        isOwner: userId == values.data?.userId,
      });
    }

    return newMessages;
  };

  const markAsReadChannel = () => {
    markAsRead(activeChannel);
  };

  const sendMessage = async (message: string) => {
    if (!activeChannel || !message) return;

    await sendMessageApi({
      channel: activeChannel,
      body: {
        userId,
        message,
      },
    });
  };

  const contextValue = {
    channels,
    channelsFilter,
    activeChannel,
    updateActiveChannel,
    isModalActive,
    toggleModal,
    newChannel,
    filterChannels,
    markAsReadChannel,
    getMessages,
    sendMessage,
    boxMessages,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChat = () =>
  useContext(ChatContext) as ChatContextProviderInterface;
