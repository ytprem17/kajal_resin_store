const SHEET_URL =
"https://opensheet.elk.sh/1tbFMdZP6tbJO_MDttwQxSecii1DsvXr_a-DBRbvYQOo/Sheet1";

let products = [];

const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const resultsGrid = document.getElementById("searchResults");

async function loadProducts() {

  try {

    const response = await fetch(SHEET_URL);

    products = await response.json();

    showProducts(products);

  } catch (error) {

    console.error(error);

  }

}

function showProducts(data) {

  resultsGrid.innerHTML = "";

  if (data.length === 0) {

    resultsGrid.innerHTML =
      "<h2>No products found</h2>";

    return;

  }

  data.forEach(product => {

    resultsGrid.innerHTML += `

    <div class="product-card">

      <img src="${product.image}" alt="${product.title}">

      <div class="product-content">

        <h3>${product.title}</h3>

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

searchInput.addEventListener("input", () => {

  const value =
  searchInput.value.toLowerCase();

  const filtered =
  products.filter(product =>
    product.title
    .toLowerCase()
    .includes(value)
  );

  suggestions.innerHTML = "";

  filtered.slice(0,5).forEach(product => {

    suggestions.innerHTML += `

      <div
      class="suggestion-item"
      onclick="window.location.href='product.html?id=${product.id}'">

      ${product.title}

      </div>

    `;

  });

  showProducts(filtered);

});

loadProducts();