import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout as apiLogout } from "../../../apis/auth";
import { useAuthContext } from "../../../context/AuthContext";
import styles from "./style.module.css";
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
    href: "/doi-mat-khau",
    label: "Đổi mật khẩu",
    icon: <PasswordOutlinedIcon />,
  },
];

const Sidebar = (props: Props) => {
  const router = useRouter();
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    console.log("click");
    try {
      const { message } = await apiLogout();
      logout();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

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
        <li className={styles.item} onClick={handleLogout}>
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
