import { styled } from "styled-components";
import { Product } from "../../entities/product";
import { useCart } from "../cartStore";

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;
export function CartList() {
  const cart = useCart();

  return (
    <CartContainer>
      <h2>Cart</h2>
      {!cart && <div>Loading...</div>}
      {!!cart &&
        cart.items.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
    </CartContainer>
  );
}

const CartCard = styled.div`
  border: 1px solid gray;
  padding: 0.5em;
  border-radius: 4px;
`;

function CartItem({ product }: { product: Product }) {
  return (
    <CartCard>
      {product.name} - <i>{product.price}$</i>
    </CartCard>
  );
}
