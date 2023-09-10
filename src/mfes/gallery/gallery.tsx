import styled from "styled-components";
import type { Product } from "../../entities/product";
import type { MicroFrontEnd } from "../../infra/blueprint";
import { mocked_searchResults } from "../../mocks/products";
import { useCart } from "../cartStore";
import { useMockedRequest } from "../../mocks/network-request";

export const galleryMfe: MicroFrontEnd = {
  name: "gallery",
  render: ({ slots = {} }) => <ProductGallery badges={slots.badges} />,
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
`;

const Container = styled.div`
  max-width: 1200px;
`;

const Card = styled.div`
  border: 1px solid gray;
  padding: 0.5em;
  border-radius: 4px;
`;

const TitleLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Badges = styled.div``;

function ProductGallery({ badges }: { badges?: React.ReactNode }) {
  const products = useMockedRequest(mocked_searchResults);

  return (
    <Container>
      <TitleLine>
        <h2>Items</h2>
        <Badges>{badges}</Badges>
      </TitleLine>
      {!products && <div>Loading...</div>}
      {products && (
        <Grid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      )}
    </Container>
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
      {!isCartOnline && <button disabled>add to cart</button>}
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
