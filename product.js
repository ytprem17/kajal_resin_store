const SHEET_URL =
"https://opensheet.elk.sh/1tbFMdZP6tbJO_MDttwQxSecii1DsvXr_a-DBRbvYQOo/Sheet1";

const params =
new URLSearchParams(window.location.search);

const productId =
params.get("id");

async function loadProduct() {

try {

const response =
await fetch(SHEET_URL);

const products =
await response.json();

const product =
products.find(
item => item.id === productId
);

if (!product) {

document.body.innerHTML = `
<div style="
text-align:center;
padding:60px;
font-family:Poppins;
">

<h1>Product Not Found</h1>

<p>
This product does not exist.
</p>

<a
href="index.html"
class="amazon-btn">

Back To Home

</a>

</div>
`;

return;

}

// =====================
// PRODUCT INFO
// =====================

document.getElementById(
"productTitle"
).textContent =
product.title;

document.getElementById(
"productPrice"
).textContent =
"₹" + product.price;

document.getElementById(
"productDescription"
).textContent =
product.description;

document.getElementById(
"buyButton"
).href =
product.affiliate_link;

document.getElementById(
"buyButton"
).textContent =
product.button_text ||
"Check Latest Price";

// =====================
// PRODUCT HIGHLIGHTS
// =====================

const highlightsList =
document.getElementById(
"productHighlights"
);

highlightsList.innerHTML = "";

if(product.highlights){

const highlights =
product.highlights.split(",");

highlights.forEach(item=>{

highlightsList.innerHTML += `
<li>✔ ${item.trim()}</li>
`;

});

}

// =====================
// IMAGE GALLERY
// =====================

const mainImage =
document.getElementById(
"mainImage"
);

const thumb1 =
document.getElementById(
"thumb1"
);

const thumb2 =
document.getElementById(
"thumb2"
);

const thumb3 =
document.getElementById(
"thumb3"
);

mainImage.src =
product.image;

thumb1.src =
product.image;

thumb2.src =
product.image2 || product.image;

thumb3.src =
product.image3 || product.image;

thumb1.onclick = () => {
mainImage.src =
thumb1.src;
};

thumb2.onclick = () => {
mainImage.src =
thumb2.src;
};

thumb3.onclick = () => {
mainImage.src =
thumb3.src;
};

// =====================
// WISHLIST
// =====================

const wishlistBtn =
document.getElementById(
"wishlistBtn"
);

wishlistBtn.onclick = () => {

const user =
localStorage.getItem(
"user"
);

if(!user){

const loginRequired =
confirm(
"Wishlist use karne ke liye Login karna hoga.\n\nLogin karna chahte hain?"
);

if(loginRequired){

window.location.href =
"login.html";

}

return;

}

let wishlist =
JSON.parse(
localStorage.getItem(
"wishlist"
)
) || [];

const exists =
wishlist.find(
item =>
item.id === product.id
);

if(!exists){

wishlist.push(product);

localStorage.setItem(
"wishlist",
JSON.stringify(
wishlist
)
);

alert(
"Added To Wishlist ❤️"
);

}else{

alert(
"Already In Wishlist ❤️"
);

}

};

// =====================
// SHARE PRODUCT
// =====================

const shareBtn =
document.getElementById(
"shareBtn"
);

shareBtn.onclick = async () => {

const url =
window.location.href;

if(navigator.share){

try{

await navigator.share({

title:
product.title,

text:
product.description,

url:url

});

}catch(err){

console.log(err);

}

}else{

navigator.clipboard.writeText(
url
);

alert(
"Product Link Copied ✅"
);

}

};

// =====================
// RELATED PRODUCTS
// =====================

loadRelatedProducts(
products,
product.category,
product.id
);

}

catch(error){

console.error(error);

document.body.innerHTML = `
<div style="
text-align:center;
padding:60px;
font-family:Poppins;
">

<h1>
Error Loading Product
</h1>

</div>
`;

}

}

// =====================
// RELATED PRODUCTS
// =====================

function loadRelatedProducts(
products,
category,
currentId
){

const relatedGrid =
document.getElementById(
"relatedGrid"
);

if(!relatedGrid)
return;

relatedGrid.innerHTML =
"";

const relatedProducts =
products.filter(product =>

product.category === category &&
product.id !== currentId

);

if(
relatedProducts.length === 0
){

relatedGrid.innerHTML =
`
<p style="text-align:center;">
No Related Products Found
</p>
`;

return;

}

relatedProducts.forEach(product=>{

relatedGrid.innerHTML += `

<div class="product-card">

<img
src="${product.image}"
alt="${product.title}">

<div class="product-content">

<h3>
${product.title}
</h3>

<div class="price">
₹${product.price}
</div>

<a
href="product.html?id=${product.id}"
class="amazon-btn">

View Product

</a>

</div>

</div>

`;

});

}

// =====================
// START
// =====================

loadProduct();