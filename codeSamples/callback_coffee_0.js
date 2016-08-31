/* eslint-disable */
var money = 10.0;
var coffeeTypes = {black: {price:2.5,time:1000}, cappucino: {price:4, time:2000}};

countMoney();
getOptions();
orderCoffee("black")
countMoney();

function orderCoffee(type, callback) {
  var coffee = coffeeTypes[type];
  if(coffee){
    setTimeout(
      function(){callback(null, coffee.price);}, 
      coffee.time);
  } else {
    callback(`coffee '${type}' not available`);
  }
}

function pay(amount) {money = money - amount;}
function countMoney() {print(`Money left ${money}`);}
function countMoney() {print(`Money left ${money}`)}
function getOptions() {print(`Options are: ${Object.keys(coffeeTypes).join(', ')}`);}

function print(text){
  console.log(text, document, window);
  if(document){
    var page = document.getElementsById("log");
    page.innerHTML = div.innerHTML + text;
  }
}