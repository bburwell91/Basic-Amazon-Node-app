var mysql = require("mysql");
var inquirer = require("inquirer");
  
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});


function itemsForSale() {
  var showQuestions = false;
  connection.query("SELECT id, product_name, price, stock_quantity FROM products", function(error, result) {
  if (error) throw error;
  for (var i = 0; i < result.length; i++) {
    console.log("ID: " + result[i].id + " | Name: " + result[i].product_name + " | Price: " + result[i].price + " | Stock Quantity: " + result[i].stock_quantity);
    if (i === result.length - 1) {
      showQuestions = true;
      askQuestions();
    }
  }
  })
};

itemsForSale();

function askQuestions() {
    inquirer.prompt([
      {
        name: "id",
        type: "input",
        message: "Please enter the ID of the item you would like to purchase:"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many of these would you like to purchase?"
      },
    ]).then(function(answer) {
        var idSelection = answer.id;
        var quantitySelected = answer.quantity;
        customerPurchase(idSelection, quantitySelected);
    });
};

function customerPurchase(id, quantity) {
    connection.query("SELECT * FROM products WHERE id = " + id, function(err, res) {
      if (err) throw err;
      if (quantity <= res[0].stock_quantity) {
        connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantity + " WHERE id = " + id);
        console.log("Here are your " + quantity + " " + res[0].product_name + "! That will cost $" + (quantity * res[0].price) + "!");
        console.log("Press CTRL C and type 'node bamazonCustomer.js' to make another purchase");
        console.log("===================================================");
      } else {
        console.log("Insufficient quantity! sorry, we do not have enough " + res[0].product_name + " to complete this order.");
      };
    });
};