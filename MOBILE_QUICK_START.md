# 📱 Mobile Quick Start Guide

## 🚀 Easiest Method (Recommended)

### Option A: Automated Setup (3 Steps)

1. **Run the auto-setup script:**
   ```bash
   SETUP_MOBILE_AUTO.bat
   ```
   This starts backend, frontend, and both ngrok tunnels automatically.

2. **Copy your backend ngrok URL** from the "ngrok Backend" window
   - Look for: `Forwarding https://abc123.ngrok.io -> http://localhost:5174`
   - Copy the `https://abc123.ngrok.io` part

3. **Update the backend URL:**
   ```bash
   UPDATE_BACKEND_URL.bat
   ```
   Paste your backend ngrok URL when prompted.

4. **Access on mobile:**
   - Copy the frontend ngrok URL from the "ngrok Frontend" window
   - Open it on your mobile browser
   - Done! ✨

---

## 🔧 Manual Method (For Advanced Users)

### Step 1: Start All Services

**Terminal 1 - Backend:**
```bash
cd backend
.\venv\Scripts\Activate.ps1
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 3 - Backend ngrok:**
```bash
ngrok http 5174
```

**Terminal 4 - Frontend ngrok:**
```bash
ngrok http 5173
```

### Step 2: Configure Backend URL

Open `frontend/index.html` (around line 120) and update:

```html
<!-- Change this line: -->
// window.BACKEND_URL = 'https://YOUR-BACKEND-URL.ngrok.io/api';

<!-- To this (with your actual backend ngrok URL): -->
window.BACKEND_URL = 'https://abc123.ngrok.io/api';
```

### Step 3: Access on Mobile

Visit your frontend ngrok URL on your mobile device!

---

## 🔄 Switching Back to Local Development

When you're done with mobile testing:

```bash
RESET_TO_LOCAL.bat
```

This comments out the `window.BACKEND_URL` line so local development works again.

---

## 🆘 Troubleshooting

### "Cannot connect to API"
✅ **Solution:** Make sure you updated the backend URL in `frontend/index.html`
- The URL should match your backend ngrok URL
- Don't forget to add `/api` at the end

### "ngrok URLs keep changing"
✅ **Solution:** Free ngrok URLs change every restart. You need to:
1. Get the new backend ngrok URL
2. Run `UPDATE_BACKEND_URL.bat` again with the new URL

### "App works locally but not on mobile"
✅ **Solution:** Check these:
1. Backend ngrok is running (`ngrok http 5174`)
2. Frontend ngrok is running (`ngrok http 5173`)
3. `window.BACKEND_URL` in `index.html` is uncommented and set correctly
4. Both backend and frontend servers are running

### "API Status shows errors"
✅ **Solution:**
- Visit your backend ngrok URL in a browser: `https://YOUR-BACKEND-URL.ngrok.io/api/health`
- You should see: `{"status":"healthy","message":"AI Counseling App Backend is running"}`
- If not, check your backend terminal for errors

---

## 📋 Batch Scripts Reference

| Script | Purpose |
|--------|---------|
| `SETUP_MOBILE_AUTO.bat` | Starts all services automatically |
| `UPDATE_BACKEND_URL.bat` | Updates frontend to use ngrok backend |
| `RESET_TO_LOCAL.bat` | Resets to local development mode |

---

## 💡 Pro Tips

1. **Keep ngrok windows open** - Closing them stops the tunnel
2. **Bookmark ngrok URLs** - While they're active, you can save them
3. **Use ngrok's web interface** - Visit `http://localhost:4040` to see request logs
4. **Test backend first** - Always verify backend ngrok works before testing frontend

---

## ✅ Verification Checklist

Before accessing on mobile, verify:

- [ ] Backend server is running (port 5174)
- [ ] Frontend server is running (port 5173)
- [ ] Backend ngrok is running
- [ ] Frontend ngrok is running
- [ ] `window.BACKEND_URL` is set in `frontend/index.html`
- [ ] Backend URL in `index.html` matches your backend ngrok URL

---

## 🎯 Expected Result

When everything is working, you should:
- ✅ See the app load on mobile
- ✅ See the 4 circular model buttons (Tutoring, Academic Counseling, etc.)
- ✅ See "API Status" panel showing connection status
- ✅ Be able to click a model and start chatting
- ✅ Get responses from the AI

---

Need help? Check the console in your browser (F12 or mobile browser dev tools) for error messages!
