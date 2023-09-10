import { ReactNode } from "react";
import { MicroFrontEnd, blueprintToJsx } from "./blueprint";

const emptyPlugins = new Map();

const headerPlugin: MicroFrontEnd = {
  name: "header",
  render: ({ children }: { children: ReactNode }) => {
    return <h1>{children}</h1>;
  },
  elements: {
    h2: ({ children }: { children: ReactNode }) => {
      return <h2>{children}</h2>;
    },
  },
};
const splitPlugin: MicroFrontEnd = {
  name: "split",
  render: ({ children }: { children: ReactNode }) => {
    return <div>{children}</div>;
  },
};
const plugins = new Map([
  ["header", headerPlugin],
  ["split", splitPlugin],
]);

describe("blueprintToJsx", () => {
  it("should return string when node is string", () => {
    const content = "children";
    const result = blueprintToJsx(content, emptyPlugins);

    expect(result).toEqual(content);
  });

  it("should return null when node is undefined", () => {
    const result = blueprintToJsx(undefined, emptyPlugins);
    expect(result).toEqual(null);
  });

  it("should return jsx for a header node", () => {
    const blueprint = {
      plugin: "header",
      children: "children",
    };
    const result = blueprintToJsx(blueprint, plugins);

    expect(result).toEqual(<h1>children</h1>);
  });

  it("should render nested nodes", () => {
    const blueprint = {
      plugin: "split",
      children: [
        {
          plugin: "header",
          children: "first child",
        },
        {
          plugin: "header",
          children: "second child",
        },
      ],
    };
    const result = blueprintToJsx(blueprint, plugins);

    expect(result).toEqual(
      <div>
        <h1>first child</h1>
        <h1>second child</h1>
      </div>
    );
  });

  it("should render mfe element (sub-module)", () => {
    const blueprint = {
      plugin: "split",
      children: [
        {
          plugin: "header",
          children: "first child",
        },
        {
          plugin: "header",
          children: "second child",
          element: "h2",
        },
      ],
    };
    const result = blueprintToJsx(blueprint, plugins);

    expect(result).toEqual(
      <div>
        <h1>first child</h1>
        <h2>second child</h2>
      </div>
    );
  });
});
