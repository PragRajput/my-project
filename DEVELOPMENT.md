# Development Guide

## Prerequisites

- Node.js 18.x or 20.x
- npm (comes with Node.js)
- Git (optional, for version control)
- Docker (optional, for containerized development)

## Initial Setup

1. **Install all dependencies**:
   ```bash
   npm run install:all
   ```

   Or install separately:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Create environment files**:

   Backend (.env):
   ```bash
   cd backend
   cp .env.example .env
   ```

   Frontend (.env):
   ```bash
   cd frontend
   cp .env.example .env
   ```

## Development Workflow

### Running the Application

**Option 1: Using Terminal Sessions**

Open two terminal windows:

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```
Access backend at: http://localhost:5000

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```
Access frontend at: http://localhost:5173

**Option 2: Using Root Scripts**

From the project root:
```bash
# Terminal 1
npm run dev:backend

# Terminal 2
npm run dev:frontend
```

**Option 3: Using Docker**

```bash
docker-compose up --build
```
- Frontend: http://localhost
- Backend: http://localhost:5000

### Making Changes

#### Frontend Development

1. Components are in `frontend/src/components/`
2. Main app logic in `frontend/src/App.tsx`
3. Styles use Tailwind CSS classes
4. UI components from shadcn/ui in `frontend/src/components/ui/`

Hot reload is enabled - changes will reflect immediately.

#### Backend Development

1. API routes are in `backend/src/index.ts`
2. Add new endpoints to the Express app
3. nodemon watches for changes and auto-restarts

Example - Adding a new endpoint:
```typescript
app.get('/api/products', (req: Request, res: Response) => {
  const products = [/* your data */];
  res.json(products);
});
```

### Testing

#### Frontend
```bash
cd frontend
npm run lint        # Run ESLint
npm run build       # Test production build
```

#### Backend
```bash
cd backend
npm run build       # Build TypeScript
npm test           # Run tests (if configured)
```

### Building for Production

Build both applications:
```bash
npm run build:all
```

Or build separately:
```bash
npm run build:frontend
npm run build:backend
```

## Project Structure Details

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   └── ui/          # shadcn/ui components (Button, Card, Input)
│   ├── lib/
│   │   └── utils.ts     # Utility functions (cn for classnames)
│   ├── App.tsx          # Main application
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles + Tailwind
├── public/              # Static assets
├── Dockerfile
├── nginx.conf           # Production web server config
└── package.json
```

### Backend Structure
```
backend/
├── src/
│   └── index.ts         # Express server + API routes
├── dist/                # Compiled JavaScript (after build)
├── Dockerfile
├── nodemon.json         # Dev server config
├── tsconfig.json        # TypeScript config
└── package.json
```

## Common Tasks

### Adding a New UI Component

1. Create component file in `frontend/src/components/ui/`
2. Import from shadcn/ui or create custom
3. Use Tailwind CSS for styling
4. Export and use in App.tsx

### Adding a New API Endpoint

1. Open `backend/src/index.ts`
2. Add new route:
   ```typescript
   app.get('/api/your-endpoint', (req, res) => {
     res.json({ data: 'your response' });
   });
   ```
3. Test with curl or frontend

### Updating Styles

- Use Tailwind utility classes directly in JSX
- Modify theme in `frontend/src/index.css` under `@theme`
- Custom CSS can be added to component files

### Environment Variables

**Frontend** (.env):
- Must start with `VITE_` to be accessible
- Access via `import.meta.env.VITE_VARIABLE_NAME`

**Backend** (.env):
- Access via `process.env.VARIABLE_NAME`
- Use dotenv package (already configured)

## Debugging

### Frontend Debugging

1. **Browser DevTools**: F12 in browser
2. **React DevTools**: Install browser extension
3. **Console Logs**: Use `console.log()` in code
4. **Network Tab**: Check API requests/responses

### Backend Debugging

1. **Console Logs**: Use `console.log()`
2. **VSCode Debugger**: Add launch configuration
3. **API Testing**: Use Postman, curl, or Thunder Client

Example curl commands:
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Get users
curl http://localhost:5000/api/users

# Create user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

## Troubleshooting

### Port Already in Use

If you see "port already in use" error:

**Windows**:
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Mac/Linux**:
```bash
lsof -ti:5000 | xargs kill -9
```

### TypeScript Errors

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### Tailwind Not Working

1. Ensure `@tailwindcss/postcss` is installed
2. Check `postcss.config.js` is correct
3. Restart dev server

### CORS Issues

- Backend has CORS enabled by default
- Check `backend/src/index.ts` for cors configuration
- Ensure frontend is using correct API URL

## Git Workflow

```bash
# Initialize git (if not done)
git init

# Create .gitignore (already created)
git add .
git commit -m "Initial commit"

# Connect to remote
git remote add origin <your-repo-url>
git push -u origin main
```

## CI/CD Pipeline

Once pushed to GitHub:

1. **Automatic Triggers**:
   - Push to main/develop
   - Pull requests to main/develop

2. **What Gets Tested**:
   - TypeScript compilation
   - Linting (frontend)
   - Build process
   - Tests (if configured)

3. **Deployment**:
   - Automatically deploys on push to main
   - Configure deployment secrets in GitHub

## Performance Tips

### Frontend
- Use React.memo() for expensive components
- Lazy load routes with React.lazy()
- Optimize images and assets
- Use production build for deployment

### Backend
- Add caching for frequently accessed data
- Use connection pooling for databases
- Implement rate limiting
- Add compression middleware

## Next Steps

1. Add database (PostgreSQL, MongoDB)
2. Implement authentication (JWT, OAuth)
3. Add testing (Jest, React Testing Library, Vitest)
4. Set up logging (Winston, Morgan)
5. Add monitoring (Sentry, LogRocket)
6. Implement WebSocket for real-time features
7. Add API documentation (Swagger/OpenAPI)

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Vite Documentation](https://vitejs.dev/)

## Getting Help

- Check README.md for setup instructions
- Check SETUP.md for quick start
- Review GitHub Issues
- Check Stack Overflow for common issues
