var game_canvas_ctx;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var ghostArr;

// $(document).ready(function() {
// 	context = canvas.getContext("2d");
// 	Start();
// });
var canvas_game = document.getElementById("game-canvas")
var game_canvas_ctx = canvas_game.getContext("2d");

var canves_info = document.getElementById("info-canvas")
var info_canvas_ctx= canves_info.getContext("2d");



// var life_pacman = document.getElementById("life_pacman");

//TODO TRANSPERSITY !!
function DrawLives() {
	var life_image = new Image();
	life_image.src = 'images/Pac-Man-Logo.jpg';
	for (var i=0; i<5; i++) {
		info_canvas_ctx.drawImage(life_image, 10 + i* 50, 50, 50, 50);
	}
}

function DrawGhosts() {
	var icons_radius = 15;
	var eye_radius = 2.5;
	for (var k=0; k<ghostArr.length; k++) {
		var center = new Object();
		center.x = ghostArr[k].j * 2* icons_radius + icons_radius;
		center.y = ghostArr[k].i* 2 * icons_radius + icons_radius;

		game_canvas_ctx.beginPath();
		var image = new Image();
		image.src = "images/ghosts" + (k+1).toString() + ".png";
		game_canvas_ctx.drawImage(image,center.x-icons_radius, center.y -icons_radius, 2* icons_radius ,2* icons_radius )
	}

}



function DrawBaseOfInfoCanvas() {
	canves_info.width = 600;
	canves_info.height = 120;
	canves_info.style.left = "700px";
	canves_info.style.top = "20px";
	canves_info.style.position = "absolute";


	info_canvas_ctx.fillStyle = "#E7DB50";
	info_canvas_ctx.lineWidth="5px";
	info_canvas_ctx.strokeStyle="#000000";
	info_canvas_ctx.rect(0,0,canves_info.width,canves_info.height);
	info_canvas_ctx.fill();
	info_canvas_ctx.stroke();

	 DrawLives();

	//username
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px Pacifico';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	if (typeof (username) !== "undefined")
		info_canvas_ctx.fillText(username,10,35);

	//lifes

	//Time
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px Pacifico';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("Time:",270,35);

	//clock
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px Pacifico';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText(time_elapsed,280,90);


	//Time
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px Pacifico';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("Score:",370,35);

	//clock
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px Pacifico';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText(score,380,90);

	DrawLives();

}

DrawBaseOfInfoCanvas();


function Start(){
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}


function GetKeyPressed() {
	if (keysDown[upKey]) {
		return 1;
	}
	if (keysDown[downKey]) {
		return 2;
	}
	if (keysDown[leftKey]) {
		return 3;
	}
	if (keysDown[rightKey]) {
		return 4;
	}
}

function Draw() {
	game_canvas_ctx.width = game_canvas_ctx.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				game_canvas_ctx.beginPath();
				game_canvas_ctx.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				game_canvas_ctx.lineTo(center.x, center.y);
				game_canvas_ctx.fillStyle = pac_color; //color
				game_canvas_ctx.fill();
				game_canvas_ctx.beginPath();
				game_canvas_ctx.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				game_canvas_ctx.fillStyle = "black"; //color
				game_canvas_ctx.fill();
			} else if (board[i][j] == 1) {
				game_canvas_ctx.beginPath();
				game_canvas_ctx.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				game_canvas_ctx.fillStyle = "white"; //color
				game_canvas_ctx.fill();
			} else if (board[i][j] == 4) {
				game_canvas_ctx.beginPath();
				game_canvas_ctx.rect(center.x - 30, center.y - 30, 60, 60);
				game_canvas_ctx.fillStyle = "grey"; //color
				game_canvas_ctx.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}


