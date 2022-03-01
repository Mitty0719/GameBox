import { Canonball } from "./canonball.js";

export class Canon{
  constructor(stageWidth, stageHeight){
    this.width = 16;
    this.height = 16;
    this.radius = 8;
    this.x = stageWidth / 2;
    this.y = stageHeight - 10;
    this.canonballs = new Set();
    this.maxball = 2;

    this.keyInfo = {
      32: { // 스페이스바
        isDown: false,
        keyInterval: null
      }
    };

    window.addEventListener('keydown', this.shot.bind(this));
  }
  draw(ctx){
    // ctx.fillRect(10, 10, 10, 10);
    ctx.beginPath();
    ctx.moveTo(this.x - this.radius, this.y);
    ctx.lineTo(this.x , this.y - this.height);
    ctx.lineTo(this.x + this.radius, this.y);
    ctx.lineTo(this.x - this.radius, this.y);
    ctx.fill();

    for(let canonball of this.canonballs.values()){
      canonball.draw(ctx);
    }
    console.log(this.canonballs);
  }

  shot(){
    if(this.canonballs.size <= this.maxball){
      this.canonballs.add(new Canonball(this.x, this.y - this.height));
    }
  }
}