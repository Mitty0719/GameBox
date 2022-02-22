const PI2 = Math.PI * 2;

export class Startship{
  constructor(stageWidth, stageHeight){
    this.radius = 10;
    this.sides = 3;
    this.angle = PI2 / this.sides;

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

    window.addEventListener('keydown', this.moveStart.bind(this));
    window.addEventListener('keyup', this.moveEnd.bind(this));
  }

  draw(ctx){
    ctx.save();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    for(let i = 0; i < this.sides; i++){
      const x = this.radius * Math.cos(this.angle * i) + this.x;
      const y = this.radius * Math.sin(this.angle * i) + this.y;
      if(i === 0){
        ctx.moveTo(x, y);
      }
      ctx.lineTo(x, y);
    }
    ctx.fill();
    ctx.restore();
  }
  moveStart(e){
    const code = e.keyCode;
    const key = this.keyInfo[code];
    if(key){
      if(!key.isDown){
        if(code === 37 || code === 39){
          key.keyInterval = setInterval(()=>{
            this.x += key.direction;
          }, 10);
        } else if(code === 38 || code === 40){
          key.keyInterval = setInterval(()=>{
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
}