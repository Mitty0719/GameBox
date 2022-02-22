import { Dot } from "./dodge-space-module/dot.js";
import { Startship } from "./dodge-space-module/starship.js";

export class DodgeSpace{
  constructor(stageWidth, stageHeight, showText){
    this.startTime = 0; // 게임 시작 시간 (gameover시 시간계산)

    this.starship = new Startship(stageWidth, stageHeight);
    this.dots = [];
    this.dot = new Dot(stageWidth, stageHeight, 3);
  }
  animate(ctx, stageWidth, stageHeight){
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.starship.draw(ctx);
    this.dot.draw(ctx);
  }

}