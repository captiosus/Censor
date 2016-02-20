var SELECTOR_COLOR = "white";
var SELECTOR_SELECTED = "black";

var scan = document.getElementById("start-scan");
var scan_line = document.getElementById("scan-line");

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

ctx.rect(0, 0, 300, 300);
ctx.fill();

function selector_func() {
  var number = (this.id).substr(9);
  var selector = document.getElementsByClassName("selector-circle");
  var i;
  for (i = 0; i < selector.length; i++) {
    selector[i].style.backgroundColor = SELECTOR_COLOR;
  }
  this.style.backgroundColor = SELECTOR_SELECTED;
}

var selector = document.getElementsByClassName("selector-circle");
var i;
for (i = 0; i < selector.length; i++) {
  selector[i].addEventListener("click", selector_func);
}

