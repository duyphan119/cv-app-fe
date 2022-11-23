import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Link from "next/link";
import { Badge } from "@mui/material";
import { useWishlistContext } from "../../../../../context/WishlistContext";

type Props = {};

const WishlistIcon = (props: Props) => {
  const { count } = useWishlistContext();
  return (
    <>
      <Badge badgeContent={count} color="error">
        <Link href="/san-pham-yeu-thich">
          <FavoriteBorderOutlinedIcon />
          YÊU THÍCH
        </Link>
      </Badge>
    </>
  );
};

export default WishlistIcon;
