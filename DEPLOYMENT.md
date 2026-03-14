# Deployment Guide

This project is set up to be deployed on **Render** and **Railway**.

## 1. Prerequisites
- A GitHub account with this repository pushed: `https://github.com/JoshuaRazon10/lab7`
- A [Render](https://render.com/) account.
- A [Railway](https://railway.app/) account.

---

## 2. Deploying to Render (Recommended for Full Stack)

Render can automatically detect the `render.yaml` file in the root of your project.

### Step-by-Step:
1. Go to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Blueprint**.
3. Connect your GitHub repository (`JoshuaRazon10/lab7`).
4. Render will read `render.yaml` and show you the services it will create:
   - `mood-db` (MySQL Database)
   - `mood-tracker-api` (Web Service)
   - `mood-tracker-frontend` (Static Site)
5. Click **Apply**.
6. **Important:** Once the database is created, make sure the `mood-tracker-api` has the correct environment variables. The `render.yaml` handles this automatically by linking them.

---

## 3. Deploying to Railway

Railway is great for hosting MySQL and the Backend.

### Option A: Using Railway for Database only
You can host the database on Railway and the API on Render.
1. Create a MySQL database on Railway.
2. Get the connection details (Host, User, Password, Port, Database name).
3. Add these as Environment Variables in your Render/Railway service.

### Option B: Hosting both on Railway
1. Go to [Railway](https://railway.app/).
2. Click **New Project** -> **Deploy from GitHub repo**.
3. Select `JoshuaRazon10/lab7`.
4. Railway might detect the monorepo. You should create **Two Services**:
   - **Backend Service**:
     - Set **Root Directory** to `backend`.
     - Railway will automatically detect the `package.json` in `backend/`.
     - Add environment variables (`DB_HOST`, `DB_USER`, etc.) or link a Railway MySQL service.
   - **Frontend Service**:
     - Set **Root Directory** to `frontend`.
     - Set **Build Command** to `npm run build`.
     - Set **Publish Directory** to `dist`.
     - Add `VITE_API_URL` pointing to your Backend Service URL.

---

## 4. Database Initialization
Once your MySQL database is live, you need to run the `backend/init.sql` to create the tables.
- **Render:** You can use a GUI tool or connect via SSH to run the SQL.
- **Railway:** Use the **Data** tab in the MySQL service to run queries or upload the SQL file.

---

## 5. Local Git Preparation
To push your changes to your repository:
```bash
git init
git remote add origin https://github.com/JoshuaRazon10/lab7.git
git add .
git commit -m "Add deployment configurations for Render and Railway"
git push -u origin main
```
