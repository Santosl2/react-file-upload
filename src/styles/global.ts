import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        padding:0;
        margin: 0;
        outline:none;
        box-sizing:border-box;
    }

    body {
        font-family:Arial, Helvetica, sans-serif;
        font-size: 14px;
        background: linear-gradient(to top, #40916C, #52B788);
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    html, body, #root {
        height: 100%
    }
`;

export { GlobalStyle };
