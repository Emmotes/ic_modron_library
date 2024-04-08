const v=1.0
var showNonDPS = false;
var showSpoilers = false;
var apo = `’`;
var ftab = `faqsTab`;

function init() {
	if (localStorage.modronicaShowNonDps != undefined && localStorage.modronicaShowNonDps == 1) {
		showNonDPS = true;
	}
	showHideNonDPS();
	if (localStorage.modronicaShowSpoilers != undefined && localStorage.modronicaShowSpoilers == 1) {
		showSpoilers = true;
	}
	showHideSpoilers();
	if (document.querySelectorAll('[data-spoiler="true"]').length==0) {
		document.getElementById(`showHideSpoilersButton`).parentNode.hidden = true;
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
	if (hash.startsWith(`${ftab}_`)) {
		document.getElementById(ftab).click();
		hash = hash.substring(8);
		document.getElementById(hash).scrollIntoView();
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
		showHideElement(ele);
	}
	document.getElementById(`showHideNonDPSButton`).innerHTML = (showNonDPS ? `Hide` : `Show`) + ` Non-DPS`;
}

async function toggleSpoilers() {
	showSpoilers = !showSpoilers;
	await localStorage.setItem(`modronicaShowSpoilers`, (showSpoilers ? 1 : 0 ));
	showHideSpoilers();
}

function showHideSpoilers() {
	var list = document.getElementsByTagName("a");
	for (let ele of list) {
		showHideElement(ele);
	}
	document.getElementById(`showHideSpoilersButton`).innerHTML = (showSpoilers ? `Hide` : `Show`) + ` Spoilers`;
}

function showHideElement(ele) {
	let isNonDPS = ele.innerHTML.includes(`class="championLink"`);
	let isSpoiler = ele.innerHTML.includes(`data-spoiler="true"`);
	if (!isNonDPS) { // DPS
		if (isSpoiler) ele.hidden = !showSpoilers;
		else return;
	} else { // nonDPS
		if (isSpoiler) ele.hidden = !(showNonDPS && showSpoilers);
		else ele.hidden = !showNonDPS;
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