function init(){

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var mouseX;
    var mouseY;

    var monsterOriginX = 100;
    var monsterOriginY = canvas.height;

    var tentacleOffset = 0;
    var tentacleSpeed = 5; /* TENTACLE WAVING SPEED */
    var tentackleWave = true;

    // MONSTER SIZE
    var monsterWidth = canvas.width / 5 * 3;
    var monsterHeight = canvas.height / 3 ;

    var mouthRadius = 120;

    // EVENT LISTENERS
    canvas.addEventListener('mousemove',function(event){
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    window.addEventListener('resize',function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        monsterWidth = canvas.width / 5 * 4;
        monsterHeight = canvas.height / 3 * 1;
        createMonster(100, canvas.height);
    });

    // DRAW BACKGROUND
    function drawBackground(){
        ctx.fillStyle = '#3795A2';
        ctx.fillRect(0,canvas.height,150,-300);
        ctx.fillRect(150,canvas.height,150,-500);
        ctx.fillRect(300,canvas.height,300,-400);
        ctx.fillRect(600,canvas.height,300,-600);
        ctx.fillRect(900,canvas.height,300,-400);
        ctx.fillRect(1200,canvas.height,300,-500);
        ctx.fillRect(1500,canvas.height,300,-400);
        ctx.fillRect(1800,canvas.height,300,-200);
    }

    function createMonster(originX, originY){

        // DRAW MONSTER HEAD
        drawHead(originX, originY);

        // LEFT EYE
        drawEye(originX + monsterWidth / 4, originY - monsterHeight, 100, 20);

        // RIGHT EYE
        drawEye(originX + monsterWidth / 6 * 4, originY - monsterHeight / 5 * 7, 100, 30);

        // MOUTH
        drawMouth(originX, originY);

        // LEFT TENTACLE
        drawTentacle(originX-150, originY);

        // RIGHT TENTACLE
        drawTentacle(originX + monsterWidth - 50, originY);
    }

    function drawHead(originX, originY){
        // SHADOW
        ctx.beginPath();
        ctx.fillStyle = '#872C42';
        ctx.moveTo(originX-50, originY);
        ctx.quadraticCurveTo(originX - originX / 4, monsterHeight, monsterWidth / 2 + originX / 5, monsterHeight);
        ctx.quadraticCurveTo(monsterWidth + originX, monsterHeight,  monsterWidth + originX , originY);
        ctx.fill();

        // HEAD
        ctx.beginPath();
        ctx.fillStyle = '#BA3C5B';
        ctx.moveTo(originX, originY);
        ctx.quadraticCurveTo(originX - originX / 4, monsterHeight, monsterWidth / 2 + originX / 5, monsterHeight);
        ctx.quadraticCurveTo(monsterWidth + originX, monsterHeight,  monsterWidth + originX , originY);
        ctx.fill();
    }

    function drawMouth(originX, originY){
        let mouthCenterX = originX + monsterWidth / 2;
        let mouthCenterY = canvas.height;

        // LIP
        ctx.beginPath();
        ctx.fillStyle = '#872C42';
        ctx.arc(mouthCenterX + 10, mouthCenterY, mouthRadius + 10,0,2*Math.PI);
        ctx.fill();

        // MOUTH
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(mouthCenterX, mouthCenterY, mouthRadius,0,2*Math.PI);
        ctx.fill();
    }

    function drawEye(originX, originY, eyeRadius, pupilRadius){
        let pupilX = 0;
        let pupilY = 0;

        var pupilOffset = 1.2; /* TO OFFSET PUPIL FROM EDGE OF EYE BALL */

        // TOP LEFT
        if(mouseX < originX && mouseY <= originY){
            let a = originY - mouseY;
            let b = originX - mouseX;
            let tan = a / b;
            let angle = Math.atan(tan);

            // CHECK IF MOUSE IS INSIDE THE EYEBALL
            let mouseOffsetFromCenter = (originY - mouseY) / Math.sin(angle);
            if(isNaN(mouseOffsetFromCenter) && mouseX > eyeRadius - pupilRadius * pupilOffset){
                mouseOffsetFromCenter = 1;
            }

            if(mouseOffsetFromCenter < eyeRadius - pupilRadius * pupilOffset){
                pupilX = mouseX - originX;
                pupilY = mouseY - originY;
            }else{
                pupilY =  - Math.sin(angle) * (eyeRadius - pupilRadius * pupilOffset);
                pupilX =  - Math.cos(angle) * (eyeRadius - pupilRadius * pupilOffset);
            };

        // TOP RIGHT
    }else if(mouseX > originX && mouseY <= originY){
            let a = originY - mouseY;
            let b = mouseX - originX;
            let tan = a / b;
            let angle = Math.atan(tan);

            // CHECK IF MOUSE IS INSIDE THE EYEBALL
            let mouseOffsetFromCenter = (originY - mouseY) / Math.sin(angle);
            if(isNaN(mouseOffsetFromCenter) && mouseX < originX + eyeRadius){
                mouseOffsetFromCenter = 1;
            }

            if(mouseOffsetFromCenter <= eyeRadius - pupilRadius * pupilOffset){
                pupilX = mouseX - originX;
                pupilY = mouseY - originY;
            }else{
                pupilY =  - Math.sin(angle) * (eyeRadius - pupilRadius * pupilOffset);
                pupilX = Math.cos(angle) * (eyeRadius - pupilRadius * pupilOffset);
            }

        // BOTTOM RIGHT
    }else if(mouseX > originX && mouseY > originY){
            let a = mouseY - originY;
            let b = mouseX - originX;
            let tan = a / b;
            let angle = Math.atan(tan);

            // CHECK IF MOUSE IS INSIDE THE EYEBALL
            let mouseOffsetFromCenter = (mouseY - originY) / Math.sin(angle);

            if(mouseOffsetFromCenter < eyeRadius - pupilRadius * pupilOffset){
                pupilX = mouseX - originX;
                pupilY = mouseY - originY;
            }else{
                pupilY = Math.sin(angle) * (eyeRadius - pupilRadius * pupilOffset);
                pupilX = Math.cos(angle) * (eyeRadius - pupilRadius * pupilOffset);
            }

        // BOTTOM LEFT
        }else if(mouseX < originX && mouseY > originY){
            let a = mouseY - originY;
            let b = mouseX - originX;
            let tan = a / b;
            let angle = Math.atan(tan);

            // CHECK IF MOUSE IS INSIDE THE EYEBALL
            let mouseOffsetFromCenter = (originY - mouseY) / Math.sin(angle);

            if(mouseOffsetFromCenter < eyeRadius - pupilRadius * pupilOffset){
                pupilX = mouseX - originX;
                pupilY = mouseY - originY;
            }else{
                pupilY = - Math.sin(angle) * (eyeRadius - pupilRadius * pupilOffset);
                pupilX = - Math.cos(angle) * (eyeRadius - pupilRadius * pupilOffset);
            }
        }

        // SHADOW
        ctx.beginPath();
        ctx.fillStyle = '#872C42';
        ctx.arc(originX, originY + 15, eyeRadius,0,2*Math.PI);
        ctx.fill();

        // EYE BALL
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(originX, originY, eyeRadius,0,2*Math.PI);
        ctx.fill();

        // EYE PUPIL
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(originX + pupilX, originY + pupilY, pupilRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    function drawTentacle(originX, originY){
        // TENTACLE MOVEMENT
        if(tentackleWave){
            tentacleOffset += tentacleSpeed;
            if(tentacleOffset >= 100){
                tentackleWave = false;
            }
        }else if(!tentackleWave){
            tentacleOffset -= tentacleSpeed;
            if(tentacleOffset <= -100){
                tentackleWave = true;
            }
        }

        // TENTACLE
        ctx.beginPath();
        ctx.fillStyle = '#872C42';
        ctx.moveTo(originX, originY);
        ctx.quadraticCurveTo(originX + 25 + tentacleOffset, originY - 100, originX + 50, originY - 200);
        ctx.quadraticCurveTo(originX + 75 - tentacleOffset, originY - 300, originX + 100, originY - 400);
        ctx.lineTo(originX + 100, originY - 400);
        ctx.quadraticCurveTo(originX + 125 - tentacleOffset, originY - 300, originX + 150, originY - 200);
        ctx.quadraticCurveTo(originX + 175 + tentacleOffset, originY - 100, originX + 200, originY);
        ctx.fill();
    }

    function updateMonster(){
        // MAIN MOVEMENT
        if(Math.floor(monsterOriginX + monsterWidth/2) < mouseX && monsterOriginX + monsterWidth < canvas.width){
            monsterOriginX++;
        }else if(Math.floor(monsterOriginX + monsterWidth/2) > mouseX && monsterOriginX > 0){
            monsterOriginX--;
        }else{
            monsterOriginX = monsterOriginX;
        }

        // CLEAN CANVAS
        void ctx.clearRect(0, 0, canvas.width, canvas.height);

        // DRAW BACKGROUNG
        drawBackground();

        // DRAW MONSTER
        createMonster(monsterOriginX, monsterOriginY);
    }

    // MAIN ANIMATION LOOP
    function animate(){
        requestAnimationFrame(animate);
        updateMonster();
    }
    animate();
}
