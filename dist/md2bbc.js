'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* Renderer for marked. Convert markdown to bbcode.
*/
(function () {
  'use strict';

  var DEFAULT_OPTIONS = {
    paragraphTag: 'div',
    tableAttr: '',
    tableAlign: true
  };

  function extend(obj, src) {
    for (var key in src) {
      if (!obj.hasOwnProperty(key)) {
        obj[key] = src[key];
      }
    }
    return obj;
  }

  var Renderer = (function () {
    function Renderer() {
      _classCallCheck(this, Renderer);

      this._options = {};
    }

    // Use getter and setter to hack options. Because marked directly set options
    // instead of passing in as constructor option.

    _createClass(Renderer, [{
      key: 'code',
      value: function code(_code) {
        return '[code]' + _code + '\n[/code]';
      }
    }, {
      key: 'blockquote',
      value: function blockquote(quote) {
        return '[quote]\n' + quote + '[/quote]\n';
      }
    }, {
      key: 'html',
      value: function html(_html) {
        return _html;
      }
    }, {
      key: 'heading',
      value: function heading(text, level) {
        if (level >= 3) {
          // BBCode only support heading up to level 3
          level = 3;
        }
        return '[h' + level + ']' + text + '[/h' + level + ']\n';
      }
    }, {
      key: 'hr',
      value: function hr() {
        return '[hr]\n';
      }
    }, {
      key: 'list',
      value: function list(body, ordered) {
        var type = ordered ? 'ol' : 'ul';
        return '[' + type + ']\n' + body + '[/' + type + ']\n';
      }
    }, {
      key: 'listitem',
      value: function listitem(text) {
        return '[li]' + text + '[/li]\n';
      }
    }, {
      key: 'paragraph',
      value: function paragraph(text) {
        if (this.options.paragraphTag === '') {
          // Empty string in options.paragraphTag. No tag is used
          return text + '\n';
        } else {
          return '[' + this.options.paragraphTag + ']' + text + '[/' + this.options.paragraphTag + ']\n';
        }
      }
    }, {
      key: 'table',
      value: function table(header, body) {
        var space = this.options.tableAttr ? ' ' : '';

        return '[table' + space + this.options.tableAttr + ']\n' + header + body + '[/table]\n';
      }
    }, {
      key: 'tablerow',
      value: function tablerow(content) {
        return '[tr]\n' + content + '[/tr]\n';
      }
    }, {
      key: 'tablecell',
      value: function tablecell(content, flags) {
        var type = flags.header ? 'th' : 'td';
        var tag = flags.align && this.options.tableAlign ? '[' + type + ' align=' + flags.align + ']' : '[' + type + ']';
        return '' + tag + content + '[/' + type + ']\n';
      }

      // span level renderer

    }, {
      key: 'strong',
      value: function strong(text) {
        return '[b]' + text + '[/b]';
      }
    }, {
      key: 'em',
      value: function em(text) {
        return '[i]' + text + '[/i]';
      }
    }, {
      key: 'codespan',
      value: function codespan(text) {
        return '[code]' + text + '[/code]';
      }
    }, {
      key: 'br',
      value: function br() {
        return '\n';
      }
    }, {
      key: 'del',
      value: function del(text) {
        return '[s]' + text + '[/s]';
      }
    }, {
      key: 'link',
      value: function link(href, title, text) {
        return '[url=' + href + ']' + text + '[/url]';
      }
    }, {
      key: 'image',
      value: function image(href) {
        return '[img=' + href + ']';
      }
    }, {
      key: 'text',
      value: function text(_text) {
        return _text;
      }
    }, {
      key: 'options',
      get: function get() {
        return this._options;
      },
      set: function set(value) {
        this._options = extend(value, DEFAULT_OPTIONS);
      }
    }]);

    return Renderer;
  })();

  // Exporting
  /* istanbul ignore else: Cannot use define and window in node.js */

  if (typeof module !== 'undefined' && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    exports = module.exports = Renderer;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return Renderer;
    });
  } else {
    window.md2bbc = Renderer;
  }
})();