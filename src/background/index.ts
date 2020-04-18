import customizeURL, { syncIgnore } from "./customizeURL";

interface Message {
  isFromSidebar: boolean;
  currentURL: string;
  isFromSyncApp: boolean;
}

const { tabs, sidebarAction, runtime } = whale;
let isSyncOn: boolean = false;
let prevDesktopURL: string = null;
let sidebarTabId: number = null;

sidebarAction.onClicked.addListener((result: any): void => {
  isSyncOn = result.opened;
  toggleBadge();

  if (isSyncOn) {
    tabs.getSelected(null, (tab: any): void => {
      const targetURL: string = tab.url;
      const customizedURL: string = customizeURL(targetURL, null);
      syncToMobile(customizedURL);
    });
  }
});

runtime.onMessage.addListener(
  (message: Message, sender: any, sendResponse: any): void => {
    if (isSyncOn) {
      const { isFromSidebar, currentURL, isFromSyncApp } = message;
      const targetURL: string = currentURL.split("#is_triggered_by_tab#")[0];
      const customizedURL: string = customizeURL(targetURL, isFromSidebar);
      console.log("t : " + targetURL);
      console.log("c : " + customizedURL);
      const isTriggeredByTab: boolean =
        currentURL.split("#is_triggered_by_tab#")[1] === "";
      const isURLChanged: boolean = prevDesktopURL !== customizedURL;

      if (isFromSyncApp && isFromSidebar && !sidebarTabId) {
        sidebarTabId = sender.tab.id;
      }

      const isBrowserSyncRequest: boolean = sidebarTabId === sender.tab.id;
      const isAsyncDone: boolean = true;
      sendResponse({ isBrowserSyncRequest, isAsyncDone });

      if (isURLChanged) {
        if (isBrowserSyncRequest && isFromSidebar && !isTriggeredByTab) {
          // View on active tab(Desktop)
          prevDesktopURL = customizedURL;
          syncToDesktop(customizedURL);
        } else if (!isFromSidebar) {
          // View on sidebar(Mobile)
          prevDesktopURL = targetURL;
          syncToMobile(customizedURL);
        }
      }
    }
  }
);

tabs.onUpdated.addListener((tabId, { url }): void => {
  if (isSyncOn) {
    const customizedURL: string = customizeURL(url, null);
    prevDesktopURL = url;
    customizedURL && syncToMobile(customizedURL);
  }
});

const syncToDesktop = (url: string): void => {
  tabs.update({ url, active: true });
};

const syncToMobile = (url: string): void => {
  let mobileTaggedURL = url;

  if (url.includes("m.vlive.tv/home")) {
    mobileTaggedURL = "https://m.vlive.tv/home";
  } else {
    mobileTaggedURL = url + "#is_triggered_by_tab#";
  }

  if (!syncIgnore.includes(url)) {
    sidebarAction.show({
      url: mobileTaggedURL,
      reload: false
    });
  }
};

const toggleBadge = (): void => {
  if (isSyncOn) {
    sidebarAction.setTitle({
      title: `Browser Sync 켜짐`
    });
    sidebarAction.setBadgeText({ text: "ON" });
    sidebarAction.setBadgeBackgroundColor({
      color: `#ff0000`
    });
  } else {
    sidebarAction.setTitle({
      title: `Browser Sync 꺼짐`
    });
    sidebarAction.setBadgeText({ text: "OFF" });
    sidebarAction.setBadgeBackgroundColor({
      color: `#aaaaaa`
    });
  }
};
