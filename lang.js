// Sprache: ?lang=…, sonst die des Browsers (Deutsch, Englisch, Französisch, Spanisch), sonst Englisch.
(function () {
  var langs = ['de', 'en', 'fr', 'es'];
  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (langs.indexOf(q) >= 0) return q;
    var nav = (navigator.languages || [navigator.language || 'en']);
    for (var i = 0; i < nav.length; i++) {
      var c = String(nav[i]).slice(0, 2).toLowerCase();
      if (langs.indexOf(c) >= 0) return c;
    }
    return 'en';
  }
  function set(l) {
    document.documentElement.setAttribute('data-lang', l);
    document.documentElement.lang = l;
    document.querySelectorAll('.langs button').forEach(function (b) { b.classList.toggle('on', b.dataset.set === l); });
    document.querySelectorAll('nav a, a.brand').forEach(function (a) {
      a.href = a.getAttribute('href').split('?')[0] + '?lang=' + l;
    });
  }
  document.querySelectorAll('.langs button').forEach(function (b) {
    b.addEventListener('click', function () {
      set(b.dataset.set);
      history.replaceState(null, '', location.pathname + '?lang=' + b.dataset.set);
    });
  });
  set(pick());
})();
