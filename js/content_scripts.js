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

const getCurrentFontFamily = object => {
  return window.getComputedStyle(object, null).getPropertyValue('font-family');
};

const switchFont = fontName => {
  var body = document.getElementsByTagName('body')[0];
  var currentFont = getCurrentFontFamily(body);
  body.style.fontFamily = fontName + ", " + currentFont;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SWITCH_FONT" && currentFont !== request.fontName) {
    currentFont = request.fontName;
    loadFont(request.fontName);
    switchFont(request.fontName);
  }
});
