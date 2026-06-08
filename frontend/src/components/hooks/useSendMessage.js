import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
  // Sends the message to the currently selected conversation.
// Shows loading spinner, handles errors, and updates the
// global messages state after a successful response.
	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);
      // Create a new messages array containing all previous messages
      // plus the newly returned message, then update Zustand state.
			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
// Custom hook responsible for:
// 1. Sending a message to the backend API
// 2. Managing loading state while request is in progress
// 3. Updating Zustand's messages state with the newly sent message
//
// Flow:
// MessageInput -> sendMessage(message)
// -> POST request to backend
// -> Backend saves and returns new message
// -> setMessages([...messages, data])
// -> Chat UI re-renders with the new message