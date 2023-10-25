const layouts = [];
const usedBuffs = [];
const coreIds = [];

function init() {
	let links = document.getElementsByTagName("a");
	for (let i=0; i<links.length; i++) {
		if (links[i].dataset.coreId != undefined) {
			layouts.push(links[i]);
			if (!coreIds.includes(links[i].dataset.coreId)) {
				coreIds.push(links[i].dataset.coreId);
			}
		}
		if (links[i].dataset.buffs != undefined && links[i].dataset.buffs != "") {
			if (document.getElementById("buffbox").style.display != "initial") {
				document.getElementById("buffbox").style.display = "initial";
			}
			var currBuffs = links[i].dataset.buffs;
			if (typeof(currBuffs) == "string") {
				if (!usedBuffs.includes(currBuffs)) {
					usedBuffs.push(currBuffs);
				}
			} else {
				for (let k=0; k<links[i].dataset.buffs.length; k++) {
					if (!usedBuffs.includes(links[i].dataset.buffs[k])) {
						usedBuffs.push(links[i].dataset.buffs[k]);
					}
				}
			}
		}
	}
	if (layouts.length > 0) {
		for (let i=0; i<usedBuffs.length; i++) {
			document.getElementById("buffbox" + usedBuffs[i]).style.display = "initial";
		}
	}
	document.querySelector('#buffbox').onclick = function(ev) {
		if(ev.target.value) {
			magic(ev.target);
		}
	}
}

function magic(target) {
	if (target.checked) {
		var similar = document.getElementsByName(target.name);
		for (let i=0; i<similar.length; i++) {
			if (similar[i] == target) {
				continue;
			}
			similar[i].checked = false;
		}
	}
	var buffs = [];
	var inputs = document.getElementById("buffbox").getElementsByTagName("input");
	for (let i=0; i<inputs.length; i++) {
		if (inputs[i].checked) {
			buffs.push(inputs[i].value);
		}
	}
	for (let i=0; i<layouts.length; i++) {
		if (layouts[i].dataset.buffs != undefined) {
			var otherCoresWithSameId = similarCoreId(layouts[i].dataset.coreId);
			if (!otherCoresWithSameId) {
				continue;
			}
			var currBuffs = layouts[i].dataset.buffs;
			if (typeof(currBuffs) == "string") {
				currBuffs = [currBuffs];
			}
			if (buffs.sort().toString() == currBuffs.sort().toString()) {
				layouts[i].hidden = false;
			} else {
				layouts[i].hidden = true;
			}
		}
	}
	for (let i=0; i<coreIds.length; i++) {
		var allSimilarCoreIdsHidden = similarCoreIdsHidden(coreIds[i]);
		if (allSimilarCoreIdsHidden) {
			var layout = findMostAptlyMatchedLayout(coreIds[i], buffs);
			layout.hidden = false;
		}
	}
}

function similarCoreId(coreId) {
	var count = 0;
	for (let i=0; i<layouts.length; i++) {
		if (layouts[i].dataset.coreId == coreId) {
			count++;
		}
	}
	if (count >= 2) {
		return true;
	}
	return false;
}

function similarCoreIdsHidden(coreId) {
	var count = 0;
	for (let i=0; i<layouts.length; i++) {
		if (!layouts[i].hidden && layouts[i].dataset.coreId == coreId) {
			count++;
		}
	}
	if (count > 0) {
		return false;
	}
	return true;
}

function findMostAptlyMatchedLayout(coreId, buffs) {
	var sameIdLayouts = [];
	for (let i=0; i<layouts.length; i++) {
		if (layouts[i].dataset.coreId == coreId) {
			sameIdLayouts.push(layouts[i]);
		}
	}
	var mostMatchedIndex = -1;
	var mostMatches = -1;
	loop1:
	for (let i=0; i<sameIdLayouts.length; i++) {
		var currBuffs = sameIdLayouts[i].dataset.buffs;
		if (typeof(currBuffs == "string")) {
			currBuffs = [currBuffs];
		}
		var currMatches = 0;
		for (k=0; k<currBuffs.length; k++) {
			if (!buffs.includes(currBuffs[k])) {
				continue loop1;
			} else {
				currMatches++;
			}
		}
		if (currMatches > mostMatches) {
			mostMatchedIndex = i;
			mostMatches = currMatches;
		}
	}
	if (mostMatchedIndex == -1) {
		for (let i=0; i<sameIdLayouts.length; i++) {
			if (sameIdLayouts[i].dataset.buffs == "") {
				mostMatchedIndex = i;
				break;
			}
		}
	}
	return sameIdLayouts[mostMatchedIndex];
}

init();