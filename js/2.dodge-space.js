import { Dot } from "./dodge-space-module/dot.js";
import { Startship } from "./dodge-space-module/starship.js";

export class DodgeSpace{
  constructor(stageWidth, stageHeight, showText){
    this.startTime = new Date().getMilliseconds(); // 게임 시작 시간 (gameover시 시간계산)

    this.starship = new Startship(stageWidth, stageHeight);
    this.dots = [];
    this.dot = new Dot(stageWidth, stageHeight, 3);
    this.dots[0] = this.dot;

    this.isFinish = false;
    this.showText = showText;
  }
  animate(ctx, stageWidth, stageHeight){
    if(this.isFinish){
      return;
    }

    if(this.starship.clashDot(this.dots)){
      const timeScore = new Date().getMilliseconds() - this.startTime;
      this.showText(`GAMEOVER`, `score : ${timeScore}`);
      this.isFinish = true;
      return;
    }

    ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.starship.draw(ctx);
    this.dot.draw(ctx);
  }

}