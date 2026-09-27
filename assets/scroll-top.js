/* دليل اللاذقية — زر «العودة للأعلى» بنفس رسم ومنطق التطبيق
   (ic_scroll_to_top + bg_scroll_to_top + HomeFragment.btnScrollToTop):
     - الصفحة فيها فهرس (.toc-card أو nav.toc): يظهر بعد تجاوز الفهرس ويعيدك إليه.
     - بلا فهرس: يظهر بعد تمرير شاشة كاملة ويعيدك إلى أعلى الصفحة.
     - يظهر أثناء التمرير ويختفي بعد ثانيتين من توقّفه (كالتطبيق)، ولا يختفي والمؤشر
       أو التركيز عليه. ملف مستقل بأنماطه، فيعمل حتى في الصفحات التي لا تحمّل site-nav. */
(function () {
  'use strict';

  var HIDE_DELAY_MS = 2000;
  var GAP_PX = 8;

  var CSS =
    '.lg-scroll-top{position:fixed;left:16px;bottom:calc(24px + env(safe-area-inset-bottom,0px));' +
    'z-index:900;width:48px;height:48px;padding:12px;box-sizing:border-box;border-radius:50%;' +
    'border:2px solid #fff;background:linear-gradient(180deg,#64B5F6,#1976D2);cursor:pointer;' +
    'display:flex;align-items:center;justify-content:center;' +
    'box-shadow:0 6px 16px rgba(13,71,161,.35),0 2px 4px rgba(0,0,0,.2);' +
    'opacity:0;transform:scale(.5);visibility:hidden;-webkit-tap-highlight-color:transparent;' +
    'transition:opacity .3s ease,transform .3s ease,visibility 0s linear .3s}' +
    '.lg-scroll-top.show{opacity:1;transform:scale(1);visibility:visible;' +
    'transition:opacity .3s ease,transform .3s ease,visibility 0s}' +
    '.lg-scroll-top:hover{filter:brightness(1.08)}' +
    '.lg-scroll-top:active{transform:scale(.92)}' +
    '.lg-scroll-top:focus-visible{outline:3px solid #FFD54F;outline-offset:2px}' +
    '.lg-scroll-top svg{width:100%;height:100%;display:block}' +
    '@media (prefers-reduced-motion:reduce){.lg-scroll-top,.lg-scroll-top.show{transition:none}}';

  // ic_scroll_to_top.xml حرفياً
  var ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12,19V5M5.5,11.5L12,5l6.5,6.5"/></svg>';

  function init() {
    var toc = document.querySelector('.toc-card, nav.toc');

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var label = toc ? 'العودة إلى الفهرس' : 'العودة إلى الأعلى';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lg-scroll-top';
    btn.setAttribute('aria-label', label);
    btn.title = label;
    btn.tabIndex = -1;
    btn.innerHTML = ICON;
    document.body.appendChild(btn);

    var visible = false;
    var hideTimer = null;
    var hovered = false;

    function smooth() {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto' : 'smooth';
    }

    // ارتفاع أي ترويسة ثابتة أعلى الشاشة (sticky/fixed) — مقابل stickyOffset في التطبيق
    function topOverlayHeight() {
      var h = 0;
      var candidates = document.querySelectorAll('header, .header');
      for (var i = 0; i < candidates.length; i++) {
        var el = candidates[i];
        var pos = getComputedStyle(el).position;
        if (pos !== 'sticky' && pos !== 'fixed') continue;
        var r = el.getBoundingClientRect();
        if (r.top <= 0 && r.bottom > 0) h = Math.max(h, r.bottom);
      }
      return h;
    }

    function pastThreshold() {
      if (toc) return toc.getBoundingClientRect().bottom < topOverlayHeight();
      return window.scrollY > window.innerHeight;
    }

    function show() {
      if (!visible) {
        visible = true;
        btn.classList.add('show');
        btn.tabIndex = 0;
      }
    }

    function hide() {
      if (visible) {
        visible = false;
        btn.classList.remove('show');
        btn.tabIndex = -1;
      }
    }

    function scheduleHide() {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        if (!hovered && document.activeElement !== btn) hide();
      }, HIDE_DELAY_MS);
    }

    var lastY = window.scrollY;
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var y = window.scrollY;
        if (pastThreshold()) {
          if (y !== lastY) {
            show();
            scheduleHide();
          }
        } else {
          clearTimeout(hideTimer);
          hide();
        }
        lastY = y;
      });
    }

    btn.addEventListener('mouseenter', function () { hovered = true; clearTimeout(hideTimer); });
    btn.addEventListener('mouseleave', function () { hovered = false; if (visible) scheduleHide(); });
    btn.addEventListener('blur', function () { if (visible) scheduleHide(); });

    btn.addEventListener('click', function () {
      if (toc) {
        var top = toc.getBoundingClientRect().top + window.scrollY - topOverlayHeight() - GAP_PX;
        window.scrollTo({ top: Math.max(0, top), behavior: smooth() });
        // نقل التركيز للفهرس لمستخدمي لوحة المفاتيح وقارئات الشاشة
        if (!toc.hasAttribute('tabindex')) toc.setAttribute('tabindex', '-1');
        try { toc.focus({ preventScroll: true }); } catch (e) {}
      } else {
        window.scrollTo({ top: 0, behavior: smooth() });
      }
      hovered = false;
      clearTimeout(hideTimer);
      hide();
    });

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
