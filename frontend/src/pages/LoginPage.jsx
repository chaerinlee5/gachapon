import LoginButton from "../components/LoginButton";

function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="p-8 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign in to Gachapon</h1>
        <LoginButton />
      </div>
    </div>
  );
}

export default LoginPage;
