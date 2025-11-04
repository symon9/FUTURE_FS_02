# Full-Stack Mini E-Commerce Platform

This repository contains a complete full-stack e-commerce platform built with a modern technology stack. It features product listings, a shopping cart, and a complete checkout flow with real payments powered by Paystack.

## Project Structure

- **/client**: The Next.js frontend application.
- **/server**: The Node.js, Express, and MongoDB backend API.

Each directory contains its own `README.md` with specific instructions for setup and usage.

---

## Core Technologies

- **Frontend**: Next.js (App Router), TypeScript, Zustand, TailwindCSS, GSAP
- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose)
- **Payments**: Paystack API
- **Authentication**: JSON Web Tokens (JWT)

---

## Getting Started

To run the full application, you will need to run both the client and server in separate terminal windows.

1.  **Run the Backend Server:**

    ```bash
    cd server
    npm install
    npm run dev
    ```

    > The server will be running on `http://localhost:5000`. See `server/README.md` for more details.

2.  **Run the Frontend Client:**
    ```bash
    cd client
    npm install
    npm run dev
    ```
    > The client will be running on `http://localhost:3000`. See `client/README.md` for more details.
