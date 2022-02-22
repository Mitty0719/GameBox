import { getRandomSignNum } from "../utils.js";

export class Dot{
  constructor(stageWidth, stageHeight, speed){
    const signX = getRandomSignNum();
    const signY = getRandomSignNum();

    this.width = 6;
    this.height = 6;
    this.gap = 50;
    this.x = (signX > 0 ? stageWidth + this.gap : -this.gap) - (this.width / 2);
    this.y = (signY > 0 ? stageHeight + this.gap : -this.gap) - (this.height / 2);

    this.vx = Math.random() * speed * (signX * -1);
    this.vy = Math.random() * speed * (signY * -1);
  }

  draw(ctx){
    this.x += this.vx;
    this.y += this.vy;

    ctx.fillStyle='#000000';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    console.log(this.x, this.y, this.width, this.height);
  }
}