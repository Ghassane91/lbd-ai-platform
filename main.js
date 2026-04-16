// ============================================
// LBD AI — Local & Geo-Tech Optimized
// ============================================

const CONFIG = {
    n8nWebhookUrl: 'https://fancy-singers-type.loca.lt/webhook/chat-web', // Public Tunnel URL
    defaultLang: 'fr'
};

const TRANSLATIONS = {
    fr: {
        bot_placeholder: "Posez votre question à LBD AI...",
        error_offline: "⚠️ LBD AI est indisponible en local. Vérifiez Ollama et n8n.",
        limit_reached: "🎯 Limite atteinte. Contactez un consultant."
    },
    en: {
        bot_placeholder: "Ask LBD AI a question...",
        error_offline: "⚠️ LBD AI is offline. Check Ollama and n8n.",
        limit_reached: "🎯 Limit reached. Contact a consultant."
    }
    // Spanish and Russian translations are preserved in the DOM/Memory but shortened here for key logic
};

// Generate a session ID for the workflow tracking
let SESSION_ID = localStorage.getItem('lbd_session_id') || 'web_' + Math.random().toString(36).substr(2, 9);
localStorage.setItem('lbd_session_id', SESSION_ID);

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initChatbot();
    initLanguageSwitcher();
});

function initLanguageSwitcher() {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const langOpts = document.querySelectorAll('.lang-opt');
    if (!langBtn) return;
    langBtn.addEventListener('click', (e) => { e.stopPropagation(); langDropdown.classList.toggle('open'); });
    document.addEventListener('click', () => langDropdown?.classList.remove('open'));
    langOpts.forEach(opt => {
        opt.addEventListener('click', () => {
            const lang = opt.dataset.lang;
            localStorage.setItem('site-lang', lang);
            location.reload(); // Simple reload for lang swap in offline mode
        });
    });
}

// ============================================
// Chatbot Logic (Geo-Tech Workflow Sync)
// ============================================
function initChatbot() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const limitDisplay = document.getElementById('chat-limit');

    if (!chatForm || !chatInput) return;

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
                body: JSON.stringify({ 
                    text: message, // Matching n8n "Extract Web" node
                    session_id: SESSION_ID 
                })
            });

            if (!response.ok) throw new Error();

            const data = await response.json();
            
            // Handle n8n response format
            const botMessage = data.reply || data.output || "Erreur de réponse.";
            const qCount = data.question_count || 0;

            // Update UI with limits
            if (limitDisplay) limitDisplay.innerText = `Question ${qCount}/5`;
            
            const typingBubble = document.getElementById(typingId);
            if (typingBubble) {
                const bubble = typingBubble.querySelector('.msg-bubble');
                bubble.classList.remove('typing');
                // Use innerHTML for better formatting of structured text from workflow
                bubble.innerHTML = formatBotResponse(botMessage);
            }
            
            if (data.limit_reached) {
                chatInput.disabled = true;
                chatInput.placeholder = "Limite atteinte.";
            }

        } catch (error) {
            const typingBubble = document.getElementById(typingId);
            if (typingBubble) {
                typingBubble.querySelector('.msg-bubble').innerHTML = `<span style="color:#ff5555">⚠️ Erreur de connexion au workflow Geo-Tech.</span><br><small>Vérifiez que n8n est actif sur le port 5678.</small>`;
            }
        }
    });
}

function formatBotResponse(text) {
    // Preserve newlines and handle basic formatting
    return text.replace(/\n/g, '<br>').replace(/•/g, '<span style="color:var(--primary); margin-right:8px">•</span>');
}

function addChatMessage(role, text, id = null) {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${role}`;
    if (id) msgDiv.id = id;
    const avatar = role === 'bot' ? '<img src="ai_avatar.png" alt="AI" class="msg-avatar">' : '';
    const isTyping = text === '' ? 'typing' : '';
    msgDiv.innerHTML = `${avatar}<div class="msg-bubble ${isTyping}">${text}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ============================================
// Visual Background (Optimized for performance)
// ============================================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();
    for(let i=0; i<40; i++) particles.push({
        x: Math.random()*canvas.width, y: Math.random()*canvas.height,
        vx: (Math.random()-0.5)*0.2, vy: (Math.random()-0.5)*0.2, size: 1.5
    });
    const draw = () => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p => {
            p.x+=p.vx; p.y+=p.vy;
            if(p.x<0 || p.x>canvas.width) p.vx*=-1;
            if(p.y<0 || p.y>canvas.height) p.vy*=-1;
            ctx.fillStyle = 'rgba(0, 229, 255, 0.2)';
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
        });
        requestAnimationFrame(draw);
    };
    draw();
}
