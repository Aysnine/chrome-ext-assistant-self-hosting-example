import "./style.css";

document.getElementById("open-setting")?.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "OPEN_SETTING" });
});
