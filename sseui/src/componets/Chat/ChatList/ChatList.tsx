import classNames from "classnames";
import { ChatElementProps } from ".";
import { NUMBERTOSTRING } from "../../../config";
import { useChat } from "../ChatContext";

export const ChatList = () => {
  const { activeChannel, channels, channelsFilter, updateActiveChannel } =
    useChat();

  // console.log(channels);
  // console.log(channelsFilter);

  return (
    <div className="chatlist">
      {channelsFilter.map((key) => (
        <ChatElement
          key={key}
          channel={channels[key]}
          handlerClick={updateActiveChannel}
          activeChannel={activeChannel}
        />
      ))}
    </div>
  );
};

const ChatElement = ({
  channel,
  handlerClick,
  activeChannel,
}: ChatElementProps) => {
  const getDate = () => {
    if (!channel?.date) return;

    const date = new Date(channel.date);

    date.toLocaleDateString();
    return `${date.getFullYear()}/${date
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
  };

  return (
    <div
      className={classNames("block", {
        active: channel.name == activeChannel,
        unread: channel.unRead,
      })}
      onClick={() => handlerClick(channel.name)}
    >
      <div className="details">
        <div className="listHead">
          <h4>{channel.name}</h4>
          <p className="time">{getDate()}</p>
        </div>
        <div className="message_p">
          <p>{channel.message}</p>
          {!!channel.unRead && <b>{channel.unRead}</b>}
        </div>
      </div>
    </div>
  );
};
