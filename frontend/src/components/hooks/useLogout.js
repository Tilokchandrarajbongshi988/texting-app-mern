import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;
/*
FLOW:

1. Custom hook runs when a component calls useLogout().

2. Creates loading state:
   - false = no logout request running
   - true = logout request in progress

3. Gets setAuthUser from AuthContext so we can update
   the global authentication state.

4. Returns:
   - loading (for UI state)
   - logout function

5. When logout() is called:
   a. Set loading to true
   b. Send POST request to /api/auth/logout
   c. Backend clears JWT cookie
   d. Receive response
   e. If response contains error -> throw error
   f. Remove user data from localStorage
   g. Set authUser to null in Context
   h. React re-renders and user becomes logged out
   i. If error occurs, show toast message
   j. Finally set loading back to false

Logout happens in 3 places:
- Backend: clears cookie
- LocalStorage: removes saved user data
- Context: authUser becomes null
*/