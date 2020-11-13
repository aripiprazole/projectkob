import React from "react";

import Link from "next/link";

import { FiCode, FiHome, FiMenu, FiUser } from "react-icons/fi";

import { Container, Item, Items, Nav, Logo } from "./styles";

export type SidebarProps = {
  selected?: string;
};

const Sidebar: React.VFC<SidebarProps> = ({ selected }) => {
  return (
    <Container>
      <Logo>
        <FiCode color="#eee" size={32} />
      </Logo>

      <Nav>
        <SidebarItems selected={selected} />

        <Item selected={selected === "profile"}>
          <Link href="/profile">
            <a>
              <FiUser color="#eee" size={28} />

              <span>Profile</span>
            </a>
          </Link>
        </Item>
      </Nav>
    </Container>
  );
};

const SidebarItems: React.VFC<SidebarProps> = ({ selected }) => (
  <Items>
    <li>
      <Item selected={selected === "home"}>
        <Link href="/">
          <a>
            <FiHome color="#eee" size={28} />

            <span>Home</span>
          </a>
        </Link>
      </Item>
    </li>

    <li>
      <Item selected={selected === "apps"}>
        <Link href="/apps">
          <a>
            <FiMenu color="#eee" size={28} />

            <span>Apps</span>
          </a>
        </Link>
      </Item>
    </li>
  </Items>
);

export default Sidebar;
