export class PlayerBar{
    constructor(stageWidth, stageHeight, width, height){
        this.x = (stageWidth / 2) - (width / 2)
        this.y = stageHeight - height - 20; // 20은 여분값
        this.width = width;
        this.height = height;
        this.speed = 5;

        this.maxX = this.x + this.width;
        this.maxY = this.y + this.height;

        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        window.addEventListener('keydown', this.moveStart.bind(this));
        window.addEventListener('keyup', this.moveStop.bind(this));
    }

    draw(ctx){

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

    moveStart(e){
        console.log('hi');
        if(e.keyCode === 37 && !this.isKeyDown){
            this.keyInterval = setInterval(()=>{
                if(this.x <= 0){
                    return;
                }
                this.x -= this.speed;
                this.maxX = this.x + this.width;
            }, 10)
            this.isKeyDown = true;
        }else if(e.keyCode === 39 && !this.isKeyDown){
            this.keyInterval = setInterval(()=>{
                if(this.maxX >= this.stageWidth){
                    return;
                }
                this.x += this.speed;
                this.maxX = this.x + this.width;
            }, 10)
            this.isKeyDown = true;
        }
    }
    moveStop(e){
        clearInterval(this.keyInterval);
        this.isKeyDown = false;
    }
}