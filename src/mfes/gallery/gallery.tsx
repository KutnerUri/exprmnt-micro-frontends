import styled from "styled-components";
import type { Product } from "../../entities/product";
import type { MicroFrontEnd } from "../../infra/blueprint";
import { mocked_searchResults } from "../../mocks/products";
import { useCart } from "../cartStore";

export const galleryMfe: MicroFrontEnd = {
  name: "gallery",
  render: ({ slots = {} }) => <ProductGallery badges={slots.badges} />,
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  max-width: 700px;
`;

const Card = styled.div`
  border: 1px solid gray;
  padding: 0.5em;
  border-radius: 4px;
`;

const Badges = styled.div`
  float: right;
`;

function ProductGallery({ badges }: { badges?: React.ReactNode }) {
  return (
    <div>
      <Badges>{badges}</Badges>
      <h2>Items</h2>
      <Grid>
        {mocked_searchResults.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const isCartOnline = !!cart;
  const isInCart = cart?.items.some((item) => item.id === product.id);

  return (
    <Card>
      <div>{product.name}</div>
      <div>
        <i>{product.price}</i>
      </div>
      {isCartOnline && !isInCart && (
        <button
          onClick={() => {
            cart?.addItem(product);
          }}
        >
          add to cart
        </button>
      )}
      {isCartOnline && isInCart && (
        <button onClick={() => cart.removeItem(product.id)}>remove</button>
      )}
    </Card>
  );
}
