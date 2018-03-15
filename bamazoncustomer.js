var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});


  function showInventory() {
    connection.query('SELECT * FROM products', function(err, result) {
        if (err) throw err;
              for(var i = 0; i < result.length; i++) {
             console.log("Item ID: " + result[i].Id + " | Product: " + result[i].Product_name + " | Department: " + result[i].Department_name + " | Price: " +  result[i].Price + " | Quantity: " + result[i].Stock_quantity);
         }
        }); 
    }; 

showInventory(); 
  function chooseItems(id) {
    connection.query('SELECT * FROM products', function (err, answer) {
        
        inquirer.prompt([
            {
                name: "product_Id",
                type: "number",
                message: "Please insert the product ID for the product you'd like to purchase.",
            },
            {
                name: "purchaseamount",
                type: "number",
                message: "How many would you like to purchase?",
                
            }
            ])
            .then (function checkInventory() {
                var query = 'SELECT ItemID, ProductName, Price, StockQuantity FROM Bamazon.Products WHERE ?';
                var purchaseItem = answer.product_id;
                var howmany = answer.purchaseamount;
                connection.query('SELECT * FROM products', function(err, result) { 
                         if (howmany > result[0].Stock_quantity) { 
                             console.log("Insufficient quantity!")
                         }
                         else { 
                             console.log("You can may complete your order!")
                         }
                        
    }); 
});
});
}



chooseItems(); 
