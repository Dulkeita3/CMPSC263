import { Poppins } from "next/font/google";
import { createGlobalStyle, StyleSheetManager } from "styled-components";

const poppins = Poppins({
  weight: ["400", "700"], // Normal (400) & Bold (700)
  subsets: ["latin"], // Supports Latin characters
  variable: "--font-poppins", // CSS Variable
});

const GlobalStyle = createGlobalStyle`
  body {
    font-family: var(--font-poppins), sans-serif;
    margin: 0;
    padding: 0;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <StyleSheetManager><div>
    <GlobalStyle />
    <Component {...pageProps} />
  </div></StyleSheetManager>
  );
}

