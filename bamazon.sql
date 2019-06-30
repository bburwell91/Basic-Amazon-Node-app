DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name varchar(100),
  department_name varchar(50),
  price INT NOT NULL,
  stock_quantity INT,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Garbage Bags", "Household", 5.99, 300), ("Dish Soap", "Household", 1.99, 800), ("Paper Towels", "Household", 3.99, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bananas", "Produce", 2.79, 100), ("Apples", "Produce", 1.49, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Milk", "Dairy", 3.69, 150), ("Eggs", "Dairy", 0.99, 350), ("Cheese", "Dairy", 4.29, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirt", "Clothing", 19.99, 1000), ("Jeans", "Clothing", 49.99, 1500);