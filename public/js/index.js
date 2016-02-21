var SELECTOR_COLOR = "transparent";
var SELECTOR_SELECTED = "rgb(222, 86, 75)";

var scan = document.getElementById("start-scan");
var scan_line = document.getElementById("scan-line");
var red_line = document.getElementById("red-line");
var selector = document.getElementsByClassName("selector-circle");

scan.addEventListener("mouseover", function(e) {
  e.preventDefault();
  scan_line.style.display = "inline-block";
  scan_line.classList.add("scan-line-anim");
});
scan.addEventListener("mouseout", function(e) {
  e.preventDefault();
  scan_line.style.display = "none";
  scan_line.classList.remove("scan-line-anim");
});

var canvas = document.getElementById("index-drawings");
var ctx = canvas.getContext("2d");
var check_timeout;
red_line.style.marginLeft = canvas.offsetLeft + 1 + "px";
check_timeout = setTimeout(function() {
  red_line.style.display = "block";
  red_line.classList.add("check-line");
}, 1000);
draw(ctx);

var repeat = setInterval(repeat_select, 7000);

function repeat_select() {
  red_line.style.display = "none";
  red_line.classList.remove("passport-line");
  red_line.classList.remove("text-line");
  red_line.classList.remove("check-line");
  clearTimeout(check_timeout);
  if (!selected) {
    selected = true;
    var selected_curr;
    console.log(selector[0].style.backgroundColor);
    for (var i = 0; i < selector.length; i++) {
      if (selector[i].style.backgroundColor == SELECTOR_SELECTED) {
        selected_past = i;
        selected_curr = i + 1;
        selector[i].style.backgroundColor = SELECTOR_COLOR;
      }
    }
    if (selected_curr > 2) {
      selected_curr = 0;
    }
    selector[selected_curr].style.backgroundColor = SELECTOR_SELECTED;
    var add_class;
    if (selected_curr === 2) {
      red_line.style.height = "372px";
      red_line.style.marginTop = "39px";
      red_line.style.marginLeft = canvas.offsetLeft + 50 + "px";
      add_class = "passport-line";
    }
    else if (selected_curr === 1) {
      red_line.style.height = "460px";
      red_line.style.marginTop = "-5px";
      red_line.style.marginLeft = canvas.offsetLeft + 125 + "px";
      add_class = "text-line";
    }
    else {
      red_line.style.height = "295px";
      red_line.style.marginTop = "78px";
      red_line.style.marginLeft = canvas.offsetLeft + 1 + "px";
      add_class = "check-line";
    }
    var changed = 0;
    var target = 600 * (selected_curr - selected_past);
    change_amount = -10;
    if (target < 0) {
      change_amount*=-1;
      target*=-1;
    }
    var draw_interval = window.setInterval(function () {
      if (changed < target) {
        changed+=10;
        ctx.translate(change_amount, 0);
        draw(ctx);
      }
      else {
        selected = false;
        clearInterval(draw_interval);
        check_timeout = setTimeout(function() {
          red_line.style.display = "block";
          red_line.classList.add(add_class);
        }, 1000);
      }
    }, 5);
  }
}

var selected = false;
function selector_func() {
  red_line.style.display = "none";
  red_line.classList.remove("passport-line");
  red_line.classList.remove("text-line");
  red_line.classList.remove("check-line");
  clearTimeout(check_timeout);
  clearInterval(repeat);
  repeat = setInterval(repeat_select, 5000);
  add_class = "";
  if (!selected) {
    selected = true;
    var selected_curr = (this.id).substr(9);
    var selected_past = 0;
    var add_class;
    if (selected_curr === "2") {
      red_line.style.height = "372px";
      red_line.style.marginTop = "39px";
      red_line.style.marginLeft = canvas.offsetLeft + 50 + "px";
      add_class = "passport-line";
    }
    else if (selected_curr === "1") {
      red_line.style.height = "460px";
      red_line.style.marginTop = "-5px";
      red_line.style.marginLeft = canvas.offsetLeft + 125 + "px";
      add_class = "text-line";
    }
    else {
      red_line.style.height = "295px";
      red_line.style.marginTop = "78px";
      red_line.style.marginLeft = canvas.offsetLeft + 1 + "px";
      add_class = "check-line";
    }
    var i;
    for (i = 0; i < selector.length; i++) {
      if (selector[i].style.backgroundColor == SELECTOR_SELECTED) {
        selector[i].style.backgroundColor = SELECTOR_COLOR;
        selected_past = (selector[i].id).substr(9);
      }
    }
    this.style.backgroundColor = SELECTOR_SELECTED;
    var changed = 0;
    var target = 600 * (selected_curr - selected_past);
    change_amount = -10;
    if (target < 0) {
      change_amount*=-1;
      target*=-1;
    }
    var draw_interval = window.setInterval(function () {
      if (changed < target) {
        changed+=10;
        ctx.translate(change_amount, 0);
        draw(ctx);
      }
      else {
        selected = false;
        clearInterval(draw_interval);
        check_timeout = setTimeout(function() {
          red_line.style.display = "block";
          red_line.classList.add(add_class);
        }, 1000);
      }
    }, 5);
  }
}

var i;
selector[0].style.backgroundColor = SELECTOR_SELECTED;
for (i = 0; i < selector.length; i++) {
  selector[i].addEventListener("click", selector_func);
}

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
function check(c, shift){
c.beginPath();
c.strokeStyle= "#000000";
c.rect(1 + shift,88,598,275);
c.stroke();
c.closePath();

c.beginPath();
c.lineWidth=3;
c.rect(20 + shift,107.5,560,235)
c.stroke();
c.closePath();

c.font="bold 20px Courier";
c.textAlign="left";
c.fillText("145",520 + shift,132);
c.fillText("|:011300142+: 12345678||* 0101", 40 + shift,328);
c.font="bold 16px Arial";
c.textAlign="center";
c.fillText("John Smith",140 + shift,140);
c.font="13px Arial"
c.fillText("123 Bacon Avenue",140 + shift,153);
c.fillText("New York, NY 10282",140 + shift,166);
c.textAlign="left";
c.font="11px Palatino";
c.fillText("DATE",370 + shift,171);

c.lineWidth=1;
c.moveTo(402 + shift,170.5);
c.lineTo(510 + shift,170.5);
c.stroke();

c.fillText("PAY TO THE",40 + shift,200);
c.fillText("ORDER OF",40 + shift,210);


c.moveTo(95 + shift,209.5);
c.lineTo(440 + shift,209.5);
c.stroke();
c.lineTo(440 + shift,195);
c.stroke();

c.fillText("MEMO",40 + shift,300);
c.moveTo(77 + shift,299.5);
c.lineTo(250 + shift,299.5);
c.stroke();
c.moveTo(310 + shift,299.5);
c.lineTo(566 + shift,299.5);
c.stroke();

c.font="22px Arial";
c.fillText("$",450 + shift,208);
c.strokeStyle="#DCDCDC";
c.rect(466 + shift,185,100,28);
c.stroke();

c.font="13px Palatino";
c.fillText("DOLLARS",455 + shift,240);
c.strokeStyle="#000000";
c.moveTo(452 + shift,239.5);
c.lineTo(40 + shift,239.5);
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
  c.clearRect(0, 0, 1800, 450);
  check(c, 0);
  text(c, 600);
  passport(c, 1200);
}