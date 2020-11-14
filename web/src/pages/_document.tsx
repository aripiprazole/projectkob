import React, { Component } from "react";

import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

import { ServerStyleSheet } from "styled-components";

type Props = {
  stylesTag: Component;
};

class AppDocument extends Document<Props> {
  public static async getInitialProps({ renderPage }: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const props = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );

    return {
      stylesTag: sheet.getStyleElement(),
      ...props,
    };
  }

  public render() {
    return (
      <Html>
        <Head>
          {this.props.stylesTag}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
