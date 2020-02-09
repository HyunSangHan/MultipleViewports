'use strict'

let prevDesktopURL = null;

whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const [windowType, currentURL] = message.split(" ");
  const targetURL = currentURL.split("#is_triggered_by_tab#")[0];
  const isTriggeredByTab = currentURL.split("#is_triggered_by_tab#")[1] === "";
  if (targetURL !== undefined) {
    if (windowType === "sidebar" && !isTriggeredByTab && prevDesktopURL !== customizeURL(targetURL, windowType)) {
      // View on active tab
      sendResponse("Sync complete from the sidebar to the active tab");
      prevDesktopURL = targetURL;
      whale.tabs.update({ url: customizeURL(targetURL, windowType), active: true }, tab => {});
      return
    } else if (windowType !== "sidebar"){
      // View on sidebar 
      sendResponse("Sync complete from the active tab to the sidebar");
      prevDesktopURL = targetURL;
      whale.sidebarAction.show({ url: customizeURL(targetURL, windowType) + "#is_triggered_by_tab#", reload: false });
      return
    };
  };
});

whale.tabs.onUpdated.addListener((tabId, { url }, tab) => {
  prevDesktopURL = url;
  url !== undefined && whale.sidebarAction.show({ url: customizeURL(url, null) + "#is_triggered_by_tab#", reload: false });
});

const parseURL = url => {
  if (url) {
    const parsedHost = url.split("/")[2];
    for (const service in serviceDomains) {
      if (serviceDomains[service]["desktopHost"] === parsedHost) return [service, "desktop", "mobile"]; // from desktop to mobile
      if (serviceDomains[service]["mobileHost"] == parsedHost) return [service, "mobile", "desktop"]; // from mobile to desktop
    }
  }
  return
}

const customizeURL = (url, type) => {
  const parsedURLInfo = parseURL(url);
  let replacedURL = url;
  if (parsedURLInfo) {
    const [service, from, to] = parsedURLInfo;
    if (type === "sidebar" && to === "mobile") {
      replacedURL = url;
    } else if (type !== "sidebar" && to === "desktop") { 
      replacedURL = url;
    } else if (service === "naverblog" && to === "desktop") { 
      const blogMobileURL = url.replace(serviceDomains[service][from], serviceDomains[service][to]).split("&proxyReferer=")[1];
      replacedURL = url.replace(serviceDomains[service][from], serviceDomains[service][to]);
      blogMobileURL && ( replacedURL = decodeURIComponent(blogMobileURL) )
    } else {
      replacedURL = url.replace(serviceDomains[service][from], serviceDomains[service][to]);
    }
  }
  return replacedURL;
}