
import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<BiLogOut className='h-8 w-8 cursor-pointer rounded-lg border-2 border-black bg-yellow-300 p-1 text-black hover:bg-yellow-200' onClick={logout} />
			) : (
				<span className='loading loading-spinner text-black'></span>
			)}
		</div>
	);
};
export default LogoutButton;
