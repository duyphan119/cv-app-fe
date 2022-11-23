import React, { useState } from "react";
import { Variant } from "../../../../utils/types";
import styles from "../../style.module.css";

type Props = {
  variants: any;
  selected: Variant[];
  clickVariant: any;
};

const Variants = (props: Props) => {
  return (
    <>
      {props.variants.keys.map((key: string) => {
        return (
          <div className={styles["variant-type"]} key={key}>
            <div className={styles["variant-type-name"]}>{key}</div>
            <ul className={styles.variants}>
              {props.variants.values[key].map((variant: Variant) => {
                return (
                  <li
                    className={
                      props.selected &&
                      props.selected.findIndex(
                        (i: any) => i.name === variant.name
                      ) !== -1
                        ? styles["variant-active"]
                        : styles.variant
                    }
                    key={variant.id}
                    onClick={() => props.clickVariant(variant)}
                  >
                    {variant.name}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default React.memo(Variants);
