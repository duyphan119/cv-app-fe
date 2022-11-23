import React from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Link from "next/link";
import { Badge } from "@mui/material";
import { useCartContext } from "../../../../../context/CartContext";
type Props = {};

const CartIcon = (props: Props) => {
  const { count } = useCartContext();
  return (
    <>
      <Badge badgeContent={count} color="error">
        <Link href="/gio-hang">
          <ShoppingBagOutlinedIcon />
          GIỎ HÀNG
        </Link>
      </Badge>
    </>
  );
};

export default CartIcon;
