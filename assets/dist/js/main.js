!function(a, b, c, d) {
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
        return b = a.extend({}, c, b), e.initialize(this, b), e;
    };
    var e = {
        speed: 400,
        element: [],
        thumbnail: [],
        fullimage: [],
        initialize: function(b, d) {
            for (var f in d) this[f] = d[f];
            return this.linkElements = b, this.validateImages && this.validateLinks(), this.windowHeight = a(c).height(), 
            this.windowWidth = a(c).width(), this.addQuicklookWindow(), this.bind(), "function" == typeof e.onLoad && e.onLoad(this.linkElements, e.qlWindow), 
            e;
        },
        bind: function() {
            this.linkElements.on("click", function(b) {
                e.element = a(this), e.thumbnail = e.element.find("img").length ? e.element.find("img").eq(0) : a(this), 
                e.locateWindow(), e.loadLargeImage(), "function" == typeof e.onClick && e.onClick(e.element, e.thumbnail), 
                b.preventDefault();
            }), e.enableNavigation && a(e.qlInner).on("click", function(a) {
                e.skipImage.call(this);
            }), this.qlCover.on("click", function() {
                e.close();
            }), e.qlClose.on("click", function() {
                e.close();
            }), e.qlLink.on("click", function() {
                e.openImagePath();
            }), a(c).resize(function() {
                e.windowWidth = this.innerWidth, e.windowHeight = this.innerHeight, e.setMaxImageSize(e.qlWindow);
            });
        },
        bindKeys: function() {
            e.keybinding = a(c).on("keydown", function(a) {
                e.enableNavigation && (39 === a.which && (e.skipImage.call(this), a.preventDefault()), 
                37 === a.which && (e.skipImage.call(this, !0), a.preventDefault())), 27 === a.which && (e.close(), 
                a.preventDefault());
            });
        },
        getThumbCoordinates: function() {
            return {
                top: e.thumbnail.offset().top,
                left: e.thumbnail.offset().left,
                width: e.thumbnail.width(),
                height: e.thumbnail.height()
            };
        },
        getWindowCoordinates: function() {
            var b = e.windowWidth, d = e.windowHeight, f = a(c).scrollTop(), g = a(c).scrollLeft();
            return {
                winWidth: b,
                winHeight: d,
                imgWidth: e.fullimageWidth,
                imgHeight: e.fullimageHeight,
                top: (d - e.fullimageHeight) / 2,
                left: (b - e.fullimageWidth) / 2,
                scrolltop: f,
                scrollleft: g
            };
        },
        locateWindow: function() {
            var a = this.getThumbCoordinates();
            return e.qlWindow.css({
                top: a.top,
                left: a.left,
                width: a.width,
                height: a.height,
                opacity: 1
            }).show(), e;
        },
        loading: function() {
            e.qlWindow.addClass("loading").removeClass("loaded"), clearTimeout(e.loaderTimeout), 
            e.loaderTimeout = setTimeout(function() {
                e.qlLoader.fadeIn(100);
            }, 300);
        },
        loaded: function() {
            return clearTimeout(e.loaderTimeout), e.element.addClass("active"), e.qlWindow.removeClass("loading error").addClass("loaded"), 
            e.qlLoader.fadeOut(e.speed), e.keybinding || e.bindKeys(), "function" == typeof e.onImageLoad && e.onImageLoad(), 
            e;
        },
        validateLinks: function() {
            var b, c = [], d = e.linkElements.length;
            for (b = 0; d > b; b++) {
                var f = a(e.linkElements[b]).attr("href");
                f.match(/(jpg|jpeg|png|gif|tiff|pict|bmp|svg)$/) && c.push(e.linkElements[b]);
            }
            return e.linkElements = a(c), e;
        },
        loadLargeImage: function() {
            var b = e.element.attr("href"), c = a("<img />", {
                src: b
            }).load(function() {
                e.setMaxImageSize(this), a(this).width("100%").height("100%"), e.loaded(), e.qlInner.html(this), 
                e.qlWindow.css({
                    display: "block",
                    opacity: 0
                }), e.zoomQlWindow();
            });
            return c.error(function(a) {
                e.error(c), e.close();
            }), e;
        },
        skipImage: function(b) {
            if (e.qlWindow.is(":animated")) return !1;
            var c, d, f, g, h = e.linkElements, i = h.length;
            for (c = 0; i > c; c++) if (a(h[c]).hasClass("active")) {
                d = a(h[c]), f = a(c + 1 === i ? h[0] : h[c + 1]);
                break;
            }
            if (e.loading(), g = f.attr("href"), d.removeClass("active"), f.addClass("active"), 
            e.element = f, "function" == typeof e.onSkip && e.onSkip(f, g), e.loadError && e.loadError.unbind("error"), 
            g) {
                var j = a("<img />", {
                    src: g
                }).load(function() {
                    e.loadError.unbind("error"), a(e.qlInner).find("span.loading").remove(), e.setMaxImageSize(this), 
                    a(this).css({
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        opacity: 0
                    }), e.loaded(), e.qlInner.append(this), e.resizeQlWindow();
                });
                e.loadError = j.error(function(a) {
                    e.error(j);
                });
            }
            return e;
        },
        setMaxImageSize: function(a) {
            var b = e.windowWidth - 40, c = e.windowHeight - 40, d = a.width, f = a.height;
            if (d > b || f > c) if (d > f) {
                if (e.fullimageWidth = b, e.fullimageHeight = Math.round(f / d * b), e.fullimageHeight > c) {
                    var g = Math.round(c / e.fullimageHeight * 100);
                    e.fullimageHeight = c, e.fullimageWidth = Math.round(e.fullimageWidth / 100 * g);
                }
            } else if (f > d) {
                if (e.fullimageHeight = c, e.fullimageWidth = Math.round(d / f * c), e.fullimageWidth > b) {
                    var g = Math.round(b / e.fullimageWidth * 100);
                    e.fullimageWidth = b, e.fullimageHeight = Math.round(e.fullimageHeight / 100 * g);
                }
            } else e.fullimageWidth = b, e.fullimageHeight = b; else e.fullimageWidth = d, e.fullimageHeight = f;
            return e;
        },
        zoomQlWindow: function() {
            var b = e.getWindowCoordinates();
            return e.qlWindow.animate({
                top: b.top + b.scrolltop,
                left: b.left + b.scrollleft,
                width: b.imgWidth,
                height: b.imgHeight,
                opacity: 1
            }, e.speed, function() {
                a(this).css({
                    top: "50%",
                    left: "50%",
                    marginTop: b.scrolltop - b.imgHeight / 2,
                    marginLeft: b.scrollleft - b.imgWidth / 2
                });
            }), e.qlCover.fadeIn(e.speed), e;
        },
        resizeQlWindow: function() {
            var b = e.getWindowCoordinates(), c = e.qlWindow.find("img");
            return a(c[0]).stop().fadeOut(e.speed, function() {
                a(this).remove();
            }), a(c[1]).stop().animate({
                opacity: 1
            }, e.speed), e.qlWindow.stop().animate({
                marginTop: b.scrolltop - b.imgHeight / 2,
                marginLeft: b.scrollleft - b.imgWidth / 2,
                width: b.imgWidth,
                height: b.imgHeight
            }, e.speed), a(e.qlNext, e.qlPrev).hide(), e;
        },
        close: function() {
            e.qlCover.fadeOut(e.speed), e.element.removeClass("active");
            var b = this.getThumbCoordinates();
            e.getWindowCoordinates();
            return e.qlWindow.css({
                top: e.qlWindow.offset().top,
                left: e.qlWindow.offset().left,
                marginTop: 0,
                marginLeft: 0
            }), e.qlWindow.animate({
                top: b.top,
                left: b.left,
                width: b.width,
                height: b.height,
                opacity: 0
            }, e.speed, function() {
                a(this).hide(), e.qlInner.find("img").remove();
            }), e.keybinding && (e.keybinding.unbind("keydown"), delete e.keybinding), "function" == typeof e.onClose && e.onClose(e.qlWindow), 
            e;
        },
        openImagePath: function() {
            var b = a(e.element).attr("href");
            b !== d && c.open(b);
        },
        error: function(a) {
            return e.qlWindow.addClass("error"), clearTimeout(e.loaderTimeout), e.qlLoader.hide(), 
            e.qlInner.find("img").hide(), "function" == typeof e.onImageError && e.onImageError(a), 
            e;
        },
        addQuicklookWindow: function() {
            return a("#quicklookcover").length || (this.qlCover = a("<div>", {
                id: "quicklookcover"
            }).appendTo("body"), this.qlWindow = a("<div>", {
                id: "quicklookwindow"
            }).appendTo("body"), this.qlInner = a("<div>", {
                id: "quicklookinner"
            }).appendTo(this.qlWindow), this.qlMast = a("<div>", {
                id: "quicklookmast"
            }).prependTo(this.qlWindow), this.qlLink = a("<a>", {
                id: "quicklooklink"
            }).prependTo(this.qlMast), this.qlClose = a("<a>", {
                id: "quicklookclose",
                text: "Close"
            }).prependTo(this.qlMast), this.qlLoader = a("<div>", {
                id: "quicklookloader"
            }).appendTo(this.qlWindow)), e;
        }
    };
}(jQuery, document, window, void 0), window.Scripts = {
    run: function() {
        this.addGalleryButton(), this.addQuickLook();
    },
    addGalleryButton: function() {
        var a = $(".gallery .grid"), b = $("<button>", {
            "class": "button",
            text: "More"
        });
        b.on("click", function(c) {
            $.ajax({
                url: "gallery/fetch",
                dataType: "html",
                beforeSend: function() {
                    $(".gallery").addClass("loading");
                },
                success: function(c) {
                    a.append(c), b.remove(), $(".gallery a").off("click").quicklook();
                },
                complete: function() {
                    $(".gallery").removeClass("loading");
                }
            }), c.preventDefault();
        }), a.after(b);
    },
    addQuickLook: function() {
        $(".gallery a").quicklook();
    }
}, Scripts.run();