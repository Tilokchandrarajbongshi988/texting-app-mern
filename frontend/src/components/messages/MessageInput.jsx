import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) return;

    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="border-t-2 border-black bg-white px-4 py-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="block w-full rounded-lg border-2 border-black bg-white p-2.5 pr-12 text-sm text-black placeholder:text-black/50 outline-none focus:ring-2 focus:ring-black"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading ? (
            <div className="loading loading-spinner text-black"></div>
          ) : (
            <BsSend className="text-black" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
