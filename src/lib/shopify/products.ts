import { shopifyFetch, ShopifyConfigError, ShopifyHTTPError } from './client';
import * as queries from './queries';
import type { ShopifyProduct, ShopifyImage } from './types';
import type {
  GraphQLProductByHandleResponse,
  GraphQLProductsResponse,
  GraphQLProductNode,
  GraphQLImageNode,
  GraphQLVariantNode,
} from './graphql-types';

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  try {
    const data = await shopifyFetch<GraphQLProductByHandleResponse>(queries.PRODUCT_BY_HANDLE, { handle });
    const node = data.productByHandle;
    if (!node) return null;
    return normalizeProduct(node);
  } catch (error) {
    if (error instanceof ShopifyConfigError) {
      // Return null during build if Shopify is not configured
      return null;
    }
    if (error instanceof ShopifyHTTPError && error.status === 401) {
      // Return null during build if Shopify authentication fails
      console.warn(`Shopify authentication failed during build for product: ${handle}`);
      return null;
    }
    throw error;
  }
}

export async function getProducts(first = 50): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<GraphQLProductsResponse>(queries.PRODUCTS_FIRST, { first });
    const nodes = data.products?.nodes || [];
    return nodes.map(normalizeProduct);
  } catch (error) {
    if (error instanceof ShopifyConfigError) {
      // Return empty array during build if Shopify is not configured
      return [];
    }
    if (error instanceof ShopifyHTTPError && error.status === 401) {
      // Return empty array during build if Shopify authentication fails
      console.warn('Shopify authentication failed during build');
      return [];
    }
    throw error;
  }
}

export async function getProductsByHandles(handles: string[]): Promise<ShopifyProduct[]> {
  // Shopify nodes query expects global IDs; but our handles are handles — so query individually
  const results: ShopifyProduct[] = [];
  for (const handle of handles) {
    const p = await getProductByHandle(handle);
    if (p) results.push(p);
  }
  return results;
}

export function normalizeImage(node: GraphQLImageNode | null | undefined): ShopifyImage | null {
  if (!node) return null;
  return {
    url: node.url,
    altText: node.altText ?? null,
    width: node.width ?? null,
    height: node.height ?? null,
  };
}

export function normalizeProduct(node: GraphQLProductNode): ShopifyProduct {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description ?? null,
    descriptionHtml: node.descriptionHtml ?? null,
    vendor: node.vendor ?? null,
    productType: node.productType ?? null,
    availableForSale: !!node.availableForSale,
    featuredImage: normalizeImage(node.featuredImage) ?? null,
    images: (node.images?.nodes || []).map(normalizeImage).filter((img): img is ShopifyImage => img !== null),
    priceRange: node.priceRange ?? null,
    variants: (node.variants?.nodes || []).map((v: GraphQLVariantNode) => ({
      id: v.id,
      title: v.title,
      availableForSale: !!v.availableForSale,
      quantityAvailable: v.quantityAvailable ?? null,
      selectedOptions: v.selectedOptions ?? [],
      price: v.priceV2 ? { amount: v.priceV2.amount, currencyCode: v.priceV2.currencyCode } : null,
      compareAtPrice: v.compareAtPriceV2 ? { amount: v.compareAtPriceV2.amount, currencyCode: v.compareAtPriceV2.currencyCode } : null,
      image: normalizeImage(v.image) ?? null,
    })),
    collections: (node.collections?.nodes || []).map((c) => ({ id: c.id, handle: c.handle, title: c.title })),
    metafields: {
      description: node.descriptionField?.value ?? null,
      story_line: node.storyLine?.value ?? null,
      material: node.materialField?.value ?? null,
      dimensions: node.dimensionsField?.value ?? null,
      weight: node.weightField?.value ?? null,
      parts: node.partsField?.value ?? null,
      colour: node.colourField?.value ?? null,
    },
  };
}
