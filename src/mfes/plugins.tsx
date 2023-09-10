import { ReactNode } from "react";
import { styled } from "styled-components";
import { MicroFrontEnd } from "../infra/blueprint";

const headerPlugin: MicroFrontEnd = {
  name: "header",
  render: ({ children }: { children: ReactNode }) => {
    return <h1>{children}</h1>;
  },
};

const Layout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
`;

const layoutPlugin: MicroFrontEnd = {
  name: "layout",
  render: ({ children }: { children: ReactNode }) => {
    return <Layout>{children}</Layout>;
  },
};

const Container = styled.div`
  padding: 1em 2em;
`;

const containerPlugin: MicroFrontEnd = {
  name: "container",
  render: ({ children }: { children: ReactNode }) => {
    return <Container>{children}</Container>;
  },
};

export const builtinPlugins = [
  ["container", containerPlugin],
  ["header", headerPlugin],
  ["layout", layoutPlugin],
] as const;
