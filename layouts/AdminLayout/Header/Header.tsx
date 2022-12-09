import React from "react";
import styles from "./style.module.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Badge } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Link from "next/link";
type Props = {
  pageTitle: string;
};

const Header = (props: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>{props.pageTitle}</div>
      <div className={styles.center}>
        <form className={styles.formSearch}>
          <SearchIcon className={styles.searchIcon} />
          <input type="search" placeholder="Tìm kiếm" />
        </form>
      </div>
      <div className={styles.right}>
        <span className={styles.iconSpan}>
          <Badge badgeContent={3} color="error">
            <NotificationsNoneIcon className={styles.icon} />
          </Badge>
        </span>
        <span className={styles.iconSpan}>
          <Badge badgeContent={3} color="error">
            <ChatBubbleOutlineIcon className={styles.icon} />
          </Badge>
        </span>
        <Link href="/admin/thong-tin-tai-khoan">
          Xin chào, <strong>Duy Phan</strong>
        </Link>
      </div>
    </header>
  );
};

export default Header;
