import Head from "next/head";
import styles from "../styles/Home.module.css";
import ClientOnly from "../components/ClientOnly";
import Products from "../components/Products";

export default function ClientSide() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Products List</h1>
        <ClientOnly>
          <Products />
        </ClientOnly>
      </main>

      <footer className={styles.footer}>Author: Umesh Mahato</footer>
    </div>
  );
}
