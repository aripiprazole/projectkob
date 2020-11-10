import React from "react";

import dynamic from "next/dynamic";
import { AppProps } from "next/app";

import { RecoilRoot } from "recoil";

import { GlobalStyle } from "~/styles";

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />

      <GlobalStyle />
    </RecoilRoot>
  );
};

// disable ssr while isn't
export default dynamic(async () => App, {
  ssr: false,
});
