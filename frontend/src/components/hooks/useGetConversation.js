import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users");
				const data = await res.json();
        console.log("Fetched data:", data);
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;
//Fetch conversations/users from the backend when the component loads,
//store them in state, and return them to any component that needs them.

/*Conversations component loads
↓
useGetConversations runs
↓
useEffect runs once
↓
getConversations() called
↓
fetch("/api/users")
↓
backend sends users
↓
setConversations(data)
↓
React updates state
↓
Component re-renders
↓
Users are available in conversations*/