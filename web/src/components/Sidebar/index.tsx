import React, { Suspense } from "react";

import { useRecoilValue } from "recoil";

import Link from "next/link";

import { MdDashboard, MdHome, MdApps } from "react-icons/md";

import { loggedUserState } from "~/store/auth";

import {
  Container,
  Item,
  Nav,
  Logo,
  ProfileImage,
  ProfileImageLoading,
} from "./styles";

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
              <Suspense fallback={<ProfileImageLoading />}>
                <ProfileImageItem />
              </Suspense>

              <span>Profile</span>
            </a>
          </Link>
        </Item>
      </Nav>
    </Container>
  );
};

const ProfileImageItem: React.VFC = () => {
  const loggedUser = useRecoilValue(loggedUserState);

  return <ProfileImage src={loggedUser.avatar} alt={loggedUser.username} />;
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
