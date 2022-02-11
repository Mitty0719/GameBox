export class Ball{
    constructor(stageWidth, stageHeight, radius, speed){
        // x, y 방향 속도
        this.vx = speed;
        this.vy = speed;
        this.radius = radius;

        const diameter = radius * 2;

        this.x = stageWidth / 2;
        this.y = stageHeight - diameter - 20; // 20 공백
    }

    draw(ctx, stageWidth, stageHeight, playerBar){
        this.x += this.vx;
        this.y += this.vy;

        this.bounceWindow(stageWidth, stageHeight);
        this.bouncePlayerBar(playerBar);

        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    bounceWindow(stageWidth, stageHeight){
        const minX = this.radius;
        const maxX = stageWidth - this.radius;
        const minY = this.radius;
        const maxY = stageHeight - this.radius;

        if(this.x <= minX || this.x >= maxX){
            this.vx *= -1;
        }
        if(this.y <= minY || this.y >= maxY){
            this.vy *= -1;
        }
    }

    bouncePlayerBar(playerBar){
        const minX = playerBar.x - this.radius;
        const maxX = playerBar.maxX + this.radius;
        const minY = playerBar.y - this.radius;
        const maxY = playerBar.maxY + this.radius;

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
        }
    }
}