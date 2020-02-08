'use strict'

whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const [windowType, currentURL] = message.split(" ");
  if (currentURL !== undefined) {
    if (windowType === "sidebar") {
      // View on active tab
      sendResponse("Sync complete from the sidebar to the active tab");
      whale.tabs.update({ url: currentURL, active: true }, tab => {});  
    } else {
      // View on sidebar 
      sendResponse("Sync complete from the active tab to the sidebar");
      whale.tabs.onUpdated.addListener((tabId, { url }, tab) => {
        whale.sidebarAction.show({ url: url, reload: false });
      });
    };
  };
});