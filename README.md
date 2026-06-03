# NAG AI School Counseling App

## Local Development

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Run the app:
```bash
python main.py
```

3. Open browser:
```
http://localhost:5000
```

## Deployment

### PythonAnywhere
1. Upload files to `/home/navid190/counseling-app/`
2. Configure WSGI to point to backend/main.py
3. Set working directory to backend/

### Render
1. Connect GitHub repository
2. Build command: `pip install -r backend/requirements.txt`
3. Start command: `cd backend && gunicorn main:app --bind 0.0.0.0:$PORT`

## Features
- AI Chat with NAG assistant
- 4 specialized models (Tutoring, Academic, Health, Sports)
- Multi-language support (Farsi, English, Arabic)
- PWA support for mobile
