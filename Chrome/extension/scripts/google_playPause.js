var playingControls = document.getElementById("playing_controls");

var playingControlsMouseover = document.createEvent("MouseEvent");
playingControlsMouseover.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
playingControls.dispatchEvent(playingControlsMouseover);

var playPause = document.getElementById("playPause");

var playPauseMouseover = document.createEvent("MouseEvent");
playPauseMouseover.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
playingControls.dispatchEvent(playPauseMouseover);

var playPauseMouseDown = document.createEvent("MouseEvent");
playPauseMouseDown.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
playPause.dispatchEvent(playPauseMouseDown);

var playPauseMouseUp = document.createEvent("MouseEvent");
playPauseMouseUp.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
playPause.dispatchEvent(playPauseMouseUp);
