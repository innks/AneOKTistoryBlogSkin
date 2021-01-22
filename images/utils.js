'use strict';

const AneOK = {};

AneOK.utils = {

  // --- 모바일 네비 - 전체 카테고리 중 첫번째 카테고리 값 만을 가져와서 뿌려줍니다.
  isCategorys: function() {
    let $thisCategory = '';
    let $thisMenu = '';
    $('.tt_category').find('.category_list>li>a').each(function() { // each 반복문, find 찾기
      let array = $(this).text().split('(');
      $thisCategory += '<li><a href="' + $(this).attr('href') + '">' + array[0] + '<small class="xcnt">(' + array[1] + '</small></a></li>';
      $('.category-side-list').html($thisCategory);
    });
    $('#head-nav').find('li a').each(function() {
      $thisMenu += '<li><a href="' + $(this).attr('href') + '">' + $(this).text() + '</a></li>';
      $('.menu-side-list').html($thisMenu);
    });
  },

  // --- 사이드바 Tab 기능
  openSide: function(eid, eclass) {
    let n = document.getElementsByClassName(eclass);
    for (let i = 0; i < n.length; i++) {
      n[i].style.display = "none";
    };
    if (eid === 'overview-wrap') {
      $('.sidebar-nav-overview').addClass('sidebar-nav-active');
      $('.sidebar-nav-toc').removeClass('sidebar-nav-active');
    } else if (eid === 'toc-wrap') {
      $('.sidebar-nav-overview').removeClass('sidebar-nav-active');
      $('.sidebar-nav-toc').addClass('sidebar-nav-active');
    };
    document.getElementById(eid).style.display = "block";
  },

  // --- 전체 카테고리 중 전체 포스트숫자 리턴
  totalPostNumberReturn: function () {
    const $cnt = $('#category-top-list .link_tit .c_cnt').text();
    const $cnt_num = $cnt.substr(1, $cnt.length - 2);
    $('.category-cnt-num').append($cnt_num);
  },

  // --- Tabs 스타일 Tabs tag listener (without twitter bootstrap).
  registerTabsTag: function() {
    document.querySelectorAll('.tabs ul.nav-tabs').forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        // Prevent selected tab to select again.
        if (element.classList.contains('active')) return;
        // Add & Remove active class on `nav-tabs` & `tab-content`.
        [...element.parentNode.children].forEach(target => {
          target.classList.toggle('active', target === element);
        });
        // https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
        const tActive = document.getElementById(element.querySelector('a').getAttribute('href').replace('#', ''));
        [...tActive.parentNode.children].forEach(target => {
          target.classList.toggle('active', target === tActive);
        });
        // Trigger event
        tActive.dispatchEvent(new Event('tabs:click', {
          bubbles: true
        }));
      });
    });

    window.dispatchEvent(new Event('tabs:register'));
  },

  // --- 새로운 에디터에서 pre찾고 code가 없으면 code추가하기
  newEditPreAddCode: function() {
    $('.entry-content pre.html').children("code:not(.html)").addClass("html");
    $('.entry-content pre.js').children("code:not(.js)").addClass("js");
    $('.entry-content pre.css').children("code:not(.css)").addClass("css");
    $('.entry-content pre.bash').children("code:not(.bash)").addClass("bash");
    $('.entry-content pre.json').children("code:not(.json)").addClass("json");
  },

  // --- 모바일 네비 - 상위버튼클릭시
  mobileTopButton: function () {
    $('.mobileBtn').click(() => {
      $('.mobileBtn').toggleClass('clicked');
      $('.mobileBtn-nav').toggleClass('show');
    });
  },

  // --- 사이드바 화면 고정 및 TOP버튼 보이기/숨기기
  sidebarScrollTopView: function() {    
    let ibOffset = $('#sidebar').offset();
    $(window).scroll(function() {
      if ($(document).scrollTop() > ibOffset.top) {
        $('#sidebar, .back-to-top, .wrap-inner').addClass('on');
      } else {
        $('#sidebar, .back-to-top, .wrap-inner').removeClass('on');
      };
    });
    // --- TOP 버튼 하단 페이지 높이
    $(window).on('scroll', function() {
      const contentHeight = document.body.scrollHeight - window.innerHeight;
      let scrollPercent = contentHeight > 0 ? ($(window).scrollTop() / ($(document).outerHeight() - $(window).height())) * 100 : 0;
      $('#s-progress').text(Math.round(scrollPercent) + '%');
    });
  },

  // --- TOP 버튼 클릭시 이동
  clickButttonTop: function() {
    $('.back-to-top, .wrap-inner, .side-top-btn').click(() => {
      $('html, body').animate({
        scrollTop: 0 // 0 까지 animation 이동합니다. 
      }, 500); // 속도 400 
      return false;
    });
  },

    // --- Tabs 스타일 Tabs tag listener (without twitter bootstrap).
  registerTabsTag: function() {
    const tNav = '.tabs ul.nav-tabs ';
    // Binding `nav-tabs` & `tab-content` by real time permalink changing.
    $(function() {
      $(window).bind('hashchange', function() {
        let tHash = location.hash;
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
        let tActive = $(this).find('a').attr('href');
        $(tActive).addClass('active').siblings().removeClass('active');
        // Clear location hash in browser if #permalink exists.
        if (location.hash !== '') {
          history.pushState('', document.title, window.location.pathname + window.location.search);
        }
      }
    });
  },

  // --- 사이드바 Toc 부드럽게 특정 위치 이동
  tocHGo: function(gid) {
    return $('html, body').animate({
      scrollTop: $(gid).offset().top - 65
    }, 500);
  },

  // 접은글 텍스트 변경 스크립트 
  newEditFoldingTitleChange: function () {  
    $(".btn-toggle-moreless").each( () => { 
      let text_more = $(this).parent().first().data("text-more"); 
      let text_less = $(this).parent().first().data("text-less"); 
      $(this).text(text_more); 
      $(this).on("click", () => $(this).text() == text_less ? $(this).text(text_less) : $(this).text(text_more)); 
    });
  }

};

document.addEventListener('DOMContentLoaded', () => {

  AneOK.utils.isCategorys();
  AneOK.utils.totalPostNumberReturn();
  AneOK.utils.registerTabsTag();
  AneOK.utils.newEditPreAddCode();
  AneOK.utils.mobileTopButton();
  AneOK.utils.sidebarScrollTopView();
  AneOK.utils.clickButttonTop();
  AneOK.utils.registerTabsTag();
  AneOK.utils.newEditFoldingTitleChange();

  // -- highlight.min.js 시작
  hljs.initHighlightingOnLoad();

});

// -- 웹 페이지 로딩
$(window).on("load", (e) => setTimeout(() => $('#loader').remove(), 300)); // 로딩이 완료시 300 카운터 후 삭제



