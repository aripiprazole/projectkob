import React, { Suspense } from "react";

import Link from "next/link";
import { NextPage } from "next";

import { FiServer } from "react-icons/fi";

import { useRecoilValue } from "recoil";

import { appListState } from "~/store/apps";

import { Layout } from "~/components";

import { Container, AppList, AppListItem, AppItemLink } from "./styles";

const Apps: NextPage = () => {
  return (
    <Layout selected="apps" header={<h1>Apps</h1>}>
      <Container>
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
              <div className="icon">
                <FiServer size={24} />
              </div>

              <span className="name">{app.name}</span>
            </AppItemLink>
          </Link>
        </AppListItem>
      ))}
    </AppList>
  );
};

export default Apps;
