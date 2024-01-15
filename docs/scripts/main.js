const apo = `’`;

function init() {
	if(localStorage.modronicaShowNonDps != undefined) {
		localStorage.removeItem("modronicaShowNonDps");
	}
	
	nameEeggs();
	nixieBlueIt();
	window.addEventListener('hashchange',() =>{
		swapTab();
	});
	swapTab();
}

function swapTab() {
	var hash = window.location.hash.substring(1);
	if (hash != "" && document.getElementById(hash) != undefined) {
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
	var arr = document.querySelectorAll(".championLink,.championLinkDPS");
	for (let ele of arr) {
		var name = ele.innerHTML.trim();
		if (name.includes(apo)) {
			name = name.replaceAll(apo,"");
			let index = randInt(1,name.length-1);
			name = ins(name,index,apo);
		}
		if (name == "Torogar" || name == "Totoro") {
			name = randInt(1,8) == 7 ? "Totoro" : "Torogar";
		}
		ele.innerHTML = name;
	}
}

function nixieBlueIt() {
    if (randInt(1,4) == 4) {
        document.getElementById("nixie").style.backgroundImage = "url(images/portraits/nixieBlue.png)";
    }
}

init();