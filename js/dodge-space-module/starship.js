const PI2 = Math.PI * 2;

export class Startship{
  constructor(stageWidth, stageHeight){
    this.radius = 10;
    this.sides = 3;
    this.angle = PI2 / this.sides;
    this.rotate = 0;

    this.x = (stageWidth / 2) + (this.radius / 2);
    this.y = (stageHeight / 2) + (this.radius / 2);
    this.speed = 1;
    this.keyInfo = {
      37: { // 좌
        isDown: false,
        keyInterval: null,
        direction: this.speed * (-1),
      },
      38: { // 상
        isDown: false,
        keyInterval: null,
        direction: this.speed * (-1),
      },
      39: { // 우
        isDown: false,
        keyInterval: null,
        direction:  this.speed,
      },
      40: { // 하
        isDown: false,
        keyInterval: null,
        direction: this.speed,
      },
    }

    window.addEventListener('keydown', (e) => {
      this.moveStart(e, stageWidth, stageHeight);
    });
    window.addEventListener('keyup', this.moveEnd.bind(this));
  }

  draw(ctx){
    ctx.save();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.translate(this.x, this.y)
    this.rotate+= 0.1;
    ctx.rotate(this.rotate);
    for(let i = 0; i < this.sides; i++){
      const x = this.radius * Math.cos(this.angle * i);
      const y = this.radius * Math.sin(this.angle * i);
      if(i === 0){
        ctx.moveTo(x, y);
      }
      ctx.lineTo(x, y);
    }
    ctx.fill();
    ctx.restore();
  }
  moveStart(e, stageWidth, stageHeight){
    const code = e.keyCode;
    const key = this.keyInfo[code];
    if(key){
      if(!key.isDown){
        if(code === 37 || code === 39){
          key.keyInterval = setInterval(()=>{
            if(this.x < 0){
              this.x = 0; return;
            }
            if(this.x > stageWidth){
              this.x = stageWidth; return;
            }
            this.x += key.direction;
          }, 10);
        } else if(code === 38 || code === 40){
          key.keyInterval = setInterval(()=>{
            if(this.y < 0){
              this.y = 0; return;
            }
            if(this.y > stageHeight){
              this.y = stageHeight; return;
            }
            this.y += key.direction;
          }, 10);
        }
      }
      key.isDown = true;
    }
  }
  moveEnd(e){
    const code = e.keyCode;
    const key = this.keyInfo[code];
    if(key){
      clearInterval(key.keyInterval);
      key.isDown = false;
    }
  }

  clashDot(dots){
    const minX = this.x - (this.radius);
    const maxX = this.x + (this.radius);
    const minY = this.y - (this.radius);
    const maxY = this.y + (this.radius);

    for(let i = 0; i < dots.length; i++){
      const dot = dots[i];
      if((dot.x >= minX && dot.x <= maxX) && (dot.y >= minY && dot.y <= maxY)){
        return true;
      }
    }
    return false;
  }
}