'use strict'

whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const [windowType, currentURL] = message.split(" ");
  const isTriggeredByTab = currentURL.split("#is_triggered_by_tab#")[1] === ""

  if (currentURL !== undefined) {
    if (!isTriggeredByTab && windowType === "sidebar") {
      // View on active tab
      sendResponse("Sync complete from the sidebar to the active tab");
      whale.tabs.update({ url: currentURL, active: true }, tab => {});  
    } else {
      // View on sidebar 
      sendResponse("Sync complete from the active tab to the sidebar");
      whale.tabs.onUpdated.addListener((tabId, { url }, tab) => {
        whale.sidebarAction.show({ url: url + "#is_triggered_by_tab#", reload: false });
      });
    };
  };
});