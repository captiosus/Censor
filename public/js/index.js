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
  repeat = setInterval(repeat_select, 7000);
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
function censor_boxes() {
  var selected_curr;
  for (var i = 0; i < selector.length; i++) {
    if (selector[i].style.backgroundColor == SELECTOR_SELECTED) {
      selected_curr = i;
    }
  }
  console.log(selected_curr);
  if (selected_curr === 2) {
    setTimeout(function() {
      passportBlacked(ctx, 1200);
    }, 500);
  }
  else if (selected_curr === 1) { 
    setTimeout(function() {
      textBlacked(ctx, 600);
    }, 500);
  }
  else {
    setTimeout(function() {
      checkBlacked(ctx, 0);
    }, 500);
  }
}

red_line.addEventListener("animationend", censor_boxes);
red_line.addEventListener("webkitAnimationEnd", censor_boxes);
red_line.addEventListener("oAnimationEnd", censor_boxes);
red_line.addEventListener("MSAnimationEnd", censor_boxes);

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
var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur ipsum at orci malesuada ultricies ac vitae diam. Maecenas accumsan fermentum nulla. Donec ut erat at sem rhoncus finibus a eu ex. Curabitur tellus metus, gravida nec dui nec, blandit posuere ligula. Nullam sed purus nec tellus malesuada condimentum. Pellentesque vel scelerisque dolor. Integer pellentesque commodo nibh, quis commodo ex interdum in. Etiam at sapien at justo posuere mattis. Sed id mattis nulla. Donec elementum tempus est quis malesuada. Proin molestie diam eget magna fermentum porttitor a vitae libero. Nunc eu volutpat tellus. Nam consequat lacinia magna. Nullam sed mattis lacus, id ornare augue. Pellentesque eu blandit nisi. Vestibulum consectetur, odio sit amet bibendum semper, elit lorem maximus dui, eu finibus libero odio sed ex. Phasellus placerat ultricies nulla in scelerisque. Vestibulum in arcu tristique, aliquam mauris vitae, efficitur nisi. Sed efficitur convallis dui, eget iaculis libero egestas ac. Etiam metus mauris, sollicitudin ac nunc ut, tempor ultrices sapien. Cras laoreet libero interdum volutpat accumsan. Suspendisse facilisis lacinia risus ut pharetra. Nulla facilisi. Vivamus pretium lectus erat, sit amet vulputate leo tristique eu. Ut elit nunc, facilisis et sollicitudin vel, aliquam id risus. Vestibulum nec fermentum libero. Mauris eu erat nec nisl vehicula aliquet. Aliquam tempor, leo eu cursus venenatis, risus mauris tempor turpis, sed dapibus dolor turpis ac urna. Praesent tincidunt, sapien sit amet tempus sodales, elit nunc sodales tortor, eget egestas nulla sapien sit amet sapien. Cras vitae varius elit, ac suscipit eros. Aenean sed odio libero. Duis auctor turpis eu mauris faucibus volutpat. Vestibulum vel sagittis leo, nec molestie mauris. Pellentesque sodales, est ut posuere vestibulum, sapien felis euismod lacus, nec porta odio tellus in tellus. Mauris gravida arcu efficitur erat finibus suscipit. Aenean et bibendum magna. Vivamus sed lobortis dui, vitae vehicula orci. Sed at enim at velit mattis suscipit et ac libero. Morbi a lacus velit. Aliquam nec purus placerat, rhoncus nulla vitae, ultricies nunc. Donec ac nisi laoreet, auctor odio id, lacinia arcu. Proin porta eget mauris sit amet condimentum. Nullam hendrerit tellus neque, vitae malesuada quam vehicula non. Phasellus ut pellentesque neque, et hendrerit tortor. Donec posuere mauris eget feugiat aliquet. Nullam id tortor sagittis, viverra sapien sagittis, cursus magna. Nullam ac commodo nisi, nec finibus turpis. Duis placerat, augue vel consectetur accumsan, lacus massa pulvinar orci, ac mollis dolor elit nec ante. Donec suscipit placerat metus sed fringilla. Nam rhoncus sagittis malesuada. Cras purus eros, dapibus accumsan rhoncus et, ullamcorper sit amet eros. Integer gravida mauris a tempor cursus. Vivamus auctor bibendum metus, non pulvinar nulla posuere sed. Cras commodo, enim id iaculis hendrerit, quam erat molestie felis, a dapibus orci metus ut ante. In hendrerit arcu sit amet massa euismod sagittis. Nunc accumsan, enim quis mattis ornare, ipsum dolor aliquet ipsum, quis auctor odio enim sed mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sagittis nibh eget consectetur pharetra. Ut luctus velit in metus auctor posuere"
var lorem_array = lorem.split(" ");
var string;
var count = 0;
var char_count;
for(var i=0;i<24;i++){
  string = "";
  char_count = 0;
  while(char_count + lorem_array[count].length+ 1< 77) {
    string += lorem_array[count] + " ";
    count++;
    char_count += lorem_array[count].length + 1;
  }
  if (i === 0) {
    c.fillText(string,170 + shift,143+10*i);
  }
  else {
    c.fillText(string,160 + shift,143+10*i);
  }
}
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
function checkBlacked(c, shift){
    c.beginPath();
    c.rect(78+shift,125,125,14);
    c.rect(78+shift,141,125,14);
    c.rect(78+shift,157,125,14);
    c.rect(65+shift,315,280,16);
    c.fill();
    c.stroke();
    c.closePath();
}
function passportBlacked(c, shift){
    c.beginPath();
    c.rect(428+shift,90,65,10);
    c.rect(90+shift,340,420,25);
    c.rect(252+shift,120,40,10);
    c.rect(252+shift,195,70,10);
    c.fill();
    c.stroke();
    c.closePath();
}
function textBlacked(c, shift){
    c.beginPath();
    c.rect(208+shift,166,110,7);
    c.rect(200+shift,73,30,7);
    c.rect(175+shift,83,100,7);
    c.rect(175+shift,93,100,7);
    c.rect(160+shift,306,45,7);
    c.rect(287+shift,337,145,7);
    c.rect(355+shift,405,80,9);
    c.fill();
    c.stroke();
    c.closePath();
}