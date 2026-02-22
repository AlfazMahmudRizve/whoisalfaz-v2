const API_URL = 'https://v1.whoisalfaz.me/graphql';

async function testFetch() {
  const query = `
    query IntrospectRankMath {
      __type(name: "RankMathPostObjectSeo") {
        fields {
          name
          type {
            name
            fields {
              name
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    const openGraphField = json.data.__type.fields.find(f => f.name === 'openGraph');
    console.log(JSON.stringify(openGraphField, null, 2));
  } catch (err) {
    console.error('Fetch failed:', err);
  }
}

testFetch();
