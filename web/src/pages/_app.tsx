import { AppProps } from "next/app";
import GlobalStyle from "~/styles/GlobalStyle";

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />

      <GlobalStyle />
    </>
  );
};

export default App;
