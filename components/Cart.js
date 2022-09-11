import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { getCartQuery } from "../utils";

export default function Products() {
  const { data, loading, error } = useQuery(getCartQuery);

  useEffect(() => {
    if (data?.findCart) localStorage.setItem("cart-token", data.findCart?.token);
  }, [data]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const cartItems = data.findCart?.products || [];

//   console.log({ cartItems: data.findCart?.products });

  return (
    <>
      <div className={styles.grid} style={{ marginTop: "10px" }}>
        <div className={styles.cartwrapper}>
          {(cartItems || []).map((item) => (
            <div
              key={`${item.sku}-${item.variant}`}
              className={styles.cartitem}
              style={{ borderWidth: "5px" }}
            >
              <div className={styles.cartimage}>
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={100}
                  height={100}
                />
              </div>
              Title: {item.title}
              <br />
              Variant: {item.variant}
              <br />
              Qty: {item.qty}
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
