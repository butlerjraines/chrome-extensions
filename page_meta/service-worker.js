
chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      //function: reddenPage
      files: ["getMetatags.js"],
    }) .then(() => console.log("injected script file"));
  }
});