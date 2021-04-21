var username2;
var password;

function checkDetails() {
    username = document.getElementById("UsernameLogin").value;
    password = document.getElementById("passwordLogin").value;
    curr = Users.find(element => element.username === username);
    if (curr == undefined)
        alert("Wrong username or password");
    if (curr['password'] == $("#passwordLogin").val()){
        showDiv('settings');
        return true;
    }
    else {
        alert("Wrong username or password");
    }
}

