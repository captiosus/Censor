var canvas = document.getElementById("index-drawings");
// letter documents are 220 x 170
canvas.width = 600;
canvas.height = 450;
var c = canvas.getContext("2d");

//draws text document
function text(){
c.beginPath();
c.strokeStyle = "#000000";
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
}

//draws a check
function check(){
c.beginPath();
c.strokeStyle= "#000000";
c.rect(0,88,600,275);
c.stroke();
c.closePath();

c.beginPath();
c.lineWidth=3;
c.rect(20,107.5,560,235)
c.stroke();
c.closePath();

c.font="bold 20px Courier";
c.fillText("145",520,132);
c.fillText("|:011300142+: 12345678||* 0101",40,328);
c.font="bold 16px Arial";
c.textAlign="center";
c.fillText("John Smith",140,140);
c.font="13px Arial"
c.fillText("123 Bacon Avenue",140,153);
c.fillText("New York, NY 10282",140,166);
c.textAlign="left";
c.font="11px Palatino";
c.fillText("DATE",370,171);

c.lineWidth=1;
c.moveTo(402,170.5);
c.lineTo(510,170.5);
c.stroke();

c.fillText("PAY TO THE",40,200);
c.fillText("ORDER OF",40,210);


c.moveTo(95,209.5);
c.lineTo(440,209.5);
c.stroke();
c.lineTo(440,195);
c.stroke();

c.fillText("MEMO",40,300);
c.moveTo(77,299.5);
c.lineTo(250,299.5);
c.stroke();
c.moveTo(310,299.5);
c.lineTo(566,299.5);
c.stroke();

c.font="22px Arial";
c.fillText("$",450,208);
c.strokeStyle="#DCDCDC";
c.rect(466,185,100,28);
c.stroke();

c.font="13px Palatino";
c.fillText("DOLLARS",455,240);
c.strokeStyle="#000000";
c.moveTo(452,239.5);
c.lineTo(40,239.5);
c.stroke();
}

check();