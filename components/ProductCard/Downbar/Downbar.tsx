import React from "react";
import { Variant, VariantValue } from "../../../utils/types";
import styles from "../style.module.css";
import Quantity from "./Quantity";
import Variants from "./Variants";

type Props = {
  selected: VariantValue[];
  onAddToCart: any;
  onClickVariant: any;
  variants: any;
};

const Downbar = (props: Props) => {
  const [quantity, setQuantity] = React.useState<number>(1);

  const changeQuantity = (newQuantity: number) => {
    newQuantity >= 1 && setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    props.onAddToCart(quantity);
  };

  return (
    <div className={styles.downbar}>
      <Variants
        variants={props.variants}
        selected={props.selected}
        clickVariant={props.onClickVariant}
      />
      <div className={styles.footer}>
        <Quantity quantity={quantity} changeQuantity={changeQuantity} />
        <button className={styles["add-to-cart-btn"]} onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default Downbar;
