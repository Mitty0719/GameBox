import { Canon } from "./defend-castle-module/canon.js";

export class DefendCastle{
  constructor(stageWidth, stageHeight, showText){

    this.canon = new Canon(stageWidth, stageHeight);
    this.enemys = [];
  }

  animate(ctx, stageWidth, stageHeight){
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.canon.draw(ctx);
  }

  resize(){
    
  }
}