"""
Minimal Flask app for PythonAnywhere - Works guaranteed!
"""
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Get absolute path to financial-app folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, 'financial-app')

print(f"Base dir: {BASE_DIR}")
print(f"Frontend dir: {FRONTEND_DIR}")
print(f"Frontend exists: {os.path.exists(FRONTEND_DIR)}")

# Health check
@app.route('/api/health')
def health():
    return jsonify({'status': 'healthy', 'message': 'AI Counseling App Backend is running'})

# Chat endpoint (simplified)
@app.route('/api/chat', methods=['POST'])
def chat():
    return jsonify({
        'success': True, 
        'response': 'سلام! من NAG هستم. چطور می‌تونم کمکتون کنم؟ 💖',
        'provider': 'Demo'
    })

# Serve frontend
@app.route('/')
def index():
    index_path = os.path.join(FRONTEND_DIR, 'index.html')
    print(f"Looking for: {index_path}")
    print(f"Exists: {os.path.exists(index_path)}")
    if os.path.exists(index_path):
        return send_from_directory(FRONTEND_DIR, 'index.html')
    return f"index.html not found. Frontend dir: {FRONTEND_DIR}, Exists: {os.path.exists(FRONTEND_DIR)}"

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(FRONTEND_DIR, filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
