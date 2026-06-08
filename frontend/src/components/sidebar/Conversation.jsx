import useConversation from "../../zustand/useConversation";


const Conversation = ({ conversation, lastIdx, emoji}) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	return (
		<>
      <div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
				>
				<div className="avatar online">
					<div className="w-12 rounded-full">
						<img src={conversation.profilePic} alt="user avatar" />
					</div>
				</div>
				<div className="flex flex-col flex-1">
					<div className="flex gap-3 justify-between">
						<p className="'font-bold text-gray-200">{conversation.fullName}</p>
						<span className="text-xl">{emoji}</span>
					</div>
				</div>
      </div>
			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;


// Single conversation item shown in the sidebar.
//
// Receives:
// - conversation: user data (id, name, profile picture, etc.)
// - emoji: random emoji displayed next to the user's name
// - lastIdx: used to hide the divider for the last item
//
// Flow:
// Conversations.jsx maps through all conversations and renders this component.
// When a user clicks this conversation, setSelectedConversation(conversation)
// updates Zustand's selectedConversation state.
// Any component using useConversation() (e.g. MessageContainer,
// MessageInput) re-renders and shows data for the selected chat.
//
// isSelected compares the current conversation's id with
// selectedConversation._id to determine whether this chat should
// be highlighted in the sidebar.