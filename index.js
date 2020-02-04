'use strict'

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    const div = document.createElement('div');
    div.innerHTML = `Hello!`
    document.body.appendChild(div);
    // moveTogether('https://mail.naver.com/');
  }
};

const moveTogether = (uri) => {
  window.location.href = uri;
  chrome.tabs.update({ url: uri, active: true }, tab => {});
}