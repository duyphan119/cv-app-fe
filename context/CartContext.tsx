import { hasCookie } from "cookies-next";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  createCartItem,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "../apis/order";
import { COOKIE_ACCESSTOKEN_NAME, MSG_SUCCESS } from "../utils/constants";
import { Cart, CartItem, OrderItem } from "../utils/types";
import { useAuthContext } from "./AuthContext";
import { useSnackbarContext } from "./SnackbarContext";
type Props = {
  children?: ReactNode;
};

const CartContext = createContext({} as any);

const CartWrapper = (props: Props) => {
  const [cart, setCart] = useState<Cart>({ items: [] });
  const { show } = useSnackbarContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        if (hasCookie(COOKIE_ACCESSTOKEN_NAME)) {
          const { message, data } = await getCart();
          if (message === MSG_SUCCESS) {
            setCart(data && data.items ? data : { ...data, items: [] });
          }
        }
        setLoading(false);
      } catch (error) {
        console.log("Get Cart Error", error);
      }
    })();
  }, []);

  const checkout = () => {
    setCart({ items: [] });
  };

  const addToCart = async (item: CartItem) => {
    try {
      const { message, data } = await createCartItem({
        ...(item.productVariantId
          ? { productVariantId: item.productVariantId }
          : {}),
        quantity: item.quantity,
        productId: item.productId,
      });

      if (message === MSG_SUCCESS) {
        setCart((c: Cart) => {
          const index = c.items.findIndex(
            (i: OrderItem) =>
              i.productId === item.productId &&
              i.productVariantId === item.productVariantId
          );

          if (index !== -1) {
            c.items[index].quantity += data.quantity;
          } else {
            c.items.push(data);
          }

          return { ...c };
        });
        show("Sản phẩm đã được thêm vào giỏ hàng", "success");
      }
    } catch (error) {
      console.log(error);
      show("Đã có lỗi xảy ra, vui lòng thử lại sau", "error");
    }
  };

  const updateCart = async (item: OrderItem) => {
    try {
      const { message, data } = await updateCartItem(item.id, item.quantity);

      if (message === MSG_SUCCESS) {
        setCart((c: Cart) => {
          const index = c.items.findIndex((i: OrderItem) => i.id === item.id);

          if (index !== -1) {
            if (item.quantity <= 0) {
              c.items.splice(index, 1);
            } else {
              c.items[index].quantity = item.quantity;
            }
          }

          return { ...c };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const { message } = await deleteCartItem(id);

      if (message === MSG_SUCCESS) {
        setCart({
          items: [...cart.items].filter((i: OrderItem) => i.id !== id),
        });
        show("Sản phẩm đã được xóa khỏi giỏ hàng", "success");
      }
    } catch (error) {
      console.log(error);
      show("Đã có lỗi xảy ra, vui lòng thử lại sau", "error");
    }
  };

  const count: number = cart
    ? cart.items.reduce((p: number, c: CartItem) => p + c.quantity, 0)
    : 0;

  const total: number = cart
    ? cart.items.reduce(
        (p: number, c: CartItem) =>
          p +
          (c.productVariant
            ? c.productVariant.price
            : c.product
            ? c.product.price
            : 0) *
            c.quantity,
        0
      )
    : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        addToCart,
        updateCart,
        deleteItem,
        total,
        checkout,
        loading,
        setCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export function useCartContext() {
  return useContext(CartContext);
}
export default CartWrapper;
