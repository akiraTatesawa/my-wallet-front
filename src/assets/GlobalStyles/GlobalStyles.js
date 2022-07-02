import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    *:focus {
        outline: 2px solid #fbd3fc;
    }

    button:hover {
        cursor: pointer;
    }

    body {
        line-height: 1;
        background-color: #8C11BE;
    }

    blockquote, q {
        quotes: none;
    }

    #root {
        width: 100%;
        height: 100vh;
    }

    a {
        text-decoration: none;
    }
`;

export default GlobalStyle;
