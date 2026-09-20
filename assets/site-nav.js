/* دليل اللاذقية — تنقّل مشترك بين كل صفحات الموقع (ملف واحد، بلا تكرار كود).
   يبحث عن حاويات محدَّدة بسمات data- ويملأها:
     [data-lg-drawer-root]   → قائمة جانبية كاملة (وزر فتحها إن لم يوجد زر جاهز)
     [data-lg-mini-nav-root] → شريط روابط مصغّر (للصفحات الرسمية بلا قائمة جانبية)
     [data-lg-home-link]     → يحوّل العنصر (غالباً شعار) إلى رابط للرئيسية */
(function () {
  'use strict';

  var ICON_BASE = 'assets/icons/';

  var NAV_ITEMS = [
    { href: 'index.html', icon: 'icon-home.svg', label: 'الرئيسية' },
    { href: 'download.html', icon: 'icon-download.svg', label: 'تحميل التطبيق' },
    { href: 'about.html', icon: 'icon-about.svg', label: 'من نحن' },
    { href: 'user_guide.html', icon: 'icon-guide.svg', label: 'دليل الاستخدام' },
    { href: 'community-guide.html', icon: 'icon-community.svg', label: 'دليل المجتمع' },
    { href: 'add_place_guide.html', icon: 'icon-add-place.svg', label: 'دليل إضافة مكان' },
    { href: 'manage_place_guide.html', icon: 'icon-settings.svg', label: 'دليل إدارة المكان' },
    { href: 'job_opportunity_guide.html', icon: 'icon-jobs.svg', label: 'دليل إضافة فرصة عمل' },
    { href: 'job_seeker_guide.html', icon: 'icon-job-seeker.svg', label: 'دليل طلب عمل' },
    { href: 'contact.html', icon: 'icon-contact.svg', label: 'تواصل معنا' },
    { href: 'terms_of_use.html', icon: 'icon-terms.svg', label: 'شروط الاستخدام' },
    { href: 'privacy_policy.html', icon: 'icon-privacy.svg', label: 'سياسة الخصوصية' },
    { href: 'claiming_policy.html', icon: 'icon-claiming.svg', label: 'سياسة إثبات الملكية' },
    { href: 'Data-Safety-Declaration.html', icon: 'icon-data-safety.svg', label: 'إقرار أمان البيانات' },
    { href: 'deletion_policy.html', icon: 'icon-deletion.svg', label: 'سياسة حذف البيانات' },
    { href: 'delete-account.html', icon: 'icon-person.svg', label: 'حذف الحساب' }
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
    var items = NAV_ITEMS.map(function (item) {
      var active = item.href.toLowerCase() === page ? ' active' : '';
      return '<a href="' + item.href + '" class="lg-drawer-item' + active + '">' +
        '<img class="lg-drawer-icon" src="' + ICON_BASE + item.icon + '" alt="">' +
        escapeHtml(item.label) + '</a>';
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
      '<div class="lg-drawer-footer">الإصدار 1.0.0 &copy; 2026</div>' +
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

  document.addEventListener('DOMContentLoaded', function () {
    var drawerRoot = document.querySelector('[data-lg-drawer-root]');
    if (drawerRoot) initDrawer(drawerRoot);

    var miniRoot = document.querySelector('[data-lg-mini-nav-root]');
    if (miniRoot) initMiniNav(miniRoot);

    var homeLinks = document.querySelectorAll('[data-lg-home-link]');
    for (var i = 0; i < homeLinks.length; i++) initHomeLink(homeLinks[i]);
  });
})();
