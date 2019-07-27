DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
id INT AUTO_INCREMENT PRIMARY KEY,
productName VARCHAR(255) NOT NULL,
departmentName VARCHAR(255) NOT NULL,
price DECIMAL(8,2) NOT NULL,
stock INT NOT NULL
);

INSERT INTO products(productName, departmentName, price, stock)
VALUES("Monocular Telescope", "Electronics", 29.99, 33),
("Vitamin D3", "Vitamins and Supplements", 11.00, 44),
("Fire Emblem: Three Houses", "Video Games", 59.99, 6),
("Hair Dryer", "Appliances", 9.94, 101),
("Cat Litter", "Pet Supplies", 18.49, 30),
("Bird Feeder", "Lawn and Garden", 10.99, 67),
("SD Card", "Electronics", 7.95, 999),
("Whey Protein", "Vitamins and Supplements", 49.13, 5),
("Laundry Detergent", "Household Items", 13.99, 75),
("Paper Towels", "Household Items", 7.99, 253);