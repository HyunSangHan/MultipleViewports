'use strict'

let prevURL = null;

whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const currentURL = message;
  console.log(currentURL !== undefined + ", "+ prevURL !== currentURL)
  if (currentURL !== undefined && prevURL !== currentURL) {
    sendResponse(`Sync complete!`);
    // View on sidebar 
    whale.sidebarAction.show({ url: currentURL, reload: false });
   // View on active tab
    // chrome.tabs.update({ url: currentURL, active: true }, tab => {});  
  };
});