function MovieList() {
	for (var i = 0; i < movie.length; i++) {
		var Opentime, OpenDate;
		if(movie[i][10] == 1) {OpenDate= '제작';Opentime = '편성';}
		else {OpenDate= '개봉';Opentime = '시간';}

		var el = '<li class="col-sm-6 col-md-4 mb-45 keyword"><div class="poster"><div class="inline-clip transition-toggle">';
		if(movie[i][11] == 1) el = el + '<div class="dday">추천 <span>★</span></div>';

		el = el + '<img src="'+ movie[i][2] +'" alt>' +
		'<div class="transition-slide-bottom position-bottom overlay overlay-default slide">' +
		'<p class="margin-0 title25">' + movie[i][0] + '</p><hr>' +
		'<p class="mt-0 mb-0"><span class="cj">' + OpenDate + '</span><strong class="blue">' + movie[i][3] + '</strong></p>' +
		'<p class="mt-0 mb-0"><span class="cj">' + Opentime + '</span>' + movie[i][4] + '</p>' +
		'<p class="mt-0 mb-0"><span class="cj">등급</span>' + movie[i][5] + '</p>' +
		'<p class="mt-0 mb-0"><span class="cj">개요</span>' + movie[i][7] + ' | ' + movie[i][6] + '</p>';

		el = el + '<p class="mt-0 mb-0"><span class="cj">내 평점</span>' +
		'<span class="sstar"><em class="sst"><em style="width:' + 
		movie[i][8] * 10 + '%"></em></em><strong class="pyjum">' + movie[i][8] + '</strong></span></p>';

		if(movie[i][10] == 1) el = el + '<p class="mt-n1 mt-md-2 mb-0"><span class="cj">시청률</span><strong class="pyjum">' + movie[i][12] +'</strong></p>';
		if(movie[i][10] == 0 && movie[i][12] != 0) el = el + '<p class="mt-n1 mt-md-2 mb-0"><span class="cj">관람평</span>' + movie[i][12] + '</p>';
		else {}

		el = el + '</div></div>' +
		'<div class="info-p"><div class="pyjum-nu color-r">' + Math.floor(movie[i][8]*10) + '점</div>' +
		'<p class="margin-small-top p-left-1"><a href="' + movie[i][9] + '" target="_blank" class="a-none" title="' + movie[i][0] +'">' + movie[i][0] +'</a></p>' + 
		'<p class="margin-0 p-left-1 subtitle color-g" title="' + movie[i][1] + '">' + movie[i][1] + '</p></div>' +

    	'</div></li>';
	
    document.write(el);
	}
};