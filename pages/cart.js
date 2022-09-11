import Head from "next/head";
import styles from "../styles/Home.module.css";
import ClientOnly from "../components/ClientOnly";
import Cart from "../components/Cart";
import HeaderLinks from "../components/HeaderLinks";

export default function CartPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HeaderLinks />
        <h1>Cart Info</h1>
        <ClientOnly>
          <Cart />
        </ClientOnly>
      </main>
    </div>
  );
}
