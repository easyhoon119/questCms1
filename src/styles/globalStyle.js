import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing : border-box;
    }

    body {
        background-color : lightgray;
        font-size : 1rem;
    }
`;

export default GlobalStyle;
