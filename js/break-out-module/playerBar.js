export class PlayerBar{
    constructor(stageWidth, stageHeight){
      this.resize(stageWidth, stageHeight);

      window.addEventListener('keydown', (e)=>{
        this.moveStart(e, stageWidth);
      });
      window.addEventListener('keyup', this.moveStop.bind(this));
      this.keyInfo = {
        37: { // 좌
          isDown: false,
          keyInterval: null,
          direction: this.speed * (-1),
        },
        39: { // 우
          isDown: false,
          keyInterval: null,
          direction: this.speed,
        }
      }
    }

    draw(ctx){
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fill();
    }

    moveStart(e, stageWidth){
      const code = e.keyCode;
      const key = this.keyInfo[code];

      if(key){
        if(!key.isDown){
          key.keyInterval = setInterval(()=>{
            if(this.x < 0){
              this.x = 0;
              this.maxX = this.width;
              return;
            }
            if(this.maxX > stageWidth){
              this.x = stageWidth - this.width;
              this.maxX = stageWidth;
              return;
            }
            this.x += key.direction;
            this.maxX = this.x + this.width;
          }, 10);
        }
        key.isDown = true;

      }
    }
    moveStop(e){
      const code = e.keyCode;
      const key = this.keyInfo[code];
      if(key){
        clearInterval(key.keyInterval);
        key.isDown = false;
      }
    }
    resize(stageWidth, stageHeight){
        this.width = stageWidth / 3;
        this.height = 15;
        this.x = (stageWidth / 2) - (this.width / 2)
        this.y = stageHeight - this.height - 20;
        this.speed = 5;

        this.maxX = this.x + this.width;
        this.maxY = this.y + this.height;
    }
}