const ENEMY_TYPE = [
  {health: 5, size: 14, speed: 0.1, score: 100},
  {health: 8, size: 20, speed: 0.2, score: 200},
  {health: 2, size: 14, speed: 0.8, score: 300},
  {health: 13, size: 30, speed: 0.3, score: 300},
  {health: 18, size: 40, speed: 0.3, score: 400},
  {health: 20, size: 50, speed: 0.3, score: 500},
];
const SIDE_GAP = 30;

export class Enemy{
  constructor(stageWidth, stageHeight){
    const enemy = ENEMY_TYPE[Math.floor(Math.random() * ENEMY_TYPE.length)];
    this.x = SIDE_GAP + Math.floor(Math.random() * (stageWidth - SIDE_GAP * 2));
    this.y = 0 - enemy.size - 20; // gap : 20
    this.prevHealth = enemy.health;
    this.health = enemy.health;
    this.size = enemy.size;
    this.speed = enemy.speed;
    this.score = enemy.score;
  }

  draw(ctx){
    ctx.save();
    const healthRatio = this.health / this.prevHealth;
    ctx.fillStyle = `rgba(0, 0, 0, ${healthRatio})`;
    this.y += this.speed;
    ctx.fillRect(this.x, this.y, this.size, this.size);

    ctx.restore();
  }

  crashBall(canonball){
    if(canonball.x > this.x && canonball.x < this.x + this.size && canonball.y > this.y && canonball.y < this.y + this.size){
      this.health -= canonball.damage;
      return true;
    }
    return false;
  }
}