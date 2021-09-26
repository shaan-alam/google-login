import { useEffect, useContext } from "react";
import GoogleAuth from "../components/GoogleAuth";

const Login = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col bg-gray-800">
      <GoogleAuth />
    </div>
  );
};

export default Login;
