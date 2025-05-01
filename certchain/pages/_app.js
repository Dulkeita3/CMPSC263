import "@/styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider clientId="7b9d1c56d19924e1a2d9661bb6d3fce1" activeChain="sepolia" autoConnect>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
