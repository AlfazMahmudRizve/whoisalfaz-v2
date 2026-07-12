const token = "apik_0sXQgGrNfjFAT_C5662849_C_5c4052af1ea78e66923fcc60bac25af83a4e3a865c77c0f7fdc9062d6a2dbc";
const companyId = "biz_AVepjMJgIkU6rk";

async function test() {
  try {
    const productRes = await fetch(`https://api.whop.com/api/v1/products?company_id=${companyId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: "Test Product Delete Me",
        company_id: companyId
      })
    });
    const productData = await productRes.json();
    console.log("Product Response status:", productRes.status);
    console.log("Product Response data:", JSON.stringify(productData, null, 2));

    if (productData.id) {
      const planRes = await fetch(`https://api.whop.com/api/v1/plans?company_id=${companyId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: productData.id,
          title: "Test Plan Name",
          plan_type: "one_time",
          initial_price: 49,
          currency: "usd"
        })
      });
      const planData = await planRes.json();
      console.log("Plan Response status:", planRes.status);
      console.log("Plan Response data:", JSON.stringify(planData, null, 2));
    }
  } catch (error) {
    console.error("Error during API request:", error);
  }
}

test();
