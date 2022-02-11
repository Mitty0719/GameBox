export class PlayerBar{
    constructor(stageWidth, stageHeight, width, height){
        this.x = (stageWidth / 2) - (width / 2)
        this.y = stageHeight - height - 20; // 20은 여분값
        this.width = width;
        this.height = height;

        this.maxX = this.x + this.width;
        this.maxY = this.y + this.height;
    }

    draw(ctx){
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}