import { useState } from "react";
import { useAuthContext } from "../../context/useAuthContext";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	const [showProfile, setShowProfile] = useState(false);
	const { authUser } = useAuthContext();

	return (
		<div className="flex w-80 flex-col border-r-2 border-black bg-white p-4">
			<div className="mb-4 flex items-center justify-between rounded-xl border-2 border-black bg-yellow-100 p-3">
				<button
					type="button"
					onClick={() => setShowProfile(true)}
					className="flex items-center gap-3 text-left"
				>
					<img
						src={authUser.profilePic}
						alt="my profile"
						className="h-12 w-12 rounded-full border-2 border-black"
					/>
					<div>
						<p className="font-bold text-black">{authUser.fullName}</p>
						<p className="text-sm text-black/60">View profile</p>
					</div>
				</button>
			</div>

			<SearchInput />
			<div className='my-4 border-t-2 border-black'></div>
			<Conversations />
			<LogoutButton />

			{showProfile && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
					<div className="w-full max-w-md rounded-2xl border-2 border-black bg-white p-6">
						<div className="flex justify-end">
							<button
								type="button"
								onClick={() => setShowProfile(false)}
								className="rounded-lg px-3 py-1 text-2xl text-black hover:bg-yellow-200"
							>
								&times;
							</button>
						</div>

						<div className="flex flex-col items-center text-center">
							<img
								src={authUser.profilePic}
								alt="my profile"
								className="h-28 w-28 rounded-full border-2 border-black"
							/>

							<h2 className="mt-4 text-2xl font-bold text-black">
								{authUser.fullName}
							</h2>
							<p className="mt-1 text-black/70">@{authUser.username}</p>

							<div className="mt-6 w-full rounded-xl border-2 border-black bg-yellow-100 p-4 text-left text-black">
								<p>
									<span className="font-semibold">Full Name:</span>{" "}
									{authUser.fullName}
								</p>
								<p className="mt-2">
									<span className="font-semibold">Username:</span>{" "}
									{authUser.username}
								</p>
								<p className="mt-2">
									<span className="font-semibold">Gender:</span>{" "}
									{authUser.gender}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default Sidebar;
