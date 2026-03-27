# RIWAS Project Capstone

Full-stack recruitment and job recommendation platform with:
- React + Vite frontend
- Node.js + Express backend API
- FastAPI recommendation service (ML + hybrid scoring)
- Flask PDF extraction microservice for resume/cover letter parsing

## Repository Structure

```text
.
|- Frontend/                  # React client (Vite)
|- Backend/                   # Express API, auth, workflows, job modules
|  |- python_service/         # Flask PDF extraction service
|- FastAPI/                   # Recommendation API and ML engine
|- requirements.txt           # Python dependencies for FastAPI/extraction
```

## System Architecture

- Frontend runs on `http://localhost:5173`.
- Backend API runs on `http://localhost:5000` and serves routes under `/api/*`.
- FastAPI recommendation engine runs on `http://localhost:8000`.
- Flask extraction service runs on `http://127.0.0.1:5001`.
- PostgreSQL is the primary database.

Integration flow:
1. Frontend calls backend endpoints at `http://localhost:5000/api`.
2. Backend sends uploaded PDF files to Flask extraction service (`/extract`).
3. Frontend calls FastAPI recommendation endpoint (`/user_profile/{user_id}/recommendations`).
4. FastAPI reads PostgreSQL data and returns ranked recommendations.

## Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- PostgreSQL 14+
- (Recommended) virtual environment tool (`venv`)

## 1) Database Setup

Create PostgreSQL databases:

```sql
CREATE DATABASE riwas_db;
CREATE DATABASE riwas_test;
CREATE DATABASE riwas_prod;
```

## 2) Environment Variables

Create environment files for each service.

### Backend: `Backend/.env`

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

DB_HOST=127.0.0.1
DB_NAME=riwas_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=replace_with_secure_value
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=replace_with_secure_value
JWT_REFRESH_EXPIRES_IN=30d

EMAIL_SERVICE=gmail
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_app_password
EMAIL_FROM=noreply@example.com

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

GEMINI_API_KEY=your_gemini_api_key
```

### FastAPI: `FastAPI/.env`

```env
FASTAPI_DATABASE_URL=postgresql://postgres:your_password@localhost:5432/riwas_db
HF_TOKEN=your_huggingface_token
```

## 3) Install Dependencies

### Backend dependencies

```bash
cd Backend
npm install
```

### Frontend dependencies

```bash
cd Frontend
npm install
```

### Python dependencies (FastAPI + extraction)

From the project root:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 4) Backend Database Migrations and Seeders

From `Backend/`:

```bash
npx sequelize-cli db:migrate --env development
npx sequelize-cli db:seed:all --env development
```

## 5) Run the Services

Open separate terminals.

### Terminal A: Backend API

```bash
cd Backend
npm run dev
```

### Terminal B: Frontend

```bash
cd Frontend
npm run dev
```

### Terminal C: FastAPI recommendation service

```bash
cd FastAPI
source ../.venv/bin/activate
fastapi dev main.py --port 8000
```

If `fastapi dev` is not available, run:

```bash
uvicorn main:app --reload --port 8000
```

### Terminal D: Flask PDF extraction service

```bash
cd Backend/python_service
source ../../.venv/bin/activate
python extract_service.py
```

Production option:

```bash
./run_production.sh
# or
# gunicorn -w 4 -b 127.0.0.1:5001 --timeout 120 extract_service:app
```

## Main Endpoints

### Backend

- `GET /health`
- `POST /api/auth/*`
- `GET/POST /api/jobpostings`
- `GET/POST /api/jobapplications`
- `GET/POST /api/interviews`
- `GET /api/dashboard/*`
- `GET/POST /api/resumes/*`

### FastAPI

- `GET /requ/`
- `POST /requ/`
- `GET /users/`
- `GET /user_profile/{user_id}/recommendations?top_n=10`

### Flask extraction

- `POST /extract` (multipart/form-data, files such as `resume`, `coverLetter`)

## Key Modules by Folder

### Backend

- `controllers/`: business logic for auth, job posting, applications, interviews, workflow, scoring, resumes
- `routes/`: REST route definitions and middleware binding
- `models/`: Sequelize models and relationships
- `middlewares/`: auth, upload handling, validation, error handling
- `migrations/` and `seeders/`: schema and seed data management
- `services/`: email and notification related service logic

### Frontend

- `src/pages/`: candidate and HR page-level screens
- `src/components/`: reusable UI building blocks
- `src/server/`: Axios API clients for backend and FastAPI
- `src/data/`: local seed/demo data used by UI modules

### FastAPI

- `main.py`: API routes and orchestration logic
- `ml_engine.py`: sentence-transformer based recommender and hybrid scoring
- `database.py`: SQLAlchemy setup and DB dependency
- `models.py` and `schemas.py`: SQLAlchemy and Pydantic definitions

## Troubleshooting

- CORS errors: ensure `CLIENT_URL` matches the frontend origin.
- DB connection issues: verify PostgreSQL is running and env credentials are correct.
- Recommendation endpoint errors: ensure FastAPI is running and has DB access.
- Resume parsing errors: ensure extraction service is running on `127.0.0.1:5001`.
- Missing Python packages: activate `.venv` and reinstall `requirements.txt`.

## Notes

- `Backend/server.js` uses `sequelize.sync({ alter: true })` in development.
- Use migrations in production; do not rely on auto-sync.
- Keep `.env` files private and never commit secrets.
