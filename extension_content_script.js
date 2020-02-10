'use strict'
const isDeviceSyncApp = whale.runtime.getManifest().name === "Device Sync";

window.onload = e => {
  const prevURL = e.srcElement.referrer;
  const currentURL = e.currentTarget.location.href;
  const isURLChanged = prevURL !== currentURL;
  const splitArray = navigator.userAgent.split(" ");
  const windowType = splitArray[splitArray.length - 1];

  isDeviceSyncApp && isURLChanged && (
    whale.runtime.sendMessage({ windowType, currentURL, isDeviceSyncApp })
  );
};

window.onhashchange = e => {
  const prevURL = e.oldURL;
  const currentURL = e.newURL;
  const isURLChanged = prevURL !== currentURL;
  const splitArray = e.currentTarget.navigator.userAgent.split(" ");
  const windowType = splitArray[splitArray.length - 1];

  isDeviceSyncApp && isURLChanged && (
    whale.runtime.sendMessage({ windowType, currentURL, isDeviceSyncApp })
  );
};