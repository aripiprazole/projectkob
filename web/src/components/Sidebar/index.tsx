import React from "react";

import Link from "next/link";

import { FiCode, FiHome, FiMenu, FiUser } from "react-icons/fi";

import { Container, Item, Items, Nav, Logo } from "./styles";

const Sidebar: React.VFC = () => {
  return (
    <Container>
      <Logo>
        <FiCode size={32} />
      </Logo>

      <Nav>
        <SidebarItems />

        <Item>
          <Link href="/profile">
            <a>
              <FiUser size={28} />

              <span>Profile</span>
            </a>
          </Link>
        </Item>
      </Nav>
    </Container>
  );
};

const SidebarItems: React.VFC = () => (
  <Items>
    <li>
      <Item selected>
        <Link href="/">
          <a>
            <FiHome size={28} />

            <span>Home</span>
          </a>
        </Link>
      </Item>
    </li>

    <li>
      <Item>
        <Link href="/apps">
          <a>
            <FiMenu size={28} />

            <span>Apps</span>
          </a>
        </Link>
      </Item>
    </li>
  </Items>
);

export default Sidebar;
