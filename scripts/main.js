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