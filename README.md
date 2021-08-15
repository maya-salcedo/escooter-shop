[![shop-img.png](https://i.postimg.cc/hPfbLJfF/shop-img.png)](https://postimg.cc/zVYg5GCp)

# escooter-shop
Technologies used:
**React
Node
Express
Redux
MongoDB**

#A full-stack e-commerce app that is similar to Amazon web app where you can register and log-in as a user to buy and/or sell products on the app. Products can be searched, sorted, filtered, rated and reviewed. There is also a chatbox that can be used by the buyer to communicate with the seller. Sellers are ranked and the top sellers get featured. The app is screen-size responsive.

## Run locally
1. $ git clone https://github.com/maya-salcedo/escooter-shop.git
2. $ cd escooter-shop

## Set up MongoDB
1. Install from https://www.mongodb.com/try/download/community
2. Create .env file in root folder and set MONGODB_URL=mongodb://localhost/escooter-shop

## Run Backend
1. $ cd escooter-shop/server
2. $ npm install
3. $ npm start

## Run Frontend 
1. Open new terminal
2. $ cd escooter-shop/client
3. $ npm install
4. $ npm start

## Seed Users and Products
1. Run in browser http://localhost:5000/api/users/seed which will created admin email and password.
2. Then run http://localhost:5000/api/products/seed to create 6 product samples.

## To Signin
Run http://localhost:3000/signin and enter admin email and password located in escooter-shop/server/data.js



