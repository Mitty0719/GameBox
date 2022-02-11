import { blockRow } from "./blockRow.js";

export class BlockGroup{
    constructor(stageWidth, stageHeight){
        this.firstRow = 3;
        this.rows = [];

        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        for(let i = 0; i < this.firstRow; i++){
            const row = new blockRow(this.stageWidth, this.stageHeight, i);
            this.rows[i] = row;
        }
    }
    draw(ctx){
        for(let i = 0; i < this.rows.length; i++){
            this.rows[i].draw(ctx);
        }
    }
}