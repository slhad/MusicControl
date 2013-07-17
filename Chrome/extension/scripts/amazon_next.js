var next = document.getElementsByClassName("mp3PlayNext")[0];
var nextMouseDown = document.createEvent("MouseEvent");
nextMouseDown.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
next.dispatchEvent(nextMouseDown);
