/* eslint-disable */
try {
  
  var money = 10.0;
  var coffeeTypes = {black: {price:2.5, time:1000}, cappucino: {price:4, time:2000}};

  countMoney();
  getOptions();
  orderCoffee("black");
  countMoney();
  
  function orderCoffee(type, callback) {
    print(`Ordering coffee: ${type}`);
    var coffee = coffeeTypes[type];
    if (coffee) {

      setTimeout(
        function() {pay(coffee.price);},
        coffee.time);
    } else {
      throw(`coffee '${type}' not available`);
    }
  }

  function pay(amount) {money = money - amount;}
  function countMoney() {print(`Money left ${money}`);}
  function countMoney() {print(`Money left ${money}`);}
  function getOptions() {print(`Options are: ${Object.keys(coffeeTypes).join(', ')}`);}
} catch (e) {
  print(e, 'red');
}
function print(text, color) {
  console.log(text);
  if (document) {
    var page = document.getElementById("log");
    page.innerHTML = page.innerHTML + `<span style="color:${color || 'black'}">${text}</span>\n`;
  }
}
