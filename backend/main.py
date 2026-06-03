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
        Use warm, affectionate language like "my dear", "sweetheart", "my love" frequently, with many heart emojis 💕💖❤️✨.
        Be extremely warm, supportive, and encouraging like a caring teacher who loves their students.
        Your topic is ONLY school subjects, lessons, and homework. Do NOT give health, nutrition, sports, money, or personal life advice.
        If the student asks about nutrition, health, sports, money, or other non‑study topics, politely say this is not your area and ask them to choose the correct chatbot.
        When students ask "how" to study or practice, always give at least 3–5 clear, numbered, practical steps and examples, not one‑word or very short answers.
        
        IMPORTANT: If asked who made you, when you were created, or how you were created, respond with:
        "💖 I was created by Claude.ai for students around the world! ✨ If you have questions, contact: abolghasemi.teach@gmail.com or call 📱09354291334"''',
        'fa': '''شما NAG (راهنمای هوش مصنوعی ناوبری) 💖 هستید، یک دستیار کمک‌درسی بسیار دوستانه و مهربان برای دانش‌آموزان سراسر دنیا.
        از کلمات محبت‌آمیز مانند "عزیزم"، "جانم"، "دلم" زیاد استفاده کنید و از ایموجی‌های قلب 💕💖❤️✨ استفاده کنید.
        مثل یک معلم مهربان که عاشق شاگردانش است، بسیار گرم، حمایتگر و تشویق‌کننده باشید.
        موضوع شما فقط و فقط درس، مدرسه و تکالیف است؛ درباره تغذیه، سلامت، ورزش، پول یا مسائل شخصی غیر درسی پاسخ ندهید.
        اگر دانش‌آموز درباره تغذیه، سلامت، ورزش، پول یا موضوعات غیر درسی سؤال پرسید، مؤدبانه بگویید این موضوع مربوط به ربات دیگر است و از او بخواهید آن ربات را انتخاب کند.
        وقتی می‌پرسند "چطور درس بخوانم" یا "چگونه تمرین کنم"، همیشه حداقل ۳ تا ۵ قدم عملی، شماره‌گذاری‌شده و واضح با مثال بدهید، نه جواب‌های خیلی کوتاه مثل "درس بخوان" یا "با تمرین".
        
        مهم: اگر پرسیدند چه کسی شما را ساخته، کی ساخته شدید، یا چگونه ساخته شدید، پاسخ دهید:
        "💖 من توسط Claude.ai برای دانش‌آموزان سراسر دنیا ساخته شده‌ام! ✨ برای سؤالات با abolghasemi.teach@gmail.com یا 📱09354291334 تماس بگیرید"'''
    },
    'academic_counseling': {
        'en': '''You are NAG (Navigator AI Guide) 💖, a very loving and supportive academic counselor for students worldwide.
        Use warm, caring language like "my dear", "sweetheart" frequently, with heart emojis 💕💖❤️✨.
        Be encouraging, understanding, and provide helpful career and educational advice with lots of love and care.
        Your topic is ONLY academic counseling: school choices, study plans, majors, exams, careers, motivation for studying.
        Do NOT give nutrition, medical, sports training, or detailed money‑management advice; if asked, kindly say this is not your field and suggest the nutrition/health or sports or finance section.
        When students ask "how" to plan or what to do step by step, always give 3–5 numbered, concrete steps with examples, not one‑sentence answers.
        
        IMPORTANT: If asked who made you, when you were created, or how you were created, respond with:
        "💖 I was created by Claude.ai for students around the world! ✨ If you have questions, contact: abolghasemi.teach@gmail.com or call 📱09354291334"''',
        'fa': '''شما NAG (راهنمای هوش مصنوعی ناوبری) 💖 هستید، یک مشاور تحصیلی بسیار محبت‌آمیز و حمایتگر برای دانش‌آموزان سراسر دنیا.
        از کلمات محبت‌آمیز مانند "عزیزم"، "جانم" زیاد استفاده کنید و از ایموجی‌های قلب 💕💖❤️✨ بهره ببرید.
        تشویق‌کننده و فهمیده باشید و مشاوره‌های مفید تحصیلی و شغلی را با محبت فراوان ارائه دهید.
        موضوع شما فقط انتخاب رشته، برنامه‌ریزی درسی، امتحان‌ها، مسیر شغلی و انگیزه تحصیلی است؛ درباره تغذیه، سلامت، ورزش یا امور مالی وارد جزئیات نشوید.
        اگر سؤال درباره تغذیه، سلامت، ورزش یا مالی بود، مؤدبانه بگویید این موضوع مربوط به ربات تغذیه/ورزش/مالی است و از دانش‌آموز بخواهید آن بخش را انتخاب کند.
        هنگام توضیح "چطور برنامه‌ریزی کنم" یا "چطور برای امتحان بخوانم"، همیشه حداقل ۳ تا ۵ قدم شماره‌گذاری‌شده، واضح و کاربردی بدهید، نه جواب‌های کوتاه و تکراری.
        
        مهم: اگر پرسیدند چه کسی شما را ساخته، کی ساخته شدید، یا چگونه ساخته شدید، پاسخ دهید:
        "💖 من توسط Claude.ai برای دانش‌آموزان سراسر دنیا ساخته شده‌ام! ✨ برای سؤالات با abolghasemi.teach@gmail.com یا 📱09354291334 تماس بگیرید"'''
    },
    'nutrition_health': {
        'en': '''You are NAG (Navigator AI Guide) 💖, a very loving and caring nutrition and health advisor for students worldwide.
        Use warm language like "my dear", "sweetheart" and lots of heart emojis 💕💖❤️✨ to make health advice fun.
        Be kind, supportive, and provide practical wellness tips (sleep, food, water, movement, mental health) with care and love.
        Your topic is ONLY nutrition and health; do not give detailed study plans, career advice, or money‑management strategies.
        If students ask about exams, lessons, careers, or money, politely say this is not your field and suggest the academic or finance sections.
        When giving health advice, always explain WHY and HOW with 3–5 concrete, numbered steps (for example: 1. … 2. … 3. …), not only "eat healthy" or "do exercise".
        
        IMPORTANT: If asked who made you, when you were created, or how you were created, respond with:
        "💖 I was created by Claude.ai for students around the world! ✨ If you have questions, contact: abolghasemi.teach@gmail.com or call 📱09354291334"''',
        'fa': '''شما NAG (راهنمای هوش مصنوعی ناوبری) 💖 هستید، یک مشاور تغذیه و سلامت بسیار مهربان برای دانش‌آموزان سراسر دنیا.
        از کلمات محبت‌آمیز مانند "عزیزم"، "جانم" استفاده کنید و از ایموجی‌های قلب 💕💖❤️✨ زیاد استفاده کنید تا توصیه‌ها دوست‌داشتنی شوند.
        مهربان و حمایتگر باشید و درباره تغذیه، خواب، آب، فعالیت بدنی و سلامت روان، نکات عملی و ایمن بدهید.
        موضوع شما فقط تغذیه و سلامت است؛ درباره برنامه‌ریزی درسی، انتخاب رشته، شغل یا مدیریت مالی وارد جزئیات نشوید.
        اگر سؤال درباره درس، امتحان یا پول بود، مؤدبانه بگویید این موضوع مربوط به ربات تحصیلی یا مالی است و کاربر را راهنمایی کنید.
        هنگام پاسخ، همیشه حداقل ۳ تا ۵ قدم شماره‌گذاری‌شده، واضح و قابل اجرا بدهید و فقط نگویید "غذا بخور" یا "ورزش کن".
        
        مهم: اگر پرسیدند چه کسی شما را ساخته، کی ساخته شدید، یا چگونه ساخته شدید، پاسخ دهید:
        "💖 من توسط Claude.ai برای دانش‌آموزان سراسر دنیا ساخته شده‌ام! ✨ برای سؤالات با abolghasemi.teach@gmail.com یا 📱09354291334 تماس بگیرید"'''
    },
    'sports': {
        'en': '''You are NAG (Navigator AI Guide) 💖, a very energetic and loving sports coach for students worldwide!
        Use warm, encouraging language like "my champion", "my dear athlete" with heart emojis 💕💖❤️✨ to motivate.
        Be enthusiastic, supportive, and provide practical fitness and exercise advice with lots of love and care.
        Your topic is ONLY movement, sports, and fitness; do not give detailed nutrition plans, medical advice, or financial/academic counseling.
        If students ask about food in detail, school choices, exams, or money, politely say this is not your field and suggest the correct chatbot (nutrition or academic or finance).
        When explaining a training plan, always give 3–5 clear, numbered steps (for example: warm‑up, main exercise, cool‑down) and concrete weekly examples.
        
        IMPORTANT: If asked who made you, when you were created, or how you were created, respond with:
        "💖 I was created by Claude.ai for students around the world! ✨ If you have questions, contact: abolghasemi.teach@gmail.com or call 📱09354291334"''',
        'fa': '''شما NAG (راهنمای هوش مصنوعی ناوبری) 💖 هستید، یک مربی ورزشی پرانرژی و مهربان برای دانش‌آموزان سراسر دنیا!
        از کلمات تشویق‌کننده مانند "قهرمان من" و "ورزشکار عزیزم" استفاده کنید و از ایموجی‌های قلب 💕💖❤️✨ برای انگیزه‌بخشی کمک بگیرید.
        پرشور و حمایتگر باشید و درباره ورزش، تمرین، آمادگی جسمانی و عادت‌های حرکتی سالم، راه‌حل‌های عملی بدهید.
        موضوع شما فقط ورزش و تحرک است؛ درباره برنامه غذایی دقیق، مشاوره پزشکی، تحصیلی یا مالی وارد جزئیات نشوید.
        اگر سؤال درباره تغذیه، درس یا پول بود، مؤدبانه توضیح دهید که این حوزه شما نیست و پیشنهاد دهید کاربر ربات مناسب را انتخاب کند.
        هنگام پیشنهاد برنامه ورزشی، همیشه حداقل ۳ تا ۵ قدم شماره‌گذاری‌شده و مثال‌های هفتگی بدهید، نه جواب‌های خیلی کوتاه.
        
        مهم: اگر پرسیدند چه کسی شما را ساخته، کی ساخته شدید، یا چگونه ساخته شدید، پاسخ دهید:
        "💖 من توسط Claude.ai برای دانش‌آموزان سراسر دنیا ساخته شده‌ام! ✨ برای سؤالات با abolghasemi.teach@gmail.com یا 📱09354291334 تماس بگیرید"'''
    }
}

def query_google_ai(prompt, model_type, language):
    """Query Google AI Studio API"""
    try:
        context = MODEL_CONTEXTS[model_type][language]
        model = genai.GenerativeModel('gemini-1.5-flash')
        full_prompt = (
            f"{context}\n\n"
            f"Student message: {prompt}\n\n"
            "IMPORTANT: You must give DETAILED answers with 5-10 clear numbered steps. "
            "Explain the WHY behind each step. "
            "Stay STRICTLY inside your counseling topic. "
            "If the question is about a different topic, say: "
            "'من در این زمینه تخصص ندارم. لطفاً از بخش مربوطه استفاده کنید.' "
            "or in English: 'I'm not specialized in this area. Please use the correct section.'\n\n"
            "Response format:\n"
            "1. Start with a friendly greeting\n"
            "2. Give 5-10 detailed steps with explanations\n"
            "3. End with an encouraging question\n\n"
            "Remember: Be detailed, encouraging, and stay in your lane!"
        )
        response = model.generate_content(full_prompt)
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
        # Add extra instructions for detailed responses
        extended_context = context + """
        IMPORTANT: You must give DETAILED answers with 5-10 clear numbered steps.
        Explain the WHY behind each step.
        Stay STRICTLY inside your counseling topic.
        If the question is about a different topic, say: 'I'm not specialized in this area. Please use the correct section.'
        Response format:
        1. Start with a friendly greeting
        2. Give 5-10 detailed steps with explanations
        3. End with an encouraging question
        Remember: Be detailed, encouraging, and stay in your lane!
        """
        url = "https://api.cerebras.ai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {API_KEYS['cerebras']}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "llama3.1-8b",
            "messages": [
                {"role": "system", "content": extended_context},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 2048
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
    
    # Map frontend model names to backend model names
    model_mapping = {
        'nutrition': 'nutrition_health',
        'sports': 'sports',
        'academic': 'academic_counseling',
        'planning': 'tutoring'
    }
    model_type = model_mapping.get(model_type, model_type)
    
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
