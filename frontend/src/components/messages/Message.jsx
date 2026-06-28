import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/useAuthContext";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const senderId = message.senderId?._id || message.senderId;
  const fromMe = String(senderId) === String(authUser?._id);
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe
    ? "border-2 border-black bg-yellow-300 text-black"
    : "border-2 border-black bg-white text-black";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer flex items-center gap-1 text-xs text-black/60">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
