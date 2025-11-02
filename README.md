# Full Stack Application with CI/CD

A modern full-stack application built with React TypeScript frontend, Node.js Express TypeScript backend, and automated CI/CD pipelines.

## Features

- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: shadcn/ui with Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **CI/CD**: GitHub Actions for both frontend and backend
- **Responsive Design**: Mobile-first approach
- **Type Safety**: Full TypeScript implementation

## Project Structure

```
CI_CD/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # UI components (shadcn/ui)
│   │   ├── lib/            # Utility functions
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Application entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/                 # Node.js Express TypeScript backend
│   ├── src/
│   │   └── index.ts        # Express server
│   ├── package.json
│   └── tsconfig.json
│
└── .github/
    └── workflows/
        ├── frontend-ci-cd.yml
        └── backend-ci-cd.yml
```

## Getting Started

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be available at `http://localhost:5000`

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests

## API Endpoints

### Backend API

- `GET /api/health` - Health check endpoint
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

## CI/CD Pipeline

### Frontend CI/CD

The frontend pipeline runs on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Only when files in `frontend/` directory change

**Pipeline Steps:**
1. Checkout code
2. Setup Node.js (matrix: 18.x, 20.x)
3. Install dependencies
4. Run linter
5. Type check with TypeScript
6. Build application
7. Upload build artifacts
8. Deploy to production (only on main branch)

### Backend CI/CD

The backend pipeline runs on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Only when files in `backend/` directory change

**Pipeline Steps:**
1. Checkout code
2. Setup Node.js (matrix: 18.x, 20.x)
3. Install dependencies
4. Type check with TypeScript
5. Build application
6. Run tests
7. Upload build artifacts
8. Deploy to production (only on main branch)

## Deployment

### Frontend Deployment Options

1. **Vercel** (Recommended)
   ```bash
   npm i -g vercel
   cd frontend
   vercel --prod
   ```

2. **Netlify**
   ```bash
   npm i -g netlify-cli
   cd frontend
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **AWS S3 + CloudFront**
   ```bash
   cd frontend
   npm run build
   aws s3 sync dist/ s3://your-bucket-name
   ```

### Backend Deployment Options

1. **Heroku**
   ```bash
   cd backend
   heroku create your-app-name
   git subtree push --prefix backend heroku main
   ```

2. **Docker**
   ```dockerfile
   # Create Dockerfile in backend directory
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   CMD ["npm", "start"]
   ```

3. **AWS EC2/ECS**
   - Use AWS CLI or AWS Console
   - Configure environment variables
   - Set up load balancer and auto-scaling

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

## Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### DevOps
- **GitHub Actions** - CI/CD pipelines
- **ESLint** - Code linting
- **Nodemon** - Auto-restart for development

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue in the GitHub repository.
