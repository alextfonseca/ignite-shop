import Image from "next/future/image";
import { globalStyles } from "../../styles/global";
import "../../styles/index.ts";
import { Container, Header } from "../../styles/pages/app";

globalStyles();

import Logo from "../assets/logo.svg";

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Header>
        <Image src={Logo} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
