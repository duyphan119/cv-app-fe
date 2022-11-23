import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import styles from "../style.module.css";
type Props = {
  onSort?: any;
  sortBy?: string;
  sortType?: string;
  totalProducts?: number;
};
type Item = {
  label: string;
  sortBy: string;
  sortType: string;
};
const items: Item[] = [
  {
    label: "Mặc định",
    sortBy: "id",
    sortType: "desc",
  },
  {
    label: "Tên A-Z",
    sortBy: "price",
    sortType: "asc",
  },
  {
    label: "Tên Z-A",
    sortBy: "price",
    sortType: "desc",
  },
  {
    label: "Giá tăng dần",
    sortBy: "price",
    sortType: "asc",
  },
  {
    label: "Giá giảm dần",
    sortBy: "price",
    sortType: "desc",
  },
];

const Header = (props: Props) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [selected, setSelected] = useState<Item>(() => {
    const item = items.find(
      (i: Item) => i.sortBy === props.sortBy && i.sortType === props.sortType
    );
    return item ? item : items[0];
  });
  const toggleHidden = () => {
    setHidden((_h: boolean) => !_h);
  };
  const handleClick = (item: Item) => {
    setSelected(item);
    props.onSort && props.onSort(item.sortBy, item.sortType);
    setHidden(true);
  };
  return (
    <div className={styles.header}>
      <div>{props.totalProducts} sản phẩm</div>
      <div className={styles["header-right"]}>
        <div>Sắp xếp</div>
        <div className={styles["header-menu"]}>
          <div
            className={styles["header-menu-selected"]}
            onClick={toggleHidden}
          >
            {selected.label}
          </div>
          {!hidden && (
            <ClickAwayListener onClickAway={toggleHidden}>
              <ul className={styles["header-menu-items"]}>
                {items.map((item: Item) => {
                  return (
                    <li key={item.label} onClick={() => handleClick(item)}>
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </ClickAwayListener>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
