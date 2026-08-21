import "server-only";
import { shopifyAdminGraphQL } from './client';
import type { MetaobjectCreateResult, EnquiryPersistenceInput, EnquiryPersistenceResult } from './types';

const CREATE_ENQUIRY_MUTATION = `
mutation CreateEnquiry($metaobject: MetaobjectCreateInput!) {
  metaobjectCreate(metaobject: $metaobject) {
    metaobject { id handle }
    userErrors { field message code }
  }
}
`;

export async function createEnquiryMetaobject(input: EnquiryPersistenceInput): Promise<EnquiryPersistenceResult> {
  // Build metaobject fields array
  const fields: { key: string; value: string }[] = [];
  fields.push({ key: 'enquiry_reference', value: input.enquiryReference });
  fields.push({ key: 'customer', value: input.customerGid });
  fields.push({ key: 'customer_email', value: input.customerEmail });
  fields.push({ key: 'first_name', value: input.firstName });
  fields.push({ key: 'last_name', value: input.lastName });
  fields.push({ key: 'mobile_number', value: input.mobileNumber });
  fields.push({ key: 'message', value: input.message });
  fields.push({ key: 'submitted_at', value: input.submittedAt });
  fields.push({ key: 'status', value: input.status });

  if (input.productGid) fields.push({ key: 'product', value: input.productGid });
  if (input.productHandle) fields.push({ key: 'product_handle', value: input.productHandle });
  if (input.productTitle) fields.push({ key: 'product_title', value: input.productTitle });
  if (input.enquiryType) fields.push({ key: 'enquiry_type', value: input.enquiryType });
  if (input.sourcePath) fields.push({ key: 'source_path', value: input.sourcePath });

  const metaobject = { type: 'shilpakale_enquiry', fields };

  const variables = { metaobject };

  const res = await shopifyAdminGraphQL(CREATE_ENQUIRY_MUTATION, variables);

  if (res.errors && res.errors.length) {
    return { ok: false, userErrors: res.errors.map(e => ({ message: e.message })) };
  }

  const result = (res.data as { metaobjectCreate?: MetaobjectCreateResult } | undefined)?.metaobjectCreate;
  if (!result || result.userErrors.length) {
    // Minimal operational logging only: indicate presence of userErrors without details
    const errs = result?.userErrors ?? [];
    if (errs.length) {
      console.error('[enquiry] metaobjectCreate returned userErrors', { count: errs.length });
    } else {
      console.error('[enquiry] metaobjectCreate failed: unknown error');
    }

    return { ok: false, userErrors: result?.userErrors ?? [{ message: 'Unknown error' }] };
  }

  return { ok: true, enquiryReference: input.enquiryReference, metaobjectId: result.metaobject?.id ?? undefined };
}
