// Borna Holding - Main Entrance Page with Rotating Pyramid Navigation
// Complete frontend for z.ai with theme, language, and occasion systems

import React, { useState, useEffect } from 'react';

// ============================================================================
// THEME ENGINE (9 Themes)
// ============================================================================

const THEMES = [
  {
    id: "academic",
    name: { fa: "کلاسیک آکادمیک", en: "Classic Academic", ar: "أكاديمي كلاسيكي" },
    primary: "#1B263B", secondary: "#F0F4F8", accent: "#D4AF37",
    bg: "#F0F4F8", surface: "#FFFFFF", text: "#1B263B", muted: "#64748B",
    border: "#E2E8F0", shadow: "rgba(27,38,59,0.12)",
    description: { fa: "رسمی و قابل اعتماد", en: "Formal & trustworthy" }
  },
  {
    id: "nature",
    name: { fa: "طبیعت و رشد", en: "Nature & Growth", ar: "الطبيعة والنمو" },
    primary: "#2E5C48", secondary: "#FDFBF7", accent: "#E89F5E",
    bg: "#FDFBF7", surface: "#FFFFFF", text: "#1A3A2A", muted: "#6B7B6E",
    border: "#D4E6DA", shadow: "rgba(46,92,72,0.12)",
    description: { fa: "آرام و طبیعی", en: "Calm & natural" }
  },
  {
    id: "tech",
    name: { fa: "مدرن و تکنولوژی", en: "Modern Tech", ar: "تقني حديث" },
    primary: "#007BFF", secondary: "#F8F9FA", accent: "#17A2B8",
    bg: "#F8F9FA", surface: "#FFFFFF", text: "#212529", muted: "#6C757D",
    border: "#DEE2E6", shadow: "rgba(0,123,255,0.12)",
    description: { fa: "نوآور و هوشمند", en: "Innovative & smart" }
  },
  {
    id: "energy",
    name: { fa: "انرژی و پویایی", en: "Energy & Sport", ar: "الطاقة والحيوية" },
    primary: "#FF6B35", secondary: "#FFFFFF", accent: "#004E89",
    bg: "#FFF8F5", surface: "#FFFFFF", text: "#1A1A1A", muted: "#666666",
    border: "#FFD4C2", shadow: "rgba(255,107,53,0.12)",
    description: { fa: "پرانرژی و شاد", en: "Energetic & vibrant" }
  },
  {
    id: "creative",
    name: { fa: "خلاقیت و هنر", en: "Creative & Art", ar: "الإبداع والفن" },
    primary: "#6F42C1", secondary: "#F3E5F5", accent: "#FFD54F",
    bg: "#FAF5FF", surface: "#FFFFFF", text: "#2D1B5E", muted: "#7B6B8A",
    border: "#E1BEF0", shadow: "rgba(111,66,193,0.12)",
    description: { fa: "خلاق و هنری", en: "Creative & artistic" }
  },
  {
    id: "minimal",
    name: { fa: "مینیمال و تمیز", en: "Minimal & Clean", ar: "بسيط ونظيف" },
    primary: "#333333", secondary: "#FFFFFF", accent: "#4DA8DA",
    bg: "#FFFFFF", surface: "#F9FAFB", text: "#111111", muted: "#888888",
    border: "#E5E7EB", shadow: "rgba(0,0,0,0.08)",
    description: { fa: "ساده و خوانا", en: "Simple & readable" }
  },
  {
    id: "warm",
    name: { fa: "گرم و صمیمی", en: "Warm & Friendly", ar: "دافئ وودود" },
    primary: "#C05640", secondary: "#F5E6CA", accent: "#A8D5BA",
    bg: "#FDF6EE", surface: "#FFFFFF", text: "#3D1C10", muted: "#8B6355",
    border: "#EDD5C0", shadow: "rgba(192,86,64,0.12)",
    description: { fa: "دوستانه و گرم", en: "Friendly & warm" }
  },
  {
    id: "luxury",
    name: { fa: "لوکس و خاص", en: "Luxury & Premium", ar: "فاخر ومميز" },
    primary: "#800020", secondary: "#C0C0C0", accent: "#000000",
    bg: "#FAF9F7", surface: "#FFFFFF", text: "#1A0008", muted: "#7A7A7A",
    border: "#D4C5C8", shadow: "rgba(128,0,32,0.15)",
    description: { fa: "لوکس و برند", en: "Premium & branded" }
  },
  {
    id: "pastel",
    name: { fa: "پاستلی و کودکانه", en: "Pastel & Playful", ar: "باستيل ومرح" },
    primary: "#AECBEB", secondary: "#FFD1DC", accent: "#B5EAD7",
    bg: "#FEFEFE", surface: "#FFFFFF", text: "#2C3E50", muted: "#8BA7B5",
    border: "#D8EAF5", shadow: "rgba(174,203,235,0.2)",
    description: { fa: "نرم و کودکانه", en: "Soft & playful" }
  },
];

// ============================================================================
// OCCASION THEMES
// ============================================================================

const OCCASION_THEMES = {
  shamsi: [
    { month: 1, day: 1, name: { fa: "نوروز", en: "Nowruz" },
      theme: { primary: "#2E8B57", accent: "#FFD700", bg: "#F0FFF0",
        surface: "#FFFFFF", text: "#1A3A2A", muted: "#5A7A5A",
        border: "#90EE90", shadow: "rgba(46,139,87,0.15)" },
      emoji: "🌸", range: 13 },
    { month: 6, day: 31, name: { fa: "آخر شهریور --- آغاز مهر", en: "Back to School" },
      theme: { primary: "#FF8C00", accent: "#4169E1", bg: "#FFF8F0",
        surface: "#FFFFFF", text: "#2C1810", muted: "#8B6914",
        border: "#FFD4A0", shadow: "rgba(255,140,0,0.15)" },
      emoji: "📚", range: 7 },
    { month: 11, day: 30, name: { fa: "یلدا", en: "Yalda Night" },
      theme: { primary: "#8B0000", accent: "#FFD700", bg: "#1A0000",
        surface: "#2D0000", text: "#FFE4E1", muted: "#CD853F",
        border: "#8B0000", shadow: "rgba(139,0,0,0.3)" },
      emoji: "🍉", range: 1 },
    { month: 10, day: 12, name: { fa: "دهه فجر", en: "Fajr Decade" },
      theme: { primary: "#006400", accent: "#FF0000", bg: "#F0FFF0",
        surface: "#FFFFFF", text: "#003300", muted: "#4A7A4A",
        border: "#90EE90", shadow: "rgba(0,100,0,0.15)" },
      emoji: "🌹", range: 10 },
  ],
  miladi: [
    { month: 12, day: 25, name: { fa: "کریسمس", en: "Christmas" },
      theme: { primary: "#CC0000", accent: "#228B22", bg: "#FFF5F5",
        surface: "#FFFFFF", text: "#1A0000", muted: "#8B4513",
        border: "#FFB6C1", shadow: "rgba(204,0,0,0.15)" },
      emoji: "🎄", range: 3 },
    { month: 1, day: 1, name: { fa: "سال نو میلادی", en: "New Year" },
      theme: { primary: "#191970", accent: "#FFD700", bg: "#000033",
        surface: "#0D0D4D", text: "#E0E0FF", muted: "#8080B0",
        border: "#2A2A8A", shadow: "rgba(25,25,112,0.4)" },
      emoji: "🎆", range: 2 },
    { month: 10, day: 31, name: { fa: "هالووین", en: "Halloween" },
      theme: { primary: "#FF6600", accent: "#7B00FF", bg: "#1A0D00",
        surface: "#2D1500", text: "#FF9933", muted: "#CC6600",
        border: "#FF6600", shadow: "rgba(255,102,0,0.3)" },
      emoji: "🎃", range: 1 },
  ],
  qamari: [
    { month: 9, day: 1, name: { fa: "ماه رمضان", en: "Ramadan", ar: "رمضان المبارك" },
      theme: { primary: "#4B0082", accent: "#FFD700", bg: "#0D0020",
        surface: "#1A0040", text: "#E8D5FF", muted: "#9B6DBF",
        border: "#6A0DAD", shadow: "rgba(75,0,130,0.4)" },
      emoji: "🌙", range: 30 },
    { month: 12, day: 10, name: { fa: "عید قربان", en: "Eid al-Adha", ar: "عيد الأضحى" },
      theme: { primary: "#006400", accent: "#FFD700", bg: "#F0FFF0",
        surface: "#FFFFFF", text: "#003300", muted: "#4A7A4A",
        border: "#90EE90", shadow: "rgba(0,100,0,0.15)" },
      emoji: "🕌", range: 4 },
    { month: 1, day: 1, name: { fa: "عید نوروز قمری", en: "Islamic New Year", ar: "رأس السنة الهجرية" },
      theme: { primary: "#2E4057", accent: "#F7B731", bg: "#1A2640",
        surface: "#243450", text: "#E8EFF8", muted: "#7B8FA6",
        border: "#3D5475", shadow: "rgba(46,64,87,0.4)" },
      emoji: "🌟", range: 2 },
  ]
};

// ============================================================================
// LANGUAGE SYSTEM (12 Languages)
// ============================================================================

const LANGUAGES = [
  { code:"fa", name:"فارسی", nativeName:"فارسی", flag:"🇮🇷", dir:"rtl" },
  { code:"ar", name:"Arabic", nativeName:"العربية", flag:"🇸🇦", dir:"rtl" },
  { code:"ur", name:"Urdu", nativeName:"اردو", flag:"🇵🇰", dir:"rtl" },
  { code:"en", name:"English", nativeName:"English", flag:"🇬🇧", dir:"ltr" },
  { code:"fr", name:"French", nativeName:"Français", flag:"🇫🇷", dir:"ltr" },
  { code:"de", name:"German", nativeName:"Deutsch", flag:"🇩🇪", dir:"ltr" },
  { code:"es", name:"Spanish", nativeName:"Español", flag:"🇪🇸", dir:"ltr" },
  { code:"zh", name:"Chinese", nativeName:"中文", flag:"🇨🇳", dir:"ltr" },
  { code:"ja", name:"Japanese", nativeName:"日本語", flag:"🇯🇵", dir:"ltr" },
  { code:"ko", name:"Korean", nativeName:"한국어", flag:"🇰🇷", dir:"ltr" },
  { code:"tr", name:"Turkish", nativeName:"Türkçe", flag:"🇹🇷", dir:"ltr" },
  { code:"pt", name:"Portuguese", nativeName:"Português", flag:"🇧🇷", dir:"ltr" },
];

const TRANSLATIONS = {
  fa: {
    welcome: "به هولدینگ برنا خوش آمدید",
    subtitle: "درگاه ورود به مجموعه‌های تخصصی",
    sports: "مجموعه ورزشی برنا",
    highschool: "دبیرستان اندیشه برنا",
    language: "دپارتمان زبان برنا",
    technical: "دبیرستان فنی و حرفه‌ای برنا",
    selectTheme: "انتخاب تم",
    selectLanguage: "انتخاب زبان",
    search: "جستجو...",
    download: "دانلود",
    close: "بستن",
    pinTheme: "ثابت کردن تم فعلی",
    unpinTheme: "حذف ثابت بودن تم",
    themePinned: "تم فعلی ثابت است",
    themeAuto: "تصادفی خودکار",
    occasionActive: "تم مناسبتی فعال است",
    dismiss: "بستن",
    bornaHolding: "هولدینگ برنا",
    entrance: "ورودی اصلی",
    pyramidNav: "هرم ورودی",
    clickToEnter: "برای ورود کلیک کنید"
  },
  en: {
    welcome: "Welcome to Borna Holding",
    subtitle: "Gateway to Specialized Complexes",
    sports: "Borna Sports Complex",
    highschool: "Borna Andisheh High School",
    language: "Borna Language Department",
    technical: "Borna Technical Vocational High School",
    selectTheme: "Select Theme",
    selectLanguage: "Select Language",
    search: "Search...",
    download: "Download",
    close: "Close",
    pinTheme: "Pin current theme",
    unpinTheme: "Unpin theme",
    themePinned: "Theme is pinned",
    themeAuto: "Auto random",
    occasionActive: "Occasion theme active",
    dismiss: "Dismiss",
    bornaHolding: "Borna Holding",
    entrance: "Main Entrance",
    pyramidNav: "Entrance Pyramid",
    clickToEnter: "Click to enter"
  },
  ar: {
    welcome: "مرحبًا بكم في مجموعة بورنا",
    subtitle: "بوابة المجمعات المتخصصة",
    sports: "مجمع بورنا الرياضي",
    highschool: "مدرسة بورنا انديشه الثانوية",
    language: "قسم اللغات في بورنا",
    technical: "مدرسة بورنا الفنية المهنية الثانوية",
    selectTheme: "اختر السمة",
    selectLanguage: "اختر اللغة",
    search: "بحث...",
    download: "تحميل",
    close: "إغلاق",
    pinTheme: "تثبيت السمة الحالية",
    unpinTheme: "إلغاء تثبيت السمة",
    themePinned: "السمة مثبتة",
    themeAuto: "عشوائي تلقائي",
    occasionActive: "السمة المناسبة نشطة",
    dismiss: "إغلاق",
    bornaHolding: "مجموعة بورنا",
    entrance: "المدخل الرئيسي",
    pyramidNav: "هرم الدخول",
    clickToEnter: "انقر للدخول"
  },
  ur: {
    welcome: "برنا ہولڈنگ میں خوش آمدید",
    subtitle: "خصوصی کمپلیکس کا گیٹ وے",
    sports: "برنا اسپورٹس کمپلیکس",
    highschool: "برنا اندیشہ ہائی اسکول",
    language: "برنا لینگویج ڈیپارٹمنٹ",
    technical: "برنا ٹیکنیکل ووکیشنل ہائی اسکول",
    selectTheme: "تھیم منتخب کریں",
    selectLanguage: "زبان منتخب کریں",
    search: "تلاش کریں...",
    download: "ڈاؤن لوڈ",
    close: "بند کریں",
    pinTheme: "موجودہ تھیم کو پن کریں",
    unpinTheme: "تھیم کو غیر پن کریں",
    themePinned: "تھیم پن ہے",
    themeAuto: "خودکار بے ترتیب",
    occasionActive: "موقع کی تھیم فعال ہے",
    dismiss: "ہٹائیں",
    bornaHolding: "برنا ہولڈنگ",
    entrance: "مرکزی دروازہ",
    pyramidNav: "داخلے کا ہرم",
    clickToEnter: "داخلے کے لیے کلک کریں"
  },
  fr: {
    welcome: "Bienvenue chez Borna Holding",
    subtitle: "Porte d'entrée des complexes spécialisés",
    sports: "Complexe Sportif Borna",
    highschool: "Lycée Borna Andisheh",
    language: "Département de Langues Borna",
    technical: "Lycée Technique et Professionnel Borna",
    selectTheme: "Choisir le thème",
    selectLanguage: "Choisir la langue",
    search: "Rechercher...",
    download: "Télécharger",
    close: "Fermer",
    pinTheme: "Épingler le thème actuel",
    unpinTheme: "Détacher le thème",
    themePinned: "Thème épinglé",
    themeAuto: "Aléatoire automatique",
    occasionActive: "Thème d'occasion actif",
    dismiss: "Ignorer",
    bornaHolding: "Borna Holding",
    entrance: "Entrée principale",
    pyramidNav: "Pyramide d'entrée",
    clickToEnter: "Cliquez pour entrer"
  },
  de: {
    welcome: "Willkommen bei Borna Holding",
    subtitle: "Zugang zu spezialisierten Komplexen",
    sports: "Borna Sportkomplex",
    highschool: "Borna Andisheh Gymnasium",
    language: "Borna Sprachabteilung",
    technical: "Borna Technische Berufsschule",
    selectTheme: "Thema auswählen",
    selectLanguage: "Sprache auswählen",
    search: "Suchen...",
    download: "Herunterladen",
    close: "Schließen",
    pinTheme: "Aktuelles Thema anheften",
    unpinTheme: "Thema lösen",
    themePinned: "Thema angeheftet",
    themeAuto: "Automatisch zufällig",
    occasionActive: "Anlassthema aktiv",
    dismiss: "Schließen",
    bornaHolding: "Borna Holding",
    entrance: "Haupteingang",
    pyramidNav: "Eingangspyramide",
    clickToEnter: "Klicken zum Betreten"
  },
  es: {
    welcome: "Bienvenido a Borna Holding",
    subtitle: "Puerta de entrada a complejos especializados",
    sports: "Complejo Deportivo Borna",
    highschool: "Escuela Secundaria Borna Andisheh",
    language: "Departamento de Idiomas Borna",
    technical: "Escuela Técnica Vocacional Borna",
    selectTheme: "Seleccionar tema",
    selectLanguage: "Seleccionar idioma",
    search: "Buscar...",
    download: "Descargar",
    close: "Cerrar",
    pinTheme: "Fijar tema actual",
    unpinTheme: "Desfijar tema",
    themePinned: "Tema fijado",
    themeAuto: "Aleatorio automático",
    occasionActive: "Tema de ocasión activo",
    dismiss: "Descartar",
    bornaHolding: "Borna Holding",
    entrance: "Entrada principal",
    pyramidNav: "Pirámide de entrada",
    clickToEnter: "Haga clic para entrar"
  },
  zh: {
    welcome: "欢迎来到博尔纳控股",
    subtitle: "专业综合体入口",
    sports: "博尔纳体育中心",
    highschool: "博尔纳思想高中",
    language: "博尔纳语言部门",
    technical: "博尔纳职业技术高中",
    selectTheme: "选择主题",
    selectLanguage: "选择语言",
    search: "搜索...",
    download: "下载",
    close: "关闭",
    pinTheme: "固定当前主题",
    unpinTheme: "取消固定主题",
    themePinned: "主题已固定",
    themeAuto: "自动随机",
    occasionActive: "场合主题已激活",
    dismiss: "关闭",
    bornaHolding: "博尔纳控股",
    entrance: "主入口",
    pyramidNav: "入口金字塔",
    clickToEnter: "点击进入"
  },
  ja: {
    welcome: "ボルナホールディングへようこそ",
    subtitle: "専門複合施設への入り口",
    sports: "ボルナスポーツ複合施設",
    highschool: "ボルナアンディシェ高校",
    language: "ボルナ言語学部",
    technical: "ボルナ職業技術高校",
    selectTheme: "テーマ選択",
    selectLanguage: "言語選択",
    search: "検索...",
    download: "ダウンロード",
    close: "閉じる",
    pinTheme: "現在のテーマを固定",
    unpinTheme: "テーマの固定を解除",
    themePinned: "テーマ固定中",
    themeAuto: "自動ランダム",
    occasionActive: "行事テーマ有効",
    dismiss: "閉じる",
    bornaHolding: "ボルナホールディング",
    entrance: "メインエントランス",
    pyramidNav: "エントランスピラミッド",
    clickToEnter: "クリックして入場"
  },
  ko: {
    welcome: "보르나 홀딩에 오신 것을 환영합니다",
    subtitle: "전문 복합시설로의 입구",
    sports: "보르나 스포츠 콤플렉스",
    highschool: "보르나 안디셰 고등학교",
    language: "보르나 언어학과",
    technical: "보르나 직업기술 고등학교",
    selectTheme: "테마 선택",
    selectLanguage: "언어 선택",
    search: "검색...",
    download: "다운로드",
    close: "닫기",
    pinTheme: "현재 테마 고정",
    unpinTheme: "테마 고정 해제",
    themePinned: "테마 고정됨",
    themeAuto: "자동 랜덤",
    occasionActive: "행사 테마 활성화",
    dismiss: "닫기",
    bornaHolding: "보르나 홀딩",
    entrance: "메인 출입구",
    pyramidNav: "입구 피라미드",
    clickToEnter: "클릭하여 입장"
  },
  tr: {
    welcome: "Borna Holding'e Hoş Geldiniz",
    subtitle: "Uzmanlaşmış Komplekslere Açılan Kapı",
    sports: "Borna Spor Kompleksi",
    highschool: "Borna Andişeh Lisesi",
    language: "Borna Dil Bölümü",
    technical: "Borna Teknik Meslek Lisesi",
    selectTheme: "Tema Seç",
    selectLanguage: "Dil Seç",
    search: "Ara...",
    download: "İndir",
    close: "Kapat",
    pinTheme: "Mevcut temayı sabitle",
    unpinTheme: "Temayı çöz",
    themePinned: "Tema sabitlendi",
    themeAuto: "Otomatik rastgele",
    occasionActive: "Özel gün teması aktif",
    dismiss: "Kapat",
    bornaHolding: "Borna Holding",
    entrance: "Ana Giriş",
    pyramidNav: "Giriş Piramidi",
    clickToEnter: "Girmek için tıklayın"
  },
  pt: {
    welcome: "Bem-vindo à Borna Holding",
    subtitle: "Porta de entrada para complexos especializados",
    sports: "Complexo Esportivo Borna",
    highschool: "Escola Secundária Borna Andisheh",
    language: "Departamento de Idiomas Borna",
    technical: "Escola Técnica Profissional Borna",
    selectTheme: "Selecionar tema",
    selectLanguage: "Selecionar idioma",
    search: "Pesquisar...",
    download: "Baixar",
    close: "Fechar",
    pinTheme: "Fixar tema atual",
    unpinTheme: "Desafixar tema",
    themePinned: "Tema fixado",
    themeAuto: "Aleatório automático",
    occasionActive: "Tema de ocasião ativo",
    dismiss: "Dispensar",
    bornaHolding: "Borna Holding",
    entrance: "Entrada principal",
    pyramidNav: "Pirâmide de entrada",
    clickToEnter: "Clique para entrar"
  }
};

// ============================================================================
// ANIMATION CSS
// ============================================================================

const animationsCSS = `
  /* ── NAG ANIMATIONS ── */
  @keyframes nagBounce {
    0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
    100% { transform: translate(0px, 0px) rotate(0deg) scale(1.25); opacity: 1; }
  }
  
  @keyframes nagFadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes nagPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  
  @keyframes nagSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes nagThemeIn {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes rotatePyramid {
    from { transform: rotateY(0deg) rotateX(10deg); }
    to { transform: rotateY(360deg) rotateX(10deg); }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes glow {
    0% { filter: drop-shadow(0 0 5px rgba(255,215,0,0.3)); }
    50% { filter: drop-shadow(0 0 20px rgba(255,215,0,0.6)); }
    100% { filter: drop-shadow(0 0 5px rgba(255,215,0,0.3)); }
  }
  
  .nag-bounce { animation: nagBounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s infinite normal none; }
  .nag-fade-up { animation: nagFadeUp 0.35s ease both; }
  .nag-pulse { animation: nagPulse 2s ease infinite; }
  .nag-spin { animation: nagSpin 0.7s linear infinite; }
  .nag-theme-in { animation: nagThemeIn 0.4s ease both; }
  .rotate-pyramid { animation: rotatePyramid 20s linear infinite; }
  .float { animation: float 3s ease-in-out infinite; }
  .glow { animation: glow 2s ease-in-out infinite; }
  
  /* Pyramid specific styles */
  .pyramid-container {
    perspective: 1000px;
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .pyramid {
    width: 300px;
    height: 300px;
    position: relative;
    transform-style: preserve-3d;
    animation: rotatePyramid 20s linear infinite;
  }
  
  .pyramid-face {
    position: absolute;
    width: 0;
    height: 0;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-bottom: 173.2px solid;
    transform-origin: 50% 0;
    opacity: 0.9;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .pyramid-face:hover {
    opacity: 1;
    filter: brightness(1.2);
    transform: scale(1.05) translateZ(20px);
  }
  
  .pyramid-face.front {
    transform: rotateY(0deg) translateZ(86.6px) rotateX(30deg);
    border-bottom-color: var(--face-color);
  }
  
  .pyramid-face.right {
    transform: rotateY(90deg) translateZ(86.6px) rotateX(30deg);
    border-bottom-color: var(--face-color);
  }
  
  .pyramid-face.back {
    transform: rotateY(180deg) translateZ(86.6px) rotateX(30deg);
    border-bottom-color: var(--face-color);
  }
  
  .pyramid-face.left {
    transform: rotateY(-90deg) translateZ(86.6px) rotateX(30deg);
    border-bottom-color: var(--face-color);
  }
  
  .pyramid-base {
    position: absolute;
    width: 200px;
    height: 200px;
    background: rgba(255,255,255,0.1);
    transform: rotateX(90deg) translateZ(-86.6px);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255,255,255,0.2);
  }
  
  .face-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    background: rgba(0,0,0,0.6);
    padding: 4px 8px;
    border-radius: 20px;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.2);
    pointer-events: none;
  }
  
  .pyramid-face:hover .face-label {
    background: rgba(0,0,0,0.8);
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  @media (max-width: 768px) {
    .pyramid {
      width: 200px;
      height: 200px;
    }
    .pyramid-face {
      border-left: 70px solid transparent;
      border-right: 70px solid transparent;
      border-bottom: 121.24px solid;
    }
    .pyramid-base {
      width: 140px;
      height: 140px;
    }
    .face-label {
      font-size: 9px;
      padding: 2px 4px;
    }
  }
`;

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

const useOccasionTheme = (lang) => {
  const today = new Date();
  
  const checkOccasion = () => {
    const m = today.getMonth() + 1;
    const d = today.getDate();

    if (lang === "en") {
      for (const occ of OCCASION_THEMES.miladi) {
        const startDate = new Date(today.getFullYear(), occ.month - 1, occ.day);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + occ.range);
        if (today >= startDate && today < endDate) return occ;
      }
    }

    if (lang === "fa") {
      if (m === 3 && d >= 20 && d <= 31) return OCCASION_THEMES.shamsi[0];
      if (m === 9 && d >= 22 && d <= 30) return OCCASION_THEMES.shamsi[1];
      if (m === 12 && d === 21) return OCCASION_THEMES.shamsi[2];
    }

    return null;
  };

  return checkOccasion();
};

// ============================================================================
// COMPONENTS
// ============================================================================

const ThemePanel = ({ themes, current, isPinned, onSelect, onPin, onClose, lang }) => (
  <div style={{
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
    zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center"
  }} onClick={e => e.target === e.currentTarget && onClose()}>
    <div style={{
      background: "#fff", borderRadius: 16, padding: 24, maxWidth: 560, width: "90%",
      boxShadow: "0 24px 64px rgba(0,0,0,0.2)", maxHeight: "85vh", overflowY: "auto"
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>🎨 {lang === 'fa' ? 'انتخاب تم' : 'Select Theme'}</div>
        <button onClick={onClose} style={{ border: "none", background: "none", fontSize: 18, cursor: "pointer" }}>✕</button>
      </div>

      <div style={{
        padding: "8px 12px", borderRadius: 8, marginBottom: 16,
        background: isPinned ? "#EEF2FF" : "#F8FAFC",
        border: `1px solid ${isPinned ? "#C7D2FE" : "#E2E8F0"}`,
        display: "flex", alignItems: "center", gap: 10, cursor: "pointer"
      }} onClick={onPin}>
        <span style={{ fontSize: 18 }}>{isPinned ? "📌" : "📍"}</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: isPinned ? "#4F46E5" : "#374151" }}>
            {isPinned ? (lang === 'fa' ? 'تم فعلی ثابت است --- کلیک برای حذف فیکس' : 'Theme is pinned --- click to unpin') : 
                        (lang === 'fa' ? 'کلیک کنید تا تم فعلی ثابت شود' : 'Click to pin current theme')}
          </div>
          <div style={{ fontSize: 10, color: "#6B7280" }}>
            {isPinned ? (lang === 'fa' ? 'تم ثابت است' : 'Theme is pinned') : 
                        (lang === 'fa' ? 'تصادفی خودکار' : 'Auto random')}
          </div>
        </div>
        <div style={{
          marginRight: "auto", padding: "2px 8px", borderRadius: 20, fontSize: 10,
          background: isPinned ? "#C7D2FE" : "#E2E8F0",
          color: isPinned ? "#4338CA" : "#6B7280", fontWeight: 600
        }}>
          {isPinned ? "📌 PINNED" : "AUTO RANDOM"}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {themes.map(theme => (
          <div key={theme.id} onClick={() => onSelect(theme)} style={{
            border: `2px solid ${current.id === theme.id ? theme.primary : "#E2E8F0"}`,
            borderRadius: 12, padding: 12, cursor: "pointer", textAlign: "center",
            background: current.id === theme.id ? theme.primary + "10" : "#FAFAFA",
            transition: "all 0.2s", position: "relative"
          }}>
            {current.id === theme.id && (
              <div style={{
                position: "absolute", top: 6, right: 6, width: 18, height: 18,
                borderRadius: "50%", background: theme.primary,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, color: "#fff"
              }}>✓</div>
            )}
            <div style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 8 }}>
              {[theme.primary, theme.accent, theme.secondary].map((color, i) => (
                <div key={i} style={{
                  width: 16, height: 16, borderRadius: 4,
                  background: color, border: "1px solid rgba(0,0,0,0.1)"
                }}/>
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: theme.primary }}>
              {theme.name.fa}
            </div>
            <div style={{ fontSize: 9, color: "#9CA3AF", marginTop: 2 }}>
              {theme.name.en}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LanguageModal = ({ current, onSelect, onClose, onDownload, lang }) => {
  const [search, setSearch] = useState("");
  const filtered = LANGUAGES.filter(l =>
    l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(4px)", zIndex: 10000,
      display: "flex", alignItems: "center", justifyContent: "center"
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="nag-theme-in" style={{
        background: "#fff", borderRadius: 16, width: "90%", maxWidth: 540,
        maxHeight: "85vh", overflowY: "auto",
        boxShadow: "0 24px 64px rgba(0,0,0,0.25)"
      }}>
        <div style={{ height: 4, background: "linear-gradient(90deg,#6366F1,#8B5CF6,#EC4899)", borderRadius: "16px 16px 0 0" }}/>
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>🌐 {lang === 'fa' ? 'انتخاب زبان' : 'Select Language'}</div>
            <button onClick={onClose} style={{ border: "none", background: "none", fontSize: 18, cursor: "pointer", color: "#6B7280" }}>✕</button>
          </div>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder={lang === 'fa' ? "جستجو..." : "Search..."}
            style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #E2E8F0", marginBottom: 14, fontSize: 12, outline: "none", boxSizing: "border-box" }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
            {filtered.map(l => (
              <div key={l.code} onClick={() => onSelect(l.code)}
                style={{
                  padding: "10px 8px", borderRadius: 10, textAlign: "center",
                  border: `2px solid ${current === l.code ? "#6366F1" : "#E2E8F0"}`,
                  background: current === l.code ? "#EEF2FF" : "#FAFAFA",
                  cursor: "pointer", transition: "all 0.15s", position: "relative"
                }}>
                {current === l.code && (
                  <div style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, borderRadius: "50%", background: "#6366F1", color: "#fff", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
                )}
                <div style={{ fontSize: 22, marginBottom: 4 }}>{l.flag}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: current === l.code ? "#4F46E5" : "#111827" }}>{l.nativeName}</div>
                <div style={{ fontSize: 9, color: "#9CA3AF", marginTop: 2 }}>{l.code.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button onClick={() => onDownload(current)} style={{
              padding: "7px 14px", borderRadius: 8, border: "1px solid #E2E8F0",
              background: "#fff", color: "#374151", cursor: "pointer", fontSize: 11
            }}>⬇ {lang === 'fa' ? 'دانلود' : 'Download'} JSON</button>
            <button onClick={onClose} style={{
              padding: "7px 14px", borderRadius: 8, border: "none",
              background: "#6366F1", color: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 600
            }}>✓ {lang === 'fa' ? 'بستن' : 'Close'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PyramidFace = ({ position, color, label, onClick, style }) => {
  return (
    <div 
      className={`pyramid-face ${position}`} 
      style={{ 
        '--face-color': color,
        borderBottomColor: color,
        ...style 
      } as any}
      onClick={onClick}
    >
      <div className="face-label">{label}</div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const BornaHoldingEntrance = () => {
  // Theme state
  const getInitialTheme = () => {
    const pinned = localStorage.getItem("nag_theme_pinned");
    const saved = localStorage.getItem("nag_theme");
    if (pinned && saved) return THEMES.find(t => t.id === saved) || THEMES[0];
    const randomIndex = Math.floor(Math.random() * THEMES.length);
    return THEMES[randomIndex];
  };

  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);
  const [isPinned, setIsPinned] = useState(!!localStorage.getItem("nag_theme_pinned"));
  const [showThemePanel, setShowThemePanel] = useState(false);
  const th = currentTheme;

  const applyTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("nag_theme", theme.id);
    if (isPinned) localStorage.setItem("nag_theme_pinned", "true");
  };

  const togglePin = () => {
    const newPinned = !isPinned;
    setIsPinned(newPinned);
    if (newPinned) {
      localStorage.setItem("nag_theme_pinned", "true");
      localStorage.setItem("nag_theme", currentTheme.id);
    } else {
      localStorage.removeItem("nag_theme_pinned");
    }
  };

  // Language state
  const [lang, setLang] = useState(() => localStorage.getItem("nag_lang") || "fa");
  const [showLangModal, setShowLangModal] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS["fa"];
  const dir = LANGUAGES.find(l => l.code === lang)?.dir || "rtl";

  const changeLang = (code) => {
    setLang(code);
    localStorage.setItem("nag_lang", code);
    const langInfo = LANGUAGES.find(l => l.code === code);
    document.documentElement.dir = langInfo?.dir || "rtl";
    setShowLangModal(false);
  };

  const downloadLangFile = (langCode) => {
    const langInfo = LANGUAGES.find(l => l.code === langCode);
    const data = {
      language: langInfo,
      module: "NAG Smart School - Borna Holding",
      generatedAt: new Date().toISOString(),
      version: "1.0.0",
      rtl: langInfo?.dir === "rtl",
      translations: TRANSLATIONS[langCode] || {}
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `NAG_lang_${langCode}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  // Occasion theme
  const currentOccasion = useOccasionTheme(lang);
  const [occasionDismissed, setOccasionDismissed] = useState(false);
  const activeTheme = (currentOccasion && !occasionDismissed && !isPinned)
    ? { ...currentTheme, ...currentOccasion.theme }
    : currentTheme;

  // Set document direction
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  // Pyramid faces data
  const pyramidFaces = [
    { position: 'front', label: t.sports, color: activeTheme.primary },
    { position: 'right', label: t.highschool, color: activeTheme.accent },
    { position: 'back', label: t.language, color: activeTheme.secondary },
    { position: 'left', label: t.technical, color: activeTheme.muted }
  ];

  const handleFaceClick = (section) => {
    console.log(`Navigating to: ${section}`);
    // In a real app, this would navigate to the specific section
    alert(`${t.clickToEnter}: ${section}`);
  };

  return (
    <div style={{ 
      direction: dir, 
      fontFamily: dir === "rtl" ? "'Vazirmatn', 'Tahoma', sans-serif" : "'Inter', 'Arial', sans-serif",
      background: activeTheme.bg,
      color: activeTheme.text,
      minHeight: "100vh",
      transition: "all 0.3s ease"
    }}>
      <style>{animationsCSS}</style>
      
      {/* Top Bar */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "12px 24px",
        background: activeTheme.surface,
        borderBottom: `1px solid ${activeTheme.border}`,
        boxShadow: `0 2px 8px ${activeTheme.shadow}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100,
        backdropFilter: "blur(8px)",
        backgroundColor: `${activeTheme.surface}CC`
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 20 }}>🏛️</div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>
            {t.bornaHolding}
          </div>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Theme Toggle Button */}
          <button onClick={() => setShowThemePanel(true)} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 20, border: `1px solid ${activeTheme.border}`,
            background: activeTheme.surface, cursor: "pointer", fontSize: 11,
            color: activeTheme.text
          }}>
            <div style={{ display: "flex", gap: 2 }}>
              {[activeTheme.primary, activeTheme.accent].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c }}/>
              ))}
            </div>
            <span>{isPinned ? "📌" : "🎨"}</span>
          </button>

          {/* Language Toggle Button */}
          <button onClick={() => setShowLangModal(true)} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 20,
            border: "1px solid #E2E8F0", background: "#fff",
            cursor: "pointer", fontSize: 11
          }}>
            <span>{LANGUAGES.find(l => l.code === lang)?.flag}</span>
            <span>{LANGUAGES.find(l => l.code === lang)?.nativeName}</span>
            <span style={{ color: "#9CA3AF" }}>▾</span>
          </button>
        </div>
      </div>

      {/* Occasion Banner */}
      {currentOccasion && !occasionDismissed && (
        <div style={{
          position: "fixed",
          top: 60,
          left: 0,
          right: 0,
          background: `linear-gradient(135deg, ${currentOccasion.theme.primary}, ${currentOccasion.theme.accent})`,
          color: "#fff", padding: "8px 16px", fontSize: 12,
          display: "flex", alignItems: "center", gap: 10, justifyContent: "center",
          zIndex: 99
        }}>
          <span style={{ fontSize: 18 }}>{currentOccasion.emoji}</span>
          <strong>{currentOccasion.name[lang] || currentOccasion.name.fa}</strong>
          <span style={{ opacity: 0.8 }}>--- {t.occasionActive}</span>
          <button onClick={() => setOccasionDismissed(true)} style={{
            marginRight: "auto", background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.4)", borderRadius: 6,
            color: "#fff", padding: "2px 8px", cursor: "pointer", fontSize: 11
          }}>✕ {t.dismiss}</button>
        </div>
      )}

      {/* Main Content */}
      <div style={{
        paddingTop: currentOccasion && !occasionDismissed ? "120px" : "80px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "padding-top 0.3s ease"
      }}>
        {/* Welcome Text */}
        <div className="nag-fade-up" style={{ 
          textAlign: "center", 
          marginBottom: 40,
          padding: "0 20px"
        }}>
          <h1 style={{ 
            fontSize: "clamp(32px, 8vw, 64px)", 
            margin: 0,
            color: activeTheme.primary,
            textShadow: `2px 2px 4px ${activeTheme.shadow}`,
            fontWeight: 800,
            letterSpacing: dir === "rtl" ? "normal" : "1px"
          }}>
            {t.welcome}
          </h1>
          <p style={{ 
            fontSize: "clamp(14px, 4vw, 18px)", 
            color: activeTheme.muted,
            marginTop: 8
          }}>
            {t.subtitle}
          </p>
        </div>

        {/* Rotating Pyramid */}
        <div className="pyramid-container">
          <div className="pyramid rotate-pyramid" style={{
            transformStyle: "preserve-3d"
          }}>
            {pyramidFaces.map((face, index) => (
              <PyramidFace
                key={index}
                position={face.position}
                color={face.color}
                label={face.label}
                onClick={() => handleFaceClick(face.label)}
              />
            ))}
            <div className="pyramid-base" style={{
              background: `rgba(255,255,255,0.1)`,
              backdropFilter: "blur(5px)",
              border: `1px solid ${activeTheme.border}`
            }}/>
          </div>
        </div>

        {/* Decorative Elements */}
        <div style={{
          position: "absolute",
          bottom: 30,
          left: 0,
          right: 0,
          textAlign: "center",
          color: activeTheme.muted,
          fontSize: 11,
          opacity: 0.7
        }}>
          <span className="nag-pulse">✦ {t.entrance} ✦</span>
        </div>

        {/* Entrance text */}
        <div className="float" style={{
          marginTop: 40,
          padding: "12px 24px",
          background: activeTheme.surface,
          borderRadius: 40,
          boxShadow: `0 4px 20px ${activeTheme.shadow}`,
          border: `1px solid ${activeTheme.border}`,
          color: activeTheme.primary,
          fontSize: 14,
          fontWeight: 600
        }}>
          {t.pyramidNav}
        </div>
      </div>

      {/* Modals */}
      {showThemePanel && (
        <ThemePanel 
          themes={THEMES} 
          current={currentTheme} 
          isPinned={isPinned}
          onSelect={applyTheme} 
          onPin={togglePin}
          onClose={() => setShowThemePanel(false)} 
          lang={lang}
        />
      )}

      {showLangModal && (
        <LanguageModal 
          current={lang} 
          onSelect={changeLang}
          onClose={() => setShowLangModal(false)}
          onDownload={downloadLangFile}
          lang={lang}
        />
      )}
    </div>
  );
};

export default BornaHoldingEntrance;