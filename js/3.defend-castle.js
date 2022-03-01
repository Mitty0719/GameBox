import { Canon } from "./defend-castle-module/canon.js";
import { Enemy } from "./defend-castle-module/enemy.js";

export class DefendCastle{
  constructor(stageWidth, stageHeight, showText){

    this.canon = new Canon(stageWidth, stageHeight);
    this.enemys = [];

    setInterval(this.callEnemy.bind(this, stageWidth, stageHeight), 1000);
  }

  animate(ctx, stageWidth, stageHeight){
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.canon.draw(ctx);

    for(let i = 0; i < this.enemys.length; i++){
      this.enemys[i].draw(ctx);
    }
  }

  resize(){
    
  }

  callEnemy(stageWidth, stageHeight){
    console.log(this.enemys);
    this.enemys[this.enemys.length] = new Enemy(stageWidth, stageHeight);
  }
}