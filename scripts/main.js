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


$('.section-5 .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    autoplay: true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:2
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})

new WOW().init();

const header = document.querySelector('.main-menu');

window.addEventListener('scroll', () => {
  // Check how far the user has scrolled vertically
  if (window.scrollY > 130) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
});

// 1. Chọn tất cả các button có class 'scrollBtn'
const buttons = document.querySelectorAll('.scrollForm');

// 2. Lặp qua từng button để gán sự kiện click
buttons.forEach(button => {
  button.addEventListener('click', () => {
    
    // Lấy selector từ thuộc tính data-target (ví dụ: "#section1")
    const targetSelector = button.getAttribute('data-target');
    const target = document.querySelector(targetSelector);
    
    if (target) {
      // Tính toán vị trí giống như cũ
      const targetPosition = target.getBoundingClientRect().top;
      const startPosition = window.scrollY || window.pageYOffset;
      const offset = 230; // Khoảng cách giảm đi (ví dụ: chiều cao của Header)
      const targetY = targetPosition + startPosition - offset;

      // Cuộn mượt mà đến vị trí đã tính
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
  });
});

// $("#modal-sucess").fancybox().trigger('click');


/* =========================================================
   DFC — Gửi form đăng ký về Google Sheet (qua Apps Script)
   ========================================================= */
(function () {
  // ====== CẤU HÌNH ======
  // Dán URL Web App của Apps Script vào đây sau khi deploy:
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXmjoXnExndyvbqa3U5fqKOHFRRAC_uPZGTqMDWAG6CnArUntKQjJUSzxr82kwdGVe/exec';
  var TOKEN = 'dfc-cd79eacaf9a25204eab4cd09'; // trùng với TOKEN trong dfc-apps-script.gs
  // ======================

  var form = document.getElementById('dfcForm');
  if (!form) return;
  var btn = document.getElementById('dfcSubmit');

  // Viết hoa chữ cái đầu mỗi từ: "nguyễn thị hoa" -> "Nguyễn Thị Hoa"
  function titleCase(s) {
    return s.trim().replace(/\s+/g, ' ')
      .split(' ')
      .map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); })
      .join(' ');
  }
  // Làm sạch + quy số ĐT VN về 0xxxxxxxxx
  function normalizePhone(p) {
    var s = String(p).replace(/[^\d+]/g, '');
    if (s.indexOf('+84') === 0) s = '0' + s.slice(3);
    else if (s.indexOf('84') === 0 && s.length === 11) s = '0' + s.slice(2);
    return s;
  }
  function isValidPhone(p) { return /^0[35789]\d{8}$/.test(p) || /^0[2]\d{8,9}$/.test(p); }
  function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

  function showErr(field, on) {
    var el = form.querySelector('.error[data-for="' + field + '"]');
    if (el) el.style.display = on ? 'block' : 'none';
  }
  function val(id) { return (document.getElementById(id).value || '').trim(); }
  function showLoading(on) {
    var el = document.getElementById('dfcLoading');
    if (el) el.classList.toggle('show', on);
  }
  function openModal(sel, fallbackMsg) {
    if (window.jQuery && jQuery.fancybox) {
      jQuery.fancybox.open({ src: sel, type: 'inline' });
    } else {
      alert(fallbackMsg);
    }
  }

  btn.addEventListener('click', function () {
    // 1. Đọc + tự làm sạch
    var name = titleCase(val('dfc-name'));
    var phone = normalizePhone(val('dfc-phone'));
    var email = val('dfc-email');
    var unit = val('dfc-unit');
    var question = val('dfc-question');
    document.getElementById('dfc-name').value = name;   // hiển thị lại bản đã format
    document.getElementById('dfc-phone').value = phone;

    // 2. Validate
    var ok = true;
    if (!name) { showErr('name', true); ok = false; } else showErr('name', false);
    if (!isValidPhone(phone)) { showErr('phone', true); ok = false; } else showErr('phone', false);
    if (!isValidEmail(email)) { showErr('email', true); ok = false; } else showErr('email', false);
    if (!unit) { showErr('unit', true); ok = false; } else showErr('unit', false);
    if (!ok) return;

    // 3. Gửi (KHÔNG set Content-Type json -> tránh CORS preflight)
    btn.disabled = true;
    showLoading(true);   // hiện overlay "Đang gửi..."
    var payload = {
      token: TOKEN, name: name, phone: phone, email: email,
      unit: unit, question: question, website: val('dfc-website')
    };
    fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        showLoading(false);   // ẩn overlay trước khi hiện kết quả
        if (data.result === 'ok') {
          form.reset();
          openModal('#modal-sucess', 'Cảm ơn bạn đã đăng ký thông tin!');
        } else {
          openModal('#modal-error', 'Có lỗi xảy ra, vui lòng liên hệ DFC qua Facebook hoặc email dfc@tomato.edu.vn');
        }
      })
      .catch(function () { showLoading(false); openModal('#modal-error', 'Có lỗi xảy ra, vui lòng liên hệ DFC qua Facebook hoặc email dfc@tomato.edu.vn'); })
      .finally(function () { btn.disabled = false; });
  });
})();