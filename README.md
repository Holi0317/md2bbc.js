# md2bbc.js
[![Build Status](https://img.shields.io/travis/Holi0317/md2bbc.js.svg?style=flat-square)](https://travis-ci.org/Holi0317/md2bbc.js)
[![Coverage](https://img.shields.io/codecov/c/github/Holi0317/md2bbc.js.svg?style=flat-square)](https://codecov.io/github/Holi0317/md2bbc.js?branch=master)

Markdown is cool. But forums only support bbcode.

Is there a way to use markdown in forum?

With this question, this tool is invented.

Plugin for [marked](https://github.com/chjj/marked) that convert markdown to bbcode.

## To Users
Hey! I am online and ready to use. Check the deployed version [here](https://holi0317.github.io/md2bbc-web).

## Install
`npm install --save md2bbc marked` if you are using node.js or browserify, or;

`bower install --save md2bbc marked` if you want to use this in browser.

This support node.js require, browserify, AMD(though I don't know how to use it) and `<script>`

## Usage
Node.js/browserify:
```javascript
var marked = require('marked');
var md2bbc = require('md2bbc');

console.log(marked('**Markdown** is awesome.', {
  renderer: new md2bbc()
}));

// Or, set default renderer to md2bbc
marked.setOptions({
  renderer: new md2bbc()
});
console.log(marked('**Markdown** is awesome.'));

// Both will log [div][b]Markdown[/b] is awesome.[/div]
```

Gulp (with [gulp-marked](https://www.npmjs.com/package/gulp-marked)):
```javascript
var marked = require('gulp-marked');
var md2bbc = require('md2bbc');

gulp.task('convert', function() {
  gulp.src('./src/*.md')
    .pipe(marked({
        renderer: new md2bbc()
        // Other options
    }))
    .pipe(gulp.dest('./html/'))
});
```

Browser:
```html
<!doctype html>
<html>
<head>
  <title>Marked in the browser</title>
  <script src="bower_components/marked/lib/marked.js"></script>
  <script src="bower_components/md2bbc/lib/md2bbc.min.js"></script>
</head>
<body>
  <script>
  marked.setOptions({
    renderer: new md2bbc()
  });
  console.log(marked('**Markdown** is awesome.'));
  </script>
</body>
</html>
```

## Reminder
Not all bbcode implementation got all features. For example, some does not have `code` tag. Please either ask forum master to implement that as this is somewhat a bug form their side. I write this base on the implementation of [gamer.com.tw](http://gamer.com.tw)(Chinese site).

## Running tests on node.js
1. Clone this repository
2. Run `npm install`
3. Run `npm test`

## Build it
Building this will minify the javascript and create a sourcemap for it.

1. Install gulp globally by `npm install -g gulp`
2. Run `npm install`
3. Run `gulp`
4. Built javascript will be in lib/
