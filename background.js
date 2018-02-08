chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        file: "jquery.min.js"
    }, function() {
        if (chrome.runtime.lastError) {
            alert("you can't draw on the new tab pages or the Chrome Web Store. Please try to draw on other pages!");
        } else {
          chrome.tabs.executeScript(null, { file: "drawingoptions.js" }, function() {})
        }
    });
});
