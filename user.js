const userMenu =
document.getElementById("userMenu");

const loginLink =
document.getElementById("loginLink");

const mobileAccount =
document.getElementById("mobileAccount");

const mobileAccountText =
document.getElementById("mobileAccountText");

const user =
JSON.parse(
localStorage.getItem("user")
);

// =====================
// USER LOGGED IN
// =====================

if(user){

// Hide Login Button

if(loginLink){
loginLink.style.display = "none";
}

// Desktop User Menu

if(userMenu){

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

}

// Mobile Bottom Navigation

if(mobileAccount){
mobileAccount.href =
"wishlist.html";
}

if(mobileAccountText){
mobileAccountText.textContent =
user.name;
}

}

// =====================
// USER NOT LOGGED IN
// =====================

else{

if(userMenu){
userMenu.innerHTML = "";
}

if(mobileAccount){
mobileAccount.href =
"login.html";
}

if(mobileAccountText){
mobileAccountText.textContent =
"Account";
}

}

// =====================
// LOGOUT
// =====================

function logoutUser(){

const confirmLogout =
confirm(
"Are you sure you want to logout?"
);

if(!confirmLogout){
return;
}

localStorage.removeItem(
"user"
);

alert(
"Logged Out Successfully"
);

window.location.href =
"index.html";

}
