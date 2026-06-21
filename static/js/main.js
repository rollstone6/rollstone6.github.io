// === Reading Progress Bar ===
(function() {
    const bar = document.getElementById('reading-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        bar.style.width = pct + '%';
    });
})();

// === Back to Top ===
(function() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 300);
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// === Typing Animation ===
(function() {
    const el = document.getElementById('typed-text');
    if (!el) return;
    const phrases = JSON.parse(el.dataset.phrases || '[]');
    if (!phrases.length) return;
    let pi = 0, ci = 0, deleting = false;
    function tick() {
        const word = phrases[pi];
        if (deleting) {
            ci--;
            el.textContent = word.substring(0, ci);
            if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
        } else {
            ci++;
            el.textContent = word.substring(0, ci);
            if (ci === word.length) { deleting = true; setTimeout(tick, 1500); return; }
        }
        setTimeout(tick, deleting ? 40 : 80);
    }
    tick();
})();

// === Search Overlay ===
(function() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    if (!overlay || !input || !results) return;

    let searchData = null;
    async function loadData() {
        if (searchData) return searchData;
        const resp = await fetch('/index.json');
        searchData = await resp.json();
        return searchData;
    }

    function open() {
        overlay.classList.add('active');
        input.focus();
        loadData();
        document.body.style.overflow = 'hidden';
    }
    function close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-search-trigger]').forEach(el => {
        el.addEventListener('click', e => { e.preventDefault(); open(); });
    });

    overlay.addEventListener('click', e => {
        if (e.target === overlay) close();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
    });

    input.addEventListener('input', async () => {
        const q = input.value.trim().toLowerCase();
        if (!q) { results.innerHTML = '<p class="search-hint">输入关键词搜索文章...</p>'; return; }
        const data = await loadData();
        const matches = data.filter(p =>
            p.title.toLowerCase().includes(q) ||
            (p.description && p.description.toLowerCase().includes(q)) ||
            (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
        );
        if (!matches.length) {
            results.innerHTML = '<p class="search-empty">没有找到相关文章</p>';
            return;
        }
        results.innerHTML = matches.map(p => `
            <a href="${p.url}" class="search-result-item">
                <h4>${p.title}</h4>
                ${p.description ? `<p>${p.description}</p>` : ''}
                <span class="search-result-tags">${(p.tags || []).map(t => '#' + t).join(' ')}</span>
            </a>
        `).join('');
    });
})();

// === Scroll Animations (Intersection Observer) ===
(function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();

// === Code Copy Button ===
(function() {
    document.querySelectorAll('.post-content pre').forEach(pre => {
        const btn = document.createElement('button');
        btn.className = 'code-copy-btn';
        btn.textContent = '复制';
        btn.addEventListener('click', () => {
            const code = pre.querySelector('code');
            navigator.clipboard.writeText(code.textContent).then(() => {
                btn.textContent = '已复制 ✓';
                setTimeout(() => { btn.textContent = '复制'; }, 2000);
            });
        });
        pre.style.position = 'relative';
        pre.appendChild(btn);
    });
})();

// === Mobile Hamburger Menu ===
(function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('nav-menu');
    const overlay = document.getElementById('nav-overlay');
    if (!hamburger || !menu) return;

    function toggle() {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }

    function close() {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggle);
    if (overlay) overlay.addEventListener('click', close);

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', close);
    });

    // Close on escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && menu.classList.contains('active')) close();
    });
})();
