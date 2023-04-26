import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        font-size: 62.5%;
    }

    body {
        font-size: 1.6rem;
        font-family: "Roboto", sans-serif;
        color: ${({ theme }) => theme.COLORS.TEXT};
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_PRIMARY};
        width: 100%;
        height: 100dvh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
