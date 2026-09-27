/* دليل اللاذقية — تنقّل مشترك بين كل صفحات الموقع (ملف واحد، بلا تكرار كود).
   يبحث عن حاويات محدَّدة بسمات data- ويملأها:
     [data-lg-drawer-root]   → قائمة جانبية كاملة (وزر فتحها إن لم يوجد زر جاهز)
     [data-lg-mini-nav-root] → شريط روابط مصغّر (للصفحات الرسمية بلا قائمة جانبية)
     [data-lg-home-link]     → يحوّل العنصر (غالباً شعار) إلى رابط للرئيسية
     أول <footer> في الصفحة  → يُلحَق به صف أزرار السوشيال ميديا (initSocial) */
(function () {
  'use strict';

  var ICON_BASE = 'assets/icons/';

  // البنود مجمَّعة حسب النوع — كل مجموعة بعنوان صغير (المجموعة الأولى بلا عنوان)
  var NAV_GROUPS = [
    { title: '', items: [
      { href: 'index.html', icon: 'icon-home.svg', label: 'الرئيسية' },
      { href: 'download.html', icon: 'icon-download.svg', label: 'تحميل التطبيق' },
      { href: 'about.html', icon: 'icon-about.svg', label: 'من نحن' },
      { href: 'contact.html', icon: 'icon-contact.svg', label: 'تواصل معنا' }
    ] },
    { title: 'الأدلة', items: [
      { href: 'user_guide.html', icon: 'icon-guide.svg', label: 'دليل الاستخدام' },
      { href: 'community-guide.html', icon: 'icon-community.svg', label: 'دليل المجتمع' },
      { href: 'add_place_guide.html', icon: 'icon-add-place.svg', label: 'دليل إضافة مكان' },
      { href: 'manage_place_guide.html', icon: 'icon-settings.svg', label: 'دليل إدارة المكان' },
      { href: 'job_opportunity_guide.html', icon: 'icon-jobs.svg', label: 'دليل إضافة فرصة عمل' },
      { href: 'job_seeker_guide.html', icon: 'icon-job-seeker.svg', label: 'دليل طلب عمل' }
    ] },
    { title: 'الشروط والسياسات', items: [
      { href: 'terms_of_use.html', icon: 'icon-terms.svg', label: 'شروط الاستخدام' },
      { href: 'claiming_policy.html', icon: 'icon-claiming.svg', label: 'سياسة إثبات الملكية' }
    ] },
    { title: 'الخصوصية والبيانات', items: [
      { href: 'privacy_policy.html', icon: 'icon-privacy.svg', label: 'سياسة الخصوصية' },
      { href: 'Data-Safety-Declaration.html', icon: 'icon-data-safety.svg', label: 'إقرار أمان البيانات' },
      { href: 'deletion_policy.html', icon: 'icon-deletion.svg', label: 'سياسة حذف البيانات' },
      { href: 'delete-account.html', icon: 'icon-person.svg', label: 'حذف الحساب' }
    ] }
  ];

  var MINI_ITEMS = [
    { href: 'index.html', icon: 'icon-home.svg', label: 'الرئيسية' },
    { href: 'about.html', icon: 'icon-about.svg', label: 'من نحن' },
    { href: 'contact.html', icon: 'icon-contact.svg', label: 'تواصل معنا' },
    { href: 'download.html', icon: 'icon-download.svg', label: 'تحميل التطبيق' }
  ];

  function currentPage() {
    var path = location.pathname.split('/').pop();
    return (path || 'index.html').toLowerCase();
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  }

  function buildDrawerMarkup() {
    var page = currentPage();
    var items = NAV_GROUPS.map(function (group) {
      var links = group.items.map(function (item) {
        var active = item.href.toLowerCase() === page ? ' active' : '';
        return '<a href="' + item.href + '" class="lg-drawer-item' + active + '">' +
          '<img class="lg-drawer-icon" src="' + ICON_BASE + item.icon + '" alt="">' +
          escapeHtml(item.label) + '</a>';
      }).join('');
      var title = group.title
        ? '<div class="lg-drawer-group-title">' + escapeHtml(group.title) + '</div>' : '';
      return '<div class="lg-drawer-group">' + title + links + '</div>';
    }).join('');

    var themeToggle =
      '<div class="lg-theme-row">' +
      '<span class="lg-theme-label">' +
      '<span class="lg-theme-label-dark">الوضع الليلي</span>' +
      '<span class="lg-theme-label-light">الوضع النهاري</span>' +
      '</span>' +
      '<button type="button" class="lg-theme-toggle" data-lg-theme-toggle aria-label="تبديل الوضع الليلي والنهاري">' +
      '<span class="lg-theme-glow"></span>' +
      '<span class="lg-theme-circle">' +
      '<svg class="lg-theme-icon lg-theme-sun" viewBox="0 0 40 40">' +
      '<circle cx="20" cy="20" r="7" fill="#FFD54F"/>' +
      '<g stroke="#FFD54F" stroke-width="2.5" stroke-linecap="round">' +
      '<line x1="20" y1="4" x2="20" y2="8"/><line x1="20" y1="32" x2="20" y2="36"/>' +
      '<line x1="4" y1="20" x2="8" y2="20"/><line x1="32" y1="20" x2="36" y2="20"/>' +
      '<line x1="8.3" y1="8.3" x2="11.1" y2="11.1"/><line x1="28.9" y1="28.9" x2="31.7" y2="31.7"/>' +
      '<line x1="8.3" y1="31.7" x2="11.1" y2="28.9"/><line x1="28.9" y1="11.1" x2="31.7" y2="8.3"/>' +
      '</g></svg>' +
      '<svg class="lg-theme-icon lg-theme-moon" viewBox="0 0 40 40">' +
      '<circle cx="18" cy="20" r="10" fill="#7986CB"/>' +
      '<circle cx="23" cy="16" r="7.5" fill="#1A237E"/>' +
      '</svg>' +
      '</span></button></div>';

    return (
      '<div class="lg-drawer-overlay" data-lg-overlay></div>' +
      '<div class="lg-drawer" data-lg-drawer role="dialog" aria-modal="true" aria-label="القائمة الرئيسية">' +
      '<div class="lg-drawer-header">' +
      '<img class="lg-drawer-logo-img" src="assets/logo.svg" alt="" aria-hidden="true">' +
      '<div class="lg-drawer-logo">دليل اللاذقية</div>' +
      '<div class="lg-drawer-sub">اكتشف مدينتك بسهولة</div>' +
      '</div>' +
      themeToggle +
      '<nav class="lg-drawer-content">' + items + '</nav>' +
      '<div class="lg-social lg-social-drawer" data-lg-social hidden></div>' +
      '<div class="lg-drawer-footer">الإصدار 0.1.24 &copy; 2026</div>' +
      '</div>'
    );
  }

  function initThemeToggle(root) {
    var btn = root.querySelector('[data-lg-theme-toggle]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('lg-theme', next); } catch (e) {}
    });
  }

  function wireDrawer(root, toggleBtn) {
    var overlay = root.querySelector('[data-lg-overlay]');
    var drawer = root.querySelector('[data-lg-drawer]');
    if (!overlay || !drawer || !toggleBtn) return;

    function closeDrawer() {
      drawer.classList.remove('open');
      overlay.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    function openDrawer() {
      drawer.classList.add('open');
      overlay.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.addEventListener('click', function () {
      if (drawer.classList.contains('open')) closeDrawer();
      else openDrawer();
    });
    overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  function initDrawer(root) {
    root.innerHTML = buildDrawerMarkup();
    initThemeToggle(root);

    var existingToggle = document.querySelector('[data-lg-toggle]');
    if (existingToggle) {
      existingToggle.classList.add('lg-icon-menu-host');
      wireDrawer(root, existingToggle);
      return;
    }

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'lg-drawer-toggle';
    toggle.setAttribute('aria-label', 'فتح القائمة الرئيسية');
    toggle.innerHTML = '<span class="lg-icon-menu"></span>';
    document.body.appendChild(toggle);
    wireDrawer(root, toggle);
  }

  function initMiniNav(root) {
    var page = currentPage();
    var items = MINI_ITEMS.filter(function (item) {
      return item.href.toLowerCase() !== page;
    }).map(function (item) {
      return '<a href="' + item.href + '" class="lg-mini-nav-item">' +
        '<img class="lg-mini-nav-icon" src="' + ICON_BASE + item.icon + '" alt="">' +
        escapeHtml(item.label) + '</a>';
    }).join('');
    root.innerHTML = '<nav class="lg-mini-nav" aria-label="روابط سريعة">' + items + '</nav>';
  }

  function initHomeLink(el) {
    if (!el || el.tagName === 'A') return;
    var a = document.createElement('a');
    a.href = 'index.html';
    a.className = el.className;
    a.setAttribute('aria-label', 'الانتقال إلى الصفحة الرئيسية - دليل اللاذقية');
    while (el.firstChild) a.appendChild(el.firstChild);
    el.replaceWith(a);
  }

  /* ── حسابات التطبيق على السوشيال ميديا ─────────────────────────────────
     نفس مصدر تذييل القائمة الجانبية في التطبيق (layout_drawer_social +
     BaseActivity.bindDrawerSocialLinks): app_config/settings.URLfacebook / URLinstagram،
     تُقرأ عبر Firestore REST (القراءة مفتوحة في القواعد) بلا تحميل Firebase SDK.
     رابط فارغ أو ليس https على نطاق المنصّة نفسها ← يختفي زرّه، وكلاهما ← يختفي الصف كله. */
  var FIRESTORE_SETTINGS_URL =
    'https://firestore.googleapis.com/v1/projects/device-streaming-a7432e75/databases/(default)' +
    '/documents/app_config/settings?key=AIzaSyAT8auOR8cfT7C-kRzm27iQRIPriCy9jQE' +
    '&mask.fieldPaths=URLfacebook&mask.fieldPaths=URLinstagram';
  var SOCIAL_CACHE_KEY = 'lg-social-links';
  var SOCIAL_CACHE_MS = 10 * 60 * 1000;

  // نفس رسمَي ic_facebook_custom / ic_instagram_custom في التطبيق
  var SOCIAL_ICON_FACEBOOK =
    '<svg viewBox="0 0 24 24" fill="none" stroke="#1877F2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path stroke-width="1.5" d="M16,3H8C5.24,3 3,5.24 3,8v8c0,2.76 2.24,5 5,5h8c2.76,0 5,-2.24 5,-5V8C21,5.24 18.76,3 16,3z"/>' +
    '<path stroke-width="1.2" transform="translate(14 13) scale(0.95) translate(-14 -13)" d="M15.5,21V13.5h2.5l0.5-3h-3v-1.8c0-0.7,0.3-1,1-1h2V5c-0.3,0-1.5-0.2-2.8-0.2-2.8,0-4.2,1.7-4.2,4.2v2h-2v3h2v7H15.5z"/>' +
    '</svg>';
  var SOCIAL_ICON_INSTAGRAM =
    '<svg viewBox="0 0 24 24" fill="none" stroke="#E4405F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M16,3H8C5.24,3 3,5.24 3,8v8c0,2.76 2.24,5 5,5h8c2.76,0 5,-2.24 5,-5V8C21,5.24 18.76,3 16,3z"/>' +
    '<circle cx="12" cy="12" r="3"/>' +
    '<circle cx="17.5" cy="6.5" r="0.5" fill="#E4405F" stroke="none"/>' +
    '</svg>';

  var SOCIAL_PLATFORMS = [
    { field: 'URLfacebook', track: 'social_facebook', label: 'فيسبوك', icon: SOCIAL_ICON_FACEBOOK, hosts: ['facebook.com', 'fb.com', 'fb.me'] },
    { field: 'URLinstagram', track: 'social_instagram', label: 'إنستغرام', icon: SOCIAL_ICON_INSTAGRAM, hosts: ['instagram.com', 'instagr.am'] }
  ];

  function validSocialUrl(raw, hosts) {
    if (typeof raw !== 'string' || !raw.trim()) return null;
    var url;
    try { url = new URL(raw.trim()); } catch (e) { return null; }
    if (url.protocol !== 'https:') return null;
    var host = url.hostname.toLowerCase();
    var ok = hosts.some(function (h) {
      return host === h || host.slice(-(h.length + 1)) === '.' + h;
    });
    return ok ? url.href : null;
  }

  function readSocialCache() {
    try {
      var cached = JSON.parse(sessionStorage.getItem(SOCIAL_CACHE_KEY) || 'null');
      if (cached && Date.now() - cached.at < SOCIAL_CACHE_MS) return cached.links;
    } catch (e) {}
    return null;
  }

  function fetchSocialLinks() {
    var cached = readSocialCache();
    if (cached) return Promise.resolve(cached);
    if (!window.fetch) return Promise.resolve({});
    return fetch(FIRESTORE_SETTINGS_URL)
      .then(function (res) { return res.ok ? res.json() : {}; })
      .then(function (doc) {
        var fields = (doc && doc.fields) || {};
        var links = {};
        SOCIAL_PLATFORMS.forEach(function (p) {
          links[p.field] = fields[p.field] ? fields[p.field].stringValue || '' : '';
        });
        try {
          sessionStorage.setItem(SOCIAL_CACHE_KEY, JSON.stringify({ at: Date.now(), links: links }));
        } catch (e) {}
        return links;
      })
      .catch(function () { return {}; });
  }

  function buildSocialMarkup(links) {
    var buttons = SOCIAL_PLATFORMS.map(function (p) {
      var url = validSocialUrl(links[p.field], p.hosts);
      if (!url) return '';
      return '<a class="lg-social-btn" href="' + url.replace(/"/g, '%22') + '"' +
        ' target="_blank" rel="noopener noreferrer" data-lg-track="' + p.track + '"' +
        ' aria-label="' + p.label + '" title="' + p.label + '">' +
        p.icon + '</a>';
    }).join('');
    return buttons ? '<span class="lg-social-label">تابعنا</span>' + buttons : '';
  }

  // صف أسفل القائمة الجانبية (إن وُجدت) + صف في آخر أول تذييل للصفحة
  function initSocial() {
    var targets = Array.prototype.slice.call(document.querySelectorAll('[data-lg-social]'));
    var footer = document.querySelector('footer');
    if (footer && !footer.querySelector('[data-lg-social]')) {
      var row = document.createElement('div');
      row.className = 'lg-social lg-social-footer';
      row.setAttribute('data-lg-social', '');
      row.hidden = true;
      footer.appendChild(row);
      targets.push(row);
    }
    if (!targets.length) return;
    fetchSocialLinks().then(function (links) {
      var html = buildSocialMarkup(links);
      targets.forEach(function (el) {
        el.innerHTML = html;
        el.hidden = !html;
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var drawerRoot = document.querySelector('[data-lg-drawer-root]');
    if (drawerRoot) initDrawer(drawerRoot);

    var miniRoot = document.querySelector('[data-lg-mini-nav-root]');
    if (miniRoot) initMiniNav(miniRoot);

    var homeLinks = document.querySelectorAll('[data-lg-home-link]');
    for (var i = 0; i < homeLinks.length; i++) initHomeLink(homeLinks[i]);

    initSocial();
  });
})();
