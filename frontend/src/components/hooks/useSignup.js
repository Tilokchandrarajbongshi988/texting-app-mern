import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext()

  /*
FLOW OF SIGNUP

1. User fills the signup form.
   inputs state becomes:
   {
     fullName,
     username,
     password,
     confirmPassword,
     gender
   }

2. User clicks "Sign Up".

3. handleSubmit() in SignUp.jsx runs:
      await signup(inputs)

4. signup() receives the inputs object and destructures it:
      { fullName, username, password, confirmPassword, gender }

5. handleInputErrors() validates the data on the frontend:
      - checks empty fields
      - checks passwords match
      - checks password length
   If validation fails, signup() stops.

6. setLoading(true)
   Indicates the signup request has started.
   Useful for showing loading spinners, disabling buttons, etc.

7. fetch("/api/auth/signup", {...})
   Sends a POST request to the backend.

8. body: JSON.stringify({...})
   Converts the user data into a JSON string and sends it.

9. headers:
      "Content-Type": "application/json"
   Tells the backend that the request body contains JSON.

10. Backend receives the request in signup controller:
       req.body

11. Backend validates again because frontend validation can be bypassed.

12. Backend:
       - checks if username exists
       - hashes password
       - creates new user
       - saves user in MongoDB
       - generates JWT cookie

13. Backend sends a response back to frontend.

14. res.json() converts response JSON into a JavaScript object.

15. If backend returns an error:
       throw new Error(...)
       catch block shows toast error.

16. finally block runs:
       setLoading(false)
   Marks request as finished.

SUMMARY:

User Form
    ↓
signup(inputs)
    ↓
handleInputErrors()
    ↓
fetch()
    ↓
Backend Signup Controller
    ↓
MongoDB
    ↓
Response
    ↓
Frontend
*/
	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup",{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({fullName, username, password, confirmPassword, gender})
      });

      const data = await res.json();
      if(data.error){
        throw new Error(data.error)
      }
      localStorage.setItem("chat-user",JSON.stringify(data))
      setAuthUser(data);

    } catch (error) {
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
    
  };
  return {loading, signup};

};
export default useSignup;


function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
  }

  if(password !== confirmPassword){
    toast.error('Password do not match');
    return false;
  }

  if(password.length<6){
    toast.error('Password must be atleast 6 characters');
    return false;
  }
  return true;
}