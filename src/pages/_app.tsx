import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ChakraProvider } from "@chakra-ui/react";
import WithSubnavigation from "../components/Navbar";
import { RecoilRoot } from "recoil";

const colors = {
  brand: {
    100: "#f7fafc",
    // ...
    900: "#1a202c",
  },
};

const theme = {
  colors,
};

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <ClerkProvider {...pageProps}>
          <div className="min-h-screen overflow-x-hidden">
            <WithSubnavigation />
            <Component {...pageProps} />
          </div>
        </ClerkProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
};
export default api.withTRPC(MyApp);
