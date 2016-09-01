/* eslint-disable */
var money = 10.0;
var coffeeTypes = {black: {price:2.5, time:1000}, cappuccino: {price:4, time:2000}};
require(["dojo/Deferred"], function(Deferred) {

  countMoney();
  getOptions();

  var coffeeReceived = new Deferred();
  order("black").then(function(coffeeAndType) {
    receive(coffeeAndType.coffee, coffeeAndType.type);
    
    order("cappuccino").then(function(coffeeAndType) {
      receive(coffeeAndType.coffee, coffeeAndType.type);
      
      order("frappuccino").then(function(coffeeAndType) {
        receive(coffeeAndType.coffee, coffeeAndType.type);
        
        coffeeReceived.resolve();
      }, function(error) {
        return print(error, 'red');
      });
    }, function(error) {
      return print(error, 'red');
    });
  }, function(error) {
    return print(error, 'red');
  });

  coffeeReceived.then(function() {
    print('Done ordering', 'green');
  }, function(error) {    
    print('done ordering, but with error','green');
    print(error, 'red');
  });
  
  function receive(coffee, type) {
    print(`Received coffee ${type}, paying ${coffee.price}`);
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
  
  setTimeout(function(){
    console.log(coffeeReceived, coffeeReceived.isRejected(), coffeeReceived.isResolved());
    if(!(coffeeReceived.isRejected() || coffeeReceived.isResolved())){
      throw new Error("never received message that we can stop ordering");
    }    
  },8000);
});
