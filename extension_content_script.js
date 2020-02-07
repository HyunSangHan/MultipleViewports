'use strict'

window.onload = e => {
  const prevURL = e.srcElement.referrer;
  const currentURL = e.currentTarget.location.href;
  prevURL !== currentURL && (
    whale.runtime.sendMessage(currentURL, response => {
      console.log(response);
    })
  )
}