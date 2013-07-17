var previous = document.getElementsByClassName("mp3PlayPrevious")[0];
var previousMouseDown = document.createEvent("MouseEvent");
previousMouseDown.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
previous.dispatchEvent(previousMouseDown);
