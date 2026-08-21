import "server-only";
import { shopifyAdminGraphQL } from './client';
import type { MetaobjectCreateResult, EnquiryPersistenceInput, EnquiryPersistenceResult } from './types';

const CREATE_ENQUIRY_MUTATION = `
mutation CreateEnquiry($input: MetaobjectCreateInput!) {
  metaobjectCreate(input: $input) {
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

  const variables = { input: metaobject };

  const res = await shopifyAdminGraphQL(CREATE_ENQUIRY_MUTATION, variables);

  if (res.errors && res.errors.length) {
    return { ok: false, userErrors: res.errors.map(e => ({ message: e.message })) };
  }

  const result = (res.data as { metaobjectCreate?: MetaobjectCreateResult } | undefined)?.metaobjectCreate;
  if (!result || result.userErrors.length) {
    // Log Shopify userErrors safely: only code, field, message
    const errs = result?.userErrors ?? [];
    if (errs.length) {
      try {
        const safe = errs.map(u => ({
          code: u.code ?? null,
          field: Array.isArray(u.field) ? (u.field as string[]).join(',') : (u.field as string | null | undefined) ?? null,
          message: u.message ?? null,
        }));
        // Structured, safe diagnostic log
        console.error('[enquiry] metaobject userErrors', safe);
      } catch {
        console.error('[enquiry] metaobject userErrors: (failed to stringify userErrors)');
      }
    }

    return { ok: false, userErrors: result?.userErrors ?? [{ message: 'Unknown error' }] };
  }

  return { ok: true, enquiryReference: input.enquiryReference, metaobjectId: result.metaobject?.id ?? undefined };
}
