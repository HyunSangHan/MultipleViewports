'use strict'

window.onhashchange = e => {
  // console.log( location.hash );
  // alert("ok wow");
  alert( e.oldURL, e.newURL );
  // if ( location.hash === "#pageX" ) {
  //     pageX();
  // }
}


document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    const div = document.createElement('div');
    div.innerHTML = `<a href="https://naver.com>네이버 바로가기</a>`
    document.body.appendChild(div);

    // chrome.tabs.onActivated.addListener((activeInfo) => {
    //   chrome.tabs.get(activeInfo.tabId, function(tab){
    //     console.log(tab.url);
    //     alert(tab.url)
    //   });
    // }); 

    // const div = document.createElement('div');
    // div.innerHTML = `Hello!`
    // document.body.appendChild(div);
    // moveTogether('https://www.naver.com/');



  }
};

const moveURL = (uri, triggeredBy) => {
  // triggeredBy !== "mobile" && ( 
    window.location.href = uri
  // );
  // triggeredBy === "desktop" && 
  chrome.tabs.update({ url: uri, active: true }, tab => {});  
}

const getURI = (event) => {
  const targetURI = event.target.getAttribute('href');
  alert(targetURI)
}