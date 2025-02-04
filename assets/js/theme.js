"use strict";

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Util = /*#__PURE__*/function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, [{
    key: "forEach",
    value: function forEach(elements, handler) {
      elements = elements || [];

      for (var i = 0; i < elements.length; i++) {
        handler(elements[i]);
      }
    }
  }, {
    key: "getScrollTop",
    value: function getScrollTop() {
      return document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
    }
  }, {
    key: "isMobile",
    value: function isMobile() {
      return window.matchMedia('only screen and (max-width: 680px)').matches;
    }
  }, {
    key: "isTocStatic",
    value: function isTocStatic() {
      return window.matchMedia('only screen and (max-width: 960px)').matches;
    }
  }, {
    key: "animateCSS",
    value: function animateCSS(element, animation, reserved, callback) {
      var _element$classList;

      if (!Array.isArray(animation)) animation = [animation];

      (_element$classList = element.classList).add.apply(_element$classList, ['animate__animated'].concat(_toConsumableArray(animation)));

      var handler = function handler() {
        var _element$classList2;

        (_element$classList2 = element.classList).remove.apply(_element$classList2, ['animate__animated'].concat(_toConsumableArray(animation)));

        element.removeEventListener('animationend', handler);
        if (typeof callback === 'function') callback();
      };

      if (!reserved) element.addEventListener('animationend', handler, false);
    }
  }]);

  return Util;
}();

var Theme = /*#__PURE__*/function () {
  function Theme() {
    _classCallCheck(this, Theme);

    this.config = window.config;
    this.data = this.config.data;
    this.isDark = document.body.getAttribute('theme') === 'dark';
    this.util = new Util();
    this.newScrollTop = this.util.getScrollTop();
    this.oldScrollTop = this.newScrollTop;
    this.scrollEventSet = new Set();
    this.resizeEventSet = new Set();
    this.switchThemeEventSet = new Set();
    this.clickMaskEventSet = new Set();
    if (window.objectFitImages) objectFitImages();
  }

  _createClass(Theme, [{
    key: "initRaw",
    value: function initRaw() {
      var _this = this;

      this.util.forEach(document.querySelectorAll('[data-raw]'), function ($raw) {
        $raw.innerHTML = _this.data[$raw.id];
      });
    }
  }, {
    key: "initSVGIcon",
    value: function initSVGIcon() {
      this.util.forEach(document.querySelectorAll('[data-svg-src]'), function ($icon) {
        fetch($icon.getAttribute('data-svg-src')).then(function (response) {
          return response.text();
        }).then(function (svg) {
          var $temp = document.createElement('div');
          $temp.insertAdjacentHTML('afterbegin', svg);
          var $svg = $temp.firstChild;
          $svg.setAttribute('data-svg-src', $icon.getAttribute('data-svg-src'));
          $svg.classList.add('icon');
          var $titleElements = $svg.getElementsByTagName('title');
          if ($titleElements.length) $svg.removeChild($titleElements[0]);
          $icon.parentElement.replaceChild($svg, $icon);
        }).catch(function (err) {
          console.error(err);
        });
      });
    }
  }, {
    key: "initTwemoji",
    value: function initTwemoji() {
      if (this.config.twemoji) twemoji.parse(document.body);
    }
  }, {
    key: "initMenuMobile",
    value: function initMenuMobile() {
      var $menuToggleMobile = document.getElementById('menu-toggle-mobile');
      var $menuMobile = document.getElementById('menu-mobile');
      $menuToggleMobile.addEventListener('click', function () {
        document.body.classList.toggle('blur');
        $menuToggleMobile.classList.toggle('active');
        $menuMobile.classList.toggle('active');
      }, false);

      this._menuMobileOnClickMask = this._menuMobileOnClickMask || function () {
        $menuToggleMobile.classList.remove('active');
        $menuMobile.classList.remove('active');
      };

      this.clickMaskEventSet.add(this._menuMobileOnClickMask);
    }
  }, {
    key: "initSwitchTheme",
    value: function initSwitchTheme() {
      var _this2 = this;

      this.util.forEach(document.getElementsByClassName('theme-switch'), function ($themeSwitch) {
        $themeSwitch.addEventListener('click', function () {
          if (document.body.getAttribute('theme') === 'dark') document.body.setAttribute('theme', 'light');else document.body.setAttribute('theme', 'dark');
          _this2.isDark = !_this2.isDark;
          window.localStorage && localStorage.setItem('theme', _this2.isDark ? 'dark' : 'light');

          var _iterator = _createForOfIteratorHelper(_this2.switchThemeEventSet),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var event = _step.value;
              event();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }, false);
      });
    }
  }, {
    key: "initSearch",
    value: function initSearch() {
      var _this3 = this;

      var searchConfig = this.config.search;
      var isMobile = this.util.isMobile();
      if (!searchConfig || isMobile && this._searchMobileOnce || !isMobile && this._searchDesktopOnce) return;
      var maxResultLength = searchConfig.maxResultLength ? searchConfig.maxResultLength : 10;
      var snippetLength = searchConfig.snippetLength ? searchConfig.snippetLength : 50;
      var highlightTag = searchConfig.highlightTag ? searchConfig.highlightTag : 'em';
      var suffix = isMobile ? 'mobile' : 'desktop';
      var $header = document.getElementById("header-".concat(suffix));
      var $searchInput = document.getElementById("search-input-".concat(suffix));
      var $searchToggle = document.getElementById("search-toggle-".concat(suffix));
      var $searchLoading = document.getElementById("search-loading-".concat(suffix));
      var $searchClear = document.getElementById("search-clear-".concat(suffix));

      if (isMobile) {
        this._searchMobileOnce = true;
        $searchInput.addEventListener('focus', function () {
          document.body.classList.add('blur');
          $header.classList.add('open');
        }, false);
        document.getElementById('search-cancel-mobile').addEventListener('click', function () {
          $header.classList.remove('open');
          document.body.classList.remove('blur');
          document.getElementById('menu-toggle-mobile').classList.remove('active');
          document.getElementById('menu-mobile').classList.remove('active');
          $searchLoading.style.display = 'none';
          $searchClear.style.display = 'none';
          _this3._searchMobile && _this3._searchMobile.autocomplete.setVal('');
        }, false);
        $searchClear.addEventListener('click', function () {
          $searchClear.style.display = 'none';
          _this3._searchMobile && _this3._searchMobile.autocomplete.setVal('');
        }, false);

        this._searchMobileOnClickMask = this._searchMobileOnClickMask || function () {
          $header.classList.remove('open');
          $searchLoading.style.display = 'none';
          $searchClear.style.display = 'none';
          _this3._searchMobile && _this3._searchMobile.autocomplete.setVal('');
        };

        this.clickMaskEventSet.add(this._searchMobileOnClickMask);
      } else {
        this._searchDesktopOnce = true;
        $searchToggle.addEventListener('click', function () {
          document.body.classList.add('blur');
          $header.classList.add('open');
          $searchInput.focus();
        }, false);
        $searchClear.addEventListener('click', function () {
          $searchClear.style.display = 'none';
          _this3._searchDesktop && _this3._searchDesktop.autocomplete.setVal('');
        }, false);

        this._searchDesktopOnClickMask = this._searchDesktopOnClickMask || function () {
          $header.classList.remove('open');
          $searchLoading.style.display = 'none';
          $searchClear.style.display = 'none';
          _this3._searchDesktop && _this3._searchDesktop.autocomplete.setVal('');
        };

        this.clickMaskEventSet.add(this._searchDesktopOnClickMask);
      }

      $searchInput.addEventListener('input', function () {
        if ($searchInput.value === '') $searchClear.style.display = 'none';else $searchClear.style.display = 'inline';
      }, false);

      var initAutosearch = function initAutosearch() {
        var autosearch = autocomplete("#search-input-".concat(suffix), {
          hint: false,
          autoselect: true,
          dropdownMenuContainer: "#search-dropdown-".concat(suffix),
          clearOnSelected: true,
          cssClasses: {
            noPrefix: true
          },
          debug: true
        }, {
          name: 'search',
          source: function source(query, callback) {
            $searchLoading.style.display = 'inline';
            $searchClear.style.display = 'none';

            var finish = function finish(results) {
              $searchLoading.style.display = 'none';
              $searchClear.style.display = 'inline';
              callback(results);
            };

            if (searchConfig.type === 'lunr') {
              var search = function search() {
                if (lunr.queryHandler) query = lunr.queryHandler(query);
                var results = {};

                _this3._index.search(query).forEach(function (_ref) {
                  var ref = _ref.ref,
                      metadata = _ref.matchData.metadata;
                  var matchData = _this3._indexData[ref];
                  var uri = matchData.uri,
                      title = matchData.title,
                      context = matchData.content;
                  if (results[uri]) return;
                  var position = 0;
                  Object.values(metadata).forEach(function (_ref2) {
                    var content = _ref2.content;

                    if (content) {
                      var matchPosition = content.position[0][0];
                      if (matchPosition < position || position === 0) position = matchPosition;
                    }
                  });
                  position -= snippetLength / 5;

                  if (position > 0) {
                    position += context.substr(position, 20).lastIndexOf(' ') + 1;
                    context = '...' + context.substr(position, snippetLength);
                  } else {
                    context = context.substr(0, snippetLength);
                  }

                  Object.keys(metadata).forEach(function (key) {
                    title = title.replace(new RegExp("(".concat(key, ")"), 'gi'), "<".concat(highlightTag, ">$1</").concat(highlightTag, ">"));
                    context = context.replace(new RegExp("(".concat(key, ")"), 'gi'), "<".concat(highlightTag, ">$1</").concat(highlightTag, ">"));
                  });
                  results[uri] = {
                    'uri': uri,
                    'title': title,
                    'date': matchData.date,
                    'context': context
                  };
                });

                return Object.values(results).slice(0, maxResultLength);
              };

              if (!_this3._index) {
                fetch(searchConfig.lunrIndexURL).then(function (response) {
                  return response.json();
                }).then(function (data) {
                  var indexData = {};
                  _this3._index = lunr(function () {
                    var _this4 = this;

                    if (searchConfig.lunrLanguageCode) this.use(lunr[searchConfig.lunrLanguageCode]);
                    this.ref('objectID');
                    this.field('title', {
                      boost: 50
                    });
                    this.field('tags', {
                      boost: 20
                    });
                    this.field('categories', {
                      boost: 20
                    });
                    this.field('content', {
                      boost: 10
                    });
                    this.metadataWhitelist = ['position'];
                    data.forEach(function (record) {
                      indexData[record.objectID] = record;

                      _this4.add(record);
                    });
                  });
                  _this3._indexData = indexData;
                  finish(search());
                }).catch(function (err) {
                  console.error(err);
                  finish([]);
                });
              } else finish(search());
            } else if (searchConfig.type === 'algolia') {
              _this3._algoliaIndex = _this3._algoliaIndex || algoliasearch(searchConfig.algoliaAppID, searchConfig.algoliaSearchKey).initIndex(searchConfig.algoliaIndex);

              _this3._algoliaIndex.search(query, {
                offset: 0,
                length: maxResultLength * 8,
                attributesToHighlight: ['title'],
                attributesToSnippet: ["content:".concat(snippetLength)],
                highlightPreTag: "<".concat(highlightTag, ">"),
                highlightPostTag: "</".concat(highlightTag, ">")
              }).then(function (_ref3) {
                var hits = _ref3.hits;
                var results = {};
                hits.forEach(function (_ref4) {
                  var uri = _ref4.uri,
                      date = _ref4.date,
                      title = _ref4._highlightResult.title,
                      content = _ref4._snippetResult.content;
                  if (results[uri] && results[uri].context.length > content.value) return;
                  results[uri] = {
                    uri: uri,
                    title: title.value,
                    date: date,
                    context: content.value
                  };
                });
                finish(Object.values(results).slice(0, maxResultLength));
              }).catch(function (err) {
                console.error(err);
                finish([]);
              });
            }
          },
          templates: {
            suggestion: function suggestion(_ref5) {
              var title = _ref5.title,
                  date = _ref5.date,
                  context = _ref5.context;
              return "<div><span class=\"suggestion-title\">".concat(title, "</span><span class=\"suggestion-date\">").concat(date, "</span></div><div class=\"suggestion-context\">").concat(context, "</div>");
            },
            empty: function empty(_ref6) {
              var query = _ref6.query;
              return "<div class=\"search-empty\">".concat(searchConfig.noResultsFound, ": <span class=\"search-query\">\"").concat(query, "\"</span></div>");
            },
            footer: function footer(_ref7) {
              _objectDestructuringEmpty(_ref7);

              var _ref8 = searchConfig.type === 'algolia' ? {
                searchType: 'algolia',
                icon: '<i class="fab fa-algolia fa-fw" aria-hidden="true"></i>',
                href: 'https://www.algolia.com/'
              } : {
                searchType: 'Lunr.js',
                icon: '',
                href: 'https://lunrjs.com/'
              },
                  searchType = _ref8.searchType,
                  icon = _ref8.icon,
                  href = _ref8.href;

              return "<div class=\"search-footer\">Search by <a href=\"".concat(href, "\" rel=\"noopener noreffer\" target=\"_blank\">").concat(icon, " ").concat(searchType, "</a></div>");
            }
          }
        });
        autosearch.on('autocomplete:selected', function (_event, suggestion, _dataset, _context) {
          window.location.assign(suggestion.uri);
        });
        if (isMobile) _this3._searchMobile = autosearch;else _this3._searchDesktop = autosearch;
      };

      if (searchConfig.lunrSegmentitURL && !document.getElementById('lunr-segmentit')) {
        var script = document.createElement('script');
        script.id = 'lunr-segmentit';
        script.type = 'text/javascript';
        script.src = searchConfig.lunrSegmentitURL;
        script.async = true;

        if (script.readyState) {
          script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
              script.onreadystatechange = null;
              initAutosearch();
            }
          };
        } else {
          script.onload = function () {
            initAutosearch();
          };
        }

        document.body.appendChild(script);
      } else initAutosearch();
    }
  }, {
    key: "initDetails",
    value: function initDetails() {
      this.util.forEach(document.getElementsByClassName('details'), function ($details) {
        var $summary = $details.getElementsByClassName('details-summary')[0];
        $summary.addEventListener('click', function () {
          $details.classList.toggle('open');
        }, false);
      });
    }
  }, {
    key: "initLightGallery",
    value: function initLightGallery() {
      if (this.config.lightgallery) lightGallery(document.getElementById('content'), {
        plugins: [lgThumbnail, lgZoom],
        selector: '.lightgallery',
        speed: 400,
        hideBarsDelay: 2000,
        allowMediaOverlap: true,
        exThumbImage: 'data-thumbnail',
        toggleThumb: true,
        thumbWidth: 80,
        thumbHeight: '60px',
        actualSize: false,
        showZoomInOutIcons: true
      });
    }
  }, {
    key: "initHighlight",
    value: function initHighlight() {
      var _this5 = this;

      this.util.forEach(document.querySelectorAll('.highlight > pre.chroma'), function ($preChroma) {
        var $chroma = document.createElement('div');
        $chroma.className = $preChroma.className;
        var $table = document.createElement('table');
        $chroma.appendChild($table);
        var $tbody = document.createElement('tbody');
        $table.appendChild($tbody);
        var $tr = document.createElement('tr');
        $tbody.appendChild($tr);
        var $td = document.createElement('td');
        $tr.appendChild($td);
        $preChroma.parentElement.replaceChild($chroma, $preChroma);
        $td.appendChild($preChroma);
      });
      this.util.forEach(document.querySelectorAll('.highlight > .chroma'), function ($chroma) {
        var $codeElements = $chroma.querySelectorAll('pre.chroma > code');

        if ($codeElements.length) {
          var $code = $codeElements[$codeElements.length - 1];
          var $header = document.createElement('div');
          $header.className = 'code-header ' + $code.className.toLowerCase();
          var $title = document.createElement('span');
          $title.classList.add('code-title');
          $title.insertAdjacentHTML('afterbegin', '<i class="arrow fas fa-chevron-right fa-fw" aria-hidden="true"></i>');
          $title.addEventListener('click', function () {
            $chroma.classList.toggle('open');
          }, false);
          $header.appendChild($title);
          var $ellipses = document.createElement('span');
          $ellipses.insertAdjacentHTML('afterbegin', '<i class="fas fa-ellipsis-h fa-fw" aria-hidden="true"></i>');
          $ellipses.classList.add('ellipses');
          $ellipses.addEventListener('click', function () {
            $chroma.classList.add('open');
          }, false);
          $header.appendChild($ellipses);
          var $copy = document.createElement('span');
          $copy.insertAdjacentHTML('afterbegin', '<i class="far fa-copy fa-fw" aria-hidden="true"></i>');
          $copy.classList.add('copy');
          var code = $code.innerText;
          if (_this5.config.code.maxShownLines < 0 || code.split('\n').length < _this5.config.code.maxShownLines + 2) $chroma.classList.add('open');

          if (_this5.config.code.copyTitle) {
            $copy.setAttribute('data-clipboard-text', code);
            $copy.title = _this5.config.code.copyTitle;
            var clipboard = new ClipboardJS($copy);
            clipboard.on('success', function (_e) {
              _this5.util.animateCSS($code, 'animate__flash');
            });
            $header.appendChild($copy);
          }

          $chroma.insertBefore($header, $chroma.firstChild);
        }
      });
    }
  }, {
    key: "initTable",
    value: function initTable() {
      this.util.forEach(document.querySelectorAll('.content table'), function ($table) {
        var $wrapper = document.createElement('div');
        $wrapper.className = 'table-wrapper';
        $table.parentElement.replaceChild($wrapper, $table);
        $wrapper.appendChild($table);
      });
    }
  }, {
    key: "initHeaderLink",
    value: function initHeaderLink() {
      for (var num = 1; num <= 6; num++) {
        this.util.forEach(document.querySelectorAll('.single .content > h' + num), function ($header) {
          $header.classList.add('headerLink');
          $header.insertAdjacentHTML('afterbegin', "<a href=\"#".concat($header.id, "\" class=\"header-mark\"></a>"));
        });
      }
    }
  }, {
    key: "initToc",
    value: function initToc() {
      var _this6 = this;

      var $tocCore = document.getElementById('TableOfContents');
      if ($tocCore === null) return;

      if (document.getElementById('toc-static').getAttribute('data-kept') || this.util.isTocStatic()) {
        var $tocContentStatic = document.getElementById('toc-content-static');

        if ($tocCore.parentElement !== $tocContentStatic) {
          $tocCore.parentElement.removeChild($tocCore);
          $tocContentStatic.appendChild($tocCore);
        }

        if (this._tocOnScroll) this.scrollEventSet.delete(this._tocOnScroll);
      } else {
        var $tocContentAuto = document.getElementById('toc-content-auto');

        if ($tocCore.parentElement !== $tocContentAuto) {
          $tocCore.parentElement.removeChild($tocCore);
          $tocContentAuto.appendChild($tocCore);
        }

        var $toc = document.getElementById('toc-auto');
        var $page = document.getElementsByClassName('page')[0];
        var rect = $page.getBoundingClientRect();
        $toc.style.left = "".concat(rect.left + rect.width + 20, "px");
        $toc.style.maxWidth = "".concat($page.getBoundingClientRect().left - 20, "px");
        $toc.style.visibility = 'visible';
        var $tocLinkElements = $tocCore.querySelectorAll('a:first-child');
        var $tocLiElements = $tocCore.getElementsByTagName('li');
        var $headerLinkElements = document.getElementsByClassName('headerLink');
        var headerIsFixed = document.body.getAttribute('data-header-desktop') !== 'normal';
        var headerHeight = document.getElementById('header-desktop').offsetHeight;
        var TOP_SPACING = 20 + (headerIsFixed ? headerHeight : 0);
        var minTocTop = $toc.offsetTop;
        var minScrollTop = minTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);

        this._tocOnScroll = this._tocOnScroll || function () {
          var footerTop = document.getElementById('post-footer').offsetTop;
          var maxTocTop = footerTop - $toc.getBoundingClientRect().height;
          var maxScrollTop = maxTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);

          if (_this6.newScrollTop < minScrollTop) {
            $toc.style.position = 'absolute';
            $toc.style.top = "".concat(minTocTop, "px");
          } else if (_this6.newScrollTop > maxScrollTop) {
            $toc.style.position = 'absolute';
            $toc.style.top = "".concat(maxTocTop, "px");
          } else {
            $toc.style.position = 'fixed';
            $toc.style.top = "".concat(TOP_SPACING, "px");
          }

          _this6.util.forEach($tocLinkElements, function ($tocLink) {
            $tocLink.classList.remove('active');
          });

          _this6.util.forEach($tocLiElements, function ($tocLi) {
            $tocLi.classList.remove('has-active');
          });

          var INDEX_SPACING = 20 + (headerIsFixed ? headerHeight : 0);
          var activeTocIndex = $headerLinkElements.length - 1;

          for (var i = 0; i < $headerLinkElements.length - 1; i++) {
            var thisTop = $headerLinkElements[i].getBoundingClientRect().top;
            var nextTop = $headerLinkElements[i + 1].getBoundingClientRect().top;

            if (i == 0 && thisTop > INDEX_SPACING || thisTop <= INDEX_SPACING && nextTop > INDEX_SPACING) {
              activeTocIndex = i;
              break;
            }
          }

          if (activeTocIndex !== -1) {
            $tocLinkElements[activeTocIndex].classList.add('active');
            var $parent = $tocLinkElements[activeTocIndex].parentElement;

            while ($parent !== $tocCore) {
              $parent.classList.add('has-active');
              $parent = $parent.parentElement.parentElement;
            }
          }
        };

        this._tocOnScroll();

        this.scrollEventSet.add(this._tocOnScroll);
      }
    }
  }, {
    key: "initMath",
    value: function initMath() {
      if (this.config.math) renderMathInElement(document.body, this.config.math);
    }
  }, {
    key: "initMermaid",
    value: function initMermaid() {
      var _this7 = this;

      this._mermaidOnSwitchTheme = this._mermaidOnSwitchTheme || function () {
        var $mermaidElements = document.getElementsByClassName('mermaid');

        if ($mermaidElements.length) {
          mermaid.initialize({
            startOnLoad: false,
            theme: _this7.isDark ? 'dark' : 'neutral',
            securityLevel: 'loose'
          });

          _this7.util.forEach($mermaidElements, function ($mermaid) {
            mermaid.render('svg-' + $mermaid.id, _this7.data[$mermaid.id], function (svgCode) {
              $mermaid.innerHTML = svgCode;
            }, $mermaid);
          });
        }
      };

      this.switchThemeEventSet.add(this._mermaidOnSwitchTheme);

      this._mermaidOnSwitchTheme();
    }
  }, {
    key: "initEcharts",
    value: function initEcharts() {
      var _this8 = this;

      if (this.config.echarts) {
        echarts.registerTheme('light', this.config.echarts.lightTheme);
        echarts.registerTheme('dark', this.config.echarts.darkTheme);

        this._echartsOnSwitchTheme = this._echartsOnSwitchTheme || function () {
          _this8._echartsArr = _this8._echartsArr || [];

          for (var i = 0; i < _this8._echartsArr.length; i++) {
            _this8._echartsArr[i].dispose();
          }

          _this8._echartsArr = [];

          _this8.util.forEach(document.getElementsByClassName('echarts'), function ($echarts) {
            var chart = echarts.init($echarts, _this8.isDark ? 'dark' : 'light', {
              renderer: 'svg'
            });
            chart.setOption(JSON.parse(_this8.data[$echarts.id]));

            _this8._echartsArr.push(chart);
          });
        };

        this.switchThemeEventSet.add(this._echartsOnSwitchTheme);

        this._echartsOnSwitchTheme();

        this._echartsOnResize = this._echartsOnResize || function () {
          for (var i = 0; i < _this8._echartsArr.length; i++) {
            _this8._echartsArr[i].resize();
          }
        };

        this.resizeEventSet.add(this._echartsOnResize);
      }
    }
  }, {
    key: "initMapbox",
    value: function initMapbox() {
      var _this9 = this;

      if (this.config.mapbox) {
        mapboxgl.accessToken = this.config.mapbox.accessToken;
        mapboxgl.setRTLTextPlugin(this.config.mapbox.RTLTextPlugin);
        this._mapboxArr = this._mapboxArr || [];
        this.util.forEach(document.getElementsByClassName('mapbox'), function ($mapbox) {
          var _this9$data$$mapbox$i = _this9.data[$mapbox.id],
              lng = _this9$data$$mapbox$i.lng,
              lat = _this9$data$$mapbox$i.lat,
              zoom = _this9$data$$mapbox$i.zoom,
              lightStyle = _this9$data$$mapbox$i.lightStyle,
              darkStyle = _this9$data$$mapbox$i.darkStyle,
              marked = _this9$data$$mapbox$i.marked,
              navigation = _this9$data$$mapbox$i.navigation,
              geolocate = _this9$data$$mapbox$i.geolocate,
              scale = _this9$data$$mapbox$i.scale,
              fullscreen = _this9$data$$mapbox$i.fullscreen;
          var mapbox = new mapboxgl.Map({
            container: $mapbox,
            center: [lng, lat],
            zoom: zoom,
            minZoom: .2,
            style: _this9.isDark ? darkStyle : lightStyle,
            attributionControl: false
          });

          if (marked) {
            new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapbox);
          }

          if (navigation) {
            mapbox.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
          }

          if (geolocate) {
            mapbox.addControl(new mapboxgl.GeolocateControl({
              positionOptions: {
                enableHighAccuracy: true
              },
              showUserLocation: true,
              trackUserLocation: true
            }), 'bottom-right');
          }

          if (scale) {
            mapbox.addControl(new mapboxgl.ScaleControl());
          }

          if (fullscreen) {
            mapbox.addControl(new mapboxgl.FullscreenControl());
          }

          mapbox.addControl(new MapboxLanguage());

          _this9._mapboxArr.push(mapbox);
        });

        this._mapboxOnSwitchTheme = this._mapboxOnSwitchTheme || function () {
          _this9.util.forEach(_this9._mapboxArr, function (mapbox) {
            var $mapbox = mapbox.getContainer();
            var _this9$data$$mapbox$i2 = _this9.data[$mapbox.id],
                lightStyle = _this9$data$$mapbox$i2.lightStyle,
                darkStyle = _this9$data$$mapbox$i2.darkStyle;
            mapbox.setStyle(_this9.isDark ? darkStyle : lightStyle);
            mapbox.addControl(new MapboxLanguage());
          });
        };

        this.switchThemeEventSet.add(this._mapboxOnSwitchTheme);
      }
    }
  }, {
    key: "initTypeit",
    value: function initTypeit() {
      var _this10 = this;

      if (this.config.typeit) {
        var typeitConfig = this.config.typeit;
        var speed = typeitConfig.speed ? typeitConfig.speed : 100;
        var cursorSpeed = typeitConfig.cursorSpeed ? typeitConfig.cursorSpeed : 1000;
        var cursorChar = typeitConfig.cursorChar ? typeitConfig.cursorChar : '|';
        Object.values(typeitConfig.data).forEach(function (group) {
          var typeone = function typeone(i) {
            var id = group[i];
            var instance = new TypeIt("#".concat(id), {
              strings: _this10.data[id],
              speed: speed,
              lifeLike: true,
              cursorSpeed: cursorSpeed,
              cursorChar: cursorChar,
              waitUntilVisible: true,
              afterComplete: function afterComplete() {
                if (i === group.length - 1) {
                  if (typeitConfig.duration >= 0) window.setTimeout(function () {
                    instance.destroy();
                  }, typeitConfig.duration);
                  return;
                }

                instance.destroy();
                typeone(i + 1);
              }
            }).go();
          };

          typeone(0);
        });
      }
    }
  }, {
    key: "initComment",
    value: function initComment() {
      var _this11 = this;

      if (this.config.comment) {
        if (this.config.comment.gitalk) {
          this.config.comment.gitalk.body = decodeURI(window.location.href);
          var gitalk = new Gitalk(this.config.comment.gitalk);
          gitalk.render('gitalk');
        }

        if (this.config.comment.valine) new Valine(this.config.comment.valine);

        if (this.config.comment.utterances) {
          var utterancesConfig = this.config.comment.utterances;
          var script = document.createElement('script');
          script.src = 'https://utteranc.es/client.js';
          script.type = 'text/javascript';
          script.setAttribute('repo', utterancesConfig.repo);
          script.setAttribute('issue-term', utterancesConfig.issueTerm);
          if (utterancesConfig.label) script.setAttribute('label', utterancesConfig.label);
          script.setAttribute('theme', this.isDark ? utterancesConfig.darkTheme : utterancesConfig.lightTheme);
          script.crossOrigin = 'anonymous';
          script.async = true;
          document.getElementById('utterances').appendChild(script);

          this._utterancesOnSwitchTheme = this._utterancesOnSwitchTheme || function () {
            var message = {
              type: 'set-theme',
              theme: _this11.isDark ? utterancesConfig.darkTheme : utterancesConfig.lightTheme
            };
            var iframe = document.querySelector('.utterances-frame');
            iframe.contentWindow.postMessage(message, 'https://utteranc.es');
          };

          this.switchThemeEventSet.add(this._utterancesOnSwitchTheme);
        }

        if (this.config.comment.giscus) {
          var giscusConfig = this.config.comment.giscus;
          var giscusScript = document.createElement('script');
          giscusScript.src = 'https://giscus.app/client.js';
          giscusScript.type = 'text/javascript';
          giscusScript.setAttribute('data-repo', giscusConfig.repo);
          giscusScript.setAttribute('data-repo-id', giscusConfig.repoId);
          giscusScript.setAttribute('data-category', giscusConfig.category);
          giscusScript.setAttribute('data-category-id', giscusConfig.categoryId);
          giscusScript.setAttribute('data-lang', giscusConfig.lang);
          giscusScript.setAttribute('data-mapping', giscusConfig.mapping);
          giscusScript.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled);
          giscusScript.setAttribute('data-emit-metadata', giscusConfig.emitMetadata);
          giscusScript.setAttribute('data-input-position', giscusConfig.inputPosition);
          if (giscusConfig.lazyLoading) giscusScript.setAttribute('data-loading', 'lazy');
          giscusScript.setAttribute('data-theme', this.isDark ? giscusConfig.darkTheme : giscusConfig.lightTheme);
          giscusScript.crossOrigin = 'anonymous';
          giscusScript.async = true;
          document.getElementById('giscus').appendChild(giscusScript);

          this._giscusOnSwitchTheme = this._giscusOnSwitchTheme || function () {
            var message = {
              setConfig: {
                theme: _this11.isDark ? giscusConfig.darkTheme : giscusConfig.lightTheme,
                reactionsEnabled: false
              }
            };
            var iframe = document.querySelector('iframe.giscus-frame');
            if (!iframe) return;
            iframe.contentWindow.postMessage({
              giscus: message
            }, 'https://giscus.app');
          };

          this.switchThemeEventSet.add(this._giscusOnSwitchTheme);
        }

        if (this.config.comment.waline) Waline.init(this.config.comment.waline);
      }
    }
  }, {
    key: "initCookieconsent",
    value: function initCookieconsent() {
      if (this.config.cookieconsent) cookieconsent.initialise(this.config.cookieconsent);
    }
  }, {
    key: "onScroll",
    value: function onScroll() {
      var _this12 = this;

      var $headers = [];
      if (document.body.getAttribute('data-header-desktop') === 'auto') $headers.push(document.getElementById('header-desktop'));
      if (document.body.getAttribute('data-header-mobile') === 'auto') $headers.push(document.getElementById('header-mobile'));

      if (document.getElementById('comments')) {
        var $viewComments = document.getElementById('view-comments');
        $viewComments.href = "#comments";
        $viewComments.style.display = 'block';
      }

      var $fixedButtons = document.getElementById('fixed-buttons');
      var ACCURACY = 20,
          MINIMUM = 100;
      window.addEventListener('scroll', function () {
        _this12.newScrollTop = _this12.util.getScrollTop();
        var scroll = _this12.newScrollTop - _this12.oldScrollTop;

        var isMobile = _this12.util.isMobile();

        _this12.util.forEach($headers, function ($header) {
          if (scroll > ACCURACY) {
            $header.classList.remove('animate__fadeInDown');

            _this12.util.animateCSS($header, ['animate__fadeOutUp', 'animate__faster'], true);
          } else if (scroll < -ACCURACY) {
            $header.classList.remove('animate__fadeOutUp');

            _this12.util.animateCSS($header, ['animate__fadeInDown', 'animate__faster'], true);
          }
        });

        if (_this12.newScrollTop > MINIMUM) {
          if (isMobile && scroll > ACCURACY) {
            $fixedButtons.classList.remove('animate__fadeIn');

            _this12.util.animateCSS($fixedButtons, ['animate__fadeOut', 'animate__faster'], true);
          } else if (!isMobile || scroll < -ACCURACY) {
            $fixedButtons.style.display = 'block';
            $fixedButtons.classList.remove('animate__fadeOut');

            _this12.util.animateCSS($fixedButtons, ['animate__fadeIn', 'animate__faster'], true);
          }
        } else {
          if (!isMobile) {
            $fixedButtons.classList.remove('animate__fadeIn');

            _this12.util.animateCSS($fixedButtons, ['animate__fadeOut', 'animate__faster'], true);
          }

          $fixedButtons.style.display = 'none';
        }

        var _iterator2 = _createForOfIteratorHelper(_this12.scrollEventSet),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var event = _step2.value;
            event();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        _this12.oldScrollTop = _this12.newScrollTop;
      }, false);
    }
  }, {
    key: "onResize",
    value: function onResize() {
      var _this13 = this;

      window.addEventListener('resize', function () {
        if (!_this13._resizeTimeout) {
          _this13._resizeTimeout = window.setTimeout(function () {
            _this13._resizeTimeout = null;

            var _iterator3 = _createForOfIteratorHelper(_this13.resizeEventSet),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var event = _step3.value;
                event();
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            _this13.initToc();

            _this13.initMermaid();

            _this13.initSearch();
          }, 100);
        }
      }, false);
    }
  }, {
    key: "onClickMask",
    value: function onClickMask() {
      var _this14 = this;

      document.getElementById('mask').addEventListener('click', function () {
        var _iterator4 = _createForOfIteratorHelper(_this14.clickMaskEventSet),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var event = _step4.value;
            event();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        document.body.classList.remove('blur');
      }, false);
    }
  }, {
    key: "init",
    value: function init() {
      var _this15 = this;

      try {
        this.initRaw();
        this.initSVGIcon();
        this.initTwemoji();
        this.initMenuMobile();
        this.initSwitchTheme();
        this.initSearch();
        this.initDetails();
        this.initLightGallery();
        this.initHighlight();
        this.initTable();
        this.initHeaderLink();
        this.initMath();
        this.initMermaid();
        this.initEcharts();
        this.initTypeit();
        this.initMapbox();
        this.initCookieconsent();
      } catch (err) {
        console.error(err);
      }

      window.setTimeout(function () {
        _this15.initToc();

        _this15.initComment();

        _this15.onScroll();

        _this15.onResize();

        _this15.onClickMask();
      }, 100);
    }
  }]);

  return Theme;
}();

var themeInit = function themeInit() {
  var theme = new Theme();
  theme.init();
};

if (document.readyState !== 'loading') {
  themeInit();
} else {
  document.addEventListener('DOMContentLoaded', themeInit, false);
}
