# Zenvy: A Full-Stack E-Commerce Platform

![License](https://img.shields.io/github/license/symon9/FUTURE_FS_02)
![Issues](https://img.shields.io/github/issues/symon9/FUTURE_FS_02)
![Stars](https://img.shields.io/github/stars/symon9/FUTURE_FS_02)
![Forks](https://img.shields.io/github/forks/symon9/FUTURE_FS_02)


### Your World of Smart Shopping

Zenvy is a complete, modern, and full-stack e-commerce application built from the ground up. It features a sleek, animated user interface and a secure, robust backend, providing a seamless and enjoyable marketplace experience for both customers and administrators.

<!--
IMPORTANT: Create a high-quality GIF of your application in action and place it here.
Record your screen showing:
1. The homepage hero animation.
2. Scrolling down to see the scroll-triggered animations.
3. Filtering products.
4. Adding an item to the cart (showing the toast).
5. Navigating to the cart, then checkout.
6. The final success animation.

Save it as `demo.gif` in a root `/public` or `/docs` folder.
-->

![Zenvy Demo GIF](https://your-gif-url-here.com/demo.gif)

---

## ✨ Live Demo

**[Check out the live version here!]** &nbsp;&nbsp;

---

## 🚀 Key Features

### Core E-Commerce Functionality

- **🛍️ Product Showcase:** Dynamic product listing fetched from the backend.
- **🔍 Real-time Filtering & Search:** Instantly filter products by category or search by name.
- **🛒 Global Shopping Cart:** State managed with Zustand, persisted in `localStorage`.
- **💳 Secure Checkout Flow:** Multi-step checkout process with user detail collection.
- **💸 Real Payments:** Integrated with the **Paystack API** for secure, real-world transactions.
- **👤 JWT Authentication:** Secure user registration and login system.
- **🔐 Protected Routes:** Customer order history is protected and only visible to logged-in users.
- **📜 Order History:** A beautiful, accordion-style interface for users to view past orders.

### Modern UI/UX & Animations

- **🎨 Professional Branding:** A complete "Zenvy" brand identity with a modern color palette and typography.
- **🌟 Interactive Hero Section:** Features a multi-layered, mouse-driven parallax effect and continuous background animations.
- **🔥 Advanced GSAP Animations:**
  - Staggered "reveal" animations for text and product cards.
  - Scroll-triggered animations for homepage sections using **ScrollTrigger**.
  - Smooth filtering animations with **GSAP Flip** that prevent layout shift.
- **📱 Fully Responsive:** Meticulously designed for a seamless experience on all devices, from mobile to ultra-wide screens.
- **🔔 User Feedback:** Includes toast notifications for actions like "Add to Cart".

### Robust Backend Architecture

- **⚙️ Monorepo Structure:** Clean separation of `client` and `server` codebases within a single repository.
- **💪 Scalable API:** Built with Node.js and Express, following a professional service-controller-route pattern.
- **🔒 Secure by Design:** Implements JWT for securing endpoints and server-side validation for orders.
- **💾 MongoDB Integration:** Uses Mongoose for elegant and powerful database modeling and interaction.

---

## 🛠️ Tech Stack

| Category       | Technology                                                                |
| :------------- | :------------------------------------------------------------------------ |
| **Frontend**   | **Next.js** (App Router), **TypeScript**, **React**, **Tailwind CSS**     |
| **State Mgt.** | **Zustand** (for global cart & auth state)                                |
| **Animation**  | **GSAP (GreenSock Animation Platform)** with Flip & ScrollTrigger plugins |
| **Backend**    | **Node.js**, **Express.js**, **TypeScript**                               |
| **Database**   | **MongoDB** with **Mongoose** ODM                                         |
| **Payments**   | **Paystack API**                                                          |
| **Auth**       | **JSON Web Tokens (JWT)**, **bcrypt.js**                                  |

---

## 📂 Project Structure

This project is a monorepo containing two main packages:

```
/mini-ecommerce-platform
|-- /client/         # The Next.js frontend application
|   |-- /app/
|   |-- /components/
|   |-- /store/
|   `-- README.md
|
|-- /server/         # The Node.js + Express backend API
|   |-- /src/
|   |   |-- /controllers/
|   |   |-- /models/
|   |   |-- /routes/
|   |   `-- /services/
|   `-- README.md
|
|-- .gitignore       # Global ignore file
|-- package.json     # (Optional: for root-level scripts)
`-- README.md        # You are here
```

---

## 🚀 Getting Started

To run this project locally, you will need to set up both the backend server and the frontend client in two separate terminal windows.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally or a free MongoDB Atlas cluster URL.
- A [Paystack](https://paystack.com/) account to get API keys.

### 1. Backend Setup

```bash
# 1. Navigate to the server directory
cd server

# 2. Install dependencies
npm install

# 3. Create an environment file
# Copy the example file and fill in your own keys
cp .env.example .env
```

Your `server/.env` file should look like this:

```````
MONGODB_URI="your_mongodb_connection_string"
PAYSTACK_SECRET_KEY="sk_test_your_secret_key"
JWT_SECRET="a_very_strong_and_long_secret_for_jwt"
PORT=5000``````bash
# 4. Seed the database with sample products (optional but recommended)
npm run seed

# 5. Start the backend server
npm run dev
```````

🎉 The server will be running on `http://localhost:5000`.

### 2. Frontend Setup

Open a **new terminal window**.

```bash
# 1. Navigate to the client directory
cd client

# 2. Install dependencies
npm install

# 3. Create a local environment file
# Copy the example file and fill in your own keys
cp .env.local.example .env.local
```

Your `client/.env.local` file should look like this:

```````
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_your_public_key"
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXTAUTH_URL="http://localhost:3000"
``````bash
# 4. Start the frontend client
npm run dev
```````

🎉 The client will be running on `http://localhost:3000`. Open this URL in your browser to see the application!

---

## 🚢 Deployment

This application is configured for easy deployment:

- **Frontend (Client):** The Next.js application can be deployed with one click to **[Vercel](https://vercel.com/)**. Vercel will automatically detect the Next.js project within the `/client` directory.
- **Backend (Server):** The Node.js server can be deployed to services like **[Render](https://render.com/)** or **[Railway](https://railway.app/)**. You will need to set the environment variables in their respective dashboards.

---

## 👤 Author

**Simon Emmanuel**

- GitHub: [@symon9](https://github.com/symon9)
- LinkedIn: [Simon Emmanuel](https://www.linkedin.com/in/simon-emmanuel/)
- Portfolio: [iamsimon.vercel.app](https://iamsimon.vercel.app)

