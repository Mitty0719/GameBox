const ENEMY_TYPE = [
  {health: 1, size: 10, speed: 0.1},
  {health: 2, size: 20, speed: 0.2},
  {health: 3, size: 30, speed: 0.1},
  {health: 4, size: 40, speed: 0.1},
  {health: 10, size: 100, speed: 0.1},
];

export class Enemy{
  constructor(stageWidth, stageHeight){
    const enemy = ENEMY_TYPE[Math.floor(Math.random() * ENEMY_TYPE.length)];
    this.x = Math.floor(Math.random() * stageWidth);
    this.y = 0 - enemy.size - 20; // gap : 20
    this.health = enemy.health;
    this.size = enemy.size;
    this.speed = enemy.speed;
  }

  draw(ctx){
    this.y += this.speed;
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  crashBall(canonball){
    this.health -= canonball.damage;
  }
}