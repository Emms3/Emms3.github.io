$(function() {
  var scrolling = false;
  var currentPos = 0;

  $(document).ready(function() {
    for (var i = 0; i < $('.scrollTo').length; i++) {
      var elm = $('.scrollTo')[i];
      if ($(document).scrollTop() >= $(elm).offset().top) {
        currentPos = i;
      }
    }
    $(document).bind('DOMMouseScroll', function(e) {
      if (e.originalEvent.detail > 0) {
        scrollDown();
      } else {
        scrollUp();
      }
      return false;
    });

    $(document).bind('mousewheel', function(e) {
      if (e.originalEvent.wheelDelta < 0) {
        scrollDown();
      } else {
        scrollUp();
      }
      return false;
    });
  });

  function scrollUp() {
    if (!scrolling && currentPos > 0) {
      scrolling = true;
      currentPos--;
      var scrollToElement = $('.scrollTo')[currentPos];
      $('html, body').animate({
        scrollTop: $(scrollToElement).offset().top
      }, 2100, function() {
        scrolling = false;
      });
    }
  }

  function scrollDown() {
    if (!scrolling && currentPos < $('.scrollTo').length - 1) {
      scrolling = true;
      currentPos++;
      var scrollToElement = $('.scrollTo')[currentPos];
      $('html, body').animate({
        scrollTop: $(scrollToElement).offset().top
      }, 2100, function() {
        scrolling = false;
      });
    }
  }

  $('.section-1').click(function() {
    scrollDown();
  });

  function scrollFade() {
    var section1 = $('.section-1');
    section1.animate({
      opacity: '1'
    }, 1000);
    section1.animate({
      opacity: '0.09'
    }, 1000, scrollFade);
  }
  scrollFade();

  $(window).scroll(function() {
    var wScroll = $(window).scrollTop();
    // to be implemented
    // if greater than 500 -->
    // if in the range of the nexts --> remove shown,
    // when scroll back --> addClass
    if (wScroll < 825) {
      $('.address').hide().text('الرئيسية').fadeIn(500);;
      $('.menu').css('color', 'white');
      $('.address').css('color', 'white');
      $('.fa-bars').css('border', '1px solid white');
      $('.address').removeClass('fa fa-code fa-2x');
    }
    if (wScroll > 500) {
      $('.main-2-container').addClass('shown');
      $('.menu').css('color', 'white');
      $('.address').css('color', 'white');
      $('.fa-bars').css('border', '1px solid white');
      $('.address').text('').hide();
      $('.address').addClass('fa fa-code fa-2x').fadeIn(500);;

      // <i class="fa fa-code" aria-hidden="true"></i>
    }
    if (wScroll > 1311) {
      $('.main-3-container').addClass('shown');
      $('.menu').css('color', 'whitesmoke');
      // $('.address').css('color', 'blue');
      $('.address').text('');
      $('.address').removeClass('fa-code');
    }
    if (wScroll > 2385) {
      // $('.address').hide();
      $('.menu').css('color', 'white');
      $('.address').css('color', 'white');
      $('.fa-bars').css('border', '1px solid white');

      $('.address').removeClass('fa');
      $('.address').removeClass('fa-2x');
      $('.address').text('معرض أعمالي').fadeIn(500);
      console.log(wScroll);

    }

    if(wScroll > 3303) {
      // $('.menu').css('color', 'white');
      $('.address').text('Resume').css('color', 'black');
    }
    // control
  });

  $('.fa-bars').click(function() {
    // $('body').css('transform', 'translateX(-500px)');
  })
});
