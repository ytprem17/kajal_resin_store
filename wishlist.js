const wishlistGrid =
document.getElementById(
"wishlistGrid"
);

const wishlist =
JSON.parse(
localStorage.getItem(
"wishlist"
)
) || [];

if(
wishlist.length === 0
){

wishlistGrid.innerHTML = `
<h3 style="
text-align:center;
width:100%;
">

No Products In Wishlist ❤️

</h3>
`;

}

wishlist.forEach(product=>{

wishlistGrid.innerHTML += `

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

<button
onclick="removeWishlist('${product.id}')"
class="wishlist-btn">

Remove

</button>

</div>

</div>

`;

});

function removeWishlist(id){

let wishlist =
JSON.parse(
localStorage.getItem(
"wishlist"
)
) || [];

wishlist =
wishlist.filter(
item => item.id !== id
);

localStorage.setItem(
"wishlist",
JSON.stringify(
wishlist
)
);

location.reload();

}