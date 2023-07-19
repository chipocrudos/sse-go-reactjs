import classNames from "classnames";
import { ChatMessageProps } from ".";
import { NUMBERTOSTRING } from "../../../config";
import { useChat } from "../ChatContext";

export const ChatBox = () => {
  const { boxMessages } = useChat();
  const referenceDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d;
  };

  return (
    <div className="chatbox">
      {boxMessages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          referenceDate={referenceDate()}
        />
      ))}
    </div>
  );
};

const ChatMessage = ({ message, referenceDate }: ChatMessageProps) => {
  const getDate = () => {
    const date = new Date(message.time);

    date.toLocaleDateString();
    const fd =
      date > referenceDate
        ? `${date.getHours().toLocaleString(undefined, NUMBERTOSTRING)}:${date
            .getMinutes()
            .toLocaleString(undefined, NUMBERTOSTRING)}:${date
            .getSeconds()
            .toLocaleString(undefined, NUMBERTOSTRING)}`
        : `${date.getFullYear()}/${date
            .getMonth()
            .toLocaleString(undefined, NUMBERTOSTRING)}/${date
            .getDay()
            .toLocaleString(undefined, NUMBERTOSTRING)}  ${date
            .getHours()
            .toLocaleString(undefined, NUMBERTOSTRING)}:${date
            .getMinutes()
            .toLocaleString(undefined, NUMBERTOSTRING)}:${date
            .getSeconds()
            .toLocaleString(undefined, NUMBERTOSTRING)}`;
    return fd;
  };

  return (
    <div
      className={classNames("message", {
        my_msg: message?.isOwner,
        friend_msg: !message?.isOwner,
      })}
    >
      <p>
        {message.data.message}
        <br />
        <span>{getDate()}</span>
      </p>
    </div>
  );
};
