import { Game1 } from "./game-1.js";

class App{
  constructor(){
    this.gameIndex = 0;
    this.gameItems = document.querySelectorAll('.game-list .game-item');

    window.addEventListener('keydown', this.keydown.bind(this));
  }

  startGame(){
    if(this.gameIndex === 0){
      this.game = new Game1();
    }
  }

  resize(){
  }

  keydown(e){
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
    } else if (e.keyCode === 32){ // 스페이스바
      this.startGame();
    }
  }
}

window.onload = () => {
  new App();
}