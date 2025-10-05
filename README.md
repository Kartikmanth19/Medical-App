# Medical Services App

A simple web application to book and manage medical service requests. It includes user and admin roles, service booking, request management, and authentication.

---

## 🚀 Tech Stack Used
- **Frontend:** React (Vite), React Router, Axios, CSS
- **Backend:** Node.js, Express.js, JWT Authentication, Bcrypt.js
- **Database:** JSON file (local storage for prototype)
- **Others:** CORS, Body-Parser, UUID for unique IDs

---

## 📌 Assumptions Made
- Users can register as either **user** or **admin**.
- Only **admins** can accept, complete, or delete service requests.
- Data is stored in a `data.json` file instead of a real database (for prototype simplicity).
- JWT tokens are used for authentication and stored in browser `localStorage`.

---

## ▶️ How to Run the App

### 1. Clone the repositories
```bash
# Clone backend
git clone https://github.com/Kartikmanth19/Medical-App.git
cd backend
npm install

# Clone frontend
git clone https://github.com/Kartikmanth19/Medical-App.git
cd frontend
npm install

```
### 2. Start Backend
```bash 
cd backend
node server.js

```
### 3. Start Frontend
```bash
cd frontend
npm run dev

```


🌱 Future Improvements (Scaling Ideas)

Replace JSON with a real database (MongoDB / PostgreSQL).
Add role-based dashboards with analytics for admins.
Add notifications/email confirmations for requests.
Improve UI/UX with a modern component library.
Add mobile support using React Native + Expo.

