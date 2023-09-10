import blueprint from "./blueprint.json";
import { blueprintToJsx } from "./infra/blueprint";
import { cartMfe } from "./mfes/cart";
import { galleryMfe } from "./mfes/gallery/gallery";
import { builtinPlugins } from "./mfes/plugins";

export const plugins = new Map([
  ...builtinPlugins,
  ["items", galleryMfe],
  ["cart", cartMfe],
]);

function App() {
  const jsx = blueprintToJsx(blueprint, plugins);

  return <>{jsx}</>;
}

export default App;
