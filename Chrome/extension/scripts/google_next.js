var playingControls = document.getElementById("playing_controls");

var playingControlsMouseover = document.createEvent("MouseEvent");
playingControlsMouseover.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
playingControls.dispatchEvent(playingControlsMouseover);

var ff = document.getElementById("ff");

var ffMouseover = document.createEvent("MouseEvent");
ffMouseover.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
ff.dispatchEvent(ffMouseover);

var ffMouseDown = document.createEvent("MouseEvent");
ffMouseDown.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
ff.dispatchEvent(ffMouseDown);

var ffMouseUp = document.createEvent("MouseEvent");
ffMouseUp.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
ff.dispatchEvent(ffMouseUp);
