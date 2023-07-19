import { BsFillChatLeftTextFill } from "react-icons/bs";
import { useChat } from "../ChatContext";

export const MenuIcons = () => {
  const { toggleModal } = useChat();

  return (
    <div className="header">
      <div className="userimg"></div>
      <ul className="nav_icons">
        <li onClick={() => toggleModal()}>
          <BsFillChatLeftTextFill />
        </li>
      </ul>
    </div>
  );
};
