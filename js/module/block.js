export class Block{
    constructor(stageWidth, stageHeight, rowIndex, index, blockLength){
        this.gap = 10
        this.rowIndex = rowIndex;
        this.index = index;
        this.width = (stageWidth / blockLength) - (this.gap * 2);
        this.height = 40;
        this.resize(stageWidth, blockLength, index);
    }

    resize(stageWidth, blockLength, index){
        this.x = (stageWidth / blockLength * index) + this.gap;
        this.y = (this.gap * (this.rowIndex + 1)) + (this.height * this.rowIndex);

        this.maxX = this.x + this.width;
        this.maxY = this.y + this.height;
    }

    draw(ctx){
        ctx.fillStyle = '#555555';
        ctx.beginPath();
        // ctx.font = '16px serif'
        // ctx.fillText(`${this.rowIndex}-${this.index}`, this.x, this.y);
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

    remove(blockGroup){
        let removedBlocks = blockGroup.rows.filter(row => row.rowIndex === this.rowIndex)[0].blocks.filter(block => block.index !== this.index);
        blockGroup.rows[this.rowIndex].blocks = removedBlocks;
    }
}