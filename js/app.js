import { BreakOut } from "./1.break-out.js";
import { DodgeSpace } from './2.dodge-space.js';
import { DefendCastle } from "./3.defend-castle.js";

class App{
  constructor(){
    this.isPlaying = false;
    this.gameIndex = 0;
    this.gameItems = document.querySelectorAll('.game-list .game-item');

    window.addEventListener('keydown', this.keydown.bind(this), false);
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
  }

  showText(text, subText){
    this.ctx.fillStyle = '#639a3d';
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.font = '18px "Press Start 2P"';
    this.ctx.fillStyle = '#000000';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(text, this.stageWidth / 2, this.stageHeight / 2);

    if(subText){
      this.ctx.save();
      this.ctx.font = '12px "Press Start 2P"';
      this.ctx.fillText(subText, this.stageWidth / 2, (this.stageHeight / 2) + 50);
      this.ctx.restore();
    }
  }

  startGame(){
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.querySelector('.screen').appendChild(this.canvas);
    
    if(this.gameIndex === 0){
      this.game = new BreakOut(this.stageWidth, this.stageHeight, this.showText.bind(this));
    }else if(this.gameIndex === 1){
      this.game = new DodgeSpace(this.stageWidth, this.stageHeight, this.showText.bind(this));
    }else if(this.gameIndex === 2){
      this.game = new DefendCastle(this.stageWidth, this.stageHeight, this.showText.bind(this));
    }

    this.isPlaying = true;
    this.resize();
    this.showText('GAME START!');

    setTimeout(()=>{
      this.reqId = requestAnimationFrame(this.animate.bind(this));
    }, 2000)
  }
  endGame(){
    document.querySelector('.screen').removeChild(this.canvas);
    this.ctx = null;
    this.canvas = null;
    cancelAnimationFrame(this.reqId);
    this.isPlaying = false;
  }

  animate(){
    this.reqId = requestAnimationFrame(this.animate.bind(this));
    this.game.animate(this.ctx, this.stageWidth, this.stageHeight);
    console.log('callAnimate');
  }

  resize(){
    this.stageWidth = 300;
    this.stageHeight = 500;
    if(this.isPlaying){
      this.canvas.width = this.stageWidth;
      this.canvas.height = this.stageHeight;
      // this.game.resize(this.stageWidth, this.stageHeight);
    }
  }

  keydown(e){
    // console.log(e.keyCode);
    if(e.keyCode === 38){ // 위쪽 방향키
      if(this.gameIndex > 0){
        this.gameItems[this.gameIndex--].classList.remove('selected');
        this.gameItems[this.gameIndex].classList.add('selected');
      }
    } else if (e.keyCode === 40){ // 아래쪽 방향키
      if(this.gameIndex < this.gameItems.length-1){
        this.gameItems[this.gameIndex++].classList.remove('selected');
        this.gameItems[this.gameIndex].classList.add('selected');
      }
    } else if (e.keyCode === 13){ // 엔터
      if(this.isPlaying){
        this.endGame();
      }else{
        this.startGame();
      }
    }
  }
}

window.onload = () => {
  new App();
}