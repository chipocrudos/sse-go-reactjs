import { useEffect, useRef, useState } from "react";
import {
  EventMessagesType,
  MessageInterface,
  UnreadInterface,
  UnreadType,
} from ".";
import { APPID, SERVERAPI } from "../../config";

const ID = crypto.randomUUID();

export const useSSE = () => {
  const [messages, setMessages] = useState<EventMessagesType>(
    {} as EventMessagesType
  );
  const [unread, setUnread] = useState<UnreadType>({} as UnreadType);

  const eventConnention = useRef<EventSource>();

  useEffect(() => {
    console.log("initial hook", eventConnention.current?.readyState);

    if (
      eventConnention.current == undefined ||
      eventConnention.current?.readyState == 2
    )
      eventConnention.current = new EventSource(
        `${SERVERAPI}/notify?appID=${APPID}&id=${ID}`
      );

    console.log("Create EventSource: ", `${SERVERAPI}/notify?id=${ID}`);

    return () => {
      if (eventConnention.current != undefined) eventConnention.current.close();
    };
  }, []);

  const addMessageListener = (channel: string) => {
    if (eventConnention.current == undefined) return;
    eventConnention.current.addEventListener(channel, function (e) {
      var message: MessageInterface = JSON.parse(e.data);
      updateMessages(message);
      updateUnread(message);
    });
  };

  const updateMessages = (message: MessageInterface) => {
    setMessages((prev) => {
      const newMessages = prev[message.channel] || {};
      newMessages[message.id] = message;
      return { ...prev, [message.channel]: newMessages };
    });
  };

  const updateUnread = (message: MessageInterface) => {
    setUnread((prev) => {
      const countUnread: UnreadInterface = {
        counter: prev[message.channel]?.counter | 0,
        time: message.time,
        message: message.data.message,
      };
      countUnread.counter += 1;
      return { ...prev, [message.channel]: countUnread };
    });
  };

  const markAsRead = (channel: string) => {
    setUnread((prev) => {
      let counterUnread: UnreadInterface = prev[channel];
      if (!counterUnread) counterUnread = { counter: 0 };

      counterUnread.counter = 0;

      return { ...prev, [channel]: counterUnread };
    });
  };

  return {
    userId: ID,
    messages,
    addMessageListener,
    unread,
    updateUnread,
    markAsRead,
  };
};
