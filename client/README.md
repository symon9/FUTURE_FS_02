# E-Commerce Frontend Client

This is the frontend client for the mini e-commerce platform, built with Next.js (App Router), TypeScript, and styled with TailwindCSS.

---

## Setup and Installation

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env.local` file in this directory and add the following variable:
    ```
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_your_public_key"
    NEXT_PUBLIC_API_URL="http://localhost:5000/api"
    ```

---

## Available Scripts

- **`npm run dev`**: Starts the frontend application in development mode.
- **`npm run build`**: Builds the application for production.
- **`npm run start`**: Starts a production server.

---

## Core Features

- **State Management**: Global cart state is managed with **Zustand**.
- **Animations**: Page and component animations are handled by **GSAP**.
- **Styling**: A utility-first CSS approach using **TailwindCSS**.
- **Payments**: Secure payment processing via **React Paystack**.
