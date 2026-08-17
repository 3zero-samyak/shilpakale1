export const PRODUCT_CARD_FIELDS = `
  id
  handle
  title
  description
  descriptionHtml
  productType
  vendor
  availableForSale
  featuredImage { url altText width height }
  images(first: 10) { nodes { url altText width height } }
  priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
  variants(first: 10) {
    nodes {
      id
      title
      availableForSale
      selectedOptions { name value }
      quantityAvailable
      priceV2 { amount currencyCode }
      compareAtPriceV2 { amount currencyCode }
      image { url altText width height }
    }
  }
`;

export const PRODUCT_METAFIELDS = `
  descriptionField: metafield(namespace: "custom", key: "description") { value }
  storyLine: metafield(namespace: "custom", key: "story_line") { value }
  materialField: metafield(namespace: "custom", key: "material") { value }
  dimensionsField: metafield(namespace: "custom", key: "dimensions") { value }
  weightField: metafield(namespace: "custom", key: "weight") { value }
  partsField: metafield(namespace: "custom", key: "parts") { value }
  colourField: metafield(namespace: "custom", key: "colour") { value }
`;

export const PRODUCT_BY_HANDLE = `query productByHandle($handle: String!) { productByHandle(handle: $handle) { ${PRODUCT_CARD_FIELDS} ${PRODUCT_METAFIELDS} collections(first: 5) { nodes { id handle title } } } }`;

export const PRODUCTS_BY_HANDLES = `query productsByHandles($handles: [String!]!) { nodes(ids: $handles) { ... on Product { ${PRODUCT_CARD_FIELDS} ${PRODUCT_METAFIELDS} collections(first:5){ nodes { id handle title } } } } }`;

export const PRODUCTS_FIRST = `query productsFirst($first: Int!) { products(first: $first) { nodes { ${PRODUCT_CARD_FIELDS} ${PRODUCT_METAFIELDS} collections(first:5){ nodes { id handle title } } } } }`;

export const COLLECTION_BY_HANDLE = `query collectionByHandle($handle: String!) { collection(handle: $handle) { id handle title description descriptionHtml image { url altText width height } products(first: 250) { nodes { ${PRODUCT_CARD_FIELDS} ${PRODUCT_METAFIELDS} collections(first:5){ nodes { id handle title } } } } } }`;

export const COLLECTIONS_BY_HANDLES = `query collectionsByHandles($handles: [String!]!) { nodes(ids: $handles) { ... on Collection { id handle title description descriptionHtml image { url altText width height } } } }`;

export const ALL_COLLECTIONS = `query allCollections($first: Int!) { collections(first: $first) { nodes { id handle title description descriptionHtml image { url altText width height } } } }`;
