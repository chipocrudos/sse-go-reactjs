
import { BiSearchAlt } from "react-icons/bi";
import { useChat } from "../ChatContext";

export const SearchChat = () => {

  const { filterChannels } = useChat()

  const handlerFilter = (e: any) => {
    filterChannels(e.target.value)
  }

  return (
    <div className="search_chat">
      <div>
        <input
          type="text"
          placeholder="Search or start new chat"
          onChange={handlerFilter}
        />
        <BiSearchAlt />
      </div>
    </div>
  );
}
