var canvas = document.getElementById("index-drawings");
// letter documents are 220 x 170
canvas.width = 600;
canvas.height = 450;

//draws text document
var c = canvas.getContext("2d");
c.beginPath();
c.strokeStyle= "#000000";
c.rect(130,5,340,440);
c.stroke();
c.font="20px Arial"
c.textAlign="center";
c.fillText("Classified Company",250,40);
c.closePath();
