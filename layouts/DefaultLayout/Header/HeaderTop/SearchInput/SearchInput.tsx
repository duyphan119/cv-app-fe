import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import styles from "../style.module.css";

type Props = {};

const SearchInput = (props: Props) => {
  return (
    <div className={styles.search}>
      <input type="search" placeholder="Nhập từ khóa cần tìm" />
      <SearchOutlinedIcon />
    </div>
  );
};

export default SearchInput;
