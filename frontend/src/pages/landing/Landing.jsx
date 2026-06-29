import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-yellow-100 px-4">
      <div className="w-full max-w-3xl rounded-xl border-2 border-black bg-white p-8 text-center">
        <h1 className="text-6xl font-black uppercase text-yellow-300 md:text-8xl yellowchat-title">
          YellowChat
        </h1>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/login"
            className="btn border-2 border-black bg-yellow-300 px-8 text-black hover:bg-yellow-200"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="btn border-2 border-black bg-white px-8 text-black hover:bg-yellow-100"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <div className="fixed right-4 top-4 z-10 rounded-xl border-2 border-black bg-white p-4 text-left text-sm text-black shadow-md">
        <p className="font-bold">Try the features</p>
        <p>Username: demo1</p>
        <p>Password: Demo12345</p>
      </div>
    </div>
  );
};

export default Landing;
