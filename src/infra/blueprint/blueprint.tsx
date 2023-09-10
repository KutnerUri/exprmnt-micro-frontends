import mapValues from "lodash.mapvalues";
import type { BluePrintNode } from "./bluePrintNode";

// mocked logger
const logger = console;

export type MfeRenderProps = {
  children: React.ReactNode;
  config?: object;
  slots?: Record<string, React.ReactNode>;
};

export type MfeRenderer = (
  props: MfeRenderProps /* targetNode?: HTMLElement */
) => React.ReactNode;

export type MicroFrontEnd = {
  name: string;
  render: MfeRenderer;
  elements?: Record<string, MfeRenderer>;
};

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

function blueprintNodeToJsx(
  blueprint: BluePrintNode,
  plugins: Map<string, MicroFrontEnd>
) {
  const { plugin: pluginName, config } = blueprint;
  const renderer = _getRenderer(plugins, pluginName, blueprint.element);
  if (!renderer) {
    const reportName = blueprint.element
      ? `${pluginName}.${blueprint.element}`
      : pluginName;
    logger.error(`blueprint parsing error: plugin ${reportName} not found`);
    return null;
  }

  const children = blueprintToJsx(blueprint.children, plugins);
  const slots = blueprint.slots
    ? mapValues(blueprint.slots, (x) => blueprintToJsx(x, plugins))
    : undefined;

  const jsx = renderer({ children, config, slots });

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
