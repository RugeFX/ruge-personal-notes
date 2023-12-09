import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  deleteAccessToken,
  deleteUserInfo,
  getAccessToken,
  getUserInfo,
  getUserLogged,
  putAccessToken,
  putUserInfo,
  login as reqLogin,
} from "../api/auth";
import toast from "react-hot-toast";
import { useLocaleContext } from "./locale-context";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { locale } = useLocaleContext();

  const [accessToken, setAccessToken] = useState(() => getAccessToken() || null);
  const [userInfo, setUserInfo] = useState(() => getUserInfo() || null);

  const login = async ({ email, password }) => {
    const loginRes = await reqLogin({ email, password });

    if (loginRes.error) {
      toast.error(`${locale === "id" ? "Gagal Masuk!" : "Login failed!"}, ${loginRes.data}`);
      return;
    }

    const { accessToken } = loginRes.data.data;

    putAccessToken(accessToken);
    setAccessToken(accessToken);

    const userRes = await getUserLogged();

    if (userRes.error) {
      toast.error(`${locale === "id" ? "Gagal Masuk!" : "Login failed!"}, ${userRes.data}`);
      return;
    }

    putUserInfo(userRes.data.name);
    setUserInfo(userRes.data.name);
  };

  const logout = () => {
    deleteAccessToken();
    deleteUserInfo();
    setAccessToken(null);
    setUserInfo(null);
  };

  const value = useMemo(
    () => ({
      accessToken,
      userInfo,
      login,
      logout,
    }),
    [accessToken, userInfo]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthContext;
