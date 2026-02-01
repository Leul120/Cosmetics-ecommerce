# Cosmetics E-commerce

Full-stack cosmetics e-commerce application.

- **Frontend**: React (Create React App), Ant Design, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Media**: Cloudinary uploads (via Multer + Cloudinary Storage)
- **Auth**: JWT + Google OAuth
- **Payments**: Chapa (server-side integration)
- **Realtime**: Socket server (initialized on port `9000`)

## Features

- Product catalog (multiple categories)
- Product details pages
- Cart management
- Orders + payment flow
- Reviews
- User authentication (email/password + Google)
- Admin-protected endpoints (users/orders/products)

## Project Structure

- `client/` React application
- `server/` Express API

## Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB running locally or a MongoDB connection string

## Environment Variables

This repo currently contains `.env` files with secrets. **Do not commit real secrets**.

### Server (`server/.env`)

Create `server/.env`:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CHAPA_AUTH=your_chapa_secret
MAIN_URL=http://localhost:8000
RETURN_URL=http://localhost:3000/cart

GOOGLE_CLIENT_ID=your_google_client_id
```

### Client (`client/.env`)

Create `client/.env`:

```env
REACT_APP_URL=http://localhost:8000
```

## Install & Run (Development)

Run backend and frontend in separate terminals.

### 1) Backend

```bash
npm install
node app.js
```

Run this from the `server/` directory.

The API will start on:

- `http://localhost:8000`

And the socket server is initialized on:

- `http://localhost:9000`

### 2) Frontend

```bash
npm install
npm start
```

Run this from the `client/` directory.

The app will start on:

- `http://localhost:3000`

## API Overview

Base URL: `http://localhost:8000`

- `GET /get-all-products`
- `GET /get-product/:category/:id`
- `POST /user/signup`
- `POST /user/login`
- `GET /user/verify-user/:id`
- `POST /cart/add-to-cart` (protected)
- `GET /cart/get-from-cart` (protected)
- `POST /order/create-order` (protected)
- `POST /order/pay` (protected)
- `GET /order/verify-payment/:orderID/:id`
- `POST /review/add-review` (protected)

## Notes

- CORS is configured in `server/app.js` for `http://localhost:3000`.
- If you want a smoother dev experience, consider adding scripts like `"start"` and `"dev"` (nodemon) to `server/package.json`.

## Screenshots

Add screenshots/gifs here.

## License

Specify a license (e.g. MIT) if you plan to distribute this project.
