'use strict'

let prevURL = null;

whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const [windowType, isReLoaded, currentURL] = message.split(" ");
  if (currentURL !== undefined && prevURL !== currentURL && parseInt(isReLoaded) === 0) {
    sendResponse(`${parseInt(isReLoaded) + 1}`);
    if (windowType === "sidebar") {
      // View on active tab
      whale.tabs.update({ url: currentURL, active: true }, tab => {});  
    } else {
      // View on sidebar 
      whale.tabs.onUpdated.addListener((tabId, { url }, tab) => {
        whale.sidebarAction.show({ url: url, reload: false });
      });
    }
  };
});