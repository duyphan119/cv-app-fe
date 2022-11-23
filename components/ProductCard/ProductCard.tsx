import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import { product, variants } from "../../dummyData";
import {
  Product,
  ProductVariant,
  ProductVariantImage,
  Variant,
} from "../../utils/types";
import Downbar from "./Downbar";
import styles from "./style.module.css";
import WishlistIcon from "./WishlistIcon";

type Props = {
  product?: Product;
};

const ProductCard = (props: Props) => {
  const { addToCart } = useCartContext();
  const [selected, setSelected] = useState<Variant[]>([]);
  const [variants, setVariants] = useState<any>({
    keys: [],
    values: {},
  });
  const [selectedProductVariant, setSelectedProductVariant] =
    useState<ProductVariant>();
  useEffect(() => {
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

  useEffect(() => {
    if (selected.length === variants.keys.length) {
      setSelectedProductVariant(
        props.product?.productVariants.find((pv: ProductVariant) =>
          pv.variants.every(
            (v: Variant) =>
              selected.findIndex((_v: Variant) => v.id === _v.id) !== -1
          )
        )
      );
    }
  }, [selected]);

  const clickVariant = (variant: Variant) => {
    const newArr = [...selected];
    const index = selected.findIndex((i: Variant) => i.type === variant.type);
    if (index === -1) newArr.push(variant);
    else newArr[index] = variant;
    setSelected(newArr);
  };

  const handleAddToCart = (quantity: number) => {
    if (selected.length === variants.keys.length) {
      const productVariant = props.product?.productVariants.find(
        (pv: ProductVariant) =>
          pv.variants.every(
            (v: Variant) =>
              selected.findIndex((_v: Variant) => _v.id === v.id) !== -1
          )
      );
      if (productVariant)
        addToCart({
          quantity,
          productVariant,
          productVariantId: productVariant.id,
        });
    }
  };

  return props.product ? (
    <div className={styles.card}>
      <div className={styles["thumbnail-wrapper"]}>
        <Link
          className={styles.thumbnail}
          href={{
            pathname: "/san-pham/[slug]",
            query: {
              slug: props.product.slug,
            },
          }}
        >
          <Image
            src={
              selected
                ? props.product.images.find(
                    (img: ProductVariantImage) =>
                      selected.findIndex(
                        (v: Variant) => v.id === img.variantId
                      ) !== -1
                  )?.path || props.product.thumbnail
                : props.product.thumbnail
            }
            width={334}
            height={420}
            alt=""
            priority={true}
          />
        </Link>
        <Downbar
          variants={variants}
          onAddToCart={handleAddToCart}
          onClickVariant={clickVariant}
          selected={selected}
        />
      </div>
      <div className={styles["name-wrapper"]}>
        <Link
          href={{
            pathname: "/san-pham/[slug]",
            query: {
              slug: props.product.slug,
            },
          }}
          className={styles.name}
        >
          {props.product.name}
        </Link>
        <WishlistIcon productId={props.product.id} />
        <div className={styles.price}>
          {/* <span className={styles["old-price"]}>{selectedProductVariant ? selectedProductVariant.price : props.product.productVariants[0].price}đ</span> */}
          <span>
            {selectedProductVariant
              ? selectedProductVariant.price
              : props.product.productVariants[0].price}
            đ
          </span>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductCard;
