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