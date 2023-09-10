import { styled } from "styled-components";
import { useCart } from "../cartStore";

const CartButton = styled.button``;
export function CartBadge() {
  const cart = useCart();

  return <CartButton>{cart?.items.length} 🛒</CartButton>;
}
