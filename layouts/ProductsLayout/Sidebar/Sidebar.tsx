import { useState, useEffect } from "react";
import { getAllVariants } from "../../../apis/variant";
import { useGroupProductContext } from "../../../context/GroupProductContext";
import { MSG_SUCCESS } from "../../../utils/constants";
import { formatVariants } from "../../../utils/helpers";
import { GroupProduct, RenderVariantType, Variant } from "../../../utils/types";
import styles from "../style.module.css";

type Props = {
  onFilter?: any;
  query?: any;
  onClose?: any;
};

export type Price = {
  label: string;
  min: number;
  max?: number;
};

const prices: any[] = [
  {
    label: "Nhỏ hơn 500.000đ",
    min: 0,
    max: 500000,
  },
  {
    label: "Từ 500.000đ - 1.000.000đ",
    min: 500000,
    max: 1000000,
  },
  {
    label: "Từ 1.000.000đ - 2.000.000đ",
    min: 1000000,
    max: 2000000,
  },
  {
    label: "Lớn hơn 2.000.000đ",
    min: 2000000,
  },
];

type Selected = {
  groupProduct?: GroupProduct;
  variants: Variant[];
  price?: Price;
};

const Sidebar = (props: Props) => {
  const { groupProducts } = useGroupProductContext();
  const [variants, setVariants] = useState<RenderVariantType[]>([]);
  const [selected, setSelected] = useState<Selected>({
    variants: [],
  });

  const clickGroupProduct = (groupProduct: GroupProduct) => {
    setSelected((prev) => {
      if (prev?.groupProduct?.id === groupProduct.id) {
        return {
          price: prev.price,
          variants: prev.variants,
        };
      }
      return {
        ...prev,
        groupProduct,
      };
    });
  };

  const clickVariant = (variant: Variant) => {
    setSelected((prev) => {
      const index = prev.variants.findIndex(
        (v: Variant) => v.id === variant.id
      );

      if (index === -1) {
        return {
          ...prev,
          variants: [
            ...prev.variants.filter((v: Variant) => v.id !== variant.id),
            variant,
          ],
        };
      }
      return {
        ...prev,
        variants: prev.variants.filter((v: Variant) => v.id !== variant.id),
      };
    });
  };

  const clickPrice = (price: Price) => {
    setSelected((prev) => {
      if (prev?.price?.label === price.label) {
        return {
          groupProduct: prev.groupProduct,
          variants: prev.variants,
        };
      }
      return {
        ...prev,
        price,
      };
    });
  };

  const handleClick = () => {
    if (props.onFilter) {
      const { groupProduct, price, variants } = selected;
      const obj: any = {};
      if (groupProduct) {
        obj.group_product_slug = groupProduct.slug;
      }
      if (price) {
        obj.min_price = price.min;
        if (price.max) {
          obj.max_price = price.max;
        }
      }
      if (variants.length > 0) {
        obj.v_ids = variants.map((v: Variant) => v.id).join("-");
      }
      console.log(obj);
      props.onFilter(obj);
      props.onClose && props.onClose();
    }
  };

  useEffect(() => {
    (async () => {
      const { message, data } = await getAllVariants();

      if (message === MSG_SUCCESS) {
        setVariants(formatVariants(data.items));
      }
    })();
  }, []);

  useEffect(() => {
    if (variants.length > 0) {
      const { group_product_slug, min_price, max_price, v_ids } = props.query;

      const groupProduct = groupProducts.find(
        (gp: GroupProduct) =>
          group_product_slug && gp.slug === group_product_slug
      );
      const _p = prices.find(
        (p: Price) =>
          min_price && p.min === +min_price && max_price && p.max === +max_price
      );
      const _variants: any = v_ids
        ? v_ids.split("-").map((id: string) => {
            let result: any;

            for (let i = 0; i < variants.length; i++) {
              const _result = variants[i].values.find(
                (v: Variant) => v.id === +id
              );

              if (_result) {
                result = _result;
                break;
              }
            }
            return result;
          })
        : [];
      const s: Selected = {
        ...(groupProduct ? { groupProduct } : {}),
        ...(_p ? { price: _p } : {}),
        variants: _variants,
      };
      setSelected(s);
    }
  }, [groupProducts, props.query, variants]);

  return (
    <div className={styles.sidebar}>
      <div className={styles["top-sidebar"]}>
        <div className={styles.result}>
          Đã chọn:
          {selected ? (
            <ul>
              {selected.groupProduct ? (
                <li
                  onClick={() =>
                    clickGroupProduct(selected.groupProduct as GroupProduct)
                  }
                >
                  {selected.groupProduct.name}
                </li>
              ) : null}
              {selected.variants.map((variant: Variant) => {
                return (
                  <li key={variant.id} onClick={() => clickVariant(variant)}>
                    {variant.name}
                  </li>
                );
              })}
              {selected.price ? (
                <li onClick={() => clickPrice(selected.price as Price)}>
                  {selected.price.label}
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>
        <button onClick={handleClick}>Lọc</button>
      </div>
      <div className={styles.panel}>
        <div className={styles.title}>Nhóm sản phẩm</div>
        <ul className={styles["checkboxs"]}>
          {groupProducts.map((groupProduct: GroupProduct) => {
            return (
              <li key={groupProduct.id} className={styles["checkbox"]}>
                <input
                  type="checkbox"
                  name="groupProduct"
                  id={`checkbox${groupProduct.id}`}
                  hidden={true}
                  onChange={(e) => clickGroupProduct(groupProduct)}
                  checked={selected?.groupProduct?.id === groupProduct.id}
                />
                <div
                  className={styles.checked}
                  onClick={() => clickGroupProduct(groupProduct)}
                ></div>
                <label htmlFor={`checkbox${groupProduct.id}`}>
                  {groupProduct.name}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      {variants.map((item: RenderVariantType) => {
        return (
          <div className={styles.panel} key={item.key}>
            <div className={styles.title}>{item.key}</div>
            <ul className={styles.variants}>
              {item.values.map((variant: Variant) => {
                return (
                  <li
                    key={variant.id}
                    className={`${styles.variant} ${
                      selected.variants.findIndex(
                        (v: Variant) => v.id === variant.id
                      ) !== -1
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => clickVariant(variant)}
                  >
                    {variant.name}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <div className={styles.panel}>
        <div className={styles.title}>Giá</div>
        <ul className={styles["checkboxs"]}>
          {prices.map((price: Price) => {
            return (
              <li key={price.label} className={styles["checkbox"]}>
                <input
                  type="checkbox"
                  name="price"
                  id={`checkbox${price.min}`}
                  hidden={true}
                  checked={selected?.price?.label === price.label}
                  onChange={(e) => clickPrice(price)}
                />
                <div
                  className={styles.checked}
                  onClick={() => clickPrice(price)}
                ></div>
                <label htmlFor={`checkbox${price.min}`}>{price.label}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
