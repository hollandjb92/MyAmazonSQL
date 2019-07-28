# MyAmazonSQL

<p>An Amazon-like storefront created using Node.js and MySQL. Includes both customers and store-side views</p>

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

<p>You will need <a href="https://nodejs.org/en/">Node.js</a> and  <a href="https://www.npmjs.com/">NPM</a>  installed on your system.</p>

### Installing

<ol>
<li>
<p>Clone project:</p>
<pre><code> "git clone https://github.com/hollandjb92/MyAmazonSQL.git"
</code></pre>
</li>
<li>
<p>Inside the root directory of the cloned filed, run the following command in your terminal/bash:</p>
<pre><code> "npm install"
</code></pre>
</li>
</ol>

### Please initialize your database by importing the schema.sql file into your preferred database tool

## Customer View
![CustomerSide](Customer.gif)

<ul>
  <li>Customer is able to see items display and purchase as they choose </li>
</ul>

## Manager View
![ManagerSide](Manager.gif)
<ul>
  <li>Manager is able to: </li>
  <ul>
     <li>See Current Inventory</li>
     <li>See Low Inventory Items</li>
     <li>Add New Products</li>
   <li>Order New Stock</li>
  </ul>
</ul>



## Built With
<ul>
<li><a href="https://nodejs.org/en/">Node.js</a></li>
<li><a href="https://www.mysql.com/">SQL</a></li>
  <li><a href="https://www.npmjs.com/package/inquirer">Inquirer</a></li>
  <li><a href="https://www.npmjs.com/package/colors">Colors</a></li>
  <li><a href="https://www.npmjs.com/package/mysql">MySQL</a></li>

</ul>
