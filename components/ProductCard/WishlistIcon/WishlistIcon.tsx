import React, { useState, useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "../style.module.css";
import { useWishlistContext } from "../../../context/WishlistContext";
type Props = {
  productId: number;
};

const WishlistIcon = (props: Props) => {
  const { listId, addToWishlist, deleteItem } = useWishlistContext();
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    setState(listId.findIndex((id: number) => id === props.productId) !== -1);
  }, [listId]);

  const toggleState = () => {
    if (state) {
      deleteItem(props.productId);
    } else {
      addToWishlist(props.productId);
    }
    setState((s) => !s);
  };

  return (
    <div
      className={`${styles["wishlist-icon"]} ${state ? styles.active : ""}`}
      onClick={toggleState}
    >
      {state ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
    </div>
  );
};

export default WishlistIcon;
