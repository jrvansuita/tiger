//var FB;


var _jsdir = __dirname + '/js/';
var _cssdir = __dirname + '/css/';

const app = require('electron').remote.app;
const {remote} = require('electron');
var Keep = require(_jsdir +'prefs/Keep.js');
var Prototype = require(_jsdir +'util/Prototype.js');
var msg = require(_jsdir + 'util/msg.js');
var cnt = require(_jsdir + 'res/cnt.js');
var Util = require(_jsdir + 'util/utils.js');

$(document).ready(function(){
  Prototype.build();
  openExternalLinks();
  displayInspectElement();

});

//Show an option to inspect the element on righ click
function displayInspectElement(){
  const {Menu, MenuItem} = remote;
  let rightClickPosition = null;
  const appMenu = new Menu();
  const menuItem = new MenuItem({
    label: 'Inspect Element',
    click: () => {
      remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y);
    }
  });
  appMenu.append(menuItem);
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClickPosition = {x: e.x, y: e.y};
    appMenu.popup(remote.getCurrentWindow());
  }, false);
}

//Open links externally by default
function openExternalLinks(){
  var shell = require('electron').shell;

  $(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
  });

  $(document).on('click', 'a[href^="www"]', function(event) {
    event.preventDefault();
    shell.openExternal("http://" + this.href.split('www.')[1]);
  });
}
