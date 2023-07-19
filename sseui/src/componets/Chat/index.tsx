import { ChannelInput } from "./ChannelInput";
import { ChatBox } from "./ChatBox";
import { ChatProvider } from "./ChatContext/ChatContext";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatList } from "./ChatList";
import { ChatModal } from "./ChatModal";
import { MenuIcons } from "./MenuIcons";
import { SearchChat } from "./SearchChat";

export const Chat = () => {
  return (
    <ChatProvider>
      <div className="container">
        <div className="leftSide">
          <MenuIcons />
          <SearchChat />
          <ChatList />
        </div>
        <div className="rightSide">
          <ChatHeader />
          <ChatBox />
          <ChatInput />
        </div>
        <ChatModal>
          <ChannelInput />
        </ChatModal>
      </div>
    </ChatProvider>
  );
};
