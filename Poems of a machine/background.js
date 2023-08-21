
// Listen for tab updates
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.storage.local.get('blockingEnabled', function (result) {
      const blockingEnabled = result.blockingEnabled || false;
      chrome.tabs.sendMessage(tabId, { blockingEnabled });
      if (blockingEnabled) {
        injectScript(tabId);
      } else {
        removeScript(tabId);
      }
    });
  }
});

function injectScript(tabId) {
  chrome.tabs.executeScript(tabId, {
    code: `
      const scriptCode = \`
        function handleVisibilityChange() {
          if (document.hidden) {
            document.body.innerHTML = '';
            alert('Page content deleted');
            document.documentElement.style.backgroundColor = "red";
            document.documentElement.style.fontSize = "100px";
            document.body.innerHTML = 'Error ronin is not responding, currently Dancing in the room Number 10884';
            deg=setTimeout(check,2000);
          } else {
            if (deg) {
              clearTimeout(deg);
            }
          }
        }
        document.addEventListener("visibilitychange", handleVisibilityChange, false);
      \`;

      const scriptTag = document.createElement("script");
      scriptTag.textContent = scriptCode;
      scriptTag.id = "visibilityChangeScript";
      document.head.appendChild(scriptTag);
    `
  });
}

function removeScript(tabId) {
  chrome.tabs.executeScript(tabId, {
    code: `
      const scriptTag = document.getElementById("visibilityChangeScript");
      if (scriptTag) {
        scriptTag.remove();
      }
    `
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "closeTab") {
    chrome.tabs.remove(sender.tab.id);
  }
});

