import React, { Suspense } from "react";

import Link from "next/link";
import { NextPage } from "next";

import { FiServer } from "react-icons/fi";

import { useRecoilValue } from "recoil";

import { appListState } from "~/store/apps";

import { Layout } from "~/components";

import { Container, Header, AppList, AppListItem, AppItemLink } from "./styles";

const Apps: NextPage = () => {
  return (
    <Layout selected="apps">
      <Container>
        <Header>
          <h2>Apps</h2>
        </Header>

        <Suspense fallback="Loading...">
          <Content />
        </Suspense>
      </Container>
    </Layout>
  );
};

const Content: React.VFC = () => {
  const apps = useRecoilValue(appListState);

  return (
    <AppList>
      {apps.map((app) => (
        <AppListItem>
          <Link href="/apps/[appId]" as={`/apps/${app.id}`}>
            <AppItemLink>
              <FiServer size={24} />

              <div>
                <h3>{app.name}</h3>

                <span>{app.repo}</span>
              </div>
            </AppItemLink>
          </Link>
        </AppListItem>
      ))}
    </AppList>
  );
};

export default Apps;
