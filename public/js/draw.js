//draws text document
function text(c, shift){
c.beginPath();
c.strokeStyle = "#000000";
c.rect(125 + shift,5,350,440);
c.stroke();

c.font="15px Arial";
c.textAlign="center";
c.fillText("Classified Corp.",300 + shift,40);

c.font="10px Arial";
c.textAlign="start";
c.fillText("John Smith",175 + shift,80);
c.fillText("123 Bacon Avenue",175 + shift,90);
c.fillText("New York, NY 10282",175 + shift,100);

c.font="8px Arial";
c.fillText("Dear Mr.Smith,",150 + shift,130);
for(var i=0;i<24;i++){
    c.fillText("blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah",160 + shift,143+10*i);
}
c.fillText("blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.",160 + shift,383);
c.fillText("Sincerely,",335 + shift,400);
c.font="10px Arial"
c.fillText("The Staff of Classified",335 + shift,413);
c.closePath();
}

//draws a check
function check(c){
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
c.closePath();
}

function passport(c, shift){
c.beginPath();
c.strokeStyle= "#000000";
c.rect(50 + shift,49,500,352);
c.stroke();
c.closePath();

c.font="bold 17px Georgia";
c.strokeStyle="#000099";
c.strokeText("UNITED STATES OF AMERICA",250 + shift,75);
c.font="bold 11px Arial";
c.fillStyle="#000099";
c.textAlign="center";
c.fillText("PASSPORT",165 + shift,73);
c.fillText("PASSEPORT",165 + shift,85);
c.fillText("PASAPORTE",165 + shift,97);
c.fillStyle="black";
c.textAlign="start";

c.strokeStyle="black";
c.font="8px Arial";
c.fillText("Type                            Code                                     Passport No.",250 + shift,88);
c.fillText("Surname",250 + shift,118);
c.fillText("Given Names",250 + shift,143);
c.fillText("Nationality",250 + shift,168);
c.fillText("Date of birth",250 + shift,193);
c.fillText("Place of birth",250 + shift,218);
c.fillText("Date of issue",250 + shift,243);
c.fillText("Date of expiration",250 + shift,268);
c.fillText("Endorsements",250 + shift,293);

c.font="bold 12px Arial";
c.fillText("P                   USA                    340007237",278 + shift,100);
c.fillText("SMITH",252 + shift,130);
c.fillText("JOHN",252 + shift,155);
c.fillText("UNITED STATES OF AMERICA",252 + shift,180);
c.fillText("20 FEB 1964",252 + shift,205);
c.fillText("New York, U.S.A",252 + shift,230);
c.fillText("21 FEB 2016",252 + shift,255);
c.fillText("20 FEB 2026",252 + shift,280);
c.fillText("SEE PAGE 27",265 + shift,305);

c.textAlign="center";
c.fillText("United States",485 + shift,255);
c.fillText("Department of State",485 + shift,265);
c.fillText("F",485 + shift,230);
c.font="8px Arial";
c.fillText("Authority",485 + shift,243);
c.fillText("Sex",485 + shift,218);

c.rect(105 + shift,125,125,165);
c.stroke

c.font="bold 30px Georgia";
c.textAlign="start";
c.strokeText("USA",460 + shift,313);

c.moveTo(50 + shift,320);
c.lineTo(550 + shift,320);
c.stroke();

c.textAlign="center";
c.font="bold 12px Arial";
c.fillText("P<USASMITH<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",300 + shift,350);
c.fillText("3400072374USA6402201M260220235478511890988765<<87392010234",300 + shift,365);
}

function draw(c) {
  check(c);
  text(c, 600);
  passport(c, 1200);
}