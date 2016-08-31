/* eslint-disable */
var money = 10.0;
var coffeeTypes = {black: {price:2.5, time:1000}, cappuccino: {price:4, time:2000}};
require(["dojo/Deferred"], function(Deferred) {

  countMoney();
  getOptions();

  order("black")
    .then(function(coffeeAndType) {
      receive(coffeeAndType.coffee, coffeeAndType.type);
      return order("cappuccino")
    })
    .then(function(coffeeAndType) {
      receive(coffeeAndType.coffee, coffeeAndType.type);
      return order("frappuccino")
    })
    .then(function(coffeeAndType) {
      return receive(coffeeAndType.coffee, coffeeAndType.type);
    })
    .then(
      function() {
        print('Done ordering', 'green');
      }, 
      function(error) {    
        print('done ordering, but with error','green');
        print(error, 'red');
    });

  function receive(coffee, type) {
    print(`received coffee ${type}, paying ${coffee.price}`);
    pay(coffee.price);
    countMoney();
  }

  function order(type) {
    var orderDeferred = new Deferred();
    print(`Ordering coffee: ${type}`);
    var coffee = coffeeTypes[type];
    if (coffee) {
      setTimeout(function() {orderDeferred.resolve({coffee:coffee, type:type});}, coffee.time);
    } else {
      setTimeout(function() {orderDeferred.reject(`coffee '${type}' not available`);}, 2000);
    }
    return orderDeferred;
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
});
