import styled from "styled-components";
import type { Product } from "../../entities/product";
import type { MicroFrontEnd } from "../../infra/blueprint";

// todo - get from server
const products: Product[] = [
  {
    id: "1",
    name: "product 1",
    price: 100,
  },
  {
    id: "2",
    name: "product 2",
    price: 200,
  },
];

export const galleryMfe: MicroFrontEnd = {
  name: "items",
  render: () => <ProductGallery />,
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

function ProductGallery() {
  return (
    <div>
      <h2>Items</h2>
      <Grid>
        {products.map((product) => (
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
