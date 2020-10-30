import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  body, html, #root {
    background: #f9f9f9;
    height: 100%;
    min-width: 400px;
  }

  a {
    color: inherit;
  }
`;

export default GlobalStyle;
