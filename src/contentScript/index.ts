const { storage, runtime } = whale;

const isFromSyncApp: boolean = runtime.getManifest().name === "Browser Sync";

window.onload = (e: any) => {
  const prevURL: string = e.srcElement.referrer;
  const currentURL: string = e.currentTarget.location.href;
  const isURLChanged: boolean = prevURL !== currentURL;
  const isFromSidebar: boolean =
    navigator.userAgent.split(" ").reverse()[0] === "sidebar";

  isURLChanged &&
    sendMessagePromise({ isFromSidebar, currentURL, isFromSyncApp })
      .then(isBrowserSyncRequest => {
        isFromSidebar &&
          isBrowserSyncRequest &&
          storage.local.get(["tooltip_closed"], result => {
            const isTooltipClosed = result.tooltip_closed;
            if (!isTooltipClosed) {
              makeTooltip();
            }
          });
      })
      .catch(err => console.log(err));
};

window.onhashchange = (e: any) => {
  const currentURL: string = e.newURL;
  const isFromSidebar: boolean =
    e.currentTarget.navigator.userAgent.split(" ").reverse()[0] === "sidebar";

  runtime.sendMessage({ isFromSidebar, currentURL, isFromSyncApp });
};

const sendMessagePromise = (currentStatus: object): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    runtime.sendMessage(currentStatus, response => {
      if (response.isAsyncDone) {
        resolve(response.isBrowserSyncRequest);
      } else {
        reject("Something is wrong!");
      }
    });
  });
};

const makeTooltip = (): void => {
  const div: HTMLElement = document.createElement("div");
  div.innerHTML = tooltipHTML;
  document.body.appendChild(div);

  const tooltip: HTMLElement = document.getElementById(
    "extension-help-tooltip"
  );
  const closeButton: HTMLElement = document.getElementById(
    "extension-help-tooltip-close-button"
  );

  closeButton.addEventListener("click", (): void => {
    tooltip.parentNode.removeChild(tooltip);
    storage.local.set({ tooltip_closed: true });
  });
};

const tooltipHTML: string = `
  <div id="extension-help-tooltip" style="
    position: fixed;
    z-index: 3000;
    bottom: 10px;
    right: 16px;
    text-align: right;
    width: auto;
    height: auto;
    border: none;
    color: #fff;
    background-color: #333;
    padding: 14px 22px;
    border-radius: 11px;
    font-family: 'Helvetica Neue', 'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', Dotum, 돋움, sans-serif;
    opacity: 0.9;">
    <div style="
      position: absolute;
      top: 55%;
      right: -16px;
      z-index: 2999;
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      border-left: 16px solid #333;
      width: 0;
      height: 0;">
    </div>
    <div style="font-size: 14px;">
    우측의 Pin 표시를 눌러 고정하시면 더 보기 편해요!
    </div>
    <div>
      <u id="extension-help-tooltip-close-button" style="font-size: 2px; text-align: right; font-weight: lighter; cursor: pointer;">
        알겠어요. 이제 그만 볼래요.
      </u>
    </div>
  </div>
`;
