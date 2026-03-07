"""
Simple Flask app for PythonAnywhere
Serves files from current directory
"""
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)

# API Keys
API_KEYS = {
    'google_ai': 'AIzaSyDlKEZ4OBE9MFhniPpoXAHIh_R2pgv_zeA',
    'cerebras': 'csk-5r8kkcr9chkptvx4cytphk9m3ypcfx5jnnryddhm6kfr6559'
}

genai.configure(api_key=API_KEYS['google_ai'])

MODEL_CONTEXTS = {
    'tutoring': {'en': 'You are NAG AI...', 'fa': 'شما NAG هستید...'},
    'academic_counseling': {'en': 'You are academic counselor...', 'fa': 'شما مشاور تحصیلی هستید...'},
    'nutrition_health': {'en': 'You are nutrition advisor...', 'fa': 'شما مشاور تغذیه هستید...'},
    'sports': {'en': 'You are sports coach...', 'fa': 'شما مربی ورزشی هستید...'}
}

def query_google_ai(prompt, model_type, language):
    try:
        context = MODEL_CONTEXTS.get(model_type, MODEL_CONTEXTS['tutoring']).get(language, '')
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(f"{context}\n\n{prompt}")
        return {'success': True, 'response': response.text, 'provider': 'Google AI'}
    except Exception as e:
        return {'success': False, 'error': str(e)}

@app.route('/api/health')
def health():
    return jsonify({'status': 'healthy', 'message': 'AI Counseling App Backend is running'})

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        model_type = data.get('model', 'tutoring')
        language = data.get('language', 'fa')
        result = query_google_ai(user_message, model_type, language)
        if result['success']:
            return jsonify({'success': True, 'response': result['response'], 'provider': result['provider']})
        return jsonify({'success': False, 'error': result['error']}), 500
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_file(filename):
    return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
