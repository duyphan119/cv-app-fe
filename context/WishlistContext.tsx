import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
type Props = {
  children?: ReactNode;
};
const WishlistContext = createContext({
  listId: new Set(),
  count: 0,
  addToWishlist: (productId: number) => {},
  deleteItem: (productId: number) => {},
});

const WishlistWrapper = (props: Props) => {
  const [listId, setListId] = useState<Set<number>>(new Set());

  useEffect(() => {
    const set: Set<number> = new Set();
    [1, 3, 4].forEach((item: number) => set.add(item));
    setListId(set);
  }, []);

  const addToWishlist = (productId: number) => {
    const set = listId;
    set.add(productId);
    setListId(set);
  };

  const deleteItem = (productId: number) => {
    const set = listId;
    set.delete(productId);
    setListId(set);
  };

  const count: number = listId.size;

  return (
    <WishlistContext.Provider
      value={{ listId, count, addToWishlist, deleteItem }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
};
export function useWishlistContext() {
  return useContext(WishlistContext);
}
export default WishlistWrapper;
