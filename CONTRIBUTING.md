# Contributing to Zenvy

First off, thank you for considering contributing to Zenvy! We're excited to see our community grow and improve the platform together. This document provides guidelines for contributing to the project.

## Code of Conduct

This project and everyone participating in it is governed by the [Zenvy Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior.

## How Can I Contribute?

There are many ways to contribute, and we appreciate all of them:

-   **🐛 Reporting Bugs:** If you find a bug, please open an issue and provide detailed steps to reproduce it.
-   **✨ Suggesting Enhancements:** Have an idea for a new feature or an improvement to an existing one? Open an issue to start a discussion.
-   **📝 Improving Documentation:** If you find parts of the documentation that are unclear or could be improved, please let us know.
-   ** aport Pull Requests:** If you're ready to contribute code, that's fantastic! Please follow the steps below.

---

## 🚀 Development Setup

To get the project running on your local machine for development and testing purposes, please follow the setup instructions in our main [README.md](./README.md).

A quick summary:
1.  **Fork** the repository to your own GitHub account.
2.  **Clone** your fork to your local machine:
    ```bash
    git clone https://github.com/YOUR_USERNAME/mini-ecommerce-platform.git
    cd mini-ecommerce-platform
    ```
3.  **Set up the Backend:**
    ```bash
    cd server
    npm install
    cp .env.example .env  # Or create a .env file
    # Fill in your environment variables
    npm run dev
    ```
4.  **Set up the Frontend** (in a new terminal window):
    ```bash
    cd client
    npm install
    cp .env.local.example .env.local  # Or create a .env.local file
    # Fill in your environment variables
    npm run dev
    ```

---

## Pull Request Process

We follow a standard "fork and pull" model for contributions.

1.  **Create a New Branch:** Before making any changes, create a new branch from `main`. Please use a descriptive branch name that follows our convention:
    -   `feat/<scope>/<description>` for new features (e.g., `feat/client/add-profile-page`)
    -   `fix/<scope>/<description>` for bug fixes (e.g., `fix/server/order-validation`)
    -   `docs/<scope>/<description>` for documentation changes (e.g., `docs/readme/update-setup-guide`)

    ```bash
    git checkout -b feat/client/describe-your-feature
    ```

2.  **Make Your Changes:** Write your code, following the style guidelines below. Ensure that your code is clean, readable, and well-commented where necessary.

3.  **Commit Your Changes:** We use the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. This helps us automate releases and makes the project history easy to read.

    -   **Format:** `type(scope): subject`
    -   **Example `feat`:** `feat(client): add user profile avatar upload`
    -   **Example `fix`:** `fix(server): correct total amount calculation in orders`
    -   **Example `docs`:** `docs(readme): update deployment instructions`

4.  **Push to Your Fork:**
    ```bash
    git push origin feat/client/describe-your-feature
    ```

5.  **Open a Pull Request:** Go to the original Zenvy repository on GitHub and open a new Pull Request.
    -   Provide a clear and descriptive title.
    -   In the description, explain the "why" and "what" of your changes. If your PR fixes an open issue, please reference it (e.g., "Closes #23").
    -   If you've made UI changes, include a screenshot or GIF.

---

## Styleguides

### Code Style

-   **Client (Next.js):** We use TypeScript and follow standard React/Next.js best practices. Components should be modular and single-purpose. Please run the linter before committing:
    ```bash
    cd client
    npm run lint
    ```
-   **Server (Node.js):** We use TypeScript and follow a service-controller-route pattern. Code should be clean, well-typed, and include error handling.

### Git Commit Messages

As mentioned above, we strictly follow the **Conventional Commits** specification. This is mandatory for all contributions.

### Naming Conventions

-   **React Components:** `PascalCase.tsx` (e.g., `ProductCard.tsx`)
-   **API Endpoints & Routes:** `kebab-case.ts` (e.g., `products.routes.ts`)

---

Thank you again for your interest in making Zenvy better! We look forward to your contributions.
