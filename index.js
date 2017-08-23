(function(){
	var tank=document.getElementById('tank');
	var timeLeft = document.getElementById('timeLeft');
	var trophy = document.getElementById('trophy');
	var field =  document.getElementById('field');
	var intervalFlag;
	tank.direction = "east";
	tank.className = "east";
	tank.style.top = "85px";
	tank.style.left = "475px";

	var x = 500;//TO hold time to be displayed

	window.addEventListener('keypress' , actionOnPress);
	intervalFlag = setInterval(updateScore,1000);
	

	//Start of function actionOnPress
	function actionOnPress(){
		var dx = 0;
		var dy = 0;

		switch(window.event.which){
			
			case 97://case when a is clicked
				//if direction is not west then make it west
				if (tank.direction !== "west"){
					tank.direction = "west";
					tank.className = "west";
				}
				else{
					dx = -5;
					var orgL = window.parseInt(tank.style.left);
					tank.style.left = orgL + dx + 'px';
				}	

				break;

			case 100://case when d is clicked
				if(tank.direction !== "east"){
					tank.direction = "east";
					tank.className = "east";
				}
				else{
					dx = 5;
					var orgL = window.parseInt(tank.style.left);
					tank.style.left = orgL + dx + 'px';
				}	
				break;
				
			case 115://case when s is clicked
				if(tank.direction !== "south"){
					tank.direction = "south";
					tank.className = "south"
				}
				else{
					dy = 5;
					var orgT = window.parseInt(tank.style.top);
					tank.style.top = orgT + dy + 'px';	
				}
				break;

			case 119://case when w is clicked
				if(tank.direction !== "north"){	
					tank.direction = "north";
					tank.className = "north";
				 }
				else{
					dy = -5;
					orgT = window.parseInt(tank.style.top);
					tank.style.top = orgT + dy + 'px';
					
				}
				break;
			default:
				break;
		}

		
		window.setTimeout( checkStatus , 0 );
		window.scrollBy(0,dy);
	}
	//End of function actionOnPress

	function checkStatus(){
		var field = document.getElementById('field');
		var allWalls = field.querySelectorAll('.wall');
		var turret = document.getElementById('turret');

		for(var i = 0 ; i < allWalls.length ; i++ ){
			if(isColliding(tank,allWalls[i]) || isColliding(turret , allWalls[i]))
				alert("game Over , you lose");
		}

		
		if( isColliding(tank,trophy) || isColliding(turret , trophy)){
			alert("game over , you win");
			clearInterval(intervalFlag);
		}

		if(	 !isInside(tank,field) || !isInside(turret,field) )  {
			alert('You Lose , Out of Field');
		}
	}

	//Function to check if box1 is inside box2 or not
	function isInside( box1 , box2 ){
		
		box1 = box1.getBoundingClientRect();
		box2 = box2.getBoundingClientRect();

		var x1 = box1.left;
		var y1 = box1.top;

		var x2 = box2.left;
		var y2 = box2.top;

		var w1 = box1.width;
		var h1 = box1.height;

		var w2 = box2.width;
		var h2 = box2.height;

		if(x1 < x2 || y1 < y2 || x1+w1 > x2+w2 || y1+h1 > y2+h2)
			return false;
		return true;
	}


	//function to check if 2 boxex are colliding or nt on the basis of there position
	function isColliding(box1 , box2){
		box1 = box1.getBoundingClientRect();
		box2 = box2.getBoundingClientRect();

		var x1 = box1.left;
		var y1 = box1.top;

		var x2 = box2.left;
		var y2 = box2.top;

		var w1 = box1.width;
		var h1 = box1.height;

		var w2 = box2.width;
		var h2 = box2.height;

		var isXColliding;

		if(x1 < x2){
			if( (x2-x1) > w1 )
				isXColliding = false;
			else
				isXColliding = true;
		}
		else{
			if( (x1 - x2) > w2 )
				isXColliding = false;
			else
				isXColliding = true;	
		}

		var isYColliding;

		if(y1 < y2){
			if( (y2-y1) > h1 )
				isYColliding = false;
			else
				isYColliding = true;
		}
		else{
			if( (y1 - y2) > h2 )
				isYColliding = false;
			else
				isYColliding = true;	
		}

		if ( isXColliding && isYColliding )
			return true;
		else
			return false;
	}

	function updateScore(){

		timeLeft.innerHTML = x--;

	}


})();