import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { User } from "../utils/types";
import { logout as apiLogout } from "../apis/auth";
import { MSG_SUCCESS } from "../utils/constants";

const AuthContext = createContext<any>({});

type Props = {
  children?: ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
  const [profile, setProfile] = useState<User | null>();

  const changeProfile = (newProfile: User) => {
    setProfile(newProfile);
    localStorage.setItem("user", JSON.stringify(newProfile));
  };
  const login = (user: User, accessToken: string) => {
    if (accessToken && user) {
      console.log({ user, accessToken });
      setProfile(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
    }
  };
  const logout = async () => {
    setProfile(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem("user") || "null"));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        profile,
        changeProfile,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
export default AuthWrapper;
