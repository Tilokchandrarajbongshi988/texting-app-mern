import { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/useAuthContext";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-yellow-100">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="border-b-2 border-black bg-white px-4 py-3">
            <span className="text-black/60">To:</span>{" "}
            <span className="font-bold text-black">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-black bg-white px-6 py-8 text-center font-semibold text-black sm:text-lg md:text-xl">
        <p>Welcome {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-center text-3xl md:text-6xl" />
      </div>
    </div>
  );
};
