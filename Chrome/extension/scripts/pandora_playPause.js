var playButton = document.getElementsByClassName("playButton")[0];
if (playButton.style.display === "block") {
    playButton.firstChild.click();
} else {
    var pauseButton = document.getElementsByClassName("pauseButton")[0];
    pauseButton.firstChild.click();
}
