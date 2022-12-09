import { useState, useEffect, ChangeEvent } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import styles from "../style.module.css";
import { Product, ResponseItems } from "../../../../../utils/types";
import { search as apiSearch } from "../../../../../apis/product";
import { MSG_SUCCESS } from "../../../../../utils/constants";
import Link from "next/link";
import Image from "next/image";
import { ClickAwayListener } from "@mui/material";

type Props = {};

const SearchInput = (props: Props) => {
  const [productData, setProductData] = useState<ResponseItems<Product>>({
    items: [],
    count: 0,
  });
  const [q, setQ] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };

  const search = async () => {
    try {
      if (q === "") {
        setProductData({
          items: [],
          count: 0,
        });
      } else {
        const { message, data } = await apiSearch({ q, limit: 3 });
        if (message === MSG_SUCCESS) {
          setProductData(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlur = () => {
    setVisible(false);
  };

  const handleFocus = () => {
    setVisible(true);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      search();
    }, 555);

    return () => clearTimeout(timerId);
  }, [q]);

  return (
    <ClickAwayListener onClickAway={handleBlur}>
      <div className={styles.search}>
        <input
          type="search"
          placeholder="Nhập từ khóa cần tìm"
          value={q}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <SearchOutlinedIcon />
        {visible && productData.count > 0 && (
          <div className={styles["search-result-wrapper"]}>
            <ul>
              {productData.items.map((product: Product) => {
                return (
                  <li key={product.id}>
                    <Link
                      href={`/san-pham/${product.slug}`}
                      className={styles.link}
                    >
                      <Image
                        src={product.thumbnail}
                        alt=""
                        width={64}
                        height={64}
                        priority={true}
                      />
                      <div className={styles.product}>
                        <div className={styles.name}>{product.name}</div>
                        <div className={styles.price}>
                          {product.minPrice === product.maxPrice
                            ? `${product.minPrice}đ`
                            : `${product.minPrice}đ - ${product.maxPrice}đ`}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href={`/tim-kiem?q=${q}`} className={styles["view-all"]}>
              Xem tất cả
            </Link>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default SearchInput;
