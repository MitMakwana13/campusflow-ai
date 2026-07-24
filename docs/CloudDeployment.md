# Production Cloud Deployment Guide (₹0 Cost Stack)

This guide documents how to deploy **CampusFlow AI** to production using 100% free cloud services.

```text
                     Vercel Free
                 (Next.js 15 App Router)
                            │
                            │ REST API
                            ▼
                    Render Free Service
                     (FastAPI + PPO Engine)
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
    Supabase PostgreSQL               ppo_v1.zip
       (Free Database)           (Bundled AI Model)
```

---

## 🛠️ Free Architecture Breakdown

| Subsystem | Cloud Provider | Free Tier Capability | Cost |
| :--- | :--- | :--- | :---: |
| **Frontend** | **Vercel** | Unlimited Next.js builds & edge distribution | **₹0** |
| **Backend** | **Render** | 750 free instance hours / month | **₹0** |
| **Database** | **Supabase** | 500 MB PostgreSQL database | **₹0** |
| **Model Storage** | **GitHub Releases** | Unlimited public release artifact hosting | **₹0** |

---

## 🚀 Step-by-Step Deployment Instructions

### Step 1: Deploy Supabase Database (PostgreSQL)
1. Sign up at [supabase.com](https://supabase.com).
2. Create a new free project `campusflow-db`.
3. Go to SQL Editor -> Copy and paste `database/schema/v1_init.sql` and `database/schema/v2_optimization.sql`.
4. Copy the PostgreSQL Connection String (`postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres`).

### Step 2: Deploy FastAPI Engine to Render
1. Sign up at [render.com](https://render.com).
2. Click **New Web Service** -> Connect your `campusflow-ai` GitHub repository.
3. Configure environment settings:
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variable:** `DATABASE_URL` = your Supabase connection string.
4. Render will deploy your service at `https://campusflow-api.onrender.com`.

### Step 3: Deploy Next.js Frontend to Vercel
1. Sign up at [vercel.com](https://vercel.com).
2. Import `campusflow-ai/frontend` repository.
3. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL` = `https://campusflow-api.onrender.com/api/v1`
4. Click **Deploy**. Vercel will host your site at `https://campusflow-ai.vercel.app`.

---

## ✅ Production Health Check Verification

Visit `https://campusflow-api.onrender.com/api/v1/health` to confirm production connectivity!
