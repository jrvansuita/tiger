var cnt = require(_jsdir + 'res/cnt.js');
var colors = require(_jsdir + 'res/colors.js');

module.exports = {
  rand: function(max, min) {
    min = min ? min : 0;
    return Math.floor((Math.random() * (max - min)) + min);
  },

  randFloat: function(max, min) {
    return (Math.random() * (max - min) + min).toFixed(4);
  },


  money: function(val) {
    return 'R$ ' + parseFloat(val).toFixed(2).toString().replace('.', ',');
  },

  und: function(val) {
    return val + ' und.';
  },

  upLetters: function(val) {
    return val.toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase());
  },

  hashCode: function(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  },

  strToColor: function(str) {
    var shortened = this.hashCode(str) % 160;
    return 'hsl(' + shortened + ', 45%, 60%)';
  },

  colorVal: function(str) {
    return '#' + colors[str.replace(' ', '').toLowerCase()];
  },

  isNumbers(s) {
    return s.match(/^[0-9]+$/) != null;
  },

  format(str, fmt) {
    for (var i = 0; i < fmt.length; i++) {
      str = str.replace('[?]', fmt[i]);
    }

    return str;
  },

  longDate(date) {
    var day = date.getDate();
    var month = cnt.months[date.getMonth()];
    var dayOffWeek = cnt.days[date.getDay()];
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = ('0' + date.getMinutes()).slice(-2);


    return dayOffWeek + ', ' + date.getUTCDate() + ' de ' + month +
      ' de ' + year + ' às ' + hours + ':' + minutes;
  },

  removeProtocol(s) {
    return s.replace(/(^\w+:|^)\/\//, '');
  },

  buildTrackableUrl(url, source, medium, name) {
    if (source) {
      url += '#utm_source=' + source;
    }

    if (medium) {
      url += '#utm_medium=' + medium;
    }

    if (name) {
      url += '#utm_campaign=' + name;
    }

    return url;
  },

  calcGalleryImageSize(maxWidth, itemsLength) {
    var overplus = 4;
    var width = maxWidth - overplus;

    if (itemsLength <= 4) {
      width = width / ((itemsLength % 2) == 0 ? 2 : itemsLength);
    } else {
      width = width / 4;
    }

    return width - overplus;
  },

  randomDate: function(start, end) {
    return new Date(start.getTime() + Math.random() *
      (end.getTime() - start.getTime()));
  },

  gender(s) {
    if (s == 'Male') {
      return 'meninos';
    }

    if (s == 'Female') {
      return 'meninas';
    }

    if (s == 'Unisex') {
      return 'ambos';
    }

    return '';
  },

  removerAcentos: function(newStringComAcento) {
    var string = newStringComAcento;
    var mapaAcentosHex = {
      a: /[\xE0-\xE6]/g,
      e: /[\xE8-\xEB]/g,
      i: /[\xEC-\xEF]/g,
      o: /[\xF2-\xF6]/g,
      u: /[\xF9-\xFC]/g,
      c: /\xE7/g,
      n: /\xF1/g,
    };

    for (var letra in mapaAcentosHex) {
      var expressaoRegular = mapaAcentosHex[letra];
      string = string.replace(expressaoRegular, letra);
    }

    return string;
  },

  short: function(str, max) {

    if (str.length > max) {
      return str.substring(0, max - 3) + '...';
    }

    return str;
  },

  daysDiff: function(dateA, dateB) {
    var timeDiff = Math.abs(dateA.getTime() - dateB.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  },

  toBuffer: function(order, url, callback) {
    request({
      url: url,
      encoding: null
    }, function(error, response, body) {
      callback(order, url, body);
    });
  },

  selectContent: function(element) {
    var range = document.createRange();
    range.selectNodeContents(element);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  },

  copySeleted: function() {
    return document.execCommand('copy');
  }

};