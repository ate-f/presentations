/* eslint-disable */
try {

var money = 10.0;
var coffeeTypes = {black: {price:2.5, time:1000}, cappucino: {price:4, time:2000}};

countMoney();
getOptions();
order("black", receive);
order("cappucino", receive);
order("frappucino", receive);

function order(type, callback) {
  print(`Ordering coffee: ${type}`);
  var coffee = coffeeTypes[type];
  if (coffee) {
    setTimeout(function(){callback(null, coffee, type);},coffee.time);       
  } else {
    throw(`coffee '${type}' not available`);
  }
}

function receive(error, coffee, type){
  print(`received coffee ${type}, paying ${coffee.price}`); 
  pay(coffee.price);
  countMoney();
}
function pay(amount) {money = money - amount;}
function countMoney() {print(`Money left ${money}`);}
function getOptions() {print(`Options are: ${Object.keys(coffeeTypes).join(', ')}`);}

} catch (e) {
  print(e, 'red');
}
function print(text, color) {
  console.log(text);
  try{
    var page = document.getElementById("log");
    page.innerHTML = page.innerHTML + `<span style="color:${color || 'black'}">${text}</span>\n`;
  } catch(e){
    //silent
  }
}
