/* eslint-disable */
var money = 10.0;
var coffeeTypes = {black: {price:2.5,time:1000}, cappucino: {price:4, time:2000}};

countMoney();
getOptions();
orderCoffee("black", (error, price) => {
  if (error) {
    return console.error(error);    
  }
  pay(value.price);
})
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
function countMoney() {console.log(`Money left ${money}`);}
function getOptions() {console.log(`Options are: ${Object.keys(coffeeTypes).join(', ')}`);}

