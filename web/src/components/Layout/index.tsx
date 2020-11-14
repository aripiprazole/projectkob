import React, { Children, ReactElement } from "react";

import Sidebar from "../Sidebar";

import { Container, Content, Header, MainWrapper } from "./styles";

export type LayoutProps = {
  header?: ReactElement;
  selected?: "apps" | "profile" | "home";
};

const Layout: React.FC<LayoutProps> = ({ header, children, selected }) => {
  return (
    <Container>
      <Sidebar selected={selected} />

      <Content>
        {header && (
          <Header>
            <div className="content">{header}</div>
          </Header>
        )}

        <MainWrapper>{Children.only(children)}</MainWrapper>
      </Content>
    </Container>
  );
};

export default Layout;
