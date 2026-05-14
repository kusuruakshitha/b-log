# Thiranex Blog Platform

Thiranex Blog Platform is a full-stack blogging project where users can register, login, create blog posts, edit posts, delete posts, comment, search, and interact with content. The project also includes a standalone `index.html` demo website that works directly in the browser using local storage.

## Project Goal

The goal of this project is to learn and demonstrate full-stack development with:

- Frontend UI development
- Backend REST API development
- User authentication
- MongoDB database integration
- Blog post management
- Comment management
- Responsive design
- Useful features for users from any country

## File Structure

```text
b log/
│
├── index.html
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── commentController.js
│   │   └── postController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Comment.js
│   │   ├── Post.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── commentRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js
│   │   │
│   │   ├── assets/
│   │   │   └── .gitkeep
│   │   │
│   │   ├── components/
│   │   │   ├── AuthModal.jsx
│   │   │   ├── CommentBox.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── PostCard.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── CreatePost.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## Important Files Explained

### Root Files

`index.html`

This is a complete standalone blog website. It can run directly in the browser without installing Node.js or MongoDB. It uses browser `localStorage` to store users, posts, comments, likes, bookmarks, drafts, reports, theme, and language settings.

`.gitignore`

This file tells Git which files and folders should not be pushed to GitHub, such as:

```text
node_modules/
.env
dist/
.DS_Store
```

`README.md`

This file explains the project structure, setup process, features, and usage.

## Backend Explanation

The `backend` folder contains the Node.js, Express, and MongoDB API.

### `backend/server.js`

This is the main backend entry file. It:

- Loads environment variables
- Connects to MongoDB
- Creates the Express app
- Enables CORS
- Enables JSON body parsing
- Connects all API routes
- Starts the backend server

### `backend/config/db.js`

This file connects the backend to MongoDB using Mongoose.

### `backend/models/User.js`

Defines the user database structure.

User fields include:

- Name
- Email
- Password
- Avatar
- Bio

### `backend/models/Post.js`

Defines the blog post database structure.

Post fields include:

- Title
- Excerpt
- Content
- Cover image
- Tags
- Likes
- Author

### `backend/models/Comment.js`

Defines the comment database structure.

Comment fields include:

- Content
- Post ID
- Author ID

### `backend/controllers/authController.js`

Handles authentication logic:

- Register user
- Login user
- Logout user
- Get current user
- Generate JWT token
- Hash passwords using bcrypt

### `backend/controllers/postController.js`

Handles blog post logic:

- Get all posts
- Get single post
- Create post
- Update post
- Delete post
- Search posts
- Filter posts by tag

### `backend/controllers/commentController.js`

Handles comment logic:

- Get comments for a post
- Create comment
- Update comment
- Delete comment

### `backend/middleware/authMiddleware.js`

Checks JWT tokens and protects private routes. Only logged-in users can create posts, update posts, delete posts, and comment.

### `backend/routes/authRoutes.js`

Authentication API routes:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### `backend/routes/postRoutes.js`

Post API routes:

```text
GET    /api/posts
POST   /api/posts
GET    /api/posts/:id
PUT    /api/posts/:id
DELETE /api/posts/:id
```

### `backend/routes/commentRoutes.js`

Comment API routes:

```text
GET    /api/comments/post/:postId
POST   /api/comments/post/:postId
PUT    /api/comments/:id
DELETE /api/comments/:id
```

### `backend/.env`

Stores private backend settings:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Never push real `.env` secrets to GitHub.

## Frontend Explanation

The `frontend` folder contains the React and Vite app.

### `frontend/src/main.jsx`

This is the frontend entry file. It renders the React app into the browser.

### `frontend/src/App.jsx`

Contains the main routes of the React app:

- Home
- Login
- Register
- Create post
- Post detail
- Dashboard

It also protects private pages using authentication state.

### `frontend/src/api/axiosInstance.js`

Creates the Axios API connection to the backend.

Default API URL:

```text
http://localhost:5000/api
```

### `frontend/src/context/AuthContext.jsx`

Stores global authentication state for the React app.

It manages:

- Current user
- JWT token
- Login
- Register
- Logout
- Local storage persistence

### Components

`Navbar.jsx`

Displays navigation links, login/register buttons, dashboard link, create post link, and logout button.

`PostCard.jsx`

Displays a blog post preview card on the home page and dashboard.

`CommentBox.jsx`

Displays comments for a post and allows logged-in users to add comments.

`AuthModal.jsx`

Reusable authentication layout for login and register pages.

### Pages

`Home.jsx`

Displays all posts and includes search functionality.

`Login.jsx`

Allows existing users to login.

`Register.jsx`

Allows new users to create an account.

`CreatePost.jsx`

Allows logged-in users to create a new blog post.

`PostDetail.jsx`

Displays a single full blog post with comments.

`Dashboard.jsx`

Displays posts created by the logged-in user.

### `frontend/src/styles.css`

Contains all frontend styling for layout, cards, forms, buttons, post pages, dashboard, and responsive design.

## Features

This project includes more than 10 features:

1. User registration
2. User login
3. JWT authentication
4. Create blog posts
5. View all blog posts
6. View single blog post
7. Edit own posts
8. Delete own posts
9. Add comments
10. View comments
11. Update comments
12. Delete comments
13. Search posts
14. Filter posts by tags
15. Dashboard for user posts
16. Responsive design
17. Profile avatar and bio fields
18. Like field support in database
19. Standalone local storage demo website
20. Dark and light mode in standalone website
21. Bookmark feature in standalone website
22. Draft saving in standalone website
23. Multilingual interface labels in standalone website
24. Country-based post metadata in standalone website
25. Report post feature in standalone website

## Step-by-Step Setup

### Step 1: Open Project Folder

Open this folder in VS Code:

```text
c:\Users\ramya\OneDrive\Desktop\b log
```

### Step 2: Run the Standalone Website

For the simple working website, open:

```text
index.html
```

You can open it directly in your browser. It does not need backend setup.

The standalone website supports:

- Login
- Register
- Create post
- Edit post
- Delete post
- Comment
- Like
- Bookmark
- Search
- Filter
- Sort
- Save draft
- Dark mode
- Multiple language labels

### Step 3: Setup Backend

Open a terminal in VS Code and run:

```bash
cd backend
npm install
```

Then update `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

### Step 4: Setup Frontend

Open a second terminal and run:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend will usually run on:

```text
http://localhost:5173
```

### Step 5: Connect Frontend to Backend

Check `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

This tells the React app where the backend API is running.

### Step 6: Test the App

Test these actions:

1. Register a new user.
2. Login with the user.
3. Create a blog post.
4. View the post on the home page.
5. Open the post detail page.
6. Add a comment.
7. Open dashboard.
8. Confirm your post appears there.
9. Try editing the post.
10. Try deleting the post.

## MongoDB Setup

You can use either:

- MongoDB Atlas cloud database
- Local MongoDB installed on your system

Example local MongoDB URI:

```env
MONGO_URI=mongodb://127.0.0.1:27017/thiranex-blog
```

Example MongoDB Atlas URI:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/thiranex-blog
```

## How Authentication Works

1. User registers or logs in.
2. Backend checks credentials.
3. Backend creates a JWT token.
4. Frontend stores the token in local storage.
5. For protected requests, frontend sends the token in the `Authorization` header.
6. Backend middleware verifies the token.
7. If valid, the user can create posts, update posts, delete posts, and comment.

## API Summary

### Auth APIs

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Post APIs

```text
GET    /api/posts
POST   /api/posts
GET    /api/posts/:id
PUT    /api/posts/:id
DELETE /api/posts/:id
```

### Comment APIs

```text
GET    /api/comments/post/:postId
POST   /api/comments/post/:postId
PUT    /api/comments/:id
DELETE /api/comments/:id
```

## GitHub Push Steps

```bash
git init
git add .
git commit -m "Initial commit - Thiranex Blog Platform"
git remote add origin https://github.com/YOUR_USERNAME/thiranex-blog-platform.git
git branch -M main
git push -u origin main
```

Before pushing, make sure real `.env` secrets are not uploaded.

## Future Improvements

- Rich text editor
- Image upload
- Admin dashboard
- User profile editing
- Follow users
- Post reactions
- Email verification
- Password reset
- Pagination
- Notification system
- Better moderation tools
- Deployment to Render, Vercel, or Netlify

## Project Outcome

After completing this project, you will understand how to build a full-stack content management platform with user authentication, posts, comments, frontend routing, backend APIs, and database integration.
