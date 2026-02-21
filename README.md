# AI School Counseling Application

An intelligent counseling application for schools with 4 AI-powered models: Tutoring, Academic Counseling, Nutrition & Health, and Sports.

## Features

- 🎯 **4 AI Models**: Tutoring, Academic Counseling, Nutrition & Health, Sports
- 🌐 **Bilingual**: English and Persian (فارسی) support
- 🌙 **Theme Toggle**: Day and Night modes
- 📱 **Mobile Friendly**: Optimized for mobile viewing with ngrok
- 💫 **Beautiful UI**: Circular buttons with golden ring light effects
- 🔄 **Rotating Logo**: 3D rotating sphere logo
- 🤖 **Multiple AI Providers**: Google AI Studio and Cerebras Cloud

## Installation & Setup

### Backend Setup

1. Navigate to backend folder:
```bash
cd counseling-app/backend
```

2. Run setup script to create virtual environment and install dependencies:
```bash
setup.bat
```

3. Start the backend server:
```bash
.\venv\Scripts\Activate.ps1
python main.py
```

Backend will run on: `http://localhost:5174`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd counseling-app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

## Mobile Testing with ngrok

1. Install ngrok from: https://ngrok.com/download

2. Start ngrok for frontend:
```bash
cd C:\ngrok\ngrok-v3-stable-windows-amd64
ngrok http 5173
```

3. Start ngrok for backend (in another terminal):
```bash
ngrok http 5174
```

4. Update the `API_BASE_URL` in `frontend/app.js` with your ngrok backend URL

5. Access the ngrok frontend URL on your mobile device

## API Keys

The application uses the following AI providers:

- **Google AI Studio**: AIzaSyA9Pi7tw_4GcyzThAqcaHbDCxYO5WvgFWk
- **Cerebras Cloud**: csk-5r8kkcr9chkptvx4cytphk9m3ypcfx5jnnryddhm6kfr6559

API keys are tested automatically on startup. Check the "API Status" panel in the bottom-right corner.

## Usage

1. Select one of the 4 circular model buttons
2. Chat interface will open with the selected AI model
3. Type your message and press Enter or click Send
4. Switch languages using the language button (EN/FA)
5. Toggle theme using the sun/moon button
6. View API status in the bottom-right panel

## Building for Production

```bash
cd counseling-app/frontend
npm run build
```

The built files will be in `frontend/dist` folder.

## Project Structure

```
counseling-app/
├── backend/
│   ├── main.py              # Flask backend server
│   ├── requirements.txt     # Python dependencies
│   └── setup.bat           # Setup script
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styling
│   ├── app.js              # JavaScript logic
│   ├── package.json        # Node dependencies
│   └── vite.config.js      # Vite configuration
└── images/                 # Logo and icons folder
```

## Technologies Used

- **Backend**: Python, Flask, Google Generative AI, Requests
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Axios
- **Build Tool**: Vite
- **AI Providers**: Google AI Studio (Gemini), Cerebras Cloud (Llama 3.1)

## Support

For issues or questions, check the API Status panel to ensure your AI providers are connected properly.
