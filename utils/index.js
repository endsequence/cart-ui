import { gql } from "@apollo/client";

const addToCartMutation = gql`
  mutation Mutation($cart: CartInput) {
    addProductToCart(cart: $cart) {
      id
      customerId
      products {
        title
        sku
        variant
        thumbnail
        qty
      }
      active
      token
    }
  }
`;

const getProductQuery = gql`
  query FindAProduct($findAProductId: String) {
    findAProduct(id: $findAProductId) {
      id
      title
      description
      price
      brand
      thumbnail
      variants {
        id
        qty
        label
      }
    }
  }
`;

const getProductsQuery = gql`
  query GetProducts {
    getProducts {
      id
      title
      description
      price
      brand
      thumbnail
      variants {
        id
        qty
      }
    }
  }
`;

module.exports = {
  addToCartMutation,
  getProductQuery,
  getProductsQuery
};
