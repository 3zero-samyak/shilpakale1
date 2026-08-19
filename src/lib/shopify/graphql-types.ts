// GraphQL response types for Shopify Storefront API
// These types represent the raw GraphQL response structure

export type GraphQLImageNode = {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type GraphQLMoneyV2 = {
  amount: string;
  currencyCode: string;
};

export type GraphQLSelectedOption = {
  name: string;
  value: string;
};

export type GraphQLVariantNode = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  selectedOptions?: GraphQLSelectedOption[];
  priceV2?: GraphQLMoneyV2 | null;
  compareAtPriceV2?: GraphQLMoneyV2 | null;
  image?: GraphQLImageNode | null;
};

export type GraphQLCollectionNode = {
  id: string;
  handle: string;
  title: string;
};

export type GraphQLMetafieldValue = {
  value: string;
};

export type GraphQLProductNode = {
  id: string;
  handle: string;
  title: string;
  description?: string | null;
  descriptionHtml?: string | null;
  vendor?: string | null;
  productType?: string | null;
  availableForSale: boolean;
  featuredImage?: GraphQLImageNode | null;
  images?: { nodes: GraphQLImageNode[] };
  tags?: string[];
  priceRange?: {
    minVariantPrice?: GraphQLMoneyV2 | null;
    maxVariantPrice?: GraphQLMoneyV2 | null;
  } | null;
  variants?: { nodes: GraphQLVariantNode[] };
  collections?: { nodes: GraphQLCollectionNode[] };
  descriptionField?: GraphQLMetafieldValue | null;
  storyLine?: GraphQLMetafieldValue | null;
  materialField?: GraphQLMetafieldValue | null;
  dimensionsField?: GraphQLMetafieldValue | null;
  weightField?: GraphQLMetafieldValue | null;
  partsField?: GraphQLMetafieldValue | null;
  colourField?: GraphQLMetafieldValue | null;
};

export type GraphQLCollectionWithProducts = {
  id: string;
  handle: string;
  title: string;
  description?: string | null;
  descriptionHtml?: string | null;
  image?: GraphQLImageNode | null;
  products?: { nodes: GraphQLProductNode[] };
};

export type GraphQLProductByHandleResponse = {
  productByHandle: GraphQLProductNode | null;
};

export type GraphQLProductsResponse = {
  products: {
    nodes: GraphQLProductNode[];
  };
};

export type GraphQLCollectionByHandleResponse = {
  collection: GraphQLCollectionWithProducts | null;
};

export type GraphQLCollectionsResponse = {
  collections: {
    nodes: GraphQLCollectionWithProducts[];
  };
};
