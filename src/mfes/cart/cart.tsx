import { ReactNode } from "react";
import { styled } from "styled-components";
import { MicroFrontEnd } from "../../infra/blueprint";
import { Product } from "../../entities/product";
import { cartItems } from "../../mocks/products";

export const cartMfe: MicroFrontEnd = {
  name: "cart",
  render: ({ children }: { children: ReactNode }) => <Cart />,
};

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

function Cart() {
  return (
    <CartList>
      <h2>Cart</h2>
      {cartItems.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </CartList>
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