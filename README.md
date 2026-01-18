# TechMart Client

TechMart is a modern e-commerce application built with Next.js, allowing users to browse products, manage a personal dashboard, and simulate ordering processes. It features a responsive UI designed with Tailwind CSS and integrates Firebase for authentication.

## 🚀 Features

-   **Public Product Browsing**: Users can view all products and product details without logging in.
-   **Authentication**:
    -   **Firebase Auth**: Secure email/password and Google login.
    -   **Mock Login**: A built-in mock session for development and testing.
-   **Dashboard**: A protected area for users to manage their profile, view orders, and manage added products.
-   **Order System**: Integrated ordering flow with confirmation dialogs (SweetAlert2).
-   **Responsive Design**: Fully responsive layout optimized for mobile and desktop.

## 🛠️ Tech Stack

-   **Framework**: Next.js 16 (App Router)
-   **Styling**: Tailwind CSS
-   **Authentication**: Firebase & Custom Mock Auth
-   **Notifications**: SweetAlert2
-   **Icons**: React Icons

## ⚙️ Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd techmart-client
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root directory and add your API and Firebase keys:
    ```env
    NEXT_PUBLIC_API_URL=http://your-backend-api-url
    NEXT_PUBLIC_FIREBASE_API_KEY=your_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📍 Route Summary

| Route | Access | Description |
| :--- | :--- | :--- |
| `/` | Public | Home page with hero section and featured content. |
| `/products` | Public | Grid view of all available products. |
| `/product/[id]` | Public | Detailed view of a specific product. Ordering requires login. |
| `/login` | Public | User login page (Firebase & Mock). |
| `/register` | Public | New user registration page. |
| `/dashboard` | Protected | User dashboard for managing profile and data. |

## 🧪 Mock Login Credentials

For testing purposes without creating a Firebase account, you can use the hardcoded mock credentials:

-   **Email**: `test@techmart.com`
-   **Password**: `password`

This will simulate a logged-in session using local storage.