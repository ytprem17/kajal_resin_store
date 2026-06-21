function loginUser(){

const name =
document.getElementById("name").value.trim();

const email =
document.getElementById("email").value.trim();

if(!name || !email){

alert(
"Please fill all fields"
);

return;

}

localStorage.setItem(
"user",
JSON.stringify({
name,
email
})
);

alert(
"Login Successful ✅"
);

window.location.href =
"index.html";

}