import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Product } from "../../entities/product";

type CartItem = Product;
type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
};

const cartCtx = createContext<CartState | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Laptop",
      price: 1000,
    },
  ]);
  const addItem = useCallback((item: CartItem) => {
    setCartItems((items) => [...items, item]);
  }, []);
  const removeItem = useCallback((id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  }, []);

  const state = useMemo(
    () => ({ items: cartItems, addItem, removeItem }),
    [cartItems]
  );

  return <cartCtx.Provider value={state}>{children}</cartCtx.Provider>;
}

export function useCart() {
  return useContext(cartCtx);
}
