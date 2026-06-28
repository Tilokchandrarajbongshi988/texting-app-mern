import { useEffect, useState } from "react";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/useAuthContext";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    setShowProfile(false);
  }, [selectedConversation]);

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
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedConversation.profilePic}
                  alt="user profile"
                  className="h-10 w-10 rounded-full border-2 border-black"
                />
                <div>
                  <p className="text-sm text-black/60">To:</p>
                  <p className="font-bold text-black">
                    {selectedConversation.fullName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowProfile(!showProfile)}
                className="rounded-lg border-2 border-black bg-yellow-300 px-4 py-2 font-semibold text-black hover:bg-yellow-200"
              >
                Profile
              </button>
            </div>

            {showProfile && (
              <div className="mt-4 rounded-xl border-2 border-black bg-yellow-100 p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedConversation.profilePic}
                    alt="user profile"
                    className="h-16 w-16 rounded-full border-2 border-black"
                  />

                  <div className="text-black">
                    <h2 className="text-xl font-bold">
                      {selectedConversation.fullName}
                    </h2>
                    <p className="mt-1">
                      Username: {selectedConversation.username}
                    </p>
                    <p>Gender: {selectedConversation.gender}</p>
                  </div>
                </div>
              </div>
            )}
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
