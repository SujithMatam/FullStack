Title: Know Your Food Blog

Final Pages (keep this fixed)

1. Home
2. Blog List
3. Blog Details
4. Restaurant List
5. Restaurant Details
6. Login / Register
7. Add Post (Admin)
8. Profile (basic)

👉 Total: 7–8 pages

Sujith - Home
Pranav - 2,3
Vivek - 4,5
Rishi-6,7,8

--------------------------------------------------------------------------------------

🔁 Push to GitHub
git add .
git commit -m "Initial Vite MERN setup"
git push origin main

--------------------------------------------------------------------------------------

👥 What Your Teammates Do
git clone <repo-link>
cd FullStack

cd client
npm install
npm run dev

cd ../server
npm install
npm run dev

--------------------------------------------------------------------------------------

⚡ Important (Don’t Skip)
Frontend runs on → 5173
Backend runs on → 5000
API calls → http://localhost:5000

----------------------------------------------------------------------------------------

Folder Structure:

FullStack/
│
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PostCard.js
│   │   │   └── RestaurantCard.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── BlogList.js
│   │   │   ├── BlogDetails.js
│   │   │   ├── RestaurantList.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── AddPost.js
│   │   │
│   │   ├── services/      # API calls
│   │   │   └── api.js
│   │   │
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── package.json
│   └── .gitignore
│
├── server/                # Node + Express backend
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Restaurant.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── postRoutes.js
│   │   └── restaurantRoutes.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── postController.js
│   │   └── restaurantController.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore

-------------------------------------------------------------------------------------

Use MERN Stack :

&#x20;     - MongoDB
&#x20;     - Express.js
&#x09;     - React
&#x09;     - Node.js

--------------------------------------------------------------------------------------

This is a 10 day plan but we will compromise to 5 days.

Day 1 – Planning + Setup

* Decide features (use above)
* Create GitHub repo
* Setup:
    * React app
    * Node + Express server
    * MongoDB connection

⸻

🔹 Day 2 – Backend Basics

* Create models:
    * User
    * Post
    * Restaurant
* Setup basic APIs:
    * /posts
    * /restaurants
    * /users

⸻

🔹 Day 3 – Authentication

* Register API
* Login API
* JWT setup
* Test with Postman

⸻

🔹 Day 4 – Frontend Setup

* Setup React routing
* Create pages (empty first):
    * Home
    * Blog
    * Restaurant
    * Login/Register

⸻

🔹 Day 5 – Blog Feature

* Show all posts
* Single post page
* Connect backend

⸻

🔹 Day 6 – Restaurant Feature

* List restaurants
* Restaurant details page
* Display menu items

⸻

🔹 Day 7 – Add Post (Admin)

* Form to create blog
* Image + text
* Save to DB

⸻

🔹 Day 8 – Comments + Profile

* Add comment system (simple)
* Show user profile (basic info)

⸻

🔹 Day 9 – UI + Fixing

* Improve UI (Bootstrap / CSS)
* Fix bugs
* Add loading states


