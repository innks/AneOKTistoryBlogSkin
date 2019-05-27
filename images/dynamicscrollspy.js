(function($) {

  $.fn.DynamicScrollspy = function(opts) {
    //define opts / define 의 정의
    opts = (typeof(opts) == 'undefined') ? {} : opts;
    this.isinit = (typeof(this.isinit) == 'undefined') ? false : self.isinit;

    //destroy scrollspy ooption / scrollspy를 제거한다.
    if (opts == 'destroy') {
      this.isinit = false;
      this.empty();
      this.off('activate.bs.scrollspy');
      $('body').removeAttr('data-spy');
      return this;
    }

    //extend options priorities: passed, existing, defaults / 옵션 우선 순위 확장 : 통과, 기존, 기본값
    this.options = $.extend({}, {
      affix: false, //use affix by default, doesn't work for Bootstrap 4 / 기본 : true / 기본적으로 접미사를 사용하고, 부트 스트랩 4에서는 작동하지 않습니다.
      tH: 2, //lowest-level header to be included (H2) / 포함될 최저 레벨 헤더 (H2)
      bH: 6, //highest-level header to be included (H6) / 포함될 최상위 레벨 헤더 (H6)
      exclude: false, //jquery filter / jquery 필터
      genIDs: false, //generate random IDs? / 임의의 ID를 생성 하시겠습니까?
      offset: 100, //offset for scrollspy / scrollspy에 대한 오프셋
      ulClassNames: 'hidden-print', //add this class to top-most UL / 최상위 UL에이 클래스 추가
      activeClass: '', //active class (besides .active) to add / 추가 할 활성 클래스 (.active 이외)
      testing: false //if testing, show heading tagName and ID / 테스트하는 경우 headName tagName 및 ID를 표시합니다.
    }, this.options, opts);

    var self = this;

    //store tree and used random numbers / 트리 저장 및 난수 사용
    this.tree = {};
    this.rands = [];

    //encode any text in header title to HTML entities / 헤더 제목의 텍스트를 HTML 엔티티로 인코딩
    function encodeHTML(value) {
      return $('<div></div>').text(value).html();
    }

    //returns jQuery object of all headers between tH and bH / tH와 bH 사이의 모든 헤더에 대한 jQuery 객체를 반환합니다.
    function selectAllH() {
      var st = [];
      for (var i = self.options.tH; i <= self.options.bH; i++) {
        st.push('H' + i);
      }
      return $(st.join(',')).not(self.options.exclude);
    }

    //generate random numbers; save and check saved to keep them unique / 난수 생성; 저장하고 확인하여 고유하게 유지하십시오.
    function randID() {
      var r;

      function rand() {
        r = Math.floor(Math.random() * (1000 - 100)) + 100;
      }
      //get first random number / 첫번째 난수를 얻는다.
      rand();
      while (self.rands.indexOf(r) >= 0) {
        //when that random is found, try again until it isn't / 그 무작위가 발견되면, 그렇지 않을 때까지 다시 시도하십시오
        rand();
      }
      //save random for later / 나중에 무작위로 저장
      self.rands.push(r);
      return r;
    }

    //generate random IDs for elements if requested / 요청할 경우 요소에 대한 임의의 ID를 생성합니다.
    function genIDs() {
      selectAllH().prop('id', function() {
        // if no id prop for this header, return a random id
        return ($(this).prop('id') === '') ? $(this).prop('tagName') + (randID()) : $(this).prop('id');
      });
    }

    //check that all have id attribute / 모두 id 속성을 가지고 있는지 확인하십시오.
    function checkIDs() {
      var missing = 0;
      //check they exist first / 그들이 먼저 존재하는지 확인하십시오.
      selectAllH().each(function() {
        if ($(this).prop('id') === '') {
          missing++;
        } else {
          if ($('[id="' + $(this).prop('id') + '"]').length > 1) throw new Error("DynamicScrollspy: Error! Duplicate id " + $(this).prop('id'));
        }

      });
      if (missing > 0) {
        var msg = "DynamicScrollspy: Not all headers have ids and genIDs: false.";
        throw new Error(msg);
      }
      return missing;
    }

    //testing - show IDs and tag types / 테스트 - ID 및 태그 유형 표시
    function showTesting() {
      selectAllH().append(function() {
        // let's see the tag names (for test)
        return ' (' + $(this).prop('tagName') + ', ' + $(this).prop('id') + ')';
      });
    }

    //setup the tree, (first level) / 트리 설정, (첫 단계)
    function makeTree() {
      var tree = self.tree;
      $('H' + self.options.tH).not(self.options.exclude).each(function() {

        // 추가 {
        var n = $(this).html(),
        htopword;
        var s = n
          .trim()
          .replace("<em>", "")
          .replace("</em>", "")
          .replace("<code>", "")
          .replace("</code>", "");
        
        if (s.includes("&")) htopword = s.substr(0, s.indexOf("&"));
        else if (s.includes("<")) htopword = s.substr(0, s.indexOf("<"));
        else htopword = s;
        // } 추가 

        //run the first level / 첫 번째 단계를 실행
        tree[$(this).prop('id')] = {
          dstext: encodeHTML(htopword), // dstext: encodeHTML($(this).text()), -> dstext: encodeHTML(htopword), 로 변경
          jqel: $(this)
        };
      });

      if (self.options.tH + 1 <= self.options.bH) {
        //only recurse if more than one level requested / 둘 이상의 레벨이 요청한 경우에만 재귀
        itCreateTree(tree);

      }

      return tree;
    }

    //iterate through each grandchild+ level of the tree / 각 손주+ 트리의 레벨을 반복한다.
    function itCreateTree(what) {
        for (var k in what) {
        //skip empty items / 빈 항목 건너 뛰기
        if (k === '') continue;
        // skip if text or element / 텍스트 나 요소 인 경우 건너 뜁니다.
        if (k == 'dstext' || k == 'jqel') continue;
        //get the current level / 현재 수준을 얻는다.
        var lvl = Number($('#' + k).prop('tagName').replace('H', ''));
        //end if we are at the final level / 우리가 마지막 수준에 있다면 끝내라.
        if (lvl >= self.options.bH) return false;
        //next until
        $('#' + k).nextUntil('H' + lvl).filter('H' + (lvl + 1)).not(self.options.exclude).each(function() {

          // 추가 {
          var i = $(this).html(),hzword;
          var o = i
            .trim()
            .replace("<em>", "")
            .replace("</em>", "")
            .replace("<code>", "")
            .replace("</code>", "");

          if (o.includes("&")) hzword = o.substr(0, o.indexOf("&"));
          else if (o.includes("<")) hzword = o.substr(0, o.indexOf("<"));          
          else hzword = o;
          // } 추가 

          what[k][$(this).prop('id')] = {
            dstext: encodeHTML(hzword), // dstext: encodeHTML($(this).text()), -> dstext: encodeHTML(hzword), 로 변경
            jqel: $(this)
          };
        });

        //keep recursing if necessary / 필요할 경우 재귀를 계속한다.
        if (lvl < self.options.bH) itCreateTree(what[k]);

        }
    }

    //render tree (setup first level) / 트리 렌더링 (첫 번째 레벨 설정)
    function renderTree() {
      var ul = $('<ul class="nav ' + self.options.ulClassNames + '"></ul>');
      self.append(ul);
      //then iterate three tree / 다음 세 트리를 반복
      $.each(self.tree, function(k) {
        var c = self.tree[k];
        var li = '<li id="ink' + k + '" class="nav-item"><a href="#' + k + '" class="nav-link">' + c.dstext + '</a></li>';
        ul.append(li);
        itRenderTree(self.tree[k]);
      });

      return self;
    }

    //iterate and render each subsequent level / 각 후속 레벨 반복 및 렌더링
    function itRenderTree(what) {
      //if no children, skip / 아이들이 없으면 건너 뜁니다.
      if (Object.keys(what).length < 3) return false;
      //parent element, append sub list / 상위 요소, 하위 목록 추가
      var parent = $('#ink' + what.jqel.prop('id'));
      var ul = $("<ul class='nav child'></ul>");
      parent.append(ul);
      for (var k in what) {
        //skip if text or element / 텍스트 나 요소 인 경우 건너 뜁니다.
        if (k == 'dstext' || k == 'jqel') continue;
        var c = what[k];
        ul.append('<li id="ink' + k + '" class="nav-item"><a href="#' + k + '" class="nav-link">' + c.dstext + '</a></li>');
        itRenderTree(what[k]);
      }
    }

    //initialize plugin / 플러그인 초기화
    function init() {
      //first time (or after destroy) / 처음으로 (또는 파괴 후)
      if (self.isinit === false) {
        //generate IDs / ID을 생성하다
        if (self.options.genIDs) {
          genIDs();
        } else {
          checkIDs();
        }

        if (self.options.testing) showTesting();

        //make the tree / 트리를 만들다
        makeTree();
        //render it / 렌더링
        renderTree();

        //bootstrap 4 has no affix / 부트 스트랩 4에는 affix가 없습니다.
        if (self.options.affix && typeof(self.children('ul').affix) === 'function') {
          var ul = self.children('ul');

          self.children('ul').affix({
            offset: {
              top: function() {
                var c = ul.offset().top,
                  d = parseInt(ul.children(0).css("margin-top"), 10),
                  e = $(self).height();
                return this.top = c - e - d;
              },
              bottom: function() {
                return this.bottom = $(self).outerHeight(!0);
              }
            }
          });
        }


        $('body').attr('data-spy', 'true').scrollspy({
          target: '#' + self.prop('id'),
          offset: self.options.offset
        });

        self.isinit = true;
      } else {

        makeTree();

        renderTree();

        $('[data-spy="scroll"]').each(function() {
          $(this).scrollspy('refresh');
        });
      }
      return self;
    }
    return init();
  };
}(jQuery));
