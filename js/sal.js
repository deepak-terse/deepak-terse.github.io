! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.sal = t() : e.sal = t()
}(window, (function() {
    return function(e) {
        var t = {};

        function n(r) {
            if (t[r]) return t[r].exports;
            var o = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }
        return n.m = e, n.c = t, n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
            })
        }, n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, n.t = function(e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var o in e) n.d(r, o, function(t) {
                    return e[t]
                }.bind(null, o));
            return r
        }, n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "dist/", n(n.s = 0)
    }([function(e, t, n) {
        "use strict";
        n.r(t);
        n(1);

        function r(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, r)
            }
            return n
        }

        function o(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? r(n, !0).forEach((function(t) {
                    i(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : r(n).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }

        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var a = {
                rootMargin: "0% 50%",
                threshold: .5,
                animateClassName: "sal-animate",
                disabledClassName: "sal-disabled",
                enterEventName: "sal:in",
                exitEventName: "sal:out",
                selector: "[data-sal]",
                once: !0,
                disabled: !1
            },
            s = [],
            l = null,
            c = function(e, t) {
                var n = new CustomEvent(e, {
                    bubbles: !0,
                    detail: t
                });
                t.target.dispatchEvent(n)
            },
            u = function() {
                document.body.classList.add(a.disabledClassName)
            },
            f = function() {
                return a.disabled || "function" == typeof a.disabled && a.disabled()
            },
            d = function(e, t) {
                e.forEach((function(e) {
                    e.intersectionRatio >= a.threshold ? (! function(e) {
                        e.target.classList.add(a.animateClassName), c(a.enterEventName, e)
                    }(e), a.once && t.unobserve(e.target)) : a.once || function(e) {
                        e.target.classList.remove(a.animateClassName), c(a.exitEventName, e)
                    }(e)
                }))
            },
            b = function() {
                u(), l.disconnect(), l = null
            },
            p = function() {
                document.body.classList.remove(a.disabledClassName), l = new IntersectionObserver(d, {
                    rootMargin: a.rootMargin,
                    threshold: a.threshold
                }), (s = [].filter.call(document.querySelectorAll(a.selector), (function(e) {
                    return ! function(e) {
                        return e.classList.contains(a.animateClassName)
                    }(e, a.animateClassName)
                }))).forEach((function(e) {
                    return l.observe(e)
                }))
            };
        t.default = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a;
            if (e !== a && (a = o({}, a, {}, e)), !window.IntersectionObserver) throw u(), Error("\n      Your browser does not support IntersectionObserver!\n      Get a polyfill from here:\n      https://github.com/w3c/IntersectionObserver/tree/master/polyfill\n    ");
            return f() ? u() : p(), {
                elements: s,
                disable: b,
                enable: p
            }
        }
    }, function(e, t, n) {}]).default
}));
//# sourceMappingURL=sal.js.map