import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import styles from "../style.module.css";
type Props = {
  onFilter?: any;
  sort_by?: string;
  sort_type?: string;
  totalProducts?: number;
  query?: any;
};
type Item = {
  label: string;
  sort_by: string;
  sort_type: string;
};
const items: Item[] = [
  {
    label: "Mặc định",
    sort_by: "id",
    sort_type: "desc",
  },
  {
    label: "Tên A-Z",
    sort_by: "name",
    sort_type: "asc",
  },
  {
    label: "Tên Z-A",
    sort_by: "name",
    sort_type: "desc",
  },
  {
    label: "Giá tăng dần",
    sort_by: "price",
    sort_type: "asc",
  },
  {
    label: "Giá giảm dần",
    sort_by: "price",
    sort_type: "desc",
  },
];

const Header = (props: Props) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [selected, setSelected] = useState<Item>(() => {
    const item = items.find(
      (i: Item) =>
        i.sort_by === props.query.sort_by &&
        i.sort_type === props.query.sort_type
    );
    return item ? item : items[0];
  });
  const toggleHidden = () => {
    setHidden((_h: boolean) => !_h);
  };
  const handleClick = (item: Item) => {
    setSelected(item);
    props.onFilter &&
      props.onFilter({ sort_by: item.sort_by, sort_type: item.sort_type });
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
