'use strict'

window.onload = e => {
  const prevURL = e.srcElement.referrer;
  const currentURL = e.currentTarget.location.href;
  const splitArray = navigator.userAgent.split(" ");
  const windowType = splitArray[splitArray.length - 1];

  prevURL !== currentURL && (
    whale.runtime.sendMessage(`${windowType} ${currentURL}`, response => {
      console.log(response);
    })
  );
};

window.onhashchange = e => {
  const prevURL = e.oldURL;
  const currentURL = e.newURL;
  const splitArray = e.currentTarget.navigator.userAgent.split(" ");
  const windowType = splitArray[splitArray.length - 1];

  prevURL !== currentURL && (
    whale.runtime.sendMessage(`${windowType} ${currentURL}`, response => {
      console.log(response);
    })
  );
};