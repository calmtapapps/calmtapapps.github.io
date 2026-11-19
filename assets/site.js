(function () {
  var root = document.documentElement;

  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.lang = lang;
    var t = document.querySelector('title');
    if (t && t.dataset[lang]) document.title = t.dataset[lang];
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
  }

  setLang(root.getAttribute('data-lang') || 'en');

  document.querySelectorAll('.lang-switch button').forEach(function (b) {
    b.addEventListener('click', function () {
      setLang(b.dataset.lang);
      try { localStorage.setItem('calmtap-lang', b.dataset.lang); } catch (e) {}
    });
  });

  // Support page: switch between apps
  var chips = document.querySelectorAll('.chip[data-app]');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (o) {
        var on = o === c;
        o.setAttribute('aria-pressed', on ? 'true' : 'false');
        var panel = document.getElementById('app-' + o.dataset.app);
        if (panel) panel.hidden = !on;
      });
    });
  });
})();
