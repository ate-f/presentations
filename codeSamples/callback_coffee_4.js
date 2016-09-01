/* eslint-disable */
var money = 10.0;
var coffeeTypes = {black: {price:2.5, time:1000}, cappuccino: {price:4, time:2000}};

countMoney();
getOptions();

function *ordering(){
  var c = yield order('black');
  receive(c.coffee, c.type)
  c = yield order('black');
  receive(c.coffee, c.type)
  c = yield order('frappucino');
  receive(c.coffee, c.type)
}

var orderGenerator = ordering();
console.log(orderGenerator.next());

function receive(coffee, type) {
  print(`Received coffee ${type}, paying ${coffee.price}`);
  pay(coffee.price);
  countMoney();
}

function order(type) {  
  print(`Ordering coffee: ${type}`);
  var coffee = coffeeTypes[type];
  if (coffee) {      
    var res = {coffee:coffee, type:type};
    setTimeout(function() {
      orderGenerator.next(res);
    }.bind(this), coffee.time);
  } else {
    setTimeout(function() {
      throw(`coffee '${type}' not available`)
    },2000);
  }    
  
}

function pay(amount) {money = money - amount;}
function countMoney() {print(`Money left ${money}`);}
function getOptions() {print(`Options are: ${Object.keys(coffeeTypes).join(', ')}`);}

function print(text, color) {
  console.log(text);
  try {
    var page = document.getElementById("log");
    page.innerHTML = page.innerHTML + `<span style="color:${color || 'black'}">${text}</span>\n`;
  } catch (e) {
    //silent
  }
}