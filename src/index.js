'use strict';

let _pnum;
let _baseURL;
let context;
var o = null;
var g = null;

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

const main = () => {
    context = new AudioContext();
    _pnum = '';
    _baseURL = 'https://wa.me/';
    document.body.classList.add('light');
    addEventListenerList(
        document.querySelectorAll('.btns button.btn-num'),
        'click',
        appendNumber
    );
    addEventListenerList(
        document.querySelectorAll('.btns button.btn-act'),
        'click',
        actionNum
    );
    document.addEventListener('keypress', logKey);
};
const logKey = (ev) => {
    if( !isNaN(parseInt(ev.key)) ) {
        document.querySelector(`.btns button.btn-num[value="${ev.key}"]`).click();
    }
};
const actionNum = (ev) => {
    console.log(ev);
    switch( ev.target.getAttribute('value') ) {
        case '-1':
            _pnum = _pnum.substring(0, (_pnum.length - 1));
            break;
    }
    refreshScreenNumbers();
};
const appendNumber = (ev) => {
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
const refreshScreenNumbers = () => {
    document.getElementById('screen').innerText = _pnum;
    document.getElementById('cta_link').setAttribute('href', _baseURL+_pnum);
};
const addEventListenerList = (list, event, fn) => {
	for (var i = 0, len = list.length; i < len; i++) {
		list[i].addEventListener(event, fn, !1);
	}
};

document.addEventListener('DOMContentLoaded', main, !1);