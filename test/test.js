if (typeof window === 'undefined') {
  var marked = require('marked');
  var md2bbc = require('../lib/md2bbc');
  require('should');
}

marked.setOptions({
  renderer: new md2bbc()
});

describe('Lists', function () {

  describe('#Unordered', function () {
    it('should render unordered list', function () {
      marked(' * First\n * Second').should.equal('[ul]\n[li]First[/li]\n[li]Second[/li]\n[/ul]\n');
    });
  });

  describe('#Ordered', function () {
    it('should render ordered list', function () {
      marked('1. First\n2. Second').should.equal('[ol]\n[li]First[/li]\n[li]Second[/li]\n[/ol]\n');
    });
  });
});

describe('table', function () {

  it('should render table without any align', function () {
    marked('| Tables | Are | Cool |\n | --- | --- | --- |\n | second  | line | table |').should.equal('[table]\n[tr]\n[th]Tables[/th]\n[th]Are[/th]\n[th]Cool[/th]\n[/tr]\n[tr]\n[td]second[/td]\n[td]line[/td]\n[td]table[/td]\n[/tr]\n[/table]\n');
  });

  it('should render table with text align', function () {
    marked('| Left | Centre | Right |\n|:---- |:----:| ----:|\n|test|is|important|').should.equal('[table]\n[tr]\n[th align=left]Left[/th]\n[th align=center]Centre[/th]\n[th align=right]Right[/th]\n[/tr]\n[tr]\n[td align=left]test[/td]\n[td align=center]is[/td]\n[td align=right]important[/td]\n[/tr]\n[/table]\n');
  });

  it('should render table with options.tableAttr', function () {
    marked('| Tables | Are | Cool |\n | --- | --- | --- |\n | second  | line | table |', {tableAttr: 'width=98%'}).should.equal('[table width=98%]\n[tr]\n[th]Tables[/th]\n[th]Are[/th]\n[th]Cool[/th]\n[/tr]\n[tr]\n[td]second[/td]\n[td]line[/td]\n[td]table[/td]\n[/tr]\n[/table]\n');
  });

  it('should not render text align when disenabled', function () {
    marked('| Left | Centre | Right |\n|:---- |:----:| ----:|\n|test|is|important|', {tableAlign: false}).should.equal('[table]\n[tr]\n[th]Left[/th]\n[th]Centre[/th]\n[th]Right[/th]\n[/tr]\n[tr]\n[td]test[/td]\n[td]is[/td]\n[td]important[/td]\n[/tr]\n[/table]\n');
  });
});

describe('Simple tags', function () {

  describe('#Heading', function () {
    it('should render h1', function () {
      marked('# h1').should.equal('[h1]h1[/h1]\n');
    });
    it('should render h3 for h4', function () {
      marked('#### h4').should.equal('[h3]h4[/h3]\n');
    });
  });

  describe('#Quote', function () {
    it('should render quote bbcode', function () {
      marked('> Blockquotes').should.equal('[quote]\n[div]Blockquotes[/div]\n[/quote]\n');
    });
  });

  describe('#Code', function () {
    it('should ignore code block language', function () {
      marked('```javascript\nvar s = "str";\n```').should.equal('[code]var s = "str";\n[/code]');
    });
    it('should render codespan', function () {
      marked('`var s = "str";\n`').should.equal('[div][code]var s = &quot;str&quot;;[/code][/div]\n')
    });
  });


  describe('#Paragraph break', function () {
    it('should render hr', function () {
      marked('***').should.equal('[hr]\n');
    });
  });

  describe("#Line break", function () {
    it('should render br', function () {
      marked('line    \nbreak').should.equal('[div]line\nbreak[/div]\n');
    });
  });

  describe('#Paragraph', function () {
    it('should render inside div if no option is passed in', function () {
      marked('Paragraph\n\nAnother').should.equal('[div]Paragraph[/div]\n[div]Another[/div]\n');
    });

    it('should not render any tag if empty string is passed in as option', function () {
      marked('Paragraph\n\nAnother', {paragraphTag: ''}).should.equal('Paragraph\nAnother\n');
    });
  });

  describe('#Bold', function () {
    it('should render bold words', function () {
      marked('**bold**').should.equal('[div][b]bold[/b][/div]\n');
    });
  });

  describe('#Italics', function () {
    it('should render italics words', function () {
      marked('*italics*').should.equal('[div][i]italics[/i][/div]\n');
    });
  });

  describe('#Strike', function () {
    it('should render strikethrough', function () {
      marked('~~Scratch~~').should.equal('[div][s]Scratch[/s][/div]\n');
    });
  });

  describe('#Link', function () {
    it('should render link', function () {
      marked('https://www.google.com').should.equal('[div][url=https://www.google.com]https://www.google.com[/url][/div]\n');
    });
  });

  describe('#Image', function () {
    it('should render image', function () {
      marked('![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")')
      .should.equal('[div][img=https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png][/div]\n');
    });
  });

  describe('#Raw HTML', function () {
    it('should not touch raw HTML', function () {
      marked('<tag></tag>').should.equal('<tag></tag>')
    });
  });
});
