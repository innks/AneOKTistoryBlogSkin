function Jang(iis, ies) {
	var scr = '', eq, eq2;
	//드라마,로맨스,판타지/모험,SF
	if(iis.charAt(0) == 1) scr = scr + '드라마, ';
	if(iis.charAt(1) == 1) scr = scr + '로맨스, ';
	if(iis.charAt(2) == 1) scr = scr + '판타지, ';
	if(iis.charAt(3) == 1) scr = scr + 'SF, ';
	//가족,재난,미스테리(추리),스릴러
	if(iis.charAt(5) == 1) scr = scr + '가족, ';
	if(iis.charAt(6) == 1) scr = scr + '재난, ';
	if(iis.charAt(7) == 1) scr = scr + '미스테리(추리), ';
	if(iis.charAt(8) == 1) scr = scr + '스릴러, ';
	//액션,코미디,호러/공포,스포츠
	if(iis.charAt(10) == 1) scr = scr + '액션, ';
	if(iis.charAt(11) == 1) scr = scr + '코미디, ';
	if(iis.charAt(12) == 1) scr = scr + '호러/공포, ';

	if(ies == true) {eq = '사극, '; eq2 = '현대시대, ';}
	else {eq = '서부, '; eq2 = '스포츠, ';}

	if(iis.charAt(13) == 1) scr = scr + eq2;
	//전쟁,서부(사극),기록,성인물
	if(iis.charAt(15) == 1) scr = scr + '전쟁, ';
	if(iis.charAt(16) == 1) scr = scr + eq;
	if(iis.charAt(17) == 1) scr = scr + '기록, ';
	if(iis.charAt(18) == 1) scr = scr + '성인, ';

	if(scr == '') scr = '장르 미정';
	else scr = scr.substr(0, scr.length -2);
	return scr;
}
function sCo(no) {
	var p = no * 10;
	if (p >= 80) return '추천해요.';
	else if (p >= 60) return '재미있어요.';
	else if (p >= 40) return '킬링타임용...';
	else if (p >= 20) return '그다지...'
	else return '비추에요 ~ 흐.';
}
function JangIcon(iic, ii) {
	var scric = '';
	var j1 = '',j2 = '',j3 = '',j4 = '',j5 = '',j6 = '',
	j7 = '',j8 = '',j9 = '',j10 = '',j11 = '',j12 = '',
	j13 = '',j14 = '',j15 = '',j16 = '', eq, ew;

	if(iic.charAt(0) == 1) j1 = ' act';
	if(iic.charAt(1) == 1) j2 = ' act';
	if(iic.charAt(2) == 1) j3 = ' act';
	if(iic.charAt(3) == 1) j4 = ' act';

	if(iic.charAt(5) == 1) j5 = ' act';
	if(iic.charAt(6) == 1) j6 = ' act';
	if(iic.charAt(7) == 1) j7 = ' act';
	if(iic.charAt(8) == 1) j8 = ' act';

	if(iic.charAt(10) == 1) j9 = ' act';
	if(iic.charAt(11) == 1) j10 = ' act';
	if(iic.charAt(12) == 1) j11 = ' act';
	if(iic.charAt(13) == 1) j12 = ' act';

	if(iic.charAt(15) == 1) j13 = ' act';
	if(iic.charAt(16) == 1) j14 = ' act';
	if(iic.charAt(17) == 1) j15 = ' act';
	if(iic.charAt(18) == 1) j16 = ' act1';	

	if(ii == true) {eq = '사극(historical drama)'; ew = 'HIS'; eq2 = '현대시대(Modern)'; ew2 = 'MOD';}
	else {eq = '서부영화(Western)'; ew = 'WES'; eq2 = '스포츠(Sport)'; ew2 = 'SPO';};

			//드라마,로맨스,판타지/모험,SF
	scric =	'<span class="col-3' + j1 + '" title="드라마(Drama)">DRA</span>' +
			'<span class="col-3' + j2 + '" title="로맨스(Romance)/연애">ROM</span>' +
			'<span class="col-3' + j3 + '" title="판타지(Fantasy)">FAN</span>' +
			'<span class="col-3' + j4 + '" title="SF(Science Fiction)">SF</span>' +
			//가족,재난,미스테리(추리),스릴러
			'<span class="col-3' + j5 + '" title="가족(Family)">FAM</span>' +
			'<span class="col-3' + j6 + '" title="재난(Disaster)">DIS</span>' +
			'<span class="col-3' + j7 + '" title="미스테리(Mystery)/추리">MYS</span>' +
			'<span class="col-3' + j8 + '" title="스릴러(Thriller)">THR</span>' +
			//액션,코미디,호러/공포,스포츠
			'<span class="col-3' + j9 + '" title="액션(Action)">ACT</span>' +
			'<span class="col-3' + j10 + '" title="코미디(Comedy)">COM</span>' +
			'<span class="col-3' + j11 + '" title="호러/공포(Horror)">HOR</span>' +
			'<span class="col-3' + j12 + '" title="' + eq2 + '">' + ew2 + '</span>' +
			//전쟁,서부(사극),기록,성인물
			'<span class="col-3' + j13 + '" title="전쟁(War)">WAR</span>' +
			'<span class="col-3' + j14 + '" title="' + eq + '">' + ew + '</span>' +
			'<span class="col-3' + j15 + '" title="기록(Documentary)">DOC</span>' +
			'<span class="col-3' + j16 + '" title="성인물">+18</span>';
	return scric;
}
function MoverList() {
    for (var i = 0; i < m.length; i++) {
    	var er, ed, el, es, ef, ef2;
    	if(m[i][0] == true) {er = '연출'; ed = '편성'; es = '드라마';} 
    	else {er = '감독'; ed = "개봉"; es = '영화';};

    	if(m[i][12] == 'all') {ef = ' <span class="all">전체</span>'; ef2 = '[국내] 전체 관람가';}
    	else if (m[i][12] == '12') {ef = ' <span class="ax12">12</span>'; ef2 = '[국내] 12세 관람가';}
    	else if (m[i][12] == '15') {ef = ' <span class="ax15">15</span>'; ef2 = '[국내] 15세 관람가';}
    	else if (m[i][12] == '18') {ef = ' <span class="ax18">청불</span>'; ef2 = '[국내] 청소년 관람불가';}
    	else {ef = ' <span class="axnot">제한</span>'; ef2 = '[국내] 제한상영가';}

    	el = '<li class="col-6 col-sm-3 keyword">' +
    	'<div class="cols"><div class="poster"><div class="pimage">';
    	if(m[i][4] == true) el = el + '<div class="dday">강력추천 <span>★</span></div>';
    	if(m[i][3] == '') el = el + '<div class="no_poster"></div>';
    	else el = el + '<img src="' + m[i][3] + '" alt="" width="161" class="poster_img">';

    	el = el + '</div><div class="hovercont" style="top: 0px;"><ul><li class="tt">' + m[i][1] + 
    	'</li><li class="pyear"><span>제작</span>' + m[i][5] + 
    	'</li><li><span>' + es + '</span>| ' + ef2 +  
    	'</li><li><span>' + er + '</span>' + m[i][6] + 
    	'</li><li><span>' + ed + '</span>' + m[i][8] + 
    	'</li><li><span>국가</span>' + m[i][7] + '</li>';

    	if(m[i][0] == true) el = el + '<li><span>시청률</span>' + m[i][11] + '%</li>';
    	else el = el + '<li><span>시간</span>' + m[i][11] + '분</li>';

    	el = el + '<li><span>장르</span>' +
    	Jang(m[i][9], m[i][0]) + '</li></ul></div></div><div class="cont">' + 
    	'<p class="sbj"><a href="https://movie.naver.com/movie/bi/mi/photoView.nhn?code=' + m[i][13] + '" target="_blank" class="a-none">' +
    	m[i][1] + '</a><small>'+  ef +'</small></p><p class="sbjsub">' +
		m[i][2] + '</p>' +
    	'<p class="naverstar"><span class="small_star"><span class="starval" style="width:' +
    	m[i][10] * 10 + '%;"></span></span></p>' +
    	'<p class="rate">' + 
    	sCo(m[i][10]) + '</p><div class="row ctrlbox">' + 
    	JangIcon(m[i][9], m[i][0]) + '</div></div></div></li>';

        document.write(el);

    }

}