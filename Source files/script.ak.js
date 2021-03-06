'use strict';
// -- 웹 페이지 로딩
$(window).on("load", function(e) {
  setTimeout(function() {
    $('#loader').remove()
  }, 300); // 로딩이 완료시
});

const AneOK.boot = {}

AneOK.boot.registerEvents = {
  AneOK.utils.isCategorys();
  AneOK.utils.totalPostNumberReturn();  
}

$(document).ready(function() {
  /* 화면이 모두 로드되고 나면 거의 마지막으로 실행하는 함수 */
	
  // --- 모바일 네비 - 상위버튼
  $('.mobileBtn').click(function() {
    $('.mobileBtn').toggleClass('clicked');
    $('.mobileBtn-nav').toggleClass('show');
	});
	
  // --- 사이드바 화면 고정 및 TOP버튼
  let ibOffset = $('#sidebar').offset();
  $(window).scroll(function() {
    if ($(document).scrollTop() > ibOffset.top) {
      $('#sidebar, .back-to-top, .wrap-inner').addClass('on');
    } else {
      $('#sidebar, .back-to-top, .wrap-inner').removeClass('on');
    };
	});
	
  // --- TOP 버튼 클릭시 
  $('.back-to-top, .wrap-inner, .side-top-btn').click(function() {
    $('html, body').animate({
      scrollTop: 0 // 0 까지 animation 이동합니다. 
    }, 500); // 속도 400 
    return false;
	});
	
  // --- Tabs 스타일 Tabs tag listener (without twitter bootstrap).
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
	
  // --- 새로운 에디터에서 pre찾고 code 추가하기
  $('.entry-content pre.html').children("code:not(.html)").addClass("html");
  $('.entry-content pre.js').children("code:not(.js)").addClass("html");
  $('.entry-content pre.css').children("code:not(.css)").addClass("html");
  $('.entry-content pre.bash').children("code:not(.bash)").addClass("html");
	$('.entry-content pre.json').children("code:not(.json)").addClass("html");
	
});

// -- highlight.min.js 시작
hljs.initHighlightingOnLoad();

// --- 페이지내의 검색 Data
let searchTemplate = "<div class='input-group mb-3'><div class='input-group-prepend'>" +
  "<span class='input-group-text' id='basic-addon1'>검 색</span></div>" +
  "<input type='text' class='form-control' placeholder='여기에 단어를 적으세요' aria-label='단어검색' aria-describedby='basic-addon1'></div>";
$(".table-sieve").sieve({
  searchTemplate: searchTemplate
});
// 페이지내에 keyword 클래스안을 검색합니다. 검색후 나머지 keyword 클래스는 숨깁니다.
$(".p-sieve").sieve({
  searchTemplate: searchTemplate,
  itemSelector: ".keyword"
});
// li 태그 안을 검색합니다. 검색후 나머지 페이지내에 모든 li는 숨깁니다.
$(".p-sieves").sieve({
  searchTemplate: searchTemplate,
  itemSelector: "li"
});

// --- 사이드바 Tab 기능
function openSide(eid, eclass) {
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
};

// --- 사이드바 Toc 부드럽게 특정 위치 이동
function tocHGo(gid) {
  return $('html, body').stop().animate({
    scrollTop: $(gid).offset().top - 65
  }, 50);
};

// --- TOP 버튼 하단 페이지 높이
$(window).on('scroll', function() {
  const contentHeight = document.body.scrollHeight - window.innerHeight;
  let scrollPercent = contentHeight > 0 ? ($(window).scrollTop() / ($(document).outerHeight() - $(window).height())) * 100 : 0;
  $('#s-progress').text(Math.round(scrollPercent) + '%');
});



document.addEventListener('DOMContentLoaded', () => {
  AneOK.registerEvents();
};