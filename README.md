<h2>Blog Writing App</h2>
<p>
  A simple blog application with user authentication and JWT-based authorization. Built with modern web technologies for a seamless blogging experience.
</p>
<br />


<h3>🚀 Technologies Used</h3>
<p>
  <ul>
    <li>
      JavaScript - Core programming language
    </li>
    <li>
      Node.js - Runtime environment
    </li>
    <li>
     Express.js - Web application framework
    </li>
    <li>
     PostgreSQL - Relational database
    </li>
    <li>
     Prisma ORM - Database toolkit
    </li>
    <li>
     Prisma ORM - Database toolkit
    </li>
    <li>
     Prisma ORM - Database toolkit
    </li>
  </ul>
<br />
<br />

<h3>📋 Introduction</h3>
<p>This is a simple Blog Writing Application that allows users to:</p>
<ul>
  <li>
    Register and login with secure JWT authentication
  </li>
<ul>
  <li>
    Create, read, update, and delete blog posts
  </li>
  <li>
   Secure API endpoints with authorization
  </li>
</ul>
<p>
  The application follows RESTful API design principles and uses Prisma ORM for efficient database operations with PostgreSQL.
</p>

<h3>
  ⚙️ Installation Guide
</h3>
<p>Prerequisites</p>
<ul>
  <li>Node.js (v14 or higher)</li>
  <li>npm (v6 or higher)</li>
  <li>PostgreSQL (v12 or higher)</li>
</ul>

<br />
<h4>Step-by-Step Installation</h4>
<br>
<p>1.Clone the repository</p>
```bash
git clone https://github.com/Sohailshaikh5656/blogApp.git
cd blogApp
```
<br />

<p>2.Install dependencies</p>
```bash
npm install
```
<br />

<p>3.Set up PostgreSQL Database</p>
```bash
#Install PostgreSQL on your system
#Create a new database for the application
#Note your database credentials (username, password, database name)
```
<br />

<p>4.Configure Environment Variables</p>
<ul>
  <li>Create a .env file in the root directory</li>
  <li>Add your database connection string:</li>
</ul>
```bash
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME"
SECRET_KEY = mysecretjwtkey123 #use any random string its require to build jwt tokens for users or just copy this..
PORT=3000
```

<br />

<p>5.Set up Prisma ORM</p>
```bash
# Initialize Prisma (if not already set up)
npx prisma init
# Generate Prisma Client (Prisma version ^6.19.0)
npx prisma generate
# Run database migrations
npx prisma migrate dev --name init
```
<br />

<p>6.Start the application</p>
```bash
# Development mode with nodemon
nodemon server
# Or with node
node server
```

<p>7.Access the application</p>
<ul>
  <li>The server will run on http://localhost:3000</li>
  <li>Use API testing tools like Postman or Thunder Client to interact with endpoints</li>
</ul>
<br />

<h3📁 Project Structure</h3>
```bash
blogApp/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Database migration files
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── authController.js  # Authentication logic
│   │   └── postController.js  # Blog post operations
│   ├── middleware/            # Custom middleware
│   │   ├── authMiddleware.js  # JWT verification
│   │   └── validation.js      # Input validation
│   ├── models/               # Data models (if not using Prisma directly)
│   ├── routes/               # API route definitions
│   │   ├── authRoutes.js     # Authentication routes
│   │   └── postRoutes.js     # Blog post routes
│   ├── utils/                # Utility functions
│   │   └── jwtUtils.js       # JWT helper functions
│   └── config/               # Configuration files
│       └── database.js       # Database connection setup
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies
├── server.js               # Application entry point
└── README.md               # This file
```

<h3>✨ Features</h3>
<br />
<h5>🔐 Authentication & Authorization</h5>
<ul>
  <li>User registration and login</li>
  <li>JWT-based authentication</li>
  <li>Password hashing with bcrypt</li>
  <li>Protected routes with middleware</li>
</ul>
<br />
<br />
<h5>📝 Blog Management</h5>
<ul>
  <li>Create new blog posts</li>
  <li>Read all posts or specific posts</li>
  <li>Update existing posts</li>
  <li>Delete posts</li>
</ul>
<br />
<h5>📊 API Endpoints</h5>
<ul>
  <li>POST /api/auth/register - Register a new user</li>
  <li>POST /api/auth/login - User login</li>
  <li>GET /api/allblogs - Get all blog posts</li>
  <li>GET /api/myblogs - Get My blog posts</li>
  <li>GET /api/posts/:id - Get a specific post</li>
  <li>POST /api/posts - Create a new post</li>
  <li>PUT /api/posts/:id - Update a post</li>
  <li>DELETE /api/posts/:id - Delete a post (protected)</li>
</ul>
<br />

<h3>📸 Screenshots</h3>
<hr />
<h5>Backend Post Man Api's Image</h5>
<div align="center"> 
  <img src="screenShots/backendApi1.png" width="75%" />
  <img src="screenShots/backendApi2.png" width="75%" />
</div>
<hr />
<h5>Api Documentation</h5>
<div align="center>
  <img src="screenShots/docx1.png" width="75%" />
  <img src="screenShots/docx1.png" width="75%" />
  <img src="screenShots/docx1.png" width="75%" />

</div>

<br />
<h3>🔧 Prisma Schema Example</h3>
```bash
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  password String
  blogs Blog[]
  isActive Boolean @default(true)
  isDeleted Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
model Blog{
  id Int @id @default(autoincrement())
  title String
  slug String @unique
  content String
  summary String
  authorId Int
  tags String
  views Int @default(0)
  status String @default("DRAFT")
  author User @relation(fields: [authorId], references: [id])
  isActive Boolean @default(true)
  isDeleted Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

<br />







