import styled from "styled-components";
import type { Product } from "../../entities/product";
import type { MicroFrontEnd } from "../../infra/blueprint";
import { mocked_searchResults } from "../../mocks/products";

export const galleryMfe: MicroFrontEnd = {
  name: "items",
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
  return (
    <Card>
      <div>{product.name}</div>
      <div>
        <i>{product.price}</i>
      </div>
      <button>add to cart</button>
      {/* <button>remove</button> */}
    </Card>
  );
}
