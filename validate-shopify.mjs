// Shopify Integration Validation Script
// Standalone Node ES module - queries Shopify Storefront API directly using native fetch
// This script validates that the Shopify Storefront API is properly configured
// and returns the expected product and collection data.

// CANONICAL EXPECTED HANDLES - Application routes must match these
const EXPECTED_PRODUCT_HANDLES = [
  'light-in-stone',
  'the-subtractive-temple',
  'the-ghatika-yantra',
  'terrain-of-resistance',
  'ports-routes-power',
  'stone-river-and-empire', // CANONICAL - application uses this
  'the-chettinad-floor-archive',
  'the-four-faces-of-water',
  'the-floating-illusion',
];

const EXPECTED_COLLECTION_HANDLES = [
  'architectures-of-intelligence',
  'landscapes-of-power',
  'sovereign-systems',
  'measures-of-time-and-cosmos', // CANONICAL - application uses this
  'matter-and-making', // CANONICAL - application uses this
  'living-lineages',
];

// EXPECTED COLLECTION MEMBERSHIP
const EXPECTED_COLLECTION_PRODUCTS = {
  'architectures-of-intelligence': {
    count: 2,
    products: ['light-in-stone', 'the-floating-illusion']
  },
  'landscapes-of-power': {
    count: 3,
    products: ['terrain-of-resistance', 'ports-routes-power', 'stone-river-and-empire']
  },
  'sovereign-systems': {
    count: 0,
    products: []
  },
  'measures-of-time-and-cosmos': {
    count: 1,
    products: ['the-ghatika-yantra']
  },
  'matter-and-making': {
    count: 2,
    products: ['the-subtractive-temple', 'the-chettinad-floor-archive']
  },
  'living-lineages': {
    count: 1,
    products: ['the-four-faces-of-water']
  },
};

// KNOWN SHOPIFY ADMIN MISMATCHES (to be corrected manually)
const KNOWN_SHOPIFY_MISMATCHES = {
  products: {
    'stone-river-empire': 'stone-river-and-empire', // wrong -> correct
  },
  collections: {
    'measures-of-time-cosmos': 'measures-of-time-and-cosmos', // wrong -> correct
    'matter-making': 'matter-and-making', // wrong -> correct
  }
};

// GraphQL query to fetch products with metafields
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          availableForSale
          featuredImage {
            url
            altText
            width
            height
          }
          descriptionField: metafield(namespace: "custom", key: "description") {
            value
          }
          storyLine: metafield(namespace: "custom", key: "story_line") {
            value
          }
          materialField: metafield(namespace: "custom", key: "material") {
            value
          }
          dimensionsField: metafield(namespace: "custom", key: "dimensions") {
            value
          }
          weightField: metafield(namespace: "custom", key: "weight") {
            value
          }
          partsField: metafield(namespace: "custom", key: "parts") {
            value
          }
          colourField: metafield(namespace: "custom", key: "colour") {
            value
          }
        }
      }
    }
  }
`;

// GraphQL query to fetch collections with product counts
const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          products(first: 250) {
            edges {
              node {
                id
                handle
              }
            }
          }
        }
      }
    }
  }
`;

// Execute a Shopify Storefront API GraphQL query
async function shopifyFetch(query, variables) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION;
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;

  const endpoint = `https://${domain}/api/${version}/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Shopify-Storefront-Private-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`GraphQL Errors: ${JSON.stringify(json.errors, null, 2)}`);
  }

  return json.data;
}

async function validate() {
  console.log('='.repeat(60));
  console.log('SHOPIFY STOREFRONT API VALIDATION');
  console.log('='.repeat(60));
  console.log('');

  // Check environment variables
  console.log('1. CHECKING ENVIRONMENT VARIABLES...');
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION;
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;

  if (!domain) {
    console.error('❌ SHOPIFY_STORE_DOMAIN is not set');
    process.exit(1);
  }
  console.log(`✅ SHOPIFY_STORE_DOMAIN: ${domain}`);

  if (!version) {
    console.error('❌ SHOPIFY_STOREFRONT_API_VERSION is not set');
    process.exit(1);
  }
  console.log(`✅ SHOPIFY_STOREFRONT_API_VERSION: ${version}`);

  if (!token) {
    console.error('❌ SHOPIFY_STOREFRONT_PRIVATE_TOKEN is not set');
    process.exit(1);
  }
  console.log(`✅ SHOPIFY_STOREFRONT_PRIVATE_TOKEN: [REDACTED]`);
  console.log('');

  // Track validation issues
  let hasProductMismatch = false;
  let hasCollectionMismatch = false;

  // Fetch products
  console.log('2. FETCHING PRODUCTS FROM SHOPIFY...');
  let products = [];
  try {
    const data = await shopifyFetch(PRODUCTS_QUERY, { first: 250 });
    products = data.products.edges.map(edge => {
      const node = edge.node;
      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        description: node.description,
        productType: node.productType,
        availableForSale: node.availableForSale,
        featuredImage: node.featuredImage ? {
          url: node.featuredImage.url,
          altText: node.featuredImage.altText,
          width: node.featuredImage.width,
          height: node.featuredImage.height,
        } : null,
        metafields: {
          description: node.descriptionField?.value || null,
          story_line: node.storyLine?.value || null,
          material: node.materialField?.value || null,
          dimensions: node.dimensionsField?.value || null,
          weight: node.weightField?.value || null,
          parts: node.partsField?.value || null,
          colour: node.colourField?.value || null,
        },
      };
    });

    console.log(`✅ Retrieved ${products.length} products`);
    console.log('');

    // Print each product
    console.log('3. PRODUCT DETAILS:');
    console.log('-'.repeat(60));
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title}`);
      console.log(`   Handle: ${product.handle}`);
      console.log(`   Type: ${product.productType || 'N/A'}`);
      console.log(`   Available: ${product.availableForSale ? 'YES' : 'NO'}`);
      console.log(`   Featured Image: ${product.featuredImage ? 'YES' : 'NO'}`);
      console.log(`   description: ${product.metafields.description ? `"${product.metafields.description.substring(0, 50)}${product.metafields.description.length > 50 ? '...' : ''}"` : 'NO'}`);
      console.log(`   story_line: ${product.metafields.story_line ? `"${product.metafields.story_line}"` : 'NO'}`);
      console.log(`   material: ${product.metafields.material ? `"${product.metafields.material}"` : 'NO'}`);
      console.log(`   dimensions: ${product.metafields.dimensions ? `"${product.metafields.dimensions}"` : 'NO'}`);
      console.log(`   weight: ${product.metafields.weight ? `"${product.metafields.weight}"` : 'NO'}`);
      console.log(`   parts: ${product.metafields.parts ? `"${product.metafields.parts}"` : 'NO'}`);
      console.log(`   colour: ${product.metafields.colour ? `"${product.metafields.colour}"` : 'NO'}`);
      console.log('');
    });

    // Check expected product count
    console.log('4. VERIFYING PRODUCT COUNT...');
    if (products.length === 9) {
      console.log(`✅ Expected product count: 9 products`);
    } else {
      console.log(`⚠️  Warning: Expected 9 products, got ${products.length}`);
    }
    console.log('');

    // Check for expected product handles and detect mismatches
    console.log('5. VERIFYING PRODUCT HANDLES (CANONICAL)...');
    const foundHandles = products.map(p => p.handle);
    const missingHandles = EXPECTED_PRODUCT_HANDLES.filter(h => !foundHandles.includes(h));
    const extraHandles = foundHandles.filter(h => !EXPECTED_PRODUCT_HANDLES.includes(h));

    if (missingHandles.length === 0 && extraHandles.length === 0) {
      console.log(`✅ All 9 canonical product handles found`);
    } else {
      hasProductMismatch = true;

      if (missingHandles.length > 0) {
        console.log(`\n❌ MISSING CANONICAL PRODUCT HANDLES (${missingHandles.length}):`);
        missingHandles.forEach(h => {
          console.log(`   - ${h}`);
          // Check if there's a known mismatch
          const wrongHandle = Object.keys(KNOWN_SHOPIFY_MISMATCHES.products).find(
            wrong => KNOWN_SHOPIFY_MISMATCHES.products[wrong] === h
          );
          if (wrongHandle && foundHandles.includes(wrongHandle)) {
            console.log(`     ⚠️  HANDLE MISMATCH: Found '${wrongHandle}' in Shopify (incorrect)`);
          }
        });
      }

      if (extraHandles.length > 0) {
        console.log(`\n⚠️  UNEXPECTED SHOPIFY PRODUCT HANDLES (${extraHandles.length}):`);
        extraHandles.forEach(h => {
          console.log(`   - ${h}`);
          // Check if this is a known wrong handle
          if (KNOWN_SHOPIFY_MISMATCHES.products[h]) {
            console.log(`     ⚠️  Should be: '${KNOWN_SHOPIFY_MISMATCHES.products[h]}' (canonical)`);
          }
        });
      }
    }
    console.log('');

    // Check metafields
    console.log('6. METAFIELD SUMMARY...');
    let descriptionCount = 0;
    let storyLineCount = 0;
    let materialCount = 0;
    let dimensionsCount = 0;
    let weightCount = 0;
    let partsCount = 0;
    let colourCount = 0;

    products.forEach(p => {
      if (p.metafields.description) descriptionCount++;
      if (p.metafields.story_line) storyLineCount++;
      if (p.metafields.material) materialCount++;
      if (p.metafields.dimensions) dimensionsCount++;
      if (p.metafields.weight) weightCount++;
      if (p.metafields.parts) partsCount++;
      if (p.metafields.colour) colourCount++;
    });

    console.log(`   description readable: ${descriptionCount > 0 ? 'YES' : 'NO'} (${descriptionCount}/${products.length} products)`);
    console.log(`   story_line readable: ${storyLineCount > 0 ? 'YES' : 'NO'} (${storyLineCount}/${products.length} products)`);
    console.log(`   material readable: ${materialCount > 0 ? 'YES' : 'NO'} (${materialCount}/${products.length} products)`);
    console.log(`   dimensions readable: ${dimensionsCount > 0 ? 'YES' : 'NO'} (${dimensionsCount}/${products.length} products)`);
    console.log(`   weight readable: ${weightCount > 0 ? 'YES' : 'NO'} (${weightCount}/${products.length} products)`);
    console.log(`   parts readable: ${partsCount > 0 ? 'YES' : 'NO'} (${partsCount}/${products.length} products)`);
    console.log(`   colour readable: ${colourCount > 0 ? 'YES' : 'NO'} (${colourCount}/${products.length} products)`);

    if (descriptionCount > 0 || storyLineCount > 0 || materialCount > 0 || dimensionsCount > 0 || weightCount > 0 || partsCount > 0 || colourCount > 0) {
      console.log(`✅ Product metafields are retrievable`);
    } else {
      console.log(`⚠️  No product metafields found`);
    }
    console.log('');

    // Check images
    console.log('7. IMAGE SUMMARY...');
    const productsWithImages = products.filter(p => p.featuredImage);
    const productsWithoutImages = products.filter(p => !p.featuredImage);

    console.log(`   ${productsWithImages.length} products have featuredImage`);
    console.log(`   ${productsWithoutImages.length} products have NO featuredImage`);

    if (productsWithoutImages.length > 0) {
      console.log('   Products without images:');
      productsWithoutImages.forEach(p => {
        console.log(`     - ${p.handle}`);
      });
    }
    console.log('');

  } catch (error) {
    console.error('❌ Error fetching products:');
    console.error(error.message);
    process.exit(1);
  }

  // Fetch collections with product membership
  console.log('8. FETCHING COLLECTIONS FROM SHOPIFY...');
  let collections = [];
  try {
    const data = await shopifyFetch(COLLECTIONS_QUERY, { first: 50 });
    collections = data.collections.edges.map(edge => {
      const node = edge.node;
      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        description: node.description,
        productHandles: node.products.edges.map(e => e.node.handle),
        productCount: node.products.edges.length,
      };
    });

    console.log(`✅ Retrieved ${collections.length} collections`);
    console.log('');

    // Print each collection
    console.log('9. COLLECTION DETAILS:');
    console.log('-'.repeat(60));
    collections.forEach((collection, index) => {
      console.log(`${index + 1}. ${collection.title}`);
      console.log(`   Handle: ${collection.handle}`);
      console.log(`   Product count: ${collection.productCount}`);
      console.log('');
    });

    // Filter out Shopify default collections
    const masterCollections = collections.filter(c => c.handle !== 'frontpage');
    const expectedCount = EXPECTED_COLLECTION_HANDLES.length;

    // Check expected collection count
    console.log('10. VERIFYING COLLECTION COUNT...');
    if (masterCollections.length === expectedCount) {
      console.log(`✅ Expected collection count: ${expectedCount} Master Collections`);
    } else {
      console.log(`⚠️  Warning: Expected ${expectedCount} collections, got ${masterCollections.length}`);
    }
    console.log('');

    // Check for expected collection handles and detect mismatches
    console.log('11. VERIFYING COLLECTION HANDLES (CANONICAL)...');
    const foundCollectionHandles = masterCollections.map(c => c.handle);
    const missingCollectionHandles = EXPECTED_COLLECTION_HANDLES.filter(h => !foundCollectionHandles.includes(h));
    const extraCollectionHandles = foundCollectionHandles.filter(h => !EXPECTED_COLLECTION_HANDLES.includes(h));

    if (missingCollectionHandles.length === 0 && extraCollectionHandles.length === 0) {
      console.log(`✅ All ${expectedCount} canonical collection handles found`);
    } else {
      hasCollectionMismatch = true;

      if (missingCollectionHandles.length > 0) {
        console.log(`\n❌ MISSING CANONICAL COLLECTION HANDLES (${missingCollectionHandles.length}):`);
        missingCollectionHandles.forEach(h => {
          console.log(`   - ${h}`);
          // Check if there's a known mismatch
          const wrongHandle = Object.keys(KNOWN_SHOPIFY_MISMATCHES.collections).find(
            wrong => KNOWN_SHOPIFY_MISMATCHES.collections[wrong] === h
          );
          if (wrongHandle && foundCollectionHandles.includes(wrongHandle)) {
            console.log(`     ⚠️  HANDLE MISMATCH: Found '${wrongHandle}' in Shopify (incorrect)`);
          }
        });
      }

      if (extraCollectionHandles.length > 0) {
        console.log(`\n⚠️  UNEXPECTED SHOPIFY COLLECTION HANDLES (${extraCollectionHandles.length}):`);
        extraCollectionHandles.forEach(h => {
          console.log(`   - ${h}`);
          // Check if this is a known wrong handle
          if (KNOWN_SHOPIFY_MISMATCHES.collections[h]) {
            console.log(`     ⚠️  Should be: '${KNOWN_SHOPIFY_MISMATCHES.collections[h]}' (canonical)`);
          }
        });
      }
    }
    console.log('');

    // Check collection membership
    console.log('12. VERIFYING COLLECTION PRODUCT MEMBERSHIP...');
    let hasMembershipIssues = false;

    EXPECTED_COLLECTION_HANDLES.forEach(expectedHandle => {
      const expected = EXPECTED_COLLECTION_PRODUCTS[expectedHandle];
      const actual = masterCollections.find(c => c.handle === expectedHandle);

      if (!actual) {
        // Collection not found (handle mismatch)
        console.log(`\n❌ ${expectedHandle}:`);
        console.log(`   Expected: ${expected.count} product(s)`);
        console.log(`   Status: COLLECTION NOT FOUND (handle mismatch)`);
        hasMembershipIssues = true;
      } else if (actual.productCount !== expected.count) {
        // Count mismatch
        console.log(`\n⚠️  ${expectedHandle}:`);
        console.log(`   Expected: ${expected.count} product(s)`);
        console.log(`   Found: ${actual.productCount} product(s)`);
        console.log(`   Status: COUNT MISMATCH`);
        hasMembershipIssues = true;
      } else {
        console.log(`\n✅ ${expectedHandle}: ${expected.count} product(s) (correct)`);
      }
    });

    if (!hasMembershipIssues && !hasCollectionMismatch) {
      console.log('');
      console.log('✅ All collection memberships verified');
    }
    console.log('');

  } catch (error) {
    console.error('❌ Error fetching collections:');
    console.error(error.message);
    process.exit(1);
  }

  // Summary and required Shopify Admin actions
  console.log('='.repeat(60));
  if (hasProductMismatch || hasCollectionMismatch) {
    console.log('❌ VALIDATION FAILED - SHOPIFY ADMIN CORRECTIONS REQUIRED');
    console.log('='.repeat(60));
    console.log('');
    console.log('REQUIRED SHOPIFY ADMIN CHANGES:');
    console.log('');

    if (hasProductMismatch) {
      console.log('1. PRODUCT HANDLE CORRECTION:');
      console.log('   Product: Stone, River & Empire');
      console.log('   Current handle: stone-river-empire');
      console.log('   Change to: stone-river-and-empire');
      console.log('');
    }

    if (hasCollectionMismatch) {
      console.log('2. COLLECTION HANDLE CORRECTIONS:');
      console.log('');
      console.log('   Collection: Measures of Time & Cosmos');
      console.log('   Current handle: measures-of-time-cosmos');
      console.log('   Change to: measures-of-time-and-cosmos');
      console.log('');
      console.log('   Collection: Matter & Making');
      console.log('   Current handle: matter-making');
      console.log('   Change to: matter-and-making');
      console.log('');
    }

    console.log('3. COLLECTION MEMBERSHIP:');
    console.log('   Add "The Ghatika Yantra" to "Measures of Time & Cosmos"');
    console.log('');
    console.log('After making these changes in Shopify Admin, re-run:');
    console.log('  node --env-file=.env.local validate-shopify.mjs');
    console.log('');
    process.exit(1);
  } else {
    console.log('✅ VALIDATION COMPLETE - ALL CANONICAL HANDLES VERIFIED');
    console.log('='.repeat(60));
  }
}

validate().catch(error => {
  console.error('❌ Validation failed:');
  console.error(error);
  process.exit(1);
});
