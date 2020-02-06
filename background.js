'use strict'

chrome.tabs.onUpdated.addListener((tabId, { url, reload }, tab) => {
  whale.sidebarAction.show({ url: url, reload: true });
});