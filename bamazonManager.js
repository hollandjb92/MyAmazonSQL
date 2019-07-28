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

const manager = _ => {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw (err);

    inquirer.prompt([{
      type: "list",
      name: "options",
      message: "What would you like to do Mister Manager?",
      choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product", "Nothing"]
    }]).then(response => {
      switch (response.options) {

        case "View Products For Sale":
          viewProducts();
          break;

        case "View Low Inventory":
          viewLowInventory();
          break;

        case "Nothing":
          process.exit();
          break;

        case "Add New Product":
          addNewProduct();
          break;

        case "Add To Inventory":
          increaseStock();
          break;

      }
    })
  })
}

const viewProducts = _ => {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw (err);
    console.table(res);
    manager();
  })
}

const viewLowInventory = _ => {
  connection.query("SELECT * FROM products WHERE stock < 20", (err, res) => {
    if (err) throw err;
    console.table(res);
    manager();

  })
}

const addNewProduct = _ => {
  inquirer.prompt([{
    type: "input",
    name: "productName",
    message: "What is the name of the product you would like to add?"
  }, {
    type: "input",
    name: "departmentName",
    message: "What department does this item belong to?"
  }, {
    type: "input",
    name: "price",
    message: "How much does this item cost?"
  }, {
    type: "input",
    name: "stock",
    message: "How many do we initially have in stock?"
  }]).then(res => {
    connection.query("INSERT INTO products SET ?", {
      productName: res.productName,
      departmentName: res.departmentName,
      price: res.price,
      stock: res.stock
    }, (err, res) => {
      if (err) throw err;

      console.log("This item has been added to our inventory".green);
      manager();
    })
  })
}

const increaseStock = _ => {
  inquirer.prompt([{
    name: "product",
    type: "rawlist",
    message: "What product would you like to stock up on?",
    choices: _ => {
      let productsArray = [];
      for (i = 0; i < res.length; i++) {
        productsArray.push(res[i].productName);
      }
      return productsArray
    }
  }, {
    name: "quantity",
    type: "input",
    message: "How many would you like to add to your stock? (Please enter numerically)"
  }]).then(inquirerRes => {
    let chosenItem;

    for (i = 0; i < res.length; i++) {
      if (res[i].productName === inquirerRes.product) {
        chosenItem = res[i]
      }
    }

    connection.query("UPDATE products SET ? WHERE ?", [{
      stock: chosenItem.stock + parseInt(inquirerRes.quantity)
    }, {
      id: chosenItem.id
    }], err => {
      if (err) throw err;
      console.log("Stock has been added!".green);
      manager();
    })
  })
}

//first run of application
manager();