export class Block{
    constructor(stageWidth, rowIndex, index, blockLength, isBroken){
        this.gap = 3;
        this.rowIndex = rowIndex;
        this.index = index;
        this.width = (stageWidth / blockLength) - (this.gap * 2);
        this.height = 20;
        this.blockLength = blockLength;
        this.isBroken = isBroken;
        this.resize(stageWidth);
    }

    resize(stageWidth){
        this.x = (stageWidth / this.blockLength * this.index) + this.gap;
        this.y = (this.gap * (this.rowIndex + 1)) + (this.height * this.rowIndex);

        this.width = (stageWidth / this.blockLength) - (this.gap * 2);
        this.height = 20;

        this.maxX = this.x + this.width;
        this.maxY = this.y + this.height;
    }

    draw(ctx){
      if(!this.isBroken){
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        // ctx.font = '16px serif'
        // ctx.fillText(`${this.rowIndex}-${this.index}`, this.x, this.y);
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
      }
    }

    remove(){
      this.isBroken = true;
    }
}