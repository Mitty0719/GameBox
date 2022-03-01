export class Canonball{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.vy = 1;
    this.size = 0;
    this.sizeMax = 5;
    this.sizev = 0.1;
  }

  draw(ctx){
    if(this.size < this.sizeMax){
      this.size += this.sizev;
    }else{
      this.y -= this.vy;
    }
    ctx.fillRect(this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size);
  }
}