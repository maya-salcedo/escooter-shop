# online-shop
Technologies used:
React
Node
Express
Redux
MongoDB

## Run locally
$ git clone https://github.com/maya-salcedo/escooter-shop.git
$ cd escooter-shop

## Set up MongoDB
1. Install from https://www.mongodb.com/try/download/community
2. Create .env file in root folder and set MONGODB_URL=mongodb://localhost/escooter-shop

## Run Backend
$ cd escooter-shop/server
$ npm install
$ npm start

## Run Frontend 
Open new terminal
$ cd escooter-shop/client
$ npm install
$ npm start

## Seed Users and Products
Run in browser http://localhost:5000/api/users/seed which will created admin email and password.
Then run http://localhost:5000/api/products/seed to create 6 product samples.

## To Signin
Run http://localhost:3000/signin and enter admin email and password located in escooter-shop/server/data.js



