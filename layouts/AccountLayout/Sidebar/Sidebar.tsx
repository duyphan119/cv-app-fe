import Link from "next/link";
import React from "react";
import styles from "./style.module.css";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import { useRouter } from "next/router";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
type Props = {};

const items: any[] = [
  {
    href: "/tai-khoan",
    label: "Tài khoản",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    href: "/so-dia-chi",
    label: "Sổ địa chỉ",
    icon: <HomeOutlinedIcon />,
  },
  {
    href: "/theo-doi-don-hang",
    label: "Theo dõi đơn hàng",
    icon: <LocalShippingOutlinedIcon />,
  },
  {
    href: "/san-pham-yeu-thich",
    label: "Sản phẩm yêu thích",
    icon: <FavoriteBorderOutlinedIcon />,
  },
  {
    href: "/xem-gan-day",
    label: "Xem gần đây",
    icon: <HistoryOutlinedIcon />,
  },
  {
    href: "/doi-mat-khau",
    label: "Đổi mật khẩu",
    icon: <PasswordOutlinedIcon />,
  },
];

const Sidebar = (props: Props) => {
  const router = useRouter();
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.list}>
        {items.map((item: any) => {
          return (
            <li
              key={item.href}
              className={`${styles.item} ${
                router.pathname === item.href ? styles.active : ""
              }`}
            >
              <Link href={item.href}>
                {item.icon}
                {item.label}
              </Link>
            </li>
          );
        })}
        <li className={styles.item}>
          <button>
            <LogoutOutlinedIcon />
            Đăng xuất
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
