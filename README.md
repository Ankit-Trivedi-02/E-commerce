# E-Commerce MVP

A fully functional Minimum Viable Product (MVP) for an E-Commerce platform built with modern technologies.

## Tech Stack
- **Frontend:** React (Vite), React Router, TailwindCSS, Context API
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Image handling:** Multer (local `uploads` folder)

## Features Included
- **User Roles:** Admin & User access control
- **User Facing:** Product browsing, global state shopping cart, persistent cart, checkout with coupons, viewing order history, User Profile (Name/Email update), Order Timeline Tracking.
- **Admin Dashboard:** Creation and editing of products, uploading local images, generating & deleting discount coupons, managing all orders (Processing, Shipped, Delivered, Cancelled), and viewing all registered users.
- **UI Details:** Modern glassmorphism aesthetics, responsive styling via Tailwind, Toast notifications for actions, and loading states.
- **Security & Quality:** `helmet` for HTTP headers, `express-rate-limit` for rate limiting API routes, and `express-async-handler` for consistent error handling.

## New Routes Added
- **Profile:** `GET /api/users/profile`, `PUT /api/users/profile`
- **Coupons:** `DELETE /api/coupons/:id`
- **Orders:** Enhanced `GET /api/orders` to populate user/product data, added detailed `GET /api/orders/:id` for both User & Admin.
- **Products:** Enhanced `GET /api/products` with `keyword`, `category`, and `sort` query params.

## How to Run Locally

### 1. Database Setup
Ensure you have MongoDB running locally or a MongoDB Atlas URI.
The project expects `mongodb://127.0.0.1:27017/ecommerce-mvp` by default. You can change this in `backend/.env`.

### 2. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd d:/Projects/ecommerce-mvp/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```
   *(Ensure you have a `.env` file present in the `backend` folder with `MONGO_URI`, `PORT`, and `JWT_SECRET`)*

### 3. Frontend Setup
1. Open another terminal window and navigate to the frontend directory:
   ```bash
   cd d:/Projects/ecommerce-mvp/frontend
   ```
2. The dependencies have been installed automatically, but if you faced any issues, run:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 4. Admin Access
Register a user from the web interface, then modify that user's `role` property in your MongoDB database from `user` to `admin` to access the protected `/admin` endpoints.

Enjoy building upon this foundation!
