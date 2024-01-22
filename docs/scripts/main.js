var showNonDPS = false;
var apo = `’`;

function init() {
	if (localStorage.modronicaShowNonDps != undefined && localStorage.modronicaShowNonDps == 1) {
		showNonDPS = true;
	}
	showHideNonDPS();
	
	nameEeggs();
	nixieBlueIt();
	window.addEventListener('hashchange',() =>{
		swapTab();
	});
	swapTab();
}

function swapTab() {
	var hash = window.location.hash.substring(1);
	if (hash.startsWith(`faqsTab_`)) {
		hash = hash.substring(8);
		let ele = document.getElementById(hash);
		ele.scrollIntoView();
		hash = `faqsTab`;
		setHash(hash);
	} else if (hash != "" && document.getElementById(hash) != undefined) {
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

async function toggleNonDPS() {
	showNonDPS = !showNonDPS;
	await localStorage.setItem(`modronicaShowNonDps`, (showNonDPS ? 1 : 0));
	showHideNonDPS();
}

function showHideNonDPS() {
	var list = document.getElementsByTagName("a");
	for (let ele of list) {
		if (ele.innerHTML.includes(`class="championLink"`)) {
			ele.hidden = !showNonDPS;
		}
	}
	document.getElementById(`showHideNonDPSButton`).innerHTML = (showNonDPS ? `Hide` : `Show`) + ` Non-DPS`;
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