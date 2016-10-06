'use strict';

let loadedFontStore = [];
let currentFont;

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
  if (!findLoadedFontByName(fontName)) {
    WebFont.load({
      google: {
        families: [ fontName ]
      }
    });
    addLoadedFont(fontName);
  }
};

const getOriginalFontFamily = object => {
  return window.getComputedStyle(object, null).getPropertyValue('font-family');
};

const switchFont = (fontName, elementName) => {
  const elements = document.getElementsByTagName(elementName);
  const originalFont = getOriginalFontFamily(elements[0]);
  const elementsLength = elements.length;
  for (let i = 0; i < elementsLength; i++) {
    elements[i].style.fontFamily = fontName + (originalFont ? ", " + originalFont : '');
  }
};

const switchTargetElements = ['body', 'h1', 'h2', 'h3', 'h4', 'p'];
const switchTargetLength = switchTargetElements.length;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SWITCH_FONT" && currentFont !== request.fontName) {
    currentFont = request.fontName;
    loadFont(request.fontName);
    for (let i = 0; i < switchTargetLength; i++) {
      switchFont(request.fontName, switchTargetElements[i]);
    }
  }
});
