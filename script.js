// =========================
// KAJAL RESIN STORE
// FINAL SCRIPT.JS
// =========================

const SHEET_URL =
"https://opensheet.elk.sh/1tbFMdZP6tbJO_MDttwQxSecii1DsvXr_a-DBRbvYQOo/Sheet1";

let products = [];

const grid = document.getElementById("productGrid");

// =========================
// LOAD PRODUCTS
// =========================

async function loadProducts() {

  try {

    const response = await fetch(SHEET_URL);

    products = await response.json();

    showProducts(products);

  } catch (error) {

    console.error("Error Loading Products:", error);

    if (grid) {

      grid.innerHTML = `
        <h2 style="text-align:center;padding:40px;">
          Failed To Load Products
        </h2>
      `;

    }

  }

}

// =========================
// SHOW PRODUCTS
// =========================

function showProducts(data) {

  if (!grid) return;

  grid.innerHTML = "";

  if (data.length === 0) {

    grid.innerHTML = `
      <h2 style="text-align:center;padding:40px;">
        No Products Found
      </h2>
    `;

    return;

  }

  data.forEach(product => {

    grid.innerHTML += `

    <div class="product-card">

      <img
        src="${product.image}"
        alt="${product.title}"
      >

      <div class="product-content">

        <div class="discount">
          20% OFF
        </div>

        <h3>
          ${product.title}
        </h3>

        <div class="rating">
          ★★★★★
        </div>

        <div class="price">
          ₹${product.price}
        </div>

        <a
          href="product.html?id=${product.id}"
          class="buy-btn">

          View Details

        </a>

      </div>

    </div>

    `;

  });

}

// =========================
// CATEGORY FILTER
// =========================

function filterProducts(category) {

  if (category === "All") {

    showProducts(products);

    return;

  }

  const filteredProducts =
  products.filter(product =>
    product.category === category
  );

  showProducts(filteredProducts);

}

// =========================
// SEARCH
// =========================

const searchInput =
document.getElementById("searchInput");

if (searchInput) {

  searchInput.addEventListener("keyup", e => {

    const value =
    e.target.value.toLowerCase();

    const filteredProducts =
    products.filter(product =>

      product.title
      .toLowerCase()
      .includes(value)

    );

    showProducts(filteredProducts);

  });

}

// =========================
// MOBILE MENU
// =========================

function toggleMenu() {

  const navMenu =
  document.getElementById("navMenu");

  if (navMenu) {

    navMenu.classList.toggle("active");

  }

}

// =========================
// LOAD ON PAGE START
// =========================

loadProducts();