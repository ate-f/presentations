/* eslint-disable */
var money = 10.0;
var coffeeTypes = {black: {price:2.5, time:1000}, cappuccino: {price:4, time:2000}};

try {
  countMoney();
  getOptions();
  order("black");
  order("cappuccino");
  order("frappuccino");
  countMoney();
} catch (e) {
  print(e, 'red');
}

function order(type) {
  print(`Ordering coffee: ${type}`);
  var coffee = coffeeTypes[type];
  if (coffee) {
    setTimeout(receive, coffee.time, coffee, type);
  } else {
    throw(`coffee '${type}' not available`);
  }
}

function receive(coffee, type){
  print(`Received coffee ${type}, paying ${coffee.price}`); 
  pay(coffee.price);
}
function pay(amount) {money = money - amount;}
function countMoney() {print(`Money left ${money}`);}
function getOptions() {print(`Options are: ${Object.keys(coffeeTypes).join(', ')}`);}


function print(text, color) {
  console.log(text);
  try{
    var page = document.getElementById("log");
    page.innerHTML = page.innerHTML + `<span style="color:${color || 'black'}">${text}</span>\n`;
  } catch(e){
    //silent
  }
}
