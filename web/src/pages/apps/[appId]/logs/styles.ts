import styled from "styled-components";

export const Container = styled.main`
  background: #000;
  color: #fff;

  padding: 12px;

  height: 100%;

  @font-face {
    font-family: "JetBrains Mono";
    src: url("https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/webfonts/JetBrainsMono-Regular.eot")
        format("embedded-opentype"),
      url("https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/webfonts/JetBrainsMono-Regular.woff2")
        format("woff2"),
      url("https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/webfonts/JetBrainsMono-Regular.woff")
        format("woff"),
      url("https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-Regular.ttf")
        format("truetype");
    font-weight: normal;
    font-style: normal;
  }

  * {
    font-feature-settings: "liga" on, "calt" on;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-family: "JetBrains Mono", "Open Sans", monospace;
    font-size: 18px;
  }
`;
