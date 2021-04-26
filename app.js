var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var ghostArr= new Array();
var lives_flag;
var lifes=5;
var food_counter;
var ghost_berfor_game;

var canvas_game = document.getElementById("game-canvas")
var game_canvas_ctx = canvas_game.getContext("2d");

var canves_info = document.getElementById("info-canvas")
var info_canvas_ctx= canves_info.getContext("2d");

var points25, points15, points10;
var points_board=[21,22,23];

var interval;
var ghost_interval;

var rows=10;
var cols=10;

var pressed;
// var life_pacman = document.getElementById("life_pacman");

function DrawLives() {
	// var life_image = new Image();
	// life_image.src = 'images/Pac-Man-Logo.jpg';
	// life_image.src = 'images/life-pacman.png';
	var life_image = document.getElementById("life-pacman");

	for (var i=0; i<lifes; i++) {
		info_canvas_ctx.drawImage(life_image, 10 + i* 50, 50, 50, 50);
	}
}

function DrawGhosts() {
	var icons_radius = 15;
	for (var k=0; k<ghosts_remain; k++) {
		var center = new Object();
		center.x = ghostArr[k].j * 2* icons_radius + icons_radius;
		center.y = ghostArr[k].i* 2 * icons_radius + icons_radius;

		game_canvas_ctx.beginPath();
		var image = new Image();
		image.src = "images/ghosts" + (k+1).toString() + ".png";
		game_canvas_ctx.drawImage(image,center.x-icons_radius, center.y -icons_radius, 2* icons_radius ,2* icons_radius )
	}

}


function noGhostOnThisPoint(pointElement, pointElement2) {
	for(var k=0; k<ghostArr.length; k++)
		if (pointElement === ghostArr[k].i && pointElement2 === ghostArr[k].j)
			return false;
	return true;
}



function locateGhosts() {
	//put ghosts on pinot
	var options_points = [];
	options_points.push([0, 0]);
	options_points.push([0, cols - 1]);
	options_points.push([rows - 1, 0]);
	options_points.push([rows - 1, cols - 1]);
	if (ghosts_remain ===0) {
		ghosts_remain = ghost_berfor_game;
		ghostArr = [];
	}

	while (ghosts_remain > 0) {
		randomNum = Math.random();
		var point = options_points[Math.floor(randomNum * 4)];
		if (board[point[0]][point[1]] !== 4) {
			while (!noGhostOnThisPoint(point[0],point[1])) {
				randomNum = Math.random();
				point = options_points[Math.floor(randomNum * 4)];
				console.log(point)
			}


			ghosts_remain--;
			var g = new Object();
			g.i = point[0];
			g.j = point[1];

			ghostArr.push(g)
		}
	}
}


function DrawBaseOfInfoCanvas() {
	canves_info.style.visibility="hidden";
	canves_info.width = 600;
	canves_info.height = 120;
	canves_info.style.left = "750px";
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
		str = "Hello "+username
		info_canvas_ctx.fillText(str,10,35);

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

	// DrawLives();

}



function Start(){

	DrawBaseOfInfoCanvas();
	canves_info.style.visibility="visible";
	board = new Array();
	score = 0;
	lifes=5;
	bunos = true;
	lives_flag=false;
	pac_color = "yellow";
	// colors to points
	points5 = Math.floor(num_of_balls * 60 / 100);
	points15 = Math.floor(num_of_balls * 30 / 100);
	points25 = Math.floor(num_of_balls * 10 / 100);

	var points_remain_toeat = [points5,points10,points25];
	var cnt = 100;
	var food_remain = num_of_balls;
	var food_counter= num_of_balls;
	ghost_berfor_game = ghosts_remain

	start_time = new Date();
	score=0;

	var two_bunos_pills= 2;
	var pacman_remain = 1;
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
					var random = Math.floor(Math.random() * 3);
					if (points_remain_toeat[random]>0) {
						points_remain_toeat[random]--;
					food_remain--;
					board[i][j] = points_board[random];
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;}
				else if(randomNum < 0.2 && two_bunos_pills > 0 && (i === 2 || i === 4 || i === 10) ){
						board[i][j] = 20;
						two_bunos_pills--;
						}
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}

	locateGhosts();

	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		var random = Math.floor(Math.random() * 3);
		if (points_remain_toeat[random]>0 ) {
			points_remain_toeat[random]--;
			food_remain--;
			board[emptyCell[0]][emptyCell[1]] = points_board[random];
		}
	}

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.which] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.which] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
	ghost_interval = setInterval(UpdateGhostsPosition, 250);

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
	// game_canvas_ctx.width = game_canvas_ctx.width; //clean board
	// lblScore.value = score;
	// lblTime.value = time_elapsed;
	var icons_radius = 15;
	var eye_radius = 2.5;
	var points_radius = 5;
	game_canvas_ctx.clearRect(0, 0, game_canvas_ctx.width, game_canvas_ctx.height); //clean board
	DrawBaseOfInfoCanvas();
	var pac_eye_color = 'red';
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			game_canvas_ctx.beginPath();
			game_canvas_ctx.rect(center.x - icons_radius, center.y - icons_radius, 2*icons_radius, 2*icons_radius);
			game_canvas_ctx.fillStyle = "black"; //color
			game_canvas_ctx.fill();
			DrawGhosts();
			if (board[i][j] === 2) { //draw pacmen
				if (pressed === 4) { //right
					game_canvas_ctx.beginPath();
					game_canvas_ctx.arc(center.x, center.y, icons_radius, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					game_canvas_ctx.lineTo(center.x, center.y);
					game_canvas_ctx.fillStyle = pac_color; //color
					game_canvas_ctx.fill();
					game_canvas_ctx.beginPath();
					game_canvas_ctx.arc(center.x + 2, center.y - 8, eye_radius, 0, 2 * Math.PI); // circle
					game_canvas_ctx.fillStyle = pac_eye_color; //color
					game_canvas_ctx.fill();
				}
				else if (pressed === 3) { //left
					game_canvas_ctx.beginPath();
					game_canvas_ctx.arc(center.x, center.y, icons_radius, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					game_canvas_ctx.lineTo(center.x, center.y);
					game_canvas_ctx.fillStyle = pac_color; //color
					game_canvas_ctx.fill();
					game_canvas_ctx.beginPath();
					game_canvas_ctx.arc(center.x - 2, center.y - 8, eye_radius, 0, 2 * Math.PI); // circle
					game_canvas_ctx.fillStyle = pac_eye_color; //color
					game_canvas_ctx.fill();
				}
				else if (pressed === 1) { //up
					game_canvas_ctx.beginPath();
					game_canvas_ctx.arc(center.x, center.y, icons_radius, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					game_canvas_ctx.lineTo(center.x, center.y);
					game_canvas_ctx.fillStyle = pac_color; //color
					game_canvas_ctx.fill();
					game_canvas_ctx.beginPath();
					game_canvas_ctx.arc(center.x + 8, center.y - 2, eye_radius, 0, 2 * Math.PI); // circle
					game_canvas_ctx.fillStyle = pac_eye_color; //color
					game_canvas_ctx.fill();
				}
				else if (pressed === 2) { //down
					game_canvas_ctx.beginPath();
					game_canvas_ctx.arc(center.x, center.y, icons_radius, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
					game_canvas_ctx.lineTo(center.x, center.y);
					game_canvas_ctx.fillStyle = pac_color; //color
					game_canvas_ctx.fill();
					game_canvas_ctx.beginPath();
					game_canvas_ctx.arc(center.x - 8, center.y + 2, eye_radius, 0, 2 * Math.PI); // circle
					game_canvas_ctx.fillStyle = pac_eye_color; //color
					game_canvas_ctx.fill();
				}
			} else if (board[i][j] === 21) {
				game_canvas_ctx.beginPath();
				game_canvas_ctx.arc(center.x , center.y , points_radius, 0, 2 * Math.PI); // circle
				game_canvas_ctx.fillStyle = color_5_points; //color
				game_canvas_ctx.fill();
			} else if (board[i][j] === 22) {
				game_canvas_ctx.beginPath();
				game_canvas_ctx.arc(center.x , center.y , points_radius, 0, 2 * Math.PI); // circle
				game_canvas_ctx.fillStyle = color_15_points; //color
				game_canvas_ctx.fill();
			} else if (board[i][j] === 23) {
				game_canvas_ctx.beginPath();
				game_canvas_ctx.arc(center.x , center.y , points_radius, 0, 2 * Math.PI); // circle
				game_canvas_ctx.fillStyle = color_25_points; //color
				game_canvas_ctx.fill();
			}
			else if (board[i][j] === 20) {
				game_canvas_ctx.beginPath();
				let image = new Image();
				image.src = "images/pill.png";
				game_canvas_ctx.drawImage(image,center.x-5 , center.y-5 , 20,20)
			}
			else if (board[i][j] === 4) {
				game_canvas_ctx.beginPath();
				game_canvas_ctx.rect(center.x - icons_radius, center.y - icons_radius, 2*icons_radius, 2*icons_radius);
				game_canvas_ctx.fillStyle = "white"; //color
				game_canvas_ctx.fill();
				game_canvas_ctx.drawImage(wall,center.x-icons_radius, center.y -icons_radius, 2* icons_radius ,2* icons_radius )
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	press=x;
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
	if (board[shape.i][shape.j] == 21) {
		food_counter++;
		score+=5;
	}
	if (board[shape.i][shape.j] == 22) {
		food_counter++;
		score+=15;
	}
	if (board[shape.i][shape.j] == 23) {
		food_counter++;
		score+=25;
	}
	if (board[shape.i][shape.j] == 20) {
		if(lives<5){
			lifes++;
		}
		lives_flag = true;
	}


	for (var i = 0; i < ghostArr.length; i++) {
		if (shape[i].i===shape.i && shape[i].j===shape.j) {
			boom_sticker();
			if (lifes === 5) {
				colision = new Date();
				score -= 10;
				lifes--;
			}
			else {
				var now= new Date();
				if(now-colision >= 1000){
					score -= 10;
					lifes--;
					colision = now;
				}
			}
			if (lifes <= 0) {
				game_over_sticker();
				GameOverMessage();

			}
			else {
				// locatePacmen();
				locateGhosts();
			}
		}
	}





	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed =Math.floor((currentTime - start_time) / 1000);
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}

	if(food_counter==(points10+points25+points15)){
		win_sticer();
		GameOverMessage();
	}
	if (lifes <= 0) {
		game_over_sticker();
		GameOverMessage();
	}

	else {
		Draw();
	}
}



function bonus_sticer() {
	bonus_flag = false;
	$('#bonus_image').fadeIn('slow',function(){
		$('#bonus_image').delay(2000).fadeOut();
	});
}



function game_over_sticker() {
	$('#gameover_image').fadeIn('slow', function () {
		$('#gameover_image').delay(8000).fadeOut();
	});
}

function pill_sticker() {
	$('#bigPill_image').fadeIn('slow',function(){
		$('#bigPill_image').delay(2000).stop().fadeOut();
	});
	lives_flag = false;
}

function boom_sticker() {
	$('#boom_image').fadeIn('slow',function(){
		$('#boom_image').delay(2000).stop().fadeOut();
	});
}

function win_sticer() {

	$('#win_image').fadeIn('slow', function () {
		$('#win_image').delay(8000).fadeOut();
	});
}

function getMinIndex(steps) {
	var min = steps[0];
	var index = 0;
	for (var i=1; i<steps.length; i++) {
		if (min > steps[i]) {
			min = steps[i];
			index = i;
		}
	}
	return index;
}

function getMaxIndex(steps) {
	var max = steps[0];
	var index = 0;
	for (var i=1; i<steps.length; i++) {
		if (max <=  steps[i]) {
			max = steps[i];
			index = i;
		}
	}
	return index;
}



function UpdateGhostsPosition() {


	var chance_random = 0.2;
	var random_number;
	for (var i = 0; i < ghostArr.length; i++) {
		var new_i, new_j;
		var distance_up = rows*cols;
		var distance_down = rows*cols;
		var distance_left = rows*cols;
		var distance_right = rows*cols;
		if (ghostArr[i].i-1 >=0 && board[ghostArr[i].i-1][ghostArr[i].j]!=4) {
			distance_up = ((Math.abs((shape.i - (ghostArr[i].i - 1)))) + (Math.abs((shape.j - shape[i].j))));
			// console.log("pacmen location: [" + pacmen.i +"," + + pacmen.j + "] ghost " + i + " move up: [" + (parseInt(ghosts[i].i)-1) + "," +ghosts[i].j +  "] destination: " + (Math.abs(pacmen.i-(ghosts[i].i-1)))+ "+" + (Math.abs(pacmen.j-ghosts[i].j)) + "=" + (Math.abs(pacmen.i-(ghosts[i].i-1)) + Math.abs(pacmen.j-ghosts[i].j)) );
		}
		if (ghostArr[i].i+1 <rows && board[ghostArr[i].i+1][ghostArr[i].j]!=4) {
			distance_down = ((Math.abs(shape.i - (ghostArr[i].i + 1))) + (Math.abs(shape.j - shape[i].j)));
			// console.log("pacmen location: [" + pacmen.i +"," + + pacmen.j + "] ghost " + i + " move down: [" + (parseInt(ghosts[i].i)+1) + "," +ghosts[i].j +  "] destination: " + (Math.abs(pacmen.i-(ghosts[i].i+1))+ "+" + (Math.abs(pacmen.j-ghosts[i].j) )+ "=" + (Math.abs(pacmen.i-(ghosts[i].i+1)) + Math.abs(pacmen.j-ghosts[i].j)))) ;

		}
		if (ghostArr[i].j-1 >=0 && board[ghostArr[i].i][ghostArr[i].j-1]!=4) {
			distance_left = (((Math.abs(shape.i - ghostArr[i].i))) + (Math.abs(shape.j - (shape[i].j - 1))));
			// console.log("pacmen location: [" + pacmen.i +"," + + pacmen.j + "] ghost " + i + " move left: [" + (parseInt(ghosts[i].i)) + "," +(ghosts[i].j-1) +  "] destination: " + (Math.abs(pacmen.i-(ghosts[i].i))+ "+" + (Math.abs(pacmen.j-ghosts[i].j-1)) + "=" + (Math.abs(pacmen.i-(ghosts[i].i)) + Math.abs(pacmen.j-ghosts[i].j-1)))) ;

		}
		if (ghostArr[i].j+1 <cols && board[ghostArr[i].i][ghostArr[i].j+1]!=4) {
			distance_right = (((Math.abs(shape.i - ghostArr[i].i))) + (Math.abs(shape.j - (shape[i].j + 1))));
			// console.log("pacmen location: [" + pacmen.i +"," + + pacmen.j + "] ghost " + i + " move right: [" + (parseInt(ghosts[i].i)) + "," +(ghosts[i].j+1) +  "] destination: " + (Math.abs(pacmen.i-(ghosts[i].i))+ "+" + (Math.abs(pacmen.j-ghosts[i].j+1)) + "=" + (Math.abs(pacmen.i-(ghosts[i].i)) + Math.abs(pacmen.j-ghosts[i].j+1))) );
		}

		var steps = [distance_up,distance_down,distance_left,distance_right];
		var locations = [[ghostArr[i].i-1,ghostArr[i].j],[ghostArr[i].i+1,ghostArr[i].j],[ghostArr[i].i,ghostArr[i].j-1],[ghostArr[i].i,ghostArr[i].j+1]];
		var minIndex;
		random_number = Math.floor(Math.random());
		if (Math.random() < chance_random) {
			minIndex = Math.floor(Math.random() * 4);
			while (locations[minIndex][0] < 0 || locations[minIndex][0] >= rows || locations[minIndex][1] < 0 || locations[minIndex][1] >= cols || board[locations[minIndex][0]][locations[minIndex][1]]== 4) {
				minIndex = Math.floor(Math.random() * 4);
			}
		}
		else
			minIndex = getMinIndex(steps);

		for (var n=0; n<ghostArr.length; n++) {
			if (locations[minIndex][0] === ghostArr[n].i && locations[minIndex][1] === ghostArr[n].j ) {
				while (locations[minIndex][0] < 0 || locations[minIndex][0] >= rows || locations[minIndex][1] < 0 || locations[minIndex][1] >= cols || board[locations[minIndex][0]][locations[minIndex][1]]== 4) {
					minIndex = Math.floor(Math.random() * 4);
				}
				break;
			}
		}
		new_i = locations[minIndex][0];
		new_j = locations[minIndex][1];

		ghostArr[i].old_i = ghostArr[i].i;
		ghostArr[i].old_j = ghostArr[i].j;
		ghostArr[i].i = new_i;
		ghostArr[i].j = new_j;
	}
	//DrawGhosts();


	function stopGame() {
		if (ghostArr.length !== 0) {;
			ghostArr = new Array();
		}
		clearInterval(interval);
		clearInterval(ghost_interval);
	}



}



