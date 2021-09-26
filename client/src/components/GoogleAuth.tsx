import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import GoogleLogin from "react-google-login";

interface AuthResponse {
  token: string;
  user: User;
}

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

const GoogleAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const onSuccess = async (res: any) => {
    try {
      const result: AxiosResponse<AuthResponse> = await axios.post("/auth/", {
        token: res?.tokenId,
      });

      setUser(result.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      {!user && (
        <GoogleLogin
          clientId="777162316329-o4umlej9h7fpabgeoe1jvvscof0n1qpe.apps.googleusercontent.com"
          onSuccess={onSuccess}
        />
      )}

      {user && (
        <>
          <img src={user.avatar} className="rounded-full" />
          <h1 className="text-xl font-semibold text-center my-5">
            {user.name}
          </h1>
        </>
      )}
    </div>
  );
};

export default GoogleAuth;
