import { getRandomSignNum } from "../utils.js";

export class Dot{
  constructor(stageWidth, stageHeight, speed){
    this.signX = getRandomSignNum();
    this.signY = getRandomSignNum();

    this.width = 6;
    this.height = 6;
    this.gap = 50;
    this.startX = (this.signX > 0 ? stageWidth + this.gap : -this.gap) - (this.width / 2);
    this.endX = -(this.startX) + stageWidth;
    this.x = this.startX;
    this.y = (this.signY > 0 ? stageHeight + this.gap : -this.gap) - (this.height / 2);

    this.vx = Math.random() * speed * (this.signX * -1);
    this.vy = Math.random() * speed * (this.signY * -1);
  }

  draw(ctx){
    this.x += this.vx;
    this.y += this.vy;

    ctx.fillStyle='#000000';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  checkOut(){
    if(this.signX > 0){
      if(this.x < this.endX){
        return true;
      }
    } else {
      if(this.x > this.endX){
        return true;
      }
    }
    return false;
  }
}