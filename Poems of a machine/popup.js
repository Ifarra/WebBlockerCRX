document.addEventListener('DOMContentLoaded', function () {
  const blockToggle = document.getElementById('blockToggle');

  blockToggle.addEventListener('change', function () {
    const blockingEnabled = blockToggle.checked;

    chrome.storage.local.set({ blockingEnabled });

    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(function (tab) {
        chrome.tabs.sendMessage(tab.id, { blockingEnabled });
        if (blockingEnabled) {
          injectScript();
        } else {
          removeScript(tab.id);
        }
      });
    });
  });

  chrome.storage.local.get('blockingEnabled', function (result) {
    blockToggle.checked = result.blockingEnabled || false;
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const injectButton = document.getElementById("injectButton");

  injectButton.addEventListener("click", function() {
    injectScript();
  });

  function injectScript() {
    chrome.tabs.executeScript({
      code: `
        const scriptMeh = \`
          function handleVisibilityChange() {
            if (!document.hasFocus() || document.visibilityState === "hidden") {
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
          window.addEventListener('blur', handleVisibilityChange, false);
        \`;

        const scriptGuh = document.createElement("script");
        scriptGuh.textContent = scriptMeh;
        scriptGuh.id = "visibilityChangeStuff";
        document.head.appendChild(scriptGuh);
      `
    });
  }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "closeTab") {
    chrome.tabs.remove(sender.tab.id);
  }
});

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
