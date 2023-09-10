import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "../../entities/product";
import { useMockedRequest } from "../../mocks/network-request";
import { mocked_cartItems } from "../../mocks/products";

type CartItem = Product;
type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
};

const cartCtx = createContext<CartState | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const loadedItems = useMockedRequest(mocked_cartItems);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: CartItem) => {
    setCartItems((items) => [...items, item]);
  }, []);
  const removeItem = useCallback((id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  }, []);

  useEffect(() => {
    if (loadedItems) setCartItems(loadedItems);
  }, loadedItems);

  const state = useMemo(() => {
    if (!loadedItems) return undefined;
    return { items: cartItems, addItem, removeItem };
  }, [cartItems]);

  return <cartCtx.Provider value={state}>{children}</cartCtx.Provider>;
}

export function useCart() {
  return useContext(cartCtx);
}
