import blueprint from "./blueprint.json";
import { blueprintToJsx } from "./infra/blueprint";
import { cartMfe } from "./mfes/cart";
import { cartStoreMfe } from "./mfes/cartStore/cartStore";
import { galleryMfe } from "./mfes/gallery/gallery";
import { builtinPlugins } from "./mfes/plugins";

export const plugins = new Map([
  ...builtinPlugins,
  ["gallery", galleryMfe],
  ["cart", cartMfe],
  ["cart-store", cartStoreMfe],
]);

function App() {
  const jsx = blueprintToJsx(blueprint, plugins);

  return <>{jsx}</>;
}

export default App;
