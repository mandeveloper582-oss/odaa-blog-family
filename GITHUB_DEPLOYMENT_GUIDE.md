# GitHub Deployment Guide - ODAA Blog Project

## 📝 Part 1: Push to GitHub

### Step 1: Initialize Git (if not already done)
```bash
cd c:\odaa project
git init
```

### Step 2: Add Remote Repository
```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```
Replace `YOUR_USERNAME` and `REPO_NAME` with your GitHub details.

### Step 3: Add All Files
```bash
git add .
```

### Step 4: Create Initial Commit
```bash
git commit -m "Initial commit: ODAA Blog with Vercel frontend and Render backend"
```

### Step 5: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

### Step 6: Verify on GitHub
Visit `https://github.com/YOUR_USERNAME/REPO_NAME` to confirm files are uploaded.

---

## 🔗 Part 2: Connect Frontend to Backend

### Current Setup
- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on Render
- **Database:** MongoDB (Atlas or self-hosted)

### Verify Backend URL

Your current backend URL in `frontend/src/services/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://odaa-blog-family.orender.com';
```

### A. Set Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Variable Name | Value |
|---|---|
| `VITE_API_URL` | Your Render backend URL (e.g., `https://odaa-blog-family.orender.com`) |
| `VITE_FIREBASE_API_KEY` | Your Firebase API key |
| `VITE_FIREBASE_PROJECT_ID` | Your Firebase project ID |
| `VITE_FIREBASE_AUTH_DOMAIN` | Your Firebase auth domain |
| `VITE_FIREBASE_STORAGE_BUCKET` | Your Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Your Firebase app ID |

5. Click **Save** and **Redeploy** your project

### B. Set Render Environment Variables

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your backend service
3. Go to **Environment** tab
4. Add these variables:

| Variable Name | Value |
|---|---|
| `MONGODB_URI` | Your MongoDB connection string |
| `JWT_SECRET` | A secure random string |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `FRONTEND_URL` | Your Vercel frontend URL (e.g., `https://oda-tech.vercel.app`) |
| `PORT` | `5000` |

5. Click **Save** and your service will redeploy

### C. Update Backend CORS Configuration

Verify `backend/server.js` has the correct CORS setup:

```javascript
app.use(cors({ origin: process.env.FRONTEND_URL || 'https://oda-tech.vercel.app' }));
```

### D. Test the Connection

1. **Test Backend Health:** Visit your Render backend URL in browser
   - Example: `https://odaa-blog-family.orender.com`
   - Should respond with server running message

2. **Test API Endpoint:** 
   ```
   https://odaa-blog-family.orender.com/api/posts
   ```

3. **In Frontend Console:** Open browser DevTools and check:
   - Network tab to see API calls
   - Console for any CORS errors

---

## ✅ Connection Checklist

- [ ] GitHub repository created and code pushed
- [ ] Vercel environment variables set (API_URL, Firebase keys)
- [ ] Render environment variables set (MongoDB, JWT, Cloudinary, Frontend URL)
- [ ] Backend CORS allows Vercel frontend URL
- [ ] Frontend API calls use correct backend URL
- [ ] Test API endpoint returns data
- [ ] Frontend can fetch posts from backend
- [ ] Admin login works with backend authentication

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution:** Check that `FRONTEND_URL` in Render matches your Vercel URL exactly

### Issue: 502 Bad Gateway on Render
**Solution:** Check Render logs for database connection errors. Verify `MONGODB_URI` is correct.

### Issue: API calls failing on Vercel
**Solution:** Ensure `VITE_API_URL` environment variable is set in Vercel dashboard

### Issue: Files not showing on GitHub
**Solution:** Check `.gitignore` isn't excluding important files. Run `git status` to verify.

---

## 📚 Next Steps

1. **Link GitHub to Vercel:** 
   - In Vercel, click **Import Project** → Connect GitHub
   - Select your repo
   - Vercel will auto-redeploy on every push

2. **Link GitHub to Render:**
   - Similar process in Render dashboard
   - Enable auto-deploy from GitHub

3. **Add CI/CD Pipeline (Optional):**
   - GitHub Actions for automated testing
   - Automatic deployment on push

---

## 🔐 Security Notes

**Never commit `.env` files!** Keep these files in `.gitignore`:
```
.env
.env.local
.env.*.local
node_modules/
dist/
build/
```

Use platform-specific environment variable management:
- Vercel → Environment Variables dashboard
- Render → Environment section
- MongoDB Atlas → Network Access & Connection Strings
