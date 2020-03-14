'use strict';

// -- 웹 페이지 로딩
document.body.setAttribute('class', 'loaded');
setTimeout(function () {
  return document.getElementById('loader').remove();
}, 500);

$(document).ready(function() {  /* 화면이 모두 로드되고 나면 거의 마지막으로 실행하는 함수 */
	// -- 버전 출력
	$("#blog-logo-ver").html("AneOK <small>blog " + blogInfo.logoVer + "</small>");

	// --- 모바일 네비 - 전체 카테고리 중 첫번째 카테고리 값 만을 가져와서 뿌려줍니다.
	var $thisCategory = '';
	var $thisMenu = '';
	$('.tt_category').find('.category_list>li>a').each(function () {  // each 반복문, find 찾기
		var array = $(this).text().split('(');
		$thisCategory += '<li><a href="' + $(this).attr('href') + '">' + array[0] + '<small class="xcnt">(' + array[1] + '</small></a></li>';
		$('.category-side-list').html($thisCategory);
	});
	$('#head-nav').find('li a').each(function () {
		$thisMenu += '<li><a href="' + $(this).attr('href') + '">' + $(this).text() + '</a></li>';
		$('.menu-side-list').html($thisMenu);
	});	

	// --- 모바일 네비 - 상위버튼
	$('.mobileBtn').click(function(){
		$('.mobileBtn').toggleClass('clicked');
		$('.mobileBtn-nav').toggleClass('show');
	});

  // --- 전체 카테고리 중 전체 포스트숫자 리턴
	var $category = $('#category-top-list .link_tit .c_cnt');
	var $cnt = $category.text();
	var $cnt_num = $cnt.substr(1 , $cnt.length - 2);        
	$('.category-cnt-num').append($cnt_num);

		// --- 버전 출력 
	$(".blog-logover").html(blogInfo.logoVer);
	$(".blog-version").html(blogInfo.version);
	$(".blog-update").html(blogInfo.update);
	$(".blog-build").html(blogInfo.Build);	
	var ve = "<img src='https://img.shields.io/badge/" + blogInfo.name + " Blog-v" + blogInfo.version + "-4a65f6.svg'> " +
					 "<img src='https://img.shields.io/badge/jquery-" + dependenciesVer.jquery + " -red.svg'> <img src='https://img.shields.io/badge/Bootstrap-" + dependenciesVer.Bootstrap + 
					 "-563d7c.svg'> <img src='https://img.shields.io/badge/Iconfont IcoMoon-" + dependenciesVer.iconFont + 
					 "-d9534f.svg'> <img src='https://img.shields.io/badge/DynamicScrollspy-" + dependenciesVer.DynamicScrollspy + "-214a74.svg'>";
	$(".versionView").html(ve);

	// --- 사이드바 화면 고정 및 TOP버튼
	var ibOffset = $('#sidebar').offset();
	$(window).scroll(function() {
	    if ($(document).scrollTop() > ibOffset.top) {
	      $('#sidebar').addClass('sidebar-affix');
	      $('.back-to-top').addClass('on');
	      $('.wrap-inner').addClass('on');
	    } else {
	      $('#sidebar').removeClass('sidebar-affix');
	      $('.back-to-top').removeClass('on');
	      $('.wrap-inner').removeClass('on');
	    };
	});

	// --- TOP 버튼 클릭시 
	$('.back-to-top, .wrap-inner, .side-top-btn').click(function() { 
		$('html, body').animate({ 
		scrollTop : 0 // 0 까지 animation 이동합니다. 
		}, 500); // 속도 400 
	return false; 
	});

	// --- Tabs 스타일 Tabs tag listener (without twitter bootstrap).
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

// -- highlight.min.js 시작
hljs.initHighlightingOnLoad();

// --- 페이지내의 검색 Data
var searchTemplate = "<div class='input-group mb-3'><div class='input-group-prepend'>" + 
"<span class='input-group-text' id='basic-addon1'>검 색</span></div>" + 
"<input type='text' class='form-control' placeholder='여기에 단어를 적으세요' aria-label='단어검색' aria-describedby='basic-addon1'></div>";
$(".table-sieve").sieve({searchTemplate: searchTemplate	});
// 페이지내에 keyword 클래스안을 검색합니다. 검색후 나머지 keyword 클래스는 숨깁니다.
$(".p-sieve").sieve({searchTemplate: searchTemplate,  itemSelector: ".keyword"});
// li 태그 안을 검색합니다. 검색후 나머지 페이지내에 모든 li는 숨깁니다.
$(".p-sieves").sieve({searchTemplate: searchTemplate, itemSelector: "li"});

// --- 사이드바 Tab 기능
function openSide(eid,eclass) {
  var n = document.getElementsByClassName(eclass);
  for (var i = 0; i < n.length; i++) {
    n[i].style.display = "none";  
  };
  if(eid === 'overview-wrap') { 
  	$('.sidebar-nav-overview').addClass('sidebar-nav-active');
  	$('.sidebar-nav-toc').removeClass('sidebar-nav-active');
  } else if(eid === 'toc-wrap') {
    $('.sidebar-nav-overview').removeClass('sidebar-nav-active');
  	$('.sidebar-nav-toc').addClass('sidebar-nav-active');	
  };
  document.getElementById(eid).style.display = "block";  
};

// --- 사이드바 Toc 부드럽게 특정 위치 이동
function tocHGo(gid) {
	return $('html, body').stop().animate({
		scrollTop:$(gid).offset().top - 65
	}, 50);
};

// --- TOP 버튼 하단 페이지 높이
$(window).on('scroll', function(){
  var currentPercentage = ($(window).scrollTop() / ($(document).outerHeight() - $(window).height())) * 100;
  $('#s-progress').text(Math.round(currentPercentage)+'%');
});
