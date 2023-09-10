import blueprint from "./blueprint.json";
import { blueprintToJsx } from "./infra/blueprint";
import { plugins } from "./mfes/plugins";

function App() {
  const jsx = blueprintToJsx(blueprint, plugins);

  return <>{jsx}</>;
}

export default App;
