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
    var flag = check1_new_key(new_key);
    if (leftKey == null || flag) {
        leftKey = new_key;
        flag = check2_new_key(new_key)
        if (flag){
            document.getElementById("leftKey").value=Buttons_Value(new_key);
        }
        document.getElementById("v_left").style.display = "block";
    }

}

function get_key_up(event) {
    var new_key = event.which || event.keyCode;
    var flag = check1_new_key(new_key);
    if (upKey == null || flag) {
        upKey = new_key;
        flag = check2_new_key(new_key)
        if (flag){
            document.getElementById("upKey").value=Buttons_Value(new_key);
        }
        document.getElementById("v_up").style.display = "block";
    }
}
function get_key_down(event) {
    var new_key = event.which || event.keyCode;
    var flag = check1_new_key(new_key);
    if (downKey == null || flag) {
        downKey = new_key;
        flag = check2_new_key(new_key)
        if (flag){
            document.getElementById("downKey").value=Buttons_Value(new_key);
        }
        document.getElementById("v_down").style.display = "block";
    }
}
function get_key_right(event) {
    var new_key = event.which || event.keyCode;
    var flag = check1_new_key(new_key);
    if (rightKey == null ||flag) {
        rightKey = new_key;
        flag = check2_new_key(new_key)
        if (flag) {
            document.getElementById("rightKey").value = Buttons_Value(new_key);
        }
        document.getElementById("v_right").style.display = "block";
    }
}
function check1_new_key(new_key){
    return (new_key !== 9 && new_key !== 20 && new_key !== 91 && new_key !== 27 && new_key !== 112 && new_key !== 113 && new_key !== 114 && new_key !== 115
        && new_key !== 116 && new_key !== 117 && new_key !== 118 && new_key !== 119 && new_key !== 120 && new_key !== 121 && new_key !== 122 && new_key !== 123 && new_key !== 124);

}

function check2_new_key(new_key){
    return new_key >= 37 && new_key <= 40;

}
function get_num_of_balls(){
    var balls_num = document.getElementById("num_of_balls").value;
    balls_num = parseInt(balls_num);
    if (balls_num >= 50 && balls_num <= 90)
        num_of_balls = balls_num;

    else if (isNaN(balls_num) || balls_num > 90 || balls_num < 50)
    alert("Number of balls should be between 50 and 90 !");

}

function get_num_of_ghosts(){
    var ghost_num = document.getElementById("num_of_ghost").value;

    if (parseInt(ghost_num) >= 1 && parseInt(ghost_num) <= 4) {
        ghosts_remain = ghost_num;
    }
    else if (parseInt(ghost_num) < 1) {
        alert("Set at least 1 ghosts_remain !");
    }

    else {
        alert("Set maximum 4 ghosts !");
    }
}
function get_time(){
    var game_time = document.getElementById("time").value;

    if (parseInt(game_time) >= 60)
        time = game_time;

    else
        alert("The time should be more between 60 !");
}

function set_random_values() {

    set_random_keys();
    set_random_num_of_balls();
    set_random_num_of_ghosts();
    set_random_colors();
    set_random_time();

}


function set_random_keys(){
    document.getElementById("leftKey").value = "Left Button"
    leftKey = 37;
    document.getElementById("upKey").value = "Up Button"
    upKey = 38;
    document.getElementById("rightKey").value = "Right Button"
    rightKey = 39;
    document.getElementById("downKey").value = "Down Button"
    downKey = 40;

    document.getElementById("v_left").style.display = "inherit";
    document.getElementById("v_up").style.display = "inherit";
    document.getElementById("v_down").style.display = "inherit";
    document.getElementById("v_right").style.display = "inherit";

}

function set_random_num_of_balls(){
    num_of_balls = Math.floor(Math.random() * (91 - 50 ) + 50);
    document.getElementById("num_of_balls").value = num_of_balls;
}

function set_random_num_of_ghosts(){
    ghosts_remain = Math.floor(Math.random() * 4) + 1;
    document.getElementById("num_of_ghost").value = ghosts_remain;
}

function set_random_colors(){
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    color_5_points = randomColor;
    document.getElementById("5points_color").value = color_5_points;

    randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    color_15_points = randomColor;
    document.getElementById("15points_color").value = color_15_points;

    randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    color_25_points = randomColor;
    document.getElementById("25points_color").value = color_25_points;
}

function set_random_time(){
    time = Math.floor(Math.random()*60000)+60;
    if (time < 60)
        time = time + 60;
    document.getElementById("time").value = time;
}

/***
 * sent the settings data to start func
 */
function get_values(){
    num_of_balls = parseInt(document.getElementById("num_of_balls").value);
    ghosts_remain =  document.getElementById("num_of_ghost").value;
    color_5_points = document.getElementById("5points_color").value;
    color_15_points = document.getElementById("15points_color").value;
    color_25_points = document.getElementById("25points_color").value;
    time = document.getElementById("time").value;



}
function start_play() {
    get_values();
    var balls_flag = (typeof (num_of_balls) != "undefined");
    var color_point_flag = (typeof (color_5_points) != "undefined" || typeof (color_15_points) != "undefined" || typeof (color_25_points) != "undefined");
    var ghost_flag = (typeof (ghosts_remain) != "undefined");
    var time_flag = (typeof (time) != "undefined");

    if (balls_flag && color_point_flag && ghost_flag && time_flag) {
        showDiv('game')
    }
}

