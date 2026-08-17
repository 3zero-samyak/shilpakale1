import { shopifyFetch, ShopifyConfigError, ShopifyHTTPError } from './client';
import * as queries from './queries';
import type { ShopifyCollection } from './types';
import { normalizeProduct, normalizeImage } from './products';
import type {
  GraphQLCollectionByHandleResponse,
  GraphQLCollectionsResponse,
  GraphQLCollectionWithProducts,
} from './graphql-types';

export async function getCollectionByHandle(handle: string): Promise<ShopifyCollection | null> {
  try {
    const data = await shopifyFetch<GraphQLCollectionByHandleResponse>(queries.COLLECTION_BY_HANDLE, { handle });
    const node = data.collection;
    if (!node) return null;

    return {
      id: node.id,
      handle: node.handle,
      title: node.title,
      description: node.description ?? null,
      descriptionHtml: node.descriptionHtml ?? null,
      image: normalizeImage(node.image) ?? null,
      products: (node.products?.nodes || []).map((p) => normalizeProduct(p)),
    };
  } catch (error) {
    if (error instanceof ShopifyConfigError) {
      // Return null during build if Shopify is not configured
      return null;
    }
    if (error instanceof ShopifyHTTPError && error.status === 401) {
      // Return null during build if Shopify authentication fails
      console.warn(`Shopify authentication failed during build for collection: ${handle}`);
      return null;
    }
    throw error;
  }
}

export async function getCollections(first = 50): Promise<ShopifyCollection[]> {
  try {
    const data = await shopifyFetch<GraphQLCollectionsResponse>(queries.ALL_COLLECTIONS, { first });
    const nodes = data.collections?.nodes || [];
    return nodes.map((n: GraphQLCollectionWithProducts) => ({
      id: n.id,
      handle: n.handle,
      title: n.title,
      description: n.description ?? null,
      descriptionHtml: n.descriptionHtml ?? null,
      image: normalizeImage(n.image) ?? null,
      products: [],
    }));
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
