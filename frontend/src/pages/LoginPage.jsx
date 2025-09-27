import LoginButton from "../components/LoginButton";

function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-extrabold mb-4 text-center text-gray-800">
          Sign in to <span className="text-indigo-600">Gachapon</span>
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Collect, share, and trade with friends
        </p>
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
