!function(a, b, c) {
    a.fn.quicklook = function(b) {
        var c = {
            speed: 400,
            controlFadeSpeed: 200,
            validateImages: !0,
            enableNavigation: !0,
            onLoad: {},
            onClick: {},
            onSkip: {},
            onImageLoad: {},
            onImageError: {},
            onClose: {}
        };
        return b = a.extend({}, c, b), d.initialize(this, b), d;
    };
    var d = {
        speed: 400,
        element: [],
        thumbnail: [],
        fullimage: [],
        initialize: function(b, e) {
            for (var f in e) this[f] = e[f];
            return this.linkElements = b, this.validateImages && this.validateLinks(), this.windowHeight = a(c).height(), 
            this.windowWidth = a(c).width(), this.addQuicklookWindow(), this.bind(), "function" == typeof d.onLoad && d.onLoad(this.linkElements, d.qlWindow), 
            d;
        },
        bind: function() {
            this.linkElements.on("click", function(b) {
                d.element = a(this), d.thumbnail = d.element.find("img").length ? d.element.find("img").eq(0) : a(this), 
                d.locateWindow(), d.loadLargeImage(), "function" == typeof d.onClick && d.onClick(d.element, d.thumbnail), 
                b.preventDefault();
            }), d.qlWindow.hover(function() {
                d.qlMast.stop().fadeIn(d.speed);
            }, function() {
                d.qlMast.delay(1e3).stop().fadeOut(d.speed);
            }), d.enableNavigation && a(d.qlInner).on("click", function() {
                d.skipImage.call(this);
            }), this.qlCover.on("click", function() {
                d.close();
            }), d.qlClose.on("click", function() {
                d.close();
            }), a(c).resize(function() {
                d.windowWidth = this.innerWidth, d.windowHeight = this.innerHeight, d.setMaxImageSize(d.qlWindow);
            });
        },
        bindKeys: function() {
            d.keybinding = a(c).on("keydown", function(a) {
                d.enableNavigation && (39 === a.which && (d.skipImage.call(this), a.preventDefault()), 
                37 === a.which && (d.skipImage.call(this, !0), a.preventDefault())), 27 === a.which && (d.close(), 
                a.preventDefault());
            });
        },
        getThumbCoordinates: function() {
            return {
                top: d.thumbnail.offset().top,
                left: d.thumbnail.offset().left,
                width: d.thumbnail.width(),
                height: d.thumbnail.height()
            };
        },
        getWindowCoordinates: function() {
            var b = d.windowWidth, e = d.windowHeight, f = a(c).scrollTop(), g = a(c).scrollLeft();
            return {
                winWidth: b,
                winHeight: e,
                imgWidth: d.fullimageWidth,
                imgHeight: d.fullimageHeight,
                top: (e - d.fullimageHeight) / 2,
                left: (b - d.fullimageWidth) / 2,
                scrolltop: f,
                scrollleft: g
            };
        },
        locateWindow: function() {
            var a = this.getThumbCoordinates();
            return d.qlWindow.css({
                top: a.top,
                left: a.left,
                width: a.width,
                height: a.height,
                opacity: 1
            }).show(), d;
        },
        loading: function() {
            d.qlWindow.addClass("loading").removeClass("loaded"), clearTimeout(d.loaderTimeout), 
            d.loaderTimeout = setTimeout(function() {
                d.qlLoader.fadeIn(100);
            }, 300);
        },
        loaded: function() {
            return clearTimeout(d.loaderTimeout), d.element.addClass("active"), d.qlWindow.removeClass("loading error").addClass("loaded"), 
            d.qlLoader.fadeOut(d.speed), d.keybinding || d.bindKeys(), "function" == typeof d.onImageLoad && d.onImageLoad(), 
            d;
        },
        validateLinks: function() {
            var b, c = [], e = d.linkElements.length;
            for (b = 0; e > b; b++) {
                var f = a(d.linkElements[b]).attr("href");
                f.match(/(jpg|jpeg|png|gif|tiff|pict|bmp|svg)$/) && c.push(d.linkElements[b]);
            }
            return d.linkElements = a(c), d;
        },
        loadLargeImage: function() {
            var b = d.element.attr("href"), c = a("<img />", {
                src: b
            }).load(function() {
                d.setMaxImageSize(this), a(this).width("100%").height("100%"), d.loaded(), d.qlInner.html(this), 
                d.qlWindow.css({
                    display: "block",
                    opacity: 0
                }), d.zoomQlWindow();
            });
            return c.error(function() {
                d.error(c), d.close();
            }), d;
        },
        skipImage: function() {
            if (d.qlWindow.is(":animated")) return !1;
            var b, c, e, f, g = d.linkElements, h = g.length;
            for (b = 0; h > b; b++) if (a(g[b]).hasClass("active")) {
                c = a(g[b]), e = a(b + 1 === h ? g[0] : g[b + 1]);
                break;
            }
            if (d.loading(), f = e.attr("href"), c.removeClass("active"), e.addClass("active"), 
            d.element = e, "function" == typeof d.onSkip && d.onSkip(e, f), d.loadError && d.loadError.unbind("error"), 
            f) {
                var i = a("<img />", {
                    src: f
                }).load(function() {
                    d.loadError.unbind("error"), a(d.qlInner).find("span.loading").remove(), d.setMaxImageSize(this), 
                    a(this).css({
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        opacity: 0
                    }), d.loaded(), d.qlInner.append(this), d.resizeQlWindow();
                });
                d.loadError = i.error(function() {
                    d.error(i);
                });
            }
            return d;
        },
        setMaxImageSize: function(a) {
            var b = d.windowWidth - 40, c = d.windowHeight - 40, e = a.width, f = a.height;
            if (e > b || f > c) if (e > f) {
                if (d.fullimageWidth = b, d.fullimageHeight = Math.round(f / e * b), d.fullimageHeight > c) {
                    var g = Math.round(c / d.fullimageHeight * 100);
                    d.fullimageHeight = c, d.fullimageWidth = Math.round(d.fullimageWidth / 100 * g);
                }
            } else if (f > e) {
                if (d.fullimageHeight = c, d.fullimageWidth = Math.round(e / f * c), d.fullimageWidth > b) {
                    var g = Math.round(b / d.fullimageWidth * 100);
                    d.fullimageWidth = b, d.fullimageHeight = Math.round(d.fullimageHeight / 100 * g);
                }
            } else d.fullimageWidth = b, d.fullimageHeight = b; else d.fullimageWidth = e, d.fullimageHeight = f;
            return d;
        },
        zoomQlWindow: function() {
            var b = d.getWindowCoordinates();
            return d.qlWindow.animate({
                top: b.top + b.scrolltop,
                left: b.left + b.scrollleft,
                width: b.imgWidth,
                height: b.imgHeight,
                opacity: 1
            }, d.speed, function() {
                a(this).css({
                    top: "50%",
                    left: "50%",
                    marginTop: b.scrolltop - b.imgHeight / 2,
                    marginLeft: b.scrollleft - b.imgWidth / 2
                });
            }), d.qlCover.fadeIn(d.speed), d;
        },
        resizeQlWindow: function() {
            var b = d.getWindowCoordinates(), c = d.qlWindow.find("img");
            return a(c[0]).stop().fadeOut(d.speed, function() {
                a(this).remove();
            }), a(c[1]).stop().animate({
                opacity: 1
            }, d.speed), d.qlWindow.stop().animate({
                marginTop: b.scrolltop - b.imgHeight / 2,
                marginLeft: b.scrollleft - b.imgWidth / 2,
                width: b.imgWidth,
                height: b.imgHeight
            }, d.speed), a(d.qlNext, d.qlPrev).hide(), d;
        },
        close: function() {
            d.qlCover.fadeOut(d.speed), d.element.removeClass("active");
            {
                var b = this.getThumbCoordinates();
                d.getWindowCoordinates();
            }
            return d.qlWindow.css({
                top: d.qlWindow.offset().top,
                left: d.qlWindow.offset().left,
                marginTop: 0,
                marginLeft: 0
            }), d.qlWindow.animate({
                top: b.top,
                left: b.left,
                width: b.width,
                height: b.height,
                opacity: 0
            }, d.speed, function() {
                a(this).hide(), d.qlInner.find("img").remove();
            }), d.keybinding && (d.keybinding.unbind("keydown"), delete d.keybinding), "function" == typeof d.onClose && d.onClose(d.qlWindow), 
            d;
        },
        error: function(a) {
            return d.qlWindow.addClass("error"), clearTimeout(d.loaderTimeout), d.qlLoader.hide(), 
            d.qlInner.find("img").hide(), "function" == typeof d.onImageError && d.onImageError(a), 
            d;
        },
        addQuicklookWindow: function() {
            return this.qlCover = a("<div>", {
                id: "quicklookcover"
            }).appendTo("body"), this.qlWindow = a("<div>", {
                id: "quicklookwindow"
            }).appendTo("body"), this.qlInner = a("<div>", {
                id: "quicklookinner"
            }).appendTo(this.qlWindow), this.qlMast = a("<div>", {
                id: "quicklookmast"
            }).prependTo(this.qlWindow), this.qlClose = a("<a>", {
                id: "quicklookclose"
            }).prependTo(this.qlMast), this.qlLoader = a("<div>", {
                id: "quicklookloader"
            }).appendTo(this.qlWindow), d;
        }
    };
}(jQuery, document, window, void 0), $(function() {
    $(".gallery").find("a").quicklook();
});