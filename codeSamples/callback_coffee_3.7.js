/* eslint-disable */
var money = 10.0;
var coffeeTypes = {black: {price:2.5, time:1000}, cappuccino: {price:4, time:2000}};

countMoney();
getOptions();

walkIntoShop()
  .then((value) => print(value))
  .then(() => order("black"))
  .then(() => order("cappuccino"))
  .then(() => order("frappuccino"))    
  .then(() => print('Done ordering', 'green'))
  .catch(error => {    
    print('done ordering, but with error','green');
    print(error, 'red');
  });

function walkIntoShop(){    
  return 'walking';
}

function receive(coffee, type) {
  print(`Received coffee ${type}, paying ${coffee.price}`);
  pay(coffee.price);
  countMoney();
}

function order(type) {    
  print(`Ordering coffee: ${type}`);
  var coffee = coffeeTypes[type];
  return new Promise(function(resolve,reject){
    if (coffee) {
      setTimeout(function() {resolve({coffee:coffee, type:type});}, coffee.time);
    } else {
      setTimeout(function() {reject(`coffee '${type}' not available`);}, 2000);
    }
  })
    .then(coffeeAndType => receive(coffeeAndType.coffee, coffeeAndType.type));      
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

