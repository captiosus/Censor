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