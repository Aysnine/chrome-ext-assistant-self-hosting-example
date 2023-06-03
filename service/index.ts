// Test tab current page content permission
// And set popup guide if not permitted
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        func: () => 0,
      });

      await chrome.action.setPopup({ tabId, popup: "" });
    } catch (error) {
      await chrome.action.setPopup({ tabId, popup: "popup.html" });
    }
  }
});

// Listen action for popup or toggle content
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id === undefined) return;

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => 0,
  });

  chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_SIDEBAR" });
});
// rebound TOGGLE_SIDEBAR
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message?.type === "TOGGLE_SIDEBAR") {
    const tabId = sender.tab?.id;
    if (tabId) {
      chrome.tabs.sendMessage(tabId, message);
    }
  }
});

// Listen open inner page action
chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === "OPEN_SETTING") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("setting.html"),
    });
  }
});
