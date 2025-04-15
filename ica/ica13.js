const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function rotate(x, y, sin, cos, reverse) {
  return {
    x: reverse ? x * cos + y * sin : x * cos - y * sin,
    y: reverse ? y * cos - x * sin : y * cos + x * sin,
  };
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) this.velX = -Math.abs(this.velX);
    if (this.x - this.size <= 0) this.velX = Math.abs(this.velX);
    if (this.y + this.size >= height) this.velY = -Math.abs(this.velY);
    if (this.y - this.size <= 0) this.velY = Math.abs(this.velY);

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          const pos0 = { x: 0, y: 0 };
          const pos1 = rotate(dx, dy, sin, cos, true);

          const vel0 = rotate(this.velX, this.velY, sin, cos, true);
          const vel1 = rotate(ball.velX, ball.velY, sin, cos, true);

          const vxTotal = vel0.x - vel1.x;
          vel0.x = vel1.x;
          vel1.x = vel1.x + vxTotal;

          const absV = Math.abs(vel0.x) + Math.abs(vel1.x);
          const overlap = this.size + ball.size - Math.abs(pos0.x - pos1.x);
          pos0.x += (vel0.x / absV) * overlap;
          pos1.x += (vel1.x / absV) * overlap;

          const pos0F = rotate(pos0.x, pos0.y, sin, cos, false);
          const pos1F = rotate(pos1.x, pos1.y, sin, cos, false);

          ball.x = this.x + pos1F.x;
          ball.y = this.y + pos1F.y;
          this.x = this.x + pos0F.x;
          this.y = this.y + pos0F.y;

          const vel0F = rotate(vel0.x, vel0.y, sin, cos, false);
          const vel1F = rotate(vel1.x, vel1.y, sin, cos, false);

          this.velX = vel0F.x;
          this.velY = vel0F.y;
          ball.velX = vel1F.x;
          ball.velY = vel1F.y;
        }
      }
    }
  }
}

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
