# 📱 Mobile Setup Instructions for Counseling App

## Quick Setup for Mobile Testing

### Step 1: Start Backend with ngrok
1. Open a terminal and start your backend:
   ```bash
   cd C:\xampp\htdocs\counseling-app\backend
   .\venv\Scripts\Activate.ps1
   python main.py
   ```

2. In another terminal, start ngrok for the backend:
   ```bash
   ngrok http 5174
   ```

3. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)

### Step 2: Start Frontend with ngrok
1. Open another terminal and start your frontend:
   ```bash
   cd C:\xampp\htdocs\counseling-app\frontend
   npm run dev
   ```

2. In another terminal, start ngrok for the frontend:
   ```bash
   ngrok http 5173
   ```

3. Copy the ngrok URL (e.g., `https://xyz456.ngrok.io`)

### Step 3: Configure Frontend to Use Backend ngrok URL

Open `frontend/index.html` and find this section (around line 116):

```html
<!-- Configuration for Mobile/ngrok -->
<script>
    // For LOCAL development: Leave this commented out (uses Vite proxy)
    // For MOBILE/ngrok: Uncomment and set your ngrok backend URL
    // window.BACKEND_URL = 'https://YOUR-BACKEND-URL.ngrok.io/api';
</script>
```

**Uncomment the last line** and replace `YOUR-BACKEND-URL.ngrok.io` with your actual backend ngrok URL:

```html
<!-- Configuration for Mobile/ngrok -->
<script>
    // For LOCAL development: Leave this commented out (uses Vite proxy)
    // For MOBILE/ngrok: Uncomment and set your ngrok backend URL
    window.BACKEND_URL = 'https://abc123.ngrok.io/api';  // ← YOUR BACKEND NGROK URL
</script>
```

### Step 4: Access on Mobile
1. Open your mobile browser
2. Visit the **frontend ngrok URL** (e.g., `https://xyz456.ngrok.io`)
3. The app should now work! ✨

---

## Important Notes

⚠️ **Remember to switch back for local development:**
- Comment out the `window.BACKEND_URL` line when developing locally
- The Vite proxy will handle API calls automatically

⚠️ **ngrok URLs change:**
- Free ngrok URLs change every time you restart ngrok
- You'll need to update the URL in `index.html` each time

---

## Automated Script (Optional)

I can create a batch script that:
1. Starts both backend and frontend
2. Starts ngrok for both
3. Automatically updates the configuration

Would you like me to create this automated script?

---

## Troubleshooting

### "Can't connect to backend"
- Check that backend ngrok URL is correctly set in `frontend/index.html`
- Verify backend is running (visit backend ngrok URL in browser, you should see a response)
- Check the browser console for errors

### "API Status shows errors"
- The API keys might be invalid or rate-limited
- Check backend terminal for error messages
- Test the backend directly: `https://YOUR-BACKEND-URL.ngrok.io/api/health`

### "Page loads but buttons don't work"
- Clear browser cache
- Check browser console for JavaScript errors
- Verify the frontend ngrok URL is serving the correct files
