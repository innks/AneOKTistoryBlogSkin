'use strict';
class PostData { // 클래스 첫문자는 대문자 표기
	constructor(idType, title, subtitle, postURL, year, company, age, type, country, officialURL, scorePercent, viewer, recom) {
		this.idType = idType; // 영화(0), 드라마(1)- 기본 
		this.title = title; // 제목
		this.subtitle = subtitle; // 부제목
		this.postURL = postURL; // 포스트 URL
		this.year = year; // 개봉 연도
		this.company = company; // 회사명 (영화시 '개봉날짜')
		this.age = age; // 등급
		this.type = type; // 장르
		this.country = country; // 국가
		this.officialURL = officialURL; // 맥스무비, 네이버 영화 & 공식 URL
		this.scorePercent  = scorePercent; // (점수) 퍼센트
		this.viewer = viewer;  // 시청률
		this.recom = recom; // 추천 (0, 1:추천) - recommendation
	}

	get idType() {
		return this._idType;
	}
	set idType(velue) {
		this._idType = (velue == 0 || velue == 1) ? velue : 1;
	}
};

AneOK.multimedia = {
  postList: function(listClassName) {
    let openDate, openTime, openViewer, sentenceData = '';
    if (listClassName.idType == 1 ) {openDate = '제작', openTime = '편성', openViewer = '시청률'} 
    else { openDate = '개봉', openTime = '시간', openViewer = '관람평'};
    sentenceData = '<li class="col-sm-6 col-md-4 mb-45 keyword"><div class="poster"><div class="inline-clip transition-toggle">';
    if (listClassName.recom == 1) sentenceData += '<div class="dday">추천 <span>★</span></div>';
    sentenceData += '<img src="' + listClassName.postURL + '" alt>' +
										'<div class="transition-slide-bottom position-bottom overlay overlay-default slide">' +
										'<p class="margin-0 title25">' + listClassName.title + '</p><hr>' +
										'<p class="mt-0 mb-0"><span class="cj">' + openDate + '</span><strong class="blue">' + listClassName.year + '</strong></p>' +
										'<p class="mt-0 mb-0"><span class="cj">' + openTime + '</span>' + listClassName.company + '</p>' +
										'<p class="mt-0 mb-0"><span class="cj">등급</span>' + listClassName.age + '</p>' +
										'<p class="mt-0 mb-0"><span class="cj">개요</span>' + listClassName.country + ' | ' + listClassName.type + '</p>';
    // 평점부분
    sentenceData += '<p class="mt-0 mb-0"><span class="cj">내 평점</span><span class="sstar"><em class="sst"><em style="width:' +
                    listClassName.scorePercent * 10 + '%"></em></em><strong class="pyjum">' + listClassName.scorePercent + '</strong></span></p>';
    //드라마면 시청률
    if (listClassName.idType == 1)
      sentenceData += '<p class="mt-n1 mt-md-2 mb-0"><span class="cj">' + openViewer + '</span><strong class="pyjum">' + listClassName.viewer + '</strong></p>';
    // 영화면 관람평 없으면 viewer = 0
    if (listClassName.idType == 0 && listClassName.viewer != 0)
      sentenceData += '<p class="mt-n1 mt-md-2 mb-0"><span class="cj">' + openViewer + '</span>' + listClassName.viewer + '</p>';
    sentenceData += '</div></div><div class="info-p"><div class="pyjum-nu color-r">' + Math.floor(listClassName.scorePercent * 10) + '점</div>' +
										'<p class="margin-small-top p-left-1"><a href="' + listClassName.officialURL + '" target="_blank" class="a-none" title="' +
										listClassName.title + '">' + listClassName.title + '</a></p>' +
										'<p class="margin-0 p-left-1 subtitle color-g" title="' + listClassName.subtitle + '">' + listClassName.subtitle + '</p></div></div></li>';
    return document.write(sentenceData);
  },
  postInfomation: function(updatedDate, messageText, messagenumber) {
    let messageData = '';
    messageData = '<div class="add-info"><ul><li><div><h5>최종 업데이트</h5><span>' + updatedDate +
                  '</span></div></li><li><div><h5>' + messageText +
                  '</h5><span>' + messagenumber + '</span></div></li></ul></div>';
    return document.write(messageData);
  }
};