import React from "react";
import { useCartContext } from "../../../context/CartContext";
import { product, variants } from "../../../dummyData";
import { formatVariants } from "../../../utils/helpers";
import { Product, ProductVariant, Variant } from "../../../utils/types";
import styles from "../style.module.css";

type Props = {
  product?: Product;
  selectedVariants?: Variant[];
  onClickVariant?: any;
};

const Right = (props: Props) => {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = React.useState<number>(1);
  const [selectedProductVariant, setSelectedProductVariant] =
    React.useState<ProductVariant>();
  const [variants, setVariants] = React.useState<any>({
    keys: [],
    values: {},
  });

  React.useEffect(() => {
    if (props.product) {
      let _variants: any = {};
      props.product.productVariants[0].variants.forEach((v: Variant) => {
        _variants = Object.assign(_variants, { [v.type]: [v] });
      });
      for (let i = 1; i < props.product.productVariants.length; i++) {
        props.product.productVariants[i].variants.forEach((v: Variant) => {
          _variants[v.type] = [
            ..._variants[v.type].filter((_v: Variant) => _v.id !== v.id),
            v,
          ];
        });
      }
      setVariants({
        keys: Object.keys(_variants),
        values: _variants,
      });
    }
  }, [props.product]);

  React.useEffect(() => {
    if (
      props.selectedVariants &&
      props.selectedVariants.length === variants.keys.length
    ) {
      setSelectedProductVariant(
        props.product?.productVariants.find((pv: ProductVariant) =>
          pv.variants.every(
            (v: Variant) =>
              props.selectedVariants &&
              props.selectedVariants.findIndex(
                (_v: Variant) => v.id === _v.id
              ) !== -1
          )
        )
      );
    }
  }, [props.selectedVariants]);

  const handleAddToCart = () => {
    if (selectedProductVariant)
      addToCart({
        quantity,
        productVariant: selectedProductVariant,
        productVariantId: selectedProductVariant.id,
      });
  };
  const changeQuantity = (newQuantity: number) => {
    newQuantity > 0 && setQuantity(newQuantity);
  };
  return props.product ? (
    <div className={styles.right}>
      <div className={styles.name}>{props.product.name}</div>
      <div className={styles.price}>
        99000đ
        <span>{props.product.productVariants[0].price}đ</span>
      </div>
      {variants.keys.map((key: string) => {
        return (
          <div className={styles["variant-type"]} key={key}>
            <div className={styles.title}>{key}</div>
            <ul className={styles.variant}>
              {variants.values[key].map((variant: Variant) => {
                return (
                  <li
                    key={variant.id}
                    onClick={() => props.onClickVariant(variant)}
                    className={
                      props.selectedVariants &&
                      props.selectedVariants.findIndex(
                        (i: Variant) => i.name === variant.name
                      ) !== -1
                        ? styles.active
                        : ""
                    }
                  >
                    {variant.name}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <div className={styles.quantity}>
        <button onClick={() => changeQuantity(quantity - 1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => changeQuantity(quantity + 1)}>+</button>
      </div>
      <div className={styles.buttons}>
        <button>Mua ngay</button>
        <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
      </div>
    </div>
  ) : null;
};

export default Right;
