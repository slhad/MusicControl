var playerMid = document.getElementsByClassName("material-player-middle");
//Fallback to old style if no material design
if (playerMid.length <= 0) {
    playerMid = document.getElementsByClassName("player-middle");
}
var indexButton = 3;
if (playerMid && playerMid[0] && playerMid[0].children[indexButton]) {
    playerMid[0].children[indexButton].click()
}