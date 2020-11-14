import React, { Suspense } from "react";

import Link from "next/link";
import { NextPage } from "next";

import { MdDns } from "react-icons/md";

import { useRecoilValue } from "recoil";

import { appListState } from "~/store/apps";

import { Layout } from "~/components";

import { Container, Items, AppLink } from "./styles";

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
    <Items>
      {apps.map((app) => (
        <li key={app.id}>
          <Link href="/apps/[appId]" as={`/apps/${app.id}`}>
            <AppLink>
              <div className="icon">
                <MdDns size={18} />
              </div>

              <span className="name">{app.name}</span>
            </AppLink>
          </Link>
        </li>
      ))}
    </Items>
  );
};

export default Apps;
