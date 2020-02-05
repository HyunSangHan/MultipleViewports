'use strict'

chrome.tabs.onUpdated.addListener((tabId, { url }, tab) => {
  whale.sidebarAction.show({ url });
});