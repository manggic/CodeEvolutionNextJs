import "/styles/globals.css";
import "/styles/layout.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ThemeProvider } from "styled-components";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import Head from "next/head";

const theme = {
  colors: {
    primary: "#355C7D",
  },
};

// function MyApp({ Component, pageProps }) {
//   return (
//     <ThemeProvider theme={theme}>
//       <Component {...pageProps} />
//     </ThemeProvider>
//   );
// }

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <div>
      <Head>
        <title>Code Evolution</title>
        <meta name="description" content="Awesome Youtube channel" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
