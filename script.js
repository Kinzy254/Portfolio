/* Portfolio Main Script

/* ── DOM Ready? ── */
document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initHamburger();
    initScrollSpy();
    initReveal();
    initSkillsAndServices();
    initPortfolio();
    initContactForm();
    initSmoothScroll();
});

/* 1. TYPING EFFECT */

function initTypingEffect() {
    const introText = document.querySelector('.intro-text');
    if (!introText) return;

    const phrases = [
        "AI & Automation workflows",
        "workflow automation scripts",
        "modern dashboards/interfaces",
        "clean data insights",
        "engaging websites",
        "landing pages that convert",
        "technical virtual assistance",
        "excellent customer relations"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let startTimestamp = null;
    let animationFrameId;

    function type(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;

        const currentPhrase = phrases[phraseIndex];

        // Determine current delay based on state
        const delay = isDeleting ? 10 : 80;

        if (elapsed >= delay) {
            startTimestamp = timestamp; // Reset timer

            if (isDeleting) {
                introText.textContent = currentPhrase.slice(0, charIndex - 1);
                charIndex--;
            } else {
                introText.textContent = currentPhrase.slice(0, charIndex + 1);
                charIndex++;
            }

            // State transitions
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at the end of the word
                startTimestamp = null; 
                isDeleting = true;
                cancelAnimationFrame(animationFrameId);
                setTimeout(() => {
                    animationFrameId = requestAnimationFrame(type);
                }, 2200);
                return; // Exit early to wait out the pause
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                // Pause before starting the next word
                startTimestamp = null;
                cancelAnimationFrame(animationFrameId);
                setTimeout(() => {
                    animationFrameId = requestAnimationFrame(type);
                }, 350);
                return; // Exit early to wait out the pause
            }
        }

        animationFrameId = requestAnimationFrame(type);
    }

    animationFrameId = requestAnimationFrame(type);
}

/* 2. HAMBURGER MENU */

function initHamburger() {
    const btn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('navOverlay');
    if (!btn || !sidebar || !overlay) return;

    function openMenu() {
        btn.classList.add('open');
        sidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        btn.classList.remove('open');
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => {
        sidebar.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // Close on nav link click (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* 3. SCROLL SPY — highlight active nav */

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], .hero[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id || link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.35, rootMargin: '-60px 0px -60px 0px' });

    sections.forEach(s => observer.observe(s));
}

/* 4. REVEAL ON SCROLL */

function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    els.forEach(el => observer.observe(el));
}

/* 5. SKILLS + SERVICES (from skills.json) */

const SERVICE_ICONS = {
    
    'ai-automation':           '✦',
    'data-analysis':           '📊',
    'frontend-development':    '🌐',
    'python-programming':      '🐍',
    'graphic-design':          '🎨',
    'virtual-assistance':      '🗂️',
    'customer-service':        '💬'
};

function initSkillsAndServices() {
    // Try to load from skills.json. Fall back to inline data.
    const jsonUrl = 'appdata/skills.json';

    fetch(jsonUrl)
        .then(r => r.json())
        .then(data => renderSkillsAndServices(data.skills))
        .catch(() => {
            // Inline fallback (mirrors the uploaded skills.json)
            const fallback = {
                "ai-automation": {
                    "name": "AI & workflow automation",
                    "proficiency": "95%",
                    "description": "Smart AI agents, custom API integrations, and automated workflows that eliminate manual work.",
                    "capabilities": [
                            "Workflow automation", "AI agent integration", "API connections", 
                            "Make.com / Zapier setups", "Custom chatbots", "LLM implementation", 
                            "Process optimization", "Automated email flows", "Data pipeline automation", 
                            "CRM workflow sync", "AI-powered data extraction", "Scheduled tasks", 
                            "Webhook integration", "No-code / low-code automation"
                        ],
                    "porfolio": [{
                        "title": "",
                        "description": "",
                        "stack": [],
                        "link": ""
                    }]
                },

                "data-analysis": {
                    "name": "data analysis & reporting",
                    "proficiency": "98%",
                    "description": "Clean data, beautiful dashboards, KPI tracking and clear business insights.",
                    "capabilities": [
                        "Advanced Excel", "Data cleaning", "Data visualization", 
                        "Dashboard creation", "Python for data analysis",
                        "QuickBooks", "Financial reporting", 
                        "Spreadsheet automation", "SQL basics", 
                        "Data reporting", "Business insights", 
                        "Statistical analysis", "Power BI / Tableau", 
                        "KPI tracking", "Reporting automation"
                    ],
                    "porfolio": [{
                        "title": "",
                        "description": "",
                        "stack": [],
                        "link": ""
                    }]
                },

                "virtual-assistance": {
                    "name": "virtual assistance",
                    "proficiency": "99%",
                    "description": "End-to-end admin, inbox, calendar, CRM and operations support so you focus on growth.",
                    "capabilities": [
                        "Administrative support", "Calendar & schedule management", 
                        "Email management", "Appointment booking", "Customer support", 
                        "Data entry", "Internet research", "Travel planning", 
                        "File & document organization", "Social media management", 
                        "CRM management", "Lead generation", "Project coordination", 
                        "Meeting scheduling", "Chat & email support", "Executive assistance", 
                        "Inbox management", "Microsoft Office Suite", "Google Workspace", 
                        "Communication management", "Task management", "Online business support", 
                        "E-commerce support", "Report preparation", "Virtual team coordination", 
                        "Client relationship management"
                    ],
                    "porfolio": [{
                        "title": "",
                        "description": "",
                        "stack": [],
                        "link": ""
                    }]
                },

                "graphic-design": {
                    "name": "graphic design",
                    "proficiency": "95%",
                    "description": "Logos, brand identity, social graphics, thumbnails and marketing assets that convert.",
                    "capabilities": [
                        "Ul mockups", "Logo design", "Banner design", "Social media graphics", 
                        "YouTube thumbnails", "Business cards", "Flyers & posters", 
                        "Letterhead design", "Brand identity", "Presentation design", 
                        "Infographics", "Video editing", "Photo editing", 
                        "Marketing materials", "Creative ad graphics" 
                    ],
                    "porfolio": [{
                        "title": "",
                        "description": "",
                        "stack": [],
                        "link": ""
                    }]
                },

                "frontend-development": {
                    "name": "frontend development",
                    "proficiency": "90%",
                    "description": "Pixel-perfect, fast, responsive React + Tailwind websites and landing pages.",
                    "capabilities": [
                        "HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", 
                        "Bootstrap", "Responsive web design", "UI/UX implementation", 
                        "API integration", "Website optimization", "Landing pages", 
                        "Portfolio websites", "Business websites", "Interactive interfaces", 
                        "Git & GitHub"
                    ],
                    "porfolio": [{
                        "title": "",
                        "description": "",
                        "stack": [],
                        "link": ""
                    }]
                },

                "python-programming": {
                    "name": "python programming",
                    "proficiency": "99%",
                    "description": "Scripts, web scraping, data pipelines and APIs that save hours every week.",
                    "capabilities": [
                        "Automation scripts", "Data processing", "Web scraping", 
                        "REST APIS", "Backend scripting", "Python applications", 
                        "Data analytics", "Task automation", "File handling", 
                        "Flask / Django basics", "Problem solving with Python"
                    ],
                    "porfolio": [{
                        "title": "",
                        "description": "",
                        "stack": [],
                        "link": ""
                    }]
                },

                "customer-service": {
                    "name": "customer service",
                    "proficiency": "99%",
                    "description": "Empathic, professional chat / email / call support that keeps customers loyal.",
                    "capabilities": [
                        "Customer communication", "Technical support assistance", "Problem resolution",
                        "Call handling", "Chat support", "Email support",
                        "Conflict resolution", "CRM tools", "Customer retention",
                        "Professional communication", "Multitasking"
                    ],
                    "porfolio": [{
                        "title": "",
                        "description": "",
                        "stack": [],
                        "link": ""
                    }]
                }
            };
            renderSkillsAndServices(fallback);
        });
}

function renderSkillsAndServices(skills) {
    renderSkillCards(skills);
    renderServiceCards(skills);
}

function renderSkillCards(skills) {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;

    Object.entries(skills).forEach(([key, skill]) => {
        const pctNum = parseInt(skill.proficiency, 10);
        const topChips = (skill.capabilities || []).slice(0, 6);

        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `
            <div class="skill-card-top">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-pct">${skill.proficiency}</span>
            </div>
            <p class="skill-desc">${skill.description}</p>
            <div class="skill-bar-track">
                <div class="skill-bar-fill" data-target="${pctNum}"></div>
            </div>
            <div class="skill-chips">
                ${topChips.map(c => `<span class="skill-chip">${c}</span>`).join('')}
            </div>
        `;
        grid.appendChild(card);
    });

    // Animate bars when visible
    const fills = grid.querySelectorAll('.skill-bar-fill');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.width = el.dataset.target + '%';
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    fills.forEach(f => observer.observe(f));
}

function renderServiceCards(skills) {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    Object.entries(skills).forEach(([key, skill]) => {
        const icon = SERVICE_ICONS[key] || '✦';
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <span class="service-icon">${icon}</span>
            <h3 class="service-name">${skill.name}</h3>
            <p class="service-desc">${skill.description}</p>
        `;
        card.addEventListener('click', () => {
            document.querySelector('#contact-section')?.scrollIntoView({ behavior: 'smooth' });
            const select = document.getElementById('contactService');
            if (select) {
                const option = [...select.options].find(o =>
                    o.text.toLowerCase().includes(skill.name.split(' ')[0].toLowerCase())
                );
                if (option) select.value = option.value;
            }
        });
        grid.appendChild(card);
    });
}

/* 6. PORTFOLIO */

const PORTFOLIO_ITEMS = [
    {
        title: "E-Commerce Brand Identity",
        desc: "Full brand refresh for a Nairobi fashion label — logo, palette, social kit.",
        tags: ["design"],
        emoji: "🎨",
        bg: "#ede0ff",
        link: "#"
    },
    {
        title: "Executive VA Operations",
        desc: "Managed inbox, calendar and CRM for a London-based startup CEO — 3 months, zero missed deadlines.",
        tags: ["va"],
        emoji: "🗂️",
        bg: "#d6f8ef",
        link: "#"
    },
    {
        title: "Sales Dashboard — Python + Excel",
        desc: "Built an automated weekly sales report pipeline saving 6+ hours per week.",
        tags: ["data"],
        emoji: "📊",
        bg: "#fef3d6",
        link: "#"
    },
    {
        title: "Portfolio Website",
        desc: "Responsive portfolio for a freelance photographer using HTML, CSS and vanilla JS.",
        tags: ["development"],
        emoji: "💻",
        bg: "#d6eeff",
        link: "#"
    },
    {
        title: "Social Media Graphics Pack",
        desc: "30-piece Canva/Figma template pack for an Instagram coaching brand.",
        tags: ["design"],
        emoji: "🖼️",
        bg: "#ffe0f0",
        link: "#"
    },
    {
        title: "Customer Support Playbook",
        desc: "Developed SOPs and trained a 5-person support team for an e-commerce store.",
        tags: ["va"],
        emoji: "💬",
        bg: "#d6f8ef",
        link: "#"
    },
];

function initPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    const filterBar = document.getElementById('portfolioFilter');
    if (!grid || !filterBar) return;

    // Render cards
    PORTFOLIO_ITEMS.forEach(item => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.dataset.tags = item.tags.join(' ');
        card.innerHTML = `
            <div class="portfolio-thumb" style="background:${item.bg}">
                ${item.emoji}
            </div>
            <div class="portfolio-body">
                <div class="portfolio-tags">
                    ${item.tags.map(t => `<span class="portfolio-tag">${t}</span>`).join('')}
                </div>
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-desc">${item.desc}</p>
                <a href="${item.link}" class="portfolio-link" target="_blank" rel="noopener noreferrer">
                    View project →
                </a>
            </div>
        `;
        grid.appendChild(card);
    });

    // Filter buttons
    filterBar.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        grid.querySelectorAll('.portfolio-card').forEach(card => {
            const matches = filter === 'all' || card.dataset.tags.includes(filter);
            card.classList.toggle('hidden', !matches);
        });
    });
}

/* 7. CONTACT FORM */ 

/* =====================================================
   Contact Form — Email (Resend) + WhatsApp dual delivery
   Replace initContactForm() in script.js with this.
   ===================================================== */

// WhatsApp number in international format (no + or spaces).
// e.g. Kenyan number 0712 345 678 → 254712345678

const WHATSAPP_NUMBER = '254750205940';

function initContactForm() {
    const form      = document.getElementById('contactForm');
    const success   = document.getElementById('formSuccess');
    const submitBtn = form?.querySelector('button[type="submit"]');
    if (!form || !success || !submitBtn) return;

    injectSpinnerStyle();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const payload = {
            name:    document.getElementById('contactName')?.value.trim(),
            email:   document.getElementById('contactEmail')?.value.trim(),
            service: document.getElementById('contactService')?.value,
            message: document.getElementById('contactMessage')?.value.trim(),
        };

        if (!payload.name || !payload.email || !payload.message) {
            showFormError(form, 'Please fill in all required fields.');
            return;
        }

        setButtonLoading(submitBtn, true);

        // Send Whatsapp message in a new tab - **DELETE WHEN I IMPLEMENT THE BELOW EMAIL/WHATSAPP SEND

        const [whatsappResult] = await Promise.allSettled([
            openWhatsApp(payload),  // non-blocking, opens new tab immediately
        ]);

        setButtonLoading(submitBtn, false);

        if (whatsappResult.status === 'fulfilled') {
            console.log(whatsappResult.status)
            form.reset();
            showFormSuccess(success, '✓ Message drafted! Check the WhatsApp tab to complete your enquiry.');
        } else {
            // Email failed but WhatsApp tab still opened — I'll add a useful fallback message
            console.error('Whatsapp error:', whatsappResult.reason);
        }
    });
}

        /*
        // ── Run email + WhatsApp concurrently ──
        const [emailResult] = await Promise.allSettled([
            sendEmail(payload),
            openWhatsApp(payload),  // non-blocking, opens new tab immediately
        ]);

        setButtonLoading(submitBtn, false);

        if (emailResult.status === 'fulfilled') {
            form.reset();
            showFormSuccess(success, '✓ Message sent! Check the WhatsApp tab to complete your enquiry.');
        } else {
            // Email failed but WhatsApp tab still opened — I'll add a useful fallback message
            console.error('Email error:', emailResult.reason);
            showFormError(form, 'Email delivery failed — please complete your enquiry via the WhatsApp tab that just opened.');
        }
    });
}
*/

// Email via /api/contact (Resend)
/*
async function sendEmail(payload) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Email send failed.');
    return data;
}
*/

// WhatsApp — builds wa.me deep link and opens it in a new tab (fire-and-forget)

function openWhatsApp(payload) {
    const { name, email, service, message } = payload;

    const lines = [
        `👋 *New Portfolio Enquiry*`,
        ``,
        `*Name:* ${name}`,
        `*Email:* ${email}`,
        service ? `*Service:* ${service}` : null,
        ``,
        `*Message:*`,
        message,
    ].filter(line => line !== null);

    const text = lines.join('\n');
    const whatsappUrl  = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    openPopup(whatsappUrl)

    function openPopup(url, width = 500, height = 500) {
        const left = (screen.width / 4) - (width / 2);
        const top = (screen.height / 2) - (height / 2);
        const features = `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,noopener,noreferrer`;
        
        try {
            const popup = window.open(url, 'securePopup', features);
        } catch (err) {
            alert('Popup blocked. Opening whatsapp URL in new tab instead.');
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }
        

    return Promise.resolve(); // always succeeds from JS's perspective
}


//   UI helpers

function setButtonLoading(btn, isLoading) {
    btn.disabled = isLoading;
    btn.innerHTML = isLoading
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               style="animation:spin 1s linear infinite">
               <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
           </svg>
           Sending…`
        : `Send Message
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <line x1="22" y1="2" x2="11" y2="13"/>
               <polygon points="22 2 15 22 11 13 2 9 22 2"/>
           </svg>`;
}

function showFormSuccess(el, msg) {
    el.textContent = msg;
    el.style.cssText = `
        display: block;
        font-size: 0.85rem;
        font-weight: 600;
        color: #00a07a;
        background: #d6f8ef;
        border: 1px solid #a3edda;
        border-radius: 8px;
        padding: 0.65rem 1rem;
        margin-top: 0.5rem;
        text-align: center;
    `;
    setTimeout(() => {
        el.style.display = 'none';
        el.textContent = '';
    }, 20000);
}

function showFormError(form, message) {
    let errEl = form.querySelector('.form-error');
    if (!errEl) {
        errEl = document.createElement('p');
        errEl.className = 'form-error';
        errEl.style.cssText = `
            font-size: 0.83rem;
            font-weight: 500;
            color: #d7263d;
            background: #fff0f0;
            border: 1px solid #ffc8cc;
            border-radius: 8px;
            padding: 0.6rem 1rem;
            margin: 0;
        `;
        form.appendChild(errEl);
    }
    errEl.textContent = '⚠ ' + message;
    setTimeout(() => errEl?.remove(), 7000);
}

function injectSpinnerStyle() {
    if (document.getElementById('spinner-style')) return;
    const style = document.createElement('style');
    style.id = 'spinner-style';
    style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
}

//   8. CV DOWNLOAD BUTTONS

document.addEventListener('DOMContentLoaded', () => {
    const handlers = ['downloadCvBtn', 'aboutDownloadBtn'];
    const cvUrl = 'appdata/CV - Charles Kinzi.pdf'; 

    handlers.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // Changed to an async function to allow 'await' for the server check
            el.addEventListener('click', async (e) => {
                e.preventDefault();
                
                try {
                    // Send a lightweight HEAD request to verify file existence
                    const response = await fetch(cvUrl, { method: 'HEAD' });
                    
                    if (response.ok) {
                        // File exists (Status 200-299), safe to open
                        window.open(cvUrl, '_blank');
                    } else {
                        // File missing on server (Status 404, etc.)
                        alert('CV is being updated. Check back later.');
                    }
                } catch (error) {
                    // Handles network dropouts or local CORS blocks during testing
                    alert('CV is being updated. Check back later.');
                }
            });
        }
    });
});

//   9. SMOOTH SCROLL (for older browsers)

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
