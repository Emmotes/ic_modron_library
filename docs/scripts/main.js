const nondps = {
	active: (localStorage.modronicaShowNonDps == 1 ? true : false),
	storage: "modronicaShowNonDps",
	name: "Show Non-DPS Mode",
	nick: "damageTabNonDPS",
	description: "Lets the Damage tab on the main page display non-dps champions.",
	map: new Map()
};
const allModes = [];

function init() {
	var edit = !(document.location.pathname.includes("/modes.html"));
	updateModes(edit);
	
	if (!edit) {
		var list = document.getElementById(`modesList`);
		var contents = ``;
		for (let i = 0; i < allModes.length; i++) {
			var curr = allModes[i];
			contents += `<span class="modesColInner"><span class="modesRow"><span class="modesType"><input type="checkbox" class="modesCheckbox" id="${curr.nick}" name="${curr.nick}" onClick="toggleMode('${curr.nick}')"`+(curr.active?` checked`:``)+`><label for="${curr.nick}" class="modesLabel">${curr.name}</label></span><span class="modesDetails" id="${curr.nick}Details"><a onClick="modesDetails('${curr.nick}')" id="${curr.nick}Link">[show]</a></span></span><span class="modesContent" id="${curr.nick}Content" style="display:none;">&nbsp;</span></span>`;
		}
		list.innerHTML = contents;
	} else {
		nameEeggs();
		nixieBlueIt();
		window.addEventListener('hashchange',() =>{
			swapTab();
		});
		swapTab();
	}
}

function updateModes(edit) {
	var modes = `<br /><a href="modes.html">Modes</a>`;
	if (allModes.length == 0) {
		modes = ``;
	}
	for (let i = 0; i < allModes.length; i++) {
		var curr = allModes[i];
		if (curr.active) {
			modes += `<br />${curr.name} Active`;
			if (edit) {
				if (curr.nick = "damageTabNonDPS") {
					document.getElementById(curr.nick).hidden = false;
				}
			}
		} else {
			if (edit) {
				document.getElementById(curr.nick).hidden = true;
			}
		}
	}
	var element = document.getElementById("modes");
	element.innerHTML = modes;
}

function modesDetails(type) {
	for (let i=0; i<allModes.length; i++) {
		var curr = allModes[i];
		if (curr.nick != type) {
			continue;
		}
		var element = document.getElementById(`${curr.nick}Content`);
		var link = document.getElementById(`${curr.nick}Link`);
		if (link.innerHTML == "[show]") {
			var content = `<span class="modesContentRowHeader">${curr.description}</span>`;
			element.innerHTML = content;
			element.style.display = ``;
			link.innerHTML = `[hide]`;
		} else {
			element.innerHTML = `&nbsp;`;
			element.style.display = `none`;
			link.innerHTML = `[show]`;
		}
	}
}

function toggleMode(type) {
	for (let i=0; i<allModes.length; i++) {
		var curr = allModes[i];
		if (curr.nick != type) {
			continue;
		}
		var checked = document.getElementById(`${curr.nick}`).checked;
		if (checked) {
			localStorage[curr.storage] = 1;
			curr.active = true;
		} else {
			localStorage[curr.storage] = 0;
			curr.active = false;
		}
	}
	updateModes();
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

init();