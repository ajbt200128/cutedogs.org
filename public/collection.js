var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// node_modules/openseadragon/build/openseadragon/openseadragon.js
var require_openseadragon = __commonJS((exports, module) => {
  //! openseadragon 5.0.1
  //! Built on 2024-12-09
  //! Git commit: v5.0.1-0-480de92d
  //! http://openseadragon.github.io
  //! License: http://openseadragon.github.io/license/
  function OpenSeadragon(options) {
    return new OpenSeadragon.Viewer(options);
  }
  (function($) {
    $.version = {
      versionStr: "5.0.1",
      major: parseInt("5", 10),
      minor: parseInt("0", 10),
      revision: parseInt("1", 10)
    };
    var class2type = {
      "[object Boolean]": "boolean",
      "[object Number]": "number",
      "[object String]": "string",
      "[object Function]": "function",
      "[object AsyncFunction]": "function",
      "[object Promise]": "promise",
      "[object Array]": "array",
      "[object Date]": "date",
      "[object RegExp]": "regexp",
      "[object Object]": "object"
    }, toString = Object.prototype.toString, hasOwn = Object.prototype.hasOwnProperty;
    $.isFunction = function(obj) {
      return $.type(obj) === "function";
    };
    $.isArray = Array.isArray || function(obj) {
      return $.type(obj) === "array";
    };
    $.isWindow = function(obj) {
      return obj && typeof obj === "object" && "setInterval" in obj;
    };
    $.type = function(obj) {
      return obj === null || obj === undefined ? String(obj) : class2type[toString.call(obj)] || "object";
    };
    $.isPlainObject = function(obj) {
      if (!obj || OpenSeadragon.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
        return false;
      }
      if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
      var lastKey;
      for (var key in obj) {
        lastKey = key;
      }
      return lastKey === undefined || hasOwn.call(obj, lastKey);
    };
    $.isEmptyObject = function(obj) {
      for (var name in obj) {
        return false;
      }
      return true;
    };
    $.freezeObject = function(obj) {
      if (Object.freeze) {
        $.freezeObject = Object.freeze;
      } else {
        $.freezeObject = function(obj2) {
          return obj2;
        };
      }
      return $.freezeObject(obj);
    };
    $.supportsCanvas = function() {
      var canvasElement = document.createElement("canvas");
      return !!($.isFunction(canvasElement.getContext) && canvasElement.getContext("2d"));
    }();
    $.isCanvasTainted = function(canvas) {
      var isTainted = false;
      try {
        canvas.getContext("2d").getImageData(0, 0, 1, 1);
      } catch (e) {
        isTainted = true;
      }
      return isTainted;
    };
    $.supportsAddEventListener = function() {
      return !!(document.documentElement.addEventListener && document.addEventListener);
    }();
    $.supportsRemoveEventListener = function() {
      return !!(document.documentElement.removeEventListener && document.removeEventListener);
    }();
    $.supportsEventListenerOptions = function() {
      var supported = 0;
      if ($.supportsAddEventListener) {
        try {
          var options = {
            get capture() {
              supported++;
              return false;
            },
            get once() {
              supported++;
              return false;
            },
            get passive() {
              supported++;
              return false;
            }
          };
          window.addEventListener("test", null, options);
          window.removeEventListener("test", null, options);
        } catch (e) {
          supported = 0;
        }
      }
      return supported >= 3;
    }();
    $.getCurrentPixelDensityRatio = function() {
      if ($.supportsCanvas) {
        var context = document.createElement("canvas").getContext("2d");
        var devicePixelRatio = window.devicePixelRatio || 1;
        var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
        return Math.max(devicePixelRatio, 1) / backingStoreRatio;
      } else {
        return 1;
      }
    };
    $.pixelDensityRatio = $.getCurrentPixelDensityRatio();
  })(OpenSeadragon);
  (function($) {
    $.extend = function() {
      var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, length = arguments.length, deep = false, i = 1;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (typeof target !== "object" && !OpenSeadragon.isFunction(target)) {
        target = {};
      }
      if (length === i) {
        target = this;
        --i;
      }
      for (;i < length; i++) {
        options = arguments[i];
        if (options !== null || options !== undefined) {
          for (name in options) {
            var descriptor = Object.getOwnPropertyDescriptor(options, name);
            if (descriptor !== undefined) {
              if (descriptor.get || descriptor.set) {
                Object.defineProperty(target, name, descriptor);
                continue;
              }
              copy = descriptor.value;
            } else {
              $.console.warn('Could not copy inherited property "' + name + '".');
              continue;
            }
            if (target === copy) {
              continue;
            }
            if (deep && copy && (OpenSeadragon.isPlainObject(copy) || (copyIsArray = OpenSeadragon.isArray(copy)))) {
              src = target[name];
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && OpenSeadragon.isArray(src) ? src : [];
              } else {
                clone = src && OpenSeadragon.isPlainObject(src) ? src : {};
              }
              target[name] = OpenSeadragon.extend(deep, clone, copy);
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }
      return target;
    };
    var isIOSDevice = function() {
      if (typeof navigator !== "object") {
        return false;
      }
      var userAgent = navigator.userAgent;
      if (typeof userAgent !== "string") {
        return false;
      }
      return userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1 || userAgent.indexOf("iPod") !== -1;
    };
    $.extend($, {
      DEFAULT_SETTINGS: {
        xmlPath: null,
        tileSources: null,
        tileHost: null,
        initialPage: 0,
        crossOriginPolicy: false,
        ajaxWithCredentials: false,
        loadTilesWithAjax: false,
        ajaxHeaders: {},
        splitHashDataForPost: false,
        panHorizontal: true,
        panVertical: true,
        constrainDuringPan: false,
        wrapHorizontal: false,
        wrapVertical: false,
        visibilityRatio: 0.5,
        minPixelRatio: 0.5,
        defaultZoomLevel: 0,
        minZoomLevel: null,
        maxZoomLevel: null,
        homeFillsViewer: false,
        clickTimeThreshold: 300,
        clickDistThreshold: 5,
        dblClickTimeThreshold: 300,
        dblClickDistThreshold: 20,
        springStiffness: 6.5,
        animationTime: 1.2,
        gestureSettingsMouse: {
          dragToPan: true,
          scrollToZoom: true,
          clickToZoom: true,
          dblClickToZoom: false,
          dblClickDragToZoom: false,
          pinchToZoom: false,
          zoomToRefPoint: true,
          flickEnabled: false,
          flickMinSpeed: 120,
          flickMomentum: 0.25,
          pinchRotate: false
        },
        gestureSettingsTouch: {
          dragToPan: true,
          scrollToZoom: false,
          clickToZoom: false,
          dblClickToZoom: true,
          dblClickDragToZoom: true,
          pinchToZoom: true,
          zoomToRefPoint: true,
          flickEnabled: true,
          flickMinSpeed: 120,
          flickMomentum: 0.25,
          pinchRotate: false
        },
        gestureSettingsPen: {
          dragToPan: true,
          scrollToZoom: false,
          clickToZoom: true,
          dblClickToZoom: false,
          dblClickDragToZoom: false,
          pinchToZoom: false,
          zoomToRefPoint: true,
          flickEnabled: false,
          flickMinSpeed: 120,
          flickMomentum: 0.25,
          pinchRotate: false
        },
        gestureSettingsUnknown: {
          dragToPan: true,
          scrollToZoom: false,
          clickToZoom: false,
          dblClickToZoom: true,
          dblClickDragToZoom: false,
          pinchToZoom: true,
          zoomToRefPoint: true,
          flickEnabled: true,
          flickMinSpeed: 120,
          flickMomentum: 0.25,
          pinchRotate: false
        },
        zoomPerClick: 2,
        zoomPerScroll: 1.2,
        zoomPerDblClickDrag: 1.2,
        zoomPerSecond: 1,
        blendTime: 0,
        alwaysBlend: false,
        autoHideControls: true,
        immediateRender: false,
        minZoomImageRatio: 0.9,
        maxZoomPixelRatio: 1.1,
        smoothTileEdgesMinZoom: 1.1,
        iOSDevice: isIOSDevice(),
        pixelsPerWheelLine: 40,
        pixelsPerArrowPress: 40,
        autoResize: true,
        preserveImageSizeOnResize: false,
        minScrollDeltaTime: 50,
        rotationIncrement: 90,
        maxTilesPerFrame: 1,
        showSequenceControl: true,
        sequenceControlAnchor: null,
        preserveViewport: false,
        preserveOverlays: false,
        navPrevNextWrap: false,
        showNavigationControl: true,
        navigationControlAnchor: null,
        showZoomControl: true,
        showHomeControl: true,
        showFullPageControl: true,
        showRotationControl: false,
        showFlipControl: false,
        controlsFadeDelay: 2000,
        controlsFadeLength: 1500,
        mouseNavEnabled: true,
        showNavigator: false,
        navigatorElement: null,
        navigatorId: null,
        navigatorPosition: null,
        navigatorSizeRatio: 0.2,
        navigatorMaintainSizeRatio: false,
        navigatorTop: null,
        navigatorLeft: null,
        navigatorHeight: null,
        navigatorWidth: null,
        navigatorAutoResize: true,
        navigatorAutoFade: true,
        navigatorRotate: true,
        navigatorBackground: "#000",
        navigatorOpacity: 0.8,
        navigatorBorderColor: "#555",
        navigatorDisplayRegionColor: "#900",
        degrees: 0,
        flipped: false,
        overlayPreserveContentDirection: true,
        opacity: 1,
        compositeOperation: null,
        drawer: ["webgl", "canvas", "html"],
        drawerOptions: {
          webgl: {},
          canvas: {},
          html: {},
          custom: {}
        },
        preload: false,
        imageSmoothingEnabled: true,
        placeholderFillStyle: null,
        subPixelRoundingForTransparency: null,
        showReferenceStrip: false,
        referenceStripScroll: "horizontal",
        referenceStripElement: null,
        referenceStripHeight: null,
        referenceStripWidth: null,
        referenceStripPosition: "BOTTOM_LEFT",
        referenceStripSizeRatio: 0.2,
        collectionRows: 3,
        collectionColumns: 0,
        collectionLayout: "horizontal",
        collectionMode: false,
        collectionTileSize: 800,
        collectionTileMargin: 80,
        imageLoaderLimit: 0,
        maxImageCacheCount: 200,
        timeout: 30000,
        tileRetryMax: 0,
        tileRetryDelay: 2500,
        prefixUrl: "/images/",
        navImages: {
          zoomIn: {
            REST: "zoomin_rest.png",
            GROUP: "zoomin_grouphover.png",
            HOVER: "zoomin_hover.png",
            DOWN: "zoomin_pressed.png"
          },
          zoomOut: {
            REST: "zoomout_rest.png",
            GROUP: "zoomout_grouphover.png",
            HOVER: "zoomout_hover.png",
            DOWN: "zoomout_pressed.png"
          },
          home: {
            REST: "home_rest.png",
            GROUP: "home_grouphover.png",
            HOVER: "home_hover.png",
            DOWN: "home_pressed.png"
          },
          fullpage: {
            REST: "fullpage_rest.png",
            GROUP: "fullpage_grouphover.png",
            HOVER: "fullpage_hover.png",
            DOWN: "fullpage_pressed.png"
          },
          rotateleft: {
            REST: "rotateleft_rest.png",
            GROUP: "rotateleft_grouphover.png",
            HOVER: "rotateleft_hover.png",
            DOWN: "rotateleft_pressed.png"
          },
          rotateright: {
            REST: "rotateright_rest.png",
            GROUP: "rotateright_grouphover.png",
            HOVER: "rotateright_hover.png",
            DOWN: "rotateright_pressed.png"
          },
          flip: {
            REST: "flip_rest.png",
            GROUP: "flip_grouphover.png",
            HOVER: "flip_hover.png",
            DOWN: "flip_pressed.png"
          },
          previous: {
            REST: "previous_rest.png",
            GROUP: "previous_grouphover.png",
            HOVER: "previous_hover.png",
            DOWN: "previous_pressed.png"
          },
          next: {
            REST: "next_rest.png",
            GROUP: "next_grouphover.png",
            HOVER: "next_hover.png",
            DOWN: "next_pressed.png"
          }
        },
        debugMode: false,
        debugGridColor: ["#437AB2", "#1B9E77", "#D95F02", "#7570B3", "#E7298A", "#66A61E", "#E6AB02", "#A6761D", "#666666"],
        silenceMultiImageWarnings: false
      },
      delegate: function(object, method) {
        return function() {
          var args = arguments;
          if (args === undefined) {
            args = [];
          }
          return method.apply(object, args);
        };
      },
      BROWSERS: {
        UNKNOWN: 0,
        IE: 1,
        FIREFOX: 2,
        SAFARI: 3,
        CHROME: 4,
        OPERA: 5,
        EDGE: 6,
        CHROMEEDGE: 7
      },
      SUBPIXEL_ROUNDING_OCCURRENCES: {
        NEVER: 0,
        ONLY_AT_REST: 1,
        ALWAYS: 2
      },
      _viewers: new Map,
      getViewer: function(element) {
        return $._viewers.get(this.getElement(element));
      },
      getElement: function(element) {
        if (typeof element === "string") {
          element = document.getElementById(element);
        }
        return element;
      },
      getElementPosition: function(element) {
        var result = new $.Point, isFixed, offsetParent;
        element = $.getElement(element);
        isFixed = $.getElementStyle(element).position === "fixed";
        offsetParent = getOffsetParent(element, isFixed);
        while (offsetParent) {
          result.x += element.offsetLeft;
          result.y += element.offsetTop;
          if (isFixed) {
            result = result.plus($.getPageScroll());
          }
          element = offsetParent;
          isFixed = $.getElementStyle(element).position === "fixed";
          offsetParent = getOffsetParent(element, isFixed);
        }
        return result;
      },
      getElementOffset: function(element) {
        element = $.getElement(element);
        var doc = element && element.ownerDocument, docElement, win, boundingRect = { top: 0, left: 0 };
        if (!doc) {
          return new $.Point;
        }
        docElement = doc.documentElement;
        if (typeof element.getBoundingClientRect !== "undefined") {
          boundingRect = element.getBoundingClientRect();
        }
        win = doc === doc.window ? doc : doc.nodeType === 9 ? doc.defaultView || doc.parentWindow : false;
        return new $.Point(boundingRect.left + (win.pageXOffset || docElement.scrollLeft) - (docElement.clientLeft || 0), boundingRect.top + (win.pageYOffset || docElement.scrollTop) - (docElement.clientTop || 0));
      },
      getElementSize: function(element) {
        element = $.getElement(element);
        return new $.Point(element.clientWidth, element.clientHeight);
      },
      getElementStyle: document.documentElement.currentStyle ? function(element) {
        element = $.getElement(element);
        return element.currentStyle;
      } : function(element) {
        element = $.getElement(element);
        return window.getComputedStyle(element, "");
      },
      getCssPropertyWithVendorPrefix: function(property) {
        var memo = {};
        $.getCssPropertyWithVendorPrefix = function(property2) {
          if (memo[property2] !== undefined) {
            return memo[property2];
          }
          var style = document.createElement("div").style;
          var result = null;
          if (style[property2] !== undefined) {
            result = property2;
          } else {
            var prefixes = [
              "Webkit",
              "Moz",
              "MS",
              "O",
              "webkit",
              "moz",
              "ms",
              "o"
            ];
            var suffix = $.capitalizeFirstLetter(property2);
            for (var i = 0;i < prefixes.length; i++) {
              var prop = prefixes[i] + suffix;
              if (style[prop] !== undefined) {
                result = prop;
                break;
              }
            }
          }
          memo[property2] = result;
          return result;
        };
        return $.getCssPropertyWithVendorPrefix(property);
      },
      capitalizeFirstLetter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      positiveModulo: function(number, modulo) {
        var result = number % modulo;
        if (result < 0) {
          result += modulo;
        }
        return result;
      },
      pointInElement: function(element, point) {
        element = $.getElement(element);
        var offset = $.getElementOffset(element), size = $.getElementSize(element);
        return point.x >= offset.x && point.x < offset.x + size.x && point.y < offset.y + size.y && point.y >= offset.y;
      },
      getMousePosition: function(event) {
        if (typeof event.pageX === "number") {
          $.getMousePosition = function(event2) {
            var result = new $.Point;
            result.x = event2.pageX;
            result.y = event2.pageY;
            return result;
          };
        } else if (typeof event.clientX === "number") {
          $.getMousePosition = function(event2) {
            var result = new $.Point;
            result.x = event2.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            result.y = event2.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            return result;
          };
        } else {
          throw new Error("Unknown event mouse position, no known technique.");
        }
        return $.getMousePosition(event);
      },
      getPageScroll: function() {
        var docElement = document.documentElement || {}, body = document.body || {};
        if (typeof window.pageXOffset === "number") {
          $.getPageScroll = function() {
            return new $.Point(window.pageXOffset, window.pageYOffset);
          };
        } else if (body.scrollLeft || body.scrollTop) {
          $.getPageScroll = function() {
            return new $.Point(document.body.scrollLeft, document.body.scrollTop);
          };
        } else if (docElement.scrollLeft || docElement.scrollTop) {
          $.getPageScroll = function() {
            return new $.Point(document.documentElement.scrollLeft, document.documentElement.scrollTop);
          };
        } else {
          return new $.Point(0, 0);
        }
        return $.getPageScroll();
      },
      setPageScroll: function(scroll) {
        if (typeof window.scrollTo !== "undefined") {
          $.setPageScroll = function(scroll2) {
            window.scrollTo(scroll2.x, scroll2.y);
          };
        } else {
          var originalScroll = $.getPageScroll();
          if (originalScroll.x === scroll.x && originalScroll.y === scroll.y) {
            return;
          }
          document.body.scrollLeft = scroll.x;
          document.body.scrollTop = scroll.y;
          var currentScroll = $.getPageScroll();
          if (currentScroll.x !== originalScroll.x && currentScroll.y !== originalScroll.y) {
            $.setPageScroll = function(scroll2) {
              document.body.scrollLeft = scroll2.x;
              document.body.scrollTop = scroll2.y;
            };
            return;
          }
          document.documentElement.scrollLeft = scroll.x;
          document.documentElement.scrollTop = scroll.y;
          currentScroll = $.getPageScroll();
          if (currentScroll.x !== originalScroll.x && currentScroll.y !== originalScroll.y) {
            $.setPageScroll = function(scroll2) {
              document.documentElement.scrollLeft = scroll2.x;
              document.documentElement.scrollTop = scroll2.y;
            };
            return;
          }
          $.setPageScroll = function(scroll2) {};
        }
        $.setPageScroll(scroll);
      },
      getWindowSize: function() {
        var docElement = document.documentElement || {}, body = document.body || {};
        if (typeof window.innerWidth === "number") {
          $.getWindowSize = function() {
            return new $.Point(window.innerWidth, window.innerHeight);
          };
        } else if (docElement.clientWidth || docElement.clientHeight) {
          $.getWindowSize = function() {
            return new $.Point(document.documentElement.clientWidth, document.documentElement.clientHeight);
          };
        } else if (body.clientWidth || body.clientHeight) {
          $.getWindowSize = function() {
            return new $.Point(document.body.clientWidth, document.body.clientHeight);
          };
        } else {
          throw new Error("Unknown window size, no known technique.");
        }
        return $.getWindowSize();
      },
      makeCenteredNode: function(element) {
        element = $.getElement(element);
        var wrappers = [
          $.makeNeutralElement("div"),
          $.makeNeutralElement("div"),
          $.makeNeutralElement("div")
        ];
        $.extend(wrappers[0].style, {
          display: "table",
          height: "100%",
          width: "100%"
        });
        $.extend(wrappers[1].style, {
          display: "table-row"
        });
        $.extend(wrappers[2].style, {
          display: "table-cell",
          verticalAlign: "middle",
          textAlign: "center"
        });
        wrappers[0].appendChild(wrappers[1]);
        wrappers[1].appendChild(wrappers[2]);
        wrappers[2].appendChild(element);
        return wrappers[0];
      },
      makeNeutralElement: function(tagName) {
        var element = document.createElement(tagName), style = element.style;
        style.background = "transparent none";
        style.border = "none";
        style.margin = "0px";
        style.padding = "0px";
        style.position = "static";
        return element;
      },
      now: function() {
        if (Date.now) {
          $.now = Date.now;
        } else {
          $.now = function() {
            return new Date().getTime();
          };
        }
        return $.now();
      },
      makeTransparentImage: function(src) {
        var img = $.makeNeutralElement("img");
        img.src = src;
        return img;
      },
      setElementOpacity: function(element, opacity, usesAlpha) {
        var ieOpacity, ieFilter;
        element = $.getElement(element);
        if (usesAlpha && !$.Browser.alpha) {
          opacity = Math.round(opacity);
        }
        if ($.Browser.opacity) {
          element.style.opacity = opacity < 1 ? opacity : "";
        } else {
          if (opacity < 1) {
            ieOpacity = Math.round(100 * opacity);
            ieFilter = "alpha(opacity=" + ieOpacity + ")";
            element.style.filter = ieFilter;
          } else {
            element.style.filter = "";
          }
        }
      },
      setElementTouchActionNone: function(element) {
        element = $.getElement(element);
        if (typeof element.style.touchAction !== "undefined") {
          element.style.touchAction = "none";
        } else if (typeof element.style.msTouchAction !== "undefined") {
          element.style.msTouchAction = "none";
        }
      },
      setElementPointerEvents: function(element, value) {
        element = $.getElement(element);
        if (typeof element.style !== "undefined" && typeof element.style.pointerEvents !== "undefined") {
          element.style.pointerEvents = value;
        }
      },
      setElementPointerEventsNone: function(element) {
        $.setElementPointerEvents(element, "none");
      },
      addClass: function(element, className) {
        element = $.getElement(element);
        if (!element.className) {
          element.className = className;
        } else if ((" " + element.className + " ").indexOf(" " + className + " ") === -1) {
          element.className += " " + className;
        }
      },
      indexOf: function(array, searchElement, fromIndex) {
        if (Array.prototype.indexOf) {
          this.indexOf = function(array2, searchElement2, fromIndex2) {
            return array2.indexOf(searchElement2, fromIndex2);
          };
        } else {
          this.indexOf = function(array2, searchElement2, fromIndex2) {
            var i, pivot = fromIndex2 ? fromIndex2 : 0, length;
            if (!array2) {
              throw new TypeError;
            }
            length = array2.length;
            if (length === 0 || pivot >= length) {
              return -1;
            }
            if (pivot < 0) {
              pivot = length - Math.abs(pivot);
            }
            for (i = pivot;i < length; i++) {
              if (array2[i] === searchElement2) {
                return i;
              }
            }
            return -1;
          };
        }
        return this.indexOf(array, searchElement, fromIndex);
      },
      removeClass: function(element, className) {
        var oldClasses, newClasses = [], i;
        element = $.getElement(element);
        oldClasses = element.className.split(/\s+/);
        for (i = 0;i < oldClasses.length; i++) {
          if (oldClasses[i] && oldClasses[i] !== className) {
            newClasses.push(oldClasses[i]);
          }
        }
        element.className = newClasses.join(" ");
      },
      normalizeEventListenerOptions: function(options) {
        var opts;
        if (typeof options !== "undefined") {
          if (typeof options === "boolean") {
            opts = $.supportsEventListenerOptions ? { capture: options } : options;
          } else {
            opts = $.supportsEventListenerOptions ? options : typeof options.capture !== "undefined" ? options.capture : false;
          }
        } else {
          opts = $.supportsEventListenerOptions ? { capture: false } : false;
        }
        return opts;
      },
      addEvent: function() {
        if ($.supportsAddEventListener) {
          return function(element, eventName, handler, options) {
            options = $.normalizeEventListenerOptions(options);
            element = $.getElement(element);
            element.addEventListener(eventName, handler, options);
          };
        } else if (document.documentElement.attachEvent && document.attachEvent) {
          return function(element, eventName, handler) {
            element = $.getElement(element);
            element.attachEvent("on" + eventName, handler);
          };
        } else {
          throw new Error("No known event model.");
        }
      }(),
      removeEvent: function() {
        if ($.supportsRemoveEventListener) {
          return function(element, eventName, handler, options) {
            options = $.normalizeEventListenerOptions(options);
            element = $.getElement(element);
            element.removeEventListener(eventName, handler, options);
          };
        } else if (document.documentElement.detachEvent && document.detachEvent) {
          return function(element, eventName, handler) {
            element = $.getElement(element);
            element.detachEvent("on" + eventName, handler);
          };
        } else {
          throw new Error("No known event model.");
        }
      }(),
      cancelEvent: function(event) {
        event.preventDefault();
      },
      eventIsCanceled: function(event) {
        return event.defaultPrevented;
      },
      stopEvent: function(event) {
        event.stopPropagation();
      },
      createCallback: function(object, method) {
        console.error("The createCallback function is deprecated and will be removed in future versions. Please use alternativeFunction instead.");
        var initialArgs = [], i;
        for (i = 2;i < arguments.length; i++) {
          initialArgs.push(arguments[i]);
        }
        return function() {
          var args = initialArgs.concat([]), i2;
          for (i2 = 0;i2 < arguments.length; i2++) {
            args.push(arguments[i2]);
          }
          return method.apply(object, args);
        };
      },
      getUrlParameter: function(key) {
        var value = URLPARAMS[key];
        return value ? value : null;
      },
      getUrlProtocol: function(url) {
        var match = url.match(/^([a-z]+:)\/\//i);
        if (match === null) {
          return window.location.protocol;
        }
        return match[1].toLowerCase();
      },
      createAjaxRequest: function() {
        if (window.XMLHttpRequest) {
          $.createAjaxRequest = function() {
            return new XMLHttpRequest;
          };
          return new XMLHttpRequest;
        } else {
          throw new Error("Browser doesn't support XMLHttpRequest.");
        }
      },
      makeAjaxRequest: function(url, onSuccess, onError) {
        var withCredentials;
        var headers;
        var responseType;
        var postData;
        if ($.isPlainObject(url)) {
          onSuccess = url.success;
          onError = url.error;
          withCredentials = url.withCredentials;
          headers = url.headers;
          responseType = url.responseType || null;
          postData = url.postData || null;
          url = url.url;
        }
        var protocol = $.getUrlProtocol(url);
        var request = $.createAjaxRequest();
        if (!$.isFunction(onSuccess)) {
          throw new Error("makeAjaxRequest requires a success callback");
        }
        request.onreadystatechange = function() {
          if (request.readyState === 4) {
            request.onreadystatechange = function() {};
            if (request.status >= 200 && request.status < 300 || request.status === 0 && protocol !== "http:" && protocol !== "https:") {
              onSuccess(request);
            } else {
              if ($.isFunction(onError)) {
                onError(request);
              } else {
                $.console.error("AJAX request returned %d: %s", request.status, url);
              }
            }
          }
        };
        var method = postData ? "POST" : "GET";
        try {
          request.open(method, url, true);
          if (responseType) {
            request.responseType = responseType;
          }
          if (headers) {
            for (var headerName in headers) {
              if (Object.prototype.hasOwnProperty.call(headers, headerName) && headers[headerName]) {
                request.setRequestHeader(headerName, headers[headerName]);
              }
            }
          }
          if (withCredentials) {
            request.withCredentials = true;
          }
          request.send(postData);
        } catch (e) {
          $.console.error("%s while making AJAX request: %s", e.name, e.message);
          request.onreadystatechange = function() {};
          if ($.isFunction(onError)) {
            onError(request, e);
          }
        }
        return request;
      },
      jsonp: function(options) {
        var script, url = options.url, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement, jsonpCallback = options.callbackName || "openseadragon" + $.now(), previous = window[jsonpCallback], replace = "$1" + jsonpCallback + "$2", callbackParam = options.param || "callback", callback = options.callback;
        url = url.replace(/(=)\?(&|$)|\?\?/i, replace);
        url += (/\?/.test(url) ? "&" : "?") + callbackParam + "=" + jsonpCallback;
        window[jsonpCallback] = function(response) {
          if (!previous) {
            try {
              delete window[jsonpCallback];
            } catch (e) {}
          } else {
            window[jsonpCallback] = previous;
          }
          if (callback && $.isFunction(callback)) {
            callback(response);
          }
        };
        script = document.createElement("script");
        if (options.async !== undefined || options.async !== false) {
          script.async = "async";
        }
        if (options.scriptCharset) {
          script.charset = options.scriptCharset;
        }
        script.src = url;
        script.onload = script.onreadystatechange = function(_, isAbort) {
          if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            if (head && script.parentNode) {
              head.removeChild(script);
            }
            script = undefined;
          }
        };
        head.insertBefore(script, head.firstChild);
      },
      createFromDZI: function() {
        throw "OpenSeadragon.createFromDZI is deprecated, use Viewer.open.";
      },
      parseXml: function(string) {
        if (window.DOMParser) {
          $.parseXml = function(string2) {
            var xmlDoc = null, parser;
            parser = new DOMParser;
            xmlDoc = parser.parseFromString(string2, "text/xml");
            return xmlDoc;
          };
        } else {
          throw new Error("Browser doesn't support XML DOM.");
        }
        return $.parseXml(string);
      },
      parseJSON: function(string) {
        $.parseJSON = window.JSON.parse;
        return $.parseJSON(string);
      },
      imageFormatSupported: function(extension) {
        extension = extension ? extension : "";
        return !!FILEFORMATS[extension.toLowerCase()];
      },
      setImageFormatsSupported: function(formats) {
        $.extend(FILEFORMATS, formats);
      }
    });
    var nullfunction = function(msg) {};
    $.console = window.console || {
      log: nullfunction,
      debug: nullfunction,
      info: nullfunction,
      warn: nullfunction,
      error: nullfunction,
      assert: nullfunction
    };
    $.Browser = {
      vendor: $.BROWSERS.UNKNOWN,
      version: 0,
      alpha: true
    };
    var FILEFORMATS = {
      avif: true,
      bmp: false,
      jpeg: true,
      jpg: true,
      png: true,
      tif: false,
      wdp: false,
      webp: true
    }, URLPARAMS = {};
    (function() {
      var { appVersion: ver, userAgent: ua } = navigator, regex;
      switch (navigator.appName) {
        case "Microsoft Internet Explorer":
          if (!!window.attachEvent && !!window.ActiveXObject) {
            $.Browser.vendor = $.BROWSERS.IE;
            $.Browser.version = parseFloat(ua.substring(ua.indexOf("MSIE") + 5, ua.indexOf(";", ua.indexOf("MSIE"))));
          }
          break;
        case "Netscape":
          if (window.addEventListener) {
            if (ua.indexOf("Edge") >= 0) {
              $.Browser.vendor = $.BROWSERS.EDGE;
              $.Browser.version = parseFloat(ua.substring(ua.indexOf("Edge") + 5));
            } else if (ua.indexOf("Edg") >= 0) {
              $.Browser.vendor = $.BROWSERS.CHROMEEDGE;
              $.Browser.version = parseFloat(ua.substring(ua.indexOf("Edg") + 4));
            } else if (ua.indexOf("Firefox") >= 0) {
              $.Browser.vendor = $.BROWSERS.FIREFOX;
              $.Browser.version = parseFloat(ua.substring(ua.indexOf("Firefox") + 8));
            } else if (ua.indexOf("Safari") >= 0) {
              $.Browser.vendor = ua.indexOf("Chrome") >= 0 ? $.BROWSERS.CHROME : $.BROWSERS.SAFARI;
              $.Browser.version = parseFloat(ua.substring(ua.substring(0, ua.indexOf("Safari")).lastIndexOf("/") + 1, ua.indexOf("Safari")));
            } else {
              regex = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
              if (regex.exec(ua) !== null) {
                $.Browser.vendor = $.BROWSERS.IE;
                $.Browser.version = parseFloat(RegExp.$1);
              }
            }
          }
          break;
        case "Opera":
          $.Browser.vendor = $.BROWSERS.OPERA;
          $.Browser.version = parseFloat(ver);
          break;
      }
      var query = window.location.search.substring(1), parts = query.split("&"), part, sep, i;
      for (i = 0;i < parts.length; i++) {
        part = parts[i];
        sep = part.indexOf("=");
        if (sep > 0) {
          var key = part.substring(0, sep), value = part.substring(sep + 1);
          try {
            URLPARAMS[key] = decodeURIComponent(value);
          } catch (e) {
            $.console.error("Ignoring malformed URL parameter: %s=%s", key, value);
          }
        }
      }
      $.Browser.alpha = !($.Browser.vendor === $.BROWSERS.CHROME && $.Browser.version < 2);
      $.Browser.opacity = true;
      if ($.Browser.vendor === $.BROWSERS.IE) {
        $.console.error("Internet Explorer is not supported by OpenSeadragon");
      }
    })();
    (function(w) {
      var requestAnimationFrame = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame;
      var cancelAnimationFrame = w.cancelAnimationFrame || w.mozCancelAnimationFrame || w.webkitCancelAnimationFrame || w.msCancelAnimationFrame;
      if (requestAnimationFrame && cancelAnimationFrame) {
        $.requestAnimationFrame = function() {
          return requestAnimationFrame.apply(w, arguments);
        };
        $.cancelAnimationFrame = function() {
          return cancelAnimationFrame.apply(w, arguments);
        };
      } else {
        var aAnimQueue = [], processing = [], iRequestId = 0, iIntervalId;
        $.requestAnimationFrame = function(callback) {
          aAnimQueue.push([++iRequestId, callback]);
          if (!iIntervalId) {
            iIntervalId = setInterval(function() {
              if (aAnimQueue.length) {
                var time = $.now();
                var temp = processing;
                processing = aAnimQueue;
                aAnimQueue = temp;
                while (processing.length) {
                  processing.shift()[1](time);
                }
              } else {
                clearInterval(iIntervalId);
                iIntervalId = undefined;
              }
            }, 1000 / 50);
          }
          return iRequestId;
        };
        $.cancelAnimationFrame = function(requestId) {
          var i, j;
          for (i = 0, j = aAnimQueue.length;i < j; i += 1) {
            if (aAnimQueue[i][0] === requestId) {
              aAnimQueue.splice(i, 1);
              return;
            }
          }
          for (i = 0, j = processing.length;i < j; i += 1) {
            if (processing[i][0] === requestId) {
              processing.splice(i, 1);
              return;
            }
          }
        };
      }
    })(window);
    function getOffsetParent(element, isFixed) {
      if (isFixed && element !== document.body) {
        return document.body;
      } else {
        return element.offsetParent;
      }
    }
  })(OpenSeadragon);
  (function(root, factory) {
    if (typeof define === "function" && define.amd) {
      define([], factory);
    } else if (typeof module === "object" && module.exports) {
      module.exports = factory();
    } else {
      root.OpenSeadragon = factory();
    }
  })(exports, function() {
    return OpenSeadragon;
  });
  (function($) {

    class Mat3 {
      constructor(values) {
        if (!values) {
          values = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ];
        }
        this.values = values;
      }
      static makeIdentity() {
        return new Mat3([
          1,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          1
        ]);
      }
      static makeTranslation(tx, ty) {
        return new Mat3([
          1,
          0,
          0,
          0,
          1,
          0,
          tx,
          ty,
          1
        ]);
      }
      static makeRotation(angleInRadians) {
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);
        return new Mat3([
          c,
          -s,
          0,
          s,
          c,
          0,
          0,
          0,
          1
        ]);
      }
      static makeScaling(sx, sy) {
        return new Mat3([
          sx,
          0,
          0,
          0,
          sy,
          0,
          0,
          0,
          1
        ]);
      }
      multiply(other) {
        let a = this.values;
        let b = other.values;
        var a00 = a[0 * 3 + 0];
        var a01 = a[0 * 3 + 1];
        var a02 = a[0 * 3 + 2];
        var a10 = a[1 * 3 + 0];
        var a11 = a[1 * 3 + 1];
        var a12 = a[1 * 3 + 2];
        var a20 = a[2 * 3 + 0];
        var a21 = a[2 * 3 + 1];
        var a22 = a[2 * 3 + 2];
        var b00 = b[0 * 3 + 0];
        var b01 = b[0 * 3 + 1];
        var b02 = b[0 * 3 + 2];
        var b10 = b[1 * 3 + 0];
        var b11 = b[1 * 3 + 1];
        var b12 = b[1 * 3 + 2];
        var b20 = b[2 * 3 + 0];
        var b21 = b[2 * 3 + 1];
        var b22 = b[2 * 3 + 2];
        return new Mat3([
          b00 * a00 + b01 * a10 + b02 * a20,
          b00 * a01 + b01 * a11 + b02 * a21,
          b00 * a02 + b01 * a12 + b02 * a22,
          b10 * a00 + b11 * a10 + b12 * a20,
          b10 * a01 + b11 * a11 + b12 * a21,
          b10 * a02 + b11 * a12 + b12 * a22,
          b20 * a00 + b21 * a10 + b22 * a20,
          b20 * a01 + b21 * a11 + b22 * a21,
          b20 * a02 + b21 * a12 + b22 * a22
        ]);
      }
    }
    $.Mat3 = Mat3;
  })(OpenSeadragon);
  (function($) {
    var fullScreenApi = {
      supportsFullScreen: false,
      isFullScreen: function() {
        return false;
      },
      getFullScreenElement: function() {
        return null;
      },
      requestFullScreen: function() {},
      exitFullScreen: function() {},
      cancelFullScreen: function() {},
      fullScreenEventName: "",
      fullScreenErrorEventName: ""
    };
    if (document.exitFullscreen) {
      fullScreenApi.supportsFullScreen = true;
      fullScreenApi.getFullScreenElement = function() {
        return document.fullscreenElement;
      };
      fullScreenApi.requestFullScreen = function(element) {
        return element.requestFullscreen().catch(function(msg) {
          $.console.error("Fullscreen request failed: ", msg);
        });
      };
      fullScreenApi.exitFullScreen = function() {
        document.exitFullscreen().catch(function(msg) {
          $.console.error("Error while exiting fullscreen: ", msg);
        });
      };
      fullScreenApi.fullScreenEventName = "fullscreenchange";
      fullScreenApi.fullScreenErrorEventName = "fullscreenerror";
    } else if (document.msExitFullscreen) {
      fullScreenApi.supportsFullScreen = true;
      fullScreenApi.getFullScreenElement = function() {
        return document.msFullscreenElement;
      };
      fullScreenApi.requestFullScreen = function(element) {
        return element.msRequestFullscreen();
      };
      fullScreenApi.exitFullScreen = function() {
        document.msExitFullscreen();
      };
      fullScreenApi.fullScreenEventName = "MSFullscreenChange";
      fullScreenApi.fullScreenErrorEventName = "MSFullscreenError";
    } else if (document.webkitExitFullscreen) {
      fullScreenApi.supportsFullScreen = true;
      fullScreenApi.getFullScreenElement = function() {
        return document.webkitFullscreenElement;
      };
      fullScreenApi.requestFullScreen = function(element) {
        return element.webkitRequestFullscreen();
      };
      fullScreenApi.exitFullScreen = function() {
        document.webkitExitFullscreen();
      };
      fullScreenApi.fullScreenEventName = "webkitfullscreenchange";
      fullScreenApi.fullScreenErrorEventName = "webkitfullscreenerror";
    } else if (document.webkitCancelFullScreen) {
      fullScreenApi.supportsFullScreen = true;
      fullScreenApi.getFullScreenElement = function() {
        return document.webkitCurrentFullScreenElement;
      };
      fullScreenApi.requestFullScreen = function(element) {
        return element.webkitRequestFullScreen();
      };
      fullScreenApi.exitFullScreen = function() {
        document.webkitCancelFullScreen();
      };
      fullScreenApi.fullScreenEventName = "webkitfullscreenchange";
      fullScreenApi.fullScreenErrorEventName = "webkitfullscreenerror";
    } else if (document.mozCancelFullScreen) {
      fullScreenApi.supportsFullScreen = true;
      fullScreenApi.getFullScreenElement = function() {
        return document.mozFullScreenElement;
      };
      fullScreenApi.requestFullScreen = function(element) {
        return element.mozRequestFullScreen();
      };
      fullScreenApi.exitFullScreen = function() {
        document.mozCancelFullScreen();
      };
      fullScreenApi.fullScreenEventName = "mozfullscreenchange";
      fullScreenApi.fullScreenErrorEventName = "mozfullscreenerror";
    }
    fullScreenApi.isFullScreen = function() {
      return fullScreenApi.getFullScreenElement() !== null;
    };
    fullScreenApi.cancelFullScreen = function() {
      $.console.error("cancelFullScreen is deprecated. Use exitFullScreen instead.");
      fullScreenApi.exitFullScreen();
    };
    $.extend($, fullScreenApi);
  })(OpenSeadragon);
  (function($) {
    $.EventSource = function() {
      this.events = {};
      this._rejectedEventList = {};
    };
    $.EventSource.prototype = {
      addOnceHandler: function(eventName, handler, userData, times, priority) {
        var self = this;
        times = times || 1;
        var count = 0;
        var onceHandler = function(event) {
          count++;
          if (count === times) {
            self.removeHandler(eventName, onceHandler);
          }
          return handler(event);
        };
        return this.addHandler(eventName, onceHandler, userData, priority);
      },
      addHandler: function(eventName, handler, userData, priority) {
        if (Object.prototype.hasOwnProperty.call(this._rejectedEventList, eventName)) {
          $.console.error(`Error adding handler for ${eventName}. ${this._rejectedEventList[eventName]}`);
          return false;
        }
        var events = this.events[eventName];
        if (!events) {
          this.events[eventName] = events = [];
        }
        if (handler && $.isFunction(handler)) {
          var index = events.length, event = { handler, userData: userData || null, priority: priority || 0 };
          events[index] = event;
          while (index > 0 && events[index - 1].priority < events[index].priority) {
            events[index] = events[index - 1];
            events[index - 1] = event;
            index--;
          }
        }
        return true;
      },
      removeHandler: function(eventName, handler) {
        var events = this.events[eventName], handlers = [], i;
        if (!events) {
          return;
        }
        if ($.isArray(events)) {
          for (i = 0;i < events.length; i++) {
            if (events[i].handler !== handler) {
              handlers.push(events[i]);
            }
          }
          this.events[eventName] = handlers;
        }
      },
      numberOfHandlers: function(eventName) {
        var events = this.events[eventName];
        if (!events) {
          return 0;
        }
        return events.length;
      },
      removeAllHandlers: function(eventName) {
        if (eventName) {
          this.events[eventName] = [];
        } else {
          for (var eventType in this.events) {
            this.events[eventType] = [];
          }
        }
      },
      getHandler: function(eventName) {
        var events = this.events[eventName];
        if (!events || !events.length) {
          return null;
        }
        events = events.length === 1 ? [events[0]] : Array.apply(null, events);
        return function(source, args) {
          var i, length = events.length;
          for (i = 0;i < length; i++) {
            if (events[i]) {
              args.eventSource = source;
              args.userData = events[i].userData;
              events[i].handler(args);
            }
          }
        };
      },
      raiseEvent: function(eventName, eventArgs) {
        if (Object.prototype.hasOwnProperty.call(this._rejectedEventList, eventName)) {
          $.console.error(`Error adding handler for ${eventName}. ${this._rejectedEventList[eventName]}`);
          return false;
        }
        var handler = this.getHandler(eventName);
        if (handler) {
          handler(this, eventArgs || {});
        }
        return true;
      },
      rejectEventHandler(eventName, errorMessage = "") {
        this._rejectedEventList[eventName] = errorMessage;
      },
      allowEventHandler(eventName) {
        delete this._rejectedEventList[eventName];
      }
    };
  })(OpenSeadragon);
  (function($) {
    var MOUSETRACKERS = [];
    var THIS = {};
    $.MouseTracker = function(options) {
      MOUSETRACKERS.push(this);
      var args = arguments;
      if (!$.isPlainObject(options)) {
        options = {
          element: args[0],
          clickTimeThreshold: args[1],
          clickDistThreshold: args[2]
        };
      }
      this.hash = Math.random();
      this.element = $.getElement(options.element);
      this.clickTimeThreshold = options.clickTimeThreshold || $.DEFAULT_SETTINGS.clickTimeThreshold;
      this.clickDistThreshold = options.clickDistThreshold || $.DEFAULT_SETTINGS.clickDistThreshold;
      this.dblClickTimeThreshold = options.dblClickTimeThreshold || $.DEFAULT_SETTINGS.dblClickTimeThreshold;
      this.dblClickDistThreshold = options.dblClickDistThreshold || $.DEFAULT_SETTINGS.dblClickDistThreshold;
      this.userData = options.userData || null;
      this.stopDelay = options.stopDelay || 50;
      this.preProcessEventHandler = options.preProcessEventHandler || null;
      this.contextMenuHandler = options.contextMenuHandler || null;
      this.enterHandler = options.enterHandler || null;
      this.leaveHandler = options.leaveHandler || null;
      this.exitHandler = options.exitHandler || null;
      this.overHandler = options.overHandler || null;
      this.outHandler = options.outHandler || null;
      this.pressHandler = options.pressHandler || null;
      this.nonPrimaryPressHandler = options.nonPrimaryPressHandler || null;
      this.releaseHandler = options.releaseHandler || null;
      this.nonPrimaryReleaseHandler = options.nonPrimaryReleaseHandler || null;
      this.moveHandler = options.moveHandler || null;
      this.scrollHandler = options.scrollHandler || null;
      this.clickHandler = options.clickHandler || null;
      this.dblClickHandler = options.dblClickHandler || null;
      this.dragHandler = options.dragHandler || null;
      this.dragEndHandler = options.dragEndHandler || null;
      this.pinchHandler = options.pinchHandler || null;
      this.stopHandler = options.stopHandler || null;
      this.keyDownHandler = options.keyDownHandler || null;
      this.keyUpHandler = options.keyUpHandler || null;
      this.keyHandler = options.keyHandler || null;
      this.focusHandler = options.focusHandler || null;
      this.blurHandler = options.blurHandler || null;
      var _this = this;
      THIS[this.hash] = {
        click: function(event) {
          onClick(_this, event);
        },
        dblclick: function(event) {
          onDblClick(_this, event);
        },
        keydown: function(event) {
          onKeyDown(_this, event);
        },
        keyup: function(event) {
          onKeyUp(_this, event);
        },
        keypress: function(event) {
          onKeyPress(_this, event);
        },
        focus: function(event) {
          onFocus(_this, event);
        },
        blur: function(event) {
          onBlur(_this, event);
        },
        contextmenu: function(event) {
          onContextMenu(_this, event);
        },
        wheel: function(event) {
          onWheel(_this, event);
        },
        mousewheel: function(event) {
          onMouseWheel(_this, event);
        },
        DOMMouseScroll: function(event) {
          onMouseWheel(_this, event);
        },
        MozMousePixelScroll: function(event) {
          onMouseWheel(_this, event);
        },
        losecapture: function(event) {
          onLoseCapture(_this, event);
        },
        mouseenter: function(event) {
          onPointerEnter(_this, event);
        },
        mouseleave: function(event) {
          onPointerLeave(_this, event);
        },
        mouseover: function(event) {
          onPointerOver(_this, event);
        },
        mouseout: function(event) {
          onPointerOut(_this, event);
        },
        mousedown: function(event) {
          onPointerDown(_this, event);
        },
        mouseup: function(event) {
          onPointerUp(_this, event);
        },
        mousemove: function(event) {
          onPointerMove(_this, event);
        },
        touchstart: function(event) {
          onTouchStart(_this, event);
        },
        touchend: function(event) {
          onTouchEnd(_this, event);
        },
        touchmove: function(event) {
          onTouchMove(_this, event);
        },
        touchcancel: function(event) {
          onTouchCancel(_this, event);
        },
        gesturestart: function(event) {
          onGestureStart(_this, event);
        },
        gesturechange: function(event) {
          onGestureChange(_this, event);
        },
        gotpointercapture: function(event) {
          onGotPointerCapture(_this, event);
        },
        lostpointercapture: function(event) {
          onLostPointerCapture(_this, event);
        },
        pointerenter: function(event) {
          onPointerEnter(_this, event);
        },
        pointerleave: function(event) {
          onPointerLeave(_this, event);
        },
        pointerover: function(event) {
          onPointerOver(_this, event);
        },
        pointerout: function(event) {
          onPointerOut(_this, event);
        },
        pointerdown: function(event) {
          onPointerDown(_this, event);
        },
        pointerup: function(event) {
          onPointerUp(_this, event);
        },
        pointermove: function(event) {
          onPointerMove(_this, event);
        },
        pointercancel: function(event) {
          onPointerCancel(_this, event);
        },
        pointerupcaptured: function(event) {
          onPointerUpCaptured(_this, event);
        },
        pointermovecaptured: function(event) {
          onPointerMoveCaptured(_this, event);
        },
        tracking: false,
        activePointersLists: [],
        lastClickPos: null,
        dblClickTimeOut: null,
        pinchGPoints: [],
        lastPinchDist: 0,
        currentPinchDist: 0,
        lastPinchCenter: null,
        currentPinchCenter: null,
        sentDragEvent: false
      };
      this.hasGestureHandlers = !!(this.pressHandler || this.nonPrimaryPressHandler || this.releaseHandler || this.nonPrimaryReleaseHandler || this.clickHandler || this.dblClickHandler || this.dragHandler || this.dragEndHandler || this.pinchHandler);
      this.hasScrollHandler = !!this.scrollHandler;
      if ($.MouseTracker.havePointerEvents) {
        $.setElementPointerEvents(this.element, "auto");
      }
      if (this.exitHandler) {
        $.console.error("MouseTracker.exitHandler is deprecated. Use MouseTracker.leaveHandler instead.");
      }
      if (!options.startDisabled) {
        this.setTracking(true);
      }
    };
    $.MouseTracker.prototype = {
      destroy: function() {
        var i;
        stopTracking(this);
        this.element = null;
        for (i = 0;i < MOUSETRACKERS.length; i++) {
          if (MOUSETRACKERS[i] === this) {
            MOUSETRACKERS.splice(i, 1);
            break;
          }
        }
        THIS[this.hash] = null;
        delete THIS[this.hash];
      },
      isTracking: function() {
        return THIS[this.hash].tracking;
      },
      setTracking: function(track) {
        if (track) {
          startTracking(this);
        } else {
          stopTracking(this);
        }
        return this;
      },
      getActivePointersListByType: function(type) {
        var delegate = THIS[this.hash], i, len = delegate ? delegate.activePointersLists.length : 0, list;
        for (i = 0;i < len; i++) {
          if (delegate.activePointersLists[i].type === type) {
            return delegate.activePointersLists[i];
          }
        }
        list = new $.MouseTracker.GesturePointList(type);
        if (delegate) {
          delegate.activePointersLists.push(list);
        }
        return list;
      },
      getActivePointerCount: function() {
        var delegate = THIS[this.hash], i, len = delegate.activePointersLists.length, count = 0;
        for (i = 0;i < len; i++) {
          count += delegate.activePointersLists[i].getLength();
        }
        return count;
      },
      preProcessEventHandler: function() {},
      contextMenuHandler: function() {},
      enterHandler: function() {},
      leaveHandler: function() {},
      exitHandler: function() {},
      overHandler: function() {},
      outHandler: function() {},
      pressHandler: function() {},
      nonPrimaryPressHandler: function() {},
      releaseHandler: function() {},
      nonPrimaryReleaseHandler: function() {},
      moveHandler: function() {},
      scrollHandler: function() {},
      clickHandler: function() {},
      dblClickHandler: function() {},
      dragHandler: function() {},
      dragEndHandler: function() {},
      pinchHandler: function() {},
      stopHandler: function() {},
      keyDownHandler: function() {},
      keyUpHandler: function() {},
      keyHandler: function() {},
      focusHandler: function() {},
      blurHandler: function() {}
    };
    var isInIframe = function() {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    }();
    function canAccessEvents(target) {
      try {
        return target.addEventListener && target.removeEventListener;
      } catch (e) {
        return false;
      }
    }
    $.MouseTracker.gesturePointVelocityTracker = function() {
      var trackerPoints = [], intervalId = 0, lastTime = 0;
      var _generateGuid = function(tracker, gPoint) {
        return tracker.hash.toString() + gPoint.type + gPoint.id.toString();
      };
      var _doTracking = function() {
        var i, len = trackerPoints.length, trackPoint, gPoint, now = $.now(), elapsedTime, distance, speed;
        elapsedTime = now - lastTime;
        lastTime = now;
        for (i = 0;i < len; i++) {
          trackPoint = trackerPoints[i];
          gPoint = trackPoint.gPoint;
          gPoint.direction = Math.atan2(gPoint.currentPos.y - trackPoint.lastPos.y, gPoint.currentPos.x - trackPoint.lastPos.x);
          distance = trackPoint.lastPos.distanceTo(gPoint.currentPos);
          trackPoint.lastPos = gPoint.currentPos;
          speed = 1000 * distance / (elapsedTime + 1);
          gPoint.speed = 0.75 * speed + 0.25 * gPoint.speed;
        }
      };
      var addPoint = function(tracker, gPoint) {
        var guid = _generateGuid(tracker, gPoint);
        trackerPoints.push({
          guid,
          gPoint,
          lastPos: gPoint.currentPos
        });
        if (trackerPoints.length === 1) {
          lastTime = $.now();
          intervalId = window.setInterval(_doTracking, 50);
        }
      };
      var removePoint = function(tracker, gPoint) {
        var guid = _generateGuid(tracker, gPoint), i, len = trackerPoints.length;
        for (i = 0;i < len; i++) {
          if (trackerPoints[i].guid === guid) {
            trackerPoints.splice(i, 1);
            len--;
            if (len === 0) {
              window.clearInterval(intervalId);
            }
            break;
          }
        }
      };
      return {
        addPoint,
        removePoint
      };
    }();
    $.MouseTracker.captureElement = document;
    $.MouseTracker.wheelEventName = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
    $.MouseTracker.subscribeEvents = ["click", "dblclick", "keydown", "keyup", "keypress", "focus", "blur", "contextmenu", $.MouseTracker.wheelEventName];
    if ($.MouseTracker.wheelEventName === "DOMMouseScroll") {
      $.MouseTracker.subscribeEvents.push("MozMousePixelScroll");
    }
    if (window.PointerEvent) {
      $.MouseTracker.havePointerEvents = true;
      $.MouseTracker.subscribeEvents.push("pointerenter", "pointerleave", "pointerover", "pointerout", "pointerdown", "pointerup", "pointermove", "pointercancel");
      $.MouseTracker.havePointerCapture = function() {
        var divElement = document.createElement("div");
        return $.isFunction(divElement.setPointerCapture) && $.isFunction(divElement.releasePointerCapture);
      }();
      if ($.MouseTracker.havePointerCapture) {
        $.MouseTracker.subscribeEvents.push("gotpointercapture", "lostpointercapture");
      }
    } else {
      $.MouseTracker.havePointerEvents = false;
      $.MouseTracker.subscribeEvents.push("mouseenter", "mouseleave", "mouseover", "mouseout", "mousedown", "mouseup", "mousemove");
      $.MouseTracker.mousePointerId = "legacy-mouse";
      $.MouseTracker.havePointerCapture = function() {
        var divElement = document.createElement("div");
        return $.isFunction(divElement.setCapture) && $.isFunction(divElement.releaseCapture);
      }();
      if ($.MouseTracker.havePointerCapture) {
        $.MouseTracker.subscribeEvents.push("losecapture");
      }
      if ("ontouchstart" in window) {
        $.MouseTracker.subscribeEvents.push("touchstart", "touchend", "touchmove", "touchcancel");
      }
      if ("ongesturestart" in window) {
        $.MouseTracker.subscribeEvents.push("gesturestart", "gesturechange");
      }
    }
    $.MouseTracker.GesturePointList = function(type) {
      this._gPoints = [];
      this.type = type;
      this.buttons = 0;
      this.contacts = 0;
      this.clicks = 0;
      this.captureCount = 0;
    };
    $.MouseTracker.GesturePointList.prototype = {
      getLength: function() {
        return this._gPoints.length;
      },
      asArray: function() {
        return this._gPoints;
      },
      add: function(gp) {
        return this._gPoints.push(gp);
      },
      removeById: function(id) {
        var i, len = this._gPoints.length;
        for (i = 0;i < len; i++) {
          if (this._gPoints[i].id === id) {
            this._gPoints.splice(i, 1);
            break;
          }
        }
        return this._gPoints.length;
      },
      getByIndex: function(index) {
        if (index < this._gPoints.length) {
          return this._gPoints[index];
        }
        return null;
      },
      getById: function(id) {
        var i, len = this._gPoints.length;
        for (i = 0;i < len; i++) {
          if (this._gPoints[i].id === id) {
            return this._gPoints[i];
          }
        }
        return null;
      },
      getPrimary: function(id) {
        var i, len = this._gPoints.length;
        for (i = 0;i < len; i++) {
          if (this._gPoints[i].isPrimary) {
            return this._gPoints[i];
          }
        }
        return null;
      },
      addContact: function() {
        ++this.contacts;
        if (this.contacts > 1 && (this.type === "mouse" || this.type === "pen")) {
          $.console.warn("GesturePointList.addContact() Implausible contacts value");
          this.contacts = 1;
        }
      },
      removeContact: function() {
        --this.contacts;
        if (this.contacts < 0) {
          this.contacts = 0;
        }
      }
    };
    function clearTrackedPointers(tracker) {
      var delegate = THIS[tracker.hash], i, j, pointsList, gPoints, gPointsToRemove, pointerListCount = delegate.activePointersLists.length;
      for (i = 0;i < pointerListCount; i++) {
        pointsList = delegate.activePointersLists[i];
        if (pointsList.getLength() > 0) {
          gPointsToRemove = [];
          gPoints = pointsList.asArray();
          for (j = 0;j < gPoints.length; j++) {
            gPointsToRemove.push(gPoints[j]);
          }
          for (j = 0;j < gPointsToRemove.length; j++) {
            stopTrackingPointer(tracker, pointsList, gPointsToRemove[j]);
          }
        }
      }
      for (i = 0;i < pointerListCount; i++) {
        delegate.activePointersLists.pop();
      }
      delegate.sentDragEvent = false;
    }
    function startTracking(tracker) {
      var delegate = THIS[tracker.hash], event, i;
      if (!delegate.tracking) {
        for (i = 0;i < $.MouseTracker.subscribeEvents.length; i++) {
          event = $.MouseTracker.subscribeEvents[i];
          $.addEvent(tracker.element, event, delegate[event], event === $.MouseTracker.wheelEventName ? { passive: false, capture: false } : false);
        }
        clearTrackedPointers(tracker);
        delegate.tracking = true;
      }
    }
    function stopTracking(tracker) {
      var delegate = THIS[tracker.hash], event, i;
      if (delegate.tracking) {
        for (i = 0;i < $.MouseTracker.subscribeEvents.length; i++) {
          event = $.MouseTracker.subscribeEvents[i];
          $.removeEvent(tracker.element, event, delegate[event], false);
        }
        clearTrackedPointers(tracker);
        delegate.tracking = false;
      }
    }
    function getCaptureEventParams(tracker, pointerType) {
      var delegate = THIS[tracker.hash];
      if (pointerType === "pointerevent") {
        return {
          upName: "pointerup",
          upHandler: delegate.pointerupcaptured,
          moveName: "pointermove",
          moveHandler: delegate.pointermovecaptured
        };
      } else if (pointerType === "mouse") {
        return {
          upName: "pointerup",
          upHandler: delegate.pointerupcaptured,
          moveName: "pointermove",
          moveHandler: delegate.pointermovecaptured
        };
      } else if (pointerType === "touch") {
        return {
          upName: "touchend",
          upHandler: delegate.touchendcaptured,
          moveName: "touchmove",
          moveHandler: delegate.touchmovecaptured
        };
      } else {
        throw new Error("MouseTracker.getCaptureEventParams: Unknown pointer type.");
      }
    }
    function capturePointer(tracker, gPoint) {
      var eventParams;
      if ($.MouseTracker.havePointerCapture) {
        if ($.MouseTracker.havePointerEvents) {
          try {
            tracker.element.setPointerCapture(gPoint.id);
          } catch (e) {
            $.console.warn("setPointerCapture() called on invalid pointer ID");
            return;
          }
        } else {
          tracker.element.setCapture(true);
        }
      } else {
        eventParams = getCaptureEventParams(tracker, $.MouseTracker.havePointerEvents ? "pointerevent" : gPoint.type);
        if (isInIframe && canAccessEvents(window.top)) {
          $.addEvent(window.top, eventParams.upName, eventParams.upHandler, true);
        }
        $.addEvent($.MouseTracker.captureElement, eventParams.upName, eventParams.upHandler, true);
        $.addEvent($.MouseTracker.captureElement, eventParams.moveName, eventParams.moveHandler, true);
      }
      updatePointerCaptured(tracker, gPoint, true);
    }
    function releasePointer(tracker, gPoint) {
      var eventParams;
      var pointsList;
      var cachedGPoint;
      if ($.MouseTracker.havePointerCapture) {
        if ($.MouseTracker.havePointerEvents) {
          pointsList = tracker.getActivePointersListByType(gPoint.type);
          cachedGPoint = pointsList.getById(gPoint.id);
          if (!cachedGPoint || !cachedGPoint.captured) {
            return;
          }
          try {
            tracker.element.releasePointerCapture(gPoint.id);
          } catch (e) {}
        } else {
          tracker.element.releaseCapture();
        }
      } else {
        eventParams = getCaptureEventParams(tracker, $.MouseTracker.havePointerEvents ? "pointerevent" : gPoint.type);
        if (isInIframe && canAccessEvents(window.top)) {
          $.removeEvent(window.top, eventParams.upName, eventParams.upHandler, true);
        }
        $.removeEvent($.MouseTracker.captureElement, eventParams.moveName, eventParams.moveHandler, true);
        $.removeEvent($.MouseTracker.captureElement, eventParams.upName, eventParams.upHandler, true);
      }
      updatePointerCaptured(tracker, gPoint, false);
    }
    function getPointerId(event) {
      return $.MouseTracker.havePointerEvents ? event.pointerId : $.MouseTracker.mousePointerId;
    }
    function getPointerType(event) {
      return $.MouseTracker.havePointerEvents && event.pointerType ? event.pointerType : "mouse";
    }
    function getIsPrimary(event) {
      return $.MouseTracker.havePointerEvents ? event.isPrimary : true;
    }
    function getMouseAbsolute(event) {
      return $.getMousePosition(event);
    }
    function getMouseRelative(event, element) {
      return getPointRelativeToAbsolute(getMouseAbsolute(event), element);
    }
    function getPointRelativeToAbsolute(point, element) {
      var offset = $.getElementOffset(element);
      return point.minus(offset);
    }
    function getCenterPoint(point1, point2) {
      return new $.Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
    }
    function onClick(tracker, event) {
      var eventInfo = {
        originalEvent: event,
        eventType: "click",
        pointerType: "mouse",
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      if (eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onDblClick(tracker, event) {
      var eventInfo = {
        originalEvent: event,
        eventType: "dblclick",
        pointerType: "mouse",
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      if (eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onKeyDown(tracker, event) {
      var eventArgs = null;
      var eventInfo = {
        originalEvent: event,
        eventType: "keydown",
        pointerType: "",
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      if (tracker.keyDownHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented) {
        eventArgs = {
          eventSource: tracker,
          keyCode: event.keyCode ? event.keyCode : event.charCode,
          ctrl: event.ctrlKey,
          shift: event.shiftKey,
          alt: event.altKey,
          meta: event.metaKey,
          originalEvent: event,
          preventDefault: eventInfo.preventDefault || eventInfo.defaultPrevented,
          userData: tracker.userData
        };
        tracker.keyDownHandler(eventArgs);
      }
      if (eventArgs && eventArgs.preventDefault || eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onKeyUp(tracker, event) {
      var eventArgs = null;
      var eventInfo = {
        originalEvent: event,
        eventType: "keyup",
        pointerType: "",
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      if (tracker.keyUpHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented) {
        eventArgs = {
          eventSource: tracker,
          keyCode: event.keyCode ? event.keyCode : event.charCode,
          ctrl: event.ctrlKey,
          shift: event.shiftKey,
          alt: event.altKey,
          meta: event.metaKey,
          originalEvent: event,
          preventDefault: eventInfo.preventDefault || eventInfo.defaultPrevented,
          userData: tracker.userData
        };
        tracker.keyUpHandler(eventArgs);
      }
      if (eventArgs && eventArgs.preventDefault || eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onKeyPress(tracker, event) {
      var eventArgs = null;
      var eventInfo = {
        originalEvent: event,
        eventType: "keypress",
        pointerType: "",
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      if (tracker.keyHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented) {
        eventArgs = {
          eventSource: tracker,
          keyCode: event.keyCode ? event.keyCode : event.charCode,
          ctrl: event.ctrlKey,
          shift: event.shiftKey,
          alt: event.altKey,
          meta: event.metaKey,
          originalEvent: event,
          preventDefault: eventInfo.preventDefault || eventInfo.defaultPrevented,
          userData: tracker.userData
        };
        tracker.keyHandler(eventArgs);
      }
      if (eventArgs && eventArgs.preventDefault || eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onFocus(tracker, event) {
      var eventInfo = {
        originalEvent: event,
        eventType: "focus",
        pointerType: "",
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      if (tracker.focusHandler && !eventInfo.preventGesture) {
        tracker.focusHandler({
          eventSource: tracker,
          originalEvent: event,
          userData: tracker.userData
        });
      }
    }
    function onBlur(tracker, event) {
      var eventInfo = {
        originalEvent: event,
        eventType: "blur",
        pointerType: "",
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      if (tracker.blurHandler && !eventInfo.preventGesture) {
        tracker.blurHandler({
          eventSource: tracker,
          originalEvent: event,
          userData: tracker.userData
        });
      }
    }
    function onContextMenu(tracker, event) {
      var eventArgs = null;
      var eventInfo = {
        originalEvent: event,
        eventType: "contextmenu",
        pointerType: "mouse",
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      if (tracker.contextMenuHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented) {
        eventArgs = {
          eventSource: tracker,
          position: getPointRelativeToAbsolute(getMouseAbsolute(event), tracker.element),
          originalEvent: eventInfo.originalEvent,
          preventDefault: eventInfo.preventDefault || eventInfo.defaultPrevented,
          userData: tracker.userData
        };
        tracker.contextMenuHandler(eventArgs);
      }
      if (eventArgs && eventArgs.preventDefault || eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onWheel(tracker, event) {
      handleWheelEvent(tracker, event, event);
    }
    function onMouseWheel(tracker, event) {
      var simulatedEvent = {
        target: event.target || event.srcElement,
        type: "wheel",
        shiftKey: event.shiftKey || false,
        clientX: event.clientX,
        clientY: event.clientY,
        pageX: event.pageX ? event.pageX : event.clientX,
        pageY: event.pageY ? event.pageY : event.clientY,
        deltaMode: event.type === "MozMousePixelScroll" ? 0 : 1,
        deltaX: 0,
        deltaZ: 0
      };
      if ($.MouseTracker.wheelEventName === "mousewheel") {
        simulatedEvent.deltaY = -event.wheelDelta / $.DEFAULT_SETTINGS.pixelsPerWheelLine;
      } else {
        simulatedEvent.deltaY = event.detail;
      }
      handleWheelEvent(tracker, simulatedEvent, event);
    }
    function handleWheelEvent(tracker, event, originalEvent) {
      var nDelta = 0, eventInfo;
      var eventArgs = null;
      nDelta = event.deltaY ? event.deltaY < 0 ? 1 : -1 : 0;
      eventInfo = {
        originalEvent: event,
        eventType: "wheel",
        pointerType: "mouse",
        isEmulated: event !== originalEvent
      };
      preProcessEvent(tracker, eventInfo);
      if (tracker.scrollHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented) {
        eventArgs = {
          eventSource: tracker,
          pointerType: "mouse",
          position: getMouseRelative(event, tracker.element),
          scroll: nDelta,
          shift: event.shiftKey,
          isTouchEvent: false,
          originalEvent,
          preventDefault: eventInfo.preventDefault || eventInfo.defaultPrevented,
          userData: tracker.userData
        };
        tracker.scrollHandler(eventArgs);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(originalEvent);
      }
      if (eventArgs && eventArgs.preventDefault || eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(originalEvent);
      }
    }
    function onLoseCapture(tracker, event) {
      var gPoint = {
        id: $.MouseTracker.mousePointerId,
        type: "mouse"
      };
      var eventInfo = {
        originalEvent: event,
        eventType: "lostpointercapture",
        pointerType: "mouse",
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      if (event.target === tracker.element) {
        updatePointerCaptured(tracker, gPoint, false);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onTouchStart(tracker, event) {
      var time, i, touchCount = event.changedTouches.length, gPoint, pointsList = tracker.getActivePointersListByType("touch");
      time = $.now();
      if (pointsList.getLength() > event.touches.length - touchCount) {
        $.console.warn("Tracked touch contact count doesn't match event.touches.length");
      }
      var eventInfo = {
        originalEvent: event,
        eventType: "pointerdown",
        pointerType: "touch",
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      for (i = 0;i < touchCount; i++) {
        gPoint = {
          id: event.changedTouches[i].identifier,
          type: "touch",
          isPrimary: pointsList.getLength() === 0,
          currentPos: getMouseAbsolute(event.changedTouches[i]),
          currentTime: time
        };
        updatePointerEnter(tracker, eventInfo, gPoint);
        updatePointerDown(tracker, eventInfo, gPoint, 0);
        updatePointerCaptured(tracker, gPoint, true);
      }
      if (eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onTouchEnd(tracker, event) {
      var time, i, touchCount = event.changedTouches.length, gPoint;
      time = $.now();
      var eventInfo = {
        originalEvent: event,
        eventType: "pointerup",
        pointerType: "touch",
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      for (i = 0;i < touchCount; i++) {
        gPoint = {
          id: event.changedTouches[i].identifier,
          type: "touch",
          currentPos: getMouseAbsolute(event.changedTouches[i]),
          currentTime: time
        };
        updatePointerUp(tracker, eventInfo, gPoint, 0);
        updatePointerCaptured(tracker, gPoint, false);
        updatePointerLeave(tracker, eventInfo, gPoint);
      }
      if (eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onTouchMove(tracker, event) {
      var time, i, touchCount = event.changedTouches.length, gPoint;
      time = $.now();
      var eventInfo = {
        originalEvent: event,
        eventType: "pointermove",
        pointerType: "touch",
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      for (i = 0;i < touchCount; i++) {
        gPoint = {
          id: event.changedTouches[i].identifier,
          type: "touch",
          currentPos: getMouseAbsolute(event.changedTouches[i]),
          currentTime: time
        };
        updatePointerMove(tracker, eventInfo, gPoint);
      }
      if (eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onTouchCancel(tracker, event) {
      var touchCount = event.changedTouches.length, i, gPoint;
      var eventInfo = {
        originalEvent: event,
        eventType: "pointercancel",
        pointerType: "touch",
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      for (i = 0;i < touchCount; i++) {
        gPoint = {
          id: event.changedTouches[i].identifier,
          type: "touch"
        };
        updatePointerCancel(tracker, eventInfo, gPoint);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onGestureStart(tracker, event) {
      if (!$.eventIsCanceled(event)) {
        event.preventDefault();
      }
      return false;
    }
    function onGestureChange(tracker, event) {
      if (!$.eventIsCanceled(event)) {
        event.preventDefault();
      }
      return false;
    }
    function onGotPointerCapture(tracker, event) {
      var eventInfo = {
        originalEvent: event,
        eventType: "gotpointercapture",
        pointerType: getPointerType(event),
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      if (event.target === tracker.element) {
        updatePointerCaptured(tracker, {
          id: event.pointerId,
          type: getPointerType(event)
        }, true);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onLostPointerCapture(tracker, event) {
      var eventInfo = {
        originalEvent: event,
        eventType: "lostpointercapture",
        pointerType: getPointerType(event),
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      if (event.target === tracker.element) {
        updatePointerCaptured(tracker, {
          id: event.pointerId,
          type: getPointerType(event)
        }, false);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onPointerEnter(tracker, event) {
      var gPoint = {
        id: getPointerId(event),
        type: getPointerType(event),
        isPrimary: getIsPrimary(event),
        currentPos: getMouseAbsolute(event),
        currentTime: $.now()
      };
      var eventInfo = {
        originalEvent: event,
        eventType: "pointerenter",
        pointerType: gPoint.type,
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      updatePointerEnter(tracker, eventInfo, gPoint);
    }
    function onPointerLeave(tracker, event) {
      var gPoint = {
        id: getPointerId(event),
        type: getPointerType(event),
        isPrimary: getIsPrimary(event),
        currentPos: getMouseAbsolute(event),
        currentTime: $.now()
      };
      var eventInfo = {
        originalEvent: event,
        eventType: "pointerleave",
        pointerType: gPoint.type,
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      updatePointerLeave(tracker, eventInfo, gPoint);
    }
    function onPointerOver(tracker, event) {
      var gPoint = {
        id: getPointerId(event),
        type: getPointerType(event),
        isPrimary: getIsPrimary(event),
        currentPos: getMouseAbsolute(event),
        currentTime: $.now()
      };
      var eventInfo = {
        originalEvent: event,
        eventType: "pointerover",
        pointerType: gPoint.type,
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      updatePointerOver(tracker, eventInfo, gPoint);
      if (eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onPointerOut(tracker, event) {
      var gPoint = {
        id: getPointerId(event),
        type: getPointerType(event),
        isPrimary: getIsPrimary(event),
        currentPos: getMouseAbsolute(event),
        currentTime: $.now()
      };
      var eventInfo = {
        originalEvent: event,
        eventType: "pointerout",
        pointerType: gPoint.type,
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      updatePointerOut(tracker, eventInfo, gPoint);
      if (eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onPointerDown(tracker, event) {
      var gPoint = {
        id: getPointerId(event),
        type: getPointerType(event),
        isPrimary: getIsPrimary(event),
        currentPos: getMouseAbsolute(event),
        currentTime: $.now()
      };
      var implicitlyCaptured = $.MouseTracker.havePointerEvents && gPoint.type === "touch";
      var eventInfo = {
        originalEvent: event,
        eventType: "pointerdown",
        pointerType: gPoint.type,
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      updatePointerDown(tracker, eventInfo, gPoint, event.button);
      if (eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
      if (eventInfo.shouldCapture) {
        if (implicitlyCaptured) {
          updatePointerCaptured(tracker, gPoint, true);
        } else {
          capturePointer(tracker, gPoint);
        }
      }
    }
    function onPointerUp(tracker, event) {
      handlePointerUp(tracker, event);
    }
    function onPointerUpCaptured(tracker, event) {
      var pointsList = tracker.getActivePointersListByType(getPointerType(event));
      if (pointsList.getById(event.pointerId)) {
        handlePointerUp(tracker, event);
      }
      $.stopEvent(event);
    }
    function handlePointerUp(tracker, event) {
      var gPoint;
      gPoint = {
        id: getPointerId(event),
        type: getPointerType(event),
        isPrimary: getIsPrimary(event),
        currentPos: getMouseAbsolute(event),
        currentTime: $.now()
      };
      var eventInfo = {
        originalEvent: event,
        eventType: "pointerup",
        pointerType: gPoint.type,
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      updatePointerUp(tracker, eventInfo, gPoint, event.button);
      if (eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
      if (eventInfo.shouldReleaseCapture) {
        if (event.target === tracker.element) {
          releasePointer(tracker, gPoint);
        } else {
          updatePointerCaptured(tracker, gPoint, false);
        }
      }
    }
    function onPointerMove(tracker, event) {
      handlePointerMove(tracker, event);
    }
    function onPointerMoveCaptured(tracker, event) {
      var pointsList = tracker.getActivePointersListByType(getPointerType(event));
      if (pointsList.getById(event.pointerId)) {
        handlePointerMove(tracker, event);
      }
      $.stopEvent(event);
    }
    function handlePointerMove(tracker, event) {
      var gPoint = {
        id: getPointerId(event),
        type: getPointerType(event),
        isPrimary: getIsPrimary(event),
        currentPos: getMouseAbsolute(event),
        currentTime: $.now()
      };
      var eventInfo = {
        originalEvent: event,
        eventType: "pointermove",
        pointerType: gPoint.type,
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      updatePointerMove(tracker, eventInfo, gPoint);
      if (eventInfo.preventDefault && !eventInfo.defaultPrevented) {
        $.cancelEvent(event);
      }
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function onPointerCancel(tracker, event) {
      var gPoint = {
        id: event.pointerId,
        type: getPointerType(event)
      };
      var eventInfo = {
        originalEvent: event,
        eventType: "pointercancel",
        pointerType: gPoint.type,
        isEmulated: false
      };
      preProcessEvent(tracker, eventInfo);
      updatePointerCancel(tracker, eventInfo, gPoint);
      if (eventInfo.stopPropagation) {
        $.stopEvent(event);
      }
    }
    function startTrackingPointer(pointsList, gPoint) {
      gPoint.speed = 0;
      gPoint.direction = 0;
      gPoint.contactPos = gPoint.currentPos;
      gPoint.contactTime = gPoint.currentTime;
      gPoint.lastPos = gPoint.currentPos;
      gPoint.lastTime = gPoint.currentTime;
      return pointsList.add(gPoint);
    }
    function stopTrackingPointer(tracker, pointsList, gPoint) {
      var listLength;
      var trackedGPoint = pointsList.getById(gPoint.id);
      if (trackedGPoint) {
        if (trackedGPoint.captured) {
          $.console.warn("stopTrackingPointer() called on captured pointer");
          releasePointer(tracker, trackedGPoint);
        }
        pointsList.removeContact();
        listLength = pointsList.removeById(gPoint.id);
      } else {
        listLength = pointsList.getLength();
      }
      return listLength;
    }
    function getEventProcessDefaults(tracker, eventInfo) {
      switch (eventInfo.eventType) {
        case "pointermove":
          eventInfo.isStoppable = true;
          eventInfo.isCancelable = true;
          eventInfo.preventDefault = false;
          eventInfo.preventGesture = !tracker.hasGestureHandlers;
          eventInfo.stopPropagation = false;
          break;
        case "pointerover":
        case "pointerout":
        case "contextmenu":
        case "keydown":
        case "keyup":
        case "keypress":
          eventInfo.isStoppable = true;
          eventInfo.isCancelable = true;
          eventInfo.preventDefault = false;
          eventInfo.preventGesture = false;
          eventInfo.stopPropagation = false;
          break;
        case "pointerdown":
          eventInfo.isStoppable = true;
          eventInfo.isCancelable = true;
          eventInfo.preventDefault = false;
          eventInfo.preventGesture = !tracker.hasGestureHandlers;
          eventInfo.stopPropagation = false;
          break;
        case "pointerup":
          eventInfo.isStoppable = true;
          eventInfo.isCancelable = true;
          eventInfo.preventDefault = false;
          eventInfo.preventGesture = !tracker.hasGestureHandlers;
          eventInfo.stopPropagation = false;
          break;
        case "wheel":
          eventInfo.isStoppable = true;
          eventInfo.isCancelable = true;
          eventInfo.preventDefault = false;
          eventInfo.preventGesture = !tracker.hasScrollHandler;
          eventInfo.stopPropagation = false;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
          eventInfo.isStoppable = true;
          eventInfo.isCancelable = false;
          eventInfo.preventDefault = false;
          eventInfo.preventGesture = false;
          eventInfo.stopPropagation = false;
          break;
        case "click":
          eventInfo.isStoppable = true;
          eventInfo.isCancelable = true;
          eventInfo.preventDefault = !!tracker.clickHandler;
          eventInfo.preventGesture = false;
          eventInfo.stopPropagation = false;
          break;
        case "dblclick":
          eventInfo.isStoppable = true;
          eventInfo.isCancelable = true;
          eventInfo.preventDefault = !!tracker.dblClickHandler;
          eventInfo.preventGesture = false;
          eventInfo.stopPropagation = false;
          break;
        case "focus":
        case "blur":
        case "pointerenter":
        case "pointerleave":
        default:
          eventInfo.isStoppable = false;
          eventInfo.isCancelable = false;
          eventInfo.preventDefault = false;
          eventInfo.preventGesture = false;
          eventInfo.stopPropagation = false;
          break;
      }
    }
    function preProcessEvent(tracker, eventInfo) {
      eventInfo.eventSource = tracker;
      eventInfo.eventPhase = eventInfo.originalEvent ? typeof eventInfo.originalEvent.eventPhase !== "undefined" ? eventInfo.originalEvent.eventPhase : 0 : 0;
      eventInfo.defaultPrevented = $.eventIsCanceled(eventInfo.originalEvent);
      eventInfo.shouldCapture = false;
      eventInfo.shouldReleaseCapture = false;
      eventInfo.userData = tracker.userData;
      getEventProcessDefaults(tracker, eventInfo);
      if (tracker.preProcessEventHandler) {
        tracker.preProcessEventHandler(eventInfo);
      }
    }
    function updatePointerCaptured(tracker, gPoint, isCaptured) {
      var pointsList = tracker.getActivePointersListByType(gPoint.type);
      var updateGPoint = pointsList.getById(gPoint.id);
      if (updateGPoint) {
        if (isCaptured && !updateGPoint.captured) {
          updateGPoint.captured = true;
          pointsList.captureCount++;
        } else if (!isCaptured && updateGPoint.captured) {
          updateGPoint.captured = false;
          pointsList.captureCount--;
          if (pointsList.captureCount < 0) {
            pointsList.captureCount = 0;
            $.console.warn("updatePointerCaptured() - pointsList.captureCount went negative");
          }
        }
      } else {
        $.console.warn("updatePointerCaptured() called on untracked pointer");
      }
    }
    function updatePointerEnter(tracker, eventInfo, gPoint) {
      var pointsList = tracker.getActivePointersListByType(gPoint.type), updateGPoint;
      updateGPoint = pointsList.getById(gPoint.id);
      if (updateGPoint) {
        updateGPoint.insideElement = true;
        updateGPoint.lastPos = updateGPoint.currentPos;
        updateGPoint.lastTime = updateGPoint.currentTime;
        updateGPoint.currentPos = gPoint.currentPos;
        updateGPoint.currentTime = gPoint.currentTime;
        gPoint = updateGPoint;
      } else {
        gPoint.captured = false;
        gPoint.insideElementPressed = false;
        gPoint.insideElement = true;
        startTrackingPointer(pointsList, gPoint);
      }
      if (tracker.enterHandler) {
        tracker.enterHandler({
          eventSource: tracker,
          pointerType: gPoint.type,
          position: getPointRelativeToAbsolute(gPoint.currentPos, tracker.element),
          buttons: pointsList.buttons,
          pointers: tracker.getActivePointerCount(),
          insideElementPressed: gPoint.insideElementPressed,
          buttonDownAny: pointsList.buttons !== 0,
          isTouchEvent: gPoint.type === "touch",
          originalEvent: eventInfo.originalEvent,
          userData: tracker.userData
        });
      }
    }
    function updatePointerLeave(tracker, eventInfo, gPoint) {
      var pointsList = tracker.getActivePointersListByType(gPoint.type), updateGPoint, dispatchEventObj;
      updateGPoint = pointsList.getById(gPoint.id);
      if (updateGPoint) {
        if (updateGPoint.captured) {
          updateGPoint.insideElement = false;
          updateGPoint.lastPos = updateGPoint.currentPos;
          updateGPoint.lastTime = updateGPoint.currentTime;
          updateGPoint.currentPos = gPoint.currentPos;
          updateGPoint.currentTime = gPoint.currentTime;
        } else {
          stopTrackingPointer(tracker, pointsList, updateGPoint);
        }
        gPoint = updateGPoint;
      } else {
        gPoint.captured = false;
        gPoint.insideElementPressed = false;
      }
      if (tracker.leaveHandler || tracker.exitHandler) {
        dispatchEventObj = {
          eventSource: tracker,
          pointerType: gPoint.type,
          position: gPoint.currentPos && getPointRelativeToAbsolute(gPoint.currentPos, tracker.element),
          buttons: pointsList.buttons,
          pointers: tracker.getActivePointerCount(),
          insideElementPressed: gPoint.insideElementPressed,
          buttonDownAny: pointsList.buttons !== 0,
          isTouchEvent: gPoint.type === "touch",
          originalEvent: eventInfo.originalEvent,
          userData: tracker.userData
        };
        if (tracker.leaveHandler) {
          tracker.leaveHandler(dispatchEventObj);
        }
        if (tracker.exitHandler) {
          tracker.exitHandler(dispatchEventObj);
        }
      }
    }
    function updatePointerOver(tracker, eventInfo, gPoint) {
      var pointsList, updateGPoint;
      pointsList = tracker.getActivePointersListByType(gPoint.type);
      updateGPoint = pointsList.getById(gPoint.id);
      if (updateGPoint) {
        gPoint = updateGPoint;
      } else {
        gPoint.captured = false;
        gPoint.insideElementPressed = false;
      }
      if (tracker.overHandler) {
        tracker.overHandler({
          eventSource: tracker,
          pointerType: gPoint.type,
          position: getPointRelativeToAbsolute(gPoint.currentPos, tracker.element),
          buttons: pointsList.buttons,
          pointers: tracker.getActivePointerCount(),
          insideElementPressed: gPoint.insideElementPressed,
          buttonDownAny: pointsList.buttons !== 0,
          isTouchEvent: gPoint.type === "touch",
          originalEvent: eventInfo.originalEvent,
          userData: tracker.userData
        });
      }
    }
    function updatePointerOut(tracker, eventInfo, gPoint) {
      var pointsList, updateGPoint;
      pointsList = tracker.getActivePointersListByType(gPoint.type);
      updateGPoint = pointsList.getById(gPoint.id);
      if (updateGPoint) {
        gPoint = updateGPoint;
      } else {
        gPoint.captured = false;
        gPoint.insideElementPressed = false;
      }
      if (tracker.outHandler) {
        tracker.outHandler({
          eventSource: tracker,
          pointerType: gPoint.type,
          position: gPoint.currentPos && getPointRelativeToAbsolute(gPoint.currentPos, tracker.element),
          buttons: pointsList.buttons,
          pointers: tracker.getActivePointerCount(),
          insideElementPressed: gPoint.insideElementPressed,
          buttonDownAny: pointsList.buttons !== 0,
          isTouchEvent: gPoint.type === "touch",
          originalEvent: eventInfo.originalEvent,
          userData: tracker.userData
        });
      }
    }
    function updatePointerDown(tracker, eventInfo, gPoint, buttonChanged) {
      var delegate = THIS[tracker.hash], pointsList = tracker.getActivePointersListByType(gPoint.type), updateGPoint;
      if (typeof eventInfo.originalEvent.buttons !== "undefined") {
        pointsList.buttons = eventInfo.originalEvent.buttons;
      } else {
        if (buttonChanged === 0) {
          pointsList.buttons |= 1;
        } else if (buttonChanged === 1) {
          pointsList.buttons |= 4;
        } else if (buttonChanged === 2) {
          pointsList.buttons |= 2;
        } else if (buttonChanged === 3) {
          pointsList.buttons |= 8;
        } else if (buttonChanged === 4) {
          pointsList.buttons |= 16;
        } else if (buttonChanged === 5) {
          pointsList.buttons |= 32;
        }
      }
      if (buttonChanged !== 0) {
        eventInfo.shouldCapture = false;
        eventInfo.shouldReleaseCapture = false;
        if (tracker.nonPrimaryPressHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented) {
          eventInfo.preventDefault = true;
          tracker.nonPrimaryPressHandler({
            eventSource: tracker,
            pointerType: gPoint.type,
            position: getPointRelativeToAbsolute(gPoint.currentPos, tracker.element),
            button: buttonChanged,
            buttons: pointsList.buttons,
            isTouchEvent: gPoint.type === "touch",
            originalEvent: eventInfo.originalEvent,
            userData: tracker.userData
          });
        }
        return;
      }
      updateGPoint = pointsList.getById(gPoint.id);
      if (updateGPoint) {
        updateGPoint.insideElementPressed = true;
        updateGPoint.insideElement = true;
        updateGPoint.originalTarget = eventInfo.originalEvent.target;
        updateGPoint.contactPos = gPoint.currentPos;
        updateGPoint.contactTime = gPoint.currentTime;
        updateGPoint.lastPos = updateGPoint.currentPos;
        updateGPoint.lastTime = updateGPoint.currentTime;
        updateGPoint.currentPos = gPoint.currentPos;
        updateGPoint.currentTime = gPoint.currentTime;
        gPoint = updateGPoint;
      } else {
        gPoint.captured = false;
        gPoint.insideElementPressed = true;
        gPoint.insideElement = true;
        gPoint.originalTarget = eventInfo.originalEvent.target;
        startTrackingPointer(pointsList, gPoint);
      }
      pointsList.addContact();
      if (!eventInfo.preventGesture && !eventInfo.defaultPrevented) {
        eventInfo.shouldCapture = true;
        eventInfo.shouldReleaseCapture = false;
        eventInfo.preventDefault = true;
        if (tracker.dragHandler || tracker.dragEndHandler || tracker.pinchHandler) {
          $.MouseTracker.gesturePointVelocityTracker.addPoint(tracker, gPoint);
        }
        if (pointsList.contacts === 1) {
          if (tracker.pressHandler && !eventInfo.preventGesture) {
            tracker.pressHandler({
              eventSource: tracker,
              pointerType: gPoint.type,
              position: getPointRelativeToAbsolute(gPoint.contactPos, tracker.element),
              buttons: pointsList.buttons,
              isTouchEvent: gPoint.type === "touch",
              originalEvent: eventInfo.originalEvent,
              userData: tracker.userData
            });
          }
        } else if (pointsList.contacts === 2) {
          if (tracker.pinchHandler && gPoint.type === "touch") {
            delegate.pinchGPoints = pointsList.asArray();
            delegate.lastPinchDist = delegate.currentPinchDist = delegate.pinchGPoints[0].currentPos.distanceTo(delegate.pinchGPoints[1].currentPos);
            delegate.lastPinchCenter = delegate.currentPinchCenter = getCenterPoint(delegate.pinchGPoints[0].currentPos, delegate.pinchGPoints[1].currentPos);
          }
        }
      } else {
        eventInfo.shouldCapture = false;
        eventInfo.shouldReleaseCapture = false;
      }
    }
    function updatePointerUp(tracker, eventInfo, gPoint, buttonChanged) {
      var delegate = THIS[tracker.hash], pointsList = tracker.getActivePointersListByType(gPoint.type), releasePoint, releaseTime, updateGPoint, wasCaptured = false, quick;
      if (typeof eventInfo.originalEvent.buttons !== "undefined") {
        pointsList.buttons = eventInfo.originalEvent.buttons;
      } else {
        if (buttonChanged === 0) {
          pointsList.buttons ^= ~1;
        } else if (buttonChanged === 1) {
          pointsList.buttons ^= ~4;
        } else if (buttonChanged === 2) {
          pointsList.buttons ^= ~2;
        } else if (buttonChanged === 3) {
          pointsList.buttons ^= ~8;
        } else if (buttonChanged === 4) {
          pointsList.buttons ^= ~16;
        } else if (buttonChanged === 5) {
          pointsList.buttons ^= ~32;
        }
      }
      eventInfo.shouldCapture = false;
      if (buttonChanged !== 0) {
        eventInfo.shouldReleaseCapture = false;
        if (tracker.nonPrimaryReleaseHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented) {
          eventInfo.preventDefault = true;
          tracker.nonPrimaryReleaseHandler({
            eventSource: tracker,
            pointerType: gPoint.type,
            position: getPointRelativeToAbsolute(gPoint.currentPos, tracker.element),
            button: buttonChanged,
            buttons: pointsList.buttons,
            isTouchEvent: gPoint.type === "touch",
            originalEvent: eventInfo.originalEvent,
            userData: tracker.userData
          });
        }
        return;
      }
      updateGPoint = pointsList.getById(gPoint.id);
      if (updateGPoint) {
        pointsList.removeContact();
        if (updateGPoint.captured) {
          wasCaptured = true;
        }
        updateGPoint.lastPos = updateGPoint.currentPos;
        updateGPoint.lastTime = updateGPoint.currentTime;
        updateGPoint.currentPos = gPoint.currentPos;
        updateGPoint.currentTime = gPoint.currentTime;
        if (!updateGPoint.insideElement) {
          stopTrackingPointer(tracker, pointsList, updateGPoint);
        }
        releasePoint = updateGPoint.currentPos;
        releaseTime = updateGPoint.currentTime;
      } else {
        gPoint.captured = false;
        gPoint.insideElementPressed = false;
        gPoint.insideElement = true;
        startTrackingPointer(pointsList, gPoint);
        updateGPoint = gPoint;
      }
      if (!eventInfo.preventGesture && !eventInfo.defaultPrevented) {
        if (wasCaptured) {
          eventInfo.shouldReleaseCapture = true;
          eventInfo.preventDefault = true;
          if (tracker.dragHandler || tracker.dragEndHandler || tracker.pinchHandler) {
            $.MouseTracker.gesturePointVelocityTracker.removePoint(tracker, updateGPoint);
          }
          if (pointsList.contacts === 0) {
            if (tracker.releaseHandler && releasePoint) {
              tracker.releaseHandler({
                eventSource: tracker,
                pointerType: updateGPoint.type,
                position: getPointRelativeToAbsolute(releasePoint, tracker.element),
                buttons: pointsList.buttons,
                insideElementPressed: updateGPoint.insideElementPressed,
                insideElementReleased: updateGPoint.insideElement,
                isTouchEvent: updateGPoint.type === "touch",
                originalEvent: eventInfo.originalEvent,
                userData: tracker.userData
              });
            }
            if (tracker.dragEndHandler && delegate.sentDragEvent) {
              tracker.dragEndHandler({
                eventSource: tracker,
                pointerType: updateGPoint.type,
                position: getPointRelativeToAbsolute(updateGPoint.currentPos, tracker.element),
                speed: updateGPoint.speed,
                direction: updateGPoint.direction,
                shift: eventInfo.originalEvent.shiftKey,
                isTouchEvent: updateGPoint.type === "touch",
                originalEvent: eventInfo.originalEvent,
                userData: tracker.userData
              });
            }
            delegate.sentDragEvent = false;
            if ((tracker.clickHandler || tracker.dblClickHandler) && updateGPoint.insideElement) {
              quick = releaseTime - updateGPoint.contactTime <= tracker.clickTimeThreshold && updateGPoint.contactPos.distanceTo(releasePoint) <= tracker.clickDistThreshold;
              if (tracker.clickHandler) {
                tracker.clickHandler({
                  eventSource: tracker,
                  pointerType: updateGPoint.type,
                  position: getPointRelativeToAbsolute(updateGPoint.currentPos, tracker.element),
                  quick,
                  shift: eventInfo.originalEvent.shiftKey,
                  isTouchEvent: updateGPoint.type === "touch",
                  originalEvent: eventInfo.originalEvent,
                  originalTarget: updateGPoint.originalTarget,
                  userData: tracker.userData
                });
              }
              if (tracker.dblClickHandler && quick) {
                pointsList.clicks++;
                if (pointsList.clicks === 1) {
                  delegate.lastClickPos = releasePoint;
                  delegate.dblClickTimeOut = setTimeout(function() {
                    pointsList.clicks = 0;
                  }, tracker.dblClickTimeThreshold);
                } else if (pointsList.clicks === 2) {
                  clearTimeout(delegate.dblClickTimeOut);
                  pointsList.clicks = 0;
                  if (delegate.lastClickPos.distanceTo(releasePoint) <= tracker.dblClickDistThreshold) {
                    tracker.dblClickHandler({
                      eventSource: tracker,
                      pointerType: updateGPoint.type,
                      position: getPointRelativeToAbsolute(updateGPoint.currentPos, tracker.element),
                      shift: eventInfo.originalEvent.shiftKey,
                      isTouchEvent: updateGPoint.type === "touch",
                      originalEvent: eventInfo.originalEvent,
                      userData: tracker.userData
                    });
                  }
                  delegate.lastClickPos = null;
                }
              }
            }
          } else if (pointsList.contacts === 2) {
            if (tracker.pinchHandler && updateGPoint.type === "touch") {
              delegate.pinchGPoints = pointsList.asArray();
              delegate.lastPinchDist = delegate.currentPinchDist = delegate.pinchGPoints[0].currentPos.distanceTo(delegate.pinchGPoints[1].currentPos);
              delegate.lastPinchCenter = delegate.currentPinchCenter = getCenterPoint(delegate.pinchGPoints[0].currentPos, delegate.pinchGPoints[1].currentPos);
            }
          }
        } else {
          eventInfo.shouldReleaseCapture = false;
          if (tracker.releaseHandler && releasePoint) {
            tracker.releaseHandler({
              eventSource: tracker,
              pointerType: updateGPoint.type,
              position: getPointRelativeToAbsolute(releasePoint, tracker.element),
              buttons: pointsList.buttons,
              insideElementPressed: updateGPoint.insideElementPressed,
              insideElementReleased: updateGPoint.insideElement,
              isTouchEvent: updateGPoint.type === "touch",
              originalEvent: eventInfo.originalEvent,
              userData: tracker.userData
            });
            eventInfo.preventDefault = true;
          }
        }
      }
    }
    function updatePointerMove(tracker, eventInfo, gPoint) {
      var delegate = THIS[tracker.hash], pointsList = tracker.getActivePointersListByType(gPoint.type), updateGPoint, gPointArray, delta;
      if (typeof eventInfo.originalEvent.buttons !== "undefined") {
        pointsList.buttons = eventInfo.originalEvent.buttons;
      }
      updateGPoint = pointsList.getById(gPoint.id);
      if (updateGPoint) {
        updateGPoint.lastPos = updateGPoint.currentPos;
        updateGPoint.lastTime = updateGPoint.currentTime;
        updateGPoint.currentPos = gPoint.currentPos;
        updateGPoint.currentTime = gPoint.currentTime;
      } else {
        return;
      }
      eventInfo.shouldCapture = false;
      eventInfo.shouldReleaseCapture = false;
      if (tracker.stopHandler && gPoint.type === "mouse") {
        clearTimeout(tracker.stopTimeOut);
        tracker.stopTimeOut = setTimeout(function() {
          handlePointerStop(tracker, eventInfo.originalEvent, gPoint.type);
        }, tracker.stopDelay);
      }
      if (pointsList.contacts === 0) {
        if (tracker.moveHandler) {
          tracker.moveHandler({
            eventSource: tracker,
            pointerType: gPoint.type,
            position: getPointRelativeToAbsolute(gPoint.currentPos, tracker.element),
            buttons: pointsList.buttons,
            isTouchEvent: gPoint.type === "touch",
            originalEvent: eventInfo.originalEvent,
            userData: tracker.userData
          });
        }
      } else if (pointsList.contacts === 1) {
        if (tracker.moveHandler) {
          updateGPoint = pointsList.asArray()[0];
          tracker.moveHandler({
            eventSource: tracker,
            pointerType: updateGPoint.type,
            position: getPointRelativeToAbsolute(updateGPoint.currentPos, tracker.element),
            buttons: pointsList.buttons,
            isTouchEvent: updateGPoint.type === "touch",
            originalEvent: eventInfo.originalEvent,
            userData: tracker.userData
          });
        }
        if (tracker.dragHandler && !eventInfo.preventGesture && !eventInfo.defaultPrevented) {
          updateGPoint = pointsList.asArray()[0];
          delta = updateGPoint.currentPos.minus(updateGPoint.lastPos);
          tracker.dragHandler({
            eventSource: tracker,
            pointerType: updateGPoint.type,
            position: getPointRelativeToAbsolute(updateGPoint.currentPos, tracker.element),
            buttons: pointsList.buttons,
            delta,
            speed: updateGPoint.speed,
            direction: updateGPoint.direction,
            shift: eventInfo.originalEvent.shiftKey,
            isTouchEvent: updateGPoint.type === "touch",
            originalEvent: eventInfo.originalEvent,
            userData: tracker.userData
          });
          eventInfo.preventDefault = true;
          delegate.sentDragEvent = true;
        }
      } else if (pointsList.contacts === 2) {
        if (tracker.moveHandler) {
          gPointArray = pointsList.asArray();
          tracker.moveHandler({
            eventSource: tracker,
            pointerType: gPointArray[0].type,
            position: getPointRelativeToAbsolute(getCenterPoint(gPointArray[0].currentPos, gPointArray[1].currentPos), tracker.element),
            buttons: pointsList.buttons,
            isTouchEvent: gPointArray[0].type === "touch",
            originalEvent: eventInfo.originalEvent,
            userData: tracker.userData
          });
        }
        if (tracker.pinchHandler && gPoint.type === "touch" && !eventInfo.preventGesture && !eventInfo.defaultPrevented) {
          delta = delegate.pinchGPoints[0].currentPos.distanceTo(delegate.pinchGPoints[1].currentPos);
          if (delta !== delegate.currentPinchDist) {
            delegate.lastPinchDist = delegate.currentPinchDist;
            delegate.currentPinchDist = delta;
            delegate.lastPinchCenter = delegate.currentPinchCenter;
            delegate.currentPinchCenter = getCenterPoint(delegate.pinchGPoints[0].currentPos, delegate.pinchGPoints[1].currentPos);
            tracker.pinchHandler({
              eventSource: tracker,
              pointerType: "touch",
              gesturePoints: delegate.pinchGPoints,
              lastCenter: getPointRelativeToAbsolute(delegate.lastPinchCenter, tracker.element),
              center: getPointRelativeToAbsolute(delegate.currentPinchCenter, tracker.element),
              lastDistance: delegate.lastPinchDist,
              distance: delegate.currentPinchDist,
              shift: eventInfo.originalEvent.shiftKey,
              originalEvent: eventInfo.originalEvent,
              userData: tracker.userData
            });
            eventInfo.preventDefault = true;
          }
        }
      }
    }
    function updatePointerCancel(tracker, eventInfo, gPoint) {
      var pointsList = tracker.getActivePointersListByType(gPoint.type), updateGPoint;
      updateGPoint = pointsList.getById(gPoint.id);
      if (updateGPoint) {
        stopTrackingPointer(tracker, pointsList, updateGPoint);
      }
    }
    function handlePointerStop(tracker, originalMoveEvent, pointerType) {
      if (tracker.stopHandler) {
        tracker.stopHandler({
          eventSource: tracker,
          pointerType,
          position: getMouseRelative(originalMoveEvent, tracker.element),
          buttons: tracker.getActivePointersListByType(pointerType).buttons,
          isTouchEvent: pointerType === "touch",
          originalEvent: originalMoveEvent,
          userData: tracker.userData
        });
      }
    }
  })(OpenSeadragon);
  (function($) {
    $.ControlAnchor = {
      NONE: 0,
      TOP_LEFT: 1,
      TOP_RIGHT: 2,
      BOTTOM_RIGHT: 3,
      BOTTOM_LEFT: 4,
      ABSOLUTE: 5
    };
    $.Control = function(element, options, container) {
      var parent = element.parentNode;
      if (typeof options === "number") {
        $.console.error("Passing an anchor directly into the OpenSeadragon.Control constructor is deprecated; " + "please use an options object instead.  " + "Support for this deprecated variant is scheduled for removal in December 2013");
        options = { anchor: options };
      }
      options.attachToViewer = typeof options.attachToViewer === "undefined" ? true : options.attachToViewer;
      this.autoFade = typeof options.autoFade === "undefined" ? true : options.autoFade;
      this.element = element;
      this.anchor = options.anchor;
      this.container = container;
      if (this.anchor === $.ControlAnchor.ABSOLUTE) {
        this.wrapper = $.makeNeutralElement("div");
        this.wrapper.style.position = "absolute";
        this.wrapper.style.top = typeof options.top === "number" ? options.top + "px" : options.top;
        this.wrapper.style.left = typeof options.left === "number" ? options.left + "px" : options.left;
        this.wrapper.style.height = typeof options.height === "number" ? options.height + "px" : options.height;
        this.wrapper.style.width = typeof options.width === "number" ? options.width + "px" : options.width;
        this.wrapper.style.margin = "0px";
        this.wrapper.style.padding = "0px";
        this.element.style.position = "relative";
        this.element.style.top = "0px";
        this.element.style.left = "0px";
        this.element.style.height = "100%";
        this.element.style.width = "100%";
      } else {
        this.wrapper = $.makeNeutralElement("div");
        this.wrapper.style.display = "inline-block";
        if (this.anchor === $.ControlAnchor.NONE) {
          this.wrapper.style.width = this.wrapper.style.height = "100%";
        }
      }
      this.wrapper.appendChild(this.element);
      if (options.attachToViewer) {
        if (this.anchor === $.ControlAnchor.TOP_RIGHT || this.anchor === $.ControlAnchor.BOTTOM_RIGHT) {
          this.container.insertBefore(this.wrapper, this.container.firstChild);
        } else {
          this.container.appendChild(this.wrapper);
        }
      } else {
        parent.appendChild(this.wrapper);
      }
    };
    $.Control.prototype = {
      destroy: function() {
        this.wrapper.removeChild(this.element);
        if (this.anchor !== $.ControlAnchor.NONE) {
          this.container.removeChild(this.wrapper);
        }
      },
      isVisible: function() {
        return this.wrapper.style.display !== "none";
      },
      setVisible: function(visible) {
        this.wrapper.style.display = visible ? this.anchor === $.ControlAnchor.ABSOLUTE ? "block" : "inline-block" : "none";
      },
      setOpacity: function(opacity) {
        $.setElementOpacity(this.wrapper, opacity, true);
      }
    };
  })(OpenSeadragon);
  (function($) {
    $.ControlDock = function(options) {
      var layouts = ["topleft", "topright", "bottomright", "bottomleft"], layout, i;
      $.extend(true, this, {
        id: "controldock-" + $.now() + "-" + Math.floor(Math.random() * 1e6),
        container: $.makeNeutralElement("div"),
        controls: []
      }, options);
      this.container.onsubmit = function() {
        return false;
      };
      if (this.element) {
        this.element = $.getElement(this.element);
        this.element.appendChild(this.container);
        if ($.getElementStyle(this.element).position === "static") {
          this.element.style.position = "relative";
        }
        this.container.style.width = "100%";
        this.container.style.height = "100%";
      }
      for (i = 0;i < layouts.length; i++) {
        layout = layouts[i];
        this.controls[layout] = $.makeNeutralElement("div");
        this.controls[layout].style.position = "absolute";
        if (layout.match("left")) {
          this.controls[layout].style.left = "0px";
        }
        if (layout.match("right")) {
          this.controls[layout].style.right = "0px";
        }
        if (layout.match("top")) {
          this.controls[layout].style.top = "0px";
        }
        if (layout.match("bottom")) {
          this.controls[layout].style.bottom = "0px";
        }
      }
      this.container.appendChild(this.controls.topleft);
      this.container.appendChild(this.controls.topright);
      this.container.appendChild(this.controls.bottomright);
      this.container.appendChild(this.controls.bottomleft);
    };
    $.ControlDock.prototype = {
      addControl: function(element, controlOptions) {
        element = $.getElement(element);
        var div = null;
        if (getControlIndex(this, element) >= 0) {
          return;
        }
        switch (controlOptions.anchor) {
          case $.ControlAnchor.TOP_RIGHT:
            div = this.controls.topright;
            element.style.position = "relative";
            element.style.paddingRight = "0px";
            element.style.paddingTop = "0px";
            break;
          case $.ControlAnchor.BOTTOM_RIGHT:
            div = this.controls.bottomright;
            element.style.position = "relative";
            element.style.paddingRight = "0px";
            element.style.paddingBottom = "0px";
            break;
          case $.ControlAnchor.BOTTOM_LEFT:
            div = this.controls.bottomleft;
            element.style.position = "relative";
            element.style.paddingLeft = "0px";
            element.style.paddingBottom = "0px";
            break;
          case $.ControlAnchor.TOP_LEFT:
            div = this.controls.topleft;
            element.style.position = "relative";
            element.style.paddingLeft = "0px";
            element.style.paddingTop = "0px";
            break;
          case $.ControlAnchor.ABSOLUTE:
            div = this.container;
            element.style.margin = "0px";
            element.style.padding = "0px";
            break;
          default:
          case $.ControlAnchor.NONE:
            div = this.container;
            element.style.margin = "0px";
            element.style.padding = "0px";
            break;
        }
        this.controls.push(new $.Control(element, controlOptions, div));
        element.style.display = "inline-block";
      },
      removeControl: function(element) {
        element = $.getElement(element);
        var i = getControlIndex(this, element);
        if (i >= 0) {
          this.controls[i].destroy();
          this.controls.splice(i, 1);
        }
        return this;
      },
      clearControls: function() {
        while (this.controls.length > 0) {
          this.controls.pop().destroy();
        }
        return this;
      },
      areControlsEnabled: function() {
        var i;
        for (i = this.controls.length - 1;i >= 0; i--) {
          if (this.controls[i].isVisible()) {
            return true;
          }
        }
        return false;
      },
      setControlsEnabled: function(enabled) {
        var i;
        for (i = this.controls.length - 1;i >= 0; i--) {
          this.controls[i].setVisible(enabled);
        }
        return this;
      }
    };
    function getControlIndex(dock, element) {
      var controls = dock.controls, i;
      for (i = controls.length - 1;i >= 0; i--) {
        if (controls[i].element === element) {
          return i;
        }
      }
      return -1;
    }
  })(OpenSeadragon);
  (function($) {
    $.Placement = $.freezeObject({
      CENTER: 0,
      TOP_LEFT: 1,
      TOP: 2,
      TOP_RIGHT: 3,
      RIGHT: 4,
      BOTTOM_RIGHT: 5,
      BOTTOM: 6,
      BOTTOM_LEFT: 7,
      LEFT: 8,
      properties: {
        0: {
          isLeft: false,
          isHorizontallyCentered: true,
          isRight: false,
          isTop: false,
          isVerticallyCentered: true,
          isBottom: false
        },
        1: {
          isLeft: true,
          isHorizontallyCentered: false,
          isRight: false,
          isTop: true,
          isVerticallyCentered: false,
          isBottom: false
        },
        2: {
          isLeft: false,
          isHorizontallyCentered: true,
          isRight: false,
          isTop: true,
          isVerticallyCentered: false,
          isBottom: false
        },
        3: {
          isLeft: false,
          isHorizontallyCentered: false,
          isRight: true,
          isTop: true,
          isVerticallyCentered: false,
          isBottom: false
        },
        4: {
          isLeft: false,
          isHorizontallyCentered: false,
          isRight: true,
          isTop: false,
          isVerticallyCentered: true,
          isBottom: false
        },
        5: {
          isLeft: false,
          isHorizontallyCentered: false,
          isRight: true,
          isTop: false,
          isVerticallyCentered: false,
          isBottom: true
        },
        6: {
          isLeft: false,
          isHorizontallyCentered: true,
          isRight: false,
          isTop: false,
          isVerticallyCentered: false,
          isBottom: true
        },
        7: {
          isLeft: true,
          isHorizontallyCentered: false,
          isRight: false,
          isTop: false,
          isVerticallyCentered: false,
          isBottom: true
        },
        8: {
          isLeft: true,
          isHorizontallyCentered: false,
          isRight: false,
          isTop: false,
          isVerticallyCentered: true,
          isBottom: false
        }
      }
    });
  })(OpenSeadragon);
  (function($) {
    var THIS = {};
    var nextHash = 1;
    $.Viewer = function(options) {
      var args = arguments, _this = this, i;
      if (!$.isPlainObject(options)) {
        options = {
          id: args[0],
          xmlPath: args.length > 1 ? args[1] : undefined,
          prefixUrl: args.length > 2 ? args[2] : undefined,
          controls: args.length > 3 ? args[3] : undefined,
          overlays: args.length > 4 ? args[4] : undefined
        };
      }
      if (options.config) {
        $.extend(true, options, options.config);
        delete options.config;
      }
      let drawerOptionList = [
        "useCanvas"
      ];
      options.drawerOptions = Object.assign({}, drawerOptionList.reduce((drawerOptions, option) => {
        drawerOptions[option] = options[option];
        delete options[option];
        return drawerOptions;
      }, {}), options.drawerOptions);
      $.extend(true, this, {
        id: options.id,
        hash: options.hash || nextHash++,
        initialPage: 0,
        element: null,
        container: null,
        canvas: null,
        overlays: [],
        overlaysContainer: null,
        previousBody: [],
        customControls: [],
        source: null,
        drawer: null,
        world: null,
        viewport: null,
        navigator: null,
        collectionViewport: null,
        collectionDrawer: null,
        navImages: null,
        buttonGroup: null,
        profiler: null
      }, $.DEFAULT_SETTINGS, options);
      if (typeof this.hash === "undefined") {
        throw new Error("A hash must be defined, either by specifying options.id or options.hash.");
      }
      if (typeof THIS[this.hash] !== "undefined") {
        $.console.warn("Hash " + this.hash + " has already been used.");
      }
      THIS[this.hash] = {
        fsBoundsDelta: new $.Point(1, 1),
        prevContainerSize: null,
        animating: false,
        forceRedraw: false,
        needsResize: false,
        forceResize: false,
        mouseInside: false,
        group: null,
        zooming: false,
        zoomFactor: null,
        lastZoomTime: null,
        fullPage: false,
        onfullscreenchange: null,
        lastClickTime: null,
        draggingToZoom: false
      };
      this._sequenceIndex = 0;
      this._firstOpen = true;
      this._updateRequestId = null;
      this._loadQueue = [];
      this.currentOverlays = [];
      this._updatePixelDensityRatioBind = null;
      this._lastScrollTime = $.now();
      $.EventSource.call(this);
      this.addHandler("open-failed", function(event) {
        var msg = $.getString("Errors.OpenFailed", event.eventSource, event.message);
        _this._showMessage(msg);
      });
      $.ControlDock.call(this, options);
      if (this.xmlPath) {
        this.tileSources = [this.xmlPath];
      }
      this.element = this.element || document.getElementById(this.id);
      this.canvas = $.makeNeutralElement("div");
      this.canvas.className = "openseadragon-canvas";
      (function(style) {
        style.width = "100%";
        style.height = "100%";
        style.overflow = "hidden";
        style.position = "absolute";
        style.top = "0px";
        style.left = "0px";
      })(this.canvas.style);
      $.setElementTouchActionNone(this.canvas);
      if (options.tabIndex !== "") {
        this.canvas.tabIndex = options.tabIndex === undefined ? 0 : options.tabIndex;
      }
      this.container.className = "openseadragon-container";
      (function(style) {
        style.width = "100%";
        style.height = "100%";
        style.position = "relative";
        style.overflow = "hidden";
        style.left = "0px";
        style.top = "0px";
        style.textAlign = "left";
      })(this.container.style);
      $.setElementTouchActionNone(this.container);
      this.container.insertBefore(this.canvas, this.container.firstChild);
      this.element.appendChild(this.container);
      this.bodyWidth = document.body.style.width;
      this.bodyHeight = document.body.style.height;
      this.bodyOverflow = document.body.style.overflow;
      this.docOverflow = document.documentElement.style.overflow;
      this.innerTracker = new $.MouseTracker({
        userData: "Viewer.innerTracker",
        element: this.canvas,
        startDisabled: !this.mouseNavEnabled,
        clickTimeThreshold: this.clickTimeThreshold,
        clickDistThreshold: this.clickDistThreshold,
        dblClickTimeThreshold: this.dblClickTimeThreshold,
        dblClickDistThreshold: this.dblClickDistThreshold,
        contextMenuHandler: $.delegate(this, onCanvasContextMenu),
        keyDownHandler: $.delegate(this, onCanvasKeyDown),
        keyHandler: $.delegate(this, onCanvasKeyPress),
        clickHandler: $.delegate(this, onCanvasClick),
        dblClickHandler: $.delegate(this, onCanvasDblClick),
        dragHandler: $.delegate(this, onCanvasDrag),
        dragEndHandler: $.delegate(this, onCanvasDragEnd),
        enterHandler: $.delegate(this, onCanvasEnter),
        leaveHandler: $.delegate(this, onCanvasLeave),
        pressHandler: $.delegate(this, onCanvasPress),
        releaseHandler: $.delegate(this, onCanvasRelease),
        nonPrimaryPressHandler: $.delegate(this, onCanvasNonPrimaryPress),
        nonPrimaryReleaseHandler: $.delegate(this, onCanvasNonPrimaryRelease),
        scrollHandler: $.delegate(this, onCanvasScroll),
        pinchHandler: $.delegate(this, onCanvasPinch),
        focusHandler: $.delegate(this, onCanvasFocus),
        blurHandler: $.delegate(this, onCanvasBlur)
      });
      this.outerTracker = new $.MouseTracker({
        userData: "Viewer.outerTracker",
        element: this.container,
        startDisabled: !this.mouseNavEnabled,
        clickTimeThreshold: this.clickTimeThreshold,
        clickDistThreshold: this.clickDistThreshold,
        dblClickTimeThreshold: this.dblClickTimeThreshold,
        dblClickDistThreshold: this.dblClickDistThreshold,
        enterHandler: $.delegate(this, onContainerEnter),
        leaveHandler: $.delegate(this, onContainerLeave)
      });
      if (this.toolbar) {
        this.toolbar = new $.ControlDock({ element: this.toolbar });
      }
      this.bindStandardControls();
      THIS[this.hash].prevContainerSize = _getSafeElemSize(this.container);
      if (window.ResizeObserver) {
        this._autoResizePolling = false;
        this._resizeObserver = new ResizeObserver(function() {
          THIS[_this.hash].needsResize = true;
        });
        this._resizeObserver.observe(this.container, {});
      } else {
        this._autoResizePolling = true;
      }
      this.world = new $.World({
        viewer: this
      });
      this.world.addHandler("add-item", function(event) {
        _this.source = _this.world.getItemAt(0).source;
        THIS[_this.hash].forceRedraw = true;
        if (!_this._updateRequestId) {
          _this._updateRequestId = scheduleUpdate(_this, updateMulti);
        }
      });
      this.world.addHandler("remove-item", function(event) {
        if (_this.world.getItemCount()) {
          _this.source = _this.world.getItemAt(0).source;
        } else {
          _this.source = null;
        }
        THIS[_this.hash].forceRedraw = true;
      });
      this.world.addHandler("metrics-change", function(event) {
        if (_this.viewport) {
          _this.viewport._setContentBounds(_this.world.getHomeBounds(), _this.world.getContentFactor());
        }
      });
      this.world.addHandler("item-index-change", function(event) {
        _this.source = _this.world.getItemAt(0).source;
      });
      this.viewport = new $.Viewport({
        containerSize: THIS[this.hash].prevContainerSize,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime,
        minZoomImageRatio: this.minZoomImageRatio,
        maxZoomPixelRatio: this.maxZoomPixelRatio,
        visibilityRatio: this.visibilityRatio,
        wrapHorizontal: this.wrapHorizontal,
        wrapVertical: this.wrapVertical,
        defaultZoomLevel: this.defaultZoomLevel,
        minZoomLevel: this.minZoomLevel,
        maxZoomLevel: this.maxZoomLevel,
        viewer: this,
        degrees: this.degrees,
        flipped: this.flipped,
        overlayPreserveContentDirection: this.overlayPreserveContentDirection,
        navigatorRotate: this.navigatorRotate,
        homeFillsViewer: this.homeFillsViewer,
        margins: this.viewportMargins,
        silenceMultiImageWarnings: this.silenceMultiImageWarnings
      });
      this.viewport._setContentBounds(this.world.getHomeBounds(), this.world.getContentFactor());
      this.imageLoader = new $.ImageLoader({
        jobLimit: this.imageLoaderLimit,
        timeout: options.timeout,
        tileRetryMax: this.tileRetryMax,
        tileRetryDelay: this.tileRetryDelay
      });
      this.tileCache = new $.TileCache({
        maxImageCacheCount: this.maxImageCacheCount
      });
      if (Object.prototype.hasOwnProperty.call(this.drawerOptions, "useCanvas")) {
        $.console.error('useCanvas is deprecated, use the "drawer" option to indicate preferred drawer(s)');
        if (!this.drawerOptions.useCanvas) {
          this.drawer = $.HTMLDrawer;
        }
        delete this.drawerOptions.useCanvas;
      }
      let drawerCandidates = Array.isArray(this.drawer) ? this.drawer : [this.drawer];
      if (drawerCandidates.length === 0) {
        drawerCandidates = [$.DEFAULT_SETTINGS.drawer].flat();
        $.console.warn("No valid drawers were selected. Using the default value.");
      }
      this.drawer = null;
      for (const drawerCandidate of drawerCandidates) {
        let success = this.requestDrawer(drawerCandidate, { mainDrawer: true, redrawImmediately: false });
        if (success) {
          break;
        }
      }
      if (!this.drawer) {
        $.console.error("No drawer could be created!");
        throw "Error with creating the selected drawer(s)";
      }
      this.drawer.setImageSmoothingEnabled(this.imageSmoothingEnabled);
      this.overlaysContainer = $.makeNeutralElement("div");
      this.canvas.appendChild(this.overlaysContainer);
      if (!this.drawer.canRotate()) {
        if (this.rotateLeft) {
          i = this.buttonGroup.buttons.indexOf(this.rotateLeft);
          this.buttonGroup.buttons.splice(i, 1);
          this.buttonGroup.element.removeChild(this.rotateLeft.element);
        }
        if (this.rotateRight) {
          i = this.buttonGroup.buttons.indexOf(this.rotateRight);
          this.buttonGroup.buttons.splice(i, 1);
          this.buttonGroup.element.removeChild(this.rotateRight.element);
        }
      }
      this._addUpdatePixelDensityRatioEvent();
      if (this.showNavigator) {
        this.navigator = new $.Navigator({
          element: this.navigatorElement,
          id: this.navigatorId,
          position: this.navigatorPosition,
          sizeRatio: this.navigatorSizeRatio,
          maintainSizeRatio: this.navigatorMaintainSizeRatio,
          top: this.navigatorTop,
          left: this.navigatorLeft,
          width: this.navigatorWidth,
          height: this.navigatorHeight,
          autoResize: this.navigatorAutoResize,
          autoFade: this.navigatorAutoFade,
          prefixUrl: this.prefixUrl,
          viewer: this,
          navigatorRotate: this.navigatorRotate,
          background: this.navigatorBackground,
          opacity: this.navigatorOpacity,
          borderColor: this.navigatorBorderColor,
          displayRegionColor: this.navigatorDisplayRegionColor,
          crossOriginPolicy: this.crossOriginPolicy,
          animationTime: this.animationTime,
          drawer: this.drawer.getType(),
          loadTilesWithAjax: this.loadTilesWithAjax,
          ajaxHeaders: this.ajaxHeaders,
          ajaxWithCredentials: this.ajaxWithCredentials
        });
      }
      if (this.sequenceMode) {
        this.bindSequenceControls();
      }
      if (this.tileSources) {
        this.open(this.tileSources);
      }
      for (i = 0;i < this.customControls.length; i++) {
        this.addControl(this.customControls[i].id, { anchor: this.customControls[i].anchor });
      }
      $.requestAnimationFrame(function() {
        beginControlsAutoHide(_this);
      });
      $._viewers.set(this.element, this);
    };
    $.extend($.Viewer.prototype, $.EventSource.prototype, $.ControlDock.prototype, {
      isOpen: function() {
        return !!this.world.getItemCount();
      },
      openDzi: function(dzi) {
        $.console.error("[Viewer.openDzi] this function is deprecated; use Viewer.open() instead.");
        return this.open(dzi);
      },
      openTileSource: function(tileSource) {
        $.console.error("[Viewer.openTileSource] this function is deprecated; use Viewer.open() instead.");
        return this.open(tileSource);
      },
      get buttons() {
        $.console.warn("Viewer.buttons is deprecated; Please use Viewer.buttonGroup");
        return this.buttonGroup;
      },
      open: function(tileSources, initialPage) {
        var _this = this;
        this.close();
        if (!tileSources) {
          return this;
        }
        if (this.sequenceMode && $.isArray(tileSources)) {
          if (this.referenceStrip) {
            this.referenceStrip.destroy();
            this.referenceStrip = null;
          }
          if (typeof initialPage !== "undefined" && !isNaN(initialPage)) {
            this.initialPage = initialPage;
          }
          this.tileSources = tileSources;
          this._sequenceIndex = Math.max(0, Math.min(this.tileSources.length - 1, this.initialPage));
          if (this.tileSources.length) {
            this.open(this.tileSources[this._sequenceIndex]);
            if (this.showReferenceStrip) {
              this.addReferenceStrip();
            }
          }
          this._updateSequenceButtons(this._sequenceIndex);
          return this;
        }
        if (!$.isArray(tileSources)) {
          tileSources = [tileSources];
        }
        if (!tileSources.length) {
          return this;
        }
        this._opening = true;
        var expected = tileSources.length;
        var successes = 0;
        var failures = 0;
        var failEvent;
        var checkCompletion = function() {
          if (successes + failures === expected) {
            if (successes) {
              if (_this._firstOpen || !_this.preserveViewport) {
                _this.viewport.goHome(true);
                _this.viewport.update();
              }
              _this._firstOpen = false;
              var source = tileSources[0];
              if (source.tileSource) {
                source = source.tileSource;
              }
              if (_this.overlays && !_this.preserveOverlays) {
                for (var i2 = 0;i2 < _this.overlays.length; i2++) {
                  _this.currentOverlays[i2] = getOverlayObject(_this, _this.overlays[i2]);
                }
              }
              _this._drawOverlays();
              _this._opening = false;
              _this.raiseEvent("open", { source });
            } else {
              _this._opening = false;
              _this.raiseEvent("open-failed", failEvent);
            }
          }
        };
        var doOne = function(options) {
          if (!$.isPlainObject(options) || !options.tileSource) {
            options = {
              tileSource: options
            };
          }
          if (options.index !== undefined) {
            $.console.error("[Viewer.open] setting indexes here is not supported; use addTiledImage instead");
            delete options.index;
          }
          if (options.collectionImmediately === undefined) {
            options.collectionImmediately = true;
          }
          var originalSuccess = options.success;
          options.success = function(event) {
            successes++;
            if (options.tileSource.overlays) {
              for (var i2 = 0;i2 < options.tileSource.overlays.length; i2++) {
                _this.addOverlay(options.tileSource.overlays[i2]);
              }
            }
            if (originalSuccess) {
              originalSuccess(event);
            }
            checkCompletion();
          };
          var originalError = options.error;
          options.error = function(event) {
            failures++;
            if (!failEvent) {
              failEvent = event;
            }
            if (originalError) {
              originalError(event);
            }
            checkCompletion();
          };
          _this.addTiledImage(options);
        };
        for (var i = 0;i < tileSources.length; i++) {
          doOne(tileSources[i]);
        }
        return this;
      },
      close: function() {
        if (!THIS[this.hash]) {
          return this;
        }
        this._opening = false;
        if (this.navigator) {
          this.navigator.close();
        }
        if (!this.preserveOverlays) {
          this.clearOverlays();
          this.overlaysContainer.innerHTML = "";
        }
        THIS[this.hash].animating = false;
        this.world.removeAll();
        this.imageLoader.clear();
        this.raiseEvent("close");
        return this;
      },
      destroy: function() {
        if (!THIS[this.hash]) {
          return;
        }
        this.raiseEvent("before-destroy");
        this._removeUpdatePixelDensityRatioEvent();
        this.close();
        this.clearOverlays();
        this.overlaysContainer.innerHTML = "";
        if (this._resizeObserver) {
          this._resizeObserver.disconnect();
        }
        if (this.referenceStrip) {
          this.referenceStrip.destroy();
          this.referenceStrip = null;
        }
        if (this._updateRequestId !== null) {
          $.cancelAnimationFrame(this._updateRequestId);
          this._updateRequestId = null;
        }
        if (this.drawer) {
          this.drawer.destroy();
        }
        if (this.navigator) {
          this.navigator.destroy();
          THIS[this.navigator.hash] = null;
          delete THIS[this.navigator.hash];
          this.navigator = null;
        }
        if (this.buttonGroup) {
          this.buttonGroup.destroy();
        } else if (this.customButtons) {
          while (this.customButtons.length) {
            this.customButtons.pop().destroy();
          }
        }
        if (this.paging) {
          this.paging.destroy();
        }
        if (this.element) {
          while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
          }
        }
        this.container.onsubmit = null;
        this.clearControls();
        if (this.innerTracker) {
          this.innerTracker.destroy();
        }
        if (this.outerTracker) {
          this.outerTracker.destroy();
        }
        THIS[this.hash] = null;
        delete THIS[this.hash];
        this.canvas = null;
        this.container = null;
        $._viewers.delete(this.element);
        this.element = null;
        this.raiseEvent("destroy");
        this.removeAllHandlers();
      },
      requestDrawer(drawerCandidate, options) {
        const defaultOpts = {
          mainDrawer: true,
          redrawImmediately: true,
          drawerOptions: null
        };
        options = $.extend(true, defaultOpts, options);
        const mainDrawer = options.mainDrawer;
        const redrawImmediately = options.redrawImmediately;
        const drawerOptions = options.drawerOptions;
        const oldDrawer = this.drawer;
        let Drawer = null;
        if (drawerCandidate && drawerCandidate.prototype instanceof $.DrawerBase) {
          Drawer = drawerCandidate;
          drawerCandidate = "custom";
        } else if (typeof drawerCandidate === "string") {
          Drawer = $.determineDrawer(drawerCandidate);
        }
        if (!Drawer) {
          $.console.warn("Unsupported drawer! Drawer must be an existing string type, or a class that extends OpenSeadragon.DrawerBase.");
        }
        if (Drawer && Drawer.isSupported()) {
          if (oldDrawer && mainDrawer) {
            oldDrawer.destroy();
          }
          const newDrawer = new Drawer({
            viewer: this,
            viewport: this.viewport,
            element: this.canvas,
            debugGridColor: this.debugGridColor,
            options: drawerOptions || this.drawerOptions[drawerCandidate]
          });
          if (mainDrawer) {
            this.drawer = newDrawer;
            if (redrawImmediately) {
              this.forceRedraw();
            }
          }
          return newDrawer;
        }
        return false;
      },
      isMouseNavEnabled: function() {
        return this.innerTracker.isTracking();
      },
      setMouseNavEnabled: function(enabled) {
        this.innerTracker.setTracking(enabled);
        this.outerTracker.setTracking(enabled);
        this.raiseEvent("mouse-enabled", { enabled });
        return this;
      },
      areControlsEnabled: function() {
        var enabled = this.controls.length, i;
        for (i = 0;i < this.controls.length; i++) {
          enabled = enabled && this.controls[i].isVisible();
        }
        return enabled;
      },
      setControlsEnabled: function(enabled) {
        if (enabled) {
          abortControlsAutoHide(this);
        } else {
          beginControlsAutoHide(this);
        }
        this.raiseEvent("controls-enabled", { enabled });
        return this;
      },
      setDebugMode: function(debugMode) {
        for (var i = 0;i < this.world.getItemCount(); i++) {
          this.world.getItemAt(i).debugMode = debugMode;
        }
        this.debugMode = debugMode;
        this.forceRedraw();
      },
      setAjaxHeaders: function(ajaxHeaders, propagate) {
        if (ajaxHeaders === null) {
          ajaxHeaders = {};
        }
        if (!$.isPlainObject(ajaxHeaders)) {
          console.error("[Viewer.setAjaxHeaders] Ignoring invalid headers, must be a plain object");
          return;
        }
        if (propagate === undefined) {
          propagate = true;
        }
        this.ajaxHeaders = ajaxHeaders;
        if (propagate) {
          for (var i = 0;i < this.world.getItemCount(); i++) {
            this.world.getItemAt(i)._updateAjaxHeaders(true);
          }
          if (this.navigator) {
            this.navigator.setAjaxHeaders(this.ajaxHeaders, true);
          }
          if (this.referenceStrip && this.referenceStrip.miniViewers) {
            for (var key in this.referenceStrip.miniViewers) {
              this.referenceStrip.miniViewers[key].setAjaxHeaders(this.ajaxHeaders, true);
            }
          }
        }
      },
      addButton: function(button) {
        this.buttonGroup.addButton(button);
      },
      isFullPage: function() {
        return THIS[this.hash] && THIS[this.hash].fullPage;
      },
      setFullPage: function(fullPage) {
        var body = document.body, bodyStyle = body.style, docStyle = document.documentElement.style, _this = this, nodes, i;
        if (fullPage === this.isFullPage()) {
          return this;
        }
        var fullPageEventArgs = {
          fullPage,
          preventDefaultAction: false
        };
        this.raiseEvent("pre-full-page", fullPageEventArgs);
        if (fullPageEventArgs.preventDefaultAction) {
          return this;
        }
        if (fullPage && this.element) {
          this.elementSize = $.getElementSize(this.element);
          this.pageScroll = $.getPageScroll();
          this.elementMargin = this.element.style.margin;
          this.element.style.margin = "0";
          this.elementPadding = this.element.style.padding;
          this.element.style.padding = "0";
          this.bodyMargin = bodyStyle.margin;
          this.docMargin = docStyle.margin;
          bodyStyle.margin = "0";
          docStyle.margin = "0";
          this.bodyPadding = bodyStyle.padding;
          this.docPadding = docStyle.padding;
          bodyStyle.padding = "0";
          docStyle.padding = "0";
          this.bodyWidth = bodyStyle.width;
          this.docWidth = docStyle.width;
          bodyStyle.width = "100%";
          docStyle.width = "100%";
          this.bodyHeight = bodyStyle.height;
          this.docHeight = docStyle.height;
          bodyStyle.height = "100%";
          docStyle.height = "100%";
          this.bodyDisplay = bodyStyle.display;
          bodyStyle.display = "block";
          this.previousBody = [];
          THIS[this.hash].prevElementParent = this.element.parentNode;
          THIS[this.hash].prevNextSibling = this.element.nextSibling;
          THIS[this.hash].prevElementWidth = this.element.style.width;
          THIS[this.hash].prevElementHeight = this.element.style.height;
          nodes = body.childNodes.length;
          for (i = 0;i < nodes; i++) {
            this.previousBody.push(body.childNodes[0]);
            body.removeChild(body.childNodes[0]);
          }
          if (this.toolbar && this.toolbar.element) {
            this.toolbar.parentNode = this.toolbar.element.parentNode;
            this.toolbar.nextSibling = this.toolbar.element.nextSibling;
            body.appendChild(this.toolbar.element);
            $.addClass(this.toolbar.element, "fullpage");
          }
          $.addClass(this.element, "fullpage");
          body.appendChild(this.element);
          this.element.style.height = "100vh";
          this.element.style.width = "100vw";
          if (this.toolbar && this.toolbar.element) {
            this.element.style.height = $.getElementSize(this.element).y - $.getElementSize(this.toolbar.element).y + "px";
          }
          THIS[this.hash].fullPage = true;
          $.delegate(this, onContainerEnter)({});
        } else {
          this.element.style.margin = this.elementMargin;
          this.element.style.padding = this.elementPadding;
          bodyStyle.margin = this.bodyMargin;
          docStyle.margin = this.docMargin;
          bodyStyle.padding = this.bodyPadding;
          docStyle.padding = this.docPadding;
          bodyStyle.width = this.bodyWidth;
          docStyle.width = this.docWidth;
          bodyStyle.height = this.bodyHeight;
          docStyle.height = this.docHeight;
          bodyStyle.display = this.bodyDisplay;
          body.removeChild(this.element);
          nodes = this.previousBody.length;
          for (i = 0;i < nodes; i++) {
            body.appendChild(this.previousBody.shift());
          }
          $.removeClass(this.element, "fullpage");
          THIS[this.hash].prevElementParent.insertBefore(this.element, THIS[this.hash].prevNextSibling);
          if (this.toolbar && this.toolbar.element) {
            body.removeChild(this.toolbar.element);
            $.removeClass(this.toolbar.element, "fullpage");
            this.toolbar.parentNode.insertBefore(this.toolbar.element, this.toolbar.nextSibling);
            delete this.toolbar.parentNode;
            delete this.toolbar.nextSibling;
          }
          this.element.style.width = THIS[this.hash].prevElementWidth;
          this.element.style.height = THIS[this.hash].prevElementHeight;
          var restoreScrollCounter = 0;
          var restoreScroll = function() {
            $.setPageScroll(_this.pageScroll);
            var pageScroll = $.getPageScroll();
            restoreScrollCounter++;
            if (restoreScrollCounter < 10 && (pageScroll.x !== _this.pageScroll.x || pageScroll.y !== _this.pageScroll.y)) {
              $.requestAnimationFrame(restoreScroll);
            }
          };
          $.requestAnimationFrame(restoreScroll);
          THIS[this.hash].fullPage = false;
          $.delegate(this, onContainerLeave)({});
        }
        if (this.navigator && this.viewport) {
          this.navigator.update(this.viewport);
        }
        this.raiseEvent("full-page", { fullPage });
        return this;
      },
      setFullScreen: function(fullScreen) {
        var _this = this;
        if (!$.supportsFullScreen) {
          return this.setFullPage(fullScreen);
        }
        if ($.isFullScreen() === fullScreen) {
          return this;
        }
        var fullScreeEventArgs = {
          fullScreen,
          preventDefaultAction: false
        };
        this.raiseEvent("pre-full-screen", fullScreeEventArgs);
        if (fullScreeEventArgs.preventDefaultAction) {
          return this;
        }
        if (fullScreen) {
          this.setFullPage(true);
          if (!this.isFullPage()) {
            return this;
          }
          this.fullPageStyleWidth = this.element.style.width;
          this.fullPageStyleHeight = this.element.style.height;
          this.element.style.width = "100%";
          this.element.style.height = "100%";
          var onFullScreenChange = function() {
            var isFullScreen = $.isFullScreen();
            if (!isFullScreen) {
              $.removeEvent(document, $.fullScreenEventName, onFullScreenChange);
              $.removeEvent(document, $.fullScreenErrorEventName, onFullScreenChange);
              _this.setFullPage(false);
              if (_this.isFullPage()) {
                _this.element.style.width = _this.fullPageStyleWidth;
                _this.element.style.height = _this.fullPageStyleHeight;
              }
            }
            if (_this.navigator && _this.viewport) {
              setTimeout(function() {
                _this.navigator.update(_this.viewport);
              });
            }
            _this.raiseEvent("full-screen", { fullScreen: isFullScreen });
          };
          $.addEvent(document, $.fullScreenEventName, onFullScreenChange);
          $.addEvent(document, $.fullScreenErrorEventName, onFullScreenChange);
          $.requestFullScreen(document.body);
        } else {
          $.exitFullScreen();
        }
        return this;
      },
      isVisible: function() {
        return this.container.style.visibility !== "hidden";
      },
      isFullScreen: function() {
        return $.isFullScreen() && this.isFullPage();
      },
      setVisible: function(visible) {
        this.container.style.visibility = visible ? "" : "hidden";
        this.raiseEvent("visible", { visible });
        return this;
      },
      addTiledImage: function(options) {
        $.console.assert(options, "[Viewer.addTiledImage] options is required");
        $.console.assert(options.tileSource, "[Viewer.addTiledImage] options.tileSource is required");
        $.console.assert(!options.replace || options.index > -1 && options.index < this.world.getItemCount(), "[Viewer.addTiledImage] if options.replace is used, options.index must be a valid index in Viewer.world");
        var _this = this;
        if (options.replace) {
          options.replaceItem = _this.world.getItemAt(options.index);
        }
        this._hideMessage();
        if (options.placeholderFillStyle === undefined) {
          options.placeholderFillStyle = this.placeholderFillStyle;
        }
        if (options.opacity === undefined) {
          options.opacity = this.opacity;
        }
        if (options.preload === undefined) {
          options.preload = this.preload;
        }
        if (options.compositeOperation === undefined) {
          options.compositeOperation = this.compositeOperation;
        }
        if (options.crossOriginPolicy === undefined) {
          options.crossOriginPolicy = options.tileSource.crossOriginPolicy !== undefined ? options.tileSource.crossOriginPolicy : this.crossOriginPolicy;
        }
        if (options.ajaxWithCredentials === undefined) {
          options.ajaxWithCredentials = this.ajaxWithCredentials;
        }
        if (options.loadTilesWithAjax === undefined) {
          options.loadTilesWithAjax = this.loadTilesWithAjax;
        }
        if (!$.isPlainObject(options.ajaxHeaders)) {
          options.ajaxHeaders = {};
        }
        var myQueueItem = {
          options
        };
        function raiseAddItemFailed(event) {
          for (var i = 0;i < _this._loadQueue.length; i++) {
            if (_this._loadQueue[i] === myQueueItem) {
              _this._loadQueue.splice(i, 1);
              break;
            }
          }
          if (_this._loadQueue.length === 0) {
            refreshWorld(myQueueItem);
          }
          _this.raiseEvent("add-item-failed", event);
          if (options.error) {
            options.error(event);
          }
        }
        function refreshWorld(theItem) {
          if (_this.collectionMode) {
            _this.world.arrange({
              immediately: theItem.options.collectionImmediately,
              rows: _this.collectionRows,
              columns: _this.collectionColumns,
              layout: _this.collectionLayout,
              tileSize: _this.collectionTileSize,
              tileMargin: _this.collectionTileMargin
            });
            _this.world.setAutoRefigureSizes(true);
          }
        }
        if ($.isArray(options.tileSource)) {
          setTimeout(function() {
            raiseAddItemFailed({
              message: "[Viewer.addTiledImage] Sequences can not be added; add them one at a time instead.",
              source: options.tileSource,
              options
            });
          });
          return;
        }
        this._loadQueue.push(myQueueItem);
        function processReadyItems() {
          var queueItem, tiledImage, optionsClone;
          while (_this._loadQueue.length) {
            queueItem = _this._loadQueue[0];
            if (!queueItem.tileSource) {
              break;
            }
            _this._loadQueue.splice(0, 1);
            if (queueItem.options.replace) {
              var newIndex = _this.world.getIndexOfItem(queueItem.options.replaceItem);
              if (newIndex !== -1) {
                queueItem.options.index = newIndex;
              }
              _this.world.removeItem(queueItem.options.replaceItem);
            }
            tiledImage = new $.TiledImage({
              viewer: _this,
              source: queueItem.tileSource,
              viewport: _this.viewport,
              drawer: _this.drawer,
              tileCache: _this.tileCache,
              imageLoader: _this.imageLoader,
              x: queueItem.options.x,
              y: queueItem.options.y,
              width: queueItem.options.width,
              height: queueItem.options.height,
              fitBounds: queueItem.options.fitBounds,
              fitBoundsPlacement: queueItem.options.fitBoundsPlacement,
              clip: queueItem.options.clip,
              placeholderFillStyle: queueItem.options.placeholderFillStyle,
              opacity: queueItem.options.opacity,
              preload: queueItem.options.preload,
              degrees: queueItem.options.degrees,
              flipped: queueItem.options.flipped,
              compositeOperation: queueItem.options.compositeOperation,
              springStiffness: _this.springStiffness,
              animationTime: _this.animationTime,
              minZoomImageRatio: _this.minZoomImageRatio,
              wrapHorizontal: _this.wrapHorizontal,
              wrapVertical: _this.wrapVertical,
              maxTilesPerFrame: _this.maxTilesPerFrame,
              immediateRender: _this.immediateRender,
              blendTime: _this.blendTime,
              alwaysBlend: _this.alwaysBlend,
              minPixelRatio: _this.minPixelRatio,
              smoothTileEdgesMinZoom: _this.smoothTileEdgesMinZoom,
              iOSDevice: _this.iOSDevice,
              crossOriginPolicy: queueItem.options.crossOriginPolicy,
              ajaxWithCredentials: queueItem.options.ajaxWithCredentials,
              loadTilesWithAjax: queueItem.options.loadTilesWithAjax,
              ajaxHeaders: queueItem.options.ajaxHeaders,
              debugMode: _this.debugMode,
              subPixelRoundingForTransparency: _this.subPixelRoundingForTransparency
            });
            if (_this.collectionMode) {
              _this.world.setAutoRefigureSizes(false);
            }
            if (_this.navigator) {
              optionsClone = $.extend({}, queueItem.options, {
                replace: false,
                originalTiledImage: tiledImage,
                tileSource: queueItem.tileSource
              });
              _this.navigator.addTiledImage(optionsClone);
            }
            _this.world.addItem(tiledImage, {
              index: queueItem.options.index
            });
            if (_this._loadQueue.length === 0) {
              refreshWorld(queueItem);
            }
            if (_this.world.getItemCount() === 1 && !_this.preserveViewport) {
              _this.viewport.goHome(true);
            }
            if (queueItem.options.success) {
              queueItem.options.success({
                item: tiledImage
              });
            }
          }
        }
        getTileSourceImplementation(this, options.tileSource, options, function(tileSource) {
          myQueueItem.tileSource = tileSource;
          processReadyItems();
        }, function(event) {
          event.options = options;
          raiseAddItemFailed(event);
          processReadyItems();
        });
      },
      addSimpleImage: function(options) {
        $.console.assert(options, "[Viewer.addSimpleImage] options is required");
        $.console.assert(options.url, "[Viewer.addSimpleImage] options.url is required");
        var opts = $.extend({}, options, {
          tileSource: {
            type: "image",
            url: options.url
          }
        });
        delete opts.url;
        this.addTiledImage(opts);
      },
      addLayer: function(options) {
        var _this = this;
        $.console.error("[Viewer.addLayer] this function is deprecated; use Viewer.addTiledImage() instead.");
        var optionsClone = $.extend({}, options, {
          success: function(event) {
            _this.raiseEvent("add-layer", {
              options,
              drawer: event.item
            });
          },
          error: function(event) {
            _this.raiseEvent("add-layer-failed", event);
          }
        });
        this.addTiledImage(optionsClone);
        return this;
      },
      getLayerAtLevel: function(level) {
        $.console.error("[Viewer.getLayerAtLevel] this function is deprecated; use World.getItemAt() instead.");
        return this.world.getItemAt(level);
      },
      getLevelOfLayer: function(drawer) {
        $.console.error("[Viewer.getLevelOfLayer] this function is deprecated; use World.getIndexOfItem() instead.");
        return this.world.getIndexOfItem(drawer);
      },
      getLayersCount: function() {
        $.console.error("[Viewer.getLayersCount] this function is deprecated; use World.getItemCount() instead.");
        return this.world.getItemCount();
      },
      setLayerLevel: function(drawer, level) {
        $.console.error("[Viewer.setLayerLevel] this function is deprecated; use World.setItemIndex() instead.");
        return this.world.setItemIndex(drawer, level);
      },
      removeLayer: function(drawer) {
        $.console.error("[Viewer.removeLayer] this function is deprecated; use World.removeItem() instead.");
        return this.world.removeItem(drawer);
      },
      forceRedraw: function() {
        THIS[this.hash].forceRedraw = true;
        return this;
      },
      forceResize: function() {
        THIS[this.hash].needsResize = true;
        THIS[this.hash].forceResize = true;
      },
      bindSequenceControls: function() {
        var onFocusHandler = $.delegate(this, onFocus), onBlurHandler = $.delegate(this, onBlur), onNextHandler = $.delegate(this, this.goToNextPage), onPreviousHandler = $.delegate(this, this.goToPreviousPage), navImages = this.navImages, useGroup = true;
        if (this.showSequenceControl) {
          if (this.previousButton || this.nextButton) {
            useGroup = false;
          }
          this.previousButton = new $.Button({
            element: this.previousButton ? $.getElement(this.previousButton) : null,
            clickTimeThreshold: this.clickTimeThreshold,
            clickDistThreshold: this.clickDistThreshold,
            tooltip: $.getString("Tooltips.PreviousPage"),
            srcRest: resolveUrl(this.prefixUrl, navImages.previous.REST),
            srcGroup: resolveUrl(this.prefixUrl, navImages.previous.GROUP),
            srcHover: resolveUrl(this.prefixUrl, navImages.previous.HOVER),
            srcDown: resolveUrl(this.prefixUrl, navImages.previous.DOWN),
            onRelease: onPreviousHandler,
            onFocus: onFocusHandler,
            onBlur: onBlurHandler
          });
          this.nextButton = new $.Button({
            element: this.nextButton ? $.getElement(this.nextButton) : null,
            clickTimeThreshold: this.clickTimeThreshold,
            clickDistThreshold: this.clickDistThreshold,
            tooltip: $.getString("Tooltips.NextPage"),
            srcRest: resolveUrl(this.prefixUrl, navImages.next.REST),
            srcGroup: resolveUrl(this.prefixUrl, navImages.next.GROUP),
            srcHover: resolveUrl(this.prefixUrl, navImages.next.HOVER),
            srcDown: resolveUrl(this.prefixUrl, navImages.next.DOWN),
            onRelease: onNextHandler,
            onFocus: onFocusHandler,
            onBlur: onBlurHandler
          });
          if (!this.navPrevNextWrap) {
            this.previousButton.disable();
          }
          if (!this.tileSources || !this.tileSources.length) {
            this.nextButton.disable();
          }
          if (useGroup) {
            this.paging = new $.ButtonGroup({
              buttons: [
                this.previousButton,
                this.nextButton
              ],
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold
            });
            this.pagingControl = this.paging.element;
            if (this.toolbar) {
              this.toolbar.addControl(this.pagingControl, { anchor: $.ControlAnchor.BOTTOM_RIGHT });
            } else {
              this.addControl(this.pagingControl, { anchor: this.sequenceControlAnchor || $.ControlAnchor.TOP_LEFT });
            }
          }
        }
        return this;
      },
      bindStandardControls: function() {
        var beginZoomingInHandler = $.delegate(this, beginZoomingIn), endZoomingHandler = $.delegate(this, endZooming), doSingleZoomInHandler = $.delegate(this, doSingleZoomIn), beginZoomingOutHandler = $.delegate(this, beginZoomingOut), doSingleZoomOutHandler = $.delegate(this, doSingleZoomOut), onHomeHandler = $.delegate(this, onHome), onFullScreenHandler = $.delegate(this, onFullScreen), onRotateLeftHandler = $.delegate(this, onRotateLeft), onRotateRightHandler = $.delegate(this, onRotateRight), onFlipHandler = $.delegate(this, onFlip), onFocusHandler = $.delegate(this, onFocus), onBlurHandler = $.delegate(this, onBlur), navImages = this.navImages, buttons = [], useGroup = true;
        if (this.showNavigationControl) {
          if (this.zoomInButton || this.zoomOutButton || this.homeButton || this.fullPageButton || this.rotateLeftButton || this.rotateRightButton || this.flipButton) {
            useGroup = false;
          }
          if (this.showZoomControl) {
            buttons.push(this.zoomInButton = new $.Button({
              element: this.zoomInButton ? $.getElement(this.zoomInButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: $.getString("Tooltips.ZoomIn"),
              srcRest: resolveUrl(this.prefixUrl, navImages.zoomIn.REST),
              srcGroup: resolveUrl(this.prefixUrl, navImages.zoomIn.GROUP),
              srcHover: resolveUrl(this.prefixUrl, navImages.zoomIn.HOVER),
              srcDown: resolveUrl(this.prefixUrl, navImages.zoomIn.DOWN),
              onPress: beginZoomingInHandler,
              onRelease: endZoomingHandler,
              onClick: doSingleZoomInHandler,
              onEnter: beginZoomingInHandler,
              onExit: endZoomingHandler,
              onFocus: onFocusHandler,
              onBlur: onBlurHandler
            }));
            buttons.push(this.zoomOutButton = new $.Button({
              element: this.zoomOutButton ? $.getElement(this.zoomOutButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: $.getString("Tooltips.ZoomOut"),
              srcRest: resolveUrl(this.prefixUrl, navImages.zoomOut.REST),
              srcGroup: resolveUrl(this.prefixUrl, navImages.zoomOut.GROUP),
              srcHover: resolveUrl(this.prefixUrl, navImages.zoomOut.HOVER),
              srcDown: resolveUrl(this.prefixUrl, navImages.zoomOut.DOWN),
              onPress: beginZoomingOutHandler,
              onRelease: endZoomingHandler,
              onClick: doSingleZoomOutHandler,
              onEnter: beginZoomingOutHandler,
              onExit: endZoomingHandler,
              onFocus: onFocusHandler,
              onBlur: onBlurHandler
            }));
          }
          if (this.showHomeControl) {
            buttons.push(this.homeButton = new $.Button({
              element: this.homeButton ? $.getElement(this.homeButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: $.getString("Tooltips.Home"),
              srcRest: resolveUrl(this.prefixUrl, navImages.home.REST),
              srcGroup: resolveUrl(this.prefixUrl, navImages.home.GROUP),
              srcHover: resolveUrl(this.prefixUrl, navImages.home.HOVER),
              srcDown: resolveUrl(this.prefixUrl, navImages.home.DOWN),
              onRelease: onHomeHandler,
              onFocus: onFocusHandler,
              onBlur: onBlurHandler
            }));
          }
          if (this.showFullPageControl) {
            buttons.push(this.fullPageButton = new $.Button({
              element: this.fullPageButton ? $.getElement(this.fullPageButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: $.getString("Tooltips.FullPage"),
              srcRest: resolveUrl(this.prefixUrl, navImages.fullpage.REST),
              srcGroup: resolveUrl(this.prefixUrl, navImages.fullpage.GROUP),
              srcHover: resolveUrl(this.prefixUrl, navImages.fullpage.HOVER),
              srcDown: resolveUrl(this.prefixUrl, navImages.fullpage.DOWN),
              onRelease: onFullScreenHandler,
              onFocus: onFocusHandler,
              onBlur: onBlurHandler
            }));
          }
          if (this.showRotationControl) {
            buttons.push(this.rotateLeftButton = new $.Button({
              element: this.rotateLeftButton ? $.getElement(this.rotateLeftButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: $.getString("Tooltips.RotateLeft"),
              srcRest: resolveUrl(this.prefixUrl, navImages.rotateleft.REST),
              srcGroup: resolveUrl(this.prefixUrl, navImages.rotateleft.GROUP),
              srcHover: resolveUrl(this.prefixUrl, navImages.rotateleft.HOVER),
              srcDown: resolveUrl(this.prefixUrl, navImages.rotateleft.DOWN),
              onRelease: onRotateLeftHandler,
              onFocus: onFocusHandler,
              onBlur: onBlurHandler
            }));
            buttons.push(this.rotateRightButton = new $.Button({
              element: this.rotateRightButton ? $.getElement(this.rotateRightButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: $.getString("Tooltips.RotateRight"),
              srcRest: resolveUrl(this.prefixUrl, navImages.rotateright.REST),
              srcGroup: resolveUrl(this.prefixUrl, navImages.rotateright.GROUP),
              srcHover: resolveUrl(this.prefixUrl, navImages.rotateright.HOVER),
              srcDown: resolveUrl(this.prefixUrl, navImages.rotateright.DOWN),
              onRelease: onRotateRightHandler,
              onFocus: onFocusHandler,
              onBlur: onBlurHandler
            }));
          }
          if (this.showFlipControl) {
            buttons.push(this.flipButton = new $.Button({
              element: this.flipButton ? $.getElement(this.flipButton) : null,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold,
              tooltip: $.getString("Tooltips.Flip"),
              srcRest: resolveUrl(this.prefixUrl, navImages.flip.REST),
              srcGroup: resolveUrl(this.prefixUrl, navImages.flip.GROUP),
              srcHover: resolveUrl(this.prefixUrl, navImages.flip.HOVER),
              srcDown: resolveUrl(this.prefixUrl, navImages.flip.DOWN),
              onRelease: onFlipHandler,
              onFocus: onFocusHandler,
              onBlur: onBlurHandler
            }));
          }
          if (useGroup) {
            this.buttonGroup = new $.ButtonGroup({
              buttons,
              clickTimeThreshold: this.clickTimeThreshold,
              clickDistThreshold: this.clickDistThreshold
            });
            this.navControl = this.buttonGroup.element;
            this.addHandler("open", $.delegate(this, lightUp));
            if (this.toolbar) {
              this.toolbar.addControl(this.navControl, { anchor: this.navigationControlAnchor || $.ControlAnchor.TOP_LEFT });
            } else {
              this.addControl(this.navControl, { anchor: this.navigationControlAnchor || $.ControlAnchor.TOP_LEFT });
            }
          } else {
            this.customButtons = buttons;
          }
        }
        return this;
      },
      currentPage: function() {
        return this._sequenceIndex;
      },
      goToPage: function(page) {
        if (this.tileSources && page >= 0 && page < this.tileSources.length) {
          this._sequenceIndex = page;
          this._updateSequenceButtons(page);
          this.open(this.tileSources[page]);
          if (this.referenceStrip) {
            this.referenceStrip.setFocus(page);
          }
          this.raiseEvent("page", { page });
        }
        return this;
      },
      addOverlay: function(element, location, placement, onDraw) {
        var options;
        if ($.isPlainObject(element)) {
          options = element;
        } else {
          options = {
            element,
            location,
            placement,
            onDraw
          };
        }
        element = $.getElement(options.element);
        if (getOverlayIndex(this.currentOverlays, element) >= 0) {
          return this;
        }
        var overlay = getOverlayObject(this, options);
        this.currentOverlays.push(overlay);
        overlay.drawHTML(this.overlaysContainer, this.viewport);
        this.raiseEvent("add-overlay", {
          element,
          location: options.location,
          placement: options.placement
        });
        return this;
      },
      updateOverlay: function(element, location, placement) {
        var i;
        element = $.getElement(element);
        i = getOverlayIndex(this.currentOverlays, element);
        if (i >= 0) {
          this.currentOverlays[i].update(location, placement);
          THIS[this.hash].forceRedraw = true;
          this.raiseEvent("update-overlay", {
            element,
            location,
            placement
          });
        }
        return this;
      },
      removeOverlay: function(element) {
        var i;
        element = $.getElement(element);
        i = getOverlayIndex(this.currentOverlays, element);
        if (i >= 0) {
          this.currentOverlays[i].destroy();
          this.currentOverlays.splice(i, 1);
          THIS[this.hash].forceRedraw = true;
          this.raiseEvent("remove-overlay", {
            element
          });
        }
        return this;
      },
      clearOverlays: function() {
        while (this.currentOverlays.length > 0) {
          this.currentOverlays.pop().destroy();
        }
        THIS[this.hash].forceRedraw = true;
        this.raiseEvent("clear-overlay", {});
        return this;
      },
      getOverlayById: function(element) {
        var i;
        element = $.getElement(element);
        i = getOverlayIndex(this.currentOverlays, element);
        if (i >= 0) {
          return this.currentOverlays[i];
        } else {
          return null;
        }
      },
      _updateSequenceButtons: function(page) {
        if (this.nextButton) {
          if (!this.tileSources || this.tileSources.length - 1 === page) {
            if (!this.navPrevNextWrap) {
              this.nextButton.disable();
            }
          } else {
            this.nextButton.enable();
          }
        }
        if (this.previousButton) {
          if (page > 0) {
            this.previousButton.enable();
          } else {
            if (!this.navPrevNextWrap) {
              this.previousButton.disable();
            }
          }
        }
      },
      _showMessage: function(message) {
        this._hideMessage();
        var div = $.makeNeutralElement("div");
        div.appendChild(document.createTextNode(message));
        this.messageDiv = $.makeCenteredNode(div);
        $.addClass(this.messageDiv, "openseadragon-message");
        this.container.appendChild(this.messageDiv);
      },
      _hideMessage: function() {
        var div = this.messageDiv;
        if (div) {
          div.parentNode.removeChild(div);
          delete this.messageDiv;
        }
      },
      gestureSettingsByDeviceType: function(type) {
        switch (type) {
          case "mouse":
            return this.gestureSettingsMouse;
          case "touch":
            return this.gestureSettingsTouch;
          case "pen":
            return this.gestureSettingsPen;
          default:
            return this.gestureSettingsUnknown;
        }
      },
      _drawOverlays: function() {
        var i, length = this.currentOverlays.length;
        for (i = 0;i < length; i++) {
          this.currentOverlays[i].drawHTML(this.overlaysContainer, this.viewport);
        }
      },
      _cancelPendingImages: function() {
        this._loadQueue = [];
      },
      removeReferenceStrip: function() {
        this.showReferenceStrip = false;
        if (this.referenceStrip) {
          this.referenceStrip.destroy();
          this.referenceStrip = null;
        }
      },
      addReferenceStrip: function() {
        this.showReferenceStrip = true;
        if (this.sequenceMode) {
          if (this.referenceStrip) {
            return;
          }
          if (this.tileSources.length && this.tileSources.length > 1) {
            this.referenceStrip = new $.ReferenceStrip({
              id: this.referenceStripElement,
              position: this.referenceStripPosition,
              sizeRatio: this.referenceStripSizeRatio,
              scroll: this.referenceStripScroll,
              height: this.referenceStripHeight,
              width: this.referenceStripWidth,
              tileSources: this.tileSources,
              prefixUrl: this.prefixUrl,
              viewer: this
            });
            this.referenceStrip.setFocus(this._sequenceIndex);
          }
        } else {
          $.console.warn('Attempting to display a reference strip while "sequenceMode" is off.');
        }
      },
      _addUpdatePixelDensityRatioEvent: function() {
        this._updatePixelDensityRatioBind = this._updatePixelDensityRatio.bind(this);
        $.addEvent(window, "resize", this._updatePixelDensityRatioBind);
      },
      _removeUpdatePixelDensityRatioEvent: function() {
        $.removeEvent(window, "resize", this._updatePixelDensityRatioBind);
      },
      _updatePixelDensityRatio: function() {
        var previusPixelDensityRatio = $.pixelDensityRatio;
        var currentPixelDensityRatio = $.getCurrentPixelDensityRatio();
        if (previusPixelDensityRatio !== currentPixelDensityRatio) {
          $.pixelDensityRatio = currentPixelDensityRatio;
          this.forceResize();
        }
      },
      goToPreviousPage: function() {
        var previous = this._sequenceIndex - 1;
        if (this.navPrevNextWrap && previous < 0) {
          previous += this.tileSources.length;
        }
        this.goToPage(previous);
      },
      goToNextPage: function() {
        var next = this._sequenceIndex + 1;
        if (this.navPrevNextWrap && next >= this.tileSources.length) {
          next = 0;
        }
        this.goToPage(next);
      },
      isAnimating: function() {
        return THIS[this.hash].animating;
      }
    });
    function _getSafeElemSize(oElement) {
      oElement = $.getElement(oElement);
      return new $.Point(oElement.clientWidth === 0 ? 1 : oElement.clientWidth, oElement.clientHeight === 0 ? 1 : oElement.clientHeight);
    }
    function getTileSourceImplementation(viewer, tileSource, imgOptions, successCallback, failCallback) {
      var _this = viewer;
      if ($.type(tileSource) === "string") {
        if (tileSource.match(/^\s*<.*>\s*$/)) {
          tileSource = $.parseXml(tileSource);
        } else if (tileSource.match(/^\s*[{[].*[}\]]\s*$/)) {
          try {
            var tileSourceJ = $.parseJSON(tileSource);
            tileSource = tileSourceJ;
          } catch (e) {}
        }
      }
      function waitUntilReady(tileSource2, originalTileSource) {
        if (tileSource2.ready) {
          successCallback(tileSource2);
        } else {
          tileSource2.addHandler("ready", function() {
            successCallback(tileSource2);
          });
          tileSource2.addHandler("open-failed", function(event) {
            failCallback({
              message: event.message,
              source: originalTileSource
            });
          });
        }
      }
      setTimeout(function() {
        if ($.type(tileSource) === "string") {
          tileSource = new $.TileSource({
            url: tileSource,
            crossOriginPolicy: imgOptions.crossOriginPolicy !== undefined ? imgOptions.crossOriginPolicy : viewer.crossOriginPolicy,
            ajaxWithCredentials: viewer.ajaxWithCredentials,
            ajaxHeaders: imgOptions.ajaxHeaders ? imgOptions.ajaxHeaders : viewer.ajaxHeaders,
            splitHashDataForPost: viewer.splitHashDataForPost,
            success: function(event) {
              successCallback(event.tileSource);
            }
          });
          tileSource.addHandler("open-failed", function(event) {
            failCallback(event);
          });
        } else if ($.isPlainObject(tileSource) || tileSource.nodeType) {
          if (tileSource.crossOriginPolicy === undefined && (imgOptions.crossOriginPolicy !== undefined || viewer.crossOriginPolicy !== undefined)) {
            tileSource.crossOriginPolicy = imgOptions.crossOriginPolicy !== undefined ? imgOptions.crossOriginPolicy : viewer.crossOriginPolicy;
          }
          if (tileSource.ajaxWithCredentials === undefined) {
            tileSource.ajaxWithCredentials = viewer.ajaxWithCredentials;
          }
          if ($.isFunction(tileSource.getTileUrl)) {
            var customTileSource = new $.TileSource(tileSource);
            customTileSource.getTileUrl = tileSource.getTileUrl;
            successCallback(customTileSource);
          } else {
            var $TileSource = $.TileSource.determineType(_this, tileSource);
            if (!$TileSource) {
              failCallback({
                message: "Unable to load TileSource",
                source: tileSource
              });
              return;
            }
            var options = $TileSource.prototype.configure.apply(_this, [tileSource]);
            waitUntilReady(new $TileSource(options), tileSource);
          }
        } else {
          waitUntilReady(tileSource, tileSource);
        }
      });
    }
    function getOverlayObject(viewer, overlay) {
      if (overlay instanceof $.Overlay) {
        return overlay;
      }
      var element = null;
      if (overlay.element) {
        element = $.getElement(overlay.element);
      } else {
        var id = overlay.id ? overlay.id : "openseadragon-overlay-" + Math.floor(Math.random() * 1e7);
        element = $.getElement(overlay.id);
        if (!element) {
          element = document.createElement("a");
          element.href = "#/overlay/" + id;
        }
        element.id = id;
        $.addClass(element, overlay.className ? overlay.className : "openseadragon-overlay");
      }
      var location = overlay.location;
      var width = overlay.width;
      var height = overlay.height;
      if (!location) {
        var x = overlay.x;
        var y = overlay.y;
        if (overlay.px !== undefined) {
          var rect = viewer.viewport.imageToViewportRectangle(new $.Rect(overlay.px, overlay.py, width || 0, height || 0));
          x = rect.x;
          y = rect.y;
          width = width !== undefined ? rect.width : undefined;
          height = height !== undefined ? rect.height : undefined;
        }
        location = new $.Point(x, y);
      }
      var placement = overlay.placement;
      if (placement && $.type(placement) === "string") {
        placement = $.Placement[overlay.placement.toUpperCase()];
      }
      return new $.Overlay({
        element,
        location,
        placement,
        onDraw: overlay.onDraw,
        checkResize: overlay.checkResize,
        width,
        height,
        rotationMode: overlay.rotationMode
      });
    }
    function getOverlayIndex(overlays, element) {
      var i;
      for (i = overlays.length - 1;i >= 0; i--) {
        if (overlays[i].element === element) {
          return i;
        }
      }
      return -1;
    }
    function scheduleUpdate(viewer, updateFunc) {
      return $.requestAnimationFrame(function() {
        updateFunc(viewer);
      });
    }
    function scheduleControlsFade(viewer) {
      $.requestAnimationFrame(function() {
        updateControlsFade(viewer);
      });
    }
    function beginControlsAutoHide(viewer) {
      if (!viewer.autoHideControls) {
        return;
      }
      viewer.controlsShouldFade = true;
      viewer.controlsFadeBeginTime = $.now() + viewer.controlsFadeDelay;
      window.setTimeout(function() {
        scheduleControlsFade(viewer);
      }, viewer.controlsFadeDelay);
    }
    function updateControlsFade(viewer) {
      var currentTime, deltaTime, opacity, i;
      if (viewer.controlsShouldFade) {
        currentTime = $.now();
        deltaTime = currentTime - viewer.controlsFadeBeginTime;
        opacity = 1 - deltaTime / viewer.controlsFadeLength;
        opacity = Math.min(1, opacity);
        opacity = Math.max(0, opacity);
        for (i = viewer.controls.length - 1;i >= 0; i--) {
          if (viewer.controls[i].autoFade) {
            viewer.controls[i].setOpacity(opacity);
          }
        }
        if (opacity > 0) {
          scheduleControlsFade(viewer);
        }
      }
    }
    function abortControlsAutoHide(viewer) {
      var i;
      viewer.controlsShouldFade = false;
      for (i = viewer.controls.length - 1;i >= 0; i--) {
        viewer.controls[i].setOpacity(1);
      }
    }
    function onFocus() {
      abortControlsAutoHide(this);
    }
    function onBlur() {
      beginControlsAutoHide(this);
    }
    function onCanvasContextMenu(event) {
      var eventArgs = {
        tracker: event.eventSource,
        position: event.position,
        originalEvent: event.originalEvent,
        preventDefault: event.preventDefault
      };
      this.raiseEvent("canvas-contextmenu", eventArgs);
      event.preventDefault = eventArgs.preventDefault;
    }
    function onCanvasKeyDown(event) {
      var canvasKeyDownEventArgs = {
        originalEvent: event.originalEvent,
        preventDefaultAction: false,
        preventVerticalPan: event.preventVerticalPan || !this.panVertical,
        preventHorizontalPan: event.preventHorizontalPan || !this.panHorizontal
      };
      this.raiseEvent("canvas-key", canvasKeyDownEventArgs);
      if (!canvasKeyDownEventArgs.preventDefaultAction && !event.ctrl && !event.alt && !event.meta) {
        switch (event.keyCode) {
          case 38:
            if (!canvasKeyDownEventArgs.preventVerticalPan) {
              if (event.shift) {
                this.viewport.zoomBy(1.1);
              } else {
                this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(0, -this.pixelsPerArrowPress)));
              }
              this.viewport.applyConstraints();
            }
            event.preventDefault = true;
            break;
          case 40:
            if (!canvasKeyDownEventArgs.preventVerticalPan) {
              if (event.shift) {
                this.viewport.zoomBy(0.9);
              } else {
                this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(0, this.pixelsPerArrowPress)));
              }
              this.viewport.applyConstraints();
            }
            event.preventDefault = true;
            break;
          case 37:
            if (!canvasKeyDownEventArgs.preventHorizontalPan) {
              this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(-this.pixelsPerArrowPress, 0)));
              this.viewport.applyConstraints();
            }
            event.preventDefault = true;
            break;
          case 39:
            if (!canvasKeyDownEventArgs.preventHorizontalPan) {
              this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(this.pixelsPerArrowPress, 0)));
              this.viewport.applyConstraints();
            }
            event.preventDefault = true;
            break;
          case 187:
            this.viewport.zoomBy(1.1);
            this.viewport.applyConstraints();
            event.preventDefault = true;
            break;
          case 189:
            this.viewport.zoomBy(0.9);
            this.viewport.applyConstraints();
            event.preventDefault = true;
            break;
          case 48:
            this.viewport.goHome();
            this.viewport.applyConstraints();
            event.preventDefault = true;
            break;
          case 87:
            if (!canvasKeyDownEventArgs.preventVerticalPan) {
              if (event.shift) {
                this.viewport.zoomBy(1.1);
              } else {
                this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(0, -40)));
              }
              this.viewport.applyConstraints();
            }
            event.preventDefault = true;
            break;
          case 83:
            if (!canvasKeyDownEventArgs.preventVerticalPan) {
              if (event.shift) {
                this.viewport.zoomBy(0.9);
              } else {
                this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(0, 40)));
              }
              this.viewport.applyConstraints();
            }
            event.preventDefault = true;
            break;
          case 65:
            if (!canvasKeyDownEventArgs.preventHorizontalPan) {
              this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(-40, 0)));
              this.viewport.applyConstraints();
            }
            event.preventDefault = true;
            break;
          case 68:
            if (!canvasKeyDownEventArgs.preventHorizontalPan) {
              this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(40, 0)));
              this.viewport.applyConstraints();
            }
            event.preventDefault = true;
            break;
          case 82:
            if (event.shift) {
              if (this.viewport.flipped) {
                this.viewport.setRotation(this.viewport.getRotation() + this.rotationIncrement);
              } else {
                this.viewport.setRotation(this.viewport.getRotation() - this.rotationIncrement);
              }
            } else {
              if (this.viewport.flipped) {
                this.viewport.setRotation(this.viewport.getRotation() - this.rotationIncrement);
              } else {
                this.viewport.setRotation(this.viewport.getRotation() + this.rotationIncrement);
              }
            }
            this.viewport.applyConstraints();
            event.preventDefault = true;
            break;
          case 70:
            this.viewport.toggleFlip();
            event.preventDefault = true;
            break;
          case 74:
            this.goToPreviousPage();
            break;
          case 75:
            this.goToNextPage();
            break;
          default:
            event.preventDefault = false;
            break;
        }
      } else {
        event.preventDefault = false;
      }
    }
    function onCanvasKeyPress(event) {
      var canvasKeyPressEventArgs = {
        originalEvent: event.originalEvent
      };
      this.raiseEvent("canvas-key-press", canvasKeyPressEventArgs);
    }
    function onCanvasClick(event) {
      var gestureSettings;
      var haveKeyboardFocus = document.activeElement === this.canvas;
      if (!haveKeyboardFocus) {
        this.canvas.focus();
      }
      if (this.viewport.flipped) {
        event.position.x = this.viewport.getContainerSize().x - event.position.x;
      }
      var canvasClickEventArgs = {
        tracker: event.eventSource,
        position: event.position,
        quick: event.quick,
        shift: event.shift,
        originalEvent: event.originalEvent,
        originalTarget: event.originalTarget,
        preventDefaultAction: false
      };
      this.raiseEvent("canvas-click", canvasClickEventArgs);
      if (!canvasClickEventArgs.preventDefaultAction && this.viewport && event.quick) {
        gestureSettings = this.gestureSettingsByDeviceType(event.pointerType);
        if (gestureSettings.clickToZoom === true) {
          this.viewport.zoomBy(event.shift ? 1 / this.zoomPerClick : this.zoomPerClick, gestureSettings.zoomToRefPoint ? this.viewport.pointFromPixel(event.position, true) : null);
          this.viewport.applyConstraints();
        }
        if (gestureSettings.dblClickDragToZoom) {
          if (THIS[this.hash].draggingToZoom === true) {
            THIS[this.hash].lastClickTime = null;
            THIS[this.hash].draggingToZoom = false;
          } else {
            THIS[this.hash].lastClickTime = $.now();
          }
        }
      }
    }
    function onCanvasDblClick(event) {
      var gestureSettings;
      var canvasDblClickEventArgs = {
        tracker: event.eventSource,
        position: event.position,
        shift: event.shift,
        originalEvent: event.originalEvent,
        preventDefaultAction: false
      };
      this.raiseEvent("canvas-double-click", canvasDblClickEventArgs);
      if (!canvasDblClickEventArgs.preventDefaultAction && this.viewport) {
        gestureSettings = this.gestureSettingsByDeviceType(event.pointerType);
        if (gestureSettings.dblClickToZoom) {
          this.viewport.zoomBy(event.shift ? 1 / this.zoomPerClick : this.zoomPerClick, gestureSettings.zoomToRefPoint ? this.viewport.pointFromPixel(event.position, true) : null);
          this.viewport.applyConstraints();
        }
      }
    }
    function onCanvasDrag(event) {
      var gestureSettings;
      var canvasDragEventArgs = {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        delta: event.delta,
        speed: event.speed,
        direction: event.direction,
        shift: event.shift,
        originalEvent: event.originalEvent,
        preventDefaultAction: false
      };
      this.raiseEvent("canvas-drag", canvasDragEventArgs);
      gestureSettings = this.gestureSettingsByDeviceType(event.pointerType);
      if (!canvasDragEventArgs.preventDefaultAction && this.viewport) {
        if (gestureSettings.dblClickDragToZoom && THIS[this.hash].draggingToZoom) {
          var factor = Math.pow(this.zoomPerDblClickDrag, event.delta.y / 50);
          this.viewport.zoomBy(factor);
        } else if (gestureSettings.dragToPan && !THIS[this.hash].draggingToZoom) {
          if (!this.panHorizontal) {
            event.delta.x = 0;
          }
          if (!this.panVertical) {
            event.delta.y = 0;
          }
          if (this.viewport.flipped) {
            event.delta.x = -event.delta.x;
          }
          if (this.constrainDuringPan) {
            var delta = this.viewport.deltaPointsFromPixels(event.delta.negate());
            this.viewport.centerSpringX.target.value += delta.x;
            this.viewport.centerSpringY.target.value += delta.y;
            var constrainedBounds = this.viewport.getConstrainedBounds();
            this.viewport.centerSpringX.target.value -= delta.x;
            this.viewport.centerSpringY.target.value -= delta.y;
            if (constrainedBounds.xConstrained) {
              event.delta.x = 0;
            }
            if (constrainedBounds.yConstrained) {
              event.delta.y = 0;
            }
          }
          this.viewport.panBy(this.viewport.deltaPointsFromPixels(event.delta.negate()), gestureSettings.flickEnabled && !this.constrainDuringPan);
        }
      }
    }
    function onCanvasDragEnd(event) {
      var gestureSettings;
      var canvasDragEndEventArgs = {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        speed: event.speed,
        direction: event.direction,
        shift: event.shift,
        originalEvent: event.originalEvent,
        preventDefaultAction: false
      };
      this.raiseEvent("canvas-drag-end", canvasDragEndEventArgs);
      gestureSettings = this.gestureSettingsByDeviceType(event.pointerType);
      if (!canvasDragEndEventArgs.preventDefaultAction && this.viewport) {
        if (!THIS[this.hash].draggingToZoom && gestureSettings.dragToPan && gestureSettings.flickEnabled && event.speed >= gestureSettings.flickMinSpeed) {
          var amplitudeX = 0;
          if (this.panHorizontal) {
            amplitudeX = gestureSettings.flickMomentum * event.speed * Math.cos(event.direction);
          }
          var amplitudeY = 0;
          if (this.panVertical) {
            amplitudeY = gestureSettings.flickMomentum * event.speed * Math.sin(event.direction);
          }
          var center = this.viewport.pixelFromPoint(this.viewport.getCenter(true));
          var target = this.viewport.pointFromPixel(new $.Point(center.x - amplitudeX, center.y - amplitudeY));
          this.viewport.panTo(target, false);
        }
        this.viewport.applyConstraints();
      }
      if (gestureSettings.dblClickDragToZoom && THIS[this.hash].draggingToZoom === true) {
        THIS[this.hash].draggingToZoom = false;
      }
    }
    function onCanvasEnter(event) {
      this.raiseEvent("canvas-enter", {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        buttons: event.buttons,
        pointers: event.pointers,
        insideElementPressed: event.insideElementPressed,
        buttonDownAny: event.buttonDownAny,
        originalEvent: event.originalEvent
      });
    }
    function onCanvasLeave(event) {
      this.raiseEvent("canvas-exit", {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        buttons: event.buttons,
        pointers: event.pointers,
        insideElementPressed: event.insideElementPressed,
        buttonDownAny: event.buttonDownAny,
        originalEvent: event.originalEvent
      });
    }
    function onCanvasPress(event) {
      var gestureSettings;
      this.raiseEvent("canvas-press", {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        insideElementPressed: event.insideElementPressed,
        insideElementReleased: event.insideElementReleased,
        originalEvent: event.originalEvent
      });
      gestureSettings = this.gestureSettingsByDeviceType(event.pointerType);
      if (gestureSettings.dblClickDragToZoom) {
        var lastClickTime = THIS[this.hash].lastClickTime;
        var currClickTime = $.now();
        if (lastClickTime === null) {
          return;
        }
        if (currClickTime - lastClickTime < this.dblClickTimeThreshold) {
          THIS[this.hash].draggingToZoom = true;
        }
        THIS[this.hash].lastClickTime = null;
      }
    }
    function onCanvasRelease(event) {
      this.raiseEvent("canvas-release", {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        insideElementPressed: event.insideElementPressed,
        insideElementReleased: event.insideElementReleased,
        originalEvent: event.originalEvent
      });
    }
    function onCanvasNonPrimaryPress(event) {
      this.raiseEvent("canvas-nonprimary-press", {
        tracker: event.eventSource,
        position: event.position,
        pointerType: event.pointerType,
        button: event.button,
        buttons: event.buttons,
        originalEvent: event.originalEvent
      });
    }
    function onCanvasNonPrimaryRelease(event) {
      this.raiseEvent("canvas-nonprimary-release", {
        tracker: event.eventSource,
        position: event.position,
        pointerType: event.pointerType,
        button: event.button,
        buttons: event.buttons,
        originalEvent: event.originalEvent
      });
    }
    function onCanvasPinch(event) {
      var gestureSettings, centerPt, lastCenterPt, panByPt;
      var canvasPinchEventArgs = {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        gesturePoints: event.gesturePoints,
        lastCenter: event.lastCenter,
        center: event.center,
        lastDistance: event.lastDistance,
        distance: event.distance,
        shift: event.shift,
        originalEvent: event.originalEvent,
        preventDefaultPanAction: false,
        preventDefaultZoomAction: false,
        preventDefaultRotateAction: false
      };
      this.raiseEvent("canvas-pinch", canvasPinchEventArgs);
      if (this.viewport) {
        gestureSettings = this.gestureSettingsByDeviceType(event.pointerType);
        if (gestureSettings.pinchToZoom && (!canvasPinchEventArgs.preventDefaultPanAction || !canvasPinchEventArgs.preventDefaultZoomAction)) {
          centerPt = this.viewport.pointFromPixel(event.center, true);
          if (gestureSettings.zoomToRefPoint && !canvasPinchEventArgs.preventDefaultPanAction) {
            lastCenterPt = this.viewport.pointFromPixel(event.lastCenter, true);
            panByPt = lastCenterPt.minus(centerPt);
            if (!this.panHorizontal) {
              panByPt.x = 0;
            }
            if (!this.panVertical) {
              panByPt.y = 0;
            }
            this.viewport.panBy(panByPt, true);
          }
          if (!canvasPinchEventArgs.preventDefaultZoomAction) {
            this.viewport.zoomBy(event.distance / event.lastDistance, centerPt, true);
          }
          this.viewport.applyConstraints();
        }
        if (gestureSettings.pinchRotate && !canvasPinchEventArgs.preventDefaultRotateAction) {
          var angle1 = Math.atan2(event.gesturePoints[0].currentPos.y - event.gesturePoints[1].currentPos.y, event.gesturePoints[0].currentPos.x - event.gesturePoints[1].currentPos.x);
          var angle2 = Math.atan2(event.gesturePoints[0].lastPos.y - event.gesturePoints[1].lastPos.y, event.gesturePoints[0].lastPos.x - event.gesturePoints[1].lastPos.x);
          centerPt = this.viewport.pointFromPixel(event.center, true);
          this.viewport.rotateTo(this.viewport.getRotation(true) + (angle1 - angle2) * (180 / Math.PI), centerPt, true);
        }
      }
    }
    function onCanvasFocus(event) {
      this.raiseEvent("canvas-focus", {
        tracker: event.eventSource,
        originalEvent: event.originalEvent
      });
    }
    function onCanvasBlur(event) {
      this.raiseEvent("canvas-blur", {
        tracker: event.eventSource,
        originalEvent: event.originalEvent
      });
    }
    function onCanvasScroll(event) {
      var canvasScrollEventArgs, gestureSettings, factor, thisScrollTime, deltaScrollTime;
      thisScrollTime = $.now();
      deltaScrollTime = thisScrollTime - this._lastScrollTime;
      if (deltaScrollTime > this.minScrollDeltaTime) {
        this._lastScrollTime = thisScrollTime;
        canvasScrollEventArgs = {
          tracker: event.eventSource,
          position: event.position,
          scroll: event.scroll,
          shift: event.shift,
          originalEvent: event.originalEvent,
          preventDefaultAction: false,
          preventDefault: true
        };
        this.raiseEvent("canvas-scroll", canvasScrollEventArgs);
        if (!canvasScrollEventArgs.preventDefaultAction && this.viewport) {
          if (this.viewport.flipped) {
            event.position.x = this.viewport.getContainerSize().x - event.position.x;
          }
          gestureSettings = this.gestureSettingsByDeviceType(event.pointerType);
          if (gestureSettings.scrollToZoom) {
            factor = Math.pow(this.zoomPerScroll, event.scroll);
            this.viewport.zoomBy(factor, gestureSettings.zoomToRefPoint ? this.viewport.pointFromPixel(event.position, true) : null);
            this.viewport.applyConstraints();
          }
        }
        event.preventDefault = canvasScrollEventArgs.preventDefault;
      } else {
        event.preventDefault = true;
      }
    }
    function onContainerEnter(event) {
      THIS[this.hash].mouseInside = true;
      abortControlsAutoHide(this);
      this.raiseEvent("container-enter", {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        buttons: event.buttons,
        pointers: event.pointers,
        insideElementPressed: event.insideElementPressed,
        buttonDownAny: event.buttonDownAny,
        originalEvent: event.originalEvent
      });
    }
    function onContainerLeave(event) {
      if (event.pointers < 1) {
        THIS[this.hash].mouseInside = false;
        if (!THIS[this.hash].animating) {
          beginControlsAutoHide(this);
        }
      }
      this.raiseEvent("container-exit", {
        tracker: event.eventSource,
        pointerType: event.pointerType,
        position: event.position,
        buttons: event.buttons,
        pointers: event.pointers,
        insideElementPressed: event.insideElementPressed,
        buttonDownAny: event.buttonDownAny,
        originalEvent: event.originalEvent
      });
    }
    function updateMulti(viewer) {
      updateOnce(viewer);
      if (viewer.isOpen()) {
        viewer._updateRequestId = scheduleUpdate(viewer, updateMulti);
      } else {
        viewer._updateRequestId = false;
      }
    }
    function doViewerResize(viewer, containerSize) {
      var viewport = viewer.viewport;
      var zoom = viewport.getZoom();
      var center = viewport.getCenter();
      viewport.resize(containerSize, viewer.preserveImageSizeOnResize);
      viewport.panTo(center, true);
      var resizeRatio;
      if (viewer.preserveImageSizeOnResize) {
        resizeRatio = THIS[viewer.hash].prevContainerSize.x / containerSize.x;
      } else {
        var origin = new $.Point(0, 0);
        var prevDiag = new $.Point(THIS[viewer.hash].prevContainerSize.x, THIS[viewer.hash].prevContainerSize.y).distanceTo(origin);
        var newDiag = new $.Point(containerSize.x, containerSize.y).distanceTo(origin);
        resizeRatio = newDiag / prevDiag * THIS[viewer.hash].prevContainerSize.x / containerSize.x;
      }
      viewport.zoomTo(zoom * resizeRatio, null, true);
      THIS[viewer.hash].prevContainerSize = containerSize;
      THIS[viewer.hash].forceRedraw = true;
      THIS[viewer.hash].needsResize = false;
      THIS[viewer.hash].forceResize = false;
    }
    function updateOnce(viewer) {
      if (viewer._opening || !THIS[viewer.hash]) {
        return;
      }
      if (viewer.autoResize || THIS[viewer.hash].forceResize) {
        var containerSize;
        if (viewer._autoResizePolling) {
          containerSize = _getSafeElemSize(viewer.container);
          var prevContainerSize = THIS[viewer.hash].prevContainerSize;
          if (!containerSize.equals(prevContainerSize)) {
            THIS[viewer.hash].needsResize = true;
          }
        }
        if (THIS[viewer.hash].needsResize) {
          doViewerResize(viewer, containerSize || _getSafeElemSize(viewer.container));
        }
      }
      var viewportChange = viewer.viewport.update();
      var animated = viewer.world.update(viewportChange) || viewportChange;
      if (viewportChange) {
        viewer.raiseEvent("viewport-change");
      }
      if (viewer.referenceStrip) {
        animated = viewer.referenceStrip.update(viewer.viewport) || animated;
      }
      var currentAnimating = THIS[viewer.hash].animating;
      if (!currentAnimating && animated) {
        viewer.raiseEvent("animation-start");
        abortControlsAutoHide(viewer);
      }
      var isAnimationFinished = currentAnimating && !animated;
      if (isAnimationFinished) {
        THIS[viewer.hash].animating = false;
      }
      if (animated || isAnimationFinished || THIS[viewer.hash].forceRedraw || viewer.world.needsDraw()) {
        drawWorld(viewer);
        viewer._drawOverlays();
        if (viewer.navigator) {
          viewer.navigator.update(viewer.viewport);
        }
        THIS[viewer.hash].forceRedraw = false;
        if (animated) {
          viewer.raiseEvent("animation");
        }
      }
      if (isAnimationFinished) {
        viewer.raiseEvent("animation-finish");
        if (!THIS[viewer.hash].mouseInside) {
          beginControlsAutoHide(viewer);
        }
      }
      THIS[viewer.hash].animating = animated;
    }
    function drawWorld(viewer) {
      viewer.imageLoader.clear();
      viewer.world.draw();
      viewer.raiseEvent("update-viewport", {});
    }
    function resolveUrl(prefix, url) {
      return prefix ? prefix + url : url;
    }
    function beginZoomingIn() {
      THIS[this.hash].lastZoomTime = $.now();
      THIS[this.hash].zoomFactor = this.zoomPerSecond;
      THIS[this.hash].zooming = true;
      scheduleZoom(this);
    }
    function beginZoomingOut() {
      THIS[this.hash].lastZoomTime = $.now();
      THIS[this.hash].zoomFactor = 1 / this.zoomPerSecond;
      THIS[this.hash].zooming = true;
      scheduleZoom(this);
    }
    function endZooming() {
      THIS[this.hash].zooming = false;
    }
    function scheduleZoom(viewer) {
      $.requestAnimationFrame($.delegate(viewer, doZoom));
    }
    function doZoom() {
      var currentTime, deltaTime, adjustedFactor;
      if (THIS[this.hash].zooming && this.viewport) {
        currentTime = $.now();
        deltaTime = currentTime - THIS[this.hash].lastZoomTime;
        adjustedFactor = Math.pow(THIS[this.hash].zoomFactor, deltaTime / 1000);
        this.viewport.zoomBy(adjustedFactor);
        this.viewport.applyConstraints();
        THIS[this.hash].lastZoomTime = currentTime;
        scheduleZoom(this);
      }
    }
    function doSingleZoomIn() {
      if (this.viewport) {
        THIS[this.hash].zooming = false;
        this.viewport.zoomBy(this.zoomPerClick / 1);
        this.viewport.applyConstraints();
      }
    }
    function doSingleZoomOut() {
      if (this.viewport) {
        THIS[this.hash].zooming = false;
        this.viewport.zoomBy(1 / this.zoomPerClick);
        this.viewport.applyConstraints();
      }
    }
    function lightUp() {
      if (this.buttonGroup) {
        this.buttonGroup.emulateEnter();
        this.buttonGroup.emulateLeave();
      }
    }
    function onHome() {
      if (this.viewport) {
        this.viewport.goHome();
      }
    }
    function onFullScreen() {
      if (this.isFullPage() && !$.isFullScreen()) {
        this.setFullPage(false);
      } else {
        this.setFullScreen(!this.isFullPage());
      }
      if (this.buttonGroup) {
        this.buttonGroup.emulateLeave();
      }
      this.fullPageButton.element.focus();
      if (this.viewport) {
        this.viewport.applyConstraints();
      }
    }
    function onRotateLeft() {
      if (this.viewport) {
        var currRotation = this.viewport.getRotation();
        if (this.viewport.flipped) {
          currRotation += this.rotationIncrement;
        } else {
          currRotation -= this.rotationIncrement;
        }
        this.viewport.setRotation(currRotation);
      }
    }
    function onRotateRight() {
      if (this.viewport) {
        var currRotation = this.viewport.getRotation();
        if (this.viewport.flipped) {
          currRotation -= this.rotationIncrement;
        } else {
          currRotation += this.rotationIncrement;
        }
        this.viewport.setRotation(currRotation);
      }
    }
    function onFlip() {
      this.viewport.toggleFlip();
    }
    $.determineDrawer = function(id) {
      for (let property in OpenSeadragon) {
        const drawer = OpenSeadragon[property], proto = drawer.prototype;
        if (proto && proto instanceof OpenSeadragon.DrawerBase && $.isFunction(proto.getType) && proto.getType.call(drawer) === id) {
          return drawer;
        }
      }
      return null;
    };
  })(OpenSeadragon);
  (function($) {
    $.Navigator = function(options) {
      var viewer = options.viewer, _this = this, viewerSize, navigatorSize;
      if (options.element || options.id) {
        if (options.element) {
          if (options.id) {
            $.console.warn("Given option.id for Navigator was ignored since option.element was provided and is being used instead.");
          }
          if (options.element.id) {
            options.id = options.element.id;
          } else {
            options.id = "navigator-" + $.now();
          }
          this.element = options.element;
        } else {
          this.element = document.getElementById(options.id);
        }
        options.controlOptions = {
          anchor: $.ControlAnchor.NONE,
          attachToViewer: false,
          autoFade: false
        };
      } else {
        options.id = "navigator-" + $.now();
        this.element = $.makeNeutralElement("div");
        options.controlOptions = {
          anchor: $.ControlAnchor.TOP_RIGHT,
          attachToViewer: true,
          autoFade: options.autoFade
        };
        if (options.position) {
          if (options.position === "BOTTOM_RIGHT") {
            options.controlOptions.anchor = $.ControlAnchor.BOTTOM_RIGHT;
          } else if (options.position === "BOTTOM_LEFT") {
            options.controlOptions.anchor = $.ControlAnchor.BOTTOM_LEFT;
          } else if (options.position === "TOP_RIGHT") {
            options.controlOptions.anchor = $.ControlAnchor.TOP_RIGHT;
          } else if (options.position === "TOP_LEFT") {
            options.controlOptions.anchor = $.ControlAnchor.TOP_LEFT;
          } else if (options.position === "ABSOLUTE") {
            options.controlOptions.anchor = $.ControlAnchor.ABSOLUTE;
            options.controlOptions.top = options.top;
            options.controlOptions.left = options.left;
            options.controlOptions.height = options.height;
            options.controlOptions.width = options.width;
          }
        }
      }
      this.element.id = options.id;
      this.element.className += " navigator";
      options = $.extend(true, {
        sizeRatio: $.DEFAULT_SETTINGS.navigatorSizeRatio
      }, options, {
        element: this.element,
        tabIndex: -1,
        showNavigator: false,
        mouseNavEnabled: false,
        showNavigationControl: false,
        showSequenceControl: false,
        immediateRender: true,
        blendTime: 0,
        animationTime: options.animationTime,
        autoResize: false,
        minZoomImageRatio: 1,
        background: options.background,
        opacity: options.opacity,
        borderColor: options.borderColor,
        displayRegionColor: options.displayRegionColor
      });
      options.minPixelRatio = this.minPixelRatio = viewer.minPixelRatio;
      $.setElementTouchActionNone(this.element);
      this.borderWidth = 2;
      this.fudge = new $.Point(1, 1);
      this.totalBorderWidths = new $.Point(this.borderWidth * 2, this.borderWidth * 2).minus(this.fudge);
      if (options.controlOptions.anchor !== $.ControlAnchor.NONE) {
        (function(style, borderWidth) {
          style.margin = "0px";
          style.border = borderWidth + "px solid " + options.borderColor;
          style.padding = "0px";
          style.background = options.background;
          style.opacity = options.opacity;
          style.overflow = "hidden";
        })(this.element.style, this.borderWidth);
      }
      this.displayRegion = $.makeNeutralElement("div");
      this.displayRegion.id = this.element.id + "-displayregion";
      this.displayRegion.className = "displayregion";
      (function(style, borderWidth) {
        style.position = "relative";
        style.top = "0px";
        style.left = "0px";
        style.fontSize = "0px";
        style.overflow = "hidden";
        style.border = borderWidth + "px solid " + options.displayRegionColor;
        style.margin = "0px";
        style.padding = "0px";
        style.background = "transparent";
        style["float"] = "left";
        style.cssFloat = "left";
        style.zIndex = 999999999;
        style.cursor = "default";
        style.boxSizing = "content-box";
      })(this.displayRegion.style, this.borderWidth);
      $.setElementPointerEventsNone(this.displayRegion);
      $.setElementTouchActionNone(this.displayRegion);
      this.displayRegionContainer = $.makeNeutralElement("div");
      this.displayRegionContainer.id = this.element.id + "-displayregioncontainer";
      this.displayRegionContainer.className = "displayregioncontainer";
      this.displayRegionContainer.style.width = "100%";
      this.displayRegionContainer.style.height = "100%";
      $.setElementPointerEventsNone(this.displayRegionContainer);
      $.setElementTouchActionNone(this.displayRegionContainer);
      viewer.addControl(this.element, options.controlOptions);
      this._resizeWithViewer = options.controlOptions.anchor !== $.ControlAnchor.ABSOLUTE && options.controlOptions.anchor !== $.ControlAnchor.NONE;
      if (options.width && options.height) {
        this.setWidth(options.width);
        this.setHeight(options.height);
      } else if (this._resizeWithViewer) {
        viewerSize = $.getElementSize(viewer.element);
        this.element.style.height = Math.round(viewerSize.y * options.sizeRatio) + "px";
        this.element.style.width = Math.round(viewerSize.x * options.sizeRatio) + "px";
        this.oldViewerSize = viewerSize;
        navigatorSize = $.getElementSize(this.element);
        this.elementArea = navigatorSize.x * navigatorSize.y;
      }
      this.oldContainerSize = new $.Point(0, 0);
      $.Viewer.apply(this, [options]);
      this.displayRegionContainer.appendChild(this.displayRegion);
      this.element.getElementsByTagName("div")[0].appendChild(this.displayRegionContainer);
      function rotate(degrees2, immediately) {
        _setTransformRotate(_this.displayRegionContainer, degrees2);
        _setTransformRotate(_this.displayRegion, -degrees2);
        _this.viewport.setRotation(degrees2, immediately);
      }
      if (options.navigatorRotate) {
        var degrees = options.viewer.viewport ? options.viewer.viewport.getRotation() : options.viewer.degrees || 0;
        rotate(degrees, true);
        options.viewer.addHandler("rotate", function(args) {
          rotate(args.degrees, args.immediately);
        });
      }
      this.innerTracker.destroy();
      this.innerTracker = new $.MouseTracker({
        userData: "Navigator.innerTracker",
        element: this.element,
        dragHandler: $.delegate(this, onCanvasDrag),
        clickHandler: $.delegate(this, onCanvasClick),
        releaseHandler: $.delegate(this, onCanvasRelease),
        scrollHandler: $.delegate(this, onCanvasScroll),
        preProcessEventHandler: function(eventInfo) {
          if (eventInfo.eventType === "wheel") {
            eventInfo.preventDefault = true;
          }
        }
      });
      this.outerTracker.userData = "Navigator.outerTracker";
      $.setElementPointerEventsNone(this.canvas);
      $.setElementPointerEventsNone(this.container);
      this.addHandler("reset-size", function() {
        if (_this.viewport) {
          _this.viewport.goHome(true);
        }
      });
      viewer.world.addHandler("item-index-change", function(event) {
        window.setTimeout(function() {
          var item = _this.world.getItemAt(event.previousIndex);
          _this.world.setItemIndex(item, event.newIndex);
        }, 1);
      });
      viewer.world.addHandler("remove-item", function(event) {
        var theirItem = event.item;
        var myItem = _this._getMatchingItem(theirItem);
        if (myItem) {
          _this.world.removeItem(myItem);
        }
      });
      this.update(viewer.viewport);
    };
    $.extend($.Navigator.prototype, $.EventSource.prototype, $.Viewer.prototype, {
      updateSize: function() {
        if (this.viewport) {
          var containerSize = new $.Point(this.container.clientWidth === 0 ? 1 : this.container.clientWidth, this.container.clientHeight === 0 ? 1 : this.container.clientHeight);
          if (!containerSize.equals(this.oldContainerSize)) {
            this.viewport.resize(containerSize, true);
            this.viewport.goHome(true);
            this.oldContainerSize = containerSize;
            this.world.update();
            this.world.draw();
            this.update(this.viewer.viewport);
          }
        }
      },
      setWidth: function(width) {
        this.width = width;
        this.element.style.width = typeof width === "number" ? width + "px" : width;
        this._resizeWithViewer = false;
        this.updateSize();
      },
      setHeight: function(height) {
        this.height = height;
        this.element.style.height = typeof height === "number" ? height + "px" : height;
        this._resizeWithViewer = false;
        this.updateSize();
      },
      setFlip: function(state) {
        this.viewport.setFlip(state);
        this.setDisplayTransform(this.viewer.viewport.getFlip() ? "scale(-1,1)" : "scale(1,1)");
        return this;
      },
      setDisplayTransform: function(rule) {
        setElementTransform(this.canvas, rule);
        setElementTransform(this.element, rule);
      },
      update: function(viewport) {
        var viewerSize, newWidth, newHeight, bounds, topleft, bottomright;
        if (!viewport) {
          viewport = this.viewer.viewport;
        }
        viewerSize = $.getElementSize(this.viewer.element);
        if (this._resizeWithViewer && viewerSize.x && viewerSize.y && !viewerSize.equals(this.oldViewerSize)) {
          this.oldViewerSize = viewerSize;
          if (this.maintainSizeRatio || !this.elementArea) {
            newWidth = viewerSize.x * this.sizeRatio;
            newHeight = viewerSize.y * this.sizeRatio;
          } else {
            newWidth = Math.sqrt(this.elementArea * (viewerSize.x / viewerSize.y));
            newHeight = this.elementArea / newWidth;
          }
          this.element.style.width = Math.round(newWidth) + "px";
          this.element.style.height = Math.round(newHeight) + "px";
          if (!this.elementArea) {
            this.elementArea = newWidth * newHeight;
          }
          this.updateSize();
        }
        if (viewport && this.viewport) {
          bounds = viewport.getBoundsNoRotate(true);
          topleft = this.viewport.pixelFromPointNoRotate(bounds.getTopLeft(), false);
          bottomright = this.viewport.pixelFromPointNoRotate(bounds.getBottomRight(), false).minus(this.totalBorderWidths);
          if (!this.navigatorRotate) {
            var degrees = viewport.getRotation(true);
            _setTransformRotate(this.displayRegion, -degrees);
          }
          var style = this.displayRegion.style;
          style.display = this.world.getItemCount() ? "block" : "none";
          style.top = topleft.y.toFixed(2) + "px";
          style.left = topleft.x.toFixed(2) + "px";
          var width = bottomright.x - topleft.x;
          var height = bottomright.y - topleft.y;
          style.width = Math.round(Math.max(width, 0)) + "px";
          style.height = Math.round(Math.max(height, 0)) + "px";
        }
      },
      addTiledImage: function(options) {
        var _this = this;
        var original = options.originalTiledImage;
        delete options.original;
        var optionsClone = $.extend({}, options, {
          success: function(event) {
            var myItem = event.item;
            myItem._originalForNavigator = original;
            _this._matchBounds(myItem, original, true);
            _this._matchOpacity(myItem, original);
            _this._matchCompositeOperation(myItem, original);
            function matchBounds() {
              _this._matchBounds(myItem, original);
            }
            function matchOpacity() {
              _this._matchOpacity(myItem, original);
            }
            function matchCompositeOperation() {
              _this._matchCompositeOperation(myItem, original);
            }
            original.addHandler("bounds-change", matchBounds);
            original.addHandler("clip-change", matchBounds);
            original.addHandler("opacity-change", matchOpacity);
            original.addHandler("composite-operation-change", matchCompositeOperation);
          }
        });
        return $.Viewer.prototype.addTiledImage.apply(this, [optionsClone]);
      },
      destroy: function() {
        return $.Viewer.prototype.destroy.apply(this);
      },
      _getMatchingItem: function(theirItem) {
        var count = this.world.getItemCount();
        var item;
        for (var i = 0;i < count; i++) {
          item = this.world.getItemAt(i);
          if (item._originalForNavigator === theirItem) {
            return item;
          }
        }
        return null;
      },
      _matchBounds: function(myItem, theirItem, immediately) {
        var bounds = theirItem.getBoundsNoRotate();
        myItem.setPosition(bounds.getTopLeft(), immediately);
        myItem.setWidth(bounds.width, immediately);
        myItem.setRotation(theirItem.getRotation(), immediately);
        myItem.setClip(theirItem.getClip());
        myItem.setFlip(theirItem.getFlip());
      },
      _matchOpacity: function(myItem, theirItem) {
        myItem.setOpacity(theirItem.opacity);
      },
      _matchCompositeOperation: function(myItem, theirItem) {
        myItem.setCompositeOperation(theirItem.compositeOperation);
      }
    });
    function onCanvasClick(event) {
      var canvasClickEventArgs = {
        tracker: event.eventSource,
        position: event.position,
        quick: event.quick,
        shift: event.shift,
        originalEvent: event.originalEvent,
        preventDefaultAction: false
      };
      this.viewer.raiseEvent("navigator-click", canvasClickEventArgs);
      if (!canvasClickEventArgs.preventDefaultAction && event.quick && this.viewer.viewport && (this.panVertical || this.panHorizontal)) {
        if (this.viewer.viewport.flipped) {
          event.position.x = this.viewport.getContainerSize().x - event.position.x;
        }
        var target = this.viewport.pointFromPixel(event.position);
        if (!this.panVertical) {
          target.y = this.viewer.viewport.getCenter(true).y;
        } else if (!this.panHorizontal) {
          target.x = this.viewer.viewport.getCenter(true).x;
        }
        this.viewer.viewport.panTo(target);
        this.viewer.viewport.applyConstraints();
      }
    }
    function onCanvasDrag(event) {
      var canvasDragEventArgs = {
        tracker: event.eventSource,
        position: event.position,
        delta: event.delta,
        speed: event.speed,
        direction: event.direction,
        shift: event.shift,
        originalEvent: event.originalEvent,
        preventDefaultAction: false
      };
      this.viewer.raiseEvent("navigator-drag", canvasDragEventArgs);
      if (!canvasDragEventArgs.preventDefaultAction && this.viewer.viewport) {
        if (!this.panHorizontal) {
          event.delta.x = 0;
        }
        if (!this.panVertical) {
          event.delta.y = 0;
        }
        if (this.viewer.viewport.flipped) {
          event.delta.x = -event.delta.x;
        }
        this.viewer.viewport.panBy(this.viewport.deltaPointsFromPixels(event.delta));
        if (this.viewer.constrainDuringPan) {
          this.viewer.viewport.applyConstraints();
        }
      }
    }
    function onCanvasRelease(event) {
      if (event.insideElementPressed && this.viewer.viewport) {
        this.viewer.viewport.applyConstraints();
      }
    }
    function onCanvasScroll(event) {
      var eventArgs = {
        tracker: event.eventSource,
        position: event.position,
        scroll: event.scroll,
        shift: event.shift,
        originalEvent: event.originalEvent,
        preventDefault: event.preventDefault
      };
      this.viewer.raiseEvent("navigator-scroll", eventArgs);
      event.preventDefault = eventArgs.preventDefault;
    }
    function _setTransformRotate(element, degrees) {
      setElementTransform(element, "rotate(" + degrees + "deg)");
    }
    function setElementTransform(element, rule) {
      element.style.webkitTransform = rule;
      element.style.mozTransform = rule;
      element.style.msTransform = rule;
      element.style.oTransform = rule;
      element.style.transform = rule;
    }
  })(OpenSeadragon);
  (function($) {
    var I18N = {
      Errors: {
        Dzc: "Sorry, we don't support Deep Zoom Collections!",
        Dzi: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
        Xml: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
        ImageFormat: "Sorry, we don't support {0}-based Deep Zoom Images.",
        Security: "It looks like a security restriction stopped us from " + "loading this Deep Zoom Image.",
        Status: "This space unintentionally left blank ({0} {1}).",
        OpenFailed: "Unable to open {0}: {1}"
      },
      Tooltips: {
        FullPage: "Toggle full page",
        Home: "Go home",
        ZoomIn: "Zoom in",
        ZoomOut: "Zoom out",
        NextPage: "Next page",
        PreviousPage: "Previous page",
        RotateLeft: "Rotate left",
        RotateRight: "Rotate right",
        Flip: "Flip Horizontally"
      }
    };
    $.extend($, {
      getString: function(prop) {
        var props = prop.split("."), string = null, args = arguments, container = I18N, i;
        for (i = 0;i < props.length - 1; i++) {
          container = container[props[i]] || {};
        }
        string = container[props[i]];
        if (typeof string !== "string") {
          $.console.error("Untranslated source string:", prop);
          string = "";
        }
        return string.replace(/\{\d+\}/g, function(capture) {
          var i2 = parseInt(capture.match(/\d+/), 10) + 1;
          return i2 < args.length ? args[i2] : "";
        });
      },
      setString: function(prop, value) {
        var props = prop.split("."), container = I18N, i;
        for (i = 0;i < props.length - 1; i++) {
          if (!container[props[i]]) {
            container[props[i]] = {};
          }
          container = container[props[i]];
        }
        container[props[i]] = value;
      }
    });
  })(OpenSeadragon);
  (function($) {
    $.Point = function(x, y) {
      this.x = typeof x === "number" ? x : 0;
      this.y = typeof y === "number" ? y : 0;
    };
    $.Point.prototype = {
      clone: function() {
        return new $.Point(this.x, this.y);
      },
      plus: function(point) {
        return new $.Point(this.x + point.x, this.y + point.y);
      },
      minus: function(point) {
        return new $.Point(this.x - point.x, this.y - point.y);
      },
      times: function(factor) {
        return new $.Point(this.x * factor, this.y * factor);
      },
      divide: function(factor) {
        return new $.Point(this.x / factor, this.y / factor);
      },
      negate: function() {
        return new $.Point(-this.x, -this.y);
      },
      distanceTo: function(point) {
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
      },
      squaredDistanceTo: function(point) {
        return Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2);
      },
      apply: function(func) {
        return new $.Point(func(this.x), func(this.y));
      },
      equals: function(point) {
        return point instanceof $.Point && this.x === point.x && this.y === point.y;
      },
      rotate: function(degrees, pivot) {
        pivot = pivot || new $.Point(0, 0);
        var cos;
        var sin;
        if (degrees % 90 === 0) {
          var d = $.positiveModulo(degrees, 360);
          switch (d) {
            case 0:
              cos = 1;
              sin = 0;
              break;
            case 90:
              cos = 0;
              sin = 1;
              break;
            case 180:
              cos = -1;
              sin = 0;
              break;
            case 270:
              cos = 0;
              sin = -1;
              break;
          }
        } else {
          var angle = degrees * Math.PI / 180;
          cos = Math.cos(angle);
          sin = Math.sin(angle);
        }
        var x = cos * (this.x - pivot.x) - sin * (this.y - pivot.y) + pivot.x;
        var y = sin * (this.x - pivot.x) + cos * (this.y - pivot.y) + pivot.y;
        return new $.Point(x, y);
      },
      toString: function() {
        return "(" + Math.round(this.x * 100) / 100 + "," + Math.round(this.y * 100) / 100 + ")";
      }
    };
  })(OpenSeadragon);
  (function($) {
    $.TileSource = function(width, height, tileSize, tileOverlap, minLevel, maxLevel) {
      var _this = this;
      var args = arguments, options, i;
      if ($.isPlainObject(width)) {
        options = width;
      } else {
        options = {
          width: args[0],
          height: args[1],
          tileSize: args[2],
          tileOverlap: args[3],
          minLevel: args[4],
          maxLevel: args[5]
        };
      }
      $.EventSource.call(this);
      $.extend(true, this, options);
      if (!this.success) {
        for (i = 0;i < arguments.length; i++) {
          if ($.isFunction(arguments[i])) {
            this.success = arguments[i];
            break;
          }
        }
      }
      if (this.success) {
        this.addHandler("ready", function(event) {
          _this.success(event);
        });
      }
      if ($.type(arguments[0]) === "string") {
        this.url = arguments[0];
      }
      if (this.url) {
        this.aspectRatio = 1;
        this.dimensions = new $.Point(10, 10);
        this._tileWidth = 0;
        this._tileHeight = 0;
        this.tileOverlap = 0;
        this.minLevel = 0;
        this.maxLevel = 0;
        this.ready = false;
        this.getImageInfo(this.url);
      } else {
        this.ready = true;
        this.aspectRatio = options.width && options.height ? options.width / options.height : 1;
        this.dimensions = new $.Point(options.width, options.height);
        if (this.tileSize) {
          this._tileWidth = this._tileHeight = this.tileSize;
          delete this.tileSize;
        } else {
          if (this.tileWidth) {
            this._tileWidth = this.tileWidth;
            delete this.tileWidth;
          } else {
            this._tileWidth = 0;
          }
          if (this.tileHeight) {
            this._tileHeight = this.tileHeight;
            delete this.tileHeight;
          } else {
            this._tileHeight = 0;
          }
        }
        this.tileOverlap = options.tileOverlap ? options.tileOverlap : 0;
        this.minLevel = options.minLevel ? options.minLevel : 0;
        this.maxLevel = options.maxLevel !== undefined && options.maxLevel !== null ? options.maxLevel : options.width && options.height ? Math.ceil(Math.log(Math.max(options.width, options.height)) / Math.log(2)) : 0;
        if (this.success && $.isFunction(this.success)) {
          this.success(this);
        }
      }
    };
    $.TileSource.prototype = {
      getTileSize: function(level) {
        $.console.error("[TileSource.getTileSize] is deprecated. " + "Use TileSource.getTileWidth() and TileSource.getTileHeight() instead");
        return this._tileWidth;
      },
      getTileWidth: function(level) {
        if (!this._tileWidth) {
          return this.getTileSize(level);
        }
        return this._tileWidth;
      },
      getTileHeight: function(level) {
        if (!this._tileHeight) {
          return this.getTileSize(level);
        }
        return this._tileHeight;
      },
      setMaxLevel: function(level) {
        this.maxLevel = level;
        this._memoizeLevelScale();
      },
      getLevelScale: function(level) {
        this._memoizeLevelScale();
        return this.getLevelScale(level);
      },
      _memoizeLevelScale: function() {
        var levelScaleCache = {}, i;
        for (i = 0;i <= this.maxLevel; i++) {
          levelScaleCache[i] = 1 / Math.pow(2, this.maxLevel - i);
        }
        this.getLevelScale = function(_level) {
          return levelScaleCache[_level];
        };
      },
      getNumTiles: function(level) {
        var scale = this.getLevelScale(level), x = Math.ceil(scale * this.dimensions.x / this.getTileWidth(level)), y = Math.ceil(scale * this.dimensions.y / this.getTileHeight(level));
        return new $.Point(x, y);
      },
      getPixelRatio: function(level) {
        var imageSizeScaled = this.dimensions.times(this.getLevelScale(level)), rx = 1 / imageSizeScaled.x * $.pixelDensityRatio, ry = 1 / imageSizeScaled.y * $.pixelDensityRatio;
        return new $.Point(rx, ry);
      },
      getClosestLevel: function() {
        var i, tiles;
        for (i = this.minLevel + 1;i <= this.maxLevel; i++) {
          tiles = this.getNumTiles(i);
          if (tiles.x > 1 || tiles.y > 1) {
            break;
          }
        }
        return i - 1;
      },
      getTileAtPoint: function(level, point) {
        var validPoint = point.x >= 0 && point.x <= 1 && point.y >= 0 && point.y <= 1 / this.aspectRatio;
        $.console.assert(validPoint, "[TileSource.getTileAtPoint] must be called with a valid point.");
        var widthScaled = this.dimensions.x * this.getLevelScale(level);
        var pixelX = point.x * widthScaled;
        var pixelY = point.y * widthScaled;
        var x = Math.floor(pixelX / this.getTileWidth(level));
        var y = Math.floor(pixelY / this.getTileHeight(level));
        if (point.x >= 1) {
          x = this.getNumTiles(level).x - 1;
        }
        var EPSILON = 0.000000000000001;
        if (point.y >= 1 / this.aspectRatio - EPSILON) {
          y = this.getNumTiles(level).y - 1;
        }
        return new $.Point(x, y);
      },
      getTileBounds: function(level, x, y, isSource) {
        var dimensionsScaled = this.dimensions.times(this.getLevelScale(level)), tileWidth = this.getTileWidth(level), tileHeight = this.getTileHeight(level), px = x === 0 ? 0 : tileWidth * x - this.tileOverlap, py = y === 0 ? 0 : tileHeight * y - this.tileOverlap, sx = tileWidth + (x === 0 ? 1 : 2) * this.tileOverlap, sy = tileHeight + (y === 0 ? 1 : 2) * this.tileOverlap, scale = 1 / dimensionsScaled.x;
        sx = Math.min(sx, dimensionsScaled.x - px);
        sy = Math.min(sy, dimensionsScaled.y - py);
        if (isSource) {
          return new $.Rect(0, 0, sx, sy);
        }
        return new $.Rect(px * scale, py * scale, sx * scale, sy * scale);
      },
      getImageInfo: function(url) {
        var _this = this, callbackName, callback, readySource, options, urlParts, filename, lastDot;
        if (url) {
          urlParts = url.split("/");
          filename = urlParts[urlParts.length - 1];
          lastDot = filename.lastIndexOf(".");
          if (lastDot > -1) {
            urlParts[urlParts.length - 1] = filename.slice(0, lastDot);
          }
        }
        var postData = null;
        if (this.splitHashDataForPost) {
          var hashIdx = url.indexOf("#");
          if (hashIdx !== -1) {
            postData = url.substring(hashIdx + 1);
            url = url.substr(0, hashIdx);
          }
        }
        callback = function(data) {
          if (typeof data === "string") {
            data = $.parseXml(data);
          }
          var $TileSource = $.TileSource.determineType(_this, data, url);
          if (!$TileSource) {
            _this.raiseEvent("open-failed", { message: "Unable to load TileSource", source: url });
            return;
          }
          options = $TileSource.prototype.configure.apply(_this, [data, url, postData]);
          if (options.ajaxWithCredentials === undefined) {
            options.ajaxWithCredentials = _this.ajaxWithCredentials;
          }
          readySource = new $TileSource(options);
          _this.ready = true;
          _this.raiseEvent("ready", { tileSource: readySource });
        };
        if (url.match(/\.js$/)) {
          callbackName = url.split("/").pop().replace(".js", "");
          $.jsonp({
            url,
            async: false,
            callbackName,
            callback
          });
        } else {
          $.makeAjaxRequest({
            url,
            postData,
            withCredentials: this.ajaxWithCredentials,
            headers: this.ajaxHeaders,
            success: function(xhr) {
              var data = processResponse(xhr);
              callback(data);
            },
            error: function(xhr, exc) {
              var msg;
              try {
                msg = "HTTP " + xhr.status + " attempting to load TileSource: " + url;
              } catch (e) {
                var formattedExc;
                if (typeof exc === "undefined" || !exc.toString) {
                  formattedExc = "Unknown error";
                } else {
                  formattedExc = exc.toString();
                }
                msg = formattedExc + " attempting to load TileSource: " + url;
              }
              $.console.error(msg);
              _this.raiseEvent("open-failed", {
                message: msg,
                source: url,
                postData
              });
            }
          });
        }
      },
      supports: function(data, url) {
        return false;
      },
      configure: function(data, url, postData) {
        throw new Error("Method not implemented.");
      },
      getTileUrl: function(level, x, y) {
        throw new Error("Method not implemented.");
      },
      getTilePostData: function(level, x, y) {
        return null;
      },
      getTileAjaxHeaders: function(level, x, y) {
        return {};
      },
      getTileHashKey: function(level, x, y, url, ajaxHeaders, postData) {
        function withHeaders(hash) {
          return ajaxHeaders ? hash + "+" + JSON.stringify(ajaxHeaders) : hash;
        }
        if (typeof url !== "string") {
          return withHeaders(level + "/" + x + "_" + y);
        }
        return withHeaders(url);
      },
      tileExists: function(level, x, y) {
        var numTiles = this.getNumTiles(level);
        return level >= this.minLevel && level <= this.maxLevel && x >= 0 && y >= 0 && x < numTiles.x && y < numTiles.y;
      },
      hasTransparency: function(context2D, url, ajaxHeaders, post) {
        return !!context2D || url.match(".png");
      },
      downloadTileStart: function(context) {
        var dataStore = context.userData, image = new Image;
        dataStore.image = image;
        dataStore.request = null;
        var finish = function(error) {
          if (!image) {
            context.finish(null, dataStore.request, "Image load failed: undefined Image instance.");
            return;
          }
          image.onload = image.onerror = image.onabort = null;
          context.finish(error ? null : image, dataStore.request, error);
        };
        image.onload = function() {
          finish();
        };
        image.onabort = image.onerror = function() {
          finish("Image load aborted.");
        };
        if (context.loadWithAjax) {
          dataStore.request = $.makeAjaxRequest({
            url: context.src,
            withCredentials: context.ajaxWithCredentials,
            headers: context.ajaxHeaders,
            responseType: "arraybuffer",
            postData: context.postData,
            success: function(request) {
              var blb;
              try {
                blb = new window.Blob([request.response]);
              } catch (e) {
                var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
                if (e.name === "TypeError" && BlobBuilder) {
                  var bb = new BlobBuilder;
                  bb.append(request.response);
                  blb = bb.getBlob();
                }
              }
              if (blb.size === 0) {
                finish("Empty image response.");
              } else {
                image.src = (window.URL || window.webkitURL).createObjectURL(blb);
              }
            },
            error: function(request) {
              finish("Image load aborted - XHR error");
            }
          });
        } else {
          if (context.crossOriginPolicy !== false) {
            image.crossOrigin = context.crossOriginPolicy;
          }
          image.src = context.src;
        }
      },
      downloadTileAbort: function(context) {
        if (context.userData.request) {
          context.userData.request.abort();
        }
        var image = context.userData.image;
        if (context.userData.image) {
          image.onload = image.onerror = image.onabort = null;
        }
      },
      createTileCache: function(cacheObject, data, tile) {
        cacheObject._data = data;
      },
      destroyTileCache: function(cacheObject) {
        cacheObject._data = null;
        cacheObject._renderedContext = null;
      },
      getTileCacheData: function(cacheObject) {
        return cacheObject._data;
      },
      getTileCacheDataAsImage: function(cacheObject) {
        return cacheObject._data;
      },
      getTileCacheDataAsContext2D: function(cacheObject) {
        if (!cacheObject._renderedContext) {
          var canvas = document.createElement("canvas");
          canvas.width = cacheObject._data.width;
          canvas.height = cacheObject._data.height;
          cacheObject._renderedContext = canvas.getContext("2d");
          cacheObject._renderedContext.drawImage(cacheObject._data, 0, 0);
          cacheObject._data = null;
        }
        return cacheObject._renderedContext;
      }
    };
    $.extend(true, $.TileSource.prototype, $.EventSource.prototype);
    function processResponse(xhr) {
      var { responseText, status } = xhr, statusText, data;
      if (!xhr) {
        throw new Error($.getString("Errors.Security"));
      } else if (xhr.status !== 200 && xhr.status !== 0) {
        status = xhr.status;
        statusText = status === 404 ? "Not Found" : xhr.statusText;
        throw new Error($.getString("Errors.Status", status, statusText));
      }
      if (responseText.match(/^\s*<.*/)) {
        try {
          data = xhr.responseXML && xhr.responseXML.documentElement ? xhr.responseXML : $.parseXml(responseText);
        } catch (e) {
          data = xhr.responseText;
        }
      } else if (responseText.match(/\s*[{[].*/)) {
        try {
          data = $.parseJSON(responseText);
        } catch (e) {
          data = responseText;
        }
      } else {
        data = responseText;
      }
      return data;
    }
    $.TileSource.determineType = function(tileSource, data, url) {
      var property;
      for (property in OpenSeadragon) {
        if (property.match(/.+TileSource$/) && $.isFunction(OpenSeadragon[property]) && $.isFunction(OpenSeadragon[property].prototype.supports) && OpenSeadragon[property].prototype.supports.call(tileSource, data, url)) {
          return OpenSeadragon[property];
        }
      }
      $.console.error("No TileSource was able to open %s %s", url, data);
      return null;
    };
  })(OpenSeadragon);
  (function($) {
    $.DziTileSource = function(width, height, tileSize, tileOverlap, tilesUrl, fileFormat, displayRects, minLevel, maxLevel) {
      var i, rect, level, options;
      if ($.isPlainObject(width)) {
        options = width;
      } else {
        options = {
          width: arguments[0],
          height: arguments[1],
          tileSize: arguments[2],
          tileOverlap: arguments[3],
          tilesUrl: arguments[4],
          fileFormat: arguments[5],
          displayRects: arguments[6],
          minLevel: arguments[7],
          maxLevel: arguments[8]
        };
      }
      this._levelRects = {};
      this.tilesUrl = options.tilesUrl;
      this.fileFormat = options.fileFormat;
      this.displayRects = options.displayRects;
      if (this.displayRects) {
        for (i = this.displayRects.length - 1;i >= 0; i--) {
          rect = this.displayRects[i];
          for (level = rect.minLevel;level <= rect.maxLevel; level++) {
            if (!this._levelRects[level]) {
              this._levelRects[level] = [];
            }
            this._levelRects[level].push(rect);
          }
        }
      }
      $.TileSource.apply(this, [options]);
    };
    $.extend($.DziTileSource.prototype, $.TileSource.prototype, {
      supports: function(data, url) {
        var ns;
        if (data.Image) {
          ns = data.Image.xmlns;
        } else if (data.documentElement) {
          if (data.documentElement.localName === "Image" || data.documentElement.tagName === "Image") {
            ns = data.documentElement.namespaceURI;
          }
        }
        ns = (ns || "").toLowerCase();
        return ns.indexOf("schemas.microsoft.com/deepzoom/2008") !== -1 || ns.indexOf("schemas.microsoft.com/deepzoom/2009") !== -1;
      },
      configure: function(data, url, postData) {
        var options;
        if (!$.isPlainObject(data)) {
          options = configureFromXML(this, data);
        } else {
          options = configureFromObject(this, data);
        }
        if (url && !options.tilesUrl) {
          options.tilesUrl = url.replace(/([^/]+?)(\.(dzi|xml|js)?(\?[^/]*)?)?\/?$/, "$1_files/");
          if (url.search(/\.(dzi|xml|js)\?/) !== -1) {
            options.queryParams = url.match(/\?.*/);
          } else {
            options.queryParams = "";
          }
        }
        return options;
      },
      getTileUrl: function(level, x, y) {
        return [this.tilesUrl, level, "/", x, "_", y, ".", this.fileFormat, this.queryParams].join("");
      },
      tileExists: function(level, x, y) {
        var rects = this._levelRects[level], rect, scale, xMin, yMin, xMax, yMax, i;
        if (this.minLevel && level < this.minLevel || this.maxLevel && level > this.maxLevel) {
          return false;
        }
        if (!rects || !rects.length) {
          return true;
        }
        for (i = rects.length - 1;i >= 0; i--) {
          rect = rects[i];
          if (level < rect.minLevel || level > rect.maxLevel) {
            continue;
          }
          scale = this.getLevelScale(level);
          xMin = rect.x * scale;
          yMin = rect.y * scale;
          xMax = xMin + rect.width * scale;
          yMax = yMin + rect.height * scale;
          xMin = Math.floor(xMin / this._tileWidth);
          yMin = Math.floor(yMin / this._tileWidth);
          xMax = Math.ceil(xMax / this._tileWidth);
          yMax = Math.ceil(yMax / this._tileWidth);
          if (xMin <= x && x < xMax && yMin <= y && y < yMax) {
            return true;
          }
        }
        return false;
      }
    });
    function configureFromXML(tileSource, xmlDoc) {
      if (!xmlDoc || !xmlDoc.documentElement) {
        throw new Error($.getString("Errors.Xml"));
      }
      var root = xmlDoc.documentElement, rootName = root.localName || root.tagName, ns = xmlDoc.documentElement.namespaceURI, configuration = null, displayRects = [], dispRectNodes, dispRectNode, rectNode, sizeNode, i;
      if (rootName === "Image") {
        try {
          sizeNode = root.getElementsByTagName("Size")[0];
          if (sizeNode === undefined) {
            sizeNode = root.getElementsByTagNameNS(ns, "Size")[0];
          }
          configuration = {
            Image: {
              xmlns: "http://schemas.microsoft.com/deepzoom/2008",
              Url: root.getAttribute("Url"),
              Format: root.getAttribute("Format"),
              DisplayRect: null,
              Overlap: parseInt(root.getAttribute("Overlap"), 10),
              TileSize: parseInt(root.getAttribute("TileSize"), 10),
              Size: {
                Height: parseInt(sizeNode.getAttribute("Height"), 10),
                Width: parseInt(sizeNode.getAttribute("Width"), 10)
              }
            }
          };
          if (!$.imageFormatSupported(configuration.Image.Format)) {
            throw new Error($.getString("Errors.ImageFormat", configuration.Image.Format.toUpperCase()));
          }
          dispRectNodes = root.getElementsByTagName("DisplayRect");
          if (dispRectNodes === undefined) {
            dispRectNodes = root.getElementsByTagNameNS(ns, "DisplayRect")[0];
          }
          for (i = 0;i < dispRectNodes.length; i++) {
            dispRectNode = dispRectNodes[i];
            rectNode = dispRectNode.getElementsByTagName("Rect")[0];
            if (rectNode === undefined) {
              rectNode = dispRectNode.getElementsByTagNameNS(ns, "Rect")[0];
            }
            displayRects.push({
              Rect: {
                X: parseInt(rectNode.getAttribute("X"), 10),
                Y: parseInt(rectNode.getAttribute("Y"), 10),
                Width: parseInt(rectNode.getAttribute("Width"), 10),
                Height: parseInt(rectNode.getAttribute("Height"), 10),
                MinLevel: parseInt(dispRectNode.getAttribute("MinLevel"), 10),
                MaxLevel: parseInt(dispRectNode.getAttribute("MaxLevel"), 10)
              }
            });
          }
          if (displayRects.length) {
            configuration.Image.DisplayRect = displayRects;
          }
          return configureFromObject(tileSource, configuration);
        } catch (e) {
          throw e instanceof Error ? e : new Error($.getString("Errors.Dzi"));
        }
      } else if (rootName === "Collection") {
        throw new Error($.getString("Errors.Dzc"));
      } else if (rootName === "Error") {
        var messageNode = root.getElementsByTagName("Message")[0];
        var message = messageNode.firstChild.nodeValue;
        throw new Error(message);
      }
      throw new Error($.getString("Errors.Dzi"));
    }
    function configureFromObject(tileSource, configuration) {
      var imageData = configuration.Image, tilesUrl = imageData.Url, fileFormat = imageData.Format, sizeData = imageData.Size, dispRectData = imageData.DisplayRect || [], width = parseInt(sizeData.Width, 10), height = parseInt(sizeData.Height, 10), tileSize = parseInt(imageData.TileSize, 10), tileOverlap = parseInt(imageData.Overlap, 10), displayRects = [], rectData, i;
      for (i = 0;i < dispRectData.length; i++) {
        rectData = dispRectData[i].Rect;
        displayRects.push(new $.DisplayRect(parseInt(rectData.X, 10), parseInt(rectData.Y, 10), parseInt(rectData.Width, 10), parseInt(rectData.Height, 10), parseInt(rectData.MinLevel, 10), parseInt(rectData.MaxLevel, 10)));
      }
      return $.extend(true, {
        width,
        height,
        tileSize,
        tileOverlap,
        minLevel: null,
        maxLevel: null,
        tilesUrl,
        fileFormat,
        displayRects
      }, configuration);
    }
  })(OpenSeadragon);
  (function($) {
    $.IIIFTileSource = function(options) {
      $.extend(true, this, options);
      this._id = this["@id"] || this["id"] || this["identifier"] || null;
      if (!(this.height && this.width && this._id)) {
        throw new Error("IIIF required parameters (width, height, or id) not provided.");
      }
      options.tileSizePerScaleFactor = {};
      this.tileFormat = this.tileFormat || "jpg";
      this.version = options.version;
      if (this.tile_width && this.tile_height) {
        options.tileWidth = this.tile_width;
        options.tileHeight = this.tile_height;
      } else if (this.tile_width) {
        options.tileSize = this.tile_width;
      } else if (this.tile_height) {
        options.tileSize = this.tile_height;
      } else if (this.tiles) {
        if (this.tiles.length === 1) {
          options.tileWidth = this.tiles[0].width;
          options.tileHeight = this.tiles[0].height || this.tiles[0].width;
          this.scale_factors = this.tiles[0].scaleFactors;
        } else {
          this.scale_factors = [];
          for (var t = 0;t < this.tiles.length; t++) {
            for (var sf = 0;sf < this.tiles[t].scaleFactors.length; sf++) {
              var scaleFactor = this.tiles[t].scaleFactors[sf];
              this.scale_factors.push(scaleFactor);
              options.tileSizePerScaleFactor[scaleFactor] = {
                width: this.tiles[t].width,
                height: this.tiles[t].height || this.tiles[t].width
              };
            }
          }
        }
      } else if (canBeTiled(options)) {
        var shortDim = Math.min(this.height, this.width), tileOptions = [256, 512, 1024], smallerTiles = [];
        for (var c = 0;c < tileOptions.length; c++) {
          if (tileOptions[c] <= shortDim) {
            smallerTiles.push(tileOptions[c]);
          }
        }
        if (smallerTiles.length > 0) {
          options.tileSize = Math.max.apply(null, smallerTiles);
        } else {
          options.tileSize = shortDim;
        }
      } else if (this.sizes && this.sizes.length > 0) {
        this.emulateLegacyImagePyramid = true;
        options.levels = constructLevels(this);
        $.extend(true, options, {
          width: options.levels[options.levels.length - 1].width,
          height: options.levels[options.levels.length - 1].height,
          tileSize: Math.max(options.height, options.width),
          tileOverlap: 0,
          minLevel: 0,
          maxLevel: options.levels.length - 1
        });
        this.levels = options.levels;
      } else {
        $.console.error("Nothing in the info.json to construct image pyramids from");
      }
      if (!options.maxLevel && !this.emulateLegacyImagePyramid) {
        if (!this.scale_factors) {
          options.maxLevel = Number(Math.round(Math.log(Math.max(this.width, this.height), 2)));
        } else {
          var maxScaleFactor = Math.max.apply(null, this.scale_factors);
          options.maxLevel = Math.round(Math.log(maxScaleFactor) * Math.LOG2E);
        }
      }
      if (this.sizes) {
        var sizeLength = this.sizes.length;
        if (sizeLength === options.maxLevel || sizeLength === options.maxLevel + 1) {
          this.levelSizes = this.sizes.slice().sort((size1, size2) => size1.width - size2.width);
          if (sizeLength === options.maxLevel) {
            this.levelSizes.push({ width: this.width, height: this.height });
          }
        }
      }
      $.TileSource.apply(this, [options]);
    };
    $.extend($.IIIFTileSource.prototype, $.TileSource.prototype, {
      supports: function(data, url) {
        if (data.protocol && data.protocol === "http://iiif.io/api/image") {
          return true;
        } else if (data["@context"] && (data["@context"] === "http://library.stanford.edu/iiif/image-api/1.1/context.json" || data["@context"] === "http://iiif.io/api/image/1/context.json")) {
          return true;
        } else if (data.profile && data.profile.indexOf("http://library.stanford.edu/iiif/image-api/compliance.html") === 0) {
          return true;
        } else if (data.identifier && data.width && data.height) {
          return true;
        } else if (data.documentElement && data.documentElement.tagName === "info" && data.documentElement.namespaceURI === "http://library.stanford.edu/iiif/image-api/ns/") {
          return true;
        } else {
          return false;
        }
      },
      configure: function(data, url, postData) {
        if (!$.isPlainObject(data)) {
          var options = configureFromXml10(data);
          options["@context"] = "http://iiif.io/api/image/1.0/context.json";
          options["@id"] = url.replace("/info.xml", "");
          options.version = 1;
          return options;
        } else {
          if (!data["@context"]) {
            data["@context"] = "http://iiif.io/api/image/1.0/context.json";
            data["@id"] = url.replace("/info.json", "");
            data.version = 1;
          } else {
            var context = data["@context"];
            if (Array.isArray(context)) {
              for (var i = 0;i < context.length; i++) {
                if (typeof context[i] === "string" && (/^http:\/\/iiif\.io\/api\/image\/[1-3]\/context\.json$/.test(context[i]) || context[i] === "http://library.stanford.edu/iiif/image-api/1.1/context.json")) {
                  context = context[i];
                  break;
                }
              }
            }
            switch (context) {
              case "http://iiif.io/api/image/1/context.json":
              case "http://library.stanford.edu/iiif/image-api/1.1/context.json":
                data.version = 1;
                break;
              case "http://iiif.io/api/image/2/context.json":
                data.version = 2;
                break;
              case "http://iiif.io/api/image/3/context.json":
                data.version = 3;
                break;
              default:
                $.console.error("Data has a @context property which contains no known IIIF context URI.");
            }
          }
          if (data.preferredFormats) {
            for (var f = 0;f < data.preferredFormats.length; f++) {
              if (OpenSeadragon.imageFormatSupported(data.preferredFormats[f])) {
                data.tileFormat = data.preferredFormats[f];
                break;
              }
            }
          }
          return data;
        }
      },
      getTileWidth: function(level) {
        if (this.emulateLegacyImagePyramid) {
          return $.TileSource.prototype.getTileWidth.call(this, level);
        }
        var scaleFactor = Math.pow(2, this.maxLevel - level);
        if (this.tileSizePerScaleFactor && this.tileSizePerScaleFactor[scaleFactor]) {
          return this.tileSizePerScaleFactor[scaleFactor].width;
        }
        return this._tileWidth;
      },
      getTileHeight: function(level) {
        if (this.emulateLegacyImagePyramid) {
          return $.TileSource.prototype.getTileHeight.call(this, level);
        }
        var scaleFactor = Math.pow(2, this.maxLevel - level);
        if (this.tileSizePerScaleFactor && this.tileSizePerScaleFactor[scaleFactor]) {
          return this.tileSizePerScaleFactor[scaleFactor].height;
        }
        return this._tileHeight;
      },
      getLevelScale: function(level) {
        if (this.emulateLegacyImagePyramid) {
          var levelScale = NaN;
          if (this.levels.length > 0 && level >= this.minLevel && level <= this.maxLevel) {
            levelScale = this.levels[level].width / this.levels[this.maxLevel].width;
          }
          return levelScale;
        }
        return $.TileSource.prototype.getLevelScale.call(this, level);
      },
      getNumTiles: function(level) {
        if (this.emulateLegacyImagePyramid) {
          var scale = this.getLevelScale(level);
          if (scale) {
            return new $.Point(1, 1);
          } else {
            return new $.Point(0, 0);
          }
        }
        if (this.levelSizes) {
          var levelSize = this.levelSizes[level];
          var x = Math.ceil(levelSize.width / this.getTileWidth(level)), y = Math.ceil(levelSize.height / this.getTileHeight(level));
          return new $.Point(x, y);
        } else {
          return $.TileSource.prototype.getNumTiles.call(this, level);
        }
      },
      getTileAtPoint: function(level, point) {
        if (this.emulateLegacyImagePyramid) {
          return new $.Point(0, 0);
        }
        if (this.levelSizes) {
          var validPoint = point.x >= 0 && point.x <= 1 && point.y >= 0 && point.y <= 1 / this.aspectRatio;
          $.console.assert(validPoint, "[TileSource.getTileAtPoint] must be called with a valid point.");
          var widthScaled = this.levelSizes[level].width;
          var pixelX = point.x * widthScaled;
          var pixelY = point.y * widthScaled;
          var x = Math.floor(pixelX / this.getTileWidth(level));
          var y = Math.floor(pixelY / this.getTileHeight(level));
          if (point.x >= 1) {
            x = this.getNumTiles(level).x - 1;
          }
          var EPSILON = 0.000000000000001;
          if (point.y >= 1 / this.aspectRatio - EPSILON) {
            y = this.getNumTiles(level).y - 1;
          }
          return new $.Point(x, y);
        }
        return $.TileSource.prototype.getTileAtPoint.call(this, level, point);
      },
      getTileUrl: function(level, x, y) {
        if (this.emulateLegacyImagePyramid) {
          var url = null;
          if (this.levels.length > 0 && level >= this.minLevel && level <= this.maxLevel) {
            url = this.levels[level].url;
          }
          return url;
        }
        var IIIF_ROTATION = "0", scale = Math.pow(0.5, this.maxLevel - level), levelWidth, levelHeight, tileWidth, tileHeight, iiifTileSizeWidth, iiifTileSizeHeight, iiifRegion, iiifTileX, iiifTileY, iiifTileW, iiifTileH, iiifSize, iiifSizeW, iiifSizeH, iiifQuality, uri;
        if (this.levelSizes) {
          levelWidth = this.levelSizes[level].width;
          levelHeight = this.levelSizes[level].height;
        } else {
          levelWidth = Math.ceil(this.width * scale);
          levelHeight = Math.ceil(this.height * scale);
        }
        tileWidth = this.getTileWidth(level);
        tileHeight = this.getTileHeight(level);
        iiifTileSizeWidth = Math.round(tileWidth / scale);
        iiifTileSizeHeight = Math.round(tileHeight / scale);
        if (this.version === 1) {
          iiifQuality = "native." + this.tileFormat;
        } else {
          iiifQuality = "default." + this.tileFormat;
        }
        if (levelWidth < tileWidth && levelHeight < tileHeight) {
          if (this.version === 2 && levelWidth === this.width) {
            iiifSize = "full";
          } else if (this.version === 3 && levelWidth === this.width && levelHeight === this.height) {
            iiifSize = "max";
          } else if (this.version === 3) {
            iiifSize = levelWidth + "," + levelHeight;
          } else {
            iiifSize = levelWidth + ",";
          }
          iiifRegion = "full";
        } else {
          iiifTileX = x * iiifTileSizeWidth;
          iiifTileY = y * iiifTileSizeHeight;
          iiifTileW = Math.min(iiifTileSizeWidth, this.width - iiifTileX);
          iiifTileH = Math.min(iiifTileSizeHeight, this.height - iiifTileY);
          if (x === 0 && y === 0 && iiifTileW === this.width && iiifTileH === this.height) {
            iiifRegion = "full";
          } else {
            iiifRegion = [iiifTileX, iiifTileY, iiifTileW, iiifTileH].join(",");
          }
          iiifSizeW = Math.min(tileWidth, levelWidth - x * tileWidth);
          iiifSizeH = Math.min(tileHeight, levelHeight - y * tileHeight);
          if (this.version === 2 && iiifSizeW === this.width) {
            iiifSize = "full";
          } else if (this.version === 3 && iiifSizeW === this.width && iiifSizeH === this.height) {
            iiifSize = "max";
          } else if (this.version === 3) {
            iiifSize = iiifSizeW + "," + iiifSizeH;
          } else {
            iiifSize = iiifSizeW + ",";
          }
        }
        uri = [this._id, iiifRegion, iiifSize, IIIF_ROTATION, iiifQuality].join("/");
        return uri;
      },
      __testonly__: {
        canBeTiled,
        constructLevels
      }
    });
    function canBeTiled(options) {
      var level0Profiles = [
        "http://library.stanford.edu/iiif/image-api/compliance.html#level0",
        "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0",
        "http://iiif.io/api/image/2/level0.json",
        "level0",
        "https://iiif.io/api/image/3/level0.json"
      ];
      var profileLevel = Array.isArray(options.profile) ? options.profile[0] : options.profile;
      var isLevel0 = level0Profiles.indexOf(profileLevel) !== -1;
      var hasCanoncicalSizeFeature = false;
      if (options.version === 2 && options.profile.length > 1 && options.profile[1].supports) {
        hasCanoncicalSizeFeature = options.profile[1].supports.indexOf("sizeByW") !== -1;
      }
      if (options.version === 3 && options.extraFeatures) {
        hasCanoncicalSizeFeature = options.extraFeatures.indexOf("sizeByWh") !== -1;
      }
      return !isLevel0 || hasCanoncicalSizeFeature;
    }
    function constructLevels(options) {
      var levels = [];
      for (var i = 0;i < options.sizes.length; i++) {
        levels.push({
          url: options._id + "/full/" + options.sizes[i].width + "," + (options.version === 3 ? options.sizes[i].height : "") + "/0/default." + options.tileFormat,
          width: options.sizes[i].width,
          height: options.sizes[i].height
        });
      }
      return levels.sort(function(a, b) {
        return a.width - b.width;
      });
    }
    function configureFromXml10(xmlDoc) {
      if (!xmlDoc || !xmlDoc.documentElement) {
        throw new Error($.getString("Errors.Xml"));
      }
      var root = xmlDoc.documentElement, rootName = root.tagName, configuration = null;
      if (rootName === "info") {
        try {
          configuration = {};
          parseXML10(root, configuration);
          return configuration;
        } catch (e) {
          throw e instanceof Error ? e : new Error($.getString("Errors.IIIF"));
        }
      }
      throw new Error($.getString("Errors.IIIF"));
    }
    function parseXML10(node, configuration, property) {
      var i, value;
      if (node.nodeType === 3 && property) {
        value = node.nodeValue.trim();
        if (value.match(/^\d*$/)) {
          value = Number(value);
        }
        if (!configuration[property]) {
          configuration[property] = value;
        } else {
          if (!$.isArray(configuration[property])) {
            configuration[property] = [configuration[property]];
          }
          configuration[property].push(value);
        }
      } else if (node.nodeType === 1) {
        for (i = 0;i < node.childNodes.length; i++) {
          parseXML10(node.childNodes[i], configuration, node.nodeName);
        }
      }
    }
  })(OpenSeadragon);
  (function($) {
    $.OsmTileSource = function(width, height, tileSize, tileOverlap, tilesUrl) {
      var options;
      if ($.isPlainObject(width)) {
        options = width;
      } else {
        options = {
          width: arguments[0],
          height: arguments[1],
          tileSize: arguments[2],
          tileOverlap: arguments[3],
          tilesUrl: arguments[4]
        };
      }
      if (!options.width || !options.height) {
        options.width = 65572864;
        options.height = 65572864;
      }
      if (!options.tileSize) {
        options.tileSize = 256;
        options.tileOverlap = 0;
      }
      if (!options.tilesUrl) {
        options.tilesUrl = "http://tile.openstreetmap.org/";
      }
      options.minLevel = 8;
      $.TileSource.apply(this, [options]);
    };
    $.extend($.OsmTileSource.prototype, $.TileSource.prototype, {
      supports: function(data, url) {
        return data.type && data.type === "openstreetmaps";
      },
      configure: function(data, url, postData) {
        return data;
      },
      getTileUrl: function(level, x, y) {
        return this.tilesUrl + (level - 8) + "/" + x + "/" + y + ".png";
      }
    });
  })(OpenSeadragon);
  (function($) {
    $.TmsTileSource = function(width, height, tileSize, tileOverlap, tilesUrl) {
      var options;
      if ($.isPlainObject(width)) {
        options = width;
      } else {
        options = {
          width: arguments[0],
          height: arguments[1],
          tileSize: arguments[2],
          tileOverlap: arguments[3],
          tilesUrl: arguments[4]
        };
      }
      var bufferedWidth = Math.ceil(options.width / 256) * 256, bufferedHeight = Math.ceil(options.height / 256) * 256, max;
      if (bufferedWidth > bufferedHeight) {
        max = bufferedWidth / 256;
      } else {
        max = bufferedHeight / 256;
      }
      options.maxLevel = Math.ceil(Math.log(max) / Math.log(2)) - 1;
      options.tileSize = 256;
      options.width = bufferedWidth;
      options.height = bufferedHeight;
      $.TileSource.apply(this, [options]);
    };
    $.extend($.TmsTileSource.prototype, $.TileSource.prototype, {
      supports: function(data, url) {
        return data.type && data.type === "tiledmapservice";
      },
      configure: function(data, url, postData) {
        return data;
      },
      getTileUrl: function(level, x, y) {
        var yTiles = this.getNumTiles(level).y - 1;
        return this.tilesUrl + level + "/" + x + "/" + (yTiles - y) + ".png";
      }
    });
  })(OpenSeadragon);
  (function($) {
    $.ZoomifyTileSource = function(options) {
      if (typeof options.tileSize === "undefined") {
        options.tileSize = 256;
      }
      if (typeof options.fileFormat === "undefined") {
        options.fileFormat = "jpg";
        this.fileFormat = options.fileFormat;
      }
      var currentImageSize = {
        x: options.width,
        y: options.height
      };
      options.imageSizes = [{
        x: options.width,
        y: options.height
      }];
      options.gridSize = [this._getGridSize(options.width, options.height, options.tileSize)];
      while (parseInt(currentImageSize.x, 10) > options.tileSize || parseInt(currentImageSize.y, 10) > options.tileSize) {
        currentImageSize.x = Math.floor(currentImageSize.x / 2);
        currentImageSize.y = Math.floor(currentImageSize.y / 2);
        options.imageSizes.push({
          x: currentImageSize.x,
          y: currentImageSize.y
        });
        options.gridSize.push(this._getGridSize(currentImageSize.x, currentImageSize.y, options.tileSize));
      }
      options.imageSizes.reverse();
      options.gridSize.reverse();
      options.minLevel = 0;
      options.maxLevel = options.gridSize.length - 1;
      OpenSeadragon.TileSource.apply(this, [options]);
    };
    $.extend($.ZoomifyTileSource.prototype, $.TileSource.prototype, {
      _getGridSize: function(width, height, tileSize) {
        return {
          x: Math.ceil(width / tileSize),
          y: Math.ceil(height / tileSize)
        };
      },
      _calculateAbsoluteTileNumber: function(level, x, y) {
        var num = 0;
        var size = {};
        for (var z = 0;z < level; z++) {
          size = this.gridSize[z];
          num += size.x * size.y;
        }
        size = this.gridSize[level];
        num += size.x * y + x;
        return num;
      },
      supports: function(data, url) {
        return data.type && data.type === "zoomifytileservice";
      },
      configure: function(data, url, postData) {
        return data;
      },
      getTileUrl: function(level, x, y) {
        var result = 0;
        var num = this._calculateAbsoluteTileNumber(level, x, y);
        result = Math.floor(num / 256);
        return this.tilesUrl + "TileGroup" + result + "/" + level + "-" + x + "-" + y + "." + this.fileFormat;
      }
    });
  })(OpenSeadragon);
  (function($) {
    $.LegacyTileSource = function(levels) {
      var options, width, height;
      if ($.isArray(levels)) {
        options = {
          type: "legacy-image-pyramid",
          levels
        };
      }
      options.levels = filterFiles(options.levels);
      if (options.levels.length > 0) {
        width = options.levels[options.levels.length - 1].width;
        height = options.levels[options.levels.length - 1].height;
      } else {
        width = 0;
        height = 0;
        $.console.error("No supported image formats found");
      }
      $.extend(true, options, {
        width,
        height,
        tileSize: Math.max(height, width),
        tileOverlap: 0,
        minLevel: 0,
        maxLevel: options.levels.length > 0 ? options.levels.length - 1 : 0
      });
      $.TileSource.apply(this, [options]);
      this.levels = options.levels;
    };
    $.extend($.LegacyTileSource.prototype, $.TileSource.prototype, {
      supports: function(data, url) {
        return data.type && data.type === "legacy-image-pyramid" || data.documentElement && data.documentElement.getAttribute("type") === "legacy-image-pyramid";
      },
      configure: function(configuration, dataUrl, postData) {
        var options;
        if (!$.isPlainObject(configuration)) {
          options = configureFromXML(this, configuration);
        } else {
          options = configureFromObject(this, configuration);
        }
        return options;
      },
      getLevelScale: function(level) {
        var levelScale = NaN;
        if (this.levels.length > 0 && level >= this.minLevel && level <= this.maxLevel) {
          levelScale = this.levels[level].width / this.levels[this.maxLevel].width;
        }
        return levelScale;
      },
      getNumTiles: function(level) {
        var scale = this.getLevelScale(level);
        if (scale) {
          return new $.Point(1, 1);
        } else {
          return new $.Point(0, 0);
        }
      },
      getTileUrl: function(level, x, y) {
        var url = null;
        if (this.levels.length > 0 && level >= this.minLevel && level <= this.maxLevel) {
          url = this.levels[level].url;
        }
        return url;
      }
    });
    function filterFiles(files) {
      var filtered = [], file, i;
      for (i = 0;i < files.length; i++) {
        file = files[i];
        if (file.height && file.width && file.url) {
          filtered.push({
            url: file.url,
            width: Number(file.width),
            height: Number(file.height)
          });
        } else {
          $.console.error("Unsupported image format: %s", file.url ? file.url : "<no URL>");
        }
      }
      return filtered.sort(function(a, b) {
        return a.height - b.height;
      });
    }
    function configureFromXML(tileSource, xmlDoc) {
      if (!xmlDoc || !xmlDoc.documentElement) {
        throw new Error($.getString("Errors.Xml"));
      }
      var root = xmlDoc.documentElement, rootName = root.tagName, conf = null, levels = [], level, i;
      if (rootName === "image") {
        try {
          conf = {
            type: root.getAttribute("type"),
            levels: []
          };
          levels = root.getElementsByTagName("level");
          for (i = 0;i < levels.length; i++) {
            level = levels[i];
            conf.levels.push({
              url: level.getAttribute("url"),
              width: parseInt(level.getAttribute("width"), 10),
              height: parseInt(level.getAttribute("height"), 10)
            });
          }
          return configureFromObject(tileSource, conf);
        } catch (e) {
          throw e instanceof Error ? e : new Error("Unknown error parsing Legacy Image Pyramid XML.");
        }
      } else if (rootName === "collection") {
        throw new Error("Legacy Image Pyramid Collections not yet supported.");
      } else if (rootName === "error") {
        throw new Error("Error: " + xmlDoc);
      }
      throw new Error("Unknown element " + rootName);
    }
    function configureFromObject(tileSource, configuration) {
      return configuration.levels;
    }
  })(OpenSeadragon);
  (function($) {
    $.ImageTileSource = function(options) {
      options = $.extend({
        buildPyramid: true,
        crossOriginPolicy: false,
        ajaxWithCredentials: false
      }, options);
      $.TileSource.apply(this, [options]);
    };
    $.extend($.ImageTileSource.prototype, $.TileSource.prototype, {
      supports: function(data, url) {
        return data.type && data.type === "image";
      },
      configure: function(options, dataUrl, postData) {
        return options;
      },
      getImageInfo: function(url) {
        var image = this._image = new Image;
        var _this = this;
        if (this.crossOriginPolicy) {
          image.crossOrigin = this.crossOriginPolicy;
        }
        if (this.ajaxWithCredentials) {
          image.useCredentials = this.ajaxWithCredentials;
        }
        $.addEvent(image, "load", function() {
          _this.width = image.naturalWidth;
          _this.height = image.naturalHeight;
          _this.aspectRatio = _this.width / _this.height;
          _this.dimensions = new $.Point(_this.width, _this.height);
          _this._tileWidth = _this.width;
          _this._tileHeight = _this.height;
          _this.tileOverlap = 0;
          _this.minLevel = 0;
          _this.levels = _this._buildLevels();
          _this.maxLevel = _this.levels.length - 1;
          _this.ready = true;
          _this.raiseEvent("ready", { tileSource: _this });
        });
        $.addEvent(image, "error", function() {
          _this.raiseEvent("open-failed", {
            message: "Error loading image at " + url,
            source: url
          });
        });
        image.src = url;
      },
      getLevelScale: function(level) {
        var levelScale = NaN;
        if (level >= this.minLevel && level <= this.maxLevel) {
          levelScale = this.levels[level].width / this.levels[this.maxLevel].width;
        }
        return levelScale;
      },
      getNumTiles: function(level) {
        var scale = this.getLevelScale(level);
        if (scale) {
          return new $.Point(1, 1);
        } else {
          return new $.Point(0, 0);
        }
      },
      getTileUrl: function(level, x, y) {
        var url = null;
        if (level >= this.minLevel && level <= this.maxLevel) {
          url = this.levels[level].url;
        }
        return url;
      },
      getContext2D: function(level, x, y) {
        var context = null;
        if (level >= this.minLevel && level <= this.maxLevel) {
          context = this.levels[level].context2D;
        }
        return context;
      },
      destroy: function(viewer) {
        this._freeupCanvasMemory(viewer);
      },
      _buildLevels: function() {
        var levels = [{
          url: this._image.src,
          width: this._image.naturalWidth,
          height: this._image.naturalHeight
        }];
        if (!this.buildPyramid || !$.supportsCanvas) {
          delete this._image;
          return levels;
        }
        var currentWidth = this._image.naturalWidth;
        var currentHeight = this._image.naturalHeight;
        var bigCanvas = document.createElement("canvas");
        var bigContext = bigCanvas.getContext("2d");
        bigCanvas.width = currentWidth;
        bigCanvas.height = currentHeight;
        bigContext.drawImage(this._image, 0, 0, currentWidth, currentHeight);
        levels[0].context2D = bigContext;
        delete this._image;
        if ($.isCanvasTainted(bigCanvas)) {
          return levels;
        }
        while (currentWidth >= 2 && currentHeight >= 2) {
          currentWidth = Math.floor(currentWidth / 2);
          currentHeight = Math.floor(currentHeight / 2);
          var smallCanvas = document.createElement("canvas");
          var smallContext = smallCanvas.getContext("2d");
          smallCanvas.width = currentWidth;
          smallCanvas.height = currentHeight;
          smallContext.drawImage(bigCanvas, 0, 0, currentWidth, currentHeight);
          levels.splice(0, 0, {
            context2D: smallContext,
            width: currentWidth,
            height: currentHeight
          });
          bigCanvas = smallCanvas;
          bigContext = smallContext;
        }
        return levels;
      },
      _freeupCanvasMemory: function(viewer) {
        for (var i = 0;i < this.levels.length; i++) {
          if (this.levels[i].context2D) {
            this.levels[i].context2D.canvas.height = 0;
            this.levels[i].context2D.canvas.width = 0;
            if (viewer) {
              viewer.raiseEvent("image-unloaded", {
                context2D: this.levels[i].context2D
              });
            }
          }
        }
      }
    });
  })(OpenSeadragon);
  (function($) {
    $.TileSourceCollection = function(tileSize, tileSources, rows, layout) {
      $.console.error("TileSourceCollection is deprecated; use World instead");
    };
  })(OpenSeadragon);
  (function($) {
    $.ButtonState = {
      REST: 0,
      GROUP: 1,
      HOVER: 2,
      DOWN: 3
    };
    $.Button = function(options) {
      var _this = this;
      $.EventSource.call(this);
      $.extend(true, this, {
        tooltip: null,
        srcRest: null,
        srcGroup: null,
        srcHover: null,
        srcDown: null,
        clickTimeThreshold: $.DEFAULT_SETTINGS.clickTimeThreshold,
        clickDistThreshold: $.DEFAULT_SETTINGS.clickDistThreshold,
        fadeDelay: 0,
        fadeLength: 2000,
        onPress: null,
        onRelease: null,
        onClick: null,
        onEnter: null,
        onExit: null,
        onFocus: null,
        onBlur: null,
        userData: null
      }, options);
      this.element = options.element || $.makeNeutralElement("div");
      if (!options.element) {
        this.imgRest = $.makeTransparentImage(this.srcRest);
        this.imgGroup = $.makeTransparentImage(this.srcGroup);
        this.imgHover = $.makeTransparentImage(this.srcHover);
        this.imgDown = $.makeTransparentImage(this.srcDown);
        this.imgRest.alt = this.imgGroup.alt = this.imgHover.alt = this.imgDown.alt = this.tooltip;
        $.setElementPointerEventsNone(this.imgRest);
        $.setElementPointerEventsNone(this.imgGroup);
        $.setElementPointerEventsNone(this.imgHover);
        $.setElementPointerEventsNone(this.imgDown);
        this.element.style.position = "relative";
        $.setElementTouchActionNone(this.element);
        this.imgGroup.style.position = this.imgHover.style.position = this.imgDown.style.position = "absolute";
        this.imgGroup.style.top = this.imgHover.style.top = this.imgDown.style.top = "0px";
        this.imgGroup.style.left = this.imgHover.style.left = this.imgDown.style.left = "0px";
        this.imgHover.style.visibility = this.imgDown.style.visibility = "hidden";
        this.element.appendChild(this.imgRest);
        this.element.appendChild(this.imgGroup);
        this.element.appendChild(this.imgHover);
        this.element.appendChild(this.imgDown);
      }
      this.addHandler("press", this.onPress);
      this.addHandler("release", this.onRelease);
      this.addHandler("click", this.onClick);
      this.addHandler("enter", this.onEnter);
      this.addHandler("exit", this.onExit);
      this.addHandler("focus", this.onFocus);
      this.addHandler("blur", this.onBlur);
      this.currentState = $.ButtonState.GROUP;
      this.fadeBeginTime = null;
      this.shouldFade = false;
      this.element.style.display = "inline-block";
      this.element.style.position = "relative";
      this.element.title = this.tooltip;
      this.tracker = new $.MouseTracker({
        userData: "Button.tracker",
        element: this.element,
        clickTimeThreshold: this.clickTimeThreshold,
        clickDistThreshold: this.clickDistThreshold,
        enterHandler: function(event) {
          if (event.insideElementPressed) {
            inTo(_this, $.ButtonState.DOWN);
            _this.raiseEvent("enter", { originalEvent: event.originalEvent });
          } else if (!event.buttonDownAny) {
            inTo(_this, $.ButtonState.HOVER);
          }
        },
        focusHandler: function(event) {
          _this.tracker.enterHandler(event);
          _this.raiseEvent("focus", { originalEvent: event.originalEvent });
        },
        leaveHandler: function(event) {
          outTo(_this, $.ButtonState.GROUP);
          if (event.insideElementPressed) {
            _this.raiseEvent("exit", { originalEvent: event.originalEvent });
          }
        },
        blurHandler: function(event) {
          _this.tracker.leaveHandler(event);
          _this.raiseEvent("blur", { originalEvent: event.originalEvent });
        },
        pressHandler: function(event) {
          inTo(_this, $.ButtonState.DOWN);
          _this.raiseEvent("press", { originalEvent: event.originalEvent });
        },
        releaseHandler: function(event) {
          if (event.insideElementPressed && event.insideElementReleased) {
            outTo(_this, $.ButtonState.HOVER);
            _this.raiseEvent("release", { originalEvent: event.originalEvent });
          } else if (event.insideElementPressed) {
            outTo(_this, $.ButtonState.GROUP);
          } else {
            inTo(_this, $.ButtonState.HOVER);
          }
        },
        clickHandler: function(event) {
          if (event.quick) {
            _this.raiseEvent("click", { originalEvent: event.originalEvent });
          }
        },
        keyHandler: function(event) {
          if (event.keyCode === 13) {
            _this.raiseEvent("click", { originalEvent: event.originalEvent });
            _this.raiseEvent("release", { originalEvent: event.originalEvent });
            event.preventDefault = true;
          } else {
            event.preventDefault = false;
          }
        }
      });
      outTo(this, $.ButtonState.REST);
    };
    $.extend($.Button.prototype, $.EventSource.prototype, {
      notifyGroupEnter: function() {
        inTo(this, $.ButtonState.GROUP);
      },
      notifyGroupExit: function() {
        outTo(this, $.ButtonState.REST);
      },
      disable: function() {
        this.notifyGroupExit();
        this.element.disabled = true;
        this.tracker.setTracking(false);
        $.setElementOpacity(this.element, 0.2, true);
      },
      enable: function() {
        this.element.disabled = false;
        this.tracker.setTracking(true);
        $.setElementOpacity(this.element, 1, true);
        this.notifyGroupEnter();
      },
      destroy: function() {
        if (this.imgRest) {
          this.element.removeChild(this.imgRest);
          this.imgRest = null;
        }
        if (this.imgGroup) {
          this.element.removeChild(this.imgGroup);
          this.imgGroup = null;
        }
        if (this.imgHover) {
          this.element.removeChild(this.imgHover);
          this.imgHover = null;
        }
        if (this.imgDown) {
          this.element.removeChild(this.imgDown);
          this.imgDown = null;
        }
        this.removeAllHandlers();
        this.tracker.destroy();
        this.element = null;
      }
    });
    function scheduleFade(button) {
      $.requestAnimationFrame(function() {
        updateFade(button);
      });
    }
    function updateFade(button) {
      var currentTime, deltaTime, opacity;
      if (button.shouldFade) {
        currentTime = $.now();
        deltaTime = currentTime - button.fadeBeginTime;
        opacity = 1 - deltaTime / button.fadeLength;
        opacity = Math.min(1, opacity);
        opacity = Math.max(0, opacity);
        if (button.imgGroup) {
          $.setElementOpacity(button.imgGroup, opacity, true);
        }
        if (opacity > 0) {
          scheduleFade(button);
        }
      }
    }
    function beginFading(button) {
      button.shouldFade = true;
      button.fadeBeginTime = $.now() + button.fadeDelay;
      window.setTimeout(function() {
        scheduleFade(button);
      }, button.fadeDelay);
    }
    function stopFading(button) {
      button.shouldFade = false;
      if (button.imgGroup) {
        $.setElementOpacity(button.imgGroup, 1, true);
      }
    }
    function inTo(button, newState) {
      if (button.element.disabled) {
        return;
      }
      if (newState >= $.ButtonState.GROUP && button.currentState === $.ButtonState.REST) {
        stopFading(button);
        button.currentState = $.ButtonState.GROUP;
      }
      if (newState >= $.ButtonState.HOVER && button.currentState === $.ButtonState.GROUP) {
        if (button.imgHover) {
          button.imgHover.style.visibility = "";
        }
        button.currentState = $.ButtonState.HOVER;
      }
      if (newState >= $.ButtonState.DOWN && button.currentState === $.ButtonState.HOVER) {
        if (button.imgDown) {
          button.imgDown.style.visibility = "";
        }
        button.currentState = $.ButtonState.DOWN;
      }
    }
    function outTo(button, newState) {
      if (button.element.disabled) {
        return;
      }
      if (newState <= $.ButtonState.HOVER && button.currentState === $.ButtonState.DOWN) {
        if (button.imgDown) {
          button.imgDown.style.visibility = "hidden";
        }
        button.currentState = $.ButtonState.HOVER;
      }
      if (newState <= $.ButtonState.GROUP && button.currentState === $.ButtonState.HOVER) {
        if (button.imgHover) {
          button.imgHover.style.visibility = "hidden";
        }
        button.currentState = $.ButtonState.GROUP;
      }
      if (newState <= $.ButtonState.REST && button.currentState === $.ButtonState.GROUP) {
        beginFading(button);
        button.currentState = $.ButtonState.REST;
      }
    }
  })(OpenSeadragon);
  (function($) {
    $.ButtonGroup = function(options) {
      $.extend(true, this, {
        buttons: [],
        clickTimeThreshold: $.DEFAULT_SETTINGS.clickTimeThreshold,
        clickDistThreshold: $.DEFAULT_SETTINGS.clickDistThreshold,
        labelText: ""
      }, options);
      var buttons = this.buttons.concat([]), _this = this, i;
      this.element = options.element || $.makeNeutralElement("div");
      if (!options.group) {
        this.element.style.display = "inline-block";
        for (i = 0;i < buttons.length; i++) {
          this.element.appendChild(buttons[i].element);
        }
      }
      $.setElementTouchActionNone(this.element);
      this.tracker = new $.MouseTracker({
        userData: "ButtonGroup.tracker",
        element: this.element,
        clickTimeThreshold: this.clickTimeThreshold,
        clickDistThreshold: this.clickDistThreshold,
        enterHandler: function(event) {
          var i2;
          for (i2 = 0;i2 < _this.buttons.length; i2++) {
            _this.buttons[i2].notifyGroupEnter();
          }
        },
        leaveHandler: function(event) {
          var i2;
          if (!event.insideElementPressed) {
            for (i2 = 0;i2 < _this.buttons.length; i2++) {
              _this.buttons[i2].notifyGroupExit();
            }
          }
        }
      });
    };
    $.ButtonGroup.prototype = {
      addButton: function(button) {
        this.buttons.push(button);
        this.element.appendChild(button.element);
      },
      emulateEnter: function() {
        this.tracker.enterHandler({ eventSource: this.tracker });
      },
      emulateLeave: function() {
        this.tracker.leaveHandler({ eventSource: this.tracker });
      },
      destroy: function() {
        while (this.buttons.length) {
          var button = this.buttons.pop();
          this.element.removeChild(button.element);
          button.destroy();
        }
        this.tracker.destroy();
        this.element = null;
      }
    };
  })(OpenSeadragon);
  (function($) {
    $.Rect = function(x, y, width, height, degrees) {
      this.x = typeof x === "number" ? x : 0;
      this.y = typeof y === "number" ? y : 0;
      this.width = typeof width === "number" ? width : 0;
      this.height = typeof height === "number" ? height : 0;
      this.degrees = typeof degrees === "number" ? degrees : 0;
      this.degrees = $.positiveModulo(this.degrees, 360);
      var newTopLeft, newWidth;
      if (this.degrees >= 270) {
        newTopLeft = this.getTopRight();
        this.x = newTopLeft.x;
        this.y = newTopLeft.y;
        newWidth = this.height;
        this.height = this.width;
        this.width = newWidth;
        this.degrees -= 270;
      } else if (this.degrees >= 180) {
        newTopLeft = this.getBottomRight();
        this.x = newTopLeft.x;
        this.y = newTopLeft.y;
        this.degrees -= 180;
      } else if (this.degrees >= 90) {
        newTopLeft = this.getBottomLeft();
        this.x = newTopLeft.x;
        this.y = newTopLeft.y;
        newWidth = this.height;
        this.height = this.width;
        this.width = newWidth;
        this.degrees -= 90;
      }
    };
    $.Rect.fromSummits = function(topLeft, topRight, bottomLeft) {
      var width = topLeft.distanceTo(topRight);
      var height = topLeft.distanceTo(bottomLeft);
      var diff = topRight.minus(topLeft);
      var radians = Math.atan(diff.y / diff.x);
      if (diff.x < 0) {
        radians += Math.PI;
      } else if (diff.y < 0) {
        radians += 2 * Math.PI;
      }
      return new $.Rect(topLeft.x, topLeft.y, width, height, radians / Math.PI * 180);
    };
    $.Rect.prototype = {
      clone: function() {
        return new $.Rect(this.x, this.y, this.width, this.height, this.degrees);
      },
      getAspectRatio: function() {
        return this.width / this.height;
      },
      getTopLeft: function() {
        return new $.Point(this.x, this.y);
      },
      getBottomRight: function() {
        return new $.Point(this.x + this.width, this.y + this.height).rotate(this.degrees, this.getTopLeft());
      },
      getTopRight: function() {
        return new $.Point(this.x + this.width, this.y).rotate(this.degrees, this.getTopLeft());
      },
      getBottomLeft: function() {
        return new $.Point(this.x, this.y + this.height).rotate(this.degrees, this.getTopLeft());
      },
      getCenter: function() {
        return new $.Point(this.x + this.width / 2, this.y + this.height / 2).rotate(this.degrees, this.getTopLeft());
      },
      getSize: function() {
        return new $.Point(this.width, this.height);
      },
      equals: function(other) {
        return other instanceof $.Rect && this.x === other.x && this.y === other.y && this.width === other.width && this.height === other.height && this.degrees === other.degrees;
      },
      times: function(factor) {
        return new $.Rect(this.x * factor, this.y * factor, this.width * factor, this.height * factor, this.degrees);
      },
      translate: function(delta) {
        return new $.Rect(this.x + delta.x, this.y + delta.y, this.width, this.height, this.degrees);
      },
      union: function(rect) {
        var thisBoundingBox = this.getBoundingBox();
        var otherBoundingBox = rect.getBoundingBox();
        var left = Math.min(thisBoundingBox.x, otherBoundingBox.x);
        var top = Math.min(thisBoundingBox.y, otherBoundingBox.y);
        var right = Math.max(thisBoundingBox.x + thisBoundingBox.width, otherBoundingBox.x + otherBoundingBox.width);
        var bottom = Math.max(thisBoundingBox.y + thisBoundingBox.height, otherBoundingBox.y + otherBoundingBox.height);
        return new $.Rect(left, top, right - left, bottom - top);
      },
      intersection: function(rect) {
        var EPSILON = 0.0000000001;
        var intersectionPoints = [];
        var thisTopLeft = this.getTopLeft();
        if (rect.containsPoint(thisTopLeft, EPSILON)) {
          intersectionPoints.push(thisTopLeft);
        }
        var thisTopRight = this.getTopRight();
        if (rect.containsPoint(thisTopRight, EPSILON)) {
          intersectionPoints.push(thisTopRight);
        }
        var thisBottomLeft = this.getBottomLeft();
        if (rect.containsPoint(thisBottomLeft, EPSILON)) {
          intersectionPoints.push(thisBottomLeft);
        }
        var thisBottomRight = this.getBottomRight();
        if (rect.containsPoint(thisBottomRight, EPSILON)) {
          intersectionPoints.push(thisBottomRight);
        }
        var rectTopLeft = rect.getTopLeft();
        if (this.containsPoint(rectTopLeft, EPSILON)) {
          intersectionPoints.push(rectTopLeft);
        }
        var rectTopRight = rect.getTopRight();
        if (this.containsPoint(rectTopRight, EPSILON)) {
          intersectionPoints.push(rectTopRight);
        }
        var rectBottomLeft = rect.getBottomLeft();
        if (this.containsPoint(rectBottomLeft, EPSILON)) {
          intersectionPoints.push(rectBottomLeft);
        }
        var rectBottomRight = rect.getBottomRight();
        if (this.containsPoint(rectBottomRight, EPSILON)) {
          intersectionPoints.push(rectBottomRight);
        }
        var thisSegments = this._getSegments();
        var rectSegments = rect._getSegments();
        for (var i = 0;i < thisSegments.length; i++) {
          var thisSegment = thisSegments[i];
          for (var j = 0;j < rectSegments.length; j++) {
            var rectSegment = rectSegments[j];
            var intersect = getIntersection(thisSegment[0], thisSegment[1], rectSegment[0], rectSegment[1]);
            if (intersect) {
              intersectionPoints.push(intersect);
            }
          }
        }
        function getIntersection(a, b, c, d) {
          var abVector = b.minus(a);
          var cdVector = d.minus(c);
          var denom = -cdVector.x * abVector.y + abVector.x * cdVector.y;
          if (denom === 0) {
            return null;
          }
          var s = (abVector.x * (a.y - c.y) - abVector.y * (a.x - c.x)) / denom;
          var t = (cdVector.x * (a.y - c.y) - cdVector.y * (a.x - c.x)) / denom;
          if (-EPSILON <= s && s <= 1 - EPSILON && -EPSILON <= t && t <= 1 - EPSILON) {
            return new $.Point(a.x + t * abVector.x, a.y + t * abVector.y);
          }
          return null;
        }
        if (intersectionPoints.length === 0) {
          return null;
        }
        var minX = intersectionPoints[0].x;
        var maxX = intersectionPoints[0].x;
        var minY = intersectionPoints[0].y;
        var maxY = intersectionPoints[0].y;
        for (var k = 1;k < intersectionPoints.length; k++) {
          var point = intersectionPoints[k];
          if (point.x < minX) {
            minX = point.x;
          }
          if (point.x > maxX) {
            maxX = point.x;
          }
          if (point.y < minY) {
            minY = point.y;
          }
          if (point.y > maxY) {
            maxY = point.y;
          }
        }
        return new $.Rect(minX, minY, maxX - minX, maxY - minY);
      },
      _getSegments: function() {
        var topLeft = this.getTopLeft();
        var topRight = this.getTopRight();
        var bottomLeft = this.getBottomLeft();
        var bottomRight = this.getBottomRight();
        return [
          [topLeft, topRight],
          [topRight, bottomRight],
          [bottomRight, bottomLeft],
          [bottomLeft, topLeft]
        ];
      },
      rotate: function(degrees, pivot) {
        degrees = $.positiveModulo(degrees, 360);
        if (degrees === 0) {
          return this.clone();
        }
        pivot = pivot || this.getCenter();
        var newTopLeft = this.getTopLeft().rotate(degrees, pivot);
        var newTopRight = this.getTopRight().rotate(degrees, pivot);
        var diff = newTopRight.minus(newTopLeft);
        diff = diff.apply(function(x) {
          var EPSILON = 0.000000000000001;
          return Math.abs(x) < EPSILON ? 0 : x;
        });
        var radians = Math.atan(diff.y / diff.x);
        if (diff.x < 0) {
          radians += Math.PI;
        } else if (diff.y < 0) {
          radians += 2 * Math.PI;
        }
        return new $.Rect(newTopLeft.x, newTopLeft.y, this.width, this.height, radians / Math.PI * 180);
      },
      getBoundingBox: function() {
        if (this.degrees === 0) {
          return this.clone();
        }
        var topLeft = this.getTopLeft();
        var topRight = this.getTopRight();
        var bottomLeft = this.getBottomLeft();
        var bottomRight = this.getBottomRight();
        var minX = Math.min(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
        var maxX = Math.max(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
        var minY = Math.min(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
        var maxY = Math.max(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
        return new $.Rect(minX, minY, maxX - minX, maxY - minY);
      },
      getIntegerBoundingBox: function() {
        var boundingBox = this.getBoundingBox();
        var x = Math.floor(boundingBox.x);
        var y = Math.floor(boundingBox.y);
        var width = Math.ceil(boundingBox.width + boundingBox.x - x);
        var height = Math.ceil(boundingBox.height + boundingBox.y - y);
        return new $.Rect(x, y, width, height);
      },
      containsPoint: function(point, epsilon) {
        epsilon = epsilon || 0;
        var topLeft = this.getTopLeft();
        var topRight = this.getTopRight();
        var bottomLeft = this.getBottomLeft();
        var topDiff = topRight.minus(topLeft);
        var leftDiff = bottomLeft.minus(topLeft);
        return (point.x - topLeft.x) * topDiff.x + (point.y - topLeft.y) * topDiff.y >= -epsilon && (point.x - topRight.x) * topDiff.x + (point.y - topRight.y) * topDiff.y <= epsilon && (point.x - topLeft.x) * leftDiff.x + (point.y - topLeft.y) * leftDiff.y >= -epsilon && (point.x - bottomLeft.x) * leftDiff.x + (point.y - bottomLeft.y) * leftDiff.y <= epsilon;
      },
      toString: function() {
        return "[" + Math.round(this.x * 100) / 100 + ", " + Math.round(this.y * 100) / 100 + ", " + Math.round(this.width * 100) / 100 + "x" + Math.round(this.height * 100) / 100 + ", " + Math.round(this.degrees * 100) / 100 + "deg" + "]";
      }
    };
  })(OpenSeadragon);
  (function($) {
    var THIS = {};
    $.ReferenceStrip = function(options) {
      var _this = this, viewer = options.viewer, viewerSize = $.getElementSize(viewer.element), element, style, i;
      if (!options.id) {
        options.id = "referencestrip-" + $.now();
        this.element = $.makeNeutralElement("div");
        this.element.id = options.id;
        this.element.className = "referencestrip";
      }
      options = $.extend(true, {
        sizeRatio: $.DEFAULT_SETTINGS.referenceStripSizeRatio,
        position: $.DEFAULT_SETTINGS.referenceStripPosition,
        scroll: $.DEFAULT_SETTINGS.referenceStripScroll,
        clickTimeThreshold: $.DEFAULT_SETTINGS.clickTimeThreshold
      }, options, {
        element: this.element
      });
      $.extend(this, options);
      THIS[this.id] = {
        animating: false
      };
      this.minPixelRatio = this.viewer.minPixelRatio;
      this.element.tabIndex = 0;
      style = this.element.style;
      style.marginTop = "0px";
      style.marginRight = "0px";
      style.marginBottom = "0px";
      style.marginLeft = "0px";
      style.left = "0px";
      style.bottom = "0px";
      style.border = "0px";
      style.background = "#000";
      style.position = "relative";
      $.setElementTouchActionNone(this.element);
      $.setElementOpacity(this.element, 0.8);
      this.viewer = viewer;
      this.tracker = new $.MouseTracker({
        userData: "ReferenceStrip.tracker",
        element: this.element,
        clickHandler: $.delegate(this, onStripClick),
        dragHandler: $.delegate(this, onStripDrag),
        scrollHandler: $.delegate(this, onStripScroll),
        enterHandler: $.delegate(this, onStripEnter),
        leaveHandler: $.delegate(this, onStripLeave),
        keyDownHandler: $.delegate(this, onKeyDown),
        keyHandler: $.delegate(this, onKeyPress),
        preProcessEventHandler: function(eventInfo) {
          if (eventInfo.eventType === "wheel") {
            eventInfo.preventDefault = true;
          }
        }
      });
      if (options.width && options.height) {
        this.element.style.width = options.width + "px";
        this.element.style.height = options.height + "px";
        viewer.addControl(this.element, { anchor: $.ControlAnchor.BOTTOM_LEFT });
      } else {
        if (options.scroll === "horizontal") {
          this.element.style.width = viewerSize.x * options.sizeRatio * viewer.tileSources.length + 12 * viewer.tileSources.length + "px";
          this.element.style.height = viewerSize.y * options.sizeRatio + "px";
          viewer.addControl(this.element, { anchor: $.ControlAnchor.BOTTOM_LEFT });
        } else {
          this.element.style.height = viewerSize.y * options.sizeRatio * viewer.tileSources.length + 12 * viewer.tileSources.length + "px";
          this.element.style.width = viewerSize.x * options.sizeRatio + "px";
          viewer.addControl(this.element, { anchor: $.ControlAnchor.TOP_LEFT });
        }
      }
      this.panelWidth = viewerSize.x * this.sizeRatio + 8;
      this.panelHeight = viewerSize.y * this.sizeRatio + 8;
      this.panels = [];
      this.miniViewers = {};
      for (i = 0;i < viewer.tileSources.length; i++) {
        element = $.makeNeutralElement("div");
        element.id = this.element.id + "-" + i;
        element.style.width = _this.panelWidth + "px";
        element.style.height = _this.panelHeight + "px";
        element.style.display = "inline";
        element.style["float"] = "left";
        element.style.cssFloat = "left";
        element.style.padding = "2px";
        $.setElementTouchActionNone(element);
        $.setElementPointerEventsNone(element);
        this.element.appendChild(element);
        element.activePanel = false;
        this.panels.push(element);
      }
      loadPanels(this, this.scroll === "vertical" ? viewerSize.y : viewerSize.x, 0);
      this.setFocus(0);
    };
    $.ReferenceStrip.prototype = {
      setFocus: function(page) {
        var element = this.element.querySelector("#" + this.element.id + "-" + page), viewerSize = $.getElementSize(this.viewer.canvas), scrollWidth = Number(this.element.style.width.replace("px", "")), scrollHeight = Number(this.element.style.height.replace("px", "")), offsetLeft = -Number(this.element.style.marginLeft.replace("px", "")), offsetTop = -Number(this.element.style.marginTop.replace("px", "")), offset;
        if (this.currentSelected !== element) {
          if (this.currentSelected) {
            this.currentSelected.style.background = "#000";
          }
          this.currentSelected = element;
          this.currentSelected.style.background = "#999";
          if (this.scroll === "horizontal") {
            offset = Number(page) * (this.panelWidth + 3);
            if (offset > offsetLeft + viewerSize.x - this.panelWidth) {
              offset = Math.min(offset, scrollWidth - viewerSize.x);
              this.element.style.marginLeft = -offset + "px";
              loadPanels(this, viewerSize.x, -offset);
            } else if (offset < offsetLeft) {
              offset = Math.max(0, offset - viewerSize.x / 2);
              this.element.style.marginLeft = -offset + "px";
              loadPanels(this, viewerSize.x, -offset);
            }
          } else {
            offset = Number(page) * (this.panelHeight + 3);
            if (offset > offsetTop + viewerSize.y - this.panelHeight) {
              offset = Math.min(offset, scrollHeight - viewerSize.y);
              this.element.style.marginTop = -offset + "px";
              loadPanels(this, viewerSize.y, -offset);
            } else if (offset < offsetTop) {
              offset = Math.max(0, offset - viewerSize.y / 2);
              this.element.style.marginTop = -offset + "px";
              loadPanels(this, viewerSize.y, -offset);
            }
          }
          this.currentPage = page;
          onStripEnter.call(this, { eventSource: this.tracker });
        }
      },
      update: function() {
        if (THIS[this.id].animating) {
          return true;
        }
        return false;
      },
      destroy: function() {
        if (this.miniViewers) {
          for (var key in this.miniViewers) {
            this.miniViewers[key].destroy();
          }
        }
        this.tracker.destroy();
        if (this.element) {
          this.viewer.removeControl(this.element);
        }
      }
    };
    function onStripClick(event) {
      if (event.quick) {
        var page;
        if (this.scroll === "horizontal") {
          page = Math.floor(event.position.x / (this.panelWidth + 4));
        } else {
          page = Math.floor(event.position.y / this.panelHeight);
        }
        this.viewer.goToPage(page);
      }
      this.element.focus();
    }
    function onStripDrag(event) {
      this.dragging = true;
      if (this.element) {
        var offsetLeft = Number(this.element.style.marginLeft.replace("px", "")), offsetTop = Number(this.element.style.marginTop.replace("px", "")), scrollWidth = Number(this.element.style.width.replace("px", "")), scrollHeight = Number(this.element.style.height.replace("px", "")), viewerSize = $.getElementSize(this.viewer.canvas);
        if (this.scroll === "horizontal") {
          if (-event.delta.x > 0) {
            if (offsetLeft > -(scrollWidth - viewerSize.x)) {
              this.element.style.marginLeft = offsetLeft + event.delta.x * 2 + "px";
              loadPanels(this, viewerSize.x, offsetLeft + event.delta.x * 2);
            }
          } else if (-event.delta.x < 0) {
            if (offsetLeft < 0) {
              this.element.style.marginLeft = offsetLeft + event.delta.x * 2 + "px";
              loadPanels(this, viewerSize.x, offsetLeft + event.delta.x * 2);
            }
          }
        } else {
          if (-event.delta.y > 0) {
            if (offsetTop > -(scrollHeight - viewerSize.y)) {
              this.element.style.marginTop = offsetTop + event.delta.y * 2 + "px";
              loadPanels(this, viewerSize.y, offsetTop + event.delta.y * 2);
            }
          } else if (-event.delta.y < 0) {
            if (offsetTop < 0) {
              this.element.style.marginTop = offsetTop + event.delta.y * 2 + "px";
              loadPanels(this, viewerSize.y, offsetTop + event.delta.y * 2);
            }
          }
        }
      }
    }
    function onStripScroll(event) {
      if (this.element) {
        var offsetLeft = Number(this.element.style.marginLeft.replace("px", "")), offsetTop = Number(this.element.style.marginTop.replace("px", "")), scrollWidth = Number(this.element.style.width.replace("px", "")), scrollHeight = Number(this.element.style.height.replace("px", "")), viewerSize = $.getElementSize(this.viewer.canvas);
        if (this.scroll === "horizontal") {
          if (event.scroll > 0) {
            if (offsetLeft > -(scrollWidth - viewerSize.x)) {
              this.element.style.marginLeft = offsetLeft - event.scroll * 60 + "px";
              loadPanels(this, viewerSize.x, offsetLeft - event.scroll * 60);
            }
          } else if (event.scroll < 0) {
            if (offsetLeft < 0) {
              this.element.style.marginLeft = offsetLeft - event.scroll * 60 + "px";
              loadPanels(this, viewerSize.x, offsetLeft - event.scroll * 60);
            }
          }
        } else {
          if (event.scroll < 0) {
            if (offsetTop > viewerSize.y - scrollHeight) {
              this.element.style.marginTop = offsetTop + event.scroll * 60 + "px";
              loadPanels(this, viewerSize.y, offsetTop + event.scroll * 60);
            }
          } else if (event.scroll > 0) {
            if (offsetTop < 0) {
              this.element.style.marginTop = offsetTop + event.scroll * 60 + "px";
              loadPanels(this, viewerSize.y, offsetTop + event.scroll * 60);
            }
          }
        }
        event.preventDefault = true;
      }
    }
    function loadPanels(strip, viewerSize, scroll) {
      var panelSize, activePanelsStart, activePanelsEnd, miniViewer, i, element;
      if (strip.scroll === "horizontal") {
        panelSize = strip.panelWidth;
      } else {
        panelSize = strip.panelHeight;
      }
      activePanelsStart = Math.ceil(viewerSize / panelSize) + 5;
      activePanelsEnd = Math.ceil((Math.abs(scroll) + viewerSize) / panelSize) + 1;
      activePanelsStart = activePanelsEnd - activePanelsStart;
      activePanelsStart = activePanelsStart < 0 ? 0 : activePanelsStart;
      for (i = activePanelsStart;i < activePanelsEnd && i < strip.panels.length; i++) {
        element = strip.panels[i];
        if (!element.activePanel) {
          var miniTileSource;
          var originalTileSource = strip.viewer.tileSources[i];
          if (originalTileSource.referenceStripThumbnailUrl) {
            miniTileSource = {
              type: "image",
              url: originalTileSource.referenceStripThumbnailUrl
            };
          } else {
            miniTileSource = originalTileSource;
          }
          miniViewer = new $.Viewer({
            id: element.id,
            tileSources: [miniTileSource],
            element,
            navigatorSizeRatio: strip.sizeRatio,
            showNavigator: false,
            mouseNavEnabled: false,
            showNavigationControl: false,
            showSequenceControl: false,
            immediateRender: true,
            blendTime: 0,
            animationTime: 0,
            loadTilesWithAjax: strip.viewer.loadTilesWithAjax,
            ajaxHeaders: strip.viewer.ajaxHeaders,
            drawer: "canvas"
          });
          $.setElementPointerEventsNone(miniViewer.canvas);
          $.setElementPointerEventsNone(miniViewer.container);
          miniViewer.innerTracker.setTracking(false);
          miniViewer.outerTracker.setTracking(false);
          strip.miniViewers[element.id] = miniViewer;
          element.activePanel = true;
        }
      }
    }
    function onStripEnter(event) {
      var element = event.eventSource.element;
      if (this.scroll === "horizontal") {
        element.style.marginBottom = "0px";
      } else {
        element.style.marginLeft = "0px";
      }
    }
    function onStripLeave(event) {
      var element = event.eventSource.element;
      if (this.scroll === "horizontal") {
        element.style.marginBottom = "-" + $.getElementSize(element).y / 2 + "px";
      } else {
        element.style.marginLeft = "-" + $.getElementSize(element).x / 2 + "px";
      }
    }
    function onKeyDown(event) {
      if (!event.ctrl && !event.alt && !event.meta) {
        switch (event.keyCode) {
          case 38:
            onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null });
            event.preventDefault = true;
            break;
          case 40:
            onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null });
            event.preventDefault = true;
            break;
          case 37:
            onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null });
            event.preventDefault = true;
            break;
          case 39:
            onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null });
            event.preventDefault = true;
            break;
          default:
            event.preventDefault = false;
            break;
        }
      } else {
        event.preventDefault = false;
      }
    }
    function onKeyPress(event) {
      if (!event.ctrl && !event.alt && !event.meta) {
        switch (event.keyCode) {
          case 61:
            onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null });
            event.preventDefault = true;
            break;
          case 45:
            onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null });
            event.preventDefault = true;
            break;
          case 48:
          case 119:
          case 87:
            onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null });
            event.preventDefault = true;
            break;
          case 115:
          case 83:
            onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null });
            event.preventDefault = true;
            break;
          case 97:
            onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null });
            event.preventDefault = true;
            break;
          case 100:
            onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null });
            event.preventDefault = true;
            break;
          default:
            event.preventDefault = false;
            break;
        }
      } else {
        event.preventDefault = false;
      }
    }
  })(OpenSeadragon);
  (function($) {
    $.DisplayRect = function(x, y, width, height, minLevel, maxLevel) {
      $.Rect.apply(this, [x, y, width, height]);
      this.minLevel = minLevel;
      this.maxLevel = maxLevel;
    };
    $.extend($.DisplayRect.prototype, $.Rect.prototype);
  })(OpenSeadragon);
  (function($) {
    $.Spring = function(options) {
      var args = arguments;
      if (typeof options !== "object") {
        options = {
          initial: args.length && typeof args[0] === "number" ? args[0] : undefined,
          springStiffness: args.length > 1 ? args[1].springStiffness : 5,
          animationTime: args.length > 1 ? args[1].animationTime : 1.5
        };
      }
      $.console.assert(typeof options.springStiffness === "number" && options.springStiffness !== 0, "[OpenSeadragon.Spring] options.springStiffness must be a non-zero number");
      $.console.assert(typeof options.animationTime === "number" && options.animationTime >= 0, "[OpenSeadragon.Spring] options.animationTime must be a number greater than or equal to 0");
      if (options.exponential) {
        this._exponential = true;
        delete options.exponential;
      }
      $.extend(true, this, options);
      this.current = {
        value: typeof this.initial === "number" ? this.initial : this._exponential ? 0 : 1,
        time: $.now()
      };
      $.console.assert(!this._exponential || this.current.value !== 0, "[OpenSeadragon.Spring] value must be non-zero for exponential springs");
      this.start = {
        value: this.current.value,
        time: this.current.time
      };
      this.target = {
        value: this.current.value,
        time: this.current.time
      };
      if (this._exponential) {
        this.start._logValue = Math.log(this.start.value);
        this.target._logValue = Math.log(this.target.value);
        this.current._logValue = Math.log(this.current.value);
      }
    };
    $.Spring.prototype = {
      resetTo: function(target) {
        $.console.assert(!this._exponential || target !== 0, "[OpenSeadragon.Spring.resetTo] target must be non-zero for exponential springs");
        this.start.value = this.target.value = this.current.value = target;
        this.start.time = this.target.time = this.current.time = $.now();
        if (this._exponential) {
          this.start._logValue = Math.log(this.start.value);
          this.target._logValue = Math.log(this.target.value);
          this.current._logValue = Math.log(this.current.value);
        }
      },
      springTo: function(target) {
        $.console.assert(!this._exponential || target !== 0, "[OpenSeadragon.Spring.springTo] target must be non-zero for exponential springs");
        this.start.value = this.current.value;
        this.start.time = this.current.time;
        this.target.value = target;
        this.target.time = this.start.time + 1000 * this.animationTime;
        if (this._exponential) {
          this.start._logValue = Math.log(this.start.value);
          this.target._logValue = Math.log(this.target.value);
        }
      },
      shiftBy: function(delta) {
        this.start.value += delta;
        this.target.value += delta;
        if (this._exponential) {
          $.console.assert(this.target.value !== 0 && this.start.value !== 0, "[OpenSeadragon.Spring.shiftBy] spring value must be non-zero for exponential springs");
          this.start._logValue = Math.log(this.start.value);
          this.target._logValue = Math.log(this.target.value);
        }
      },
      setExponential: function(value) {
        this._exponential = value;
        if (this._exponential) {
          $.console.assert(this.current.value !== 0 && this.target.value !== 0 && this.start.value !== 0, "[OpenSeadragon.Spring.setExponential] spring value must be non-zero for exponential springs");
          this.start._logValue = Math.log(this.start.value);
          this.target._logValue = Math.log(this.target.value);
          this.current._logValue = Math.log(this.current.value);
        }
      },
      update: function() {
        this.current.time = $.now();
        let startValue, targetValue;
        if (this._exponential) {
          startValue = this.start._logValue;
          targetValue = this.target._logValue;
        } else {
          startValue = this.start.value;
          targetValue = this.target.value;
        }
        if (this.current.time >= this.target.time) {
          this.current.value = this.target.value;
        } else {
          let currentValue = startValue + (targetValue - startValue) * transform(this.springStiffness, (this.current.time - this.start.time) / (this.target.time - this.start.time));
          if (this._exponential) {
            this.current.value = Math.exp(currentValue);
          } else {
            this.current.value = currentValue;
          }
        }
        return this.current.value !== this.target.value;
      },
      isAtTargetValue: function() {
        return this.current.value === this.target.value;
      }
    };
    function transform(stiffness, x) {
      return (1 - Math.exp(stiffness * -x)) / (1 - Math.exp(-stiffness));
    }
  })(OpenSeadragon);
  (function($) {
    $.ImageJob = function(options) {
      $.extend(true, this, {
        timeout: $.DEFAULT_SETTINGS.timeout,
        jobId: null,
        tries: 0
      }, options);
      this.data = null;
      this.userData = {};
      this.errorMsg = null;
    };
    $.ImageJob.prototype = {
      start: function() {
        this.tries++;
        var self = this;
        var selfAbort = this.abort;
        this.jobId = window.setTimeout(function() {
          self.finish(null, null, "Image load exceeded timeout (" + self.timeout + " ms)");
        }, this.timeout);
        this.abort = function() {
          self.source.downloadTileAbort(self);
          if (typeof selfAbort === "function") {
            selfAbort();
          }
        };
        this.source.downloadTileStart(this);
      },
      finish: function(data, request, errorMessage) {
        this.data = data;
        this.request = request;
        this.errorMsg = errorMessage;
        if (this.jobId) {
          window.clearTimeout(this.jobId);
        }
        this.callback(this);
      }
    };
    $.ImageLoader = function(options) {
      $.extend(true, this, {
        jobLimit: $.DEFAULT_SETTINGS.imageLoaderLimit,
        timeout: $.DEFAULT_SETTINGS.timeout,
        jobQueue: [],
        failedTiles: [],
        jobsInProgress: 0
      }, options);
    };
    $.ImageLoader.prototype = {
      addJob: function(options) {
        if (!options.source) {
          $.console.error("ImageLoader.prototype.addJob() requires [options.source]. " + "TileSource since new API defines how images are fetched. Creating a dummy TileSource.");
          var implementation = $.TileSource.prototype;
          options.source = {
            downloadTileStart: implementation.downloadTileStart,
            downloadTileAbort: implementation.downloadTileAbort
          };
        }
        var _this = this, complete = function(job) {
          completeJob(_this, job, options.callback);
        }, jobOptions = {
          src: options.src,
          tile: options.tile || {},
          source: options.source,
          loadWithAjax: options.loadWithAjax,
          ajaxHeaders: options.loadWithAjax ? options.ajaxHeaders : null,
          crossOriginPolicy: options.crossOriginPolicy,
          ajaxWithCredentials: options.ajaxWithCredentials,
          postData: options.postData,
          callback: complete,
          abort: options.abort,
          timeout: this.timeout
        }, newJob = new $.ImageJob(jobOptions);
        if (!this.jobLimit || this.jobsInProgress < this.jobLimit) {
          newJob.start();
          this.jobsInProgress++;
        } else {
          this.jobQueue.push(newJob);
        }
      },
      clear: function() {
        for (var i = 0;i < this.jobQueue.length; i++) {
          var job = this.jobQueue[i];
          if (typeof job.abort === "function") {
            job.abort();
          }
        }
        this.jobQueue = [];
      }
    };
    function completeJob(loader, job, callback) {
      if (job.errorMsg !== "" && (job.data === null || job.data === undefined) && job.tries < 1 + loader.tileRetryMax) {
        loader.failedTiles.push(job);
      }
      var nextJob;
      loader.jobsInProgress--;
      if ((!loader.jobLimit || loader.jobsInProgress < loader.jobLimit) && loader.jobQueue.length > 0) {
        nextJob = loader.jobQueue.shift();
        nextJob.start();
        loader.jobsInProgress++;
      }
      if (loader.tileRetryMax > 0 && loader.jobQueue.length === 0) {
        if ((!loader.jobLimit || loader.jobsInProgress < loader.jobLimit) && loader.failedTiles.length > 0) {
          nextJob = loader.failedTiles.shift();
          setTimeout(function() {
            nextJob.start();
          }, loader.tileRetryDelay);
          loader.jobsInProgress++;
        }
      }
      callback(job.data, job.errorMsg, job.request);
    }
  })(OpenSeadragon);
  (function($) {
    $.Tile = function(level, x, y, bounds, exists, url, context2D, loadWithAjax, ajaxHeaders, sourceBounds, postData, cacheKey) {
      this.level = level;
      this.x = x;
      this.y = y;
      this.bounds = bounds;
      this.positionedBounds = new OpenSeadragon.Rect(bounds.x, bounds.y, bounds.width, bounds.height);
      this.sourceBounds = sourceBounds;
      this.exists = exists;
      this._url = url;
      this.postData = postData;
      this.context2D = context2D;
      this.loadWithAjax = loadWithAjax;
      this.ajaxHeaders = ajaxHeaders;
      if (cacheKey === undefined) {
        $.console.warn("Tile constructor needs 'cacheKey' variable: creation tile cache" + " in Tile class is deprecated. TileSource.prototype.getTileHashKey will be used.");
        cacheKey = $.TileSource.prototype.getTileHashKey(level, x, y, url, ajaxHeaders, postData);
      }
      this.cacheKey = cacheKey;
      this.loaded = false;
      this.loading = false;
      this.element = null;
      this.imgElement = null;
      this.style = null;
      this.position = null;
      this.size = null;
      this.flipped = false;
      this.blendStart = null;
      this.opacity = null;
      this.squaredDistance = null;
      this.visibility = null;
      this.hasTransparency = false;
      this.beingDrawn = false;
      this.lastTouchTime = 0;
      this.isRightMost = false;
      this.isBottomMost = false;
    };
    $.Tile.prototype = {
      toString: function() {
        return this.level + "/" + this.x + "_" + this.y;
      },
      _hasTransparencyChannel: function() {
        console.warn("Tile.prototype._hasTransparencyChannel() has been " + "deprecated and will be removed in the future. Use TileSource.prototype.hasTransparency() instead.");
        return !!this.context2D || this.getUrl().match(".png");
      },
      get image() {
        $.console.error("[Tile.image] property has been deprecated. Use [Tile.prototype.getImage] instead.");
        return this.getImage();
      },
      get url() {
        $.console.error("[Tile.url] property has been deprecated. Use [Tile.prototype.getUrl] instead.");
        return this.getUrl();
      },
      getImage: function() {
        return this.cacheImageRecord.getImage();
      },
      getUrl: function() {
        if (typeof this._url === "function") {
          return this._url();
        }
        return this._url;
      },
      getCanvasContext: function() {
        return this.context2D || this.cacheImageRecord && this.cacheImageRecord.getRenderedContext();
      },
      getScaleForEdgeSmoothing: function() {
        var context;
        if (this.cacheImageRecord) {
          context = this.cacheImageRecord.getRenderedContext();
        } else if (this.context2D) {
          context = this.context2D;
        } else {
          $.console.warn("[Tile.drawCanvas] attempting to get tile scale %s when tile's not cached", this.toString());
          return 1;
        }
        return context.canvas.width / (this.size.x * $.pixelDensityRatio);
      },
      getTranslationForEdgeSmoothing: function(scale, canvasSize, sketchCanvasSize) {
        var x = Math.max(1, Math.ceil((sketchCanvasSize.x - canvasSize.x) / 2));
        var y = Math.max(1, Math.ceil((sketchCanvasSize.y - canvasSize.y) / 2));
        return new $.Point(x, y).minus(this.position.times($.pixelDensityRatio).times(scale || 1).apply(function(x2) {
          return x2 % 1;
        }));
      },
      unload: function() {
        if (this.imgElement && this.imgElement.parentNode) {
          this.imgElement.parentNode.removeChild(this.imgElement);
        }
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
        this.imgElement = null;
        this.loaded = false;
        this.loading = false;
      }
    };
  })(OpenSeadragon);
  (function($) {
    $.OverlayPlacement = $.Placement;
    $.OverlayRotationMode = $.freezeObject({
      NO_ROTATION: 1,
      EXACT: 2,
      BOUNDING_BOX: 3
    });
    $.Overlay = function(element, location, placement) {
      var options;
      if ($.isPlainObject(element)) {
        options = element;
      } else {
        options = {
          element,
          location,
          placement
        };
      }
      this.elementWrapper = document.createElement("div");
      this.element = options.element;
      this.elementWrapper.appendChild(this.element);
      if (this.element.id) {
        this.elementWrapper.id = "overlay-wrapper-" + this.element.id;
      } else {
        this.elementWrapper.id = "overlay-wrapper";
      }
      this.style = this.elementWrapper.style;
      this._init(options);
    };
    $.Overlay.prototype = {
      _init: function(options) {
        this.location = options.location;
        this.placement = options.placement === undefined ? $.Placement.TOP_LEFT : options.placement;
        this.onDraw = options.onDraw;
        this.checkResize = options.checkResize === undefined ? true : options.checkResize;
        this.width = options.width === undefined ? null : options.width;
        this.height = options.height === undefined ? null : options.height;
        this.rotationMode = options.rotationMode || $.OverlayRotationMode.EXACT;
        if (this.location instanceof $.Rect) {
          this.width = this.location.width;
          this.height = this.location.height;
          this.location = this.location.getTopLeft();
          this.placement = $.Placement.TOP_LEFT;
        }
        this.scales = this.width !== null && this.height !== null;
        this.bounds = new $.Rect(this.location.x, this.location.y, this.width, this.height);
        this.position = this.location;
      },
      adjust: function(position, size) {
        var properties = $.Placement.properties[this.placement];
        if (!properties) {
          return;
        }
        if (properties.isHorizontallyCentered) {
          position.x -= size.x / 2;
        } else if (properties.isRight) {
          position.x -= size.x;
        }
        if (properties.isVerticallyCentered) {
          position.y -= size.y / 2;
        } else if (properties.isBottom) {
          position.y -= size.y;
        }
      },
      destroy: function() {
        var element = this.elementWrapper;
        var style = this.style;
        if (element.parentNode) {
          element.parentNode.removeChild(element);
          if (element.prevElementParent) {
            style.display = "none";
            document.body.appendChild(element);
          }
        }
        this.onDraw = null;
        style.top = "";
        style.left = "";
        style.position = "";
        if (this.width !== null) {
          style.width = "";
        }
        if (this.height !== null) {
          style.height = "";
        }
        var transformOriginProp = $.getCssPropertyWithVendorPrefix("transformOrigin");
        var transformProp = $.getCssPropertyWithVendorPrefix("transform");
        if (transformOriginProp && transformProp) {
          style[transformOriginProp] = "";
          style[transformProp] = "";
        }
      },
      drawHTML: function(container, viewport) {
        var element = this.elementWrapper;
        if (element.parentNode !== container) {
          element.prevElementParent = element.parentNode;
          element.prevNextSibling = element.nextSibling;
          container.appendChild(element);
          this.style.position = "absolute";
          this.size = $.getElementSize(this.elementWrapper);
        }
        var positionAndSize = this._getOverlayPositionAndSize(viewport);
        var position = positionAndSize.position;
        var size = this.size = positionAndSize.size;
        var outerScale = "";
        if (viewport.overlayPreserveContentDirection) {
          outerScale = viewport.flipped ? " scaleX(-1)" : " scaleX(1)";
        }
        var rotate = viewport.flipped ? -positionAndSize.rotate : positionAndSize.rotate;
        var scale = viewport.flipped ? " scaleX(-1)" : "";
        if (this.onDraw) {
          this.onDraw(position, size, this.element);
        } else {
          var style = this.style;
          var innerStyle = this.element.style;
          innerStyle.display = "block";
          style.left = position.x + "px";
          style.top = position.y + "px";
          if (this.width !== null) {
            innerStyle.width = size.x + "px";
          }
          if (this.height !== null) {
            innerStyle.height = size.y + "px";
          }
          var transformOriginProp = $.getCssPropertyWithVendorPrefix("transformOrigin");
          var transformProp = $.getCssPropertyWithVendorPrefix("transform");
          if (transformOriginProp && transformProp) {
            if (rotate && !viewport.flipped) {
              innerStyle[transformProp] = "";
              style[transformOriginProp] = this._getTransformOrigin();
              style[transformProp] = "rotate(" + rotate + "deg)";
            } else if (!rotate && viewport.flipped) {
              innerStyle[transformProp] = outerScale;
              style[transformOriginProp] = this._getTransformOrigin();
              style[transformProp] = scale;
            } else if (rotate && viewport.flipped) {
              innerStyle[transformProp] = outerScale;
              style[transformOriginProp] = this._getTransformOrigin();
              style[transformProp] = "rotate(" + rotate + "deg)" + scale;
            } else {
              innerStyle[transformProp] = "";
              style[transformOriginProp] = "";
              style[transformProp] = "";
            }
          }
          style.display = "flex";
        }
      },
      _getOverlayPositionAndSize: function(viewport) {
        var position = viewport.pixelFromPoint(this.location, true);
        var size = this._getSizeInPixels(viewport);
        this.adjust(position, size);
        var rotate = 0;
        if (viewport.getRotation(true) && this.rotationMode !== $.OverlayRotationMode.NO_ROTATION) {
          if (this.rotationMode === $.OverlayRotationMode.BOUNDING_BOX && this.width !== null && this.height !== null) {
            var rect = new $.Rect(position.x, position.y, size.x, size.y);
            var boundingBox = this._getBoundingBox(rect, viewport.getRotation(true));
            position = boundingBox.getTopLeft();
            size = boundingBox.getSize();
          } else {
            rotate = viewport.getRotation(true);
          }
        }
        if (viewport.flipped) {
          position.x = viewport.getContainerSize().x - position.x;
        }
        return {
          position,
          size,
          rotate
        };
      },
      _getSizeInPixels: function(viewport) {
        var width = this.size.x;
        var height = this.size.y;
        if (this.width !== null || this.height !== null) {
          var scaledSize = viewport.deltaPixelsFromPointsNoRotate(new $.Point(this.width || 0, this.height || 0), true);
          if (this.width !== null) {
            width = scaledSize.x;
          }
          if (this.height !== null) {
            height = scaledSize.y;
          }
        }
        if (this.checkResize && (this.width === null || this.height === null)) {
          var eltSize = this.size = $.getElementSize(this.elementWrapper);
          if (this.width === null) {
            width = eltSize.x;
          }
          if (this.height === null) {
            height = eltSize.y;
          }
        }
        return new $.Point(width, height);
      },
      _getBoundingBox: function(rect, degrees) {
        var refPoint = this._getPlacementPoint(rect);
        return rect.rotate(degrees, refPoint).getBoundingBox();
      },
      _getPlacementPoint: function(rect) {
        var result = new $.Point(rect.x, rect.y);
        var properties = $.Placement.properties[this.placement];
        if (properties) {
          if (properties.isHorizontallyCentered) {
            result.x += rect.width / 2;
          } else if (properties.isRight) {
            result.x += rect.width;
          }
          if (properties.isVerticallyCentered) {
            result.y += rect.height / 2;
          } else if (properties.isBottom) {
            result.y += rect.height;
          }
        }
        return result;
      },
      _getTransformOrigin: function() {
        var result = "";
        var properties = $.Placement.properties[this.placement];
        if (!properties) {
          return result;
        }
        if (properties.isLeft) {
          result = "left";
        } else if (properties.isRight) {
          result = "right";
        }
        if (properties.isTop) {
          result += " top";
        } else if (properties.isBottom) {
          result += " bottom";
        }
        return result;
      },
      update: function(location, placement) {
        var options = $.isPlainObject(location) ? location : {
          location,
          placement
        };
        this._init({
          location: options.location || this.location,
          placement: options.placement !== undefined ? options.placement : this.placement,
          onDraw: options.onDraw || this.onDraw,
          checkResize: options.checkResize || this.checkResize,
          width: options.width !== undefined ? options.width : this.width,
          height: options.height !== undefined ? options.height : this.height,
          rotationMode: options.rotationMode || this.rotationMode
        });
      },
      getBounds: function(viewport) {
        $.console.assert(viewport, "A viewport must now be passed to Overlay.getBounds.");
        var width = this.width;
        var height = this.height;
        if (width === null || height === null) {
          var size = viewport.deltaPointsFromPixelsNoRotate(this.size, true);
          if (width === null) {
            width = size.x;
          }
          if (height === null) {
            height = size.y;
          }
        }
        var location = this.location.clone();
        this.adjust(location, new $.Point(width, height));
        return this._adjustBoundsForRotation(viewport, new $.Rect(location.x, location.y, width, height));
      },
      _adjustBoundsForRotation: function(viewport, bounds) {
        if (!viewport || viewport.getRotation(true) === 0 || this.rotationMode === $.OverlayRotationMode.EXACT) {
          return bounds;
        }
        if (this.rotationMode === $.OverlayRotationMode.BOUNDING_BOX) {
          if (this.width === null || this.height === null) {
            return bounds;
          }
          var positionAndSize = this._getOverlayPositionAndSize(viewport);
          return viewport.viewerElementToViewportRectangle(new $.Rect(positionAndSize.position.x, positionAndSize.position.y, positionAndSize.size.x, positionAndSize.size.y));
        }
        return bounds.rotate(-viewport.getRotation(true), this._getPlacementPoint(bounds));
      }
    };
  })(OpenSeadragon);
  (function($) {
    const OpenSeadragon2 = $;
    OpenSeadragon2.DrawerBase = class DrawerBase {
      constructor(options) {
        $.console.assert(options.viewer, "[Drawer] options.viewer is required");
        $.console.assert(options.viewport, "[Drawer] options.viewport is required");
        $.console.assert(options.element, "[Drawer] options.element is required");
        this.viewer = options.viewer;
        this.viewport = options.viewport;
        this.debugGridColor = typeof options.debugGridColor === "string" ? [options.debugGridColor] : options.debugGridColor || $.DEFAULT_SETTINGS.debugGridColor;
        this.options = options.options || {};
        this.container = $.getElement(options.element);
        this._renderingTarget = this._createDrawingElement();
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.position = "absolute";
        this.canvas.style.left = "0";
        $.setElementOpacity(this.canvas, this.viewer.opacity, true);
        $.setElementPointerEventsNone(this.canvas);
        $.setElementTouchActionNone(this.canvas);
        this.container.style.textAlign = "left";
        this.container.appendChild(this.canvas);
        this._checkForAPIOverrides();
      }
      get canvas() {
        return this._renderingTarget;
      }
      get element() {
        $.console.error("Drawer.element is deprecated. Use Drawer.container instead.");
        return this.container;
      }
      getType() {
        $.console.error("Drawer.getType must be implemented by child class");
        return;
      }
      static isSupported() {
        $.console.error("Drawer.isSupported must be implemented by child class");
      }
      _createDrawingElement() {
        $.console.error("Drawer._createDrawingElement must be implemented by child class");
        return null;
      }
      draw(tiledImages) {
        $.console.error("Drawer.draw must be implemented by child class");
      }
      canRotate() {
        $.console.error("Drawer.canRotate must be implemented by child class");
      }
      destroy() {
        $.console.error("Drawer.destroy must be implemented by child class");
      }
      minimumOverlapRequired(tiledImage) {
        return false;
      }
      setImageSmoothingEnabled(imageSmoothingEnabled) {
        $.console.error("Drawer.setImageSmoothingEnabled must be implemented by child class");
      }
      drawDebuggingRect(rect) {
        $.console.warn("[drawer].drawDebuggingRect is not implemented by this drawer");
      }
      clear() {
        $.console.warn("[drawer].clear() is deprecated. The drawer is responsible for clearing itself as needed before drawing tiles.");
      }
      _checkForAPIOverrides() {
        if (this._createDrawingElement === $.DrawerBase.prototype._createDrawingElement) {
          throw new Error("[drawer]._createDrawingElement must be implemented by child class");
        }
        if (this.draw === $.DrawerBase.prototype.draw) {
          throw new Error("[drawer].draw must be implemented by child class");
        }
        if (this.canRotate === $.DrawerBase.prototype.canRotate) {
          throw new Error("[drawer].canRotate must be implemented by child class");
        }
        if (this.destroy === $.DrawerBase.prototype.destroy) {
          throw new Error("[drawer].destroy must be implemented by child class");
        }
        if (this.setImageSmoothingEnabled === $.DrawerBase.prototype.setImageSmoothingEnabled) {
          throw new Error("[drawer].setImageSmoothingEnabled must be implemented by child class");
        }
      }
      viewportToDrawerRectangle(rectangle) {
        var topLeft = this.viewport.pixelFromPointNoRotate(rectangle.getTopLeft(), true);
        var size = this.viewport.deltaPixelsFromPointsNoRotate(rectangle.getSize(), true);
        return new $.Rect(topLeft.x * $.pixelDensityRatio, topLeft.y * $.pixelDensityRatio, size.x * $.pixelDensityRatio, size.y * $.pixelDensityRatio);
      }
      viewportCoordToDrawerCoord(point) {
        var vpPoint = this.viewport.pixelFromPointNoRotate(point, true);
        return new $.Point(vpPoint.x * $.pixelDensityRatio, vpPoint.y * $.pixelDensityRatio);
      }
      _calculateCanvasSize() {
        var pixelDensityRatio = $.pixelDensityRatio;
        var viewportSize = this.viewport.getContainerSize();
        return new OpenSeadragon2.Point(Math.round(viewportSize.x * pixelDensityRatio), Math.round(viewportSize.y * pixelDensityRatio));
      }
      _raiseTiledImageDrawnEvent(tiledImage, tiles) {
        if (!this.viewer) {
          return;
        }
        this.viewer.raiseEvent("tiled-image-drawn", {
          tiledImage,
          tiles
        });
      }
      _raiseDrawerErrorEvent(tiledImage, errorMessage) {
        if (!this.viewer) {
          return;
        }
        this.viewer.raiseEvent("drawer-error", {
          tiledImage,
          drawer: this,
          error: errorMessage
        });
      }
    };
  })(OpenSeadragon);
  (function($) {
    const OpenSeadragon2 = $;

    class HTMLDrawer extends OpenSeadragon2.DrawerBase {
      constructor(options) {
        super(options);
        this.viewer.rejectEventHandler("tile-drawing", "The HTMLDrawer does not raise the tile-drawing event");
        this.viewer.allowEventHandler("tile-drawn");
      }
      static isSupported() {
        return true;
      }
      getType() {
        return "html";
      }
      minimumOverlapRequired(tiledImage) {
        return true;
      }
      _createDrawingElement() {
        let canvas = $.makeNeutralElement("div");
        return canvas;
      }
      draw(tiledImages) {
        var _this = this;
        this._prepareNewFrame();
        tiledImages.forEach(function(tiledImage) {
          if (tiledImage.opacity !== 0) {
            _this._drawTiles(tiledImage);
          }
        });
      }
      canRotate() {
        return false;
      }
      destroy() {
        this.container.removeChild(this.canvas);
      }
      setImageSmoothingEnabled() {}
      _prepareNewFrame() {
        this.canvas.innerHTML = "";
      }
      _drawTiles(tiledImage) {
        var lastDrawn = tiledImage.getTilesToDraw().map((info) => info.tile);
        if (tiledImage.opacity === 0 || lastDrawn.length === 0 && !tiledImage.placeholderFillStyle) {
          return;
        }
        for (var i = lastDrawn.length - 1;i >= 0; i--) {
          var tile = lastDrawn[i];
          this._drawTile(tile);
          if (this.viewer) {
            this.viewer.raiseEvent("tile-drawn", {
              tiledImage,
              tile
            });
          }
        }
      }
      _drawTile(tile) {
        $.console.assert(tile, "[Drawer._drawTile] tile is required");
        let container = this.canvas;
        if (!tile.cacheImageRecord) {
          $.console.warn("[Drawer._drawTileToHTML] attempting to draw tile %s when it's not cached", tile.toString());
          return;
        }
        if (!tile.loaded) {
          $.console.warn("Attempting to draw tile %s when it's not yet loaded.", tile.toString());
          return;
        }
        if (!tile.element) {
          var image = tile.getImage();
          if (!image) {
            return;
          }
          tile.element = $.makeNeutralElement("div");
          tile.imgElement = image.cloneNode();
          tile.imgElement.style.msInterpolationMode = "nearest-neighbor";
          tile.imgElement.style.width = "100%";
          tile.imgElement.style.height = "100%";
          tile.style = tile.element.style;
          tile.style.position = "absolute";
        }
        if (tile.element.parentNode !== container) {
          container.appendChild(tile.element);
        }
        if (tile.imgElement.parentNode !== tile.element) {
          tile.element.appendChild(tile.imgElement);
        }
        tile.style.top = tile.position.y + "px";
        tile.style.left = tile.position.x + "px";
        tile.style.height = tile.size.y + "px";
        tile.style.width = tile.size.x + "px";
        if (tile.flipped) {
          tile.style.transform = "scaleX(-1)";
        }
        $.setElementOpacity(tile.element, tile.opacity);
      }
    }
    $.HTMLDrawer = HTMLDrawer;
  })(OpenSeadragon);
  (function($) {
    const OpenSeadragon2 = $;

    class CanvasDrawer extends OpenSeadragon2.DrawerBase {
      constructor(options) {
        super(options);
        this.context = this.canvas.getContext("2d");
        this.sketchCanvas = null;
        this.sketchContext = null;
        this._imageSmoothingEnabled = true;
        this.viewer.allowEventHandler("tile-drawn");
        this.viewer.allowEventHandler("tile-drawing");
      }
      static isSupported() {
        return $.supportsCanvas;
      }
      getType() {
        return "canvas";
      }
      _createDrawingElement() {
        let canvas = $.makeNeutralElement("canvas");
        let viewportSize = this._calculateCanvasSize();
        canvas.width = viewportSize.x;
        canvas.height = viewportSize.y;
        return canvas;
      }
      draw(tiledImages) {
        this._prepareNewFrame();
        if (this.viewer.viewport.getFlip() !== this._viewportFlipped) {
          this._flip();
        }
        for (const tiledImage of tiledImages) {
          if (tiledImage.opacity !== 0) {
            this._drawTiles(tiledImage);
          }
        }
      }
      canRotate() {
        return true;
      }
      destroy() {
        this.canvas.width = 1;
        this.canvas.height = 1;
        this.sketchCanvas = null;
        this.sketchContext = null;
        this.container.removeChild(this.canvas);
      }
      minimumOverlapRequired(tiledImage) {
        return true;
      }
      setImageSmoothingEnabled(imageSmoothingEnabled) {
        this._imageSmoothingEnabled = !!imageSmoothingEnabled;
        this._updateImageSmoothingEnabled(this.context);
        this.viewer.forceRedraw();
      }
      drawDebuggingRect(rect) {
        var context = this.context;
        context.save();
        context.lineWidth = 2 * $.pixelDensityRatio;
        context.strokeStyle = this.debugGridColor[0];
        context.fillStyle = this.debugGridColor[0];
        context.strokeRect(rect.x * $.pixelDensityRatio, rect.y * $.pixelDensityRatio, rect.width * $.pixelDensityRatio, rect.height * $.pixelDensityRatio);
        context.restore();
      }
      get _viewportFlipped() {
        return this.context.getTransform().a < 0;
      }
      _raiseTileDrawingEvent(tiledImage, context, tile, rendered) {
        this.viewer.raiseEvent("tile-drawing", {
          tiledImage,
          context,
          tile,
          rendered
        });
      }
      _prepareNewFrame() {
        var viewportSize = this._calculateCanvasSize();
        if (this.canvas.width !== viewportSize.x || this.canvas.height !== viewportSize.y) {
          this.canvas.width = viewportSize.x;
          this.canvas.height = viewportSize.y;
          this._updateImageSmoothingEnabled(this.context);
          if (this.sketchCanvas !== null) {
            var sketchCanvasSize = this._calculateSketchCanvasSize();
            this.sketchCanvas.width = sketchCanvasSize.x;
            this.sketchCanvas.height = sketchCanvasSize.y;
            this._updateImageSmoothingEnabled(this.sketchContext);
          }
        }
        this._clear();
      }
      _clear(useSketch, bounds) {
        var context = this._getContext(useSketch);
        if (bounds) {
          context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
        } else {
          var canvas = context.canvas;
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      _drawTiles(tiledImage) {
        var lastDrawn = tiledImage.getTilesToDraw().map((info) => info.tile);
        if (tiledImage.opacity === 0 || lastDrawn.length === 0 && !tiledImage.placeholderFillStyle) {
          return;
        }
        var tile = lastDrawn[0];
        var useSketch;
        if (tile) {
          useSketch = tiledImage.opacity < 1 || tiledImage.compositeOperation && tiledImage.compositeOperation !== "source-over" || !tiledImage._isBottomItem() && tiledImage.source.hasTransparency(tile.context2D, tile.getUrl(), tile.ajaxHeaders, tile.postData);
        }
        var sketchScale;
        var sketchTranslate;
        var zoom = this.viewport.getZoom(true);
        var imageZoom = tiledImage.viewportToImageZoom(zoom);
        if (lastDrawn.length > 1 && imageZoom > tiledImage.smoothTileEdgesMinZoom && !tiledImage.iOSDevice && tiledImage.getRotation(true) % 360 === 0) {
          useSketch = true;
          sketchScale = tile.getScaleForEdgeSmoothing();
          sketchTranslate = tile.getTranslationForEdgeSmoothing(sketchScale, this._getCanvasSize(false), this._getCanvasSize(true));
        }
        var bounds;
        if (useSketch) {
          if (!sketchScale) {
            bounds = this.viewport.viewportToViewerElementRectangle(tiledImage.getClippedBounds(true)).getIntegerBoundingBox();
            bounds = bounds.times($.pixelDensityRatio);
          }
          this._clear(true, bounds);
        }
        if (!sketchScale) {
          this._setRotations(tiledImage, useSketch);
        }
        var usedClip = false;
        if (tiledImage._clip) {
          this._saveContext(useSketch);
          var box = tiledImage.imageToViewportRectangle(tiledImage._clip, true);
          box = box.rotate(-tiledImage.getRotation(true), tiledImage._getRotationPoint(true));
          var clipRect = this.viewportToDrawerRectangle(box);
          if (sketchScale) {
            clipRect = clipRect.times(sketchScale);
          }
          if (sketchTranslate) {
            clipRect = clipRect.translate(sketchTranslate);
          }
          this._setClip(clipRect, useSketch);
          usedClip = true;
        }
        if (tiledImage._croppingPolygons) {
          var self = this;
          if (!usedClip) {
            this._saveContext(useSketch);
          }
          try {
            var polygons = tiledImage._croppingPolygons.map(function(polygon) {
              return polygon.map(function(coord) {
                var point = tiledImage.imageToViewportCoordinates(coord.x, coord.y, true).rotate(-tiledImage.getRotation(true), tiledImage._getRotationPoint(true));
                var clipPoint = self.viewportCoordToDrawerCoord(point);
                if (sketchScale) {
                  clipPoint = clipPoint.times(sketchScale);
                }
                if (sketchTranslate) {
                  clipPoint = clipPoint.plus(sketchTranslate);
                }
                return clipPoint;
              });
            });
            this._clipWithPolygons(polygons, useSketch);
          } catch (e) {
            $.console.error(e);
          }
          usedClip = true;
        }
        tiledImage._hasOpaqueTile = false;
        if (tiledImage.placeholderFillStyle && tiledImage._hasOpaqueTile === false) {
          let placeholderRect = this.viewportToDrawerRectangle(tiledImage.getBoundsNoRotate(true));
          if (sketchScale) {
            placeholderRect = placeholderRect.times(sketchScale);
          }
          if (sketchTranslate) {
            placeholderRect = placeholderRect.translate(sketchTranslate);
          }
          let fillStyle = null;
          if (typeof tiledImage.placeholderFillStyle === "function") {
            fillStyle = tiledImage.placeholderFillStyle(tiledImage, this.context);
          } else {
            fillStyle = tiledImage.placeholderFillStyle;
          }
          this._drawRectangle(placeholderRect, fillStyle, useSketch);
        }
        var subPixelRoundingRule = determineSubPixelRoundingRule(tiledImage.subPixelRoundingForTransparency);
        var shouldRoundPositionAndSize = false;
        if (subPixelRoundingRule === $.SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS) {
          shouldRoundPositionAndSize = true;
        } else if (subPixelRoundingRule === $.SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST) {
          var isAnimating = this.viewer && this.viewer.isAnimating();
          shouldRoundPositionAndSize = !isAnimating;
        }
        for (var i = 0;i < lastDrawn.length; i++) {
          tile = lastDrawn[i];
          this._drawTile(tile, tiledImage, useSketch, sketchScale, sketchTranslate, shouldRoundPositionAndSize, tiledImage.source);
          if (this.viewer) {
            this.viewer.raiseEvent("tile-drawn", {
              tiledImage,
              tile
            });
          }
        }
        if (usedClip) {
          this._restoreContext(useSketch);
        }
        if (!sketchScale) {
          if (tiledImage.getRotation(true) % 360 !== 0) {
            this._restoreRotationChanges(useSketch);
          }
          if (this.viewport.getRotation(true) % 360 !== 0) {
            this._restoreRotationChanges(useSketch);
          }
        }
        if (useSketch) {
          if (sketchScale) {
            this._setRotations(tiledImage);
          }
          this.blendSketch({
            opacity: tiledImage.opacity,
            scale: sketchScale,
            translate: sketchTranslate,
            compositeOperation: tiledImage.compositeOperation,
            bounds
          });
          if (sketchScale) {
            if (tiledImage.getRotation(true) % 360 !== 0) {
              this._restoreRotationChanges(false);
            }
            if (this.viewport.getRotation(true) % 360 !== 0) {
              this._restoreRotationChanges(false);
            }
          }
        }
        this._drawDebugInfo(tiledImage, lastDrawn);
        this._raiseTiledImageDrawnEvent(tiledImage, lastDrawn);
      }
      _drawDebugInfo(tiledImage, lastDrawn) {
        if (tiledImage.debugMode) {
          for (var i = lastDrawn.length - 1;i >= 0; i--) {
            var tile = lastDrawn[i];
            try {
              this._drawDebugInfoOnTile(tile, lastDrawn.length, i, tiledImage);
            } catch (e) {
              $.console.error(e);
            }
          }
        }
      }
      _clipWithPolygons(polygons, useSketch) {
        var context = this._getContext(useSketch);
        context.beginPath();
        for (const polygon of polygons) {
          for (const [i, coord] of polygon.entries()) {
            context[i === 0 ? "moveTo" : "lineTo"](coord.x, coord.y);
          }
        }
        context.clip();
      }
      _drawTile(tile, tiledImage, useSketch, scale, translate, shouldRoundPositionAndSize, source) {
        $.console.assert(tile, "[Drawer._drawTile] tile is required");
        $.console.assert(tiledImage, "[Drawer._drawTile] drawingHandler is required");
        var context = this._getContext(useSketch);
        scale = scale || 1;
        this._drawTileToCanvas(tile, context, tiledImage, scale, translate, shouldRoundPositionAndSize, source);
      }
      _drawTileToCanvas(tile, context, tiledImage, scale, translate, shouldRoundPositionAndSize, source) {
        var position = tile.position.times($.pixelDensityRatio), size = tile.size.times($.pixelDensityRatio), rendered;
        if (!tile.context2D && !tile.cacheImageRecord) {
          $.console.warn("[Drawer._drawTileToCanvas] attempting to draw tile %s when it's not cached", tile.toString());
          return;
        }
        rendered = tile.getCanvasContext();
        if (!tile.loaded || !rendered) {
          $.console.warn("Attempting to draw tile %s when it's not yet loaded.", tile.toString());
          return;
        }
        context.save();
        if (typeof scale === "number" && scale !== 1) {
          position = position.times(scale);
          size = size.times(scale);
        }
        if (translate instanceof $.Point) {
          position = position.plus(translate);
        }
        if (context.globalAlpha === 1 && tile.hasTransparency) {
          if (shouldRoundPositionAndSize) {
            position.x = Math.round(position.x);
            position.y = Math.round(position.y);
            size.x = Math.round(size.x);
            size.y = Math.round(size.y);
          }
          context.clearRect(position.x, position.y, size.x, size.y);
        }
        this._raiseTileDrawingEvent(tiledImage, context, tile, rendered);
        var sourceWidth, sourceHeight;
        if (tile.sourceBounds) {
          sourceWidth = Math.min(tile.sourceBounds.width, rendered.canvas.width);
          sourceHeight = Math.min(tile.sourceBounds.height, rendered.canvas.height);
        } else {
          sourceWidth = rendered.canvas.width;
          sourceHeight = rendered.canvas.height;
        }
        context.translate(position.x + size.x / 2, 0);
        if (tile.flipped) {
          context.scale(-1, 1);
        }
        context.drawImage(rendered.canvas, 0, 0, sourceWidth, sourceHeight, -size.x / 2, position.y, size.x, size.y);
        context.restore();
      }
      _getContext(useSketch) {
        var context = this.context;
        if (useSketch) {
          if (this.sketchCanvas === null) {
            this.sketchCanvas = document.createElement("canvas");
            var sketchCanvasSize = this._calculateSketchCanvasSize();
            this.sketchCanvas.width = sketchCanvasSize.x;
            this.sketchCanvas.height = sketchCanvasSize.y;
            this.sketchContext = this.sketchCanvas.getContext("2d");
            if (this.viewport.getRotation() === 0) {
              var self = this;
              this.viewer.addHandler("rotate", function resizeSketchCanvas() {
                if (self.viewport.getRotation() === 0) {
                  return;
                }
                self.viewer.removeHandler("rotate", resizeSketchCanvas);
                var sketchCanvasSize2 = self._calculateSketchCanvasSize();
                self.sketchCanvas.width = sketchCanvasSize2.x;
                self.sketchCanvas.height = sketchCanvasSize2.y;
              });
            }
            this._updateImageSmoothingEnabled(this.sketchContext);
          }
          context = this.sketchContext;
        }
        return context;
      }
      _saveContext(useSketch) {
        this._getContext(useSketch).save();
      }
      _restoreContext(useSketch) {
        this._getContext(useSketch).restore();
      }
      _setClip(rect, useSketch) {
        var context = this._getContext(useSketch);
        context.beginPath();
        context.rect(rect.x, rect.y, rect.width, rect.height);
        context.clip();
      }
      _drawRectangle(rect, fillStyle, useSketch) {
        var context = this._getContext(useSketch);
        context.save();
        context.fillStyle = fillStyle;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
      }
      blendSketch(opacity, scale, translate, compositeOperation) {
        var options = opacity;
        if (!$.isPlainObject(options)) {
          options = {
            opacity,
            scale,
            translate,
            compositeOperation
          };
        }
        opacity = options.opacity;
        compositeOperation = options.compositeOperation;
        var bounds = options.bounds;
        this.context.save();
        this.context.globalAlpha = opacity;
        if (compositeOperation) {
          this.context.globalCompositeOperation = compositeOperation;
        }
        if (bounds) {
          if (bounds.x < 0) {
            bounds.width += bounds.x;
            bounds.x = 0;
          }
          if (bounds.x + bounds.width > this.canvas.width) {
            bounds.width = this.canvas.width - bounds.x;
          }
          if (bounds.y < 0) {
            bounds.height += bounds.y;
            bounds.y = 0;
          }
          if (bounds.y + bounds.height > this.canvas.height) {
            bounds.height = this.canvas.height - bounds.y;
          }
          this.context.drawImage(this.sketchCanvas, bounds.x, bounds.y, bounds.width, bounds.height, bounds.x, bounds.y, bounds.width, bounds.height);
        } else {
          scale = options.scale || 1;
          translate = options.translate;
          var position = translate instanceof $.Point ? translate : new $.Point(0, 0);
          var widthExt = 0;
          var heightExt = 0;
          if (translate) {
            var widthDiff = this.sketchCanvas.width - this.canvas.width;
            var heightDiff = this.sketchCanvas.height - this.canvas.height;
            widthExt = Math.round(widthDiff / 2);
            heightExt = Math.round(heightDiff / 2);
          }
          this.context.drawImage(this.sketchCanvas, position.x - widthExt * scale, position.y - heightExt * scale, (this.canvas.width + 2 * widthExt) * scale, (this.canvas.height + 2 * heightExt) * scale, -widthExt, -heightExt, this.canvas.width + 2 * widthExt, this.canvas.height + 2 * heightExt);
        }
        this.context.restore();
      }
      _drawDebugInfoOnTile(tile, count, i, tiledImage) {
        var colorIndex = this.viewer.world.getIndexOfItem(tiledImage) % this.debugGridColor.length;
        var context = this.context;
        context.save();
        context.lineWidth = 2 * $.pixelDensityRatio;
        context.font = "small-caps bold " + 13 * $.pixelDensityRatio + "px arial";
        context.strokeStyle = this.debugGridColor[colorIndex];
        context.fillStyle = this.debugGridColor[colorIndex];
        this._setRotations(tiledImage);
        if (this._viewportFlipped) {
          this._flip({ point: tile.position.plus(tile.size.divide(2)) });
        }
        context.strokeRect(tile.position.x * $.pixelDensityRatio, tile.position.y * $.pixelDensityRatio, tile.size.x * $.pixelDensityRatio, tile.size.y * $.pixelDensityRatio);
        var tileCenterX = (tile.position.x + tile.size.x / 2) * $.pixelDensityRatio;
        var tileCenterY = (tile.position.y + tile.size.y / 2) * $.pixelDensityRatio;
        context.translate(tileCenterX, tileCenterY);
        const angleInDegrees = this.viewport.getRotation(true);
        context.rotate(Math.PI / 180 * -angleInDegrees);
        context.translate(-tileCenterX, -tileCenterY);
        if (tile.x === 0 && tile.y === 0) {
          context.fillText("Zoom: " + this.viewport.getZoom(), tile.position.x * $.pixelDensityRatio, (tile.position.y - 30) * $.pixelDensityRatio);
          context.fillText("Pan: " + this.viewport.getBounds().toString(), tile.position.x * $.pixelDensityRatio, (tile.position.y - 20) * $.pixelDensityRatio);
        }
        context.fillText("Level: " + tile.level, (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 20) * $.pixelDensityRatio);
        context.fillText("Column: " + tile.x, (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 30) * $.pixelDensityRatio);
        context.fillText("Row: " + tile.y, (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 40) * $.pixelDensityRatio);
        context.fillText("Order: " + i + " of " + count, (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 50) * $.pixelDensityRatio);
        context.fillText("Size: " + tile.size.toString(), (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 60) * $.pixelDensityRatio);
        context.fillText("Position: " + tile.position.toString(), (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 70) * $.pixelDensityRatio);
        if (this.viewport.getRotation(true) % 360 !== 0) {
          this._restoreRotationChanges();
        }
        if (tiledImage.getRotation(true) % 360 !== 0) {
          this._restoreRotationChanges();
        }
        context.restore();
      }
      _updateImageSmoothingEnabled(context) {
        context.msImageSmoothingEnabled = this._imageSmoothingEnabled;
        context.imageSmoothingEnabled = this._imageSmoothingEnabled;
      }
      _getCanvasSize(sketch) {
        var canvas = this._getContext(sketch).canvas;
        return new $.Point(canvas.width, canvas.height);
      }
      _getCanvasCenter() {
        return new $.Point(this.canvas.width / 2, this.canvas.height / 2);
      }
      _setRotations(tiledImage, useSketch = false) {
        var saveContext = false;
        if (this.viewport.getRotation(true) % 360 !== 0) {
          this._offsetForRotation({
            degrees: this.viewport.getRotation(true),
            useSketch,
            saveContext
          });
          saveContext = false;
        }
        if (tiledImage.getRotation(true) % 360 !== 0) {
          this._offsetForRotation({
            degrees: tiledImage.getRotation(true),
            point: this.viewport.pixelFromPointNoRotate(tiledImage._getRotationPoint(true), true),
            useSketch,
            saveContext
          });
        }
      }
      _offsetForRotation(options) {
        var point = options.point ? options.point.times($.pixelDensityRatio) : this._getCanvasCenter();
        var context = this._getContext(options.useSketch);
        context.save();
        context.translate(point.x, point.y);
        context.rotate(Math.PI / 180 * options.degrees);
        context.translate(-point.x, -point.y);
      }
      _flip(options) {
        options = options || {};
        var point = options.point ? options.point.times($.pixelDensityRatio) : this._getCanvasCenter();
        var context = this._getContext(options.useSketch);
        context.translate(point.x, 0);
        context.scale(-1, 1);
        context.translate(-point.x, 0);
      }
      _restoreRotationChanges(useSketch) {
        var context = this._getContext(useSketch);
        context.restore();
      }
      _calculateCanvasSize() {
        var pixelDensityRatio = $.pixelDensityRatio;
        var viewportSize = this.viewport.getContainerSize();
        return {
          x: Math.round(viewportSize.x * pixelDensityRatio),
          y: Math.round(viewportSize.y * pixelDensityRatio)
        };
      }
      _calculateSketchCanvasSize() {
        var canvasSize = this._calculateCanvasSize();
        if (this.viewport.getRotation() === 0) {
          return canvasSize;
        }
        var sketchCanvasSize = Math.ceil(Math.sqrt(canvasSize.x * canvasSize.x + canvasSize.y * canvasSize.y));
        return {
          x: sketchCanvasSize,
          y: sketchCanvasSize
        };
      }
    }
    $.CanvasDrawer = CanvasDrawer;
    var DEFAULT_SUBPIXEL_ROUNDING_RULE = $.SUBPIXEL_ROUNDING_OCCURRENCES.NEVER;
    function isSubPixelRoundingRuleUnknown(value) {
      return value !== $.SUBPIXEL_ROUNDING_OCCURRENCES.ALWAYS && value !== $.SUBPIXEL_ROUNDING_OCCURRENCES.ONLY_AT_REST && value !== $.SUBPIXEL_ROUNDING_OCCURRENCES.NEVER;
    }
    function normalizeSubPixelRoundingRule(value) {
      if (isSubPixelRoundingRuleUnknown(value)) {
        return DEFAULT_SUBPIXEL_ROUNDING_RULE;
      }
      return value;
    }
    function determineSubPixelRoundingRule(subPixelRoundingRules) {
      if (typeof subPixelRoundingRules === "number") {
        return normalizeSubPixelRoundingRule(subPixelRoundingRules);
      }
      if (!subPixelRoundingRules || !$.Browser) {
        return DEFAULT_SUBPIXEL_ROUNDING_RULE;
      }
      var subPixelRoundingRule = subPixelRoundingRules[$.Browser.vendor];
      if (isSubPixelRoundingRuleUnknown(subPixelRoundingRule)) {
        subPixelRoundingRule = subPixelRoundingRules["*"];
      }
      return normalizeSubPixelRoundingRule(subPixelRoundingRule);
    }
  })(OpenSeadragon);
  (function($) {
    const OpenSeadragon2 = $;
    OpenSeadragon2.WebGLDrawer = class WebGLDrawer extends OpenSeadragon2.DrawerBase {
      constructor(options) {
        super(options);
        this._destroyed = false;
        this._TextureMap = new Map;
        this._TileMap = new Map;
        this._gl = null;
        this._firstPass = null;
        this._secondPass = null;
        this._glFrameBuffer = null;
        this._renderToTexture = null;
        this._glFramebufferToCanvasTransform = null;
        this._outputCanvas = null;
        this._outputContext = null;
        this._clippingCanvas = null;
        this._clippingContext = null;
        this._renderingCanvas = null;
        this._backupCanvasDrawer = null;
        this._imageSmoothingEnabled = true;
        this._boundToTileReady = (ev) => this._tileReadyHandler(ev);
        this._boundToImageUnloaded = (ev) => this._imageUnloadedHandler(ev);
        this.viewer.addHandler("tile-ready", this._boundToTileReady);
        this.viewer.addHandler("image-unloaded", this._boundToImageUnloaded);
        this.viewer.rejectEventHandler("tile-drawn", "The WebGLDrawer does not raise the tile-drawn event");
        this.viewer.rejectEventHandler("tile-drawing", "The WebGLDrawer does not raise the tile-drawing event");
        this._setupCanvases();
        this._setupRenderer();
        this.context = this._outputContext;
      }
      destroy() {
        if (this._destroyed) {
          return;
        }
        let gl = this._gl;
        var numTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        for (let unit = 0;unit < numTextureUnits; ++unit) {
          gl.activeTexture(gl.TEXTURE0 + unit);
          gl.bindTexture(gl.TEXTURE_2D, null);
          gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this._unloadTextures();
        gl.deleteBuffer(this._secondPass.bufferOutputPosition);
        gl.deleteFramebuffer(this._glFrameBuffer);
        this._renderingCanvas.width = this._renderingCanvas.height = 1;
        this._clippingCanvas.width = this._clippingCanvas.height = 1;
        this._outputCanvas.width = this._outputCanvas.height = 1;
        this._renderingCanvas = null;
        this._clippingCanvas = this._clippingContext = null;
        this._outputCanvas = this._outputContext = null;
        let ext = gl.getExtension("WEBGL_lose_context");
        if (ext) {
          ext.loseContext();
        }
        this.viewer.removeHandler("tile-ready", this._boundToTileReady);
        this.viewer.removeHandler("image-unloaded", this._boundToImageUnloaded);
        this.viewer.removeHandler("resize", this._resizeHandler);
        this._gl = null;
        if (this._backupCanvasDrawer) {
          this._backupCanvasDrawer.destroy();
          this._backupCanvasDrawer = null;
        }
        this.container.removeChild(this.canvas);
        if (this.viewer.drawer === this) {
          this.viewer.drawer = null;
        }
        this._destroyed = true;
      }
      canRotate() {
        return true;
      }
      static isSupported() {
        let canvasElement = document.createElement("canvas");
        let webglContext = $.isFunction(canvasElement.getContext) && canvasElement.getContext("webgl");
        let ext = webglContext && webglContext.getExtension("WEBGL_lose_context");
        if (ext) {
          ext.loseContext();
        }
        return !!webglContext;
      }
      getType() {
        return "webgl";
      }
      minimumOverlapRequired(tiledImage) {
        return tiledImage.isTainted();
      }
      _createDrawingElement() {
        let canvas = $.makeNeutralElement("canvas");
        let viewportSize = this._calculateCanvasSize();
        canvas.width = viewportSize.x;
        canvas.height = viewportSize.y;
        return canvas;
      }
      _getBackupCanvasDrawer() {
        if (!this._backupCanvasDrawer) {
          this._backupCanvasDrawer = this.viewer.requestDrawer("canvas", { mainDrawer: false });
          this._backupCanvasDrawer.canvas.style.setProperty("visibility", "hidden");
        }
        return this._backupCanvasDrawer;
      }
      draw(tiledImages) {
        let gl = this._gl;
        const bounds = this.viewport.getBoundsNoRotateWithMargins(true);
        let view = {
          bounds,
          center: new OpenSeadragon2.Point(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2),
          rotation: this.viewport.getRotation(true) * Math.PI / 180
        };
        let flipMultiplier = this.viewport.flipped ? -1 : 1;
        let posMatrix = $.Mat3.makeTranslation(-view.center.x, -view.center.y);
        let scaleMatrix = $.Mat3.makeScaling(2 / view.bounds.width * flipMultiplier, -2 / view.bounds.height);
        let rotMatrix = $.Mat3.makeRotation(-view.rotation);
        let viewMatrix = scaleMatrix.multiply(rotMatrix).multiply(posMatrix);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.clear(gl.COLOR_BUFFER_BIT);
        this._outputContext.clearRect(0, 0, this._outputCanvas.width, this._outputCanvas.height);
        let renderingBufferHasImageData = false;
        tiledImages.forEach((tiledImage, tiledImageIndex) => {
          if (tiledImage.isTainted()) {
            if (renderingBufferHasImageData) {
              this._outputContext.drawImage(this._renderingCanvas, 0, 0);
              gl.bindFramebuffer(gl.FRAMEBUFFER, null);
              gl.clear(gl.COLOR_BUFFER_BIT);
              renderingBufferHasImageData = false;
            }
            const canvasDrawer = this._getBackupCanvasDrawer();
            canvasDrawer.draw([tiledImage]);
            this._outputContext.drawImage(canvasDrawer.canvas, 0, 0);
          } else {
            let tilesToDraw = tiledImage.getTilesToDraw();
            if (tiledImage.placeholderFillStyle && tiledImage._hasOpaqueTile === false) {
              this._drawPlaceholder(tiledImage);
            }
            if (tilesToDraw.length === 0 || tiledImage.getOpacity() === 0) {
              return;
            }
            let firstTile = tilesToDraw[0];
            let useContext2dPipeline = tiledImage.compositeOperation || this.viewer.compositeOperation || tiledImage._clip || tiledImage._croppingPolygons || tiledImage.debugMode;
            let useTwoPassRendering = useContext2dPipeline || tiledImage.opacity < 1 || firstTile.hasTransparency;
            if (useContext2dPipeline) {
              if (renderingBufferHasImageData) {
                this._outputContext.drawImage(this._renderingCanvas, 0, 0);
              }
              gl.bindFramebuffer(gl.FRAMEBUFFER, null);
              gl.clear(gl.COLOR_BUFFER_BIT);
            }
            gl.useProgram(this._firstPass.shaderProgram);
            if (useTwoPassRendering) {
              gl.bindFramebuffer(gl.FRAMEBUFFER, this._glFrameBuffer);
              gl.clear(gl.COLOR_BUFFER_BIT);
            } else {
              gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            }
            let overallMatrix = viewMatrix;
            let imageRotation = tiledImage.getRotation(true);
            if (imageRotation % 360 !== 0) {
              let imageRotationMatrix = $.Mat3.makeRotation(-imageRotation * Math.PI / 180);
              let imageCenter = tiledImage.getBoundsNoRotate(true).getCenter();
              let t1 = $.Mat3.makeTranslation(imageCenter.x, imageCenter.y);
              let t2 = $.Mat3.makeTranslation(-imageCenter.x, -imageCenter.y);
              let localMatrix = t1.multiply(imageRotationMatrix).multiply(t2);
              overallMatrix = viewMatrix.multiply(localMatrix);
            }
            let maxTextures = this._gl.getParameter(this._gl.MAX_TEXTURE_IMAGE_UNITS);
            if (maxTextures <= 0) {
              throw new Error(`WegGL error: bad value for gl parameter MAX_TEXTURE_IMAGE_UNITS (${maxTextures}). This could happen
                        if too many contexts have been created and not released, or there is another problem with the graphics card.`);
            }
            let texturePositionArray = new Float32Array(maxTextures * 12);
            let textureDataArray = new Array(maxTextures);
            let matrixArray = new Array(maxTextures);
            let opacityArray = new Array(maxTextures);
            for (let tileIndex = 0;tileIndex < tilesToDraw.length; tileIndex++) {
              let tile = tilesToDraw[tileIndex].tile;
              let indexInDrawArray = tileIndex % maxTextures;
              let numTilesToDraw = indexInDrawArray + 1;
              let tileContext = tile.getCanvasContext();
              let textureInfo = tileContext ? this._TextureMap.get(tileContext.canvas) : null;
              if (!textureInfo) {
                this._tileReadyHandler({ tile, tiledImage });
                textureInfo = tileContext ? this._TextureMap.get(tileContext.canvas) : null;
              }
              if (textureInfo) {
                this._getTileData(tile, tiledImage, textureInfo, overallMatrix, indexInDrawArray, texturePositionArray, textureDataArray, matrixArray, opacityArray);
              } else {}
              if (numTilesToDraw === maxTextures || tileIndex === tilesToDraw.length - 1) {
                for (let i = 0;i <= numTilesToDraw; i++) {
                  gl.activeTexture(gl.TEXTURE0 + i);
                  gl.bindTexture(gl.TEXTURE_2D, textureDataArray[i]);
                }
                gl.bindBuffer(gl.ARRAY_BUFFER, this._firstPass.bufferTexturePosition);
                gl.bufferData(gl.ARRAY_BUFFER, texturePositionArray, gl.DYNAMIC_DRAW);
                matrixArray.forEach((matrix, index) => {
                  gl.uniformMatrix3fv(this._firstPass.uTransformMatrices[index], false, matrix);
                });
                gl.uniform1fv(this._firstPass.uOpacities, new Float32Array(opacityArray));
                gl.bindBuffer(gl.ARRAY_BUFFER, this._firstPass.bufferOutputPosition);
                gl.vertexAttribPointer(this._firstPass.aOutputPosition, 2, gl.FLOAT, false, 0, 0);
                gl.bindBuffer(gl.ARRAY_BUFFER, this._firstPass.bufferTexturePosition);
                gl.vertexAttribPointer(this._firstPass.aTexturePosition, 2, gl.FLOAT, false, 0, 0);
                gl.bindBuffer(gl.ARRAY_BUFFER, this._firstPass.bufferIndex);
                gl.vertexAttribPointer(this._firstPass.aIndex, 1, gl.FLOAT, false, 0, 0);
                gl.drawArrays(gl.TRIANGLES, 0, 6 * numTilesToDraw);
              }
            }
            if (useTwoPassRendering) {
              gl.useProgram(this._secondPass.shaderProgram);
              gl.bindFramebuffer(gl.FRAMEBUFFER, null);
              gl.activeTexture(gl.TEXTURE0);
              gl.bindTexture(gl.TEXTURE_2D, this._renderToTexture);
              this._gl.uniform1f(this._secondPass.uOpacityMultiplier, tiledImage.opacity);
              gl.bindBuffer(gl.ARRAY_BUFFER, this._secondPass.bufferTexturePosition);
              gl.vertexAttribPointer(this._secondPass.aTexturePosition, 2, gl.FLOAT, false, 0, 0);
              gl.bindBuffer(gl.ARRAY_BUFFER, this._secondPass.bufferOutputPosition);
              gl.vertexAttribPointer(this._secondPass.aOutputPosition, 2, gl.FLOAT, false, 0, 0);
              gl.drawArrays(gl.TRIANGLES, 0, 6);
            }
            renderingBufferHasImageData = true;
            if (useContext2dPipeline) {
              this._applyContext2dPipeline(tiledImage, tilesToDraw, tiledImageIndex);
              renderingBufferHasImageData = false;
              gl.bindFramebuffer(gl.FRAMEBUFFER, null);
              gl.clear(gl.COLOR_BUFFER_BIT);
            }
            if (tiledImageIndex === 0) {
              this._raiseTiledImageDrawnEvent(tiledImage, tilesToDraw.map((info) => info.tile));
            }
          }
        });
        if (renderingBufferHasImageData) {
          this._outputContext.drawImage(this._renderingCanvas, 0, 0);
        }
      }
      setImageSmoothingEnabled(enabled) {
        if (this._imageSmoothingEnabled !== enabled) {
          this._imageSmoothingEnabled = enabled;
          this._unloadTextures();
          this.viewer.world.draw();
        }
      }
      drawDebuggingRect(rect) {
        let context = this._outputContext;
        context.save();
        context.lineWidth = 2 * $.pixelDensityRatio;
        context.strokeStyle = this.debugGridColor[0];
        context.fillStyle = this.debugGridColor[0];
        context.strokeRect(rect.x * $.pixelDensityRatio, rect.y * $.pixelDensityRatio, rect.width * $.pixelDensityRatio, rect.height * $.pixelDensityRatio);
        context.restore();
      }
      _getTextureDataFromTile(tile) {
        return tile.getCanvasContext().canvas;
      }
      _applyContext2dPipeline(tiledImage, tilesToDraw, tiledImageIndex) {
        this._outputContext.save();
        this._outputContext.globalCompositeOperation = tiledImageIndex === 0 ? null : tiledImage.compositeOperation || this.viewer.compositeOperation;
        if (tiledImage._croppingPolygons || tiledImage._clip) {
          this._renderToClippingCanvas(tiledImage);
          this._outputContext.drawImage(this._clippingCanvas, 0, 0);
        } else {
          this._outputContext.drawImage(this._renderingCanvas, 0, 0);
        }
        this._outputContext.restore();
        if (tiledImage.debugMode) {
          const flipped = this.viewer.viewport.getFlip();
          if (flipped) {
            this._flip();
          }
          this._drawDebugInfo(tilesToDraw, tiledImage, flipped);
          if (flipped) {
            this._flip();
          }
        }
      }
      _getTileData(tile, tiledImage, textureInfo, viewMatrix, index, texturePositionArray, textureDataArray, matrixArray, opacityArray) {
        let texture = textureInfo.texture;
        let textureQuad = textureInfo.position;
        texturePositionArray.set(textureQuad, index * 12);
        let overlapFraction = this._calculateOverlapFraction(tile, tiledImage);
        let xOffset = tile.positionedBounds.width * overlapFraction.x;
        let yOffset = tile.positionedBounds.height * overlapFraction.y;
        let x = tile.positionedBounds.x + (tile.x === 0 ? 0 : xOffset);
        let y = tile.positionedBounds.y + (tile.y === 0 ? 0 : yOffset);
        let right = tile.positionedBounds.x + tile.positionedBounds.width - (tile.isRightMost ? 0 : xOffset);
        let bottom = tile.positionedBounds.y + tile.positionedBounds.height - (tile.isBottomMost ? 0 : yOffset);
        let w = right - x;
        let h = bottom - y;
        let matrix = new $.Mat3([
          w,
          0,
          0,
          0,
          h,
          0,
          x,
          y,
          1
        ]);
        if (tile.flipped) {
          let t1 = $.Mat3.makeTranslation(0.5, 0);
          let t2 = $.Mat3.makeTranslation(-0.5, 0);
          let localMatrix = t1.multiply($.Mat3.makeScaling(-1, 1)).multiply(t2);
          matrix = matrix.multiply(localMatrix);
        }
        let overallMatrix = viewMatrix.multiply(matrix);
        opacityArray[index] = tile.opacity;
        textureDataArray[index] = texture;
        matrixArray[index] = overallMatrix.values;
      }
      _textureFilter() {
        return this._imageSmoothingEnabled ? this._gl.LINEAR : this._gl.NEAREST;
      }
      _setupRenderer() {
        let gl = this._gl;
        if (!gl) {
          $.console.error("_setupCanvases must be called before _setupRenderer");
        }
        this._unitQuad = this._makeQuadVertexBuffer(0, 1, 0, 1);
        this._makeFirstPassShaderProgram();
        this._makeSecondPassShaderProgram();
        this._renderToTexture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this._renderToTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._renderingCanvas.width, this._renderingCanvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._textureFilter());
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this._glFrameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._glFrameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._renderToTexture, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      }
      _makeFirstPassShaderProgram() {
        let numTextures = this._glNumTextures = this._gl.getParameter(this._gl.MAX_TEXTURE_IMAGE_UNITS);
        let makeMatrixUniforms = () => {
          return [...Array(numTextures).keys()].map((index) => `uniform mat3 u_matrix_${index};`).join(`
`);
        };
        let makeConditionals = () => {
          return [...Array(numTextures).keys()].map((index) => `${index > 0 ? "else " : ""}if(int(a_index) == ${index}) { transform_matrix = u_matrix_${index}; }`).join(`
`);
        };
        const vertexShaderProgram = `
            attribute vec2 a_output_position;
            attribute vec2 a_texture_position;
            attribute float a_index;

            ${makeMatrixUniforms()} // create a uniform mat3 for each potential tile to draw

            varying vec2 v_texture_position;
            varying float v_image_index;

            void main() {

                mat3 transform_matrix; // value will be set by the if/elses in makeConditional()

                ${makeConditionals()}

                gl_Position = vec4(transform_matrix * vec3(a_output_position, 1), 1);

                v_texture_position = a_texture_position;
                v_image_index = a_index;
            }
            `;
        const fragmentShaderProgram = `
            precision mediump float;

            // our textures
            uniform sampler2D u_images[${numTextures}];
            // our opacities
            uniform float u_opacities[${numTextures}];

            // the varyings passed in from the vertex shader.
            varying vec2 v_texture_position;
            varying float v_image_index;

            void main() {
                // can't index directly with a variable, need to use a loop iterator hack
                for(int i = 0; i < ${numTextures}; ++i){
                    if(i == int(v_image_index)){
                        gl_FragColor = texture2D(u_images[i], v_texture_position) * u_opacities[i];
                    }
                }
            }
            `;
        let gl = this._gl;
        let program = this.constructor.initShaderProgram(gl, vertexShaderProgram, fragmentShaderProgram);
        gl.useProgram(program);
        this._firstPass = {
          shaderProgram: program,
          aOutputPosition: gl.getAttribLocation(program, "a_output_position"),
          aTexturePosition: gl.getAttribLocation(program, "a_texture_position"),
          aIndex: gl.getAttribLocation(program, "a_index"),
          uTransformMatrices: [...Array(this._glNumTextures).keys()].map((i) => gl.getUniformLocation(program, `u_matrix_${i}`)),
          uImages: gl.getUniformLocation(program, "u_images"),
          uOpacities: gl.getUniformLocation(program, "u_opacities"),
          bufferOutputPosition: gl.createBuffer(),
          bufferTexturePosition: gl.createBuffer(),
          bufferIndex: gl.createBuffer()
        };
        gl.uniform1iv(this._firstPass.uImages, [...Array(numTextures).keys()]);
        let outputQuads = new Float32Array(numTextures * 12);
        for (let i = 0;i < numTextures; ++i) {
          outputQuads.set(Float32Array.from(this._unitQuad), i * 12);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this._firstPass.bufferOutputPosition);
        gl.bufferData(gl.ARRAY_BUFFER, outputQuads, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this._firstPass.aOutputPosition);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._firstPass.bufferTexturePosition);
        gl.enableVertexAttribArray(this._firstPass.aTexturePosition);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._firstPass.bufferIndex);
        let indices = [...Array(this._glNumTextures).keys()].map((i) => Array(6).fill(i)).flat();
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(indices), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this._firstPass.aIndex);
      }
      _makeSecondPassShaderProgram() {
        const vertexShaderProgram = `
            attribute vec2 a_output_position;
            attribute vec2 a_texture_position;

            uniform mat3 u_matrix;

            varying vec2 v_texture_position;

            void main() {
                gl_Position = vec4(u_matrix * vec3(a_output_position, 1), 1);

                v_texture_position = a_texture_position;
            }
            `;
        const fragmentShaderProgram = `
            precision mediump float;

            // our texture
            uniform sampler2D u_image;

            // the texCoords passed in from the vertex shader.
            varying vec2 v_texture_position;

            // the opacity multiplier for the image
            uniform float u_opacity_multiplier;

            void main() {
                gl_FragColor = texture2D(u_image, v_texture_position);
                gl_FragColor *= u_opacity_multiplier;
            }
            `;
        let gl = this._gl;
        let program = this.constructor.initShaderProgram(gl, vertexShaderProgram, fragmentShaderProgram);
        gl.useProgram(program);
        this._secondPass = {
          shaderProgram: program,
          aOutputPosition: gl.getAttribLocation(program, "a_output_position"),
          aTexturePosition: gl.getAttribLocation(program, "a_texture_position"),
          uMatrix: gl.getUniformLocation(program, "u_matrix"),
          uImage: gl.getUniformLocation(program, "u_image"),
          uOpacityMultiplier: gl.getUniformLocation(program, "u_opacity_multiplier"),
          bufferOutputPosition: gl.createBuffer(),
          bufferTexturePosition: gl.createBuffer()
        };
        gl.bindBuffer(gl.ARRAY_BUFFER, this._secondPass.bufferOutputPosition);
        gl.bufferData(gl.ARRAY_BUFFER, this._unitQuad, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this._secondPass.aOutputPosition);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._secondPass.bufferTexturePosition);
        gl.bufferData(gl.ARRAY_BUFFER, this._unitQuad, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(this._secondPass.aTexturePosition);
        let matrix = $.Mat3.makeScaling(2, 2).multiply($.Mat3.makeTranslation(-0.5, -0.5));
        gl.uniformMatrix3fv(this._secondPass.uMatrix, false, matrix.values);
      }
      _resizeRenderer() {
        let gl = this._gl;
        let w = this._renderingCanvas.width;
        let h = this._renderingCanvas.height;
        gl.viewport(0, 0, w, h);
        gl.deleteTexture(this._renderToTexture);
        this._renderToTexture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this._renderToTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._textureFilter());
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._glFrameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._renderToTexture, 0);
      }
      _setupCanvases() {
        let _this = this;
        this._outputCanvas = this.canvas;
        this._outputContext = this._outputCanvas.getContext("2d");
        this._renderingCanvas = document.createElement("canvas");
        this._clippingCanvas = document.createElement("canvas");
        this._clippingContext = this._clippingCanvas.getContext("2d");
        this._renderingCanvas.width = this._clippingCanvas.width = this._outputCanvas.width;
        this._renderingCanvas.height = this._clippingCanvas.height = this._outputCanvas.height;
        this._gl = this._renderingCanvas.getContext("webgl");
        this._resizeHandler = function() {
          if (_this._outputCanvas !== _this.viewer.drawer.canvas) {
            _this._outputCanvas.style.width = _this.viewer.drawer.canvas.clientWidth + "px";
            _this._outputCanvas.style.height = _this.viewer.drawer.canvas.clientHeight + "px";
          }
          let viewportSize = _this._calculateCanvasSize();
          if (_this._outputCanvas.width !== viewportSize.x || _this._outputCanvas.height !== viewportSize.y) {
            _this._outputCanvas.width = viewportSize.x;
            _this._outputCanvas.height = viewportSize.y;
          }
          _this._renderingCanvas.style.width = _this._outputCanvas.clientWidth + "px";
          _this._renderingCanvas.style.height = _this._outputCanvas.clientHeight + "px";
          _this._renderingCanvas.width = _this._clippingCanvas.width = _this._outputCanvas.width;
          _this._renderingCanvas.height = _this._clippingCanvas.height = _this._outputCanvas.height;
          _this._resizeRenderer();
        };
        this.viewer.addHandler("resize", this._resizeHandler);
      }
      _makeQuadVertexBuffer(left, right, top, bottom) {
        return new Float32Array([
          left,
          bottom,
          right,
          bottom,
          left,
          top,
          left,
          top,
          right,
          bottom,
          right,
          top
        ]);
      }
      _tileReadyHandler(event) {
        let tile = event.tile;
        let tiledImage = event.tiledImage;
        if (tiledImage.isTainted()) {
          return;
        }
        let tileContext = tile.getCanvasContext();
        let canvas = tileContext && tileContext.canvas;
        if (!canvas || $.isCanvasTainted(canvas)) {
          const wasTainted = tiledImage.isTainted();
          if (!wasTainted) {
            tiledImage.setTainted(true);
            $.console.warn("WebGL cannot be used to draw this TiledImage because it has tainted data. Does crossOriginPolicy need to be set?");
            this._raiseDrawerErrorEvent(tiledImage, "Tainted data cannot be used by the WebGLDrawer. Falling back to CanvasDrawer for this TiledImage.");
          }
          return;
        }
        let textureInfo = this._TextureMap.get(canvas);
        if (!textureInfo) {
          let gl = this._gl;
          let texture = gl.createTexture();
          let position;
          let overlap = tiledImage.source.tileOverlap;
          let sourceWidthFraction, sourceHeightFraction;
          if (tile.sourceBounds) {
            sourceWidthFraction = Math.min(tile.sourceBounds.width, canvas.width) / canvas.width;
            sourceHeightFraction = Math.min(tile.sourceBounds.height, canvas.height) / canvas.height;
          } else {
            sourceWidthFraction = 1;
            sourceHeightFraction = 1;
          }
          if (overlap > 0) {
            let overlapFraction = this._calculateOverlapFraction(tile, tiledImage);
            let left = (tile.x === 0 ? 0 : overlapFraction.x) * sourceWidthFraction;
            let top = (tile.y === 0 ? 0 : overlapFraction.y) * sourceHeightFraction;
            let right = (tile.isRightMost ? 1 : 1 - overlapFraction.x) * sourceWidthFraction;
            let bottom = (tile.isBottomMost ? 1 : 1 - overlapFraction.y) * sourceHeightFraction;
            position = this._makeQuadVertexBuffer(left, right, top, bottom);
          } else if (sourceWidthFraction === 1 && sourceHeightFraction === 1) {
            position = this._unitQuad;
          } else {
            position = this._makeQuadVertexBuffer(0, sourceWidthFraction, 0, sourceHeightFraction);
          }
          let textureInfo2 = {
            texture,
            position
          };
          this._TextureMap.set(canvas, textureInfo2);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._textureFilter());
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._textureFilter());
          this._uploadImageData(tileContext);
        }
      }
      _calculateOverlapFraction(tile, tiledImage) {
        let overlap = tiledImage.source.tileOverlap;
        let nativeWidth = tile.sourceBounds.width;
        let nativeHeight = tile.sourceBounds.height;
        let overlapWidth = (tile.x === 0 ? 0 : overlap) + (tile.isRightMost ? 0 : overlap);
        let overlapHeight = (tile.y === 0 ? 0 : overlap) + (tile.isBottomMost ? 0 : overlap);
        let widthOverlapFraction = overlap / (nativeWidth + overlapWidth);
        let heightOverlapFraction = overlap / (nativeHeight + overlapHeight);
        return {
          x: widthOverlapFraction,
          y: heightOverlapFraction
        };
      }
      _unloadTextures() {
        let canvases = Array.from(this._TextureMap.keys());
        canvases.forEach((canvas) => {
          this._cleanupImageData(canvas);
        });
      }
      _uploadImageData(tileContext) {
        let gl = this._gl;
        let canvas = tileContext.canvas;
        try {
          if (!canvas) {
            throw "Tile context does not have a canvas", tileContext;
          }
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
        } catch (e) {
          $.console.error("Error uploading image data to WebGL", e);
        }
      }
      _imageUnloadedHandler(event) {
        let canvas = event.context2D.canvas;
        this._cleanupImageData(canvas);
      }
      _cleanupImageData(tileCanvas) {
        let textureInfo = this._TextureMap.get(tileCanvas);
        this._TextureMap.delete(tileCanvas);
        if (textureInfo) {
          this._gl.deleteTexture(textureInfo.texture);
        }
      }
      _setClip() {}
      _renderToClippingCanvas(item) {
        this._clippingContext.clearRect(0, 0, this._clippingCanvas.width, this._clippingCanvas.height);
        this._clippingContext.save();
        if (this.viewer.viewport.getFlip()) {
          const point = new $.Point(this.canvas.width / 2, this.canvas.height / 2);
          this._clippingContext.translate(point.x, 0);
          this._clippingContext.scale(-1, 1);
          this._clippingContext.translate(-point.x, 0);
        }
        if (item._clip) {
          const polygon = [
            { x: item._clip.x, y: item._clip.y },
            { x: item._clip.x + item._clip.width, y: item._clip.y },
            { x: item._clip.x + item._clip.width, y: item._clip.y + item._clip.height },
            { x: item._clip.x, y: item._clip.y + item._clip.height }
          ];
          let clipPoints = polygon.map((coord) => {
            let point = item.imageToViewportCoordinates(coord.x, coord.y, true).rotate(this.viewer.viewport.getRotation(true), this.viewer.viewport.getCenter(true));
            let clipPoint = this.viewportCoordToDrawerCoord(point);
            return clipPoint;
          });
          this._clippingContext.beginPath();
          clipPoints.forEach((coord, i) => {
            this._clippingContext[i === 0 ? "moveTo" : "lineTo"](coord.x, coord.y);
          });
          this._clippingContext.clip();
          this._setClip();
        }
        if (item._croppingPolygons) {
          let polygons = item._croppingPolygons.map((polygon) => {
            return polygon.map((coord) => {
              let point = item.imageToViewportCoordinates(coord.x, coord.y, true).rotate(this.viewer.viewport.getRotation(true), this.viewer.viewport.getCenter(true));
              let clipPoint = this.viewportCoordToDrawerCoord(point);
              return clipPoint;
            });
          });
          this._clippingContext.beginPath();
          polygons.forEach((polygon) => {
            polygon.forEach((coord, i) => {
              this._clippingContext[i === 0 ? "moveTo" : "lineTo"](coord.x, coord.y);
            });
          });
          this._clippingContext.clip();
        }
        if (this.viewer.viewport.getFlip()) {
          const point = new $.Point(this.canvas.width / 2, this.canvas.height / 2);
          this._clippingContext.translate(point.x, 0);
          this._clippingContext.scale(-1, 1);
          this._clippingContext.translate(-point.x, 0);
        }
        this._clippingContext.drawImage(this._renderingCanvas, 0, 0);
        this._clippingContext.restore();
      }
      _setRotations(tiledImage) {
        var saveContext = false;
        if (this.viewport.getRotation(true) % 360 !== 0) {
          this._offsetForRotation({
            degrees: this.viewport.getRotation(true),
            saveContext
          });
          saveContext = false;
        }
        if (tiledImage.getRotation(true) % 360 !== 0) {
          this._offsetForRotation({
            degrees: tiledImage.getRotation(true),
            point: this.viewport.pixelFromPointNoRotate(tiledImage._getRotationPoint(true), true),
            saveContext
          });
        }
      }
      _offsetForRotation(options) {
        var point = options.point ? options.point.times($.pixelDensityRatio) : this._getCanvasCenter();
        var context = this._outputContext;
        context.save();
        context.translate(point.x, point.y);
        context.rotate(Math.PI / 180 * options.degrees);
        context.translate(-point.x, -point.y);
      }
      _flip(options) {
        options = options || {};
        var point = options.point ? options.point.times($.pixelDensityRatio) : this._getCanvasCenter();
        var context = this._outputContext;
        context.translate(point.x, 0);
        context.scale(-1, 1);
        context.translate(-point.x, 0);
      }
      _drawDebugInfo(tilesToDraw, tiledImage, flipped) {
        for (var i = tilesToDraw.length - 1;i >= 0; i--) {
          var tile = tilesToDraw[i].tile;
          try {
            this._drawDebugInfoOnTile(tile, tilesToDraw.length, i, tiledImage, flipped);
          } catch (e) {
            $.console.error(e);
          }
        }
      }
      _drawDebugInfoOnTile(tile, count, i, tiledImage, flipped) {
        var colorIndex = this.viewer.world.getIndexOfItem(tiledImage) % this.debugGridColor.length;
        var context = this.context;
        context.save();
        context.lineWidth = 2 * $.pixelDensityRatio;
        context.font = "small-caps bold " + 13 * $.pixelDensityRatio + "px arial";
        context.strokeStyle = this.debugGridColor[colorIndex];
        context.fillStyle = this.debugGridColor[colorIndex];
        this._setRotations(tiledImage);
        if (flipped) {
          this._flip({ point: tile.position.plus(tile.size.divide(2)) });
        }
        context.strokeRect(tile.position.x * $.pixelDensityRatio, tile.position.y * $.pixelDensityRatio, tile.size.x * $.pixelDensityRatio, tile.size.y * $.pixelDensityRatio);
        var tileCenterX = (tile.position.x + tile.size.x / 2) * $.pixelDensityRatio;
        var tileCenterY = (tile.position.y + tile.size.y / 2) * $.pixelDensityRatio;
        context.translate(tileCenterX, tileCenterY);
        const angleInDegrees = this.viewport.getRotation(true);
        context.rotate(Math.PI / 180 * -angleInDegrees);
        context.translate(-tileCenterX, -tileCenterY);
        if (tile.x === 0 && tile.y === 0) {
          context.fillText("Zoom: " + this.viewport.getZoom(), tile.position.x * $.pixelDensityRatio, (tile.position.y - 30) * $.pixelDensityRatio);
          context.fillText("Pan: " + this.viewport.getBounds().toString(), tile.position.x * $.pixelDensityRatio, (tile.position.y - 20) * $.pixelDensityRatio);
        }
        context.fillText("Level: " + tile.level, (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 20) * $.pixelDensityRatio);
        context.fillText("Column: " + tile.x, (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 30) * $.pixelDensityRatio);
        context.fillText("Row: " + tile.y, (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 40) * $.pixelDensityRatio);
        context.fillText("Order: " + i + " of " + count, (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 50) * $.pixelDensityRatio);
        context.fillText("Size: " + tile.size.toString(), (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 60) * $.pixelDensityRatio);
        context.fillText("Position: " + tile.position.toString(), (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 70) * $.pixelDensityRatio);
        if (this.viewport.getRotation(true) % 360 !== 0) {
          this._restoreRotationChanges();
        }
        if (tiledImage.getRotation(true) % 360 !== 0) {
          this._restoreRotationChanges();
        }
        context.restore();
      }
      _drawPlaceholder(tiledImage) {
        const bounds = tiledImage.getBounds(true);
        const rect = this.viewportToDrawerRectangle(tiledImage.getBounds(true));
        const context = this._outputContext;
        let fillStyle;
        if (typeof tiledImage.placeholderFillStyle === "function") {
          fillStyle = tiledImage.placeholderFillStyle(tiledImage, context);
        } else {
          fillStyle = tiledImage.placeholderFillStyle;
        }
        this._offsetForRotation({ degrees: this.viewer.viewport.getRotation(true) });
        context.fillStyle = fillStyle;
        context.translate(rect.x, rect.y);
        context.rotate(Math.PI / 180 * bounds.degrees);
        context.translate(-rect.x, -rect.y);
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
        this._restoreRotationChanges();
      }
      _getCanvasCenter() {
        return new $.Point(this.canvas.width / 2, this.canvas.height / 2);
      }
      _restoreRotationChanges() {
        var context = this._outputContext;
        context.restore();
      }
      static initShaderProgram(gl, vsSource, fsSource) {
        function loadShader(gl2, type, source) {
          const shader = gl2.createShader(type);
          gl2.shaderSource(shader, source);
          gl2.compileShader(shader);
          if (!gl2.getShaderParameter(shader, gl2.COMPILE_STATUS)) {
            $.console.error(`An error occurred compiling the shaders: ${gl2.getShaderInfoLog(shader)}`);
            gl2.deleteShader(shader);
            return null;
          }
          return shader;
        }
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
          $.console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
          return null;
        }
        return shaderProgram;
      }
    };
  })(OpenSeadragon);
  (function($) {
    $.Viewport = function(options) {
      var args = arguments;
      if (args.length && args[0] instanceof $.Point) {
        options = {
          containerSize: args[0],
          contentSize: args[1],
          config: args[2]
        };
      }
      if (options.config) {
        $.extend(true, options, options.config);
        delete options.config;
      }
      this._margins = $.extend({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }, options.margins || {});
      delete options.margins;
      options.initialDegrees = options.degrees;
      delete options.degrees;
      $.extend(true, this, {
        containerSize: null,
        contentSize: null,
        zoomPoint: null,
        rotationPivot: null,
        viewer: null,
        springStiffness: $.DEFAULT_SETTINGS.springStiffness,
        animationTime: $.DEFAULT_SETTINGS.animationTime,
        minZoomImageRatio: $.DEFAULT_SETTINGS.minZoomImageRatio,
        maxZoomPixelRatio: $.DEFAULT_SETTINGS.maxZoomPixelRatio,
        visibilityRatio: $.DEFAULT_SETTINGS.visibilityRatio,
        wrapHorizontal: $.DEFAULT_SETTINGS.wrapHorizontal,
        wrapVertical: $.DEFAULT_SETTINGS.wrapVertical,
        defaultZoomLevel: $.DEFAULT_SETTINGS.defaultZoomLevel,
        minZoomLevel: $.DEFAULT_SETTINGS.minZoomLevel,
        maxZoomLevel: $.DEFAULT_SETTINGS.maxZoomLevel,
        initialDegrees: $.DEFAULT_SETTINGS.degrees,
        flipped: $.DEFAULT_SETTINGS.flipped,
        homeFillsViewer: $.DEFAULT_SETTINGS.homeFillsViewer,
        silenceMultiImageWarnings: $.DEFAULT_SETTINGS.silenceMultiImageWarnings
      }, options);
      this._updateContainerInnerSize();
      this.centerSpringX = new $.Spring({
        initial: 0,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime
      });
      this.centerSpringY = new $.Spring({
        initial: 0,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime
      });
      this.zoomSpring = new $.Spring({
        exponential: true,
        initial: 1,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime
      });
      this.degreesSpring = new $.Spring({
        initial: options.initialDegrees,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime
      });
      this._oldCenterX = this.centerSpringX.current.value;
      this._oldCenterY = this.centerSpringY.current.value;
      this._oldZoom = this.zoomSpring.current.value;
      this._oldDegrees = this.degreesSpring.current.value;
      this._setContentBounds(new $.Rect(0, 0, 1, 1), 1);
      this.goHome(true);
      this.update();
    };
    $.Viewport.prototype = {
      get degrees() {
        $.console.warn("Accessing [Viewport.degrees] is deprecated. Use viewport.getRotation instead.");
        return this.getRotation();
      },
      set degrees(degrees) {
        $.console.warn("Setting [Viewport.degrees] is deprecated. Use viewport.rotateTo, viewport.rotateBy, or viewport.setRotation instead.");
        this.rotateTo(degrees);
      },
      resetContentSize: function(contentSize) {
        $.console.assert(contentSize, "[Viewport.resetContentSize] contentSize is required");
        $.console.assert(contentSize instanceof $.Point, "[Viewport.resetContentSize] contentSize must be an OpenSeadragon.Point");
        $.console.assert(contentSize.x > 0, "[Viewport.resetContentSize] contentSize.x must be greater than 0");
        $.console.assert(contentSize.y > 0, "[Viewport.resetContentSize] contentSize.y must be greater than 0");
        this._setContentBounds(new $.Rect(0, 0, 1, contentSize.y / contentSize.x), contentSize.x);
        return this;
      },
      setHomeBounds: function(bounds, contentFactor) {
        $.console.error("[Viewport.setHomeBounds] this function is deprecated; The content bounds should not be set manually.");
        this._setContentBounds(bounds, contentFactor);
      },
      _setContentBounds: function(bounds, contentFactor) {
        $.console.assert(bounds, "[Viewport._setContentBounds] bounds is required");
        $.console.assert(bounds instanceof $.Rect, "[Viewport._setContentBounds] bounds must be an OpenSeadragon.Rect");
        $.console.assert(bounds.width > 0, "[Viewport._setContentBounds] bounds.width must be greater than 0");
        $.console.assert(bounds.height > 0, "[Viewport._setContentBounds] bounds.height must be greater than 0");
        this._contentBoundsNoRotate = bounds.clone();
        this._contentSizeNoRotate = this._contentBoundsNoRotate.getSize().times(contentFactor);
        this._contentBounds = bounds.rotate(this.getRotation()).getBoundingBox();
        this._contentSize = this._contentBounds.getSize().times(contentFactor);
        this._contentAspectRatio = this._contentSize.x / this._contentSize.y;
        if (this.viewer) {
          this.viewer.raiseEvent("reset-size", {
            contentSize: this._contentSizeNoRotate.clone(),
            contentFactor,
            homeBounds: this._contentBoundsNoRotate.clone(),
            contentBounds: this._contentBounds.clone()
          });
        }
      },
      getHomeZoom: function() {
        if (this.defaultZoomLevel) {
          return this.defaultZoomLevel;
        }
        var aspectFactor = this._contentAspectRatio / this.getAspectRatio();
        var output;
        if (this.homeFillsViewer) {
          output = aspectFactor >= 1 ? aspectFactor : 1;
        } else {
          output = aspectFactor >= 1 ? 1 : aspectFactor;
        }
        return output / this._contentBounds.width;
      },
      getHomeBounds: function() {
        return this.getHomeBoundsNoRotate().rotate(-this.getRotation());
      },
      getHomeBoundsNoRotate: function() {
        var center = this._contentBounds.getCenter();
        var width = 1 / this.getHomeZoom();
        var height = width / this.getAspectRatio();
        return new $.Rect(center.x - width / 2, center.y - height / 2, width, height);
      },
      goHome: function(immediately) {
        if (this.viewer) {
          this.viewer.raiseEvent("home", {
            immediately
          });
        }
        return this.fitBounds(this.getHomeBounds(), immediately);
      },
      getMinZoom: function() {
        var homeZoom = this.getHomeZoom(), zoom = this.minZoomLevel ? this.minZoomLevel : this.minZoomImageRatio * homeZoom;
        return zoom;
      },
      getMaxZoom: function() {
        var zoom = this.maxZoomLevel;
        if (!zoom) {
          zoom = this._contentSize.x * this.maxZoomPixelRatio / this._containerInnerSize.x;
          zoom /= this._contentBounds.width;
        }
        return Math.max(zoom, this.getHomeZoom());
      },
      getAspectRatio: function() {
        return this._containerInnerSize.x / this._containerInnerSize.y;
      },
      getContainerSize: function() {
        return new $.Point(this.containerSize.x, this.containerSize.y);
      },
      getMargins: function() {
        return $.extend({}, this._margins);
      },
      setMargins: function(margins) {
        $.console.assert($.type(margins) === "object", "[Viewport.setMargins] margins must be an object");
        this._margins = $.extend({
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }, margins);
        this._updateContainerInnerSize();
        if (this.viewer) {
          this.viewer.forceRedraw();
        }
      },
      getBounds: function(current) {
        return this.getBoundsNoRotate(current).rotate(-this.getRotation(current));
      },
      getBoundsNoRotate: function(current) {
        var center = this.getCenter(current);
        var width = 1 / this.getZoom(current);
        var height = width / this.getAspectRatio();
        return new $.Rect(center.x - width / 2, center.y - height / 2, width, height);
      },
      getBoundsWithMargins: function(current) {
        return this.getBoundsNoRotateWithMargins(current).rotate(-this.getRotation(current), this.getCenter(current));
      },
      getBoundsNoRotateWithMargins: function(current) {
        var bounds = this.getBoundsNoRotate(current);
        var factor = this._containerInnerSize.x * this.getZoom(current);
        bounds.x -= this._margins.left / factor;
        bounds.y -= this._margins.top / factor;
        bounds.width += (this._margins.left + this._margins.right) / factor;
        bounds.height += (this._margins.top + this._margins.bottom) / factor;
        return bounds;
      },
      getCenter: function(current) {
        var centerCurrent = new $.Point(this.centerSpringX.current.value, this.centerSpringY.current.value), centerTarget = new $.Point(this.centerSpringX.target.value, this.centerSpringY.target.value), oldZoomPixel, zoom, width, height, bounds, newZoomPixel, deltaZoomPixels, deltaZoomPoints;
        if (current) {
          return centerCurrent;
        } else if (!this.zoomPoint) {
          return centerTarget;
        }
        oldZoomPixel = this.pixelFromPoint(this.zoomPoint, true);
        zoom = this.getZoom();
        width = 1 / zoom;
        height = width / this.getAspectRatio();
        bounds = new $.Rect(centerCurrent.x - width / 2, centerCurrent.y - height / 2, width, height);
        newZoomPixel = this._pixelFromPoint(this.zoomPoint, bounds);
        deltaZoomPixels = newZoomPixel.minus(oldZoomPixel).rotate(-this.getRotation(true));
        deltaZoomPoints = deltaZoomPixels.divide(this._containerInnerSize.x * zoom);
        return centerTarget.plus(deltaZoomPoints);
      },
      getZoom: function(current) {
        if (current) {
          return this.zoomSpring.current.value;
        } else {
          return this.zoomSpring.target.value;
        }
      },
      _applyZoomConstraints: function(zoom) {
        return Math.max(Math.min(zoom, this.getMaxZoom()), this.getMinZoom());
      },
      _applyBoundaryConstraints: function(bounds) {
        var newBounds = this.viewportToViewerElementRectangle(bounds).getBoundingBox();
        var cb = this.viewportToViewerElementRectangle(this._contentBoundsNoRotate).getBoundingBox();
        var xConstrained = false;
        var yConstrained = false;
        if (this.wrapHorizontal) {} else {
          var boundsRight = newBounds.x + newBounds.width;
          var contentRight = cb.x + cb.width;
          var horizontalThreshold, leftDx, rightDx;
          if (newBounds.width > cb.width) {
            horizontalThreshold = this.visibilityRatio * cb.width;
          } else {
            horizontalThreshold = this.visibilityRatio * newBounds.width;
          }
          leftDx = cb.x - boundsRight + horizontalThreshold;
          rightDx = contentRight - newBounds.x - horizontalThreshold;
          if (horizontalThreshold > cb.width) {
            newBounds.x += (leftDx + rightDx) / 2;
            xConstrained = true;
          } else if (rightDx < 0) {
            newBounds.x += rightDx;
            xConstrained = true;
          } else if (leftDx > 0) {
            newBounds.x += leftDx;
            xConstrained = true;
          }
        }
        if (this.wrapVertical) {} else {
          var boundsBottom = newBounds.y + newBounds.height;
          var contentBottom = cb.y + cb.height;
          var verticalThreshold, topDy, bottomDy;
          if (newBounds.height > cb.height) {
            verticalThreshold = this.visibilityRatio * cb.height;
          } else {
            verticalThreshold = this.visibilityRatio * newBounds.height;
          }
          topDy = cb.y - boundsBottom + verticalThreshold;
          bottomDy = contentBottom - newBounds.y - verticalThreshold;
          if (verticalThreshold > cb.height) {
            newBounds.y += (topDy + bottomDy) / 2;
            yConstrained = true;
          } else if (bottomDy < 0) {
            newBounds.y += bottomDy;
            yConstrained = true;
          } else if (topDy > 0) {
            newBounds.y += topDy;
            yConstrained = true;
          }
        }
        var constraintApplied = xConstrained || yConstrained;
        var newViewportBounds = constraintApplied ? this.viewerElementToViewportRectangle(newBounds) : bounds.clone();
        newViewportBounds.xConstrained = xConstrained;
        newViewportBounds.yConstrained = yConstrained;
        newViewportBounds.constraintApplied = constraintApplied;
        return newViewportBounds;
      },
      _raiseConstraintsEvent: function(immediately) {
        if (this.viewer) {
          this.viewer.raiseEvent("constrain", {
            immediately
          });
        }
      },
      applyConstraints: function(immediately) {
        var actualZoom = this.getZoom();
        var constrainedZoom = this._applyZoomConstraints(actualZoom);
        if (actualZoom !== constrainedZoom) {
          this.zoomTo(constrainedZoom, this.zoomPoint, immediately);
        }
        var constrainedBounds = this.getConstrainedBounds(false);
        if (constrainedBounds.constraintApplied) {
          this.fitBounds(constrainedBounds, immediately);
          this._raiseConstraintsEvent(immediately);
        }
        return this;
      },
      ensureVisible: function(immediately) {
        return this.applyConstraints(immediately);
      },
      _fitBounds: function(bounds, options) {
        options = options || {};
        var immediately = options.immediately || false;
        var constraints = options.constraints || false;
        var aspect = this.getAspectRatio();
        var center = bounds.getCenter();
        var newBounds = new $.Rect(bounds.x, bounds.y, bounds.width, bounds.height, bounds.degrees + this.getRotation()).getBoundingBox();
        if (newBounds.getAspectRatio() >= aspect) {
          newBounds.height = newBounds.width / aspect;
        } else {
          newBounds.width = newBounds.height * aspect;
        }
        newBounds.x = center.x - newBounds.width / 2;
        newBounds.y = center.y - newBounds.height / 2;
        var newZoom = 1 / newBounds.width;
        if (immediately) {
          this.panTo(center, true);
          this.zoomTo(newZoom, null, true);
          if (constraints) {
            this.applyConstraints(true);
          }
          return this;
        }
        var currentCenter = this.getCenter(true);
        var currentZoom = this.getZoom(true);
        this.panTo(currentCenter, true);
        this.zoomTo(currentZoom, null, true);
        var oldBounds = this.getBounds();
        var oldZoom = this.getZoom();
        if (oldZoom === 0 || Math.abs(newZoom / oldZoom - 1) < 0.00000001) {
          this.zoomTo(newZoom, null, true);
          this.panTo(center, immediately);
          if (constraints) {
            this.applyConstraints(false);
          }
          return this;
        }
        if (constraints) {
          this.panTo(center, false);
          newZoom = this._applyZoomConstraints(newZoom);
          this.zoomTo(newZoom, null, false);
          var constrainedBounds = this.getConstrainedBounds();
          this.panTo(currentCenter, true);
          this.zoomTo(currentZoom, null, true);
          this.fitBounds(constrainedBounds);
        } else {
          var rotatedNewBounds = newBounds.rotate(-this.getRotation());
          var referencePoint = rotatedNewBounds.getTopLeft().times(newZoom).minus(oldBounds.getTopLeft().times(oldZoom)).divide(newZoom - oldZoom);
          this.zoomTo(newZoom, referencePoint, immediately);
        }
        return this;
      },
      fitBounds: function(bounds, immediately) {
        return this._fitBounds(bounds, {
          immediately,
          constraints: false
        });
      },
      fitBoundsWithConstraints: function(bounds, immediately) {
        return this._fitBounds(bounds, {
          immediately,
          constraints: true
        });
      },
      fitVertically: function(immediately) {
        var box = new $.Rect(this._contentBounds.x + this._contentBounds.width / 2, this._contentBounds.y, 0, this._contentBounds.height);
        return this.fitBounds(box, immediately);
      },
      fitHorizontally: function(immediately) {
        var box = new $.Rect(this._contentBounds.x, this._contentBounds.y + this._contentBounds.height / 2, this._contentBounds.width, 0);
        return this.fitBounds(box, immediately);
      },
      getConstrainedBounds: function(current) {
        var bounds, constrainedBounds;
        bounds = this.getBounds(current);
        constrainedBounds = this._applyBoundaryConstraints(bounds);
        return constrainedBounds;
      },
      panBy: function(delta, immediately) {
        var center = new $.Point(this.centerSpringX.target.value, this.centerSpringY.target.value);
        return this.panTo(center.plus(delta), immediately);
      },
      panTo: function(center, immediately) {
        if (immediately) {
          this.centerSpringX.resetTo(center.x);
          this.centerSpringY.resetTo(center.y);
        } else {
          this.centerSpringX.springTo(center.x);
          this.centerSpringY.springTo(center.y);
        }
        if (this.viewer) {
          this.viewer.raiseEvent("pan", {
            center,
            immediately
          });
        }
        return this;
      },
      zoomBy: function(factor, refPoint, immediately) {
        return this.zoomTo(this.zoomSpring.target.value * factor, refPoint, immediately);
      },
      zoomTo: function(zoom, refPoint, immediately) {
        var _this = this;
        this.zoomPoint = refPoint instanceof $.Point && !isNaN(refPoint.x) && !isNaN(refPoint.y) ? refPoint : null;
        if (immediately) {
          this._adjustCenterSpringsForZoomPoint(function() {
            _this.zoomSpring.resetTo(zoom);
          });
        } else {
          this.zoomSpring.springTo(zoom);
        }
        if (this.viewer) {
          this.viewer.raiseEvent("zoom", {
            zoom,
            refPoint,
            immediately
          });
        }
        return this;
      },
      setRotation: function(degrees, immediately) {
        return this.rotateTo(degrees, null, immediately);
      },
      getRotation: function(current) {
        return current ? this.degreesSpring.current.value : this.degreesSpring.target.value;
      },
      setRotationWithPivot: function(degrees, pivot, immediately) {
        return this.rotateTo(degrees, pivot, immediately);
      },
      rotateTo: function(degrees, pivot, immediately) {
        if (!this.viewer || !this.viewer.drawer.canRotate()) {
          return this;
        }
        if (this.degreesSpring.target.value === degrees && this.degreesSpring.isAtTargetValue()) {
          return this;
        }
        this.rotationPivot = pivot instanceof $.Point && !isNaN(pivot.x) && !isNaN(pivot.y) ? pivot : null;
        if (immediately) {
          if (this.rotationPivot) {
            var changeInDegrees = degrees - this._oldDegrees;
            if (!changeInDegrees) {
              this.rotationPivot = null;
              return this;
            }
            this._rotateAboutPivot(degrees);
          } else {
            this.degreesSpring.resetTo(degrees);
          }
        } else {
          var normalizedFrom = $.positiveModulo(this.degreesSpring.current.value, 360);
          var normalizedTo = $.positiveModulo(degrees, 360);
          var diff = normalizedTo - normalizedFrom;
          if (diff > 180) {
            normalizedTo -= 360;
          } else if (diff < -180) {
            normalizedTo += 360;
          }
          var reverseDiff = normalizedFrom - normalizedTo;
          this.degreesSpring.resetTo(degrees + reverseDiff);
          this.degreesSpring.springTo(degrees);
        }
        this._setContentBounds(this.viewer.world.getHomeBounds(), this.viewer.world.getContentFactor());
        this.viewer.forceRedraw();
        this.viewer.raiseEvent("rotate", { degrees, immediately: !!immediately, pivot: this.rotationPivot || this.getCenter() });
        return this;
      },
      rotateBy: function(degrees, pivot, immediately) {
        return this.rotateTo(this.degreesSpring.target.value + degrees, pivot, immediately);
      },
      resize: function(newContainerSize, maintain) {
        var oldBounds = this.getBoundsNoRotate(), newBounds = oldBounds, widthDeltaFactor;
        this.containerSize.x = newContainerSize.x;
        this.containerSize.y = newContainerSize.y;
        this._updateContainerInnerSize();
        if (maintain) {
          widthDeltaFactor = newContainerSize.x / this.containerSize.x;
          newBounds.width = oldBounds.width * widthDeltaFactor;
          newBounds.height = newBounds.width / this.getAspectRatio();
        }
        if (this.viewer) {
          this.viewer.raiseEvent("resize", {
            newContainerSize,
            maintain
          });
        }
        var output = this.fitBounds(newBounds, true);
        if (this.viewer) {
          this.viewer.raiseEvent("after-resize", {
            newContainerSize,
            maintain
          });
        }
        return output;
      },
      _updateContainerInnerSize: function() {
        this._containerInnerSize = new $.Point(Math.max(1, this.containerSize.x - (this._margins.left + this._margins.right)), Math.max(1, this.containerSize.y - (this._margins.top + this._margins.bottom)));
      },
      update: function() {
        var _this = this;
        this._adjustCenterSpringsForZoomPoint(function() {
          _this.zoomSpring.update();
        });
        if (this.degreesSpring.isAtTargetValue()) {
          this.rotationPivot = null;
        }
        this.centerSpringX.update();
        this.centerSpringY.update();
        if (this.rotationPivot) {
          this._rotateAboutPivot(true);
        } else {
          this.degreesSpring.update();
        }
        var changed = this.centerSpringX.current.value !== this._oldCenterX || this.centerSpringY.current.value !== this._oldCenterY || this.zoomSpring.current.value !== this._oldZoom || this.degreesSpring.current.value !== this._oldDegrees;
        this._oldCenterX = this.centerSpringX.current.value;
        this._oldCenterY = this.centerSpringY.current.value;
        this._oldZoom = this.zoomSpring.current.value;
        this._oldDegrees = this.degreesSpring.current.value;
        var isAnimating = changed || !this.zoomSpring.isAtTargetValue() || !this.centerSpringX.isAtTargetValue() || !this.centerSpringY.isAtTargetValue() || !this.degreesSpring.isAtTargetValue();
        return isAnimating;
      },
      _rotateAboutPivot: function(degreesOrUseSpring) {
        var useSpring = degreesOrUseSpring === true;
        var delta = this.rotationPivot.minus(this.getCenter());
        this.centerSpringX.shiftBy(delta.x);
        this.centerSpringY.shiftBy(delta.y);
        if (useSpring) {
          this.degreesSpring.update();
        } else {
          this.degreesSpring.resetTo(degreesOrUseSpring);
        }
        var changeInDegrees = this.degreesSpring.current.value - this._oldDegrees;
        var rdelta = delta.rotate(changeInDegrees * -1).times(-1);
        this.centerSpringX.shiftBy(rdelta.x);
        this.centerSpringY.shiftBy(rdelta.y);
      },
      _adjustCenterSpringsForZoomPoint: function(zoomSpringHandler) {
        if (this.zoomPoint) {
          var oldZoomPixel = this.pixelFromPoint(this.zoomPoint, true);
          zoomSpringHandler();
          var newZoomPixel = this.pixelFromPoint(this.zoomPoint, true);
          var deltaZoomPixels = newZoomPixel.minus(oldZoomPixel);
          var deltaZoomPoints = this.deltaPointsFromPixels(deltaZoomPixels, true);
          this.centerSpringX.shiftBy(deltaZoomPoints.x);
          this.centerSpringY.shiftBy(deltaZoomPoints.y);
          if (this.zoomSpring.isAtTargetValue()) {
            this.zoomPoint = null;
          }
        } else {
          zoomSpringHandler();
        }
      },
      deltaPixelsFromPointsNoRotate: function(deltaPoints, current) {
        return deltaPoints.times(this._containerInnerSize.x * this.getZoom(current));
      },
      deltaPixelsFromPoints: function(deltaPoints, current) {
        return this.deltaPixelsFromPointsNoRotate(deltaPoints.rotate(this.getRotation(current)), current);
      },
      deltaPointsFromPixelsNoRotate: function(deltaPixels, current) {
        return deltaPixels.divide(this._containerInnerSize.x * this.getZoom(current));
      },
      deltaPointsFromPixels: function(deltaPixels, current) {
        return this.deltaPointsFromPixelsNoRotate(deltaPixels, current).rotate(-this.getRotation(current));
      },
      pixelFromPointNoRotate: function(point, current) {
        return this._pixelFromPointNoRotate(point, this.getBoundsNoRotate(current));
      },
      pixelFromPoint: function(point, current) {
        return this._pixelFromPoint(point, this.getBoundsNoRotate(current));
      },
      _pixelFromPointNoRotate: function(point, bounds) {
        return point.minus(bounds.getTopLeft()).times(this._containerInnerSize.x / bounds.width).plus(new $.Point(this._margins.left, this._margins.top));
      },
      _pixelFromPoint: function(point, bounds) {
        return this._pixelFromPointNoRotate(point.rotate(this.getRotation(true), this.getCenter(true)), bounds);
      },
      pointFromPixelNoRotate: function(pixel, current) {
        var bounds = this.getBoundsNoRotate(current);
        return pixel.minus(new $.Point(this._margins.left, this._margins.top)).divide(this._containerInnerSize.x / bounds.width).plus(bounds.getTopLeft());
      },
      pointFromPixel: function(pixel, current) {
        return this.pointFromPixelNoRotate(pixel, current).rotate(-this.getRotation(current), this.getCenter(current));
      },
      _viewportToImageDelta: function(viewerX, viewerY) {
        var scale = this._contentBoundsNoRotate.width;
        return new $.Point(viewerX * this._contentSizeNoRotate.x / scale, viewerY * this._contentSizeNoRotate.x / scale);
      },
      viewportToImageCoordinates: function(viewerX, viewerY) {
        if (viewerX instanceof $.Point) {
          return this.viewportToImageCoordinates(viewerX.x, viewerX.y);
        }
        if (this.viewer) {
          var count = this.viewer.world.getItemCount();
          if (count > 1) {
            if (!this.silenceMultiImageWarnings) {
              $.console.error("[Viewport.viewportToImageCoordinates] is not accurate " + "with multi-image; use TiledImage.viewportToImageCoordinates instead.");
            }
          } else if (count === 1) {
            var item = this.viewer.world.getItemAt(0);
            return item.viewportToImageCoordinates(viewerX, viewerY, true);
          }
        }
        return this._viewportToImageDelta(viewerX - this._contentBoundsNoRotate.x, viewerY - this._contentBoundsNoRotate.y);
      },
      _imageToViewportDelta: function(imageX, imageY) {
        var scale = this._contentBoundsNoRotate.width;
        return new $.Point(imageX / this._contentSizeNoRotate.x * scale, imageY / this._contentSizeNoRotate.x * scale);
      },
      imageToViewportCoordinates: function(imageX, imageY) {
        if (imageX instanceof $.Point) {
          return this.imageToViewportCoordinates(imageX.x, imageX.y);
        }
        if (this.viewer) {
          var count = this.viewer.world.getItemCount();
          if (count > 1) {
            if (!this.silenceMultiImageWarnings) {
              $.console.error("[Viewport.imageToViewportCoordinates] is not accurate " + "with multi-image; use TiledImage.imageToViewportCoordinates instead.");
            }
          } else if (count === 1) {
            var item = this.viewer.world.getItemAt(0);
            return item.imageToViewportCoordinates(imageX, imageY, true);
          }
        }
        var point = this._imageToViewportDelta(imageX, imageY);
        point.x += this._contentBoundsNoRotate.x;
        point.y += this._contentBoundsNoRotate.y;
        return point;
      },
      imageToViewportRectangle: function(imageX, imageY, pixelWidth, pixelHeight) {
        var rect = imageX;
        if (!(rect instanceof $.Rect)) {
          rect = new $.Rect(imageX, imageY, pixelWidth, pixelHeight);
        }
        if (this.viewer) {
          var count = this.viewer.world.getItemCount();
          if (count > 1) {
            if (!this.silenceMultiImageWarnings) {
              $.console.error("[Viewport.imageToViewportRectangle] is not accurate " + "with multi-image; use TiledImage.imageToViewportRectangle instead.");
            }
          } else if (count === 1) {
            var item = this.viewer.world.getItemAt(0);
            return item.imageToViewportRectangle(imageX, imageY, pixelWidth, pixelHeight, true);
          }
        }
        var coordA = this.imageToViewportCoordinates(rect.x, rect.y);
        var coordB = this._imageToViewportDelta(rect.width, rect.height);
        return new $.Rect(coordA.x, coordA.y, coordB.x, coordB.y, rect.degrees);
      },
      viewportToImageRectangle: function(viewerX, viewerY, pointWidth, pointHeight) {
        var rect = viewerX;
        if (!(rect instanceof $.Rect)) {
          rect = new $.Rect(viewerX, viewerY, pointWidth, pointHeight);
        }
        if (this.viewer) {
          var count = this.viewer.world.getItemCount();
          if (count > 1) {
            if (!this.silenceMultiImageWarnings) {
              $.console.error("[Viewport.viewportToImageRectangle] is not accurate " + "with multi-image; use TiledImage.viewportToImageRectangle instead.");
            }
          } else if (count === 1) {
            var item = this.viewer.world.getItemAt(0);
            return item.viewportToImageRectangle(viewerX, viewerY, pointWidth, pointHeight, true);
          }
        }
        var coordA = this.viewportToImageCoordinates(rect.x, rect.y);
        var coordB = this._viewportToImageDelta(rect.width, rect.height);
        return new $.Rect(coordA.x, coordA.y, coordB.x, coordB.y, rect.degrees);
      },
      viewerElementToImageCoordinates: function(pixel) {
        var point = this.pointFromPixel(pixel, true);
        return this.viewportToImageCoordinates(point);
      },
      imageToViewerElementCoordinates: function(pixel) {
        var point = this.imageToViewportCoordinates(pixel);
        return this.pixelFromPoint(point, true);
      },
      windowToImageCoordinates: function(pixel) {
        $.console.assert(this.viewer, "[Viewport.windowToImageCoordinates] the viewport must have a viewer.");
        var viewerCoordinates = pixel.minus($.getElementPosition(this.viewer.element));
        return this.viewerElementToImageCoordinates(viewerCoordinates);
      },
      imageToWindowCoordinates: function(pixel) {
        $.console.assert(this.viewer, "[Viewport.imageToWindowCoordinates] the viewport must have a viewer.");
        var viewerCoordinates = this.imageToViewerElementCoordinates(pixel);
        return viewerCoordinates.plus($.getElementPosition(this.viewer.element));
      },
      viewerElementToViewportCoordinates: function(pixel) {
        return this.pointFromPixel(pixel, true);
      },
      viewportToViewerElementCoordinates: function(point) {
        return this.pixelFromPoint(point, true);
      },
      viewerElementToViewportRectangle: function(rectangle) {
        return $.Rect.fromSummits(this.pointFromPixel(rectangle.getTopLeft(), true), this.pointFromPixel(rectangle.getTopRight(), true), this.pointFromPixel(rectangle.getBottomLeft(), true));
      },
      viewportToViewerElementRectangle: function(rectangle) {
        return $.Rect.fromSummits(this.pixelFromPoint(rectangle.getTopLeft(), true), this.pixelFromPoint(rectangle.getTopRight(), true), this.pixelFromPoint(rectangle.getBottomLeft(), true));
      },
      windowToViewportCoordinates: function(pixel) {
        $.console.assert(this.viewer, "[Viewport.windowToViewportCoordinates] the viewport must have a viewer.");
        var viewerCoordinates = pixel.minus($.getElementPosition(this.viewer.element));
        return this.viewerElementToViewportCoordinates(viewerCoordinates);
      },
      viewportToWindowCoordinates: function(point) {
        $.console.assert(this.viewer, "[Viewport.viewportToWindowCoordinates] the viewport must have a viewer.");
        var viewerCoordinates = this.viewportToViewerElementCoordinates(point);
        return viewerCoordinates.plus($.getElementPosition(this.viewer.element));
      },
      viewportToImageZoom: function(viewportZoom) {
        if (this.viewer) {
          var count = this.viewer.world.getItemCount();
          if (count > 1) {
            if (!this.silenceMultiImageWarnings) {
              $.console.error("[Viewport.viewportToImageZoom] is not " + "accurate with multi-image.");
            }
          } else if (count === 1) {
            var item = this.viewer.world.getItemAt(0);
            return item.viewportToImageZoom(viewportZoom);
          }
        }
        var imageWidth = this._contentSizeNoRotate.x;
        var containerWidth = this._containerInnerSize.x;
        var scale = this._contentBoundsNoRotate.width;
        var viewportToImageZoomRatio = containerWidth / imageWidth * scale;
        return viewportZoom * viewportToImageZoomRatio;
      },
      imageToViewportZoom: function(imageZoom) {
        if (this.viewer) {
          var count = this.viewer.world.getItemCount();
          if (count > 1) {
            if (!this.silenceMultiImageWarnings) {
              $.console.error("[Viewport.imageToViewportZoom] is not accurate " + "with multi-image. Instead, use [TiledImage.imageToViewportZoom] for the specific image of interest");
            }
          } else if (count === 1) {
            var item = this.viewer.world.getItemAt(0);
            return item.imageToViewportZoom(imageZoom);
          }
        }
        var imageWidth = this._contentSizeNoRotate.x;
        var containerWidth = this._containerInnerSize.x;
        var scale = this._contentBoundsNoRotate.width;
        var viewportToImageZoomRatio = imageWidth / containerWidth / scale;
        return imageZoom * viewportToImageZoomRatio;
      },
      toggleFlip: function() {
        this.setFlip(!this.getFlip());
        return this;
      },
      getFlip: function() {
        return this.flipped;
      },
      setFlip: function(state) {
        if (this.flipped === state) {
          return this;
        }
        this.flipped = state;
        if (this.viewer.navigator) {
          this.viewer.navigator.setFlip(this.getFlip());
        }
        this.viewer.forceRedraw();
        this.viewer.raiseEvent("flip", { flipped: state });
        return this;
      },
      getMaxZoomPixelRatio: function() {
        return this.maxZoomPixelRatio;
      },
      setMaxZoomPixelRatio: function(ratio, applyConstraints = true, immediately = false) {
        $.console.assert(!isNaN(ratio), "[Viewport.setMaxZoomPixelRatio] ratio must be a number");
        if (isNaN(ratio)) {
          return;
        }
        this.maxZoomPixelRatio = ratio;
        if (applyConstraints) {
          if (this.getZoom() > this.getMaxZoom()) {
            this.applyConstraints(immediately);
          }
        }
      }
    };
  })(OpenSeadragon);
  (function($) {
    $.TiledImage = function(options) {
      this._initialized = false;
      $.console.assert(options.tileCache, "[TiledImage] options.tileCache is required");
      $.console.assert(options.drawer, "[TiledImage] options.drawer is required");
      $.console.assert(options.viewer, "[TiledImage] options.viewer is required");
      $.console.assert(options.imageLoader, "[TiledImage] options.imageLoader is required");
      $.console.assert(options.source, "[TiledImage] options.source is required");
      $.console.assert(!options.clip || options.clip instanceof $.Rect, "[TiledImage] options.clip must be an OpenSeadragon.Rect if present");
      $.EventSource.call(this);
      this._tileCache = options.tileCache;
      delete options.tileCache;
      this._drawer = options.drawer;
      delete options.drawer;
      this._imageLoader = options.imageLoader;
      delete options.imageLoader;
      if (options.clip instanceof $.Rect) {
        this._clip = options.clip.clone();
      }
      delete options.clip;
      var x = options.x || 0;
      delete options.x;
      var y = options.y || 0;
      delete options.y;
      this.normHeight = options.source.dimensions.y / options.source.dimensions.x;
      this.contentAspectX = options.source.dimensions.x / options.source.dimensions.y;
      var scale = 1;
      if (options.width) {
        scale = options.width;
        delete options.width;
        if (options.height) {
          $.console.error("specifying both width and height to a tiledImage is not supported");
          delete options.height;
        }
      } else if (options.height) {
        scale = options.height / this.normHeight;
        delete options.height;
      }
      var fitBounds = options.fitBounds;
      delete options.fitBounds;
      var fitBoundsPlacement = options.fitBoundsPlacement || OpenSeadragon.Placement.CENTER;
      delete options.fitBoundsPlacement;
      var degrees = options.degrees || 0;
      delete options.degrees;
      var ajaxHeaders = options.ajaxHeaders;
      delete options.ajaxHeaders;
      $.extend(true, this, {
        viewer: null,
        tilesMatrix: {},
        coverage: {},
        loadingCoverage: {},
        lastDrawn: [],
        lastResetTime: 0,
        _needsDraw: true,
        _needsUpdate: true,
        _hasOpaqueTile: false,
        _tilesLoading: 0,
        _tilesToDraw: [],
        _lastDrawn: [],
        _isBlending: false,
        _wasBlending: false,
        _isTainted: false,
        springStiffness: $.DEFAULT_SETTINGS.springStiffness,
        animationTime: $.DEFAULT_SETTINGS.animationTime,
        minZoomImageRatio: $.DEFAULT_SETTINGS.minZoomImageRatio,
        wrapHorizontal: $.DEFAULT_SETTINGS.wrapHorizontal,
        wrapVertical: $.DEFAULT_SETTINGS.wrapVertical,
        immediateRender: $.DEFAULT_SETTINGS.immediateRender,
        blendTime: $.DEFAULT_SETTINGS.blendTime,
        alwaysBlend: $.DEFAULT_SETTINGS.alwaysBlend,
        minPixelRatio: $.DEFAULT_SETTINGS.minPixelRatio,
        smoothTileEdgesMinZoom: $.DEFAULT_SETTINGS.smoothTileEdgesMinZoom,
        iOSDevice: $.DEFAULT_SETTINGS.iOSDevice,
        debugMode: $.DEFAULT_SETTINGS.debugMode,
        crossOriginPolicy: $.DEFAULT_SETTINGS.crossOriginPolicy,
        ajaxWithCredentials: $.DEFAULT_SETTINGS.ajaxWithCredentials,
        placeholderFillStyle: $.DEFAULT_SETTINGS.placeholderFillStyle,
        opacity: $.DEFAULT_SETTINGS.opacity,
        preload: $.DEFAULT_SETTINGS.preload,
        compositeOperation: $.DEFAULT_SETTINGS.compositeOperation,
        subPixelRoundingForTransparency: $.DEFAULT_SETTINGS.subPixelRoundingForTransparency,
        maxTilesPerFrame: $.DEFAULT_SETTINGS.maxTilesPerFrame
      }, options);
      this._preload = this.preload;
      delete this.preload;
      this._fullyLoaded = false;
      this._xSpring = new $.Spring({
        initial: x,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime
      });
      this._ySpring = new $.Spring({
        initial: y,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime
      });
      this._scaleSpring = new $.Spring({
        initial: scale,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime
      });
      this._degreesSpring = new $.Spring({
        initial: degrees,
        springStiffness: this.springStiffness,
        animationTime: this.animationTime
      });
      this._updateForScale();
      if (fitBounds) {
        this.fitBounds(fitBounds, fitBoundsPlacement, true);
      }
      this._ownAjaxHeaders = {};
      this.setAjaxHeaders(ajaxHeaders, false);
      this._initialized = true;
    };
    $.extend($.TiledImage.prototype, $.EventSource.prototype, {
      needsDraw: function() {
        return this._needsDraw;
      },
      redraw: function() {
        this._needsDraw = true;
      },
      getFullyLoaded: function() {
        return this._fullyLoaded;
      },
      _setFullyLoaded: function(flag) {
        if (flag === this._fullyLoaded) {
          return;
        }
        this._fullyLoaded = flag;
        this.raiseEvent("fully-loaded-change", {
          fullyLoaded: this._fullyLoaded
        });
      },
      reset: function() {
        this._tileCache.clearTilesFor(this);
        this.lastResetTime = $.now();
        this._needsDraw = true;
      },
      update: function(viewportChanged) {
        let xUpdated = this._xSpring.update();
        let yUpdated = this._ySpring.update();
        let scaleUpdated = this._scaleSpring.update();
        let degreesUpdated = this._degreesSpring.update();
        let updated = xUpdated || yUpdated || scaleUpdated || degreesUpdated || this._needsUpdate;
        if (updated || viewportChanged || !this._fullyLoaded) {
          let fullyLoadedFlag = this._updateLevelsForViewport();
          this._setFullyLoaded(fullyLoadedFlag);
        }
        this._needsUpdate = false;
        if (updated) {
          this._updateForScale();
          this._raiseBoundsChange();
          this._needsDraw = true;
          return true;
        }
        return false;
      },
      setDrawn: function() {
        this._needsDraw = this._isBlending || this._wasBlending;
        return this._needsDraw;
      },
      setTainted(isTainted) {
        this._isTainted = isTainted;
      },
      isTainted() {
        return this._isTainted;
      },
      destroy: function() {
        this.reset();
        if (this.source.destroy) {
          this.source.destroy(this.viewer);
        }
      },
      getBounds: function(current) {
        return this.getBoundsNoRotate(current).rotate(this.getRotation(current), this._getRotationPoint(current));
      },
      getBoundsNoRotate: function(current) {
        return current ? new $.Rect(this._xSpring.current.value, this._ySpring.current.value, this._worldWidthCurrent, this._worldHeightCurrent) : new $.Rect(this._xSpring.target.value, this._ySpring.target.value, this._worldWidthTarget, this._worldHeightTarget);
      },
      getWorldBounds: function() {
        $.console.error("[TiledImage.getWorldBounds] is deprecated; use TiledImage.getBounds instead");
        return this.getBounds();
      },
      getClippedBounds: function(current) {
        var bounds = this.getBoundsNoRotate(current);
        if (this._clip) {
          var worldWidth = current ? this._worldWidthCurrent : this._worldWidthTarget;
          var ratio = worldWidth / this.source.dimensions.x;
          var clip = this._clip.times(ratio);
          bounds = new $.Rect(bounds.x + clip.x, bounds.y + clip.y, clip.width, clip.height);
        }
        return bounds.rotate(this.getRotation(current), this._getRotationPoint(current));
      },
      getTileBounds: function(level, x, y) {
        var numTiles = this.source.getNumTiles(level);
        var xMod = (numTiles.x + x % numTiles.x) % numTiles.x;
        var yMod = (numTiles.y + y % numTiles.y) % numTiles.y;
        var bounds = this.source.getTileBounds(level, xMod, yMod);
        if (this.getFlip()) {
          bounds.x = Math.max(0, 1 - bounds.x - bounds.width);
        }
        bounds.x += (x - xMod) / numTiles.x;
        bounds.y += this._worldHeightCurrent / this._worldWidthCurrent * ((y - yMod) / numTiles.y);
        return bounds;
      },
      getContentSize: function() {
        return new $.Point(this.source.dimensions.x, this.source.dimensions.y);
      },
      getSizeInWindowCoordinates: function() {
        var topLeft = this.imageToWindowCoordinates(new $.Point(0, 0));
        var bottomRight = this.imageToWindowCoordinates(this.getContentSize());
        return new $.Point(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
      },
      _viewportToImageDelta: function(viewerX, viewerY, current) {
        var scale = current ? this._scaleSpring.current.value : this._scaleSpring.target.value;
        return new $.Point(viewerX * (this.source.dimensions.x / scale), viewerY * (this.source.dimensions.y * this.contentAspectX / scale));
      },
      viewportToImageCoordinates: function(viewerX, viewerY, current) {
        var point;
        if (viewerX instanceof $.Point) {
          current = viewerY;
          point = viewerX;
        } else {
          point = new $.Point(viewerX, viewerY);
        }
        point = point.rotate(-this.getRotation(current), this._getRotationPoint(current));
        return current ? this._viewportToImageDelta(point.x - this._xSpring.current.value, point.y - this._ySpring.current.value) : this._viewportToImageDelta(point.x - this._xSpring.target.value, point.y - this._ySpring.target.value);
      },
      _imageToViewportDelta: function(imageX, imageY, current) {
        var scale = current ? this._scaleSpring.current.value : this._scaleSpring.target.value;
        return new $.Point(imageX / this.source.dimensions.x * scale, imageY / this.source.dimensions.y / this.contentAspectX * scale);
      },
      imageToViewportCoordinates: function(imageX, imageY, current) {
        if (imageX instanceof $.Point) {
          current = imageY;
          imageY = imageX.y;
          imageX = imageX.x;
        }
        var point = this._imageToViewportDelta(imageX, imageY, current);
        if (current) {
          point.x += this._xSpring.current.value;
          point.y += this._ySpring.current.value;
        } else {
          point.x += this._xSpring.target.value;
          point.y += this._ySpring.target.value;
        }
        return point.rotate(this.getRotation(current), this._getRotationPoint(current));
      },
      imageToViewportRectangle: function(imageX, imageY, pixelWidth, pixelHeight, current) {
        var rect = imageX;
        if (rect instanceof $.Rect) {
          current = imageY;
        } else {
          rect = new $.Rect(imageX, imageY, pixelWidth, pixelHeight);
        }
        var coordA = this.imageToViewportCoordinates(rect.getTopLeft(), current);
        var coordB = this._imageToViewportDelta(rect.width, rect.height, current);
        return new $.Rect(coordA.x, coordA.y, coordB.x, coordB.y, rect.degrees + this.getRotation(current));
      },
      viewportToImageRectangle: function(viewerX, viewerY, pointWidth, pointHeight, current) {
        var rect = viewerX;
        if (viewerX instanceof $.Rect) {
          current = viewerY;
        } else {
          rect = new $.Rect(viewerX, viewerY, pointWidth, pointHeight);
        }
        var coordA = this.viewportToImageCoordinates(rect.getTopLeft(), current);
        var coordB = this._viewportToImageDelta(rect.width, rect.height, current);
        return new $.Rect(coordA.x, coordA.y, coordB.x, coordB.y, rect.degrees - this.getRotation(current));
      },
      viewerElementToImageCoordinates: function(pixel) {
        var point = this.viewport.pointFromPixel(pixel, true);
        return this.viewportToImageCoordinates(point);
      },
      imageToViewerElementCoordinates: function(pixel) {
        var point = this.imageToViewportCoordinates(pixel);
        return this.viewport.pixelFromPoint(point, true);
      },
      windowToImageCoordinates: function(pixel) {
        var viewerCoordinates = pixel.minus(OpenSeadragon.getElementPosition(this.viewer.element));
        return this.viewerElementToImageCoordinates(viewerCoordinates);
      },
      imageToWindowCoordinates: function(pixel) {
        var viewerCoordinates = this.imageToViewerElementCoordinates(pixel);
        return viewerCoordinates.plus(OpenSeadragon.getElementPosition(this.viewer.element));
      },
      _viewportToTiledImageRectangle: function(rect) {
        var scale = this._scaleSpring.current.value;
        rect = rect.rotate(-this.getRotation(true), this._getRotationPoint(true));
        return new $.Rect((rect.x - this._xSpring.current.value) / scale, (rect.y - this._ySpring.current.value) / scale, rect.width / scale, rect.height / scale, rect.degrees);
      },
      viewportToImageZoom: function(viewportZoom) {
        var ratio = this._scaleSpring.current.value * this.viewport._containerInnerSize.x / this.source.dimensions.x;
        return ratio * viewportZoom;
      },
      imageToViewportZoom: function(imageZoom) {
        var ratio = this._scaleSpring.current.value * this.viewport._containerInnerSize.x / this.source.dimensions.x;
        return imageZoom / ratio;
      },
      setPosition: function(position, immediately) {
        var sameTarget = this._xSpring.target.value === position.x && this._ySpring.target.value === position.y;
        if (immediately) {
          if (sameTarget && this._xSpring.current.value === position.x && this._ySpring.current.value === position.y) {
            return;
          }
          this._xSpring.resetTo(position.x);
          this._ySpring.resetTo(position.y);
          this._needsDraw = true;
          this._needsUpdate = true;
        } else {
          if (sameTarget) {
            return;
          }
          this._xSpring.springTo(position.x);
          this._ySpring.springTo(position.y);
          this._needsDraw = true;
          this._needsUpdate = true;
        }
        if (!sameTarget) {
          this._raiseBoundsChange();
        }
      },
      setWidth: function(width, immediately) {
        this._setScale(width, immediately);
      },
      setHeight: function(height, immediately) {
        this._setScale(height / this.normHeight, immediately);
      },
      setCroppingPolygons: function(polygons) {
        var isXYObject = function(obj) {
          return obj instanceof $.Point || typeof obj.x === "number" && typeof obj.y === "number";
        };
        var objectToSimpleXYObject = function(objs) {
          return objs.map(function(obj) {
            try {
              if (isXYObject(obj)) {
                return { x: obj.x, y: obj.y };
              } else {
                throw new Error;
              }
            } catch (e) {
              throw new Error("A Provided cropping polygon point is not supported");
            }
          });
        };
        try {
          if (!$.isArray(polygons)) {
            throw new Error("Provided cropping polygon is not an array");
          }
          this._croppingPolygons = polygons.map(function(polygon) {
            return objectToSimpleXYObject(polygon);
          });
          this._needsDraw = true;
        } catch (e) {
          $.console.error("[TiledImage.setCroppingPolygons] Cropping polygon format not supported");
          $.console.error(e);
          this.resetCroppingPolygons();
        }
      },
      resetCroppingPolygons: function() {
        this._croppingPolygons = null;
        this._needsDraw = true;
      },
      fitBounds: function(bounds, anchor, immediately) {
        anchor = anchor || $.Placement.CENTER;
        var anchorProperties = $.Placement.properties[anchor];
        var aspectRatio = this.contentAspectX;
        var xOffset = 0;
        var yOffset = 0;
        var displayedWidthRatio = 1;
        var displayedHeightRatio = 1;
        if (this._clip) {
          aspectRatio = this._clip.getAspectRatio();
          displayedWidthRatio = this._clip.width / this.source.dimensions.x;
          displayedHeightRatio = this._clip.height / this.source.dimensions.y;
          if (bounds.getAspectRatio() > aspectRatio) {
            xOffset = this._clip.x / this._clip.height * bounds.height;
            yOffset = this._clip.y / this._clip.height * bounds.height;
          } else {
            xOffset = this._clip.x / this._clip.width * bounds.width;
            yOffset = this._clip.y / this._clip.width * bounds.width;
          }
        }
        if (bounds.getAspectRatio() > aspectRatio) {
          var height = bounds.height / displayedHeightRatio;
          var marginLeft = 0;
          if (anchorProperties.isHorizontallyCentered) {
            marginLeft = (bounds.width - bounds.height * aspectRatio) / 2;
          } else if (anchorProperties.isRight) {
            marginLeft = bounds.width - bounds.height * aspectRatio;
          }
          this.setPosition(new $.Point(bounds.x - xOffset + marginLeft, bounds.y - yOffset), immediately);
          this.setHeight(height, immediately);
        } else {
          var width = bounds.width / displayedWidthRatio;
          var marginTop = 0;
          if (anchorProperties.isVerticallyCentered) {
            marginTop = (bounds.height - bounds.width / aspectRatio) / 2;
          } else if (anchorProperties.isBottom) {
            marginTop = bounds.height - bounds.width / aspectRatio;
          }
          this.setPosition(new $.Point(bounds.x - xOffset, bounds.y - yOffset + marginTop), immediately);
          this.setWidth(width, immediately);
        }
      },
      getClip: function() {
        if (this._clip) {
          return this._clip.clone();
        }
        return null;
      },
      setClip: function(newClip) {
        $.console.assert(!newClip || newClip instanceof $.Rect, "[TiledImage.setClip] newClip must be an OpenSeadragon.Rect or null");
        if (newClip instanceof $.Rect) {
          this._clip = newClip.clone();
        } else {
          this._clip = null;
        }
        this._needsUpdate = true;
        this._needsDraw = true;
        this.raiseEvent("clip-change");
      },
      getFlip: function() {
        return this.flipped;
      },
      setFlip: function(flip) {
        this.flipped = flip;
      },
      get flipped() {
        return this._flipped;
      },
      set flipped(flipped) {
        let changed = this._flipped !== !!flipped;
        this._flipped = !!flipped;
        if (changed) {
          this.update(true);
          this._needsDraw = true;
          this._raiseBoundsChange();
        }
      },
      get wrapHorizontal() {
        return this._wrapHorizontal;
      },
      set wrapHorizontal(wrap) {
        let changed = this._wrapHorizontal !== !!wrap;
        this._wrapHorizontal = !!wrap;
        if (this._initialized && changed) {
          this.update(true);
          this._needsDraw = true;
        }
      },
      get wrapVertical() {
        return this._wrapVertical;
      },
      set wrapVertical(wrap) {
        let changed = this._wrapVertical !== !!wrap;
        this._wrapVertical = !!wrap;
        if (this._initialized && changed) {
          this.update(true);
          this._needsDraw = true;
        }
      },
      get debugMode() {
        return this._debugMode;
      },
      set debugMode(debug) {
        this._debugMode = !!debug;
        this._needsDraw = true;
      },
      getOpacity: function() {
        return this.opacity;
      },
      setOpacity: function(opacity) {
        this.opacity = opacity;
      },
      get opacity() {
        return this._opacity;
      },
      set opacity(opacity) {
        if (opacity === this.opacity) {
          return;
        }
        this._opacity = opacity;
        this._needsDraw = true;
        this.raiseEvent("opacity-change", {
          opacity: this.opacity
        });
      },
      getPreload: function() {
        return this._preload;
      },
      setPreload: function(preload) {
        this._preload = !!preload;
        this._needsDraw = true;
      },
      getRotation: function(current) {
        return current ? this._degreesSpring.current.value : this._degreesSpring.target.value;
      },
      setRotation: function(degrees, immediately) {
        if (this._degreesSpring.target.value === degrees && this._degreesSpring.isAtTargetValue()) {
          return;
        }
        if (immediately) {
          this._degreesSpring.resetTo(degrees);
        } else {
          this._degreesSpring.springTo(degrees);
        }
        this._needsDraw = true;
        this._needsUpdate = true;
        this._raiseBoundsChange();
      },
      getDrawArea: function() {
        if (this._opacity === 0 && !this._preload) {
          return false;
        }
        var drawArea = this._viewportToTiledImageRectangle(this.viewport.getBoundsWithMargins(true));
        if (!this.wrapHorizontal && !this.wrapVertical) {
          var tiledImageBounds = this._viewportToTiledImageRectangle(this.getClippedBounds(true));
          drawArea = drawArea.intersection(tiledImageBounds);
        }
        return drawArea;
      },
      getTilesToDraw: function() {
        let tileArray = this._tilesToDraw.flat();
        this._updateTilesInViewport(tileArray);
        tileArray = this._tilesToDraw.flat();
        tileArray.forEach((tileInfo) => {
          tileInfo.tile.beingDrawn = true;
        });
        this._lastDrawn = tileArray;
        return tileArray;
      },
      _getRotationPoint: function(current) {
        return this.getBoundsNoRotate(current).getCenter();
      },
      get compositeOperation() {
        return this._compositeOperation;
      },
      set compositeOperation(compositeOperation) {
        if (compositeOperation === this._compositeOperation) {
          return;
        }
        this._compositeOperation = compositeOperation;
        this._needsDraw = true;
        this.raiseEvent("composite-operation-change", {
          compositeOperation: this._compositeOperation
        });
      },
      getCompositeOperation: function() {
        return this._compositeOperation;
      },
      setCompositeOperation: function(compositeOperation) {
        this.compositeOperation = compositeOperation;
      },
      setAjaxHeaders: function(ajaxHeaders, propagate) {
        if (ajaxHeaders === null) {
          ajaxHeaders = {};
        }
        if (!$.isPlainObject(ajaxHeaders)) {
          console.error("[TiledImage.setAjaxHeaders] Ignoring invalid headers, must be a plain object");
          return;
        }
        this._ownAjaxHeaders = ajaxHeaders;
        this._updateAjaxHeaders(propagate);
      },
      _updateAjaxHeaders: function(propagate) {
        if (propagate === undefined) {
          propagate = true;
        }
        if ($.isPlainObject(this.viewer.ajaxHeaders)) {
          this.ajaxHeaders = $.extend({}, this.viewer.ajaxHeaders, this._ownAjaxHeaders);
        } else {
          this.ajaxHeaders = this._ownAjaxHeaders;
        }
        if (propagate) {
          var numTiles, xMod, yMod, tile;
          for (var level in this.tilesMatrix) {
            numTiles = this.source.getNumTiles(level);
            for (var x in this.tilesMatrix[level]) {
              xMod = (numTiles.x + x % numTiles.x) % numTiles.x;
              for (var y in this.tilesMatrix[level][x]) {
                yMod = (numTiles.y + y % numTiles.y) % numTiles.y;
                tile = this.tilesMatrix[level][x][y];
                tile.loadWithAjax = this.loadTilesWithAjax;
                if (tile.loadWithAjax) {
                  var tileAjaxHeaders = this.source.getTileAjaxHeaders(level, xMod, yMod);
                  tile.ajaxHeaders = $.extend({}, this.ajaxHeaders, tileAjaxHeaders);
                } else {
                  tile.ajaxHeaders = null;
                }
              }
            }
          }
          for (var i = 0;i < this._imageLoader.jobQueue.length; i++) {
            var job = this._imageLoader.jobQueue[i];
            job.loadWithAjax = job.tile.loadWithAjax;
            job.ajaxHeaders = job.tile.loadWithAjax ? job.tile.ajaxHeaders : null;
          }
        }
      },
      _setScale: function(scale, immediately) {
        var sameTarget = this._scaleSpring.target.value === scale;
        if (immediately) {
          if (sameTarget && this._scaleSpring.current.value === scale) {
            return;
          }
          this._scaleSpring.resetTo(scale);
          this._updateForScale();
          this._needsDraw = true;
          this._needsUpdate = true;
        } else {
          if (sameTarget) {
            return;
          }
          this._scaleSpring.springTo(scale);
          this._updateForScale();
          this._needsDraw = true;
          this._needsUpdate = true;
        }
        if (!sameTarget) {
          this._raiseBoundsChange();
        }
      },
      _updateForScale: function() {
        this._worldWidthTarget = this._scaleSpring.target.value;
        this._worldHeightTarget = this.normHeight * this._scaleSpring.target.value;
        this._worldWidthCurrent = this._scaleSpring.current.value;
        this._worldHeightCurrent = this.normHeight * this._scaleSpring.current.value;
      },
      _raiseBoundsChange: function() {
        this.raiseEvent("bounds-change");
      },
      _isBottomItem: function() {
        return this.viewer.world.getItemAt(0) === this;
      },
      _getLevelsInterval: function() {
        var lowestLevel = Math.max(this.source.minLevel, Math.floor(Math.log(this.minZoomImageRatio) / Math.log(2)));
        var currentZeroRatio = this.viewport.deltaPixelsFromPointsNoRotate(this.source.getPixelRatio(0), true).x * this._scaleSpring.current.value;
        var highestLevel = Math.min(Math.abs(this.source.maxLevel), Math.abs(Math.floor(Math.log(currentZeroRatio / this.minPixelRatio) / Math.log(2))));
        highestLevel = Math.max(highestLevel, this.source.minLevel || 0);
        lowestLevel = Math.min(lowestLevel, highestLevel);
        return {
          lowestLevel,
          highestLevel
        };
      },
      _updateLevelsForViewport: function() {
        var levelsInterval = this._getLevelsInterval();
        var lowestLevel = levelsInterval.lowestLevel;
        var highestLevel = levelsInterval.highestLevel;
        var bestTiles = [];
        var drawArea = this.getDrawArea();
        var currentTime = $.now();
        this._lastDrawn.forEach((tileinfo) => {
          tileinfo.tile.beingDrawn = false;
        });
        this._tilesToDraw = [];
        this._tilesLoading = 0;
        this.loadingCoverage = {};
        if (!drawArea) {
          this._needsDraw = false;
          return this._fullyLoaded;
        }
        var levelList = new Array(highestLevel - lowestLevel + 1);
        for (let i = 0, level = highestLevel;level >= lowestLevel; level--, i++) {
          levelList[i] = level;
        }
        for (let level = highestLevel + 1;level <= this.source.maxLevel; level++) {
          var tile = this.tilesMatrix[level] && this.tilesMatrix[level][0] && this.tilesMatrix[level][0][0];
          if (tile && tile.isBottomMost && tile.isRightMost && tile.loaded) {
            levelList.push(level);
            break;
          }
        }
        let useLevel = false;
        for (let i = 0;i < levelList.length; i++) {
          let level = levelList[i];
          var currentRenderPixelRatio = this.viewport.deltaPixelsFromPointsNoRotate(this.source.getPixelRatio(level), true).x * this._scaleSpring.current.value;
          if (i === levelList.length - 1 || currentRenderPixelRatio >= this.minPixelRatio) {
            useLevel = true;
          } else if (!useLevel) {
            continue;
          }
          var targetRenderPixelRatio = this.viewport.deltaPixelsFromPointsNoRotate(this.source.getPixelRatio(level), false).x * this._scaleSpring.current.value;
          var targetZeroRatio = this.viewport.deltaPixelsFromPointsNoRotate(this.source.getPixelRatio(Math.max(this.source.getClosestLevel(), 0)), false).x * this._scaleSpring.current.value;
          var optimalRatio = this.immediateRender ? 1 : targetZeroRatio;
          var levelOpacity = Math.min(1, (currentRenderPixelRatio - 0.5) / 0.5);
          var levelVisibility = optimalRatio / Math.abs(optimalRatio - targetRenderPixelRatio);
          var result = this._updateLevel(level, levelOpacity, levelVisibility, drawArea, currentTime, bestTiles);
          bestTiles = result.bestTiles;
          var tiles = result.updatedTiles.filter((tile2) => tile2.loaded);
          var makeTileInfoObject = function(level2, levelOpacity2, currentTime2) {
            return function(tile2) {
              return {
                tile: tile2,
                level: level2,
                levelOpacity: levelOpacity2,
                currentTime: currentTime2
              };
            };
          }(level, levelOpacity, currentTime);
          this._tilesToDraw[level] = tiles.map(makeTileInfoObject);
          if (this._providesCoverage(this.coverage, level)) {
            break;
          }
        }
        if (bestTiles && bestTiles.length > 0) {
          bestTiles.forEach(function(tile2) {
            if (tile2 && !tile2.context2D) {
              this._loadTile(tile2, currentTime);
            }
          }, this);
          this._needsDraw = true;
          return false;
        } else {
          return this._tilesLoading === 0;
        }
      },
      _updateTilesInViewport: function(tiles) {
        let currentTime = $.now();
        let _this = this;
        this._tilesLoading = 0;
        this._wasBlending = this._isBlending;
        this._isBlending = false;
        this.loadingCoverage = {};
        let lowestLevel = tiles.length ? tiles[0].level : 0;
        let drawArea = this.getDrawArea();
        if (!drawArea) {
          return;
        }
        function updateTile(info) {
          let tile = info.tile;
          if (tile && tile.loaded) {
            let tileIsBlending = _this._blendTile(tile, tile.x, tile.y, info.level, info.levelOpacity, currentTime, lowestLevel);
            _this._isBlending = _this._isBlending || tileIsBlending;
            _this._needsDraw = _this._needsDraw || tileIsBlending || _this._wasBlending;
          }
        }
        let level = 0;
        for (let i = 0;i < tiles.length; i++) {
          let tile = tiles[i];
          updateTile(tile);
          if (this._providesCoverage(this.coverage, tile.level)) {
            level = Math.max(level, tile.level);
          }
        }
        if (level > 0) {
          for (let levelKey in this._tilesToDraw) {
            if (levelKey < level) {
              delete this._tilesToDraw[levelKey];
            }
          }
        }
      },
      _blendTile: function(tile, x, y, level, levelOpacity, currentTime, lowestLevel) {
        let blendTimeMillis = 1000 * this.blendTime, deltaTime, opacity;
        if (!tile.blendStart) {
          tile.blendStart = currentTime;
        }
        deltaTime = currentTime - tile.blendStart;
        opacity = blendTimeMillis ? Math.min(1, deltaTime / blendTimeMillis) : 1;
        if (level === lowestLevel) {
          opacity = 1;
          deltaTime = blendTimeMillis;
        }
        if (this.alwaysBlend) {
          opacity *= levelOpacity;
        }
        tile.opacity = opacity;
        if (opacity === 1) {
          this._setCoverage(this.coverage, level, x, y, true);
          this._hasOpaqueTile = true;
        }
        return deltaTime < blendTimeMillis;
      },
      _updateLevel: function(level, levelOpacity, levelVisibility, drawArea, currentTime, best) {
        var topLeftBound = drawArea.getBoundingBox().getTopLeft();
        var bottomRightBound = drawArea.getBoundingBox().getBottomRight();
        if (this.viewer) {
          this.viewer.raiseEvent("update-level", {
            tiledImage: this,
            havedrawn: true,
            level,
            opacity: levelOpacity,
            visibility: levelVisibility,
            drawArea,
            topleft: topLeftBound,
            bottomright: bottomRightBound,
            currenttime: currentTime,
            best
          });
        }
        this._resetCoverage(this.coverage, level);
        this._resetCoverage(this.loadingCoverage, level);
        var cornerTiles = this._getCornerTiles(level, topLeftBound, bottomRightBound);
        var topLeftTile = cornerTiles.topLeft;
        var bottomRightTile = cornerTiles.bottomRight;
        var numberOfTiles = this.source.getNumTiles(level);
        var viewportCenter = this.viewport.pixelFromPoint(this.viewport.getCenter());
        if (this.getFlip()) {
          bottomRightTile.x += 1;
          if (!this.wrapHorizontal) {
            bottomRightTile.x = Math.min(bottomRightTile.x, numberOfTiles.x - 1);
          }
        }
        var numTiles = Math.max(0, (bottomRightTile.x - topLeftTile.x) * (bottomRightTile.y - topLeftTile.y));
        var tiles = new Array(numTiles);
        var tileIndex = 0;
        for (var x = topLeftTile.x;x <= bottomRightTile.x; x++) {
          for (var y = topLeftTile.y;y <= bottomRightTile.y; y++) {
            var flippedX;
            if (this.getFlip()) {
              var xMod = (numberOfTiles.x + x % numberOfTiles.x) % numberOfTiles.x;
              flippedX = x + numberOfTiles.x - xMod - xMod - 1;
            } else {
              flippedX = x;
            }
            if (drawArea.intersection(this.getTileBounds(level, flippedX, y)) === null) {
              continue;
            }
            var result = this._updateTile(flippedX, y, level, levelVisibility, viewportCenter, numberOfTiles, currentTime, best);
            best = result.bestTiles;
            tiles[tileIndex] = result.tile;
            tileIndex += 1;
          }
        }
        return {
          bestTiles: best,
          updatedTiles: tiles
        };
      },
      _positionTile: function(tile, overlap, viewport, viewportCenter, levelVisibility) {
        var boundsTL = tile.bounds.getTopLeft();
        boundsTL.x *= this._scaleSpring.current.value;
        boundsTL.y *= this._scaleSpring.current.value;
        boundsTL.x += this._xSpring.current.value;
        boundsTL.y += this._ySpring.current.value;
        var boundsSize = tile.bounds.getSize();
        boundsSize.x *= this._scaleSpring.current.value;
        boundsSize.y *= this._scaleSpring.current.value;
        tile.positionedBounds.x = boundsTL.x;
        tile.positionedBounds.y = boundsTL.y;
        tile.positionedBounds.width = boundsSize.x;
        tile.positionedBounds.height = boundsSize.y;
        var positionC = viewport.pixelFromPointNoRotate(boundsTL, true), positionT = viewport.pixelFromPointNoRotate(boundsTL, false), sizeC = viewport.deltaPixelsFromPointsNoRotate(boundsSize, true), sizeT = viewport.deltaPixelsFromPointsNoRotate(boundsSize, false), tileCenter = positionT.plus(sizeT.divide(2)), tileSquaredDistance = viewportCenter.squaredDistanceTo(tileCenter);
        if (this.viewer.drawer.minimumOverlapRequired(this)) {
          if (!overlap) {
            sizeC = sizeC.plus(new $.Point(1, 1));
          }
          if (tile.isRightMost && this.wrapHorizontal) {
            sizeC.x += 0.75;
          }
          if (tile.isBottomMost && this.wrapVertical) {
            sizeC.y += 0.75;
          }
        }
        tile.position = positionC;
        tile.size = sizeC;
        tile.squaredDistance = tileSquaredDistance;
        tile.visibility = levelVisibility;
      },
      _updateTile: function(x, y, level, levelVisibility, viewportCenter, numberOfTiles, currentTime, best) {
        var tile = this._getTile(x, y, level, currentTime, numberOfTiles);
        if (this.viewer) {
          this.viewer.raiseEvent("update-tile", {
            tiledImage: this,
            tile
          });
        }
        this._setCoverage(this.coverage, level, x, y, false);
        var loadingCoverage = tile.loaded || tile.loading || this._isCovered(this.loadingCoverage, level, x, y);
        this._setCoverage(this.loadingCoverage, level, x, y, loadingCoverage);
        if (!tile.exists) {
          return {
            bestTiles: best,
            tile
          };
        }
        if (tile.loaded && tile.opacity === 1) {
          this._setCoverage(this.coverage, level, x, y, true);
        }
        this._positionTile(tile, this.source.tileOverlap, this.viewport, viewportCenter, levelVisibility);
        if (!tile.loaded) {
          if (tile.context2D) {
            this._setTileLoaded(tile);
          } else {
            var imageRecord = this._tileCache.getImageRecord(tile.cacheKey);
            if (imageRecord) {
              this._setTileLoaded(tile, imageRecord.getData());
            }
          }
        }
        if (tile.loading) {
          this._tilesLoading++;
        } else if (!loadingCoverage) {
          best = this._compareTiles(best, tile, this.maxTilesPerFrame);
        }
        return {
          bestTiles: best,
          tile
        };
      },
      _getCornerTiles: function(level, topLeftBound, bottomRightBound) {
        var leftX;
        var rightX;
        if (this.wrapHorizontal) {
          leftX = $.positiveModulo(topLeftBound.x, 1);
          rightX = $.positiveModulo(bottomRightBound.x, 1);
        } else {
          leftX = Math.max(0, topLeftBound.x);
          rightX = Math.min(1, bottomRightBound.x);
        }
        var topY;
        var bottomY;
        var aspectRatio = 1 / this.source.aspectRatio;
        if (this.wrapVertical) {
          topY = $.positiveModulo(topLeftBound.y, aspectRatio);
          bottomY = $.positiveModulo(bottomRightBound.y, aspectRatio);
        } else {
          topY = Math.max(0, topLeftBound.y);
          bottomY = Math.min(aspectRatio, bottomRightBound.y);
        }
        var topLeftTile = this.source.getTileAtPoint(level, new $.Point(leftX, topY));
        var bottomRightTile = this.source.getTileAtPoint(level, new $.Point(rightX, bottomY));
        var numTiles = this.source.getNumTiles(level);
        if (this.wrapHorizontal) {
          topLeftTile.x += numTiles.x * Math.floor(topLeftBound.x);
          bottomRightTile.x += numTiles.x * Math.floor(bottomRightBound.x);
        }
        if (this.wrapVertical) {
          topLeftTile.y += numTiles.y * Math.floor(topLeftBound.y / aspectRatio);
          bottomRightTile.y += numTiles.y * Math.floor(bottomRightBound.y / aspectRatio);
        }
        return {
          topLeft: topLeftTile,
          bottomRight: bottomRightTile
        };
      },
      _getTile: function(x, y, level, time, numTiles) {
        var xMod, yMod, bounds, sourceBounds, exists, urlOrGetter, post, ajaxHeaders, context2D, tile, tilesMatrix = this.tilesMatrix, tileSource = this.source;
        if (!tilesMatrix[level]) {
          tilesMatrix[level] = {};
        }
        if (!tilesMatrix[level][x]) {
          tilesMatrix[level][x] = {};
        }
        if (!tilesMatrix[level][x][y] || !tilesMatrix[level][x][y].flipped !== !this.flipped) {
          xMod = (numTiles.x + x % numTiles.x) % numTiles.x;
          yMod = (numTiles.y + y % numTiles.y) % numTiles.y;
          bounds = this.getTileBounds(level, x, y);
          sourceBounds = tileSource.getTileBounds(level, xMod, yMod, true);
          exists = tileSource.tileExists(level, xMod, yMod);
          urlOrGetter = tileSource.getTileUrl(level, xMod, yMod);
          post = tileSource.getTilePostData(level, xMod, yMod);
          if (this.loadTilesWithAjax) {
            ajaxHeaders = tileSource.getTileAjaxHeaders(level, xMod, yMod);
            if ($.isPlainObject(this.ajaxHeaders)) {
              ajaxHeaders = $.extend({}, this.ajaxHeaders, ajaxHeaders);
            }
          } else {
            ajaxHeaders = null;
          }
          context2D = tileSource.getContext2D ? tileSource.getContext2D(level, xMod, yMod) : undefined;
          tile = new $.Tile(level, x, y, bounds, exists, urlOrGetter, context2D, this.loadTilesWithAjax, ajaxHeaders, sourceBounds, post, tileSource.getTileHashKey(level, xMod, yMod, urlOrGetter, ajaxHeaders, post));
          if (this.getFlip()) {
            if (xMod === 0) {
              tile.isRightMost = true;
            }
          } else {
            if (xMod === numTiles.x - 1) {
              tile.isRightMost = true;
            }
          }
          if (yMod === numTiles.y - 1) {
            tile.isBottomMost = true;
          }
          tile.flipped = this.flipped;
          tilesMatrix[level][x][y] = tile;
        }
        tile = tilesMatrix[level][x][y];
        tile.lastTouchTime = time;
        return tile;
      },
      _loadTile: function(tile, time) {
        var _this = this;
        tile.loading = true;
        this._imageLoader.addJob({
          src: tile.getUrl(),
          tile,
          source: this.source,
          postData: tile.postData,
          loadWithAjax: tile.loadWithAjax,
          ajaxHeaders: tile.ajaxHeaders,
          crossOriginPolicy: this.crossOriginPolicy,
          ajaxWithCredentials: this.ajaxWithCredentials,
          callback: function(data, errorMsg, tileRequest) {
            _this._onTileLoad(tile, time, data, errorMsg, tileRequest);
          },
          abort: function() {
            tile.loading = false;
          }
        });
      },
      _onTileLoad: function(tile, time, data, errorMsg, tileRequest) {
        if (!data) {
          $.console.error("Tile %s failed to load: %s - error: %s", tile, tile.getUrl(), errorMsg);
          this.viewer.raiseEvent("tile-load-failed", {
            tile,
            tiledImage: this,
            time,
            message: errorMsg,
            tileRequest
          });
          tile.loading = false;
          tile.exists = false;
          return;
        } else {
          tile.exists = true;
        }
        if (time < this.lastResetTime) {
          $.console.warn("Ignoring tile %s loaded before reset: %s", tile, tile.getUrl());
          tile.loading = false;
          return;
        }
        var _this = this, finish = function() {
          var ccc = _this.source;
          var cutoff = ccc.getClosestLevel();
          _this._setTileLoaded(tile, data, cutoff, tileRequest);
        };
        finish();
      },
      _setTileLoaded: function(tile, data, cutoff, tileRequest) {
        var increment = 0, eventFinished = false, _this = this;
        function getCompletionCallback() {
          if (eventFinished) {
            $.console.error("Event 'tile-loaded' argument getCompletionCallback must be called synchronously. " + "Its return value should be called asynchronously.");
          }
          increment++;
          return completionCallback;
        }
        function completionCallback() {
          increment--;
          if (increment === 0) {
            tile.loading = false;
            tile.loaded = true;
            tile.hasTransparency = _this.source.hasTransparency(tile.context2D, tile.getUrl(), tile.ajaxHeaders, tile.postData);
            if (!tile.context2D) {
              _this._tileCache.cacheTile({
                data,
                tile,
                cutoff,
                tiledImage: _this
              });
            }
            _this.viewer.raiseEvent("tile-ready", {
              tile,
              tiledImage: _this,
              tileRequest
            });
            _this._needsDraw = true;
          }
        }
        var fallbackCompletion = getCompletionCallback();
        this.viewer.raiseEvent("tile-loaded", {
          tile,
          tiledImage: this,
          tileRequest,
          get image() {
            $.console.error("[tile-loaded] event 'image' has been deprecated. Use 'data' property instead.");
            return data;
          },
          data,
          getCompletionCallback
        });
        eventFinished = true;
        fallbackCompletion();
      },
      _compareTiles: function(previousBest, tile, maxNTiles) {
        if (!previousBest) {
          return [tile];
        }
        previousBest.push(tile);
        this._sortTiles(previousBest);
        if (previousBest.length > maxNTiles) {
          previousBest.pop();
        }
        return previousBest;
      },
      _sortTiles: function(tiles) {
        tiles.sort(function(a, b) {
          if (a === null) {
            return 1;
          }
          if (b === null) {
            return -1;
          }
          if (a.visibility === b.visibility) {
            return a.squaredDistance - b.squaredDistance;
          } else {
            return b.visibility - a.visibility;
          }
        });
      },
      _providesCoverage: function(coverage, level, x, y) {
        var rows, cols, i, j;
        if (!coverage[level]) {
          return false;
        }
        if (x === undefined || y === undefined) {
          rows = coverage[level];
          for (i in rows) {
            if (Object.prototype.hasOwnProperty.call(rows, i)) {
              cols = rows[i];
              for (j in cols) {
                if (Object.prototype.hasOwnProperty.call(cols, j) && !cols[j]) {
                  return false;
                }
              }
            }
          }
          return true;
        }
        return coverage[level][x] === undefined || coverage[level][x][y] === undefined || coverage[level][x][y] === true;
      },
      _isCovered: function(coverage, level, x, y) {
        if (x === undefined || y === undefined) {
          return this._providesCoverage(coverage, level + 1);
        } else {
          return this._providesCoverage(coverage, level + 1, 2 * x, 2 * y) && this._providesCoverage(coverage, level + 1, 2 * x, 2 * y + 1) && this._providesCoverage(coverage, level + 1, 2 * x + 1, 2 * y) && this._providesCoverage(coverage, level + 1, 2 * x + 1, 2 * y + 1);
        }
      },
      _setCoverage: function(coverage, level, x, y, covers) {
        if (!coverage[level]) {
          $.console.warn("Setting coverage for a tile before its level's coverage has been reset: %s", level);
          return;
        }
        if (!coverage[level][x]) {
          coverage[level][x] = {};
        }
        coverage[level][x][y] = covers;
      },
      _resetCoverage: function(coverage, level) {
        coverage[level] = {};
      }
    });
  })(OpenSeadragon);
  (function($) {
    var TileRecord = function(options) {
      $.console.assert(options, "[TileCache.cacheTile] options is required");
      $.console.assert(options.tile, "[TileCache.cacheTile] options.tile is required");
      $.console.assert(options.tiledImage, "[TileCache.cacheTile] options.tiledImage is required");
      this.tile = options.tile;
      this.tiledImage = options.tiledImage;
    };
    var ImageRecord = function(options) {
      $.console.assert(options, "[ImageRecord] options is required");
      $.console.assert(options.data, "[ImageRecord] options.data is required");
      this._tiles = [];
      options.create.apply(null, [this, options.data, options.ownerTile]);
      this._destroyImplementation = options.destroy.bind(null, this);
      this.getImage = options.getImage.bind(null, this);
      this.getData = options.getData.bind(null, this);
      this.getRenderedContext = options.getRenderedContext.bind(null, this);
    };
    ImageRecord.prototype = {
      destroy: function() {
        this._destroyImplementation();
        this._tiles = null;
      },
      addTile: function(tile) {
        $.console.assert(tile, "[ImageRecord.addTile] tile is required");
        this._tiles.push(tile);
      },
      removeTile: function(tile) {
        for (var i = 0;i < this._tiles.length; i++) {
          if (this._tiles[i] === tile) {
            this._tiles.splice(i, 1);
            return;
          }
        }
        $.console.warn("[ImageRecord.removeTile] trying to remove unknown tile", tile);
      },
      getTileCount: function() {
        return this._tiles.length;
      }
    };
    $.TileCache = function(options) {
      options = options || {};
      this._maxImageCacheCount = options.maxImageCacheCount || $.DEFAULT_SETTINGS.maxImageCacheCount;
      this._tilesLoaded = [];
      this._imagesLoaded = [];
      this._imagesLoadedCount = 0;
    };
    $.TileCache.prototype = {
      numTilesLoaded: function() {
        return this._tilesLoaded.length;
      },
      cacheTile: function(options) {
        $.console.assert(options, "[TileCache.cacheTile] options is required");
        $.console.assert(options.tile, "[TileCache.cacheTile] options.tile is required");
        $.console.assert(options.tile.cacheKey, "[TileCache.cacheTile] options.tile.cacheKey is required");
        $.console.assert(options.tiledImage, "[TileCache.cacheTile] options.tiledImage is required");
        var cutoff = options.cutoff || 0;
        var insertionIndex = this._tilesLoaded.length;
        var imageRecord = this._imagesLoaded[options.tile.cacheKey];
        if (!imageRecord) {
          if (!options.data) {
            $.console.error("[TileCache.cacheTile] options.image was renamed to options.data. '.image' attribute " + "has been deprecated and will be removed in the future.");
            options.data = options.image;
          }
          $.console.assert(options.data, "[TileCache.cacheTile] options.data is required to create an ImageRecord");
          imageRecord = this._imagesLoaded[options.tile.cacheKey] = new ImageRecord({
            data: options.data,
            ownerTile: options.tile,
            create: options.tiledImage.source.createTileCache,
            destroy: options.tiledImage.source.destroyTileCache,
            getImage: options.tiledImage.source.getTileCacheDataAsImage,
            getData: options.tiledImage.source.getTileCacheData,
            getRenderedContext: options.tiledImage.source.getTileCacheDataAsContext2D
          });
          this._imagesLoadedCount++;
        }
        imageRecord.addTile(options.tile);
        options.tile.cacheImageRecord = imageRecord;
        if (this._imagesLoadedCount > this._maxImageCacheCount) {
          var worstTile = null;
          var worstTileIndex = -1;
          var worstTileRecord = null;
          var prevTile, worstTime, worstLevel, prevTime, prevLevel, prevTileRecord;
          for (var i = this._tilesLoaded.length - 1;i >= 0; i--) {
            prevTileRecord = this._tilesLoaded[i];
            prevTile = prevTileRecord.tile;
            if (prevTile.level <= cutoff || prevTile.beingDrawn) {
              continue;
            } else if (!worstTile) {
              worstTile = prevTile;
              worstTileIndex = i;
              worstTileRecord = prevTileRecord;
              continue;
            }
            prevTime = prevTile.lastTouchTime;
            worstTime = worstTile.lastTouchTime;
            prevLevel = prevTile.level;
            worstLevel = worstTile.level;
            if (prevTime < worstTime || prevTime === worstTime && prevLevel > worstLevel) {
              worstTile = prevTile;
              worstTileIndex = i;
              worstTileRecord = prevTileRecord;
            }
          }
          if (worstTile && worstTileIndex >= 0) {
            this._unloadTile(worstTileRecord);
            insertionIndex = worstTileIndex;
          }
        }
        this._tilesLoaded[insertionIndex] = new TileRecord({
          tile: options.tile,
          tiledImage: options.tiledImage
        });
      },
      clearTilesFor: function(tiledImage) {
        $.console.assert(tiledImage, "[TileCache.clearTilesFor] tiledImage is required");
        var tileRecord;
        for (var i = 0;i < this._tilesLoaded.length; ++i) {
          tileRecord = this._tilesLoaded[i];
          if (tileRecord.tiledImage === tiledImage) {
            this._unloadTile(tileRecord);
            this._tilesLoaded.splice(i, 1);
            i--;
          }
        }
      },
      getImageRecord: function(cacheKey) {
        $.console.assert(cacheKey, "[TileCache.getImageRecord] cacheKey is required");
        return this._imagesLoaded[cacheKey];
      },
      _unloadTile: function(tileRecord) {
        $.console.assert(tileRecord, "[TileCache._unloadTile] tileRecord is required");
        var tile = tileRecord.tile;
        var tiledImage = tileRecord.tiledImage;
        let context2D = tile.getCanvasContext && tile.getCanvasContext();
        tile.unload();
        tile.cacheImageRecord = null;
        var imageRecord = this._imagesLoaded[tile.cacheKey];
        if (!imageRecord) {
          return;
        }
        imageRecord.removeTile(tile);
        if (!imageRecord.getTileCount()) {
          imageRecord.destroy();
          delete this._imagesLoaded[tile.cacheKey];
          this._imagesLoadedCount--;
          if (context2D) {
            context2D.canvas.width = 0;
            context2D.canvas.height = 0;
            tiledImage.viewer.raiseEvent("image-unloaded", {
              context2D,
              tile
            });
          }
        }
        tiledImage.viewer.raiseEvent("tile-unloaded", {
          tile,
          tiledImage
        });
      }
    };
  })(OpenSeadragon);
  (function($) {
    $.World = function(options) {
      var _this = this;
      $.console.assert(options.viewer, "[World] options.viewer is required");
      $.EventSource.call(this);
      this.viewer = options.viewer;
      this._items = [];
      this._needsDraw = false;
      this._autoRefigureSizes = true;
      this._needsSizesFigured = false;
      this._delegatedFigureSizes = function(event) {
        if (_this._autoRefigureSizes) {
          _this._figureSizes();
        } else {
          _this._needsSizesFigured = true;
        }
      };
      this._figureSizes();
    };
    $.extend($.World.prototype, $.EventSource.prototype, {
      addItem: function(item, options) {
        $.console.assert(item, "[World.addItem] item is required");
        $.console.assert(item instanceof $.TiledImage, "[World.addItem] only TiledImages supported at this time");
        options = options || {};
        if (options.index !== undefined) {
          var index = Math.max(0, Math.min(this._items.length, options.index));
          this._items.splice(index, 0, item);
        } else {
          this._items.push(item);
        }
        if (this._autoRefigureSizes) {
          this._figureSizes();
        } else {
          this._needsSizesFigured = true;
        }
        this._needsDraw = true;
        item.addHandler("bounds-change", this._delegatedFigureSizes);
        item.addHandler("clip-change", this._delegatedFigureSizes);
        this.raiseEvent("add-item", {
          item
        });
      },
      getItemAt: function(index) {
        $.console.assert(index !== undefined, "[World.getItemAt] index is required");
        return this._items[index];
      },
      getIndexOfItem: function(item) {
        $.console.assert(item, "[World.getIndexOfItem] item is required");
        return $.indexOf(this._items, item);
      },
      getItemCount: function() {
        return this._items.length;
      },
      setItemIndex: function(item, index) {
        $.console.assert(item, "[World.setItemIndex] item is required");
        $.console.assert(index !== undefined, "[World.setItemIndex] index is required");
        var oldIndex = this.getIndexOfItem(item);
        if (index >= this._items.length) {
          throw new Error("Index bigger than number of layers.");
        }
        if (index === oldIndex || oldIndex === -1) {
          return;
        }
        this._items.splice(oldIndex, 1);
        this._items.splice(index, 0, item);
        this._needsDraw = true;
        this.raiseEvent("item-index-change", {
          item,
          previousIndex: oldIndex,
          newIndex: index
        });
      },
      removeItem: function(item) {
        $.console.assert(item, "[World.removeItem] item is required");
        var index = $.indexOf(this._items, item);
        if (index === -1) {
          return;
        }
        item.removeHandler("bounds-change", this._delegatedFigureSizes);
        item.removeHandler("clip-change", this._delegatedFigureSizes);
        item.destroy();
        this._items.splice(index, 1);
        this._figureSizes();
        this._needsDraw = true;
        this._raiseRemoveItem(item);
      },
      removeAll: function() {
        this.viewer._cancelPendingImages();
        var item;
        var i;
        for (i = 0;i < this._items.length; i++) {
          item = this._items[i];
          item.removeHandler("bounds-change", this._delegatedFigureSizes);
          item.removeHandler("clip-change", this._delegatedFigureSizes);
          item.destroy();
        }
        var removedItems = this._items;
        this._items = [];
        this._figureSizes();
        this._needsDraw = true;
        for (i = 0;i < removedItems.length; i++) {
          item = removedItems[i];
          this._raiseRemoveItem(item);
        }
      },
      resetItems: function() {
        for (var i = 0;i < this._items.length; i++) {
          this._items[i].reset();
        }
      },
      update: function(viewportChanged) {
        var animated = false;
        for (var i = 0;i < this._items.length; i++) {
          animated = this._items[i].update(viewportChanged) || animated;
        }
        return animated;
      },
      draw: function() {
        this.viewer.drawer.draw(this._items);
        this._needsDraw = false;
        this._items.forEach((item) => {
          this._needsDraw = item.setDrawn() || this._needsDraw;
        });
      },
      needsDraw: function() {
        for (var i = 0;i < this._items.length; i++) {
          if (this._items[i].needsDraw()) {
            return true;
          }
        }
        return this._needsDraw;
      },
      getHomeBounds: function() {
        return this._homeBounds.clone();
      },
      getContentFactor: function() {
        return this._contentFactor;
      },
      setAutoRefigureSizes: function(value) {
        this._autoRefigureSizes = value;
        if (value & this._needsSizesFigured) {
          this._figureSizes();
          this._needsSizesFigured = false;
        }
      },
      arrange: function(options) {
        options = options || {};
        var immediately = options.immediately || false;
        var layout = options.layout || $.DEFAULT_SETTINGS.collectionLayout;
        var rows = options.rows || $.DEFAULT_SETTINGS.collectionRows;
        var columns = options.columns || $.DEFAULT_SETTINGS.collectionColumns;
        var tileSize = options.tileSize || $.DEFAULT_SETTINGS.collectionTileSize;
        var tileMargin = options.tileMargin || $.DEFAULT_SETTINGS.collectionTileMargin;
        var increment = tileSize + tileMargin;
        var wrap;
        if (!options.rows && columns) {
          wrap = columns;
        } else {
          wrap = Math.ceil(this._items.length / rows);
        }
        var x = 0;
        var y = 0;
        var item, box, width, height, position;
        this.setAutoRefigureSizes(false);
        for (var i = 0;i < this._items.length; i++) {
          if (i && i % wrap === 0) {
            if (layout === "horizontal") {
              y += increment;
              x = 0;
            } else {
              x += increment;
              y = 0;
            }
          }
          item = this._items[i];
          box = item.getBounds();
          if (box.width > box.height) {
            width = tileSize;
          } else {
            width = tileSize * (box.width / box.height);
          }
          height = width * (box.height / box.width);
          position = new $.Point(x + (tileSize - width) / 2, y + (tileSize - height) / 2);
          item.setPosition(position, immediately);
          item.setWidth(width, immediately);
          if (layout === "horizontal") {
            x += increment;
          } else {
            y += increment;
          }
        }
        this.setAutoRefigureSizes(true);
      },
      _figureSizes: function() {
        var oldHomeBounds = this._homeBounds ? this._homeBounds.clone() : null;
        var oldContentSize = this._contentSize ? this._contentSize.clone() : null;
        var oldContentFactor = this._contentFactor || 0;
        if (!this._items.length) {
          this._homeBounds = new $.Rect(0, 0, 1, 1);
          this._contentSize = new $.Point(1, 1);
          this._contentFactor = 1;
        } else {
          var item = this._items[0];
          var bounds = item.getBounds();
          this._contentFactor = item.getContentSize().x / bounds.width;
          var clippedBounds = item.getClippedBounds().getBoundingBox();
          var left = clippedBounds.x;
          var top = clippedBounds.y;
          var right = clippedBounds.x + clippedBounds.width;
          var bottom = clippedBounds.y + clippedBounds.height;
          for (var i = 1;i < this._items.length; i++) {
            item = this._items[i];
            bounds = item.getBounds();
            this._contentFactor = Math.max(this._contentFactor, item.getContentSize().x / bounds.width);
            clippedBounds = item.getClippedBounds().getBoundingBox();
            left = Math.min(left, clippedBounds.x);
            top = Math.min(top, clippedBounds.y);
            right = Math.max(right, clippedBounds.x + clippedBounds.width);
            bottom = Math.max(bottom, clippedBounds.y + clippedBounds.height);
          }
          this._homeBounds = new $.Rect(left, top, right - left, bottom - top);
          this._contentSize = new $.Point(this._homeBounds.width * this._contentFactor, this._homeBounds.height * this._contentFactor);
        }
        if (this._contentFactor !== oldContentFactor || !this._homeBounds.equals(oldHomeBounds) || !this._contentSize.equals(oldContentSize)) {
          this.raiseEvent("metrics-change", {});
        }
      },
      _raiseRemoveItem: function(item) {
        this.raiseEvent("remove-item", { item });
      }
    });
  })(OpenSeadragon);
});

// node_modules/geotiff-tilesource/dist/basedecoder-DHcBySSe.js
function l(o, n) {
  let t = o.length - n, r = 0;
  do {
    for (let a = n;a > 0; a--)
      o[r + n] += o[r], r++;
    t -= n;
  } while (t > 0);
}
function d(o, n, t) {
  let r = 0, a = o.length;
  const i = a / t;
  for (;a > n; ) {
    for (let e = n;e > 0; --e)
      o[r + n] += o[r], ++r;
    a -= n;
  }
  const s = o.slice();
  for (let e = 0;e < i; ++e)
    for (let c = 0;c < t; ++c)
      o[t * e + c] = s[(t - c - 1) * i + e];
}
function f(o, n, t, r, a, i) {
  if (!n || n === 1)
    return o;
  for (let c = 0;c < a.length; ++c) {
    if (a[c] % 8 !== 0)
      throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");
    if (a[c] !== a[0])
      throw new Error("When decoding with predictor, all samples must have the same size.");
  }
  const s = a[0] / 8, e = i === 2 ? 1 : a.length;
  for (let c = 0;c < r && !(c * e * t * s >= o.byteLength); ++c) {
    let h;
    if (n === 2) {
      switch (a[0]) {
        case 8:
          h = new Uint8Array(o, c * e * t * s, e * t * s);
          break;
        case 16:
          h = new Uint16Array(o, c * e * t * s, e * t * s / 2);
          break;
        case 32:
          h = new Uint32Array(o, c * e * t * s, e * t * s / 4);
          break;
        default:
          throw new Error(`Predictor 2 not allowed with ${a[0]} bits per sample.`);
      }
      l(h, e);
    } else
      n === 3 && (h = new Uint8Array(o, c * e * t * s, e * t * s), d(h, e, s));
  }
  return o;
}

class g {
  async decode(n, t) {
    const r = await this.decodeBlock(t), a = n.Predictor || 1;
    if (a !== 1) {
      const i = !n.StripOffsets, s = i ? n.TileWidth : n.ImageWidth, e = i ? n.TileLength : n.RowsPerStrip || n.ImageLength;
      return f(r, a, s, e, n.BitsPerSample, n.PlanarConfiguration);
    }
    return r;
  }
}
var init_basedecoder_DHcBySSe = () => {};

// node_modules/geotiff-tilesource/dist/raw-CMGvRjfu.js
var exports_raw_CMGvRjfu = {};
__export(exports_raw_CMGvRjfu, {
  default: () => d2
});
var d2;
var init_raw_CMGvRjfu = __esm(() => {
  init_basedecoder_DHcBySSe();
  d2 = class d2 extends g {
    decodeBlock(e) {
      return e;
    }
  };
});

// node_modules/geotiff-tilesource/dist/lzw-LAGDNbSC.js
var exports_lzw_LAGDNbSC = {};
__export(exports_lzw_LAGDNbSC, {
  default: () => m
});
function x(c, o, r) {
  const i = o % 8, n = Math.floor(o / 8), h = 8 - i, g2 = o + r - (n + 1) * 8;
  let l2 = 8 * (n + 2) - (o + r);
  const w = (n + 2) * 8 - o;
  if (l2 = Math.max(0, l2), n >= c.length)
    return console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)"), p;
  let u = c[n] & 2 ** (8 - i) - 1;
  u <<= r - h;
  let s = u;
  if (n + 1 < c.length) {
    let f2 = c[n + 1] >>> l2;
    f2 <<= Math.max(0, r - w), s += f2;
  }
  if (g2 > 8 && n + 2 < c.length) {
    const f2 = (n + 3) * 8 - (o + r), t = c[n + 2] >>> f2;
    s += t;
  }
  return s;
}
function D(c, o) {
  for (let r = o.length - 1;r >= 0; r--)
    c.push(o[r]);
  return c;
}
function A(c) {
  const o = new Uint16Array(4093), r = new Uint8Array(4093);
  for (let e = 0;e <= 257; e++)
    o[e] = 4096, r[e] = e;
  let i = 258, n = B, h = 0;
  function g2() {
    i = 258, n = B;
  }
  function l2(e) {
    const a = x(e, h, n);
    return h += n, a;
  }
  function w(e, a) {
    return r[i] = a, o[i] = e, i++, i - 1;
  }
  function u(e) {
    const a = [];
    for (let y = e;y !== 4096; y = o[y])
      a.push(r[y]);
    return a;
  }
  const s = [];
  g2();
  const f2 = new Uint8Array(c);
  let t = l2(f2), d3;
  for (;t !== p; ) {
    if (t === E) {
      for (g2(), t = l2(f2);t === E; )
        t = l2(f2);
      if (t === p)
        break;
      if (t > E)
        throw new Error(`corrupted code at scanline ${t}`);
      {
        const e = u(t);
        D(s, e), d3 = t;
      }
    } else if (t < i) {
      const e = u(t);
      D(s, e), w(d3, e[e.length - 1]), d3 = t;
    } else {
      const e = u(d3);
      if (!e)
        throw new Error(`Bogus entry. Not in dictionary, ${d3} / ${i}, position: ${h}`);
      D(s, e), s.push(e[e.length - 1]), w(d3, e[e.length - 1]), d3 = t;
    }
    i + 1 >= 2 ** n && (n === k ? d3 = undefined : n++), t = l2(f2);
  }
  return new Uint8Array(s);
}
var B = 9, E = 256, p = 257, k = 12, m;
var init_lzw_LAGDNbSC = __esm(() => {
  init_basedecoder_DHcBySSe();
  m = class m extends g {
    decodeBlock(o) {
      return A(o).buffer;
    }
  };
});

// node_modules/geotiff-tilesource/dist/jpeg-BAgeD1d3.js
var exports_jpeg_BAgeD1d3 = {};
__export(exports_jpeg_BAgeD1d3, {
  default: () => fe
});
function ne(q, l2) {
  let o = 0;
  const u = [];
  let T = 16;
  for (;T > 0 && !q[T - 1]; )
    --T;
  u.push({ children: [], index: 0 });
  let w = u[0], C;
  for (let t = 0;t < T; t++) {
    for (let h = 0;h < q[t]; h++) {
      for (w = u.pop(), w.children[w.index] = l2[o];w.index > 0; )
        w = u.pop();
      for (w.index++, u.push(w);u.length <= t; )
        u.push(C = { children: [], index: 0 }), w.children[w.index] = C.children, w = C;
      o++;
    }
    t + 1 < T && (u.push(C = { children: [], index: 0 }), w.children[w.index] = C.children, w = C);
  }
  return u[0].children;
}
function ce(q, l2, o, u, T, w, C, t, h) {
  const { mcusPerLine: F, progressive: c } = o, r = l2;
  let b = l2, i = 0, d3 = 0;
  function m2() {
    if (d3 > 0)
      return d3--, i >> d3 & 1;
    if (i = q[b++], i === 255) {
      const a = q[b++];
      if (a)
        throw new Error(`unexpected marker: ${(i << 8 | a).toString(16)}`);
    }
    return d3 = 7, i >>> 7;
  }
  function x2(a) {
    let f2 = a, p2;
    for (;(p2 = m2()) !== null; ) {
      if (f2 = f2[p2], typeof f2 == "number")
        return f2;
      if (typeof f2 != "object")
        throw new Error("invalid huffman sequence");
    }
    return null;
  }
  function E2(a) {
    let f2 = a, p2 = 0;
    for (;f2 > 0; ) {
      const L = m2();
      if (L === null)
        return;
      p2 = p2 << 1 | L, --f2;
    }
    return p2;
  }
  function k2(a) {
    const f2 = E2(a);
    return f2 >= 1 << a - 1 ? f2 : f2 + (-1 << a) + 1;
  }
  function A2(a, f2) {
    const p2 = x2(a.huffmanTableDC), L = p2 === 0 ? 0 : k2(p2);
    a.pred += L, f2[0] = a.pred;
    let D2 = 1;
    for (;D2 < 64; ) {
      const P = x2(a.huffmanTableAC), y = P & 15, S = P >> 4;
      if (y === 0) {
        if (S < 15)
          break;
        D2 += 16;
      } else {
        D2 += S;
        const I = O[D2];
        f2[I] = k2(y), D2++;
      }
    }
  }
  function v(a, f2) {
    const p2 = x2(a.huffmanTableDC), L = p2 === 0 ? 0 : k2(p2) << h;
    a.pred += L, f2[0] = a.pred;
  }
  function s(a, f2) {
    f2[0] |= m2() << h;
  }
  let n = 0;
  function g2(a, f2) {
    if (n > 0) {
      n--;
      return;
    }
    let p2 = w;
    const L = C;
    for (;p2 <= L; ) {
      const D2 = x2(a.huffmanTableAC), P = D2 & 15, y = D2 >> 4;
      if (P === 0) {
        if (y < 15) {
          n = E2(y) + (1 << y) - 1;
          break;
        }
        p2 += 16;
      } else {
        p2 += y;
        const S = O[p2];
        f2[S] = k2(P) * (1 << h), p2++;
      }
    }
  }
  let e = 0, _;
  function te(a, f2) {
    let p2 = w;
    const L = C;
    let D2 = 0;
    for (;p2 <= L; ) {
      const P = O[p2], y = f2[P] < 0 ? -1 : 1;
      switch (e) {
        case 0: {
          const S = x2(a.huffmanTableAC), I = S & 15;
          if (D2 = S >> 4, I === 0)
            D2 < 15 ? (n = E2(D2) + (1 << D2), e = 4) : (D2 = 16, e = 1);
          else {
            if (I !== 1)
              throw new Error("invalid ACn encoding");
            _ = k2(I), e = D2 ? 2 : 3;
          }
          continue;
        }
        case 1:
        case 2:
          f2[P] ? f2[P] += (m2() << h) * y : (D2--, D2 === 0 && (e = e === 2 ? 3 : 0));
          break;
        case 3:
          f2[P] ? f2[P] += (m2() << h) * y : (f2[P] = _ << h, e = 0);
          break;
        case 4:
          f2[P] && (f2[P] += (m2() << h) * y);
          break;
      }
      p2++;
    }
    e === 4 && (n--, n === 0 && (e = 0));
  }
  function se(a, f2, p2, L, D2) {
    const P = p2 / F | 0, y = p2 % F, S = P * a.v + L, I = y * a.h + D2;
    f2(a, a.blocks[S][I]);
  }
  function oe(a, f2, p2) {
    const L = p2 / a.blocksPerLine | 0, D2 = p2 % a.blocksPerLine;
    f2(a, a.blocks[L][D2]);
  }
  const V = u.length;
  let U, j, G, X, B2, H;
  c ? w === 0 ? H = t === 0 ? v : s : H = t === 0 ? g2 : te : H = A2;
  let M = 0, z, J;
  V === 1 ? J = u[0].blocksPerLine * u[0].blocksPerColumn : J = F * o.mcusPerColumn;
  const ee = T || J;
  for (;M < J; ) {
    for (j = 0;j < V; j++)
      u[j].pred = 0;
    if (n = 0, V === 1)
      for (U = u[0], B2 = 0;B2 < ee; B2++)
        oe(U, H, M), M++;
    else
      for (B2 = 0;B2 < ee; B2++) {
        for (j = 0;j < V; j++) {
          U = u[j];
          const { h: a, v: f2 } = U;
          for (G = 0;G < f2; G++)
            for (X = 0;X < a; X++)
              se(U, H, M, G, X);
        }
        if (M++, M === J)
          break;
      }
    if (d3 = 0, z = q[b] << 8 | q[b + 1], z < 65280)
      throw new Error("marker was not found");
    if (z >= 65488 && z <= 65495)
      b += 2;
    else
      break;
  }
  return b - r;
}
function ie(q, l2) {
  const o = [], { blocksPerLine: u, blocksPerColumn: T } = l2, w = u << 3, C = new Int32Array(64), t = new Uint8Array(64);
  function h(F, c, r) {
    const b = l2.quantizationTable;
    let i, d3, m2, x2, E2, k2, A2, v, s;
    const n = r;
    let g2;
    for (g2 = 0;g2 < 64; g2++)
      n[g2] = F[g2] * b[g2];
    for (g2 = 0;g2 < 8; ++g2) {
      const e = 8 * g2;
      if (n[1 + e] === 0 && n[2 + e] === 0 && n[3 + e] === 0 && n[4 + e] === 0 && n[5 + e] === 0 && n[6 + e] === 0 && n[7 + e] === 0) {
        s = R * n[0 + e] + 512 >> 10, n[0 + e] = s, n[1 + e] = s, n[2 + e] = s, n[3 + e] = s, n[4 + e] = s, n[5 + e] = s, n[6 + e] = s, n[7 + e] = s;
        continue;
      }
      i = R * n[0 + e] + 128 >> 8, d3 = R * n[4 + e] + 128 >> 8, m2 = n[2 + e], x2 = n[6 + e], E2 = K * (n[1 + e] - n[7 + e]) + 128 >> 8, v = K * (n[1 + e] + n[7 + e]) + 128 >> 8, k2 = n[3 + e] << 4, A2 = n[5 + e] << 4, s = i - d3 + 1 >> 1, i = i + d3 + 1 >> 1, d3 = s, s = m2 * W + x2 * Q + 128 >> 8, m2 = m2 * Q - x2 * W + 128 >> 8, x2 = s, s = E2 - A2 + 1 >> 1, E2 = E2 + A2 + 1 >> 1, A2 = s, s = v + k2 + 1 >> 1, k2 = v - k2 + 1 >> 1, v = s, s = i - x2 + 1 >> 1, i = i + x2 + 1 >> 1, x2 = s, s = d3 - m2 + 1 >> 1, d3 = d3 + m2 + 1 >> 1, m2 = s, s = E2 * N + v * $ + 2048 >> 12, E2 = E2 * $ - v * N + 2048 >> 12, v = s, s = k2 * Z + A2 * Y + 2048 >> 12, k2 = k2 * Y - A2 * Z + 2048 >> 12, A2 = s, n[0 + e] = i + v, n[7 + e] = i - v, n[1 + e] = d3 + A2, n[6 + e] = d3 - A2, n[2 + e] = m2 + k2, n[5 + e] = m2 - k2, n[3 + e] = x2 + E2, n[4 + e] = x2 - E2;
    }
    for (g2 = 0;g2 < 8; ++g2) {
      const e = g2;
      if (n[1 * 8 + e] === 0 && n[2 * 8 + e] === 0 && n[3 * 8 + e] === 0 && n[4 * 8 + e] === 0 && n[5 * 8 + e] === 0 && n[6 * 8 + e] === 0 && n[7 * 8 + e] === 0) {
        s = R * r[g2 + 0] + 8192 >> 14, n[0 * 8 + e] = s, n[1 * 8 + e] = s, n[2 * 8 + e] = s, n[3 * 8 + e] = s, n[4 * 8 + e] = s, n[5 * 8 + e] = s, n[6 * 8 + e] = s, n[7 * 8 + e] = s;
        continue;
      }
      i = R * n[0 * 8 + e] + 2048 >> 12, d3 = R * n[4 * 8 + e] + 2048 >> 12, m2 = n[2 * 8 + e], x2 = n[6 * 8 + e], E2 = K * (n[1 * 8 + e] - n[7 * 8 + e]) + 2048 >> 12, v = K * (n[1 * 8 + e] + n[7 * 8 + e]) + 2048 >> 12, k2 = n[3 * 8 + e], A2 = n[5 * 8 + e], s = i - d3 + 1 >> 1, i = i + d3 + 1 >> 1, d3 = s, s = m2 * W + x2 * Q + 2048 >> 12, m2 = m2 * Q - x2 * W + 2048 >> 12, x2 = s, s = E2 - A2 + 1 >> 1, E2 = E2 + A2 + 1 >> 1, A2 = s, s = v + k2 + 1 >> 1, k2 = v - k2 + 1 >> 1, v = s, s = i - x2 + 1 >> 1, i = i + x2 + 1 >> 1, x2 = s, s = d3 - m2 + 1 >> 1, d3 = d3 + m2 + 1 >> 1, m2 = s, s = E2 * N + v * $ + 2048 >> 12, E2 = E2 * $ - v * N + 2048 >> 12, v = s, s = k2 * Z + A2 * Y + 2048 >> 12, k2 = k2 * Y - A2 * Z + 2048 >> 12, A2 = s, n[0 * 8 + e] = i + v, n[7 * 8 + e] = i - v, n[1 * 8 + e] = d3 + A2, n[6 * 8 + e] = d3 - A2, n[2 * 8 + e] = m2 + k2, n[5 * 8 + e] = m2 - k2, n[3 * 8 + e] = x2 + E2, n[4 * 8 + e] = x2 - E2;
    }
    for (g2 = 0;g2 < 64; ++g2) {
      const e = 128 + (n[g2] + 8 >> 4);
      e < 0 ? c[g2] = 0 : e > 255 ? c[g2] = 255 : c[g2] = e;
    }
  }
  for (let F = 0;F < T; F++) {
    const c = F << 3;
    for (let r = 0;r < 8; r++)
      o.push(new Uint8Array(w));
    for (let r = 0;r < u; r++) {
      h(l2.blocks[F][r], t, C);
      let b = 0;
      const i = r << 3;
      for (let d3 = 0;d3 < 8; d3++) {
        const m2 = o[c + d3];
        for (let x2 = 0;x2 < 8; x2++)
          m2[i + x2] = t[b++];
      }
    }
  }
  return o;
}

class le {
  constructor() {
    this.jfif = null, this.adobe = null, this.quantizationTables = [], this.huffmanTablesAC = [], this.huffmanTablesDC = [], this.resetFrames();
  }
  resetFrames() {
    this.frames = [];
  }
  parse(l2) {
    let o = 0;
    function u() {
      const t = l2[o] << 8 | l2[o + 1];
      return o += 2, t;
    }
    function T() {
      const t = u(), h = l2.subarray(o, o + t - 2);
      return o += h.length, h;
    }
    function w(t) {
      let h = 0, F = 0, c, r;
      for (r in t.components)
        t.components.hasOwnProperty(r) && (c = t.components[r], h < c.h && (h = c.h), F < c.v && (F = c.v));
      const b = Math.ceil(t.samplesPerLine / 8 / h), i = Math.ceil(t.scanLines / 8 / F);
      for (r in t.components)
        if (t.components.hasOwnProperty(r)) {
          c = t.components[r];
          const d3 = Math.ceil(Math.ceil(t.samplesPerLine / 8) * c.h / h), m2 = Math.ceil(Math.ceil(t.scanLines / 8) * c.v / F), x2 = b * c.h, E2 = i * c.v, k2 = [];
          for (let A2 = 0;A2 < E2; A2++) {
            const v = [];
            for (let s = 0;s < x2; s++)
              v.push(new Int32Array(64));
            k2.push(v);
          }
          c.blocksPerLine = d3, c.blocksPerColumn = m2, c.blocks = k2;
        }
      t.maxH = h, t.maxV = F, t.mcusPerLine = b, t.mcusPerColumn = i;
    }
    let C = u();
    if (C !== 65496)
      throw new Error("SOI not found");
    for (C = u();C !== 65497; ) {
      switch (C) {
        case 65280:
          break;
        case 65504:
        case 65505:
        case 65506:
        case 65507:
        case 65508:
        case 65509:
        case 65510:
        case 65511:
        case 65512:
        case 65513:
        case 65514:
        case 65515:
        case 65516:
        case 65517:
        case 65518:
        case 65519:
        case 65534: {
          const t = T();
          C === 65504 && t[0] === 74 && t[1] === 70 && t[2] === 73 && t[3] === 70 && t[4] === 0 && (this.jfif = {
            version: { major: t[5], minor: t[6] },
            densityUnits: t[7],
            xDensity: t[8] << 8 | t[9],
            yDensity: t[10] << 8 | t[11],
            thumbWidth: t[12],
            thumbHeight: t[13],
            thumbData: t.subarray(14, 14 + 3 * t[12] * t[13])
          }), C === 65518 && t[0] === 65 && t[1] === 100 && t[2] === 111 && t[3] === 98 && t[4] === 101 && t[5] === 0 && (this.adobe = {
            version: t[6],
            flags0: t[7] << 8 | t[8],
            flags1: t[9] << 8 | t[10],
            transformCode: t[11]
          });
          break;
        }
        case 65499: {
          const h = u() + o - 2;
          for (;o < h; ) {
            const F = l2[o++], c = new Int32Array(64);
            if (F >> 4)
              if (F >> 4 === 1)
                for (let r = 0;r < 64; r++) {
                  const b = O[r];
                  c[b] = u();
                }
              else
                throw new Error("DQT: invalid table spec");
            else
              for (let r = 0;r < 64; r++) {
                const b = O[r];
                c[b] = l2[o++];
              }
            this.quantizationTables[F & 15] = c;
          }
          break;
        }
        case 65472:
        case 65473:
        case 65474: {
          u();
          const t = {
            extended: C === 65473,
            progressive: C === 65474,
            precision: l2[o++],
            scanLines: u(),
            samplesPerLine: u(),
            components: {},
            componentsOrder: []
          }, h = l2[o++];
          let F;
          for (let c = 0;c < h; c++) {
            F = l2[o];
            const r = l2[o + 1] >> 4, b = l2[o + 1] & 15, i = l2[o + 2];
            t.componentsOrder.push(F), t.components[F] = {
              h: r,
              v: b,
              quantizationIdx: i
            }, o += 3;
          }
          w(t), this.frames.push(t);
          break;
        }
        case 65476: {
          const t = u();
          for (let h = 2;h < t; ) {
            const F = l2[o++], c = new Uint8Array(16);
            let r = 0;
            for (let i = 0;i < 16; i++, o++)
              c[i] = l2[o], r += c[i];
            const b = new Uint8Array(r);
            for (let i = 0;i < r; i++, o++)
              b[i] = l2[o];
            h += 17 + r, F >> 4 ? this.huffmanTablesAC[F & 15] = ne(c, b) : this.huffmanTablesDC[F & 15] = ne(c, b);
          }
          break;
        }
        case 65501:
          u(), this.resetInterval = u();
          break;
        case 65498: {
          u();
          const t = l2[o++], h = [], F = this.frames[0];
          for (let d3 = 0;d3 < t; d3++) {
            const m2 = F.components[l2[o++]], x2 = l2[o++];
            m2.huffmanTableDC = this.huffmanTablesDC[x2 >> 4], m2.huffmanTableAC = this.huffmanTablesAC[x2 & 15], h.push(m2);
          }
          const c = l2[o++], r = l2[o++], b = l2[o++], i = ce(l2, o, F, h, this.resetInterval, c, r, b >> 4, b & 15);
          o += i;
          break;
        }
        case 65535:
          l2[o] !== 255 && o--;
          break;
        default:
          if (l2[o - 3] === 255 && l2[o - 2] >= 192 && l2[o - 2] <= 254) {
            o -= 3;
            break;
          }
          throw new Error(`unknown JPEG marker ${C.toString(16)}`);
      }
      C = u();
    }
  }
  getResult() {
    const { frames: l2 } = this;
    if (this.frames.length === 0)
      throw new Error("no frames were decoded");
    this.frames.length > 1 && console.warn("more than one frame is not supported");
    for (let c = 0;c < this.frames.length; c++) {
      const r = this.frames[c].components;
      for (const b of Object.keys(r))
        r[b].quantizationTable = this.quantizationTables[r[b].quantizationIdx], delete r[b].quantizationIdx;
    }
    const o = l2[0], { components: u, componentsOrder: T } = o, w = [], C = o.samplesPerLine, t = o.scanLines;
    for (let c = 0;c < T.length; c++) {
      const r = u[T[c]];
      w.push({
        lines: ie(o, r),
        scaleX: r.h / o.maxH,
        scaleY: r.v / o.maxV
      });
    }
    const h = new Uint8Array(C * t * w.length);
    let F = 0;
    for (let c = 0;c < t; ++c)
      for (let r = 0;r < C; ++r)
        for (let b = 0;b < w.length; ++b) {
          const i = w[b];
          h[F] = i.lines[0 | c * i.scaleY][0 | r * i.scaleX], ++F;
        }
    return h;
  }
}
var O, Y = 4017, Z = 799, $ = 3406, N = 2276, Q = 1567, W = 3784, R = 5793, K = 2896, fe;
var init_jpeg_BAgeD1d3 = __esm(() => {
  init_basedecoder_DHcBySSe();
  O = new Int32Array([
    0,
    1,
    8,
    16,
    9,
    2,
    3,
    10,
    17,
    24,
    32,
    25,
    18,
    11,
    4,
    5,
    12,
    19,
    26,
    33,
    40,
    48,
    41,
    34,
    27,
    20,
    13,
    6,
    7,
    14,
    21,
    28,
    35,
    42,
    49,
    56,
    57,
    50,
    43,
    36,
    29,
    22,
    15,
    23,
    30,
    37,
    44,
    51,
    58,
    59,
    52,
    45,
    38,
    31,
    39,
    46,
    53,
    60,
    61,
    54,
    47,
    55,
    62,
    63
  ]);
  fe = class fe extends g {
    constructor(l2) {
      super(), this.reader = new le, l2.JPEGTables && this.reader.parse(l2.JPEGTables);
    }
    decodeBlock(l2) {
      return this.reader.resetFrames(), this.reader.parse(new Uint8Array(l2)), this.reader.getResult().buffer;
    }
  };
});

// node_modules/geotiff-tilesource/dist/pako.esm-CB1uQYY0.js
function he(e) {
  let i = e.length;
  for (;--i >= 0; )
    e[i] = 0;
}
function Ye(e, i, t, n, r) {
  this.static_tree = e, this.extra_bits = i, this.extra_base = t, this.elems = n, this.max_length = r, this.has_stree = e && e.length;
}
function Ge(e, i) {
  this.dyn_tree = e, this.max_code = 0, this.stat_desc = i;
}
function F(e, i, t, n, r) {
  this.good_length = e, this.max_lazy = i, this.nice_length = t, this.max_chain = n, this.func = r;
}
function Kn() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Be, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(Nn * 2), this.dyn_dtree = new Uint16Array((2 * In + 1) * 2), this.bl_tree = new Uint16Array((2 * On + 1) * 2), Y2(this.dyn_ltree), Y2(this.dyn_dtree), Y2(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(Ln + 1), this.heap = new Uint16Array(2 * ft + 1), Y2(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * ft + 1), Y2(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
function da() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
function xt(e) {
  this.options = Ke.assign({
    level: ga,
    method: xa,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: pa
  }, e || {});
  let i = this.options;
  i.raw && i.windowBits > 0 ? i.windowBits = -i.windowBits : i.gzip && i.windowBits > 0 && i.windowBits < 16 && (i.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new zi, this.strm.avail_out = 0;
  let t = ge.deflateInit2(this.strm, i.level, i.method, i.windowBits, i.memLevel, i.strategy);
  if (t !== Me)
    throw new Error(oe[t]);
  if (i.header && ge.deflateSetHeader(this.strm, i.header), i.dictionary) {
    let n;
    if (typeof i.dictionary == "string" ? n = Se.string2buf(i.dictionary) : Ti.call(i.dictionary) === "[object ArrayBuffer]" ? n = new Uint8Array(i.dictionary) : n = i.dictionary, t = ge.deflateSetDictionary(this.strm, n), t !== Me)
      throw new Error(oe[t]);
    this._dict_set = true;
  }
}
function Ua() {
  this.strm = null, this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
function qa() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
}
function De(e) {
  this.options = Ke.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, e || {});
  const i = this.options;
  i.raw && i.windowBits >= 0 && i.windowBits < 16 && (i.windowBits = -i.windowBits, i.windowBits === 0 && (i.windowBits = -15)), i.windowBits >= 0 && i.windowBits < 16 && !(e && e.windowBits) && (i.windowBits += 32), i.windowBits > 15 && i.windowBits < 48 && (i.windowBits & 15 || (i.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new zi, this.strm.avail_out = 0;
  let t = X.inflateInit2(this.strm, i.windowBits);
  if (t !== Ae)
    throw new Error(oe[t]);
  if (this.header = new er, X.inflateGetHeader(this.strm, this.header), i.dictionary && (typeof i.dictionary == "string" ? i.dictionary = Se.string2buf(i.dictionary) : Mi.call(i.dictionary) === "[object ArrayBuffer]" && (i.dictionary = new Uint8Array(i.dictionary)), i.raw && (t = X.inflateSetDictionary(this.strm, i.dictionary), t !== Ae)))
    throw new Error(oe[t]);
}
function kt(e, i) {
  const t = new De(i);
  if (t.push(e), t.err)
    throw t.msg || oe[t.err];
  return t.result;
}
function rr(e, i) {
  return i = i || {}, i.raw = true, kt(e, i);
}
var Hi = 0, li = 1, Bi = 2, Ki = 3, Pi = 258, ut = 29, ze = 256, xe, le2 = 30, wt = 19, oi, Q2 = 15, Xe = 16, Xi = 7, bt = 256, fi = 16, _i = 17, hi = 18, rt, $e, Yi, di, Gi = 512, P, be, ke, ve, gt, Fe, si, ci, ui, wi = (e) => e < 256 ? ke[e] : ke[256 + (e >>> 7)], Ee = (e, i) => {
  e.pending_buf[e.pending++] = i & 255, e.pending_buf[e.pending++] = i >>> 8 & 255;
}, N2 = (e, i, t) => {
  e.bi_valid > Xe - t ? (e.bi_buf |= i << e.bi_valid & 65535, Ee(e, e.bi_buf), e.bi_buf = i >> Xe - e.bi_valid, e.bi_valid += t - Xe) : (e.bi_buf |= i << e.bi_valid & 65535, e.bi_valid += t);
}, M = (e, i, t) => {
  N2(e, t[i * 2], t[i * 2 + 1]);
}, bi = (e, i) => {
  let t = 0;
  do
    t |= e & 1, e >>>= 1, t <<= 1;
  while (--i > 0);
  return t >>> 1;
}, ji = (e) => {
  e.bi_valid === 16 ? (Ee(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
}, Wi = (e, i) => {
  const { dyn_tree: t, max_code: n } = i, r = i.stat_desc.static_tree, a = i.stat_desc.has_stree, f2 = i.stat_desc.extra_bits, o = i.stat_desc.extra_base, c = i.stat_desc.max_length;
  let l2, _, y, s, h, u, R2 = 0;
  for (s = 0;s <= Q2; s++)
    e.bl_count[s] = 0;
  for (t[e.heap[e.heap_max] * 2 + 1] = 0, l2 = e.heap_max + 1;l2 < oi; l2++)
    _ = e.heap[l2], s = t[t[_ * 2 + 1] * 2 + 1] + 1, s > c && (s = c, R2++), t[_ * 2 + 1] = s, !(_ > n) && (e.bl_count[s]++, h = 0, _ >= o && (h = f2[_ - o]), u = t[_ * 2], e.opt_len += u * (s + h), a && (e.static_len += u * (r[_ * 2 + 1] + h)));
  if (R2 !== 0) {
    do {
      for (s = c - 1;e.bl_count[s] === 0; )
        s--;
      e.bl_count[s]--, e.bl_count[s + 1] += 2, e.bl_count[c]--, R2 -= 2;
    } while (R2 > 0);
    for (s = c;s !== 0; s--)
      for (_ = e.bl_count[s];_ !== 0; )
        y = e.heap[--l2], !(y > n) && (t[y * 2 + 1] !== s && (e.opt_len += (s - t[y * 2 + 1]) * t[y * 2], t[y * 2 + 1] = s), _--);
  }
}, gi = (e, i, t) => {
  const n = new Array(Q2 + 1);
  let r = 0, a, f2;
  for (a = 1;a <= Q2; a++)
    r = r + t[a - 1] << 1, n[a] = r;
  for (f2 = 0;f2 <= i; f2++) {
    let o = e[f2 * 2 + 1];
    o !== 0 && (e[f2 * 2] = bi(n[o]++, o));
  }
}, Vi = () => {
  let e, i, t, n, r;
  const a = new Array(Q2 + 1);
  for (t = 0, n = 0;n < ut - 1; n++)
    for (gt[n] = t, e = 0;e < 1 << rt[n]; e++)
      ve[t++] = n;
  for (ve[t - 1] = n, r = 0, n = 0;n < 16; n++)
    for (Fe[n] = r, e = 0;e < 1 << $e[n]; e++)
      ke[r++] = n;
  for (r >>= 7;n < le2; n++)
    for (Fe[n] = r << 7, e = 0;e < 1 << $e[n] - 7; e++)
      ke[256 + r++] = n;
  for (i = 0;i <= Q2; i++)
    a[i] = 0;
  for (e = 0;e <= 143; )
    P[e * 2 + 1] = 8, e++, a[8]++;
  for (;e <= 255; )
    P[e * 2 + 1] = 9, e++, a[9]++;
  for (;e <= 279; )
    P[e * 2 + 1] = 7, e++, a[7]++;
  for (;e <= 287; )
    P[e * 2 + 1] = 8, e++, a[8]++;
  for (gi(P, xe + 1, a), e = 0;e < le2; e++)
    be[e * 2 + 1] = 5, be[e * 2] = bi(e, 5);
  si = new Ye(P, rt, ze + 1, xe, Q2), ci = new Ye(be, $e, 0, le2, Q2), ui = new Ye(new Array(0), Yi, 0, wt, Xi);
}, pi = (e) => {
  let i;
  for (i = 0;i < xe; i++)
    e.dyn_ltree[i * 2] = 0;
  for (i = 0;i < le2; i++)
    e.dyn_dtree[i * 2] = 0;
  for (i = 0;i < wt; i++)
    e.bl_tree[i * 2] = 0;
  e.dyn_ltree[bt * 2] = 1, e.opt_len = e.static_len = 0, e.sym_next = e.matches = 0;
}, xi = (e) => {
  e.bi_valid > 8 ? Ee(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
}, Et = (e, i, t, n) => {
  const r = i * 2, a = t * 2;
  return e[r] < e[a] || e[r] === e[a] && n[i] <= n[t];
}, je = (e, i, t) => {
  const n = e.heap[t];
  let r = t << 1;
  for (;r <= e.heap_len && (r < e.heap_len && Et(i, e.heap[r + 1], e.heap[r], e.depth) && r++, !Et(i, n, e.heap[r], e.depth)); )
    e.heap[t] = e.heap[r], t = r, r <<= 1;
  e.heap[t] = n;
}, yt = (e, i, t) => {
  let n, r, a = 0, f2, o;
  if (e.sym_next !== 0)
    do
      n = e.pending_buf[e.sym_buf + a++] & 255, n += (e.pending_buf[e.sym_buf + a++] & 255) << 8, r = e.pending_buf[e.sym_buf + a++], n === 0 ? M(e, r, i) : (f2 = ve[r], M(e, f2 + ze + 1, i), o = rt[f2], o !== 0 && (r -= gt[f2], N2(e, r, o)), n--, f2 = wi(n), M(e, f2, t), o = $e[f2], o !== 0 && (n -= Fe[f2], N2(e, n, o)));
    while (a < e.sym_next);
  M(e, bt, i);
}, lt = (e, i) => {
  const t = i.dyn_tree, n = i.stat_desc.static_tree, r = i.stat_desc.has_stree, a = i.stat_desc.elems;
  let f2, o, c = -1, l2;
  for (e.heap_len = 0, e.heap_max = oi, f2 = 0;f2 < a; f2++)
    t[f2 * 2] !== 0 ? (e.heap[++e.heap_len] = c = f2, e.depth[f2] = 0) : t[f2 * 2 + 1] = 0;
  for (;e.heap_len < 2; )
    l2 = e.heap[++e.heap_len] = c < 2 ? ++c : 0, t[l2 * 2] = 1, e.depth[l2] = 0, e.opt_len--, r && (e.static_len -= n[l2 * 2 + 1]);
  for (i.max_code = c, f2 = e.heap_len >> 1;f2 >= 1; f2--)
    je(e, t, f2);
  l2 = a;
  do
    f2 = e.heap[1], e.heap[1] = e.heap[e.heap_len--], je(e, t, 1), o = e.heap[1], e.heap[--e.heap_max] = f2, e.heap[--e.heap_max] = o, t[l2 * 2] = t[f2 * 2] + t[o * 2], e.depth[l2] = (e.depth[f2] >= e.depth[o] ? e.depth[f2] : e.depth[o]) + 1, t[f2 * 2 + 1] = t[o * 2 + 1] = l2, e.heap[1] = l2++, je(e, t, 1);
  while (e.heap_len >= 2);
  e.heap[--e.heap_max] = e.heap[1], Wi(e, i), gi(t, c, e.bl_count);
}, mt = (e, i, t) => {
  let n, r = -1, a, f2 = i[0 * 2 + 1], o = 0, c = 7, l2 = 4;
  for (f2 === 0 && (c = 138, l2 = 3), i[(t + 1) * 2 + 1] = 65535, n = 0;n <= t; n++)
    a = f2, f2 = i[(n + 1) * 2 + 1], !(++o < c && a === f2) && (o < l2 ? e.bl_tree[a * 2] += o : a !== 0 ? (a !== r && e.bl_tree[a * 2]++, e.bl_tree[fi * 2]++) : o <= 10 ? e.bl_tree[_i * 2]++ : e.bl_tree[hi * 2]++, o = 0, r = a, f2 === 0 ? (c = 138, l2 = 3) : a === f2 ? (c = 6, l2 = 3) : (c = 7, l2 = 4));
}, St = (e, i, t) => {
  let n, r = -1, a, f2 = i[0 * 2 + 1], o = 0, c = 7, l2 = 4;
  for (f2 === 0 && (c = 138, l2 = 3), n = 0;n <= t; n++)
    if (a = f2, f2 = i[(n + 1) * 2 + 1], !(++o < c && a === f2)) {
      if (o < l2)
        do
          M(e, a, e.bl_tree);
        while (--o !== 0);
      else
        a !== 0 ? (a !== r && (M(e, a, e.bl_tree), o--), M(e, fi, e.bl_tree), N2(e, o - 3, 2)) : o <= 10 ? (M(e, _i, e.bl_tree), N2(e, o - 3, 3)) : (M(e, hi, e.bl_tree), N2(e, o - 11, 7));
      o = 0, r = a, f2 === 0 ? (c = 138, l2 = 3) : a === f2 ? (c = 6, l2 = 3) : (c = 7, l2 = 4);
    }
}, Ji = (e) => {
  let i;
  for (mt(e, e.dyn_ltree, e.l_desc.max_code), mt(e, e.dyn_dtree, e.d_desc.max_code), lt(e, e.bl_desc), i = wt - 1;i >= 3 && e.bl_tree[di[i] * 2 + 1] === 0; i--)
    ;
  return e.opt_len += 3 * (i + 1) + 5 + 5 + 4, i;
}, Qi = (e, i, t, n) => {
  let r;
  for (N2(e, i - 257, 5), N2(e, t - 1, 5), N2(e, n - 4, 4), r = 0;r < n; r++)
    N2(e, e.bl_tree[di[r] * 2 + 1], 3);
  St(e, e.dyn_ltree, i - 1), St(e, e.dyn_dtree, t - 1);
}, qi = (e) => {
  let i = 4093624447, t;
  for (t = 0;t <= 31; t++, i >>>= 1)
    if (i & 1 && e.dyn_ltree[t * 2] !== 0)
      return 0;
  if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0)
    return 1;
  for (t = 32;t < ze; t++)
    if (e.dyn_ltree[t * 2] !== 0)
      return 1;
  return 0;
}, At = false, en = (e) => {
  At || (Vi(), At = true), e.l_desc = new Ge(e.dyn_ltree, si), e.d_desc = new Ge(e.dyn_dtree, ci), e.bl_desc = new Ge(e.bl_tree, ui), e.bi_buf = 0, e.bi_valid = 0, pi(e);
}, ki = (e, i, t, n) => {
  N2(e, (Hi << 1) + (n ? 1 : 0), 3), xi(e), Ee(e, t), Ee(e, ~t), t && e.pending_buf.set(e.window.subarray(i, i + t), e.pending), e.pending += t;
}, tn = (e) => {
  N2(e, li << 1, 3), M(e, bt, P), ji(e);
}, nn = (e, i, t, n) => {
  let r, a, f2 = 0;
  e.level > 0 ? (e.strm.data_type === 2 && (e.strm.data_type = qi(e)), lt(e, e.l_desc), lt(e, e.d_desc), f2 = Ji(e), r = e.opt_len + 3 + 7 >>> 3, a = e.static_len + 3 + 7 >>> 3, a <= r && (r = a)) : r = a = t + 5, t + 4 <= r && i !== -1 ? ki(e, i, t, n) : e.strategy === 4 || a === r ? (N2(e, (li << 1) + (n ? 1 : 0), 3), yt(e, P, be)) : (N2(e, (Bi << 1) + (n ? 1 : 0), 3), Qi(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, f2 + 1), yt(e, e.dyn_ltree, e.dyn_dtree)), pi(e), n && xi(e);
}, an = (e, i, t) => (e.pending_buf[e.sym_buf + e.sym_next++] = i, e.pending_buf[e.sym_buf + e.sym_next++] = i >> 8, e.pending_buf[e.sym_buf + e.sym_next++] = t, i === 0 ? e.dyn_ltree[t * 2]++ : (e.matches++, i--, e.dyn_ltree[(ve[t] + ze + 1) * 2]++, e.dyn_dtree[wi(i) * 2]++), e.sym_next === e.sym_end), rn, ln, on, fn, _n, hn, dn = (e, i, t, n) => {
  let r = e & 65535 | 0, a = e >>> 16 & 65535 | 0, f2 = 0;
  for (;t !== 0; ) {
    f2 = t > 2000 ? 2000 : t, t -= f2;
    do
      r = r + i[n++] | 0, a = a + r | 0;
    while (--f2);
    r %= 65521, a %= 65521;
  }
  return r | a << 16 | 0;
}, ye, sn = () => {
  let e, i = [];
  for (var t = 0;t < 256; t++) {
    e = t;
    for (var n = 0;n < 8; n++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    i[t] = e;
  }
  return i;
}, cn, un = (e, i, t, n) => {
  const r = cn, a = n + t;
  e ^= -1;
  for (let f2 = n;f2 < a; f2++)
    e = e >>> 8 ^ r[(e ^ i[f2]) & 255];
  return e ^ -1;
}, Z2, oe, Te, wn, ot, bn, j, gn, W2, pn, xn, C, zt, I, Tt, H, kn, We, vn, En, Oe, yn, mn, Sn, An, Be, zn = 9, Tn = 15, Rn = 8, Dn = 29, Zn = 256, ft, In = 30, On = 19, Nn, Ln = 15, k2 = 3, G = 258, B2, Un = 32, fe2 = 42, pt = 57, _t = 69, ht = 73, dt = 91, st = 103, q = 113, ue = 666, O2 = 1, de = 2, te = 3, se = 4, Cn = 3, ee = (e, i) => (e.msg = oe[i], i), Rt = (e) => e * 2 - (e > 4 ? 9 : 0), Y2 = (e) => {
  let i = e.length;
  for (;--i >= 0; )
    e[i] = 0;
}, $n = (e) => {
  let i, t, n, r = e.w_size;
  i = e.hash_size, n = i;
  do
    t = e.head[--n], e.head[n] = t >= r ? t - r : 0;
  while (--i);
  i = r, n = i;
  do
    t = e.prev[--n], e.prev[n] = t >= r ? t - r : 0;
  while (--i);
}, Fn = (e, i, t) => (i << e.hash_shift ^ t) & e.hash_mask, V, L = (e) => {
  const i = e.state;
  let t = i.pending;
  t > e.avail_out && (t = e.avail_out), t !== 0 && (e.output.set(i.pending_buf.subarray(i.pending_out, i.pending_out + t), e.next_out), e.next_out += t, i.pending_out += t, e.total_out += t, e.avail_out -= t, i.pending -= t, i.pending === 0 && (i.pending_out = 0));
}, U = (e, i) => {
  bn(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, i), e.block_start = e.strstart, L(e.strm);
}, S = (e, i) => {
  e.pending_buf[e.pending++] = i;
}, ce2 = (e, i) => {
  e.pending_buf[e.pending++] = i >>> 8 & 255, e.pending_buf[e.pending++] = i & 255;
}, ct = (e, i, t, n) => {
  let r = e.avail_in;
  return r > n && (r = n), r === 0 ? 0 : (e.avail_in -= r, i.set(e.input.subarray(e.next_in, e.next_in + r), t), e.state.wrap === 1 ? e.adler = ye(e.adler, i, r, t) : e.state.wrap === 2 && (e.adler = Z2(e.adler, i, r, t)), e.next_in += r, e.total_in += r, r);
}, vi = (e, i) => {
  let { max_chain_length: t, strstart: n } = e, r, a, f2 = e.prev_length, o = e.nice_match;
  const c = e.strstart > e.w_size - B2 ? e.strstart - (e.w_size - B2) : 0, l2 = e.window, _ = e.w_mask, y = e.prev, s = e.strstart + G;
  let h = l2[n + f2 - 1], u = l2[n + f2];
  e.prev_length >= e.good_match && (t >>= 2), o > e.lookahead && (o = e.lookahead);
  do
    if (r = i, !(l2[r + f2] !== u || l2[r + f2 - 1] !== h || l2[r] !== l2[n] || l2[++r] !== l2[n + 1])) {
      n += 2, r++;
      do
        ;
      while (l2[++n] === l2[++r] && l2[++n] === l2[++r] && l2[++n] === l2[++r] && l2[++n] === l2[++r] && l2[++n] === l2[++r] && l2[++n] === l2[++r] && l2[++n] === l2[++r] && l2[++n] === l2[++r] && n < s);
      if (a = G - (s - n), n = s - G, a > f2) {
        if (e.match_start = i, f2 = a, a >= o)
          break;
        h = l2[n + f2 - 1], u = l2[n + f2];
      }
    }
  while ((i = y[i & _]) > c && --t !== 0);
  return f2 <= e.lookahead ? f2 : e.lookahead;
}, _e = (e) => {
  const i = e.w_size;
  let t, n, r;
  do {
    if (n = e.window_size - e.lookahead - e.strstart, e.strstart >= i + (i - B2) && (e.window.set(e.window.subarray(i, i + i - n), 0), e.match_start -= i, e.strstart -= i, e.block_start -= i, e.insert > e.strstart && (e.insert = e.strstart), $n(e), n += i), e.strm.avail_in === 0)
      break;
    if (t = ct(e.strm, e.window, e.strstart + e.lookahead, n), e.lookahead += t, e.lookahead + e.insert >= k2)
      for (r = e.strstart - e.insert, e.ins_h = e.window[r], e.ins_h = V(e, e.ins_h, e.window[r + 1]);e.insert && (e.ins_h = V(e, e.ins_h, e.window[r + k2 - 1]), e.prev[r & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = r, r++, e.insert--, !(e.lookahead + e.insert < k2)); )
        ;
  } while (e.lookahead < B2 && e.strm.avail_in !== 0);
}, Ei = (e, i) => {
  let t = e.pending_buf_size - 5 > e.w_size ? e.w_size : e.pending_buf_size - 5, n, r, a, f2 = 0, o = e.strm.avail_in;
  do {
    if (n = 65535, a = e.bi_valid + 42 >> 3, e.strm.avail_out < a || (a = e.strm.avail_out - a, r = e.strstart - e.block_start, n > r + e.strm.avail_in && (n = r + e.strm.avail_in), n > a && (n = a), n < t && (n === 0 && i !== C || i === W2 || n !== r + e.strm.avail_in)))
      break;
    f2 = i === C && n === r + e.strm.avail_in ? 1 : 0, ot(e, 0, 0, f2), e.pending_buf[e.pending - 4] = n, e.pending_buf[e.pending - 3] = n >> 8, e.pending_buf[e.pending - 2] = ~n, e.pending_buf[e.pending - 1] = ~n >> 8, L(e.strm), r && (r > n && (r = n), e.strm.output.set(e.window.subarray(e.block_start, e.block_start + r), e.strm.next_out), e.strm.next_out += r, e.strm.avail_out -= r, e.strm.total_out += r, e.block_start += r, n -= r), n && (ct(e.strm, e.strm.output, e.strm.next_out, n), e.strm.next_out += n, e.strm.avail_out -= n, e.strm.total_out += n);
  } while (f2 === 0);
  return o -= e.strm.avail_in, o && (o >= e.w_size ? (e.matches = 2, e.window.set(e.strm.input.subarray(e.strm.next_in - e.w_size, e.strm.next_in), 0), e.strstart = e.w_size, e.insert = e.strstart) : (e.window_size - e.strstart <= o && (e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, e.insert > e.strstart && (e.insert = e.strstart)), e.window.set(e.strm.input.subarray(e.strm.next_in - o, e.strm.next_in), e.strstart), e.strstart += o, e.insert += o > e.w_size - e.insert ? e.w_size - e.insert : o), e.block_start = e.strstart), e.high_water < e.strstart && (e.high_water = e.strstart), f2 ? se : i !== W2 && i !== C && e.strm.avail_in === 0 && e.strstart === e.block_start ? de : (a = e.window_size - e.strstart, e.strm.avail_in > a && e.block_start >= e.w_size && (e.block_start -= e.w_size, e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, a += e.w_size, e.insert > e.strstart && (e.insert = e.strstart)), a > e.strm.avail_in && (a = e.strm.avail_in), a && (ct(e.strm, e.window, e.strstart, a), e.strstart += a, e.insert += a > e.w_size - e.insert ? e.w_size - e.insert : a), e.high_water < e.strstart && (e.high_water = e.strstart), a = e.bi_valid + 42 >> 3, a = e.pending_buf_size - a > 65535 ? 65535 : e.pending_buf_size - a, t = a > e.w_size ? e.w_size : a, r = e.strstart - e.block_start, (r >= t || (r || i === C) && i !== W2 && e.strm.avail_in === 0 && r <= a) && (n = r > a ? a : r, f2 = i === C && e.strm.avail_in === 0 && n === r ? 1 : 0, ot(e, e.block_start, n, f2), e.block_start += n, L(e.strm)), f2 ? te : O2);
}, Ve = (e, i) => {
  let t, n;
  for (;; ) {
    if (e.lookahead < B2) {
      if (_e(e), e.lookahead < B2 && i === W2)
        return O2;
      if (e.lookahead === 0)
        break;
    }
    if (t = 0, e.lookahead >= k2 && (e.ins_h = V(e, e.ins_h, e.window[e.strstart + k2 - 1]), t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), t !== 0 && e.strstart - t <= e.w_size - B2 && (e.match_length = vi(e, t)), e.match_length >= k2)
      if (n = j(e, e.strstart - e.match_start, e.match_length - k2), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= k2) {
        e.match_length--;
        do
          e.strstart++, e.ins_h = V(e, e.ins_h, e.window[e.strstart + k2 - 1]), t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart;
        while (--e.match_length !== 0);
        e.strstart++;
      } else
        e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = V(e, e.ins_h, e.window[e.strstart + 1]);
    else
      n = j(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
    if (n && (U(e, false), e.strm.avail_out === 0))
      return O2;
  }
  return e.insert = e.strstart < k2 - 1 ? e.strstart : k2 - 1, i === C ? (U(e, true), e.strm.avail_out === 0 ? te : se) : e.sym_next && (U(e, false), e.strm.avail_out === 0) ? O2 : de;
}, ae = (e, i) => {
  let t, n, r;
  for (;; ) {
    if (e.lookahead < B2) {
      if (_e(e), e.lookahead < B2 && i === W2)
        return O2;
      if (e.lookahead === 0)
        break;
    }
    if (t = 0, e.lookahead >= k2 && (e.ins_h = V(e, e.ins_h, e.window[e.strstart + k2 - 1]), t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = k2 - 1, t !== 0 && e.prev_length < e.max_lazy_match && e.strstart - t <= e.w_size - B2 && (e.match_length = vi(e, t), e.match_length <= 5 && (e.strategy === En || e.match_length === k2 && e.strstart - e.match_start > 4096) && (e.match_length = k2 - 1)), e.prev_length >= k2 && e.match_length <= e.prev_length) {
      r = e.strstart + e.lookahead - k2, n = j(e, e.strstart - 1 - e.prev_match, e.prev_length - k2), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
      do
        ++e.strstart <= r && (e.ins_h = V(e, e.ins_h, e.window[e.strstart + k2 - 1]), t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart);
      while (--e.prev_length !== 0);
      if (e.match_available = 0, e.match_length = k2 - 1, e.strstart++, n && (U(e, false), e.strm.avail_out === 0))
        return O2;
    } else if (e.match_available) {
      if (n = j(e, 0, e.window[e.strstart - 1]), n && U(e, false), e.strstart++, e.lookahead--, e.strm.avail_out === 0)
        return O2;
    } else
      e.match_available = 1, e.strstart++, e.lookahead--;
  }
  return e.match_available && (n = j(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < k2 - 1 ? e.strstart : k2 - 1, i === C ? (U(e, true), e.strm.avail_out === 0 ? te : se) : e.sym_next && (U(e, false), e.strm.avail_out === 0) ? O2 : de;
}, Mn = (e, i) => {
  let t, n, r, a;
  const f2 = e.window;
  for (;; ) {
    if (e.lookahead <= G) {
      if (_e(e), e.lookahead <= G && i === W2)
        return O2;
      if (e.lookahead === 0)
        break;
    }
    if (e.match_length = 0, e.lookahead >= k2 && e.strstart > 0 && (r = e.strstart - 1, n = f2[r], n === f2[++r] && n === f2[++r] && n === f2[++r])) {
      a = e.strstart + G;
      do
        ;
      while (n === f2[++r] && n === f2[++r] && n === f2[++r] && n === f2[++r] && n === f2[++r] && n === f2[++r] && n === f2[++r] && n === f2[++r] && r < a);
      e.match_length = G - (a - r), e.match_length > e.lookahead && (e.match_length = e.lookahead);
    }
    if (e.match_length >= k2 ? (t = j(e, 1, e.match_length - k2), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (t = j(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), t && (U(e, false), e.strm.avail_out === 0))
      return O2;
  }
  return e.insert = 0, i === C ? (U(e, true), e.strm.avail_out === 0 ? te : se) : e.sym_next && (U(e, false), e.strm.avail_out === 0) ? O2 : de;
}, Hn = (e, i) => {
  let t;
  for (;; ) {
    if (e.lookahead === 0 && (_e(e), e.lookahead === 0)) {
      if (i === W2)
        return O2;
      break;
    }
    if (e.match_length = 0, t = j(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, t && (U(e, false), e.strm.avail_out === 0))
      return O2;
  }
  return e.insert = 0, i === C ? (U(e, true), e.strm.avail_out === 0 ? te : se) : e.sym_next && (U(e, false), e.strm.avail_out === 0) ? O2 : de;
}, we, Bn = (e) => {
  e.window_size = 2 * e.w_size, Y2(e.head), e.max_lazy_match = we[e.level].max_lazy, e.good_match = we[e.level].good_length, e.nice_match = we[e.level].nice_length, e.max_chain_length = we[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = k2 - 1, e.match_available = 0, e.ins_h = 0;
}, Re = (e) => {
  if (!e)
    return 1;
  const i = e.state;
  return !i || i.strm !== e || i.status !== fe2 && i.status !== pt && i.status !== _t && i.status !== ht && i.status !== dt && i.status !== st && i.status !== q && i.status !== ue ? 1 : 0;
}, yi = (e) => {
  if (Re(e))
    return ee(e, H);
  e.total_in = e.total_out = 0, e.data_type = An;
  const i = e.state;
  return i.pending = 0, i.pending_out = 0, i.wrap < 0 && (i.wrap = -i.wrap), i.status = i.wrap === 2 ? pt : i.wrap ? fe2 : q, e.adler = i.wrap === 2 ? 0 : 1, i.last_flush = -2, wn(i), I;
}, mi = (e) => {
  const i = yi(e);
  return i === I && Bn(e.state), i;
}, Pn = (e, i) => Re(e) || e.state.wrap !== 2 ? H : (e.state.gzhead = i, I), Si = (e, i, t, n, r, a) => {
  if (!e)
    return H;
  let f2 = 1;
  if (i === vn && (i = 6), n < 0 ? (f2 = 0, n = -n) : n > 15 && (f2 = 2, n -= 16), r < 1 || r > zn || t !== Be || n < 8 || n > 15 || i < 0 || i > 9 || a < 0 || a > mn || n === 8 && f2 !== 1)
    return ee(e, H);
  n === 8 && (n = 9);
  const o = new Kn;
  return e.state = o, o.strm = e, o.status = fe2, o.wrap = f2, o.gzhead = null, o.w_bits = n, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = r + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + k2 - 1) / k2), o.window = new Uint8Array(o.w_size * 2), o.head = new Uint16Array(o.hash_size), o.prev = new Uint16Array(o.w_size), o.lit_bufsize = 1 << r + 6, o.pending_buf_size = o.lit_bufsize * 4, o.pending_buf = new Uint8Array(o.pending_buf_size), o.sym_buf = o.lit_bufsize, o.sym_end = (o.lit_bufsize - 1) * 3, o.level = i, o.strategy = a, o.method = t, mi(e);
}, Xn = (e, i) => Si(e, i, Be, Tn, Rn, Sn), Yn = (e, i) => {
  if (Re(e) || i > zt || i < 0)
    return e ? ee(e, H) : H;
  const t = e.state;
  if (!e.output || e.avail_in !== 0 && !e.input || t.status === ue && i !== C)
    return ee(e, e.avail_out === 0 ? We : H);
  const n = t.last_flush;
  if (t.last_flush = i, t.pending !== 0) {
    if (L(e), e.avail_out === 0)
      return t.last_flush = -1, I;
  } else if (e.avail_in === 0 && Rt(i) <= Rt(n) && i !== C)
    return ee(e, We);
  if (t.status === ue && e.avail_in !== 0)
    return ee(e, We);
  if (t.status === fe2 && t.wrap === 0 && (t.status = q), t.status === fe2) {
    let r = Be + (t.w_bits - 8 << 4) << 8, a = -1;
    if (t.strategy >= Oe || t.level < 2 ? a = 0 : t.level < 6 ? a = 1 : t.level === 6 ? a = 2 : a = 3, r |= a << 6, t.strstart !== 0 && (r |= Un), r += 31 - r % 31, ce2(t, r), t.strstart !== 0 && (ce2(t, e.adler >>> 16), ce2(t, e.adler & 65535)), e.adler = 1, t.status = q, L(e), t.pending !== 0)
      return t.last_flush = -1, I;
  }
  if (t.status === pt) {
    if (e.adler = 0, S(t, 31), S(t, 139), S(t, 8), t.gzhead)
      S(t, (t.gzhead.text ? 1 : 0) + (t.gzhead.hcrc ? 2 : 0) + (t.gzhead.extra ? 4 : 0) + (t.gzhead.name ? 8 : 0) + (t.gzhead.comment ? 16 : 0)), S(t, t.gzhead.time & 255), S(t, t.gzhead.time >> 8 & 255), S(t, t.gzhead.time >> 16 & 255), S(t, t.gzhead.time >> 24 & 255), S(t, t.level === 9 ? 2 : t.strategy >= Oe || t.level < 2 ? 4 : 0), S(t, t.gzhead.os & 255), t.gzhead.extra && t.gzhead.extra.length && (S(t, t.gzhead.extra.length & 255), S(t, t.gzhead.extra.length >> 8 & 255)), t.gzhead.hcrc && (e.adler = Z2(e.adler, t.pending_buf, t.pending, 0)), t.gzindex = 0, t.status = _t;
    else if (S(t, 0), S(t, 0), S(t, 0), S(t, 0), S(t, 0), S(t, t.level === 9 ? 2 : t.strategy >= Oe || t.level < 2 ? 4 : 0), S(t, Cn), t.status = q, L(e), t.pending !== 0)
      return t.last_flush = -1, I;
  }
  if (t.status === _t) {
    if (t.gzhead.extra) {
      let r = t.pending, a = (t.gzhead.extra.length & 65535) - t.gzindex;
      for (;t.pending + a > t.pending_buf_size; ) {
        let o = t.pending_buf_size - t.pending;
        if (t.pending_buf.set(t.gzhead.extra.subarray(t.gzindex, t.gzindex + o), t.pending), t.pending = t.pending_buf_size, t.gzhead.hcrc && t.pending > r && (e.adler = Z2(e.adler, t.pending_buf, t.pending - r, r)), t.gzindex += o, L(e), t.pending !== 0)
          return t.last_flush = -1, I;
        r = 0, a -= o;
      }
      let f2 = new Uint8Array(t.gzhead.extra);
      t.pending_buf.set(f2.subarray(t.gzindex, t.gzindex + a), t.pending), t.pending += a, t.gzhead.hcrc && t.pending > r && (e.adler = Z2(e.adler, t.pending_buf, t.pending - r, r)), t.gzindex = 0;
    }
    t.status = ht;
  }
  if (t.status === ht) {
    if (t.gzhead.name) {
      let r = t.pending, a;
      do {
        if (t.pending === t.pending_buf_size) {
          if (t.gzhead.hcrc && t.pending > r && (e.adler = Z2(e.adler, t.pending_buf, t.pending - r, r)), L(e), t.pending !== 0)
            return t.last_flush = -1, I;
          r = 0;
        }
        t.gzindex < t.gzhead.name.length ? a = t.gzhead.name.charCodeAt(t.gzindex++) & 255 : a = 0, S(t, a);
      } while (a !== 0);
      t.gzhead.hcrc && t.pending > r && (e.adler = Z2(e.adler, t.pending_buf, t.pending - r, r)), t.gzindex = 0;
    }
    t.status = dt;
  }
  if (t.status === dt) {
    if (t.gzhead.comment) {
      let r = t.pending, a;
      do {
        if (t.pending === t.pending_buf_size) {
          if (t.gzhead.hcrc && t.pending > r && (e.adler = Z2(e.adler, t.pending_buf, t.pending - r, r)), L(e), t.pending !== 0)
            return t.last_flush = -1, I;
          r = 0;
        }
        t.gzindex < t.gzhead.comment.length ? a = t.gzhead.comment.charCodeAt(t.gzindex++) & 255 : a = 0, S(t, a);
      } while (a !== 0);
      t.gzhead.hcrc && t.pending > r && (e.adler = Z2(e.adler, t.pending_buf, t.pending - r, r));
    }
    t.status = st;
  }
  if (t.status === st) {
    if (t.gzhead.hcrc) {
      if (t.pending + 2 > t.pending_buf_size && (L(e), t.pending !== 0))
        return t.last_flush = -1, I;
      S(t, e.adler & 255), S(t, e.adler >> 8 & 255), e.adler = 0;
    }
    if (t.status = q, L(e), t.pending !== 0)
      return t.last_flush = -1, I;
  }
  if (e.avail_in !== 0 || t.lookahead !== 0 || i !== W2 && t.status !== ue) {
    let r = t.level === 0 ? Ei(t, i) : t.strategy === Oe ? Hn(t, i) : t.strategy === yn ? Mn(t, i) : we[t.level].func(t, i);
    if ((r === te || r === se) && (t.status = ue), r === O2 || r === te)
      return e.avail_out === 0 && (t.last_flush = -1), I;
    if (r === de && (i === pn ? gn(t) : i !== zt && (ot(t, 0, 0, false), i === xn && (Y2(t.head), t.lookahead === 0 && (t.strstart = 0, t.block_start = 0, t.insert = 0))), L(e), e.avail_out === 0))
      return t.last_flush = -1, I;
  }
  return i !== C ? I : t.wrap <= 0 ? Tt : (t.wrap === 2 ? (S(t, e.adler & 255), S(t, e.adler >> 8 & 255), S(t, e.adler >> 16 & 255), S(t, e.adler >> 24 & 255), S(t, e.total_in & 255), S(t, e.total_in >> 8 & 255), S(t, e.total_in >> 16 & 255), S(t, e.total_in >> 24 & 255)) : (ce2(t, e.adler >>> 16), ce2(t, e.adler & 65535)), L(e), t.wrap > 0 && (t.wrap = -t.wrap), t.pending !== 0 ? I : Tt);
}, Gn = (e) => {
  if (Re(e))
    return H;
  const i = e.state.status;
  return e.state = null, i === q ? ee(e, kn) : I;
}, jn = (e, i) => {
  let t = i.length;
  if (Re(e))
    return H;
  const n = e.state, r = n.wrap;
  if (r === 2 || r === 1 && n.status !== fe2 || n.lookahead)
    return H;
  if (r === 1 && (e.adler = ye(e.adler, i, t, 0)), n.wrap = 0, t >= n.w_size) {
    r === 0 && (Y2(n.head), n.strstart = 0, n.block_start = 0, n.insert = 0);
    let c = new Uint8Array(n.w_size);
    c.set(i.subarray(t - n.w_size, t), 0), i = c, t = n.w_size;
  }
  const { avail_in: a, next_in: f2, input: o } = e;
  for (e.avail_in = t, e.next_in = 0, e.input = i, _e(n);n.lookahead >= k2; ) {
    let c = n.strstart, l2 = n.lookahead - (k2 - 1);
    do
      n.ins_h = V(n, n.ins_h, n.window[c + k2 - 1]), n.prev[c & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = c, c++;
    while (--l2);
    n.strstart = c, n.lookahead = k2 - 1, _e(n);
  }
  return n.strstart += n.lookahead, n.block_start = n.strstart, n.insert = n.lookahead, n.lookahead = 0, n.match_length = n.prev_length = k2 - 1, n.match_available = 0, e.next_in = f2, e.input = o, e.avail_in = a, n.wrap = r, I;
}, Wn, Vn, Jn, Qn, qn, ea, ta, ia, na = "pako deflate (from Nodeca project)", ge, aa = (e, i) => Object.prototype.hasOwnProperty.call(e, i), ra = function(e) {
  const i = Array.prototype.slice.call(arguments, 1);
  for (;i.length; ) {
    const t = i.shift();
    if (t) {
      if (typeof t != "object")
        throw new TypeError(t + "must be non-object");
      for (const n in t)
        aa(t, n) && (e[n] = t[n]);
    }
  }
  return e;
}, la = (e) => {
  let i = 0;
  for (let n = 0, r = e.length;n < r; n++)
    i += e[n].length;
  const t = new Uint8Array(i);
  for (let n = 0, r = 0, a = e.length;n < a; n++) {
    let f2 = e[n];
    t.set(f2, r), r += f2.length;
  }
  return t;
}, Ke, Ai = true, me, oa = (e) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(e);
  let i, t, n, r, a, f2 = e.length, o = 0;
  for (r = 0;r < f2; r++)
    t = e.charCodeAt(r), (t & 64512) === 55296 && r + 1 < f2 && (n = e.charCodeAt(r + 1), (n & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (n - 56320), r++)), o += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4;
  for (i = new Uint8Array(o), a = 0, r = 0;a < o; r++)
    t = e.charCodeAt(r), (t & 64512) === 55296 && r + 1 < f2 && (n = e.charCodeAt(r + 1), (n & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (n - 56320), r++)), t < 128 ? i[a++] = t : t < 2048 ? (i[a++] = 192 | t >>> 6, i[a++] = 128 | t & 63) : t < 65536 ? (i[a++] = 224 | t >>> 12, i[a++] = 128 | t >>> 6 & 63, i[a++] = 128 | t & 63) : (i[a++] = 240 | t >>> 18, i[a++] = 128 | t >>> 12 & 63, i[a++] = 128 | t >>> 6 & 63, i[a++] = 128 | t & 63);
  return i;
}, fa = (e, i) => {
  if (i < 65534 && e.subarray && Ai)
    return String.fromCharCode.apply(null, e.length === i ? e : e.subarray(0, i));
  let t = "";
  for (let n = 0;n < i; n++)
    t += String.fromCharCode(e[n]);
  return t;
}, _a = (e, i) => {
  const t = i || e.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(e.subarray(0, i));
  let n, r;
  const a = new Array(t * 2);
  for (r = 0, n = 0;n < t; ) {
    let f2 = e[n++];
    if (f2 < 128) {
      a[r++] = f2;
      continue;
    }
    let o = me[f2];
    if (o > 4) {
      a[r++] = 65533, n += o - 1;
      continue;
    }
    for (f2 &= o === 2 ? 31 : o === 3 ? 15 : 7;o > 1 && n < t; )
      f2 = f2 << 6 | e[n++] & 63, o--;
    if (o > 1) {
      a[r++] = 65533;
      continue;
    }
    f2 < 65536 ? a[r++] = f2 : (f2 -= 65536, a[r++] = 55296 | f2 >> 10 & 1023, a[r++] = 56320 | f2 & 1023);
  }
  return fa(a, r);
}, ha = (e, i) => {
  i = i || e.length, i > e.length && (i = e.length);
  let t = i - 1;
  for (;t >= 0 && (e[t] & 192) === 128; )
    t--;
  return t < 0 || t === 0 ? i : t + me[e[t]] > i ? t : i;
}, Se, zi, Ti, sa, ca, ua, wa, Me, ba, ga, pa, xa, Ne = 16209, ka = 16191, va = function(i, t) {
  let n, r, a, f2, o, c, l2, _, y, s, h, u, R2, v, g2, A2, p2, d3, m2, D2, w, z, E2, b;
  const x2 = i.state;
  n = i.next_in, E2 = i.input, r = n + (i.avail_in - 5), a = i.next_out, b = i.output, f2 = a - (t - i.avail_out), o = a + (i.avail_out - 257), c = x2.dmax, l2 = x2.wsize, _ = x2.whave, y = x2.wnext, s = x2.window, h = x2.hold, u = x2.bits, R2 = x2.lencode, v = x2.distcode, g2 = (1 << x2.lenbits) - 1, A2 = (1 << x2.distbits) - 1;
  e:
    do {
      u < 15 && (h += E2[n++] << u, u += 8, h += E2[n++] << u, u += 8), p2 = R2[h & g2];
      t:
        for (;; ) {
          if (d3 = p2 >>> 24, h >>>= d3, u -= d3, d3 = p2 >>> 16 & 255, d3 === 0)
            b[a++] = p2 & 65535;
          else if (d3 & 16) {
            m2 = p2 & 65535, d3 &= 15, d3 && (u < d3 && (h += E2[n++] << u, u += 8), m2 += h & (1 << d3) - 1, h >>>= d3, u -= d3), u < 15 && (h += E2[n++] << u, u += 8, h += E2[n++] << u, u += 8), p2 = v[h & A2];
            i:
              for (;; ) {
                if (d3 = p2 >>> 24, h >>>= d3, u -= d3, d3 = p2 >>> 16 & 255, d3 & 16) {
                  if (D2 = p2 & 65535, d3 &= 15, u < d3 && (h += E2[n++] << u, u += 8, u < d3 && (h += E2[n++] << u, u += 8)), D2 += h & (1 << d3) - 1, D2 > c) {
                    i.msg = "invalid distance too far back", x2.mode = Ne;
                    break e;
                  }
                  if (h >>>= d3, u -= d3, d3 = a - f2, D2 > d3) {
                    if (d3 = D2 - d3, d3 > _ && x2.sane) {
                      i.msg = "invalid distance too far back", x2.mode = Ne;
                      break e;
                    }
                    if (w = 0, z = s, y === 0) {
                      if (w += l2 - d3, d3 < m2) {
                        m2 -= d3;
                        do
                          b[a++] = s[w++];
                        while (--d3);
                        w = a - D2, z = b;
                      }
                    } else if (y < d3) {
                      if (w += l2 + y - d3, d3 -= y, d3 < m2) {
                        m2 -= d3;
                        do
                          b[a++] = s[w++];
                        while (--d3);
                        if (w = 0, y < m2) {
                          d3 = y, m2 -= d3;
                          do
                            b[a++] = s[w++];
                          while (--d3);
                          w = a - D2, z = b;
                        }
                      }
                    } else if (w += y - d3, d3 < m2) {
                      m2 -= d3;
                      do
                        b[a++] = s[w++];
                      while (--d3);
                      w = a - D2, z = b;
                    }
                    for (;m2 > 2; )
                      b[a++] = z[w++], b[a++] = z[w++], b[a++] = z[w++], m2 -= 3;
                    m2 && (b[a++] = z[w++], m2 > 1 && (b[a++] = z[w++]));
                  } else {
                    w = a - D2;
                    do
                      b[a++] = b[w++], b[a++] = b[w++], b[a++] = b[w++], m2 -= 3;
                    while (m2 > 2);
                    m2 && (b[a++] = b[w++], m2 > 1 && (b[a++] = b[w++]));
                  }
                } else if (d3 & 64) {
                  i.msg = "invalid distance code", x2.mode = Ne;
                  break e;
                } else {
                  p2 = v[(p2 & 65535) + (h & (1 << d3) - 1)];
                  continue i;
                }
                break;
              }
          } else if (d3 & 64)
            if (d3 & 32) {
              x2.mode = ka;
              break e;
            } else {
              i.msg = "invalid literal/length code", x2.mode = Ne;
              break e;
            }
          else {
            p2 = R2[(p2 & 65535) + (h & (1 << d3) - 1)];
            continue t;
          }
          break;
        }
    } while (n < r && a < o);
  m2 = u >> 3, n -= m2, u -= m2 << 3, h &= (1 << u) - 1, i.next_in = n, i.next_out = a, i.avail_in = n < r ? 5 + (r - n) : 5 - (n - r), i.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), x2.hold = h, x2.bits = u;
}, re = 15, Dt = 852, Zt = 592, It = 0, Je = 1, Ot = 2, Ea, ya, ma, Sa, Aa = (e, i, t, n, r, a, f2, o) => {
  const c = o.bits;
  let l2 = 0, _ = 0, y = 0, s = 0, h = 0, u = 0, R2 = 0, v = 0, g2 = 0, A2 = 0, p2, d3, m2, D2, w, z = null, E2;
  const b = new Uint16Array(re + 1), x2 = new Uint16Array(re + 1);
  let J = null, vt, Ze, Ie;
  for (l2 = 0;l2 <= re; l2++)
    b[l2] = 0;
  for (_ = 0;_ < n; _++)
    b[i[t + _]]++;
  for (h = c, s = re;s >= 1 && b[s] === 0; s--)
    ;
  if (h > s && (h = s), s === 0)
    return r[a++] = 1 << 24 | 64 << 16 | 0, r[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (y = 1;y < s && b[y] === 0; y++)
    ;
  for (h < y && (h = y), v = 1, l2 = 1;l2 <= re; l2++)
    if (v <<= 1, v -= b[l2], v < 0)
      return -1;
  if (v > 0 && (e === It || s !== 1))
    return -1;
  for (x2[1] = 0, l2 = 1;l2 < re; l2++)
    x2[l2 + 1] = x2[l2] + b[l2];
  for (_ = 0;_ < n; _++)
    i[t + _] !== 0 && (f2[x2[i[t + _]]++] = _);
  if (e === It ? (z = J = f2, E2 = 20) : e === Je ? (z = Ea, J = ya, E2 = 257) : (z = ma, J = Sa, E2 = 0), A2 = 0, _ = 0, l2 = y, w = a, u = h, R2 = 0, m2 = -1, g2 = 1 << h, D2 = g2 - 1, e === Je && g2 > Dt || e === Ot && g2 > Zt)
    return 1;
  for (;; ) {
    vt = l2 - R2, f2[_] + 1 < E2 ? (Ze = 0, Ie = f2[_]) : f2[_] >= E2 ? (Ze = J[f2[_] - E2], Ie = z[f2[_] - E2]) : (Ze = 96, Ie = 0), p2 = 1 << l2 - R2, d3 = 1 << u, y = d3;
    do
      d3 -= p2, r[w + (A2 >> R2) + d3] = vt << 24 | Ze << 16 | Ie | 0;
    while (d3 !== 0);
    for (p2 = 1 << l2 - 1;A2 & p2; )
      p2 >>= 1;
    if (p2 !== 0 ? (A2 &= p2 - 1, A2 += p2) : A2 = 0, _++, --b[l2] === 0) {
      if (l2 === s)
        break;
      l2 = i[t + f2[_]];
    }
    if (l2 > h && (A2 & D2) !== m2) {
      for (R2 === 0 && (R2 = h), w += y, u = l2 - R2, v = 1 << u;u + R2 < s && (v -= b[u + R2], !(v <= 0)); )
        u++, v <<= 1;
      if (g2 += 1 << u, e === Je && g2 > Dt || e === Ot && g2 > Zt)
        return 1;
      m2 = A2 & D2, r[m2] = h << 24 | u << 16 | w - a | 0;
    }
  }
  return A2 !== 0 && (r[w + A2] = l2 - R2 << 24 | 64 << 16 | 0), o.bits = h, 0;
}, pe, za = 0, Ri = 1, Di = 2, Nt, Ta, Le, ie2, Ra, Da, $2, Zi, Ii, Za, Lt, Pe = 16180, Ut = 16181, Ct = 16182, $t = 16183, Ft = 16184, Mt = 16185, Ht = 16186, Bt = 16187, Kt = 16188, Pt = 16189, He = 16190, K2 = 16191, Qe = 16192, Xt = 16193, qe = 16194, Yt = 16195, Gt = 16196, jt = 16197, Wt = 16198, Ue = 16199, Ce = 16200, Vt = 16201, Jt = 16202, Qt = 16203, qt = 16204, ei = 16205, et = 16206, ti = 16207, ii = 16208, T = 16209, Oi = 16210, Ni = 16211, Ia = 852, Oa = 592, Na = 15, La, ni = (e) => (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24), ne2 = (e) => {
  if (!e)
    return 1;
  const i = e.state;
  return !i || i.strm !== e || i.mode < Pe || i.mode > Ni ? 1 : 0;
}, Li = (e) => {
  if (ne2(e))
    return $2;
  const i = e.state;
  return e.total_in = e.total_out = i.total = 0, e.msg = "", i.wrap && (e.adler = i.wrap & 1), i.mode = Pe, i.last = 0, i.havedict = 0, i.flags = -1, i.dmax = 32768, i.head = null, i.hold = 0, i.bits = 0, i.lencode = i.lendyn = new Int32Array(Ia), i.distcode = i.distdyn = new Int32Array(Oa), i.sane = 1, i.back = -1, ie2;
}, Ui = (e) => {
  if (ne2(e))
    return $2;
  const i = e.state;
  return i.wsize = 0, i.whave = 0, i.wnext = 0, Li(e);
}, Ci = (e, i) => {
  let t;
  if (ne2(e))
    return $2;
  const n = e.state;
  return i < 0 ? (t = 0, i = -i) : (t = (i >> 4) + 5, i < 48 && (i &= 15)), i && (i < 8 || i > 15) ? $2 : (n.window !== null && n.wbits !== i && (n.window = null), n.wrap = t, n.wbits = i, Ui(e));
}, $i = (e, i) => {
  if (!e)
    return $2;
  const t = new Ua;
  e.state = t, t.strm = e, t.window = null, t.mode = Pe;
  const n = Ci(e, i);
  return n !== ie2 && (e.state = null), n;
}, Ca = (e) => $i(e, La), ai = true, tt, it, $a = (e) => {
  if (ai) {
    tt = new Int32Array(512), it = new Int32Array(32);
    let i = 0;
    for (;i < 144; )
      e.lens[i++] = 8;
    for (;i < 256; )
      e.lens[i++] = 9;
    for (;i < 280; )
      e.lens[i++] = 7;
    for (;i < 288; )
      e.lens[i++] = 8;
    for (pe(Ri, e.lens, 0, 288, tt, 0, e.work, { bits: 9 }), i = 0;i < 32; )
      e.lens[i++] = 5;
    pe(Di, e.lens, 0, 32, it, 0, e.work, { bits: 5 }), ai = false;
  }
  e.lencode = tt, e.lenbits = 9, e.distcode = it, e.distbits = 5;
}, Fi = (e, i, t, n) => {
  let r;
  const a = e.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), n >= a.wsize ? (a.window.set(i.subarray(t - a.wsize, t), 0), a.wnext = 0, a.whave = a.wsize) : (r = a.wsize - a.wnext, r > n && (r = n), a.window.set(i.subarray(t - n, t - n + r), a.wnext), n -= r, n ? (a.window.set(i.subarray(t - n, t), 0), a.wnext = n, a.whave = a.wsize) : (a.wnext += r, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += r))), 0;
}, Fa = (e, i) => {
  let t, n, r, a, f2, o, c, l2, _, y, s, h, u, R2, v = 0, g2, A2, p2, d3, m2, D2, w, z;
  const E2 = new Uint8Array(4);
  let b, x2;
  const J = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  if (ne2(e) || !e.output || !e.input && e.avail_in !== 0)
    return $2;
  t = e.state, t.mode === K2 && (t.mode = Qe), f2 = e.next_out, r = e.output, c = e.avail_out, a = e.next_in, n = e.input, o = e.avail_in, l2 = t.hold, _ = t.bits, y = o, s = c, z = ie2;
  e:
    for (;; )
      switch (t.mode) {
        case Pe:
          if (t.wrap === 0) {
            t.mode = Qe;
            break;
          }
          for (;_ < 16; ) {
            if (o === 0)
              break e;
            o--, l2 += n[a++] << _, _ += 8;
          }
          if (t.wrap & 2 && l2 === 35615) {
            t.wbits === 0 && (t.wbits = 15), t.check = 0, E2[0] = l2 & 255, E2[1] = l2 >>> 8 & 255, t.check = Z2(t.check, E2, 2, 0), l2 = 0, _ = 0, t.mode = Ut;
            break;
          }
          if (t.head && (t.head.done = false), !(t.wrap & 1) || (((l2 & 255) << 8) + (l2 >> 8)) % 31) {
            e.msg = "incorrect header check", t.mode = T;
            break;
          }
          if ((l2 & 15) !== Lt) {
            e.msg = "unknown compression method", t.mode = T;
            break;
          }
          if (l2 >>>= 4, _ -= 4, w = (l2 & 15) + 8, t.wbits === 0 && (t.wbits = w), w > 15 || w > t.wbits) {
            e.msg = "invalid window size", t.mode = T;
            break;
          }
          t.dmax = 1 << t.wbits, t.flags = 0, e.adler = t.check = 1, t.mode = l2 & 512 ? Pt : K2, l2 = 0, _ = 0;
          break;
        case Ut:
          for (;_ < 16; ) {
            if (o === 0)
              break e;
            o--, l2 += n[a++] << _, _ += 8;
          }
          if (t.flags = l2, (t.flags & 255) !== Lt) {
            e.msg = "unknown compression method", t.mode = T;
            break;
          }
          if (t.flags & 57344) {
            e.msg = "unknown header flags set", t.mode = T;
            break;
          }
          t.head && (t.head.text = l2 >> 8 & 1), t.flags & 512 && t.wrap & 4 && (E2[0] = l2 & 255, E2[1] = l2 >>> 8 & 255, t.check = Z2(t.check, E2, 2, 0)), l2 = 0, _ = 0, t.mode = Ct;
        case Ct:
          for (;_ < 32; ) {
            if (o === 0)
              break e;
            o--, l2 += n[a++] << _, _ += 8;
          }
          t.head && (t.head.time = l2), t.flags & 512 && t.wrap & 4 && (E2[0] = l2 & 255, E2[1] = l2 >>> 8 & 255, E2[2] = l2 >>> 16 & 255, E2[3] = l2 >>> 24 & 255, t.check = Z2(t.check, E2, 4, 0)), l2 = 0, _ = 0, t.mode = $t;
        case $t:
          for (;_ < 16; ) {
            if (o === 0)
              break e;
            o--, l2 += n[a++] << _, _ += 8;
          }
          t.head && (t.head.xflags = l2 & 255, t.head.os = l2 >> 8), t.flags & 512 && t.wrap & 4 && (E2[0] = l2 & 255, E2[1] = l2 >>> 8 & 255, t.check = Z2(t.check, E2, 2, 0)), l2 = 0, _ = 0, t.mode = Ft;
        case Ft:
          if (t.flags & 1024) {
            for (;_ < 16; ) {
              if (o === 0)
                break e;
              o--, l2 += n[a++] << _, _ += 8;
            }
            t.length = l2, t.head && (t.head.extra_len = l2), t.flags & 512 && t.wrap & 4 && (E2[0] = l2 & 255, E2[1] = l2 >>> 8 & 255, t.check = Z2(t.check, E2, 2, 0)), l2 = 0, _ = 0;
          } else
            t.head && (t.head.extra = null);
          t.mode = Mt;
        case Mt:
          if (t.flags & 1024 && (h = t.length, h > o && (h = o), h && (t.head && (w = t.head.extra_len - t.length, t.head.extra || (t.head.extra = new Uint8Array(t.head.extra_len)), t.head.extra.set(n.subarray(a, a + h), w)), t.flags & 512 && t.wrap & 4 && (t.check = Z2(t.check, n, h, a)), o -= h, a += h, t.length -= h), t.length))
            break e;
          t.length = 0, t.mode = Ht;
        case Ht:
          if (t.flags & 2048) {
            if (o === 0)
              break e;
            h = 0;
            do
              w = n[a + h++], t.head && w && t.length < 65536 && (t.head.name += String.fromCharCode(w));
            while (w && h < o);
            if (t.flags & 512 && t.wrap & 4 && (t.check = Z2(t.check, n, h, a)), o -= h, a += h, w)
              break e;
          } else
            t.head && (t.head.name = null);
          t.length = 0, t.mode = Bt;
        case Bt:
          if (t.flags & 4096) {
            if (o === 0)
              break e;
            h = 0;
            do
              w = n[a + h++], t.head && w && t.length < 65536 && (t.head.comment += String.fromCharCode(w));
            while (w && h < o);
            if (t.flags & 512 && t.wrap & 4 && (t.check = Z2(t.check, n, h, a)), o -= h, a += h, w)
              break e;
          } else
            t.head && (t.head.comment = null);
          t.mode = Kt;
        case Kt:
          if (t.flags & 512) {
            for (;_ < 16; ) {
              if (o === 0)
                break e;
              o--, l2 += n[a++] << _, _ += 8;
            }
            if (t.wrap & 4 && l2 !== (t.check & 65535)) {
              e.msg = "header crc mismatch", t.mode = T;
              break;
            }
            l2 = 0, _ = 0;
          }
          t.head && (t.head.hcrc = t.flags >> 9 & 1, t.head.done = true), e.adler = t.check = 0, t.mode = K2;
          break;
        case Pt:
          for (;_ < 32; ) {
            if (o === 0)
              break e;
            o--, l2 += n[a++] << _, _ += 8;
          }
          e.adler = t.check = ni(l2), l2 = 0, _ = 0, t.mode = He;
        case He:
          if (t.havedict === 0)
            return e.next_out = f2, e.avail_out = c, e.next_in = a, e.avail_in = o, t.hold = l2, t.bits = _, Da;
          e.adler = t.check = 1, t.mode = K2;
        case K2:
          if (i === Ta || i === Le)
            break e;
        case Qe:
          if (t.last) {
            l2 >>>= _ & 7, _ -= _ & 7, t.mode = et;
            break;
          }
          for (;_ < 3; ) {
            if (o === 0)
              break e;
            o--, l2 += n[a++] << _, _ += 8;
          }
          switch (t.last = l2 & 1, l2 >>>= 1, _ -= 1, l2 & 3) {
            case 0:
              t.mode = Xt;
              break;
            case 1:
              if ($a(t), t.mode = Ue, i === Le) {
                l2 >>>= 2, _ -= 2;
                break e;
              }
              break;
            case 2:
              t.mode = Gt;
              break;
            case 3:
              e.msg = "invalid block type", t.mode = T;
          }
          l2 >>>= 2, _ -= 2;
          break;
        case Xt:
          for (l2 >>>= _ & 7, _ -= _ & 7;_ < 32; ) {
            if (o === 0)
              break e;
            o--, l2 += n[a++] << _, _ += 8;
          }
          if ((l2 & 65535) !== (l2 >>> 16 ^ 65535)) {
            e.msg = "invalid stored block lengths", t.mode = T;
            break;
          }
          if (t.length = l2 & 65535, l2 = 0, _ = 0, t.mode = qe, i === Le)
            break e;
        case qe:
          t.mode = Yt;
        case Yt:
          if (h = t.length, h) {
            if (h > o && (h = o), h > c && (h = c), h === 0)
              break e;
            r.set(n.subarray(a, a + h), f2), o -= h, a += h, c -= h, f2 += h, t.length -= h;
            break;
          }
          t.mode = K2;
          break;
        case Gt:
          for (;_ < 14; ) {
            if (o === 0)
              break e;
            o--, l2 += n[a++] << _, _ += 8;
          }
          if (t.nlen = (l2 & 31) + 257, l2 >>>= 5, _ -= 5, t.ndist = (l2 & 31) + 1, l2 >>>= 5, _ -= 5, t.ncode = (l2 & 15) + 4, l2 >>>= 4, _ -= 4, t.nlen > 286 || t.ndist > 30) {
            e.msg = "too many length or distance symbols", t.mode = T;
            break;
          }
          t.have = 0, t.mode = jt;
        case jt:
          for (;t.have < t.ncode; ) {
            for (;_ < 3; ) {
              if (o === 0)
                break e;
              o--, l2 += n[a++] << _, _ += 8;
            }
            t.lens[J[t.have++]] = l2 & 7, l2 >>>= 3, _ -= 3;
          }
          for (;t.have < 19; )
            t.lens[J[t.have++]] = 0;
          if (t.lencode = t.lendyn, t.lenbits = 7, b = { bits: t.lenbits }, z = pe(za, t.lens, 0, 19, t.lencode, 0, t.work, b), t.lenbits = b.bits, z) {
            e.msg = "invalid code lengths set", t.mode = T;
            break;
          }
          t.have = 0, t.mode = Wt;
        case Wt:
          for (;t.have < t.nlen + t.ndist; ) {
            for (;v = t.lencode[l2 & (1 << t.lenbits) - 1], g2 = v >>> 24, A2 = v >>> 16 & 255, p2 = v & 65535, !(g2 <= _); ) {
              if (o === 0)
                break e;
              o--, l2 += n[a++] << _, _ += 8;
            }
            if (p2 < 16)
              l2 >>>= g2, _ -= g2, t.lens[t.have++] = p2;
            else {
              if (p2 === 16) {
                for (x2 = g2 + 2;_ < x2; ) {
                  if (o === 0)
                    break e;
                  o--, l2 += n[a++] << _, _ += 8;
                }
                if (l2 >>>= g2, _ -= g2, t.have === 0) {
                  e.msg = "invalid bit length repeat", t.mode = T;
                  break;
                }
                w = t.lens[t.have - 1], h = 3 + (l2 & 3), l2 >>>= 2, _ -= 2;
              } else if (p2 === 17) {
                for (x2 = g2 + 3;_ < x2; ) {
                  if (o === 0)
                    break e;
                  o--, l2 += n[a++] << _, _ += 8;
                }
                l2 >>>= g2, _ -= g2, w = 0, h = 3 + (l2 & 7), l2 >>>= 3, _ -= 3;
              } else {
                for (x2 = g2 + 7;_ < x2; ) {
                  if (o === 0)
                    break e;
                  o--, l2 += n[a++] << _, _ += 8;
                }
                l2 >>>= g2, _ -= g2, w = 0, h = 11 + (l2 & 127), l2 >>>= 7, _ -= 7;
              }
              if (t.have + h > t.nlen + t.ndist) {
                e.msg = "invalid bit length repeat", t.mode = T;
                break;
              }
              for (;h--; )
                t.lens[t.have++] = w;
            }
          }
          if (t.mode === T)
            break;
          if (t.lens[256] === 0) {
            e.msg = "invalid code -- missing end-of-block", t.mode = T;
            break;
          }
          if (t.lenbits = 9, b = { bits: t.lenbits }, z = pe(Ri, t.lens, 0, t.nlen, t.lencode, 0, t.work, b), t.lenbits = b.bits, z) {
            e.msg = "invalid literal/lengths set", t.mode = T;
            break;
          }
          if (t.distbits = 6, t.distcode = t.distdyn, b = { bits: t.distbits }, z = pe(Di, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, b), t.distbits = b.bits, z) {
            e.msg = "invalid distances set", t.mode = T;
            break;
          }
          if (t.mode = Ue, i === Le)
            break e;
        case Ue:
          t.mode = Ce;
        case Ce:
          if (o >= 6 && c >= 258) {
            e.next_out = f2, e.avail_out = c, e.next_in = a, e.avail_in = o, t.hold = l2, t.bits = _, va(e, s), f2 = e.next_out, r = e.output, c = e.avail_out, a = e.next_in, n = e.input, o = e.avail_in, l2 = t.hold, _ = t.bits, t.mode === K2 && (t.back = -1);
            break;
          }
          for (t.back = 0;v = t.lencode[l2 & (1 << t.lenbits) - 1], g2 = v >>> 24, A2 = v >>> 16 & 255, p2 = v & 65535, !(g2 <= _); ) {
            if (o === 0)
              break e;
            o--, l2 += n[a++] << _, _ += 8;
          }
          if (A2 && !(A2 & 240)) {
            for (d3 = g2, m2 = A2, D2 = p2;v = t.lencode[D2 + ((l2 & (1 << d3 + m2) - 1) >> d3)], g2 = v >>> 24, A2 = v >>> 16 & 255, p2 = v & 65535, !(d3 + g2 <= _); ) {
              if (o === 0)
                break e;
              o--, l2 += n[a++] << _, _ += 8;
            }
            l2 >>>= d3, _ -= d3, t.back += d3;
          }
          if (l2 >>>= g2, _ -= g2, t.back += g2, t.length = p2, A2 === 0) {
            t.mode = ei;
            break;
          }
          if (A2 & 32) {
            t.back = -1, t.mode = K2;
            break;
          }
          if (A2 & 64) {
            e.msg = "invalid literal/length code", t.mode = T;
            break;
          }
          t.extra = A2 & 15, t.mode = Vt;
        case Vt:
          if (t.extra) {
            for (x2 = t.extra;_ < x2; ) {
              if (o === 0)
                break e;
              o--, l2 += n[a++] << _, _ += 8;
            }
            t.length += l2 & (1 << t.extra) - 1, l2 >>>= t.extra, _ -= t.extra, t.back += t.extra;
          }
          t.was = t.length, t.mode = Jt;
        case Jt:
          for (;v = t.distcode[l2 & (1 << t.distbits) - 1], g2 = v >>> 24, A2 = v >>> 16 & 255, p2 = v & 65535, !(g2 <= _); ) {
            if (o === 0)
              break e;
            o--, l2 += n[a++] << _, _ += 8;
          }
          if (!(A2 & 240)) {
            for (d3 = g2, m2 = A2, D2 = p2;v = t.distcode[D2 + ((l2 & (1 << d3 + m2) - 1) >> d3)], g2 = v >>> 24, A2 = v >>> 16 & 255, p2 = v & 65535, !(d3 + g2 <= _); ) {
              if (o === 0)
                break e;
              o--, l2 += n[a++] << _, _ += 8;
            }
            l2 >>>= d3, _ -= d3, t.back += d3;
          }
          if (l2 >>>= g2, _ -= g2, t.back += g2, A2 & 64) {
            e.msg = "invalid distance code", t.mode = T;
            break;
          }
          t.offset = p2, t.extra = A2 & 15, t.mode = Qt;
        case Qt:
          if (t.extra) {
            for (x2 = t.extra;_ < x2; ) {
              if (o === 0)
                break e;
              o--, l2 += n[a++] << _, _ += 8;
            }
            t.offset += l2 & (1 << t.extra) - 1, l2 >>>= t.extra, _ -= t.extra, t.back += t.extra;
          }
          if (t.offset > t.dmax) {
            e.msg = "invalid distance too far back", t.mode = T;
            break;
          }
          t.mode = qt;
        case qt:
          if (c === 0)
            break e;
          if (h = s - c, t.offset > h) {
            if (h = t.offset - h, h > t.whave && t.sane) {
              e.msg = "invalid distance too far back", t.mode = T;
              break;
            }
            h > t.wnext ? (h -= t.wnext, u = t.wsize - h) : u = t.wnext - h, h > t.length && (h = t.length), R2 = t.window;
          } else
            R2 = r, u = f2 - t.offset, h = t.length;
          h > c && (h = c), c -= h, t.length -= h;
          do
            r[f2++] = R2[u++];
          while (--h);
          t.length === 0 && (t.mode = Ce);
          break;
        case ei:
          if (c === 0)
            break e;
          r[f2++] = t.length, c--, t.mode = Ce;
          break;
        case et:
          if (t.wrap) {
            for (;_ < 32; ) {
              if (o === 0)
                break e;
              o--, l2 |= n[a++] << _, _ += 8;
            }
            if (s -= c, e.total_out += s, t.total += s, t.wrap & 4 && s && (e.adler = t.check = t.flags ? Z2(t.check, r, s, f2 - s) : ye(t.check, r, s, f2 - s)), s = c, t.wrap & 4 && (t.flags ? l2 : ni(l2)) !== t.check) {
              e.msg = "incorrect data check", t.mode = T;
              break;
            }
            l2 = 0, _ = 0;
          }
          t.mode = ti;
        case ti:
          if (t.wrap && t.flags) {
            for (;_ < 32; ) {
              if (o === 0)
                break e;
              o--, l2 += n[a++] << _, _ += 8;
            }
            if (t.wrap & 4 && l2 !== (t.total & 4294967295)) {
              e.msg = "incorrect length check", t.mode = T;
              break;
            }
            l2 = 0, _ = 0;
          }
          t.mode = ii;
        case ii:
          z = Ra;
          break e;
        case T:
          z = Zi;
          break e;
        case Oi:
          return Ii;
        case Ni:
        default:
          return $2;
      }
  return e.next_out = f2, e.avail_out = c, e.next_in = a, e.avail_in = o, t.hold = l2, t.bits = _, (t.wsize || s !== e.avail_out && t.mode < T && (t.mode < et || i !== Nt)) && Fi(e, e.output, e.next_out, s - e.avail_out), y -= e.avail_in, s -= e.avail_out, e.total_in += y, e.total_out += s, t.total += s, t.wrap & 4 && s && (e.adler = t.check = t.flags ? Z2(t.check, r, s, e.next_out - s) : ye(t.check, r, s, e.next_out - s)), e.data_type = t.bits + (t.last ? 64 : 0) + (t.mode === K2 ? 128 : 0) + (t.mode === Ue || t.mode === qe ? 256 : 0), (y === 0 && s === 0 || i === Nt) && z === ie2 && (z = Za), z;
}, Ma = (e) => {
  if (ne2(e))
    return $2;
  let i = e.state;
  return i.window && (i.window = null), e.state = null, ie2;
}, Ha = (e, i) => {
  if (ne2(e))
    return $2;
  const t = e.state;
  return t.wrap & 2 ? (t.head = i, i.done = false, ie2) : $2;
}, Ba = (e, i) => {
  const t = i.length;
  let n, r, a;
  return ne2(e) || (n = e.state, n.wrap !== 0 && n.mode !== He) ? $2 : n.mode === He && (r = 1, r = ye(r, i, t, 0), r !== n.check) ? Zi : (a = Fi(e, i, t, t), a ? (n.mode = Oi, Ii) : (n.havedict = 1, ie2));
}, Ka, Pa, Xa, Ya, Ga, ja, Wa, Va, Ja, Qa = "pako inflate (from Nodeca project)", X, er, Mi, tr, ir, Ae, nt, at, nr, ri, ar, lr, or, fr, _r, hr, dr, cr, sr, ur, wr, br;
var init_pako_esm_CB1uQYY0 = __esm(() => {
  /*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
  xe = ze + 1 + ut;
  oi = 2 * xe + 1;
  rt = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]);
  $e = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
  Yi = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]);
  di = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  P = new Array((xe + 2) * 2);
  he(P);
  be = new Array(le2 * 2);
  he(be);
  ke = new Array(Gi);
  he(ke);
  ve = new Array(Pi - Ki + 1);
  he(ve);
  gt = new Array(ut);
  he(gt);
  Fe = new Array(le2);
  he(Fe);
  rn = en;
  ln = ki;
  on = nn;
  fn = an;
  _n = tn;
  hn = {
    _tr_init: rn,
    _tr_stored_block: ln,
    _tr_flush_block: on,
    _tr_tally: fn,
    _tr_align: _n
  };
  ye = dn;
  cn = new Uint32Array(sn());
  Z2 = un;
  oe = {
    2: "need dictionary",
    1: "stream end",
    0: "",
    "-1": "file error",
    "-2": "stream error",
    "-3": "data error",
    "-4": "insufficient memory",
    "-5": "buffer error",
    "-6": "incompatible version"
  };
  Te = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8
  };
  ({ _tr_init: wn, _tr_stored_block: ot, _tr_flush_block: bn, _tr_tally: j, _tr_align: gn } = hn);
  ({
    Z_NO_FLUSH: W2,
    Z_PARTIAL_FLUSH: pn,
    Z_FULL_FLUSH: xn,
    Z_FINISH: C,
    Z_BLOCK: zt,
    Z_OK: I,
    Z_STREAM_END: Tt,
    Z_STREAM_ERROR: H,
    Z_DATA_ERROR: kn,
    Z_BUF_ERROR: We,
    Z_DEFAULT_COMPRESSION: vn,
    Z_FILTERED: En,
    Z_HUFFMAN_ONLY: Oe,
    Z_RLE: yn,
    Z_FIXED: mn,
    Z_DEFAULT_STRATEGY: Sn,
    Z_UNKNOWN: An,
    Z_DEFLATED: Be
  } = Te);
  ft = Zn + 1 + Dn;
  Nn = 2 * ft + 1;
  B2 = G + k2 + 1;
  V = Fn;
  we = [
    new F(0, 0, 0, 0, Ei),
    new F(4, 4, 8, 4, Ve),
    new F(4, 5, 16, 8, Ve),
    new F(4, 6, 32, 32, Ve),
    new F(4, 4, 16, 16, ae),
    new F(8, 16, 32, 32, ae),
    new F(8, 16, 128, 128, ae),
    new F(8, 32, 128, 256, ae),
    new F(32, 128, 258, 1024, ae),
    new F(32, 258, 258, 4096, ae)
  ];
  Wn = Xn;
  Vn = Si;
  Jn = mi;
  Qn = yi;
  qn = Pn;
  ea = Yn;
  ta = Gn;
  ia = jn;
  ge = {
    deflateInit: Wn,
    deflateInit2: Vn,
    deflateReset: Jn,
    deflateResetKeep: Qn,
    deflateSetHeader: qn,
    deflate: ea,
    deflateEnd: ta,
    deflateSetDictionary: ia,
    deflateInfo: na
  };
  Ke = {
    assign: ra,
    flattenChunks: la
  };
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch {
    Ai = false;
  }
  me = new Uint8Array(256);
  for (let e = 0;e < 256; e++)
    me[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1;
  me[254] = me[254] = 1;
  Se = {
    string2buf: oa,
    buf2string: _a,
    utf8border: ha
  };
  zi = da;
  Ti = Object.prototype.toString;
  ({
    Z_NO_FLUSH: sa,
    Z_SYNC_FLUSH: ca,
    Z_FULL_FLUSH: ua,
    Z_FINISH: wa,
    Z_OK: Me,
    Z_STREAM_END: ba,
    Z_DEFAULT_COMPRESSION: ga,
    Z_DEFAULT_STRATEGY: pa,
    Z_DEFLATED: xa
  } = Te);
  xt.prototype.push = function(e, i) {
    const t = this.strm, n = this.options.chunkSize;
    let r, a;
    if (this.ended)
      return false;
    for (i === ~~i ? a = i : a = i === true ? wa : sa, typeof e == "string" ? t.input = Se.string2buf(e) : Ti.call(e) === "[object ArrayBuffer]" ? t.input = new Uint8Array(e) : t.input = e, t.next_in = 0, t.avail_in = t.input.length;; ) {
      if (t.avail_out === 0 && (t.output = new Uint8Array(n), t.next_out = 0, t.avail_out = n), (a === ca || a === ua) && t.avail_out <= 6) {
        this.onData(t.output.subarray(0, t.next_out)), t.avail_out = 0;
        continue;
      }
      if (r = ge.deflate(t, a), r === ba)
        return t.next_out > 0 && this.onData(t.output.subarray(0, t.next_out)), r = ge.deflateEnd(this.strm), this.onEnd(r), this.ended = true, r === Me;
      if (t.avail_out === 0) {
        this.onData(t.output);
        continue;
      }
      if (a > 0 && t.next_out > 0) {
        this.onData(t.output.subarray(0, t.next_out)), t.avail_out = 0;
        continue;
      }
      if (t.avail_in === 0)
        break;
    }
    return true;
  };
  xt.prototype.onData = function(e) {
    this.chunks.push(e);
  };
  xt.prototype.onEnd = function(e) {
    e === Me && (this.result = Ke.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
  };
  Ea = new Uint16Array([
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ]);
  ya = new Uint8Array([
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ]);
  ma = new Uint16Array([
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ]);
  Sa = new Uint8Array([
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ]);
  pe = Aa;
  ({
    Z_FINISH: Nt,
    Z_BLOCK: Ta,
    Z_TREES: Le,
    Z_OK: ie2,
    Z_STREAM_END: Ra,
    Z_NEED_DICT: Da,
    Z_STREAM_ERROR: $2,
    Z_DATA_ERROR: Zi,
    Z_MEM_ERROR: Ii,
    Z_BUF_ERROR: Za,
    Z_DEFLATED: Lt
  } = Te);
  La = Na;
  Ka = Ui;
  Pa = Ci;
  Xa = Li;
  Ya = Ca;
  Ga = $i;
  ja = Fa;
  Wa = Ma;
  Va = Ha;
  Ja = Ba;
  X = {
    inflateReset: Ka,
    inflateReset2: Pa,
    inflateResetKeep: Xa,
    inflateInit: Ya,
    inflateInit2: Ga,
    inflate: ja,
    inflateEnd: Wa,
    inflateGetHeader: Va,
    inflateSetDictionary: Ja,
    inflateInfo: Qa
  };
  er = qa;
  Mi = Object.prototype.toString;
  ({
    Z_NO_FLUSH: tr,
    Z_FINISH: ir,
    Z_OK: Ae,
    Z_STREAM_END: nt,
    Z_NEED_DICT: at,
    Z_STREAM_ERROR: nr,
    Z_DATA_ERROR: ri,
    Z_MEM_ERROR: ar
  } = Te);
  De.prototype.push = function(e, i) {
    const t = this.strm, n = this.options.chunkSize, r = this.options.dictionary;
    let a, f2, o;
    if (this.ended)
      return false;
    for (i === ~~i ? f2 = i : f2 = i === true ? ir : tr, Mi.call(e) === "[object ArrayBuffer]" ? t.input = new Uint8Array(e) : t.input = e, t.next_in = 0, t.avail_in = t.input.length;; ) {
      for (t.avail_out === 0 && (t.output = new Uint8Array(n), t.next_out = 0, t.avail_out = n), a = X.inflate(t, f2), a === at && r && (a = X.inflateSetDictionary(t, r), a === Ae ? a = X.inflate(t, f2) : a === ri && (a = at));t.avail_in > 0 && a === nt && t.state.wrap > 0 && e[t.next_in] !== 0; )
        X.inflateReset(t), a = X.inflate(t, f2);
      switch (a) {
        case nr:
        case ri:
        case at:
        case ar:
          return this.onEnd(a), this.ended = true, false;
      }
      if (o = t.avail_out, t.next_out && (t.avail_out === 0 || a === nt))
        if (this.options.to === "string") {
          let c = Se.utf8border(t.output, t.next_out), l2 = t.next_out - c, _ = Se.buf2string(t.output, c);
          t.next_out = l2, t.avail_out = n - l2, l2 && t.output.set(t.output.subarray(c, c + l2), 0), this.onData(_);
        } else
          this.onData(t.output.length === t.next_out ? t.output : t.output.subarray(0, t.next_out));
      if (!(a === Ae && o === 0)) {
        if (a === nt)
          return a = X.inflateEnd(this.strm), this.onEnd(a), this.ended = true, true;
        if (t.avail_in === 0)
          break;
      }
    }
    return true;
  };
  De.prototype.onData = function(e) {
    this.chunks.push(e);
  };
  De.prototype.onEnd = function(e) {
    e === Ae && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Ke.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
  };
  lr = De;
  or = kt;
  fr = rr;
  _r = kt;
  hr = Te;
  dr = {
    Inflate: lr,
    inflate: or,
    inflateRaw: fr,
    ungzip: _r,
    constants: hr
  };
  ({ Inflate: cr, inflate: sr, inflateRaw: ur, ungzip: wr } = dr);
  br = sr;
});

// node_modules/geotiff-tilesource/dist/deflate-BXt-9JA_.js
var exports_deflate_BXt_9JA_ = {};
__export(exports_deflate_BXt_9JA_, {
  default: () => s
});
var s;
var init_deflate_BXt_9JA_ = __esm(() => {
  init_pako_esm_CB1uQYY0();
  init_basedecoder_DHcBySSe();
  s = class s extends g {
    decodeBlock(e) {
      return br(new Uint8Array(e)).buffer;
    }
  };
});

// node_modules/geotiff-tilesource/dist/packbits-BlDR4Kj5.js
var exports_packbits_BlDR4Kj5 = {};
__export(exports_packbits_BlDR4Kj5, {
  default: () => l2
});
var l2;
var init_packbits_BlDR4Kj5 = __esm(() => {
  init_basedecoder_DHcBySSe();
  l2 = class l2 extends g {
    decodeBlock(s2) {
      const n = new DataView(s2), r = [];
      for (let e = 0;e < s2.byteLength; ++e) {
        let t = n.getInt8(e);
        if (t < 0) {
          const o = n.getUint8(e + 1);
          t = -t;
          for (let a = 0;a <= t; ++a)
            r.push(o);
          e += 1;
        } else {
          for (let o = 0;o <= t; ++o)
            r.push(n.getUint8(e + o + 1));
          e += t + 1;
        }
      }
      return new Uint8Array(r).buffer;
    }
  };
});

// node_modules/geotiff-tilesource/dist/lerc-CoQvYJmm.js
var exports_lerc_CoQvYJmm = {};
__export(exports_lerc_CoQvYJmm, {
  zstd: () => hA,
  default: () => lA
});

class wA {
  init() {
    return _ || (typeof fetch < "u" ? _ = fetch("data:application/wasm;base64," + EA).then((J) => J.arrayBuffer()).then((J) => WebAssembly.instantiate(J, BA)).then(this._init) : _ = WebAssembly.instantiate(Buffer.from(EA, "base64"), BA).then(this._init), _);
  }
  _init(J) {
    x2 = J.instance, BA.env.emscripten_notify_memory_growth(0);
  }
  decode(J, T2 = 0) {
    if (!x2)
      throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const Z3 = J.byteLength, X2 = x2.exports.malloc(Z3);
    QA.set(J, X2), T2 = T2 || Number(x2.exports.ZSTD_findDecompressedSize(X2, Z3));
    const u = x2.exports.malloc(T2), L2 = x2.exports.ZSTD_decompress(u, T2, X2, Z3), d3 = QA.slice(u, u + L2);
    return x2.exports.free(X2), x2.exports.free(u), d3;
  }
}
var iA, fA, tA, _, x2, QA, BA, EA = "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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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", hA, lA;
var init_lerc_CoQvYJmm = __esm(() => {
  init_pako_esm_CB1uQYY0();
  init_main_8v7k2MJ1();
  init_basedecoder_DHcBySSe();
  iA = { exports: {} };
  (function(j2) {
    (function() {
      var J = function() {
        var u = {};
        u.defaultNoDataValue = -340279993879014840000000000000000000000, u.decode = function(I2, a) {
          a = a || {};
          var Q3 = a.encodedMaskData || a.encodedMaskData === null, g2 = E2(I2, a.inputOffset || 0, Q3), D2 = a.noDataValue !== null ? a.noDataValue : u.defaultNoDataValue, B3 = L2(g2, a.pixelType || Float32Array, a.encodedMaskData, D2, a.returnMask), C2 = {
            width: g2.width,
            height: g2.height,
            pixelData: B3.resultPixels,
            minValue: B3.minValue,
            maxValue: g2.pixels.maxValue,
            noDataValue: D2
          };
          return B3.resultMask && (C2.maskData = B3.resultMask), a.returnEncodedMask && g2.mask && (C2.encodedMaskData = g2.mask.bitset ? g2.mask.bitset : null), a.returnFileInfo && (C2.fileInfo = d3(g2), a.computeUsedBitDepths && (C2.fileInfo.bitDepths = z(g2))), C2;
        };
        var L2 = function(I2, a, Q3, g2, D2) {
          var B3 = 0, C2 = I2.pixels.numBlocksX, o = I2.pixels.numBlocksY, r = Math.floor(I2.width / C2), s2 = Math.floor(I2.height / o), f2 = 2 * I2.maxZError, e = Number.MAX_VALUE, i;
          Q3 = Q3 || (I2.mask ? I2.mask.bitset : null);
          var t, F2;
          t = new a(I2.width * I2.height), D2 && Q3 && (F2 = new Uint8Array(I2.width * I2.height));
          for (var S2 = new Float32Array(r * s2), h, U2, G2 = 0;G2 <= o; G2++) {
            var R2 = G2 !== o ? s2 : I2.height % o;
            if (R2 !== 0)
              for (var w = 0;w <= C2; w++) {
                var n = w !== C2 ? r : I2.width % C2;
                if (n !== 0) {
                  var l3 = G2 * I2.width * s2 + w * r, y = I2.width - n, k3 = I2.pixels.blocks[B3], M2, c, N3;
                  k3.encoding < 2 ? (k3.encoding === 0 ? M2 = k3.rawData : (A2(k3.stuffedData, k3.bitsPerPixel, k3.numValidPixels, k3.offset, f2, S2, I2.pixels.maxValue), M2 = S2), c = 0) : k3.encoding === 2 ? N3 = 0 : N3 = k3.offset;
                  var q2;
                  if (Q3)
                    for (U2 = 0;U2 < R2; U2++) {
                      for (l3 & 7 && (q2 = Q3[l3 >> 3], q2 <<= l3 & 7), h = 0;h < n; h++)
                        l3 & 7 || (q2 = Q3[l3 >> 3]), q2 & 128 ? (F2 && (F2[l3] = 1), i = k3.encoding < 2 ? M2[c++] : N3, e = e > i ? i : e, t[l3++] = i) : (F2 && (F2[l3] = 0), t[l3++] = g2), q2 <<= 1;
                      l3 += y;
                    }
                  else if (k3.encoding < 2)
                    for (U2 = 0;U2 < R2; U2++) {
                      for (h = 0;h < n; h++)
                        i = M2[c++], e = e > i ? i : e, t[l3++] = i;
                      l3 += y;
                    }
                  else
                    for (e = e > N3 ? N3 : e, U2 = 0;U2 < R2; U2++) {
                      for (h = 0;h < n; h++)
                        t[l3++] = N3;
                      l3 += y;
                    }
                  if (k3.encoding === 1 && c !== k3.numValidPixels)
                    throw "Block and Mask do not match";
                  B3++;
                }
              }
          }
          return {
            resultPixels: t,
            resultMask: F2,
            minValue: e
          };
        }, d3 = function(I2) {
          return {
            fileIdentifierString: I2.fileIdentifierString,
            fileVersion: I2.fileVersion,
            imageType: I2.imageType,
            height: I2.height,
            width: I2.width,
            maxZError: I2.maxZError,
            eofOffset: I2.eofOffset,
            mask: I2.mask ? {
              numBlocksX: I2.mask.numBlocksX,
              numBlocksY: I2.mask.numBlocksY,
              numBytes: I2.mask.numBytes,
              maxValue: I2.mask.maxValue
            } : null,
            pixels: {
              numBlocksX: I2.pixels.numBlocksX,
              numBlocksY: I2.pixels.numBlocksY,
              numBytes: I2.pixels.numBytes,
              maxValue: I2.pixels.maxValue,
              noDataValue: I2.noDataValue
            }
          };
        }, z = function(I2) {
          for (var a = I2.pixels.numBlocksX * I2.pixels.numBlocksY, Q3 = {}, g2 = 0;g2 < a; g2++) {
            var D2 = I2.pixels.blocks[g2];
            D2.encoding === 0 ? Q3.float32 = true : D2.encoding === 1 ? Q3[D2.bitsPerPixel] = true : Q3[0] = true;
          }
          return Object.keys(Q3);
        }, E2 = function(I2, a, Q3) {
          var g2 = {}, D2 = new Uint8Array(I2, a, 10);
          if (g2.fileIdentifierString = String.fromCharCode.apply(null, D2), g2.fileIdentifierString.trim() !== "CntZImage")
            throw "Unexpected file identifier string: " + g2.fileIdentifierString;
          a += 10;
          var B3 = new DataView(I2, a, 24);
          if (g2.fileVersion = B3.getInt32(0, true), g2.imageType = B3.getInt32(4, true), g2.height = B3.getUint32(8, true), g2.width = B3.getUint32(12, true), g2.maxZError = B3.getFloat64(16, true), a += 24, !Q3)
            if (B3 = new DataView(I2, a, 16), g2.mask = {}, g2.mask.numBlocksY = B3.getUint32(0, true), g2.mask.numBlocksX = B3.getUint32(4, true), g2.mask.numBytes = B3.getUint32(8, true), g2.mask.maxValue = B3.getFloat32(12, true), a += 16, g2.mask.numBytes > 0) {
              var C2 = new Uint8Array(Math.ceil(g2.width * g2.height / 8));
              B3 = new DataView(I2, a, g2.mask.numBytes);
              var o = B3.getInt16(0, true), r = 2, s2 = 0;
              do {
                if (o > 0)
                  for (;o--; )
                    C2[s2++] = B3.getUint8(r++);
                else {
                  var f2 = B3.getUint8(r++);
                  for (o = -o;o--; )
                    C2[s2++] = f2;
                }
                o = B3.getInt16(r, true), r += 2;
              } while (r < g2.mask.numBytes);
              if (o !== -32768 || s2 < C2.length)
                throw "Unexpected end of mask RLE encoding";
              g2.mask.bitset = C2, a += g2.mask.numBytes;
            } else
              g2.mask.numBytes | g2.mask.numBlocksY | g2.mask.maxValue || (g2.mask.bitset = new Uint8Array(Math.ceil(g2.width * g2.height / 8)));
          B3 = new DataView(I2, a, 16), g2.pixels = {}, g2.pixels.numBlocksY = B3.getUint32(0, true), g2.pixels.numBlocksX = B3.getUint32(4, true), g2.pixels.numBytes = B3.getUint32(8, true), g2.pixels.maxValue = B3.getFloat32(12, true), a += 16;
          var e = g2.pixels.numBlocksX, i = g2.pixels.numBlocksY, t = e + (g2.width % e > 0 ? 1 : 0), F2 = i + (g2.height % i > 0 ? 1 : 0);
          g2.pixels.blocks = new Array(t * F2);
          for (var S2 = 0, h = 0;h < F2; h++)
            for (var U2 = 0;U2 < t; U2++) {
              var G2 = 0, R2 = I2.byteLength - a;
              B3 = new DataView(I2, a, Math.min(10, R2));
              var w = {};
              g2.pixels.blocks[S2++] = w;
              var n = B3.getUint8(0);
              if (G2++, w.encoding = n & 63, w.encoding > 3)
                throw "Invalid block encoding (" + w.encoding + ")";
              if (w.encoding === 2) {
                a++;
                continue;
              }
              if (n !== 0 && n !== 2) {
                if (n >>= 6, w.offsetType = n, n === 2)
                  w.offset = B3.getInt8(1), G2++;
                else if (n === 1)
                  w.offset = B3.getInt16(1, true), G2 += 2;
                else if (n === 0)
                  w.offset = B3.getFloat32(1, true), G2 += 4;
                else
                  throw "Invalid block offset type";
                if (w.encoding === 1)
                  if (n = B3.getUint8(G2), G2++, w.bitsPerPixel = n & 63, n >>= 6, w.numValidPixelsType = n, n === 2)
                    w.numValidPixels = B3.getUint8(G2), G2++;
                  else if (n === 1)
                    w.numValidPixels = B3.getUint16(G2, true), G2 += 2;
                  else if (n === 0)
                    w.numValidPixels = B3.getUint32(G2, true), G2 += 4;
                  else
                    throw "Invalid valid pixel count type";
              }
              if (a += G2, w.encoding !== 3) {
                var l3, y;
                if (w.encoding === 0) {
                  var k3 = (g2.pixels.numBytes - 1) / 4;
                  if (k3 !== Math.floor(k3))
                    throw "uncompressed block has invalid length";
                  l3 = new ArrayBuffer(k3 * 4), y = new Uint8Array(l3), y.set(new Uint8Array(I2, a, k3 * 4));
                  var M2 = new Float32Array(l3);
                  w.rawData = M2, a += k3 * 4;
                } else if (w.encoding === 1) {
                  var c = Math.ceil(w.numValidPixels * w.bitsPerPixel / 8), N3 = Math.ceil(c / 4);
                  l3 = new ArrayBuffer(N3 * 4), y = new Uint8Array(l3), y.set(new Uint8Array(I2, a, c)), w.stuffedData = new Uint32Array(l3), a += c;
                }
              }
            }
          return g2.eofOffset = a, g2;
        }, A2 = function(I2, a, Q3, g2, D2, B3, C2) {
          var o = (1 << a) - 1, r = 0, s2, f2 = 0, e, i, t = Math.ceil((C2 - g2) / D2), F2 = I2.length * 4 - Math.ceil(a * Q3 / 8);
          for (I2[I2.length - 1] <<= 8 * F2, s2 = 0;s2 < Q3; s2++) {
            if (f2 === 0 && (i = I2[r++], f2 = 32), f2 >= a)
              e = i >>> f2 - a & o, f2 -= a;
            else {
              var S2 = a - f2;
              e = (i & o) << S2 & o, i = I2[r++], f2 = 32 - S2, e += i >>> f2;
            }
            B3[s2] = e < t ? g2 + e * D2 : C2;
          }
          return B3;
        };
        return u;
      }(), T2 = /* @__PURE__ */ function() {
        var u = {
          unstuff: function(E2, A2, I2, a, Q3, g2, D2, B3) {
            var C2 = (1 << I2) - 1, o = 0, r, s2 = 0, f2, e, i, t, F2 = E2.length * 4 - Math.ceil(I2 * a / 8);
            if (E2[E2.length - 1] <<= 8 * F2, Q3)
              for (r = 0;r < a; r++)
                s2 === 0 && (e = E2[o++], s2 = 32), s2 >= I2 ? (f2 = e >>> s2 - I2 & C2, s2 -= I2) : (i = I2 - s2, f2 = (e & C2) << i & C2, e = E2[o++], s2 = 32 - i, f2 += e >>> s2), A2[r] = Q3[f2];
            else
              for (t = Math.ceil((B3 - g2) / D2), r = 0;r < a; r++)
                s2 === 0 && (e = E2[o++], s2 = 32), s2 >= I2 ? (f2 = e >>> s2 - I2 & C2, s2 -= I2) : (i = I2 - s2, f2 = (e & C2) << i & C2, e = E2[o++], s2 = 32 - i, f2 += e >>> s2), A2[r] = f2 < t ? g2 + f2 * D2 : B3;
          },
          unstuffLUT: function(E2, A2, I2, a, Q3, g2) {
            var D2 = (1 << A2) - 1, B3 = 0, C2 = 0, o = 0, r = 0, s2 = 0, f2, e = [], i = E2.length * 4 - Math.ceil(A2 * I2 / 8);
            E2[E2.length - 1] <<= 8 * i;
            var t = Math.ceil((g2 - a) / Q3);
            for (C2 = 0;C2 < I2; C2++)
              r === 0 && (f2 = E2[B3++], r = 32), r >= A2 ? (s2 = f2 >>> r - A2 & D2, r -= A2) : (o = A2 - r, s2 = (f2 & D2) << o & D2, f2 = E2[B3++], r = 32 - o, s2 += f2 >>> r), e[C2] = s2 < t ? a + s2 * Q3 : g2;
            return e.unshift(a), e;
          },
          unstuff2: function(E2, A2, I2, a, Q3, g2, D2, B3) {
            var C2 = (1 << I2) - 1, o = 0, r, s2 = 0, f2 = 0, e, i, t;
            if (Q3)
              for (r = 0;r < a; r++)
                s2 === 0 && (i = E2[o++], s2 = 32, f2 = 0), s2 >= I2 ? (e = i >>> f2 & C2, s2 -= I2, f2 += I2) : (t = I2 - s2, e = i >>> f2 & C2, i = E2[o++], s2 = 32 - t, e |= (i & (1 << t) - 1) << I2 - t, f2 = t), A2[r] = Q3[e];
            else {
              var F2 = Math.ceil((B3 - g2) / D2);
              for (r = 0;r < a; r++)
                s2 === 0 && (i = E2[o++], s2 = 32, f2 = 0), s2 >= I2 ? (e = i >>> f2 & C2, s2 -= I2, f2 += I2) : (t = I2 - s2, e = i >>> f2 & C2, i = E2[o++], s2 = 32 - t, e |= (i & (1 << t) - 1) << I2 - t, f2 = t), A2[r] = e < F2 ? g2 + e * D2 : B3;
            }
            return A2;
          },
          unstuffLUT2: function(E2, A2, I2, a, Q3, g2) {
            var D2 = (1 << A2) - 1, B3 = 0, C2 = 0, o = 0, r = 0, s2 = 0, f2 = 0, e, i = [], t = Math.ceil((g2 - a) / Q3);
            for (C2 = 0;C2 < I2; C2++)
              r === 0 && (e = E2[B3++], r = 32, f2 = 0), r >= A2 ? (s2 = e >>> f2 & D2, r -= A2, f2 += A2) : (o = A2 - r, s2 = e >>> f2 & D2, e = E2[B3++], r = 32 - o, s2 |= (e & (1 << o) - 1) << A2 - o, f2 = o), i[C2] = s2 < t ? a + s2 * Q3 : g2;
            return i.unshift(a), i;
          },
          originalUnstuff: function(E2, A2, I2, a) {
            var Q3 = (1 << I2) - 1, g2 = 0, D2, B3 = 0, C2, o, r, s2 = E2.length * 4 - Math.ceil(I2 * a / 8);
            for (E2[E2.length - 1] <<= 8 * s2, D2 = 0;D2 < a; D2++)
              B3 === 0 && (o = E2[g2++], B3 = 32), B3 >= I2 ? (C2 = o >>> B3 - I2 & Q3, B3 -= I2) : (r = I2 - B3, C2 = (o & Q3) << r & Q3, o = E2[g2++], B3 = 32 - r, C2 += o >>> B3), A2[D2] = C2;
            return A2;
          },
          originalUnstuff2: function(E2, A2, I2, a) {
            var Q3 = (1 << I2) - 1, g2 = 0, D2, B3 = 0, C2 = 0, o, r, s2;
            for (D2 = 0;D2 < a; D2++)
              B3 === 0 && (r = E2[g2++], B3 = 32, C2 = 0), B3 >= I2 ? (o = r >>> C2 & Q3, B3 -= I2, C2 += I2) : (s2 = I2 - B3, o = r >>> C2 & Q3, r = E2[g2++], B3 = 32 - s2, o |= (r & (1 << s2) - 1) << I2 - s2, C2 = s2), A2[D2] = o;
            return A2;
          }
        }, L2 = {
          HUFFMAN_LUT_BITS_MAX: 12,
          computeChecksumFletcher32: function(E2) {
            for (var A2 = 65535, I2 = 65535, a = E2.length, Q3 = Math.floor(a / 2), g2 = 0;Q3; ) {
              var D2 = Q3 >= 359 ? 359 : Q3;
              Q3 -= D2;
              do
                A2 += E2[g2++] << 8, I2 += A2 += E2[g2++];
              while (--D2);
              A2 = (A2 & 65535) + (A2 >>> 16), I2 = (I2 & 65535) + (I2 >>> 16);
            }
            return a & 1 && (I2 += A2 += E2[g2] << 8), A2 = (A2 & 65535) + (A2 >>> 16), I2 = (I2 & 65535) + (I2 >>> 16), (I2 << 16 | A2) >>> 0;
          },
          readHeaderInfo: function(E2, A2) {
            var I2 = A2.ptr, a = new Uint8Array(E2, I2, 6), Q3 = {};
            if (Q3.fileIdentifierString = String.fromCharCode.apply(null, a), Q3.fileIdentifierString.lastIndexOf("Lerc2", 0) !== 0)
              throw "Unexpected file identifier string (expect Lerc2 ): " + Q3.fileIdentifierString;
            I2 += 6;
            var g2 = new DataView(E2, I2, 8), D2 = g2.getInt32(0, true);
            Q3.fileVersion = D2, I2 += 4, D2 >= 3 && (Q3.checksum = g2.getUint32(4, true), I2 += 4), g2 = new DataView(E2, I2, 12), Q3.height = g2.getUint32(0, true), Q3.width = g2.getUint32(4, true), I2 += 8, D2 >= 4 ? (Q3.numDims = g2.getUint32(8, true), I2 += 4) : Q3.numDims = 1, g2 = new DataView(E2, I2, 40), Q3.numValidPixel = g2.getUint32(0, true), Q3.microBlockSize = g2.getInt32(4, true), Q3.blobSize = g2.getInt32(8, true), Q3.imageType = g2.getInt32(12, true), Q3.maxZError = g2.getFloat64(16, true), Q3.zMin = g2.getFloat64(24, true), Q3.zMax = g2.getFloat64(32, true), I2 += 40, A2.headerInfo = Q3, A2.ptr = I2;
            var B3, C2;
            if (D2 >= 3 && (C2 = D2 >= 4 ? 52 : 48, B3 = this.computeChecksumFletcher32(new Uint8Array(E2, I2 - C2, Q3.blobSize - 14)), B3 !== Q3.checksum))
              throw "Checksum failed.";
            return true;
          },
          checkMinMaxRanges: function(E2, A2) {
            var I2 = A2.headerInfo, a = this.getDataTypeArray(I2.imageType), Q3 = I2.numDims * this.getDataTypeSize(I2.imageType), g2 = this.readSubArray(E2, A2.ptr, a, Q3), D2 = this.readSubArray(E2, A2.ptr + Q3, a, Q3);
            A2.ptr += 2 * Q3;
            var B3, C2 = true;
            for (B3 = 0;B3 < I2.numDims; B3++)
              if (g2[B3] !== D2[B3]) {
                C2 = false;
                break;
              }
            return I2.minValues = g2, I2.maxValues = D2, C2;
          },
          readSubArray: function(E2, A2, I2, a) {
            var Q3;
            if (I2 === Uint8Array)
              Q3 = new Uint8Array(E2, A2, a);
            else {
              var g2 = new ArrayBuffer(a), D2 = new Uint8Array(g2);
              D2.set(new Uint8Array(E2, A2, a)), Q3 = new I2(g2);
            }
            return Q3;
          },
          readMask: function(E2, A2) {
            var { ptr: I2, headerInfo: a } = A2, Q3 = a.width * a.height, g2 = a.numValidPixel, D2 = new DataView(E2, I2, 4), B3 = {};
            if (B3.numBytes = D2.getUint32(0, true), I2 += 4, (g2 === 0 || Q3 === g2) && B3.numBytes !== 0)
              throw "invalid mask";
            var C2, o;
            if (g2 === 0)
              C2 = new Uint8Array(Math.ceil(Q3 / 8)), B3.bitset = C2, o = new Uint8Array(Q3), A2.pixels.resultMask = o, I2 += B3.numBytes;
            else if (B3.numBytes > 0) {
              C2 = new Uint8Array(Math.ceil(Q3 / 8)), D2 = new DataView(E2, I2, B3.numBytes);
              var r = D2.getInt16(0, true), s2 = 2, f2 = 0, e = 0;
              do {
                if (r > 0)
                  for (;r--; )
                    C2[f2++] = D2.getUint8(s2++);
                else
                  for (e = D2.getUint8(s2++), r = -r;r--; )
                    C2[f2++] = e;
                r = D2.getInt16(s2, true), s2 += 2;
              } while (s2 < B3.numBytes);
              if (r !== -32768 || f2 < C2.length)
                throw "Unexpected end of mask RLE encoding";
              o = new Uint8Array(Q3);
              var i = 0, t = 0;
              for (t = 0;t < Q3; t++)
                t & 7 ? (i = C2[t >> 3], i <<= t & 7) : i = C2[t >> 3], i & 128 && (o[t] = 1);
              A2.pixels.resultMask = o, B3.bitset = C2, I2 += B3.numBytes;
            }
            return A2.ptr = I2, A2.mask = B3, true;
          },
          readDataOneSweep: function(E2, A2, I2, a) {
            var { ptr: Q3, headerInfo: g2 } = A2, D2 = g2.numDims, B3 = g2.width * g2.height, C2 = g2.imageType, o = g2.numValidPixel * L2.getDataTypeSize(C2) * D2, r, s2 = A2.pixels.resultMask;
            if (I2 === Uint8Array)
              r = new Uint8Array(E2, Q3, o);
            else {
              var f2 = new ArrayBuffer(o), e = new Uint8Array(f2);
              e.set(new Uint8Array(E2, Q3, o)), r = new I2(f2);
            }
            if (r.length === B3 * D2)
              a ? A2.pixels.resultPixels = L2.swapDimensionOrder(r, B3, D2, I2, true) : A2.pixels.resultPixels = r;
            else {
              A2.pixels.resultPixels = new I2(B3 * D2);
              var i = 0, t = 0, F2 = 0, S2 = 0;
              if (D2 > 1) {
                if (a) {
                  for (t = 0;t < B3; t++)
                    if (s2[t])
                      for (S2 = t, F2 = 0;F2 < D2; F2++, S2 += B3)
                        A2.pixels.resultPixels[S2] = r[i++];
                } else
                  for (t = 0;t < B3; t++)
                    if (s2[t])
                      for (S2 = t * D2, F2 = 0;F2 < D2; F2++)
                        A2.pixels.resultPixels[S2 + F2] = r[i++];
              } else
                for (t = 0;t < B3; t++)
                  s2[t] && (A2.pixels.resultPixels[t] = r[i++]);
            }
            return Q3 += o, A2.ptr = Q3, true;
          },
          readHuffmanTree: function(E2, A2) {
            var I2 = this.HUFFMAN_LUT_BITS_MAX, a = new DataView(E2, A2.ptr, 16);
            A2.ptr += 16;
            var Q3 = a.getInt32(0, true);
            if (Q3 < 2)
              throw "unsupported Huffman version";
            var g2 = a.getInt32(4, true), D2 = a.getInt32(8, true), B3 = a.getInt32(12, true);
            if (D2 >= B3)
              return false;
            var C2 = new Uint32Array(B3 - D2);
            L2.decodeBits(E2, A2, C2);
            var o = [], r, s2, f2, e;
            for (r = D2;r < B3; r++)
              s2 = r - (r < g2 ? 0 : g2), o[s2] = { first: C2[r - D2], second: null };
            var i = E2.byteLength - A2.ptr, t = Math.ceil(i / 4), F2 = new ArrayBuffer(t * 4), S2 = new Uint8Array(F2);
            S2.set(new Uint8Array(E2, A2.ptr, i));
            var h = new Uint32Array(F2), U2 = 0, G2, R2 = 0;
            for (G2 = h[0], r = D2;r < B3; r++)
              s2 = r - (r < g2 ? 0 : g2), e = o[s2].first, e > 0 && (o[s2].second = G2 << U2 >>> 32 - e, 32 - U2 >= e ? (U2 += e, U2 === 32 && (U2 = 0, R2++, G2 = h[R2])) : (U2 += e - 32, R2++, G2 = h[R2], o[s2].second |= G2 >>> 32 - U2));
            var w = 0, n = 0, l3 = new d3;
            for (r = 0;r < o.length; r++)
              o[r] !== undefined && (w = Math.max(w, o[r].first));
            w >= I2 ? n = I2 : n = w;
            var y = [], k3, M2, c, N3, q2, m2;
            for (r = D2;r < B3; r++)
              if (s2 = r - (r < g2 ? 0 : g2), e = o[s2].first, e > 0)
                if (k3 = [e, s2], e <= n)
                  for (M2 = o[s2].second << n - e, c = 1 << n - e, f2 = 0;f2 < c; f2++)
                    y[M2 | f2] = k3;
                else
                  for (M2 = o[s2].second, m2 = l3, N3 = e - 1;N3 >= 0; N3--)
                    q2 = M2 >>> N3 & 1, q2 ? (m2.right || (m2.right = new d3), m2 = m2.right) : (m2.left || (m2.left = new d3), m2 = m2.left), N3 === 0 && !m2.val && (m2.val = k3[1]);
            return {
              decodeLut: y,
              numBitsLUTQick: n,
              numBitsLUT: w,
              tree: l3,
              stuffedData: h,
              srcPtr: R2,
              bitPos: U2
            };
          },
          readHuffman: function(E2, A2, I2, a) {
            var Q3 = A2.headerInfo, g2 = Q3.numDims, D2 = A2.headerInfo.height, B3 = A2.headerInfo.width, C2 = B3 * D2, o = this.readHuffmanTree(E2, A2), r = o.decodeLut, s2 = o.tree, f2 = o.stuffedData, e = o.srcPtr, i = o.bitPos, t = o.numBitsLUTQick, F2 = o.numBitsLUT, S2 = A2.headerInfo.imageType === 0 ? 128 : 0, h, U2, G2, R2 = A2.pixels.resultMask, w, n, l3, y, k3, M2, c, N3 = 0;
            i > 0 && (e++, i = 0);
            var q2 = f2[e], m2 = A2.encodeMode === 1, O3 = new I2(C2 * g2), v = O3, Y3;
            if (g2 < 2 || m2) {
              for (Y3 = 0;Y3 < g2; Y3++)
                if (g2 > 1 && (v = new I2(O3.buffer, C2 * Y3, C2), N3 = 0), A2.headerInfo.numValidPixel === B3 * D2)
                  for (M2 = 0, y = 0;y < D2; y++)
                    for (k3 = 0;k3 < B3; k3++, M2++) {
                      if (U2 = 0, w = q2 << i >>> 32 - t, n = w, 32 - i < t && (w |= f2[e + 1] >>> 64 - i - t, n = w), r[n])
                        U2 = r[n][1], i += r[n][0];
                      else
                        for (w = q2 << i >>> 32 - F2, n = w, 32 - i < F2 && (w |= f2[e + 1] >>> 64 - i - F2, n = w), h = s2, c = 0;c < F2; c++)
                          if (l3 = w >>> F2 - c - 1 & 1, h = l3 ? h.right : h.left, !(h.left || h.right)) {
                            U2 = h.val, i = i + c + 1;
                            break;
                          }
                      i >= 32 && (i -= 32, e++, q2 = f2[e]), G2 = U2 - S2, m2 ? (k3 > 0 ? G2 += N3 : y > 0 ? G2 += v[M2 - B3] : G2 += N3, G2 &= 255, v[M2] = G2, N3 = G2) : v[M2] = G2;
                    }
                else
                  for (M2 = 0, y = 0;y < D2; y++)
                    for (k3 = 0;k3 < B3; k3++, M2++)
                      if (R2[M2]) {
                        if (U2 = 0, w = q2 << i >>> 32 - t, n = w, 32 - i < t && (w |= f2[e + 1] >>> 64 - i - t, n = w), r[n])
                          U2 = r[n][1], i += r[n][0];
                        else
                          for (w = q2 << i >>> 32 - F2, n = w, 32 - i < F2 && (w |= f2[e + 1] >>> 64 - i - F2, n = w), h = s2, c = 0;c < F2; c++)
                            if (l3 = w >>> F2 - c - 1 & 1, h = l3 ? h.right : h.left, !(h.left || h.right)) {
                              U2 = h.val, i = i + c + 1;
                              break;
                            }
                        i >= 32 && (i -= 32, e++, q2 = f2[e]), G2 = U2 - S2, m2 ? (k3 > 0 && R2[M2 - 1] ? G2 += N3 : y > 0 && R2[M2 - B3] ? G2 += v[M2 - B3] : G2 += N3, G2 &= 255, v[M2] = G2, N3 = G2) : v[M2] = G2;
                      }
            } else
              for (M2 = 0, y = 0;y < D2; y++)
                for (k3 = 0;k3 < B3; k3++)
                  if (M2 = y * B3 + k3, !R2 || R2[M2])
                    for (Y3 = 0;Y3 < g2; Y3++, M2 += C2) {
                      if (U2 = 0, w = q2 << i >>> 32 - t, n = w, 32 - i < t && (w |= f2[e + 1] >>> 64 - i - t, n = w), r[n])
                        U2 = r[n][1], i += r[n][0];
                      else
                        for (w = q2 << i >>> 32 - F2, n = w, 32 - i < F2 && (w |= f2[e + 1] >>> 64 - i - F2, n = w), h = s2, c = 0;c < F2; c++)
                          if (l3 = w >>> F2 - c - 1 & 1, h = l3 ? h.right : h.left, !(h.left || h.right)) {
                            U2 = h.val, i = i + c + 1;
                            break;
                          }
                      i >= 32 && (i -= 32, e++, q2 = f2[e]), G2 = U2 - S2, v[M2] = G2;
                    }
            A2.ptr = A2.ptr + (e + 1) * 4 + (i > 0 ? 4 : 0), A2.pixels.resultPixels = O3, g2 > 1 && !a && (A2.pixels.resultPixels = L2.swapDimensionOrder(O3, C2, g2, I2));
          },
          decodeBits: function(E2, A2, I2, a, Q3) {
            {
              var g2 = A2.headerInfo, D2 = g2.fileVersion, B3 = 0, C2 = E2.byteLength - A2.ptr >= 5 ? 5 : E2.byteLength - A2.ptr, o = new DataView(E2, A2.ptr, C2), r = o.getUint8(0);
              B3++;
              var s2 = r >> 6, f2 = s2 === 0 ? 4 : 3 - s2, e = (r & 32) > 0, i = r & 31, t = 0;
              if (f2 === 1)
                t = o.getUint8(B3), B3++;
              else if (f2 === 2)
                t = o.getUint16(B3, true), B3 += 2;
              else if (f2 === 4)
                t = o.getUint32(B3, true), B3 += 4;
              else
                throw "Invalid valid pixel count type";
              var F2 = 2 * g2.maxZError, S2, h, U2, G2, R2, w, n, l3, y, k3 = g2.numDims > 1 ? g2.maxValues[Q3] : g2.zMax;
              if (e) {
                for (A2.counter.lut++, l3 = o.getUint8(B3), B3++, G2 = Math.ceil((l3 - 1) * i / 8), R2 = Math.ceil(G2 / 4), h = new ArrayBuffer(R2 * 4), U2 = new Uint8Array(h), A2.ptr += B3, U2.set(new Uint8Array(E2, A2.ptr, G2)), n = new Uint32Array(h), A2.ptr += G2, y = 0;l3 - 1 >>> y; )
                  y++;
                G2 = Math.ceil(t * y / 8), R2 = Math.ceil(G2 / 4), h = new ArrayBuffer(R2 * 4), U2 = new Uint8Array(h), U2.set(new Uint8Array(E2, A2.ptr, G2)), S2 = new Uint32Array(h), A2.ptr += G2, D2 >= 3 ? w = u.unstuffLUT2(n, i, l3 - 1, a, F2, k3) : w = u.unstuffLUT(n, i, l3 - 1, a, F2, k3), D2 >= 3 ? u.unstuff2(S2, I2, y, t, w) : u.unstuff(S2, I2, y, t, w);
              } else
                A2.counter.bitstuffer++, y = i, A2.ptr += B3, y > 0 && (G2 = Math.ceil(t * y / 8), R2 = Math.ceil(G2 / 4), h = new ArrayBuffer(R2 * 4), U2 = new Uint8Array(h), U2.set(new Uint8Array(E2, A2.ptr, G2)), S2 = new Uint32Array(h), A2.ptr += G2, D2 >= 3 ? a == null ? u.originalUnstuff2(S2, I2, y, t) : u.unstuff2(S2, I2, y, t, false, a, F2, k3) : a == null ? u.originalUnstuff(S2, I2, y, t) : u.unstuff(S2, I2, y, t, false, a, F2, k3));
            }
          },
          readTiles: function(E2, A2, I2, a) {
            var Q3 = A2.headerInfo, g2 = Q3.width, D2 = Q3.height, B3 = g2 * D2, C2 = Q3.microBlockSize, o = Q3.imageType, r = L2.getDataTypeSize(o), s2 = Math.ceil(g2 / C2), f2 = Math.ceil(D2 / C2);
            A2.pixels.numBlocksY = f2, A2.pixels.numBlocksX = s2, A2.pixels.ptr = 0;
            var e = 0, i = 0, t = 0, F2 = 0, S2 = 0, h = 0, U2 = 0, G2 = 0, R2 = 0, w = 0, n = 0, l3 = 0, y = 0, k3 = 0, M2 = 0, c = 0, N3, q2, m2, O3, v, Y3, P2 = new I2(C2 * C2), eA = D2 % C2 || C2, aA = g2 % C2 || C2, AA, b, $3 = Q3.numDims, W3, K3 = A2.pixels.resultMask, H2 = A2.pixels.resultPixels, rA = Q3.fileVersion, CA = rA >= 5 ? 14 : 15, p2, IA = Q3.zMax, V2;
            for (t = 0;t < f2; t++)
              for (S2 = t !== f2 - 1 ? C2 : eA, F2 = 0;F2 < s2; F2++)
                for (h = F2 !== s2 - 1 ? C2 : aA, n = t * g2 * C2 + F2 * C2, l3 = g2 - h, W3 = 0;W3 < $3; W3++) {
                  if ($3 > 1 ? (V2 = H2, n = t * g2 * C2 + F2 * C2, H2 = new I2(A2.pixels.resultPixels.buffer, B3 * W3 * r, B3), IA = Q3.maxValues[W3]) : V2 = null, U2 = E2.byteLength - A2.ptr, N3 = new DataView(E2, A2.ptr, Math.min(10, U2)), q2 = {}, c = 0, G2 = N3.getUint8(0), c++, p2 = Q3.fileVersion >= 5 ? G2 & 4 : 0, R2 = G2 >> 6 & 255, w = G2 >> 2 & CA, w !== (F2 * C2 >> 3 & CA) || p2 && W3 === 0)
                    throw "integrity issue";
                  if (Y3 = G2 & 3, Y3 > 3)
                    throw A2.ptr += c, "Invalid block encoding (" + Y3 + ")";
                  if (Y3 === 2) {
                    if (p2)
                      if (K3)
                        for (e = 0;e < S2; e++)
                          for (i = 0;i < h; i++)
                            K3[n] && (H2[n] = V2[n]), n++;
                      else
                        for (e = 0;e < S2; e++)
                          for (i = 0;i < h; i++)
                            H2[n] = V2[n], n++;
                    A2.counter.constant++, A2.ptr += c;
                    continue;
                  } else if (Y3 === 0) {
                    if (p2)
                      throw "integrity issue";
                    if (A2.counter.uncompressed++, A2.ptr += c, y = S2 * h * r, k3 = E2.byteLength - A2.ptr, y = y < k3 ? y : k3, m2 = new ArrayBuffer(y % r === 0 ? y : y + r - y % r), O3 = new Uint8Array(m2), O3.set(new Uint8Array(E2, A2.ptr, y)), v = new I2(m2), M2 = 0, K3)
                      for (e = 0;e < S2; e++) {
                        for (i = 0;i < h; i++)
                          K3[n] && (H2[n] = v[M2++]), n++;
                        n += l3;
                      }
                    else
                      for (e = 0;e < S2; e++) {
                        for (i = 0;i < h; i++)
                          H2[n++] = v[M2++];
                        n += l3;
                      }
                    A2.ptr += M2 * r;
                  } else if (AA = L2.getDataTypeUsed(p2 && o < 6 ? 4 : o, R2), b = L2.getOnePixel(q2, c, AA, N3), c += L2.getDataTypeSize(AA), Y3 === 3)
                    if (A2.ptr += c, A2.counter.constantoffset++, K3)
                      for (e = 0;e < S2; e++) {
                        for (i = 0;i < h; i++)
                          K3[n] && (H2[n] = p2 ? Math.min(IA, V2[n] + b) : b), n++;
                        n += l3;
                      }
                    else
                      for (e = 0;e < S2; e++) {
                        for (i = 0;i < h; i++)
                          H2[n] = p2 ? Math.min(IA, V2[n] + b) : b, n++;
                        n += l3;
                      }
                  else if (A2.ptr += c, L2.decodeBits(E2, A2, P2, b, W3), c = 0, p2)
                    if (K3)
                      for (e = 0;e < S2; e++) {
                        for (i = 0;i < h; i++)
                          K3[n] && (H2[n] = P2[c++] + V2[n]), n++;
                        n += l3;
                      }
                    else
                      for (e = 0;e < S2; e++) {
                        for (i = 0;i < h; i++)
                          H2[n] = P2[c++] + V2[n], n++;
                        n += l3;
                      }
                  else if (K3)
                    for (e = 0;e < S2; e++) {
                      for (i = 0;i < h; i++)
                        K3[n] && (H2[n] = P2[c++]), n++;
                      n += l3;
                    }
                  else
                    for (e = 0;e < S2; e++) {
                      for (i = 0;i < h; i++)
                        H2[n++] = P2[c++];
                      n += l3;
                    }
                }
            $3 > 1 && !a && (A2.pixels.resultPixels = L2.swapDimensionOrder(A2.pixels.resultPixels, B3, $3, I2));
          },
          formatFileInfo: function(E2) {
            return {
              fileIdentifierString: E2.headerInfo.fileIdentifierString,
              fileVersion: E2.headerInfo.fileVersion,
              imageType: E2.headerInfo.imageType,
              height: E2.headerInfo.height,
              width: E2.headerInfo.width,
              numValidPixel: E2.headerInfo.numValidPixel,
              microBlockSize: E2.headerInfo.microBlockSize,
              blobSize: E2.headerInfo.blobSize,
              maxZError: E2.headerInfo.maxZError,
              pixelType: L2.getPixelType(E2.headerInfo.imageType),
              eofOffset: E2.eofOffset,
              mask: E2.mask ? {
                numBytes: E2.mask.numBytes
              } : null,
              pixels: {
                numBlocksX: E2.pixels.numBlocksX,
                numBlocksY: E2.pixels.numBlocksY,
                maxValue: E2.headerInfo.zMax,
                minValue: E2.headerInfo.zMin,
                noDataValue: E2.noDataValue
              }
            };
          },
          constructConstantSurface: function(E2, A2) {
            var I2 = E2.headerInfo.zMax, a = E2.headerInfo.zMin, Q3 = E2.headerInfo.maxValues, g2 = E2.headerInfo.numDims, D2 = E2.headerInfo.height * E2.headerInfo.width, B3 = 0, C2 = 0, o = 0, r = E2.pixels.resultMask, s2 = E2.pixels.resultPixels;
            if (r)
              if (g2 > 1) {
                if (A2)
                  for (B3 = 0;B3 < g2; B3++)
                    for (o = B3 * D2, I2 = Q3[B3], C2 = 0;C2 < D2; C2++)
                      r[C2] && (s2[o + C2] = I2);
                else
                  for (C2 = 0;C2 < D2; C2++)
                    if (r[C2])
                      for (o = C2 * g2, B3 = 0;B3 < g2; B3++)
                        s2[o + g2] = Q3[B3];
              } else
                for (C2 = 0;C2 < D2; C2++)
                  r[C2] && (s2[C2] = I2);
            else if (g2 > 1 && a !== I2)
              if (A2)
                for (B3 = 0;B3 < g2; B3++)
                  for (o = B3 * D2, I2 = Q3[B3], C2 = 0;C2 < D2; C2++)
                    s2[o + C2] = I2;
              else
                for (C2 = 0;C2 < D2; C2++)
                  for (o = C2 * g2, B3 = 0;B3 < g2; B3++)
                    s2[o + B3] = Q3[B3];
            else
              for (C2 = 0;C2 < D2 * g2; C2++)
                s2[C2] = I2;
          },
          getDataTypeArray: function(E2) {
            var A2;
            switch (E2) {
              case 0:
                A2 = Int8Array;
                break;
              case 1:
                A2 = Uint8Array;
                break;
              case 2:
                A2 = Int16Array;
                break;
              case 3:
                A2 = Uint16Array;
                break;
              case 4:
                A2 = Int32Array;
                break;
              case 5:
                A2 = Uint32Array;
                break;
              case 6:
                A2 = Float32Array;
                break;
              case 7:
                A2 = Float64Array;
                break;
              default:
                A2 = Float32Array;
            }
            return A2;
          },
          getPixelType: function(E2) {
            var A2;
            switch (E2) {
              case 0:
                A2 = "S8";
                break;
              case 1:
                A2 = "U8";
                break;
              case 2:
                A2 = "S16";
                break;
              case 3:
                A2 = "U16";
                break;
              case 4:
                A2 = "S32";
                break;
              case 5:
                A2 = "U32";
                break;
              case 6:
                A2 = "F32";
                break;
              case 7:
                A2 = "F64";
                break;
              default:
                A2 = "F32";
            }
            return A2;
          },
          isValidPixelValue: function(E2, A2) {
            if (A2 == null)
              return false;
            var I2;
            switch (E2) {
              case 0:
                I2 = A2 >= -128 && A2 <= 127;
                break;
              case 1:
                I2 = A2 >= 0 && A2 <= 255;
                break;
              case 2:
                I2 = A2 >= -32768 && A2 <= 32767;
                break;
              case 3:
                I2 = A2 >= 0 && A2 <= 65536;
                break;
              case 4:
                I2 = A2 >= -2147483648 && A2 <= 2147483647;
                break;
              case 5:
                I2 = A2 >= 0 && A2 <= 4294967296;
                break;
              case 6:
                I2 = A2 >= -340279993879014840000000000000000000000 && A2 <= 340279993879014840000000000000000000000;
                break;
              case 7:
                I2 = A2 >= -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 && A2 <= 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
                break;
              default:
                I2 = false;
            }
            return I2;
          },
          getDataTypeSize: function(E2) {
            var A2 = 0;
            switch (E2) {
              case 0:
              case 1:
                A2 = 1;
                break;
              case 2:
              case 3:
                A2 = 2;
                break;
              case 4:
              case 5:
              case 6:
                A2 = 4;
                break;
              case 7:
                A2 = 8;
                break;
              default:
                A2 = E2;
            }
            return A2;
          },
          getDataTypeUsed: function(E2, A2) {
            var I2 = E2;
            switch (E2) {
              case 2:
              case 4:
                I2 = E2 - A2;
                break;
              case 3:
              case 5:
                I2 = E2 - 2 * A2;
                break;
              case 6:
                A2 === 0 ? I2 = E2 : A2 === 1 ? I2 = 2 : I2 = 1;
                break;
              case 7:
                A2 === 0 ? I2 = E2 : I2 = E2 - 2 * A2 + 1;
                break;
              default:
                I2 = E2;
                break;
            }
            return I2;
          },
          getOnePixel: function(E2, A2, I2, a) {
            var Q3 = 0;
            switch (I2) {
              case 0:
                Q3 = a.getInt8(A2);
                break;
              case 1:
                Q3 = a.getUint8(A2);
                break;
              case 2:
                Q3 = a.getInt16(A2, true);
                break;
              case 3:
                Q3 = a.getUint16(A2, true);
                break;
              case 4:
                Q3 = a.getInt32(A2, true);
                break;
              case 5:
                Q3 = a.getUInt32(A2, true);
                break;
              case 6:
                Q3 = a.getFloat32(A2, true);
                break;
              case 7:
                Q3 = a.getFloat64(A2, true);
                break;
              default:
                throw "the decoder does not understand this pixel type";
            }
            return Q3;
          },
          swapDimensionOrder: function(E2, A2, I2, a, Q3) {
            var g2 = 0, D2 = 0, B3 = 0, C2 = 0, o = E2;
            if (I2 > 1)
              if (o = new a(A2 * I2), Q3)
                for (g2 = 0;g2 < A2; g2++)
                  for (C2 = g2, B3 = 0;B3 < I2; B3++, C2 += A2)
                    o[C2] = E2[D2++];
              else
                for (g2 = 0;g2 < A2; g2++)
                  for (C2 = g2, B3 = 0;B3 < I2; B3++, C2 += A2)
                    o[D2++] = E2[C2];
            return o;
          }
        }, d3 = function(E2, A2, I2) {
          this.val = E2, this.left = A2, this.right = I2;
        }, z = {
          decode: function(E2, A2) {
            A2 = A2 || {};
            var I2 = A2.noDataValue, a = 0, Q3 = {};
            if (Q3.ptr = A2.inputOffset || 0, Q3.pixels = {}, !!L2.readHeaderInfo(E2, Q3)) {
              var g2 = Q3.headerInfo, D2 = g2.fileVersion, B3 = L2.getDataTypeArray(g2.imageType);
              if (D2 > 5)
                throw "unsupported lerc version 2." + D2;
              L2.readMask(E2, Q3), g2.numValidPixel !== g2.width * g2.height && !Q3.pixels.resultMask && (Q3.pixels.resultMask = A2.maskData);
              var C2 = g2.width * g2.height;
              Q3.pixels.resultPixels = new B3(C2 * g2.numDims), Q3.counter = {
                onesweep: 0,
                uncompressed: 0,
                lut: 0,
                bitstuffer: 0,
                constant: 0,
                constantoffset: 0
              };
              var o = !A2.returnPixelInterleavedDims;
              if (g2.numValidPixel !== 0)
                if (g2.zMax === g2.zMin)
                  L2.constructConstantSurface(Q3, o);
                else if (D2 >= 4 && L2.checkMinMaxRanges(E2, Q3))
                  L2.constructConstantSurface(Q3, o);
                else {
                  var r = new DataView(E2, Q3.ptr, 2), s2 = r.getUint8(0);
                  if (Q3.ptr++, s2)
                    L2.readDataOneSweep(E2, Q3, B3, o);
                  else if (D2 > 1 && g2.imageType <= 1 && Math.abs(g2.maxZError - 0.5) < 0.00001) {
                    var f2 = r.getUint8(1);
                    if (Q3.ptr++, Q3.encodeMode = f2, f2 > 2 || D2 < 4 && f2 > 1)
                      throw "Invalid Huffman flag " + f2;
                    f2 ? L2.readHuffman(E2, Q3, B3, o) : L2.readTiles(E2, Q3, B3, o);
                  } else
                    L2.readTiles(E2, Q3, B3, o);
                }
              Q3.eofOffset = Q3.ptr;
              var e;
              A2.inputOffset ? (e = Q3.headerInfo.blobSize + A2.inputOffset - Q3.ptr, Math.abs(e) >= 1 && (Q3.eofOffset = A2.inputOffset + Q3.headerInfo.blobSize)) : (e = Q3.headerInfo.blobSize - Q3.ptr, Math.abs(e) >= 1 && (Q3.eofOffset = Q3.headerInfo.blobSize));
              var i = {
                width: g2.width,
                height: g2.height,
                pixelData: Q3.pixels.resultPixels,
                minValue: g2.zMin,
                maxValue: g2.zMax,
                validPixelCount: g2.numValidPixel,
                dimCount: g2.numDims,
                dimStats: {
                  minValues: g2.minValues,
                  maxValues: g2.maxValues
                },
                maskData: Q3.pixels.resultMask
              };
              if (Q3.pixels.resultMask && L2.isValidPixelValue(g2.imageType, I2)) {
                var t = Q3.pixels.resultMask;
                for (a = 0;a < C2; a++)
                  t[a] || (i.pixelData[a] = I2);
                i.noDataValue = I2;
              }
              return Q3.noDataValue = I2, A2.returnFileInfo && (i.fileInfo = L2.formatFileInfo(Q3)), i;
            }
          },
          getBandCount: function(E2) {
            var A2 = 0, I2 = 0, a = {};
            for (a.ptr = 0, a.pixels = {};I2 < E2.byteLength - 58; )
              L2.readHeaderInfo(E2, a), I2 += a.headerInfo.blobSize, A2++, a.ptr = I2;
            return A2;
          }
        };
        return z;
      }(), Z3 = function() {
        var u = new ArrayBuffer(4), L2 = new Uint8Array(u), d3 = new Uint32Array(u);
        return d3[0] = 1, L2[0] === 1;
      }(), X2 = {
        decode: function(u, L2) {
          if (!Z3)
            throw "Big endian system is not supported.";
          L2 = L2 || {};
          var d3 = L2.inputOffset || 0, z = new Uint8Array(u, d3, 10), E2 = String.fromCharCode.apply(null, z), A2, I2;
          if (E2.trim() === "CntZImage")
            A2 = J, I2 = 1;
          else if (E2.substring(0, 5) === "Lerc2")
            A2 = T2, I2 = 2;
          else
            throw "Unexpected file identifier string: " + E2;
          for (var a = 0, Q3 = u.byteLength - 10, g2, D2 = [], B3, C2, o = {
            width: 0,
            height: 0,
            pixels: [],
            pixelType: L2.pixelType,
            mask: null,
            statistics: []
          }, r = 0;d3 < Q3; ) {
            var s2 = A2.decode(u, {
              inputOffset: d3,
              encodedMaskData: g2,
              maskData: C2,
              returnMask: a === 0,
              returnEncodedMask: a === 0,
              returnFileInfo: true,
              returnPixelInterleavedDims: L2.returnPixelInterleavedDims,
              pixelType: L2.pixelType || null,
              noDataValue: L2.noDataValue || null
            });
            d3 = s2.fileInfo.eofOffset, C2 = s2.maskData, a === 0 && (g2 = s2.encodedMaskData, o.width = s2.width, o.height = s2.height, o.dimCount = s2.dimCount || 1, o.pixelType = s2.pixelType || s2.fileInfo.pixelType, o.mask = C2), I2 > 1 && (C2 && D2.push(C2), s2.fileInfo.mask && s2.fileInfo.mask.numBytes > 0 && r++), a++, o.pixels.push(s2.pixelData), o.statistics.push({
              minValue: s2.minValue,
              maxValue: s2.maxValue,
              noDataValue: s2.noDataValue,
              dimStats: s2.dimStats
            });
          }
          var f2, e, i;
          if (I2 > 1 && r > 1) {
            for (i = o.width * o.height, o.bandMasks = D2, C2 = new Uint8Array(i), C2.set(D2[0]), f2 = 1;f2 < D2.length; f2++)
              for (B3 = D2[f2], e = 0;e < i; e++)
                C2[e] = C2[e] & B3[e];
            o.maskData = C2;
          }
          return o;
        }
      };
      j2.exports ? j2.exports = X2 : this.Lerc = X2;
    })();
  })(iA);
  fA = iA.exports;
  tA = /* @__PURE__ */ We2(fA);
  BA = {
    env: {
      emscripten_notify_memory_growth: function(j2) {
        QA = new Uint8Array(x2.exports.memory.buffer);
      }
    }
  };
  hA = new wA;
  lA = class lA extends g {
    constructor(J) {
      super(), this.planarConfiguration = typeof J.PlanarConfiguration < "u" ? J.PlanarConfiguration : 1, this.samplesPerPixel = typeof J.SamplesPerPixel < "u" ? J.SamplesPerPixel : 1, this.addCompression = J.LercParameters[ss.AddCompression];
    }
    decodeBlock(J) {
      switch (this.addCompression) {
        case is.None:
          break;
        case is.Deflate:
          J = br(new Uint8Array(J)).buffer;
          break;
        case is.Zstandard:
          J = hA.decode(new Uint8Array(J)).buffer;
          break;
        default:
          throw new Error(`Unsupported LERC additional compression method identifier: ${this.addCompression}`);
      }
      return tA.decode(J, { returnPixelInterleavedDims: this.planarConfiguration === 1 }).pixels[0].buffer;
    }
  };
});

// node_modules/geotiff-tilesource/dist/webimage-BM_pbLN3.js
var exports_webimage_BM_pbLN3 = {};
__export(exports_webimage_BM_pbLN3, {
  default: () => s2
});
var s2;
var init_webimage_BM_pbLN3 = __esm(() => {
  init_basedecoder_DHcBySSe();
  s2 = class s2 extends g {
    constructor() {
      if (super(), typeof createImageBitmap > "u")
        throw new Error("Cannot decode WebImage as `createImageBitmap` is not available");
      if (typeof document > "u" && typeof OffscreenCanvas > "u")
        throw new Error("Cannot decode WebImage as neither `document` nor `OffscreenCanvas` is not available");
    }
    async decode(i, n) {
      const o = new Blob([n]), e = await createImageBitmap(o);
      let t;
      typeof document < "u" ? (t = document.createElement("canvas"), t.width = e.width, t.height = e.height) : t = new OffscreenCanvas(e.width, e.height);
      const a = t.getContext("2d");
      return a.drawImage(e, 0, 0), a.getImageData(0, 0, e.width, e.height).data.buffer;
    }
  };
});

// node_modules/geotiff-tilesource/dist/decoder-DJlmx386.js
var exports_decoder_DJlmx386 = {};
__export(exports_decoder_DJlmx386, {
  create: () => t
});
function t() {
  const A2 = 'function A(A,e,t,i,r,I,g){try{var n=A[I](g),a=n.value}catch(A){return void t(A)}n.done?e(a):Promise.resolve(a).then(i,r)}function e(e){return function(){var t=this,i=arguments;return new Promise((function(r,I){var g=e.apply(t,i);function n(e){A(g,r,I,n,a,"next",e)}function a(e){A(g,r,I,n,a,"throw",e)}n(void 0)}))}}function t(A){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(A){return typeof A}:function(A){return A&&"function"==typeof Symbol&&A.constructor===Symbol&&A!==Symbol.prototype?"symbol":typeof A},t(A)}var i={exports:{}};!function(A){var e=function(A){var e,i=Object.prototype,r=i.hasOwnProperty,I="function"==typeof Symbol?Symbol:{},g=I.iterator||"@@iterator",n=I.asyncIterator||"@@asyncIterator",a=I.toStringTag||"@@toStringTag";function o(A,e,t){return Object.defineProperty(A,e,{value:t,enumerable:!0,configurable:!0,writable:!0}),A[e]}try{o({},"")}catch(A){o=function(A,e,t){return A[e]=t}}function B(A,e,t,i){var r=e&&e.prototype instanceof h?e:h,I=Object.create(r.prototype),g=new S(i||[]);return I._invoke=function(A,e,t){var i=Q;return function(r,I){if(i===s)throw new Error("Generator is already running");if(i===f){if("throw"===r)throw I;return R()}for(t.method=r,t.arg=I;;){var g=t.delegate;if(g){var n=m(g,t);if(n){if(n===c)continue;return n}}if("next"===t.method)t.sent=t._sent=t.arg;else if("throw"===t.method){if(i===Q)throw i=f,t.arg;t.dispatchException(t.arg)}else"return"===t.method&&t.abrupt("return",t.arg);i=s;var a=C(A,e,t);if("normal"===a.type){if(i=t.done?f:E,a.arg===c)continue;return{value:a.arg,done:t.done}}"throw"===a.type&&(i=f,t.method="throw",t.arg=a.arg)}}}(A,t,g),I}function C(A,e,t){try{return{type:"normal",arg:A.call(e,t)}}catch(A){return{type:"throw",arg:A}}}A.wrap=B;var Q="suspendedStart",E="suspendedYield",s="executing",f="completed",c={};function h(){}function l(){}function u(){}var w={};o(w,g,(function(){return this}));var d=Object.getPrototypeOf,D=d&&d(d(v([])));D&&D!==i&&r.call(D,g)&&(w=D);var y=u.prototype=h.prototype=Object.create(w);function k(A){["next","throw","return"].forEach((function(e){o(A,e,(function(A){return this._invoke(e,A)}))}))}function p(A,e){function i(I,g,n,a){var o=C(A[I],A,g);if("throw"!==o.type){var B=o.arg,Q=B.value;return Q&&"object"===t(Q)&&r.call(Q,"__await")?e.resolve(Q.__await).then((function(A){i("next",A,n,a)}),(function(A){i("throw",A,n,a)})):e.resolve(Q).then((function(A){B.value=A,n(B)}),(function(A){return i("throw",A,n,a)}))}a(o.arg)}var I;this._invoke=function(A,t){function r(){return new e((function(e,r){i(A,t,e,r)}))}return I=I?I.then(r,r):r()}}function m(A,t){var i=A.iterator[t.method];if(i===e){if(t.delegate=null,"throw"===t.method){if(A.iterator.return&&(t.method="return",t.arg=e,m(A,t),"throw"===t.method))return c;t.method="throw",t.arg=new TypeError("The iterator does not provide a \'throw\' method")}return c}var r=C(i,A.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,c;var I=r.arg;return I?I.done?(t[A.resultName]=I.value,t.next=A.nextLoc,"return"!==t.method&&(t.method="next",t.arg=e),t.delegate=null,c):I:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,c)}function G(A){var e={tryLoc:A[0]};1 in A&&(e.catchLoc=A[1]),2 in A&&(e.finallyLoc=A[2],e.afterLoc=A[3]),this.tryEntries.push(e)}function F(A){var e=A.completion||{};e.type="normal",delete e.arg,A.completion=e}function S(A){this.tryEntries=[{tryLoc:"root"}],A.forEach(G,this),this.reset(!0)}function v(A){if(A){var t=A[g];if(t)return t.call(A);if("function"==typeof A.next)return A;if(!isNaN(A.length)){var i=-1,I=function t(){for(;++i<A.length;)if(r.call(A,i))return t.value=A[i],t.done=!1,t;return t.value=e,t.done=!0,t};return I.next=I}}return{next:R}}function R(){return{value:e,done:!0}}return l.prototype=u,o(y,"constructor",u),o(u,"constructor",l),l.displayName=o(u,a,"GeneratorFunction"),A.isGeneratorFunction=function(A){var e="function"==typeof A&&A.constructor;return!!e&&(e===l||"GeneratorFunction"===(e.displayName||e.name))},A.mark=function(A){return Object.setPrototypeOf?Object.setPrototypeOf(A,u):(A.__proto__=u,o(A,a,"GeneratorFunction")),A.prototype=Object.create(y),A},A.awrap=function(A){return{__await:A}},k(p.prototype),o(p.prototype,n,(function(){return this})),A.AsyncIterator=p,A.async=function(e,t,i,r,I){void 0===I&&(I=Promise);var g=new p(B(e,t,i,r),I);return A.isGeneratorFunction(t)?g:g.next().then((function(A){return A.done?A.value:g.next()}))},k(y),o(y,a,"Generator"),o(y,g,(function(){return this})),o(y,"toString",(function(){return"[object Generator]"})),A.keys=function(A){var e=[];for(var t in A)e.push(t);return e.reverse(),function t(){for(;e.length;){var i=e.pop();if(i in A)return t.value=i,t.done=!1,t}return t.done=!0,t}},A.values=v,S.prototype={constructor:S,reset:function(A){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(F),!A)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=e)},stop:function(){this.done=!0;var A=this.tryEntries[0].completion;if("throw"===A.type)throw A.arg;return this.rval},dispatchException:function(A){if(this.done)throw A;var t=this;function i(i,r){return n.type="throw",n.arg=A,t.next=i,r&&(t.method="next",t.arg=e),!!r}for(var I=this.tryEntries.length-1;I>=0;--I){var g=this.tryEntries[I],n=g.completion;if("root"===g.tryLoc)return i("end");if(g.tryLoc<=this.prev){var a=r.call(g,"catchLoc"),o=r.call(g,"finallyLoc");if(a&&o){if(this.prev<g.catchLoc)return i(g.catchLoc,!0);if(this.prev<g.finallyLoc)return i(g.finallyLoc)}else if(a){if(this.prev<g.catchLoc)return i(g.catchLoc,!0)}else{if(!o)throw new Error("try statement without catch or finally");if(this.prev<g.finallyLoc)return i(g.finallyLoc)}}}},abrupt:function(A,e){for(var t=this.tryEntries.length-1;t>=0;--t){var i=this.tryEntries[t];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var I=i;break}}I&&("break"===A||"continue"===A)&&I.tryLoc<=e&&e<=I.finallyLoc&&(I=null);var g=I?I.completion:{};return g.type=A,g.arg=e,I?(this.method="next",this.next=I.finallyLoc,c):this.complete(g)},complete:function(A,e){if("throw"===A.type)throw A.arg;return"break"===A.type||"continue"===A.type?this.next=A.arg:"return"===A.type?(this.rval=this.arg=A.arg,this.method="return",this.next="end"):"normal"===A.type&&e&&(this.next=e),c},finish:function(A){for(var e=this.tryEntries.length-1;e>=0;--e){var t=this.tryEntries[e];if(t.finallyLoc===A)return this.complete(t.completion,t.afterLoc),F(t),c}},catch:function(A){for(var e=this.tryEntries.length-1;e>=0;--e){var t=this.tryEntries[e];if(t.tryLoc===A){var i=t.completion;if("throw"===i.type){var r=i.arg;F(t)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(A,t,i){return this.delegate={iterator:v(A),resultName:t,nextLoc:i},"next"===this.method&&(this.arg=e),c}},A}(A.exports);try{regeneratorRuntime=e}catch(A){"object"===("undefined"==typeof globalThis?"undefined":t(globalThis))?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}}(i);var r=i.exports,I=new Map;function g(A,e){Array.isArray(A)||(A=[A]),A.forEach((function(A){return I.set(A,e)}))}function n(A){return a.apply(this,arguments)}function a(){return(a=e(r.mark((function A(e){var t,i;return r.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:if(t=I.get(e.Compression)){A.next=3;break}throw new Error("Unknown compression method identifier: ".concat(e.Compression));case 3:return A.next=5,t();case 5:return i=A.sent,A.abrupt("return",new i(e));case 7:case"end":return A.stop()}}),A)})))).apply(this,arguments)}g([void 0,1],(function(){return Promise.resolve().then((function(){return y})).then((function(A){return A.default}))})),g(5,(function(){return Promise.resolve().then((function(){return F})).then((function(A){return A.default}))})),g(6,(function(){throw new Error("old style JPEG compression is not supported.")})),g(7,(function(){return Promise.resolve().then((function(){return N})).then((function(A){return A.default}))})),g([8,32946],(function(){return Promise.resolve().then((function(){return OA})).then((function(A){return A.default}))})),g(32773,(function(){return Promise.resolve().then((function(){return _A})).then((function(A){return A.default}))})),g(34887,(function(){return Promise.resolve().then((function(){return le})).then(function(){var A=e(r.mark((function A(e){return r.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,e.zstd.init();case 2:return A.abrupt("return",e);case 3:case"end":return A.stop()}}),A)})));return function(e){return A.apply(this,arguments)}}()).then((function(A){return A.default}))})),g(50001,(function(){return Promise.resolve().then((function(){return de})).then((function(A){return A.default}))}));var o=globalThis;function B(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}function C(A,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(A,i.key,i)}}function Q(A,e,t){return e&&C(A.prototype,e),t&&C(A,t),A}function E(A,e){return E=Object.setPrototypeOf||function(A,e){return A.__proto__=e,A},E(A,e)}function s(A,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");A.prototype=Object.create(e&&e.prototype,{constructor:{value:A,writable:!0,configurable:!0}}),e&&E(A,e)}function f(A,e){if(e&&("object"===t(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(A){if(void 0===A)throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");return A}(A)}function c(A){return c=Object.setPrototypeOf?Object.getPrototypeOf:function(A){return A.__proto__||Object.getPrototypeOf(A)},c(A)}function h(A,e){var t=A.length-e,i=0;do{for(var r=e;r>0;r--)A[i+e]+=A[i],i++;t-=e}while(t>0)}function l(A,e,t){for(var i=0,r=A.length,I=r/t;r>e;){for(var g=e;g>0;--g)A[i+e]+=A[i],++i;r-=e}for(var n=A.slice(),a=0;a<I;++a)for(var o=0;o<t;++o)A[t*a+o]=n[(t-o-1)*I+a]}function u(A,e,t,i,r,I){if(!e||1===e)return A;for(var g=0;g<r.length;++g){if(r[g]%8!=0)throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");if(r[g]!==r[0])throw new Error("When decoding with predictor, all samples must have the same size.")}for(var n=r[0]/8,a=2===I?1:r.length,o=0;o<i&&!(o*a*t*n>=A.byteLength);++o){var B=void 0;if(2===e){switch(r[0]){case 8:B=new Uint8Array(A,o*a*t*n,a*t*n);break;case 16:B=new Uint16Array(A,o*a*t*n,a*t*n/2);break;case 32:B=new Uint32Array(A,o*a*t*n,a*t*n/4);break;default:throw new Error("Predictor 2 not allowed with ".concat(r[0]," bits per sample."))}h(B,a)}else 3===e&&l(B=new Uint8Array(A,o*a*t*n,a*t*n),a,n)}return A}o.addEventListener("message",function(){var A=e(r.mark((function A(e){var t,i,I,g,a,B;return r.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return t=e.data,i=t.id,I=t.fileDirectory,g=t.buffer,A.next=3,n(I);case 3:return a=A.sent,A.next=6,a.decode(I,g);case 6:B=A.sent,o.postMessage({decoded:B,id:i},[B]);case 8:case"end":return A.stop()}}),A)})));return function(e){return A.apply(this,arguments)}}());var w=function(){function A(){B(this,A)}var t;return Q(A,[{key:"decode",value:(t=e(r.mark((function A(e,t){var i,I,g,n,a;return r.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,this.decodeBlock(t);case 2:if(i=A.sent,1===(I=e.Predictor||1)){A.next=9;break}return g=!e.StripOffsets,n=g?e.TileWidth:e.ImageWidth,a=g?e.TileLength:e.RowsPerStrip||e.ImageLength,A.abrupt("return",u(i,I,n,a,e.BitsPerSample,e.PlanarConfiguration));case 9:return A.abrupt("return",i);case 10:case"end":return A.stop()}}),A,this)}))),function(A,e){return t.apply(this,arguments)})}]),A}();function d(A){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var t,i=c(A);if(e){var r=c(this).constructor;t=Reflect.construct(i,arguments,r)}else t=i.apply(this,arguments);return f(this,t)}}var D=function(A){s(t,w);var e=d(t);function t(){return B(this,t),e.apply(this,arguments)}return Q(t,[{key:"decodeBlock",value:function(A){return A}}]),t}(),y=Object.freeze({__proto__:null,default:D});function k(A){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var t,i=c(A);if(e){var r=c(this).constructor;t=Reflect.construct(i,arguments,r)}else t=i.apply(this,arguments);return f(this,t)}}function p(A,e){for(var t=e.length-1;t>=0;t--)A.push(e[t]);return A}function m(A){for(var e=new Uint16Array(4093),t=new Uint8Array(4093),i=0;i<=257;i++)e[i]=4096,t[i]=i;var r=258,I=9,g=0;function n(){r=258,I=9}function a(A){var e=function(A,e,t){var i=e%8,r=Math.floor(e/8),I=8-i,g=e+t-8*(r+1),n=8*(r+2)-(e+t),a=8*(r+2)-e;if(n=Math.max(0,n),r>=A.length)return console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)"),257;var o=A[r]&Math.pow(2,8-i)-1,B=o<<=t-I;if(r+1<A.length){var C=A[r+1]>>>n;B+=C<<=Math.max(0,t-a)}if(g>8&&r+2<A.length){var Q=8*(r+3)-(e+t);B+=A[r+2]>>>Q}return B}(A,g,I);return g+=I,e}function o(A,i){return t[r]=i,e[r]=A,++r-1}function B(A){for(var i=[],r=A;4096!==r;r=e[r])i.push(t[r]);return i}var C=[];n();for(var Q,E=new Uint8Array(A),s=a(E);257!==s;){if(256===s){for(n(),s=a(E);256===s;)s=a(E);if(257===s)break;if(s>256)throw new Error("corrupted code at scanline ".concat(s));p(C,B(s)),Q=s}else if(s<r){var f=B(s);p(C,f),o(Q,f[f.length-1]),Q=s}else{var c=B(Q);if(!c)throw new Error("Bogus entry. Not in dictionary, ".concat(Q," / ").concat(r,", position: ").concat(g));p(C,c),C.push(c[c.length-1]),o(Q,c[c.length-1]),Q=s}r+1>=Math.pow(2,I)&&(12===I?Q=void 0:I++),s=a(E)}return new Uint8Array(C)}var G=function(A){s(t,w);var e=k(t);function t(){return B(this,t),e.apply(this,arguments)}return Q(t,[{key:"decodeBlock",value:function(A){return m(A).buffer}}]),t}(),F=Object.freeze({__proto__:null,default:G});function S(A){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var t,i=c(A);if(e){var r=c(this).constructor;t=Reflect.construct(i,arguments,r)}else t=i.apply(this,arguments);return f(this,t)}}var v=new Int32Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]);function R(A,e){for(var t=0,i=[],r=16;r>0&&!A[r-1];)--r;i.push({children:[],index:0});for(var I,g=i[0],n=0;n<r;n++){for(var a=0;a<A[n];a++){for((g=i.pop()).children[g.index]=e[t];g.index>0;)g=i.pop();for(g.index++,i.push(g);i.length<=n;)i.push(I={children:[],index:0}),g.children[g.index]=I.children,g=I;t++}n+1<r&&(i.push(I={children:[],index:0}),g.children[g.index]=I.children,g=I)}return i[0].children}function U(A,e,i,r,I,g,n,a,o){var B=i.mcusPerLine,C=i.progressive,Q=e,E=e,s=0,f=0;function c(){if(f>0)return f--,s>>f&1;if(255===(s=A[E++])){var e=A[E++];if(e)throw new Error("unexpected marker: ".concat((s<<8|e).toString(16)))}return f=7,s>>>7}function h(A){for(var e,i=A;null!==(e=c());){if("number"==typeof(i=i[e]))return i;if("object"!==t(i))throw new Error("invalid huffman sequence")}return null}function l(A){for(var e=A,t=0;e>0;){var i=c();if(null===i)return;t=t<<1|i,--e}return t}function u(A){var e=l(A);return e>=1<<A-1?e:e+(-1<<A)+1}var w=0;var d,D=0;function y(A,e,t,i,r){var I=t%B,g=(t/B|0)*A.v+i,n=I*A.h+r;e(A,A.blocks[g][n])}function k(A,e,t){var i=t/A.blocksPerLine|0,r=t%A.blocksPerLine;e(A,A.blocks[i][r])}var p,m,G,F,S,R,U=r.length;R=C?0===g?0===a?function(A,e){var t=h(A.huffmanTableDC),i=0===t?0:u(t)<<o;A.pred+=i,e[0]=A.pred}:function(A,e){e[0]|=c()<<o}:0===a?function(A,e){if(w>0)w--;else for(var t=g,i=n;t<=i;){var r=h(A.huffmanTableAC),I=15&r,a=r>>4;if(0===I){if(a<15){w=l(a)+(1<<a)-1;break}t+=16}else e[v[t+=a]]=u(I)*(1<<o),t++}}:function(A,e){for(var t=g,i=n,r=0;t<=i;){var I=v[t],a=e[I]<0?-1:1;switch(D){case 0:var B=h(A.huffmanTableAC),C=15&B;if(r=B>>4,0===C)r<15?(w=l(r)+(1<<r),D=4):(r=16,D=1);else{if(1!==C)throw new Error("invalid ACn encoding");d=u(C),D=r?2:3}continue;case 1:case 2:e[I]?e[I]+=(c()<<o)*a:0==--r&&(D=2===D?3:0);break;case 3:e[I]?e[I]+=(c()<<o)*a:(e[I]=d<<o,D=0);break;case 4:e[I]&&(e[I]+=(c()<<o)*a)}t++}4===D&&0==--w&&(D=0)}:function(A,e){var t=h(A.huffmanTableDC),i=0===t?0:u(t);A.pred+=i,e[0]=A.pred;for(var r=1;r<64;){var I=h(A.huffmanTableAC),g=15&I,n=I>>4;if(0===g){if(n<15)break;r+=16}else e[v[r+=n]]=u(g),r++}};var L,b,M=0;b=1===U?r[0].blocksPerLine*r[0].blocksPerColumn:B*i.mcusPerColumn;for(var N=I||b;M<b;){for(m=0;m<U;m++)r[m].pred=0;if(w=0,1===U)for(p=r[0],S=0;S<N;S++)k(p,R,M),M++;else for(S=0;S<N;S++){for(m=0;m<U;m++){var x=p=r[m],J=x.h,q=x.v;for(G=0;G<q;G++)for(F=0;F<J;F++)y(p,R,M,G,F)}if(++M===b)break}if(f=0,(L=A[E]<<8|A[E+1])<65280)throw new Error("marker was not found");if(!(L>=65488&&L<=65495))break;E+=2}return E-Q}function L(A,e){var t=[],i=e.blocksPerLine,r=e.blocksPerColumn,I=i<<3,g=new Int32Array(64),n=new Uint8Array(64);function a(A,t,i){var r,I,g,n,a,o,B,C,Q,E,s=e.quantizationTable,f=i;for(E=0;E<64;E++)f[E]=A[E]*s[E];for(E=0;E<8;++E){var c=8*E;0!==f[1+c]||0!==f[2+c]||0!==f[3+c]||0!==f[4+c]||0!==f[5+c]||0!==f[6+c]||0!==f[7+c]?(r=5793*f[0+c]+128>>8,I=5793*f[4+c]+128>>8,g=f[2+c],n=f[6+c],a=2896*(f[1+c]-f[7+c])+128>>8,C=2896*(f[1+c]+f[7+c])+128>>8,o=f[3+c]<<4,Q=r-I+1>>1,r=r+I+1>>1,I=Q,Q=3784*g+1567*n+128>>8,g=1567*g-3784*n+128>>8,n=Q,Q=a-(B=f[5+c]<<4)+1>>1,a=a+B+1>>1,B=Q,Q=C+o+1>>1,o=C-o+1>>1,C=Q,Q=r-n+1>>1,r=r+n+1>>1,n=Q,Q=I-g+1>>1,I=I+g+1>>1,g=Q,Q=2276*a+3406*C+2048>>12,a=3406*a-2276*C+2048>>12,C=Q,Q=799*o+4017*B+2048>>12,o=4017*o-799*B+2048>>12,B=Q,f[0+c]=r+C,f[7+c]=r-C,f[1+c]=I+B,f[6+c]=I-B,f[2+c]=g+o,f[5+c]=g-o,f[3+c]=n+a,f[4+c]=n-a):(Q=5793*f[0+c]+512>>10,f[0+c]=Q,f[1+c]=Q,f[2+c]=Q,f[3+c]=Q,f[4+c]=Q,f[5+c]=Q,f[6+c]=Q,f[7+c]=Q)}for(E=0;E<8;++E){var h=E;0!==f[8+h]||0!==f[16+h]||0!==f[24+h]||0!==f[32+h]||0!==f[40+h]||0!==f[48+h]||0!==f[56+h]?(r=5793*f[0+h]+2048>>12,I=5793*f[32+h]+2048>>12,g=f[16+h],n=f[48+h],a=2896*(f[8+h]-f[56+h])+2048>>12,C=2896*(f[8+h]+f[56+h])+2048>>12,o=f[24+h],Q=r-I+1>>1,r=r+I+1>>1,I=Q,Q=3784*g+1567*n+2048>>12,g=1567*g-3784*n+2048>>12,n=Q,Q=a-(B=f[40+h])+1>>1,a=a+B+1>>1,B=Q,Q=C+o+1>>1,o=C-o+1>>1,C=Q,Q=r-n+1>>1,r=r+n+1>>1,n=Q,Q=I-g+1>>1,I=I+g+1>>1,g=Q,Q=2276*a+3406*C+2048>>12,a=3406*a-2276*C+2048>>12,C=Q,Q=799*o+4017*B+2048>>12,o=4017*o-799*B+2048>>12,B=Q,f[0+h]=r+C,f[56+h]=r-C,f[8+h]=I+B,f[48+h]=I-B,f[16+h]=g+o,f[40+h]=g-o,f[24+h]=n+a,f[32+h]=n-a):(Q=5793*i[E+0]+8192>>14,f[0+h]=Q,f[8+h]=Q,f[16+h]=Q,f[24+h]=Q,f[32+h]=Q,f[40+h]=Q,f[48+h]=Q,f[56+h]=Q)}for(E=0;E<64;++E){var l=128+(f[E]+8>>4);t[E]=l<0?0:l>255?255:l}}for(var o=0;o<r;o++){for(var B=o<<3,C=0;C<8;C++)t.push(new Uint8Array(I));for(var Q=0;Q<i;Q++){a(e.blocks[o][Q],n,g);for(var E=0,s=Q<<3,f=0;f<8;f++)for(var c=t[B+f],h=0;h<8;h++)c[s+h]=n[E++]}}return t}var b=function(){function A(){B(this,A),this.jfif=null,this.adobe=null,this.quantizationTables=[],this.huffmanTablesAC=[],this.huffmanTablesDC=[],this.resetFrames()}return Q(A,[{key:"resetFrames",value:function(){this.frames=[]}},{key:"parse",value:function(A){var e=0;function t(){var t=A[e]<<8|A[e+1];return e+=2,t}function i(A){var e,t,i=0,r=0;for(t in A.components)A.components.hasOwnProperty(t)&&(i<(e=A.components[t]).h&&(i=e.h),r<e.v&&(r=e.v));var I=Math.ceil(A.samplesPerLine/8/i),g=Math.ceil(A.scanLines/8/r);for(t in A.components)if(A.components.hasOwnProperty(t)){e=A.components[t];for(var n=Math.ceil(Math.ceil(A.samplesPerLine/8)*e.h/i),a=Math.ceil(Math.ceil(A.scanLines/8)*e.v/r),o=I*e.h,B=g*e.v,C=[],Q=0;Q<B;Q++){for(var E=[],s=0;s<o;s++)E.push(new Int32Array(64));C.push(E)}e.blocksPerLine=n,e.blocksPerColumn=a,e.blocks=C}A.maxH=i,A.maxV=r,A.mcusPerLine=I,A.mcusPerColumn=g}var r,I,g=t();if(65496!==g)throw new Error("SOI not found");for(g=t();65497!==g;){switch(g){case 65280:break;case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var n=(r=void 0,I=void 0,r=t(),I=A.subarray(e,e+r-2),e+=I.length,I);65504===g&&74===n[0]&&70===n[1]&&73===n[2]&&70===n[3]&&0===n[4]&&(this.jfif={version:{major:n[5],minor:n[6]},densityUnits:n[7],xDensity:n[8]<<8|n[9],yDensity:n[10]<<8|n[11],thumbWidth:n[12],thumbHeight:n[13],thumbData:n.subarray(14,14+3*n[12]*n[13])}),65518===g&&65===n[0]&&100===n[1]&&111===n[2]&&98===n[3]&&101===n[4]&&0===n[5]&&(this.adobe={version:n[6],flags0:n[7]<<8|n[8],flags1:n[9]<<8|n[10],transformCode:n[11]});break;case 65499:for(var a=t()+e-2;e<a;){var o=A[e++],B=new Int32Array(64);if(o>>4==0)for(var C=0;C<64;C++){B[v[C]]=A[e++]}else{if(o>>4!=1)throw new Error("DQT: invalid table spec");for(var Q=0;Q<64;Q++){B[v[Q]]=t()}}this.quantizationTables[15&o]=B}break;case 65472:case 65473:case 65474:t();for(var E={extended:65473===g,progressive:65474===g,precision:A[e++],scanLines:t(),samplesPerLine:t(),components:{},componentsOrder:[]},s=A[e++],f=void 0,c=0;c<s;c++){f=A[e];var h=A[e+1]>>4,l=15&A[e+1],u=A[e+2];E.componentsOrder.push(f),E.components[f]={h:h,v:l,quantizationIdx:u},e+=3}i(E),this.frames.push(E);break;case 65476:for(var w=t(),d=2;d<w;){for(var D=A[e++],y=new Uint8Array(16),k=0,p=0;p<16;p++,e++)y[p]=A[e],k+=y[p];for(var m=new Uint8Array(k),G=0;G<k;G++,e++)m[G]=A[e];d+=17+k,D>>4==0?this.huffmanTablesDC[15&D]=R(y,m):this.huffmanTablesAC[15&D]=R(y,m)}break;case 65501:t(),this.resetInterval=t();break;case 65498:t();for(var F=A[e++],S=[],L=this.frames[0],b=0;b<F;b++){var M=L.components[A[e++]],N=A[e++];M.huffmanTableDC=this.huffmanTablesDC[N>>4],M.huffmanTableAC=this.huffmanTablesAC[15&N],S.push(M)}var x=A[e++],J=A[e++],q=A[e++],Y=U(A,e,L,S,this.resetInterval,x,J,q>>4,15&q);e+=Y;break;case 65535:255!==A[e]&&e--;break;default:if(255===A[e-3]&&A[e-2]>=192&&A[e-2]<=254){e-=3;break}throw new Error("unknown JPEG marker ".concat(g.toString(16)))}g=t()}}},{key:"getResult",value:function(){var A=this.frames;if(0===this.frames.length)throw new Error("no frames were decoded");this.frames.length>1&&console.warn("more than one frame is not supported");for(var e=0;e<this.frames.length;e++)for(var t=this.frames[e].components,i=0,r=Object.keys(t);i<r.length;i++){var I=r[i];t[I].quantizationTable=this.quantizationTables[t[I].quantizationIdx],delete t[I].quantizationIdx}for(var g=A[0],n=g.components,a=g.componentsOrder,o=[],B=g.samplesPerLine,C=g.scanLines,Q=0;Q<a.length;Q++){var E=n[a[Q]];o.push({lines:L(0,E),scaleX:E.h/g.maxH,scaleY:E.v/g.maxV})}for(var s=new Uint8Array(B*C*o.length),f=0,c=0;c<C;++c)for(var h=0;h<B;++h)for(var l=0;l<o.length;++l){var u=o[l];s[f]=u.lines[0|c*u.scaleY][0|h*u.scaleX],++f}return s}}]),A}(),M=function(A){s(t,w);var e=S(t);function t(A){var i;return B(this,t),(i=e.call(this)).reader=new b,A.JPEGTables&&i.reader.parse(A.JPEGTables),i}return Q(t,[{key:"decodeBlock",value:function(A){return this.reader.resetFrames(),this.reader.parse(new Uint8Array(A)),this.reader.getResult().buffer}}]),t}(),N=Object.freeze({__proto__:null,default:M});function x(A){for(var e=A.length;--e>=0;)A[e]=0}x(new Array(576)),x(new Array(60)),x(new Array(512)),x(new Array(256)),x(new Array(29)),x(new Array(30));var J=function(A,e,t,i){for(var r=65535&A|0,I=A>>>16&65535|0,g=0;0!==t;){t-=g=t>2e3?2e3:t;do{I=I+(r=r+e[i++]|0)|0}while(--g);r%=65521,I%=65521}return r|I<<16|0},q=new Uint32Array(function(){for(var A,e=[],t=0;t<256;t++){A=t;for(var i=0;i<8;i++)A=1&A?3988292384^A>>>1:A>>>1;e[t]=A}return e}()),Y=function(A,e,t,i){var r=q,I=i+t;A^=-1;for(var g=i;g<I;g++)A=A>>>8^r[255&(A^e[g])];return-1^A},K={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},H={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8},O=function(A,e){return Object.prototype.hasOwnProperty.call(A,e)},P=function(A){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var i=e.shift();if(i){if("object"!==t(i))throw new TypeError(i+"must be non-object");for(var r in i)O(i,r)&&(A[r]=i[r])}}return A},T=function(A){for(var e=0,t=0,i=A.length;t<i;t++)e+=A[t].length;for(var r=new Uint8Array(e),I=0,g=0,n=A.length;I<n;I++){var a=A[I];r.set(a,g),g+=a.length}return r},V=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(A){V=!1}for(var _=new Uint8Array(256),X=0;X<256;X++)_[X]=X>=252?6:X>=248?5:X>=240?4:X>=224?3:X>=192?2:1;_[254]=_[254]=1;var Z=function(A){if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(A);var e,t,i,r,I,g=A.length,n=0;for(r=0;r<g;r++)55296==(64512&(t=A.charCodeAt(r)))&&r+1<g&&56320==(64512&(i=A.charCodeAt(r+1)))&&(t=65536+(t-55296<<10)+(i-56320),r++),n+=t<128?1:t<2048?2:t<65536?3:4;for(e=new Uint8Array(n),I=0,r=0;I<n;r++)55296==(64512&(t=A.charCodeAt(r)))&&r+1<g&&56320==(64512&(i=A.charCodeAt(r+1)))&&(t=65536+(t-55296<<10)+(i-56320),r++),t<128?e[I++]=t:t<2048?(e[I++]=192|t>>>6,e[I++]=128|63&t):t<65536?(e[I++]=224|t>>>12,e[I++]=128|t>>>6&63,e[I++]=128|63&t):(e[I++]=240|t>>>18,e[I++]=128|t>>>12&63,e[I++]=128|t>>>6&63,e[I++]=128|63&t);return e},j=function(A,e){var t,i,r=e||A.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(A.subarray(0,e));var I=new Array(2*r);for(i=0,t=0;t<r;){var g=A[t++];if(g<128)I[i++]=g;else{var n=_[g];if(n>4)I[i++]=65533,t+=n-1;else{for(g&=2===n?31:3===n?15:7;n>1&&t<r;)g=g<<6|63&A[t++],n--;n>1?I[i++]=65533:g<65536?I[i++]=g:(g-=65536,I[i++]=55296|g>>10&1023,I[i++]=56320|1023&g)}}}return function(A,e){if(e<65534&&A.subarray&&V)return String.fromCharCode.apply(null,A.length===e?A:A.subarray(0,e));for(var t="",i=0;i<e;i++)t+=String.fromCharCode(A[i]);return t}(I,i)},W=function(A,e){(e=e||A.length)>A.length&&(e=A.length);for(var t=e-1;t>=0&&128==(192&A[t]);)t--;return t<0||0===t?e:t+_[A[t]]>e?t:e};var z=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0},$=function(A,e){var t,i,r,I,g,n,a,o,B,C,Q,E,s,f,c,h,l,u,w,d,D,y,k,p,m=A.state;t=A.next_in,k=A.input,i=t+(A.avail_in-5),r=A.next_out,p=A.output,I=r-(e-A.avail_out),g=r+(A.avail_out-257),n=m.dmax,a=m.wsize,o=m.whave,B=m.wnext,C=m.window,Q=m.hold,E=m.bits,s=m.lencode,f=m.distcode,c=(1<<m.lenbits)-1,h=(1<<m.distbits)-1;A:do{E<15&&(Q+=k[t++]<<E,E+=8,Q+=k[t++]<<E,E+=8),l=s[Q&c];e:for(;;){if(Q>>>=u=l>>>24,E-=u,0===(u=l>>>16&255))p[r++]=65535&l;else{if(!(16&u)){if(0==(64&u)){l=s[(65535&l)+(Q&(1<<u)-1)];continue e}if(32&u){m.mode=12;break A}A.msg="invalid literal/length code",m.mode=30;break A}w=65535&l,(u&=15)&&(E<u&&(Q+=k[t++]<<E,E+=8),w+=Q&(1<<u)-1,Q>>>=u,E-=u),E<15&&(Q+=k[t++]<<E,E+=8,Q+=k[t++]<<E,E+=8),l=f[Q&h];t:for(;;){if(Q>>>=u=l>>>24,E-=u,!(16&(u=l>>>16&255))){if(0==(64&u)){l=f[(65535&l)+(Q&(1<<u)-1)];continue t}A.msg="invalid distance code",m.mode=30;break A}if(d=65535&l,E<(u&=15)&&(Q+=k[t++]<<E,(E+=8)<u&&(Q+=k[t++]<<E,E+=8)),(d+=Q&(1<<u)-1)>n){A.msg="invalid distance too far back",m.mode=30;break A}if(Q>>>=u,E-=u,d>(u=r-I)){if((u=d-u)>o&&m.sane){A.msg="invalid distance too far back",m.mode=30;break A}if(D=0,y=C,0===B){if(D+=a-u,u<w){w-=u;do{p[r++]=C[D++]}while(--u);D=r-d,y=p}}else if(B<u){if(D+=a+B-u,(u-=B)<w){w-=u;do{p[r++]=C[D++]}while(--u);if(D=0,B<w){w-=u=B;do{p[r++]=C[D++]}while(--u);D=r-d,y=p}}}else if(D+=B-u,u<w){w-=u;do{p[r++]=C[D++]}while(--u);D=r-d,y=p}for(;w>2;)p[r++]=y[D++],p[r++]=y[D++],p[r++]=y[D++],w-=3;w&&(p[r++]=y[D++],w>1&&(p[r++]=y[D++]))}else{D=r-d;do{p[r++]=p[D++],p[r++]=p[D++],p[r++]=p[D++],w-=3}while(w>2);w&&(p[r++]=p[D++],w>1&&(p[r++]=p[D++]))}break}}break}}while(t<i&&r<g);t-=w=E>>3,Q&=(1<<(E-=w<<3))-1,A.next_in=t,A.next_out=r,A.avail_in=t<i?i-t+5:5-(t-i),A.avail_out=r<g?g-r+257:257-(r-g),m.hold=Q,m.bits=E},AA=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),eA=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),tA=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),iA=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]),rA=function(A,e,t,i,r,I,g,n){var a,o,B,C,Q,E,s,f,c,h=n.bits,l=0,u=0,w=0,d=0,D=0,y=0,k=0,p=0,m=0,G=0,F=null,S=0,v=new Uint16Array(16),R=new Uint16Array(16),U=null,L=0;for(l=0;l<=15;l++)v[l]=0;for(u=0;u<i;u++)v[e[t+u]]++;for(D=h,d=15;d>=1&&0===v[d];d--);if(D>d&&(D=d),0===d)return r[I++]=20971520,r[I++]=20971520,n.bits=1,0;for(w=1;w<d&&0===v[w];w++);for(D<w&&(D=w),p=1,l=1;l<=15;l++)if(p<<=1,(p-=v[l])<0)return-1;if(p>0&&(0===A||1!==d))return-1;for(R[1]=0,l=1;l<15;l++)R[l+1]=R[l]+v[l];for(u=0;u<i;u++)0!==e[t+u]&&(g[R[e[t+u]]++]=u);if(0===A?(F=U=g,E=19):1===A?(F=AA,S-=257,U=eA,L-=257,E=256):(F=tA,U=iA,E=-1),G=0,u=0,l=w,Q=I,y=D,k=0,B=-1,C=(m=1<<D)-1,1===A&&m>852||2===A&&m>592)return 1;for(;;){s=l-k,g[u]<E?(f=0,c=g[u]):g[u]>E?(f=U[L+g[u]],c=F[S+g[u]]):(f=96,c=0),a=1<<l-k,w=o=1<<y;do{r[Q+(G>>k)+(o-=a)]=s<<24|f<<16|c|0}while(0!==o);for(a=1<<l-1;G&a;)a>>=1;if(0!==a?(G&=a-1,G+=a):G=0,u++,0==--v[l]){if(l===d)break;l=e[t+g[u]]}if(l>D&&(G&C)!==B){for(0===k&&(k=D),Q+=w,p=1<<(y=l-k);y+k<d&&!((p-=v[y+k])<=0);)y++,p<<=1;if(m+=1<<y,1===A&&m>852||2===A&&m>592)return 1;r[B=G&C]=D<<24|y<<16|Q-I|0}}return 0!==G&&(r[Q+G]=l-k<<24|64<<16|0),n.bits=D,0},IA=H.Z_FINISH,gA=H.Z_BLOCK,nA=H.Z_TREES,aA=H.Z_OK,oA=H.Z_STREAM_END,BA=H.Z_NEED_DICT,CA=H.Z_STREAM_ERROR,QA=H.Z_DATA_ERROR,EA=H.Z_MEM_ERROR,sA=H.Z_BUF_ERROR,fA=H.Z_DEFLATED,cA=function(A){return(A>>>24&255)+(A>>>8&65280)+((65280&A)<<8)+((255&A)<<24)};function hA(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}var lA,uA,wA=function(A){if(!A||!A.state)return CA;var e=A.state;return A.total_in=A.total_out=e.total=0,A.msg="",e.wrap&&(A.adler=1&e.wrap),e.mode=1,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(852),e.distcode=e.distdyn=new Int32Array(592),e.sane=1,e.back=-1,aA},dA=function(A){if(!A||!A.state)return CA;var e=A.state;return e.wsize=0,e.whave=0,e.wnext=0,wA(A)},DA=function(A,e){var t;if(!A||!A.state)return CA;var i=A.state;return e<0?(t=0,e=-e):(t=1+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?CA:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=t,i.wbits=e,dA(A))},yA=function(A,e){if(!A)return CA;var t=new hA;A.state=t,t.window=null;var i=DA(A,e);return i!==aA&&(A.state=null),i},kA=!0,pA=function(A){if(kA){lA=new Int32Array(512),uA=new Int32Array(32);for(var e=0;e<144;)A.lens[e++]=8;for(;e<256;)A.lens[e++]=9;for(;e<280;)A.lens[e++]=7;for(;e<288;)A.lens[e++]=8;for(rA(1,A.lens,0,288,lA,0,A.work,{bits:9}),e=0;e<32;)A.lens[e++]=5;rA(2,A.lens,0,32,uA,0,A.work,{bits:5}),kA=!1}A.lencode=lA,A.lenbits=9,A.distcode=uA,A.distbits=5},mA=function(A,e,t,i){var r,I=A.state;return null===I.window&&(I.wsize=1<<I.wbits,I.wnext=0,I.whave=0,I.window=new Uint8Array(I.wsize)),i>=I.wsize?(I.window.set(e.subarray(t-I.wsize,t),0),I.wnext=0,I.whave=I.wsize):((r=I.wsize-I.wnext)>i&&(r=i),I.window.set(e.subarray(t-i,t-i+r),I.wnext),(i-=r)?(I.window.set(e.subarray(t-i,t),0),I.wnext=i,I.whave=I.wsize):(I.wnext+=r,I.wnext===I.wsize&&(I.wnext=0),I.whave<I.wsize&&(I.whave+=r))),0},GA={inflateReset:dA,inflateReset2:DA,inflateResetKeep:wA,inflateInit:function(A){return yA(A,15)},inflateInit2:yA,inflate:function(A,e){var t,i,r,I,g,n,a,o,B,C,Q,E,s,f,c,h,l,u,w,d,D,y,k,p,m=0,G=new Uint8Array(4),F=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(!A||!A.state||!A.output||!A.input&&0!==A.avail_in)return CA;12===(t=A.state).mode&&(t.mode=13),g=A.next_out,r=A.output,a=A.avail_out,I=A.next_in,i=A.input,n=A.avail_in,o=t.hold,B=t.bits,C=n,Q=a,y=aA;A:for(;;)switch(t.mode){case 1:if(0===t.wrap){t.mode=13;break}for(;B<16;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}if(2&t.wrap&&35615===o){t.check=0,G[0]=255&o,G[1]=o>>>8&255,t.check=Y(t.check,G,2,0),o=0,B=0,t.mode=2;break}if(t.flags=0,t.head&&(t.head.done=!1),!(1&t.wrap)||(((255&o)<<8)+(o>>8))%31){A.msg="incorrect header check",t.mode=30;break}if((15&o)!==fA){A.msg="unknown compression method",t.mode=30;break}if(B-=4,D=8+(15&(o>>>=4)),0===t.wbits)t.wbits=D;else if(D>t.wbits){A.msg="invalid window size",t.mode=30;break}t.dmax=1<<t.wbits,A.adler=t.check=1,t.mode=512&o?10:12,o=0,B=0;break;case 2:for(;B<16;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}if(t.flags=o,(255&t.flags)!==fA){A.msg="unknown compression method",t.mode=30;break}if(57344&t.flags){A.msg="unknown header flags set",t.mode=30;break}t.head&&(t.head.text=o>>8&1),512&t.flags&&(G[0]=255&o,G[1]=o>>>8&255,t.check=Y(t.check,G,2,0)),o=0,B=0,t.mode=3;case 3:for(;B<32;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}t.head&&(t.head.time=o),512&t.flags&&(G[0]=255&o,G[1]=o>>>8&255,G[2]=o>>>16&255,G[3]=o>>>24&255,t.check=Y(t.check,G,4,0)),o=0,B=0,t.mode=4;case 4:for(;B<16;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}t.head&&(t.head.xflags=255&o,t.head.os=o>>8),512&t.flags&&(G[0]=255&o,G[1]=o>>>8&255,t.check=Y(t.check,G,2,0)),o=0,B=0,t.mode=5;case 5:if(1024&t.flags){for(;B<16;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}t.length=o,t.head&&(t.head.extra_len=o),512&t.flags&&(G[0]=255&o,G[1]=o>>>8&255,t.check=Y(t.check,G,2,0)),o=0,B=0}else t.head&&(t.head.extra=null);t.mode=6;case 6:if(1024&t.flags&&((E=t.length)>n&&(E=n),E&&(t.head&&(D=t.head.extra_len-t.length,t.head.extra||(t.head.extra=new Uint8Array(t.head.extra_len)),t.head.extra.set(i.subarray(I,I+E),D)),512&t.flags&&(t.check=Y(t.check,i,E,I)),n-=E,I+=E,t.length-=E),t.length))break A;t.length=0,t.mode=7;case 7:if(2048&t.flags){if(0===n)break A;E=0;do{D=i[I+E++],t.head&&D&&t.length<65536&&(t.head.name+=String.fromCharCode(D))}while(D&&E<n);if(512&t.flags&&(t.check=Y(t.check,i,E,I)),n-=E,I+=E,D)break A}else t.head&&(t.head.name=null);t.length=0,t.mode=8;case 8:if(4096&t.flags){if(0===n)break A;E=0;do{D=i[I+E++],t.head&&D&&t.length<65536&&(t.head.comment+=String.fromCharCode(D))}while(D&&E<n);if(512&t.flags&&(t.check=Y(t.check,i,E,I)),n-=E,I+=E,D)break A}else t.head&&(t.head.comment=null);t.mode=9;case 9:if(512&t.flags){for(;B<16;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}if(o!==(65535&t.check)){A.msg="header crc mismatch",t.mode=30;break}o=0,B=0}t.head&&(t.head.hcrc=t.flags>>9&1,t.head.done=!0),A.adler=t.check=0,t.mode=12;break;case 10:for(;B<32;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}A.adler=t.check=cA(o),o=0,B=0,t.mode=11;case 11:if(0===t.havedict)return A.next_out=g,A.avail_out=a,A.next_in=I,A.avail_in=n,t.hold=o,t.bits=B,BA;A.adler=t.check=1,t.mode=12;case 12:if(e===gA||e===nA)break A;case 13:if(t.last){o>>>=7&B,B-=7&B,t.mode=27;break}for(;B<3;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}switch(t.last=1&o,B-=1,3&(o>>>=1)){case 0:t.mode=14;break;case 1:if(pA(t),t.mode=20,e===nA){o>>>=2,B-=2;break A}break;case 2:t.mode=17;break;case 3:A.msg="invalid block type",t.mode=30}o>>>=2,B-=2;break;case 14:for(o>>>=7&B,B-=7&B;B<32;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}if((65535&o)!=(o>>>16^65535)){A.msg="invalid stored block lengths",t.mode=30;break}if(t.length=65535&o,o=0,B=0,t.mode=15,e===nA)break A;case 15:t.mode=16;case 16:if(E=t.length){if(E>n&&(E=n),E>a&&(E=a),0===E)break A;r.set(i.subarray(I,I+E),g),n-=E,I+=E,a-=E,g+=E,t.length-=E;break}t.mode=12;break;case 17:for(;B<14;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}if(t.nlen=257+(31&o),o>>>=5,B-=5,t.ndist=1+(31&o),o>>>=5,B-=5,t.ncode=4+(15&o),o>>>=4,B-=4,t.nlen>286||t.ndist>30){A.msg="too many length or distance symbols",t.mode=30;break}t.have=0,t.mode=18;case 18:for(;t.have<t.ncode;){for(;B<3;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}t.lens[F[t.have++]]=7&o,o>>>=3,B-=3}for(;t.have<19;)t.lens[F[t.have++]]=0;if(t.lencode=t.lendyn,t.lenbits=7,k={bits:t.lenbits},y=rA(0,t.lens,0,19,t.lencode,0,t.work,k),t.lenbits=k.bits,y){A.msg="invalid code lengths set",t.mode=30;break}t.have=0,t.mode=19;case 19:for(;t.have<t.nlen+t.ndist;){for(;h=(m=t.lencode[o&(1<<t.lenbits)-1])>>>16&255,l=65535&m,!((c=m>>>24)<=B);){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}if(l<16)o>>>=c,B-=c,t.lens[t.have++]=l;else{if(16===l){for(p=c+2;B<p;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}if(o>>>=c,B-=c,0===t.have){A.msg="invalid bit length repeat",t.mode=30;break}D=t.lens[t.have-1],E=3+(3&o),o>>>=2,B-=2}else if(17===l){for(p=c+3;B<p;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}B-=c,D=0,E=3+(7&(o>>>=c)),o>>>=3,B-=3}else{for(p=c+7;B<p;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}B-=c,D=0,E=11+(127&(o>>>=c)),o>>>=7,B-=7}if(t.have+E>t.nlen+t.ndist){A.msg="invalid bit length repeat",t.mode=30;break}for(;E--;)t.lens[t.have++]=D}}if(30===t.mode)break;if(0===t.lens[256]){A.msg="invalid code -- missing end-of-block",t.mode=30;break}if(t.lenbits=9,k={bits:t.lenbits},y=rA(1,t.lens,0,t.nlen,t.lencode,0,t.work,k),t.lenbits=k.bits,y){A.msg="invalid literal/lengths set",t.mode=30;break}if(t.distbits=6,t.distcode=t.distdyn,k={bits:t.distbits},y=rA(2,t.lens,t.nlen,t.ndist,t.distcode,0,t.work,k),t.distbits=k.bits,y){A.msg="invalid distances set",t.mode=30;break}if(t.mode=20,e===nA)break A;case 20:t.mode=21;case 21:if(n>=6&&a>=258){A.next_out=g,A.avail_out=a,A.next_in=I,A.avail_in=n,t.hold=o,t.bits=B,$(A,Q),g=A.next_out,r=A.output,a=A.avail_out,I=A.next_in,i=A.input,n=A.avail_in,o=t.hold,B=t.bits,12===t.mode&&(t.back=-1);break}for(t.back=0;h=(m=t.lencode[o&(1<<t.lenbits)-1])>>>16&255,l=65535&m,!((c=m>>>24)<=B);){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}if(h&&0==(240&h)){for(u=c,w=h,d=l;h=(m=t.lencode[d+((o&(1<<u+w)-1)>>u)])>>>16&255,l=65535&m,!(u+(c=m>>>24)<=B);){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}o>>>=u,B-=u,t.back+=u}if(o>>>=c,B-=c,t.back+=c,t.length=l,0===h){t.mode=26;break}if(32&h){t.back=-1,t.mode=12;break}if(64&h){A.msg="invalid literal/length code",t.mode=30;break}t.extra=15&h,t.mode=22;case 22:if(t.extra){for(p=t.extra;B<p;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}t.length+=o&(1<<t.extra)-1,o>>>=t.extra,B-=t.extra,t.back+=t.extra}t.was=t.length,t.mode=23;case 23:for(;h=(m=t.distcode[o&(1<<t.distbits)-1])>>>16&255,l=65535&m,!((c=m>>>24)<=B);){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}if(0==(240&h)){for(u=c,w=h,d=l;h=(m=t.distcode[d+((o&(1<<u+w)-1)>>u)])>>>16&255,l=65535&m,!(u+(c=m>>>24)<=B);){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}o>>>=u,B-=u,t.back+=u}if(o>>>=c,B-=c,t.back+=c,64&h){A.msg="invalid distance code",t.mode=30;break}t.offset=l,t.extra=15&h,t.mode=24;case 24:if(t.extra){for(p=t.extra;B<p;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}t.offset+=o&(1<<t.extra)-1,o>>>=t.extra,B-=t.extra,t.back+=t.extra}if(t.offset>t.dmax){A.msg="invalid distance too far back",t.mode=30;break}t.mode=25;case 25:if(0===a)break A;if(E=Q-a,t.offset>E){if((E=t.offset-E)>t.whave&&t.sane){A.msg="invalid distance too far back",t.mode=30;break}E>t.wnext?(E-=t.wnext,s=t.wsize-E):s=t.wnext-E,E>t.length&&(E=t.length),f=t.window}else f=r,s=g-t.offset,E=t.length;E>a&&(E=a),a-=E,t.length-=E;do{r[g++]=f[s++]}while(--E);0===t.length&&(t.mode=21);break;case 26:if(0===a)break A;r[g++]=t.length,a--,t.mode=21;break;case 27:if(t.wrap){for(;B<32;){if(0===n)break A;n--,o|=i[I++]<<B,B+=8}if(Q-=a,A.total_out+=Q,t.total+=Q,Q&&(A.adler=t.check=t.flags?Y(t.check,r,Q,g-Q):J(t.check,r,Q,g-Q)),Q=a,(t.flags?o:cA(o))!==t.check){A.msg="incorrect data check",t.mode=30;break}o=0,B=0}t.mode=28;case 28:if(t.wrap&&t.flags){for(;B<32;){if(0===n)break A;n--,o+=i[I++]<<B,B+=8}if(o!==(4294967295&t.total)){A.msg="incorrect length check",t.mode=30;break}o=0,B=0}t.mode=29;case 29:y=oA;break A;case 30:y=QA;break A;case 31:return EA;default:return CA}return A.next_out=g,A.avail_out=a,A.next_in=I,A.avail_in=n,t.hold=o,t.bits=B,(t.wsize||Q!==A.avail_out&&t.mode<30&&(t.mode<27||e!==IA))&&mA(A,A.output,A.next_out,Q-A.avail_out),C-=A.avail_in,Q-=A.avail_out,A.total_in+=C,A.total_out+=Q,t.total+=Q,t.wrap&&Q&&(A.adler=t.check=t.flags?Y(t.check,r,Q,A.next_out-Q):J(t.check,r,Q,A.next_out-Q)),A.data_type=t.bits+(t.last?64:0)+(12===t.mode?128:0)+(20===t.mode||15===t.mode?256:0),(0===C&&0===Q||e===IA)&&y===aA&&(y=sA),y},inflateEnd:function(A){if(!A||!A.state)return CA;var e=A.state;return e.window&&(e.window=null),A.state=null,aA},inflateGetHeader:function(A,e){if(!A||!A.state)return CA;var t=A.state;return 0==(2&t.wrap)?CA:(t.head=e,e.done=!1,aA)},inflateSetDictionary:function(A,e){var t,i=e.length;return A&&A.state?0!==(t=A.state).wrap&&11!==t.mode?CA:11===t.mode&&J(1,e,i,0)!==t.check?QA:mA(A,e,i,i)?(t.mode=31,EA):(t.havedict=1,aA):CA},inflateInfo:"pako inflate (from Nodeca project)"};var FA=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1},SA=Object.prototype.toString,vA=H.Z_NO_FLUSH,RA=H.Z_FINISH,UA=H.Z_OK,LA=H.Z_STREAM_END,bA=H.Z_NEED_DICT,MA=H.Z_STREAM_ERROR,NA=H.Z_DATA_ERROR,xA=H.Z_MEM_ERROR;function JA(A){this.options=P({chunkSize:65536,windowBits:15,to:""},A||{});var e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||A&&A.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new z,this.strm.avail_out=0;var t=GA.inflateInit2(this.strm,e.windowBits);if(t!==UA)throw new Error(K[t]);if(this.header=new FA,GA.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=Z(e.dictionary):"[object ArrayBuffer]"===SA.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(t=GA.inflateSetDictionary(this.strm,e.dictionary))!==UA))throw new Error(K[t])}function qA(A,e){var t=new JA(e);if(t.push(A),t.err)throw t.msg||K[t.err];return t.result}JA.prototype.push=function(A,e){var t,i,r,I=this.strm,g=this.options.chunkSize,n=this.options.dictionary;if(this.ended)return!1;for(i=e===~~e?e:!0===e?RA:vA,"[object ArrayBuffer]"===SA.call(A)?I.input=new Uint8Array(A):I.input=A,I.next_in=0,I.avail_in=I.input.length;;){for(0===I.avail_out&&(I.output=new Uint8Array(g),I.next_out=0,I.avail_out=g),(t=GA.inflate(I,i))===bA&&n&&((t=GA.inflateSetDictionary(I,n))===UA?t=GA.inflate(I,i):t===NA&&(t=bA));I.avail_in>0&&t===LA&&I.state.wrap>0&&0!==A[I.next_in];)GA.inflateReset(I),t=GA.inflate(I,i);switch(t){case MA:case NA:case bA:case xA:return this.onEnd(t),this.ended=!0,!1}if(r=I.avail_out,I.next_out&&(0===I.avail_out||t===LA))if("string"===this.options.to){var a=W(I.output,I.next_out),o=I.next_out-a,B=j(I.output,a);I.next_out=o,I.avail_out=g-o,o&&I.output.set(I.output.subarray(a,a+o),0),this.onData(B)}else this.onData(I.output.length===I.next_out?I.output:I.output.subarray(0,I.next_out));if(t!==UA||0!==r){if(t===LA)return t=GA.inflateEnd(this.strm),this.onEnd(t),this.ended=!0,!0;if(0===I.avail_in)break}}return!0},JA.prototype.onData=function(A){this.chunks.push(A)},JA.prototype.onEnd=function(A){A===UA&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=T(this.chunks)),this.chunks=[],this.err=A,this.msg=this.strm.msg};var YA={Inflate:JA,inflate:qA,inflateRaw:function(A,e){return(e=e||{}).raw=!0,qA(A,e)},ungzip:qA,constants:H}.inflate;function KA(A){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var t,i=c(A);if(e){var r=c(this).constructor;t=Reflect.construct(i,arguments,r)}else t=i.apply(this,arguments);return f(this,t)}}var HA=function(A){s(t,w);var e=KA(t);function t(){return B(this,t),e.apply(this,arguments)}return Q(t,[{key:"decodeBlock",value:function(A){return YA(new Uint8Array(A)).buffer}}]),t}(),OA=Object.freeze({__proto__:null,default:HA});function PA(A){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var t,i=c(A);if(e){var r=c(this).constructor;t=Reflect.construct(i,arguments,r)}else t=i.apply(this,arguments);return f(this,t)}}var TA,VA=function(A){s(t,w);var e=PA(t);function t(){return B(this,t),e.apply(this,arguments)}return Q(t,[{key:"decodeBlock",value:function(A){for(var e=new DataView(A),t=[],i=0;i<A.byteLength;++i){var r=e.getInt8(i);if(r<0){var I=e.getUint8(i+1);r=-r;for(var g=0;g<=r;++g)t.push(I);i+=1}else{for(var n=0;n<=r;++n)t.push(e.getUint8(i+n+1));i+=r+1}}return new Uint8Array(t).buffer}}]),t}(),_A=Object.freeze({__proto__:null,default:VA}),XA={exports:{}};TA=XA,\n/* Copyright 2015-2021 Esri. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 @preserve */\nfunction(){var A,e,t,i,r,I,g,n,a,o,B,C,Q,E,s,f,c=(A={defaultNoDataValue:-34027999387901484e22,decode:function(I,g){var n=(g=g||{}).encodedMaskData||null===g.encodedMaskData,a=r(I,g.inputOffset||0,n),o=null!==g.noDataValue?g.noDataValue:A.defaultNoDataValue,B=e(a,g.pixelType||Float32Array,g.encodedMaskData,o,g.returnMask),C={width:a.width,height:a.height,pixelData:B.resultPixels,minValue:B.minValue,maxValue:a.pixels.maxValue,noDataValue:o};return B.resultMask&&(C.maskData=B.resultMask),g.returnEncodedMask&&a.mask&&(C.encodedMaskData=a.mask.bitset?a.mask.bitset:null),g.returnFileInfo&&(C.fileInfo=t(a),g.computeUsedBitDepths&&(C.fileInfo.bitDepths=i(a))),C}},e=function(A,e,t,i,r){var g,n,a,o=0,B=A.pixels.numBlocksX,C=A.pixels.numBlocksY,Q=Math.floor(A.width/B),E=Math.floor(A.height/C),s=2*A.maxZError,f=Number.MAX_VALUE;t=t||(A.mask?A.mask.bitset:null),n=new e(A.width*A.height),r&&t&&(a=new Uint8Array(A.width*A.height));for(var c,h,l=new Float32Array(Q*E),u=0;u<=C;u++){var w=u!==C?E:A.height%C;if(0!==w)for(var d=0;d<=B;d++){var D=d!==B?Q:A.width%B;if(0!==D){var y,k,p,m,G=u*A.width*E+d*Q,F=A.width-D,S=A.pixels.blocks[o];if(S.encoding<2?(0===S.encoding?y=S.rawData:(I(S.stuffedData,S.bitsPerPixel,S.numValidPixels,S.offset,s,l,A.pixels.maxValue),y=l),k=0):p=2===S.encoding?0:S.offset,t)for(h=0;h<w;h++){for(7&G&&(m=t[G>>3],m<<=7&G),c=0;c<D;c++)7&G||(m=t[G>>3]),128&m?(a&&(a[G]=1),f=f>(g=S.encoding<2?y[k++]:p)?g:f,n[G++]=g):(a&&(a[G]=0),n[G++]=i),m<<=1;G+=F}else if(S.encoding<2)for(h=0;h<w;h++){for(c=0;c<D;c++)f=f>(g=y[k++])?g:f,n[G++]=g;G+=F}else for(f=f>p?p:f,h=0;h<w;h++){for(c=0;c<D;c++)n[G++]=p;G+=F}if(1===S.encoding&&k!==S.numValidPixels)throw"Block and Mask do not match";o++}}}return{resultPixels:n,resultMask:a,minValue:f}},t=function(A){return{fileIdentifierString:A.fileIdentifierString,fileVersion:A.fileVersion,imageType:A.imageType,height:A.height,width:A.width,maxZError:A.maxZError,eofOffset:A.eofOffset,mask:A.mask?{numBlocksX:A.mask.numBlocksX,numBlocksY:A.mask.numBlocksY,numBytes:A.mask.numBytes,maxValue:A.mask.maxValue}:null,pixels:{numBlocksX:A.pixels.numBlocksX,numBlocksY:A.pixels.numBlocksY,numBytes:A.pixels.numBytes,maxValue:A.pixels.maxValue,noDataValue:A.noDataValue}}},i=function(A){for(var e=A.pixels.numBlocksX*A.pixels.numBlocksY,t={},i=0;i<e;i++){var r=A.pixels.blocks[i];0===r.encoding?t.float32=!0:1===r.encoding?t[r.bitsPerPixel]=!0:t[0]=!0}return Object.keys(t)},r=function(A,e,t){var i={},r=new Uint8Array(A,e,10);if(i.fileIdentifierString=String.fromCharCode.apply(null,r),"CntZImage"!==i.fileIdentifierString.trim())throw"Unexpected file identifier string: "+i.fileIdentifierString;e+=10;var I=new DataView(A,e,24);if(i.fileVersion=I.getInt32(0,!0),i.imageType=I.getInt32(4,!0),i.height=I.getUint32(8,!0),i.width=I.getUint32(12,!0),i.maxZError=I.getFloat64(16,!0),e+=24,!t)if(I=new DataView(A,e,16),i.mask={},i.mask.numBlocksY=I.getUint32(0,!0),i.mask.numBlocksX=I.getUint32(4,!0),i.mask.numBytes=I.getUint32(8,!0),i.mask.maxValue=I.getFloat32(12,!0),e+=16,i.mask.numBytes>0){var g=new Uint8Array(Math.ceil(i.width*i.height/8)),n=(I=new DataView(A,e,i.mask.numBytes)).getInt16(0,!0),a=2,o=0;do{if(n>0)for(;n--;)g[o++]=I.getUint8(a++);else{var B=I.getUint8(a++);for(n=-n;n--;)g[o++]=B}n=I.getInt16(a,!0),a+=2}while(a<i.mask.numBytes);if(-32768!==n||o<g.length)throw"Unexpected end of mask RLE encoding";i.mask.bitset=g,e+=i.mask.numBytes}else 0==(i.mask.numBytes|i.mask.numBlocksY|i.mask.maxValue)&&(i.mask.bitset=new Uint8Array(Math.ceil(i.width*i.height/8)));I=new DataView(A,e,16),i.pixels={},i.pixels.numBlocksY=I.getUint32(0,!0),i.pixels.numBlocksX=I.getUint32(4,!0),i.pixels.numBytes=I.getUint32(8,!0),i.pixels.maxValue=I.getFloat32(12,!0),e+=16;var C=i.pixels.numBlocksX,Q=i.pixels.numBlocksY,E=C+(i.width%C>0?1:0),s=Q+(i.height%Q>0?1:0);i.pixels.blocks=new Array(E*s);for(var f=0,c=0;c<s;c++)for(var h=0;h<E;h++){var l=0,u=A.byteLength-e;I=new DataView(A,e,Math.min(10,u));var w={};i.pixels.blocks[f++]=w;var d=I.getUint8(0);if(l++,w.encoding=63&d,w.encoding>3)throw"Invalid block encoding ("+w.encoding+")";if(2!==w.encoding){if(0!==d&&2!==d){if(d>>=6,w.offsetType=d,2===d)w.offset=I.getInt8(1),l++;else if(1===d)w.offset=I.getInt16(1,!0),l+=2;else{if(0!==d)throw"Invalid block offset type";w.offset=I.getFloat32(1,!0),l+=4}if(1===w.encoding)if(d=I.getUint8(l),l++,w.bitsPerPixel=63&d,d>>=6,w.numValidPixelsType=d,2===d)w.numValidPixels=I.getUint8(l),l++;else if(1===d)w.numValidPixels=I.getUint16(l,!0),l+=2;else{if(0!==d)throw"Invalid valid pixel count type";w.numValidPixels=I.getUint32(l,!0),l+=4}}var D;if(e+=l,3!==w.encoding)if(0===w.encoding){var y=(i.pixels.numBytes-1)/4;if(y!==Math.floor(y))throw"uncompressed block has invalid length";D=new ArrayBuffer(4*y),new Uint8Array(D).set(new Uint8Array(A,e,4*y));var k=new Float32Array(D);w.rawData=k,e+=4*y}else if(1===w.encoding){var p=Math.ceil(w.numValidPixels*w.bitsPerPixel/8),m=Math.ceil(p/4);D=new ArrayBuffer(4*m),new Uint8Array(D).set(new Uint8Array(A,e,p)),w.stuffedData=new Uint32Array(D),e+=p}}else e++}return i.eofOffset=e,i},I=function(A,e,t,i,r,I,g){var n,a,o,B=(1<<e)-1,C=0,Q=0,E=Math.ceil((g-i)/r),s=4*A.length-Math.ceil(e*t/8);for(A[A.length-1]<<=8*s,n=0;n<t;n++){if(0===Q&&(o=A[C++],Q=32),Q>=e)a=o>>>Q-e&B,Q-=e;else{var f=e-Q;a=(o&B)<<f&B,a+=(o=A[C++])>>>(Q=32-f)}I[n]=a<E?i+a*r:g}return I},A),h=(g=function(A,e,t,i,r,I,g,n){var a,o,B,C,Q,E=(1<<t)-1,s=0,f=0,c=4*A.length-Math.ceil(t*i/8);if(A[A.length-1]<<=8*c,r)for(a=0;a<i;a++)0===f&&(B=A[s++],f=32),f>=t?(o=B>>>f-t&E,f-=t):(o=(B&E)<<(C=t-f)&E,o+=(B=A[s++])>>>(f=32-C)),e[a]=r[o];else for(Q=Math.ceil((n-I)/g),a=0;a<i;a++)0===f&&(B=A[s++],f=32),f>=t?(o=B>>>f-t&E,f-=t):(o=(B&E)<<(C=t-f)&E,o+=(B=A[s++])>>>(f=32-C)),e[a]=o<Q?I+o*g:n},n=function(A,e,t,i,r,I){var g,n=(1<<e)-1,a=0,o=0,B=0,C=0,Q=0,E=[],s=4*A.length-Math.ceil(e*t/8);A[A.length-1]<<=8*s;var f=Math.ceil((I-i)/r);for(o=0;o<t;o++)0===C&&(g=A[a++],C=32),C>=e?(Q=g>>>C-e&n,C-=e):(Q=(g&n)<<(B=e-C)&n,Q+=(g=A[a++])>>>(C=32-B)),E[o]=Q<f?i+Q*r:I;return E.unshift(i),E},a=function(A,e,t,i,r,I,g,n){var a,o,B,C,Q=(1<<t)-1,E=0,s=0,f=0;if(r)for(a=0;a<i;a++)0===s&&(B=A[E++],s=32,f=0),s>=t?(o=B>>>f&Q,s-=t,f+=t):(o=B>>>f&Q,s=32-(C=t-s),o|=((B=A[E++])&(1<<C)-1)<<t-C,f=C),e[a]=r[o];else{var c=Math.ceil((n-I)/g);for(a=0;a<i;a++)0===s&&(B=A[E++],s=32,f=0),s>=t?(o=B>>>f&Q,s-=t,f+=t):(o=B>>>f&Q,s=32-(C=t-s),o|=((B=A[E++])&(1<<C)-1)<<t-C,f=C),e[a]=o<c?I+o*g:n}return e},o=function(A,e,t,i,r,I){var g,n=(1<<e)-1,a=0,o=0,B=0,C=0,Q=0,E=0,s=[],f=Math.ceil((I-i)/r);for(o=0;o<t;o++)0===C&&(g=A[a++],C=32,E=0),C>=e?(Q=g>>>E&n,C-=e,E+=e):(Q=g>>>E&n,C=32-(B=e-C),Q|=((g=A[a++])&(1<<B)-1)<<e-B,E=B),s[o]=Q<f?i+Q*r:I;return s.unshift(i),s},B=function(A,e,t,i){var r,I,g,n,a=(1<<t)-1,o=0,B=0,C=4*A.length-Math.ceil(t*i/8);for(A[A.length-1]<<=8*C,r=0;r<i;r++)0===B&&(g=A[o++],B=32),B>=t?(I=g>>>B-t&a,B-=t):(I=(g&a)<<(n=t-B)&a,I+=(g=A[o++])>>>(B=32-n)),e[r]=I;return e},C=function(A,e,t,i){var r,I,g,n,a=(1<<t)-1,o=0,B=0,C=0;for(r=0;r<i;r++)0===B&&(g=A[o++],B=32,C=0),B>=t?(I=g>>>C&a,B-=t,C+=t):(I=g>>>C&a,B=32-(n=t-B),I|=((g=A[o++])&(1<<n)-1)<<t-n,C=n),e[r]=I;return e},Q={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(A){for(var e=65535,t=65535,i=A.length,r=Math.floor(i/2),I=0;r;){var g=r>=359?359:r;r-=g;do{e+=A[I++]<<8,t+=e+=A[I++]}while(--g);e=(65535&e)+(e>>>16),t=(65535&t)+(t>>>16)}return 1&i&&(t+=e+=A[I]<<8),((t=(65535&t)+(t>>>16))<<16|(e=(65535&e)+(e>>>16)))>>>0},readHeaderInfo:function(A,e){var t=e.ptr,i=new Uint8Array(A,t,6),r={};if(r.fileIdentifierString=String.fromCharCode.apply(null,i),0!==r.fileIdentifierString.lastIndexOf("Lerc2",0))throw"Unexpected file identifier string (expect Lerc2 ): "+r.fileIdentifierString;t+=6;var I,g=new DataView(A,t,8),n=g.getInt32(0,!0);if(r.fileVersion=n,t+=4,n>=3&&(r.checksum=g.getUint32(4,!0),t+=4),g=new DataView(A,t,12),r.height=g.getUint32(0,!0),r.width=g.getUint32(4,!0),t+=8,n>=4?(r.numDims=g.getUint32(8,!0),t+=4):r.numDims=1,g=new DataView(A,t,40),r.numValidPixel=g.getUint32(0,!0),r.microBlockSize=g.getInt32(4,!0),r.blobSize=g.getInt32(8,!0),r.imageType=g.getInt32(12,!0),r.maxZError=g.getFloat64(16,!0),r.zMin=g.getFloat64(24,!0),r.zMax=g.getFloat64(32,!0),t+=40,e.headerInfo=r,e.ptr=t,n>=3&&(I=n>=4?52:48,this.computeChecksumFletcher32(new Uint8Array(A,t-I,r.blobSize-14))!==r.checksum))throw"Checksum failed.";return!0},checkMinMaxRanges:function(A,e){var t=e.headerInfo,i=this.getDataTypeArray(t.imageType),r=t.numDims*this.getDataTypeSize(t.imageType),I=this.readSubArray(A,e.ptr,i,r),g=this.readSubArray(A,e.ptr+r,i,r);e.ptr+=2*r;var n,a=!0;for(n=0;n<t.numDims;n++)if(I[n]!==g[n]){a=!1;break}return t.minValues=I,t.maxValues=g,a},readSubArray:function(A,e,t,i){var r;if(t===Uint8Array)r=new Uint8Array(A,e,i);else{var I=new ArrayBuffer(i);new Uint8Array(I).set(new Uint8Array(A,e,i)),r=new t(I)}return r},readMask:function(A,e){var t,i,r=e.ptr,I=e.headerInfo,g=I.width*I.height,n=I.numValidPixel,a=new DataView(A,r,4),o={};if(o.numBytes=a.getUint32(0,!0),r+=4,(0===n||g===n)&&0!==o.numBytes)throw"invalid mask";if(0===n)t=new Uint8Array(Math.ceil(g/8)),o.bitset=t,i=new Uint8Array(g),e.pixels.resultMask=i,r+=o.numBytes;else if(o.numBytes>0){t=new Uint8Array(Math.ceil(g/8));var B=(a=new DataView(A,r,o.numBytes)).getInt16(0,!0),C=2,Q=0,E=0;do{if(B>0)for(;B--;)t[Q++]=a.getUint8(C++);else for(E=a.getUint8(C++),B=-B;B--;)t[Q++]=E;B=a.getInt16(C,!0),C+=2}while(C<o.numBytes);if(-32768!==B||Q<t.length)throw"Unexpected end of mask RLE encoding";i=new Uint8Array(g);var s=0,f=0;for(f=0;f<g;f++)7&f?(s=t[f>>3],s<<=7&f):s=t[f>>3],128&s&&(i[f]=1);e.pixels.resultMask=i,o.bitset=t,r+=o.numBytes}return e.ptr=r,e.mask=o,!0},readDataOneSweep:function(A,e,t,i){var r,I=e.ptr,g=e.headerInfo,n=g.numDims,a=g.width*g.height,o=g.imageType,B=g.numValidPixel*Q.getDataTypeSize(o)*n,C=e.pixels.resultMask;if(t===Uint8Array)r=new Uint8Array(A,I,B);else{var E=new ArrayBuffer(B);new Uint8Array(E).set(new Uint8Array(A,I,B)),r=new t(E)}if(r.length===a*n)e.pixels.resultPixels=i?Q.swapDimensionOrder(r,a,n,t,!0):r;else{e.pixels.resultPixels=new t(a*n);var s=0,f=0,c=0,h=0;if(n>1){if(i){for(f=0;f<a;f++)if(C[f])for(h=f,c=0;c<n;c++,h+=a)e.pixels.resultPixels[h]=r[s++]}else for(f=0;f<a;f++)if(C[f])for(h=f*n,c=0;c<n;c++)e.pixels.resultPixels[h+c]=r[s++]}else for(f=0;f<a;f++)C[f]&&(e.pixels.resultPixels[f]=r[s++])}return I+=B,e.ptr=I,!0},readHuffmanTree:function(A,e){var t=this.HUFFMAN_LUT_BITS_MAX,i=new DataView(A,e.ptr,16);if(e.ptr+=16,i.getInt32(0,!0)<2)throw"unsupported Huffman version";var r=i.getInt32(4,!0),I=i.getInt32(8,!0),g=i.getInt32(12,!0);if(I>=g)return!1;var n=new Uint32Array(g-I);Q.decodeBits(A,e,n);var a,o,B,C,s=[];for(a=I;a<g;a++)s[o=a-(a<r?0:r)]={first:n[a-I],second:null};var f=A.byteLength-e.ptr,c=Math.ceil(f/4),h=new ArrayBuffer(4*c);new Uint8Array(h).set(new Uint8Array(A,e.ptr,f));var l,u=new Uint32Array(h),w=0,d=0;for(l=u[0],a=I;a<g;a++)(C=s[o=a-(a<r?0:r)].first)>0&&(s[o].second=l<<w>>>32-C,32-w>=C?32===(w+=C)&&(w=0,l=u[++d]):(w+=C-32,l=u[++d],s[o].second|=l>>>32-w));var D=0,y=0,k=new E;for(a=0;a<s.length;a++)void 0!==s[a]&&(D=Math.max(D,s[a].first));y=D>=t?t:D;var p,m,G,F,S,v=[];for(a=I;a<g;a++)if((C=s[o=a-(a<r?0:r)].first)>0)if(p=[C,o],C<=y)for(m=s[o].second<<y-C,G=1<<y-C,B=0;B<G;B++)v[m|B]=p;else for(m=s[o].second,S=k,F=C-1;F>=0;F--)m>>>F&1?(S.right||(S.right=new E),S=S.right):(S.left||(S.left=new E),S=S.left),0!==F||S.val||(S.val=p[1]);return{decodeLut:v,numBitsLUTQick:y,numBitsLUT:D,tree:k,stuffedData:u,srcPtr:d,bitPos:w}},readHuffman:function(A,e,t,i){var r,I,g,n,a,o,B,C,E,s=e.headerInfo.numDims,f=e.headerInfo.height,c=e.headerInfo.width,h=c*f,l=this.readHuffmanTree(A,e),u=l.decodeLut,w=l.tree,d=l.stuffedData,D=l.srcPtr,y=l.bitPos,k=l.numBitsLUTQick,p=l.numBitsLUT,m=0===e.headerInfo.imageType?128:0,G=e.pixels.resultMask,F=0;y>0&&(D++,y=0);var S,v=d[D],R=1===e.encodeMode,U=new t(h*s),L=U;if(s<2||R){for(S=0;S<s;S++)if(s>1&&(L=new t(U.buffer,h*S,h),F=0),e.headerInfo.numValidPixel===c*f)for(C=0,o=0;o<f;o++)for(B=0;B<c;B++,C++){if(I=0,a=n=v<<y>>>32-k,32-y<k&&(a=n|=d[D+1]>>>64-y-k),u[a])I=u[a][1],y+=u[a][0];else for(a=n=v<<y>>>32-p,32-y<p&&(a=n|=d[D+1]>>>64-y-p),r=w,E=0;E<p;E++)if(!(r=n>>>p-E-1&1?r.right:r.left).left&&!r.right){I=r.val,y=y+E+1;break}y>=32&&(y-=32,v=d[++D]),g=I-m,R?(g+=B>0?F:o>0?L[C-c]:F,g&=255,L[C]=g,F=g):L[C]=g}else for(C=0,o=0;o<f;o++)for(B=0;B<c;B++,C++)if(G[C]){if(I=0,a=n=v<<y>>>32-k,32-y<k&&(a=n|=d[D+1]>>>64-y-k),u[a])I=u[a][1],y+=u[a][0];else for(a=n=v<<y>>>32-p,32-y<p&&(a=n|=d[D+1]>>>64-y-p),r=w,E=0;E<p;E++)if(!(r=n>>>p-E-1&1?r.right:r.left).left&&!r.right){I=r.val,y=y+E+1;break}y>=32&&(y-=32,v=d[++D]),g=I-m,R?(B>0&&G[C-1]?g+=F:o>0&&G[C-c]?g+=L[C-c]:g+=F,g&=255,L[C]=g,F=g):L[C]=g}}else for(C=0,o=0;o<f;o++)for(B=0;B<c;B++)if(C=o*c+B,!G||G[C])for(S=0;S<s;S++,C+=h){if(I=0,a=n=v<<y>>>32-k,32-y<k&&(a=n|=d[D+1]>>>64-y-k),u[a])I=u[a][1],y+=u[a][0];else for(a=n=v<<y>>>32-p,32-y<p&&(a=n|=d[D+1]>>>64-y-p),r=w,E=0;E<p;E++)if(!(r=n>>>p-E-1&1?r.right:r.left).left&&!r.right){I=r.val,y=y+E+1;break}y>=32&&(y-=32,v=d[++D]),g=I-m,L[C]=g}e.ptr=e.ptr+4*(D+1)+(y>0?4:0),e.pixels.resultPixels=U,s>1&&!i&&(e.pixels.resultPixels=Q.swapDimensionOrder(U,h,s,t))},decodeBits:function(A,e,t,i,r){var I=e.headerInfo,Q=I.fileVersion,E=0,s=A.byteLength-e.ptr>=5?5:A.byteLength-e.ptr,f=new DataView(A,e.ptr,s),c=f.getUint8(0);E++;var h=c>>6,l=0===h?4:3-h,u=(32&c)>0,w=31&c,d=0;if(1===l)d=f.getUint8(E),E++;else if(2===l)d=f.getUint16(E,!0),E+=2;else{if(4!==l)throw"Invalid valid pixel count type";d=f.getUint32(E,!0),E+=4}var D,y,k,p,m,G,F,S,v,R=2*I.maxZError,U=I.numDims>1?I.maxValues[r]:I.zMax;if(u){for(e.counter.lut++,S=f.getUint8(E),E++,p=Math.ceil((S-1)*w/8),m=Math.ceil(p/4),y=new ArrayBuffer(4*m),k=new Uint8Array(y),e.ptr+=E,k.set(new Uint8Array(A,e.ptr,p)),F=new Uint32Array(y),e.ptr+=p,v=0;S-1>>>v;)v++;p=Math.ceil(d*v/8),m=Math.ceil(p/4),y=new ArrayBuffer(4*m),(k=new Uint8Array(y)).set(new Uint8Array(A,e.ptr,p)),D=new Uint32Array(y),e.ptr+=p,G=Q>=3?o(F,w,S-1,i,R,U):n(F,w,S-1,i,R,U),Q>=3?a(D,t,v,d,G):g(D,t,v,d,G)}else e.counter.bitstuffer++,v=w,e.ptr+=E,v>0&&(p=Math.ceil(d*v/8),m=Math.ceil(p/4),y=new ArrayBuffer(4*m),(k=new Uint8Array(y)).set(new Uint8Array(A,e.ptr,p)),D=new Uint32Array(y),e.ptr+=p,Q>=3?null==i?C(D,t,v,d):a(D,t,v,d,!1,i,R,U):null==i?B(D,t,v,d):g(D,t,v,d,!1,i,R,U))},readTiles:function(A,e,t,i){var r=e.headerInfo,I=r.width,g=r.height,n=I*g,a=r.microBlockSize,o=r.imageType,B=Q.getDataTypeSize(o),C=Math.ceil(I/a),E=Math.ceil(g/a);e.pixels.numBlocksY=E,e.pixels.numBlocksX=C,e.pixels.ptr=0;var s,f,c,h,l,u,w,d,D,y,k=0,p=0,m=0,G=0,F=0,S=0,v=0,R=0,U=0,L=0,b=0,M=0,N=0,x=0,J=0,q=new t(a*a),Y=g%a||a,K=I%a||a,H=r.numDims,O=e.pixels.resultMask,P=e.pixels.resultPixels,T=r.fileVersion>=5?14:15,V=r.zMax;for(m=0;m<E;m++)for(F=m!==E-1?a:Y,G=0;G<C;G++)for(L=m*I*a+G*a,b=I-(S=G!==C-1?a:K),d=0;d<H;d++){if(H>1?(y=P,L=m*I*a+G*a,P=new t(e.pixels.resultPixels.buffer,n*d*B,n),V=r.maxValues[d]):y=null,v=A.byteLength-e.ptr,f={},J=0,R=(s=new DataView(A,e.ptr,Math.min(10,v))).getUint8(0),J++,D=r.fileVersion>=5?4&R:0,U=R>>6&255,(R>>2&T)!=(G*a>>3&T))throw"integrity issue";if(D&&0===d)throw"integrity issue";if((l=3&R)>3)throw e.ptr+=J,"Invalid block encoding ("+l+")";if(2!==l)if(0===l){if(D)throw"integrity issue";if(e.counter.uncompressed++,e.ptr+=J,M=(M=F*S*B)<(N=A.byteLength-e.ptr)?M:N,c=new ArrayBuffer(M%B==0?M:M+B-M%B),new Uint8Array(c).set(new Uint8Array(A,e.ptr,M)),h=new t(c),x=0,O)for(k=0;k<F;k++){for(p=0;p<S;p++)O[L]&&(P[L]=h[x++]),L++;L+=b}else for(k=0;k<F;k++){for(p=0;p<S;p++)P[L++]=h[x++];L+=b}e.ptr+=x*B}else if(u=Q.getDataTypeUsed(D&&o<6?4:o,U),w=Q.getOnePixel(f,J,u,s),J+=Q.getDataTypeSize(u),3===l)if(e.ptr+=J,e.counter.constantoffset++,O)for(k=0;k<F;k++){for(p=0;p<S;p++)O[L]&&(P[L]=D?Math.min(V,y[L]+w):w),L++;L+=b}else for(k=0;k<F;k++){for(p=0;p<S;p++)P[L]=D?Math.min(V,y[L]+w):w,L++;L+=b}else if(e.ptr+=J,Q.decodeBits(A,e,q,w,d),J=0,D)if(O)for(k=0;k<F;k++){for(p=0;p<S;p++)O[L]&&(P[L]=q[J++]+y[L]),L++;L+=b}else for(k=0;k<F;k++){for(p=0;p<S;p++)P[L]=q[J++]+y[L],L++;L+=b}else if(O)for(k=0;k<F;k++){for(p=0;p<S;p++)O[L]&&(P[L]=q[J++]),L++;L+=b}else for(k=0;k<F;k++){for(p=0;p<S;p++)P[L++]=q[J++];L+=b}else{if(D)if(O)for(k=0;k<F;k++)for(p=0;p<S;p++)O[L]&&(P[L]=y[L]),L++;else for(k=0;k<F;k++)for(p=0;p<S;p++)P[L]=y[L],L++;e.counter.constant++,e.ptr+=J}}H>1&&!i&&(e.pixels.resultPixels=Q.swapDimensionOrder(e.pixels.resultPixels,n,H,t))},formatFileInfo:function(A){return{fileIdentifierString:A.headerInfo.fileIdentifierString,fileVersion:A.headerInfo.fileVersion,imageType:A.headerInfo.imageType,height:A.headerInfo.height,width:A.headerInfo.width,numValidPixel:A.headerInfo.numValidPixel,microBlockSize:A.headerInfo.microBlockSize,blobSize:A.headerInfo.blobSize,maxZError:A.headerInfo.maxZError,pixelType:Q.getPixelType(A.headerInfo.imageType),eofOffset:A.eofOffset,mask:A.mask?{numBytes:A.mask.numBytes}:null,pixels:{numBlocksX:A.pixels.numBlocksX,numBlocksY:A.pixels.numBlocksY,maxValue:A.headerInfo.zMax,minValue:A.headerInfo.zMin,noDataValue:A.noDataValue}}},constructConstantSurface:function(A,e){var t=A.headerInfo.zMax,i=A.headerInfo.zMin,r=A.headerInfo.maxValues,I=A.headerInfo.numDims,g=A.headerInfo.height*A.headerInfo.width,n=0,a=0,o=0,B=A.pixels.resultMask,C=A.pixels.resultPixels;if(B)if(I>1){if(e)for(n=0;n<I;n++)for(o=n*g,t=r[n],a=0;a<g;a++)B[a]&&(C[o+a]=t);else for(a=0;a<g;a++)if(B[a])for(o=a*I,n=0;n<I;n++)C[o+I]=r[n]}else for(a=0;a<g;a++)B[a]&&(C[a]=t);else if(I>1&&i!==t)if(e)for(n=0;n<I;n++)for(o=n*g,t=r[n],a=0;a<g;a++)C[o+a]=t;else for(a=0;a<g;a++)for(o=a*I,n=0;n<I;n++)C[o+n]=r[n];else for(a=0;a<g*I;a++)C[a]=t},getDataTypeArray:function(A){var e;switch(A){case 0:e=Int8Array;break;case 1:e=Uint8Array;break;case 2:e=Int16Array;break;case 3:e=Uint16Array;break;case 4:e=Int32Array;break;case 5:e=Uint32Array;break;case 6:default:e=Float32Array;break;case 7:e=Float64Array}return e},getPixelType:function(A){var e;switch(A){case 0:e="S8";break;case 1:e="U8";break;case 2:e="S16";break;case 3:e="U16";break;case 4:e="S32";break;case 5:e="U32";break;case 6:default:e="F32";break;case 7:e="F64"}return e},isValidPixelValue:function(A,e){if(null==e)return!1;var t;switch(A){case 0:t=e>=-128&&e<=127;break;case 1:t=e>=0&&e<=255;break;case 2:t=e>=-32768&&e<=32767;break;case 3:t=e>=0&&e<=65536;break;case 4:t=e>=-2147483648&&e<=2147483647;break;case 5:t=e>=0&&e<=4294967296;break;case 6:t=e>=-34027999387901484e22&&e<=34027999387901484e22;break;case 7:t=e>=-17976931348623157e292&&e<=17976931348623157e292;break;default:t=!1}return t},getDataTypeSize:function(A){var e=0;switch(A){case 0:case 1:e=1;break;case 2:case 3:e=2;break;case 4:case 5:case 6:e=4;break;case 7:e=8;break;default:e=A}return e},getDataTypeUsed:function(A,e){var t=A;switch(A){case 2:case 4:t=A-e;break;case 3:case 5:t=A-2*e;break;case 6:t=0===e?A:1===e?2:1;break;case 7:t=0===e?A:A-2*e+1;break;default:t=A}return t},getOnePixel:function(A,e,t,i){var r=0;switch(t){case 0:r=i.getInt8(e);break;case 1:r=i.getUint8(e);break;case 2:r=i.getInt16(e,!0);break;case 3:r=i.getUint16(e,!0);break;case 4:r=i.getInt32(e,!0);break;case 5:r=i.getUInt32(e,!0);break;case 6:r=i.getFloat32(e,!0);break;case 7:r=i.getFloat64(e,!0);break;default:throw"the decoder does not understand this pixel type"}return r},swapDimensionOrder:function(A,e,t,i,r){var I=0,g=0,n=0,a=0,o=A;if(t>1)if(o=new i(e*t),r)for(I=0;I<e;I++)for(a=I,n=0;n<t;n++,a+=e)o[a]=A[g++];else for(I=0;I<e;I++)for(a=I,n=0;n<t;n++,a+=e)o[g++]=A[a];return o}},E=function(A,e,t){this.val=A,this.left=e,this.right=t},{decode:function(A,e){var t=(e=e||{}).noDataValue,i=0,r={};r.ptr=e.inputOffset||0,r.pixels={},Q.readHeaderInfo(A,r);var I=r.headerInfo,g=I.fileVersion,n=Q.getDataTypeArray(I.imageType);if(g>5)throw"unsupported lerc version 2."+g;Q.readMask(A,r),I.numValidPixel===I.width*I.height||r.pixels.resultMask||(r.pixels.resultMask=e.maskData);var a=I.width*I.height;r.pixels.resultPixels=new n(a*I.numDims),r.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0};var o,B=!e.returnPixelInterleavedDims;if(0!==I.numValidPixel)if(I.zMax===I.zMin)Q.constructConstantSurface(r,B);else if(g>=4&&Q.checkMinMaxRanges(A,r))Q.constructConstantSurface(r,B);else{var C=new DataView(A,r.ptr,2),E=C.getUint8(0);if(r.ptr++,E)Q.readDataOneSweep(A,r,n,B);else if(g>1&&I.imageType<=1&&Math.abs(I.maxZError-.5)<1e-5){var s=C.getUint8(1);if(r.ptr++,r.encodeMode=s,s>2||g<4&&s>1)throw"Invalid Huffman flag "+s;s?Q.readHuffman(A,r,n,B):Q.readTiles(A,r,n,B)}else Q.readTiles(A,r,n,B)}r.eofOffset=r.ptr,e.inputOffset?(o=r.headerInfo.blobSize+e.inputOffset-r.ptr,Math.abs(o)>=1&&(r.eofOffset=e.inputOffset+r.headerInfo.blobSize)):(o=r.headerInfo.blobSize-r.ptr,Math.abs(o)>=1&&(r.eofOffset=r.headerInfo.blobSize));var f={width:I.width,height:I.height,pixelData:r.pixels.resultPixels,minValue:I.zMin,maxValue:I.zMax,validPixelCount:I.numValidPixel,dimCount:I.numDims,dimStats:{minValues:I.minValues,maxValues:I.maxValues},maskData:r.pixels.resultMask};if(r.pixels.resultMask&&Q.isValidPixelValue(I.imageType,t)){var c=r.pixels.resultMask;for(i=0;i<a;i++)c[i]||(f.pixelData[i]=t);f.noDataValue=t}return r.noDataValue=t,e.returnFileInfo&&(f.fileInfo=Q.formatFileInfo(r)),f},getBandCount:function(A){for(var e=0,t=0,i={ptr:0,pixels:{}};t<A.byteLength-58;)Q.readHeaderInfo(A,i),t+=i.headerInfo.blobSize,e++,i.ptr=t;return e}}),l=(s=new ArrayBuffer(4),f=new Uint8Array(s),new Uint32Array(s)[0]=1,1===f[0]),u={decode:function(A,e){if(!l)throw"Big endian system is not supported.";var t,i,r=(e=e||{}).inputOffset||0,I=new Uint8Array(A,r,10),g=String.fromCharCode.apply(null,I);if("CntZImage"===g.trim())t=c,i=1;else{if("Lerc2"!==g.substring(0,5))throw"Unexpected file identifier string: "+g;t=h,i=2}for(var n,a,o,B,C,Q,E=0,s=A.byteLength-10,f=[],u={width:0,height:0,pixels:[],pixelType:e.pixelType,mask:null,statistics:[]},w=0;r<s;){var d=t.decode(A,{inputOffset:r,encodedMaskData:n,maskData:o,returnMask:0===E,returnEncodedMask:0===E,returnFileInfo:!0,returnPixelInterleavedDims:e.returnPixelInterleavedDims,pixelType:e.pixelType||null,noDataValue:e.noDataValue||null});r=d.fileInfo.eofOffset,o=d.maskData,0===E&&(n=d.encodedMaskData,u.width=d.width,u.height=d.height,u.dimCount=d.dimCount||1,u.pixelType=d.pixelType||d.fileInfo.pixelType,u.mask=o),i>1&&(o&&f.push(o),d.fileInfo.mask&&d.fileInfo.mask.numBytes>0&&w++),E++,u.pixels.push(d.pixelData),u.statistics.push({minValue:d.minValue,maxValue:d.maxValue,noDataValue:d.noDataValue,dimStats:d.dimStats})}if(i>1&&w>1){for(Q=u.width*u.height,u.bandMasks=f,(o=new Uint8Array(Q)).set(f[0]),B=1;B<f.length;B++)for(a=f[B],C=0;C<Q;C++)o[C]=o[C]&a[C];u.maskData=o}return u}};TA.exports?TA.exports=u:this.Lerc=u}();var ZA,jA,WA,zA=XA.exports,$A={env:{emscripten_notify_memory_growth:function(A){WA=new Uint8Array(jA.exports.memory.buffer)}}},Ae=function(){function A(){B(this,A)}return Q(A,[{key:"init",value:function(){return ZA||(ZA="undefined"!=typeof fetch?fetch("data:application/wasm;base64,"+ee).then((function(A){return A.arrayBuffer()})).then((function(A){return WebAssembly.instantiate(A,$A)})).then(this._init):WebAssembly.instantiate(Buffer.from(ee,"base64"),$A).then(this._init))}},{key:"_init",value:function(A){jA=A.instance,$A.env.emscripten_notify_memory_growth(0)}},{key:"decode",value:function(A){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!jA)throw new Error("ZSTDDecoder: Await .init() before decoding.");var t=A.byteLength,i=jA.exports.malloc(t);WA.set(A,i),e=e||Number(jA.exports.ZSTD_findDecompressedSize(i,t));var r=jA.exports.malloc(e),I=jA.exports.ZSTD_decompress(r,e,i,t),g=WA.slice(r,r+I);return jA.exports.free(i),jA.exports.free(r),g}}]),A}(),ee="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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdBKGogACgCBBATQQAhBCAHQeAAaiEMIAdB5ABqIQoDQCAHQShqEARBAksgBCAXTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEJIAcoAkggBygCREEDdGopAgAiH0IgiKchCCAeQiCIISAgHUIgiKchAgJAIB9CEIinQf8BcSIDQQJPBEACQCAGRSADQRlJckUEQCAIIAdBKGogA0EgIAcoAixrIg0gDSADSxsiDRAFIAMgDWsiA3RqIQggB0EoahAEGiADRQ0BIAdBKGogAxAFIAhqIQgMAQsgB0EoaiADEAUgCGohCCAHQShqEAQaCyAHKQJUISEgByAINgJUIAcgITcDWAwBCwJAIANFBEAgAgRAIAcoAlQhCAwDCyAHKAJYIQgMAQsCQAJAIAdBKGpBARAFIAggAkVqaiIDQQNGBEAgBygCVEF/aiIDIANFaiEIDAELIANBAnQgB2ooAlQiCCAIRWohCCADQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAg2AlQLICCnIQMgCQRAIAdBKGogCRAFIANqIQMLIAkgC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgAmohAgsgB0EoahAEGiAHIAcoAmggAmoiCSADajYCaCAKIAwgCCAJSxsoAgAhDSAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogB0EoaiAfQhiIp0H/AXEQCCEOIAdB8ABqIARBBHRqIgsgCSANaiAIazYCDCALIAg2AgggCyADNgIEIAsgAjYCACAHIA4gH6dB//8DcWo2AkQgBEEBaiEEDAELCyAEIBdIDQEgEkFgaiEYIAdB4ABqIRogB0HkAGohGyABIQMDQCAHQShqEARBAksgBCAFTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEIIAcoAkggBygCREEDdGopAgAiH0IgiKchCSAeQiCIISAgHUIgiKchDAJAIB9CEIinQf8BcSICQQJPBEACQCAGRSACQRlJckUEQCAJIAdBKGogAkEgIAcoAixrIgogCiACSxsiChAFIAIgCmsiAnRqIQkgB0EoahAEGiACRQ0BIAdBKGogAhAFIAlqIQkMAQsgB0EoaiACEAUgCWohCSAHQShqEAQaCyAHKQJUISEgByAJNgJUIAcgITcDWAwBCwJAIAJFBEAgDARAIAcoAlQhCQwDCyAHKAJYIQkMAQsCQAJAIAdBKGpBARAFIAkgDEVqaiICQQNGBEAgBygCVEF/aiICIAJFaiEJDAELIAJBAnQgB2ooAlQiCSAJRWohCSACQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAk2AlQLICCnIRQgCARAIAdBKGogCBAFIBRqIRQLIAggC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgDGohDAsgB0EoahAEGiAHIAcoAmggDGoiGSAUajYCaCAbIBogCSAZSxsoAgAhHCAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogByAHQShqIB9CGIinQf8BcRAIIB+nQf//A3FqNgJEIAcgB0HwAGogBEEDcUEEdGoiDSkDCCIdNwPIASAHIA0pAwAiHjcDwAECQAJAAkAgBygCvAEiDiAepyICaiIWIBNLDQAgAyAHKALEASIKIAJqIgtqIBhLDQAgEiADayALQSBqTw0BCyAHIAcpA8gBNwMQIAcgBykDwAE3AwggAyASIAdBCGogB0G8AWogEyAPIBUgERAeIQsMAQsgAiADaiEIIAMgDhAHIAJBEU8EQCADQRBqIQIDQCACIA5BEGoiDhAHIAJBEGoiAiAISQ0ACwsgCCAdpyIOayECIAcgFjYCvAEgDiAIIA9rSwRAIA4gCCAVa0sEQEFsIQsMAgsgESACIA9rIgJqIhYgCmogEU0EQCAIIBYgChAPGgwCCyAIIBZBACACaxAPIQggByACIApqIgo2AsQBIAggAmshCCAPIQILIA5BEE8EQCAIIApqIQoDQCAIIAIQByACQRBqIQIgCEEQaiIIIApJDQALDAELAkAgDkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgDkECdCIKQcAeaigCAGoiAhAXIAIgCkHgHmooAgBrIQIgBygCxAEhCgwBCyAIIAIQDAsgCkEJSQ0AIAggCmohCiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAKSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAKSQ0ACwsgCxADBEAgCyEQDAQFIA0gDDYCACANIBkgHGogCWs2AgwgDSAJNgIIIA0gFDYCBCAEQQFqIQQgAyALaiEDDAILAAsLIAQgBUgNASAEIBdrIQtBACEEA0AgCyAFSARAIAcgB0HwAGogC0EDcUEEdGoiAikDCCIdNwPIASAHIAIpAwAiHjcDwAECQAJAAkAgBygCvAEiDCAepyICaiIKIBNLDQAgAyAHKALEASIJIAJqIhBqIBhLDQAgEiADayAQQSBqTw0BCyAHIAcpA8gBNwMgIAcgBykDwAE3AxggAyASIAdBGGogB0G8AWogEyAPIBUgERAeIRAMAQsgAiADaiEIIAMgDBAHIAJBEU8EQCADQRBqIQIDQCACIAxBEGoiDBAHIAJBEGoiAiAISQ0ACwsgCCAdpyIGayECIAcgCjYCvAEgBiAIIA9rSwRAIAYgCCAVa0sEQEFsIRAMAgsgESACIA9rIgJqIgwgCWogEU0EQCAIIAwgCRAPGgwCCyAIIAxBACACaxAPIQggByACIAlqIgk2AsQBIAggAmshCCAPIQILIAZBEE8EQCAIIAlqIQYDQCAIIAIQByACQRBqIQIgCEEQaiIIIAZJDQALDAELAkAgBkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgBkECdCIGQcAeaigCAGoiAhAXIAIgBkHgHmooAgBrIQIgBygCxAEhCQwBCyAIIAIQDAsgCUEJSQ0AIAggCWohBiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAGSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAGSQ0ACwsgEBADDQMgC0EBaiELIAMgEGohAwwBCwsDQCAEQQNHBEAgACAEQQJ0IgJqQazQAWogAiAHaigCVDYCACAEQQFqIQQMAQsLIAcoArwBIQgLQbp/IRAgEyAIayIAIBIgA2tLDQAgAwR/IAMgCCAAEAsgAGoFQQALIAFrIRALIAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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",te={315:"Artist",258:"BitsPerSample",265:"CellLength",264:"CellWidth",320:"ColorMap",259:"Compression",33432:"Copyright",306:"DateTime",338:"ExtraSamples",266:"FillOrder",289:"FreeByteCounts",288:"FreeOffsets",291:"GrayResponseCurve",290:"GrayResponseUnit",316:"HostComputer",270:"ImageDescription",257:"ImageLength",256:"ImageWidth",271:"Make",281:"MaxSampleValue",280:"MinSampleValue",272:"Model",254:"NewSubfileType",274:"Orientation",262:"PhotometricInterpretation",284:"PlanarConfiguration",296:"ResolutionUnit",278:"RowsPerStrip",277:"SamplesPerPixel",305:"Software",279:"StripByteCounts",273:"StripOffsets",255:"SubfileType",263:"Threshholding",282:"XResolution",283:"YResolution",326:"BadFaxLines",327:"CleanFaxData",343:"ClipPath",328:"ConsecutiveBadFaxLines",433:"Decode",434:"DefaultImageColor",269:"DocumentName",336:"DotRange",321:"HalftoneHints",346:"Indexed",347:"JPEGTables",285:"PageName",297:"PageNumber",317:"Predictor",319:"PrimaryChromaticities",532:"ReferenceBlackWhite",339:"SampleFormat",340:"SMinSampleValue",341:"SMaxSampleValue",559:"StripRowCounts",330:"SubIFDs",292:"T4Options",293:"T6Options",325:"TileByteCounts",323:"TileLength",324:"TileOffsets",322:"TileWidth",301:"TransferFunction",318:"WhitePoint",344:"XClipPathUnits",286:"XPosition",529:"YCbCrCoefficients",531:"YCbCrPositioning",530:"YCbCrSubSampling",345:"YClipPathUnits",287:"YPosition",37378:"ApertureValue",40961:"ColorSpace",36868:"DateTimeDigitized",36867:"DateTimeOriginal",34665:"Exif IFD",36864:"ExifVersion",33434:"ExposureTime",41728:"FileSource",37385:"Flash",40960:"FlashpixVersion",33437:"FNumber",42016:"ImageUniqueID",37384:"LightSource",37500:"MakerNote",37377:"ShutterSpeedValue",37510:"UserComment",33723:"IPTC",34675:"ICC Profile",700:"XMP",42112:"GDAL_METADATA",42113:"GDAL_NODATA",34377:"Photoshop",33550:"ModelPixelScale",33922:"ModelTiepoint",34264:"ModelTransformation",34735:"GeoKeyDirectory",34736:"GeoDoubleParams",34737:"GeoAsciiParams",50674:"LercParameters"},ie={};for(var re in te)te.hasOwnProperty(re)&&(ie[te[re]]=parseInt(re,10));ie.BitsPerSample,ie.ExtraSamples,ie.SampleFormat,ie.StripByteCounts,ie.StripOffsets,ie.StripRowCounts,ie.TileByteCounts,ie.TileOffsets,ie.SubIFDs;var Ie={1:"BYTE",2:"ASCII",3:"SHORT",4:"LONG",5:"RATIONAL",6:"SBYTE",7:"UNDEFINED",8:"SSHORT",9:"SLONG",10:"SRATIONAL",11:"FLOAT",12:"DOUBLE",13:"IFD",16:"LONG8",17:"SLONG8",18:"IFD8"},ge={};for(var ne in Ie)Ie.hasOwnProperty(ne)&&(ge[Ie[ne]]=parseInt(ne,10));var ae=1,oe=0,Be=1,Ce=2,Qe={1024:"GTModelTypeGeoKey",1025:"GTRasterTypeGeoKey",1026:"GTCitationGeoKey",2048:"GeographicTypeGeoKey",2049:"GeogCitationGeoKey",2050:"GeogGeodeticDatumGeoKey",2051:"GeogPrimeMeridianGeoKey",2052:"GeogLinearUnitsGeoKey",2053:"GeogLinearUnitSizeGeoKey",2054:"GeogAngularUnitsGeoKey",2055:"GeogAngularUnitSizeGeoKey",2056:"GeogEllipsoidGeoKey",2057:"GeogSemiMajorAxisGeoKey",2058:"GeogSemiMinorAxisGeoKey",2059:"GeogInvFlatteningGeoKey",2060:"GeogAzimuthUnitsGeoKey",2061:"GeogPrimeMeridianLongGeoKey",2062:"GeogTOWGS84GeoKey",3072:"ProjectedCSTypeGeoKey",3073:"PCSCitationGeoKey",3074:"ProjectionGeoKey",3075:"ProjCoordTransGeoKey",3076:"ProjLinearUnitsGeoKey",3077:"ProjLinearUnitSizeGeoKey",3078:"ProjStdParallel1GeoKey",3079:"ProjStdParallel2GeoKey",3080:"ProjNatOriginLongGeoKey",3081:"ProjNatOriginLatGeoKey",3082:"ProjFalseEastingGeoKey",3083:"ProjFalseNorthingGeoKey",3084:"ProjFalseOriginLongGeoKey",3085:"ProjFalseOriginLatGeoKey",3086:"ProjFalseOriginEastingGeoKey",3087:"ProjFalseOriginNorthingGeoKey",3088:"ProjCenterLongGeoKey",3089:"ProjCenterLatGeoKey",3090:"ProjCenterEastingGeoKey",3091:"ProjCenterNorthingGeoKey",3092:"ProjScaleAtNatOriginGeoKey",3093:"ProjScaleAtCenterGeoKey",3094:"ProjAzimuthAngleGeoKey",3095:"ProjStraightVertPoleLongGeoKey",3096:"ProjRectifiedGridAngleGeoKey",4096:"VerticalCSTypeGeoKey",4097:"VerticalCitationGeoKey",4098:"VerticalDatumGeoKey",4099:"VerticalUnitsGeoKey"},Ee={};for(var se in Qe)Qe.hasOwnProperty(se)&&(Ee[Qe[se]]=parseInt(se,10));function fe(A){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var t,i=c(A);if(e){var r=c(this).constructor;t=Reflect.construct(i,arguments,r)}else t=i.apply(this,arguments);return f(this,t)}}var ce=new Ae,he=function(A){s(t,w);var e=fe(t);function t(A){var i;return B(this,t),(i=e.call(this)).planarConfiguration=void 0!==A.PlanarConfiguration?A.PlanarConfiguration:1,i.samplesPerPixel=void 0!==A.SamplesPerPixel?A.SamplesPerPixel:1,i.addCompression=A.LercParameters[ae],i}return Q(t,[{key:"decodeBlock",value:function(A){switch(this.addCompression){case oe:break;case Be:A=YA(new Uint8Array(A)).buffer;break;case Ce:A=ce.decode(new Uint8Array(A)).buffer;break;default:throw new Error("Unsupported LERC additional compression method identifier: ".concat(this.addCompression))}return zA.decode(A,{returnPixelInterleavedDims:1===this.planarConfiguration}).pixels[0].buffer}}]),t}(),le=Object.freeze({__proto__:null,zstd:ce,default:he});function ue(A){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(A){return!1}}();return function(){var t,i=c(A);if(e){var r=c(this).constructor;t=Reflect.construct(i,arguments,r)}else t=i.apply(this,arguments);return f(this,t)}}var we=function(A){s(I,w);var t,i=ue(I);function I(){var A;if(B(this,I),A=i.call(this),"undefined"==typeof createImageBitmap)throw new Error("Cannot decode WebImage as `createImageBitmap` is not available");if("undefined"==typeof document&&"undefined"==typeof OffscreenCanvas)throw new Error("Cannot decode WebImage as neither `document` nor `OffscreenCanvas` is not available");return A}return Q(I,[{key:"decode",value:(t=e(r.mark((function A(e,t){var i,I,g,n;return r.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return i=new Blob([t]),A.next=3,createImageBitmap(i);case 3:return I=A.sent,"undefined"!=typeof document?((g=document.createElement("canvas")).width=I.width,g.height=I.height):g=new OffscreenCanvas(I.width,I.height),(n=g.getContext("2d")).drawImage(I,0,0),A.abrupt("return",n.getImageData(0,0,I.width,I.height).data.buffer);case 8:case"end":return A.stop()}}),A)}))),function(A,e){return t.apply(this,arguments)})}]),I}(),de=Object.freeze({__proto__:null,default:we});';
  return new e(typeof Buffer < "u" ? "data:application/javascript;base64," + Buffer.from(A2, "binary").toString("base64") : URL.createObjectURL(new Blob([A2], { type: "application/javascript" })));
}
var e;
var init_decoder_DJlmx386 = __esm(() => {
  e = Worker;
});

// node_modules/geotiff-tilesource/dist/main-8v7k2MJ1.js
var exports_main_8v7k2MJ1 = {};
__export(exports_main_8v7k2MJ1, {
  g: () => We2,
  e: () => qr,
  a: () => is,
  L: () => ss
});
function E2(i) {
  return (e2, ...t2) => gt2(i, e2, t2);
}
function H2(i, e2) {
  return E2(Ue2(i, e2).get);
}
function Rt2(i) {
  if (i[ee2] === Le2 && Q3.next === Ke2)
    return i;
  const e2 = pe2(kt2);
  return Pt2(He2, e2, It2(i)), e2;
}
function vt(i) {
  const e2 = i >> 10;
  return Ot2[0] = xe2[Xe2[e2] + (i & 1023)] + Y3[e2], Gt2[0];
}
function $e2(i, e2, ...t2) {
  return vt(Et2(i, e2, ...Rt2(t2)));
}
function We2(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
function Ze(i, e2, t2) {
  const r = t2 && t2.debug || false;
  r && console.log("[xml-utils] getting " + e2 + " in " + i);
  const s3 = typeof i == "object" ? i.outer : i, o = s3.slice(0, s3.indexOf(">") + 1), n = ['"', "'"];
  for (let a = 0;a < n.length; a++) {
    const l3 = n[a], c = e2 + "\\=" + l3 + "([^" + l3 + "]*)" + l3;
    r && console.log("[xml-utils] pattern:", c);
    const d3 = new RegExp(c).exec(o);
    if (r && console.log("[xml-utils] match:", d3), d3)
      return d3[1];
  }
}
function Je2(i, e2, t2) {
  const s3 = new RegExp(e2).exec(i.slice(t2));
  return s3 ? t2 + s3.index : -1;
}
function Qe2(i, e2, t2) {
  const s3 = new RegExp(e2).exec(i.slice(t2));
  return s3 ? t2 + s3.index + s3[0].length - 1 : -1;
}
function et2(i, e2) {
  const t2 = new RegExp(e2, "g"), r = i.match(t2);
  return r ? r.length : 0;
}
function tt2(i, e2, t2) {
  const r = t2 && t2.debug || false, s3 = !(t2 && typeof t2.nested === false), o = t2 && t2.startIndex || 0;
  r && console.log("[xml-utils] starting findTagByName with", e2, " and ", t2);
  const n = jt2(i, `<${e2}[ 
>/]`, o);
  if (r && console.log("[xml-utils] start:", n), n === -1)
    return;
  const a = i.slice(n + e2.length);
  let l3 = le3(a, "^[^<]*[ /]>", 0);
  const c = l3 !== -1 && a[l3 - 1] === "/";
  if (r && console.log("[xml-utils] selfClosing:", c), c === false)
    if (s3) {
      let g2 = 0, f2 = 1, y = 0;
      for (;(l3 = le3(a, "[ /]" + e2 + ">", g2)) !== -1; ) {
        const p2 = a.substring(g2, l3 + 1);
        if (f2 += Be2(p2, "<" + e2 + `[ 
	>]`), y += Be2(p2, "</" + e2 + ">"), y >= f2)
          break;
        g2 = l3;
      }
    } else
      l3 = le3(a, "[ /]" + e2 + ">", 0);
  const h = n + e2.length + l3 + 1;
  if (r && console.log("[xml-utils] end:", h), h === -1)
    return;
  const d3 = i.slice(n, h);
  let u;
  return c ? u = null : u = d3.slice(d3.indexOf(">") + 1, d3.lastIndexOf("<")), { inner: u, outer: d3, start: n, end: h };
}
function rt2(i, e2, t2) {
  const r = [], s3 = t2 && t2.debug || false, o = t2 && typeof t2.nested == "boolean" ? t2.nested : true;
  let n = t2 && t2.startIndex || 0, a;
  for (;a = Kt2(i, e2, { debug: s3, startIndex: n }); )
    o ? n = a.start + 1 + e2.length : n = a.end, r.push(a);
  return s3 && console.log("findTagsByName found", r.length, "tags"), r;
}
function $t2(i, e2) {
  const { width: t2, height: r } = i, s3 = new Uint8Array(t2 * r * 3);
  let o;
  for (let n = 0, a = 0;n < i.length; ++n, a += 3)
    o = 256 - i[n] / e2 * 256, s3[a] = o, s3[a + 1] = o, s3[a + 2] = o;
  return s3;
}
function Wt2(i, e2) {
  const { width: t2, height: r } = i, s3 = new Uint8Array(t2 * r * 3);
  let o;
  for (let n = 0, a = 0;n < i.length; ++n, a += 3)
    o = i[n] / e2 * 256, s3[a] = o, s3[a + 1] = o, s3[a + 2] = o;
  return s3;
}
function Zt2(i, e2) {
  const { width: t2, height: r } = i, s3 = new Uint8Array(t2 * r * 3), o = e2.length / 3, n = e2.length / 3 * 2;
  for (let a = 0, l3 = 0;a < i.length; ++a, l3 += 3) {
    const c = i[a];
    s3[l3] = e2[c] / 65536 * 256, s3[l3 + 1] = e2[c + o] / 65536 * 256, s3[l3 + 2] = e2[c + n] / 65536 * 256;
  }
  return s3;
}
function Jt2(i) {
  const { width: e2, height: t2 } = i, r = new Uint8Array(e2 * t2 * 3);
  for (let s3 = 0, o = 0;s3 < i.length; s3 += 4, o += 3) {
    const n = i[s3], a = i[s3 + 1], l3 = i[s3 + 2], c = i[s3 + 3];
    r[o] = 255 * ((255 - n) / 256) * ((255 - c) / 256), r[o + 1] = 255 * ((255 - a) / 256) * ((255 - c) / 256), r[o + 2] = 255 * ((255 - l3) / 256) * ((255 - c) / 256);
  }
  return r;
}
function Qt2(i) {
  const { width: e2, height: t2 } = i, r = new Uint8ClampedArray(e2 * t2 * 3);
  for (let s3 = 0, o = 0;s3 < i.length; s3 += 3, o += 3) {
    const n = i[s3], a = i[s3 + 1], l3 = i[s3 + 2];
    r[o] = n + 1.402 * (l3 - 128), r[o + 1] = n - 0.34414 * (a - 128) - 0.71414 * (l3 - 128), r[o + 2] = n + 1.772 * (a - 128);
  }
  return r;
}
function sr2(i) {
  const { width: e2, height: t2 } = i, r = new Uint8Array(e2 * t2 * 3);
  for (let s3 = 0, o = 0;s3 < i.length; s3 += 3, o += 3) {
    const n = i[s3 + 0], a = i[s3 + 1] << 24 >> 24, l3 = i[s3 + 2] << 24 >> 24;
    let c = (n + 16) / 116, h = a / 500 + c, d3 = c - l3 / 200, u, g2, f2;
    h = er2 * (h * h * h > 0.008856 ? h * h * h : (h - 16 / 116) / 7.787), c = tr2 * (c * c * c > 0.008856 ? c * c * c : (c - 16 / 116) / 7.787), d3 = rr2 * (d3 * d3 * d3 > 0.008856 ? d3 * d3 * d3 : (d3 - 16 / 116) / 7.787), u = h * 3.2406 + c * -1.5372 + d3 * -0.4986, g2 = h * -0.9689 + c * 1.8758 + d3 * 0.0415, f2 = h * 0.0557 + c * -0.204 + d3 * 1.057, u = u > 0.0031308 ? 1.055 * u ** (1 / 2.4) - 0.055 : 12.92 * u, g2 = g2 > 0.0031308 ? 1.055 * g2 ** (1 / 2.4) - 0.055 : 12.92 * g2, f2 = f2 > 0.0031308 ? 1.055 * f2 ** (1 / 2.4) - 0.055 : 12.92 * f2, r[o] = Math.max(0, Math.min(1, u)) * 255, r[o + 1] = Math.max(0, Math.min(1, g2)) * 255, r[o + 2] = Math.max(0, Math.min(1, f2)) * 255;
  }
  return r;
}
function j2(i, e2) {
  Array.isArray(i) || (i = [i]), i.forEach((t2) => st2.set(t2, e2));
}
async function it2(i) {
  const e2 = st2.get(i.Compression);
  if (!e2)
    throw new Error(`Unknown compression method identifier: ${i.Compression}`);
  const t2 = await e2();
  return new t2(i);
}
function ne3(i, e2, t2, r = 1) {
  return new (Object.getPrototypeOf(i)).constructor(e2 * t2 * r);
}
function ir2(i, e2, t2, r, s3) {
  const o = e2 / r, n = t2 / s3;
  return i.map((a) => {
    const l3 = ne3(a, r, s3);
    for (let c = 0;c < s3; ++c) {
      const h = Math.min(Math.round(n * c), t2 - 1);
      for (let d3 = 0;d3 < r; ++d3) {
        const u = Math.min(Math.round(o * d3), e2 - 1), g2 = a[h * e2 + u];
        l3[c * r + d3] = g2;
      }
    }
    return l3;
  });
}
function V2(i, e2, t2) {
  return (1 - t2) * i + t2 * e2;
}
function nr2(i, e2, t2, r, s3) {
  const o = e2 / r, n = t2 / s3;
  return i.map((a) => {
    const l3 = ne3(a, r, s3);
    for (let c = 0;c < s3; ++c) {
      const h = n * c, d3 = Math.floor(h), u = Math.min(Math.ceil(h), t2 - 1);
      for (let g2 = 0;g2 < r; ++g2) {
        const f2 = o * g2, y = f2 % 1, p2 = Math.floor(f2), w = Math.min(Math.ceil(f2), e2 - 1), m2 = a[d3 * e2 + p2], b = a[d3 * e2 + w], T2 = a[u * e2 + p2], S2 = a[u * e2 + w], D2 = V2(V2(m2, b, y), V2(T2, S2, y), h % 1);
        l3[c * r + g2] = D2;
      }
    }
    return l3;
  });
}
function or2(i, e2, t2, r, s3, o = "nearest") {
  switch (o.toLowerCase()) {
    case "nearest":
      return ir2(i, e2, t2, r, s3);
    case "bilinear":
    case "linear":
      return nr2(i, e2, t2, r, s3);
    default:
      throw new Error(`Unsupported resampling method: '${o}'`);
  }
}
function ar2(i, e2, t2, r, s3, o) {
  const n = e2 / r, a = t2 / s3, l3 = ne3(i, r, s3, o);
  for (let c = 0;c < s3; ++c) {
    const h = Math.min(Math.round(a * c), t2 - 1);
    for (let d3 = 0;d3 < r; ++d3) {
      const u = Math.min(Math.round(n * d3), e2 - 1);
      for (let g2 = 0;g2 < o; ++g2) {
        const f2 = i[h * e2 * o + u * o + g2];
        l3[c * r * o + d3 * o + g2] = f2;
      }
    }
  }
  return l3;
}
function lr2(i, e2, t2, r, s3, o) {
  const n = e2 / r, a = t2 / s3, l3 = ne3(i, r, s3, o);
  for (let c = 0;c < s3; ++c) {
    const h = a * c, d3 = Math.floor(h), u = Math.min(Math.ceil(h), t2 - 1);
    for (let g2 = 0;g2 < r; ++g2) {
      const f2 = n * g2, y = f2 % 1, p2 = Math.floor(f2), w = Math.min(Math.ceil(f2), e2 - 1);
      for (let m2 = 0;m2 < o; ++m2) {
        const b = i[d3 * e2 * o + p2 * o + m2], T2 = i[d3 * e2 * o + w * o + m2], S2 = i[u * e2 * o + p2 * o + m2], D2 = i[u * e2 * o + w * o + m2], M2 = V2(V2(b, T2, y), V2(S2, D2, y), h % 1);
        l3[c * r * o + g2 * o + m2] = M2;
      }
    }
  }
  return l3;
}
function cr2(i, e2, t2, r, s3, o, n = "nearest") {
  switch (n.toLowerCase()) {
    case "nearest":
      return ar2(i, e2, t2, r, s3, o);
    case "bilinear":
    case "linear":
      return lr2(i, e2, t2, r, s3, o);
    default:
      throw new Error(`Unsupported resampling method: '${n}'`);
  }
}
function hr2(i, e2, t2) {
  let r = 0;
  for (let s3 = e2;s3 < t2; ++s3)
    r += i[s3];
  return r;
}
function ue2(i, e2, t2) {
  switch (i) {
    case 1:
      if (e2 <= 8)
        return new Uint8Array(t2);
      if (e2 <= 16)
        return new Uint16Array(t2);
      if (e2 <= 32)
        return new Uint32Array(t2);
      break;
    case 2:
      if (e2 === 8)
        return new Int8Array(t2);
      if (e2 === 16)
        return new Int16Array(t2);
      if (e2 === 32)
        return new Int32Array(t2);
      break;
    case 3:
      switch (e2) {
        case 16:
        case 32:
          return new Float32Array(t2);
        case 64:
          return new Float64Array(t2);
      }
      break;
  }
  throw Error("Unsupported data format/bitsPerSample");
}
function fr2(i, e2) {
  return (i === 1 || i === 2) && e2 <= 32 && e2 % 8 === 0 ? false : !(i === 3 && (e2 === 16 || e2 === 32 || e2 === 64));
}
function ur2(i, e2, t2, r, s3, o, n) {
  const a = new DataView(i), l3 = t2 === 2 ? n * o : n * o * r, c = t2 === 2 ? 1 : r, h = ue2(e2, s3, l3), d3 = parseInt("1".repeat(s3), 2);
  if (e2 === 1) {
    let u;
    t2 === 1 ? u = r * s3 : u = s3;
    let g2 = o * u;
    g2 & 7 && (g2 = g2 + 7 & -8);
    for (let f2 = 0;f2 < n; ++f2) {
      const y = f2 * g2;
      for (let p2 = 0;p2 < o; ++p2) {
        const w = y + p2 * c * s3;
        for (let m2 = 0;m2 < c; ++m2) {
          const b = w + m2 * s3, T2 = (f2 * o + p2) * c + m2, S2 = Math.floor(b / 8), D2 = b % 8;
          if (D2 + s3 <= 8)
            h[T2] = a.getUint8(S2) >> 8 - s3 - D2 & d3;
          else if (D2 + s3 <= 16)
            h[T2] = a.getUint16(S2) >> 16 - s3 - D2 & d3;
          else if (D2 + s3 <= 24) {
            const M2 = a.getUint16(S2) << 8 | a.getUint8(S2 + 2);
            h[T2] = M2 >> 24 - s3 - D2 & d3;
          } else
            h[T2] = a.getUint32(S2) >> 32 - s3 - D2 & d3;
        }
      }
    }
  }
  return h.buffer;
}

class dr2 {
  constructor(e2, t2, r, s3, o, n) {
    this.fileDirectory = e2, this.geoKeys = t2, this.dataView = r, this.littleEndian = s3, this.tiles = o ? {} : null, this.isTiled = !e2.StripOffsets;
    const a = e2.PlanarConfiguration;
    if (this.planarConfiguration = typeof a > "u" ? 1 : a, this.planarConfiguration !== 1 && this.planarConfiguration !== 2)
      throw new Error("Invalid planar configuration.");
    this.source = n;
  }
  getFileDirectory() {
    return this.fileDirectory;
  }
  getGeoKeys() {
    return this.geoKeys;
  }
  getWidth() {
    return this.fileDirectory.ImageWidth;
  }
  getHeight() {
    return this.fileDirectory.ImageLength;
  }
  getSamplesPerPixel() {
    return typeof this.fileDirectory.SamplesPerPixel < "u" ? this.fileDirectory.SamplesPerPixel : 1;
  }
  getTileWidth() {
    return this.isTiled ? this.fileDirectory.TileWidth : this.getWidth();
  }
  getTileHeight() {
    return this.isTiled ? this.fileDirectory.TileLength : typeof this.fileDirectory.RowsPerStrip < "u" ? Math.min(this.fileDirectory.RowsPerStrip, this.getHeight()) : this.getHeight();
  }
  getBlockWidth() {
    return this.getTileWidth();
  }
  getBlockHeight(e2) {
    return this.isTiled || (e2 + 1) * this.getTileHeight() <= this.getHeight() ? this.getTileHeight() : this.getHeight() - e2 * this.getTileHeight();
  }
  getBytesPerPixel() {
    let e2 = 0;
    for (let t2 = 0;t2 < this.fileDirectory.BitsPerSample.length; ++t2)
      e2 += this.getSampleByteSize(t2);
    return e2;
  }
  getSampleByteSize(e2) {
    if (e2 >= this.fileDirectory.BitsPerSample.length)
      throw new RangeError(`Sample index ${e2} is out of range.`);
    return Math.ceil(this.fileDirectory.BitsPerSample[e2] / 8);
  }
  getReaderForSample(e2) {
    const t2 = this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[e2] : 1, r = this.fileDirectory.BitsPerSample[e2];
    switch (t2) {
      case 1:
        if (r <= 8)
          return DataView.prototype.getUint8;
        if (r <= 16)
          return DataView.prototype.getUint16;
        if (r <= 32)
          return DataView.prototype.getUint32;
        break;
      case 2:
        if (r <= 8)
          return DataView.prototype.getInt8;
        if (r <= 16)
          return DataView.prototype.getInt16;
        if (r <= 32)
          return DataView.prototype.getInt32;
        break;
      case 3:
        switch (r) {
          case 16:
            return function(s3, o) {
              return $e2(this, s3, o);
            };
          case 32:
            return DataView.prototype.getFloat32;
          case 64:
            return DataView.prototype.getFloat64;
        }
        break;
    }
    throw Error("Unsupported data format/bitsPerSample");
  }
  getSampleFormat(e2 = 0) {
    return this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[e2] : 1;
  }
  getBitsPerSample(e2 = 0) {
    return this.fileDirectory.BitsPerSample[e2];
  }
  getArrayForSample(e2, t2) {
    const r = this.getSampleFormat(e2), s3 = this.getBitsPerSample(e2);
    return ue2(r, s3, t2);
  }
  async getTileOrStrip(e2, t2, r, s3, o) {
    const n = Math.ceil(this.getWidth() / this.getTileWidth()), a = Math.ceil(this.getHeight() / this.getTileHeight());
    let l3;
    const { tiles: c } = this;
    this.planarConfiguration === 1 ? l3 = t2 * n + e2 : this.planarConfiguration === 2 && (l3 = r * n * a + t2 * n + e2);
    let h, d3;
    this.isTiled ? (h = this.fileDirectory.TileOffsets[l3], d3 = this.fileDirectory.TileByteCounts[l3]) : (h = this.fileDirectory.StripOffsets[l3], d3 = this.fileDirectory.StripByteCounts[l3]);
    const u = (await this.source.fetch([{ offset: h, length: d3 }], o))[0];
    let g2;
    return c === null || !c[l3] ? (g2 = (async () => {
      let f2 = await s3.decode(this.fileDirectory, u);
      const y = this.getSampleFormat(), p2 = this.getBitsPerSample();
      return fr2(y, p2) && (f2 = ur2(f2, y, this.planarConfiguration, this.getSamplesPerPixel(), p2, this.getTileWidth(), this.getBlockHeight(t2))), f2;
    })(), c !== null && (c[l3] = g2)) : g2 = c[l3], { x: e2, y: t2, sample: r, data: await g2 };
  }
  async _readRaster(e2, t2, r, s3, o, n, a, l3, c) {
    const h = this.getTileWidth(), d3 = this.getTileHeight(), u = this.getWidth(), g2 = this.getHeight(), f2 = Math.max(Math.floor(e2[0] / h), 0), y = Math.min(Math.ceil(e2[2] / h), Math.ceil(u / h)), p2 = Math.max(Math.floor(e2[1] / d3), 0), w = Math.min(Math.ceil(e2[3] / d3), Math.ceil(g2 / d3)), m2 = e2[2] - e2[0];
    let b = this.getBytesPerPixel();
    const T2 = [], S2 = [];
    for (let I2 = 0;I2 < t2.length; ++I2)
      this.planarConfiguration === 1 ? T2.push(hr2(this.fileDirectory.BitsPerSample, 0, t2[I2]) / 8) : T2.push(0), S2.push(this.getReaderForSample(t2[I2]));
    const D2 = [], { littleEndian: M2 } = this;
    for (let I2 = p2;I2 < w; ++I2)
      for (let C2 = f2;C2 < y; ++C2) {
        let O3;
        this.planarConfiguration === 1 && (O3 = this.getTileOrStrip(C2, I2, 0, o, c));
        for (let P2 = 0;P2 < t2.length; ++P2) {
          const F2 = P2, G2 = t2[P2];
          this.planarConfiguration === 2 && (b = this.getSampleByteSize(G2), O3 = this.getTileOrStrip(C2, I2, G2, o, c));
          const L2 = O3.then((B3) => {
            const N3 = B3.data, te2 = new DataView(N3), X2 = this.getBlockHeight(B3.y), $3 = B3.y * d3, re2 = B3.x * h, ot2 = $3 + X2, at2 = (B3.x + 1) * h, lt2 = S2[F2], ct2 = Math.min(X2, X2 - (ot2 - e2[3]), g2 - $3), ht2 = Math.min(h, h - (at2 - e2[2]), u - re2);
            for (let W3 = Math.max(0, e2[1] - $3);W3 < ct2; ++W3)
              for (let Z3 = Math.max(0, e2[0] - re2);Z3 < ht2; ++Z3) {
                const ft2 = (W3 * h + Z3) * b, Re2 = lt2.call(te2, ft2 + T2[F2], M2);
                let se2;
                s3 ? (se2 = (W3 + $3 - e2[1]) * m2 * t2.length + (Z3 + re2 - e2[0]) * t2.length + F2, r[se2] = Re2) : (se2 = (W3 + $3 - e2[1]) * m2 + Z3 + re2 - e2[0], r[F2][se2] = Re2);
              }
          });
          D2.push(L2);
        }
      }
    if (await Promise.all(D2), n && e2[2] - e2[0] !== n || a && e2[3] - e2[1] !== a) {
      let I2;
      return s3 ? I2 = cr2(r, e2[2] - e2[0], e2[3] - e2[1], n, a, t2.length, l3) : I2 = or2(r, e2[2] - e2[0], e2[3] - e2[1], n, a, l3), I2.width = n, I2.height = a, I2;
    }
    return r.width = n || e2[2] - e2[0], r.height = a || e2[3] - e2[1], r;
  }
  async readRasters({
    window: e2,
    samples: t2 = [],
    interleave: r,
    pool: s3 = null,
    width: o,
    height: n,
    resampleMethod: a,
    fillValue: l3,
    signal: c
  } = {}) {
    const h = e2 || [0, 0, this.getWidth(), this.getHeight()];
    if (h[0] > h[2] || h[1] > h[3])
      throw new Error("Invalid subsets");
    const d3 = h[2] - h[0], u = h[3] - h[1], g2 = d3 * u, f2 = this.getSamplesPerPixel();
    if (!t2 || !t2.length)
      for (let m2 = 0;m2 < f2; ++m2)
        t2.push(m2);
    else
      for (let m2 = 0;m2 < t2.length; ++m2)
        if (t2[m2] >= f2)
          return Promise.reject(new RangeError(`Invalid sample index '${t2[m2]}'.`));
    let y;
    if (r) {
      const m2 = this.fileDirectory.SampleFormat ? Math.max.apply(null, this.fileDirectory.SampleFormat) : 1, b = Math.max.apply(null, this.fileDirectory.BitsPerSample);
      y = ue2(m2, b, g2 * t2.length), l3 && y.fill(l3);
    } else {
      y = [];
      for (let m2 = 0;m2 < t2.length; ++m2) {
        const b = this.getArrayForSample(t2[m2], g2);
        Array.isArray(l3) && m2 < l3.length ? b.fill(l3[m2]) : l3 && !Array.isArray(l3) && b.fill(l3), y.push(b);
      }
    }
    const p2 = s3 || await it2(this.fileDirectory);
    return await this._readRaster(h, t2, y, r, p2, o, n, a, c);
  }
  async readRGB({
    window: e2,
    interleave: t2 = true,
    pool: r = null,
    width: s3,
    height: o,
    resampleMethod: n,
    enableAlpha: a = false,
    signal: l3
  } = {}) {
    const c = e2 || [0, 0, this.getWidth(), this.getHeight()];
    if (c[0] > c[2] || c[1] > c[3])
      throw new Error("Invalid subsets");
    const h = this.fileDirectory.PhotometricInterpretation;
    if (h === A2.RGB) {
      let w = [0, 1, 2];
      if (this.fileDirectory.ExtraSamples !== Yt2.Unspecified && a) {
        w = [];
        for (let m2 = 0;m2 < this.fileDirectory.BitsPerSample.length; m2 += 1)
          w.push(m2);
      }
      return this.readRasters({
        window: e2,
        interleave: t2,
        samples: w,
        pool: r,
        width: s3,
        height: o,
        resampleMethod: n,
        signal: l3
      });
    }
    let d3;
    switch (h) {
      case A2.WhiteIsZero:
      case A2.BlackIsZero:
      case A2.Palette:
        d3 = [0];
        break;
      case A2.CMYK:
        d3 = [0, 1, 2, 3];
        break;
      case A2.YCbCr:
      case A2.CIELab:
        d3 = [0, 1, 2];
        break;
      default:
        throw new Error("Invalid or unsupported photometric interpretation.");
    }
    const u = {
      window: c,
      interleave: true,
      samples: d3,
      pool: r,
      width: s3,
      height: o,
      resampleMethod: n,
      signal: l3
    }, { fileDirectory: g2 } = this, f2 = await this.readRasters(u), y = 2 ** this.fileDirectory.BitsPerSample[0];
    let p2;
    switch (h) {
      case A2.WhiteIsZero:
        p2 = $t2(f2, y);
        break;
      case A2.BlackIsZero:
        p2 = Wt2(f2, y);
        break;
      case A2.Palette:
        p2 = Zt2(f2, g2.ColorMap);
        break;
      case A2.CMYK:
        p2 = Jt2(f2);
        break;
      case A2.YCbCr:
        p2 = Qt2(f2);
        break;
      case A2.CIELab:
        p2 = sr2(f2);
        break;
      default:
        throw new Error("Unsupported photometric interpretation.");
    }
    if (!t2) {
      const w = new Uint8Array(p2.length / 3), m2 = new Uint8Array(p2.length / 3), b = new Uint8Array(p2.length / 3);
      for (let T2 = 0, S2 = 0;T2 < p2.length; T2 += 3, ++S2)
        w[S2] = p2[T2], m2[S2] = p2[T2 + 1], b[S2] = p2[T2 + 2];
      p2 = [w, m2, b];
    }
    return p2.width = f2.width, p2.height = f2.height, p2;
  }
  getTiePoints() {
    if (!this.fileDirectory.ModelTiepoint)
      return [];
    const e2 = [];
    for (let t2 = 0;t2 < this.fileDirectory.ModelTiepoint.length; t2 += 6)
      e2.push({
        i: this.fileDirectory.ModelTiepoint[t2],
        j: this.fileDirectory.ModelTiepoint[t2 + 1],
        k: this.fileDirectory.ModelTiepoint[t2 + 2],
        x: this.fileDirectory.ModelTiepoint[t2 + 3],
        y: this.fileDirectory.ModelTiepoint[t2 + 4],
        z: this.fileDirectory.ModelTiepoint[t2 + 5]
      });
    return e2;
  }
  getGDALMetadata(e2 = null) {
    const t2 = {};
    if (!this.fileDirectory.GDAL_METADATA)
      return null;
    const r = this.fileDirectory.GDAL_METADATA;
    let s3 = qt2(r, "Item");
    e2 === null ? s3 = s3.filter((o) => ae2(o, "sample") === undefined) : s3 = s3.filter((o) => Number(ae2(o, "sample")) === e2);
    for (let o = 0;o < s3.length; ++o) {
      const n = s3[o];
      t2[ae2(n, "name")] = n.inner;
    }
    return t2;
  }
  getGDALNoData() {
    if (!this.fileDirectory.GDAL_NODATA)
      return null;
    const e2 = this.fileDirectory.GDAL_NODATA;
    return Number(e2.substring(0, e2.length - 1));
  }
  getOrigin() {
    const e2 = this.fileDirectory.ModelTiepoint, t2 = this.fileDirectory.ModelTransformation;
    if (e2 && e2.length === 6)
      return [
        e2[3],
        e2[4],
        e2[5]
      ];
    if (t2)
      return [
        t2[3],
        t2[7],
        t2[11]
      ];
    throw new Error("The image does not have an affine transformation.");
  }
  getResolution(e2 = null) {
    const t2 = this.fileDirectory.ModelPixelScale, r = this.fileDirectory.ModelTransformation;
    if (t2)
      return [
        t2[0],
        -t2[1],
        t2[2]
      ];
    if (r)
      return r[1] === 0 && r[4] === 0 ? [
        r[0],
        -r[5],
        r[10]
      ] : [
        Math.sqrt(r[0] * r[0] + r[4] * r[4]),
        -Math.sqrt(r[1] * r[1] + r[5] * r[5]),
        r[10]
      ];
    if (e2) {
      const [s3, o, n] = e2.getResolution();
      return [
        s3 * e2.getWidth() / this.getWidth(),
        o * e2.getHeight() / this.getHeight(),
        n * e2.getWidth() / this.getWidth()
      ];
    }
    throw new Error("The image does not have an affine transformation.");
  }
  pixelIsArea() {
    return this.geoKeys.GTRasterTypeGeoKey === 1;
  }
  getBoundingBox(e2 = false) {
    const t2 = this.getHeight(), r = this.getWidth();
    if (this.fileDirectory.ModelTransformation && !e2) {
      const [s3, o, n, a, l3, c, h, d3] = this.fileDirectory.ModelTransformation, g2 = [
        [0, 0],
        [0, t2],
        [r, 0],
        [r, t2]
      ].map(([p2, w]) => [
        a + s3 * p2 + o * w,
        d3 + l3 * p2 + c * w
      ]), f2 = g2.map((p2) => p2[0]), y = g2.map((p2) => p2[1]);
      return [
        Math.min(...f2),
        Math.min(...y),
        Math.max(...f2),
        Math.max(...y)
      ];
    } else {
      const s3 = this.getOrigin(), o = this.getResolution(), n = s3[0], a = s3[1], l3 = n + o[0] * r, c = a + o[1] * t2;
      return [
        Math.min(n, l3),
        Math.min(a, c),
        Math.max(n, l3),
        Math.max(a, c)
      ];
    }
  }
}

class gr {
  constructor(e2) {
    this._dataView = new DataView(e2);
  }
  get buffer() {
    return this._dataView.buffer;
  }
  getUint64(e2, t2) {
    const r = this.getUint32(e2, t2), s3 = this.getUint32(e2 + 4, t2);
    let o;
    if (t2) {
      if (o = r + 2 ** 32 * s3, !Number.isSafeInteger(o))
        throw new Error(`${o} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
      return o;
    }
    if (o = 2 ** 32 * r + s3, !Number.isSafeInteger(o))
      throw new Error(`${o} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
    return o;
  }
  getInt64(e2, t2) {
    let r = 0;
    const s3 = (this._dataView.getUint8(e2 + (t2 ? 7 : 0)) & 128) > 0;
    let o = true;
    for (let n = 0;n < 8; n++) {
      let a = this._dataView.getUint8(e2 + (t2 ? n : 7 - n));
      s3 && (o ? a !== 0 && (a = ~(a - 1) & 255, o = false) : a = ~a & 255), r += a * 256 ** n;
    }
    return s3 && (r = -r), r;
  }
  getUint8(e2, t2) {
    return this._dataView.getUint8(e2, t2);
  }
  getInt8(e2, t2) {
    return this._dataView.getInt8(e2, t2);
  }
  getUint16(e2, t2) {
    return this._dataView.getUint16(e2, t2);
  }
  getInt16(e2, t2) {
    return this._dataView.getInt16(e2, t2);
  }
  getUint32(e2, t2) {
    return this._dataView.getUint32(e2, t2);
  }
  getInt32(e2, t2) {
    return this._dataView.getInt32(e2, t2);
  }
  getFloat16(e2, t2) {
    return $e2(this._dataView, e2, t2);
  }
  getFloat32(e2, t2) {
    return this._dataView.getFloat32(e2, t2);
  }
  getFloat64(e2, t2) {
    return this._dataView.getFloat64(e2, t2);
  }
}

class yr {
  constructor(e2, t2, r, s3) {
    this._dataView = new DataView(e2), this._sliceOffset = t2, this._littleEndian = r, this._bigTiff = s3;
  }
  get sliceOffset() {
    return this._sliceOffset;
  }
  get sliceTop() {
    return this._sliceOffset + this.buffer.byteLength;
  }
  get littleEndian() {
    return this._littleEndian;
  }
  get bigTiff() {
    return this._bigTiff;
  }
  get buffer() {
    return this._dataView.buffer;
  }
  covers(e2, t2) {
    return this.sliceOffset <= e2 && this.sliceTop >= e2 + t2;
  }
  readUint8(e2) {
    return this._dataView.getUint8(e2 - this._sliceOffset, this._littleEndian);
  }
  readInt8(e2) {
    return this._dataView.getInt8(e2 - this._sliceOffset, this._littleEndian);
  }
  readUint16(e2) {
    return this._dataView.getUint16(e2 - this._sliceOffset, this._littleEndian);
  }
  readInt16(e2) {
    return this._dataView.getInt16(e2 - this._sliceOffset, this._littleEndian);
  }
  readUint32(e2) {
    return this._dataView.getUint32(e2 - this._sliceOffset, this._littleEndian);
  }
  readInt32(e2) {
    return this._dataView.getInt32(e2 - this._sliceOffset, this._littleEndian);
  }
  readFloat32(e2) {
    return this._dataView.getFloat32(e2 - this._sliceOffset, this._littleEndian);
  }
  readFloat64(e2) {
    return this._dataView.getFloat64(e2 - this._sliceOffset, this._littleEndian);
  }
  readUint64(e2) {
    const t2 = this.readUint32(e2), r = this.readUint32(e2 + 4);
    let s3;
    if (this._littleEndian) {
      if (s3 = t2 + 2 ** 32 * r, !Number.isSafeInteger(s3))
        throw new Error(`${s3} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
      return s3;
    }
    if (s3 = 2 ** 32 * t2 + r, !Number.isSafeInteger(s3))
      throw new Error(`${s3} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
    return s3;
  }
  readInt64(e2) {
    let t2 = 0;
    const r = (this._dataView.getUint8(e2 + (this._littleEndian ? 7 : 0)) & 128) > 0;
    let s3 = true;
    for (let o = 0;o < 8; o++) {
      let n = this._dataView.getUint8(e2 + (this._littleEndian ? o : 7 - o));
      r && (s3 ? n !== 0 && (n = ~(n - 1) & 255, s3 = false) : n = ~n & 255), t2 += n * 256 ** o;
    }
    return r && (t2 = -t2), t2;
  }
  readOffset(e2) {
    return this._bigTiff ? this.readUint64(e2) : this.readUint32(e2);
  }
}

class mr {
  constructor(e2 = pr, t2) {
    this.workers = null, this._awaitingDecoder = null, this.size = e2, this.messageId = 0, e2 && (this._awaitingDecoder = t2 ? Promise.resolve(t2) : new Promise((r) => {
      Promise.resolve().then(() => (init_decoder_DJlmx386(), exports_decoder_DJlmx386)).then((s3) => {
        r(s3.create);
      });
    }), this._awaitingDecoder.then((r) => {
      this._awaitingDecoder = null, this.workers = [];
      for (let s3 = 0;s3 < e2; s3++)
        this.workers.push({ worker: r(), idle: true });
    }));
  }
  async decode(e2, t2) {
    return this._awaitingDecoder && await this._awaitingDecoder, this.size === 0 ? it2(e2).then((r) => r.decode(e2, t2)) : new Promise((r) => {
      const s3 = this.workers.find((a) => a.idle) || this.workers[Math.floor(Math.random() * this.size)];
      s3.idle = false;
      const o = this.messageId++, n = (a) => {
        a.data.id === o && (s3.idle = true, r(a.data.decoded), s3.worker.removeEventListener("message", n));
      };
      s3.worker.addEventListener("message", n), s3.worker.postMessage({ fileDirectory: e2, buffer: t2, id: o }, [t2]);
    });
  }
  destroy() {
    this.workers && (this.workers.forEach((e2) => {
      e2.worker.terminate();
    }), this.workers = null);
  }
}
function nt2(i) {
  if (typeof Object.fromEntries < "u")
    return Object.fromEntries(i);
  const e2 = {};
  for (const [t2, r] of i)
    e2[t2.toLowerCase()] = r;
  return e2;
}
function wr2(i) {
  const e2 = i.split(`\r
`).map((t2) => {
    const r = t2.split(":").map((s3) => s3.trim());
    return r[0] = r[0].toLowerCase(), r;
  });
  return nt2(e2);
}
function xr(i) {
  const [e2, ...t2] = i.split(";").map((s3) => s3.trim()), r = t2.map((s3) => s3.split("="));
  return { type: e2, params: nt2(r) };
}
function de2(i) {
  let e2, t2, r;
  return i && ([, e2, t2, r] = i.match(/bytes (\d+)-(\d+)\/(\d+)/), e2 = parseInt(e2, 10), t2 = parseInt(t2, 10), r = parseInt(r, 10)), { start: e2, end: t2, total: r };
}
function br2(i, e2) {
  let t2 = null;
  const r = new TextDecoder("ascii"), s3 = [], o = `--${e2}`, n = `${o}--`;
  for (let a = 0;a < 10; ++a)
    r.decode(new Uint8Array(i, a, o.length)) === o && (t2 = a);
  if (t2 === null)
    throw new Error("Could not find initial boundary");
  for (;t2 < i.byteLength; ) {
    const a = r.decode(new Uint8Array(i, t2, Math.min(o.length + 1024, i.byteLength - t2)));
    if (a.length === 0 || a.startsWith(n))
      break;
    if (!a.startsWith(o))
      throw new Error("Part does not start with boundary");
    const l3 = a.substr(o.length + 2);
    if (l3.length === 0)
      break;
    const c = l3.indexOf(Ge2), h = wr2(l3.substr(0, c)), { start: d3, end: u, total: g2 } = de2(h["content-range"]), f2 = t2 + o.length + c + Ge2.length, y = parseInt(u, 10) + 1 - parseInt(d3, 10);
    s3.push({
      headers: h,
      data: i.slice(f2, f2 + y),
      offset: d3,
      length: y,
      fileSize: g2
    }), t2 = f2 + y + 4;
  }
  return s3;
}

class Ce2 {
  async fetch(e2, t2 = undefined) {
    return Promise.all(e2.map((r) => this.fetchSlice(r, t2)));
  }
  async fetchSlice(e2) {
    throw new Error(`fetching of slice ${e2} not possible, not implemented`);
  }
  get fileSize() {
    return null;
  }
  async close() {}
}
async function Tr(i) {
  return new Promise((e2) => setTimeout(e2, i));
}
function Sr(i, e2) {
  const t2 = Array.isArray(i) ? i : Array.from(i), r = Array.isArray(e2) ? e2 : Array.from(e2);
  return t2.map((s3, o) => [s3, r[o]]);
}

class Cr {
  constructor(e2, t2, r = null) {
    this.offset = e2, this.length = t2, this.data = r;
  }
  get top() {
    return this.offset + this.length;
  }
}

class Oe2 {
  constructor(e2, t2, r) {
    this.offset = e2, this.length = t2, this.blockIds = r;
  }
}

class Fe2 {
  get ok() {
    return this.status >= 200 && this.status <= 299;
  }
  get status() {
    throw new Error("not implemented");
  }
  getHeader(e2) {
    throw new Error("not implemented");
  }
  async getData() {
    throw new Error("not implemented");
  }
}

class Ee2 {
  constructor(e2) {
    this.url = e2;
  }
  async request({ headers: e2, signal: t2 } = {}) {
    throw new Error("request is not implemented");
  }
}
function ke2(i, { blockSize: e2, cacheSize: t2 }) {
  return e2 === null ? i : new Fr(i, { blockSize: e2, cacheSize: t2 });
}
function Gr(i, { headers: e2 = {}, credentials: t2, maxRanges: r = 0, allowFullFile: s3 = false, ...o } = {}) {
  const n = new Pr(i, t2), a = new Pe2(n, e2, r, s3);
  return ke2(a, o);
}
function Or(i, { headers: e2 = {}, maxRanges: t2 = 0, allowFullFile: r = false, ...s3 } = {}) {
  const o = new Rr(i), n = new Pe2(o, e2, t2, r);
  return ke2(n, s3);
}
function vr(i, { headers: e2 = {}, maxRanges: t2 = 0, allowFullFile: r = false, ...s3 } = {}) {
  const o = new Br(i), n = new Pe2(o, e2, t2, r);
  return ke2(n, s3);
}
function _r2(i, { forceXHR: e2 = false, ...t2 } = {}) {
  return typeof fetch == "function" && !e2 ? Gr(i, t2) : typeof XMLHttpRequest < "u" ? Or(i, t2) : vr(i, t2);
}
function Lr(i) {
  return new Ur(i);
}
function ge2(i) {
  switch (i) {
    case x3.BYTE:
    case x3.ASCII:
    case x3.SBYTE:
    case x3.UNDEFINED:
      return 1;
    case x3.SHORT:
    case x3.SSHORT:
      return 2;
    case x3.LONG:
    case x3.SLONG:
    case x3.FLOAT:
    case x3.IFD:
      return 4;
    case x3.RATIONAL:
    case x3.SRATIONAL:
    case x3.DOUBLE:
    case x3.LONG8:
    case x3.SLONG8:
    case x3.IFD8:
      return 8;
    default:
      throw new RangeError(`Invalid field type: ${i}`);
  }
}
function Nr(i) {
  const e2 = i.GeoKeyDirectory;
  if (!e2)
    return null;
  const t2 = {};
  for (let r = 4;r <= e2[3] * 4; r += 4) {
    const s3 = Xt2[e2[r]], o = e2[r + 1] ? J[e2[r + 1]] : null, n = e2[r + 2], a = e2[r + 3];
    let l3 = null;
    if (!o)
      l3 = a;
    else {
      if (l3 = i[o], typeof l3 > "u" || l3 === null)
        throw new Error(`Could not get value of geoKey '${s3}'.`);
      typeof l3 == "string" ? l3 = l3.substring(a, a + n - 1) : l3.subarray && (l3 = l3.subarray(a, a + n), n === 1 && (l3 = l3[0]));
    }
    t2[s3] = l3;
  }
  return t2;
}
function K3(i, e2, t2, r) {
  let s3 = null, o = null;
  const n = ge2(e2);
  switch (e2) {
    case x3.BYTE:
    case x3.ASCII:
    case x3.UNDEFINED:
      s3 = new Uint8Array(t2), o = i.readUint8;
      break;
    case x3.SBYTE:
      s3 = new Int8Array(t2), o = i.readInt8;
      break;
    case x3.SHORT:
      s3 = new Uint16Array(t2), o = i.readUint16;
      break;
    case x3.SSHORT:
      s3 = new Int16Array(t2), o = i.readInt16;
      break;
    case x3.LONG:
    case x3.IFD:
      s3 = new Uint32Array(t2), o = i.readUint32;
      break;
    case x3.SLONG:
      s3 = new Int32Array(t2), o = i.readInt32;
      break;
    case x3.LONG8:
    case x3.IFD8:
      s3 = new Array(t2), o = i.readUint64;
      break;
    case x3.SLONG8:
      s3 = new Array(t2), o = i.readInt64;
      break;
    case x3.RATIONAL:
      s3 = new Uint32Array(t2 * 2), o = i.readUint32;
      break;
    case x3.SRATIONAL:
      s3 = new Int32Array(t2 * 2), o = i.readInt32;
      break;
    case x3.FLOAT:
      s3 = new Float32Array(t2), o = i.readFloat32;
      break;
    case x3.DOUBLE:
      s3 = new Float64Array(t2), o = i.readFloat64;
      break;
    default:
      throw new RangeError(`Invalid field type: ${e2}`);
  }
  if (e2 === x3.RATIONAL || e2 === x3.SRATIONAL)
    for (let a = 0;a < t2; a += 2)
      s3[a] = o.call(i, r + a * n), s3[a + 1] = o.call(i, r + (a * n + 4));
  else
    for (let a = 0;a < t2; ++a)
      s3[a] = o.call(i, r + a * n);
  return e2 === x3.ASCII ? new TextDecoder("utf-8").decode(s3) : s3;
}

class jr {
  constructor(e2, t2, r) {
    this.fileDirectory = e2, this.geoKeyDirectory = t2, this.nextIFDByteOffset = r;
  }
}

class zr {
  async readRasters(e2 = {}) {
    const { window: t2, width: r, height: s3 } = e2;
    let { resX: o, resY: n, bbox: a } = e2;
    const l3 = await this.getImage();
    let c = l3;
    const h = await this.getImageCount(), d3 = l3.getBoundingBox();
    if (t2 && a)
      throw new Error('Both "bbox" and "window" passed.');
    if (r || s3) {
      if (t2) {
        const [f2, y] = l3.getOrigin(), [p2, w] = l3.getResolution();
        a = [
          f2 + t2[0] * p2,
          y + t2[1] * w,
          f2 + t2[2] * p2,
          y + t2[3] * w
        ];
      }
      const g2 = a || d3;
      if (r) {
        if (o)
          throw new Error("Both width and resX passed");
        o = (g2[2] - g2[0]) / r;
      }
      if (s3) {
        if (n)
          throw new Error("Both width and resY passed");
        n = (g2[3] - g2[1]) / s3;
      }
    }
    if (o || n) {
      const g2 = [];
      for (let f2 = 0;f2 < h; ++f2) {
        const y = await this.getImage(f2), { SubfileType: p2, NewSubfileType: w } = y.fileDirectory;
        (f2 === 0 || p2 === 2 || w & 1) && g2.push(y);
      }
      g2.sort((f2, y) => f2.getWidth() - y.getWidth());
      for (let f2 = 0;f2 < g2.length; ++f2) {
        const y = g2[f2], p2 = (d3[2] - d3[0]) / y.getWidth(), w = (d3[3] - d3[1]) / y.getHeight();
        if (c = y, o && o > p2 || n && n > w)
          break;
      }
    }
    let u = t2;
    if (a) {
      const [g2, f2] = l3.getOrigin(), [y, p2] = c.getResolution(l3);
      u = [
        Math.round((a[0] - g2) / y),
        Math.round((a[1] - f2) / p2),
        Math.round((a[2] - g2) / y),
        Math.round((a[3] - f2) / p2)
      ], u = [
        Math.min(u[0], u[2]),
        Math.min(u[1], u[3]),
        Math.max(u[0], u[2]),
        Math.max(u[1], u[3])
      ];
    }
    return c.readRasters({ ...e2, window: u });
  }
}
async function ve2(i, e2 = {}, t2) {
  return oe2.fromSource(_r2(i, e2), t2);
}
async function _e2(i, e2) {
  return oe2.fromSource(Lr(i), e2);
}

class fe3 {
  constructor() {
    this.promise = new Promise((e2, t2) => {
      this.reject = t2, this.resolve = e2;
    });
  }
}

class z {
  static RGBAfromYCbCr(e2) {
    const t2 = new Uint8ClampedArray(e2.length * 4 / 3);
    let r, s3;
    for (r = 0, s3 = 0;r < e2.length; r += 3, s3 += 4) {
      const o = e2[r], n = e2[r + 1], a = e2[r + 2];
      t2[s3] = o + 1.402 * (a - 128), t2[s3 + 1] = o - 0.34414 * (n - 128) - 0.71414 * (a - 128), t2[s3 + 2] = o + 1.772 * (n - 128), t2[s3 + 3] = 255;
    }
    return t2;
  }
  static RGBAfromRGB(e2) {
    const t2 = new Uint8ClampedArray(e2.length * 4 / 3);
    let r, s3;
    for (r = 0, s3 = 0;r < e2.length; r += 3, s3 += 4)
      t2[s3] = e2[r], t2[s3 + 1] = e2[r + 1], t2[s3 + 2] = e2[r + 2], t2[s3 + 3] = 255;
    return t2;
  }
  static RGBAfromWhiteIsZero(e2, t2) {
    const r = new Uint8ClampedArray(e2.length * 4);
    let s3;
    for (let o = 0, n = 0;o < e2.length; ++o, n += 4)
      s3 = 256 - e2[o] / t2 * 256, r[n] = s3, r[n + 1] = s3, r[n + 2] = s3, r[n + 3] = 255;
    return r;
  }
  static RGBAfromBlackIsZero(e2, t2) {
    const r = new Uint8ClampedArray(e2.length * 4);
    let s3;
    for (let o = 0, n = 0;o < e2.length; ++o, n += 4)
      s3 = e2[o] / t2 * 256, r[n] = s3, r[n + 1] = s3, r[n + 2] = s3, r[n + 3] = 255;
    return r;
  }
  static RGBAfromPalette(e2, t2) {
    const r = new Uint8ClampedArray(e2.length * 4), s3 = t2.length / 3, o = t2.length / 3 * 2;
    for (let n = 0, a = 0;n < e2.length; ++n, a += 4) {
      const l3 = e2[n];
      r[a] = t2[l3] / 65536 * 256, r[a + 1] = t2[l3 + s3] / 65536 * 256, r[a + 2] = t2[l3 + o] / 65536 * 256, r[a + 3] = 255;
    }
    return r;
  }
  static RGBAfromCMYK(e2) {
    const t2 = new Uint8ClampedArray(e2.length);
    for (let r = 0, s3 = 0;r < e2.length; r += 4, s3 += 4) {
      const o = e2[r], n = e2[r + 1], a = e2[r + 2], l3 = e2[r + 3];
      t2[s3] = 255 * ((255 - o) / 256) * ((255 - l3) / 256), t2[s3 + 1] = 255 * ((255 - n) / 256) * ((255 - l3) / 256), t2[s3 + 2] = 255 * ((255 - a) / 256) * ((255 - l3) / 256), t2[s3 + 3] = 255;
    }
    return t2;
  }
  static RGBAfromCIELab(e2) {
    const o = new Uint8ClampedArray(e2.length * 4 / 3);
    for (let n = 0, a = 0;n < e2.length; n += 3, a += 4) {
      const l3 = e2[n + 0], c = e2[n + 1] << 24 >> 24, h = e2[n + 2] << 24 >> 24;
      let d3 = (l3 + 16) / 116, u = c / 500 + d3, g2 = d3 - h / 200, f2, y, p2;
      u = 0.95047 * (u * u * u > 0.008856 ? u * u * u : (u - 0.13793103448275862) / 7.787), d3 = 1 * (d3 * d3 * d3 > 0.008856 ? d3 * d3 * d3 : (d3 - 0.13793103448275862) / 7.787), g2 = 1.08883 * (g2 * g2 * g2 > 0.008856 ? g2 * g2 * g2 : (g2 - 0.13793103448275862) / 7.787), f2 = u * 3.2406 + d3 * -1.5372 + g2 * -0.4986, y = u * -0.9689 + d3 * 1.8758 + g2 * 0.0415, p2 = u * 0.0557 + d3 * -0.204 + g2 * 1.057, f2 = f2 > 0.0031308 ? 1.055 * f2 ** 0.4166666666666667 - 0.055 : 12.92 * f2, y = y > 0.0031308 ? 1.055 * y ** 0.4166666666666667 - 0.055 : 12.92 * y, p2 = p2 > 0.0031308 ? 1.055 * p2 ** 0.4166666666666667 - 0.055 : 12.92 * p2, o[a] = Math.max(0, Math.min(1, f2)) * 255, o[a + 1] = Math.max(0, Math.min(1, y)) * 255, o[a + 2] = Math.max(0, Math.min(1, p2)) * 255, o[a + 3] = 255;
    }
    return o;
  }
}
function Vr(i) {
  if (!i.version || i.version.major < 2 || i.version.major == 2 && i.version.minor < 3) {
    console.error("This version of OpenSeadragon is too old to support this monkey patch");
    return;
  }
  if (i.ImageJob)
    return;
  function e2(r) {
    i.extend(true, this, {
      timeout: i.DEFAULT_SETTINGS.timeout,
      jobId: null
    }, r), this.image = null;
  }
  e2.prototype = {
    errorMsg: null,
    start: function() {
      var r = this, s3 = this.abort;
      this.image = new Image, this.image.onload = function() {
        r.finish(true);
      }, this.image.onabort = this.image.onerror = function() {
        r.errorMsg = "Image load aborted", r.finish(false);
      }, this.jobId = window.setTimeout(function() {
        r.errorMsg = "Image load exceeded timeout (" + r.timeout + " ms)", r.finish(false);
      }, this.timeout), this.loadWithAjax ? (this.request = i.makeAjaxRequest({
        url: this.src,
        withCredentials: this.ajaxWithCredentials,
        headers: this.ajaxHeaders,
        responseType: "arraybuffer",
        postData: this.postData,
        success: function(o) {
          var n;
          try {
            n = new window.Blob([o.response]);
          } catch (h) {
            var a = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            if (h.name === "TypeError" && a) {
              var l3 = new a;
              l3.append(o.response), n = l3.getBlob();
            }
          }
          n.size === 0 && (r.errorMsg = "Empty image response.", r.finish(false));
          var c = (window.URL || window.webkitURL).createObjectURL(n);
          r.image.src = c;
        },
        error: function(o) {
          r.errorMsg = "Image load aborted - XHR error: Ajax returned " + o.status, r.finish(false);
        }
      }), this.abort = function() {
        r.request.abort(), typeof s3 == "function" && s3();
      }) : (this.crossOriginPolicy !== false && (this.image.crossOrigin = this.crossOriginPolicy), this.src.fetch ? this.src.fetch().then((o) => this.image.src = o) : this.image.src = this.src);
    },
    finish: function(r) {
      this.image.onload = this.image.onerror = this.image.onabort = null, r || (this.image = null), this.jobId && window.clearTimeout(this.jobId), this.callback(this);
    }
  };
  function t2(r, s3, o) {
    var n;
    r.jobsInProgress--, (!r.jobLimit || r.jobsInProgress < r.jobLimit) && r.jobQueue.length > 0 && (n = r.jobQueue.shift(), n.start(), r.jobsInProgress++), o(s3.image, s3.errorMsg, s3.request);
  }
  i.ImageLoader.prototype.addJob = function(r) {
    var s3 = this, o = function(l3) {
      t2(s3, l3, r.callback);
    }, n = {
      src: r.src,
      loadWithAjax: r.loadWithAjax,
      ajaxHeaders: r.loadWithAjax ? r.ajaxHeaders : null,
      crossOriginPolicy: r.crossOriginPolicy,
      ajaxWithCredentials: r.ajaxWithCredentials,
      postData: r.postData,
      callback: o,
      abort: r.abort,
      timeout: this.timeout
    }, a = new e2(n);
    !this.jobLimit || this.jobsInProgress < this.jobLimit ? (a.start(), this.jobsInProgress++) : this.jobQueue.push(a);
  }, i.Tile.prototype._hasTransparencyChannel = function() {
    return false;
  };
}
var ut2, dt2 = (i, e2, t2) => (e2 in i) ? ut2(i, e2, { enumerable: true, configurable: true, writable: true, value: t2 }) : i[e2] = t2, k3 = (i, e2, t2) => dt2(i, typeof e2 != "symbol" ? e2 + "" : e2, t2), gt2, Yr, Xr, $r, Ue2, ye2, Wr, yt2, Zr, Jr, ee2, Qr, pt2, es, mt2, pe2, wt2, ts, rs, xt2, bt2, Le2, It2, Ne2, Tt2, Me2, je2, R2, St2, ze2, me2, At2, Q3, Ke2, Dt2, Ct2, Ft2, Et2, we2, Ve2, qe2, Pt2, He2, kt2, Mt2, Bt2, Ye2, Gt2, Ot2, v, _2, xe2, Y3, Xe2, be2, _t2, ae2, Ie, Te2, Se2, Ut2, Ae2, Lt2, De2, Nt2, jt2, le3, Be2, zt2, Kt2, Vt2, qt2, J, U2, Ht2, ce3, x3, A2, Yt2, ss, is, Xt2, er2 = 0.95047, tr2 = 1, rr2 = 1.08883, st2, pr, Ge2 = `\r
\r
`, Ir, q2, Ar, Dr, Fr, Er, Pr, kr, Rr, he2, Mr, Br, Pe2, Ur, ie3, oe2, Kr = (i) => {
  var t2, r, s3;
  const e2 = /* @__PURE__ */ new Map;
  for (const o of i) {
    const n = new DOMParser().parseFromString((t2 = o.fileDirectory) == null ? undefined : t2.ImageDescription, "text/xml"), a = (r = n == null ? undefined : n.querySelector("Name")) == null ? undefined : r.textContent, l3 = (s3 = n == null ? undefined : n.querySelector("Color")) == null ? undefined : s3.textContent;
    if (!a)
      continue;
    const c = l3 ? l3.split(",").map((h) => parseInt(h)) : [255, 255, 255];
    e2.has(a) || e2.set(a, {
      name: a,
      color: c,
      images: []
    }), e2.get(a).images.push(o);
  }
  return e2;
}, qr = (i) => {
  let e2 = 0;
  const r = class r2 extends i.TileSource {
    constructor(n, a = { logLatency: false }) {
      super();
      k3(this, "getTileWidth", (n2) => {
        if (this.levels.length > n2)
          return this.levels[n2].tileWidth;
      });
      k3(this, "getTileHeight", (n2) => {
        if (this.levels.length > n2)
          return this.levels[n2].tileHeight;
      });
      k3(this, "getLevelScale", (n2) => {
        let a2 = NaN;
        return this.levels.length > 0 && n2 >= this.minLevel && n2 <= this.maxLevel && (a2 = this.levels[n2].width / this.levels[this.maxLevel].width), a2;
      });
      k3(this, "getTileHashKey", (n2, a2, l4) => {
        var c;
        return `geotiffTileSource${this._tsCounter}_${((c = this == null ? undefined : this.channel) == null ? undefined : c.name) ?? ""}_${n2}_${a2}_${l4}`;
      });
      k3(this, "getTileUrl", (n2, a2, l4) => {
        let c = this.levels[n2], h = new String(`${n2}/${a2}_${l4}`);
        return h.fetch = /* @__PURE__ */ ((d3, u, g2, f2, y) => () => this.regionToDataUrl.call(d3, u, g2, f2, y))(this, c, a2, l4, h), h;
      });
      k3(this, "downloadTileStart", (n2) => {
        n2.src.fetch().then((a2) => {
          let l4 = new Image, c = "" + n2.src;
          l4.onload = function() {
            n2.finish(l4);
          }, l4.onerror = l4.onabort = function() {
            n2.finish(null, c, "Request aborted");
          }, l4.src = a2;
        });
      });
      k3(this, "downloadTileAbort", (n2) => {
        n2.src.abortController && n2.src.abortController.abort();
      });
      k3(this, "setupComplete", () => {
        this._ready = true, this.promises.ready.resolve(), this.raiseEvent("ready", { tileSource: this });
      });
      k3(this, "setupLevels", () => {
        if (this._ready)
          return;
        let n2 = this.GeoTIFFImages.sort((u, g2) => g2.getWidth() - u.getWidth()), a2 = this._tileSize, l4 = this._tileSize, c = n2[0].getWidth();
        this.width = c;
        let h = n2[0].getHeight();
        if (this.height = h, this.tileOverlap = 0, this.minLevel = 0, this.aspectRatio = this.width / this.height, this.dimensions = new i.Point(this.width, this.height), n2.reduce((u, g2) => (u.width !== -1 && (u.valid = u.valid && g2.getWidth() < u.width), u.width = g2.getWidth(), u), { valid: true, width: -1 }).valid)
          this.levels = n2.map((u) => {
            let g2 = u.getWidth(), f2 = u.getHeight();
            return {
              width: g2,
              height: f2,
              tileWidth: this.options.tileWidth || u.getTileWidth() || a2,
              tileHeight: this.options.tileHeight || u.getTileHeight() || l4,
              image: u,
              scaleFactor: 1
            };
          }), this.maxLevel = this.levels.length - 1;
        else {
          let u = Math.ceil(Math.log2(Math.max(c / a2, h / l4))), g2 = [...Array(u).keys()].filter((f2) => f2 % 2 == 0);
          this.levels = g2.map((f2) => {
            let y = Math.pow(2, f2);
            const p2 = n2.filter((m2) => {
              const b = Math.pow(2, f2 - 1);
              return b >= 0 ? m2.getWidth() * b < c && m2.getWidth() * y >= c : m2.getWidth() * y >= c;
            });
            if (p2.length === 0)
              return null;
            const w = p2[0];
            return {
              width: c / y,
              height: h / y,
              tileWidth: this.options.tileWidth || w.getTileWidth() || a2,
              tileHeight: this.options.tileHeight || w.getTileHeight() || l4,
              image: w,
              scaleFactor: y * w.getWidth() / c
            };
          }).filter((f2) => f2 !== null), this.maxLevel = this.levels.length - 1;
        }
        this.levels = this.levels.sort((u, g2) => u.width - g2.width), this._tileWidth = this.levels[0].tileWidth, this._tileHeight = this.levels[0].tileHeight, this.setupComplete();
      });
      k3(this, "regionToDataUrl", (n2, a2, l4, c) => {
        var m2, b, T2, S2, D2;
        let h = this.options.logLatency && Date.now(), u = (c.abortController = new AbortController).signal;
        const { tileWidth: g2, tileHeight: f2 } = n2, y = [a2 * g2, l4 * f2, (a2 + 1) * g2, (l4 + 1) * f2].map((M2) => M2 * n2.scaleFactor), p2 = n2.image;
        if ((b = (m2 = p2.fileDirectory) == null ? undefined : m2.Software) == null ? undefined : b.startsWith("PerkinElmer-QPI")) {
          const M2 = new DOMParser().parseFromString((T2 = p2.fileDirectory) == null ? undefined : T2.ImageDescription, "text/xml");
          (S2 = M2.querySelector("Name")) == null || S2.textContent;
          const I2 = (D2 = M2.querySelector("Color")) == null ? undefined : D2.textContent, C2 = I2 ? I2.split(",").map((O3) => parseInt(O3)) : [255, 255, 255];
          return n2.image.readRGB({
            interleave: true,
            window: y,
            pool: this._pool,
            width: n2.tileWidth,
            height: n2.tileHeight,
            signal: u
          }).then((O3) => {
            let P2 = document.createElement("canvas");
            P2.width = n2.tileWidth, P2.height = n2.tileHeight;
            let F2 = P2.getContext("2d"), G2 = new Uint8ClampedArray(4 * P2.width * P2.height), L2 = new Uint8ClampedArray(O3), B3, N3;
            for (B3 = 0, N3 = 0;B3 < L2.length; B3 += 3, N3 += 4)
              G2[N3] = L2[B3] * C2[0] / 255, G2[N3 + 1] = L2[B3 + 1] * C2[1] / 255, G2[N3 + 2] = L2[B3 + 2] * C2[2] / 255, G2[N3 + 3] = 255;
            const te2 = F2.createImageData(P2.width, P2.height);
            te2.data.set(G2), F2.putImageData(te2, 0, 0);
            let X2 = P2.toDataURL("image/jpeg", 0.8);
            return this.options.logLatency && (typeof this.options.logLatency == "function" ? this.options.logLatency : console.log)("Tile latency (ms):", Date.now() - h), X2;
          });
        } else
          return n2.image.getTileOrStrip(a2, l4, null, this._pool, u).then((M2) => {
            let I2 = new Uint8ClampedArray(M2.data), C2 = document.createElement("canvas");
            C2.width = n2.tileWidth, C2.height = n2.tileHeight;
            let O3 = C2.getContext("2d"), P2 = n2.image.fileDirectory.PhotometricInterpretation, F2;
            if (I2.length / (C2.width * C2.height) % 4 === 0)
              F2 = I2;
            else
              switch (P2) {
                case A2.WhiteIsZero:
                  F2 = z.RGBAfromWhiteIsZero(I2, 2 ** n2.image.fileDirectory.BitsPerSample[0]);
                  break;
                case A2.BlackIsZero:
                  F2 = z.RGBAfromBlackIsZero(I2, 2 ** n2.image.fileDirectory.BitsPerSample[0]);
                  break;
                case A2.RGB:
                  F2 = z.RGBAfromRGB(I2);
                  break;
                case A2.Palette:
                  F2 = z.RGBAfromPalette(I2, 2 ** n2.image.fileDirectory.colorMap);
                  break;
                case A2.CMYK:
                  F2 = z.RGBAfromCMYK(I2);
                  break;
                case A2.YCbCr:
                  F2 = z.RGBAfromYCbCr(I2);
                  break;
                case A2.CIELab:
                  F2 = z.RGBAfromCIELab(I2);
                  break;
              }
            const G2 = O3.createImageData(C2.width, C2.height);
            G2.data.set(F2), O3.putImageData(G2, 0, 0);
            let L2 = C2.toDataURL("image/jpeg", 0.8);
            return this.options.logLatency && (typeof this.options.logLatency == "function" ? this.options.logLatency : console.log)("Tile latency (ms):", Date.now() - h), L2;
          });
      });
      r2._osdReady || r2.applyOSDPatch(i);
      let l3 = this;
      this.input = n, this.options = a, this.channel = (n == null ? undefined : n.channel) ?? null, this._ready = false, this._pool = r2.sharedPool, this._tileSize = 256, this._tsCounter = e2, e2 += 1, n.GeoTIFF && n.GeoTIFFImages ? (this.promises = {
        GeoTIFF: Promise.resolve(n.GeoTIFF),
        GeoTIFFImages: Promise.resolve(n.GeoTIFFImages),
        ready: new fe3
      }, this.GeoTIFF = n.GeoTIFF, this.imageCount = n.GeoTIFFImages.length, this.GeoTIFFImages = n.GeoTIFFImages, this.setupLevels()) : (this.promises = {
        GeoTIFF: n instanceof File ? _e2(n) : ve2(n),
        GeoTIFFImages: new fe3,
        ready: new fe3
      }, this.promises.GeoTIFF.then((c) => (l3.GeoTIFF = c, c.getImageCount())).then((c) => {
        l3.imageCount = c;
        let h = [...Array(c).keys()].map((d3) => l3.GeoTIFF.getImage(d3));
        return Promise.all(h);
      }).then((c) => {
        l3.GeoTIFFImages = c, l3.promises.GeoTIFFImages.resolve(c), this.setupLevels();
      }).catch((c) => {
        throw console.error("Re-throwing error with GeoTIFF:", c), c;
      }));
    }
  };
  k3(r, "sharedPool", new mr), k3(r, "_osdReady", false), k3(r, "applyOSDPatch", (n) => {
    Vr(n), r._osdReady = true;
  }), k3(r, "getAllTileSources", async (n, a) => {
    const l3 = n instanceof File ? n.name.split(".").pop() : n.split(".").pop();
    let c = n instanceof File ? _e2(n) : ve2(n);
    return c.then((h) => (c = h, h.getImageCount())).then((h) => Promise.all([...Array(h).keys()].map(async (d3) => (await c).getImage(d3)))).then((h) => {
      h = h.filter((f2) => f2.fileDirectory.photometricInterpretation !== A2.TransparencyMask), h.sort((f2, y) => y.getWidth() - f2.getWidth());
      const d3 = 0.015;
      return h.reduce((f2, y) => {
        const p2 = y.getWidth() / y.getHeight();
        let w = "";
        y.fileDirectory.ImageDescription && (w = y.fileDirectory.ImageDescription.split(`
`)[1] ?? "");
        const m2 = f2.filter((b) => Math.abs(1 - b.aspectRatio / p2) < d3 && !(w != null && w.includes("macro") || w != null && w.includes("label")));
        if (m2.length === 0) {
          let b = {
            aspectRatio: p2,
            images: [y]
          };
          f2.push(b);
        } else
          m2[0].images.push(y);
        return f2;
      }, []).map((f2) => f2.images).map((f2, y) => {
        if (y !== 0)
          return new i.GeoTIFFTileSource({
            GeoTIFF: c,
            GeoTIFFImages: f2
          }, a);
        switch (l3) {
          case "qptiff":
            const p2 = Kr(f2);
            return Array.from(p2.values()).map((w, m2) => new i.GeoTIFFTileSource({
              GeoTIFF: c,
              GeoTIFFImages: w.images,
              channel: {
                name: w.name,
                color: w.color
              }
            }, a));
          default:
            return new i.GeoTIFFTileSource({
              GeoTIFF: c,
              GeoTIFFImages: f2
            }, a);
        }
      });
    });
  });
  let t2 = r;
  i.GeoTIFFTileSource = t2;
};
var init_main_8v7k2MJ1 = __esm(() => {
  ut2 = Object.defineProperty;
  ({
    apply: gt2,
    construct: Yr,
    defineProperty: Xr,
    get: $r,
    getOwnPropertyDescriptor: Ue2,
    getPrototypeOf: ye2,
    has: Wr,
    ownKeys: yt2,
    set: Zr,
    setPrototypeOf: Jr
  } = Reflect);
  ({
    iterator: ee2,
    species: Qr,
    toStringTag: pt2,
    for: es
  } = Symbol);
  mt2 = Object;
  ({
    create: pe2,
    defineProperty: wt2,
    freeze: ts,
    is: rs
  } = mt2);
  xt2 = Array;
  bt2 = xt2.prototype;
  Le2 = bt2[ee2];
  It2 = E2(Le2);
  Ne2 = ArrayBuffer;
  Tt2 = Ne2.prototype;
  H2(Tt2, "byteLength");
  Me2 = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : null;
  Me2 && H2(Me2.prototype, "byteLength");
  je2 = ye2(Uint8Array);
  je2.from;
  R2 = je2.prototype;
  R2[ee2];
  E2(R2.keys);
  E2(R2.values);
  E2(R2.entries);
  E2(R2.set);
  E2(R2.reverse);
  E2(R2.fill);
  E2(R2.copyWithin);
  E2(R2.sort);
  E2(R2.slice);
  E2(R2.subarray);
  H2(R2, "buffer");
  H2(R2, "byteOffset");
  H2(R2, "length");
  H2(R2, pt2);
  St2 = Uint8Array;
  ze2 = Uint16Array;
  me2 = Uint32Array;
  At2 = Float32Array;
  Q3 = ye2([][ee2]());
  Ke2 = E2(Q3.next);
  Dt2 = E2(function* () {}().next);
  Ct2 = ye2(Q3);
  Ft2 = DataView.prototype;
  Et2 = E2(Ft2.getUint16);
  we2 = WeakMap;
  Ve2 = we2.prototype;
  qe2 = E2(Ve2.get);
  Pt2 = E2(Ve2.set);
  He2 = new we2;
  kt2 = pe2(null, {
    next: {
      value: function() {
        const e2 = qe2(He2, this);
        return Ke2(e2);
      }
    },
    [ee2]: {
      value: function() {
        return this;
      }
    }
  });
  Mt2 = new we2;
  Bt2 = pe2(Ct2, {
    next: {
      value: function() {
        const e2 = qe2(Mt2, this);
        return Dt2(e2);
      },
      writable: true,
      configurable: true
    }
  });
  for (const i of yt2(Q3))
    i !== "next" && wt2(Bt2, i, Ue2(Q3, i));
  Ye2 = new Ne2(4);
  Gt2 = new At2(Ye2);
  Ot2 = new me2(Ye2);
  v = new ze2(512);
  _2 = new St2(512);
  for (let i = 0;i < 256; ++i) {
    const e2 = i - 127;
    e2 < -24 ? (v[i] = 0, v[i | 256] = 32768, _2[i] = 24, _2[i | 256] = 24) : e2 < -14 ? (v[i] = 1024 >> -e2 - 14, v[i | 256] = 1024 >> -e2 - 14 | 32768, _2[i] = -e2 - 1, _2[i | 256] = -e2 - 1) : e2 <= 15 ? (v[i] = e2 + 15 << 10, v[i | 256] = e2 + 15 << 10 | 32768, _2[i] = 13, _2[i | 256] = 13) : e2 < 128 ? (v[i] = 31744, v[i | 256] = 64512, _2[i] = 24, _2[i | 256] = 24) : (v[i] = 31744, v[i | 256] = 64512, _2[i] = 13, _2[i | 256] = 13);
  }
  xe2 = new me2(2048);
  for (let i = 1;i < 1024; ++i) {
    let e2 = i << 13, t2 = 0;
    for (;!(e2 & 8388608); )
      e2 <<= 1, t2 -= 8388608;
    e2 &= -8388609, t2 += 947912704, xe2[i] = e2 | t2;
  }
  for (let i = 1024;i < 2048; ++i)
    xe2[i] = 939524096 + (i - 1024 << 13);
  Y3 = new me2(64);
  for (let i = 1;i < 31; ++i)
    Y3[i] = i << 23;
  Y3[31] = 1199570944;
  Y3[32] = 2147483648;
  for (let i = 33;i < 63; ++i)
    Y3[i] = 2147483648 + (i - 32 << 23);
  Y3[63] = 3347054592;
  Xe2 = new ze2(64);
  for (let i = 1;i < 64; ++i)
    i !== 32 && (Xe2[i] = 1024);
  be2 = { exports: {} };
  be2.exports = Ze;
  be2.exports.default = Ze;
  _t2 = be2.exports;
  ae2 = /* @__PURE__ */ We2(_t2);
  Ie = { exports: {} };
  Te2 = { exports: {} };
  Se2 = { exports: {} };
  Se2.exports = Je2;
  Se2.exports.default = Je2;
  Ut2 = Se2.exports;
  Ae2 = { exports: {} };
  Ae2.exports = Qe2;
  Ae2.exports.default = Qe2;
  Lt2 = Ae2.exports;
  De2 = { exports: {} };
  De2.exports = et2;
  De2.exports.default = et2;
  Nt2 = De2.exports;
  jt2 = Ut2;
  le3 = Lt2;
  Be2 = Nt2;
  Te2.exports = tt2;
  Te2.exports.default = tt2;
  zt2 = Te2.exports;
  Kt2 = zt2;
  Ie.exports = rt2;
  Ie.exports.default = rt2;
  Vt2 = Ie.exports;
  qt2 = /* @__PURE__ */ We2(Vt2);
  J = {
    315: "Artist",
    258: "BitsPerSample",
    265: "CellLength",
    264: "CellWidth",
    320: "ColorMap",
    259: "Compression",
    33432: "Copyright",
    306: "DateTime",
    338: "ExtraSamples",
    266: "FillOrder",
    289: "FreeByteCounts",
    288: "FreeOffsets",
    291: "GrayResponseCurve",
    290: "GrayResponseUnit",
    316: "HostComputer",
    270: "ImageDescription",
    257: "ImageLength",
    256: "ImageWidth",
    271: "Make",
    281: "MaxSampleValue",
    280: "MinSampleValue",
    272: "Model",
    254: "NewSubfileType",
    274: "Orientation",
    262: "PhotometricInterpretation",
    284: "PlanarConfiguration",
    296: "ResolutionUnit",
    278: "RowsPerStrip",
    277: "SamplesPerPixel",
    305: "Software",
    279: "StripByteCounts",
    273: "StripOffsets",
    255: "SubfileType",
    263: "Threshholding",
    282: "XResolution",
    283: "YResolution",
    326: "BadFaxLines",
    327: "CleanFaxData",
    343: "ClipPath",
    328: "ConsecutiveBadFaxLines",
    433: "Decode",
    434: "DefaultImageColor",
    269: "DocumentName",
    336: "DotRange",
    321: "HalftoneHints",
    346: "Indexed",
    347: "JPEGTables",
    285: "PageName",
    297: "PageNumber",
    317: "Predictor",
    319: "PrimaryChromaticities",
    532: "ReferenceBlackWhite",
    339: "SampleFormat",
    340: "SMinSampleValue",
    341: "SMaxSampleValue",
    559: "StripRowCounts",
    330: "SubIFDs",
    292: "T4Options",
    293: "T6Options",
    325: "TileByteCounts",
    323: "TileLength",
    324: "TileOffsets",
    322: "TileWidth",
    301: "TransferFunction",
    318: "WhitePoint",
    344: "XClipPathUnits",
    286: "XPosition",
    529: "YCbCrCoefficients",
    531: "YCbCrPositioning",
    530: "YCbCrSubSampling",
    345: "YClipPathUnits",
    287: "YPosition",
    37378: "ApertureValue",
    40961: "ColorSpace",
    36868: "DateTimeDigitized",
    36867: "DateTimeOriginal",
    34665: "Exif IFD",
    36864: "ExifVersion",
    33434: "ExposureTime",
    41728: "FileSource",
    37385: "Flash",
    40960: "FlashpixVersion",
    33437: "FNumber",
    42016: "ImageUniqueID",
    37384: "LightSource",
    37500: "MakerNote",
    37377: "ShutterSpeedValue",
    37510: "UserComment",
    33723: "IPTC",
    34675: "ICC Profile",
    700: "XMP",
    42112: "GDAL_METADATA",
    42113: "GDAL_NODATA",
    34377: "Photoshop",
    33550: "ModelPixelScale",
    33922: "ModelTiepoint",
    34264: "ModelTransformation",
    34735: "GeoKeyDirectory",
    34736: "GeoDoubleParams",
    34737: "GeoAsciiParams",
    50674: "LercParameters"
  };
  U2 = {};
  for (const i in J)
    J.hasOwnProperty(i) && (U2[J[i]] = parseInt(i, 10));
  Ht2 = [
    U2.BitsPerSample,
    U2.ExtraSamples,
    U2.SampleFormat,
    U2.StripByteCounts,
    U2.StripOffsets,
    U2.StripRowCounts,
    U2.TileByteCounts,
    U2.TileOffsets,
    U2.SubIFDs
  ];
  ce3 = {
    1: "BYTE",
    2: "ASCII",
    3: "SHORT",
    4: "LONG",
    5: "RATIONAL",
    6: "SBYTE",
    7: "UNDEFINED",
    8: "SSHORT",
    9: "SLONG",
    10: "SRATIONAL",
    11: "FLOAT",
    12: "DOUBLE",
    13: "IFD",
    16: "LONG8",
    17: "SLONG8",
    18: "IFD8"
  };
  x3 = {};
  for (const i in ce3)
    ce3.hasOwnProperty(i) && (x3[ce3[i]] = parseInt(i, 10));
  A2 = {
    WhiteIsZero: 0,
    BlackIsZero: 1,
    RGB: 2,
    Palette: 3,
    TransparencyMask: 4,
    CMYK: 5,
    YCbCr: 6,
    CIELab: 8,
    ICCLab: 9
  };
  Yt2 = {
    Unspecified: 0,
    Assocalpha: 1,
    Unassalpha: 2
  };
  ss = {
    Version: 0,
    AddCompression: 1
  };
  is = {
    None: 0,
    Deflate: 1,
    Zstandard: 2
  };
  Xt2 = {
    1024: "GTModelTypeGeoKey",
    1025: "GTRasterTypeGeoKey",
    1026: "GTCitationGeoKey",
    2048: "GeographicTypeGeoKey",
    2049: "GeogCitationGeoKey",
    2050: "GeogGeodeticDatumGeoKey",
    2051: "GeogPrimeMeridianGeoKey",
    2052: "GeogLinearUnitsGeoKey",
    2053: "GeogLinearUnitSizeGeoKey",
    2054: "GeogAngularUnitsGeoKey",
    2055: "GeogAngularUnitSizeGeoKey",
    2056: "GeogEllipsoidGeoKey",
    2057: "GeogSemiMajorAxisGeoKey",
    2058: "GeogSemiMinorAxisGeoKey",
    2059: "GeogInvFlatteningGeoKey",
    2060: "GeogAzimuthUnitsGeoKey",
    2061: "GeogPrimeMeridianLongGeoKey",
    2062: "GeogTOWGS84GeoKey",
    3072: "ProjectedCSTypeGeoKey",
    3073: "PCSCitationGeoKey",
    3074: "ProjectionGeoKey",
    3075: "ProjCoordTransGeoKey",
    3076: "ProjLinearUnitsGeoKey",
    3077: "ProjLinearUnitSizeGeoKey",
    3078: "ProjStdParallel1GeoKey",
    3079: "ProjStdParallel2GeoKey",
    3080: "ProjNatOriginLongGeoKey",
    3081: "ProjNatOriginLatGeoKey",
    3082: "ProjFalseEastingGeoKey",
    3083: "ProjFalseNorthingGeoKey",
    3084: "ProjFalseOriginLongGeoKey",
    3085: "ProjFalseOriginLatGeoKey",
    3086: "ProjFalseOriginEastingGeoKey",
    3087: "ProjFalseOriginNorthingGeoKey",
    3088: "ProjCenterLongGeoKey",
    3089: "ProjCenterLatGeoKey",
    3090: "ProjCenterEastingGeoKey",
    3091: "ProjCenterNorthingGeoKey",
    3092: "ProjScaleAtNatOriginGeoKey",
    3093: "ProjScaleAtCenterGeoKey",
    3094: "ProjAzimuthAngleGeoKey",
    3095: "ProjStraightVertPoleLongGeoKey",
    3096: "ProjRectifiedGridAngleGeoKey",
    4096: "VerticalCSTypeGeoKey",
    4097: "VerticalCitationGeoKey",
    4098: "VerticalDatumGeoKey",
    4099: "VerticalUnitsGeoKey"
  };
  st2 = /* @__PURE__ */ new Map;
  j2([undefined, 1], () => Promise.resolve().then(() => (init_raw_CMGvRjfu(), exports_raw_CMGvRjfu)).then((i) => i.default));
  j2(5, () => Promise.resolve().then(() => (init_lzw_LAGDNbSC(), exports_lzw_LAGDNbSC)).then((i) => i.default));
  j2(6, () => {
    throw new Error("old style JPEG compression is not supported.");
  });
  j2(7, () => Promise.resolve().then(() => (init_jpeg_BAgeD1d3(), exports_jpeg_BAgeD1d3)).then((i) => i.default));
  j2([8, 32946], () => Promise.resolve().then(() => (init_deflate_BXt_9JA_(), exports_deflate_BXt_9JA_)).then((i) => i.default));
  j2(32773, () => Promise.resolve().then(() => (init_packbits_BlDR4Kj5(), exports_packbits_BlDR4Kj5)).then((i) => i.default));
  j2(34887, () => Promise.resolve().then(() => (init_lerc_CoQvYJmm(), exports_lerc_CoQvYJmm)).then(async (i) => (await i.zstd.init(), i)).then((i) => i.default));
  j2(50001, () => Promise.resolve().then(() => (init_webimage_BM_pbLN3(), exports_webimage_BM_pbLN3)).then((i) => i.default));
  pr = typeof navigator < "u" && navigator.hardwareConcurrency || 2;
  Ir = class Ir extends Map {
    constructor(e2 = {}) {
      if (super(), !(e2.maxSize && e2.maxSize > 0))
        throw new TypeError("`maxSize` must be a number greater than 0");
      if (typeof e2.maxAge == "number" && e2.maxAge === 0)
        throw new TypeError("`maxAge` must be a number greater than 0");
      this.maxSize = e2.maxSize, this.maxAge = e2.maxAge || Number.POSITIVE_INFINITY, this.onEviction = e2.onEviction, this.cache = /* @__PURE__ */ new Map, this.oldCache = /* @__PURE__ */ new Map, this._size = 0;
    }
    _emitEvictions(e2) {
      if (typeof this.onEviction == "function")
        for (const [t2, r] of e2)
          this.onEviction(t2, r.value);
    }
    _deleteIfExpired(e2, t2) {
      return typeof t2.expiry == "number" && t2.expiry <= Date.now() ? (typeof this.onEviction == "function" && this.onEviction(e2, t2.value), this.delete(e2)) : false;
    }
    _getOrDeleteIfExpired(e2, t2) {
      if (this._deleteIfExpired(e2, t2) === false)
        return t2.value;
    }
    _getItemValue(e2, t2) {
      return t2.expiry ? this._getOrDeleteIfExpired(e2, t2) : t2.value;
    }
    _peek(e2, t2) {
      const r = t2.get(e2);
      return this._getItemValue(e2, r);
    }
    _set(e2, t2) {
      this.cache.set(e2, t2), this._size++, this._size >= this.maxSize && (this._size = 0, this._emitEvictions(this.oldCache), this.oldCache = this.cache, this.cache = /* @__PURE__ */ new Map);
    }
    _moveToRecent(e2, t2) {
      this.oldCache.delete(e2), this._set(e2, t2);
    }
    *_entriesAscending() {
      for (const e2 of this.oldCache) {
        const [t2, r] = e2;
        this.cache.has(t2) || this._deleteIfExpired(t2, r) === false && (yield e2);
      }
      for (const e2 of this.cache) {
        const [t2, r] = e2;
        this._deleteIfExpired(t2, r) === false && (yield e2);
      }
    }
    get(e2) {
      if (this.cache.has(e2)) {
        const t2 = this.cache.get(e2);
        return this._getItemValue(e2, t2);
      }
      if (this.oldCache.has(e2)) {
        const t2 = this.oldCache.get(e2);
        if (this._deleteIfExpired(e2, t2) === false)
          return this._moveToRecent(e2, t2), t2.value;
      }
    }
    set(e2, t2, { maxAge: r = this.maxAge } = {}) {
      const s3 = typeof r == "number" && r !== Number.POSITIVE_INFINITY ? Date.now() + r : undefined;
      return this.cache.has(e2) ? this.cache.set(e2, {
        value: t2,
        expiry: s3
      }) : this._set(e2, { value: t2, expiry: s3 }), this;
    }
    has(e2) {
      return this.cache.has(e2) ? !this._deleteIfExpired(e2, this.cache.get(e2)) : this.oldCache.has(e2) ? !this._deleteIfExpired(e2, this.oldCache.get(e2)) : false;
    }
    peek(e2) {
      if (this.cache.has(e2))
        return this._peek(e2, this.cache);
      if (this.oldCache.has(e2))
        return this._peek(e2, this.oldCache);
    }
    delete(e2) {
      const t2 = this.cache.delete(e2);
      return t2 && this._size--, this.oldCache.delete(e2) || t2;
    }
    clear() {
      this.cache.clear(), this.oldCache.clear(), this._size = 0;
    }
    resize(e2) {
      if (!(e2 && e2 > 0))
        throw new TypeError("`maxSize` must be a number greater than 0");
      const t2 = [...this._entriesAscending()], r = t2.length - e2;
      r < 0 ? (this.cache = new Map(t2), this.oldCache = /* @__PURE__ */ new Map, this._size = t2.length) : (r > 0 && this._emitEvictions(t2.slice(0, r)), this.oldCache = new Map(t2.slice(r)), this.cache = /* @__PURE__ */ new Map, this._size = 0), this.maxSize = e2;
    }
    *keys() {
      for (const [e2] of this)
        yield e2;
    }
    *values() {
      for (const [, e2] of this)
        yield e2;
    }
    *[Symbol.iterator]() {
      for (const e2 of this.cache) {
        const [t2, r] = e2;
        this._deleteIfExpired(t2, r) === false && (yield [t2, r.value]);
      }
      for (const e2 of this.oldCache) {
        const [t2, r] = e2;
        this.cache.has(t2) || this._deleteIfExpired(t2, r) === false && (yield [t2, r.value]);
      }
    }
    *entriesDescending() {
      let e2 = [...this.cache];
      for (let t2 = e2.length - 1;t2 >= 0; --t2) {
        const r = e2[t2], [s3, o] = r;
        this._deleteIfExpired(s3, o) === false && (yield [s3, o.value]);
      }
      e2 = [...this.oldCache];
      for (let t2 = e2.length - 1;t2 >= 0; --t2) {
        const r = e2[t2], [s3, o] = r;
        this.cache.has(s3) || this._deleteIfExpired(s3, o) === false && (yield [s3, o.value]);
      }
    }
    *entriesAscending() {
      for (const [e2, t2] of this._entriesAscending())
        yield [e2, t2.value];
    }
    get size() {
      if (!this._size)
        return this.oldCache.size;
      let e2 = 0;
      for (const t2 of this.oldCache.keys())
        this.cache.has(t2) || e2++;
      return Math.min(this._size + e2, this.maxSize);
    }
    entries() {
      return this.entriesAscending();
    }
    forEach(e2, t2 = this) {
      for (const [r, s3] of this.entriesAscending())
        e2.call(t2, s3, r, this);
    }
    get [Symbol.toStringTag]() {
      return JSON.stringify([...this.entriesAscending()]);
    }
  };
  q2 = class q2 extends Error {
    constructor(e2) {
      super(e2), Error.captureStackTrace && Error.captureStackTrace(this, q2), this.name = "AbortError";
    }
  };
  Ar = class Ar extends Error {
    constructor(e2, t2) {
      super(t2), this.errors = e2, this.message = t2, this.name = "AggregateError";
    }
  };
  Dr = Ar;
  Fr = class Fr extends Ce2 {
    constructor(e2, { blockSize: t2 = 65536, cacheSize: r = 100 } = {}) {
      super(), this.source = e2, this.blockSize = t2, this.blockCache = new Ir({
        maxSize: r,
        onEviction: (s3, o) => {
          this.evictedBlocks.set(s3, o);
        }
      }), this.evictedBlocks = /* @__PURE__ */ new Map, this.blockRequests = /* @__PURE__ */ new Map, this.blockIdsToFetch = /* @__PURE__ */ new Set, this.abortedBlockIds = /* @__PURE__ */ new Set;
    }
    get fileSize() {
      return this.source.fileSize;
    }
    async fetch(e2, t2) {
      const r = [], s3 = [], o = [];
      this.evictedBlocks.clear();
      for (const { offset: u, length: g2 } of e2) {
        let f2 = u + g2;
        const { fileSize: y } = this;
        y !== null && (f2 = Math.min(f2, y));
        const p2 = Math.floor(u / this.blockSize) * this.blockSize;
        for (let w = p2;w < f2; w += this.blockSize) {
          const m2 = Math.floor(w / this.blockSize);
          !this.blockCache.has(m2) && !this.blockRequests.has(m2) && (this.blockIdsToFetch.add(m2), s3.push(m2)), this.blockRequests.has(m2) && r.push(this.blockRequests.get(m2)), o.push(m2);
        }
      }
      await Tr(), this.fetchBlocks(t2);
      const n = [];
      for (const u of s3)
        this.blockRequests.has(u) && n.push(this.blockRequests.get(u));
      await Promise.allSettled(r), await Promise.allSettled(n);
      const a = [], l3 = o.filter((u) => this.abortedBlockIds.has(u) || !this.blockCache.has(u));
      if (l3.forEach((u) => this.blockIdsToFetch.add(u)), l3.length > 0 && t2 && !t2.aborted) {
        this.fetchBlocks(null);
        for (const u of l3) {
          const g2 = this.blockRequests.get(u);
          if (!g2)
            throw new Error(`Block ${u} is not in the block requests`);
          a.push(g2);
        }
        await Promise.allSettled(a);
      }
      if (t2 && t2.aborted)
        throw new q2("Request was aborted");
      const c = o.map((u) => this.blockCache.get(u) || this.evictedBlocks.get(u)), h = c.filter((u) => !u);
      if (h.length)
        throw new Dr(h, "Request failed");
      const d3 = new Map(Sr(o, c));
      return this.readSliceData(e2, d3);
    }
    fetchBlocks(e2) {
      if (this.blockIdsToFetch.size > 0) {
        const t2 = this.groupBlocks(this.blockIdsToFetch), r = this.source.fetch(t2, e2);
        for (let s3 = 0;s3 < t2.length; ++s3) {
          const o = t2[s3];
          for (const n of o.blockIds)
            this.blockRequests.set(n, (async () => {
              try {
                const a = (await r)[s3], l3 = n * this.blockSize, c = l3 - a.offset, h = Math.min(c + this.blockSize, a.data.byteLength), d3 = a.data.slice(c, h), u = new Cr(l3, d3.byteLength, d3, n);
                this.blockCache.set(n, u), this.abortedBlockIds.delete(n);
              } catch (a) {
                if (a.name === "AbortError")
                  a.signal = e2, this.blockCache.delete(n), this.abortedBlockIds.add(n);
                else
                  throw a;
              } finally {
                this.blockRequests.delete(n);
              }
            })());
        }
        this.blockIdsToFetch.clear();
      }
    }
    groupBlocks(e2) {
      const t2 = Array.from(e2).sort((n, a) => n - a);
      if (t2.length === 0)
        return [];
      let r = [], s3 = null;
      const o = [];
      for (const n of t2)
        s3 === null || s3 + 1 === n ? (r.push(n), s3 = n) : (o.push(new Oe2(r[0] * this.blockSize, r.length * this.blockSize, r)), r = [n], s3 = n);
      return o.push(new Oe2(r[0] * this.blockSize, r.length * this.blockSize, r)), o;
    }
    readSliceData(e2, t2) {
      return e2.map((r) => {
        let s3 = r.offset + r.length;
        this.fileSize !== null && (s3 = Math.min(this.fileSize, s3));
        const o = Math.floor(r.offset / this.blockSize), n = Math.floor(s3 / this.blockSize), a = new ArrayBuffer(r.length), l3 = new Uint8Array(a);
        for (let c = o;c <= n; ++c) {
          const h = t2.get(c), d3 = h.offset - r.offset, u = h.top - s3;
          let g2 = 0, f2 = 0, y;
          d3 < 0 ? g2 = -d3 : d3 > 0 && (f2 = d3), u < 0 ? y = h.length - g2 : y = s3 - h.offset - g2;
          const p2 = new Uint8Array(h.data, g2, y);
          l3.set(p2, f2);
        }
        return a;
      });
    }
  };
  Er = class Er extends Fe2 {
    constructor(e2) {
      super(), this.response = e2;
    }
    get status() {
      return this.response.status;
    }
    getHeader(e2) {
      return this.response.headers.get(e2);
    }
    async getData() {
      return this.response.arrayBuffer ? await this.response.arrayBuffer() : (await this.response.buffer()).buffer;
    }
  };
  Pr = class Pr extends Ee2 {
    constructor(e2, t2) {
      super(e2), this.credentials = t2;
    }
    async request({ headers: e2, signal: t2 } = {}) {
      const r = await fetch(this.url, {
        headers: e2,
        credentials: this.credentials,
        signal: t2
      });
      return new Er(r);
    }
  };
  kr = class kr extends Fe2 {
    constructor(e2, t2) {
      super(), this.xhr = e2, this.data = t2;
    }
    get status() {
      return this.xhr.status;
    }
    getHeader(e2) {
      return this.xhr.getResponseHeader(e2);
    }
    async getData() {
      return this.data;
    }
  };
  Rr = class Rr extends Ee2 {
    constructRequest(e2, t2) {
      return new Promise((r, s3) => {
        const o = new XMLHttpRequest;
        o.open("GET", this.url), o.responseType = "arraybuffer";
        for (const [n, a] of Object.entries(e2))
          o.setRequestHeader(n, a);
        o.onload = () => {
          const n = o.response;
          r(new kr(o, n));
        }, o.onerror = s3, o.onabort = () => s3(new q2("Request aborted")), o.send(), t2 && (t2.aborted && o.abort(), t2.addEventListener("abort", () => o.abort()));
      });
    }
    async request({ headers: e2, signal: t2 } = {}) {
      return await this.constructRequest(e2, t2);
    }
  };
  he2 = {};
  Mr = class Mr extends Fe2 {
    constructor(e2, t2) {
      super(), this.response = e2, this.dataPromise = t2;
    }
    get status() {
      return this.response.statusCode;
    }
    getHeader(e2) {
      return this.response.headers[e2];
    }
    async getData() {
      return await this.dataPromise;
    }
  };
  Br = class Br extends Ee2 {
    constructor(e2) {
      super(e2), this.parsedUrl = he2.parse(this.url), this.httpApi = (this.parsedUrl.protocol === "http:", he2);
    }
    constructRequest(e2, t2) {
      return new Promise((r, s3) => {
        const o = this.httpApi.get({
          ...this.parsedUrl,
          headers: e2
        }, (n) => {
          const a = new Promise((l3) => {
            const c = [];
            n.on("data", (h) => {
              c.push(h);
            }), n.on("end", () => {
              const h = Buffer.concat(c).buffer;
              l3(h);
            }), n.on("error", s3);
          });
          r(new Mr(n, a));
        });
        o.on("error", s3), t2 && (t2.aborted && o.destroy(new q2("Request aborted")), t2.addEventListener("abort", () => o.destroy(new q2("Request aborted"))));
      });
    }
    async request({ headers: e2, signal: t2 } = {}) {
      return await this.constructRequest(e2, t2);
    }
  };
  Pe2 = class Pe2 extends Ce2 {
    constructor(e2, t2, r, s3) {
      super(), this.client = e2, this.headers = t2, this.maxRanges = r, this.allowFullFile = s3, this._fileSize = null;
    }
    async fetch(e2, t2) {
      return this.maxRanges >= e2.length ? this.fetchSlices(e2, t2) : (this.maxRanges > 0 && e2.length > 1, Promise.all(e2.map((r) => this.fetchSlice(r, t2))));
    }
    async fetchSlices(e2, t2) {
      const r = await this.client.request({
        headers: {
          ...this.headers,
          Range: `bytes=${e2.map(({ offset: s3, length: o }) => `${s3}-${s3 + o}`).join(",")}`
        },
        signal: t2
      });
      if (r.ok)
        if (r.status === 206) {
          const { type: s3, params: o } = xr(r.getHeader("content-type"));
          if (s3 === "multipart/byteranges") {
            const d3 = br2(await r.getData(), o.boundary);
            return this._fileSize = d3[0].fileSize || null, d3;
          }
          const n = await r.getData(), { start: a, end: l3, total: c } = de2(r.getHeader("content-range"));
          this._fileSize = c || null;
          const h = [{
            data: n,
            offset: a,
            length: l3 - a
          }];
          if (e2.length > 1) {
            const d3 = await Promise.all(e2.slice(1).map((u) => this.fetchSlice(u, t2)));
            return h.concat(d3);
          }
          return h;
        } else {
          if (!this.allowFullFile)
            throw new Error("Server responded with full file");
          const s3 = await r.getData();
          return this._fileSize = s3.byteLength, [{
            data: s3,
            offset: 0,
            length: s3.byteLength
          }];
        }
      else
        throw new Error("Error fetching data.");
    }
    async fetchSlice(e2, t2) {
      const { offset: r, length: s3 } = e2, o = await this.client.request({
        headers: {
          ...this.headers,
          Range: `bytes=${r}-${r + s3}`
        },
        signal: t2
      });
      if (o.ok)
        if (o.status === 206) {
          const n = await o.getData(), { total: a } = de2(o.getHeader("content-range"));
          return this._fileSize = a || null, {
            data: n,
            offset: r,
            length: s3
          };
        } else {
          if (!this.allowFullFile)
            throw new Error("Server responded with full file");
          const n = await o.getData();
          return this._fileSize = n.byteLength, {
            data: n,
            offset: 0,
            length: n.byteLength
          };
        }
      else
        throw new Error("Error fetching data.");
    }
    get fileSize() {
      return this._fileSize;
    }
  };
  Ur = class Ur extends Ce2 {
    constructor(e2) {
      super(), this.file = e2;
    }
    async fetchSlice(e2, t2) {
      return new Promise((r, s3) => {
        const o = this.file.slice(e2.offset, e2.offset + e2.length), n = new FileReader;
        n.onload = (a) => r(a.target.result), n.onerror = s3, n.onabort = s3, n.readAsArrayBuffer(o), t2 && t2.addEventListener("abort", () => n.abort());
      });
    }
  };
  ie3 = class ie3 extends Error {
    constructor(e2) {
      super(`No image at index ${e2}`), this.index = e2;
    }
  };
  oe2 = class oe2 extends zr {
    constructor(e2, t2, r, s3, o = {}) {
      super(), this.source = e2, this.littleEndian = t2, this.bigTiff = r, this.firstIFDOffset = s3, this.cache = o.cache || false, this.ifdRequests = [], this.ghostValues = null;
    }
    async getSlice(e2, t2) {
      const r = this.bigTiff ? 4048 : 1024;
      return new yr((await this.source.fetch([{
        offset: e2,
        length: typeof t2 < "u" ? t2 : r
      }]))[0], e2, this.littleEndian, this.bigTiff);
    }
    async parseFileDirectoryAt(e2) {
      const t2 = this.bigTiff ? 20 : 12, r = this.bigTiff ? 8 : 2;
      let s3 = await this.getSlice(e2);
      const o = this.bigTiff ? s3.readUint64(e2) : s3.readUint16(e2), n = o * t2 + (this.bigTiff ? 16 : 6);
      s3.covers(e2, n) || (s3 = await this.getSlice(e2, n));
      const a = {};
      let l3 = e2 + (this.bigTiff ? 8 : 2);
      for (let d3 = 0;d3 < o; l3 += t2, ++d3) {
        const u = s3.readUint16(l3), g2 = s3.readUint16(l3 + 2), f2 = this.bigTiff ? s3.readUint64(l3 + 4) : s3.readUint32(l3 + 4);
        let y, p2;
        const w = ge2(g2), m2 = l3 + (this.bigTiff ? 12 : 8);
        if (w * f2 <= (this.bigTiff ? 8 : 4))
          y = K3(s3, g2, f2, m2);
        else {
          const b = s3.readOffset(m2), T2 = ge2(g2) * f2;
          if (s3.covers(b, T2))
            y = K3(s3, g2, f2, b);
          else {
            const S2 = await this.getSlice(b, T2);
            y = K3(S2, g2, f2, b);
          }
        }
        f2 === 1 && Ht2.indexOf(u) === -1 && !(g2 === x3.RATIONAL || g2 === x3.SRATIONAL) ? p2 = y[0] : p2 = y, a[J[u]] = p2;
      }
      const c = Nr(a), h = s3.readOffset(e2 + r + t2 * o);
      return new jr(a, c, h);
    }
    async requestIFD(e2) {
      if (this.ifdRequests[e2])
        return this.ifdRequests[e2];
      if (e2 === 0)
        return this.ifdRequests[e2] = this.parseFileDirectoryAt(this.firstIFDOffset), this.ifdRequests[e2];
      if (!this.ifdRequests[e2 - 1])
        try {
          this.ifdRequests[e2 - 1] = this.requestIFD(e2 - 1);
        } catch (t2) {
          throw t2 instanceof ie3 ? new ie3(e2) : t2;
        }
      return this.ifdRequests[e2] = (async () => {
        const t2 = await this.ifdRequests[e2 - 1];
        if (t2.nextIFDByteOffset === 0)
          throw new ie3(e2);
        return this.parseFileDirectoryAt(t2.nextIFDByteOffset);
      })(), this.ifdRequests[e2];
    }
    async getImage(e2 = 0) {
      const t2 = await this.requestIFD(e2);
      return new dr2(t2.fileDirectory, t2.geoKeyDirectory, this.dataView, this.littleEndian, this.cache, this.source);
    }
    async getImageCount() {
      let e2 = 0, t2 = true;
      for (;t2; )
        try {
          await this.requestIFD(e2), ++e2;
        } catch (r) {
          if (r instanceof ie3)
            t2 = false;
          else
            throw r;
        }
      return e2;
    }
    async getGhostValues() {
      const e2 = this.bigTiff ? 16 : 8;
      if (this.ghostValues)
        return this.ghostValues;
      const t2 = "GDAL_STRUCTURAL_METADATA_SIZE=", r = t2.length + 100;
      let s3 = await this.getSlice(e2, r);
      if (t2 === K3(s3, x3.ASCII, t2.length, e2)) {
        const n = K3(s3, x3.ASCII, r, e2).split(`
`)[0], a = Number(n.split("=")[1].split(" ")[0]) + n.length;
        a > r && (s3 = await this.getSlice(e2, a));
        const l3 = K3(s3, x3.ASCII, a, e2);
        this.ghostValues = {}, l3.split(`
`).filter((c) => c.length > 0).map((c) => c.split("=")).forEach(([c, h]) => {
          this.ghostValues[c] = h;
        });
      }
      return this.ghostValues;
    }
    static async fromSource(e2, t2, r) {
      const s3 = (await e2.fetch([{ offset: 0, length: 1024 }], r))[0], o = new gr(s3), n = o.getUint16(0, 0);
      let a;
      if (n === 18761)
        a = true;
      else if (n === 19789)
        a = false;
      else
        throw new TypeError("Invalid byte order value.");
      const l3 = o.getUint16(2, a);
      let c;
      if (l3 === 42)
        c = false;
      else if (l3 === 43) {
        if (c = true, o.getUint16(4, a) !== 8)
          throw new Error("Unsupported offset byte-size.");
      } else
        throw new TypeError("Invalid magic number.");
      const h = c ? o.getUint64(8, a) : o.getUint32(4, a);
      return new oe2(e2, a, c, h, t2);
    }
    close() {
      return typeof this.source.close == "function" ? this.source.close() : false;
    }
  };
  (function(i, e2) {
    typeof exports_main_8v7k2MJ1 > "u" || typeof i.OpenSeadragon < "u" && e2(i.OpenSeadragon);
  })(typeof window < "u" ? window : undefined, qr);
});

// src/static/collection.ts
var import_openseadragon = __toESM(require_openseadragon(), 1);

// node_modules/geotiff-tilesource/dist/geotiff-tilesource.mjs
init_main_8v7k2MJ1();

// src/static/util.ts
function hideLoader() {
  const loader = document.getElementById("loader");
  const canvas = document.getElementById("seadragon-viewer");
  if (loader) {
    loader.style.display = "none";
  }
  if (canvas) {
    canvas.style.display = "block";
  }
}

// src/static/collection.ts
qr(import_openseadragon.default);
var queryParams = new URLSearchParams(window.location.search);
var collection = queryParams.get("q");
async function fetchPhotos(collection2) {
  const resp = await fetch("/api/collection/" + collection2, {
    method: "GET"
  });
  const respJson = await resp.json();
  return respJson;
}
async function getTileSources(url) {
  return import_openseadragon.default.GeoTIFFTileSource.getAllTileSources(url, {
    logLatency: false
  });
}
async function initViewer(collection2) {
  const photoUrls = await fetchPhotos(collection2);
  console.log("photoUrls:", photoUrls);
  const tileSourcesPromises = photoUrls.map((url) => getTileSources(url));
  const tileSourcesArrays = await Promise.all(tileSourcesPromises);
  const tileSources = tileSourcesArrays.flat();
  let options = {
    id: "seadragon-viewer",
    tileSources,
    collectionMode: true,
    collectionRows: 3,
    collectionTileSize: 256,
    collectionTileMargin: 5,
    crossOriginPolicy: "Anonymous",
    collectionLayout: window.innerHeight > window.innerWidth ? "vertical" : "horizontal",
    showNavigator: true,
    showNavigationControl: false,
    drawer: "canvas"
  };
  let viewer = import_openseadragon.default(options);
  hideLoader();
  for (let i = 0;i < 100; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10));
    viewer.viewport.goHome(true);
  }
}
if (collection) {
  initViewer(collection);
}
