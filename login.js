var username;
var password;

function checkDetails() {
    username = document.getElementById("UsernameLogin").value;
    password = document.getElementById("passwordLogin").value;

    curr = Users.find(element => element.username = username);
    if (curr == undefined)
        alert("Wrong username or password");
    else if (curr.password == password) {
        showDiv('settings');
    } else {
        alert("Wrong username or password");
    }
}

