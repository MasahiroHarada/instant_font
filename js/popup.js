'use strict';

const switchFont = fontName => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "SWITCH_FONT",
      fontName: fontName
    });
  });
};

const resetFont = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "RESET_FONT"
    });
  });
};

const getSelectedFontName = () => {
  const selectBox = document.getElementById('fonts');
  return selectBox.options[selectBox.selectedIndex].value;
};

const switchFontButton = document.getElementById('switch-font');
switchFontButton.addEventListener('click', () => {
  switchFont(getSelectedFontName());
}, false);


const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetFont, false);