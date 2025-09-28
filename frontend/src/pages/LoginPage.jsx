import LoginButton from "../components/LoginButton";
import gachaponLogin from "../assets/gachaponLogin.png";
import sonnyLogin from "../assets/sonnyLogin.png";
import smiskiLogin from "../assets/smiskiLogin.png";
import calicoLogin from "../assets/calicoLogin.png";

const LoginPage = () => {
  return (
    <div className="flex flex-col h-screen items-center bg-[#F6F6F6]">
      <div className="p-4 mt-20">
        <img
          src={gachaponLogin}
          alt="Gachapon login"
          className="w-120 max-w-full"
        />
      </div>

      <div className="pr-80">
        <img
          src={sonnyLogin}
          alt="Sonny login"
          className="w-15 h-auto"
        />
      </div>

      <div
        className="
          w-full max-w-xl px-30 p-4 rounded-full shadow-xl
          bg-[#E3E3E3] 
          transition
          hover:bg-[#d6d6d6] hover:shadow-2xl
          cursor-pointer
        "
      >
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>

      <div className="mt-auto w-full flex justify-between px-4 pb-4">
        <img
          src={calicoLogin}
          alt="Calico login"
          className="w-35 h-auto"
        />
        <img
          src={smiskiLogin}
          alt="Smiski login"
          className="w-35 h-auto"
        />
      </div>
    </div>
  );
};

export default LoginPage;
