# Quick Setup Guide

## What's Included

This project includes a complete full-stack application with:

1. **React TypeScript Frontend** with shadcn/ui components
2. **Node.js Express TypeScript Backend**
3. **CI/CD Pipelines** for both frontend and backend
4. **Docker Support** for containerized deployment
5. **Responsive, Modern UI** with Tailwind CSS

## Quick Start (Development)

### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
```
Backend will run on http://localhost:5000

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on http://localhost:5173

## Quick Start (Docker)

To run the entire application with Docker:

```bash
docker-compose up --build
```

- Frontend: http://localhost
- Backend: http://localhost:5000

## Project Features

### Frontend
- Modern UI with shadcn/ui components
- Tailwind CSS for styling
- Responsive design (mobile, tablet, desktop)
- Form validation
- Loading states and error handling
- API integration with backend

### Backend
- RESTful API endpoints
- CORS enabled
- TypeScript for type safety
- Environment variable support
- Docker ready

### CI/CD
- Automated testing and building
- Multi-version Node.js testing (18.x, 20.x)
- Separate pipelines for frontend and backend
- Automatic deployment on main branch
- Build artifact uploading

## Next Steps

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Full stack app with CI/CD"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **Configure GitHub Secrets** (for deployment)
   - Go to repository Settings > Secrets and variables > Actions
   - Add necessary secrets:
     - `VITE_API_URL` - Your production API URL
     - Add deployment-specific secrets (Vercel token, AWS credentials, etc.)

4. **Deploy**
   - The CI/CD pipelines will automatically trigger
   - Frontend can be deployed to Vercel, Netlify, or AWS S3
   - Backend can be deployed to Heroku, AWS EC2/ECS, or Google Cloud

## File Structure Overview

```
CI_CD/
├── .github/workflows/       # CI/CD pipeline configurations
│   ├── frontend-ci-cd.yml
│   └── backend-ci-cd.yml
├── frontend/                # React application
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── lib/           # Utilities
│   │   ├── App.tsx        # Main app
│   │   └── main.tsx       # Entry point
│   ├── Dockerfile
│   └── nginx.conf
├── backend/                 # Express API
│   ├── src/
│   │   └── index.ts       # API server
│   └── Dockerfile
├── docker-compose.yml       # Docker orchestration
└── README.md               # Full documentation
```

## Customization

### Change API Port
Edit `backend/.env` and `backend/src/index.ts`

### Change Frontend Port
Edit `frontend/vite.config.ts`

### Add New API Endpoints
Add routes in `backend/src/index.ts`

### Add New UI Components
Use shadcn/ui CLI or create custom components in `frontend/src/components/`

## Troubleshooting

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in backend
- Verify `VITE_API_URL` in frontend `.env` file

### TypeScript errors
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` configuration

### Docker build fails
- Ensure Docker is running
- Check Dockerfile syntax
- Verify all dependencies are listed in package.json

## Support

For detailed documentation, see [README.md](README.md)
