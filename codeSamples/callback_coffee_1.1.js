/* eslint-disable */
var money = 10.0;
var coffeeTypes = {black: {price:2.5, time:1000}, cappuccino: {price:4, time:2000}};

countMoney();
getOptions();
order("black", receive);
order("cappuccino", receive);
order("frappuccino", receive);

function receive(error, coffee, type){
  if(error){
    return print(error, 'red');
  }
  print(`received coffee ${type}, paying ${coffee.price}`); 
  pay(coffee.price);
  countMoney();
}
  
function order(type, callback) {
  print(`Ordering coffee: ${type}`);
  var coffee = coffeeTypes[type];
  if (coffee) {
    setTimeout(function(){callback(null, coffee, type);},coffee.time);       
  } else {
    setTimeout(function(){callback(`coffee '${type}' not available`);},2000);
  }
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
