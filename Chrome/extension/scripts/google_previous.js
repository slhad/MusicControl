var playingControls = document.getElementById("playing_controls");

var playingControlsMouseover = document.createEvent("MouseEvent");
playingControlsMouseover.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
playingControls.dispatchEvent(playingControlsMouseover);

var rew = document.getElementById("rew");

var rewMouseover = document.createEvent("MouseEvent");
rewMouseover.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
rew.dispatchEvent(rewMouseover);

var rewMouseDown = document.createEvent("MouseEvent");
rewMouseDown.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
rew.dispatchEvent(rewMouseDown);

var rewMouseUp = document.createEvent("MouseEvent");
rewMouseUp.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
rew.dispatchEvent(rewMouseUp);
