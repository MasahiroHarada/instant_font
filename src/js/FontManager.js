'use strict';

import WebFont from 'webfontloader';
import OriginalFontCache from './OriginalFontCache';

export default class FontManager {

  constructor() {
    this.loadedFontStore = [];
    this.currentFont = '';
    this.originalFontCache = new OriginalFontCache();
  }

  initCurrentFont() {
    this.currentFont = '';
  }

  addLoadedFont(fontName) {
    this.loadedFontStore = [...this.loadedFontStore, fontName];
  }

  isLoaded(fontName) {
    return this.loadedFontStore.includes(fontName);
  }

  isSameFontBefore(fontName) {
    return this.currentFont === fontName;
  }

  load(fontName) {
    if (this.isLoaded(fontName)) return;
    WebFont.load({
      google: {
        families: [ fontName ]
      }
    });
    this.addLoadedFont(fontName);
  }

  switch_(fontName, selector) {
    const elements = document.querySelectorAll(selector);
    if (!elements) return;
    const originalFont = this.originalFontCache.get(selector);
    const font = this._getFontFamilyName(fontName, originalFont);
    this._applyFont(elements, font);
  }

  reset() {
    this.originalFontCache.store.forEach((val, key) => {
      const elements = document.querySelectorAll(key);
      if (!elements) return;
      this._applyFont(elements, val);
    });
  }

  _applyFont(elements, font) {
    elements.forEach(elem => elem.style.fontFamily = font);
  }

  _getFontFamilyName(fontName, originalFont) {
    const originalFontValue = originalFont ? `, ${originalFont}` : '';
    return `"${fontName}"${originalFontValue}`;
  }

}
