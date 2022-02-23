import { Dot } from "./dodge-space-module/dot.js";
import { Startship } from "./dodge-space-module/starship.js";

export class DodgeSpace{
  constructor(stageWidth, stageHeight, showText){
    this.startTime = Math.floor(Date.now() / 10); // 게임 시작 시간 (gameover시 시간계산)

    this.starship = new Startship(stageWidth, stageHeight);
    this.dots = [];
    this.makeDots(stageWidth, stageHeight);

    this.isFinish = false;
    this.showText = showText;

    this.gameSpeed = 3;
    this.timeScore = 0;
    setInterval(this.upSpeed.bind(this), 5000);
  }
  animate(ctx, stageWidth, stageHeight){
    if(this.isFinish){
      return;
    }

    if(this.starship.clashDot(this.dots)){
      const timeScore = Math.floor(Date.now() / 10) - this.startTime;
      this.showText(`GAMEOVER`, `score : ${timeScore}`);
      this.isFinish = true;
      return;
    }

    ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.starship.draw(ctx);

    for(let i = 0; i < this.dots.length; i++){
      this.dots[i].draw(ctx);
      if(this.dots[i].checkOut()){
        this.dots.splice(i, 1);
      }
    }
  }

  makeDots(stageWidth, stageHeight){
    this.dots = [];
    const makeDotId = setInterval(()=>{
      this.dots[this.dots.length] = new Dot(stageWidth, stageHeight, this.gameSpeed);
      if(this.isFinish){
        clearInterval(makeDotId);
      }
    }, 100);
  }

  upSpeed(){
    this.speed++;
  }

}