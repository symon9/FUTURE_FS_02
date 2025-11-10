# Zenvy Frontend Client

Welcome to the frontend of Zenvy! This is a modern, high-performance web application built with Next.js, TypeScript, and styled with Tailwind CSS, providing a rich and interactive user experience for the e-commerce platform.

---

## ✨ Features

-   **Modern Framework:** Built with **Next.js 14+** using the App Router for optimal performance, server components, and developer experience.
-   **Fully Typed:** Written entirely in **TypeScript** for robust, scalable, and error-free code.
-   **Advanced Animations:** Utilizes **GSAP (GreenSock Animation Platform)** with the Flip and ScrollTrigger plugins to create a dynamic and engaging user interface, from hero animations to smooth filtering.
-   **Global State Management:** Employs **Zustand** for simple, powerful, and non-boilerplate management of global state for the shopping cart and user authentication.
-   **Responsive Design:** Styled with **Tailwind CSS** for a beautiful, consistent, and fully responsive UI that looks great on all devices.
-   **Component-Based Architecture:** Organized into modular, reusable components and page sections for easy maintenance and scalability.
-   **Secure Authentication Flow:** Complete user login, registration, and persistent sessions handled via JWTs.
-   **Protected Routes:** Client-side logic to protect routes like `/checkout` and `/account/orders`, ensuring only authenticated users can access them.

---

## 🛠️ Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
-   **Animation:** [GSAP](https://gsap.com/)
-   **Data Fetching:** [Axios](https://axios-http.com/)
-   **UI Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Installation

From within this `client` directory, install the required dependencies:
```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in this directory. This file is for your local development keys and is ignored by Git. You can copy the example file to get started:
```bash
# If you don't have a .env.local file yet
cp .env.local.example .env.local
```

Then, fill in the required variables in your `.env.local` file:
```
# Your public key from the Paystack dashboard
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_your_public_key"

# The base URL of the backend API server
NEXT_PUBLIC_API_URL="http://localhost:5000/api"

NEXTAUTH_URL="http://localhost:3000"
```

### 3. Running the Development Server

Before starting the client, ensure the [backend server](../server/README.md) is running.

To start the Next.js development server:
```bash
npm run dev
```
> The application will be available at `http://localhost:3000`. The site will automatically hot-reload when you make changes.

---

## Available Scripts

-   **`npm run dev`**: Starts the application in development mode.
-   **`npm run build`**: Creates an optimized production build of the application.
-   **`npm run start`**: Starts the application in production mode (requires `npm run build` to be run first).
-   **`npm run lint`**: Runs ESLint to check for code quality and style issues.

---

## Folder Structure Overview

-   **/app**: Contains all pages, layouts, and route definitions, following the Next.js App Router convention.
-   **/components**: Houses all reusable React components, organized by function (e.g., `sections`, `ui`).
-   **/lib**: Contains library code and helper functions, such as the configured `axios` API client (`api.ts`).
-   **/store**: Holds all Zustand store definitions for global state management (`cartStore.ts`, `authStore.ts`).
-   **/types**: Contains all shared TypeScript type and interface definitions (`index.ts`).
-   **/utils**: Includes utility functions used across the application.
-   **/public**: For static assets like images and fonts.
