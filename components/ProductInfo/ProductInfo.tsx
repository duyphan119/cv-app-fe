import React from "react";
import { Product, ProductVariantImage, Variant } from "../../utils/types";
import Left from "./Left";
import Right from "./Right";
import styles from "./style.module.css";
type Props = {
  product?: Product;
};
const ProductInfo = (props: Props) => {
  const [selectedVariants, setSelectedVariants] = React.useState<Variant[]>([]);

  const clickVariant = (variant: Variant) => {
    const newArr = [...selectedVariants];
    const index = selectedVariants.findIndex(
      (i: Variant) => i.type === variant.type
    );
    if (index === -1) newArr.push(variant);
    else newArr[index] = variant;
    setSelectedVariants(newArr);
  };

  return props.product ? (
    <div className={styles.body}>
      <Left
        thumbnail={props.product.thumbnail}
        images={
          selectedVariants.length > 0
            ? props.product.images.filter(
                (i: ProductVariantImage) =>
                  selectedVariants.findIndex(
                    (v: Variant) => v.id === i.variantId
                  ) !== -1
              )
            : props.product.images
        }
      />
      <Right
        product={props.product}
        selectedVariants={selectedVariants}
        onClickVariant={clickVariant}
      />
    </div>
  ) : null;
};

export default ProductInfo;
