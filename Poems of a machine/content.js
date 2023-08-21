function applyBlocking(blockingEnabled) {
  const allowedDomains = ['github.com'];
  const currentDomain = window.location.hostname;

  if (!allowedDomains.includes(currentDomain) && blockingEnabled) {
    document.documentElement.innerHTML = '';
  } 
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  applyBlocking(message.blockingEnabled);
});

chrome.storage.local.get('blockingEnabled', function (result) {
  applyBlocking(result.blockingEnabled);
});
