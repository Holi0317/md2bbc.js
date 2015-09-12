/*
* Renderer for marked. Convert markdown to bbcode.
* Full name is RendererBBCode.
*/
(function () {
  'use strict';

  function Renderer(options) {
    this.options = options || {};
  }

  Renderer.prototype.code = function (code) {
    return '[code]' +
    code +
    '\n[/code]';
  };

  Renderer.prototype.blockquote = function(quote) {
    return '[quote]\n' + quote + '[/quote]\n';
  };

  Renderer.prototype.html = function(html) {
    return html;
  };

  Renderer.prototype.heading = function(text, level, raw) {
    if (level <= 3) {
      // BBCode only support heading up to level 3
      level = 3;
    }
    return '[h' +
    level +
    ' id="' +
    this.options.headerPrefix +
    raw.toLowerCase().replace(/[^\w]+/g, '-') +
    '"]' +
    text +
    '[/h' +
    level +
    ']\n';
  };

  Renderer.prototype.hr = function() {
    return '[hr]\n';
  };

  Renderer.prototype.list = function(body, ordered) {
    var type = ordered ? 'ol' : 'ul';
    return '[' + type + ']\n' + body + '[/' + type + ']\n';
  };

  Renderer.prototype.listitem = function(text) {
    return '[li]' + text + '[/li]\n';
  };

  Renderer.prototype.paragraph = function(text) {
    return '[div]' + text + '[/div]\n';
  };

  Renderer.prototype.table = function(header, body) {
    return '[table]\n' +
    '[thead]\n' +
    header +
    '[/thead]\n' +
    '[tbody]\n' +
    body +
    '[/tbody]\n' +
    '[/table]\n';
  };

  Renderer.prototype.tablerow = function(content) {
    return '[tr]\n' + content + '[/tr]\n';
  };

  Renderer.prototype.tablecell = function(content, flags) {
    var type = flags.header ? 'th' : 'td';
    var tag = flags.align ?
    '[' + type + ' style="text-align:' + flags.align + '"]' :
    '[' + type + ']';
    return tag + content + '[/' + type + ']\n';
  };

  // span level renderer
  Renderer.prototype.strong = function(text) {
    return '[b]' + text + '[/b]';
  };

  Renderer.prototype.em = function(text) {
    return '[i]' + text + '[/i]';
  };

  Renderer.prototype.codespan = function(text) {
    return '[code]' + text + '[/code]';
  };

  Renderer.prototype.br = function() {
    return '';
  };

  Renderer.prototype.del = function(text) {
    return '[s]' + text + '[/s]';
  };

  Renderer.prototype.link = function(href, title, text) {
    if (this.options.sanitize) {
      var prot;
      try {
        prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
      } catch (e) {
        return '';
      }
      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
        return '';
      }
    }
    return '[url=' + href + ']' + text + '[/url]';
  };

  Renderer.prototype.image = function(href) {
    return '[img=' + href + ']';
  };

  Renderer.prototype.text = function(text) {
    return text;
  };

  // Exporting
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Renderer;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return Renderer; });
  } else {
    this.Renderer = Renderer;
  }

})();
