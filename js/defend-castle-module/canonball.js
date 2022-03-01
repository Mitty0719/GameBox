export class Canonball{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.vy = 1;
    this.size = 0;
    this.sizeMax = 10;
    this.sizev = 0.1;
    this.damage = 0;
  }

  drawMake(ctx, x){
    if(this.size < this.sizeMax){
      this.size += this.sizev;
    }
    this.x = x;
    this.damage = Math.floor(this.size);
    console.log(this.damage);
    ctx.fillRect(this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size);
  }
  drawShot(ctx){
    this.y -= this.vy;
    ctx.fillRect(this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size);
  }
}