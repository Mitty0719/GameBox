// Game 1 - Broke Block
import { Ball } from './module/ball.js'
import { PlayerBar } from './module/playerBar.js';
import { BlockGroup } from './module/blockGroup.js';
import { level1, level2, level3, level4, level5 } from './module/level.js';
export class Game1{
  constructor(){
    this.levelNum = 1;
    this.levelMax = 5;
    this.isAdjust = false; // 레벨 조정 체크값
    this.isStart = false; // 시작 텍스트 체크값
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.querySelector('.screen').appendChild(this.canvas);

    this.resize();

    this.adjustLevel();
    this.createElem();


    requestAnimationFrame(this.animate.bind(this));
    setInterval(this.checkClear.bind(this), 1000);

    window.addEventListener('resize', this.resize.bind(this), false);
  }

  resize(){
    this.stageWidth = 300;
    this.stageHeight = 500;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    if(this.playerBar !== undefined){
      this.playerBar.resize(this.stageWidth, this.stageHeight);
      this.blockGroup.resize(this.stageWidth, this.stageHeight);
    }
  }

  animate(){
    if(this.ball.y > this.stageHeight && !this.isAdjust){
      this.showText('GAME OVER');
      return;
    }
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.playerBar, this.blockGroup);
    this.playerBar.draw(this.ctx);
    this.blockGroup.draw(this.ctx);

    if(this.isAdjust){
      let text = `Level ${this.levelNum} Clear!`;

      if(this.isStart){
        text = `Level ${this.levelNum+1} Start!`;
      }
      
      this.showText(text);
    }

    requestAnimationFrame(this.animate.bind(this));

  }

  createElem(){
    let overLevelBallSpeed = this.levelNum > this.levelMax ? 0.2 * this.levelNum : 1;
    this.ball = new Ball(this.stageWidth, this.stageHeight, 6 * this.level.ballSpeedRatio * overLevelBallSpeed);
    this.playerBar = new PlayerBar(this.stageWidth, this.stageHeight);
    this.blockGroup = new BlockGroup(this.stageWidth, this.stageHeight, this.level);
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

  showText(text){
    console.log(text);
    this.ctx.fillStyle = '#639a3d';
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.font = '24px "Press Start 2P"';
    this.ctx.fillStyle = '#000000';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(text, this.stageWidth/2, this.stageHeight/2);
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