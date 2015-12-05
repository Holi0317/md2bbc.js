/*
* Renderer for marked. Convert markdown to bbcode.
*/
(function () {
  'use strict';

  const DEFAULT_OPTIONS = {
    paragraphTag: 'div',
    tableAttr: '',
    tableAlign: true
  };

  function extend(obj, src) {
    for (var key in src) {
      if (!obj.hasOwnProperty(key)){
        obj[key] = src[key];
      }
    }
    return obj;
  }

  class Renderer {
    constructor () {
      this._options = {};
    }

    // Use getter and setter to hack options. Because marked directly set options
    // instead of passing in as constructor option.
    get options() {
      return this._options;
    }

    set options(value) {
      this._options = extend(value, DEFAULT_OPTIONS);
    }

    code (code) {
      return `[code]${code}\n[/code]`;
    }

    blockquote (quote){
      return `[quote]\n${quote}[/quote]\n`;
    }

    html (html) {
      return html;
    }

    heading (text, level) {
      if (level >= 3) {
        // BBCode only support heading up to level 3
        level = 3;
      }
      return `[h${level}]${text}[/h${level}]\n`;
    }

    hr () {
      return '[hr]\n';
    }

    list (body, ordered) {
      let type = ordered ? 'ol' : 'ul';
      return `[${type}]\n${body}[/${type}]\n`;
    }

    listitem (text) {
      return `[li]${text}[/li]\n`;
    }

    paragraph (text) {
      if (this.options.paragraphTag === '') {
        // Empty string in options.paragraphTag. No tag is used
        return `${text}\n`;
      } else {
        return `[${this.options.paragraphTag}]${text}[/${this.options.paragraphTag}]\n`;
      }
    }

    table (header, body) {
      let space = (this.options.tableAttr) ? ' ' : '';

      return `[table${space}${this.options.tableAttr}]\n${header}${body}[/table]\n`
    }

    tablerow (content) {
      return `[tr]\n${content}[/tr]\n`;
    }

    tablecell (content, flags) {
      let type = flags.header ? 'th' : 'td';
      let tag = (flags.align && this.options.tableAlign) ?
      `[${type} align=${flags.align}]`:
      `[${type}]`;
      return `${tag}${content}[/${type}]\n`;
    }

    // span level renderer
    strong (text) {
      return `[b]${text}[/b]`;
    }

    em (text) {
      return `[i]${text}[/i]`;
    }

    codespan (text) {
      return `[code]${text}[/code]`;
    }

    br () {
      return '\n';
    }

    del (text) {
      return `[s]${text}[/s]`;
    }

    link (href, title, text) {
      return `[url=${href}]${text}[/url]`;
    }

    image (href) {
      return `[img=${href}]`;
    }

    text (text) {
      return text;
    }
  }

  // Exporting
  /* istanbul ignore else: Cannot use define and window in node.js */
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    exports = module.exports = Renderer;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return Renderer; });
  } else {
    window.md2bbc = Renderer;
  }

})();
