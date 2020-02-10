'use strict'

let isSyncOn = false;
let prevDesktopURL = null;
let sidebarTabId = null;

whale.sidebarAction.onClicked.addListener(result => {
  isSyncOn = result.opened;
  if (isSyncOn) {
    whale.sidebarAction.setTitle({
      title: `Device Sync 켜짐`
    });
    whale.sidebarAction.setBadgeText({text: "ON"});
    whale.sidebarAction.setBadgeBackgroundColor({
      color: `#ff0000`
    });
    // alert(whale.runtime.getManifest().name)
    whale.tabs.getSelected(null, function(tab) {
      // !sidebarTabId && ( sidebarTabId = tab.id ); // TODO: 현재탭ID가 들어가고 있음. 사이드바탭ID를 가져올 API사용 필요
      const targetURL = tab.url;
      const customizedURL = customizeURL(targetURL, null);
      whale.sidebarAction.show({ url: customizedURL + "#is_triggered_by_tab#", reload: false });
    });
  } else {
    whale.sidebarAction.setTitle({
      title: `Device Sync 꺼짐`
    });
    whale.sidebarAction.setBadgeText({text: "OFF"});
    whale.sidebarAction.setBadgeBackgroundColor({
      color: `#aaaaaa`
    });
  }
});

whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (isSyncOn) {
    const { windowType, currentURL, isDeviceSyncApp } = message;
    !sidebarTabId && isDeviceSyncApp && windowType === "sidebar" && ( sidebarTabId = sender.tab.id );
    const targetURL = currentURL.split("#is_triggered_by_tab#")[0];
    const isTriggeredByTab = currentURL.split("#is_triggered_by_tab#")[1] === "";
    const customizedURL = customizeURL(targetURL, windowType);
    if (targetURL !== undefined) {
      if (windowType === "sidebar" && !isTriggeredByTab && prevDesktopURL !== customizedURL && sidebarTabId === sender.tab.id) { // TODO: 로직 검증 필요
        // View on active tab
        prevDesktopURL = targetURL;
        whale.tabs.update({ url: customizedURL, active: true }, tab => {});
        return
      } else if (windowType !== "sidebar"){
        // View on sidebar 
        prevDesktopURL = targetURL;
        whale.sidebarAction.show({ url: customizedURL + "#is_triggered_by_tab#", reload: false });
        return
      };
    };
  }
});

whale.tabs.onUpdated.addListener((tabId, { url }, tab) => {
  if (isSyncOn) { // TODO: 로직 검증 필요
    const customizedURL = customizeURL(url, null);
    prevDesktopURL = url;
    url !== undefined && whale.sidebarAction.show({ url: customizedURL + "#is_triggered_by_tab#", reload: false });
  }
});

const serviceDomains = {
  "naver" : {
    "desktopHost" : "www.naver.com",
    "mobileHost" : "m.naver.com",
    "desktop" : "www.naver.com",
    "mobile" : "m.naver.com"
  },
  "naversearch" : {
    "desktopHost" : "search.naver.com",
    "mobileHost" : "m.search.naver.com",
    "desktop" : "search.naver.com",
    "mobile" : "m.search.naver.com"
  },
  "navershoppingsearch" : {
    "desktopHost" : "search.shopping.naver.com",
    "mobileHost" : "msearch.shopping.naver.com",
    "desktop" : "search.shopping.naver.com/search/all.nhn",
    "mobile" : "msearch.shopping.naver.com/search/all"
  },
  "naverplace" : {
    "desktopHost" : "store.naver.com",
    "mobileHost" : "m.place.naver.com",
    "desktop" : "store.naver.com/restaurants/detail?id=",
    "mobile" : "m.place.naver.com/restaurant/"
  },
  "naverreservation" : {
    "desktopHost" : "booking.naver.com",
    "mobileHost" : "m.booking.naver.com",
    "desktop" : "booking.naver.com",
    "mobile" : "m.booking.naver.com"
  },
  "naverblog" : {
    "desktopHost" : "blog.naver.com",
    "mobileHost" : "m.blog.naver.com",
    "desktop" : "blog.naver.com",
    "mobile" : "m.blog.naver.com"
  },
  "naverqna" : {
    "desktopHost" : "kin.naver.com",
    "mobileHost" : "m.kin.naver.com",
    "desktop" : "kin.naver.com",
    "mobile" : "m.kin.naver.com/mobile"
  },
  "naverpay" : {
    "desktopHost" : "order.pay.naver.com",
    "mobileHost" : "m.pay.naver.com",
    "desktop" : "order.pay.naver.com",
    "mobile" : "m.pay.naver.com/o"
  },
  "daum" : {
    "desktopHost" : "www.daum.net",
    "mobileHost" : "m.daum.net",
    "desktop" : "www.daum.net",
    "mobile" : "m.daum.net"
  },
  "daumsearch" : {
    "desktopHost" : "search.daum.net",
    "mobileHost" : "m.search.daum.net",
    "desktop" : "search.daum.net",
    "mobile" : "m.search.daum.net"
  },
  "coupang" : {
    "desktopHost" : "www.coupang.com",
    "mobileHost" : "m.coupang.com",
    "desktop" : "www.coupang.com",
    "mobile" : "m.coupang.com"
  },
  "facebook" : {
    "desktopHost" : "www.facebook.com",
    "mobileHost" : "m.facebook.com",
    "desktop" : "www.facebook.com",
    "mobile" : "m.facebook.com"
  },
  "youtube" : {
    "desktopHost" : "www.youtube.com",
    "mobileHost" : "m.youtube.com",
    "desktop" : "www.youtube.com",
    "mobile" : "m.youtube.com"
  }
}

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
      blogMobileURL && ( replacedURL = decodeURIComponent(blogMobileURL) );
    } else {
      replacedURL = url.replace(serviceDomains[service][from], serviceDomains[service][to]);
    }
  }
  return replacedURL;
}