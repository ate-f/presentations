/* eslint-disable */

  
var money = 10.0;
var coffeeTypes = {black: {price:2.5, time:1000}, cappuccino: {price:4, time:2000}};
try{
  countMoney();
  getOptions();
  order("black");
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
    setTimeout(function(){throw(`coffee '${type}' not available`);},2000);
  }
}

function receive(coffee, type){
  print(`received coffee ${type}, paying ${coffee.price}`); 
  pay(coffee.price);
  if(type !== 'frappuccino'){
    order('frappuccino');  
  }
  countMoney();
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
