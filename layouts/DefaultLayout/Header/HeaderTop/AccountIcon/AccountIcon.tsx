import React, { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";
import { useAuthContext } from "../../../../../context/AuthContext";
import { ModalAuth } from "../../../../../components";
import { getProfile } from "../../../../../apis/auth";
import { MSG_SUCCESS } from "../../../../../utils/constants";
type Props = {};

const AccountIcon = (props: Props) => {
  const { profile, changeProfile } = useAuthContext();
  const [open, setOpen] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>();

  useEffect(() => {
    (async () => {
      try {
        const { message } = await getProfile();
        setIsLogged(message === MSG_SUCCESS);
      } catch (err) {
        setIsLogged(false);
      }
    })();
  }, []);

  const handleClick = async (e: any) => {
    e.preventDefault();
    setOpen(true);
  };

  return isLogged ? (
    <Link href="/tai-khoan">
      <AccountCircleOutlinedIcon />
      TÀI KHOẢN
    </Link>
  ) : (
    <>
      <span onClick={handleClick}>
        <AccountCircleOutlinedIcon />
        TÀI KHOẢN
      </span>
      {open ? <ModalAuth open={open} onClose={() => setOpen(false)} /> : null}
    </>
  );
};

export default AccountIcon;
