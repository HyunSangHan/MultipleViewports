[확장앱스토어 바로가기 링크](https://store.whale.naver.com/detail/oebpjpinlkhmpegobkdfgojbngjhjgbg?hl=ko)

# Whale Extension - Browser Sync
PC와 Mobile의 브라우저 싱크를 맞춰 함께 보여주는 웨일 확장앱입니다.

![Browser Sync](https://github.com/HyunSangHan/WhaleBrowserSync/blob/master/static/img/browser_sync_motion.gif)

> 보고 있는 웹페이지가 모바일에서는 어떻게 보여지는지 궁금할 때...  
> PC버전과 모바일버전 UI를 번갈아 확인하기 위해 매번 개발자도구를 껐다켰다 하기 번거로울 때...  
> 반응형 웹(Responsive web)을 리서치해야할 때...

## 주요 기능
#### 페이지 이동 PC ⇔ Mobile 양방향 싱크 맞추기
- PC 버전(일반탭)에서 이루어지는 페이지 이동이 모바일 버전에도 반영됩니다.
- Mobile 버전(사이드바)에서 이루어지는 페이지 이동이 PC 버전에도 반영됩니다.
​
#### 앵커링 Mobile ⇒ PC 단방향 싱크 맞추기
- Hash URI를 이용해 앵커링 등을 구현한 경우 Mobile에서 PC로의 단방향 싱크를 지원합니다.

#### 브라우저 싱크 ON/OFF 전환
- PC ⇔ Mobile 자동 싱크가 작동되기를 원치 않는 상황에서는 OFF를 해두세요.(탭아이콘에 OFF뱃지가 뜨는 상태에서는 싱크가 작동되지 않게 됩니다.)
​
​
## 지원범위
- 반응형웹은 기본적으로 모두 지원합니다!
- PC/Mobile 별개 버전으로 운영되는 서비스 중, 양방향(PC ⇔ Mobile) 리다이렉트를 지원하는 사이트 또한 모두 지원합니다!
- PC/Mobile 별개 버전으로 운영되는 서비스 중, 리다이렉트를 지원하지 않거나 단방향 리다이렉트만을 지원하는 사이트의 경우 싱크가 제대로 이루어지지 않을 수 있습니다.
  * 강제 양방향 싱크 처리를 해둔 사이트 : 네이버 메인/검색/쇼핑/페이/블로그/지식iN/플레이스/예약, 다음 메인/검색, 구글 검색, 유튜브, 페이스북 (네이버 블로그/지식iN의 일부 케이스에서 싱크가 실패할 수 있습니다.)
  * 이 외에도 강제 싱크 대상으로 등록되었으면 하는 사이트가 있다면 [Issue](https://github.com/HyunSangHan/WhaleBrowserSync/issues)에 남겨주시거나 background.js 내 `serviceDomains` 객체를 수정하여 [Pull Request](https://github.com/HyunSangHan/WhaleBrowserSync/pulls)해주세요.
​
​
## 참고사항 
- 업무상 편의를 위해 개인적 용도로 만들게 된 확장앱입니다. 저 말고도 IT업계 종사자분들이 유용하게 쓰실 수 있을 것 같아서 웨일 스토어에 배포했습니다.
- 브라우저 우측하단의 Pin 아이콘을 눌러 사이드바를 고정하면 더 편리하게 사용할 수 있습니다.
- `네이버알림` 확장앱을 함께 사용하실 때에는 내부 구현원리상 충돌이 일어날 수 있습니다. 이 경우, Browser Sync를 OFF하시면 충돌을 방지할 수 있습니다.