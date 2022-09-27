import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, SuccessContainer } from "../../styles/pages/success";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

const Success = ({ customerName, product }: SuccessProps) => {
  return (
    <>
      <Head>
        <title>Ignite shop | Compra realizada com sucesso</title>
      </Head>

      <SuccessContainer>
        <h1>Comprar efetuada</h1>

        <ImageContainer>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={120}
            height={110}
          />
        </ImageContainer>

        <p>
          Uhull <strong>{customerName}</strong>, sua{" "}
          <strong>{product.name}</strong> já está a caminho da sua casa
        </p>

        <Link href="/">Voltar ao catalogo</Link>
      </SuccessContainer>
    </>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id as string;

  if (!sessionId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        customerName,
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
