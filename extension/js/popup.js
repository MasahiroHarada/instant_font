'use strict';

const switchFont = (fontName, selector) => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "SWITCH_FONT",
      fontName: fontName,
      selector: selector
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

const getSelectorInput = () => {
  const input = document.getElementById('selector');
  return input.value;
};

const switchFontButton = document.getElementById('switch-font');
switchFontButton.addEventListener('click', () => {
  switchFont(getSelectedFontName(), getSelectorInput());
}, false);

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetFont, false);