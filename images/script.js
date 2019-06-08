function openSide(el) {
  var i;
  var x = document.getElementsByClassName("sides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(el).style.display = "block";  
}

function openbottom(el) {
  var i;
  var x = document.getElementsByClassName("fbottom");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(el).style.display = "block";  
}

$( document ).ready( function() {
var ibOffset = $( '.sidebar' ).offset();
  $( window ).scroll( function() {
    if ( $( document ).scrollTop() > ibOffset.top ) {
      $( '.sidebar' ).addClass( 'sidebar-affix' );
      $( '.backtotop' ).addClass( 'on' );
      $( '.toc-backtotop' ).addClass( 'on' );
    }
    else {
      $( '.sidebar' ).removeClass( 'sidebar-affix' );
      $( '.backtotop' ).removeClass( 'on' );
      $( '.toc-backtotop' ).removeClass( 'on' );
    }
  });
});

$(document).ready(function() {
  var offset = 420;
  var duration = 500;
  var $window = $(window);
  var documentHeight = $(document).height();
  var windowHeight = $window.height();
  var scrollTop = $window.scrollTop();

  jQuery(window).scroll(function() {
  if (jQuery(this).scrollTop() > offset) {
      jQuery('.back-to-top').fadeIn();
      scrollTop = $(window).scrollTop();
      var scrollPercent = (scrollTop) / (documentHeight - windowHeight);
      $("#sTop").html(isNaN(scrollPercent) ? 0 : Math.round(scrollPercent * 100)+"%");
    } else {
        jQuery('.back-to-top').fadeOut();
    }
  });
  jQuery('.back-to-top').click(function(event) {
    event.preventDefault();
    jQuery('html, body').animate({scrollTop: 0}, duration);
    return false;
  });
  jQuery('.backtotop').click(function(event) {
    event.preventDefault();
    jQuery('html, body').animate({scrollTop: 0}, duration);
    return false;
  });
});

/**
 * Tabs tag listener (without twitter bootstrap).
 */
$(document).ready(function() {
  var tNav = '.tabs ul.nav-tabs ';

  // Binding `nav-tabs` & `tab-content` by real time permalink changing.
  $(function() {
    $(window).bind('hashchange', function() {
      var tHash = location.hash;
      if (tHash !== '' && !tHash.match(/%\S{2}/)) {
        $(tNav + 'li:has(a[href="' + tHash + '"])').addClass('active').siblings().removeClass('active');
        $(tHash).addClass('active').siblings().removeClass('active');
      }
    }).trigger('hashchange');
  });

  $(tNav + '.tab').on('click', function(href) {
    href.preventDefault();
    // Prevent selected tab to select again.
    if (!$(this).hasClass('active')) {

      // Add & Remove active class on `nav-tabs` & `tab-content`.
      $(this).addClass('active').siblings().removeClass('active');
      var tActive = $(this).find('a').attr('href');
      $(tActive).addClass('active').siblings().removeClass('active');

      // Clear location hash in browser if #permalink exists.
      if (location.hash !== '') {
        history.pushState('', document.title, window.location.pathname + window.location.search);
      }
    }
  });
});

// TOC

$(document).ready(function() {

  function initScrollSpy() {
    var tocSelector = '.post-toc';
    var $tocElement = $(tocSelector);
    var activeCurrentSelector = '.active-current';

    function removeCurrentActiveClass() {
      $(tocSelector + ' ' + activeCurrentSelector)
        .removeClass(activeCurrentSelector.substring(1));
    }

    $tocElement
      .on('activate.bs.scrollspy', function() {
        var $currentActiveElement = $(tocSelector + ' .active').last();

        removeCurrentActiveClass();
        $currentActiveElement.addClass('active-current');

        // Scrolling to center active TOC element if TOC content is taller then viewport.
        $tocElement.scrollTop($currentActiveElement.offset().top - $tocElement.offset().top + $tocElement.scrollTop() - ($tocElement.height() / 2));
      })
      .on('clear.bs.scrollspy', removeCurrentActiveClass);

    $('body').scrollspy({ target: tocSelector });
  }

  initScrollSpy();
});

// 사이드바 TAB버튼 
$(document).ready(function() {
  var html = $('html');
  var TAB_ANIMATE_DURATION = 200;
  var hasVelocity = $.isFunction(html.velocity);

  $('.sidebar-nav li').on('click', function() {
    var item = $(this);
    var activeTabClassName = 'sidebar-nav-active';
    var activePanelClassName = 'sidebar-panel-active';
    if (item.hasClass(activeTabClassName)) {
      return;
    }

    var currentTarget = $('.' + activePanelClassName);
    var target = $('.' + item.data('target'));

    hasVelocity
      ? currentTarget.velocity('transition.slideUpOut', TAB_ANIMATE_DURATION, function() {
        target
          .velocity('stop')
          .velocity('transition.slideDownIn', TAB_ANIMATE_DURATION)
          .addClass(activePanelClassName);
      })
      : currentTarget.animate({ opacity: 0 }, TAB_ANIMATE_DURATION, function() {
        currentTarget.hide();
        target
          .stop()
          .css({'opacity': 0, 'display': 'block','transform': 'translateY(0px)'})
          .animate({ opacity: 1 }, TAB_ANIMATE_DURATION, function() {
            currentTarget.removeClass(activePanelClassName);
            target.addClass(activePanelClassName);
          });
      });

    item.siblings().removeClass(activeTabClassName);
    item.addClass(activeTabClassName);
  });

});

// 전체 카테고리 중 전체 포스트숫자 리턴
$(document).ready(function() {
  var $category = $('.link_tit .c_cnt');

  var $cnt = $category.text();
  var $cnt_num = $cnt.substr(1 , $cnt.length - 2);
        
  $('.category-cnt-num').append($cnt_num);  
});

$(document).ready(function() {
  // 글 출력이 있는 경우 썸네일 제목 배경 표시
  if ($('#post').length != false) {
    var seoImage = $('meta[property="og:image"]').attr('content');
    var seoArticleSection = $('meta[property="article:section"]').attr('content');
    if (seoImage != undefined && seoImage != false) {
      $('.group-border .inner_header').css({
        "background-image": "url(" + seoImage + ")"
      });
      $('.group-border').addClass('group_cover');
      $('.asection').html(seoArticleSection);
    } else {
      $('.group-border').addClass('group_common');
      $('.asection').html(seoArticleSection);
    }
  }    
});