var playPause = document.getElementsByClassName("mp3MasterPlay")[0];
var playPauseMouseDown = document.createEvent("MouseEvent");
playPauseMouseDown.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
playPause.dispatchEvent(playPauseMouseDown);
