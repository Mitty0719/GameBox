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
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.fillText(`${this.rowIndex}-${this.index}`, this.x, this.y);
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

    remove(blockGroup){
        // 삭제 안됨 -> 고치기
        let removedBlocks = blockGroup.rows.filter(row => row.rowIndex === this.rowIndex).filter(block => block !== this);
        blockGroup.rows[0].blocks = removedBlocks;
    }
}