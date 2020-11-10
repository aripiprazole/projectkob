import React, { ReactElement } from "react";

import Sidebar from "../Sidebar";

import { Container, Content, Header } from "./styles";

export type LayoutProps = {
  header?: ReactElement;
  selected?: string;
};

const Layout: React.FC<LayoutProps> = ({ header, children, selected }) => {
  return (
    <Container>
      <Sidebar selected={selected} />

      <Content>
        {header && <Header>{header}</Header>}

        <main>{children}</main>
      </Content>
    </Container>
  );
};

export default Layout;
