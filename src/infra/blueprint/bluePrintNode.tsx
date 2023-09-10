export type BluePrintNode = {
  /** plugin type */
  plugin: string;
  /** sub element in the plugin */
  element?: string;
  children?: string | BluePrintNode[];
  config?: object;
  slots?: Record<string, BluePrintNode[]>;
};
