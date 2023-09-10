export type BluePrintNode = {
  plugin: string;
  children?: string | BluePrintNode[];
  config?: object;
};

export type MicroFrontEnd = {
  name: string;
  // TODO - review
  render: (
    children: React.ReactNode,
    config: object | undefined
  ) => React.ReactNode;
};

function blueprintNodeToJsx(
  blueprint: BluePrintNode,
  plugins: Map<string, MicroFrontEnd>
) {
  const { plugin: pluginName, config } = blueprint;
  const plugin = plugins.get(pluginName);

  if (!plugin) return null;

  const childrenJsx = blueprintToJsx(blueprint.children, plugins);
  const jsx = plugin.render(childrenJsx, config);

  return jsx;
}

export function blueprintToJsx(
  children: BluePrintNode | BluePrintNode[] | string | undefined,
  plugins: Map<string, MicroFrontEnd>
) {
  if (typeof children === "undefined") return null;
  if (typeof children === "string") return children;

  if (Array.isArray(children))
    return children.map((child) => blueprintNodeToJsx(child, plugins));

  return blueprintNodeToJsx(children, plugins);
}
