# Zenvy API Server

This directory contains the complete backend API for the Zenvy e-commerce platform. It is a modern, scalable, and secure RESTful API built with Node.js, Express, and TypeScript, using MongoDB as its database.

---

## Features

-   **RESTful API:** Clean, well-structured endpoints for managing products, orders, users, and payments.
-   **JWT Authentication:** Secure endpoints using JSON Web Tokens for user registration and login.
-   **Payment Integration:** Handles payment initialization and verification with the Paystack API.
-   **Database Modeling:** Uses Mongoose for robust data modeling and interaction with MongoDB.
-   **TypeScript:** Fully typed codebase for improved developer experience and code quality.
-   **Service-Oriented Architecture:** Follows a professional `service -> controller -> route` pattern for clean separation of concerns.
-   **Server-Side Validation:** Ensures data integrity and security for all incoming requests.

---

## 🛠️ Tech Stack

-   **Framework:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ODM
-   **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/) & [bcrypt.js](https://github.com/kelektiv/node.bcrypt.js) for hashing
-   **Payments:** [Paystack API](https://paystack.com/docs/api/)

---

## 🚀 Getting Started

### 1. Installation

From within this `server` directory, install the required dependencies:
```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in this directory. You can copy the example file to get started:
```bash
# If you don't have a .env file yet
cp .env.example .env
```

Then, fill in the required variables in your `.env` file. These are all mandatory for the server to run.
```
MONGODB_URI="your_mongodb_connection_string"
PAYSTACK_SECRET_KEY="sk_test_your_secret_key"
JWT_SECRET="generate_a_strong_and_long_secret_for_jwt"
PORT=5000
```

### 3. Database Seeding

To populate your database with sample product data for testing and development, run the following command:
```bash
npm run seed
```
This script will clear the `products` collection and insert a fresh set of sample data.

### 4. Running the Server

Start the server in development mode. `ts-node-dev` will automatically watch for file changes and restart the server.
```bash
npm run dev
```
> The API will be available at `http://localhost:5000`.

---

## Available Scripts

-   **`npm run dev`**: Starts the server in development mode with hot-reloading.
-   **`npm run build`**: Compiles all TypeScript code from `/src` into standard JavaScript in the `/dist` folder.
-   **`npm run start`**: Runs the compiled production-ready code from the `/dist` folder.
-   **`npm run seed`**: Populates the database with sample products.

---

## API Endpoints Reference

| Method | Endpoint                  | Description                     | Protection |
|:-------|:--------------------------|:--------------------------------|:-----------|
| `GET`  | `/api/products`           | Get all products (can filter by `?category=...`) | Public     |
| `GET`  | `/api/products/:id`       | Get a single product by its ID  | Public     |
| `POST` | `/api/auth/register`      | Register a new user             | Public     |
| `POST` | `/api/auth/login`         | Log in a user and get a token   | Public     |
| `POST` | `/api/paystack/initialize`| Initialize a Paystack payment   | Public     |
| `POST` | `/api/orders`             | Create an order after payment verification | **Protected (JWT)** |
| `GET`  | `/api/orders/history`     | Get the logged-in user's order history | **Protected (JWT)** |

---

## Deployment

This Node.js application is ready for deployment on any platform that supports Node, such as [Render](https://render.com/), [Railway](https://railway.app/), or [Heroku](https://www.heroku.com/).

**Key Deployment Steps:**
1.  Set the `start` script in your hosting provider to `npm start`.
2.  Ensure you have set all the required environment variables (from the `.env` file) in your hosting service's dashboard.
3.  The build command should be `npm run build`.
