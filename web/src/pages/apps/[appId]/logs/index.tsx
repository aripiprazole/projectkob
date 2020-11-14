import React, { Suspense } from "react";

import { useRouter } from "next/router";
import { NextPage } from "next";

import { useRecoilValue } from "recoil";

import AnsiUp from "ansi_up";

import { Loading } from "~/components";

import { appLogsState } from "~/store/apps";

import { Container } from "./styles";

const Page: NextPage = () => {
  const { appId = "" } = useRouter().query;

  return (
    <Suspense fallback={<Loading />}>
      <Content appId={appId.toString()} />
    </Suspense>
  );
};

type Props = {
  appId: string;
};

const RESET_COLOR = "\u001b[37m";

const ansiUp = new AnsiUp();

const Content: React.VFC<Props> = ({ appId }) => {
  const logs = useRecoilValue(appLogsState(appId));

  return (
    <Container>
      {logs.map((log) => (
        <div
          dangerouslySetInnerHTML={{
            __html: ansiUp.ansi_to_html(log + RESET_COLOR),
          }}
        />
      ))}
    </Container>
  );
};

export default Page;
