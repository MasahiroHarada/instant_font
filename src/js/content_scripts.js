'use strict';

import FontManager from './FontManager';

const fontManager = new FontManager();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "SWITCH_FONT":
      onSwitchFont(request.fontName, request.selector);
      break;
    case "RESET_FONT":
      onResetFont();
      break;
  }
});

function onSwitchFont(font, selector) {
  if (fontManager.isSameFontBefore(font)) return;
  fontManager.currentFont = font;
  fontManager.load(font);
  fontManager.switch_(font, selector);
}

function onResetFont() {
  fontManager.initCurrentFont();
  fontManager.reset();
}
