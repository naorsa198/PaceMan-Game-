var upKey;
var downKey;
var leftKey;
var rightKey;

var num_of_balls;


var color_5_points;
var color_15_points;
var color_25_points;

var time;

var ghosts_remain;

function Buttons_Value(code) {
    switch (code) {
        case 37:
            s = "Left Button";
            break;
        case 38:
            s = "Up Button";
            break;
        case 39:
            s = "Right Button";
            break;
        case 40:
            s = "Down Button";
            break;
    }
    return s;
}

function get_key_left(event) {
    var new_key = event.which || event.keyCode;
    // var flag = check1_new_key(new_key);
    if (leftKey === null || (new_key !== 9 && new_key !== 20 && new_key !== 91 && new_key !== 27 && new_key !== 112 && new_key !== 113 && new_key !== 114 && new_key !== 115
        && new_key !== 116 && new_key !== 117 && new_key !== 118 && new_key !== 119 && new_key !== 120 && new_key !== 121 && new_key !== 122 && new_key !== 123 && new_key !== 124)) {
        leftKey = new_key;
        if (new_key >= 37 && new_key <= 40){
            document.getElementById("leftKey").value=Buttons_Value(new_key);
        }
        document.getElementById("v_left").style.display = "block";
    }

}

function get_key_up(event) {
    var new_key = event.which || event.keyCode;
    // var flag = check1_new_key(new_key);
    if (upKey === null || (new_key !== 9 && new_key !== 20 && new_key !== 91 && new_key !== 27 && new_key !== 112 && new_key !== 113 && new_key !== 114 && new_key !== 115
        && new_key !== 116 && new_key !== 117 && new_key !== 118 && new_key !== 119 && new_key !== 120 && new_key !== 121 && new_key !== 122 && new_key !== 123 && new_key !== 124)) {
        upKey = new_key;
        if (new_key >= 37 && new_key <= 40){
            document.getElementById("upKey").value=Buttons_Value(new_key);
        }
        document.getElementById("v_up").style.display = "block";
    }
}
function get_key_down(event) {
    var new_key = event.which || event.keyCode;
    // var flag = check1_new_key(new_key);
    if (downKey === null || (new_key !== 9 && new_key !== 20 && new_key !== 91 && new_key !== 27 && new_key !== 112 && new_key !== 113 && new_key !== 114 && new_key !== 115
        && new_key !== 116 && new_key !== 117 && new_key !== 118 && new_key !== 119 && new_key !== 120 && new_key !== 121 && new_key !== 122 && new_key !== 123 && new_key !== 124)) {
        downKey = new_key;
        if (new_key >= 37 && new_key <= 40){
            document.getElementById("downKey").value=Buttons_Value(new_key);
        }
        document.getElementById("v_down").style.display = "block";
    }
}
function get_key_right(event) {
    var new_key = event.which || event.keyCode;
    // var flag = check1_new_key(new_key);
    if (rightKey === null || (new_key !== 9 && new_key !== 20 && new_key !== 91 && new_key !== 27 && new_key !== 112 && new_key !== 113 && new_key !== 114 && new_key !== 115
        && new_key !== 116 && new_key !== 117 && new_key !== 118 && new_key !== 119 && new_key !== 120 && new_key !== 121 && new_key !== 122 && new_key !== 123 && new_key !== 124)) {
        rightKey = new_key;
        if (new_key >= 37 && new_key <= 40) {
            document.getElementById("rightKey").value = Buttons_Value(new_key);
        }
        document.getElementById("v_right").style.display = "block";
    }
}
// function check1_new_key(new_key){
//     return new_key !== 9 && new_key !== 20 && new_key !== 91 && new_key !== 27 && new_key !== 112 && new_key !== 113 && new_key !== 114 && new_key !== 115
//         && new_key !== 116 && new_key !== 117 && new_key !== 118 && new_key !== 119 && new_key !== 120 && new_key !== 121 && new_key !== 122 && new_key !== 123 && new_key !== 124;
//
// }

// function check2_new_key(new_key){
//     return new_key >= 37 && new_key <= 40;
//
// }

    function send_num_of_balls() {
        var balls_num = document.getElementById("num_of_balls").value;
        balls_num = parseInt(balls_num);

        if (balls_num >= 50 && balls_num <= 90)
            num_of_balls = balls_num;

        if (isNaN(balls_num) || balls_num > 90 || balls_num < 50) {
            alert("Number of balls should be between 50 and 90 !");
            return false;
        }

        return true;

    }

    function set_colors() {
        color_5_points = document.getElementById("5points").value;
        color_15_points = document.getElementById("15points").value;
        color_25_points = document.getElementById("25points").value;

        return true;
    }

    function update_time() {
        var game_time = document.getElementById("time").value;

        if (parseInt(game_time) >= 60) {
            time = game_time;
            return true;
        } else {
            alert("The time should be more between 60 !")
            return false;
        }
    }

    function update_ghost() {
        var ghost_num = document.getElementById("ghost").value;

        if (parseInt(ghost_num) >= 1 && parseInt(ghost_num) <= 4) {
            ghosts_remain = ghost_num;
            return true;
        } else if (parseInt(ghost_num) < 1) {
            alert("Set at least 1 ghosts_remain !");
            return false;
        } else {
            alert("Set maximum 4 ghosts !");
            return false;
        }

    }

    function put_random_values() {
        document.getElementById("leftKey").value = "Left Button"
        leftKey = 37;
        document.getElementById("upKey").value = "Up Button"
        upKey = 38;
        document.getElementById("rightKey").value = "Right Button"
        rightKey = 39;
        document.getElementById("downKey").value = "Down Button"
        downKey = 40;

        document.getElementById("v_left").style.display = "block";
        document.getElementById("v_up").style.display = "block";
        document.getElementById("v_down").style.display = "block";
        document.getElementById("v_right").style.display = "block";

        num_of_balls = Math.floor(Math.random() * (90 - 50 + 1) + 50);
        document.getElementById("num_of_balls").value = num_of_balls;
        color_5_points = get_random_color();
        document.getElementById("5points").value = color_5_points;
        color_15_points = get_random_color();
        document.getElementById("15points").value = color_15_points;
        color_25_points = get_random_color();
        document.getElementById("25points").value = color_25_points;
        time = Math.floor(Math.random() * 240);
        if (time < 60)
            time = time + 60;
        document.getElementById("time").value = time;
        ghosts_remain = Math.floor(Math.random() * 3) + 1;
        document.getElementById("ghost").value = ghosts_remain;
    }

    function get_random_color() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function submit_it() {
        var bBalls = send_num_of_balls();
        var bColor = set_colors();
        var bGhost = update_ghost();
        var bTime = update_time();

        if (bBalls && bColor && bGhost && bTime) {
            // todo: send data to game
            showDiv('game')
            // Start(leftKey,upKey,downKey,rightKey,num_of_balls,points5color,color_15_points,color_25_points,time,ghosts_remain);
        }
    }


