//from w3schools
var AboutModel;
var span;

document.addEventListener('DOMContentLoaded', function (event){

    //get the div model
    AboutModel = document.getElementById('about');

    // Get the <span> element that closes the modal
    span = document.getElementsByClassName("closeSpan")[0];

    span.addEventListener("click", close_About);
    window.addEventListener("click", click_on_outter_window);
    addEventListener("keydown", click_escape);
});

// When the user clicks the button, open the modal
function openAbout(){
    AboutModel.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function close_About(){
    AboutModel.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
function click_on_outter_window(event){
    if(event.target == AboutModel){
        AboutModel.style.display = "none";
    }
}
// When the user clicks escape outside of the modal, close it
function click_escape(key){
    if(key.which == 27){
        AboutModel.style.display = "none";
    }
}