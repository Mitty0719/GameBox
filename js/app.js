import { Game1 } from "./game-1.js";

class App{
    constructor(){
        this.gameIndex = 0; // 0 : unSelect

        this.init();
    }

    init(){
        const gameList = document.querySelector('.game-list');
        gameList.addEventListener('click', this.selectGame.bind(this));

        this.resize();

        window.addEventListener('resize', this.resize.bind(this), false);
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        if(this.gameIndex !== 0){
            this.canvas.width = this.stageWidth * 2;
            this.canvas.height = this.stageHeight * 2;
            this.ctx.scale(2, 2);
        }
    }

    selectGame(e){
        this.gameIndex =  e.target.getAttribute('data-game-index');

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.resize();
        switch(gameIndex){
            case 1:
                this.game = new Game1(this.ctx);
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
        }
    }
}

window.onload = () => {
    new App();
}