/* دليل اللاذقية — إحصائيات الموقع (مشاهدات الصفحات + ضغطات الأزرار المهمة).
   تُرسَل إلى Cloud Function ‏record_site_event (functions/site_stats_logic.py) التي تقبل
   الصفحات والأزرار من قائمتين مغلقتين فقط، وتظهر live في تطبيق الأدمن (إحصائيات الموقع).
     - مشاهدة واحدة لكل صفحة في كل جلسة تصفّح (إعادة التحميل لا تُحسَب مرتين).
     - أي عنصر يحمل data-lg-track="<معرّف>" تُحسَب الضغطة عليه؛ المعرّف يجب أن يكون ضمن
       CLICK_TARGETS في site_stats_logic.py وإلا يُهمَل.
   لا يُرسَل أي شيء عن الزائر نفسه — اسم الصفحة أو الزر فقط. أي فشل صامت ولا يؤثر على الصفحة. */
(function () {
  'use strict';

  var ENDPOINT = 'https://europe-west1-device-streaming-a7432e75.cloudfunctions.net/record_site_event';
  var QUEUE_KEY = 'lg-stats-queue';

  function storage() {
    try { return window.sessionStorage; } catch (e) { return null; }
  }

  function send(data) {
    try {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: data }),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  // ضغطة على رابط ينقل الصفحة نفسها تُؤجَّل للصفحة التالية (قد يُلغى الطلب مع مغادرة الصفحة)
  function enqueue(data) {
    var s = storage();
    if (!s) { send(data); return; }
    try {
      var queue = JSON.parse(s.getItem(QUEUE_KEY) || '[]');
      queue.push(data);
      s.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-10)));
    } catch (e) { send(data); }
  }

  function flushQueue() {
    var s = storage();
    if (!s) return;
    try {
      var queue = JSON.parse(s.getItem(QUEUE_KEY) || '[]');
      s.removeItem(QUEUE_KEY);
      queue.forEach(send);
    } catch (e) {}
  }

  function currentPage() {
    var name = (location.pathname.split('/').pop() || 'index').toLowerCase();
    return name.replace(/\.html$/, '') || 'index';
  }

  function recordView() {
    var page = currentPage();
    var s = storage();
    var key = 'lg-viewed-' + page;
    try {
      if (s && s.getItem(key)) return;
      if (s) s.setItem(key, '1');
    } catch (e) {}
    send({ type: 'view', page: page });
  }

  function leavesPage(el) {
    if (el.tagName !== 'A' || !el.href || el.target === '_blank' || el.hasAttribute('download')) return false;
    try {
      var url = new URL(el.href, location.href);
      return url.origin === location.origin &&
        !(url.pathname === location.pathname && url.hash);
    } catch (e) { return false; }
  }

  // زاحف آلي (webdriver) لا يُحسَب
  if (navigator.webdriver) return;

  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-lg-track]') : null;
    if (!el) return;
    var data = { type: 'click', target: el.getAttribute('data-lg-track') };
    if (leavesPage(el)) enqueue(data);
    else send(data);
  }, true);

  flushQueue();
  recordView();
})();
