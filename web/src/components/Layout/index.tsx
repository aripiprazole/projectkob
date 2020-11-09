import React, { ReactElement } from "react";

import Sidebar from "../Sidebar";

import { Container, Content, Header } from "./styles";

export type LayoutProps = {
  header: ReactElement;
};

const Layout: React.FC<LayoutProps> = ({ header, children }) => {
  return (
    <Container>
      <Sidebar />

      <Content>
        <Header>{header}</Header>

        <main>{children}</main>
      </Content>
    </Container>
  );
};

export default Layout;
