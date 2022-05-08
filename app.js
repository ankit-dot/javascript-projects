const grid=document.querySelector('.grid');
let score=document.querySelector('.result');
const blockWidth=100;
const blockHeight=20;
let timerId;
let xDirection=-2;
let yDirection=2;

let result=0;

const userStart=[230,10]
const currentPosition=userStart;
const boardWidth=560;
const boardHeight=300;
const ballDiameter=20;

const ballStart=[270,40];
const ballCurrentPosition=ballStart;

class Block {
    constructor(xAxis,yAxis){
        this.bottomLeft=[xAxis,yAxis];
        this.bottomRight=[xAxis + blockWidth,yAxis];
        this.topLeft=[xAxis,yAxis+blockHeight];
        this.topRight=[xAxis+blockWidth,yAxis+blockHeight];
    }
}
const blocks=[
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]

function addBlocks(){
for(let i=0; i<blocks.length; i++){
  const block=document.createElement('div');
  block.classList.add('block');
  block.style.left= blocks[i].bottomLeft[0] +'px';
  block.style.bottom= blocks[i].bottomLeft[1] +'px';
  grid.appendChild(block);
}
}

addBlocks();

const user = document.createElement('div');
user.classList.add('user');
user.style.left=userStart[0] + 'px';
user.style.bottom=userStart[1] + 'px';
grid.appendChild(user);

function drawUser(){
    user.style.left=currentPosition[0] +'px';
    user.style.bottom=currentPosition[1] + 'px';

}

function drawBall(){
    ball.style.left=ballStart[0] +'px';
    ball.style.bottom=ballStart[1] +'px';
    
}

function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] >0){
            currentPosition[0] -= 10;
            drawUser();}
            break;
        case 'ArrowRight':
            if(currentPosition[0] < boardWidth - blockWidth ){
                currentPosition[0] += 10;
                drawUser();
            }
                break;
            }   
    }


 document.addEventListener('keydown', moveUser);


// creating ball

const ball=document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
drawBall();


function moveBall(){
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    
    drawBall();
    checkForCollisons();
}

  timerId=setInterval(moveBall,30);

  function checkForCollisons(){
         
      for(let i =0;i<blocks.length;i++){
          if(
             ( ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
             ( ballCurrentPosition[1]+ballDiameter > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1] )

              
          ){
              const allBlocks=Array.from(document.querySelectorAll('.block'));
              allBlocks[i].classList.remove('block');
              blocks.splice(i,1);
              changeDirection();
              result++;
              score.innerHTML=result;



              if(blocks.length===0){
                  score.innerHTML='YOU WIN';
                  clearInterval(timerId);
                  document.removeEventListener('keydown',moveUser);
              }
        



          }

      }


      


      if(
          ballCurrentPosition[0] >= boardWidth - ballDiameter ||
          ballCurrentPosition[1] >= boardHeight - ballDiameter ||
          ballCurrentPosition[0] <= 0
          ){
          changeDirection()
      }


      if((ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0]+blockWidth)&&
           (ballCurrentPosition[1]> currentPosition[1] && ballCurrentPosition[1]<currentPosition[1]+blockHeight)){
               changeDirection()
           }

      if(ballCurrentPosition[1] <= 0 ){
           clearInterval(timerId);
           score.innerHTML="you loose";
           document.removeEventListener('keydown',moveUser);
          
      }
     
  }

    function changeDirection(){
        if(xDirection===2 && yDirection ===2){
            yDirection=-2;
            return;
        }
        if(xDirection===2 && yDirection === -2){
            xDirection=-2;
            return;
        }
        if(xDirection===-2 && yDirection===2){
            xDirection=2;
            return;
        }
        if(xDirection===-2 && yDirection===-2){
            yDirection=2;
        }

    }
  