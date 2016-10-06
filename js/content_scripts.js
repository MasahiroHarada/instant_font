'use strict';

let loadedFontStore = [];
let currentFont = '';

const addLoadedFont = fontName => {
  loadedFontStore.push(fontName);
};

const findLoadedFontByName = fontName => {
  for (let i = 0; i < loadedFontStore.length; i++) {
    if (fontName === loadedFontStore[i]) {
      return true;
    }
  }
  return false;
};

const loadFont = fontName => {
  if (findLoadedFontByName(fontName)) return;
  WebFont.load({
    google: {
      families: [ fontName ]
    }
  });
  addLoadedFont(fontName);
};

const getOriginalFontFamily = object => {
  return window.getComputedStyle(object, null).getPropertyValue('font-family');
};

const switchFont = (fontName, target) => {
  const elements = document.getElementsByTagName(target.tagName);
  const font = '"' + fontName + '"' + (target.originalFont ? ', ' + target.originalFont : '');
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.fontFamily = font;
  }
};

const resetFont = target => {
  const elements = document.getElementsByTagName(target.tagName);
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.fontFamily = target.originalFont;
  }
};

const initSwitchTargets = function() {
  let res = [];
  const switchTargetElements = ['body', 'h1', 'h2', 'h3', 'h4', 'p'];
  for (let i = 0; i < switchTargetElements.length; i++) {
    res.push({
      tagName: switchTargetElements[i],
      originalFont: getOriginalFontFamily(
        document.getElementsByTagName(switchTargetElements[i])[0]
      ) || ''
    });
  }
  return res;
};
const switchTargets = initSwitchTargets();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "SWITCH_FONT":
      if (currentFont === request.fontName) return;
      currentFont = request.fontName;
      loadFont(request.fontName);
      for (let i = 0; i < switchTargets.length; i++) {
        switchFont(request.fontName, switchTargets[i]);
      }
      break;
    case "RESET_FONT":
      currentFont = '';
      for (let i = 0; i < switchTargets.length; i++) {
        resetFont(switchTargets[i]);
      }
      break;
  }
});
