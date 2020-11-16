import React, { Suspense } from "react";

import { useRouter } from "next/router";
import { NextPage } from "next";

import { authorized } from "~/utils";

import { Layout } from "~/components";

import AppHeader, { AppHeaderLoading } from "~/components/AppHeader";
import AppDetails, { AppDetailsLoading } from "~/components/AppDetails";

const Page: NextPage = () => {
  const { appId = "" } = useRouter().query;

  return (
    <Layout
      header={
        <Suspense fallback={<AppHeaderLoading />}>
          <AppHeader appId={appId.toString()} />
        </Suspense>
      }
    >
      <Suspense fallback={<AppDetailsLoading />}>
        <AppDetails appId={appId.toString()} />
      </Suspense>
    </Layout>
  );
};

export default authorized(Page);
