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
        monsterHead(50, canvas.height);
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

    function monsterHead(originX, originY){
        // SHADOW
        ctx.beginPath();
        ctx.fillStyle = '#872C42';
        ctx.moveTo(originX-50, originY);
        ctx.quadraticCurveTo(originX, monsterHeight, monsterWidth / 2 + originX / 5, monsterHeight);
        ctx.quadraticCurveTo(monsterWidth + originX, monsterHeight,  monsterWidth + originX , originY);
        ctx.fill();

        // HEAD
        ctx.beginPath();
        ctx.fillStyle = '#BA3C5B';
        ctx.moveTo(originX, originY);
        ctx.quadraticCurveTo(originX, monsterHeight, monsterWidth / 2 + originX / 5, monsterHeight);
        ctx.quadraticCurveTo(monsterWidth + originX, monsterHeight,  monsterWidth + originX , originY);
        ctx.fill();

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

    function drawMouth(originX, originY){
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(originX + monsterWidth/2, originY, 120,0,2*Math.PI);
        ctx.fill();
    }

    function drawEye(originX, originY, eyeRadius, pupilRadius){
        this.EyeX = originX;
        this.EyeY = originY;

        this.PupilX = 0;
        this.PupilY = 0;

        this.EyeRadius = eyeRadius;
        this.PupilRadius = pupilRadius;

        var pupilOffset = 1.2; /* TO OFFSET PUPIL FROM EDGE OF EYE BALL */

        // TOP LEFT
        if(mouseX < this.EyeX && mouseY < this.EyeY){
            let a = this.EyeY - mouseY;
            let b = this.EyeX - mouseX;
            let tan = a / b;
            let angle = Math.atan(tan);
            this.PupilY =  - Math.sin(angle) * (this.EyeRadius - this.PupilRadius * pupilOffset);
            this.PupilX =  - Math.cos(angle) * (this.EyeRadius - this.PupilRadius * pupilOffset);
        // TOP RIGHT
        }else if(mouseX > this.EyeX && mouseY < this.EyeY){
            let a = this.EyeY - mouseY;
            let b = mouseX - this.EyeX;
            let tan = a / b;
            let angle = Math.atan(tan);
            this.PupilY =  - Math.sin(angle) * (this.EyeRadius - this.PupilRadius * pupilOffset);
            this.PupilX = Math.cos(angle) * (this.EyeRadius - this.PupilRadius * pupilOffset);
        // BOTTOM RIGHT
        }else if(mouseX > this.EyeX && mouseY > this.EyeY){
            let a = mouseY - this.EyeY;
            let b = mouseX - this.EyeX;
            let tan = a / b;
            let angle = Math.atan(tan);
            this.PupilY = Math.sin(angle) * (this.EyeRadius - this.PupilRadius * pupilOffset);
            this.PupilX = Math.cos(angle) * (this.EyeRadius - this.PupilRadius * pupilOffset);
        // BOTTOM this.
        }else if(mouseX < this.EyeX && mouseY > this.EyeY){
            let a = mouseY - this.EyeY;
            let b = mouseX - this.EyeX;
            let tan = a / b;
            let angle = Math.atan(tan);
            this.PupilY = - Math.sin(angle) * (this.EyeRadius - this.PupilRadius * pupilOffset);
            this.PupilX = - Math.cos(angle) * (this.EyeRadius - this.PupilRadius * pupilOffset);
        }

        // SHADOW
        ctx.beginPath();
        ctx.fillStyle = '#872C42';
        ctx.arc(this.EyeX, this.EyeY + 15, this.EyeRadius,0,2*Math.PI);
        ctx.fill();

        // EYE BALL
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.EyeX, this.EyeY, this.EyeRadius,0,2*Math.PI);
        ctx.fill();

        // EYE PUPIL
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.EyeX + this.PupilX, this.EyeY + this.PupilY, this.PupilRadius, 0, 2 * Math.PI);
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
        monsterHead(monsterOriginX, monsterOriginY);
    }

    // MAIN ANIMATION LOOP
    function animate(){
        requestAnimationFrame(animate);
        updateMonster();
    }
    animate();
}
