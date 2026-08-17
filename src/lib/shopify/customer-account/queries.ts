export const CUSTOMER_QUERY = `
query customerProfile {
  customer {
    id
    firstName
    lastName
    displayName
    emailAddress {
      emailAddress
    }
  }
}
`;

export const ORDERS_QUERY = `
query customerOrders($first: Int) {
  customer {
    orders(first: $first) {
      nodes {
        id
        name
        processedAt
        totalPrice {
          amount
          currencyCode
        }
      }
    }
  }
}
`;
