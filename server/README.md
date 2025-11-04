# E-Commerce API Server

This is the backend server for the mini e-commerce platform, built with Node.js, Express, TypeScript, and MongoDB.

---

## Setup and Installation

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env` file in this directory and add the following variables:

    ```
    MONGODB_URI="your_mongodb_connection_string"
    PAYSTACK_SECRET_KEY="sk_test_your_secret_key"
    JWT_SECRET="a_very_strong_and_long_secret_for_jwt"
    PORT=5000
    ```

3.  **Seed the Database (Optional but Recommended):**
    To populate the database with sample products, run:
    ```bash
    npm run seed
    ```

---

## Available Scripts

- **`npm run dev`**: Starts the server in development mode with auto-reloading using `ts-node-dev`.
- **`npm run build`**: Compiles the TypeScript code to JavaScript in the `/dist` folder.
- **`npm run start`**: Runs the compiled JavaScript code from the `/dist` folder (for production).
- **`npm run seed`**: Populates the database with sample products.

---

## API Endpoints

A summary of the available API endpoints.

| Method | Endpoint                   | Description                      | Protected |
| ------ | -------------------------- | -------------------------------- | --------- |
| `GET`  | `/api/products`            | Get all products                 | No        |
| `GET`  | `/api/products/:id`        | Get a single product             | No        |
| `POST` | `/api/auth/register`       | Register a new user              | No        |
| `POST` | `/api/auth/login`          | Log in a user                    | No        |
| `POST` | `/api/paystack/initialize` | Initialize a Paystack payment    | No        |
| `POST` | `/api/orders`              | Create a new order after payment | Yes       |
| `GET`  | `/api/orders/history`      | Get order history for the user   | Yes       |
