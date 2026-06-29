import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

const Landing = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-8">
      <div className="w-full rounded-xl border-2 border-black bg-white p-6 md:p-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="mb-2 font-semibold text-black">Simple MERN Chat App</p>
            <h1 className="text-4xl font-bold text-black md:text-5xl">
              ChatApp
            </h1>
            <p className="mt-4 text-base leading-7 text-black">
              A clean real-time chat application where users can create an
              account, login, and send messages instantly.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {authUser ? (
                <Link
                  to="/chat"
                  className="btn border-2 border-black bg-yellow-300 text-black hover:bg-yellow-200"
                >
                  Open Chat
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn border-2 border-black bg-yellow-300 text-black hover:bg-yellow-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn border-2 border-black bg-white text-black hover:bg-yellow-100"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="rounded-xl border-2 border-black bg-yellow-100 p-5">
            <div className="rounded-xl border-2 border-black bg-white p-4">
              <div className="mb-4 rounded-lg border-2 border-black bg-yellow-300 px-4 py-3 font-semibold text-black">
                Real-time Chat
              </div>
              <div className="space-y-3">
                <p className="w-4/5 rounded-lg border-2 border-black bg-white px-3 py-2 text-sm text-black">
                  Hi, are you online?
                </p>
                <p className="ml-auto w-4/5 rounded-lg border-2 border-black bg-yellow-300 px-3 py-2 text-sm text-black">
                  Yes, messages update instantly.
                </p>
                <p className="w-4/5 rounded-lg border-2 border-black bg-white px-3 py-2 text-sm text-black">
                  Nice, simple and easy to use.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border-2 border-black bg-yellow-100 p-4">
            <h2 className="font-bold text-black">Login System</h2>
            <p className="mt-2 text-sm text-black">
              Users can create an account and login securely.
            </p>
          </div>
          <div className="rounded-xl border-2 border-black bg-yellow-100 p-4">
            <h2 className="font-bold text-black">Live Messages</h2>
            <p className="mt-2 text-sm text-black">
              Socket.io is used for real-time message updates.
            </p>
          </div>
          <div className="rounded-xl border-2 border-black bg-yellow-100 p-4">
            <h2 className="font-bold text-black">Clean UI</h2>
            <p className="mt-2 text-sm text-black">
              The interface stays simple and beginner-friendly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
