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
      left: {
        isDown: false,
        keyInterval: null,
      },
      right: {
        isDown: false,
        keyInterval: null,
      },
      up: {
        isDown: false,
        keyInterval: null,
      },
      down: {
        isDown: false,
        keyInterval: null,
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
    if(e.keyCode === 37 && !this.keyInfo.left.isDown){ // 좌측 방향키
      this.keyInfo.left.keyInterval = setInterval(()=>{
        this.x -= this.speed;
      }, 10);
      this.keyInfo.left.isDown = true;
    }else if(e.keyCode === 38 && !this.keyInfo.up.isDown){ // 상측 방향키
      this.keyInfo.up.keyInterval = setInterval(()=>{
        this.y -= this.speed;
      }, 10);
      this.keyInfo.up.isDown = true;
    }else if(e.keyCode === 39 && !this.keyInfo.right.isDown){ // 우측 방향키
      this.keyInfo.right.keyInterval = setInterval(()=>{
        this.x += this.speed;
      }, 10);
      this.keyInfo.right.isDown = true;
    }else if(e.keyCode === 40 && !this.keyInfo.down.isDown){ // 하측 방향키
      this.keyInfo.down.keyInterval = setInterval(()=>{
        this.y += this.speed;
      }, 10);
      this.keyInfo.down.isDown = true;
    }
  }
  moveEnd(e){
    if(e.keyCode === 37){
      clearInterval(this.keyInfo.left.keyInterval);
      this.keyInfo.left.isDown = false;
    } else if(e.keyCode === 38){
      clearInterval(this.keyInfo.up.keyInterval);
      this.keyInfo.up.isDown = false;
    } else if(e.keyCode === 39){
      clearInterval(this.keyInfo.right.keyInterval);
      this.keyInfo.right.isDown = false;
    } else if(e.keyCode === 40){
      clearInterval(this.keyInfo.down.keyInterval);
      this.keyInfo.down.isDown = false;
    }
    
  }
}