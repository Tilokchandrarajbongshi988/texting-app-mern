import useGetConversations from '../hooks/useGetConversation';
import { getRandomEmoji } from '../../utils/emojis';
import Conversation from './Conversation'
const Conversations = () => {
	const {loading, conversations}=useGetConversations();
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;

/*
CONVERSATIONS FLOW

1. Conversations component renders.
2. useGetConversations() custom hook runs immediately.
3. Inside the hook, useEffect() executes once on mount.
4. The hook sends a GET request to "/api/users".
5. Backend returns all users except the currently logged-in user.
6. setConversations(data) stores those users in state.
7. State update causes React to re-render Conversations.
8. conversations.map() loops through every user object.
9. For each user, React creates a <Conversation /> component.

MAP LOGIC

conversation = current user object in the array.
idx = current position/index of that user.

Example:

conversations = [John, Sarah, Mike]

Iteration 1:
conversation = John
idx = 0

Iteration 2:
conversation = Sarah
idx = 1

Iteration 3:
conversation = Mike
idx = 2

PROPS PASSED TO CONVERSATION COMPONENT

key={conversation._id}
- Unique id used internally by React to track list items.
- Not accessible inside the child component.

conversation={conversation}
- Passes the entire current user object.
- Child can access:
  conversation.fullName
  conversation.profilePic
  conversation._id

emoji={getRandomEmoji()}
- Generates and passes a random emoji for that user.

lastIdx={idx === conversations.length - 1}
- Checks if the current user is the last item in the array.
- Returns true only for the last user.
- Used to hide the divider after the last conversation.

CONVERSATION COMPONENT

Receives:
{
  conversation,
  emoji,
  lastIdx
}

Displays:
- User profile picture
- User full name
- Random emoji

Divider Logic:

{!lastIdx && <div className="divider" />}

If lastIdx is false:
  Divider shows.

If lastIdx is true:
  Divider is hidden.

Example Output:

John
---------
Sarah
---------
Mike

(No divider after Mike)

PARENT-CHILD RELATIONSHIP

Conversations.jsx
- Fetches data.
- Loops through users.
- Passes props.

Conversation.jsx
- Receives props.
- Displays one user.
*/