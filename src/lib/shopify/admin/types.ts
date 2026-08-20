import "server-only";

export type AdminGraphQLResponse<TData> = {
  data?: TData;
  errors?: { message: string; locations?: unknown; path?: unknown }[];
};

export type MetaobjectCreateResult = {
  metaobject?: { id: string; handle?: string } | null;
  userErrors: { field?: string[] | null; message: string; code?: string | null }[];
};

export class AdminConfigMissingError extends Error {
  constructor(message?: string) {
    super(message || 'Shopify Admin configuration missing');
    this.name = 'AdminConfigMissingError';
  }
}

export class AdminRequestError extends Error {
  public status: number;
  public graphqlErrors?: unknown;
  constructor(message: string, status = 500, graphqlErrors?: unknown) {
    super(message);
    this.name = 'AdminRequestError';
    this.status = status;
    this.graphqlErrors = graphqlErrors;
  }
}

export type EnquiryPersistenceInput = {
  enquiryReference: string;
  customerGid: string;
  customerEmail: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  message: string;
  submittedAt: string; // ISO
  status: 'NEW' | string;
  productGid?: string;
  productHandle?: string;
  productTitle?: string;
  enquiryType?: string;
  sourcePath?: string;
};

export type EnquiryPersistenceResult = {
  ok: boolean;
  enquiryReference?: string;
  metaobjectId?: string;
  userErrors?: { field?: string[] | null; message: string; code?: string | null }[];
};
