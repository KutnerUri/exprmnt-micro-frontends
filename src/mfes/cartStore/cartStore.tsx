import type { MicroFrontEnd } from "../../infra/blueprint";
import { CartProvider } from "./cartContext";

// this is shared and singleton MFE that will provide context to both cart and gallery

export const cartStoreMfe: MicroFrontEnd = {
  name: "cart-store",
  render: ({ children }) => <CartProvider>{children}</CartProvider>,
};
