import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";
import { useState } from "react";
import { ModalAuth } from "../../../../../components";
import { useAuthContext } from "../../../../../context/AuthContext";
type Props = {};

const AccountIcon = (props: Props) => {
  const { isLogged } = useAuthContext();
  const [open, setOpen] = useState<boolean>(false);

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
