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

c.font="15px Arial";
c.textAlign="center";
c.fillText("Classified Corp.",300,40);

c.font="10px Arial";
c.textAlign="start";
c.fillText("John Smith",175,80);
c.fillText("123 Bacon Avenue",175,90);
c.fillText("New York, NY 10282",175,100);

c.font="8px Arial";
c.fillText("Dear Mr.Smith,",155,130);
for(var i=0;i<24;i++){
    c.fillText("blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah",165,143+10*i);
}
c.fillText("blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.",165,383);
c.fillText("Sincerely,",335,400);
c.font="10px Arial"
c.fillText("The Staff of Classified",335,413);
c.closePath();
