from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import google.generativeai as genai
import requests
import os

app = Flask(__name__, static_folder='../financial-app', static_url_path='')
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

def query_cerebras(prompt, model_type, language):
    """Query Cerebras Cloud API"""
    try:
        context = MODEL_CONTEXTS[model_type][language]
        url = "https://api.cerebras.ai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {API_KEYS['cerebras']}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "llama3.1-8b",
            "messages": [
                {"role": "system", "content": context},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 1024
        }
        response = requests.post(url, json=data, headers=headers)
        result = response.json()
        
        if response.status_code == 200:
            return {
                'success': True,
                'response': result['choices'][0]['message']['content'],
                'provider': 'Cerebras Cloud'
            }
        else:
            return {
                'success': False,
                'error': result.get('error', {}).get('message', 'Unknown error'),
                'provider': 'Cerebras Cloud'
            }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'provider': 'Cerebras Cloud'
        }

@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint"""
    data = request.json
    prompt = data.get('message', '')
    model_type = data.get('model', 'tutoring')
    language = data.get('language', 'en')
    provider = data.get('provider', 'google_ai')
    
    if not prompt:
        return jsonify({'error': 'No message provided'}), 400
    
    # Try primary provider
    if provider == 'google_ai':
        result = query_google_ai(prompt, model_type, language)
        if not result['success']:
            # Fallback to Cerebras
            result = query_cerebras(prompt, model_type, language)
    else:
        result = query_cerebras(prompt, model_type, language)
        if not result['success']:
            # Fallback to Google AI
            result = query_google_ai(prompt, model_type, language)
    
    return jsonify(result)

@app.route('/api/test-keys', methods=['GET'])
def test_keys():
    """Test all API keys"""
    results = {}
    
    # Test Google AI
    google_result = query_google_ai("Hello, this is a test.", 'tutoring', 'en')
    results['google_ai'] = {
        'working': google_result['success'],
        'message': 'Connected successfully' if google_result['success'] else google_result.get('error', 'Failed')
    }
    
    # Test Cerebras
    cerebras_result = query_cerebras("Hello, this is a test.", 'tutoring', 'en')
    results['cerebras'] = {
        'working': cerebras_result['success'],
        'message': 'Connected successfully' if cerebras_result['success'] else cerebras_result.get('error', 'Failed')
    }
    
    return jsonify(results)

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'AI Counseling App Backend is running'})

@app.route('/api/save-chat', methods=['POST'])
def save_chat():
    """Save chat history to backend (optional storage)"""
    try:
        data = request.json
        model = data.get('model')
        conversation = data.get('conversation')
        timestamp = data.get('timestamp')
        
        # For now, just acknowledge receipt
        # In production, you would save to database
        return jsonify({
            'success': True,
            'message': 'Chat saved successfully',
            'model': model,
            'messages_count': len(conversation) if conversation else 0
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    # Serve index.html at root for SPA
    @app.route('/')
    def index():
        # Serve from financial-app folder
        return send_from_directory(app.static_folder, 'index.html')
    
    @app.route('/<path:path>')
    def serve_static(path):
        # Serve static files from financial-app
        return send_from_directory(app.static_folder, path)
    
    app.run(host='0.0.0.0', port=5174, debug=True)
