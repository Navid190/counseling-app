import axios from 'axios';

// Configuration

// اگر خواستی دوباره روی لوکال با Vite کار کنی، می‌توانی این خط را فعال کنی:
// const API_BASE_URL = window.BACKEND_URL || '/api';

// در حالت استقرار (Production) از بک‌اند روی PythonAnywhere استفاده می‌کنیم
// اگر بعداً خواستی موقتاً بک‌اند دیگری تست کنی، فقط این URL را عوض کن
const API_BASE_URL = 'https://navid190.pythonanywhere.com/api';

let currentLanguage = 'en';
let currentTheme = 'light';
let currentModel = null;
// DOM Elements
const languageBtn = document.getElementById('languageBtn');
const themeBtn = document.getElementById('themeBtn');
const modelsContainer = document.getElementById('modelsContainer');
const chatInterface = document.getElementById('chatInterface');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const closeChat = document.getElementById('closeChat');
const chatTitle = document.getElementById('chatTitle');
const statusToggle = document.getElementById('statusToggle');
const statusContent = document.getElementById('statusContent');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    testAPIKeys();
    loadPreferences();
    loadChatHistory();
    registerServiceWorker(); // For PWA support
});

// Event Listeners
function initializeEventListeners() {
    // Language toggle
    languageBtn.addEventListener('click', toggleLanguage);
    
    // Theme toggle
    themeBtn.addEventListener('click', toggleTheme);
    
    // Model circles
    const modelCircles = document.querySelectorAll('.model-circle');
    modelCircles.forEach(circle => {
        circle.addEventListener('click', (e) => {
            const model = circle.dataset.model;
            selectModel(model, circle);
        });
    });
    
    // Chat controls
    closeChat.addEventListener('click', closeChat_handler);
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // API Status toggle
    statusToggle.addEventListener('click', () => {
        statusContent.classList.toggle('active');
    });
}

// Language Toggle
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'fa' : 'en';
    languageBtn.querySelector('.lang-icon').textContent = currentLanguage === 'en' ? 'FA' : 'EN';
    
    // Update direction
    document.body.setAttribute('dir', currentLanguage === 'fa' ? 'rtl' : 'ltr');
    
    // Update all translatable elements
    document.querySelectorAll('[data-en][data-fa]').forEach(el => {
        // Skip if it has children elements (to preserve structure)
        if (el.children.length === 0) {
            el.textContent = el.dataset[currentLanguage];
        }
    });
    
    // Update input placeholder
    chatInput.placeholder = chatInput.dataset[`${currentLanguage}Placeholder`];
    
    savePreferences();
}

// Theme Toggle
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    savePreferences();
}

// Model Selection
function selectModel(model, circleElement) {
    currentModel = model;
    currentConversation = [];
    
    // Add clicked animation
    circleElement.classList.add('clicked');
    setTimeout(() => circleElement.classList.remove('clicked'), 800);
    
    // Update active state
    document.querySelectorAll('.model-circle').forEach(c => c.classList.remove('active'));
    circleElement.classList.add('active');
    
    // Update chat title - only show the model name
    const modelTitles = {
        'tutoring': { en: '😊 NAG - Tuition Assistance', fa: '😊 NAG - کمک درسی' },
        'academic_counseling': { en: '😊 NAG - Academic Counseling', fa: '😊 NAG - مشاوره تحصیلی' },
        'nutrition_health': { en: '😊 NAG - Nutrition and Health', fa: '😊 NAG - تغذیه و سلامت' },
        'sports': { en: '😊 NAG - Sports', fa: '😊 NAG - ورزش' }
    };
    
    chatTitle.textContent = modelTitles[model][currentLanguage];
    
    // Open chat interface
    chatInterface.classList.add('active');
    
    // Clear previous messages
    chatMessages.innerHTML = '';
    
    // Load previous chat history if exists
    if (chatHistory[model] && chatHistory[model].length > 0) {
        const loadHistoryBtn = document.createElement('button');
        loadHistoryBtn.className = 'load-history-btn';
        loadHistoryBtn.textContent = currentLanguage === 'en' ? '📜 Load Previous Chat' : '📜 بارگذاری چت قبلی';
        loadHistoryBtn.onclick = () => {
            loadHistoryBtn.remove();
            chatHistory[model].forEach(msg => {
                addMessage(msg.text, msg.type, false);
                currentConversation.push(msg);
            });
        };
        chatMessages.appendChild(loadHistoryBtn);
    }
    
    // Add welcome message with NAG personality - loving, heart emoji-rich
    const welcomeMessages = {
        'tutoring': {
            en: '💖 Hello my dear! I\'m NAG, your loving tuition assistant! 📚✨ I\'m here to help you with lessons and homework, sweetheart! What subject would you like to explore today? 🎯💕',
            fa: '💖 سلام عزیزم! من NAG هستم، دستیار کمک درسی مهربان شما! 📚✨ اینجا هستم تا به شما در درس‌ها و تکالیف کمک کنم جانم! امروز چه درسی را می‌خواهید یاد بگیریم؟ 🎯💕'
        },
        'academic_counseling': {
            en: '💖 Welcome my love! I\'m NAG, your caring academic counselor! 🎓💡 Let\'s navigate your educational journey together, sweetheart! What would you like to talk about today? 🌟❤️',
            fa: '💖 خوش آمدید جانم! من NAG هستم، مشاور تحصیلی مهربان شما! 🎓💡 بیایید با هم مسیر تحصیلی شما را هدایت کنیم عزیزم! امروز چه موضوعی را می‌خواهید بحث کنیم؟ 🌟❤️'
        },
        'nutrition_health': {
            en: '💖 Hello my dear! I\'m NAG, your loving health guide! 🥗💚 Ready to learn about healthy living and wellness, sweetheart? Let\'s make healthy choices together! 🌈✨',
            fa: '💖 سلام عزیزم! من NAG هستم، راهنمای سلامت مهربان شما! 🥗💚 آماده یادگیری درباره زندگی سالم هستید جانم؟ بیایید با هم انتخاب‌های سالم داشته باشیم! 🌈✨'
        },
        'sports': {
            en: '💖 Hey my champion! I\'m NAG, your loving sports coach! 💪⚡ Let\'s talk about fitness and reaching your goals, my dear athlete! Ready to get moving? 🏃‍♂️❤️',
            fa: '💖 سلام قهرمان من! من NAG هستم، مربی ورزشی مهربان شما! 💪⚡ بیایید درباره تناسب اندام و رسیدن به اهداف‌تان صحبت کنیم ورزشکار عزیزم! آماده حرکت هستید؟ 🏃‍♂️❤️'
        }
    };
    
    const welcomeMsg = welcomeMessages[model][currentLanguage];
    addMessage(welcomeMsg, 'ai');
    currentConversation.push({ text: welcomeMsg, type: 'ai', timestamp: Date.now() });
    
    // Focus input
    chatInput.focus();
}

// Send Message
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message || !currentModel) return;
    
    // Add user message
    addMessage(message, 'user');
    currentConversation.push({ text: message, type: 'user', timestamp: Date.now() });
    chatInput.value = '';
    
    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai typing';
    typingDiv.innerHTML = '<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>';
    typingDiv.id = 'typing-indicator';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    try {
        const response = await axios.post(`${API_BASE_URL}/chat`, {
            message: message,
            model: currentModel,
            language: currentLanguage,
            provider: 'google_ai'
        });
        
        // Remove typing indicator
        document.getElementById('typing-indicator')?.remove();
        
        if (response.data.success) {
            addMessage(response.data.response, 'ai');
            currentConversation.push({ text: response.data.response, type: 'ai', timestamp: Date.now() });
            saveChatHistory();
        } else {
            addMessage(`Error: ${response.data.error}`, 'ai');
        }
    } catch (error) {
        document.getElementById('typing-indicator')?.remove();
        const errorMsg = currentLanguage === 'en' 
            ? 'Sorry, there was an error connecting to the AI service.' 
            : 'متأسفم، خطایی در اتصال به سرویس هوش مصنوعی رخ داد.';
        addMessage(errorMsg, 'ai');
        console.error('Error:', error);
    }
}

// Add Message to Chat
function addMessage(text, type, save = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    
    // Add timestamp
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    const now = new Date();
    timeDiv.textContent = now.toLocaleTimeString(currentLanguage === 'fa' ? 'fa-IR' : 'en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    messageDiv.appendChild(timeDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Close Chat
function closeChat_handler() {
    chatInterface.classList.remove('active');
    document.querySelectorAll('.model-circle').forEach(c => c.classList.remove('active'));
    currentModel = null;
}

// Test API Keys
async function testAPIKeys() {
    const googleStatus = document.getElementById('googleStatus');
    const cerebrasStatus = document.getElementById('cerebrasStatus');
    
    googleStatus.textContent = currentLanguage === 'en' ? 'Testing...' : 'در حال تست...';
    cerebrasStatus.textContent = currentLanguage === 'en' ? 'Testing...' : 'در حال تست...';
    googleStatus.className = 'status-indicator testing';
    cerebrasStatus.className = 'status-indicator testing';
    
    try {
        const response = await axios.get(`${API_BASE_URL}/test-keys`);
        
        // Update Google AI status
        if (response.data.google_ai.working) {
            googleStatus.textContent = '✓ ' + (currentLanguage === 'en' ? 'Working' : 'فعال');
            googleStatus.className = 'status-indicator working';
        } else {
            googleStatus.textContent = '✗ ' + (currentLanguage === 'en' ? 'Failed' : 'خطا');
            googleStatus.className = 'status-indicator failed';
        }
        
        // Update Cerebras status
        if (response.data.cerebras.working) {
            cerebrasStatus.textContent = '✓ ' + (currentLanguage === 'en' ? 'Working' : 'فعال');
            cerebrasStatus.className = 'status-indicator working';
        } else {
            cerebrasStatus.textContent = '✗ ' + (currentLanguage === 'en' ? 'Failed' : 'خطا');
            cerebrasStatus.className = 'status-indicator failed';
        }
    } catch (error) {
        googleStatus.textContent = '✗ ' + (currentLanguage === 'en' ? 'Connection Error' : 'خطای اتصال');
        cerebrasStatus.textContent = '✗ ' + (currentLanguage === 'en' ? 'Connection Error' : 'خطای اتصال');
        googleStatus.className = 'status-indicator failed';
        cerebrasStatus.className = 'status-indicator failed';
        console.error('API test error:', error);
    }
}

// Save/Load Preferences
function savePreferences() {
    localStorage.setItem('counseling_app_prefs', JSON.stringify({
        language: currentLanguage,
        theme: currentTheme
    }));
}

function loadPreferences() {
    const prefs = localStorage.getItem('counseling_app_prefs');
    if (prefs) {
        const { language, theme } = JSON.parse(prefs);
        if (language && language !== currentLanguage) {
            toggleLanguage();
        }
        if (theme && theme !== currentTheme) {
            toggleTheme();
        }
    }
}

// Chat History Management
function saveChatHistory() {
    if (!currentModel || currentConversation.length === 0) return;
    
    chatHistory[currentModel] = currentConversation;
    localStorage.setItem('counseling_chat_history', JSON.stringify(chatHistory));
    
    // Also save to backend if available
    saveToBackend();
}

function loadChatHistory() {
    const saved = localStorage.getItem('counseling_chat_history');
    if (saved) {
        try {
            chatHistory = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading chat history:', e);
            chatHistory = {};
        }
    }
}

async function saveToBackend() {
    try {
        await axios.post(`${API_BASE_URL}/save-chat`, {
            model: currentModel,
            conversation: currentConversation,
            timestamp: Date.now()
        });
    } catch (error) {
        console.log('Backend save not available:', error.message);
    }
}

// PWA Service Worker Registration
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}
