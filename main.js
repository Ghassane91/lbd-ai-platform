// ============================================
// LBD AI — Geo-Tech Intelligence Platform
// ============================================

const CONFIG = {
    n8nWebhookUrl: 'https://fancy-singers-type.loca.lt/webhook/chat-web',
    newsRefreshInterval: 300000,
    defaultLang: 'fr'
};

// Session ID for n8n workflow tracking
let SESSION_ID = localStorage.getItem('lbd_session_id');
if (!SESSION_ID) {
    SESSION_ID = 'web_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('lbd_session_id', SESSION_ID);
}

const TRANSLATIONS = {
    fr: {
        doc_title: "Khorba3 | Intelligence Géopolitique & Cybersécurité",
        doc_desc: "LBD AI décrypte les enjeux géopolitiques de la cybersécurité mondiale.",
        nav_vision: "Vision", nav_chatbot: "Chatbot", nav_actualites: "Actualités",
        nav_contact: "Contact", nav_try_bot: "Essayer le Bot",
        hero_badge: "🔒 Plateforme N°1 d'Intelligence Cyber",
        hero_title: "Protégez votre entreprise des <span class=\"gradient-text\">cybermenaces mondiales</span>",
        hero_subtitle: "Rejoignez +500 entreprises qui utilisent notre IA pour anticiper les attaques, décrypter la géopolitique cyber et garder un temps d'avance.",
        hero_btn_start: "Essai Gratuit — Sans Engagement", hero_btn_expert: "Demander une Démo",
        hero_stat_threats: "Menaces bloquées / mois", hero_stat_countries: "Taux de détection", hero_stat_monitoring: "Temps de réponse IA",
        vision_badge: "Notre Vision",
        vision_title: "L'intelligence au service de la <span class=\"gradient-text\">cyberdéfense</span>",
        vision_subtitle: "Trois piliers pour anticiper les menaces numériques de demain.",
        feat1_title: "Analyse Globale", feat1_desc: "Vision 360° des conflits numériques entre puissances mondiales.",
        feat2_title: "Réponse Instantanée", feat2_desc: "Notre IA traite des milliers de sources OSINT en moins de 10 secondes.",
        feat3_title: "Anticipation Stratégique", feat3_desc: "Prévoyez les tendances cyber-géopolitiques de demain.",
        chat_badge: "Chatbot GeoTech",
        chat_title: "Votre analyste cyber <span class=\"gradient-text\">disponible 24/7</span>",
        chat_p: "Posez n'importe quelle question sur les cyber-menaces actuelles.",
        chat_check1: "Analyse multi-sources OSINT", chat_check2: "Contexte diplomatique & militaire",
        chat_check3: "Indicateurs de compromission (IoC)", chat_check4: "Recommandations stratégiques",
        news_badge: "Veille Stratégique",
        news_title: "Actualités Cyber <span class=\"gradient-text\">Mondiales</span>",
        filter_all: "Tout", filter_cyber: "Cyber", filter_geo: "Géopolitique",
        alert_ticker_loading: "Chargement des alertes en temps réel...", news_last_update: "Dernière mise à jour",
        contact_badge: "Contact",
        contact_title: "Parlez à un <span class=\"gradient-text\">Expert</span>",
        contact_p: "Remplissez le formulaire et un consultant spécialisé vous recontactera sous 24 heures.",
        hlight1_title: "Réponse en 24h", hlight1_desc: "Un expert vous rappelle",
        hlight2_title: "Confidentiel", hlight2_desc: "Données sécurisées",
        hlight3_title: "Consultation sur mesure", hlight3_desc: "Adapté à votre secteur",
        form_name: "Nom complet", form_email: "Email professionnel", form_phone: "Téléphone",
        form_company: "Entreprise / Organisation", form_subject: "Sujet", form_subject_opt: "Sélectionnez un sujet",
        form_msg: "Message", form_btn: "Être contacté par un expert",
        form_note: "🔒 Vos données sont traitées confidentiellement.",
        footer_desc: "L'intelligence cyber-géopolitique de demain, accessible aujourd'hui.",
        footer_col1: "Produit", footer_col2: "Société", footer_col3: "Légal",
        footer_about: "À propos", footer_careers: "Carrières", footer_press: "Presse",
        footer_legal: "Mentions légales", footer_privacy: "Politique de confidentialité", footer_terms: "CGU",
        footer_copy: "© 2026 Khorba3. Tous droits réservés.",
        bot_placeholder: "Posez votre question à Khorba3..."
    },
    en: {
        doc_title: "Khorba3 | Geopolitical Intelligence & Cybersecurity",
        nav_vision: "Vision", nav_chatbot: "Chatbot", nav_actualites: "News",
        nav_contact: "Contact", nav_try_bot: "Try the Bot",
        hero_badge: "🔒 #1 Cyber Intelligence Platform",
        hero_title: "Protect your business from <span class=\"gradient-text\">global cyber threats</span>",
        hero_subtitle: "Join 500+ companies using our AI to anticipate attacks and stay one step ahead.",
        hero_btn_start: "Free Trial — No Commitment", hero_btn_expert: "Request a Demo",
        hero_stat_threats: "Threats blocked / month", hero_stat_countries: "Detection rate", hero_stat_monitoring: "AI response time",
        vision_badge: "Our Vision",
        vision_title: "Intelligence at the service of <span class=\"gradient-text\">cyber defense</span>",
        vision_subtitle: "Three pillars to anticipate tomorrow's digital threats.",
        feat1_title: "Global Analysis", feat1_desc: "360° vision of digital conflicts between world powers.",
        feat2_title: "Instant Response", feat2_desc: "Our AI processes OSINT sources in under 10 seconds.",
        feat3_title: "Strategic Anticipation", feat3_desc: "Predict tomorrow's cyber-geopolitical trends.",
        chat_badge: "GeoTech Chatbot",
        chat_title: "Your cyber analyst <span class=\"gradient-text\">available 24/7</span>",
        chat_p: "Ask any question about current cyber threats.",
        chat_check1: "Multi-source OSINT analysis", chat_check2: "Diplomatic & military context",
        chat_check3: "Indicators of Compromise (IoC)", chat_check4: "Strategic recommendations",
        news_badge: "Strategic Watch",
        news_title: "Global <span class=\"gradient-text\">Cyber News</span>",
        filter_all: "All", filter_cyber: "Cyber", filter_geo: "Geopolitics",
        alert_ticker_loading: "Loading real-time alerts...", news_last_update: "Last updated",
        contact_badge: "Contact",
        contact_title: "Talk to an <span class=\"gradient-text\">Expert</span>",
        contact_p: "Fill out the form and a specialist will contact you within 24 hours.",
        hlight1_title: "24h Response", hlight1_desc: "An expert calls you back",
        hlight2_title: "Confidential", hlight2_desc: "Secure data",
        hlight3_title: "Custom consultation", hlight3_desc: "Tailored to your sector",
        form_name: "Full name", form_email: "Professional email", form_phone: "Phone",
        form_company: "Company / Organization", form_subject: "Subject", form_subject_opt: "Select a subject",
        form_msg: "Message", form_btn: "Contact an expert",
        form_note: "🔒 Your data is processed confidentially.",
        footer_desc: "Cyber-geopolitical intelligence of tomorrow, accessible today.",
        footer_col1: "Product", footer_col2: "Company", footer_col3: "Legal",
        footer_about: "About", footer_careers: "Careers", footer_press: "Press",
        footer_legal: "Legal notice", footer_privacy: "Privacy policy", footer_terms: "Terms of use",
        footer_copy: "© 2026 Khorba3. All rights reserved.",
        bot_placeholder: "Ask Khorba3 your question..."
    },
    es: {
        doc_title: "LBD AI | Inteligencia Geopolítica & Ciberseguridad",
        nav_vision: "Visión", nav_chatbot: "Chatbot", nav_actualites: "Noticias",
        nav_contact: "Contacto", nav_try_bot: "Probar el Bot",
        hero_badge: "🔒 Plataforma N°1 de Inteligencia Cyber",
        hero_title: "Proteja su empresa de las <span class=\"gradient-text\">ciberamenazas globales</span>",
        hero_subtitle: "Únase a +500 empresas que usan nuestra IA para anticipar ataques y mantenerse un paso adelante.",
        hero_btn_start: "Prueba Gratuita", hero_btn_expert: "Solicitar Demo",
        hero_stat_threats: "Amenazas bloqueadas / mes", hero_stat_countries: "Tasa de detección", hero_stat_monitoring: "Tiempo de respuesta IA",
        vision_badge: "Nuestra Visión",
        vision_title: "Inteligencia al servicio de la <span class=\"gradient-text\">ciberdefensa</span>",
        vision_subtitle: "Tres pilares para anticipar las amenazas digitales del mañana.",
        feat1_title: "Análisis Global", feat1_desc: "Visión 360° de los conflictos digitales entre potencias mundiales.",
        feat2_title: "Respuesta Instantánea", feat2_desc: "Nuestra IA procesa fuentes OSINT en menos de 10 segundos.",
        feat3_title: "Anticipación Estratégica", feat3_desc: "Prediga las tendencias ciber-geopolíticas del mañana.",
        chat_badge: "Chatbot GeoTech",
        chat_title: "Su analista cyber <span class=\"gradient-text\">disponible 24/7</span>",
        chat_p: "Haga cualquier pregunta sobre las ciberamenazas actuales.",
        chat_check1: "Análisis multi-fuente OSINT", chat_check2: "Contexto diplomático y militar",
        chat_check3: "Indicadores de compromiso (IoC)", chat_check4: "Recomendaciones estratégicas",
        news_badge: "Vigilancia Estratégica",
        news_title: "Noticias Cyber <span class=\"gradient-text\">Mundiales</span>",
        filter_all: "Todo", filter_cyber: "Cyber", filter_geo: "Geopolítica",
        alert_ticker_loading: "Cargando alertas en tiempo real...", news_last_update: "Última actualización",
        contact_badge: "Contacto",
        contact_title: "Hable con un <span class=\"gradient-text\">Experto</span>",
        contact_p: "Rellene el formulario y un consultor especializado le responderá en 24 horas.",
        hlight1_title: "Respuesta en 24h", hlight1_desc: "Un experto le llama",
        hlight2_title: "Confidencial", hlight2_desc: "Datos seguros",
        hlight3_title: "Consulta a medida", hlight3_desc: "Adaptado a su sector",
        form_name: "Nombre completo", form_email: "Email profesional", form_phone: "Teléfono",
        form_company: "Empresa / Organización", form_subject: "Asunto", form_subject_opt: "Seleccione un asunto",
        form_msg: "Mensaje", form_btn: "Ser contactado por un experto",
        form_note: "🔒 Sus datos son tratados confidencialmente.",
        footer_desc: "La inteligencia ciber-geopolítica del mañana, accesible hoy.",
        footer_col1: "Producto", footer_col2: "Empresa", footer_col3: "Legal",
        footer_about: "Sobre nosotros", footer_careers: "Carreras", footer_press: "Prensa",
        footer_legal: "Aviso legal", footer_privacy: "Política de privacidad", footer_terms: "Términos de uso",
        footer_copy: "© 2026 LBD AI. Todos los derechos reservados.",
        bot_placeholder: "Haga su pregunta geopolítica..."
    },
    ru: {
        doc_title: "LBD AI | Геополитическая разведка и кибербезопасность",
        nav_vision: "Видение", nav_chatbot: "Чат-бот", nav_actualites: "Новости",
        nav_contact: "Контакт", nav_try_bot: "Попробовать",
        hero_badge: "🔒 Платформа №1 Кибер-Разведки",
        hero_title: "Защитите свой бизнес от <span class=\"gradient-text\">глобальных киберугроз</span>",
        hero_subtitle: "Присоединяйтесь к 500+ компаниям, использующим наш ИИ для предотвращения атак.",
        hero_btn_start: "Бесплатная Пробная Версия", hero_btn_expert: "Запросить Демо",
        hero_stat_threats: "Угроз заблокировано / мес.", hero_stat_countries: "Уровень обнаружения", hero_stat_monitoring: "Время отклика ИИ",
        vision_badge: "Наше Видение",
        vision_title: "Интеллект на службе <span class=\"gradient-text\">кибербезопасности</span>",
        vision_subtitle: "Три столпа для прогнозирования цифровых угроз.",
        feat1_title: "Глобальный Анализ", feat1_desc: "360° видение цифровых конфликтов между мировыми державами.",
        feat2_title: "Мгновенный Ответ", feat2_desc: "ИИ обрабатывает источники OSINT менее чем за 10 секунд.",
        feat3_title: "Стратегическое Опережение", feat3_desc: "Предсказывайте кибер-геополитические тенденции.",
        chat_badge: "Чат-бот GeoTech",
        chat_title: "Ваш кибераналитик <span class=\"gradient-text\">доступен 24/7</span>",
        chat_p: "Задайте любой вопрос о текущих киберугрозах.",
        chat_check1: "OSINT-анализ", chat_check2: "Дипломатический контекст",
        chat_check3: "Индикаторы компрометации (IoC)", chat_check4: "Стратегические рекомендации",
        news_badge: "Стратегический Мониторинг",
        news_title: "Глобальные <span class=\"gradient-text\">Киберновости</span>",
        filter_all: "Все", filter_cyber: "Кибер", filter_geo: "Геополитика",
        alert_ticker_loading: "Загрузка оповещений...", news_last_update: "Последнее обновление",
        contact_badge: "Контакт",
        contact_title: "Поговорите с <span class=\"gradient-text\">экспертом</span>",
        contact_p: "Заполните форму, и консультант свяжется с вами в течение 24 часов.",
        hlight1_title: "Ответ в течение 24ч", hlight1_desc: "Эксперт перезвонит вам",
        hlight2_title: "Конфиденциально", hlight2_desc: "Безопасные данные",
        hlight3_title: "Индивидуальная консультация", hlight3_desc: "Адаптировано под ваш сектор",
        form_name: "Полное имя", form_email: "Рабочая почта", form_phone: "Телефон",
        form_company: "Компания / Организация", form_subject: "Тема", form_subject_opt: "Выберите тему",
        form_msg: "Сообщение", form_btn: "Связаться с экспертом",
        form_note: "🔒 Ваши данные обрабатываются конфиденциально.",
        footer_desc: "Кибер-геополитическая разведка будущего — уже сегодня.",
        footer_col1: "Продукт", footer_col2: "Компания", footer_col3: "Юридическая информация",
        footer_about: "О нас", footer_careers: "Карьера", footer_press: "Пресса",
        footer_legal: "Правовая информация", footer_privacy: "Политика конфиденциальности", footer_terms: "Условия",
        footer_copy: "© 2026 LBD AI. Все права защищены.",
        bot_placeholder: "Задайте ваш геополитический вопрос..."
    }
};

// ── DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initRevealAnimations();
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initChatbot();
    loadNews();
    initContactForm();
    initLanguageSwitcher();
});

// ============================================
// Language Switcher
// ============================================
function initLanguageSwitcher() {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const langOpts = document.querySelectorAll('.lang-opt');
    const currentLangText = document.getElementById('current-lang-text');
    if (!langBtn) return;

    const flagMap = { fr: '🇫🇷 FR', en: '🇬🇧 EN', es: '🇪🇸 ES', ru: '🇷🇺 RU' };

    langBtn.addEventListener('click', (e) => { e.stopPropagation(); langDropdown.classList.toggle('open'); });
    document.addEventListener('click', () => langDropdown?.classList.remove('open'));

    langOpts.forEach(opt => {
        opt.addEventListener('click', () => {
            const lang = opt.dataset.lang;
            switchLanguage(lang);
            if (currentLangText) currentLangText.textContent = flagMap[lang] || lang.toUpperCase();
            langDropdown.classList.remove('open');
        });
    });

    const savedLang = localStorage.getItem('site-lang') || CONFIG.defaultLang;
    if (currentLangText) currentLangText.textContent = flagMap[savedLang] || savedLang.toUpperCase();
    switchLanguage(savedLang);
}

function switchLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = CONFIG.defaultLang;
    localStorage.setItem('site-lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (TRANSLATIONS[lang][key] !== undefined) el.innerHTML = TRANSLATIONS[lang][key];
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const [attr, key] = el.dataset.i18nAttr.split(':');
        if (TRANSLATIONS[lang][key] !== undefined) el.setAttribute(attr, TRANSLATIONS[lang][key]);
    });

    const input = document.getElementById('chat-input');
    if (input && TRANSLATIONS[lang].bot_placeholder) input.placeholder = TRANSLATIONS[lang].bot_placeholder;
}

// ============================================
// Particle Background
// ============================================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const COUNT = 60;

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    function createParticle() {
        return { x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.5 + 0.1 };
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,229,255,${p.opacity})`; ctx.fill();
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[j].x - p.x, dy = particles[j].y - p.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 150) {
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,229,255,${0.08 * (1 - dist / 150)})`; ctx.lineWidth = 0.5; ctx.stroke();
                }
            }
        });
        requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize();
    particles = Array.from({ length: COUNT }, createParticle);
    draw();
}

// ============================================
// Reveal Animations
// ============================================
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================
// Header & Nav
// ============================================
function initHeader() {
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (!hamburger || !navLinks) return;
    hamburger.addEventListener('click', () => { navLinks.classList.toggle('open'); hamburger.classList.toggle('active'); });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { navLinks.classList.remove('open'); hamburger.classList.remove('active'); }));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ============================================
// Chatbot (Geo-Tech Workflow)
// ============================================
function initChatbot() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const limitDisplay = document.getElementById('chat-limit');
    if (!chatForm) return;

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;
        addChatMessage('user', message);
        chatInput.value = '';
        const typingId = 'typing-' + Date.now();
        addChatMessage('bot', '', typingId);

        try {
            const response = await fetch(CONFIG.n8nWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: message, session_id: SESSION_ID })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();

            const botMessage = data.reply || data.output || "Erreur de réponse.";
            const qCount = data.question_count || 0;
            if (limitDisplay) limitDisplay.innerText = `Question ${qCount}/5`;

            const typingEl = document.getElementById(typingId);
            if (typingEl) {
                const bubble = typingEl.querySelector('.msg-bubble');
                bubble.classList.remove('typing');
                bubble.innerHTML = formatBotResponse(botMessage);
            }

            if (data.limit_reached) {
                chatInput.disabled = true;
                chatInput.placeholder = "Limite atteinte. Contactez un consultant.";
                chatInput.style.opacity = '0.5';
            }
        } catch (err) {
            const typingEl = document.getElementById(typingId);
            if (typingEl) {
                typingEl.querySelector('.msg-bubble').innerHTML =
                    `<span style="color:#ff5555">⚠️ LBD AI est indisponible.</span><br><small>Vérifiez n8n (port 5678) et le tunnel localtunnel.</small>`;
            }
        }
    });
}

function formatBotResponse(text) {
    return text
        .replace(/\n/g, '<br>')
        .replace(/•/g, '<span style="color:var(--primary)">•</span>');
}

function addChatMessage(role, text, id = null) {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${role}`;
    if (id) msgDiv.id = id;
    const avatar = role === 'bot' ? `<img src="ai_avatar.png" alt="AI" class="msg-avatar">` : '';
    const isTyping = text === '' ? 'typing' : '';
    msgDiv.innerHTML = `${avatar}<div class="msg-bubble ${isTyping}">${text}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ============================================
// News Feed
// ============================================
async function loadNews() {
    const grid = document.getElementById('news-grid');
    const ticker = document.getElementById('live-ticker');
    const updateTime = document.getElementById('last-update');
    if (!grid) return;

    const feeds = [
        'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews',
        'https://api.rss2json.com/v1/api.json?rss_url=https://www.darkreading.com/rss.xml',
        'https://api.rss2json.com/v1/api.json?rss_url=https://www.bleepingcomputer.com/feed/',
    ];
    let allArticles = [];
    try {
        const results = await Promise.allSettled(feeds.map(url => fetch(url).then(r => r.json())));
        results.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value.items) {
                const sourceNames = ['The Hacker News', 'Dark Reading', 'BleepingComputer'];
                result.value.items.slice(0, 4).forEach(item => {
                    allArticles.push({
                        title: item.title,
                        description: stripHtml(item.description || '').slice(0, 150) + '...',
                        date: formatDate(item.pubDate), link: item.link, source: sourceNames[index],
                        tag: categorizeArticle(item.title + ' ' + (item.description || ''))
                    });
                });
            }
        });
    } catch (e) { console.warn('RSS non disponible, données locales utilisées.'); }

    if (allArticles.length === 0) allArticles = getFallbackNews();
    allArticles = allArticles.sort(() => Math.random() - 0.5).slice(0, 6);

    if (ticker && allArticles.length > 0) {
        let idx = 0; ticker.textContent = allArticles[0].title;
        setInterval(() => {
            idx = (idx + 1) % allArticles.length;
            ticker.style.opacity = 0;
            setTimeout(() => { ticker.textContent = allArticles[idx].title; ticker.style.opacity = 1; }, 300);
        }, 5000);
    }

    grid.innerHTML = '';
    allArticles.forEach((article, i) => {
        const card = document.createElement('a');
        card.href = article.link || '#'; card.target = '_blank'; card.rel = 'noopener';
        card.className = 'news-card reveal'; card.style.transitionDelay = `${i * 0.1}s`;
        card.setAttribute('data-category', article.tag);
        card.innerHTML = `
            <span class="news-tag ${article.tag}">${article.tag === 'cyber' ? 'Cybersécurité' : 'Géopolitique'}</span>
            <h4>${article.title}</h4>
            <p>${article.description}</p>
            <span class="news-date">${article.date} · ${article.source}</span>`;
        grid.appendChild(card);
    });

    if (updateTime) updateTime.textContent = new Date().toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    initRevealAnimations();

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            document.querySelectorAll('.news-card').forEach(card => {
                card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
            });
        });
    });
}

function stripHtml(html) { const tmp = document.createElement('div'); tmp.innerHTML = html; return tmp.textContent || ''; }
function formatDate(d) { try { return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }); } catch { return d; } }
function categorizeArticle(text) {
    const t = text.toLowerCase();
    if (t.includes('war') || t.includes('china') || t.includes('russia') || t.includes('nato') || t.includes('sanction') || t.includes('geopolit') || t.includes('govern')) return 'geopolitique';
    return 'cyber';
}

function getFallbackNews() {
    return [
        { title: "APT-41 lance une nouvelle campagne d'espionnage en Asie du Sud-Est", description: "Le groupe APT-41 utilise des implants personnalisés ciblant les télécommunications.", date: "16 avr. 2026", source: "LBD Intel", link: "#", tag: "cyber" },
        { title: "L'UE renforce la directive NIS3 face aux menaces cyber-étatiques", description: "Le Parlement Européen harmonise les obligations de cybersécurité.", date: "15 avr. 2026", source: "LBD Intel", link: "#", tag: "geopolitique" },
        { title: "Ransomware LockBit 4.0 : nouvelle variante détectée", description: "Nouveau ransomware avec chiffrement post-quantique ciblant la santé.", date: "14 avr. 2026", source: "LBD Intel", link: "#", tag: "cyber" },
        { title: "Tensions en Mer de Chine : pic d'activité cyber sur les câbles sous-marins", description: "Corrélation entre exercices navals et scans de vulnérabilité.", date: "13 avr. 2026", source: "LBD Intel", link: "#", tag: "geopolitique" },
        { title: "Faille zero-day critique dans les systèmes SCADA industriels", description: "Vulnérabilité critique affectant les systèmes de contrôle industriel.", date: "12 avr. 2026", source: "LBD Intel", link: "#", tag: "cyber" },
        { title: "Le G7 s'accorde sur un cadre de réponse aux attaques étatiques", description: "Protocole commun d'attribution et de sanctions des cyberattaques.", date: "11 avr. 2026", source: "LBD Intel", link: "#", tag: "geopolitique" }
    ];
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const successDiv = document.getElementById('form-success');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.innerHTML = '<span>Envoi en cours...</span>';
        submitBtn.disabled = true;
        setTimeout(() => { form.style.display = 'none'; if (successDiv) successDiv.style.display = 'block'; }, 1500);
    });
}
