/* دليل اللاذقية — يحدّد الوضع (ليلي/نهاري) فوراً قبل أي رسم للصفحة لتفادي وميض
   لون خاطئ. ليس مؤجَّلاً (defer) عمداً: يجب أن يُنفَّذ قبل تحميل dark-theme.css.
   الافتراضي: وضع جهاز الزائر (prefers-color-scheme). يتغلّب عليه فقط اختيار
   يدوي محفوظ سابقاً من زر تبديل الوضع في القائمة الجانبية. */
(function () {
  try {
    var saved = localStorage.getItem('lg-theme');
    var theme = (saved === 'light' || saved === 'dark')
      ? saved
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
