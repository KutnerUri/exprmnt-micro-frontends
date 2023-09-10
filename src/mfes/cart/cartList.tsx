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
          <CartItem
            key={product.id}
            product={product}
            onRemove={() => cart.removeItem(product.id)}
          />
        ))}
    </CartContainer>
  );
}

const CartCard = styled.div`
  display: flex;
  justify-content: space-between;

  border: 1px solid gray;
  padding: 0.5em;
  border-radius: 4px;

  :nth-child(2) {
    display: none;
  }
  &:hover > :nth-child(2) {
    display: inline-block;
  }
`;

const IconButton = styled.button`
  background: rgba(0, 0, 0, 0.09);
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
  &:active {
    background: rgba(0, 0, 0, 0.23);
  }
`;

function CartItem({
  product,
  onRemove,
}: {
  product: Product;
  onRemove?: () => void;
}) {
  return (
    <CartCard>
      <span>
        {product.name} - <i>{product.price}$</i>
      </span>
      <IconButton onClick={onRemove}>×</IconButton>
    </CartCard>
  );
}
