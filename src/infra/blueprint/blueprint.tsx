export type BluePrintNode = {
  /** plugin type */
  plugin: string;
  /** sub element in the plugin */
  element?: string;
  children?: string | BluePrintNode[];
  config?: object;
  slot?: Record<string, BluePrintNode>;
};

export type MfeRenderProps = {
  children: React.ReactNode;
  config?: object;
  slots?: Map<string, React.ReactNode>;
};

export type MfeRenderer = (
  props: MfeRenderProps /* targetNode?: HTMLElement */
) => React.ReactNode;

export type MicroFrontEnd = {
  name: string;
  // TODO - review
  render: MfeRenderer;
  elements?: Record<string, MfeRenderer>;
};

function blueprintNodeToJsx(
  blueprint: BluePrintNode,
  plugins: Map<string, MicroFrontEnd>
) {
  const { plugin: pluginName, config, slot } = blueprint;
  const renderer = _getRenderer(plugins, pluginName, blueprint.element);
  if (!renderer) return null;

  const children = blueprintToJsx(blueprint.children, plugins);
  const jsx = renderer({ children, config });

  return jsx;
}

function _getRenderer(
  map: Map<string, MicroFrontEnd>,
  pluginName: string,
  elementName?: string
) {
  const plugin = map.get(pluginName);
  if (!plugin) return undefined;

  if (!elementName) return plugin.render;
  return plugin.elements?.[elementName] ?? undefined;
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
