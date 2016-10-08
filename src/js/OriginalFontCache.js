'use strict';

export default class OriginalFontCache {

  constructor() {
    this.store = new Map();
  }

  get(selector) {
    if (this.store.has(selector)) {
      return this.store.get(selector);
    }

    const element = document.querySelector(selector);
    if (!element) return null;

    const originalFontFamily = this._getOriginalFontFamily(element);
    this.store.set(selector, originalFontFamily);
    return originalFontFamily;
  }

  _getOriginalFontFamily(element) {
    return window.getComputedStyle(element, null).getPropertyValue('font-family');
  }

}
