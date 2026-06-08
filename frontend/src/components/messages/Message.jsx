import useConversation from "../../zustand/useConversation";
import {useAuthContext} from "../..//context/AuthContext"
import { extractTime } from "../../utils/extractTime";

const Message = ({message}) => {
  const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
   const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  return (
    <div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
  )
}

export default Message;

/*
MESSAGE COMPONENT FLOW

1. Receives one message object as a prop.

2. Gets:
   - authUser (logged-in user)
   - selectedConversation (current chat user)

3. Checks who sent the message:

   message.senderId === authUser._id

   true  -> message was sent by me
   false -> message was sent by the other user

4. Based on fromMe:

   fromMe = true
   ----------------
   chat-end (right side)
   my profile picture
   blue message bubble

   fromMe = false
   ----------------
   chat-start (left side)
   selected user's profile picture
   default bubble color

5. Displays:
   - profile picture
   - message text
   - timestamp

This component's only job is to render
a single message and style it differently
depending on who sent it.
*/