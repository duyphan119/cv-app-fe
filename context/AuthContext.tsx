import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { User } from "../utils/types";
import { logout as apiLogout, RegisterDTO } from "../apis/auth";
import { MSG_SUCCESS } from "../utils/constants";
import { useSnackbarContext } from "./SnackbarContext";

const AuthContext = createContext<any>({});

type Props = {
  children?: ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
  const { show } = useSnackbarContext();
  const [profile, setProfile] = useState<User | null>();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const changeProfile = (newProfile: User | null) => {
    setProfile(newProfile);
    localStorage.setItem("user", JSON.stringify(newProfile));
  };
  const login = (user: User, accessToken: string) => {
    if (accessToken && user) {
      console.log({ user, accessToken });
      setProfile(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      show("Đăng nhập thành công", "success");
    }
  };
  const register = (user: User, accessToken: string) => {
    login(user, accessToken);
  };
  const logout = async () => {
    setProfile(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("user") || "null");
    setProfile(profile);
  }, []);

  useEffect(() => {
    setIsLogged(profile ? true : false);
  }, [profile]);

  return (
    <AuthContext.Provider
      value={{
        profile,
        changeProfile,
        login,
        logout,
        register,
        isLogged,
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
