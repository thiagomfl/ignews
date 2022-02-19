import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next";

import { stripe } from "../services/stripe";
import { SubscribeButton } from "../components/SubscribeButton";

import styles from "../styles/home.module.scss";

type HomeProps = {
  product: {
    priceId: string;
    amount: number;
  };
};

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home - IGNews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image width="336" height="521" alt="Girl Coding" src="/images/avatar.svg" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1KKhy9LfLm7TkpL6JEYAyB1P");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
