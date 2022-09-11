import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function HeaderLinks() {
  return (
    <div className={styles.wrapper}>
      <div>
        <Link href={`/products`}>
          <button className={styles.box}>Products List!</button>
        </Link>
      </div>
      <div />
      <div />
      <div>
        <Link href={`/cart`}>
          <button className={styles.box} style={{ float: "right" }}>
            Go to Cart!
          </button>
        </Link>
      </div>
    </div>
  );
}
