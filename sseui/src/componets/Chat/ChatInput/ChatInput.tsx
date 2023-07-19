import { VscSend } from "react-icons/vsc";
import { useChat } from "../ChatContext";

export const ChatInput = () => {
  const { sendMessage, activeChannel } = useChat();

  if (!activeChannel) return;

  const handlerSubmit = (e: any) => {
    e.preventDefault();
    sendMessage(e.target.message.value);
    e.target.reset();
  };

  return (
    <form onSubmit={handlerSubmit}>
      <div className="chat_input">
        <input
          name="message"
          type="text"
          placeholder="Type a message"
          required
        />
        <button style={{ fontSize: "1.8rem", border: "None" }}>
          <VscSend />
        </button>
      </div>
    </form>
  );
};
