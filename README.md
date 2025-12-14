# CRM-r-e — Simple MERN CRUD Project

This is a simple CRM (Customer Relationship Manager) application I built using the **MERN stack** — **MongoDB**, **Express**, **React (Vite)**, and **Node.js**.  
It’s a small beginner-friendly project that shows how to connect a frontend and backend, perform CRUD operations, use environment variables, and deploy everything on Render.

---

## 🌟 What it Does

- Lets you manage customer data — name, email, phone, company, and notes  
- Add new customers, view all customers, edit or delete existing ones  
- Uses a clean table view with simple modals for adding and editing  
- Supports search (using fuzzy search with Fuse.js)  
- Data is stored in a MongoDB Atlas cloud database  

---

## ⚙️ Technologies Used

| Layer | Technology |
|--------|-------------|
| Frontend | React (Vite) + Bootstrap + Axios |
| Backend | Node.js + Express + Mongoose |
| Database | MongoDB Atlas |
| Deployment | Render (Free tier) |

---

## 🧱 Project Structure

```crm-app/
├── backend/
│ ├── index.js # Express server + Mongoose setup
│ ├── models/
│ │ └── Customer.js # Mongoose schema
│ ├── routes/
│ │ └── customers.js # API routes for CRUD operations
│ ├── package.json
│ └── .env # Environment variables (ignored in git)
│
├── frontend/
│ ├── src/
│ │ └── App.jsx # React app (Vite)
│ ├── vite.config.js
│ ├── package.json
│ └── .env # Environment variables (ignored in git)
│
└── README.md
```
---

## 🔑 Environment Variables

Create `.env` files locally — not uploaded to GitHub

### `backend/.env`
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/crm?retryWrites=true&w=majority
PORT=5000

### `frontend/.env`
VITE_API_URL=http://localhost:5000/api

When deployed on Render:
- Backend → add `MONGO_URI` in the Environment tab  
- Frontend → add `VITE_API_URL=https://your-backend.onrender.com/api`

---

## 🧠 CRUD Operations (via MongoDB)

### ➕ Create
**POST** `/api/customers`
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "company": "TechCorp",
  "notes": "VIP client"
}

### 📖 Read
**GET** `/api/customers` → returns all customers

### ✏️ Update
**PUT** `/api/customers/:id`
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}

### ❌ Delete
**DELETE** `/api/customers/:id`

---

## 🧩 Mongoose Schema Example

```
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  notes: String
}, { timestamps: true });

export default mongoose.model("Customer", customerSchema);
```

---


## 💻 Run Locally

### 1️⃣ Clone the repo
```
git clone https://github.com/whale2186/crm-r-e.git`
cd crm-r-e
```

### 2️⃣ Install and start backend
```
cd backend
npm install
npm run dev
```
### 3️⃣ Install and start frontend
```
cd ../frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173  
Backend runs on http://localhost:5000  

Both should be connected through the `VITE_API_URL` in your `.env` file.

---


## 🌐 Deploy to Render

### Backend (Web Service)
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Add environment variable:  
  `MONGO_URI` = MongoDB Connection String

### Frontend (Static Site)
- Root directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`
- Add environment variable:  
  `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

---


## ⚠️ Common Fixes

- **MongoDB timeout / connection error** → In Atlas, go to *Network Access* → Add IP

---

## ✅ Quick Test Commands

# Create
curl -X POST https://your-backend.onrender.com/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'

# Read
curl https://your-backend.onrender.com/api/customers

# Update
curl -X PUT https://your-backend.onrender.com/api/customers/<id> \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'

# Delete
curl -X DELETE https://your-backend.onrender.com/api/customers/<id>

---

## 💬 About the Project

This project was built to learn and demonstrate how the MERN stack works end-to-end.  
It’s not meant to be fancy — just clean, simple, and functional.  
The goal was to show a working CRUD setup with MongoDB Atlas, Express routes, and a small React frontend — and to deploy everything using Render’s free services.

---

### 🧾 Summary

| Feature   | Stack |
|------------|--------|
| Frontend   | React (Vite) |
| Backend    | Node.js + Express |
| Database   | MongoDB Atlas (via Mongoose) |
| Hosting    | Render (Free Tier) |

---

## 🌍 Live Demo

> **Note:** It might take a few seconds for the backend to start because Render puts free instances to sleep after 15 minutes of inactivity.

- **Frontend:** [https://crm-r-e-frontend.onrender.com](https://crm-r-e-frontend.onrender.com)  
- **Backend (API):** [https://crm-r-e-backend.onrender.com/api/customers](https://crm-r-e-backend.onrender.com/api/customers)

---

Built with ❤️ for learning MERN and understanding how full-stack apps connect together.

