'use strict';

/* HELPER: Checks Whether an Element Exists
----------------------------------------------------------------------------------------------------*/
(function( $ ) {

  $.fn.extend({
    exists: function() {
      if ( this.length > 0 ) {
        return true;
      } else {
        return false;
      }
    }
  });

})( jQuery );



jQuery(document).on("ready",function () {
    
});

const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const fmt = n => n.toLocaleString('vi-VN');
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = parseFloat(el.dataset.count);
      const plain = el.dataset.plain === '1', suffix = el.dataset.suffix || '';
      const decimals = (target % 1 !== 0) ? 1 : 0;
      let cur = 0; const inc = target / 55;
      const render = v => { el.textContent = (plain ? String(Math.round(v)) : (decimals ? v.toFixed(1) : fmt(Math.floor(v)))) + suffix; };
      const tick = () => { cur += inc; if (cur < target) { render(cur); requestAnimationFrame(tick); } else render(target); };
      tick(); cObs.unobserve(el);
    });
  }, { threshold: .6 });
  document.querySelectorAll('[data-count]').forEach(c => cObs.observe(c));