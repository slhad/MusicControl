function init() {

	chrome.runtime.onMessageExternal.addListener(
		function (request, sender, sendResponse) {
		if (request) {
			if (request.action) {
				console.log(request.action);
				command(request.action);
			}
		}
	});

	sendExtensionId();
}

function sendExtensionId() {
	chrome.management.getAll(function (extensions) {
		extensions.forEach(function (extension) {

			if (extension.name == "Music Control Linker" &&
				extension.description == "Allows you to link your online music players with Music Control Extension") {
				chrome.runtime.sendMessage(extension.id, {
					id : chrome.runtime.id
				});
				console.log("send id extension to app");
			}
		});
	});

	setTimeout(sendExtensionId, 5000);
}

function command(action) {
	chrome.tabs.query({
		title : "*Google*Play*"
	}, function (tabs) {
		if (tabs && tabs.length > 0) {
			control("google", tabs[0].id, action);
		}
	});
	chrome.tabs.query({
		title : "Amazon Music Library"
	}, function (tabs) {
		if (tabs && tabs.length > 0) {
			control("amazon", tabs[0].id, action);
		}
	});
	chrome.tabs.query({
		title : "Pandora Internet Radio*"
	}, function (tabs) {
		if (tabs && tabs.length > 0) {
			control("pandora", tabs[0].id, action);
		}
	});
	chrome.tabs.query({
        url : "https://*.soundcloud.com/*"
	}, function (tabs) {
		if (tabs && tabs.length > 0) {
			control("soundcloud", tabs[0].id, action);
		}
	});
}

function control(player, tabId, action) {
	var file;
	if (action === "Play") {
		file = "playPause.js";
	} else if (action === "Next") {
		file = "next.js";
	} else if (action === "Previous") {
		file = "previous.js";
	}
	file = "scripts/" + player + "_" + file;
	chrome.tabs.executeScript(tabId, {
		file : file
	});
}
init();
