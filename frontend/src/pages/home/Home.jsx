import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer"

const Home = () => {
	return (
		<div className='flex h-screen w-full overflow-hidden border-2 border-black bg-white'>
			<Sidebar/>
			<MessageContainer />
		</div>
	);
};
export default Home;
