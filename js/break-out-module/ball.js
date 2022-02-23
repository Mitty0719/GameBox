export class Ball{
    constructor(stageWidth, stageHeight, speed, scoreUp){
        // x, y 방향 속도
        this.vx = speed;
        this.vy = speed;
        this.size = 16;

        this.x = stageWidth / 2;
        this.y = stageHeight - 60; // 공 백

        this.scoreUp = scoreUp; // 점수 증가 함수
    }

    draw(ctx, stageWidth, stageHeight, playerBar, blockGroup){
        this.x += this.vx;
        this.y += this.vy;

        this.bounceWindow(stageWidth, stageHeight);
        this.bounceElem(playerBar);
        
        blockGroup.rows.forEach( row => {
            row.blocks.forEach( block => {
                this.bounceElem(block);
            });
        });

        ctx.fillStyle = '#000000';
        ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fill();
    }

    bounceWindow(stageWidth, stageHeight){
        const minX = 1;
        const maxX = stageWidth - this.size - 1;
        const minY = 1;
        const maxY = stageHeight - this.size - 1;

        if(this.x <= minX || this.x >= maxX){
            this.vx *= -1;
        }
        if(this.y <= minY){
            this.vy *= -1;
        }
    }

    bounceElem(elem){
      if(elem.isBroken){
        return;
      }
      const minX = elem.x - this.size;
      const maxX = elem.maxX;
      const minY = elem.y - this.size;
      const maxY = elem.maxY;

      if(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY){
          const x1 = Math.abs(minX - this.x);
          const x2 = Math.abs(this.x - maxX);
          const y1 = Math.abs(minY - this.y);
          const y2 = Math.abs(this.y - maxY);
          const min1 = Math.min(x1, x2);
          const min2 = Math.min(y1, y2);
          const min = Math.min(min1, min2);

          if(min === min1){
              this.vx *= -1;
          }else if(min === min2){
              this.vy *= -1;
          }

          // block이면 삭제
          if(elem.__proto__.constructor.name === 'Block'){
              elem.remove();
              this.scoreUp();
          }
          // playerBar
          if(elem.__proto__.constructor.name === 'PlayerBar'){
            if(elem.keyInfo[37].isDown){ // 좌측
              if(this.vx > 0){
                this.vx *= -1;
              }
            }
            if(elem.keyInfo[39].isDown){ // 우측
              if(this.vx < 0){
                this.vx *= -1;
              }
            }
          }
      }
    }
}