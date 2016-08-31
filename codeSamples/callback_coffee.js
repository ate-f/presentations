/* eslint-disable */
var money = '10.0';

countMoney();
order('black');
order('cappucino');
order('frappucino');



/*order("frappucino", (error, value) => {
  if (error) {
    return console.error(error);    
  }
  pay(value.price);
})*/

function order(type){
  order(type, (error, value) => {
    if (error) {
      return console.error(error);    
    } 
    console.log(`Received ${type}`);
    pay(value.price);
  });
}

function order(type, callback) {
  if (type === "black") {
    setTimeout(() => callback(null, {price: 2.50}), 1000);
  } else if(type === "cappucino"){
    setTimeout(() => callback(null, {price: 4.00}), 2000);
  } else {
    callback(`coffee '${type}' not available`);
  }
}

function pay(amount) {
  money = money - amount;
}

function countMoney() {
  console.log(`Money left ${money}`);
}

