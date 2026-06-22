const userMenu =
document.getElementById("userMenu");

const loginLink =
document.getElementById("loginLink");

const user =
JSON.parse(
localStorage.getItem("user")
);

if(user){

// Login button hide
if(loginLink){
loginLink.style.display = "none";
}

userMenu.innerHTML = `

<div class="user-dropdown">

<button class="user-btn">

👤 ${user.name}

</button>

<div class="dropdown-content">

<a href="wishlist.html">

❤️ My Wishlist

</a>

<a href="#"
onclick="logoutUser()">

🚪 Logout

</a>

</div>

</div>

`;

}else{

// Login nahi hai
userMenu.innerHTML = "";

}

function logoutUser(){

localStorage.removeItem(
"user"
);

alert(
"Logged Out Successfully"
);

window.location.href =
"index.html";

}


const mobileAccount =
document.getElementById("mobileAccount");

const mobileAccountText =
document.getElementById("mobileAccountText");

if(user){

if(mobileAccount){
mobileAccount.href = "wishlist.html";
}

if(mobileAccountText){
mobileAccountText.textContent =
user.name;
}

}else{

if(mobileAccount){
mobileAccount.href = "login.html";
}

}
