var shape = new Object();
var moveScore = new Object();

var board;
var score;
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

var points25, points15, points5;

var interval_score;
var interval;
var ghost_interval;

var rows=21;
var cols=21;
var pac_color='#7FFF00'
var pressed;

function DrawLives() {
	var life_image = document.getElementById("life-pacman");

	for (var i=0; i<lifes; i++) {
		info_canvas_ctx.drawImage(life_image, 10 + i* 50, 50, 50, 50);
	}
}

function DrawGhosts() {
	var icons_radius = 15;
	for (var k=0; k<ghostArr.length; k++) {
		var center = new Object();
		center.y = ghostArr[k].j * 2* icons_radius + icons_radius;
		center.x = ghostArr[k].i* 2 * icons_radius + icons_radius;

		game_canvas_ctx.beginPath();
		var image = new Image();
		image.src = "images/ghosts" + (k+1).toString() + ".png";
		game_canvas_ctx.drawImage(image,center.x-icons_radius, center.y -icons_radius, 2* icons_radius ,2* icons_radius )
	}

}
function DrawMoveScore() {

	if (moveScore.i === -1 && moveScore.j === -1)
		return;

	var icons_radius = 15;
	var center = new Object();
	center.x = moveScore.i * 2 * icons_radius + icons_radius;
	center.y = moveScore.j * 2 * icons_radius + icons_radius;

	//draw background
	var img = new Image();
	img.src = "images/nikud_zaz.png";
	game_canvas_ctx.drawImage(img, center.x - icons_radius, center.y - icons_radius, 2 * icons_radius, 2 * icons_radius)
}




function noGhostOnThisPoint(ghostLocationI, ghostLocationJ) {
	for(var k=0; k<ghostArr.length; k++)
		if (ghostLocationI == ghostArr[k].i && ghostLocationJ == ghostArr[k].j)
			return false;
	return true;
}





function locateGhosts() {
	//put ghosts on pinot
	var pointarray= new Array();
	pointarray[0]=[0,0];
	pointarray[1]=[0,cols-1];
	pointarray[2]=[rows-1,0];
	pointarray[3]=[rows-1,cols-1];
	for(var k=0; k<ghosts_remain;k++)
	{
		var ghost = new Object();
		ghost.j =pointarray[k][1];
		ghost.i=pointarray[k][0];
		ghostArr[k] = ghost;
	}
}

function DrawBaseOfInfoCanvas() {
	canves_info.style.visibility="visible";
	canves_info.width = 530;
	canves_info.height = 300;
	canves_info.style.left = "900px";
	canves_info.style.top = "50px";
	canves_info.style.position = "absolute";


	info_canvas_ctx.fillStyle = "#C5B823";
	info_canvas_ctx.rect(0,0,canves_info.width,canves_info.height);
	info_canvas_ctx.fill();
	info_canvas_ctx.stroke();

	//lifes
	DrawLives();

	//username
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	if (typeof (username) !== "undefined")
		str = "Hello "+username
	info_canvas_ctx.fillText(str,10,35);


	//Time
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("Time:",270,35);

	//clock
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText(time_elapsed,360,35);


	//Score
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("Score:",270,80);

	//Points
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText(score,360,80);

	//keys
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("Keys:",10,130);

	//rightKey
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("Right key- ",10,170);
	info_canvas_ctx.fillText(rightKey,140,170);

	//upKey
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("Up key- ",10,210);
	info_canvas_ctx.fillText(upKey,110,210);

	//leftKey
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("Left key- ",10,250);
	info_canvas_ctx.fillText(leftKey,130,250);

	//downKey
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("Down key- ",10,290);
	info_canvas_ctx.fillText(downKey,147,290);

	//balls
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("Number of balls: ",270,130);
	info_canvas_ctx.fillText(num_of_balls,475,130);

	//ghost
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("Number of ghosts: ",270,170);
	info_canvas_ctx.fillText(ghosts_remain,500,170);

	//color 5 point
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("5 Point: ",270,210);
	info_canvas_ctx.beginPath();
	info_canvas_ctx.arc(380, 202, 10, 0, 2 * Math.PI); // circle
	info_canvas_ctx.fillStyle = color_5_points; //color
	info_canvas_ctx.fill();
	//color 15 point
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("15 Point: ",270,250);
	info_canvas_ctx.beginPath();
	info_canvas_ctx.arc(395, 242, 10, 0, 2 * Math.PI); // circle
	info_canvas_ctx.fillStyle = color_15_points; //color
	info_canvas_ctx.fill();
	//color 25 point
	info_canvas_ctx.fillStyle = "#f1f1f1";
	info_canvas_ctx.font =  '30px calibri';
	info_canvas_ctx.textShadow = "2px -6px #D1B358";
	info_canvas_ctx.fillText("25 Point: ",270,290);
	info_canvas_ctx.beginPath();
	info_canvas_ctx.arc(395, 282, 10, 0, 2 * Math.PI); // circle
	info_canvas_ctx.fillStyle = color_25_points; //color
	info_canvas_ctx.fill();




}

function Start() {
	DrawBaseOfInfoCanvas();
	canves_info.style.visibility="visible";

	pac_color = "yellow";
	board = new Array();
	score = 0;
	lifes=5;
	pressed=3;
	bunos = true;
	lives_flag=false;
	pac_color = "#ffffff";
	// colors to points
	points5 = Math.floor(num_of_balls * 60 / 100);
	points15 = Math.floor(num_of_balls * 30 / 100);
	points25 = Math.floor(num_of_balls * 10 / 100);
	points5+=num_of_balls-(points5+points15+points25);


	var points_remain_toeat = [points5,points15,points25];
	var points_board = [21,22,23]
	var cnt = rows*cols;
	var food_remain = num_of_balls;
	var food_counter= num_of_balls;
	ghost_berfor_game = ghosts_remain

	start_time = new Date();
	score=0;
	startSound();
	var two_bunos_pills= 2;
	for (var i = 0; i < cols; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < rows; j++) {
			if ( j==2 && i==3|| j==2 && i==4 ||
				j==2 && i==5 ||j==2 && i==6 ||j==3 && i==7 ||
				j==3 && i==4 || j==4 && i==4 || j==5 && i==4 ||
				j==9 && i==3 || j==9 && i==4 || j==9 && i==5 ||
				j==10 && i==3 || j==10 && i==2 || j==11 && i==2 || j==12 && i==2 ||
				j==10 && i==5 || j==11 && i==5 || j==11 && i==6 || j==11 && i==7 ||

				j==16 && i==7 || j==15 && i==7 || j==14 && i==7 || j==16 && i==6 || j==16 && i==5|| j==16 && i==4
				|| j==16 && i==3
				|| j==18 && i==3 || j==19 && i==3 || j==20 && i==3|| j==21 && i==3
				|| j==8 && i==8 || j==8 && i==9

				|| j==1 && i==16 || j==2 && i==15 || j==2 && i==16|| j==2 && i==17
				|| j==3 && i==15 || j==4 && i==15 || j==5 && i==15

				|| j==5 && i==19 || j==5 && i==20

				|| j==11 && i==12 || j==11 && i==13|| j==11 && i==14 || j==11 && i==15
				|| j==12 && i==12 || j==13 && i==12 || j==14 && i==12
				|| j==14 && i==9 || j==14 && i==8 || j==20 && i==13

				|| j==14 && i==19  || j==13 && i==19 || j==12 && i==19
				|| j==17 && i==16 || j==17 && i==17 || j==17 && i==18 || j==17 && i==19 || j==17 && i==20
				|| j==18 && i==17 || j==19 && i==17

			) {
				board[i][j] = 4;
			}
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					var random = Math.floor(Math.random() * 3);
					if (points_remain_toeat[random]>0) {
						points_remain_toeat[random]--;
						food_remain--;
						board[i][j] = points_board[random];
					}
					else{
						board[i][j] = 0;
					}
				}
				else if(randomNum < 0.2 && two_bunos_pills > 0 && (j != 3 || j != 6) ){
					board[i][j] = 20;
					two_bunos_pills--;
				}
				else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}

	locatePacmen();
	locateGhosts();

	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		var random = Math.floor(Math.random() * 3);
		if (points_remain_toeat[random] >0 ) {
			points_remain_toeat[random]--;
			food_remain--;
			board[emptyCell[0]][emptyCell[1]] = points_board[random];
		}
	}
	var emptyCell1 = findRandomEmptyCell(board);
	board[emptyCell1[0]][emptyCell1[1]] = 30;



	while (two_bunos_pills > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 20;
		two_bunos_pills--;
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
	interval = setInterval(UpdatePosition, 150);
	ghost_interval = setInterval(UpdateGhostsPosition, 170);
	interval_score = setInterval(UpdateScoreMove,150);

}

function findRandomEmptyCell(board) {
	var j = Math.floor(Math.random() * (rows-1) + 1);
	var i = Math.floor(Math.random() * (cols-1) + 1);
	while (board[i][j] != 0) {
		j = Math.floor(Math.random() * (rows-1) + 1);
		i = Math.floor(Math.random() * (cols-1) + 1);
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

	game_canvas_ctx.clearRect(0, 0, game_canvas_ctx.width, game_canvas_ctx.height); //clean board
	DrawBaseOfInfoCanvas();
	var icons_radius = 15;
	var eye_radius = 2.5;
	var points_radius = 5;

	pac_color = "yellow";
	var pac_eye_color = 'black';
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			var center = new Object();
			center.x = i * 2* icons_radius + icons_radius;
			center.y = j * 2 * icons_radius + icons_radius;

			game_canvas_ctx.beginPath();
			game_canvas_ctx.fillStyle = '#02112C'; //color


			game_canvas_ctx.rect(center.x - icons_radius, center.y - icons_radius, 2*icons_radius, 2*icons_radius);
			game_canvas_ctx.fill();
			DrawGhosts();
			DrawMoveScore();
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
				else if (pressed == 1) { //up
					game_canvas_ctx.beginPath();
					game_canvas_ctx.arc(center.x, center.y, icons_radius, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					game_canvas_ctx.lineTo(center.x, center.y);
					game_canvas_ctx.fillStyle =pac_color; //color
					game_canvas_ctx.fill();
					game_canvas_ctx.beginPath();
					game_canvas_ctx.arc(center.x + 8, center.y - 2, eye_radius, 0, 2 * Math.PI); // circle
					game_canvas_ctx.fillStyle = pac_eye_color; //color
					game_canvas_ctx.fill();
				}
				else if (pressed == 2) { //down
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
			} else if (board[i][j] == 21) {
				game_canvas_ctx.beginPath();
				game_canvas_ctx.arc(center.x , center.y , points_radius, 0, 2 * Math.PI); // circle
				game_canvas_ctx.fillStyle = color_5_points; //color
				game_canvas_ctx.fill();
			} else if (board[i][j] == 22) {
				game_canvas_ctx.beginPath();
				game_canvas_ctx.arc(center.x , center.y , points_radius, 0, 2 * Math.PI); // circle
				game_canvas_ctx.fillStyle = color_15_points; //color
				game_canvas_ctx.fill();
			} else if (board[i][j] == 23) {
				game_canvas_ctx.beginPath();
				game_canvas_ctx.arc(center.x , center.y , points_radius, 0, 2 * Math.PI); // circle
				game_canvas_ctx.fillStyle = color_25_points; //color
				game_canvas_ctx.fill();
			}
			else if (board[i][j] == 20) {
				game_canvas_ctx.beginPath();
				let image = new Image();
				image.src = "images/pill.png";
				game_canvas_ctx.drawImage(image,center.x-5 , center.y-5 , 20,20)
			}
			else if (board[i][j] == 30) {
				game_canvas_ctx.beginPath();
				let image = new Image();
				image.src = "images/clock.png";
				game_canvas_ctx.drawImage(image,center.x-5 , center.y-5 , 20,20)
			}

			else if (board[i][j] == 4) {
				game_canvas_ctx.beginPath();
				var wall= new Image();
				wall.src="images/wall.png";
				game_canvas_ctx.drawImage(wall,center.x-icons_radius, center.y -icons_radius, 2* icons_radius ,2* icons_radius )
			}
		}
	}
}

function UpdateScoreMove() {
	var sortArr = new Array();
	var distsleft = -1;
	var distright = -1;
	var distup = -1;
	var distdown = -1;

	if (moveScore.j > 0 && board[moveScore.i][moveScore.j-1] != 4 && noGhostOnThisPoint(moveScore.i,moveScore.j-1))
		distup = Math.abs(moveScore.i - shape.i) + Math.abs((moveScore.j - 1) - shape.j);

	if (moveScore.j <rows-1 && board[moveScore.i][moveScore.j+1] != 4 && noGhostOnThisPoint(moveScore.i,moveScore.j+1))
		distdown = Math.abs(moveScore.i - shape.i) + Math.abs((moveScore.j + 1) - shape.j);

	if (moveScore.i > 0 && board[moveScore.i-1][moveScore.j] != 4  && noGhostOnThisPoint(moveScore.i-1,moveScore.j))
		distsleft = Math.abs((moveScore.i - 1) - shape.i) + Math.abs(moveScore.j - shape.j);

	if (moveScore.i <cols-1 && board[moveScore.i+1][moveScore.j] != 4 && noGhostOnThisPoint(moveScore.i+1,moveScore.j))
		distright = Math.abs((moveScore.i + 1) - shape.i) + Math.abs(moveScore.j - shape.j);


	sortArr = [distup, distright, distdown, distsleft]
	sortArr.sort();
	var x = -1;
	var count = sortArr.length - 1;
	while (x == -1) {
		x = sortArr[count];
		count--
	}
	if (x == distsleft && board[moveScore.i-1][moveScore.j] != 4)
		moveScore.i --;
	if (x == distright && board[moveScore.i+1][moveScore.j] != 4)
		moveScore.i++;
	if (x == distup && board[moveScore.i][moveScore.j-1] != 4)
		moveScore.j --;
	if (x == distdown && board[moveScore.i][moveScore.j+1] != 4)
		moveScore.j++;
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if(x===1 || x===2 ||x===3 ||x===4)
		pressed=x;
	if (x === 1) {
		if (shape.j > 0 && board[shape.i][shape.j-1 ] != 4) {
			shape.j--;
		}
	}
	if (x === 2) {
		if (shape.j < rows-1 && board[shape.i][shape.j+1] != 4) {
			shape.j++;
		}
	}
	if (x ===3) {
		if (shape.i > 0 && board[shape.i-1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x === 4) {
		if (shape.i < cols-1 && board[shape.i+1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 21) {
		food_counter--;
		score+=5;
	}
	if (board[shape.i][shape.j] == 22) {
		food_counter--;
		score+=15;
	}
	if (board[shape.i][shape.j] == 23) {
		food_counter--;
		score+=25;
	}
	if (board[shape.i][shape.j] == 20) {
		pill_sticker();
		if(lifes<5){
			lifes++;
		}
		lives_flag = true;
	}

	if(board[shape.i][shape.j]==30)
	{
		start_time.setSeconds(start_time.getSeconds()+15)
		moveScore.j=-1;
		moveScore.i=-1;
		clock_sticer();

	}
	if(shape.i==moveScore.i && shape.j==moveScore.j)
	{
		score+=50;
		clearInterval(interval_score);
		bonus_sticer();
		moveScore.i=-1;
		moveScore.j=-1;
		bonus_flag=true;
	}

	for (var k = 0; k < ghostArr.length; k++) {
		if (ghostArr[k].i==shape.i && ghostArr[k].j==shape.j) {
			boom_sticker();
			//	boom_sticker();
			if (lifes > 0) {
				score -= 10;
				lifes--;
			}

			if (lifes < 0) {
				DrawBaseOfInfoCanvas();
				game_over_sticker();
				GameOverMessage();
			}
			locateGhosts();
			locatePacmen();

		}
	}


	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed =Math.floor(time-(currentTime - start_time) / 1000);
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}

	if(food_counter <=0 ){
		win_sticer();
		GameOverMessage();
	}
	if (lifes <= 0) {
		game_over_sticker();
		GameOverMessage();
	}

	if(time_elapsed<=0){
		GameOverMessage();
	}

	Draw();
}

function bonus_sticer() {
	bonus_flag = false;
	$(document).ready(function(){
		$('#nikud_zaz').fadeIn('slow',function(){
			$('#nikud_zaz').animate({  borderSpacing: 720 }, {
				step: function(now,fx) {
					$(this).css('-webkit-transform','rotatey('+now+'deg)');
				},
				duration:'slow'
			},'linear');
			$('#nikud_zaz').delay(1600).fadeOut();
		});
	});
}



function game_over_sticker() {
	$(document).ready(function(){
		$('#gameover_image').fadeIn('slow', function () {
			$('#gameover_image').delay(1600).fadeOut();
		});
	});
}

function pill_sticker() {
	$(document).ready(function(){
		$('#bigPill_image').fadeIn('slow', function () {
			$('#bigPill_image').delay(1600).fadeOut();
		});
	});
	lives_flag = false;
}

function clock_sticer() {
	$(document).ready(function(){
		$('#bigClock_image').fadeIn('slow', function () {
			$('#bigClock_image').delay(500).fadeOut();
		});
	});
	lives_flag = false;
}

function boom_sticker() {
	$(document).ready(function(){
		$('#pacmanEaten').fadeIn('slow',function(){
			$({deg: 0}).animate({deg: 360}, {
				duration: 1000,
				step: function(now){
					$("#pacmanEaten").css({
						transform: "rotate(" + now + "deg)"
					});
				}
			});
			$('#pacmanEaten').delay(2000).stop().fadeOut('slow');
		});
	});
}

function win_sticer() {
	$(document).ready(function(){
		$('#win_image').fadeIn('slow', function () {
			$('#win_image').delay(2000).fadeOut();
		});
	});
}

function UpdateGhostsPosition() {
	var distsleft;
	var distright;
	var distup;
	var distdown;

	for(var k=0 ; k<ghostArr.length; k++){
		distsleft=rows*cols;
		distright=rows*cols;
		distup=rows*cols;
		distdown=rows*cols;

		if(ghostArr[k].j> 0 && board[ghostArr[k].i][ghostArr[k].j-1] != 4 && noGhostOnThisPoint(ghostArr[k].i,ghostArr[k].j-1))
			distup = Math.abs( ghostArr[k].i - shape.i) + Math.abs((ghostArr[k].j - 1) - shape.j);

		if(ghostArr[k].j< rows-1 && board[ghostArr[k].i][ghostArr[k].j+1] != 4  && noGhostOnThisPoint(ghostArr[k].i,ghostArr[k].j+1))
			distdown = Math.abs( ghostArr[k].i - shape.i) + Math.abs((ghostArr[k].j + 1) - shape.j);

		if( ghostArr[k].i> 0 && board [ghostArr[k].i-1][ghostArr[k].j] != 4  && noGhostOnThisPoint(ghostArr[k].i-1,ghostArr[k].j))
			distsleft = Math.abs((ghostArr[k].i - 1) - shape.i) + Math.abs(ghostArr[k].j - shape.j);

		if( ghostArr[k].i < cols-1 && board[ghostArr[k].i+1][ghostArr[k].j] != 4  && noGhostOnThisPoint(ghostArr[k].i+1,ghostArr[k].j))
			distright = Math.abs((ghostArr[k].i+ 1) - shape.i) + Math.abs(ghostArr[k].j - shape.j);

		var minDist= Math.min(distright,distdown,distsleft,distup);

		if(minDist == distsleft)
			ghostArr[k].i --;
		else if(minDist == distright)
			ghostArr[k].i++;
		else if(minDist == distup)
			ghostArr[k].j--;
		else if(minDist == distdown)
			ghostArr[k].j++;

	}
}


function stopGame() {
	if (ghostArr.length !== 0) {;
		ghostArr = new Array();
	}
	clearInterval(interval);
	clearInterval(ghost_interval);
	clearInterval(interval_score);
}

function locatePacmen() {
	point = findRandomEmptyCell(board);
	shape.i = point[0];
	shape.j = point[1];

}

