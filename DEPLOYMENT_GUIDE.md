# Deployment Guide - AI School Counseling App

## 📋 Complete Deployment Steps

### Step 1: Initial Setup (First Time Only)

1. **Test Installation**
   ```bash
   TEST_INSTALLATION.bat
   ```
   This will:
   - Check Python, Node.js, and npm
   - Create virtual environment for backend
   - Install all Python dependencies
   - Install all Node.js dependencies

2. **Test API Keys**
   ```bash
   cd backend
   RUN_API_TEST.bat
   ```
   This verifies that your AI providers are working correctly.

### Step 2: Running Locally

**Option A: Automatic (Recommended)**
```bash
RUN_APP.bat
```
This opens two terminals:
- Backend: http://localhost:5174
- Frontend: http://localhost:5173

**Option B: Manual**

Terminal 1 (Backend):
```bash
cd backend
.\venv\Scripts\Activate.ps1
python main.py
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Step 3: Mobile Testing with ngrok

1. **Install ngrok** (if not already installed)
   - Download from: https://ngrok.com/download
   - Extract to: `C:\ngrok\ngrok-v3-stable-windows-amd64\`

2. **Start Application First**
   ```bash
   RUN_APP.bat
   ```

3. **Start ngrok Tunnels**
   ```bash
   NGROK_SETUP.bat
   ```
   This will open two ngrok tunnels for frontend and backend.

4. **Configure Frontend for Mobile**
   - Copy your ngrok **backend** URL (e.g., `https://abc123.ngrok.io`)
   - Edit `frontend/app.js`, line 4:
     ```javascript
     const API_BASE_URL = 'https://YOUR-BACKEND-NGROK-URL/api';
     ```
   - Save the file
   - The Vite dev server will auto-reload

5. **Access on Mobile**
   - Use the ngrok **frontend** URL on your mobile device
   - Test all features: models, language switch, theme toggle

### Step 4: Building for Production

1. **Build the Frontend**
   ```bash
   cd frontend
   BUILD_FOR_MOBILE.bat
   ```
   OR manually:
   ```bash
   npm run build
   ```

2. **Output Location**
   - Built files: `frontend/dist/`
   - Deploy this folder to any web server

3. **Preview Build Locally**
   ```bash
   npm run preview
   ```
   Runs on: http://localhost:4173

### Step 5: Deploy to XAMPP (Optional)

If you want to deploy to your XAMPP server:

1. **Copy Backend**
   ```bash
   xcopy /E /I counseling-app\backend C:\xampp\htdocs\counseling-app\backend
   ```

2. **Copy Frontend Build**
   ```bash
   cd frontend
   npm run build
   xcopy /E /I dist C:\xampp\htdocs\counseling-app\frontend
   ```

3. **Update Backend Path in Frontend**
   Edit the built `frontend/dist/assets/*.js` file to update API_BASE_URL to your XAMPP server

4. **Run Backend with XAMPP Python**
   ```bash
   cd C:\xampp\htdocs\counseling-app\backend
   python main.py
   ```

5. **Access Application**
   - Frontend: http://localhost/counseling-app/frontend/
   - Backend: http://localhost:5174/api/health

## 🔧 Troubleshooting

### Backend Issues

**Port 5174 in use:**
```python
# Edit backend/main.py, last line:
app.run(host='0.0.0.0', port=5175, debug=True)  # Change to 5175
```

**Module not found:**
```bash
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Frontend Issues

**Port 5173 in use:**
```javascript
// Edit frontend/vite.config.js
server: {
  port: 5174,  // Change to different port
  host: true
}
```

**Dependencies missing:**
```bash
cd frontend
npm install
```

### API Connection Issues

1. **Check backend is running:**
   - Visit: http://localhost:5174/api/health
   - Should return: `{"status": "healthy", ...}`

2. **CORS errors:**
   - Backend already has CORS enabled
   - Check that API_BASE_URL in frontend/app.js matches backend URL

3. **API keys not working:**
   - Run: `backend/RUN_API_TEST.bat`
   - Check internet connection
   - Verify API keys are valid

### ngrok Issues

**ngrok not found:**
- Update path in `NGROK_SETUP.bat` to your ngrok location

**Tunnel connection failed:**
- Check internet connection
- Ensure ports 5173 and 5174 are not blocked by firewall
- Try running ngrok manually: `ngrok http 5173`

## 📱 Mobile Access Configuration

### For ngrok:
1. Backend URL: Use ngrok backend URL in `frontend/app.js`
2. Frontend URL: Access ngrok frontend URL on mobile

### For XAMPP with Local Network:
1. Find your PC's local IP: `ipconfig` (e.g., 192.168.1.100)
2. Backend URL: `http://192.168.1.100:5174/api`
3. Frontend URL: `http://192.168.1.100/counseling-app/frontend/`
4. Connect mobile to same WiFi network

## 🎯 Features Checklist

Before deployment, verify:
- [ ] All 4 model circles display correctly
- [ ] Golden ring light animates on hover
- [ ] Shine effect triggers on click
- [ ] Language toggle works (EN ↔ FA)
- [ ] Theme toggle works (Light ↔ Dark)
- [ ] Logo rotates continuously
- [ ] Chat interface opens/closes
- [ ] Messages send and receive
- [ ] API Status shows provider status
- [ ] Mobile responsive design works

## 📞 Support

For issues:
1. Check `QUICK_START.txt`
2. Run `TEST_INSTALLATION.bat`
3. Run `backend/RUN_API_TEST.bat`
4. Check console for errors (F12 in browser)
