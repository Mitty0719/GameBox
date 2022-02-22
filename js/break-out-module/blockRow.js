import { Block } from "./block.js";

export class blockRow{
    constructor(stageWidth, stageHeight, blocks, rowIndex)
    {
        this.rowIndex = rowIndex;
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.blocks = [];
        for(let i = 0; i < blocks.length; i++){
            if(blocks[i] === 1){
              const block = new Block(this.stageWidth, this.rowIndex, i, blocks.length, false);
              this.blocks[i] = block;
            }else{
              const block = new Block(this.stageWidth, this.rowIndex, i, blocks.length, true);
              this.blocks[i] = block;
            }
        }
    }
    draw(ctx){
        for(let i = 0; i < this.blocks.length; i++){
            this.blocks[i].draw(ctx);
        }
    }
    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        for(let i = 0; i < this.blocks.length; i++){
            this.blocks[i].resize(stageWidth, stageHeight);
        }
    }
}