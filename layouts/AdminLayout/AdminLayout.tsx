import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { changeProfile, getProfile } from "../../apis/auth";
import { useAuthContext } from "../../context/AuthContext";
import { MSG_SUCCESS } from "../../utils/constants";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children?: ReactNode;
  pageTitle: string;
};

const AdminLayout = (props: Props) => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const { login, changeProfile } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        const { message, data } = await getProfile();
        if (message !== MSG_SUCCESS) {
          router.push("/admin/dang-nhap");
          changeProfile(null);
        } else {
          setIsLogged(true);
          login(data);
        }
      } catch (error) {
        router.push("/admin/dang-nhap");
        changeProfile(null);
      }
    })();
  }, []);

  return isLogged ? (
    <Box display="flex">
      <Sidebar />
      <Box display="flex" flexDirection="column" flex={1}>
        <Header pageTitle={props.pageTitle} />
        <Box flex={1} padding="16px">
          {props.children}
        </Box>
      </Box>
    </Box>
  ) : null;
};

export default AdminLayout;
