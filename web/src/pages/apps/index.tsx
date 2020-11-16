import React, { Suspense } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";

import { MdDns, MdAdd } from "react-icons/md";

import { useRecoilValue } from "recoil";

import { Alert, AlertTitle, Pagination, Skeleton } from "@material-ui/lab";

import { appListState } from "~/store/apps";

import { authorized } from "~/utils";

import { Layout } from "~/components";

import {
  Container,
  Items,
  ItemsWrapper,
  AppLink,
  CreateAppButton,
  CreateAppLink,
  ContentWrapper,
} from "./styles";

const Page: NextPage = () => {
  const { page = "1" } = useRouter().query;

  return (
    <Layout selected="apps" header={<h1>Apps</h1>}>
      <Container>
        <ContentWrapper>
          <Suspense fallback={<AppsLoading />}>
            <Content page={parseInt(page.toString())} />
          </Suspense>

          <Link href="/apps/new">
            <CreateAppButton>
              <MdAdd size={32} />
            </CreateAppButton>
          </Link>
        </ContentWrapper>
      </Container>
    </Layout>
  );
};

type Props = {
  page: number;
};

const Content: React.VFC<Props> = ({ page }) => {
  const apps = useRecoilValue(appListState(page));
  const router = useRouter();

  if (apps.items.length < 1) {
    return (
      <Alert severity="info">
        <AlertTitle>No apps found</AlertTitle>
        You can create a new app creating in the button in the bottom right
        corner or{" "}
        <strong>
          <Link href="/apps/new">
            <CreateAppLink>here</CreateAppLink>
          </Link>
        </strong>
      </Alert>
    );
  }

  return (
    <ItemsWrapper>
      <Items>
        {apps.items.map((app) => (
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

      {apps.totalPages > 1 && (
        <Pagination
          variant="text"
          color="primary"
          size="large"
          count={apps.totalPages}
          page={page}
          onChange={(_, page) => {
            router.push(`/apps?page=${page}`);
          }}
        />
      )}
    </ItemsWrapper>
  );
};

const AppsLoading: React.VFC = () => (
  <Items>
    {Array.from(new Array(5)).map((_, index) => (
      <li key={index}>
        <Skeleton variant="rect" width="100%" height={61} />
      </li>
    ))}
  </Items>
);

export default authorized(Page);
