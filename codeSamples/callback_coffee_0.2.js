/* eslint-disable */
try {
  
var money = 10.0;
var coffeeTypes = {black: {price:2.5, time:1000}, cappucino: {price:4, time:2000}};

countMoney();
getOptions();
order("black");
countMoney();

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
  print(`received coffee ${type}, paying ${coffee.price}`); 
  pay(coffee.price);
  if(type !== 'cappucino'){
    order('cappucino');  
  }
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
