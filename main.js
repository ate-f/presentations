/* eslint-disable no-console, require-jsdoc, no-unused-vars*/
'use strict';

// main.js
var express = require('express');
var app = express();
var cardinal = require('cardinal');
var locus = require('locus');
var chalk = require('chalk');

var moduleNames = [1];
var modules = new Map();
moduleNames.forEach(id => modules.set(id, require(`./${id}.js`)));

function s(func, ...params) {
  var headColor = chalk.underline.white;

  console.log(headColor(`\nPrinting code: `));
  console.log(cardinal.highlight(func.toString()));

  console.log(headColor(`\nRunning function (with ${params.length} parameters): `));
  let result = func.apply(null, params);

  console.log(headColor(`\nPrinting result:`));
  console.log(result);

  return result;
}

console.log("Starting main.js server\n");
/*
app.get('/index.html', function (req, res) {
  console.log("base page");
  res.send('Hello World!');
});

app.get('/run/:id', function (req, res) {
  console.log("running: " + req.params.id);
  run(req.params.id);
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');

  eval(locus);
});*/
//eslint-disable-next-line
eval(locus);

function hi() {
  console.log("hi");
}

function run(id) {
  s(modules.get(id));

}
