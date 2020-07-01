'use strict';

var _pnum;

var _baseURL;

var context;
var o = null;
var g = null;

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}

var main = function main() {
  context = new AudioContext();
  _pnum = '';
  _baseURL = 'https://wa.me/';
  document.getElementById('WASend').classList.add('light');
  addEventListenerList(document.querySelectorAll('.btns button.btn-num'), 'click', appendNumber);
  addEventListenerList(document.querySelectorAll('.btns button.btn-act'), 'click', actionNum);
  document.addEventListener('keypress', logKey);
};

var logKey = function logKey(ev) {
  if (!isNaN(parseInt(ev.key))) {
    document.querySelector(".btns button.btn-num[value=\"".concat(ev.key, "\"]")).click();
  }
};

var actionNum = function actionNum(ev) {
  console.log(ev);

  switch (ev.target.getAttribute('value')) {
    case '-1':
      _pnum = _pnum.substring(0, _pnum.length - 1);
      break;
  }

  refreshScreenNumbers();
};

var appendNumber = function appendNumber(ev) {
  _pnum += ev.target.getAttribute('value');
  o = context.createOscillator();
  g = context.createGain();
  g.gain.value = 0.1;
  o.connect(g);
  o.type = 'triangle';
  o.frequency.value = 87.31;
  g.connect(context.destination);
  o.start(0);
  g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + .75);
  refreshScreenNumbers();
};

var refreshScreenNumbers = function refreshScreenNumbers() {
  document.getElementById('screen').innerText = _pnum;
  document.getElementById('cta_link').setAttribute('href', _baseURL + _pnum);
};

var addEventListenerList = function addEventListenerList(list, event, fn) {
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, !1);
  }
};

document.addEventListener('DOMContentLoaded', main, !1);

//# sourceMappingURL=wasend.js.map