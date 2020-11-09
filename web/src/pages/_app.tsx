import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import GlobalStyle from "~/styles/GlobalStyle";

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />

      <GlobalStyle />
    </RecoilRoot>
  );
};

export default App;
