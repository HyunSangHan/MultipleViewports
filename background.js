'use strict'

let prevURL = null;

whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const windowType = message.split(" ")[0];
  const isReLoaded = parseInt(message.split(" ")[1]);
  const currentURL = message.split(" ")[2];
  console.log(currentURL !== undefined + ", "+ prevURL !== currentURL)
  if (currentURL !== undefined && prevURL !== currentURL && isReLoaded ===0) {
    sendResponse(`${isReLoaded + 1}`);
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