import { Canon } from "./defend-castle-module/canon.js";
import { Enemy } from "./defend-castle-module/enemy.js";

export class DefendCastle{
  constructor(stageWidth, stageHeight, showText){
    this.showText = showText;
    this.isFinish = false;

    this.canon = new Canon(stageWidth, stageHeight);
    this.enemys = new Set();
    this.score = 0;

    this.enemyIntId = setInterval(this.callEnemy.bind(this, stageWidth, stageHeight), 3000);
  }

  animate(ctx, stageWidth, stageHeight){
    if(this.isFinish){
      return;
    }
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.canon.draw(ctx);

    for(let enemy of this.enemys.values()){
      enemy.draw(ctx);
      for(let canonball of this.canon.canonballs.values()){
        if(enemy.crashBall(canonball)){
          this.canon.removeBall(canonball);
        }
        if(canonball.y + canonball.size < 0){
          this.canon.removeBall(canonball);
        }
      }
      if(enemy.y > stageHeight){
        this.showText(`GAMEOVER`, `score : ${this.score}`);
        this.isFinish = true;
        return;
      }
      this.removeEnemy(enemy);
    }
  }

  resize(){
    
  }

  callEnemy(stageWidth, stageHeight){
    const callCnt = Math.floor(this.score / 2000) + 1;
    // console.log(callCnt);
    for(let i = 0; i < callCnt; i++){
      this.enemys.add(new Enemy(stageWidth, stageHeight));
    }
  }

  removeEnemy(enemy){
    if(enemy.health <= 0){
      this.enemys.delete(enemy);
      this.score += enemy.score;
    }
  }
}