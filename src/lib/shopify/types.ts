export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  selectedOptions?: { name: string; value: string }[];
  price?: ShopifyMoney | null;
  compareAtPrice?: ShopifyMoney | null;
  image?: ShopifyImage | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string | null;
  descriptionHtml: string | null;
  vendor?: string | null;
  productType?: string | null;
  availableForSale: boolean;
  featuredImage?: ShopifyImage | null;
  images: ShopifyImage[];
  priceRange?: { minVariantPrice?: ShopifyMoney | null; maxVariantPrice?: ShopifyMoney | null } | null;
  variants: ShopifyVariant[];
  collections: { id: string; handle: string; title: string }[];
  metafields: {
    description?: string | null;
    story_line?: string | null;
    material?: string | null;
    dimensions?: string | null;
    weight?: string | null;
    parts?: string | null;
    colour?: string | null;
  };
};

export type ShopifyCollection = {
  id: string;
  handle: string;
  title: string;
  description?: string | null;
  descriptionHtml?: string | null;
  image?: ShopifyImage | null;
  products: ShopifyProduct[];
};
