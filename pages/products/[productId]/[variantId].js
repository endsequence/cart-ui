import { gql } from "@apollo/client";
import styles from "../../../styles/Home.module.css";
import client from "../../../apollo-client";
import Image from "next/image";
import Link from "next/link";
import { getProductQuery, addToCartMutation } from "../../../utils";
import HeaderLinks from "../../../components/HeaderLinks";
import { useRouter } from "next/router";

export default function Product({ product, variantId }) {
  const router = useRouter();
  const handleSubmit = async () => {
    const productId = product.id;
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

    const { data } = await client.mutate(mutateObject);
    if (data.addProductToCart) {
      localStorage.setItem("cart-token", data.addProductToCart.token);
      router.push("/cart");
    }
    console.log({ data });
  };

  return (
    <main className={styles.main}>
      <HeaderLinks />

      {/* <h1>{product.title}</h1> */}
      <div className={styles.grid} style={{ marginTop: "10px" }}>
        <div>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={400}
            height={400}
          />
          <p>Model - {product.title}</p>
          <p>Brand - {product.brand}</p>
          <p>{product.description}</p>
          <p>{product.price} $</p>
          <div className={styles.wrapper}>
            {(product.variants || []).map((variant) => (
              <Link
                key={variant.id}
                href={`/products/${encodeURIComponent(
                  product.id
                )}/${encodeURIComponent(variant.id)}`}
              >
                <div
                  className={styles.card}
                  style={{
                    borderColor: variantId == variant.id ? "#0070f3" : "gray",
                    borderWidth: variantId == variant.id ? "5px" : "1px",
                  }}
                >
                  Variant: {variant.label}
                  <br />
                  Stock: {variant.qty}
                  <br />
                </div>
              </Link>
            ))}
          </div>
          <button className={styles.box} type="submit" onClick={handleSubmit}>
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { productId, variantId } = context.params;
  const { data } = await client.query({
    query: getProductQuery,
    variables: { findAProductId: productId },
  });

  return {
    props: {
      product: data.findAProduct,
      variantId,
    },
  };
}
