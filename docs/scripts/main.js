function swapTab() {
	var hash = window.location.hash.substring(1);
	if (hash != "") {
		document.getElementById(hash).click();
	}
}

function setHash(hash) {
	hash = "#" + hash;
	if(history.replaceState) {
		history.replaceState(null, null, hash);
	} else {
		window.location.hash = hash;
	}
}

function ins(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function nameEeggs() {
    var dhani = "Dhani";
    dhani = ins(dhani, randInt(1,4), "'");
    document.getElementById("dhani").innerHTML = dhani;
    var laezel = "Laezel";
    laezel = ins(laezel, randInt(1,5), "'");
    document.getElementById("laezel").innerHTML = laezel;
    var totoro = "Torogar";
    if (randInt(1,8) == 7) {
        totoro = "Totoro";
    }
    document.getElementById("torogar").innerHTML = totoro;
}

function nixieBlueIt() {
    if (randInt(1,4) == 4) {
        document.getElementById("nixie").style.backgroundImage = "url(images/portraits/nixieBlue.png)";
    }
}

nameEeggs();
nixieBlueIt();
window.addEventListener('hashchange',() =>{
	swapTab();
});
swapTab();