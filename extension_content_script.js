'use strict'

window.onload = e => {
  const prevURL = e.srcElement.referrer;
  const currentURL = e.currentTarget.location.href;
  const splitArray = navigator.userAgent.split(" ");
  const windowType = splitArray[splitArray.length - 1];

  let isReloaded = 0;
  console.log(isReloaded)
  prevURL !== currentURL && (
    whale.runtime.sendMessage(`${windowType} ${isReloaded} ${currentURL}`, response => {
      console.log(response);
      isReloaded = parseInt(response);
      console.log("isReloaded before : " + isReloaded)
      console.log("isReloaded after  : " + parseInt(response))
    })
  )
}