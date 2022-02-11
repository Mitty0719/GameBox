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

        window.addEventListener('keydown', this.addRow.bind(this));
    }
    draw(ctx){
        for(let i = 0; i < this.rows.length; i++){
            this.rows[i].draw(ctx);
        }
    }

    addRow(e){
        if(e.keyCode === 32){
            this.rows.forEach( row => {
                row.rowIndex += 1;
                row.blocks.forEach( block => {
                    block.rowIndex += 1;
                    block.resize(this.stageWidth, row.blockLength, block.index);
                });
            });

            const row = new blockRow(this.stageWidth, this.stageHeight, 0);
            this.rows[this.rows.length] = row;
            console.log(this.rows);
        }
    }

}