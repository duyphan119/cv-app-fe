import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { getListProducts, variants } from "../dummyData";
import { Cart, CartItem, ProductVariant } from "../utils/types";
type Props = {
  children?: ReactNode;
};

const CartContext = createContext({
  cart: { items: [] } as Cart,
  count: 0,
  addToCart: (item: any) => {},
  updateCart: (item: any) => {},
  deleteItem: (productVariantId: number) => {},
  total: 0,
});

const CartWrapper = (props: Props) => {
  const [cart, setCart] = useState<Cart>({ items: [] });

  const addToCart = (item: CartItem) => {
    setCart((c: Cart) => {
      const index = c.items.findIndex(
        (i: CartItem) => i.productVariant.id === item.productVariant.id
      );

      if (index !== -1) {
        c.items[index].quantity += item.quantity;
      } else {
        c.items.push(item);
      }

      return { ...c };
    });
  };

  const updateCart = (item: CartItem) => {
    setCart((c: Cart) => {
      const index = c.items.findIndex(
        (i: CartItem) => i.productVariant.id === item.productVariant.id
      );

      if (index !== -1) {
        if (item.quantity <= 0) {
          c.items.splice(index, 1);
        } else {
          c.items[index].quantity = item.quantity;
        }
      }

      return { ...c };
    });
  };

  const deleteItem = (productVariantId: number) => {
    setCart({
      items: [...cart.items].filter(
        (i: CartItem) => i.productVariant.id !== productVariantId
      ),
    });
  };

  const count: number = cart
    ? cart.items.reduce((p: number, c: CartItem) => p + c.quantity, 0)
    : 0;

  const total: number = cart
    ? cart.items.reduce(
        (p: number, c: CartItem) => p + c.productVariant.price * c.quantity,
        0
      )
    : 0;

  return (
    <CartContext.Provider
      value={{ cart, count, addToCart, updateCart, deleteItem, total }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export function useCartContext() {
  return useContext(CartContext);
}
export default CartWrapper;
