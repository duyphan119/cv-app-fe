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
import { MSG_SUCCESS } from "../utils/constants";
import { Cart, CartItem } from "../utils/types";
import { useSnackbarContext } from "./SnackbarContext";
type Props = {
  children?: ReactNode;
};

const CartContext = createContext({} as any);

const CartWrapper = (props: Props) => {
  const [cart, setCart] = useState<Cart>({ items: [] });
  const { show } = useSnackbarContext();

  useEffect(() => {
    (async () => {
      try {
        const { message, data } = await getCart();
        if (message === MSG_SUCCESS) {
          setCart(data.items ? data : { ...data, items: [] });
        }
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
        productVariantId: item.productVariantId,
        quantity: item.quantity,
      });

      if (message === MSG_SUCCESS) {
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
        show("Sản phẩm đã được thêm vào giỏ hàng", "success");
      }
    } catch (error) {
      console.log(error);
      show("Đã có lỗi xảy ra, vui lòng thử lại sau", "error");
    }
  };

  const updateCart = async (item: CartItem) => {
    try {
      const { message, data } = await updateCartItem(
        item.productVariantId,
        item.quantity
      );

      if (message === MSG_SUCCESS) {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (productVariantId: number) => {
    try {
      const { message, data } = await deleteCartItem(productVariantId);

      if (message === MSG_SUCCESS) {
        setCart({
          items: [...cart.items].filter(
            (i: CartItem) => i.productVariant.id !== productVariantId
          ),
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
        (p: number, c: CartItem) => p + c.productVariant.price * c.quantity,
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
