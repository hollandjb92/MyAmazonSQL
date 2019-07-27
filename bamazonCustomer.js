//require packages
const mysql = require("mysql"),
  inquirer = require("inquirer"),
  colors = require("colors");

//create mysql connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'bamazon'
});

connection.connect();

//initial display of items
const displayItems = _ => {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err;
    console.table(res);
  })
}

//user purchases items
const purchaseItems = _ => {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw (err)

    // console.log(res);

    inquirer.prompt([{
      type: "list",
      name: "product",
      message: "What product would you like to buy?",
      choices: _ => {
        let productsArray = [];

        for (i = 0; i < res.length; i++) {
          productsArray.push(res[i].productName)

        }
        return productsArray;
      }

    }, {
      name: "quantity",
      type: "input",
      message: "And how many of them do you want? (Please enter numerically)"
    }]).then(response => {
      let boughtItem;

      for (i = 0; i < res.length; i++) {
        if (res[i].productName === response.product) {
          boughtItem = res[i]
        }
      }

      if (boughtItem.stock > response.quantity) {
        connection.query("UPDATE products SET ? WHERE ?", [{
          stock: boughtItem.stock - response.quantity
        }, {
          id: boughtItem.id
        }], err => {
          if (err) throw err
          console.log("Here's your receipt!".green)
          console.log("\n\n==============================")
          console.log(colors.cyan("Item: " + boughtItem.productName))
          console.log(colors.cyan("Quantity: " + response.quantity))
          console.log(colors.cyan("Your total comes to: $" + (boughtItem.price * response.quantity)));
          console.log("==============================\n\n");

          inquirer.prompt([{
            type: "confirm",
            name: "buyAgain",
            message: "Would you like to purchase something else?"
          }]).then(inquirerResponse => {
            if (inquirerResponse.buyAgain) {
              displayItems();
              purchaseItems();
            } else {
              process.exit();
            }
          })


        })
      } else {
        console.log("Insufficient stock".red)
        console.log("\n\n Would you like to purchase something else?")
        displayItems();
        purchaseItems();
      }


    })
  })
}

displayItems();
purchaseItems();