import { ReactNode } from "react";
import { MicroFrontEnd } from "../../infra/blueprint";
import { CartBadge } from "./cartBadge";
import { CartList } from "./cartList";

export const cartMfe: MicroFrontEnd = {
  name: "cart",
  render: () => <CartList />,
  elements: {
    badge: () => <CartBadge />,
  },
};
