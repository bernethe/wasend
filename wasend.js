'use strict';var _pnum,_baseURL,context,o=null,g=null;navigator.serviceWorker&&navigator.serviceWorker.register("/sw.js");var main=function(){context=new AudioContext,_pnum="",_baseURL="https://wa.me/",document.getElementById("WASend").classList.add("light"),addEventListenerList(document.querySelectorAll(".btns button.btn-num"),"click",appendNumber),addEventListenerList(document.querySelectorAll(".btns button.btn-act"),"click",actionNum),document.addEventListener("keypress",logKey)},logKey=function(a){isNaN(parseInt(a.key))||document.querySelector(".btns button.btn-num[value=\"".concat(a.key,"\"]")).click()},actionNum=function(a){switch(console.log(a),a.target.getAttribute("value")){case"-1":_pnum=_pnum.substring(0,_pnum.length-1);}refreshScreenNumbers()},appendNumber=function(a){_pnum+=a.target.getAttribute("value"),o=context.createOscillator(),g=context.createGain(),g.gain.value=.1,o.connect(g),o.type="triangle",o.frequency.value=87.31,g.connect(context.destination),o.start(0),g.gain.exponentialRampToValueAtTime(1e-5,context.currentTime+.75),refreshScreenNumbers()},refreshScreenNumbers=function(){document.getElementById("screen").innerText=_pnum,document.getElementById("cta_link").setAttribute("href",_baseURL+_pnum)},addEventListenerList=function(a,b,c){for(var d=0,e=a.length;d<e;d++)a[d].addEventListener(b,c,!1)};document.addEventListener("DOMContentLoaded",main,!1);