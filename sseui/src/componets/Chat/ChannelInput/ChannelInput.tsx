import { AiOutlineSend } from "react-icons/ai";
import { useChat } from "../ChatContext";

export const ChannelInput = () => {

const { newChannel } = useChat()
    
    const handlerSubmit = (e:any) => {
        e.preventDefault()
        newChannel(e.target.channel.value)
        e.target.reset()
        
    }

  return (
    <form onSubmit={handlerSubmit}>
      <div className="chat_input">
        <input 
            name="channel"
            type="text"
            placeholder="New chat"
            pattern="[A-Za-z09]{3,20}"
            required
        />
        <button style={{fontSize: "1.8rem", border: "None"}} >
            <AiOutlineSend />

        </button>
      </div>
    </form>
  );
};
