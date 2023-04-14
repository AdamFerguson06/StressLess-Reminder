const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const timeEl = document.getElementById("time");

startBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "start" });
});

stopBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "stop" });
});

chrome.runtime.sendMessage({ action: "getTime" }, (response) => {
  if (response.time) {
    timeEl.textContent = response.time;
  } else {
    timeEl.textContent = "Not started";
  }
});
