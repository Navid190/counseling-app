// ============================================
// NAG AI - New Path to Growth
// Comprehensive Student Assistant App
// ============================================

// Translation Data
const translations = {
    fa: {
        welcomeTagline: 'هوشمندانه رشد کنید',
        labelName: 'نام دانش‌آموز',
        labelAge: 'سن',
        startBtn: 'شروع کنید',
        dashboardTitle: 'داشبورد',
        statBalance: 'موجودی کل',
        statIncome: 'درآمد ماهانه',
        statExpense: 'هزینه‌ها',
        mainActionsTitle: 'عملیات اصلی',
        actionNutrition: 'تغذیه و سلامت',
        actionSports: 'ورزش و تناسب',
        actionAcademic: 'مشاوره تحصیلی',
        actionPlanning: 'برنامه‌ریزی درسی',
        actionNotebook: 'دفترچه اهداف',
        actionRecharge: 'شارژ موبایل',
        actionFinance: 'امور مالی',
        actionGallery: 'گالری',
        recentTitle: 'فعالیت‌های اخیر',
        emptyStateText: 'هنوز فعالیتی ثبت نشده است',
        viewAllBtn: 'مشاهده همه →',
        chatTitle: 'چت کوانتومی',
        chatWelcome: 'سلام عزیزم! 👋 من دستیار هوشمند تو هستم. چطور می‌تونم کمکت کنم؟',
        tabNutrition: 'تغذیه',
        tabSports: 'ورزش',
        tabAcademic: 'تحصیلی',
        tabPlanning: 'برنامه‌ریزی',
        navHome: 'خانه',
        navNotebook: 'دفتر',
        navRecharge: 'شارژ',
        navFinance: 'مالی'
    },
    ar: {
        welcomeTagline: 'نمو بذكاء',
        labelName: 'اسم الطالب',
        labelAge: 'العمر',
        startBtn: 'ابدأ',
        dashboardTitle: 'لوحة التحكم',
        statBalance: 'الرصيد الإجمالي',
        statIncome: 'الدخل الشهري',
        statExpense: 'المصروفات',
        mainActionsTitle: 'العمليات الرئيسية',
        actionNutrition: 'التغذية والصحة',
        actionSports: 'الرياضة واللياقة',
        actionAcademic: 'الإرشاد الأكاديمي',
        actionPlanning: 'التخطيط الدراسي',
        actionNotebook: 'دفتر الأهداف',
        actionRecharge: 'شحن الهاتف',
        actionFinance: 'الشؤون المالية',
        actionGallery: 'الصور',
        recentTitle: 'النشاطات الأخيرة',
        emptyStateText: 'لا يوجد نشاط مسجل بعد',
        viewAllBtn: 'عرض الكل ←',
        chatTitle: 'الدردشة الكمية',
        chatWelcome: 'مرحباً يا عزيزي! 👋 أنا مساعدك الذكي. كيف يمكنني مساعدتك؟',
        tabNutrition: 'التغذية',
        tabSports: 'الرياضة',
        tabAcademic: 'أكاديمي',
        tabPlanning: 'التخطيط',
        navHome: 'الرئيسية',
        navNotebook: 'الدفتر',
        navRecharge: 'شحن',
        navFinance: 'مالي'
    },
    en: {
        welcomeTagline: 'Grow Smart',
        labelName: 'Student Name',
        labelAge: 'Age',
        startBtn: 'Get Started',
        dashboardTitle: 'Dashboard',
        statBalance: 'Total Balance',
        statIncome: 'Monthly Income',
        statExpense: 'Expenses',
        mainActionsTitle: 'Main Actions',
        actionNutrition: 'Nutrition & Health',
        actionSports: 'Sports & Fitness',
        actionAcademic: 'Academic Counseling',
        actionPlanning: 'Lesson Planning',
        actionNotebook: 'Goals Notebook',
        actionRecharge: 'Mobile Recharge',
        actionFinance: 'Finance',
        actionGallery: 'Gallery',
        recentTitle: 'Recent Activities',
        emptyStateText: 'No activities recorded yet',
        viewAllBtn: 'View All →',
        chatTitle: 'Quantum Chat',
        chatWelcome: "Hello dear! 👋 I'm your smart assistant. How can I help you?",
        tabNutrition: 'Nutrition',
        tabSports: 'Sports',
        tabAcademic: 'Academic',
        tabPlanning: 'Planning',
        navHome: 'Home',
        navNotebook: 'Notebook',
        navRecharge: 'Recharge',
        navFinance: 'Finance'
    }
};

// Application State
const appState = {
    user: null,
    registeredUsers: {},
    theme: 1,
    themeMode: 'auto', // 'auto' or 'fixed'
    language: 'fa',
    direction: 'rtl',
    income: [],
    expenses: [],
    savingsGoals: [],
    notebookGoals: [],
    // Separate chat history for each chatbot type
    chatHistory: {
        nutrition: [],
        sports: [],
        academic: [],
        planning: []
    },
    currentChatType: 'academic',
    balance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    zarinpalMerchantId: '',
    activities: []
};

// AI Motivation Messages
const motivationMessages = {
    nutrition: [
        '🌟 عالی! تغذیه سالم کلید موفقیت است. ادامه بده!',
        '💪 با تغذیه درست، انرژی بیشتری برای درس خواندن داری!',
        '🥗 بدن سالم = ذهن سالم. داری عالی پیش میری!',
        '✨ هر قدمی که برای سلامتی برمیداری، سرمایه‌گذاری برای آینده‌ات است!',
        '🌈 تغذیه متوازن، رمز موفقیت تحصیلی!'
    ],
    sports: [
        '🏃 ورزش باعث میشه مغز بهتر کار کنه! ادامه بده!',
        '💪 بدن قوی، ذهن قوی! داری عالی پیش میری!',
        '🌟 هر روز یه قدم کوچیک، نتیجه بزرگ!',
        '🎯 با ورزش منظم، تمرکز بیشتری در درس خواندن داری!',
        '⭐ سلامتی تنها ثروت واقعیه!'
    ],
    academic: [
        '📚 دانش قدرته! داری عالی پیش میری!',
        '🌟 هر درسی که یاد میگیری، قدمی به سوی موفقیت!',
        '💪 با تلاش و پشتکار، به هرچیزی میرسی!',
        '✨ خودت رو به خاطر این همه زحمت تحسین کن!',
        '🎯 تو توانایی رسیدن به هر هدفی رو داری!'
    ],
    planning: [
        '📋 برنامه‌ریزی یعنی موفقیت! ادامه بده!',
        '🌟 با برنامه‌ریزی، رویاهایت را به واقعیت تبدیل میکنی!',
        '💪 هر برنامه‌ای که مینویسی، یه قدم به جلویی!',
        '✨ زمان طلاییه، ازش بهترین استفاده رو بکن!',
        '🎯 تو مدیر زمان خودتی!'
    ]
};

// Category Configuration
const categoryConfig = {
    food: { icon: '🍔', color: '#F59E0B', label: { fa: 'غذا', ar: 'طعام', en: 'Food' } },
    transport: { icon: '🚗', color: '#3B82F6', label: { fa: 'حمل‌ونقل', ar: 'مواصلات', en: 'Transport' } },
    shopping: { icon: '🛍️', color: '#EC4899', label: { fa: 'خرید', ar: 'تسوق', en: 'Shopping' } },
    entertainment: { icon: '🎬', color: '#EF4444', label: { fa: 'سرگرمی', ar: 'ترفيه', en: 'Entertainment' } },
    education: { icon: '📚', color: '#06B6D4', label: { fa: 'آموزش', ar: 'تعليم', en: 'Education' } },
    other: { icon: '📦', color: '#6B7280', label: { fa: 'سایر', ar: 'أخرى', en: 'Other' } }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    initializeTheme();
    initializeApp();
});

function initializeApp() {
    if (appState.user) {
        showDashboard();
    } else {
        showWelcome();
    }
    
    setupEventListeners();
}

// Load User Data from LocalStorage
function loadUserData() {
    const userData = localStorage.getItem('nagai_user');
    const settingsData = localStorage.getItem('nagai_settings');
    const financeData = localStorage.getItem('nagai_finance');
    const notebookData = localStorage.getItem('nagai_notebook');
    const usersIndexData = localStorage.getItem('nagai_users_index');
    
    if (userData) appState.user = JSON.parse(userData);
    if (usersIndexData) {
        try {
            appState.registeredUsers = JSON.parse(usersIndexData) || {};
        } catch (e) {
            appState.registeredUsers = {};
        }
    }
    if (settingsData) {
        const settings = JSON.parse(settingsData);
        appState.theme = settings.theme || 1;
        appState.themeMode = settings.themeMode || 'auto';
        appState.language = settings.language || 'fa';
        appState.zarinpalMerchantId = settings.zarinpalMerchantId || '';
    }
    if (financeData) {
        const finance = JSON.parse(financeData);
        appState.income = finance.income || [];
        appState.expenses = finance.expenses || [];
        appState.savingsGoals = finance.savingsGoals || [];
        calculateFinanceTotals();
    }
    if (notebookData) {
        appState.notebookGoals = JSON.parse(notebookData);
    }
    
    applyLanguage(appState.language);
}

// Save Data to LocalStorage
function saveUserData() {
    localStorage.setItem('nagai_user', JSON.stringify(appState.user));
    localStorage.setItem('nagai_settings', JSON.stringify({
        theme: appState.theme,
        themeMode: appState.themeMode,
        language: appState.language,
        zarinpalMerchantId: appState.zarinpalMerchantId
    }));
    localStorage.setItem('nagai_finance', JSON.stringify({
        income: appState.income,
        expenses: appState.expenses,
        savingsGoals: appState.savingsGoals
    }));
    localStorage.setItem('nagai_notebook', JSON.stringify(appState.notebookGoals));
    
    if (appState.user && appState.user.mobile) {
        appState.registeredUsers[appState.user.mobile] = appState.user.name;
        localStorage.setItem('nagai_users_index', JSON.stringify(appState.registeredUsers));
    }
}

// Initialize Theme
function initializeTheme() {
    // Check if auto mode is on
    if (appState.themeMode === 'auto') {
        // Random theme between 1-9
        appState.theme = Math.floor(Math.random() * 9) + 1;
    }
    applyTheme(appState.theme);
}

// Apply Theme
function applyTheme(themeNumber) {
    document.documentElement.setAttribute('data-theme', themeNumber);
    appState.theme = themeNumber;
}

// Show Welcome Screen
function showWelcome() {
    const welcome = document.getElementById('welcomeScreen');
    const dashboard = document.getElementById('dashboardScreen');
    if (welcome) {
        welcome.classList.add('active');
        welcome.style.display = 'block';
    }
    if (dashboard) {
        dashboard.classList.remove('active');
        dashboard.style.display = 'none';
    }
}

// Show Dashboard
function showDashboard() {
    const welcome = document.getElementById('welcomeScreen');
    const dashboard = document.getElementById('dashboardScreen');
    if (welcome) {
        welcome.classList.remove('active');
        welcome.style.display = 'none';
    }
    if (dashboard) {
        dashboard.classList.add('active');
        dashboard.style.display = 'block';
    }
    updateDashboard();
}

// Update Dashboard
function updateDashboard() {
    // Update stats
    document.getElementById('totalBalance').textContent = formatCurrency(appState.balance);
    document.getElementById('totalIncome').textContent = formatCurrency(appState.totalIncome);
    document.getElementById('totalExpenses').textContent = formatCurrency(appState.totalExpenses);
    
    // Update user info
    if (appState.user) {
        document.getElementById('dashboardTitle').textContent = `${translations[appState.language].dashboardTitle} - ${appState.user.name}`;
        document.getElementById('profileInfo').textContent = `${appState.user.name} - ${appState.user.age} ${getAgeUnit()}`;
    }
    
    // Render activities
    renderActivities();
}

// Format Currency
function formatCurrency(amount) {
    if (appState.language === 'fa') {
        return new Intl.NumberFormat('fa-IR').format(amount) + ' ' + (appState.language === 'fa' ? 'تومان' : appState.language === 'ar' ? 'ريال' : 'T');
    }
    return new Intl.NumberFormat('en-US').format(amount) + ' T';
}

// Get Age Unit
function getAgeUnit() {
    const lang = appState.language;
    if (lang === 'fa') return 'سال';
    if (lang === 'ar') return 'سنة';
    return 'years';
}

// Render Activities
function renderActivities() {
    const activitiesList = document.getElementById('transactionsList');
    const allActivities = [...appState.income.map(i => ({...i, type: 'income'})), ...appState.expenses.map(e => ({...e, type: 'expense'}))];
    allActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const recentActivities = allActivities.slice(0, 5);
    
    if (recentActivities.length === 0) {
        activitiesList.innerHTML = `
            <div class="empty-state">
                <p>${translations[appState.language].emptyStateText}</p>
            </div>
        `;
        return;
    }
    
    activitiesList.innerHTML = recentActivities.map(activity => {
        const config = categoryConfig[activity.category] || categoryConfig.other;
        const lang = appState.language;
        return `
            <div class="transaction-item">
                <div class="transaction-icon ${activity.type}">${config.icon}</div>
                <div class="transaction-details">
                    <h4>${activity.description || config.label[lang]}</h4>
                    <p>${config.label[lang]}</p>
                </div>
                <div class="transaction-amount ${activity.type}">
                    ${activity.type === 'income' ? '+' : '-'}${formatCurrency(activity.amount)}
                    <span class="transaction-date">${formatDate(activity.date)}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    if (appState.language === 'fa') {
        return date.toLocaleDateString('fa-IR', { year: 'numeric', month: 'numeric', day: 'numeric' });
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Calculate Finance Totals
function calculateFinanceTotals() {
    appState.totalIncome = appState.income.reduce((sum, i) => sum + i.amount, 0);
    appState.totalExpenses = appState.expenses.reduce((sum, e) => sum + e.amount, 0);
    appState.balance = appState.totalIncome - appState.totalExpenses;
}

// Apply Language
function applyLanguage(lang) {
    appState.language = lang;
    appState.direction = lang === 'fa' ? 'rtl' : lang === 'ar' ? 'rtl' : 'ltr';
    
    document.documentElement.setAttribute('dir', appState.direction);
    document.documentElement.setAttribute('lang', lang);
    
    // Update UI text
    const t = translations[lang];
    if (t) {
        document.getElementById('welcomeTagline').textContent = t.welcomeTagline;
        document.getElementById('labelName').textContent = t.labelName;
        document.getElementById('labelAge').textContent = t.labelAge;
        document.getElementById('startBtn').textContent = t.startBtn;
        document.getElementById('dashboardTitle').textContent = `${t.dashboardTitle} - ${appState.user?.name || ''}`;
        document.getElementById('statBalance').textContent = t.statBalance;
        document.getElementById('statIncome').textContent = t.statIncome;
        document.getElementById('statExpense').textContent = t.statExpense;
        document.getElementById('mainActionsTitle').textContent = t.mainActionsTitle;
        document.getElementById('actionNutrition').textContent = t.actionNutrition;
        document.getElementById('actionSports').textContent = t.actionSports;
        document.getElementById('actionAcademic').textContent = t.actionAcademic;
        document.getElementById('actionPlanning').textContent = t.actionPlanning;
        document.getElementById('actionNotebook').textContent = t.actionNotebook;
        document.getElementById('actionRecharge').textContent = t.actionRecharge;
        document.getElementById('actionFinance').textContent = t.actionFinance;
        document.getElementById('actionGallery').textContent = t.actionGallery;
        document.getElementById('recentTitle').textContent = t.recentTitle;
        document.getElementById('emptyStateText').textContent = t.emptyStateText;
        document.getElementById('chatTitle').textContent = t.chatTitle;
        document.getElementById('chatWelcome').textContent = t.chatWelcome;
        document.getElementById('tabNutrition').textContent = t.tabNutrition;
        document.getElementById('tabSports').textContent = t.tabSports;
        document.getElementById('tabAcademic').textContent = t.tabAcademic;
        document.getElementById('tabPlanning').textContent = t.tabPlanning;
        document.getElementById('navHome').textContent = t.navHome;
        document.getElementById('navNotebook').textContent = t.navNotebook;
        document.getElementById('navRecharge').textContent = t.navRecharge;
        document.getElementById('navFinance').textContent = t.navFinance;
    }
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Save settings
    saveUserData();
    updateDashboard();
}

// Setup Event Listeners
function setupEventListeners() {
    // Registration Form
    document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
    
    // Language Selector
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });
    
    // Theme Button
    document.getElementById('themeBtn').addEventListener('click', () => openModal('themeModal'));
    
    // Theme Mode Selection
    document.querySelectorAll('.theme-mode').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.theme-mode').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            appState.themeMode = btn.dataset.mode;
            
            if (appState.themeMode === 'auto') {
                appState.theme = Math.floor(Math.random() * 9) + 1;
                applyTheme(appState.theme);
            }
            saveUserData();
        });
    });
    
    // Theme Color Selection
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyTheme(parseInt(btn.dataset.theme));
            appState.themeMode = 'fixed';
            document.querySelectorAll('.theme-mode').forEach(b => b.classList.remove('active'));
            document.querySelector('.theme-mode[data-mode="fixed"]').classList.add('active');
            saveUserData();
        });
    });
    
    // Action Cards
    document.querySelectorAll('.action-card').forEach(btn => {
        btn.addEventListener('click', handleActionClick);
    });
    
    // Modal Close Buttons
    document.querySelectorAll('.modal-close, [data-close]').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    // Quantum Chat Tabs
    document.querySelectorAll('.quantum-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.quantum-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            appState.currentChatType = btn.dataset.type;
            // Clear chat and show welcome for this chatbot type
            clearChatAndShowWelcome();
        });
    });
    
    // Chat Send
    document.getElementById('sendChatBtn').addEventListener('click', sendChatMessage);
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
    
    // Quick Questions
    document.querySelectorAll('.quick-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.dataset.question;
            document.getElementById('chatInput').value = question;
            sendChatMessage();
        });
    });
    
    // Notebook Save
    document.getElementById('saveGoalBtn').addEventListener('click', saveNotebookGoal);
    
    // Notebook Tabs
    document.querySelectorAll('.notebook-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.notebook-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Operator Selection
    document.querySelectorAll('.operator-btn').forEach(btn => {
        btn.addEventListener('click', handleOperatorSelect);
    });
    
    // Amount Selection
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.addEventListener('click', handleAmountSelect);
    });
    
    // Recharge Button
    document.getElementById('rechargeBtn').addEventListener('click', handleRecharge);
    
    // Finance Tabs
    document.querySelectorAll('.finance-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.finance-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.getElementById('incomeSection').style.display = 'none';
            document.getElementById('expensesSection').style.display = 'none';
            document.getElementById('assetsSection').style.display = 'none';
            
            if (btn.dataset.tab === 'income') {
                document.getElementById('incomeSection').style.display = 'block';
            } else if (btn.dataset.tab === 'expenses') {
                document.getElementById('expensesSection').style.display = 'block';
            } else {
                document.getElementById('assetsSection').style.display = 'block';
            }
        });
    });
    
    // Add Income
    document.getElementById('addIncomeBtn').addEventListener('click', addIncome);
    
    // Add Expense
    document.getElementById('addExpenseBtn').addEventListener('click', addExpense);
    
    // Add Savings Goal
    document.getElementById('addSavingsGoalBtn').addEventListener('click', addSavingsGoal);
    
    // Gallery Tabs
    document.querySelectorAll('.gallery-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.gallery-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (btn.dataset.tab === 'logo') {
                document.getElementById('logoSection').style.display = 'block';
                document.getElementById('photosSection').style.display = 'none';
            } else {
                document.getElementById('logoSection').style.display = 'none';
                document.getElementById('photosSection').style.display = 'block';
            }
        });
    });
    
    // Logo Upload
    document.getElementById('logoUploadArea').addEventListener('click', () => {
        document.getElementById('logoInput').click();
    });
    
    document.getElementById('logoInput').addEventListener('change', handleLogoUpload);
    
    // Settings Buttons
    document.getElementById('settingsBtn').addEventListener('click', () => {
        document.getElementById('settingsPanel').classList.add('active');
    });
    
    document.getElementById('themeSettingsBtn').addEventListener('click', () => {
        closePanels();
        openModal('themeModal');
    });
    
    document.getElementById('zarinpalSettingsBtn').addEventListener('click', () => {
        closePanels();
        openModal('zarinpalModal');
    });
    
    // Zarinpal Save
    document.getElementById('saveZarinpalBtn').addEventListener('click', saveZarinpalSettings);
    
    // Panel Close
    document.querySelectorAll('.panel-close').forEach(btn => {
        btn.addEventListener('click', closePanels);
    });
    
    // Mobile Navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', handleNavClick);
    });
}

// Handle Registration
function handleRegistration(e) {
    e.preventDefault();
    
    const name = document.getElementById('studentName').value.trim();
    const age = parseInt(document.getElementById('studentAge').value);
    const mobile = document.getElementById('studentMobile').value.trim();
    
    if (!name || !age || !mobile) {
        showToast('لطفا اطلاعات را کامل وارد کنید', 'error');
        return;
    }
    
    // Validate mobile number
    const mobileRegex = /^09[0-9]{9}$/;
    if (!mobileRegex.test(mobile)) {
        showToast('شماره موبایل معتبر نیست', 'error');
        return;
    }
    
    const existingName = appState.registeredUsers[mobile];
    if (existingName && existingName !== name) {
        showToast(`این شماره قبلا با نام "${existingName}" ثبت شده است`, 'error');
        return;
    }
    
    appState.user = {
        name,
        age,
        mobile,
        createdAt: new Date().toISOString()
    };
    
    saveUserData();
    showDashboard();
    showToast('خوش آمدی! 🌟', 'success');
}

// Handle Action Click
function handleActionClick(e) {
    const action = e.currentTarget.dataset.action;
    
    switch(action) {
        case 'chat-quantum':
            openModal('quantumChatModal');
            // Clear and show welcome for the current chatbot
            clearChatAndShowWelcome();
            break;
        case 'notebook':
            openModal('notebookModal');
            renderNotebookGoals();
            break;
        case 'mobile-charge':
            openModal('rechargeModal');
            break;
        case 'finance':
            openModal('financeModal');
            break;
        case 'gallery':
            openModal('galleryModal');
            break;
        default:
            showToast('به زودی...', 'info');
    }
}

// Open Modal
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modals
function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

// Close Panels
function closePanels() {
    document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.remove('active');
    });
}

// Handle Operator Select
function handleOperatorSelect(e) {
    document.querySelectorAll('.operator-btn').forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');
}

// Handle Amount Select
function handleAmountSelect(e) {
    const amount = e.currentTarget.dataset.amount;
    
    document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    if (amount === 'custom') {
        document.querySelector('.custom-amount-input').style.display = 'block';
    } else {
        document.querySelector('.custom-amount-input').style.display = 'none';
    }
}

// Handle Recharge
function handleRecharge() {
    const mobile = document.getElementById('rechargeNumber').value.trim();
    const activeOperator = document.querySelector('.operator-btn.active');
    const activeAmount = document.querySelector('.amount-btn.active');
    
    if (!mobile) {
        showToast('لطفا شماره موبایل را وارد کنید', 'error');
        return;
    }
    
    if (!validateMobile(mobile)) {
        showToast('شماره موبایل معتبر نیست', 'error');
        return;
    }
    
    if (!activeOperator) {
        showToast('لطفا اپراتور را انتخاب کنید', 'error');
        return;
    }
    
    if (!activeAmount) {
        showToast('لطفا مبلغ را انتخاب کنید', 'error');
        return;
    }
    
    let amount = activeAmount.dataset.amount;
    if (amount === 'custom') {
        amount = document.getElementById('customAmount').value;
        if (!amount || amount <= 0) {
            showToast('لطفا مبلغ را وارد کنید', 'error');
            return;
        }
    }
    
    // Process payment via Zarinpal
    processZarinpalPayment(mobile, amount);
}

// Validate Mobile
function validateMobile(number) {
    const iranianMobileRegex = /^9[0-9]{9}$/;
    return iranianMobileRegex.test(number);
}

// Process Zarinpal Payment
function processZarinpalPayment(mobile, amount) {
    showToast('در حال اتصال به زرین‌پال...', 'info');
    
    if (!appState.zarinpalMerchantId) {
        // Demo mode - simulate payment
        simulatePayment(mobile, amount);
        return;
    }
    
    // Use sandbox URL for testing
    const ZARINPAL_URL = 'https://sandbox.zarinpal.com/pg/v4/payment/request.json';
    
    const callbackUrl = window.location.origin + '/?payment=verify';
    
    fetch(ZARINPAL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            merchant_id: appState.zarinpalMerchantId,
            amount: parseInt(amount),
            callback_url: callbackUrl,
            description: `شارژ موبایل ${mobile}`,
            mobile: mobile
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.data && data.data.authority) {
            // Redirect to payment page
            const paymentUrl = `https://sandbox.zarinpal.com/pg/StartPay/${data.data.authority}`;
            window.location.href = paymentUrl;
        } else {
            // Fallback to simulation if API fails
            console.error('Zarinpal error:', data);
            simulatePayment(mobile, amount);
        }
    })
    .catch(err => {
        console.error('Payment error:', err);
        // Fallback to simulation on error
        simulatePayment(mobile, amount);
    });
}

// Simulate Payment
function simulatePayment(mobile, amount) {
    // Add as expense
    const expense = {
        id: Date.now(),
        amount: parseFloat(amount),
        category: 'other',
        description: `شارژ موبایل ${mobile}`,
        date: new Date().toISOString()
    };
    
    appState.expenses.unshift(expense);
    calculateFinanceTotals();
    saveUserData();
    updateDashboard();
    closeModals();
    
    showToast(`موبایل ${mobile} با موفقیت شارژ شد! 📱`, 'success');
}

// Send Chat Message
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">🌟</div>
        <div class="message-content">
            <p>در حال نوشتن...</p>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Get current language
    const currentLang = appState.language || 'fa';
    const chatType = appState.currentChatType || 'academic';
    
    // Call API
    fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: message,
            model: chatType,
            language: currentLang
        })
    })
    .then(res => res.json())
    .then(data => {
        // Remove typing indicator
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
        
        if (data.success) {
            addChatMessage(data.response, 'bot');
        } else {
            addChatMessage('متأسفانه مشکلی پیش آمد. لطفاً دوباره تلاش کنید.', 'bot');
        }
    })
    .catch(err => {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
        addChatMessage('خطا در اتصال. سرور را بررسی کنید.', 'bot');
    });
}

// Add Chat Message
function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const time = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${sender === 'bot' ? '🌟' : '👤'}</div>
        <div class="message-content">
            <p>${message}</p>
        </div>
        <span class="message-time">${time}</span>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Clear Chat and Show Welcome for Current Chat Type
function clearChatAndShowWelcome() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    
    const currentLang = appState.language || 'fa';
    const chatType = appState.currentChatType || 'academic';
    
    // Different welcome messages for each chatbot type
    const welcomeMessages = {
        fa: {
            nutrition: 'سلام عزیزم! 🍎 من متخصص تغذیه و سلامت هستم. درباره غذاهای سالم، میوه‌ها، ویتامین‌ها و عادت‌های سلامتی بپرس! چطور می‌تونم کمکت کنم؟',
            sports: 'سلام قهرمان! ⚽ من مربی ورزشی هستم. درباره تمرین، ورزش‌های مختلف، و عضلات بپرس! چطور می‌تونم کمکت کنم؟',
            academic: 'سلام دانش‌آموز عزیز! 📚 من مشاور تحصیلی هستم. درباره درس خواندن، امتحانات، برنامه‌ریزی و رشته‌ها بپرس! چطور می‌تونم کمکت کنم؟',
            planning: 'سلام برنامه‌ریز! 📖 من متخصص برنامه‌ریزی درسی هستم. درباره اینکه چطور درس‌هایت را برنامه‌ریزی کنی بپرس! چطور می‌تونم کمکت کنم؟'
        },
        en: {
            nutrition: "Hello sweetie! 🍎 I'm a nutrition and health expert. Ask me about healthy foods, fruits, vitamins, and healthy habits! How can I help you?",
            sports: "Hello champion! ⚽ I'm a sports coach. Ask me about exercises, different sports, and muscles! How can I help you?",
            academic: "Hello dear student! 📚 I'm an academic counselor. Ask me about studying, exams, planning, and majors! How can I help you?",
            planning: "Hello planner! 📖 I'm a study planning expert. Ask me about how to plan your studies! How can I help you?"
        },
        ar: {
            nutrition: 'مرحباً يا عزيزي! 🍎 أنا خبير التغذية والصحة. اسألني عن foods صحية وفواكه وفيتامينات وعادات صحية! كيف يمكنني مساعدتك؟',
            sports: 'مرحباً يا بطل! ⚽ أنا مدرب رياضي. اسألني عن تمارين ورياضات مختلفة وعضلات! كيف يمكنني مساعدتك؟',
            academic: 'مرحباً يا طالب عزيز! 📚 أنا مرشد أكاديمي. اسألني عن الدراسة والامتحانات والتخطيط والتخصصات! كيف يمكنني مساعدتك؟',
            planning: 'مرحباً يا مخطط! 📖 أنا خبير تخطيط الدراسي. اسألني عن كيفية تخطيط دراستك! كيف يمكنني مساعدتك؟'
        }
    };
    
    const welcomeMsg = welcomeMessages[currentLang][chatType] || welcomeMessages.fa.academic;
    addChatMessage(welcomeMsg, 'bot');
    
    // Update quick questions based on chatbot type
    updateQuickQuestions(chatType, currentLang);
}

// Update Quick Questions for Current Chat Type
function updateQuickQuestions(chatType, language) {
    const quickQuestionsContainer = document.getElementById('quickQuestions');
    if (!quickQuestionsContainer) return;
    
    const questions = {
        fa: {
            nutrition: [
                { text: '🍎 صبحانه سالم چی بخورم؟', question: 'چه صبحانه سالمی پیشنهاد میکنی؟' },
                { text: '💧 چقدر آب بخورم؟', question: 'روزانه چقدر آب باید بخورم؟' },
                { text: '🥗 میوه‌های بهترین کدامند؟', question: 'کدام میوه‌ها برای من بهترند؟' }
            ],
            sports: [
                { text: '🏃 ورزش صبحگاهی چطور؟', question: 'بهترین زمان برای ورزش صبحگاهی چه زمانی است؟' },
                { text: '💪 تمرین عضلات چطور؟', question: 'چطور عضلات قوی داشته باشم؟' },
                { text: '⚽ ورزش مورد علاقه چی بازی کنم؟', question: 'کدام ورزش برای سن من بهتر است؟' }
            ],
            academic: [
                { text: '📚 چطور درس بخوانم؟', question: 'چطور درس بخوانم تا یاد بگیرم؟' },
                { text: '📝 امتحان چطور قبول شوم؟', question: 'چطور برای امتحانات درس بخوانم؟' },
                { text: '🎯 هدف تحصیلی چی بذارم؟', question: 'چه هدف تحصیلی برای خودم بذارم؟' }
            ],
            planning: [
                { text: '📋 برنامه هفتگی چطور؟', question: 'چطور یک برنامه درسی هفتگی بنویسم؟' },
                { text: '⏰ زمان‌بندی چطور؟', question: 'چطور زمانم را مدیریت کنم؟' },
                { text: '📖 درس‌ها را چطور تقسیم کنم؟', question: 'چطور درس‌ها را برای مطالعه تقسیم کنم؟' }
            ]
        },
        en: {
            nutrition: [
                { text: '🍎 Healthy Breakfast?', question: 'What is a healthy breakfast for me?' },
                { text: '💧 How much water?', question: 'How much water should I drink daily?' },
                { text: '🥗 Best fruits?', question: 'Which fruits are best for me?' }
            ],
            sports: [
                { text: '🏃 Morning exercise?', question: 'What is the best time for morning exercise?' },
                { text: '💪 Build muscles?', question: 'How can I build strong muscles?' },
                { text: '⚽ Best sport?', question: 'Which sport is best for my age?' }
            ],
            academic: [
                { text: '📚 How to study?', question: 'How should I study to learn?' },
                { text: '📝 Pass exams?', question: 'How to study for exams to pass?' },
                { text: '🎯 Set goals?', question: 'What academic goals should I set?' }
            ],
            planning: [
                { text: '📋 Weekly plan?', question: 'How to write a weekly study plan?' },
                { text: '⏰ Time management?', question: 'How to manage my time?' },
                { text: '📖 Divide subjects?', question: 'How to divide subjects for study?' }
            ]
        }
    };
    
    const langQuestions = questions[language] || questions.fa;
    const typeQuestions = langQuestions[chatType] || langQuestions.academic;
    
    quickQuestionsContainer.innerHTML = typeQuestions.map(q => 
        `<button class="quick-question" data-question="${q.question}">${q.text}</button>`
    ).join('');
    
    // Re-attach event listeners
    document.querySelectorAll('.quick-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.dataset.question;
            document.getElementById('chatInput').value = question;
            sendChatMessage();
        });
    });
}

// Generate AI Response
function generateAIResponse() {
    const type = appState.currentChatType;
    const responses = {
        nutrition: [
            '🍎 برای تغذیه سالم، میوه و سبزیجات تازه بخور!',
            '🥗 سعی کن روزی ۵ وعده میوه و سبزی بخوری!',
            '💧 آب فراموش نشه! حداقل ۸ لیوان در روز',
            '🍞 نون رو با سبوس بخور، فیبر بیشتری داره!',
            '🍗 پروتئین رو از مرغ، ماهی و حبوبات بگیر!'
        ],
        sports: [
            '🏃 هر روز حداقل ۳۰ دقیقه ورزش کن!',
            '💪 یه برنامه ورزشی منظم داشته باش',
            '🚶 پیاده‌روی صبحگاهی خیلی مفیده!',
            '🏊 شنا یکی از بهترین ورزش‌هاست',
            '🧘 یوگا باعث آرامش و تمرکز میشه!'
        ],
        academic: [
            '📚 برای هر درس، روزی ۱-۲ ساعت وقت بذار!',
            '📝 خلاصه‌نویسی فراموش نشه!',
            '🔄 مرور درس‌ها خیلی مهمه!',
            '💡 سوال بپرس، خجالت نکش!',
            '📖 کتاب درسی رو بارها و بارها بخون!'
        ],
        planning: [
            '📋 برای هر روز، یه لیست از کارها بنویس!',
            '⏰ اول کارهای سخت رو انجام بده!',
            '🎯 اهداف کوتاه‌مدت و بلندمدت داشته باش!',
            '📅 هر هفته یه برنامه جدید بنویس!',
            '✅ کارهای انجام شده رو خط بزن، انگیزه میگیری!'
        ]
    };
    
    const typeResponses = responses[type] || responses.academic;
    return typeResponses[Math.floor(Math.random() * typeResponses.length)];
}

// Save Notebook Goal
function saveNotebookGoal() {
    const input = document.getElementById('goalInput');
    const goalText = input.value.trim();
    
    if (!goalText) {
        showToast('لطفا یک هدف بنویسید', 'error');
        return;
    }
    
    const goal = {
        id: Date.now(),
        text: goalText,
        date: new Date().toISOString(),
        completed: false
    };
    
    appState.notebookGoals.unshift(goal);
    saveUserData();
    input.value = '';
    
    // Show AI motivation
    showAIMotivation();
    
    // Render goals
    renderNotebookGoals();
    
    showToast('هدف ذخیره شد! 🎯', 'success');
}

// Show AI Motivation
function showAIMotivation() {
    const type = appState.currentChatType;
    const messages = motivationMessages[type] || motivationMessages.academic;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const motivationDiv = document.getElementById('aiMotivation');
    document.getElementById('motivationText').textContent = randomMessage;
    motivationDiv.style.display = 'block';
    
    setTimeout(() => {
        motivationDiv.style.display = 'none';
    }, 10000);
}

// Render Notebook Goals
function renderNotebookGoals() {
    const goalsList = document.getElementById('goalsList');
    
    if (appState.notebookGoals.length === 0) {
        goalsList.innerHTML = '<p style="text-align:center;color:var(--text-secondary);padding:20px;">هنوز هدفی ثبت نشده</p>';
        return;
    }
    
    goalsList.innerHTML = appState.notebookGoals.map(goal => `
        <div class="goal-item" style="background:var(--glass-background);padding:16px;border-radius:12px;margin-bottom:8px;">
            <p style="font-size:14px;">${goal.text}</p>
            <small style="color:var(--text-secondary);">${formatDate(goal.date)}</small>
        </div>
    `).join('');
}

// Add Income
function addIncome() {
    const amount = parseFloat(document.getElementById('monthlyIncome').value);
    const source = document.getElementById('incomeSource').value;
    
    if (!amount || amount <= 0) {
        showToast('لطفا مبلغ را وارد کنید', 'error');
        return;
    }
    
    const income = {
        id: Date.now(),
        amount,
        source,
        date: new Date().toISOString()
    };
    
    appState.income.unshift(income);
    calculateFinanceTotals();
    saveUserData();
    updateDashboard();
    
    document.getElementById('monthlyIncome').value = '';
    showToast('درآمد اضافه شد! 💰', 'success');
}

// Add Expense
function addExpense() {
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;
    const description = document.getElementById('expenseDescription').value;
    
    if (!amount || amount <= 0) {
        showToast('لطفا مبلغ را وارد کنید', 'error');
        return;
    }
    
    const expense = {
        id: Date.now(),
        amount,
        category,
        description,
        date: new Date().toISOString()
    };
    
    appState.expenses.unshift(expense);
    calculateFinanceTotals();
    saveUserData();
    updateDashboard();
    
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseDescription').value = '';
    showToast('هزینه ثبت شد! 📊', 'success');
}

// Add Savings Goal
function addSavingsGoal() {
    const goal = document.getElementById('savingsGoal').value.trim();
    const amount = parseFloat(document.getElementById('savingsGoalAmount').value);
    
    if (!goal || !amount) {
        showToast('لطفا اطلاعات کامل را وارد کنید', 'error');
        return;
    }
    
    const savingsGoal = {
        id: Date.now(),
        goal,
        targetAmount: amount,
        currentAmount: 0,
        date: new Date().toISOString()
    };
    
    appState.savingsGoals.push(savingsGoal);
    saveUserData();
    
    document.getElementById('savingsGoal').value = '';
    document.getElementById('savingsGoalAmount').value = '';
    showToast('هدف پس‌انداز ثبت شد! 🎯', 'success');
}

// Handle Logo Upload
function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const logoImg = document.getElementById('appLogo');
        const galleryLogo = document.getElementById('galleryLogo');
        
        logoImg.src = event.target.result;
        logoImg.style.display = 'block';
        
        galleryLogo.src = event.target.result;
        galleryLogo.style.display = 'block';
        
        // Save to localStorage
        localStorage.setItem('nagai_logo', event.target.result);
        
        showToast('لوگو آپلود شد! 🏷️', 'success');
    };
    reader.readAsDataURL(file);
}

// Load saved logo
function loadSavedLogo() {
    const savedLogo = localStorage.getItem('nagai_logo');
    if (savedLogo) {
        const logoImg = document.getElementById('appLogo');
        const galleryLogo = document.getElementById('galleryLogo');
        
        logoImg.src = savedLogo;
        logoImg.style.display = 'block';
        
        galleryLogo.src = savedLogo;
        galleryLogo.style.display = 'block';
    } else {
        // Use default SVG logo
        const logoImg = document.getElementById('appLogo');
        const galleryLogo = document.getElementById('galleryLogo');
        
        logoImg.src = 'logo.svg';
        logoImg.style.display = 'block';
        
        galleryLogo.src = 'logo.svg';
        galleryLogo.style.display = 'block';
    }
}

// Save Zarinpal Settings
function saveZarinpalSettings() {
    const merchantId = document.getElementById('zarinpalMerchantId').value.trim();
    
    appState.zarinpalMerchantId = merchantId;
    saveUserData();
    
    const statusIndicator = document.getElementById('apiStatus');
    const statusText = document.getElementById('apiStatusText');
    
    if (merchantId) {
        statusIndicator.textContent = '✅';
        statusText.textContent = 'متصل';
        showToast('تنظیمات زرین‌پال ذخیره شد! 🔗', 'success');
    } else {
        statusIndicator.textContent = '❌';
        statusText.textContent = 'متصل نیست';
    }
    
    closeModals();
}

// Handle Nav Click
function handleNavClick(e) {
    const action = e.currentTarget.dataset.action;
    const screen = e.currentTarget.dataset.screen;
    
    if (screen === 'dashboard') {
        // Already on dashboard
        return;
    }
    
    if (action === 'add') {
        openModal('financeModal');
        return;
    }
    
    // Update active nav
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    // Handle action
    handleActionClick({ currentTarget: e.currentTarget });
}

// Show Toast
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastIn 0.4s ease reverse';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Load saved logo on startup
loadSavedLogo();
