var canvas = document.getElementById("index-drawings");
canvas.width = 170;
canvas.height = 220;

var c = canvas.getContent("2d");
c.beginPath();
c.fillStyle(#000000);
c.moveTo(50,50);
c.lineTo(150,165);
c.lineTo(25,30);
c.fill();
c.stroke();
c.closePath();