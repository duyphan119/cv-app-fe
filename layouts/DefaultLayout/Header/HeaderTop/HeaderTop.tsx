import Image from "next/image";
import Link from "next/link";
import React from "react";
import AccountIcon from "./AccountIcon";
import CartIcon from "./CartIcon";
import SearchInput from "./SearchInput";
import styles from "./style.module.css";
import WishlistIcon from "./WishlistIcon";
import logoPng from "../../../../public/logo.png";
import Drawer from "./Drawer";
type Props = {};

const HeaderTop = (props: Props) => {
  return (
    <div className={styles["header-top"]}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>
          <Image
            src={logoPng}
            alt="Logo"
            width={56}
            height={56}
            priority={true}
          />
          DUS
        </Link>
        <Drawer />
      </div>
      <div className={styles.right}>
        <SearchInput />
        <ul className={styles.items}>
          <li className={styles.item}>
            <AccountIcon />
          </li>
          <li className={styles.item}>
            <WishlistIcon />
          </li>
          <li className={styles.item}>
            <CartIcon />
          </li>
        </ul>

        {/* <nav className={styles.bottom}>
          <ul className={styles["nav-menu"]}>
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
          </ul>
        </nav> */}
      </div>
    </div>
  );
};

export default HeaderTop;
