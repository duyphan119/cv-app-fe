import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Link from "next/link";
import { Badge } from "@mui/material";
import { useWishlistContext } from "../../../../../context/WishlistContext";

type Props = {};

const WishlistIcon = (props: Props) => {
  const { listId } = useWishlistContext();
  return (
    <>
      <Badge badgeContent={listId.length} color="error">
        <Link href="/favorite">
          <FavoriteBorderOutlinedIcon />
          YÊU THÍCH
        </Link>
      </Badge>
    </>
  );
};

export default WishlistIcon;
