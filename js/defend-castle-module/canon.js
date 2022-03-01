import { Canonball } from "./canonball.js";

export class Canon{
  constructor(stageWidth, stageHeight){
    this.width = 16;
    this.height = 16;
    this.radius = 8;
    this.x = stageWidth / 2;
    this.y = stageHeight - 10;
    this.speed = 0.05;

    this.catchBall = null;
    this.canonballs = new Set();
    this.maxball = 10; // 최대 canonball 갯수
    this.betweenBall = 5; // ball 사이의 거리
    this.currentTime = 0;
    this.halfStageWidth = stageWidth / 2;

    this.keyInfo = {
      32: { // 스페이스바
        isDown: false,
        keyInterval: null
      }
    };

    window.addEventListener('keydown', this.makeBall.bind(this));
    window.addEventListener('keyup', this.shotBall.bind(this));
  }
  draw(ctx){
    this.currentTime += this.speed;
    this.x = this.halfStageWidth + Math.cos(this.currentTime) * 130;

    // ctx.fillRect(10, 10, 10, 10);
    ctx.beginPath();
    ctx.moveTo(this.x - this.radius, this.y);
    ctx.lineTo(this.x , this.y - this.height);
    ctx.lineTo(this.x + this.radius, this.y);
    ctx.lineTo(this.x - this.radius, this.y);
    ctx.fill();

    for(let canonball of this.canonballs.values()){
      if(this.catchBall === canonball){
        canonball.drawMake(ctx, this.x)
      }else{
        canonball.drawShot(ctx);
      }
    }
  }

  makeBall(){
    if(!this.keyInfo[32].isDown){
      if(this.canonballs.size <= this.maxball){
        this.catchBall = new Canonball(this.x, this.y - this.height - this.betweenBall)
        this.canonballs.add(this.catchBall);
      }
      this.keyInfo[32].isDown = true;
    }
  }
  shotBall(){
    this.catchBall = null;
    this.keyInfo[32].isDown = false;
  }
  removeBall(canonball){
    this.canonballs.delete(canonball);
  }
}