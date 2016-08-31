/* eslint-disable */
var money = 10.0;
var coffeeTypes = {black: {price:2.5, time:1000}, cappuccino: {price:4, time:2000}};
require(["dojo/Deferred"], function(Deferred) {
  countMoney();
  getOptions();

  var blackCoffeeReceived = new Deferred();
  var cappuccinoReceived = new Deferred();
  var frappuccinoReceived = new Deferred();

  order("black").then(function(coffeeAndType) {    
    receive(coffeeAndType.coffee, coffeeAndType.type);
    blackCoffeeReceived.resolve();
  }, function(error) {
    return print(error, 'red');
  });

  blackCoffeeReceived.then(function() {
    order("cappuccino").then(function(coffeeAndType) {
      receive(coffeeAndType.coffee, coffeeAndType.type);
      cappuccinoReceived.resolve();
    }, function(error) {
      return print(error, 'red');
    });
  }, function(error) {
    return print(error, 'red');
  });

  cappuccinoReceived.then(function() {
    order("frappuccino").then(function(coffeeAndType) {
      receive(coffeeAndType.coffee, coffeeAndType.type);
      frappuccinoReceived.resolve();
    }, function(error) {
      return print(error, 'red');
    });
  }, function(error) {
    return print(error, 'red');
  });

  frappuccinoReceived.then(function() {
    print('Done ordering', 'green');
  }, function(error) {
    return print(error, 'red');
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
