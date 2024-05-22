const canvas1 = document.getElementById("canvas1");
let ctx1 = canvas1.getContext("2d");
canvas1.height = 300;
canvas1.width = 500;
canvas1.style.backgroundColor = "#769EEA";

const canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");
canvas2.height = 300;
canvas2.width = 500;
canvas2.style.backgroundColor = "#769EEA";

class Circle {
  constructor(x, y, radius, color, text, backcolor, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.backcolor = backcolor;
    this.speed = speed;
    this.dx = (Math.random() < 0.5 ? -1 : 1) * 0.5 * this.speed;
    this.dy = (Math.random() < 0.5 ? -1 : 1) * 0.5 * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.backcolor;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = this.color;
    context.stroke();
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 20px cursive";
    context.fillStyle = "white";
    context.fillText(this.text, this.posX, this.posY);
    context.closePath();
  }

  update(context, window_width, window_height, xId, yId) {
    this.draw(context);
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.posX += this.dx;
    this.posY += this.dy;

    document.getElementById(xId).innerText = this.posX.toFixed(1);
    document.getElementById(yId).innerText = this.posY.toFixed(1);
  }
}

let miCirculo1 = new Circle(150, 150, 30, "#656565", "X", "#FFCA47", 2);
let updateCircle1 = function () {
  requestAnimationFrame(updateCircle1);
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  miCirculo1.update(ctx1, canvas1.width, canvas1.height, 'xc1', 'yc1');
};
updateCircle1();

let circles = [];
const tbody = document.getElementById("table2").getElementsByTagName("tbody")[0];
for (let i = 0; i < 10; i++) {
  let randomRadius = Math.floor(Math.random() * 30 + 20);
  let randomX = randomRadius + Math.random() * (canvas2.width - 2 * randomRadius);
  let randomY = randomRadius + Math.random() * (canvas2.height - 2 * randomRadius);
  let randomBackcolor = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ", .4)";
  let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
  let circle = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i+1, randomBackcolor, Math.random() * 3 + 1);
  circles.push(circle);

  let row = tbody.insertRow();
  row.insertCell(0).innerText = i + 1;
  row.insertCell(1).id = `x${i+1}`;
  row.insertCell(2).id = `y${i+1}`;
}
let updateCircle2 = function () {
  requestAnimationFrame(updateCircle2);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  circles.forEach((circle, index) => {
    circle.update(ctx2, canvas2.width, canvas2.height, `x${index + 1}`, `y${index + 1}`);
  });
};
updateCircle2();
