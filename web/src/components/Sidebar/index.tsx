import React from "react";

import Link from "next/link";

import { MdDashboard, MdHome, MdApps, MdPerson } from "react-icons/md";

import { Container, Item, Nav, Logo } from "./styles";

export type SidebarProps = {
  selected?: "apps" | "profile" | "home";
};

const Sidebar: React.VFC<SidebarProps> = ({ selected }) => {
  return (
    <Container>
      <Logo>
        <MdDashboard color="#eee" size={32} />
      </Logo>

      <Nav>
        <SidebarItems selected={selected} />

        <Item selected={selected === "profile"}>
          <Link href="/profile">
            <a>
              <MdPerson color="#eee" size={28} />

              <span>Profile</span>
            </a>
          </Link>
        </Item>
      </Nav>
    </Container>
  );
};

const SidebarItems: React.VFC<SidebarProps> = ({ selected }) => (
  <ul>
    <li>
      <Item selected={selected === "home"}>
        <Link href="/">
          <a>
            <MdHome color="#eee" size={28} />

            <span>Home</span>
          </a>
        </Link>
      </Item>
    </li>

    <li>
      <Item selected={selected === "apps"}>
        <Link href="/apps">
          <a>
            <MdApps color="#eee" size={28} />

            <span>Apps</span>
          </a>
        </Link>
      </Item>
    </li>
  </ul>
);

export default Sidebar;
