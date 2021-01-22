// 목차 출력 - h2로 시작해야 보임
$(function() {$('#scrollspy').DynamicScrollspy({tH: 2,bH: 4,genIDs: true,hMark: false});});

// QRCode
let qrcode = new QRCode(document.getElementById("post-qrcode"), {
  text: "https://aneok.tistory.com" + $QRCodeURL,
  width: 53, height: 53, colorDark : "#000000", colorLight : "#ffffff", correctLevel : QRCode.CorrectLevel.L
});

// -- 버전 출력
const $ve = "<img src='https://img.shields.io/badge/" + AneOKBlog.NAME + "-" + AneOKBlog.VERSION + "-4a65f6.svg'> " +
	"<img src='https://img.shields.io/badge/jquery-" + VERSION.JQUERY +
	"-red.svg'> <img src='https://img.shields.io/badge/Iconfont-" + VERSION.ICONFONT +
	"-d9534f.svg'> <img src='https://img.shields.io/badge/DynamicScrollspy-" + VERSION.DYNAMIC_SCROLLSPY +
	"-214a74.svg'> <img src='https://img.shields.io/badge/HighlightJs-" + VERSION.HIGHLIGHT_JS + "-660000.svg'><br /><img src='https://img.shields.io/badge/Bootstrap CSS-" + VERSION.BOOTSTRAP_CSS + "-8a13fd.svg'> <img src='https://img.shields.io/badge/Bootstrap JS-" + VERSION.BOOTSTRAP_JS + "-563d7c.svg'>";
$("#blog-logo-ver").html(AneOKBlog.NAME + " <small>blog " + AneOKBlog.LOGO_VERSION + "</small>"),
	$(".blog-logover").html(AneOKBlog.LOGO_VERSION),
	$(".blog-version").html(AneOKBlog.VERSION),
	$(".blog-update").html(AneOKBlog.UPDATE),
	$(".blog-build").html(AneOKBlog.BUILD),
	$(".versionView").html($ve);
	
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