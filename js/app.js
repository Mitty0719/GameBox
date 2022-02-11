import { Game1 } from "./game-1.js";

class App{
    constructor(){
        this.gameIndex = 0; // 0 : unSelect

        this.init();
    }

    init(){
        const gameList = document.querySelector('.game-list');
        gameList.addEventListener('click', this.selectGame.bind(this));
    }


    selectGame(e){
        this.gameIndex =  parseInt(e.target.getAttribute('data-game-index'));

        if(this.gameIndex === 1){
            this.game = new Game1();
        }
    }
}

window.onload = () => {
    new App();
}