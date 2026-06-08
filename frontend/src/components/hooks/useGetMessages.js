import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
/*
FLOW OF useGetMessages()

1. useEffect watches selectedConversation?._id

   Initial render:
   selectedConversation = null
   selectedConversation?._id = undefined

   Condition fails:
   if(selectedConversation?._id)

   So getMessages() does NOT run.

--------------------------------------------------

2. User clicks a conversation

   selectedConversation becomes:

   {
      _id: "123",
      fullName: "John"
   }

   Dependency changes:
   undefined -> "123"

   React notices the change and runs useEffect again.

--------------------------------------------------

3. Condition passes

   if(selectedConversation?._id)

   becomes:

   if("123")

   which is truthy, so getMessages() runs.

--------------------------------------------------

4. Start loading

   setLoading(true)

   loading = true

   Used to show loading spinner while fetching messages.

--------------------------------------------------

5. Fetch messages from backend

   fetch(`/api/messages/${selectedConversation._id}`)

   Example:

   fetch("/api/messages/123")

   Frontend asks backend:
   "Give me all messages for conversation 123"

--------------------------------------------------

6. Wait for response

   await fetch(...)

   JavaScript pauses here until the server responds.

--------------------------------------------------

7. Convert response to usable JS data

   const data = await res.json()

   res = full HTTP response object

   data = actual messages array returned by backend

--------------------------------------------------

8. Error handling

   if(data.error)
      throw new Error(data.error)

   If backend returns an error,
   jump directly to catch block.

--------------------------------------------------

9. Save messages in Zustand

   setMessages(data)

   Global messages state is updated.

--------------------------------------------------

10. React re-renders automatically

    Messages component receives updated messages
    and displays them on screen.

--------------------------------------------------

11. If anything fails

    catch(error)

    Shows toast popup with error message.

--------------------------------------------------

12. Always stop loading

    finally {
       setLoading(false)
    }

    Runs whether request succeeds or fails.

--------------------------------------------------

SHORT LOGIC:

selectedConversation changes
↓
useEffect runs
↓
getMessages()
↓
fetch messages from backend
↓
convert response to JS data
↓
store messages in Zustand
↓
React re-renders
↓
messages appear on screen
↓
loading stops
*/