import { useSocketContext } from "../../context/useSocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 border-transparent p-2 hover:border-black hover:bg-yellow-100 ${
          isSelected ? "border-black bg-yellow-300" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        {isOnline && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-black">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="my-2 border-t border-black/20" />}
    </>
  );
};

export default Conversation;
