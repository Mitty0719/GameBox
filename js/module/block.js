export class Block{
    constructor(stageWidth, stageHeight, rowIndex, index, blockLength){
        this.gap = 10
        this.rowIndex = rowIndex;
        this.index = index;
        this.width = (stageWidth / blockLength) - (this.gap * 2);
        this.height = 40;
        
        this.x = (stageWidth / blockLength * index) + this.gap;
        this.y = (this.gap * (rowIndex + 1)) + (this.height * rowIndex);

        this.maxX = this.x + this.width;
        this.maxY = this.y + this.height;
    }

    draw(ctx){
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

    remove(blockGroup){
        let removedBlocks = blockGroup.rows[this.rowIndex].blocks.filter(block => block !== this);
        blockGroup.rows[this.rowIndex].blocks = removedBlocks;
    }
}