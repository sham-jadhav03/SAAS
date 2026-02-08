# SaaS AI Code Editor

## 🚀 Overview
A powerful, full-stack **AI-powered development platform** that enables users to generate, edit, and run code directly in the browser. Built with the **MERN stack**, this application leverages **Google's Gemini AI** for intelligent code generation and **WebContainers** for a seamless, browser-based runtime environment.

This project combines real-time collaboration, comprehensive project management, and advanced AI assistance into a single, cohesive interface.

---

## ✨ Key Features

- **🤖 AI-Powered Assistance**: 
  - Integrated with **Gemini 2.5 Flash Lite** (`@google/genai`).
  - Supports natural language prompts for code generation and refactoring.
  - Automatically structures responses into a file tree for the IDE.
  
- **⚡ Real-Time Collaboration**: 
  - Built on **Socket.io** for instant communication and updates.
  - Live chat and project synchronization across users.

- **🛠️ In-Browser Execution**: 
  - Uses **WebContainers** (`@webcontainer/api`) to run Node.js applications directly in the browser.
  - Provides a complete filesystem emulation.

- **🔐 Secure Authentication**: 
  - **JWT (JsonWebToken)** based authentication.
  - Protected routes and persistent sessions using cookies.

- **📂 Project Management**: 
  - Create, organize, and manage multiple coding projects.
  - dedicated workspaces for each project.

- **🎨 Modern UI/UX**: 
  - Responsive and animated interface using **React**, **Tailwind CSS**, and **Framer Motion**.
  - Syntax highlighting with `highlight.js`.
  - Markdown rendering support.

---

## 🏗️ Technology Stack

### **Frontend**
- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [PostCSS](https://postcss.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State/API**: [Axios](https://axios-http.com/)
- **Runtime**: [WebContainers](https://webcontainers.io/)
- **Icons**: [Remix Icon](https://remixicon.com/)
- **Utilities**: `markdown-to-jsx`, `highlight.js`

### **Backend**
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Real-Time**: [Socket.io](https://socket.io/)
- **AI Integration**: [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)
- **Security**: `bcrypt`, `jsonwebtoken`, `express-validator`
- **Cache/Queue**: [Redis](https://redis.io/) (`ioredis`)

---

## 📂 Folder Structure

```text
root/
├── backend/                # API Server and Logic
│   ├── controllers/        # Request handlers (user, project, ai)
│   ├── db/                 # Database connection logic
│   ├── middleware/         # Auth and validation middleware
│   ├── models/             # Mongoose schemas (User, Project)
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic (AI service, Redis)
│   ├── app.js              # Express app setup
│   └── server.js           # Server entry point + Socket.io
│
├── frontend/               # React Application
│   ├── src/
│   │   ├── auth/           # Authentication related components
│   │   ├── components/     # Reusable UI components
│   │   ├── config/         # Configuration files
│   │   ├── context/        # React Context (User state)
│   │   ├── pages/          # Application pages (Home, Project, Login)
│   │   ├── routes/         # Frontend routing
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── vite.config.js      # Vite configuration
│
└── Readme.md               # Project Documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- Google AI API Key (Gemini)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd saas
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following variables:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/saas-db
JWT_SECRET=your_super_secret_key
GOOGLE_AI_KEY=your_gemini_api_key
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
```

Start the backend server:
```bash
npm run dev
# or
node server.js
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173`.

---

## 🤝 Contribution

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

---

## ⚠️ Disclaimer
This project is for educational and experimental purposes. The integration with AI services involves data usage policies governed by the respective providers (Google). Ensure you handle API keys securely and do not commit them to public repositories.
