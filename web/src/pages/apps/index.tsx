import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";
import { NextPage } from "next";

import { FiServer } from "react-icons/fi";

import { useRecoilValue } from "recoil";

import { Layout } from "~/components";

import { appListState } from "~/store/apps";

import { Container, Header, Apps, AppItem, AppLink } from "./styles";

const AppsPage: NextPage = () => {
  return (
    <Layout selected="apps">
      <Container>
        <Header>
          <h2>Apps</h2>
        </Header>

        <Suspense fallback="Loading...">
          <AppsContent />
        </Suspense>
      </Container>
    </Layout>
  );
};

const AppsContent: React.VFC = () => {
  const apps = useRecoilValue(appListState);

  return (
    <Apps>
      {apps.map((app) => (
        <AppItem>
          <Link href="/apps/[appId]" as={`/apps/${app.id}`}>
            <AppLink>
              <FiServer size={24} />

              <div>
                <h3>{app.name}</h3>

                <span>{app.repo}</span>
              </div>
            </AppLink>
          </Link>
        </AppItem>
      ))}
    </Apps>
  );
};

export default dynamic(async () => AppsPage, {
  ssr: false,
});
