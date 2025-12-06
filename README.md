<h2>Blog Writing App</h2>
<p>
  A simple blog application with user authentication and JWT-based authorization. Built with modern web technologies for a seamless blogging experience.
</p>
<br />

<div align="center" style="display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap; gap: 20px; padding: 20px; background: #f5f5f5; border-radius: 10px; margin: 30px 0;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/100px-Unofficial_JavaScript_logo_2.svg.png" alt="JavaScript" width="80"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/100px-Node.js_logo.svg.png" alt="Node.js" width="80"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Expressjs.png/100px-Expressjs.png" alt="Express.js" width="100"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/100px-Postgresql_elephant.svg.png" alt="PostgreSQL" width="80"><img src="https://cdn.worldvectorlogo.com/logos/prisma-3.svg" alt="Prisma ORM" width="80"></div>
<br />
<br />

<h3>🚀 Technologies Used</h3>
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

<br />
<br />

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
# Generate Prisma Client (Prisma version ^6.19.0)
npm install @prisma/adapter-pg@6.19.0

# Run database migrations
npx prisma migrate dev --name init
npx prisma generate

#if error in database or in migration then reset the prisma-client by this cmd
npx prisma migrate reset
#and then run database migration by migrate and generate cmd
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

<h3>📁 Project Structure</h3>

```bash
blogApp/
│
├── configure/
│   └── constant.js              # API documentation variables and constants
│
├── language/
│   ├── en.js                    # English language responses
│   └── ar.js                    # Arabic language responses
│
├── middleware/
│   └── validation.js            # Request validation and middleware functions
│
├── modules/                     # Modular structure for API versioning
│   └── v1/
│       ├── Api_document/        # API Documentation module
│       │   ├── views/
│       │   │   └── api_doc.ejs  # EJS template for API documentation
│       │   ├── index.js         # Main module file
│       │   └── route.js         # Routes for API documentation
│       │
│       └── user/                # User module
│           ├── controller/
│           │   └── userController.js  # User business logic
│           ├── model/
│           │   └── userModel.js       # User data models (Prisma schemas)
│           └── route/
│               └── routes.js          # User API routes
│
├── node_modules/                # Installed npm packages (auto-generated)
│
├── prisma/
│   ├── schema.prisma           # Prisma database schema
│   └── migrations/             # Database migration files
│
├── screenShots/                # Application screenshots for documentation
│
├── utilities/                  # Utility functions and helpers
│   ├── common.js              # Common utility functions
│   ├── responseCode.js        # HTTP response codes and messages
│   └── rules.js              # Validation rules and business rules
│
├── .env                       # Environment variables
├── .gitignore                 # Git ignore configuration
│
├── app.js                     # Main Express application configuration
├── package.json              # Project metadata and dependencies
└── package-lock.json         # Exact dependency versions
```

<h3>✨ Features</h3>
<h5>🔐 Authentication & Authorization</h5>
<ul>
  <li>User registration and login</li>
  <li>JWT-based authentication</li>
  <li>Password hashing with bcrypt</li>
  <li>Protected routes with middleware</li>
</ul>
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
  <img src="screenShots/backendApi1.png" width="75%" /><br />
  <img src="screenShots/backendApi2.png" width="75%" />
</div>
<hr />

<h5>Api Documentation</h5>
<div align="center">
  <img src="screenShots/docx1.png" width="75%" /><br />
  <img src="screenShots/docx1.png" width="75%" /><br />
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







