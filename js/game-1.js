// Game 1 - Broke Block
import { Ball } from './module/ball.js'
import { PlayerBar } from './module/playerBar.js';
import { BlockGroup } from './module/blockGroup.js';
import { level1, level2, level3, level4, level5 } from './module/level.js';
export class Game1{
  constructor(ctx, stageWidth, stageHeight){
    this.ctx = ctx;
    this.levelNum = 1;
    this.levelMax = 5;
    this.isAdjust = false; // 레벨 조정 체크값
    this.isStart = false; // 시작 텍스트 체크값

    this.adjustLevel();
    this.createElem(stageWidth, stageHeight);
    // console.log(stageWidth, stageHeight);

    setInterval(this.checkClear.bind(this), 1000);
  }

  resize(stageWidth, stageHeight){
    if(this.playerBar){
      this.playerBar.resize(stageWidth, stageHeight);
      this.blockGroup.resize(stageWidth, stageHeight);
    }
  }

  animate(stageWidth, stageHeight){
    // console.log(this.ball);
    if(this.ball.y > stageHeight && !this.isAdjust){
      this.showText('GAME OVER', stageWidth, stageHeight);
      return;
    }

    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.ball.draw(this.ctx, stageWidth, stageHeight, this.playerBar, this.blockGroup);
    this.playerBar.draw(this.ctx);
    this.blockGroup.draw(this.ctx);

    if(this.isAdjust){
      let text = `Level ${this.levelNum} Clear!`;

      if(this.isStart){
        text = `Level ${this.levelNum+1} Start!`;
      }
      this.showText(text, stageWidth, stageHeight);
    }
  }

  createElem(stageWidth, stageHeight){
    let overLevelBallSpeed = this.levelNum > this.levelMax ? 0.2 * this.levelNum : 1;
    this.ball = new Ball(stageWidth, stageHeight, 6 * this.level.ballSpeedRatio * overLevelBallSpeed);
    this.playerBar = new PlayerBar(stageWidth, stageHeight);
    this.blockGroup = new BlockGroup(stageWidth, stageHeight, this.level);
  }

  adjustLevel(){
    switch(this.levelNum){
        case 1: this.level = level1; break;
        case 2: this.level = level2; break;
        case 3: this.level = level3; break;
        case 4: this.level = level4; break;
        case 5: this.level = level5; break;
    }
  }

  showText(text, stageWidth, stageHeight){
    // console.log(text);
    this.ctx.fillStyle = '#639a3d';
    this.ctx.fillRect(0, 0, stageWidth, stageHeight);
    this.ctx.font = '24px "Press Start 2P"';
    this.ctx.fillStyle = '#000000';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(text, stageWidth/2, stageHeight/2);
  }

  checkClear(){
    let blockCnt = 0;
    for(let i = 0; i < this.blockGroup.rows.length; i++){
      for(let j = 0; j < this.blockGroup.rows[i].blocks.length; j++){
        if(this.blockGroup.rows[i].blocks[j].isBroken === false){
          blockCnt++;
        }
      }
    }

    if(blockCnt === 0 && !this.isAdjust){
      this.isAdjust = true;
      setTimeout(()=>{
          this.isStart = true;
      }, 2000)

      setTimeout(()=>{
          this.levelNum++;
          this.adjustLevel();
          this.createElem();
          this.isAdjust = false;
          this.isStart = false;
      }, 4000)
    }
  }

}