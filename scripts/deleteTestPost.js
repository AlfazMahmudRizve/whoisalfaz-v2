const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function deleteTestPost() {
  const id = await client.fetch('*[_type == "post" && slug.current == "sanity-automated-publishing-test"][0]._id');
  if (id) {
    await client.delete(id);
    console.log('Deleted test post:', id);
  } else {
    console.log('Test post not found (already deleted).');
  }
}
deleteTestPost();
