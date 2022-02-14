// Game 1 - Broke Block
import { Ball } from './module/ball.js'
import { PlayerBar } from './module/playerBar.js';
import { BlockGroup } from './module/blockGroup.js';
import { level1, level2, level3, level4, level5 } from './module/level.js';
export class Game1{
    constructor(){
        this.level = level5;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.resize();

        this.ball = new Ball(this.stageWidth, this.stageHeight, 20, 10 * this.level.ballSpeedRatio);
        this.playerBar = new PlayerBar(this.stageWidth, this.stageHeight, 300, 20);
        this.blockGroup = new BlockGroup(this.stageWidth, this.stageHeight, this.level);

        window.addEventListener('resize', this.resize.bind(this), false);

        requestAnimationFrame(this.animate.bind(this));

        setInterval(this.checkClear.bind(this), 1000);

        console.log(this.blockGroup);
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
    }

    animate(){
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.playerBar, this.blockGroup);
        this.playerBar.draw(this.ctx);
        this.blockGroup.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    }

    checkClear(){
        let blockCnt = 0;
        this.blockGroup.rows.forEach(row => {
            blockCnt += row.blocks.length;
        });

        if(blockCnt === 0){
            console.log('clear');
        }
    }

}