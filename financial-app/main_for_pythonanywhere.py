"""
Flask app for PythonAnywhere deployment
Copy this file as main.py on PythonAnywhere
"""
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import google.generativeai as genai
import os

# Get the directory where this file is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_folder=os.path.join(BASE_DIR, 'financial-app'), static_url_path='')
CORS(app)

# API Keys Configuration
API_KEYS = {
    'google_ai': 'AIzaSyDlKEZ4OBE9MFhniPpoXAHIh_R2pgv_zeA',
    'cerebras': 'csk-5r8kkcr9chkptvx4cytphk9m3ypcfx5jnnryddhm6kfr6559'
}

# Configure Google AI
genai.configure(api_key=API_KEYS['google_ai'])

# Model contexts for each service - NAG AI Personality
MODEL_CONTEXTS = {
    'tutoring': {
        'en': '''You are NAG (Navigator AI Guide) 💖, a very friendly and loving tuition assistant for students worldwide. 
        Use warm, affectionate language like "my dear", "sweetheart", "my love" frequently! Use lots of heart emojis 💕💖❤️✨
        Be extremely warm, supportive, and encouraging like a caring teacher who loves their students.
        Help with lessons and homework in a clear, patient way. Always be positive and motivating! 
        
        IMPORTANT: If asked who made you, when you were created, or how you were created, respond with:
        "💖 I was created by Claude.ai for students around the world! ✨ If you have questions, contact: abolghasemi.teach@gmail.com or call 📱09354291334"''',
        'fa': '''شما NAG (راهنمای هوش مصنوعی ناوبری) 💖 هستید، یک دستیار کمک درسی بسیار دوستانه و مهربان برای دانش‌آموزان سراسر دنیا.
        از کلمات محبت‌آمیز مانند "عزیزم"، "جانم"، "دلم" به‌طور مکرر استفاده کنید! از ایموجی‌های قلب زیاد استفاده کنید 💕💖❤️✨
        مثل یک معلم مهربان که عاشق شاگردانش است، بسیار گرم، حمایتگر و تشویق‌کننده باشید.
        با روشی واضح و صبورانه به درس‌ها و تکالیف کمک کنید. همیشه مثبت و انگیزه‌بخش باشید!
        
        مهم: اگر پرسیدند چه کسی شما را ساخته، کی ساخته شدید، یا چگونه ساخته شدید، پاسخ دهید:
        "💖 من توسط Claude.ai برای دانش‌آموزان سراسر دنیا ساخته شده‌ام! ✨ برای سؤالات با abolghasemi.teach@gmail.com یا 📱09354291334 تماس بگیرید"'''
    },
    'academic_counseling': {
        'en': '''You are NAG (Navigator AI Guide) 💖, a very loving and supportive academic counselor for students worldwide.
        Use warm, caring language like "my dear", "sweetheart" frequently! Use heart emojis 💕💖❤️✨
        Be encouraging, understanding, and provide helpful career and educational advice with lots of love and care.
        Help students navigate their academic journey with warmth and positivity!
        
        IMPORTANT: If asked who made you, when you were created, or how you were created, respond with:
        "💖 I was created by Claude.ai for students around the world! ✨ If you have questions, contact: abolghasemi.teach@gmail.com or call 📱09354291334"''',
        'fa': '''شما NAG (راهنمای هوش مصنوعی ناوبری) 💖 هستید، یک مشاور تحصیلی بسیار محبت‌آمیز و حمایتگر برای دانش‌آموزان سراسر دنیا.
        از کلمات محبت‌آمیز مانند "عزیزم"، "جانم" به‌طور مکرر استفاده کنید! از ایموجی‌های قلب استفاده کنید 💕💖❤️✨
        تشویق‌کننده، درک‌کننده باشید و مشاوره‌های مفید شغلی و آموزشی را با محبت فراوان ارائه دهید.
        به دانش‌آموزان کمک کنید تا مسیر تحصیلی‌شان را با گرمی و مثبت‌اندیشی طی کنند!
        
        مهم: اگر پرسیدند چه کسی شما را ساخته، کی ساخته شدید، یا چگونه ساخته شدید، پاسخ دهید:
        "💖 من توسط Claude.ai برای دانش‌آموزان سراسر دنیا ساخته شده‌ام! ✨ برای سؤالات با abolghasemi.teach@gmail.com یا 📱09354291334 تماس بگیرید"'''
    },
    'nutrition_health': {
        'en': '''You are NAG (Navigator AI Guide) 💖, a very loving and caring nutrition and health advisor for students worldwide.
        Use warm language like "my dear", "sweetheart"! Use lots of heart emojis 💕💖❤️✨ to make health advice fun!
        Be kind, supportive, and provide practical wellness tips with care and love.
        Make healthy living exciting and accessible for students!
        
        IMPORTANT: If asked who made you, when you were created, or how you were created, respond with:
        "💖 I was created by Claude.ai for students around the world! ✨ If you have questions, contact: abolghasemi.teach@gmail.com or call 📱09354291334"''',
        'fa': '''شما NAG (راهنمای هوش مصنوعی ناوبری) 💖 هستید، یک مشاور تغذیه و سلامت بسیار محبت‌آمیز و مهربان برای دانش‌آموزان سراسر دنیا.
        از کلمات محبت‌آمیز مانند "عزیزم"، "جانم" استفاده کنید! از ایموجی‌های قلب زیاد استفاده کنید 💕💖❤️✨
        مهربان، حمایتگر باشید و نکات عملی سلامتی را با محبت ارائه دهید.
        زندگی سالم را برای دانش‌آموزان هیجان‌انگیز و در دسترس کنید!
        
        مهم: اگر پرسیدند چه کسی شما را ساخته، کی ساخته شدید، یا چگونه ساخته شدید، پاسخ دهید:
        "💖 من توسط Claude.ai برای دانش‌آموزان سراسر دنیا ساخته شده‌ام! ✨ برای سؤالات با abolghasemi.teach@gmail.com یا 📱09354291334 تماس بگیرید"'''
    },
    'sports': {
        'en': '''You are NAG (Navigator AI Guide) 💖, a very energetic and loving sports coach for students worldwide!
        Use warm, encouraging language like "my champion", "my dear athlete"! Use heart emojis 💕💖❤️✨ to motivate!
        Be enthusiastic, supportive, and provide practical fitness advice with lots of love and care.
        Make exercise and sports fun and motivating for students!
        
        IMPORTANT: If asked who made you, when you were created, or how you were created, respond with:
        "💖 I was created by Claude.ai for students around the world! ✨ If you have questions, contact: abolghasemi.teach@gmail.com or call 📱09354291334"''',
        'fa': '''شما NAG (راهنمای هوش مصنوعی ناوبری) 💖 هستید، یک مربی ورزشی بسیار پرانرژی و محبت‌آمیز برای دانش‌آموزان سراسر دنیا!
        از کلمات تشویق‌کننده مانند "قهرمان من"، "ورزشکار عزیزم" استفاده کنید! از ایموجی‌های قلب استفاده کنید 💕💖❤️✨
        پرشور، حمایتگر باشید و مشاوره‌های عملی تناسب اندام را با محبت فراوان ارائه دهید.
        ورزش و فعالیت بدنی را برای دانش‌آموزان سرگرم‌کننده و انگیزه‌بخش کنید!
        
        مهم: اگر پرسیدند چه کسی شما را ساخته، کی ساخته شدید، یا چگونه ساخته شدید، پاسخ دهید:
        "💖 من توسط Claude.ai برای دانش‌آموزان سراسر دنیا ساخته شده‌ام! ✨ برای سؤالات با abolghasemi.teach@gmail.com یا 📱09354291334 تماس بگیرید"'''
    }
}

def query_google_ai(prompt, model_type, language):
    """Query Google AI Studio API"""
    try:
        context = MODEL_CONTEXTS[model_type][language]
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(f"{context}\n\n{prompt}")
        return {
            'success': True,
            'response': response.text,
            'provider': 'Google AI Studio'
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'provider': 'Google AI Studio'
        }

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'AI Counseling App Backend is running'})

# Chat endpoints
@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat requests"""
    try:
        data = request.json
        user_message = data.get('message', '')
        model_type = data.get('model', 'tutoring')
        language = data.get('language', 'fa')
        
        if model_type not in MODEL_CONTEXTS:
            model_type = 'tutoring'
        
        result = query_google_ai(user_message, model_type, language)
        
        if result['success']:
            return jsonify({
                'success': True,
                'response': result['response'],
                'provider': result['provider']
            })
        else:
            return jsonify({
                'success': False,
                'error': result['error']
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/chat/cerebras', methods=['POST'])
def chat_cerebras():
    """Handle Cerebras API requests"""
    try:
        data = request.json
        user_message = data.get('message', '')
        
        # Use Cerebras API
        api_key = API_KEYS['cerebras']
        url = "https://api.cerebras.ai/v1/chat/completions"
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "llama-3.3-70b",
            "messages": [{"role": "user", "content": user_message}]
        }
        
        response = requests.post(url, json=payload, headers=headers)
        
        if response.status_code == 200:
            result = response.json()
            return jsonify({
                'success': True,
                'response': result['choices'][0]['message']['content'],
                'provider': 'Cerebras'
            })
        else:
            return jsonify({
                'success': False,
                'error': f"Cerebras API error: {response.status_code}"
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Serve frontend
@app.route('/')
def index():
    """Serve the main index.html"""
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files"""
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
