import { Block } from "./block.js";

export class blockRow{
    constructor(stageWidth, stageHeight, rowIndex)
    {
        this.rowIndex = rowIndex;
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.blockLength = 6;
        this.blocks = [];
        for(let i = 0; i < this.blockLength; i++){
            const block = new Block(this.stageWidth, this.stageHeight, this.rowIndex, i, this.blockLength, this.blocks);
            this.blocks[i] = block;
        }
    }
    draw(ctx){
        for(let i = 0; i < this.blocks.length; i++){
            this.blocks[i].draw(ctx);
        }
    }
}