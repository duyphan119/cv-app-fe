import Link from "next/link";
import React from "react";
import { getAllGroupProducts } from "../../../../apis/groupProduct";
import { useGroupProductContext } from "../../../../context/GroupProductContext";
import { MSG_SUCCESS } from "../../../../utils/constants";
import { GroupProduct } from "../../../../utils/types";
import styles from "./style.module.css";
type Props = {};

const HeaderBottom = (props: Props) => {
  const { groupProducts, setGroupProducts } = useGroupProductContext();

  React.useEffect(() => {
    (async () => {
      try {
        const res = await getAllGroupProducts({
          sort_by: "name",
          sort_type: "asc",
        });
        const { message, data } = res;
        if (message === MSG_SUCCESS) {
          setGroupProducts(data.items);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <nav className={styles["header-bottom"]}>
      <ul className={styles["nav-items"]}>
        <li className={styles["nav-item"]}>
          <Link href="/" className={styles["nav-item-link"]}>
            Trang chủ
          </Link>
        </li>
        <li className={styles["nav-item"]}>
          <Link href="/san-pham" className={styles["nav-item-link"]}>
            Sản phẩm
          </Link>
          {groupProducts.length > 0 ? (
            <ul className={styles.menu}>
              {groupProducts.map((groupProduct: GroupProduct) => {
                return (
                  <li className={styles["menu-item"]} key={groupProduct.id}>
                    <Link
                      href={`/san-pham/danh-muc/${groupProduct.slug}`}
                      className={styles["menu-item-link"]}
                    >
                      {groupProduct.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </li>
        <li className={styles["nav-item"]}>
          <Link href="/tin-tuc" className={styles["nav-item-link"]}>
            Tin tức
          </Link>
        </li>
        <li className={styles["nav-item"]}>
          <Link href="/lien-he" className={styles["nav-item-link"]}>
            Liên hệ
          </Link>
        </li>
      </ul>
      <ul className={styles["contact"]}>
        <li className={styles["email"]}>Email: duychomap123@gmail.com</li>
        <li className={styles["phone"]}>Hotline: 1900 585878</li>
      </ul>
    </nav>
  );
};

export default HeaderBottom;
