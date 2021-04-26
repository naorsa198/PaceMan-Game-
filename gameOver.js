var game_over;
var play_again;

document.addEventListener('DOMContentLoaded', function (event) {
    // Get the modal
    game_over = document.getElementById('gameOver');

    // Get the <span> element that closes the modal
    play_again = document.getElementsByClassName("play_again")[0];

    play_again.addEventListener("click",Start);
});

function showGameOver() {
    game_over.style.display = "block";
    window.clearInterval(interval);
    // window.clearInterval(interval_ghosts);
    // window.clearInterval(interval_nikud_zaz);
    interval.clearInterval();
}

function GameOverMessage() {
    msg = "";
    if (lives == 0) {
        msg = "Loser!";
        // document.getElementById("msg1").style.display = "block";
        // document.getElementById("msg2").style.display = "none";
        // document.getElementById("msg3").style.display = "none";
    }
    else if(time_elapsed <= 0) {
        if (score < 100) {
            msg = "You are better than " + score + " points!";
            // document.getElementById("msg2").style.display = "block";
            // document.getElementById("msg2").innerHTML = msg;
            // document.getElementById("msg1").style.display = "none";
            // document.getElementById("msg3").style.display = "none";
        }
        else { //score > 100
            msg = "Winner!!!";
            // document.getElementById("msg3").style.display = "block";
            // document.getElementById("msg3").innerHTML = msg;
            // document.getElementById("msg2").style.display = "none";
            // document.getElementById("msg1").style.display = "none";
        }
    }
    else {
        msg = "Winner!!!";
        // document.getElementById("msg3").style.display = "block";
        // document.getElementById("msg3").innerHTML = msg;
        // document.getElementById("msg2").style.display = "none";
        // document.getElementById("msg1").style.display = "none";
    }
    document.getElementById("message").innerHTML = msg;
    showDiv("gameOver")

}
