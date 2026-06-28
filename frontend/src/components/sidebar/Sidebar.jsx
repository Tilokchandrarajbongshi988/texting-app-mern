import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className="flex w-80 flex-col border-r-2 border-black bg-white p-4">
			<SearchInput />
			<div className='my-4 border-t-2 border-black'></div>
			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;
