import { gql } from "@apollo/client";
import styles from "../../styles/Home.module.css";
import client from "../../apollo-client";
import Image from "next/image";
import Link from "next/link";
import { getProductQuery, addToCartMutation } from "../../utils";

export default function Product({ product }) {
  const handleSubmit = async (productId, variantId) => {
    console.log("clicked", productId, variantId);

    const mutateObject = {
      mutation: addToCartMutation,
      variables: {
        cart: {
          sku: productId,
          variant: variantId,
          qty: 1,
        },
      },
    };

    if (localStorage.getItem("cart-token")) {
      const tokenValue = "Bearer " + localStorage.getItem("cart-token");
      mutateObject.context = {
        headers: {
          Authorization: tokenValue,
        },
      };
    }

    console.log({ mutateObject });

    const { data } = await client.mutate(mutateObject);
    if (data.addProductToCart) {
      localStorage.setItem("cart-token", data.addProductToCart.token);
    }
    console.log({ data });
  };

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div>
          <Link href={`/products`}>
            <button className={styles.box}>Go Back!</button>
          </Link>
        </div>
        <div>
          <button className={styles.box}>Go to Cart!</button>
        </div>
      </div>

      <h1>{product.title}</h1>
      <div className={styles.grid}>
        <div>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={400}
            height={400}
          />
          <p>Brand - {product.brand}</p>
          <p>{product.description}</p>
          <p>{product.price} $</p>
          {(product.variants || []).map((variant) => (
            <div key={variant.id} className={styles.card}>
              {variant.label}
              <br />
              Quantity available: {variant.qty}
              <br />
              <button
                className={styles.btn}
                type="submit"
                onClick={(e) => handleSubmit(product.id, variant.id)}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { productId } = context.params;
  const { data } = await client.query({
    query: getProductQuery,
    variables: { findAProductId: productId },
  });

  return {
    props: {
      product: data.findAProduct,
    },
  };
}
