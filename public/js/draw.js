var canvas = document.getElementById("index-drawings");
// letter documents are 220 x 170
canvas.width = 600;
canvas.height = 450;

//draws text document
var c = canvas.getContext("2d");
c.beginPath();
c.strokeStyle= "#000000";
c.rect(172,60,225,330);
c.stroke();
c.closePath();
