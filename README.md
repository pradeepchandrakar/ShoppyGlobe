# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# ShoppyGlobe

Sure! Here's a clean and professional `README.md` file for your **Full-Stack Shopping Cart App**:

---

```markdown
# 🛒 Full Stack Shopping Cart Application

This is a MERN (MongoDB, Express.js, React.js, Node.js) based shopping cart application where users can view products, add them to cart, update quantities, and remove items — all synced with a MongoDB backend.

---

## 🚀 Features

- ✅ User Authentication (JWT-based)
- 🛍 Product Listing with Dynamic Discounts
- 🛒 Fully Functional Cart (Add, Update, Delete)
- 💾 Cart data stored in MongoDB (not in local storage)
- ⚛️ State Management using Redux
- 🎨 Responsive UI with TailwindCSS + Framer Motion
- 🔐 Secure API with middleware protection

---

## 📁 Project Structure

```
/client        # Frontend - React
/server        # Backend - Express + MongoDB
```

---

## 📦 Technologies Used

### Frontend:
- React.js
- Redux Toolkit
- Axios
- React Router
- Framer Motion
- TailwindCSS

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- dotenv

---

## 🔧 Setup Instructions

### 📌 Prerequisites
- Node.js & npm
- MongoDB
- [Optional] Postman for API testing

---

### 🔐 Environment Variables

Create `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
```

---

### ▶️ Run the App

#### 1. Backend

```bash
cd server
npm install
npm run dev
```

#### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Now visit 👉 `http://localhost:5173`

---

## 📦 API Routes

| Method | Endpoint                   | Description                 |
|--------|----------------------------|-----------------------------|
| POST   | `/api/auth/register`       | Register new user           |
| POST   | `/api/auth/login`          | Login user & get token      |
| GET    | `/api/products`            | Fetch all products          |
| POST   | `/api/cart/add`            | Add item to cart            |
| PUT    | `/api/cart/update`         | Update cart item quantity   |
| DELETE | `/api/cart/remove/:id`     | Remove item from cart       |
| GET    | `/api/cart/`               | Fetch user cart             |

---

## 🤖 Sample Users

You can create your own or register through the frontend.  
Make sure to pass the token in headers for protected routes:

```http
Authorization: Bearer <your_token>
```

---

## 🧠 Notes

- Cart is stored in MongoDB linked with the authenticated user's ID.
- No use of `localStorage` for persistent cart data.
- React state is synced with backend using Redux.

---

## 🛠 Future Improvements

- ✅ Product filtering, search & categories
- ✅ Stripe Payment Integration
- ✅ Order History
- ✅ Admin Dashboard

---



## 👨‍💻 Author

Made with ❤️ by [Your Name]  
GitHub: [github.com/yourusername](https://github.com/yourusername)

---

## 📄 License

MIT License
```

---

Let me know if you want a version with screenshots, badges, or deployment steps (e.g. for Vercel/Render).