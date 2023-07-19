import { useChat } from "../ChatContext";

export const ChatHeader = () => {
  const { activeChannel } = useChat();

  if (!activeChannel) return;

  return (
    <div className="header">
      <div className="imgText">
        <div className="userimg"></div>
        <h4>
          {activeChannel}
          <br />
          <span>Online Chat</span>
        </h4>
      </div>
      <ul className="nav_icons">
        {/* <li><ion-icon name="search-outline"></ion-icon></li> */}
      </ul>
    </div>
  );
};
