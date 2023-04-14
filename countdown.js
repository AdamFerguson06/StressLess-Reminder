document.addEventListener('DOMContentLoaded', function () {
    const countdownElement = document.getElementById('countdown');
  
    function updateCountdown() {
      chrome.storage.sync.get(['endTime'], function (result) {
        if (result.endTime) {
          const now = new Date().getTime();
          const distance = result.endTime - now;
  
          if (distance <= 0) {
            clearInterval(window.stressLessCountdownInterval);
            countdownElement.innerText = 'Time for a break!';
            chrome.browserAction.setPopup({ popup: 'break-reminder.html' });
            setTimeout(function () {
              chrome.browserAction.setPopup({ popup: 'popup.html' });
            }, 3000);
          } else {
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            countdownElement.innerText = minutes + 'm ' + seconds + 's';
          }
        }
      });
    }
  
    window.stressLessCountdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
  });
  