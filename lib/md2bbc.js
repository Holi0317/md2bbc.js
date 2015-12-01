/*
* Renderer for marked. Convert markdown to bbcode.
*/
(function () {
  'use strict';

  class Renderer {
    constructor (options) {
      this.options = options || {};
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
      return `[div]${text}[/div]\n`;
    }

    table (header, body) {
      return `[table width=98% broder=1]\n${header}${body}[/table]\n`
    }

    tablerow (content) {
      return `[tr]\n${content}[/tr]\n`;
    }

    tablecell (content, flags) {
      let type = flags.header ? 'th' : 'td';
      let tag = flags.align ?
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
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    exports = module.exports = Renderer;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return Renderer; });
  } else {
    window.md2bbc = Renderer;
  }

})();
