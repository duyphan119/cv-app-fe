import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";
import { useAuthContext } from "../../../../../context/AuthContext";
import { ModalAuth } from "../../../../../components";
type Props = {};

const AccountIcon = (props: Props) => {
  const { profile } = useAuthContext();
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (e: any) => {
    if (!profile) {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <>
      <Link href="/tai-khoan" onClick={handleClick}>
        <AccountCircleOutlinedIcon />
        TÀI KHOẢN
      </Link>
      {open ? <ModalAuth open={open} onClose={() => setOpen(false)} /> : null}
    </>
  );
};

export default AccountIcon;
