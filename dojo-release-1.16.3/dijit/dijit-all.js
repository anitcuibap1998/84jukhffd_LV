//>>built
require({
    cache: {
        "dijit/ColorPalette": function() {
            define(["require", "dojo/text!./templates/ColorPalette.html", "./_Widget", "./_TemplatedMixin", "./_PaletteMixin", "./hccss", "dojo/i18n", "dojo/_base/Color", "dojo/_base/declare", "dojo/dom-construct", "dojo/string", "dojo/i18n!dojo/nls/colors", "dojo/colors"], function(_1, _2, _3, _4, _5, _6, _7, _8, _9, _a, _b) {
                var _c = _9("dijit.ColorPalette", [_3, _4, _5], {
                    palette: "7x10",
                    _palettes: {
                        "7x10": [
                            ["white", "seashell", "cornsilk", "lemonchiffon", "lightyellow", "palegreen", "paleturquoise", "lightcyan", "lavender", "plum"],
                            ["lightgray", "pink", "bisque", "moccasin", "khaki", "lightgreen", "lightseagreen", "lightskyblue", "cornflowerblue", "violet"],
                            ["silver", "lightcoral", "sandybrown", "orange", "palegoldenrod", "chartreuse", "mediumturquoise", "skyblue", "mediumslateblue", "orchid"],
                            ["gray", "red", "orangered", "darkorange", "yellow", "limegreen", "darkseagreen", "royalblue", "slateblue", "mediumorchid"],
                            ["dimgray", "crimson", "chocolate", "coral", "gold", "forestgreen", "seagreen", "blue", "blueviolet", "darkorchid"],
                            ["darkslategray", "firebrick", "saddlebrown", "sienna", "olive", "green", "darkcyan", "mediumblue", "darkslateblue", "darkmagenta"],
                            ["black", "darkred", "maroon", "brown", "darkolivegreen", "darkgreen", "midnightblue", "navy", "indigo", "purple"]
                        ],
                        "3x4": [
                            ["white", "lime", "green", "blue"],
                            ["silver", "yellow", "fuchsia", "navy"],
                            ["gray", "red", "purple", "black"]
                        ]
                    },
                    templateString: _2,
                    baseClass: "dijitColorPalette",
                    _dyeFactory: function(_d, _e, _f, _10) { return new this._dyeClass(_d, _e, _f, _10); },
                    buildRendering: function() {
                        this.inherited(arguments);
                        this._dyeClass = _9(_c._Color, { palette: this.palette });
                        this._preparePalette(this._palettes[this.palette], _7.getLocalization("dojo", "colors", this.lang));
                    }
                });
                _c._Color = _9("dijit._Color", _8, {
                    template: "<span class='dijitInline dijitPaletteImg'>" + "<img src='${blankGif}' alt='${alt}' title='${title}' class='dijitColorPaletteSwatch' style='background-color: ${color}'/>" + "</span>",
                    hcTemplate: "<span class='dijitInline dijitPaletteImg' style='position: relative; overflow: hidden; height: 12px; width: 14px;'>" + "<img src='${image}' alt='${alt}' title='${title}' style='position: absolute; left: ${left}px; top: ${top}px; ${size}'/>" + "</span>",
                    _imagePaths: { "7x10": _1.toUrl("./themes/a11y/colors7x10.png"), "3x4": _1.toUrl("./themes/a11y/colors3x4.png") },
                    constructor: function(_11, row, col, _12) {
                        this._title = _12;
                        this._row = row;
                        this._col = col;
                        this.setColor(_8.named[_11]);
                    },
                    getValue: function() { return this.toHex(); },
                    fillCell: function(_13, _14) {
                        var _15 = _b.substitute(_6("highcontrast") ? this.hcTemplate : this.template, { color: this.toHex(), blankGif: _14, alt: this._title, title: this._title, image: this._imagePaths[this.palette].toString(), left: this._col * -20 - 5, top: this._row * -20 - 5, size: this.palette == "7x10" ? "height: 145px; width: 206px" : "height: 64px; width: 86px" });
                        _a.place(_15, _13);
                    }
                });
                return _c;
            });
        },
        "dijit/_PaletteMixin": function() {
            define(["dojo/_base/declare", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/keys", "dojo/_base/lang", "dojo/on", "./_CssStateMixin", "./a11yclick", "./focus", "./typematic"], function(_16, _17, _18, _19, _1a, _1b, on, _1c, _1d, _1e, _1f) {
                var _20 = _16("dijit._PaletteMixin", _1c, {
                    defaultTimeout: 500,
                    timeoutChangeRate: 0.9,
                    value: "",
                    _selectedCell: -1,
                    tabIndex: "0",
                    cellClass: "dijitPaletteCell",
                    dyeClass: null,
                    _dyeFactory: function(_21) { var _22 = typeof this.dyeClass == "string" ? _1b.getObject(this.dyeClass) : this.dyeClass; return new _22(_21); },
                    _preparePalette: function(_23, _24) {
                        this._cells = [];
                        var url = this._blankGif;
                        this.own(on(this.gridNode, _1d, _1b.hitch(this, "_onCellClick")));
                        for (var row = 0; row < _23.length; row++) {
                            var _25 = _19.create("tr", { tabIndex: "-1", role: "row" }, this.gridNode);
                            for (var col = 0; col < _23[row].length; col++) {
                                var _26 = _23[row][col];
                                if (_26) {
                                    var _27 = this._dyeFactory(_26, row, col, _24[_26]);
                                    var _28 = _19.create("td", { "class": this.cellClass, tabIndex: "-1", title: _24[_26], role: "gridcell" }, _25);
                                    _27.fillCell(_28, url);
                                    _28.idx = this._cells.length;
                                    this._cells.push({ node: _28, dye: _27 });
                                }
                            }
                        }
                        this._xDim = _23[0].length;
                        this._yDim = _23.length;
                        var _29 = { UP_ARROW: -this._xDim, DOWN_ARROW: this._xDim, RIGHT_ARROW: this.isLeftToRight() ? 1 : -1, LEFT_ARROW: this.isLeftToRight() ? -1 : 1 };
                        for (var key in _29) { this.own(_1f.addKeyListener(this.domNode, { keyCode: _1a[key], ctrlKey: false, altKey: false, shiftKey: false }, this, function() { var _2a = _29[key]; return function(_2b) { this._navigateByKey(_2a, _2b); }; }(), this.timeoutChangeRate, this.defaultTimeout)); }
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        this._setCurrent(this._cells[0].node);
                    },
                    focus: function() { _1e.focus(this._currentFocus); },
                    _onCellClick: function(evt) {
                        var _2c = evt.target;
                        while (_2c.tagName != "TD") {
                            if (!_2c.parentNode || _2c == this.gridNode) { return; }
                            _2c = _2c.parentNode;
                        }
                        var _2d = this._getDye(_2c).getValue();
                        this._setCurrent(_2c);
                        _1e.focus(_2c);
                        this._setValueAttr(_2d, true);
                        evt.stopPropagation();
                        evt.preventDefault();
                    },
                    _setCurrent: function(_2e) {
                        if ("_currentFocus" in this) { _17.set(this._currentFocus, "tabIndex", "-1"); }
                        this._currentFocus = _2e;
                        if (_2e) { _17.set(_2e, "tabIndex", this.tabIndex); }
                    },
                    _setValueAttr: function(_2f, _30) {
                        if (this._selectedCell >= 0) { _18.remove(this._cells[this._selectedCell].node, this.cellClass + "Selected"); }
                        this._selectedCell = -1;
                        if (_2f) {
                            for (var i = 0; i < this._cells.length; i++) {
                                if (_2f == this._cells[i].dye.getValue()) {
                                    this._selectedCell = i;
                                    _18.add(this._cells[i].node, this.cellClass + "Selected");
                                    break;
                                }
                            }
                        }
                        this._set("value", this._selectedCell >= 0 ? _2f : null);
                        if (_30 || _30 === undefined) { this.onChange(_2f); }
                    },
                    onChange: function() {},
                    _navigateByKey: function(_31, _32) {
                        if (_32 == -1) { return; }
                        var _33 = this._currentFocus.idx + _31;
                        if (_33 < this._cells.length && _33 > -1) {
                            var _34 = this._cells[_33].node;
                            this._setCurrent(_34);
                            this.defer(_1b.hitch(_1e, "focus", _34));
                        }
                    },
                    _getDye: function(_35) { return this._cells[_35.idx].dye; }
                });
                return _20;
            });
        },
        "dojo/colors": function() {
            define(["./_base/kernel", "./_base/lang", "./_base/Color", "./_base/array"], function(_36, _37, _38, _39) {
                var _3a = {};
                _37.setObject("dojo.colors", _3a);
                var _3b = function(m1, m2, h) { if (h < 0) {++h; } if (h > 1) {--h; } var h6 = 6 * h; if (h6 < 1) { return m1 + (m2 - m1) * h6; } if (2 * h < 1) { return m2; } if (3 * h < 2) { return m1 + (m2 - m1) * (2 / 3 - h) * 6; } return m1; };
                _36.colorFromRgb = _38.fromRgb = function(_3c, obj) {
                    var m = _3c.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
                    if (m) {
                        var c = m[2].split(/\s*,\s*/),
                            l = c.length,
                            t = m[1],
                            a;
                        if ((t == "rgb" && l == 3) || (t == "rgba" && l == 4)) { var r = c[0]; if (r.charAt(r.length - 1) == "%") { a = _39.map(c, function(x) { return parseFloat(x) * 2.56; }); if (l == 4) { a[3] = c[3]; } return _38.fromArray(a, obj); } return _38.fromArray(c, obj); }
                        if ((t == "hsl" && l == 3) || (t == "hsla" && l == 4)) {
                            var H = ((parseFloat(c[0]) % 360) + 360) % 360 / 360,
                                S = parseFloat(c[1]) / 100,
                                L = parseFloat(c[2]) / 100,
                                m2 = L <= 0.5 ? L * (S + 1) : L + S - L * S,
                                m1 = 2 * L - m2;
                            a = [_3b(m1, m2, H + 1 / 3) * 256, _3b(m1, m2, H) * 256, _3b(m1, m2, H - 1 / 3) * 256, 1];
                            if (l == 4) { a[3] = c[3]; }
                            return _38.fromArray(a, obj);
                        }
                    }
                    return null;
                };
                var _3d = function(c, low, _3e) { c = Number(c); return isNaN(c) ? _3e : c < low ? low : c > _3e ? _3e : c; };
                _38.prototype.sanitize = function() {
                    var t = this;
                    t.r = Math.round(_3d(t.r, 0, 255));
                    t.g = Math.round(_3d(t.g, 0, 255));
                    t.b = Math.round(_3d(t.b, 0, 255));
                    t.a = _3d(t.a, 0, 1);
                    return this;
                };
                _3a.makeGrey = _38.makeGrey = function(g, a) { return _38.fromArray([g, g, g, a]); };
                _37.mixin(_38.named, { "aliceblue": [240, 248, 255], "antiquewhite": [250, 235, 215], "aquamarine": [127, 255, 212], "azure": [240, 255, 255], "beige": [245, 245, 220], "bisque": [255, 228, 196], "blanchedalmond": [255, 235, 205], "blueviolet": [138, 43, 226], "brown": [165, 42, 42], "burlywood": [222, 184, 135], "cadetblue": [95, 158, 160], "chartreuse": [127, 255, 0], "chocolate": [210, 105, 30], "coral": [255, 127, 80], "cornflowerblue": [100, 149, 237], "cornsilk": [255, 248, 220], "crimson": [220, 20, 60], "cyan": [0, 255, 255], "darkblue": [0, 0, 139], "darkcyan": [0, 139, 139], "darkgoldenrod": [184, 134, 11], "darkgray": [169, 169, 169], "darkgreen": [0, 100, 0], "darkgrey": [169, 169, 169], "darkkhaki": [189, 183, 107], "darkmagenta": [139, 0, 139], "darkolivegreen": [85, 107, 47], "darkorange": [255, 140, 0], "darkorchid": [153, 50, 204], "darkred": [139, 0, 0], "darksalmon": [233, 150, 122], "darkseagreen": [143, 188, 143], "darkslateblue": [72, 61, 139], "darkslategray": [47, 79, 79], "darkslategrey": [47, 79, 79], "darkturquoise": [0, 206, 209], "darkviolet": [148, 0, 211], "deeppink": [255, 20, 147], "deepskyblue": [0, 191, 255], "dimgray": [105, 105, 105], "dimgrey": [105, 105, 105], "dodgerblue": [30, 144, 255], "firebrick": [178, 34, 34], "floralwhite": [255, 250, 240], "forestgreen": [34, 139, 34], "gainsboro": [220, 220, 220], "ghostwhite": [248, 248, 255], "gold": [255, 215, 0], "goldenrod": [218, 165, 32], "greenyellow": [173, 255, 47], "grey": [128, 128, 128], "honeydew": [240, 255, 240], "hotpink": [255, 105, 180], "indianred": [205, 92, 92], "indigo": [75, 0, 130], "ivory": [255, 255, 240], "khaki": [240, 230, 140], "lavender": [230, 230, 250], "lavenderblush": [255, 240, 245], "lawngreen": [124, 252, 0], "lemonchiffon": [255, 250, 205], "lightblue": [173, 216, 230], "lightcoral": [240, 128, 128], "lightcyan": [224, 255, 255], "lightgoldenrodyellow": [250, 250, 210], "lightgray": [211, 211, 211], "lightgreen": [144, 238, 144], "lightgrey": [211, 211, 211], "lightpink": [255, 182, 193], "lightsalmon": [255, 160, 122], "lightseagreen": [32, 178, 170], "lightskyblue": [135, 206, 250], "lightslategray": [119, 136, 153], "lightslategrey": [119, 136, 153], "lightsteelblue": [176, 196, 222], "lightyellow": [255, 255, 224], "limegreen": [50, 205, 50], "linen": [250, 240, 230], "magenta": [255, 0, 255], "mediumaquamarine": [102, 205, 170], "mediumblue": [0, 0, 205], "mediumorchid": [186, 85, 211], "mediumpurple": [147, 112, 219], "mediumseagreen": [60, 179, 113], "mediumslateblue": [123, 104, 238], "mediumspringgreen": [0, 250, 154], "mediumturquoise": [72, 209, 204], "mediumvioletred": [199, 21, 133], "midnightblue": [25, 25, 112], "mintcream": [245, 255, 250], "mistyrose": [255, 228, 225], "moccasin": [255, 228, 181], "navajowhite": [255, 222, 173], "oldlace": [253, 245, 230], "olivedrab": [107, 142, 35], "orange": [255, 165, 0], "orangered": [255, 69, 0], "orchid": [218, 112, 214], "palegoldenrod": [238, 232, 170], "palegreen": [152, 251, 152], "paleturquoise": [175, 238, 238], "palevioletred": [219, 112, 147], "papayawhip": [255, 239, 213], "peachpuff": [255, 218, 185], "peru": [205, 133, 63], "pink": [255, 192, 203], "plum": [221, 160, 221], "powderblue": [176, 224, 230], "rosybrown": [188, 143, 143], "royalblue": [65, 105, 225], "saddlebrown": [139, 69, 19], "salmon": [250, 128, 114], "sandybrown": [244, 164, 96], "seagreen": [46, 139, 87], "seashell": [255, 245, 238], "sienna": [160, 82, 45], "skyblue": [135, 206, 235], "slateblue": [106, 90, 205], "slategray": [112, 128, 144], "slategrey": [112, 128, 144], "snow": [255, 250, 250], "springgreen": [0, 255, 127], "steelblue": [70, 130, 180], "tan": [210, 180, 140], "thistle": [216, 191, 216], "tomato": [255, 99, 71], "turquoise": [64, 224, 208], "violet": [238, 130, 238], "wheat": [245, 222, 179], "whitesmoke": [245, 245, 245], "yellowgreen": [154, 205, 50] });
                return _38;
            });
        },
        "dijit/Declaration": function() {
            define(["dojo/_base/array", "dojo/aspect", "dojo/_base/declare", "dojo/_base/lang", "dojo/parser", "dojo/query", "./_Widget", "./_TemplatedMixin", "./_WidgetsInTemplateMixin", "dojo/NodeList-dom"], function(_3f, _40, _41, _42, _43, _44, _45, _46, _47) {
                return _41("dijit.Declaration", _45, {
                    _noScript: true,
                    stopParser: true,
                    widgetClass: "",
                    defaults: null,
                    mixins: [],
                    buildRendering: function() {
                        var src = this.srcNodeRef.parentNode.removeChild(this.srcNodeRef),
                            _48 = _44("> script[type='dojo/method']", src).orphan(),
                            _49 = _44("> script[type='dojo/connect']", src).orphan(),
                            _4a = _44("> script[type='dojo/aspect']", src).orphan(),
                            _4b = src.nodeName;
                        var _4c = this.defaults || {};
                        _3f.forEach(_48, function(s) {
                            var evt = s.getAttribute("event") || s.getAttribute("data-dojo-event"),
                                _4d = _43._functionFromScript(s, "data-dojo-");
                            if (evt) { _4c[evt] = _4d; } else { _4a.push(s); }
                        });
                        if (this.mixins.length) { this.mixins = _3f.map(this.mixins, function(_4e) { return _42.getObject(_4e); }); } else { this.mixins = [_45, _46, _47]; }
                        _4c._skipNodeCache = true;
                        _4c.templateString = "<" + _4b + " class='" + src.className + "'" + " data-dojo-attach-point='" + (src.getAttribute("data-dojo-attach-point") || src.getAttribute("dojoAttachPoint") || "") + "' data-dojo-attach-event='" + (src.getAttribute("data-dojo-attach-event") || src.getAttribute("dojoAttachEvent") || "") + "' >" + src.innerHTML.replace(/\%7B/g, "{").replace(/\%7D/g, "}") + "</" + _4b + ">";
                        var wc = _41(this.widgetClass, this.mixins, _4c);
                        _3f.forEach(_4a, function(s) {
                            var _4f = s.getAttribute("data-dojo-advice") || "after",
                                _50 = s.getAttribute("data-dojo-method") || "postscript",
                                _51 = _43._functionFromScript(s);
                            _40.after(wc.prototype, _50, _51, true);
                        });
                        _3f.forEach(_49, function(s) {
                            var evt = s.getAttribute("event") || s.getAttribute("data-dojo-event"),
                                _52 = _43._functionFromScript(s);
                            _40.after(wc.prototype, evt, _52, true);
                        });
                    }
                });
            });
        },
        "dijit/_WidgetsInTemplateMixin": function() {
            define(["dojo/_base/array", "dojo/aspect", "dojo/_base/declare", "dojo/_base/lang", "dojo/parser"], function(_53, _54, _55, _56, _57) {
                return _55("dijit._WidgetsInTemplateMixin", null, {
                    _earlyTemplatedStartup: false,
                    contextRequire: null,
                    _beforeFillContent: function() {
                        if (/dojoType|data-dojo-type/i.test(this.domNode.innerHTML)) {
                            var _58 = this.domNode;
                            if (this.containerNode && !this.searchContainerNode) { this.containerNode.stopParser = true; }
                            _57.parse(_58, { noStart: !this._earlyTemplatedStartup, template: true, inherited: { dir: this.dir, lang: this.lang, textDir: this.textDir }, propsThis: this, contextRequire: this.contextRequire, scope: "dojo" }).then(_56.hitch(this, function(_59) { this._startupWidgets = _59; for (var i = 0; i < _59.length; i++) { this._processTemplateNode(_59[i], function(n, p) { return n[p]; }, function(_5a, _5b, _5c) { if (_5b in _5a) { return _5a.connect(_5a, _5b, _5c); } else { return _5a.on(_5b, _5c, true); } }); } if (this.containerNode && this.containerNode.stopParser) { delete this.containerNode.stopParser; } }));
                            if (!this._startupWidgets) { throw new Error(this.declaredClass + ": parser returned unfilled promise (probably waiting for module auto-load), " + "unsupported by _WidgetsInTemplateMixin.   Must pre-load all supporting widgets before instantiation."); }
                        }
                    },
                    _processTemplateNode: function(_5d, _5e, _5f) { if (_5e(_5d, "dojoType") || _5e(_5d, "data-dojo-type")) { return true; } return this.inherited(arguments); },
                    startup: function() {
                        _53.forEach(this._startupWidgets, function(w) { if (w && !w._started && w.startup) { w.startup(); } });
                        this._startupWidgets = null;
                        this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/Dialog": function() {
            define(["require", "dojo/_base/array", "dojo/aspect", "dojo/_base/declare", "dojo/Deferred", "dojo/dom", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/fx", "dojo/i18n", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/ready", "dojo/sniff", "dojo/touch", "dojo/window", "dojo/dnd/Moveable", "dojo/dnd/TimedMoveable", "./focus", "./_base/manager", "./_Widget", "./_TemplatedMixin", "./_CssStateMixin", "./form/_FormMixin", "./_DialogMixin", "./DialogUnderlay", "./layout/ContentPane", "./layout/utils", "dojo/text!./templates/Dialog.html", "./a11yclick", "dojo/i18n!./nls/common"], function(_60, _61, _62, _63, _64, dom, _65, _66, _67, fx, _68, _69, _6a, on, _6b, has, _6c, _6d, _6e, _6f, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _7a) {
                var _7b = new _64();
                _7b.resolve(true);

                function nop() {};
                var _7c = _63("dijit._DialogBase" + (has("dojo-bidi") ? "_NoBidi" : ""), [_73, _75, _76, _74], {
                    templateString: _7a,
                    baseClass: "dijitDialog",
                    cssStateNodes: { closeButtonNode: "dijitDialogCloseIcon" },
                    _setTitleAttr: { node: "titleNode", type: "innerHTML" },
                    open: false,
                    duration: _71.defaultDuration,
                    refocus: true,
                    autofocus: true,
                    _firstFocusItem: null,
                    _lastFocusItem: null,
                    draggable: true,
                    _setDraggableAttr: function(val) { this._set("draggable", val); },
                    maxRatio: 0.9,
                    closable: true,
                    _setClosableAttr: function(val) {
                        this.closeButtonNode.style.display = val ? "" : "none";
                        this._set("closable", val);
                    },
                    postMixInProperties: function() {
                        var _7d = _68.getLocalization("dijit", "common");
                        _6a.mixin(this, _7d);
                        this.inherited(arguments);
                    },
                    postCreate: function() {
                        _67.set(this.domNode, { display: "none", position: "absolute" });
                        this.ownerDocumentBody.appendChild(this.domNode);
                        this.inherited(arguments);
                        _62.after(this, "onExecute", _6a.hitch(this, "hide"), true);
                        _62.after(this, "onCancel", _6a.hitch(this, "hide"), true);
                        on(this.closeButtonNode, _6c.press, function(e) { e.stopPropagation(); });
                        this._modalconnects = [];
                    },
                    onLoad: function() {
                        this.resize();
                        this._position();
                        if (this.autofocus && _7e.isTop(this)) {
                            this._getFocusItems();
                            _70.focus(this._firstFocusItem);
                        }
                        this.inherited(arguments);
                    },
                    focus: function() {
                        this._getFocusItems();
                        _70.focus(this._firstFocusItem);
                    },
                    _endDrag: function() {
                        var _7f = _66.position(this.domNode),
                            _80 = _6d.getBox(this.ownerDocument);
                        _7f.y = Math.min(Math.max(_7f.y, 0), (_80.h - _7f.h));
                        _7f.x = Math.min(Math.max(_7f.x, 0), (_80.w - _7f.w));
                        this._relativePosition = _7f;
                        this._position();
                    },
                    _setup: function() {
                        var _81 = this.domNode;
                        if (this.titleBar && this.draggable) {
                            this._moveable = new((has("ie") == 6) ? _6f : _6e)(_81, { handle: this.titleBar });
                            _62.after(this._moveable, "onMoveStop", _6a.hitch(this, "_endDrag"), true);
                        } else { _65.add(_81, "dijitDialogFixed"); }
                        this.underlayAttrs = { dialogId: this.id, "class": _61.map(this["class"].split(/\s/), function(s) { return s + "_underlay"; }).join(" "), _onKeyDown: _6a.hitch(this, "_onKey"), ownerDocument: this.ownerDocument };
                    },
                    _size: function() { this.resize(); },
                    _position: function() {
                        if (!_65.contains(this.ownerDocumentBody, "dojoMove")) {
                            var _82 = this.domNode,
                                _83 = _6d.getBox(this.ownerDocument),
                                p = this._relativePosition,
                                bb = _66.position(_82),
                                l = Math.floor(_83.l + (p ? Math.min(p.x, _83.w - bb.w) : (_83.w - bb.w) / 2)),
                                t = Math.floor(_83.t + (p ? Math.min(p.y, _83.h - bb.h) : (_83.h - bb.h) / 2));
                            _67.set(_82, { left: l + "px", top: t + "px" });
                        }
                    },
                    _onKey: function(evt) {
                        if (evt.keyCode == _69.TAB) {
                            this._getFocusItems();
                            var _84 = evt.target;
                            if (this._firstFocusItem == this._lastFocusItem) {
                                evt.stopPropagation();
                                evt.preventDefault();
                            } else {
                                if (_84 == this._firstFocusItem && evt.shiftKey) {
                                    _70.focus(this._lastFocusItem);
                                    evt.stopPropagation();
                                    evt.preventDefault();
                                } else {
                                    if (_84 == this._lastFocusItem && !evt.shiftKey) {
                                        _70.focus(this._firstFocusItem);
                                        evt.stopPropagation();
                                        evt.preventDefault();
                                    }
                                }
                            }
                        } else {
                            if (this.closable && evt.keyCode == _69.ESCAPE) {
                                this.onCancel();
                                evt.stopPropagation();
                                evt.preventDefault();
                            }
                        }
                    },
                    show: function() {
                        if (this.open) { return _7b.promise; }
                        if (!this._started) { this.startup(); }
                        if (!this._alreadyInitialized) {
                            this._setup();
                            this._alreadyInitialized = true;
                        }
                        if (this._fadeOutDeferred) {
                            this._fadeOutDeferred.cancel();
                            _7e.hide(this);
                        }
                        var win = _6d.get(this.ownerDocument);
                        this._modalconnects.push(on(win, "scroll", _6a.hitch(this, "resize", null)));
                        this._modalconnects.push(on(this.domNode, "keydown", _6a.hitch(this, "_onKey")));
                        _67.set(this.domNode, { opacity: 0, display: "" });
                        this._set("open", true);
                        this._onShow();
                        this.resize();
                        this._position();
                        var _85;
                        this._fadeInDeferred = new _64(_6a.hitch(this, function() {
                            _85.stop();
                            delete this._fadeInDeferred;
                        }));
                        this._fadeInDeferred.then(undefined, nop);
                        var _86 = this._fadeInDeferred.promise;
                        _85 = fx.fadeIn({
                            node: this.domNode,
                            duration: this.duration,
                            beforeBegin: _6a.hitch(this, function() { _7e.show(this, this.underlayAttrs); }),
                            onEnd: _6a.hitch(this, function() {
                                if (this.autofocus && _7e.isTop(this)) {
                                    this._getFocusItems();
                                    _70.focus(this._firstFocusItem);
                                }
                                this._fadeInDeferred.resolve(true);
                                delete this._fadeInDeferred;
                            })
                        }).play();
                        return _86;
                    },
                    hide: function() {
                        if (!this._alreadyInitialized || !this.open) { return _7b.promise; }
                        if (this._fadeInDeferred) { this._fadeInDeferred.cancel(); }
                        var _87;
                        this._fadeOutDeferred = new _64(_6a.hitch(this, function() {
                            _87.stop();
                            delete this._fadeOutDeferred;
                        }));
                        this._fadeOutDeferred.then(undefined, nop);
                        this._fadeOutDeferred.then(_6a.hitch(this, "onHide"));
                        var _88 = this._fadeOutDeferred.promise;
                        _87 = fx.fadeOut({
                            node: this.domNode,
                            duration: this.duration,
                            onEnd: _6a.hitch(this, function() {
                                this.domNode.style.display = "none";
                                _7e.hide(this);
                                this._fadeOutDeferred.resolve(true);
                                delete this._fadeOutDeferred;
                            })
                        }).play();
                        if (this._scrollConnected) { this._scrollConnected = false; }
                        var h;
                        while (h = this._modalconnects.pop()) { h.remove(); }
                        if (this._relativePosition) { delete this._relativePosition; }
                        this._set("open", false);
                        return _88;
                    },
                    resize: function(dim) {
                        if (this.domNode.style.display != "none") {
                            this._checkIfSingleChild();
                            if (!dim) {
                                if (this._shrunk) {
                                    if (this._singleChild) {
                                        if (typeof this._singleChildOriginalStyle != "undefined") {
                                            this._singleChild.domNode.style.cssText = this._singleChildOriginalStyle;
                                            delete this._singleChildOriginalStyle;
                                        }
                                    }
                                    _61.forEach([this.domNode, this.containerNode, this.titleBar, this.actionBarNode], function(_89) { if (_89) { _67.set(_89, { position: "static", width: "auto", height: "auto" }); } });
                                    this.domNode.style.position = "absolute";
                                }
                                var _8a = _6d.getBox(this.ownerDocument);
                                _8a.w *= this.maxRatio;
                                _8a.h *= this.maxRatio;
                                var bb = _66.position(this.domNode);
                                this._shrunk = false;
                                if (bb.w >= _8a.w) {
                                    dim = { w: _8a.w };
                                    _66.setMarginBox(this.domNode, dim);
                                    bb = _66.position(this.domNode);
                                    this._shrunk = true;
                                }
                                if (bb.h >= _8a.h) {
                                    if (!dim) { dim = { w: bb.w }; }
                                    dim.h = _8a.h;
                                    this._shrunk = true;
                                }
                                if (dim) { if (!dim.w) { dim.w = bb.w; } if (!dim.h) { dim.h = bb.h; } }
                            }
                            if (dim) {
                                _66.setMarginBox(this.domNode, dim);
                                var _8b = [];
                                if (this.titleBar) { _8b.push({ domNode: this.titleBar, region: "top" }); }
                                if (this.actionBarNode) { _8b.push({ domNode: this.actionBarNode, region: "bottom" }); }
                                var _8c = { domNode: this.containerNode, region: "center" };
                                _8b.push(_8c);
                                var _8d = _79.marginBox2contentBox(this.domNode, dim);
                                _79.layoutChildren(this.domNode, _8d, _8b);
                                if (this._singleChild) {
                                    var cb = _79.marginBox2contentBox(this.containerNode, _8c);
                                    this._singleChild.resize({ w: cb.w, h: cb.h });
                                } else {
                                    this.containerNode.style.overflow = "auto";
                                    this._layoutChildren();
                                }
                            } else { this._layoutChildren(); }
                            if (!has("touch") && !dim) { this._position(); }
                        }
                    },
                    _layoutChildren: function() { _61.forEach(this.getChildren(), function(_8e) { if (_8e.resize) { _8e.resize(); } }); },
                    destroy: function() {
                        if (this._fadeInDeferred) { this._fadeInDeferred.cancel(); }
                        if (this._fadeOutDeferred) { this._fadeOutDeferred.cancel(); }
                        if (this._moveable) { this._moveable.destroy(); }
                        var h;
                        while (h = this._modalconnects.pop()) { h.remove(); }
                        _7e.hide(this);
                        this.inherited(arguments);
                    }
                });
                if (has("dojo-bidi")) {
                    _7c = _63("dijit._DialogBase", _7c, {
                        _setTitleAttr: function(_8f) {
                            this._set("title", _8f);
                            this.titleNode.innerHTML = _8f;
                            this.applyTextDir(this.titleNode);
                        },
                        _setTextDirAttr: function(_90) {
                            if (this._created && this.textDir != _90) {
                                this._set("textDir", _90);
                                this.set("title", this.title);
                            }
                        }
                    });
                }
                var _91 = _63("dijit.Dialog", [_78, _7c], {});
                _91._DialogBase = _7c;
                var _7e = _91._DialogLevelManager = {
                    _beginZIndex: 950,
                    show: function(_92, _93) {
                        ds[ds.length - 1].focus = _70.curNode;
                        var _94 = ds[ds.length - 1].dialog ? ds[ds.length - 1].zIndex + 2 : _91._DialogLevelManager._beginZIndex;
                        _67.set(_92.domNode, "zIndex", _94);
                        _77.show(_93, _94 - 1);
                        ds.push({ dialog: _92, underlayAttrs: _93, zIndex: _94 });
                    },
                    hide: function(_95) {
                        if (ds[ds.length - 1].dialog == _95) {
                            ds.pop();
                            var pd = ds[ds.length - 1];
                            if (ds.length == 1) { _77.hide(); } else { _77.show(pd.underlayAttrs, pd.zIndex - 1); }
                            if (_95.refocus) {
                                var _96 = pd.focus;
                                if (pd.dialog && (!_96 || !dom.isDescendant(_96, pd.dialog.domNode))) {
                                    pd.dialog._getFocusItems();
                                    _96 = pd.dialog._firstFocusItem;
                                }
                                if (_96) { try { _96.focus(); } catch (e) {} }
                            }
                        } else { var idx = _61.indexOf(_61.map(ds, function(_97) { return _97.dialog; }), _95); if (idx != -1) { ds.splice(idx, 1); } }
                    },
                    isTop: function(_98) { return ds[ds.length - 1].dialog == _98; }
                };
                var ds = _91._dialogStack = [{ dialog: null, focus: null, underlayAttrs: null }];
                _70.watch("curNode", function(_99, _9a, _9b) {
                    var _9c = ds[ds.length - 1].dialog;
                    if (_9b && _9c && !_9c._fadeOutDeferred && _9b.ownerDocument == _9c.ownerDocument) {
                        do { if (_9b == _9c.domNode || _65.contains(_9b, "dijitPopup")) { return; } } while (_9b = _9b.parentNode);
                        _9c.focus();
                    }
                });
                if (has("dijit-legacy-requires")) {
                    _6b(0, function() {
                        var _9d = ["dijit/TooltipDialog"];
                        _60(_9d);
                    });
                }
                return _91;
            });
        },
        "dojo/dnd/Moveable": function() {
            define(["../_base/array", "../_base/declare", "../_base/lang", "../dom", "../dom-class", "../Evented", "../has", "../on", "../topic", "../touch", "./common", "./Mover", "../_base/window"], function(_9e, _9f, _a0, dom, _a1, _a2, has, on, _a3, _a4, dnd, _a5, win) {
                var _a6;
                var _a7 = function() {};

                function _a8() {
                    if ("touchAction" in document.body.style) { _a6 = "touchAction"; } else { if ("msTouchAction" in document.body.style) { _a6 = "msTouchAction"; } }
                    _a7 = function _a7(_a9, _aa) { _a9.style[_a6] = _aa; };
                    _a7(arguments[0], arguments[1]);
                };
                if (has("touch-action")) { _a7 = _a8; }
                var _ab = _9f("dojo.dnd.Moveable", [_a2], {
                    handle: "",
                    delay: 0,
                    skip: false,
                    constructor: function(_ac, _ad) {
                        this.node = dom.byId(_ac);
                        _a7(this.node, "none");
                        if (!_ad) { _ad = {}; }
                        this.handle = _ad.handle ? dom.byId(_ad.handle) : null;
                        if (!this.handle) { this.handle = this.node; }
                        this.delay = _ad.delay > 0 ? _ad.delay : 0;
                        this.skip = _ad.skip;
                        this.mover = _ad.mover ? _ad.mover : _a5;
                        this.events = [on(this.handle, _a4.press, _a0.hitch(this, "onMouseDown")), on(this.handle, "dragstart", _a0.hitch(this, "onSelectStart")), on(this.handle, "selectstart", _a0.hitch(this, "onSelectStart"))];
                    },
                    markupFactory: function(_ae, _af, _b0) { return new _b0(_af, _ae); },
                    destroy: function() {
                        _9e.forEach(this.events, function(_b1) { _b1.remove(); });
                        _a7(this.node, "");
                        this.events = this.node = this.handle = null;
                    },
                    onMouseDown: function(e) {
                        if (this.skip && dnd.isFormElement(e)) { return; }
                        if (this.delay) {
                            this.events.push(on(this.handle, _a4.move, _a0.hitch(this, "onMouseMove")), on(this.handle.ownerDocument, _a4.release, _a0.hitch(this, "onMouseUp")));
                            this._lastX = e.pageX;
                            this._lastY = e.pageY;
                        } else { this.onDragDetected(e); }
                        e.stopPropagation();
                        e.preventDefault();
                    },
                    onMouseMove: function(e) {
                        if (Math.abs(e.pageX - this._lastX) > this.delay || Math.abs(e.pageY - this._lastY) > this.delay) {
                            this.onMouseUp(e);
                            this.onDragDetected(e);
                        }
                        e.stopPropagation();
                        e.preventDefault();
                    },
                    onMouseUp: function(e) {
                        for (var i = 0; i < 2; ++i) { this.events.pop().remove(); }
                        e.stopPropagation();
                        e.preventDefault();
                    },
                    onSelectStart: function(e) {
                        if (!this.skip || !dnd.isFormElement(e)) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                    },
                    onDragDetected: function(e) { new this.mover(this.node, e, this); },
                    onMoveStart: function(_b2) {
                        _a3.publish("/dnd/move/start", _b2);
                        _a1.add(win.body(), "dojoMove");
                        _a1.add(this.node, "dojoMoveItem");
                    },
                    onMoveStop: function(_b3) {
                        _a3.publish("/dnd/move/stop", _b3);
                        _a1.remove(win.body(), "dojoMove");
                        _a1.remove(this.node, "dojoMoveItem");
                    },
                    onFirstMove: function() {},
                    onMove: function(_b4, _b5) {
                        this.onMoving(_b4, _b5);
                        var s = _b4.node.style;
                        s.left = _b5.l + "px";
                        s.top = _b5.t + "px";
                        this.onMoved(_b4, _b5);
                    },
                    onMoving: function() {},
                    onMoved: function() {}
                });
                return _ab;
            });
        },
        "dojo/dnd/common": function() {
            define(["../sniff", "../_base/kernel", "../_base/lang", "../dom"], function(has, _b6, _b7, dom) {
                var _b8 = _b7.getObject("dojo.dnd", true);
                _b8.getCopyKeyState = function(evt) { return evt[has("mac") ? "metaKey" : "ctrlKey"]; };
                _b8._uniqueId = 0;
                _b8.getUniqueId = function() {
                    var id;
                    do { id = _b6._scopeName + "Unique" + (++_b8._uniqueId); } while (dom.byId(id));
                    return id;
                };
                _b8._empty = {};
                _b8.isFormElement = function(e) { var t = e.target; if (t.nodeType == 3) { t = t.parentNode; } return " a button textarea input select option ".indexOf(" " + t.tagName.toLowerCase() + " ") >= 0; };
                return _b8;
            });
        },
        "dojo/dnd/Mover": function() {
            define(["../_base/array", "../_base/declare", "../_base/lang", "../sniff", "../_base/window", "../dom", "../dom-geometry", "../dom-style", "../Evented", "../on", "../touch", "./common", "./autoscroll"], function(_b9, _ba, _bb, has, win, dom, _bc, _bd, _be, on, _bf, dnd, _c0) {
                return _ba("dojo.dnd.Mover", [_be], {
                    constructor: function(_c1, e, _c2) {
                        this.node = dom.byId(_c1);
                        this.marginBox = { l: e.pageX, t: e.pageY };
                        this.mouseButton = e.button;
                        var h = (this.host = _c2),
                            d = _c1.ownerDocument;

                        function _c3(e) {
                            e.preventDefault();
                            e.stopPropagation();
                        };
                        this.events = [on(d, _bf.move, _bb.hitch(this, "onFirstMove")), on(d, _bf.move, _bb.hitch(this, "onMouseMove")), on(d, _bf.release, _bb.hitch(this, "onMouseUp")), on(d, "dragstart", _c3), on(d.body, "selectstart", _c3)];
                        _c0.autoScrollStart(d);
                        if (h && h.onMoveStart) { h.onMoveStart(this); }
                    },
                    onMouseMove: function(e) {
                        _c0.autoScroll(e);
                        var m = this.marginBox;
                        this.host.onMove(this, { l: m.l + e.pageX, t: m.t + e.pageY }, e);
                        e.preventDefault();
                        e.stopPropagation();
                    },
                    onMouseUp: function(e) {
                        if (has("webkit") && has("mac") && this.mouseButton == 2 ? e.button == 0 : this.mouseButton == e.button) { this.destroy(); }
                        e.preventDefault();
                        e.stopPropagation();
                    },
                    onFirstMove: function(e) {
                        var s = this.node.style,
                            l, t, h = this.host;
                        switch (s.position) {
                            case "relative":
                            case "absolute":
                                l = Math.round(parseFloat(s.left)) || 0;
                                t = Math.round(parseFloat(s.top)) || 0;
                                break;
                            default:
                                s.position = "absolute";
                                var m = _bc.getMarginBox(this.node);
                                var b = win.doc.body;
                                var bs = _bd.getComputedStyle(b);
                                var bm = _bc.getMarginBox(b, bs);
                                var bc = _bc.getContentBox(b, bs);
                                l = m.l - (bc.l - bm.l);
                                t = m.t - (bc.t - bm.t);
                                break;
                        }
                        this.marginBox.l = l - this.marginBox.l;
                        this.marginBox.t = t - this.marginBox.t;
                        if (h && h.onFirstMove) { h.onFirstMove(this, e); }
                        this.events.shift().remove();
                    },
                    destroy: function() {
                        _b9.forEach(this.events, function(_c4) { _c4.remove(); });
                        var h = this.host;
                        if (h && h.onMoveStop) { h.onMoveStop(this); }
                        this.events = this.node = this.host = null;
                    }
                });
            });
        },
        "dojo/dnd/autoscroll": function() {
            define(["../_base/lang", "../sniff", "../_base/window", "../dom-geometry", "../dom-style", "../window"], function(_c5, has, win, _c6, _c7, _c8) {
                var _c9 = {};
                _c5.setObject("dojo.dnd.autoscroll", _c9);
                _c9.getViewport = _c8.getBox;
                _c9.V_TRIGGER_AUTOSCROLL = 32;
                _c9.H_TRIGGER_AUTOSCROLL = 32;
                _c9.V_AUTOSCROLL_VALUE = 16;
                _c9.H_AUTOSCROLL_VALUE = 16;
                var _ca, doc = win.doc,
                    _cb = Infinity,
                    _cc = Infinity;
                _c9.autoScrollStart = function(d) {
                    doc = d;
                    _ca = _c8.getBox(doc);
                    var _cd = win.body(doc).parentNode;
                    _cb = Math.max(_cd.scrollHeight - _ca.h, 0);
                    _cc = Math.max(_cd.scrollWidth - _ca.w, 0);
                };
                _c9.autoScroll = function(e) {
                    var v = _ca || _c8.getBox(doc),
                        _ce = win.body(doc).parentNode,
                        dx = 0,
                        dy = 0;
                    if (e.clientX < _c9.H_TRIGGER_AUTOSCROLL) { dx = -_c9.H_AUTOSCROLL_VALUE; } else { if (e.clientX > v.w - _c9.H_TRIGGER_AUTOSCROLL) { dx = Math.min(_c9.H_AUTOSCROLL_VALUE, _cc - _ce.scrollLeft); } }
                    if (e.clientY < _c9.V_TRIGGER_AUTOSCROLL) { dy = -_c9.V_AUTOSCROLL_VALUE; } else { if (e.clientY > v.h - _c9.V_TRIGGER_AUTOSCROLL) { dy = Math.min(_c9.V_AUTOSCROLL_VALUE, _cb - _ce.scrollTop); } }
                    window.scrollBy(dx, dy);
                };
                _c9._validNodes = { "div": 1, "p": 1, "td": 1 };
                _c9._validOverflow = { "auto": 1, "scroll": 1 };
                _c9.autoScrollNodes = function(e) {
                    var b, t, w, h, rx, ry, dx = 0,
                        dy = 0,
                        _cf, _d0;
                    for (var n = e.target; n;) {
                        if (n.nodeType == 1 && (n.tagName.toLowerCase() in _c9._validNodes)) {
                            var s = _c7.getComputedStyle(n),
                                _d1 = (s.overflowX.toLowerCase() in _c9._validOverflow),
                                _d2 = (s.overflowY.toLowerCase() in _c9._validOverflow);
                            if (_d1 || _d2) {
                                b = _c6.getContentBox(n, s);
                                t = _c6.position(n, true);
                            }
                            if (_d1) {
                                w = Math.min(_c9.H_TRIGGER_AUTOSCROLL, b.w / 2);
                                rx = e.pageX - t.x;
                                if (has("webkit") || has("opera")) { rx += win.body().scrollLeft; }
                                dx = 0;
                                if (rx > 0 && rx < b.w) {
                                    if (rx < w) { dx = -w; } else { if (rx > b.w - w) { dx = w; } }
                                    _cf = n.scrollLeft;
                                    n.scrollLeft = n.scrollLeft + dx;
                                }
                            }
                            if (_d2) {
                                h = Math.min(_c9.V_TRIGGER_AUTOSCROLL, b.h / 2);
                                ry = e.pageY - t.y;
                                if (has("webkit") || has("opera")) { ry += win.body().scrollTop; }
                                dy = 0;
                                if (ry > 0 && ry < b.h) {
                                    if (ry < h) { dy = -h; } else { if (ry > b.h - h) { dy = h; } }
                                    _d0 = n.scrollTop;
                                    n.scrollTop = n.scrollTop + dy;
                                }
                            }
                            if (dx || dy) { return; }
                        }
                        try { n = n.parentNode; } catch (x) { n = null; }
                    }
                    _c9.autoScroll(e);
                };
                return _c9;
            });
        },
        "dojo/dnd/TimedMoveable": function() {
            define(["../_base/declare", "./Moveable"], function(_d3, _d4) {
                var _d5 = _d4.prototype.onMove;
                return _d3("dojo.dnd.TimedMoveable", _d4, {
                    timeout: 40,
                    constructor: function(_d6, _d7) { if (!_d7) { _d7 = {}; } if (_d7.timeout && typeof _d7.timeout == "number" && _d7.timeout >= 0) { this.timeout = _d7.timeout; } },
                    onMoveStop: function(_d8) {
                        if (_d8._timer) {
                            clearTimeout(_d8._timer);
                            _d5.call(this, _d8, _d8._leftTop);
                        }
                        _d4.prototype.onMoveStop.apply(this, arguments);
                    },
                    onMove: function(_d9, _da) {
                        _d9._leftTop = _da;
                        if (!_d9._timer) {
                            var _db = this;
                            _d9._timer = setTimeout(function() {
                                _d9._timer = null;
                                _d5.call(_db, _d9, _d9._leftTop);
                            }, this.timeout);
                        }
                    }
                });
            });
        },
        "dijit/form/_FormMixin": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/_base/kernel", "dojo/_base/lang", "dojo/on", "dojo/window"], function(_dc, _dd, _de, _df, on, _e0) {
                return _dd("dijit.form._FormMixin", null, {
                    state: "",
                    _getDescendantFormWidgets: function(_e1) {
                        var res = [];
                        _dc.forEach(_e1 || this.getChildren(), function(_e2) { if ("value" in _e2) { res.push(_e2); } else { res = res.concat(this._getDescendantFormWidgets(_e2.getChildren())); } }, this);
                        return res;
                    },
                    reset: function() { _dc.forEach(this._getDescendantFormWidgets(), function(_e3) { if (_e3.reset) { _e3.reset(); } }); },
                    validate: function() {
                        var _e4 = false;
                        return _dc.every(_dc.map(this._getDescendantFormWidgets(), function(_e5) {
                            _e5._hasBeenBlurred = true;
                            var _e6 = _e5.disabled || !_e5.validate || _e5.validate();
                            if (!_e6 && !_e4) {
                                _e0.scrollIntoView(_e5.containerNode || _e5.domNode);
                                _e5.focus();
                                _e4 = true;
                            }
                            return _e6;
                        }), function(_e7) { return _e7; });
                    },
                    setValues: function(val) { _de.deprecated(this.declaredClass + "::setValues() is deprecated. Use set('value', val) instead.", "", "2.0"); return this.set("value", val); },
                    _setValueAttr: function(obj) {
                        var map = {};
                        _dc.forEach(this._getDescendantFormWidgets(), function(_e8) {
                            if (!_e8.name) { return; }
                            var _e9 = map[_e8.name] || (map[_e8.name] = []);
                            _e9.push(_e8);
                        });
                        for (var _ea in map) {
                            if (!map.hasOwnProperty(_ea)) { continue; }
                            var _eb = map[_ea],
                                _ec = _df.getObject(_ea, false, obj);
                            if (_ec === undefined) { continue; }
                            _ec = [].concat(_ec);
                            if (typeof _eb[0].checked == "boolean") { _dc.forEach(_eb, function(w) { w.set("value", _dc.indexOf(_ec, w._get("value")) != -1); }); } else { if (_eb[0].multiple) { _eb[0].set("value", _ec); } else { _dc.forEach(_eb, function(w, i) { w.set("value", _ec[i]); }); } }
                        }
                    },
                    getValues: function() { _de.deprecated(this.declaredClass + "::getValues() is deprecated. Use get('value') instead.", "", "2.0"); return this.get("value"); },
                    _getValueAttr: function() {
                        var obj = {};
                        _dc.forEach(this._getDescendantFormWidgets(), function(_ed) {
                            var _ee = _ed.name;
                            if (!_ee || _ed.disabled) { return; }
                            var _ef = _ed.get("value");
                            if (typeof _ed.checked == "boolean") {
                                if (/Radio/.test(_ed.declaredClass)) { if (_ef !== false) { _df.setObject(_ee, _ef, obj); } else { _ef = _df.getObject(_ee, false, obj); if (_ef === undefined) { _df.setObject(_ee, null, obj); } } } else {
                                    var ary = _df.getObject(_ee, false, obj);
                                    if (!ary) {
                                        ary = [];
                                        _df.setObject(_ee, ary, obj);
                                    }
                                    if (_ef !== false) { ary.push(_ef); }
                                }
                            } else { var _f0 = _df.getObject(_ee, false, obj); if (typeof _f0 != "undefined") { if (_df.isArray(_f0)) { _f0.push(_ef); } else { _df.setObject(_ee, [_f0, _ef], obj); } } else { _df.setObject(_ee, _ef, obj); } }
                        });
                        return obj;
                    },
                    isValid: function() { return this.state == ""; },
                    onValidStateChange: function() {},
                    _getState: function() { var _f1 = _dc.map(this._descendants, function(w) { return w.get("state") || ""; }); return _dc.indexOf(_f1, "Error") >= 0 ? "Error" : _dc.indexOf(_f1, "Incomplete") >= 0 ? "Incomplete" : ""; },
                    disconnectChildren: function() {},
                    connectChildren: function(_f2) {
                        this._descendants = this._getDescendantFormWidgets();
                        _dc.forEach(this._descendants, function(_f3) { if (!_f3._started) { _f3.startup(); } });
                        if (!_f2) { this._onChildChange(); }
                    },
                    _onChildChange: function(_f4) {
                        if (!_f4 || _f4 == "state" || _f4 == "disabled") { this._set("state", this._getState()); }
                        if (!_f4 || _f4 == "value" || _f4 == "disabled" || _f4 == "checked") {
                            if (this._onChangeDelayTimer) { this._onChangeDelayTimer.remove(); }
                            this._onChangeDelayTimer = this.defer(function() {
                                delete this._onChangeDelayTimer;
                                this._set("value", this.get("value"));
                            }, 10);
                        }
                    },
                    startup: function() {
                        this.inherited(arguments);
                        this._descendants = this._getDescendantFormWidgets();
                        this.value = this.get("value");
                        this.state = this._getState();
                        var _f5 = this;
                        this.own(on(this.containerNode, "attrmodified-state, attrmodified-disabled, attrmodified-value, attrmodified-checked", function(evt) {
                            if (evt.target == _f5.domNode) { return; }
                            _f5._onChildChange(evt.type.replace("attrmodified-", ""));
                        }));
                        this.watch("state", function(_f6, _f7, _f8) { this.onValidStateChange(_f8 == ""); });
                    },
                    destroy: function() { this.inherited(arguments); }
                });
            });
        },
        "dijit/_DialogMixin": function() {
            define(["dojo/_base/declare", "./a11y"], function(_f9, _fa) {
                return _f9("dijit._DialogMixin", null, {
                    actionBarTemplate: "",
                    execute: function() {},
                    onCancel: function() {},
                    onExecute: function() {},
                    _onSubmit: function() {
                        this.onExecute();
                        this.execute(this.get("value"));
                    },
                    _getFocusItems: function() {
                        var _fb = _fa._getTabNavigable(this.domNode);
                        this._firstFocusItem = _fb.lowest || _fb.first || this.closeButtonNode || this.domNode;
                        this._lastFocusItem = _fb.last || _fb.highest || this._firstFocusItem;
                    }
                });
            });
        },
        "dijit/DialogUnderlay": function() {
            define(["dojo/_base/declare", "dojo/_base/lang", "dojo/aspect", "dojo/dom-attr", "dojo/dom-style", "dojo/on", "dojo/window", "./_Widget", "./_TemplatedMixin", "./BackgroundIframe", "./Viewport", "./main"], function(_fc, _fd, _fe, _ff, _100, on, _101, _102, _103, _104, _105, _106) {
                var _107 = _fc("dijit.DialogUnderlay", [_102, _103], {
                    templateString: "<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' tabIndex='-1' data-dojo-attach-point='node'></div></div>",
                    dialogId: "",
                    "class": "",
                    _modalConnects: [],
                    _setDialogIdAttr: function(id) {
                        _ff.set(this.node, "id", id + "_underlay");
                        this._set("dialogId", id);
                    },
                    _setClassAttr: function(_108) {
                        this.node.className = "dijitDialogUnderlay " + _108;
                        this._set("class", _108);
                    },
                    postCreate: function() {
                        this.ownerDocumentBody.appendChild(this.domNode);
                        this.own(on(this.domNode, "keydown", _fd.hitch(this, "_onKeyDown")));
                        this.inherited(arguments);
                    },
                    layout: function() {
                        var is = this.node.style,
                            os = this.domNode.style;
                        os.display = "none";
                        var _109 = _101.getBox(this.ownerDocument);
                        os.top = _109.t + "px";
                        os.left = _109.l + "px";
                        is.width = _109.w + "px";
                        is.height = _109.h + "px";
                        os.display = "block";
                    },
                    show: function() {
                        this.domNode.style.display = "block";
                        this.open = true;
                        this.layout();
                        this.bgIframe = new _104(this.domNode);
                        var win = _101.get(this.ownerDocument);
                        this._modalConnects = [_105.on("resize", _fd.hitch(this, "layout")), on(win, "scroll", _fd.hitch(this, "layout"))];
                    },
                    hide: function() {
                        this.bgIframe.destroy();
                        delete this.bgIframe;
                        this.domNode.style.display = "none";
                        while (this._modalConnects.length) {
                            (this._modalConnects.pop()).remove();
                        }
                        this.open = false;
                    },
                    destroy: function() {
                        while (this._modalConnects.length) {
                            (this._modalConnects.pop()).remove();
                        }
                        this.inherited(arguments);
                    },
                    _onKeyDown: function() {}
                });
                _107.show = function(_10a, _10b) {
                    var _10c = _107._singleton;
                    if (!_10c || _10c._destroyed) { _10c = _106._underlay = _107._singleton = new _107(_10a); } else { if (_10a) { _10c.set(_10a); } }
                    _100.set(_10c.domNode, "zIndex", _10b);
                    if (!_10c.open) { _10c.show(); }
                };
                _107.hide = function() { var _10d = _107._singleton; if (_10d && !_10d._destroyed) { _10d.hide(); } };
                return _107;
            });
        },
        "dijit/layout/ContentPane": function() {
            define(["dojo/_base/kernel", "dojo/_base/lang", "../_Widget", "../_Container", "./_ContentPaneResizeMixin", "dojo/string", "dojo/html", "dojo/_base/array", "dojo/_base/declare", "dojo/_base/Deferred", "dojo/dom", "dojo/dom-attr", "dojo/dom-construct", "dojo/_base/xhr", "dojo/i18n", "dojo/when", "dojo/i18n!../nls/loading"], function(_10e, lang, _10f, _110, _111, _112, html, _113, _114, _115, dom, _116, _117, xhr, i18n, when) {
                return _114("dijit.layout.ContentPane", [_10f, _110, _111], {
                    href: "",
                    content: "",
                    extractContent: false,
                    parseOnLoad: true,
                    parserScope: _10e._scopeName,
                    preventCache: false,
                    preload: false,
                    refreshOnShow: false,
                    loadingMessage: "<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",
                    errorMessage: "<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",
                    isLoaded: false,
                    baseClass: "dijitContentPane",
                    ioArgs: {},
                    onLoadDeferred: null,
                    _setTitleAttr: null,
                    stopParser: true,
                    template: false,
                    markupFactory: function(_118, node, ctor) { var self = new ctor(_118, node); return !self.href && self._contentSetter && self._contentSetter.parseDeferred && !self._contentSetter.parseDeferred.isFulfilled() ? self._contentSetter.parseDeferred.then(function() { return self; }) : self; },
                    create: function(_119, _11a) {
                        if ((!_119 || !_119.template) && _11a && !("href" in _119) && !("content" in _119)) {
                            _11a = dom.byId(_11a);
                            var df = _11a.ownerDocument.createDocumentFragment();
                            while (_11a.firstChild) { df.appendChild(_11a.firstChild); }
                            _119 = lang.delegate(_119, { content: df });
                        }
                        this.inherited(arguments, [_119, _11a]);
                    },
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        var _11b = i18n.getLocalization("dijit", "loading", this.lang);
                        this.loadingMessage = _112.substitute(this.loadingMessage, _11b);
                        this.errorMessage = _112.substitute(this.errorMessage, _11b);
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        if (!this.containerNode) { this.containerNode = this.domNode; }
                        this.domNode.removeAttribute("title");
                    },
                    startup: function() {
                        this.inherited(arguments);
                        if (this._contentSetter) {
                            _113.forEach(this._contentSetter.parseResults, function(obj) {
                                if (!obj._started && !obj._destroyed && lang.isFunction(obj.startup)) {
                                    obj.startup();
                                    obj._started = true;
                                }
                            }, this);
                        }
                    },
                    _startChildren: function() {
                        _113.forEach(this.getChildren(), function(obj) {
                            if (!obj._started && !obj._destroyed && lang.isFunction(obj.startup)) {
                                obj.startup();
                                obj._started = true;
                            }
                        });
                        if (this._contentSetter) {
                            _113.forEach(this._contentSetter.parseResults, function(obj) {
                                if (!obj._started && !obj._destroyed && lang.isFunction(obj.startup)) {
                                    obj.startup();
                                    obj._started = true;
                                }
                            }, this);
                        }
                    },
                    setHref: function(href) { _10e.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.", "", "2.0"); return this.set("href", href); },
                    _setHrefAttr: function(href) {
                        this.cancel();
                        this.onLoadDeferred = new _115(lang.hitch(this, "cancel"));
                        this.onLoadDeferred.then(lang.hitch(this, "onLoad"));
                        this._set("href", href);
                        if (this.preload || (this._created && this._isShown())) { this._load(); } else { this._hrefChanged = true; }
                        return this.onLoadDeferred;
                    },
                    setContent: function(data) {
                        _10e.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.", "", "2.0");
                        this.set("content", data);
                    },
                    _setContentAttr: function(data) {
                        this._set("href", "");
                        this.cancel();
                        this.onLoadDeferred = new _115(lang.hitch(this, "cancel"));
                        if (this._created) { this.onLoadDeferred.then(lang.hitch(this, "onLoad")); }
                        this._setContent(data || "");
                        this._isDownloaded = false;
                        return this.onLoadDeferred;
                    },
                    _getContentAttr: function() { return this.containerNode.innerHTML; },
                    cancel: function() {
                        if (this._xhrDfd && (this._xhrDfd.fired == -1)) { this._xhrDfd.cancel(); }
                        delete this._xhrDfd;
                        this.onLoadDeferred = null;
                    },
                    destroy: function() {
                        this.cancel();
                        this.inherited(arguments);
                    },
                    destroyRecursive: function(_11c) {
                        if (this._beingDestroyed) { return; }
                        this.inherited(arguments);
                    },
                    _onShow: function() { this.inherited(arguments); if (this.href) { if (!this._xhrDfd && (!this.isLoaded || this._hrefChanged || this.refreshOnShow)) { return this.refresh(); } } },
                    refresh: function() {
                        this.cancel();
                        this.onLoadDeferred = new _115(lang.hitch(this, "cancel"));
                        this.onLoadDeferred.then(lang.hitch(this, "onLoad"));
                        this._load();
                        return this.onLoadDeferred;
                    },
                    _load: function() {
                        this._setContent(this.onDownloadStart(), true);
                        var self = this;
                        var _11d = { preventCache: (this.preventCache || this.refreshOnShow), url: this.href, handleAs: "text" };
                        if (lang.isObject(this.ioArgs)) { lang.mixin(_11d, this.ioArgs); }
                        var hand = (this._xhrDfd = (this.ioMethod || xhr.get)(_11d)),
                            _11e;
                        hand.then(function(html) { _11e = html; try { self._isDownloaded = true; return self._setContent(html, false); } catch (err) { self._onError("Content", err); } }, function(err) {
                            if (!hand.canceled) { self._onError("Download", err); }
                            delete self._xhrDfd;
                            return err;
                        }).then(function() {
                            self.onDownloadEnd();
                            delete self._xhrDfd;
                            return _11e;
                        });
                        delete this._hrefChanged;
                    },
                    _onLoadHandler: function(data) { this._set("isLoaded", true); try { this.onLoadDeferred.resolve(data); } catch (e) { console.error("Error " + (this.widgetId || this.id) + " running custom onLoad code: " + e.message); } },
                    _onUnloadHandler: function() { this._set("isLoaded", false); try { this.onUnload(); } catch (e) { console.error("Error " + this.widgetId + " running custom onUnload code: " + e.message); } },
                    destroyDescendants: function(_11f) {
                        if (this.isLoaded) { this._onUnloadHandler(); }
                        var _120 = this._contentSetter;
                        _113.forEach(this.getChildren(), function(_121) {
                            if (_121.destroyRecursive) { _121.destroyRecursive(_11f); } else { if (_121.destroy) { _121.destroy(_11f); } }
                            _121._destroyed = true;
                        });
                        if (_120) {
                            _113.forEach(_120.parseResults, function(_122) {
                                if (!_122._destroyed) {
                                    if (_122.destroyRecursive) { _122.destroyRecursive(_11f); } else { if (_122.destroy) { _122.destroy(_11f); } }
                                    _122._destroyed = true;
                                }
                            });
                            delete _120.parseResults;
                        }
                        if (!_11f) { _117.empty(this.containerNode); }
                        delete this._singleChild;
                    },
                    _setContent: function(cont, _123) {
                        cont = this.preprocessContent(cont);
                        this.destroyDescendants();
                        var _124 = this._contentSetter;
                        if (!(_124 && _124 instanceof html._ContentSetter)) { _124 = this._contentSetter = new html._ContentSetter({ node: this.containerNode, _onError: lang.hitch(this, this._onError), onContentError: lang.hitch(this, function(e) { var _125 = this.onContentError(e); try { this.containerNode.innerHTML = _125; } catch (e) { console.error("Fatal " + this.id + " could not change content due to " + e.message, e); } }) }); }
                        var _126 = lang.mixin({ cleanContent: this.cleanContent, extractContent: this.extractContent, parseContent: !cont.domNode && this.parseOnLoad, parserScope: this.parserScope, startup: false, dir: this.dir, lang: this.lang, textDir: this.textDir }, this._contentSetterParams || {});
                        var p = _124.set((lang.isObject(cont) && cont.domNode) ? cont.domNode : cont, _126);
                        var self = this;
                        return when(p && p.then ? p : _124.parseDeferred, function() {
                            delete self._contentSetterParams;
                            if (!_123) {
                                if (self._started) {
                                    self._startChildren();
                                    self._scheduleLayout();
                                }
                                self._onLoadHandler(cont);
                            }
                        });
                    },
                    preprocessContent: function(_127) { return _127; },
                    _onError: function(type, err, _128) { this.onLoadDeferred.reject(err); var _129 = this["on" + type + "Error"].call(this, err); if (_128) { console.error(_128, err); } else { if (_129) { this._setContent(_129, true); } } },
                    onLoad: function() {},
                    onUnload: function() {},
                    onDownloadStart: function() { return this.loadingMessage; },
                    onContentError: function() {},
                    onDownloadError: function() { return this.errorMessage; },
                    onDownloadEnd: function() {}
                });
            });
        },
        "dijit/layout/_ContentPaneResizeMixin": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/lang", "dojo/query", "../registry", "../Viewport", "./utils"], function(_12a, _12b, _12c, _12d, _12e, lang, _12f, _130, _131, _132) {
                return _12b("dijit.layout._ContentPaneResizeMixin", null, {
                    doLayout: true,
                    isLayoutContainer: true,
                    startup: function() {
                        if (this._started) { return; }
                        var _133 = this.getParent();
                        this._childOfLayoutWidget = _133 && _133.isLayoutContainer;
                        this._needLayout = !this._childOfLayoutWidget;
                        this.inherited(arguments);
                        if (this._isShown()) { this._onShow(); }
                        if (!this._childOfLayoutWidget) { this.own(_131.on("resize", lang.hitch(this, "resize"))); }
                    },
                    _checkIfSingleChild: function() {
                        if (!this.doLayout) { return; }
                        var _134 = [],
                            _135 = false;
                        _12f("> *", this.containerNode).some(function(node) { var _136 = _130.byNode(node); if (_136 && _136.resize) { _134.push(_136); } else { if (!/script|link|style/i.test(node.nodeName) && node.offsetHeight) { _135 = true; } } });
                        this._singleChild = _134.length == 1 && !_135 ? _134[0] : null;
                        _12c.toggle(this.containerNode, this.baseClass + "SingleChild", !!this._singleChild);
                    },
                    resize: function(_137, _138) {
                        this._resizeCalled = true;
                        this._scheduleLayout(_137, _138);
                    },
                    _scheduleLayout: function(_139, _13a) {
                        if (this._isShown()) { this._layout(_139, _13a); } else {
                            this._needLayout = true;
                            this._changeSize = _139;
                            this._resultSize = _13a;
                        }
                    },
                    _layout: function(_13b, _13c) {
                        delete this._needLayout;
                        if (!this._wasShown && this.open !== false) { this._onShow(); }
                        if (_13b) { _12d.setMarginBox(this.domNode, _13b); }
                        var cn = this.containerNode;
                        if (cn === this.domNode) {
                            var mb = _13c || {};
                            lang.mixin(mb, _13b || {});
                            if (!("h" in mb) || !("w" in mb)) { mb = lang.mixin(_12d.getMarginBox(cn), mb); }
                            this._contentBox = _132.marginBox2contentBox(cn, mb);
                        } else { this._contentBox = _12d.getContentBox(cn); }
                        this._layoutChildren();
                    },
                    _layoutChildren: function() {
                        this._checkIfSingleChild();
                        if (this._singleChild && this._singleChild.resize) {
                            var cb = this._contentBox || _12d.getContentBox(this.containerNode);
                            this._singleChild.resize({ w: cb.w, h: cb.h });
                        } else {
                            var _13d = this.getChildren(),
                                _13e, i = 0;
                            while (_13e = _13d[i++]) { if (_13e.resize) { _13e.resize(); } }
                        }
                    },
                    _isShown: function() {
                        if (this._childOfLayoutWidget) { if (this._resizeCalled && "open" in this) { return this.open; } return this._resizeCalled; } else {
                            if ("open" in this) { return this.open; } else {
                                var node = this.domNode,
                                    _13f = this.domNode.parentNode;
                                return (node.style.display != "none") && (node.style.visibility != "hidden") && !_12c.contains(node, "dijitHidden") && _13f && _13f.style && (_13f.style.display != "none");
                            }
                        }
                    },
                    _onShow: function() {
                        this._wasShown = true;
                        if (this._needLayout) { this._layout(this._changeSize, this._resultSize); }
                        this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/layout/utils": function() {
            define(["dojo/_base/array", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/lang"], function(_140, _141, _142, _143, lang) {
                function _144(word) { return word.substring(0, 1).toUpperCase() + word.substring(1); };

                function size(_145, dim) {
                    var _146 = _145.resize ? _145.resize(dim) : _142.setMarginBox(_145.domNode, dim);
                    if (_146) { lang.mixin(_145, _146); } else {
                        lang.mixin(_145, _142.getMarginBox(_145.domNode));
                        lang.mixin(_145, dim);
                    }
                };
                var _147 = {
                    marginBox2contentBox: function(node, mb) { var cs = _143.getComputedStyle(node); var me = _142.getMarginExtents(node, cs); var pb = _142.getPadBorderExtents(node, cs); return { l: _143.toPixelValue(node, cs.paddingLeft), t: _143.toPixelValue(node, cs.paddingTop), w: mb.w - (me.w + pb.w), h: mb.h - (me.h + pb.h) }; },
                    layoutChildren: function(_148, dim, _149, _14a, _14b) {
                        dim = lang.mixin({}, dim);
                        _141.add(_148, "dijitLayoutContainer");
                        _149 = _140.filter(_149, function(item) { return item.region != "center" && item.layoutAlign != "client"; }).concat(_140.filter(_149, function(item) { return item.region == "center" || item.layoutAlign == "client"; }));
                        _140.forEach(_149, function(_14c) {
                            var elm = _14c.domNode,
                                pos = (_14c.region || _14c.layoutAlign);
                            if (!pos) { throw new Error("No region setting for " + _14c.id); }
                            var _14d = elm.style;
                            _14d.left = dim.l + "px";
                            _14d.top = dim.t + "px";
                            _14d.position = "absolute";
                            _141.add(elm, "dijitAlign" + _144(pos));
                            var _14e = {};
                            if (_14a && _14a == _14c.id) { _14e[_14c.region == "top" || _14c.region == "bottom" ? "h" : "w"] = _14b; }
                            if (pos == "leading") { pos = _14c.isLeftToRight() ? "left" : "right"; }
                            if (pos == "trailing") { pos = _14c.isLeftToRight() ? "right" : "left"; }
                            if (pos == "top" || pos == "bottom") {
                                _14e.w = dim.w;
                                size(_14c, _14e);
                                dim.h -= _14c.h;
                                if (pos == "top") { dim.t += _14c.h; } else { _14d.top = dim.t + dim.h + "px"; }
                            } else {
                                if (pos == "left" || pos == "right") {
                                    _14e.h = dim.h;
                                    size(_14c, _14e);
                                    dim.w -= _14c.w;
                                    if (pos == "left") { dim.l += _14c.w; } else { _14d.left = dim.l + dim.w + "px"; }
                                } else { if (pos == "client" || pos == "center") { size(_14c, dim); } }
                            }
                        });
                    }
                };
                lang.setObject("dijit.layout.utils", _147);
                return _147;
            });
        },
        "dojo/html": function() {
            define(["./_base/kernel", "./_base/lang", "./_base/array", "./_base/declare", "./dom", "./dom-construct", "./parser"], function(_14f, lang, _150, _151, dom, _152, _153) {
                var _154 = 0;
                var html = {
                    _secureForInnerHtml: function(cont) { return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig, ""); },
                    _emptyNode: _152.empty,
                    _setNodeContent: function(node, cont) { _152.empty(node); if (cont) { if (typeof cont == "number") { cont = cont.toString(); } if (typeof cont == "string") { cont = _152.toDom(cont, node.ownerDocument); } if (!cont.nodeType && lang.isArrayLike(cont)) { for (var _155 = cont.length, i = 0; i < cont.length; i = _155 == cont.length ? i + 1 : 0) { _152.place(cont[i], node, "last"); } } else { _152.place(cont, node, "last"); } } return node; },
                    _ContentSetter: _151("dojo.html._ContentSetter", null, {
                        node: "",
                        content: "",
                        id: "",
                        cleanContent: false,
                        extractContent: false,
                        parseContent: false,
                        parserScope: _14f._scopeName,
                        startup: true,
                        constructor: function(_156, node) {
                            lang.mixin(this, _156 || {});
                            node = this.node = dom.byId(this.node || node);
                            if (!this.id) { this.id = ["Setter", (node) ? node.id || node.tagName : "", _154++].join("_"); }
                        },
                        set: function(cont, _157) {
                            if (undefined !== cont) { this.content = cont; }
                            if (typeof cont == "number") { cont = cont.toString(); }
                            if (_157) { this._mixin(_157); }
                            this.onBegin();
                            this.setContent();
                            var ret = this.onEnd();
                            if (ret && ret.then) { return ret; } else { return this.node; }
                        },
                        setContent: function() {
                            var node = this.node;
                            if (!node) { throw new Error(this.declaredClass + ": setContent given no node"); }
                            try { node = html._setNodeContent(node, this.content); } catch (e) { var _158 = this.onContentError(e); try { node.innerHTML = _158; } catch (e) { console.error("Fatal " + this.declaredClass + ".setContent could not change content due to " + e.message, e); } }
                            this.node = node;
                        },
                        empty: function() {
                            if (this.parseDeferred) {
                                if (!this.parseDeferred.isResolved()) { this.parseDeferred.cancel(); }
                                delete this.parseDeferred;
                            }
                            if (this.parseResults && this.parseResults.length) {
                                _150.forEach(this.parseResults, function(w) { if (w.destroy) { w.destroy(); } });
                                delete this.parseResults;
                            }
                            _152.empty(this.node);
                        },
                        onBegin: function() {
                            var cont = this.content;
                            if (lang.isString(cont)) { if (this.cleanContent) { cont = html._secureForInnerHtml(cont); } if (this.extractContent) { var _159 = cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im); if (_159) { cont = _159[1]; } } }
                            this.empty();
                            this.content = cont;
                            return this.node;
                        },
                        onEnd: function() { if (this.parseContent) { this._parse(); } return this.node; },
                        tearDown: function() {
                            delete this.parseResults;
                            delete this.parseDeferred;
                            delete this.node;
                            delete this.content;
                        },
                        onContentError: function(err) { return "Error occurred setting content: " + err; },
                        onExecError: function(err) { return "Error occurred executing scripts: " + err; },
                        _mixin: function(_15a) {
                            var _15b = {},
                                key;
                            for (key in _15a) {
                                if (key in _15b) { continue; }
                                this[key] = _15a[key];
                            }
                        },
                        _parse: function() {
                            var _15c = this.node;
                            try {
                                var _15d = {};
                                _150.forEach(["dir", "lang", "textDir"], function(name) { if (this[name]) { _15d[name] = this[name]; } }, this);
                                var self = this;
                                this.parseDeferred = _153.parse({ rootNode: _15c, noStart: !this.startup, inherited: _15d, scope: this.parserScope }).then(function(_15e) { return self.parseResults = _15e; }, function(e) { self._onError("Content", e, "Error parsing in _ContentSetter#" + self.id); });
                            } catch (e) { this._onError("Content", e, "Error parsing in _ContentSetter#" + this.id); }
                        },
                        _onError: function(type, err, _15f) { var _160 = this["on" + type + "Error"].call(this, err); if (_15f) { console.error(_15f, err); } else { if (_160) { html._setNodeContent(this.node, _160, true); } } }
                    }),
                    set: function(node, cont, _161) {
                        if (undefined == cont) {
                            console.warn("dojo.html.set: no cont argument provided, using empty string");
                            cont = "";
                        }
                        if (typeof cont == "number") { cont = cont.toString(); }
                        if (!_161) { return html._setNodeContent(node, cont, true); } else { var op = new html._ContentSetter(lang.mixin(_161, { content: cont, node: node })); return op.set(); }
                    }
                };
                lang.setObject("dojo.html", html);
                return html;
            });
        },
        "dijit/TooltipDialog": function() {
            define(["dojo/_base/declare", "dojo/dom-class", "dojo/has", "dojo/keys", "dojo/_base/lang", "dojo/on", "./focus", "./layout/ContentPane", "./_DialogMixin", "./form/_FormMixin", "./_TemplatedMixin", "dojo/text!./templates/TooltipDialog.html", "./main"], function(_162, _163, has, keys, lang, on, _164, _165, _166, _167, _168, _169, _16a) {
                var _16b = _162("dijit.TooltipDialog", [_165, _168, _167, _166], {
                    title: "",
                    doLayout: false,
                    autofocus: true,
                    baseClass: "dijitTooltipDialog",
                    _firstFocusItem: null,
                    _lastFocusItem: null,
                    templateString: _169,
                    _setTitleAttr: "containerNode",
                    postCreate: function() {
                        this.inherited(arguments);
                        this.own(on(this.domNode, "keydown", lang.hitch(this, "_onKey")));
                    },
                    orient: function(node, _16c, _16d) {
                        var newC = { "MR-ML": "dijitTooltipRight", "ML-MR": "dijitTooltipLeft", "TM-BM": "dijitTooltipAbove", "BM-TM": "dijitTooltipBelow", "BL-TL": "dijitTooltipBelow dijitTooltipABLeft", "TL-BL": "dijitTooltipAbove dijitTooltipABLeft", "BR-TR": "dijitTooltipBelow dijitTooltipABRight", "TR-BR": "dijitTooltipAbove dijitTooltipABRight", "BR-BL": "dijitTooltipRight", "BL-BR": "dijitTooltipLeft", "BR-TL": "dijitTooltipBelow dijitTooltipABLeft", "BL-TR": "dijitTooltipBelow dijitTooltipABRight", "TL-BR": "dijitTooltipAbove dijitTooltipABRight", "TR-BL": "dijitTooltipAbove dijitTooltipABLeft" }[_16c + "-" + _16d];
                        _163.replace(this.domNode, newC, this._currentOrientClass || "");
                        this._currentOrientClass = newC;
                    },
                    focus: function() {
                        this._getFocusItems();
                        _164.focus(this._firstFocusItem);
                    },
                    onOpen: function(pos) {
                        this.orient(this.domNode, pos.aroundCorner, pos.corner);
                        var _16e = pos.aroundNodePos;
                        if (pos.corner.charAt(0) == "M" && pos.aroundCorner.charAt(0) == "M") {
                            this.connectorNode.style.top = _16e.y + ((_16e.h - this.connectorNode.offsetHeight) >> 1) - pos.y + "px";
                            this.connectorNode.style.left = "";
                        } else { if (pos.corner.charAt(1) == "M" && pos.aroundCorner.charAt(1) == "M") { this.connectorNode.style.left = _16e.x + ((_16e.w - this.connectorNode.offsetWidth) >> 1) - pos.x + "px"; } }
                        this._onShow();
                    },
                    onClose: function() { this.onHide(); },
                    _onKey: function(evt) {
                        if (evt.keyCode == keys.ESCAPE) {
                            this.defer("onCancel");
                            evt.stopPropagation();
                            evt.preventDefault();
                        } else {
                            if (evt.keyCode == keys.TAB) {
                                var node = evt.target;
                                this._getFocusItems();
                                if (this._firstFocusItem == this._lastFocusItem) {
                                    evt.stopPropagation();
                                    evt.preventDefault();
                                } else {
                                    if (node == this._firstFocusItem && evt.shiftKey) {
                                        _164.focus(this._lastFocusItem);
                                        evt.stopPropagation();
                                        evt.preventDefault();
                                    } else {
                                        if (node == this._lastFocusItem && !evt.shiftKey) {
                                            _164.focus(this._firstFocusItem);
                                            evt.stopPropagation();
                                            evt.preventDefault();
                                        } else { evt.stopPropagation(); }
                                    }
                                }
                            }
                        }
                    }
                });
                if (has("dojo-bidi")) {
                    _16b.extend({
                        _setTitleAttr: function(_16f) {
                            this.containerNode.title = (this.textDir && this.enforceTextDirWithUcc) ? this.enforceTextDirWithUcc(null, _16f) : _16f;
                            this._set("title", _16f);
                        },
                        _setTextDirAttr: function(_170) { if (!this._created || this.textDir != _170) { this._set("textDir", _170); if (this.textDir && this.title) { this.containerNode.title = this.enforceTextDirWithUcc(null, this.title); } } }
                    });
                }
                return _16b;
            });
        },
        "dijit/Editor": function() {
            define(["require", "dojo/_base/array", "dojo/_base/declare", "dojo/Deferred", "dojo/i18n", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/keys", "dojo/_base/lang", "dojo/sniff", "dojo/string", "dojo/topic", "./_Container", "./Toolbar", "./ToolbarSeparator", "./layout/_LayoutWidget", "./form/ToggleButton", "./_editor/_Plugin", "./_editor/plugins/EnterKeyHandling", "./_editor/html", "./_editor/range", "./_editor/RichText", "./main", "dojo/i18n!./_editor/nls/commands"], function(_171, _172, _173, _174, i18n, _175, _176, _177, _178, keys, lang, has, _179, _17a, _17b, _17c, _17d, _17e, _17f, _180, _181, html, _182, _183, _184) {
                var _185 = _173("dijit.Editor", _183, {
                    plugins: null,
                    extraPlugins: null,
                    constructor: function() {
                        if (!lang.isArray(this.plugins)) { this.plugins = ["undo", "redo", "|", "cut", "copy", "paste", "|", "bold", "italic", "underline", "strikethrough", "|", "insertOrderedList", "insertUnorderedList", "indent", "outdent", "|", "justifyLeft", "justifyRight", "justifyCenter", "justifyFull", _181]; }
                        this._plugins = [];
                        this._editInterval = this.editActionInterval * 1000;
                        if (has("ie") || has("trident") || has("edge")) {
                            this.events.push("onBeforeDeactivate");
                            this.events.push("onBeforeActivate");
                        }
                    },
                    postMixInProperties: function() {
                        this.setValueDeferred = new _174();
                        this.inherited(arguments);
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        this._steps = this._steps.slice(0);
                        this._undoedSteps = this._undoedSteps.slice(0);
                        if (lang.isArray(this.extraPlugins)) { this.plugins = this.plugins.concat(this.extraPlugins); }
                        this.commands = i18n.getLocalization("dijit._editor", "commands", this.lang);
                        if (has("webkit")) { _178.set(this.domNode, "KhtmlUserSelect", "none"); }
                    },
                    startup: function() {
                        this.inherited(arguments);
                        if (!this.toolbar) {
                            this.toolbar = new _17c({ ownerDocument: this.ownerDocument, dir: this.dir, lang: this.lang, "aria-label": this.id });
                            this.header.appendChild(this.toolbar.domNode);
                        }
                        _172.forEach(this.plugins, this.addPlugin, this);
                        this.setValueDeferred.resolve(true);
                        _176.add(this.iframe.parentNode, "dijitEditorIFrameContainer");
                        _176.add(this.iframe, "dijitEditorIFrame");
                        _175.set(this.iframe, "allowTransparency", true);
                        this.toolbar.startup();
                        this.onNormalizedDisplayChanged();
                    },
                    destroy: function() {
                        _172.forEach(this._plugins, function(p) { if (p && p.destroy) { p.destroy(); } });
                        this._plugins = [];
                        this.toolbar.destroyRecursive();
                        delete this.toolbar;
                        this.inherited(arguments);
                    },
                    addPlugin: function(_186, _187) {
                        var args = lang.isString(_186) ? { name: _186 } : lang.isFunction(_186) ? { ctor: _186 } : _186;
                        if (!args.setEditor) {
                            var o = { "args": args, "plugin": null, "editor": this };
                            if (args.name) { if (_180.registry[args.name]) { o.plugin = _180.registry[args.name](args); } else { _17a.publish(_184._scopeName + ".Editor.getPlugin", o); } }
                            if (!o.plugin) { try { var pc = args.ctor || lang.getObject(args.name) || _171(args.name); if (pc) { o.plugin = new pc(args); } } catch (e) { throw new Error(this.id + ": cannot find plugin [" + args.name + "]"); } }
                            if (!o.plugin) { throw new Error(this.id + ": cannot find plugin [" + args.name + "]"); }
                            _186 = o.plugin;
                        }
                        if (arguments.length > 1) { this._plugins[_187] = _186; } else { this._plugins.push(_186); }
                        _186.setEditor(this);
                        if (lang.isFunction(_186.setToolbar)) { _186.setToolbar(this.toolbar); }
                    },
                    resize: function(size) { if (size) { _17e.prototype.resize.apply(this, arguments); } },
                    layout: function() {
                        var _188 = (this._contentBox.h - (this.getHeaderHeight() + this.getFooterHeight() + _177.getPadBorderExtents(this.iframe.parentNode).h + _177.getMarginExtents(this.iframe.parentNode).h));
                        this.editingArea.style.height = _188 + "px";
                        if (this.iframe) { this.iframe.style.height = "100%"; }
                        this._layoutMode = true;
                    },
                    _onIEMouseDown: function(e) {
                        var _189;
                        var b = this.document.body;
                        var _18a = b.clientWidth;
                        var _18b = b.clientHeight;
                        var _18c = b.clientLeft;
                        var _18d = b.offsetWidth;
                        var _18e = b.offsetHeight;
                        var _18f = b.offsetLeft;
                        if (/^rtl$/i.test(b.dir || "")) { if (_18a < _18d && e.x > _18a && e.x < _18d) { _189 = true; } } else { if (e.x < _18c && e.x > _18f) { _189 = true; } }
                        if (!_189) { if (_18b < _18e && e.y > _18b && e.y < _18e) { _189 = true; } }
                        if (!_189) {
                            delete this._cursorToStart;
                            delete this._savedSelection;
                            if (e.target.tagName == "BODY") { this.defer("placeCursorAtEnd"); }
                            this.inherited(arguments);
                        }
                    },
                    onBeforeActivate: function() { this._restoreSelection(); },
                    onBeforeDeactivate: function(e) { if (this.customUndo) { this.endEditing(true); } if (e.target.tagName != "BODY") { this._saveSelection(); } },
                    customUndo: true,
                    editActionInterval: 3,
                    beginEditing: function(cmd) {
                        if (!this._inEditing) {
                            this._inEditing = true;
                            this._beginEditing(cmd);
                        }
                        if (this.editActionInterval > 0) {
                            if (this._editTimer) { this._editTimer.remove(); }
                            this._editTimer = this.defer("endEditing", this._editInterval);
                        }
                    },
                    _steps: [],
                    _undoedSteps: [],
                    execCommand: function(cmd) {
                        if (this.customUndo && (cmd == "undo" || cmd == "redo")) { return this[cmd](); } else {
                            if (this.customUndo) {
                                this.endEditing();
                                this._beginEditing();
                            }
                            var r = this.inherited(arguments);
                            if (this.customUndo) { this._endEditing(); }
                            return r;
                        }
                    },
                    _pasteImpl: function() { return this._clipboardCommand("paste"); },
                    _cutImpl: function() { return this._clipboardCommand("cut"); },
                    _copyImpl: function() { return this._clipboardCommand("copy"); },
                    _clipboardCommand: function(cmd) {
                        var r;
                        try { r = this.document.execCommand(cmd, false, null); if (has("webkit") && !r) { throw {}; } } catch (e) {
                            var sub = _179.substitute,
                                _190 = { cut: "X", copy: "C", paste: "V" };
                            alert(sub(this.commands.systemShortcut, [this.commands[cmd], sub(this.commands[has("mac") ? "appleKey" : "ctrlKey"], [_190[cmd]])]));
                            r = false;
                        }
                        return r;
                    },
                    queryCommandEnabled: function(cmd) { if (this.customUndo && (cmd == "undo" || cmd == "redo")) { return cmd == "undo" ? (this._steps.length > 1) : (this._undoedSteps.length > 0); } else { return this.inherited(arguments); } },
                    _moveToBookmark: function(b) {
                        var _191 = b.mark;
                        var mark = b.mark;
                        var col = b.isCollapsed;
                        var r, _192, _193, sel;
                        if (mark) {
                            if (has("ie") < 9 || (has("ie") === 9 && has("quirks"))) {
                                if (lang.isArray(mark)) {
                                    _191 = [];
                                    _172.forEach(mark, function(n) { _191.push(_182.getNode(n, this.editNode)); }, this);
                                    this.selection.moveToBookmark({ mark: _191, isCollapsed: col });
                                } else {
                                    if (mark.startContainer && mark.endContainer) {
                                        sel = _182.getSelection(this.window);
                                        if (sel && sel.removeAllRanges) {
                                            sel.removeAllRanges();
                                            r = _182.create(this.window);
                                            _192 = _182.getNode(mark.startContainer, this.editNode);
                                            _193 = _182.getNode(mark.endContainer, this.editNode);
                                            if (_192 && _193) {
                                                r.setStart(_192, mark.startOffset);
                                                r.setEnd(_193, mark.endOffset);
                                                sel.addRange(r);
                                            }
                                        }
                                    }
                                }
                            } else {
                                sel = _182.getSelection(this.window);
                                if (sel && sel.removeAllRanges) {
                                    sel.removeAllRanges();
                                    r = _182.create(this.window);
                                    _192 = _182.getNode(mark.startContainer, this.editNode);
                                    _193 = _182.getNode(mark.endContainer, this.editNode);
                                    if (_192 && _193) {
                                        r.setStart(_192, mark.startOffset);
                                        r.setEnd(_193, mark.endOffset);
                                        sel.addRange(r);
                                    }
                                }
                            }
                        }
                    },
                    _changeToStep: function(from, to) {
                        this.setValue(to.text);
                        var b = to.bookmark;
                        if (!b) { return; }
                        this._moveToBookmark(b);
                    },
                    undo: function() {
                        var ret = false;
                        if (!this._undoRedoActive) {
                            this._undoRedoActive = true;
                            this.endEditing(true);
                            var s = this._steps.pop();
                            if (s && this._steps.length > 0) {
                                this.focus();
                                this._changeToStep(s, this._steps[this._steps.length - 1]);
                                this._undoedSteps.push(s);
                                this.onDisplayChanged();
                                delete this._undoRedoActive;
                                ret = true;
                            }
                            delete this._undoRedoActive;
                        }
                        return ret;
                    },
                    redo: function() {
                        var ret = false;
                        if (!this._undoRedoActive) {
                            this._undoRedoActive = true;
                            this.endEditing(true);
                            var s = this._undoedSteps.pop();
                            if (s && this._steps.length > 0) {
                                this.focus();
                                this._changeToStep(this._steps[this._steps.length - 1], s);
                                this._steps.push(s);
                                this.onDisplayChanged();
                                ret = true;
                            }
                            delete this._undoRedoActive;
                        }
                        return ret;
                    },
                    endEditing: function(_194) {
                        if (this._editTimer) { this._editTimer = this._editTimer.remove(); }
                        if (this._inEditing) {
                            this._endEditing(_194);
                            this._inEditing = false;
                        }
                    },
                    _getBookmark: function() {
                        var b = this.selection.getBookmark();
                        var tmp = [];
                        if (b && b.mark) {
                            var mark = b.mark;
                            if (has("ie") < 9 || (has("ie") === 9 && has("quirks"))) {
                                var sel = _182.getSelection(this.window);
                                if (!lang.isArray(mark)) { if (sel) { var _195; if (sel.rangeCount) { _195 = sel.getRangeAt(0); } if (_195) { b.mark = _195.cloneRange(); } else { b.mark = this.selection.getBookmark(); } } } else {
                                    _172.forEach(b.mark, function(n) { tmp.push(_182.getIndex(n, this.editNode).o); }, this);
                                    b.mark = tmp;
                                }
                            }
                            try {
                                if (b.mark && b.mark.startContainer) {
                                    tmp = _182.getIndex(b.mark.startContainer, this.editNode).o;
                                    b.mark = { startContainer: tmp, startOffset: b.mark.startOffset, endContainer: b.mark.endContainer === b.mark.startContainer ? tmp : _182.getIndex(b.mark.endContainer, this.editNode).o, endOffset: b.mark.endOffset };
                                }
                            } catch (e) { b.mark = null; }
                        }
                        return b;
                    },
                    _beginEditing: function() { if (this._steps.length === 0) { this._steps.push({ "text": html.getChildrenHtml(this.editNode), "bookmark": this._getBookmark() }); } },
                    _endEditing: function() {
                        var v = html.getChildrenHtml(this.editNode);
                        this._undoedSteps = [];
                        this._steps.push({ text: v, bookmark: this._getBookmark() });
                    },
                    onKeyDown: function(e) {
                        if (!has("ie") && !this.iframe && e.keyCode == keys.TAB && !this.tabIndent) { this._saveSelection(); }
                        if (!this.customUndo) { this.inherited(arguments); return; }
                        var k = e.keyCode;
                        if (e.ctrlKey && !e.shiftKey && !e.altKey) {
                            if (k == 90 || k == 122) {
                                e.stopPropagation();
                                e.preventDefault();
                                this.undo();
                                return;
                            } else {
                                if (k == 89 || k == 121) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this.redo();
                                    return;
                                }
                            }
                        }
                        this.inherited(arguments);
                        switch (k) {
                            case keys.ENTER:
                            case keys.BACKSPACE:
                            case keys.DELETE:
                                this.beginEditing();
                                break;
                            case 88:
                            case 86:
                                if (e.ctrlKey && !e.altKey && !e.metaKey) {
                                    this.endEditing();
                                    if (e.keyCode == 88) { this.beginEditing("cut"); } else { this.beginEditing("paste"); }
                                    this.defer("endEditing", 1);
                                    break;
                                }
                            default:
                                if (!e.ctrlKey && !e.altKey && !e.metaKey && (e.keyCode < keys.F1 || e.keyCode > keys.F15)) { this.beginEditing(); break; }
                            case keys.ALT:
                                this.endEditing();
                                break;
                            case keys.UP_ARROW:
                            case keys.DOWN_ARROW:
                            case keys.LEFT_ARROW:
                            case keys.RIGHT_ARROW:
                            case keys.HOME:
                            case keys.END:
                            case keys.PAGE_UP:
                            case keys.PAGE_DOWN:
                                this.endEditing(true);
                                break;
                            case keys.CTRL:
                            case keys.SHIFT:
                            case keys.TAB:
                                break;
                        }
                    },
                    _onBlur: function() {
                        this.inherited(arguments);
                        this.endEditing(true);
                    },
                    _saveSelection: function() { try { this._savedSelection = this._getBookmark(); } catch (e) {} },
                    _restoreSelection: function() {
                        if (this._savedSelection) {
                            delete this._cursorToStart;
                            if (this.selection.isCollapsed()) { this._moveToBookmark(this._savedSelection); }
                            delete this._savedSelection;
                        }
                    },
                    onClick: function() {
                        this.endEditing(true);
                        this.inherited(arguments);
                    },
                    replaceValue: function(html) {
                        if (!this.customUndo) { this.inherited(arguments); } else {
                            if (this.isClosed) { this.setValue(html); } else {
                                this.beginEditing();
                                if (!html) { html = "&#160;"; }
                                this.setValue(html);
                                this.endEditing();
                            }
                        }
                    },
                    _setDisabledAttr: function(_196) {
                        this.setValueDeferred.then(lang.hitch(this, function() { if ((!this.disabled && _196) || (!this._buttonEnabledPlugins && _196)) { _172.forEach(this._plugins, function(p) { p.set("disabled", true); }); } else { if (this.disabled && !_196) { _172.forEach(this._plugins, function(p) { p.set("disabled", false); }); } } }));
                        this.inherited(arguments);
                    },
                    _setStateClass: function() {
                        try {
                            this.inherited(arguments);
                            if (this.document && this.document.body) {
                                _178.set(this.document.body, "color", _178.get(this.iframe, "color"));
                                _178.set(this.document.body, "background-color", _178.get(this.iframe, "background-color"));
                            }
                        } catch (e) {}
                    }
                });

                function _197(args) { return new _180({ command: args.name }); };

                function _198(args) { return new _180({ buttonClass: _17f, command: args.name }); };
                lang.mixin(_180.registry, {
                    "undo": _197,
                    "redo": _197,
                    "cut": _197,
                    "copy": _197,
                    "paste": _197,
                    "insertOrderedList": _197,
                    "insertUnorderedList": _197,
                    "indent": _197,
                    "outdent": _197,
                    "justifyCenter": _197,
                    "justifyFull": _197,
                    "justifyLeft": _197,
                    "justifyRight": _197,
                    "delete": _197,
                    "selectAll": _197,
                    "removeFormat": _197,
                    "unlink": _197,
                    "insertHorizontalRule": _197,
                    "bold": _198,
                    "italic": _198,
                    "underline": _198,
                    "strikethrough": _198,
                    "subscript": _198,
                    "superscript": _198,
                    "|": function() {
                        return new _180({
                            setEditor: function(_199) {
                                this.editor = _199;
                                this.button = new _17d({ ownerDocument: _199.ownerDocument });
                            }
                        });
                    }
                });
                return _185;
            });
        },
        "dijit/Toolbar": function() {
            define(["require", "dojo/_base/declare", "dojo/has", "dojo/keys", "dojo/ready", "./_Widget", "./_KeyNavContainer", "./_TemplatedMixin"], function(_19a, _19b, has, keys, _19c, _19d, _19e, _19f) {
                if (has("dijit-legacy-requires")) {
                    _19c(0, function() {
                        var _1a0 = ["dijit/ToolbarSeparator"];
                        _19a(_1a0);
                    });
                }
                return _19b("dijit.Toolbar", [_19d, _19f, _19e], { templateString: "<div class=\"dijit\" role=\"toolbar\" tabIndex=\"${tabIndex}\" data-dojo-attach-point=\"containerNode\">" + "</div>", baseClass: "dijitToolbar", _onLeftArrow: function() { this.focusPrev(); }, _onRightArrow: function() { this.focusNext(); } });
            });
        },
        "dijit/_KeyNavContainer": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-attr", "dojo/_base/kernel", "dojo/keys", "dojo/_base/lang", "./registry", "./_Container", "./_FocusMixin", "./_KeyNavMixin"], function(_1a1, _1a2, _1a3, _1a4, keys, lang, _1a5, _1a6, _1a7, _1a8) {
                return _1a2("dijit._KeyNavContainer", [_1a7, _1a8, _1a6], {
                    connectKeyNavHandlers: function(_1a9, _1aa) {
                        var _1ab = (this._keyNavCodes = {});
                        var prev = lang.hitch(this, "focusPrev");
                        var next = lang.hitch(this, "focusNext");
                        _1a1.forEach(_1a9, function(code) { _1ab[code] = prev; });
                        _1a1.forEach(_1aa, function(code) { _1ab[code] = next; });
                        _1ab[keys.HOME] = lang.hitch(this, "focusFirstChild");
                        _1ab[keys.END] = lang.hitch(this, "focusLastChild");
                    },
                    startupKeyNavChildren: function() { _1a4.deprecated("startupKeyNavChildren() call no longer needed", "", "2.0"); },
                    startup: function() {
                        this.inherited(arguments);
                        _1a1.forEach(this.getChildren(), lang.hitch(this, "_startupChild"));
                    },
                    addChild: function(_1ac, _1ad) {
                        this.inherited(arguments);
                        this._startupChild(_1ac);
                    },
                    _startupChild: function(_1ae) { _1ae.set("tabIndex", "-1"); },
                    _getFirst: function() { var _1af = this.getChildren(); return _1af.length ? _1af[0] : null; },
                    _getLast: function() { var _1b0 = this.getChildren(); return _1b0.length ? _1b0[_1b0.length - 1] : null; },
                    focusNext: function() { this.focusChild(this._getNextFocusableChild(this.focusedChild, 1)); },
                    focusPrev: function() { this.focusChild(this._getNextFocusableChild(this.focusedChild, -1), true); },
                    childSelector: function(node) { var node = _1a5.byNode(node); return node && node.getParent() == this; }
                });
            });
        },
        "dijit/_KeyNavMixin": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-attr", "dojo/keys", "dojo/_base/lang", "dojo/on", "dijit/registry", "dijit/_FocusMixin"], function(_1b1, _1b2, _1b3, keys, lang, on, _1b4, _1b5) {
                return _1b2("dijit._KeyNavMixin", _1b5, {
                    tabIndex: "0",
                    childSelector: null,
                    postCreate: function() {
                        this.inherited(arguments);
                        _1b3.set(this.domNode, "tabIndex", this.tabIndex);
                        if (!this._keyNavCodes) {
                            var _1b6 = this._keyNavCodes = {};
                            _1b6[keys.HOME] = lang.hitch(this, "focusFirstChild");
                            _1b6[keys.END] = lang.hitch(this, "focusLastChild");
                            _1b6[this.isLeftToRight() ? keys.LEFT_ARROW : keys.RIGHT_ARROW] = lang.hitch(this, "_onLeftArrow");
                            _1b6[this.isLeftToRight() ? keys.RIGHT_ARROW : keys.LEFT_ARROW] = lang.hitch(this, "_onRightArrow");
                            _1b6[keys.UP_ARROW] = lang.hitch(this, "_onUpArrow");
                            _1b6[keys.DOWN_ARROW] = lang.hitch(this, "_onDownArrow");
                        }
                        var self = this,
                            _1b7 = typeof this.childSelector == "string" ? this.childSelector : lang.hitch(this, "childSelector");
                        this.own(on(this.domNode, "keypress", lang.hitch(this, "_onContainerKeypress")), on(this.domNode, "keydown", lang.hitch(this, "_onContainerKeydown")), on(this.domNode, "focus", lang.hitch(this, "_onContainerFocus")), on(this.containerNode, on.selector(_1b7, "focusin"), function(evt) { self._onChildFocus(_1b4.getEnclosingWidget(this), evt); }));
                    },
                    _onLeftArrow: function() {},
                    _onRightArrow: function() {},
                    _onUpArrow: function() {},
                    _onDownArrow: function() {},
                    focus: function() { this.focusFirstChild(); },
                    _getFirstFocusableChild: function() { return this._getNextFocusableChild(null, 1); },
                    _getLastFocusableChild: function() { return this._getNextFocusableChild(null, -1); },
                    focusFirstChild: function() { this.focusChild(this._getFirstFocusableChild()); },
                    focusLastChild: function() { this.focusChild(this._getLastFocusableChild()); },
                    focusChild: function(_1b8, last) {
                        if (!_1b8) { return; }
                        if (this.focusedChild && _1b8 !== this.focusedChild) { this._onChildBlur(this.focusedChild); }
                        _1b8.set("tabIndex", this.tabIndex);
                        _1b8.focus(last ? "end" : "start");
                    },
                    _onContainerFocus: function(evt) {
                        if (evt.target !== this.domNode || this.focusedChild) { return; }
                        this.focus();
                    },
                    _onFocus: function() {
                        _1b3.set(this.domNode, "tabIndex", "-1");
                        this.inherited(arguments);
                    },
                    _onBlur: function(evt) {
                        _1b3.set(this.domNode, "tabIndex", this.tabIndex);
                        if (this.focusedChild) {
                            this.focusedChild.set("tabIndex", "-1");
                            this.lastFocusedChild = this.focusedChild;
                            this._set("focusedChild", null);
                        }
                        this.inherited(arguments);
                    },
                    _onChildFocus: function(_1b9) {
                        if (_1b9 && _1b9 != this.focusedChild) {
                            if (this.focusedChild && !this.focusedChild._destroyed) { this.focusedChild.set("tabIndex", "-1"); }
                            _1b9.set("tabIndex", this.tabIndex);
                            this.lastFocused = _1b9;
                            this._set("focusedChild", _1b9);
                        }
                    },
                    _searchString: "",
                    multiCharSearchDuration: 1000,
                    onKeyboardSearch: function(item, evt, _1ba, _1bb) { if (item) { this.focusChild(item); } },
                    _keyboardSearchCompare: function(item, _1bc) {
                        var _1bd = item.domNode,
                            text = item.label || (_1bd.focusNode ? _1bd.focusNode.label : "") || _1bd.innerText || _1bd.textContent || "",
                            _1be = text.replace(/^\s+/, "").substr(0, _1bc.length).toLowerCase();
                        return (!!_1bc.length && _1be == _1bc) ? -1 : 0;
                    },
                    _onContainerKeydown: function(evt) {
                        var func = this._keyNavCodes[evt.keyCode];
                        if (func) {
                            func(evt, this.focusedChild);
                            evt.stopPropagation();
                            evt.preventDefault();
                            this._searchString = "";
                        } else {
                            if (evt.keyCode == keys.SPACE && this._searchTimer && !(evt.ctrlKey || evt.altKey || evt.metaKey)) {
                                evt.stopImmediatePropagation();
                                evt.preventDefault();
                                this._keyboardSearch(evt, " ");
                            }
                        }
                    },
                    _onContainerKeypress: function(evt) {
                        if (evt.charCode <= keys.SPACE || evt.ctrlKey || evt.altKey || evt.metaKey) { return; }
                        evt.preventDefault();
                        evt.stopPropagation();
                        this._keyboardSearch(evt, String.fromCharCode(evt.charCode).toLowerCase());
                    },
                    _keyboardSearch: function(evt, _1bf) {
                        var _1c0 = null,
                            _1c1, _1c2 = 0,
                            _1c3 = lang.hitch(this, function() {
                                if (this._searchTimer) { this._searchTimer.remove(); }
                                this._searchString += _1bf;
                                var _1c4 = /^(.)\1*$/.test(this._searchString);
                                var _1c5 = _1c4 ? 1 : this._searchString.length;
                                _1c1 = this._searchString.substr(0, _1c5);
                                this._searchTimer = this.defer(function() {
                                    this._searchTimer = null;
                                    this._searchString = "";
                                }, this.multiCharSearchDuration);
                                var _1c6 = this.focusedChild || null;
                                if (_1c5 == 1 || !_1c6) { _1c6 = this._getNextFocusableChild(_1c6, 1); if (!_1c6) { return; } }
                                var stop = _1c6;
                                do {
                                    var rc = this._keyboardSearchCompare(_1c6, _1c1);
                                    if (!!rc && _1c2++ == 0) { _1c0 = _1c6; }
                                    if (rc == -1) { _1c2 = -1; break; }
                                    _1c6 = this._getNextFocusableChild(_1c6, 1);
                                } while (_1c6 && _1c6 != stop);
                            });
                        _1c3();
                        this.onKeyboardSearch(_1c0, evt, _1c1, _1c2);
                    },
                    _onChildBlur: function() {},
                    _getNextFocusableChild: function(_1c7, dir) {
                        var _1c8 = _1c7;
                        do { if (!_1c7) { _1c7 = this[dir > 0 ? "_getFirst" : "_getLast"](); if (!_1c7) { break; } } else { _1c7 = this._getNext(_1c7, dir); } if (_1c7 != null && _1c7 != _1c8 && _1c7.isFocusable()) { return _1c7; } } while (_1c7 != _1c8);
                        return null;
                    },
                    _getFirst: function() { return null; },
                    _getLast: function() { return null; },
                    _getNext: function(_1c9, dir) { if (_1c9) { _1c9 = _1c9.domNode; while (_1c9) { _1c9 = _1c9[dir < 0 ? "previousSibling" : "nextSibling"]; if (_1c9 && "getAttribute" in _1c9) { var w = _1b4.byNode(_1c9); if (w) { return w; } } } } return null; }
                });
            });
        },
        "dijit/ToolbarSeparator": function() {
            define(["dojo/_base/declare", "dojo/dom", "./_Widget", "./_TemplatedMixin"], function(_1ca, dom, _1cb, _1cc) {
                return _1ca("dijit.ToolbarSeparator", [_1cb, _1cc], {
                    templateString: "<div class=\"dijitToolbarSeparator dijitInline\" role=\"presentation\"></div>",
                    buildRendering: function() {
                        this.inherited(arguments);
                        dom.setSelectable(this.domNode, false);
                    },
                    isFocusable: function() { return false; }
                });
            });
        },
        "dijit/form/ToggleButton": function() {
            define(["dojo/_base/declare", "dojo/_base/kernel", "./Button", "./_ToggleButtonMixin"], function(_1cd, _1ce, _1cf, _1d0) {
                return _1cd("dijit.form.ToggleButton", [_1cf, _1d0], {
                    baseClass: "dijitToggleButton",
                    setChecked: function(_1d1) {
                        _1ce.deprecated("setChecked(" + _1d1 + ") is deprecated. Use set('checked'," + _1d1 + ") instead.", "", "2.0");
                        this.set("checked", _1d1);
                    }
                });
            });
        },
        "dijit/form/Button": function() {
            define(["require", "dojo/_base/declare", "dojo/dom-class", "dojo/has", "dojo/_base/kernel", "dojo/_base/lang", "dojo/ready", "./_FormWidget", "./_ButtonMixin", "dojo/text!./templates/Button.html", "../a11yclick"], function(_1d2, _1d3, _1d4, has, _1d5, lang, _1d6, _1d7, _1d8, _1d9) {
                if (has("dijit-legacy-requires")) {
                    _1d6(0, function() {
                        var _1da = ["dijit/form/DropDownButton", "dijit/form/ComboButton", "dijit/form/ToggleButton"];
                        _1d2(_1da);
                    });
                }
                var _1db = _1d3("dijit.form.Button" + (has("dojo-bidi") ? "_NoBidi" : ""), [_1d7, _1d8], {
                    showLabel: true,
                    iconClass: "dijitNoIcon",
                    _setIconClassAttr: { node: "iconNode", type: "class" },
                    baseClass: "dijitButton",
                    templateString: _1d9,
                    _setValueAttr: "valueNode",
                    _setNameAttr: function(name) { if (this.valueNode) { this.valueNode.setAttribute("name", name); } },
                    postCreate: function() {
                        this.inherited(arguments);
                        this._setLabelFromContainer();
                    },
                    _setLabelFromContainer: function() {
                        if (this.containerNode && !this.label) {
                            this.label = lang.trim(this.containerNode.innerHTML);
                            this.onLabelSet();
                        }
                    },
                    _setShowLabelAttr: function(val) {
                        if (this.containerNode) { _1d4.toggle(this.containerNode, "dijitDisplayNone", !val); }
                        this._set("showLabel", val);
                    },
                    setLabel: function(_1dc) {
                        _1d5.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.", "", "2.0");
                        this.set("label", _1dc);
                    },
                    onLabelSet: function() { this.inherited(arguments); if (!this.showLabel && !("title" in this.params)) { this.titleNode.title = lang.trim(this.containerNode.innerText || this.containerNode.textContent || ""); } }
                });
                if (has("dojo-bidi")) {
                    _1db = _1d3("dijit.form.Button", _1db, {
                        onLabelSet: function() { this.inherited(arguments); if (this.titleNode.title) { this.applyTextDir(this.titleNode, this.titleNode.title); } },
                        _setTextDirAttr: function(_1dd) {
                            if (this._created && this.textDir != _1dd) {
                                this._set("textDir", _1dd);
                                this._setLabelAttr(this.label);
                            }
                        }
                    });
                }
                return _1db;
            });
        },
        "dijit/form/_ButtonMixin": function() {
            define(["dojo/_base/declare", "dojo/dom", "dojo/has", "../registry"], function(_1de, dom, has, _1df) {
                var _1e0 = _1de("dijit.form._ButtonMixin" + (has("dojo-bidi") ? "_NoBidi" : ""), null, {
                    label: "",
                    type: "button",
                    __onClick: function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        if (!this.disabled) { this.valueNode.click(e); }
                        return false;
                    },
                    _onClick: function(e) {
                        if (this.disabled) {
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        }
                        if (this.onClick(e) === false) { e.preventDefault(); }
                        var _1e1 = e.defaultPrevented;
                        if (!_1e1 && this.type == "submit" && !(this.valueNode || this.focusNode).form) {
                            for (var node = this.domNode; node.parentNode; node = node.parentNode) {
                                var _1e2 = _1df.byNode(node);
                                if (_1e2 && typeof _1e2._onSubmit == "function") {
                                    _1e2._onSubmit(e);
                                    e.preventDefault();
                                    _1e1 = true;
                                    break;
                                }
                            }
                        }
                        return !_1e1;
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        dom.setSelectable(this.focusNode, false);
                    },
                    onClick: function() { return true; },
                    _setLabelAttr: function(_1e3) {
                        this._set("label", _1e3);
                        var _1e4 = this.containerNode || this.focusNode;
                        _1e4.innerHTML = _1e3;
                        this.onLabelSet();
                    },
                    onLabelSet: function() {}
                });
                if (has("dojo-bidi")) {
                    _1e0 = _1de("dijit.form._ButtonMixin", _1e0, {
                        onLabelSet: function() {
                            this.inherited(arguments);
                            var _1e5 = this.containerNode || this.focusNode;
                            this.applyTextDir(_1e5);
                        }
                    });
                }
                return _1e0;
            });
        },
        "dijit/form/_ToggleButtonMixin": function() {
            define(["dojo/_base/declare", "dojo/dom-attr"], function(_1e6, _1e7) {
                return _1e6("dijit.form._ToggleButtonMixin", null, {
                    checked: false,
                    _aria_attr: "aria-pressed",
                    _onClick: function(evt) {
                        var _1e8 = this.checked;
                        this._set("checked", !_1e8);
                        var ret = this.inherited(arguments);
                        this.set("checked", ret ? this.checked : _1e8);
                        return ret;
                    },
                    _setCheckedAttr: function(_1e9, _1ea) {
                        this._set("checked", _1e9);
                        var node = this.focusNode || this.domNode;
                        if (this._created) { if (_1e7.get(node, "checked") != !!_1e9) { _1e7.set(node, "checked", !!_1e9); } }
                        node.setAttribute(this._aria_attr, String(_1e9));
                        this._handleOnChange(_1e9, _1ea);
                    },
                    postCreate: function() { this.inherited(arguments); var node = this.focusNode || this.domNode; if (this.checked) { node.setAttribute("checked", "checked"); } if (this._resetValue === undefined) { this._lastValueReported = this._resetValue = this.checked; } },
                    reset: function() {
                        this._hasBeenBlurred = false;
                        this.set("checked", this.params.checked || false);
                    }
                });
            });
        },
        "dijit/_editor/_Plugin": function() {
            define(["dojo/_base/connect", "dojo/_base/declare", "dojo/_base/lang", "../Destroyable", "../form/Button"], function(_1eb, _1ec, lang, _1ed, _1ee) {
                var _1ef = _1ec("dijit._editor._Plugin", _1ed, {
                    constructor: function(args) {
                        this.params = args || {};
                        lang.mixin(this, this.params);
                        this._attrPairNames = {};
                    },
                    editor: null,
                    iconClassPrefix: "dijitEditorIcon",
                    button: null,
                    command: "",
                    useDefaultCommand: true,
                    buttonClass: _1ee,
                    disabled: false,
                    getLabel: function(key) { return this.editor.commands[key]; },
                    _initButton: function() {
                        if (this.command.length) {
                            var _1f0 = this.getLabel(this.command),
                                _1f1 = this.editor,
                                _1f2 = this.iconClassPrefix + " " + this.iconClassPrefix + this.command.charAt(0).toUpperCase() + this.command.substr(1);
                            if (!this.button) {
                                var _1f3 = lang.mixin({ label: _1f0, ownerDocument: _1f1.ownerDocument, dir: _1f1.dir, lang: _1f1.lang, showLabel: false, iconClass: _1f2, dropDown: this.dropDown, tabIndex: "-1" }, this.params || {});
                                delete _1f3.name;
                                this.button = new this.buttonClass(_1f3);
                            }
                        }
                        if (this.get("disabled") && this.button) { this.button.set("disabled", this.get("disabled")); }
                    },
                    destroy: function() {
                        if (this.dropDown) { this.dropDown.destroyRecursive(); }
                        this.inherited(arguments);
                    },
                    connect: function(o, f, tf) { this.own(_1eb.connect(o, f, this, tf)); },
                    updateState: function() {
                        var e = this.editor,
                            c = this.command,
                            _1f4, _1f5;
                        if (!e || !e.isLoaded || !c.length) { return; }
                        var _1f6 = this.get("disabled");
                        if (this.button) {
                            try {
                                var _1f7 = e._implCommand(c);
                                _1f5 = !_1f6 && (this[_1f7] ? this[_1f7](c) : e.queryCommandEnabled(c));
                                if (this.enabled !== _1f5) {
                                    this.enabled = _1f5;
                                    this.button.set("disabled", !_1f5);
                                }
                                if (_1f5) {
                                    if (typeof this.button.checked == "boolean") {
                                        _1f4 = e.queryCommandState(c);
                                        if (this.checked !== _1f4) {
                                            this.checked = _1f4;
                                            this.button.set("checked", e.queryCommandState(c));
                                        }
                                    }
                                }
                            } catch (e) {}
                        }
                    },
                    setEditor: function(_1f8) {
                        this.editor = _1f8;
                        this._initButton();
                        if (this.button && this.useDefaultCommand) { if (this.editor.queryCommandAvailable(this.command)) { this.own(this.button.on("click", lang.hitch(this.editor, "execCommand", this.command, this.commandArg))); } else { this.button.domNode.style.display = "none"; } }
                        this.own(this.editor.on("NormalizedDisplayChanged", lang.hitch(this, "updateState")));
                    },
                    setToolbar: function(_1f9) { if (this.button) { _1f9.addChild(this.button); } },
                    set: function(name, _1fa) { if (typeof name === "object") { for (var x in name) { this.set(x, name[x]); } return this; } var _1fb = this._getAttrNames(name); if (this[_1fb.s]) { var _1fc = this[_1fb.s].apply(this, Array.prototype.slice.call(arguments, 1)); } else { this._set(name, _1fa); } return _1fc || this; },
                    get: function(name) { var _1fd = this._getAttrNames(name); return this[_1fd.g] ? this[_1fd.g]() : this[name]; },
                    _setDisabledAttr: function(_1fe) {
                        this._set("disabled", _1fe);
                        this.updateState();
                    },
                    _getAttrNames: function(name) { var apn = this._attrPairNames; if (apn[name]) { return apn[name]; } var uc = name.charAt(0).toUpperCase() + name.substr(1); return (apn[name] = { s: "_set" + uc + "Attr", g: "_get" + uc + "Attr" }); },
                    _set: function(name, _1ff) { this[name] = _1ff; }
                });
                _1ef.registry = {};
                return _1ef;
            });
        },
        "dijit/_editor/plugins/EnterKeyHandling": function() {
            define(["dojo/_base/declare", "dojo/dom-construct", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/sniff", "dojo/_base/window", "dojo/window", "../_Plugin", "../RichText", "../range"], function(_200, _201, keys, lang, on, has, win, _202, _203, _204, _205) {
                return _200("dijit._editor.plugins.EnterKeyHandling", _203, {
                    blockNodeForEnter: "BR",
                    constructor: function(args) {
                        if (args) {
                            if ("blockNodeForEnter" in args) { args.blockNodeForEnter = args.blockNodeForEnter.toUpperCase(); }
                            lang.mixin(this, args);
                        }
                    },
                    setEditor: function(_206) {
                        if (this.editor === _206) { return; }
                        this.editor = _206;
                        if (this.blockNodeForEnter == "BR") {
                            this.editor.customUndo = true;
                            _206.onLoadDeferred.then(lang.hitch(this, function(d) {
                                this.own(on(_206.document, "keydown", lang.hitch(this, function(e) {
                                    if (e.keyCode == keys.ENTER) {
                                        var ne = lang.mixin({}, e);
                                        ne.shiftKey = true;
                                        if (!this.handleEnterKey(ne)) {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }
                                    }
                                })));
                                if (has("ie") >= 9 && has("ie") <= 10) {
                                    this.own(on(_206.document, "paste", lang.hitch(this, function(e) {
                                        setTimeout(lang.hitch(this, function() {
                                            var r = this.editor.document.selection.createRange();
                                            r.move("character", -1);
                                            r.select();
                                            r.move("character", 1);
                                            r.select();
                                        }), 0);
                                    })));
                                }
                                return d;
                            }));
                        } else {
                            if (this.blockNodeForEnter) {
                                var h = lang.hitch(this, "handleEnterKey");
                                _206.addKeyHandler(13, 0, 0, h);
                                _206.addKeyHandler(13, 0, 1, h);
                                this.own(this.editor.on("KeyPressed", lang.hitch(this, "onKeyPressed")));
                            }
                        }
                    },
                    onKeyPressed: function() {
                        if (this._checkListLater) {
                            if (this.editor.selection.isCollapsed()) {
                                var _207 = this.editor.selection.getAncestorElement("LI");
                                if (!_207) {
                                    _204.prototype.execCommand.call(this.editor, "formatblock", this.blockNodeForEnter);
                                    var _208 = this.editor.selection.getAncestorElement(this.blockNodeForEnter);
                                    if (_208) {
                                        _208.innerHTML = this.bogusHtmlContent;
                                        if (has("ie") <= 9) {
                                            var r = this.editor.document.selection.createRange();
                                            r.move("character", -1);
                                            r.select();
                                        }
                                    } else { console.error("onKeyPressed: Cannot find the new block node"); }
                                } else {
                                    if (has("mozilla")) { if (_207.parentNode.parentNode.nodeName == "LI") { _207 = _207.parentNode.parentNode; } }
                                    var fc = _207.firstChild;
                                    if (fc && fc.nodeType == 1 && (fc.nodeName == "UL" || fc.nodeName == "OL")) {
                                        _207.insertBefore(fc.ownerDocument.createTextNode(" "), fc);
                                        var _209 = _205.create(this.editor.window);
                                        _209.setStart(_207.firstChild, 0);
                                        var _20a = _205.getSelection(this.editor.window, true);
                                        _20a.removeAllRanges();
                                        _20a.addRange(_209);
                                    }
                                }
                            }
                            this._checkListLater = false;
                        }
                        if (this._pressedEnterInBlock) {
                            if (this._pressedEnterInBlock.previousSibling) { this.removeTrailingBr(this._pressedEnterInBlock.previousSibling); }
                            delete this._pressedEnterInBlock;
                        }
                    },
                    bogusHtmlContent: "&#160;",
                    blockNodes: /^(?:P|H1|H2|H3|H4|H5|H6|LI)$/,
                    handleEnterKey: function(e) {
                        var _20b, _20c, _20d, _20e, _20f, _210, doc = this.editor.document,
                            br, rs, txt;
                        if (e.shiftKey) {
                            var _211 = this.editor.selection.getParentElement();
                            var _212 = _205.getAncestor(_211, this.blockNodes);
                            if (_212) {
                                if (_212.tagName == "LI") { return true; }
                                _20b = _205.getSelection(this.editor.window);
                                _20c = _20b.getRangeAt(0);
                                if (!_20c.collapsed) {
                                    _20c.deleteContents();
                                    _20b = _205.getSelection(this.editor.window);
                                    _20c = _20b.getRangeAt(0);
                                }
                                if (_205.atBeginningOfContainer(_212, _20c.startContainer, _20c.startOffset)) {
                                    br = doc.createElement("br");
                                    _20d = _205.create(this.editor.window);
                                    _212.insertBefore(br, _212.firstChild);
                                    _20d.setStartAfter(br);
                                    _20b.removeAllRanges();
                                    _20b.addRange(_20d);
                                } else {
                                    if (_205.atEndOfContainer(_212, _20c.startContainer, _20c.startOffset)) {
                                        _20d = _205.create(this.editor.window);
                                        br = doc.createElement("br");
                                        _212.appendChild(br);
                                        _212.appendChild(doc.createTextNode(" "));
                                        _20d.setStart(_212.lastChild, 0);
                                        _20b.removeAllRanges();
                                        _20b.addRange(_20d);
                                    } else {
                                        rs = _20c.startContainer;
                                        if (rs && rs.nodeType == 3) {
                                            txt = rs.nodeValue;
                                            _20e = doc.createTextNode(txt.substring(0, _20c.startOffset));
                                            _20f = doc.createTextNode(txt.substring(_20c.startOffset));
                                            _210 = doc.createElement("br");
                                            if (_20f.nodeValue == "" && has("webkit")) { _20f = doc.createTextNode(" "); }
                                            _201.place(_20e, rs, "after");
                                            _201.place(_210, _20e, "after");
                                            _201.place(_20f, _210, "after");
                                            _201.destroy(rs);
                                            _20d = _205.create(this.editor.window);
                                            _20d.setStart(_20f, 0);
                                            _20b.removeAllRanges();
                                            _20b.addRange(_20d);
                                            return false;
                                        }
                                        return true;
                                    }
                                }
                            } else {
                                _20b = _205.getSelection(this.editor.window);
                                if (_20b.rangeCount) {
                                    _20c = _20b.getRangeAt(0);
                                    if (_20c && _20c.startContainer) {
                                        if (!_20c.collapsed) {
                                            _20c.deleteContents();
                                            _20b = _205.getSelection(this.editor.window);
                                            _20c = _20b.getRangeAt(0);
                                        }
                                        rs = _20c.startContainer;
                                        if (rs && rs.nodeType == 3) {
                                            var _213 = _20c.startOffset;
                                            if (rs.length < _213) {
                                                ret = this._adjustNodeAndOffset(rs, _213);
                                                rs = ret.node;
                                                _213 = ret.offset;
                                            }
                                            txt = rs.nodeValue;
                                            _20e = doc.createTextNode(txt.substring(0, _213));
                                            _20f = doc.createTextNode(txt.substring(_213));
                                            _210 = doc.createElement("br");
                                            if (!_20f.length) { _20f = doc.createTextNode(" "); }
                                            if (_20e.length) { _201.place(_20e, rs, "after"); } else { _20e = rs; }
                                            _201.place(_210, _20e, "after");
                                            _201.place(_20f, _210, "after");
                                            _201.destroy(rs);
                                            _20d = _205.create(this.editor.window);
                                            _20d.setStart(_20f, 0);
                                            _20d.setEnd(_20f, _20f.length);
                                            _20b.removeAllRanges();
                                            _20b.addRange(_20d);
                                            this.editor.selection.collapse(true);
                                        } else {
                                            var _214;
                                            if (_20c.startOffset >= 0) { _214 = rs.childNodes[_20c.startOffset]; }
                                            var _210 = doc.createElement("br");
                                            var _20f = doc.createTextNode(" ");
                                            if (!_214) {
                                                rs.appendChild(_210);
                                                rs.appendChild(_20f);
                                            } else {
                                                _201.place(_210, _214, "before");
                                                _201.place(_20f, _210, "after");
                                            }
                                            _20d = _205.create(this.editor.window);
                                            _20d.setStart(_20f, 0);
                                            _20d.setEnd(_20f, _20f.length);
                                            _20b.removeAllRanges();
                                            _20b.addRange(_20d);
                                            this.editor.selection.collapse(true);
                                        }
                                    }
                                } else { _204.prototype.execCommand.call(this.editor, "inserthtml", "<br>"); }
                            }
                            return false;
                        }
                        var _215 = true;
                        _20b = _205.getSelection(this.editor.window);
                        _20c = _20b.getRangeAt(0);
                        if (!_20c.collapsed) {
                            _20c.deleteContents();
                            _20b = _205.getSelection(this.editor.window);
                            _20c = _20b.getRangeAt(0);
                        }
                        var _216 = _205.getBlockAncestor(_20c.endContainer, null, this.editor.editNode);
                        var _217 = _216.blockNode;
                        if ((this._checkListLater = (_217 && (_217.nodeName == "LI" || _217.parentNode.nodeName == "LI")))) {
                            if (has("mozilla")) { this._pressedEnterInBlock = _217; }
                            if (/^(\s|&nbsp;|&#160;|\xA0|<span\b[^>]*\bclass=['"]Apple-style-span['"][^>]*>(\s|&nbsp;|&#160;|\xA0)<\/span>)?(<br>)?$/.test(_217.innerHTML)) {
                                _217.innerHTML = "";
                                if (has("webkit")) {
                                    _20d = _205.create(this.editor.window);
                                    _20d.setStart(_217, 0);
                                    _20b.removeAllRanges();
                                    _20b.addRange(_20d);
                                }
                                this._checkListLater = false;
                            }
                            return true;
                        }
                        if (!_216.blockNode || _216.blockNode === this.editor.editNode) {
                            try { _204.prototype.execCommand.call(this.editor, "formatblock", this.blockNodeForEnter); } catch (e2) {}
                            _216 = { blockNode: this.editor.selection.getAncestorElement(this.blockNodeForEnter), blockContainer: this.editor.editNode };
                            if (_216.blockNode) { if (_216.blockNode != this.editor.editNode && (!(_216.blockNode.textContent || _216.blockNode.innerHTML).replace(/^\s+|\s+$/g, "").length)) { this.removeTrailingBr(_216.blockNode); return false; } } else { _216.blockNode = this.editor.editNode; }
                            _20b = _205.getSelection(this.editor.window);
                            _20c = _20b.getRangeAt(0);
                        }
                        var _218 = doc.createElement(this.blockNodeForEnter);
                        _218.innerHTML = this.bogusHtmlContent;
                        this.removeTrailingBr(_216.blockNode);
                        var _219 = _20c.endOffset;
                        var node = _20c.endContainer;
                        if (node.length < _219) {
                            var ret = this._adjustNodeAndOffset(node, _219);
                            node = ret.node;
                            _219 = ret.offset;
                        }
                        if (_205.atEndOfContainer(_216.blockNode, node, _219)) {
                            if (_216.blockNode === _216.blockContainer) { _216.blockNode.appendChild(_218); } else { _201.place(_218, _216.blockNode, "after"); }
                            _215 = false;
                            _20d = _205.create(this.editor.window);
                            _20d.setStart(_218, 0);
                            _20b.removeAllRanges();
                            _20b.addRange(_20d);
                            if (this.editor.height) { _202.scrollIntoView(_218); }
                        } else {
                            if (_205.atBeginningOfContainer(_216.blockNode, _20c.startContainer, _20c.startOffset)) {
                                _201.place(_218, _216.blockNode, _216.blockNode === _216.blockContainer ? "first" : "before");
                                if (_218.nextSibling && this.editor.height) {
                                    _20d = _205.create(this.editor.window);
                                    _20d.setStart(_218.nextSibling, 0);
                                    _20b.removeAllRanges();
                                    _20b.addRange(_20d);
                                    _202.scrollIntoView(_218.nextSibling);
                                }
                                _215 = false;
                            } else {
                                if (_216.blockNode === _216.blockContainer) { _216.blockNode.appendChild(_218); } else { _201.place(_218, _216.blockNode, "after"); }
                                _215 = false;
                                if (_216.blockNode.style) { if (_218.style) { if (_216.blockNode.style.cssText) { _218.style.cssText = _216.blockNode.style.cssText; } } }
                                rs = _20c.startContainer;
                                var _21a;
                                if (rs && rs.nodeType == 3) {
                                    var _21b, _21c;
                                    _219 = _20c.endOffset;
                                    if (rs.length < _219) {
                                        ret = this._adjustNodeAndOffset(rs, _219);
                                        rs = ret.node;
                                        _219 = ret.offset;
                                    }
                                    txt = rs.nodeValue;
                                    _20e = doc.createTextNode(txt.substring(0, _219));
                                    _20f = doc.createTextNode(txt.substring(_219, txt.length));
                                    _201.place(_20e, rs, "before");
                                    _201.place(_20f, rs, "after");
                                    _201.destroy(rs);
                                    var _21d = _20e.parentNode;
                                    while (_21d !== _216.blockNode) {
                                        var tg = _21d.tagName;
                                        var _21e = doc.createElement(tg);
                                        if (_21d.style) { if (_21e.style) { if (_21d.style.cssText) { _21e.style.cssText = _21d.style.cssText; } } }
                                        if (_21d.tagName === "FONT") { if (_21d.color) { _21e.color = _21d.color; } if (_21d.face) { _21e.face = _21d.face; } if (_21d.size) { _21e.size = _21d.size; } }
                                        _21b = _20f;
                                        while (_21b) {
                                            _21c = _21b.nextSibling;
                                            _21e.appendChild(_21b);
                                            _21b = _21c;
                                        }
                                        _201.place(_21e, _21d, "after");
                                        _20e = _21d;
                                        _20f = _21e;
                                        _21d = _21d.parentNode;
                                    }
                                    _21b = _20f;
                                    if (_21b.nodeType == 1 || (_21b.nodeType == 3 && _21b.nodeValue)) { _218.innerHTML = ""; }
                                    _21a = _21b;
                                    while (_21b) {
                                        _21c = _21b.nextSibling;
                                        _218.appendChild(_21b);
                                        _21b = _21c;
                                    }
                                }
                                _20d = _205.create(this.editor.window);
                                var _21f;
                                var _220 = _21a;
                                if (this.blockNodeForEnter !== "BR") {
                                    while (_220) {
                                        _21f = _220;
                                        _21c = _220.firstChild;
                                        _220 = _21c;
                                    }
                                    if (_21f && _21f.parentNode) {
                                        _218 = _21f.parentNode;
                                        _20d.setStart(_218, 0);
                                        _20b.removeAllRanges();
                                        _20b.addRange(_20d);
                                        if (this.editor.height) { _202.scrollIntoView(_218); }
                                        if (has("mozilla")) { this._pressedEnterInBlock = _216.blockNode; }
                                    } else { _215 = true; }
                                } else {
                                    _20d.setStart(_218, 0);
                                    _20b.removeAllRanges();
                                    _20b.addRange(_20d);
                                    if (this.editor.height) { _202.scrollIntoView(_218); }
                                    if (has("mozilla")) { this._pressedEnterInBlock = _216.blockNode; }
                                }
                            }
                        }
                        return _215;
                    },
                    _adjustNodeAndOffset: function(node, _221) {
                        while (node.length < _221 && node.nextSibling && node.nextSibling.nodeType == 3) {
                            _221 = _221 - node.length;
                            node = node.nextSibling;
                        }
                        return { "node": node, "offset": _221 };
                    },
                    removeTrailingBr: function(_222) { var para = /P|DIV|LI/i.test(_222.tagName) ? _222 : this.editor.selection.getParentOfType(_222, ["P", "DIV", "LI"]); if (!para) { return; } if (para.lastChild) { if ((para.childNodes.length > 1 && para.lastChild.nodeType == 3 && /^[\s\xAD]*$/.test(para.lastChild.nodeValue)) || para.lastChild.tagName == "BR") { _201.destroy(para.lastChild); } } if (!para.childNodes.length) { para.innerHTML = this.bogusHtmlContent; } }
                });
            });
        },
        "dijit/_editor/RichText": function() {
            define(["dojo/_base/array", "dojo/_base/config", "dojo/_base/declare", "dojo/_base/Deferred", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/kernel", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/query", "dojo/domReady", "dojo/sniff", "dojo/string", "dojo/topic", "dojo/_base/unload", "dojo/_base/url", "dojo/window", "../_Widget", "../_CssStateMixin", "../selection", "./range", "./html", "../focus", "../main"], function(_223, _224, _225, _226, dom, _227, _228, _229, _22a, _22b, _22c, keys, lang, on, _22d, _22e, has, _22f, _230, _231, _232, _233, _234, _235, _236, _237, _238, _239, _23a) {
                var _23b = _225("dijit._editor.RichText", [_234, _235], {
                    constructor: function(_23c) {
                        this.contentPreFilters = [];
                        this.contentPostFilters = [];
                        this.contentDomPreFilters = [];
                        this.contentDomPostFilters = [];
                        this.editingAreaStyleSheets = [];
                        this.events = [].concat(this.events);
                        this._keyHandlers = {};
                        if (_23c && lang.isString(_23c.value)) { this.value = _23c.value; }
                        this.onLoadDeferred = new _226();
                    },
                    baseClass: "dijitEditor",
                    inheritWidth: false,
                    focusOnLoad: false,
                    name: "",
                    styleSheets: "",
                    height: "300px",
                    minHeight: "1em",
                    isClosed: true,
                    isLoaded: false,
                    _SEPARATOR: "@@**%%__RICHTEXTBOUNDRY__%%**@@",
                    _NAME_CONTENT_SEP: "@@**%%:%%**@@",
                    onLoadDeferred: null,
                    isTabIndent: false,
                    disableSpellCheck: false,
                    postCreate: function() {
                        if ("textarea" === this.domNode.tagName.toLowerCase()) { console.warn("RichText should not be used with the TEXTAREA tag.  See dijit._editor.RichText docs."); }
                        this.contentPreFilters = [lang.trim, lang.hitch(this, "_preFixUrlAttributes")].concat(this.contentPreFilters);
                        if (has("mozilla")) {
                            this.contentPreFilters = [this._normalizeFontStyle].concat(this.contentPreFilters);
                            this.contentPostFilters = [this._removeMozBogus].concat(this.contentPostFilters);
                        }
                        if (has("webkit")) {
                            this.contentPreFilters = [this._removeWebkitBogus].concat(this.contentPreFilters);
                            this.contentPostFilters = [this._removeWebkitBogus].concat(this.contentPostFilters);
                        }
                        if (has("ie") || has("trident")) {
                            this.contentPostFilters = [this._normalizeFontStyle].concat(this.contentPostFilters);
                            this.contentDomPostFilters = [lang.hitch(this, "_stripBreakerNodes")].concat(this.contentDomPostFilters);
                        }
                        this.contentDomPostFilters = [lang.hitch(this, "_stripTrailingEmptyNodes")].concat(this.contentDomPostFilters);
                        this.inherited(arguments);
                        _230.publish(_23a._scopeName + "._editor.RichText::init", this);
                    },
                    startup: function() {
                        this.inherited(arguments);
                        this.open();
                        this.setupDefaultShortcuts();
                    },
                    setupDefaultShortcuts: function() { var exec = lang.hitch(this, function(cmd, arg) { return function() { return !this.execCommand(cmd, arg); }; }); var _23d = { b: exec("bold"), i: exec("italic"), u: exec("underline"), a: exec("selectall"), s: function() { this.save(true); }, m: function() { this.isTabIndent = !this.isTabIndent; }, "1": exec("formatblock", "h1"), "2": exec("formatblock", "h2"), "3": exec("formatblock", "h3"), "4": exec("formatblock", "h4"), "\\": exec("insertunorderedlist") }; if (!has("ie")) { _23d.Z = exec("redo"); } var key; for (key in _23d) { this.addKeyHandler(key, true, false, _23d[key]); } },
                    events: ["onKeyDown", "onKeyUp"],
                    captureEvents: [],
                    _editorCommandsLocalized: false,
                    _localizeEditorCommands: function() {
                        if (_23b._editorCommandsLocalized) {
                            this._local2NativeFormatNames = _23b._local2NativeFormatNames;
                            this._native2LocalFormatNames = _23b._native2LocalFormatNames;
                            return;
                        }
                        _23b._editorCommandsLocalized = true;
                        _23b._local2NativeFormatNames = {};
                        _23b._native2LocalFormatNames = {};
                        this._local2NativeFormatNames = _23b._local2NativeFormatNames;
                        this._native2LocalFormatNames = _23b._native2LocalFormatNames;
                        var _23e = ["div", "p", "pre", "h1", "h2", "h3", "h4", "h5", "h6", "ol", "ul", "address"];
                        var _23f = "",
                            _240, i = 0;
                        while ((_240 = _23e[i++])) { if (_240.charAt(1) !== "l") { _23f += "<" + _240 + "><span>content</span></" + _240 + "><br/>"; } else { _23f += "<" + _240 + "><li>content</li></" + _240 + "><br/>"; } }
                        var _241 = { position: "absolute", top: "0px", zIndex: 10, opacity: 0.01 };
                        var div = _229.create("div", { style: _241, innerHTML: _23f });
                        this.ownerDocumentBody.appendChild(div);
                        var _242 = lang.hitch(this, function() {
                            var node = div.firstChild;
                            while (node) {
                                try {
                                    this.selection.selectElement(node.firstChild);
                                    var _243 = node.tagName.toLowerCase();
                                    this._local2NativeFormatNames[_243] = document.queryCommandValue("formatblock");
                                    this._native2LocalFormatNames[this._local2NativeFormatNames[_243]] = _243;
                                    node = node.nextSibling.nextSibling;
                                } catch (e) {}
                            }
                            _229.destroy(div);
                        });
                        this.defer(_242);
                    },
                    open: function(_244) {
                        if (!this.onLoadDeferred || this.onLoadDeferred.fired >= 0) { this.onLoadDeferred = new _226(); }
                        if (!this.isClosed) { this.close(); }
                        _230.publish(_23a._scopeName + "._editor.RichText::open", this);
                        if (arguments.length === 1 && _244.nodeName) { this.domNode = _244; }
                        var dn = this.domNode;
                        var html;
                        if (lang.isString(this.value)) {
                            html = this.value;
                            dn.innerHTML = "";
                        } else {
                            if (dn.nodeName && dn.nodeName.toLowerCase() == "textarea") {
                                var ta = (this.textarea = dn);
                                this.name = ta.name;
                                html = ta.value;
                                dn = this.domNode = this.ownerDocument.createElement("div");
                                dn.setAttribute("widgetId", this.id);
                                ta.removeAttribute("widgetId");
                                dn.cssText = ta.cssText;
                                dn.className += " " + ta.className;
                                _229.place(dn, ta, "before");
                                var _245 = lang.hitch(this, function() {
                                    _22b.set(ta, { display: "block", position: "absolute", top: "-1000px" });
                                    if (has("ie")) {
                                        var s = ta.style;
                                        this.__overflow = s.overflow;
                                        s.overflow = "hidden";
                                    }
                                });
                                if (has("ie")) { this.defer(_245, 10); } else { _245(); }
                                if (ta.form) {
                                    var _246 = ta.value;
                                    this.reset = function() { var _247 = this.getValue(); if (_247 !== _246) { this.replaceValue(_246); } };
                                    on(ta.form, "submit", lang.hitch(this, function() {
                                        _227.set(ta, "disabled", this.disabled);
                                        ta.value = this.getValue();
                                    }));
                                }
                            } else {
                                html = _238.getChildrenHtml(dn);
                                dn.innerHTML = "";
                            }
                        }
                        this.value = html;
                        if (dn.nodeName && dn.nodeName === "LI") { dn.innerHTML = " <br>"; }
                        this.header = dn.ownerDocument.createElement("div");
                        dn.appendChild(this.header);
                        this.editingArea = dn.ownerDocument.createElement("div");
                        dn.appendChild(this.editingArea);
                        this.footer = dn.ownerDocument.createElement("div");
                        dn.appendChild(this.footer);
                        if (!this.name) { this.name = this.id + "_AUTOGEN"; }
                        if (this.name !== "" && (!_224["useXDomain"] || _224["allowXdRichTextSave"])) {
                            var _248 = dom.byId(_23a._scopeName + "._editor.RichText.value");
                            if (_248 && _248.value !== "") {
                                var _249 = _248.value.split(this._SEPARATOR),
                                    i = 0,
                                    dat;
                                while ((dat = _249[i++])) {
                                    var data = dat.split(this._NAME_CONTENT_SEP);
                                    if (data[0] === this.name) {
                                        this.value = data[1];
                                        _249 = _249.splice(i, 1);
                                        _248.value = _249.join(this._SEPARATOR);
                                        break;
                                    }
                                }
                            }
                            if (!_23b._globalSaveHandler) {
                                _23b._globalSaveHandler = {};
                                _231.addOnUnload(function() { var id; for (id in _23b._globalSaveHandler) { var f = _23b._globalSaveHandler[id]; if (lang.isFunction(f)) { f(); } } });
                            }
                            _23b._globalSaveHandler[this.id] = lang.hitch(this, "_saveContent");
                        }
                        this.isClosed = false;
                        var ifr = (this.editorObject = this.iframe = this.ownerDocument.createElement("iframe"));
                        ifr.id = this.id + "_iframe";
                        ifr.style.border = "none";
                        ifr.style.width = "100%";
                        if (this._layoutMode) { ifr.style.height = "100%"; } else { if (has("ie") >= 7) { if (this.height) { ifr.style.height = this.height; } if (this.minHeight) { ifr.style.minHeight = this.minHeight; } } else { ifr.style.height = this.height ? this.height : this.minHeight; } }
                        ifr.frameBorder = 0;
                        ifr._loadFunc = lang.hitch(this, function(w) {
                            this.window = w;
                            this.document = w.document;
                            this.selection = new _236.SelectionManager(w);
                            if (has("ie")) { this._localizeEditorCommands(); }
                            this.onLoad(this.get("value"));
                        });
                        var src = this._getIframeDocTxt().replace(/\\/g, "\\\\").replace(/'/g, "\\'"),
                            s;
                        if (has("ie") < 11) { s = "javascript:document.open();try{parent.window;}catch(e){document.domain=\"" + document.domain + "\";}" + "document.write('" + src + "');document.close()"; } else { s = "javascript: '" + src + "'"; }
                        this.editingArea.appendChild(ifr);
                        ifr.src = s;
                        if (dn.nodeName === "LI") { dn.lastChild.style.marginTop = "-1.2em"; }
                        _228.add(this.domNode, this.baseClass);
                    },
                    _local2NativeFormatNames: {},
                    _native2LocalFormatNames: {},
                    _getIframeDocTxt: function() {
                        var _24a = _22b.getComputedStyle(this.domNode);
                        var _24b;
                        if (this["aria-label"]) { _24b = this["aria-label"]; } else { var _24c = _22d("label[for=\"" + this.id + "\"]", this.ownerDocument)[0] || dom.byId(this["aria-labelledby"], this.ownerDocument); if (_24c) { _24b = _24c.textContent || _24c.innerHTML || ""; } }
                        var html = "<div id='dijitEditorBody' role='textbox' aria-multiline='true' " + (_24b ? " aria-label='" + _22f.escape(_24b) + "'" : "") + "></div>";
                        var font = [_24a.fontWeight, _24a.fontSize, _24a.fontFamily].join(" ");
                        var _24d = _24a.lineHeight;
                        if (_24d.indexOf("px") >= 0) { _24d = parseFloat(_24d) / parseFloat(_24a.fontSize); } else { if (_24d.indexOf("em") >= 0) { _24d = parseFloat(_24d); } else { _24d = "normal"; } }
                        var _24e = "";
                        var self = this;
                        this.style.replace(/(^|;)\s*(line-|font-?)[^;]+/ig, function(_24f) {
                            _24f = _24f.replace(/^;/ig, "") + ";";
                            var s = _24f.split(":")[0];
                            if (s) {
                                s = lang.trim(s);
                                s = s.toLowerCase();
                                var i;
                                var sC = "";
                                for (i = 0; i < s.length; i++) {
                                    var c = s.charAt(i);
                                    switch (c) {
                                        case "-":
                                            i++;
                                            c = s.charAt(i).toUpperCase();
                                        default:
                                            sC += c;
                                    }
                                }
                                _22b.set(self.domNode, sC, "");
                            }
                            _24e += _24f + ";";
                        });
                        this.iframe.setAttribute("title", _24b);
                        var _250 = this.lang || _22c.locale.replace(/-.*/, "");
                        return ["<!DOCTYPE html>", "<html lang='" + _250 + "'" + (this.isLeftToRight() ? "" : " dir='rtl'") + ">\n", "<head>\n", "<meta http-equiv='Content-Type' content='text/html'>\n", _24b ? "<title>" + _22f.escape(_24b) + "</title>" : "", "<style>\n", "\tbody,html {\n", "\t\tbackground:transparent;\n", "\t\tpadding: 1px 0 0 0;\n", "\t\tmargin: -1px 0 0 0;\n", "\t}\n", "\tbody,html,#dijitEditorBody { outline: none; }", "html { height: 100%; width: 100%; overflow: hidden; }\n", this.height ? "\tbody,#dijitEditorBody { height: 100%; width: 100%; overflow: auto; }\n" : "\tbody,#dijitEditorBody { min-height: " + this.minHeight + "; width: 100%; overflow-x: auto; overflow-y: hidden; }\n", "\tbody{\n", "\t\ttop:0px;\n", "\t\tleft:0px;\n", "\t\tright:0px;\n", "\t\tfont:", font, ";\n", ((this.height || has("opera")) ? "" : "\t\tposition: fixed;\n"), "\t\tline-height:", _24d, ";\n", "\t}\n", "\tp{ margin: 1em 0; }\n", "\tli > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; }\n", (has("ie") || has("trident") || has("edge") ? "" : "\tli{ min-height:1.2em; }\n"), "</style>\n", this._applyEditingAreaStyleSheets(), "\n", "</head>\n<body role='application'", _24b ? " aria-label='" + _22f.escape(_24b) + "'" : "", "onload='try{frameElement && frameElement._loadFunc(window,document)}catch(e){document.domain=\"" + document.domain + "\";frameElement._loadFunc(window,document)}' ", "style='" + _24e + "'>", html, "</body>\n</html>"].join("");
                    },
                    _applyEditingAreaStyleSheets: function() {
                        var _251 = [];
                        if (this.styleSheets) {
                            _251 = this.styleSheets.split(";");
                            this.styleSheets = "";
                        }
                        _251 = _251.concat(this.editingAreaStyleSheets);
                        this.editingAreaStyleSheets = [];
                        var text = "",
                            i = 0,
                            url, _252 = _233.get(this.ownerDocument);
                        while ((url = _251[i++])) {
                            var _253 = (new _232(_252.location, url)).toString();
                            this.editingAreaStyleSheets.push(_253);
                            text += "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + _253 + "\"/>";
                        }
                        return text;
                    },
                    addStyleSheet: function(uri) {
                        var url = uri.toString(),
                            _254 = _233.get(this.ownerDocument);
                        if (url.charAt(0) === "." || (url.charAt(0) !== "/" && !uri.host)) { url = (new _232(_254.location, url)).toString(); }
                        if (_223.indexOf(this.editingAreaStyleSheets, url) > -1) { return; }
                        this.editingAreaStyleSheets.push(url);
                        this.onLoadDeferred.then(lang.hitch(this, function() {
                            if (this.document.createStyleSheet) { this.document.createStyleSheet(url); } else {
                                var head = this.document.getElementsByTagName("head")[0];
                                var _255 = this.document.createElement("link");
                                _255.rel = "stylesheet";
                                _255.type = "text/css";
                                _255.href = url;
                                head.appendChild(_255);
                            }
                        }));
                    },
                    removeStyleSheet: function(uri) {
                        var url = uri.toString(),
                            _256 = _233.get(this.ownerDocument);
                        if (url.charAt(0) === "." || (url.charAt(0) !== "/" && !uri.host)) { url = (new _232(_256.location, url)).toString(); }
                        var _257 = _223.indexOf(this.editingAreaStyleSheets, url);
                        if (_257 === -1) { return; }
                        delete this.editingAreaStyleSheets[_257];
                        _22d("link[href=\"" + url + "\"]", this.window.document).orphan();
                    },
                    disabled: false,
                    _mozSettingProps: { "styleWithCSS": false },
                    _setDisabledAttr: function(_258) {
                        _258 = !!_258;
                        this._set("disabled", _258);
                        if (!this.isLoaded) { return; }
                        var _259 = has("ie") && (this.isLoaded || !this.focusOnLoad);
                        if (_259) { this.editNode.unselectable = "on"; }
                        this.editNode.contentEditable = !_258;
                        this.editNode.tabIndex = _258 ? "-1" : this.tabIndex;
                        if (_259) { this.defer(function() { if (this.editNode) { this.editNode.unselectable = "off"; } }); }
                        if (has("mozilla") && !_258 && this._mozSettingProps) { var ps = this._mozSettingProps; var n; for (n in ps) { if (ps.hasOwnProperty(n)) { try { this.document.execCommand(n, false, ps[n]); } catch (e2) {} } } }
                        this._disabledOK = true;
                    },
                    onLoad: function(html) {
                        if (!this.window.__registeredWindow) {
                            this.window.__registeredWindow = true;
                            this._iframeRegHandle = _239.registerIframe(this.iframe);
                        }
                        this.editNode = this.document.body.firstChild;
                        var _25a = this;
                        this.beforeIframeNode = _229.place("<div tabIndex=-1></div>", this.iframe, "before");
                        this.afterIframeNode = _229.place("<div tabIndex=-1></div>", this.iframe, "after");
                        this.iframe.onfocus = this.document.onfocus = function() { _25a.editNode.focus(); };
                        this.focusNode = this.editNode;
                        var _25b = this.events.concat(this.captureEvents);
                        var ap = this.iframe ? this.document : this.editNode;
                        this.own.apply(this, _223.map(_25b, function(item) { var type = item.toLowerCase().replace(/^on/, ""); return on(ap, type, lang.hitch(this, item)); }, this));
                        this.own(on(ap, "mouseup", lang.hitch(this, "onClick")));
                        if (has("ie")) {
                            this.own(on(this.document, "mousedown", lang.hitch(this, "_onIEMouseDown")));
                            this.editNode.style.zoom = 1;
                        }
                        if (has("webkit")) {
                            this._webkitListener = this.own(on(this.document, "mouseup", lang.hitch(this, "onDisplayChanged")))[0];
                            this.own(on(this.document, "mousedown", lang.hitch(this, function(e) { var t = e.target; if (t && (t === this.document.body || t === this.document)) { this.defer("placeCursorAtEnd"); } })));
                        }
                        if (has("ie")) { try { this.document.execCommand("RespectVisibilityInDesign", true, null); } catch (e) {} }
                        this.isLoaded = true;
                        this.set("disabled", this.disabled);
                        var _25c = lang.hitch(this, function() {
                            this.setValue(html);
                            if (this.onLoadDeferred && !this.onLoadDeferred.isFulfilled()) { this.onLoadDeferred.resolve(true); }
                            this.onDisplayChanged();
                            if (this.focusOnLoad) { _22e(lang.hitch(this, "defer", "focus", this.updateInterval)); }
                            this.value = this.getValue(true);
                        });
                        if (this.setValueDeferred) { this.setValueDeferred.then(_25c); } else { _25c(); }
                    },
                    onKeyDown: function(e) {
                        if (e.keyCode === keys.SHIFT || e.keyCode === keys.ALT || e.keyCode === keys.META || e.keyCode === keys.CTRL) { return true; }
                        if (e.keyCode === keys.TAB && this.isTabIndent) {
                            e.stopPropagation();
                            e.preventDefault();
                            if (this.queryCommandEnabled((e.shiftKey ? "outdent" : "indent"))) { this.execCommand((e.shiftKey ? "outdent" : "indent")); }
                        }
                        if (e.keyCode == keys.TAB && !this.isTabIndent && !e.ctrlKey && !e.altKey) { if (e.shiftKey) { this.beforeIframeNode.focus(); } else { this.afterIframeNode.focus(); } return true; }
                        if (has("ie") < 9 && e.keyCode === keys.BACKSPACE && this.document.selection.type === "Control") {
                            e.stopPropagation();
                            e.preventDefault();
                            this.execCommand("delete");
                        }
                        if (has("ff")) { if (e.keyCode === keys.PAGE_UP || e.keyCode === keys.PAGE_DOWN) { if (this.editNode.clientHeight >= this.editNode.scrollHeight) { e.preventDefault(); } } }
                        var _25d = this._keyHandlers[e.keyCode],
                            args = arguments;
                        if (_25d && !e.altKey) { _223.some(_25d, function(h) { if (!(h.shift ^ e.shiftKey) && !(h.ctrl ^ (e.ctrlKey || e.metaKey))) { if (!h.handler.apply(this, args)) { e.preventDefault(); } return true; } }, this); }
                        this.defer("onKeyPressed", 1);
                        return true;
                    },
                    onKeyUp: function() {},
                    setDisabled: function(_25e) {
                        _22c.deprecated("dijit.Editor::setDisabled is deprecated", "use dijit.Editor::attr(\"disabled\",boolean) instead", 2);
                        this.set("disabled", _25e);
                    },
                    _setValueAttr: function(_25f) { this.setValue(_25f); },
                    _setDisableSpellCheckAttr: function(_260) {
                        if (this.document) { _227.set(this.document.body, "spellcheck", !_260); } else { this.onLoadDeferred.then(lang.hitch(this, function() { _227.set(this.document.body, "spellcheck", !_260); })); }
                        this._set("disableSpellCheck", _260);
                    },
                    addKeyHandler: function(key, ctrl, _261, _262) {
                        if (typeof key == "string") { key = key.toUpperCase().charCodeAt(0); }
                        if (!lang.isArray(this._keyHandlers[key])) { this._keyHandlers[key] = []; }
                        this._keyHandlers[key].push({ shift: _261 || false, ctrl: ctrl || false, handler: _262 });
                    },
                    onKeyPressed: function() { this.onDisplayChanged(); },
                    onClick: function(e) { this.onDisplayChanged(e); },
                    _onIEMouseDown: function() { if (!this.focused && !this.disabled) { this.focus(); } },
                    _onBlur: function(e) {
                        if (has("ie") || has("trident")) { this.defer(function() { if (!_239.curNode) { this.ownerDocumentBody.focus(); } }); }
                        this.inherited(arguments);
                        var _263 = this.getValue(true);
                        if (_263 !== this.value) { this.onChange(_263); }
                        this._set("value", _263);
                    },
                    _onFocus: function(e) {
                        if (!this.disabled) {
                            if (!this._disabledOK) { this.set("disabled", false); }
                            this.inherited(arguments);
                        }
                    },
                    blur: function() { if (!has("ie") && this.window.document.documentElement && this.window.document.documentElement.focus) { this.window.document.documentElement.focus(); } else { if (this.ownerDocumentBody.focus) { this.ownerDocumentBody.focus(); } } },
                    focus: function() { if (!this.isLoaded) { this.focusOnLoad = true; return; } if (has("ie") < 9) { this.iframe.fireEvent("onfocus", document.createEventObject()); } else { this.editNode.focus(); } },
                    updateInterval: 200,
                    _updateTimer: null,
                    onDisplayChanged: function() {
                        if (this._updateTimer) { this._updateTimer.remove(); }
                        this._updateTimer = this.defer("onNormalizedDisplayChanged", this.updateInterval);
                    },
                    onNormalizedDisplayChanged: function() { delete this._updateTimer; },
                    onChange: function() {},
                    _normalizeCommand: function(cmd, _264) { var _265 = cmd.toLowerCase(); if (_265 === "formatblock") { if (has("safari") && _264 === undefined) { _265 = "heading"; } } else { if (_265 === "hilitecolor" && !has("mozilla")) { _265 = "backcolor"; } } return _265; },
                    _implCommand: function(cmd) { return "_" + this._normalizeCommand(cmd) + "EnabledImpl"; },
                    _qcaCache: {},
                    queryCommandAvailable: function(_266) { var ca = this._qcaCache[_266]; if (ca !== undefined) { return ca; } return (this._qcaCache[_266] = this._queryCommandAvailable(_266)); },
                    _queryCommandAvailable: function(_267) {
                        switch (_267.toLowerCase()) {
                            case "bold":
                            case "italic":
                            case "underline":
                            case "subscript":
                            case "superscript":
                            case "fontname":
                            case "fontsize":
                            case "forecolor":
                            case "hilitecolor":
                            case "justifycenter":
                            case "justifyfull":
                            case "justifyleft":
                            case "justifyright":
                            case "delete":
                            case "selectall":
                            case "toggledir":
                            case "createlink":
                            case "unlink":
                            case "removeformat":
                            case "inserthorizontalrule":
                            case "insertimage":
                            case "insertorderedlist":
                            case "insertunorderedlist":
                            case "indent":
                            case "outdent":
                            case "formatblock":
                            case "inserthtml":
                            case "undo":
                            case "redo":
                            case "strikethrough":
                            case "tabindent":
                            case "cut":
                            case "copy":
                            case "paste":
                                return true;
                            case "blockdirltr":
                            case "blockdirrtl":
                            case "dirltr":
                            case "dirrtl":
                            case "inlinedirltr":
                            case "inlinedirrtl":
                                return has("ie") || has("trident") || has("edge");
                            case "inserttable":
                            case "insertcell":
                            case "insertcol":
                            case "insertrow":
                            case "deletecells":
                            case "deletecols":
                            case "deleterows":
                            case "mergecells":
                            case "splitcell":
                                return !has("webkit");
                            default:
                                return false;
                        }
                    },
                    execCommand: function(_268, _269) {
                        var _26a;
                        if (this.focused) { this.focus(); }
                        _268 = this._normalizeCommand(_268, _269);
                        if (_269 !== undefined) { if (_268 === "heading") { throw new Error("unimplemented"); } else { if (_268 === "formatblock" && (has("ie") || has("trident"))) { _269 = "<" + _269 + ">"; } } }
                        var _26b = "_" + _268 + "Impl";
                        if (this[_26b]) { _26a = this[_26b](_269); } else { _269 = arguments.length > 1 ? _269 : null; if (_269 || _268 !== "createlink") { _26a = this.document.execCommand(_268, false, _269); } }
                        this.onDisplayChanged();
                        return _26a;
                    },
                    queryCommandEnabled: function(_26c) {
                        if (this.disabled || !this._disabledOK) { return false; }
                        _26c = this._normalizeCommand(_26c);
                        var _26d = this._implCommand(_26c);
                        if (this[_26d]) { return this[_26d](_26c); } else { return this._browserQueryCommandEnabled(_26c); }
                    },
                    queryCommandState: function(_26e) {
                        if (this.disabled || !this._disabledOK) { return false; }
                        _26e = this._normalizeCommand(_26e);
                        try { return this.document.queryCommandState(_26e); } catch (e) { return false; }
                    },
                    queryCommandValue: function(_26f) {
                        if (this.disabled || !this._disabledOK) { return false; }
                        var r;
                        _26f = this._normalizeCommand(_26f);
                        if (has("ie") && _26f === "formatblock") { r = this._native2LocalFormatNames[this.document.queryCommandValue(_26f)]; } else {
                            if (has("mozilla") && _26f === "hilitecolor") {
                                var _270;
                                try { _270 = this.document.queryCommandValue("styleWithCSS"); } catch (e) { _270 = false; }
                                this.document.execCommand("styleWithCSS", false, true);
                                r = this.document.queryCommandValue(_26f);
                                this.document.execCommand("styleWithCSS", false, _270);
                            } else { r = this.document.queryCommandValue(_26f); }
                        }
                        return r;
                    },
                    _sCall: function(name, args) { return this.selection[name].apply(this.selection, args); },
                    placeCursorAtStart: function() {
                        this.focus();
                        var _271 = false;
                        if (has("mozilla")) {
                            var _272 = this.editNode.firstChild;
                            while (_272) {
                                if (_272.nodeType === 3) {
                                    if (_272.nodeValue.replace(/^\s+|\s+$/g, "").length > 0) {
                                        _271 = true;
                                        this.selection.selectElement(_272);
                                        break;
                                    }
                                } else { if (_272.nodeType === 1) { _271 = true; var tg = _272.tagName ? _272.tagName.toLowerCase() : ""; if (/br|input|img|base|meta|area|basefont|hr|link/.test(tg)) { this.selection.selectElement(_272); } else { this.selection.selectElementChildren(_272); } break; } }
                                _272 = _272.nextSibling;
                            }
                        } else {
                            _271 = true;
                            this.selection.selectElementChildren(this.editNode);
                        }
                        if (_271) { this.selection.collapse(true); }
                    },
                    placeCursorAtEnd: function() {
                        this.focus();
                        var _273 = false;
                        if (has("mozilla")) {
                            var last = this.editNode.lastChild;
                            while (last) {
                                if (last.nodeType === 3) {
                                    if (last.nodeValue.replace(/^\s+|\s+$/g, "").length > 0) {
                                        _273 = true;
                                        this.selection.selectElement(last);
                                        break;
                                    }
                                } else {
                                    if (last.nodeType === 1) {
                                        _273 = true;
                                        this.selection.selectElement(last.lastChild || last);
                                        break;
                                    }
                                }
                                last = last.previousSibling;
                            }
                        } else {
                            _273 = true;
                            this.selection.selectElementChildren(this.editNode);
                        }
                        if (_273) { this.selection.collapse(false); }
                    },
                    getValue: function(_274) { if (this.textarea) { if (this.isClosed || !this.isLoaded) { return this.textarea.value; } } return this.isLoaded ? this._postFilterContent(null, _274) : this.value; },
                    _getValueAttr: function() { return this.getValue(true); },
                    setValue: function(html) {
                        if (!this.isLoaded) { this.onLoadDeferred.then(lang.hitch(this, function() { this.setValue(html); })); return; }
                        if (this.textarea && (this.isClosed || !this.isLoaded)) { this.textarea.value = html; } else {
                            html = this._preFilterContent(html);
                            var node = this.isClosed ? this.domNode : this.editNode;
                            node.innerHTML = html;
                            this._preDomFilterContent(node);
                        }
                        this.onDisplayChanged();
                        this._set("value", this.getValue(true));
                    },
                    replaceValue: function(html) {
                        if (this.isClosed) { this.setValue(html); } else {
                            if (this.window && this.window.getSelection && !has("mozilla")) { this.setValue(html); } else {
                                if (this.window && this.window.getSelection) {
                                    html = this._preFilterContent(html);
                                    this.execCommand("selectall");
                                    this.execCommand("inserthtml", html);
                                    this._preDomFilterContent(this.editNode);
                                } else { if (this.document && this.document.selection) { this.setValue(html); } }
                            }
                        }
                        this._set("value", this.getValue(true));
                    },
                    _preFilterContent: function(html) {
                        var ec = html;
                        _223.forEach(this.contentPreFilters, function(ef) { if (ef) { ec = ef(ec); } });
                        return ec;
                    },
                    _preDomFilterContent: function(dom) {
                        dom = dom || this.editNode;
                        _223.forEach(this.contentDomPreFilters, function(ef) { if (ef && lang.isFunction(ef)) { ef(dom); } }, this);
                    },
                    _postFilterContent: function(dom, _275) {
                        var ec;
                        if (!lang.isString(dom)) {
                            dom = dom || this.editNode;
                            if (this.contentDomPostFilters.length) {
                                if (_275) { dom = lang.clone(dom); }
                                _223.forEach(this.contentDomPostFilters, function(ef) { dom = ef(dom); });
                            }
                            ec = _238.getChildrenHtml(dom);
                        } else { ec = dom; }
                        if (!lang.trim(ec.replace(/^\xA0\xA0*/, "").replace(/\xA0\xA0*$/, "")).length) { ec = ""; }
                        _223.forEach(this.contentPostFilters, function(ef) { ec = ef(ec); });
                        return ec;
                    },
                    _saveContent: function() {
                        var _276 = dom.byId(_23a._scopeName + "._editor.RichText.value");
                        if (_276) {
                            if (_276.value) { _276.value += this._SEPARATOR; }
                            _276.value += this.name + this._NAME_CONTENT_SEP + this.getValue(true);
                        }
                    },
                    escapeXml: function(str, _277) { str = str.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;"); if (!_277) { str = str.replace(/'/gm, "&#39;"); } return str; },
                    getNodeHtml: function(node) { _22c.deprecated("dijit.Editor::getNodeHtml is deprecated", "use dijit/_editor/html::getNodeHtml instead", 2); return _238.getNodeHtml(node); },
                    getNodeChildrenHtml: function(dom) { _22c.deprecated("dijit.Editor::getNodeChildrenHtml is deprecated", "use dijit/_editor/html::getChildrenHtml instead", 2); return _238.getChildrenHtml(dom); },
                    close: function(save) {
                        if (this.isClosed) { return; }
                        if (!arguments.length) { save = true; }
                        if (save) { this._set("value", this.getValue(true)); }
                        if (this.interval) { clearInterval(this.interval); }
                        if (this._webkitListener) {
                            this._webkitListener.remove();
                            delete this._webkitListener;
                        }
                        if (has("ie")) { this.iframe.onfocus = null; }
                        this.iframe._loadFunc = null;
                        if (this._iframeRegHandle) {
                            this._iframeRegHandle.remove();
                            delete this._iframeRegHandle;
                        }
                        if (this.textarea) {
                            var s = this.textarea.style;
                            s.position = "";
                            s.left = s.top = "";
                            if (has("ie")) {
                                s.overflow = this.__overflow;
                                this.__overflow = null;
                            }
                            this.textarea.value = this.value;
                            _229.destroy(this.domNode);
                            this.domNode = this.textarea;
                        } else { this.domNode.innerHTML = this.value; }
                        delete this.iframe;
                        _228.remove(this.domNode, this.baseClass);
                        this.isClosed = true;
                        this.isLoaded = false;
                        delete this.editNode;
                        delete this.focusNode;
                        if (this.window && this.window._frameElement) { this.window._frameElement = null; }
                        this.window = null;
                        this.document = null;
                        this.editingArea = null;
                        this.editorObject = null;
                    },
                    destroy: function() {
                        if (!this.isClosed) { this.close(false); }
                        if (this._updateTimer) { this._updateTimer.remove(); }
                        this.inherited(arguments);
                        if (_23b._globalSaveHandler) { delete _23b._globalSaveHandler[this.id]; }
                    },
                    _removeMozBogus: function(html) { return html.replace(/\stype="_moz"/gi, "").replace(/\s_moz_dirty=""/gi, "").replace(/_moz_resizing="(true|false)"/gi, ""); },
                    _removeWebkitBogus: function(html) {
                        html = html.replace(/\sclass="webkit-block-placeholder"/gi, "");
                        html = html.replace(/\sclass="apple-style-span"/gi, "");
                        html = html.replace(/<meta charset=\"utf-8\" \/>/gi, "");
                        return html;
                    },
                    _normalizeFontStyle: function(html) { return html.replace(/<(\/)?strong([ \>])/gi, "<$1b$2").replace(/<(\/)?em([ \>])/gi, "<$1i$2"); },
                    _preFixUrlAttributes: function(html) { return html.replace(/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi, "$1$4$2$3$5$2 _djrealurl=$2$3$5$2").replace(/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi, "$1$4$2$3$5$2 _djrealurl=$2$3$5$2"); },
                    _browserQueryCommandEnabled: function(_278) { if (!_278) { return false; } var elem = has("ie") < 9 ? this.document.selection.createRange() : this.document; try { return elem.queryCommandEnabled(_278); } catch (e) { return false; } },
                    _createlinkEnabledImpl: function() { var _279 = true; if (has("opera")) { var sel = this.window.getSelection(); if (sel.isCollapsed) { _279 = true; } else { _279 = this.document.queryCommandEnabled("createlink"); } } else { _279 = this._browserQueryCommandEnabled("createlink"); } return _279; },
                    _unlinkEnabledImpl: function() { var _27a = true; if (has("mozilla") || has("webkit")) { _27a = this.selection.hasAncestorElement("a"); } else { _27a = this._browserQueryCommandEnabled("unlink"); } return _27a; },
                    _inserttableEnabledImpl: function() { var _27b = true; if (has("mozilla") || has("webkit")) { _27b = true; } else { _27b = this._browserQueryCommandEnabled("inserttable"); } return _27b; },
                    _cutEnabledImpl: function() {
                        var _27c = true;
                        if (has("webkit")) {
                            var sel = this.window.getSelection();
                            if (sel) { sel = sel.toString(); }
                            _27c = !!sel;
                        } else { _27c = this._browserQueryCommandEnabled("cut"); }
                        return _27c;
                    },
                    _copyEnabledImpl: function() {
                        var _27d = true;
                        if (has("webkit")) {
                            var sel = this.window.getSelection();
                            if (sel) { sel = sel.toString(); }
                            _27d = !!sel;
                        } else { _27d = this._browserQueryCommandEnabled("copy"); }
                        return _27d;
                    },
                    _pasteEnabledImpl: function() { var _27e = true; if (has("webkit")) { return true; } else { _27e = this._browserQueryCommandEnabled("paste"); } return _27e; },
                    _inserthorizontalruleImpl: function(_27f) { if (has("ie")) { return this._inserthtmlImpl("<hr>"); } return this.document.execCommand("inserthorizontalrule", false, _27f); },
                    _unlinkImpl: function(_280) {
                        if ((this.queryCommandEnabled("unlink")) && (has("mozilla") || has("webkit"))) {
                            var a = this.selection.getAncestorElement("a");
                            this.selection.selectElement(a);
                            return this.document.execCommand("unlink", false, null);
                        }
                        return this.document.execCommand("unlink", false, _280);
                    },
                    _hilitecolorImpl: function(_281) {
                        var _282;
                        var _283 = this._handleTextColorOrProperties("hilitecolor", _281);
                        if (!_283) {
                            if (has("mozilla")) {
                                this.document.execCommand("styleWithCSS", false, true);
                                _282 = this.document.execCommand("hilitecolor", false, _281);
                                this.document.execCommand("styleWithCSS", false, false);
                            } else { _282 = this.document.execCommand("hilitecolor", false, _281); }
                        }
                        return _282;
                    },
                    _backcolorImpl: function(_284) { if (has("ie")) { _284 = _284 ? _284 : null; } var _285 = this._handleTextColorOrProperties("backcolor", _284); if (!_285) { _285 = this.document.execCommand("backcolor", false, _284); } return _285; },
                    _forecolorImpl: function(_286) {
                        if (has("ie")) { _286 = _286 ? _286 : null; }
                        var _287 = false;
                        _287 = this._handleTextColorOrProperties("forecolor", _286);
                        if (!_287) { _287 = this.document.execCommand("forecolor", false, _286); }
                        return _287;
                    },
                    _inserthtmlImpl: function(_288) {
                        _288 = this._preFilterContent(_288);
                        var rv = true;
                        if (has("ie") < 9) {
                            var _289 = this.document.selection.createRange();
                            if (this.document.selection.type.toUpperCase() === "CONTROL") {
                                var n = _289.item(0);
                                while (_289.length) { _289.remove(_289.item(0)); }
                                n.outerHTML = _288;
                            } else { _289.pasteHTML(_288); }
                            _289.select();
                        } else {
                            if (has("trident") < 8) {
                                var _289;
                                var _28a = _237.getSelection(this.window);
                                if (_28a && _28a.rangeCount && _28a.getRangeAt) {
                                    _289 = _28a.getRangeAt(0);
                                    _289.deleteContents();
                                    var div = _229.create("div");
                                    div.innerHTML = _288;
                                    var node, _28b;
                                    var n = this.document.createDocumentFragment();
                                    while ((node = div.firstChild)) { _28b = n.appendChild(node); }
                                    _289.insertNode(n);
                                    if (_28b) {
                                        _289 = _289.cloneRange();
                                        _289.setStartAfter(_28b);
                                        _289.collapse(false);
                                        _28a.removeAllRanges();
                                        _28a.addRange(_289);
                                    }
                                }
                            } else { if (has("mozilla") && !_288.length) { this.selection.remove(); } else { rv = this.document.execCommand("inserthtml", false, _288); } }
                        }
                        return rv;
                    },
                    _boldImpl: function(_28c) {
                        var _28d = false;
                        if (has("ie") || has("trident")) {
                            this._adaptIESelection();
                            _28d = this._adaptIEFormatAreaAndExec("bold");
                        }
                        if (!_28d) { _28d = this.document.execCommand("bold", false, _28c); }
                        return _28d;
                    },
                    _italicImpl: function(_28e) {
                        var _28f = false;
                        if (has("ie") || has("trident")) {
                            this._adaptIESelection();
                            _28f = this._adaptIEFormatAreaAndExec("italic");
                        }
                        if (!_28f) { _28f = this.document.execCommand("italic", false, _28e); }
                        return _28f;
                    },
                    _underlineImpl: function(_290) {
                        var _291 = false;
                        if (has("ie") || has("trident")) {
                            this._adaptIESelection();
                            _291 = this._adaptIEFormatAreaAndExec("underline");
                        }
                        if (!_291) { _291 = this.document.execCommand("underline", false, _290); }
                        return _291;
                    },
                    _strikethroughImpl: function(_292) {
                        var _293 = false;
                        if (has("ie") || has("trident")) {
                            this._adaptIESelection();
                            _293 = this._adaptIEFormatAreaAndExec("strikethrough");
                        }
                        if (!_293) { _293 = this.document.execCommand("strikethrough", false, _292); }
                        return _293;
                    },
                    _superscriptImpl: function(_294) {
                        var _295 = false;
                        if (has("ie") || has("trident")) {
                            this._adaptIESelection();
                            _295 = this._adaptIEFormatAreaAndExec("superscript");
                        }
                        if (!_295) { _295 = this.document.execCommand("superscript", false, _294); }
                        return _295;
                    },
                    _subscriptImpl: function(_296) {
                        var _297 = false;
                        if (has("ie") || has("trident")) {
                            this._adaptIESelection();
                            _297 = this._adaptIEFormatAreaAndExec("subscript");
                        }
                        if (!_297) { _297 = this.document.execCommand("subscript", false, _296); }
                        return _297;
                    },
                    _fontnameImpl: function(_298) { var _299; if (has("ie") || has("trident")) { _299 = this._handleTextColorOrProperties("fontname", _298); } if (!_299) { _299 = this.document.execCommand("fontname", false, _298); } return _299; },
                    _fontsizeImpl: function(_29a) { var _29b; if (has("ie") || has("trident")) { _29b = this._handleTextColorOrProperties("fontsize", _29a); } if (!_29b) { _29b = this.document.execCommand("fontsize", false, _29a); } return _29b; },
                    _insertorderedlistImpl: function(_29c) { var _29d = false; if (has("ie") || has("trident") || has("edge")) { _29d = this._adaptIEList("insertorderedlist", _29c); } if (!_29d) { _29d = this.document.execCommand("insertorderedlist", false, _29c); } return _29d; },
                    _insertunorderedlistImpl: function(_29e) { var _29f = false; if (has("ie") || has("trident") || has("edge")) { _29f = this._adaptIEList("insertunorderedlist", _29e); } if (!_29f) { _29f = this.document.execCommand("insertunorderedlist", false, _29e); } return _29f; },
                    getHeaderHeight: function() { return this._getNodeChildrenHeight(this.header); },
                    getFooterHeight: function() { return this._getNodeChildrenHeight(this.footer); },
                    _getNodeChildrenHeight: function(node) {
                        var h = 0;
                        if (node && node.childNodes) {
                            var i;
                            for (i = 0; i < node.childNodes.length; i++) {
                                var size = _22a.position(node.childNodes[i]);
                                h += size.h;
                            }
                        }
                        return h;
                    },
                    _isNodeEmpty: function(node, _2a0) { if (node.nodeType === 1) { if (node.childNodes.length > 0) { return this._isNodeEmpty(node.childNodes[0], _2a0); } return true; } else { if (node.nodeType === 3) { return (node.nodeValue.substring(_2a0) === ""); } } return false; },
                    _removeStartingRangeFromRange: function(node, _2a1) { if (node.nextSibling) { _2a1.setStart(node.nextSibling, 0); } else { var _2a2 = node.parentNode; while (_2a2 && _2a2.nextSibling == null) { _2a2 = _2a2.parentNode; } if (_2a2) { _2a1.setStart(_2a2.nextSibling, 0); } } return _2a1; },
                    _adaptIESelection: function() {
                        var _2a3 = _237.getSelection(this.window);
                        if (_2a3 && _2a3.rangeCount && !_2a3.isCollapsed) {
                            var _2a4 = _2a3.getRangeAt(0);
                            var _2a5 = _2a4.startContainer;
                            var _2a6 = _2a4.startOffset;
                            while (_2a5.nodeType === 3 && _2a6 >= _2a5.length && _2a5.nextSibling) {
                                _2a6 = _2a6 - _2a5.length;
                                _2a5 = _2a5.nextSibling;
                            }
                            var _2a7 = null;
                            while (this._isNodeEmpty(_2a5, _2a6) && _2a5 !== _2a7) {
                                _2a7 = _2a5;
                                _2a4 = this._removeStartingRangeFromRange(_2a5, _2a4);
                                _2a5 = _2a4.startContainer;
                                _2a6 = 0;
                            }
                            _2a3.removeAllRanges();
                            _2a3.addRange(_2a4);
                        }
                    },
                    _adaptIEFormatAreaAndExec: function(_2a8) {
                        var _2a9 = _237.getSelection(this.window);
                        var doc = this.document;
                        var rs, ret, _2aa, txt, _2ab, _2ac, _2ad, _2ae;
                        if (_2a8 && _2a9 && _2a9.isCollapsed) {
                            var _2af = this.queryCommandValue(_2a8);
                            if (_2af) {
                                var _2b0 = this._tagNamesForCommand(_2a8);
                                _2aa = _2a9.getRangeAt(0);
                                var fs = _2aa.startContainer;
                                if (fs.nodeType === 3) {
                                    var _2b1 = _2aa.endOffset;
                                    if (fs.length < _2b1) {
                                        ret = this._adjustNodeAndOffset(rs, _2b1);
                                        fs = ret.node;
                                        _2b1 = ret.offset;
                                    }
                                }
                                var _2b2;
                                while (fs && fs !== this.editNode) {
                                    var _2b3 = fs.tagName ? fs.tagName.toLowerCase() : "";
                                    if (_223.indexOf(_2b0, _2b3) > -1) { _2b2 = fs; break; }
                                    fs = fs.parentNode;
                                }
                                if (_2b2) {
                                    rs = _2aa.startContainer;
                                    var _2b4 = doc.createElement(_2b2.tagName);
                                    _229.place(_2b4, _2b2, "after");
                                    if (rs && rs.nodeType === 3) {
                                        var _2b5, _2b6;
                                        var _2b7 = _2aa.endOffset;
                                        if (rs.length < _2b7) {
                                            ret = this._adjustNodeAndOffset(rs, _2b7);
                                            rs = ret.node;
                                            _2b7 = ret.offset;
                                        }
                                        txt = rs.nodeValue;
                                        _2ab = doc.createTextNode(txt.substring(0, _2b7));
                                        var _2b8 = txt.substring(_2b7, txt.length);
                                        if (_2b8) { _2ac = doc.createTextNode(_2b8); }
                                        _229.place(_2ab, rs, "before");
                                        if (_2ac) {
                                            _2ad = doc.createElement("span");
                                            _2ad.className = "ieFormatBreakerSpan";
                                            _229.place(_2ad, rs, "after");
                                            _229.place(_2ac, _2ad, "after");
                                            _2ac = _2ad;
                                        }
                                        _229.destroy(rs);
                                        var _2b9 = _2ab.parentNode;
                                        var _2ba = [];
                                        var _2bb;
                                        while (_2b9 !== _2b2) {
                                            var tg = _2b9.tagName;
                                            _2bb = { tagName: tg };
                                            _2ba.push(_2bb);
                                            var _2bc = doc.createElement(tg);
                                            if (_2b9.style) {
                                                if (_2bc.style) {
                                                    if (_2b9.style.cssText) {
                                                        _2bc.style.cssText = _2b9.style.cssText;
                                                        _2bb.cssText = _2b9.style.cssText;
                                                    }
                                                }
                                            }
                                            if (_2b9.tagName === "FONT") {
                                                if (_2b9.color) {
                                                    _2bc.color = _2b9.color;
                                                    _2bb.color = _2b9.color;
                                                }
                                                if (_2b9.face) {
                                                    _2bc.face = _2b9.face;
                                                    _2bb.face = _2b9.face;
                                                }
                                                if (_2b9.size) {
                                                    _2bc.size = _2b9.size;
                                                    _2bb.size = _2b9.size;
                                                }
                                            }
                                            if (_2b9.className) {
                                                _2bc.className = _2b9.className;
                                                _2bb.className = _2b9.className;
                                            }
                                            if (_2ac) {
                                                _2b5 = _2ac;
                                                while (_2b5) {
                                                    _2b6 = _2b5.nextSibling;
                                                    _2bc.appendChild(_2b5);
                                                    _2b5 = _2b6;
                                                }
                                            }
                                            if (_2bc.tagName == _2b9.tagName) {
                                                _2ad = doc.createElement("span");
                                                _2ad.className = "ieFormatBreakerSpan";
                                                _229.place(_2ad, _2b9, "after");
                                                _229.place(_2bc, _2ad, "after");
                                            } else { _229.place(_2bc, _2b9, "after"); }
                                            _2ab = _2b9;
                                            _2ac = _2bc;
                                            _2b9 = _2b9.parentNode;
                                        }
                                        if (_2ac) {
                                            _2b5 = _2ac;
                                            if (_2b5.nodeType === 1 || (_2b5.nodeType === 3 && _2b5.nodeValue)) { _2b4.innerHTML = ""; }
                                            while (_2b5) {
                                                _2b6 = _2b5.nextSibling;
                                                _2b4.appendChild(_2b5);
                                                _2b5 = _2b6;
                                            }
                                        }
                                        var _2bd;
                                        if (_2ba.length) {
                                            _2bb = _2ba.pop();
                                            var _2be = doc.createElement(_2bb.tagName);
                                            if (_2bb.cssText && _2be.style) { _2be.style.cssText = _2bb.cssText; }
                                            if (_2bb.className) { _2be.className = _2bb.className; }
                                            if (_2bb.tagName === "FONT") { if (_2bb.color) { _2be.color = _2bb.color; } if (_2bb.face) { _2be.face = _2bb.face; } if (_2bb.size) { _2be.size = _2bb.size; } }
                                            _229.place(_2be, _2b4, "before");
                                            while (_2ba.length) {
                                                _2bb = _2ba.pop();
                                                var _2bf = doc.createElement(_2bb.tagName);
                                                if (_2bb.cssText && _2bf.style) { _2bf.style.cssText = _2bb.cssText; }
                                                if (_2bb.className) { _2bf.className = _2bb.className; }
                                                if (_2bb.tagName === "FONT") { if (_2bb.color) { _2bf.color = _2bb.color; } if (_2bb.face) { _2bf.face = _2bb.face; } if (_2bb.size) { _2bf.size = _2bb.size; } }
                                                _2be.appendChild(_2bf);
                                                _2be = _2bf;
                                            }
                                            _2ae = doc.createTextNode(".");
                                            _2ad.appendChild(_2ae);
                                            _2be.appendChild(_2ae);
                                            _2bd = _237.create(this.window);
                                            _2bd.setStart(_2ae, 0);
                                            _2bd.setEnd(_2ae, _2ae.length);
                                            _2a9.removeAllRanges();
                                            _2a9.addRange(_2bd);
                                            this.selection.collapse(false);
                                            _2ae.parentNode.innerHTML = "";
                                        } else {
                                            _2ad = doc.createElement("span");
                                            _2ad.className = "ieFormatBreakerSpan";
                                            _2ae = doc.createTextNode(".");
                                            _2ad.appendChild(_2ae);
                                            _229.place(_2ad, _2b4, "before");
                                            _2bd = _237.create(this.window);
                                            _2bd.setStart(_2ae, 0);
                                            _2bd.setEnd(_2ae, _2ae.length);
                                            _2a9.removeAllRanges();
                                            _2a9.addRange(_2bd);
                                            this.selection.collapse(false);
                                            _2ae.parentNode.innerHTML = "";
                                        }
                                        if (!_2b4.firstChild) { _229.destroy(_2b4); }
                                        return true;
                                    }
                                }
                                return false;
                            } else {
                                _2aa = _2a9.getRangeAt(0);
                                rs = _2aa.startContainer;
                                if (rs && rs.nodeType === 3) {
                                    var _2b1 = _2aa.startOffset;
                                    if (rs.length < _2b1) {
                                        ret = this._adjustNodeAndOffset(rs, _2b1);
                                        rs = ret.node;
                                        _2b1 = ret.offset;
                                    }
                                    txt = rs.nodeValue;
                                    _2ab = doc.createTextNode(txt.substring(0, _2b1));
                                    var _2b8 = txt.substring(_2b1);
                                    if (_2b8 !== "") { _2ac = doc.createTextNode(txt.substring(_2b1)); }
                                    _2ad = doc.createElement("span");
                                    _2ae = doc.createTextNode(".");
                                    _2ad.appendChild(_2ae);
                                    if (_2ab.length) { _229.place(_2ab, rs, "after"); } else { _2ab = rs; }
                                    _229.place(_2ad, _2ab, "after");
                                    if (_2ac) { _229.place(_2ac, _2ad, "after"); }
                                    _229.destroy(rs);
                                    var _2bd = _237.create(this.window);
                                    _2bd.setStart(_2ae, 0);
                                    _2bd.setEnd(_2ae, _2ae.length);
                                    _2a9.removeAllRanges();
                                    _2a9.addRange(_2bd);
                                    doc.execCommand(_2a8);
                                    _229.place(_2ad.firstChild, _2ad, "before");
                                    _229.destroy(_2ad);
                                    _2bd.setStart(_2ae, 0);
                                    _2bd.setEnd(_2ae, _2ae.length);
                                    _2a9.removeAllRanges();
                                    _2a9.addRange(_2bd);
                                    this.selection.collapse(false);
                                    _2ae.parentNode.innerHTML = "";
                                    return true;
                                }
                            }
                        } else { return false; }
                    },
                    _adaptIEList: function(_2c0) {
                        var _2c1 = _237.getSelection(this.window);
                        if (_2c1.isCollapsed) {
                            if (_2c1.rangeCount && !this.queryCommandValue(_2c0)) {
                                var _2c2 = _2c1.getRangeAt(0);
                                var sc = _2c2.startContainer;
                                if (sc && sc.nodeType == 3) {
                                    if (!_2c2.startOffset) {
                                        var _2c3 = "ul";
                                        if (_2c0 === "insertorderedlist") { _2c3 = "ol"; }
                                        var list = this.document.createElement(_2c3);
                                        var li = _229.create("li", null, list);
                                        _229.place(list, sc, "before");
                                        li.appendChild(sc);
                                        _229.create("br", null, list, "after");
                                        var _2c4 = _237.create(this.window);
                                        _2c4.setStart(sc, 0);
                                        _2c4.setEnd(sc, sc.length);
                                        _2c1.removeAllRanges();
                                        _2c1.addRange(_2c4);
                                        this.selection.collapse(true);
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    },
                    _handleTextColorOrProperties: function(_2c5, _2c6) {
                        var _2c7 = _237.getSelection(this.window);
                        var doc = this.document;
                        var rs, ret, _2c8, txt, _2c9, _2ca, _2cb, _2cc;
                        _2c6 = _2c6 || null;
                        if (_2c5 && _2c7 && _2c7.isCollapsed) {
                            if (_2c7.rangeCount) {
                                _2c8 = _2c7.getRangeAt(0);
                                rs = _2c8.startContainer;
                                if (rs && rs.nodeType === 3) {
                                    var _2cd = _2c8.startOffset;
                                    if (rs.length < _2cd) {
                                        ret = this._adjustNodeAndOffset(rs, _2cd);
                                        rs = ret.node;
                                        _2cd = ret.offset;
                                    }
                                    txt = rs.nodeValue;
                                    _2c9 = doc.createTextNode(txt.substring(0, _2cd));
                                    var _2ce = txt.substring(_2cd);
                                    if (_2ce !== "") { _2ca = doc.createTextNode(txt.substring(_2cd)); }
                                    _2cb = doc.createElement("span");
                                    _2cc = doc.createTextNode(".");
                                    _2cb.appendChild(_2cc);
                                    var _2cf = doc.createElement("span");
                                    _2cb.appendChild(_2cf);
                                    if (_2c9.length) { _229.place(_2c9, rs, "after"); } else { _2c9 = rs; }
                                    _229.place(_2cb, _2c9, "after");
                                    if (_2ca) { _229.place(_2ca, _2cb, "after"); }
                                    _229.destroy(rs);
                                    var _2d0 = _237.create(this.window);
                                    _2d0.setStart(_2cc, 0);
                                    _2d0.setEnd(_2cc, _2cc.length);
                                    _2c7.removeAllRanges();
                                    _2c7.addRange(_2d0);
                                    if (has("webkit")) {
                                        var _2d1 = "color";
                                        if (_2c5 === "hilitecolor" || _2c5 === "backcolor") { _2d1 = "backgroundColor"; }
                                        _22b.set(_2cb, _2d1, _2c6);
                                        this.selection.remove();
                                        _229.destroy(_2cf);
                                        _2cb.innerHTML = "&#160;";
                                        this.selection.selectElement(_2cb);
                                        this.focus();
                                    } else {
                                        this.execCommand(_2c5, _2c6);
                                        _229.place(_2cb.firstChild, _2cb, "before");
                                        _229.destroy(_2cb);
                                        _2d0.setStart(_2cc, 0);
                                        _2d0.setEnd(_2cc, _2cc.length);
                                        _2c7.removeAllRanges();
                                        _2c7.addRange(_2d0);
                                        this.selection.collapse(false);
                                        _2cc.parentNode.removeChild(_2cc);
                                    }
                                    return true;
                                }
                            }
                        }
                        return false;
                    },
                    _adjustNodeAndOffset: function(node, _2d2) {
                        while (node.length < _2d2 && node.nextSibling && node.nextSibling.nodeType === 3) {
                            _2d2 = _2d2 - node.length;
                            node = node.nextSibling;
                        }
                        return { "node": node, "offset": _2d2 };
                    },
                    _tagNamesForCommand: function(_2d3) { if (_2d3 === "bold") { return ["b", "strong"]; } else { if (_2d3 === "italic") { return ["i", "em"]; } else { if (_2d3 === "strikethrough") { return ["s", "strike"]; } else { if (_2d3 === "superscript") { return ["sup"]; } else { if (_2d3 === "subscript") { return ["sub"]; } else { if (_2d3 === "underline") { return ["u"]; } } } } } } return []; },
                    _stripBreakerNodes: function(node) {
                        if (!this.isLoaded) { return; }
                        _22d(".ieFormatBreakerSpan", node).forEach(function(b) {
                            while (b.firstChild) { _229.place(b.firstChild, b, "before"); }
                            _229.destroy(b);
                        });
                        return node;
                    },
                    _stripTrailingEmptyNodes: function(node) {
                        function _2d4(node) { return (/^(p|div|br)$/i.test(node.nodeName) && node.children.length == 0 && /^[\s\xA0]*$/.test(node.textContent || node.innerText || "")) || (node.nodeType === 3 && /^[\s\xA0]*$/.test(node.nodeValue)); };
                        while (node.lastChild && _2d4(node.lastChild)) { _229.destroy(node.lastChild); }
                        return node;
                    },
                    _setTextDirAttr: function(_2d5) {
                        this._set("textDir", _2d5);
                        this.onLoadDeferred.then(lang.hitch(this, function() { this.editNode.dir = _2d5; }));
                    }
                });
                return _23b;
            });
        },
        "dijit/_editor/range": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/_base/lang"], function(_2d6, _2d7, lang) {
                var _2d8 = {
                    getIndex: function(node, _2d9) {
                        var ret = [],
                            retR = [];
                        var _2da = node;
                        var _2db, n;
                        while (node != _2d9) {
                            var i = 0;
                            _2db = node.parentNode;
                            while ((n = _2db.childNodes[i++])) { if (n === node) {--i; break; } }
                            ret.unshift(i);
                            retR.unshift(i - _2db.childNodes.length);
                            node = _2db;
                        }
                        if (ret.length > 0 && _2da.nodeType == 3) {
                            n = _2da.previousSibling;
                            while (n && n.nodeType == 3) {
                                ret[ret.length - 1]--;
                                n = n.previousSibling;
                            }
                            n = _2da.nextSibling;
                            while (n && n.nodeType == 3) {
                                retR[retR.length - 1]++;
                                n = n.nextSibling;
                            }
                        }
                        return { o: ret, r: retR };
                    },
                    getNode: function(_2dc, _2dd) {
                        if (!lang.isArray(_2dc) || _2dc.length == 0) { return _2dd; }
                        var node = _2dd;
                        _2d6.every(_2dc, function(i) { if (i >= 0 && i < node.childNodes.length) { node = node.childNodes[i]; } else { node = null; return false; } return true; });
                        return node;
                    },
                    getCommonAncestor: function(n1, n2, root) { root = root || n1.ownerDocument.body; var _2de = function(n) { var as = []; while (n) { as.unshift(n); if (n !== root) { n = n.parentNode; } else { break; } } return as; }; var n1as = _2de(n1); var n2as = _2de(n2); var m = Math.min(n1as.length, n2as.length); var com = n1as[0]; for (var i = 1; i < m; i++) { if (n1as[i] === n2as[i]) { com = n1as[i]; } else { break; } } return com; },
                    getAncestor: function(node, _2df, root) {
                        root = root || node.ownerDocument.body;
                        while (node && node !== root) {
                            var name = node.nodeName.toUpperCase();
                            if (_2df.test(name)) { return node; }
                            node = node.parentNode;
                        }
                        return null;
                    },
                    BlockTagNames: /^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/,
                    getBlockAncestor: function(node, _2e0, root) {
                        root = root || node.ownerDocument.body;
                        _2e0 = _2e0 || _2d8.BlockTagNames;
                        var _2e1 = null,
                            _2e2;
                        while (node && node !== root) {
                            var name = node.nodeName.toUpperCase();
                            if (!_2e1 && _2e0.test(name)) { _2e1 = node; }
                            if (!_2e2 && (/^(?:BODY|TD|TH|CAPTION)$/).test(name)) { _2e2 = node; }
                            node = node.parentNode;
                        }
                        return { blockNode: _2e1, blockContainer: _2e2 || node.ownerDocument.body };
                    },
                    atBeginningOfContainer: function(_2e3, node, _2e4) {
                        var _2e5 = false;
                        var _2e6 = (_2e4 == 0);
                        if (!_2e6 && node.nodeType == 3) { if (/^[\s\xA0]+$/.test(node.nodeValue.substr(0, _2e4))) { _2e6 = true; } }
                        if (_2e6) {
                            var _2e7 = node;
                            _2e5 = true;
                            while (_2e7 && _2e7 !== _2e3) {
                                if (_2e7.previousSibling) { _2e5 = false; break; }
                                _2e7 = _2e7.parentNode;
                            }
                        }
                        return _2e5;
                    },
                    atEndOfContainer: function(_2e8, node, _2e9) {
                        var _2ea = false;
                        var _2eb = (_2e9 == (node.length || node.childNodes.length));
                        if (!_2eb && node.nodeType == 3) { if (/^[\s\xA0]+$/.test(node.nodeValue.substr(_2e9))) { _2eb = true; } }
                        if (_2eb) {
                            var _2ec = node;
                            _2ea = true;
                            while (_2ec && _2ec !== _2e8) {
                                if (_2ec.nextSibling) { _2ea = false; break; }
                                _2ec = _2ec.parentNode;
                            }
                        }
                        return _2ea;
                    },
                    adjacentNoneTextNode: function(_2ed, next) {
                        var node = _2ed;
                        var len = (0 - _2ed.length) || 0;
                        var prop = next ? "nextSibling" : "previousSibling";
                        while (node) {
                            if (node.nodeType != 3) { break; }
                            len += node.length;
                            node = node[prop];
                        }
                        return [node, len];
                    },
                    create: function(win) { win = win || window; if (win.getSelection) { return win.document.createRange(); } else { return new _2ee(); } },
                    getSelection: function(_2ef, _2f0) { if (_2ef.getSelection) { return _2ef.getSelection(); } else { var s = new ie.selection(_2ef); if (!_2f0) { s._getCurrentSelection(); } return s; } }
                };
                if (!window.getSelection) {
                    var ie = _2d8.ie = {
                        cachedSelection: {},
                        selection: function(_2f1) {
                            this._ranges = [];
                            this.addRange = function(r, _2f2) {
                                this._ranges.push(r);
                                if (!_2f2) { r._select(); }
                                this.rangeCount = this._ranges.length;
                            };
                            this.removeAllRanges = function() {
                                this._ranges = [];
                                this.rangeCount = 0;
                            };
                            var _2f3 = function() { var r = _2f1.document.selection.createRange(); var type = _2f1.document.selection.type.toUpperCase(); if (type == "CONTROL") { return new _2ee(ie.decomposeControlRange(r)); } else { return new _2ee(ie.decomposeTextRange(r)); } };
                            this.getRangeAt = function(i) { return this._ranges[i]; };
                            this._getCurrentSelection = function() {
                                this.removeAllRanges();
                                var r = _2f3();
                                if (r) {
                                    this.addRange(r, true);
                                    this.isCollapsed = r.collapsed;
                                } else { this.isCollapsed = true; }
                            };
                        },
                        decomposeControlRange: function(_2f4) {
                            var _2f5 = _2f4.item(0),
                                _2f6 = _2f4.item(_2f4.length - 1);
                            var _2f7 = _2f5.parentNode,
                                _2f8 = _2f6.parentNode;
                            var _2f9 = _2d8.getIndex(_2f5, _2f7).o[0];
                            var _2fa = _2d8.getIndex(_2f6, _2f8).o[0] + 1;
                            return [_2f7, _2f9, _2f8, _2fa];
                        },
                        getEndPoint: function(_2fb, end) {
                            var _2fc = _2fb.duplicate();
                            _2fc.collapse(!end);
                            var _2fd = "EndTo" + (end ? "End" : "Start");
                            var _2fe = _2fc.parentElement();
                            var _2ff, _300, _301;
                            if (_2fe.childNodes.length > 0) {
                                _2d6.every(_2fe.childNodes, function(node, i) {
                                    var _302;
                                    if (node.nodeType != 3) {
                                        _2fc.moveToElementText(node);
                                        if (_2fc.compareEndPoints(_2fd, _2fb) > 0) {
                                            if (_301 && _301.nodeType == 3) {
                                                _2ff = _301;
                                                _302 = true;
                                            } else {
                                                _2ff = _2fe;
                                                _300 = i;
                                                return false;
                                            }
                                        } else {
                                            if (i == _2fe.childNodes.length - 1) {
                                                _2ff = _2fe;
                                                _300 = _2fe.childNodes.length;
                                                return false;
                                            }
                                        }
                                    } else {
                                        if (i == _2fe.childNodes.length - 1) {
                                            _2ff = node;
                                            _302 = true;
                                        }
                                    }
                                    if (_302 && _2ff) {
                                        var _303 = _2d8.adjacentNoneTextNode(_2ff)[0];
                                        if (_303) { _2ff = _303.nextSibling; } else { _2ff = _2fe.firstChild; }
                                        var _304 = _2d8.adjacentNoneTextNode(_2ff);
                                        _303 = _304[0];
                                        var _305 = _304[1];
                                        if (_303) {
                                            _2fc.moveToElementText(_303);
                                            _2fc.collapse(false);
                                        } else { _2fc.moveToElementText(_2fe); }
                                        _2fc.setEndPoint(_2fd, _2fb);
                                        _300 = _2fc.text.length - _305;
                                        return false;
                                    }
                                    _301 = node;
                                    return true;
                                });
                            } else {
                                _2ff = _2fe;
                                _300 = 0;
                            }
                            if (!end && _2ff.nodeType == 1 && _300 == _2ff.childNodes.length) {
                                var _306 = _2ff.nextSibling;
                                if (_306 && _306.nodeType == 3) {
                                    _2ff = _306;
                                    _300 = 0;
                                }
                            }
                            return [_2ff, _300];
                        },
                        setEndPoint: function(_307, _308, _309) {
                            var _30a = _307.duplicate(),
                                node, len;
                            if (_308.nodeType != 3) {
                                if (_309 > 0) {
                                    node = _308.childNodes[_309 - 1];
                                    if (node) {
                                        if (node.nodeType == 3) {
                                            _308 = node;
                                            _309 = node.length;
                                        } else {
                                            if (node.nextSibling && node.nextSibling.nodeType == 3) {
                                                _308 = node.nextSibling;
                                                _309 = 0;
                                            } else {
                                                _30a.moveToElementText(node.nextSibling ? node : _308);
                                                var _30b = node.parentNode;
                                                var _30c = _30b.insertBefore(node.ownerDocument.createTextNode(" "), node.nextSibling);
                                                _30a.collapse(false);
                                                _30b.removeChild(_30c);
                                            }
                                        }
                                    }
                                } else {
                                    _30a.moveToElementText(_308);
                                    _30a.collapse(true);
                                }
                            }
                            if (_308.nodeType == 3) {
                                var _30d = _2d8.adjacentNoneTextNode(_308);
                                var _30e = _30d[0];
                                len = _30d[1];
                                if (_30e) {
                                    _30a.moveToElementText(_30e);
                                    _30a.collapse(false);
                                    if (_30e.contentEditable != "inherit") { len++; }
                                } else {
                                    _30a.moveToElementText(_308.parentNode);
                                    _30a.collapse(true);
                                    _30a.move("character", 1);
                                    _30a.move("character", -1);
                                }
                                _309 += len;
                                if (_309 > 0) { if (_30a.move("character", _309) != _309) { console.error("Error when moving!"); } }
                            }
                            return _30a;
                        },
                        decomposeTextRange: function(_30f) {
                            var _310 = ie.getEndPoint(_30f);
                            var _311 = _310[0],
                                _312 = _310[1];
                            var _313 = _310[0],
                                _314 = _310[1];
                            if (_30f.htmlText.length) {
                                if (_30f.htmlText == _30f.text) { _314 = _312 + _30f.text.length; } else {
                                    _310 = ie.getEndPoint(_30f, true);
                                    _313 = _310[0], _314 = _310[1];
                                }
                            }
                            return [_311, _312, _313, _314];
                        },
                        setRange: function(_315, _316, _317, _318, _319, _31a) {
                            var _31b = ie.setEndPoint(_315, _316, _317);
                            _315.setEndPoint("StartToStart", _31b);
                            if (!_31a) { var end = ie.setEndPoint(_315, _318, _319); }
                            _315.setEndPoint("EndToEnd", end || _31b);
                            return _315;
                        }
                    };
                    var _2ee = _2d8.W3CRange = _2d7(null, {
                        constructor: function() {
                            if (arguments.length > 0) {
                                this.setStart(arguments[0][0], arguments[0][1]);
                                this.setEnd(arguments[0][2], arguments[0][3]);
                            } else {
                                this.commonAncestorContainer = null;
                                this.startContainer = null;
                                this.startOffset = 0;
                                this.endContainer = null;
                                this.endOffset = 0;
                                this.collapsed = true;
                            }
                        },
                        _updateInternal: function() {
                            if (this.startContainer !== this.endContainer) { this.commonAncestorContainer = _2d8.getCommonAncestor(this.startContainer, this.endContainer); } else { this.commonAncestorContainer = this.startContainer; }
                            this.collapsed = (this.startContainer === this.endContainer) && (this.startOffset == this.endOffset);
                        },
                        setStart: function(node, _31c) {
                            _31c = parseInt(_31c);
                            if (this.startContainer === node && this.startOffset == _31c) { return; }
                            delete this._cachedBookmark;
                            this.startContainer = node;
                            this.startOffset = _31c;
                            if (!this.endContainer) { this.setEnd(node, _31c); } else { this._updateInternal(); }
                        },
                        setEnd: function(node, _31d) {
                            _31d = parseInt(_31d);
                            if (this.endContainer === node && this.endOffset == _31d) { return; }
                            delete this._cachedBookmark;
                            this.endContainer = node;
                            this.endOffset = _31d;
                            if (!this.startContainer) { this.setStart(node, _31d); } else { this._updateInternal(); }
                        },
                        setStartAfter: function(node, _31e) { this._setPoint("setStart", node, _31e, 1); },
                        setStartBefore: function(node, _31f) { this._setPoint("setStart", node, _31f, 0); },
                        setEndAfter: function(node, _320) { this._setPoint("setEnd", node, _320, 1); },
                        setEndBefore: function(node, _321) { this._setPoint("setEnd", node, _321, 0); },
                        _setPoint: function(what, node, _322, ext) {
                            var _323 = _2d8.getIndex(node, node.parentNode).o;
                            this[what](node.parentNode, _323.pop() + ext);
                        },
                        _getIERange: function() {
                            var r = (this._body || this.endContainer.ownerDocument.body).createTextRange();
                            ie.setRange(r, this.startContainer, this.startOffset, this.endContainer, this.endOffset, this.collapsed);
                            return r;
                        },
                        getBookmark: function() { this._getIERange(); return this._cachedBookmark; },
                        _select: function() {
                            var r = this._getIERange();
                            r.select();
                        },
                        deleteContents: function() {
                            var s = this.startContainer,
                                r = this._getIERange();
                            if (s.nodeType === 3 && !this.startOffset) { this.setStartBefore(s); }
                            r.pasteHTML("");
                            this.endContainer = this.startContainer;
                            this.endOffset = this.startOffset;
                            this.collapsed = true;
                        },
                        cloneRange: function() {
                            var r = new _2ee([this.startContainer, this.startOffset, this.endContainer, this.endOffset]);
                            r._body = this._body;
                            return r;
                        },
                        detach: function() {
                            this._body = null;
                            this.commonAncestorContainer = null;
                            this.startContainer = null;
                            this.startOffset = 0;
                            this.endContainer = null;
                            this.endOffset = 0;
                            this.collapsed = true;
                        }
                    });
                }
                lang.setObject("dijit.range", _2d8);
                return _2d8;
            });
        },
        "dijit/_editor/html": function() {
            define(["dojo/_base/array", "dojo/_base/lang", "dojo/sniff"], function(_324, lang, has) {
                var _325 = {};
                lang.setObject("dijit._editor.html", _325);
                var _326 = _325.escapeXml = function(str, _327) { str = str.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;"); if (!_327) { str = str.replace(/'/gm, "&#39;"); } return str; };
                _325.getNodeHtml = function(node) {
                    var _328 = [];
                    _325.getNodeHtmlHelper(node, _328);
                    return _328.join("");
                };
                _325.getNodeHtmlHelper = function(node, _329) {
                    switch (node.nodeType) {
                        case 1:
                            var _32a = node.nodeName.toLowerCase();
                            if (!_32a || _32a.charAt(0) == "/") { return ""; }
                            _329.push("<", _32a);
                            var _32b = [],
                                _32c = {};
                            var attr;
                            if (has("dom-attributes-explicit") || has("dom-attributes-specified-flag")) {
                                var i = 0;
                                while ((attr = node.attributes[i++])) {
                                    var n = attr.name;
                                    if (n.substr(0, 3) !== "_dj" && (!has("dom-attributes-specified-flag") || attr.specified) && !(n in _32c)) {
                                        var v = attr.value;
                                        if (n == "src" || n == "href") { if (node.getAttribute("_djrealurl")) { v = node.getAttribute("_djrealurl"); } }
                                        if (has("ie") === 8 && n === "style") { v = v.replace("HEIGHT:", "height:").replace("WIDTH:", "width:"); }
                                        _32b.push([n, v]);
                                        _32c[n] = v;
                                    }
                                }
                            } else {
                                var _32d = /^input$|^img$/i.test(node.nodeName) ? node : node.cloneNode(false);
                                var s = _32d.outerHTML;
                                var _32e = /[\w-]+=("[^"]*"|'[^']*'|\S*)/gi;
                                var _32f = s.match(_32e);
                                s = s.substr(0, s.indexOf(">"));
                                _324.forEach(_32f, function(attr) {
                                    if (attr) {
                                        var idx = attr.indexOf("=");
                                        if (idx > 0) {
                                            var key = attr.substring(0, idx);
                                            if (key.substr(0, 3) != "_dj") {
                                                if (key == "src" || key == "href") { if (node.getAttribute("_djrealurl")) { _32b.push([key, node.getAttribute("_djrealurl")]); return; } }
                                                var val, _330;
                                                switch (key) {
                                                    case "style":
                                                        val = node.style.cssText.toLowerCase();
                                                        break;
                                                    case "class":
                                                        val = node.className;
                                                        break;
                                                    case "width":
                                                        if (_32a === "img") { _330 = /width=(\S+)/i.exec(s); if (_330) { val = _330[1]; } break; }
                                                    case "height":
                                                        if (_32a === "img") { _330 = /height=(\S+)/i.exec(s); if (_330) { val = _330[1]; } break; }
                                                    default:
                                                        val = node.getAttribute(key);
                                                }
                                                if (val != null) { _32b.push([key, val.toString()]); }
                                            }
                                        }
                                    }
                                }, this);
                            }
                            _32b.sort(function(a, b) { return a[0] < b[0] ? -1 : (a[0] == b[0] ? 0 : 1); });
                            var j = 0;
                            while ((attr = _32b[j++])) { _329.push(" ", attr[0], "=\"", (typeof attr[1] === "string" ? _326(attr[1], true) : attr[1]), "\""); }
                            switch (_32a) {
                                case "br":
                                case "hr":
                                case "img":
                                case "input":
                                case "base":
                                case "meta":
                                case "area":
                                case "basefont":
                                    _329.push(" />");
                                    break;
                                case "script":
                                    _329.push(">", node.innerHTML, "</", _32a, ">");
                                    break;
                                default:
                                    _329.push(">");
                                    if (node.hasChildNodes()) { _325.getChildrenHtmlHelper(node, _329); }
                                    _329.push("</", _32a, ">");
                            }
                            break;
                        case 4:
                        case 3:
                            _329.push(_326(node.nodeValue, true));
                            break;
                        case 8:
                            _329.push("<!--", _326(node.nodeValue, true), "-->");
                            break;
                        default:
                            _329.push("<!-- Element not recognized - Type: ", node.nodeType, " Name: ", node.nodeName, "-->");
                    }
                };
                _325.getChildrenHtml = function(node) {
                    var _331 = [];
                    _325.getChildrenHtmlHelper(node, _331);
                    return _331.join("");
                };
                _325.getChildrenHtmlHelper = function(dom, _332) { if (!dom) { return; } var _333 = dom["childNodes"] || dom; var _334 = !has("ie") || _333 !== dom; var node, i = 0; while ((node = _333[i++])) { if (!_334 || node.parentNode == dom) { _325.getNodeHtmlHelper(node, _332); } } };
                return _325;
            });
        },
        "dijit/_editor/plugins/FontChoice": function() {
            define(["require", "dojo/_base/array", "dojo/_base/declare", "dojo/dom-construct", "dojo/i18n", "dojo/_base/lang", "dojo/string", "dojo/store/Memory", "../../registry", "../../_Widget", "../../_TemplatedMixin", "../../_WidgetsInTemplateMixin", "../../form/FilteringSelect", "../_Plugin", "../range", "dojo/i18n!../nls/FontChoice"], function(_335, _336, _337, _338, i18n, lang, _339, _33a, _33b, _33c, _33d, _33e, _33f, _340, _341) {
                var _342 = _337("dijit._editor.plugins._FontDropDown", [_33c, _33d, _33e], {
                    label: "",
                    plainText: false,
                    templateString: "<span style='white-space: nowrap' class='dijit dijitReset dijitInline'>" + "<label class='dijitLeft dijitInline' for='${selectId}'>${label}</label>" + "<input data-dojo-type='../../form/FilteringSelect' required='false' " + "data-dojo-props='labelType:\"html\", labelAttr:\"label\", searchAttr:\"name\"' " + "class='${comboClass}' " + "tabIndex='-1' id='${selectId}' data-dojo-attach-point='select' value=''/>" + "</span>",
                    contextRequire: _335,
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this.strings = i18n.getLocalization("dijit._editor", "FontChoice");
                        this.label = this.strings[this.command];
                        this.id = _33b.getUniqueId(this.declaredClass.replace(/\./g, "_"));
                        this.selectId = this.id + "_select";
                        this.inherited(arguments);
                    },
                    postCreate: function() {
                        this.select.set("store", new _33a({ idProperty: "value", data: _336.map(this.values, function(_343) { var name = this.strings[_343] || _343; return { label: this.getLabel(_343, name), name: name, value: _343 }; }, this) }));
                        this.select.set("value", "", false);
                        this.disabled = this.select.get("disabled");
                    },
                    _setValueAttr: function(_344, _345) {
                        _345 = _345 !== false;
                        this.select.set("value", _336.indexOf(this.values, _344) < 0 ? "" : _344, _345);
                        if (!_345) { this.select._lastValueReported = null; }
                    },
                    _getValueAttr: function() { return this.select.get("value"); },
                    focus: function() { this.select.focus(); },
                    _setDisabledAttr: function(_346) {
                        this._set("disabled", _346);
                        this.select.set("disabled", _346);
                    }
                });
                var _347 = _337("dijit._editor.plugins._FontNameDropDown", _342, {
                    generic: false,
                    command: "fontName",
                    comboClass: "dijitFontNameCombo",
                    postMixInProperties: function() {
                        if (!this.values) { this.values = this.generic ? ["serif", "sans-serif", "monospace", "cursive", "fantasy"] : ["Arial", "Times New Roman", "Comic Sans MS", "Courier New"]; }
                        this.inherited(arguments);
                    },
                    getLabel: function(_348, name) { if (this.plainText) { return name; } else { return "<div style='font-family: " + _348 + "'>" + name + "</div>"; } },
                    _normalizeFontName: function(_349) { var _34a = this.values; if (!_349 || !_34a) { return _349; } var _34b = _349.split(","); if (_34b.length > 1) { for (var i = 0, l = _34b.length; i < l; i++) { var _34c = _339.trim(_34b[i]); var pos = _336.indexOf(_34a, _34c); if (pos > -1) { return _34c; } } } return _349; },
                    _setValueAttr: function(_34d, _34e) {
                        _34e = _34e !== false;
                        _34d = this._normalizeFontName(_34d);
                        if (this.generic) {
                            var map = { "Arial": "sans-serif", "Helvetica": "sans-serif", "Myriad": "sans-serif", "Times": "serif", "Times New Roman": "serif", "Comic Sans MS": "cursive", "Apple Chancery": "cursive", "Courier": "monospace", "Courier New": "monospace", "Papyrus": "fantasy", "Estrangelo Edessa": "cursive", "Gabriola": "fantasy" };
                            _34d = map[_34d] || _34d;
                        }
                        this.inherited(arguments, [_34d, _34e]);
                    }
                });
                var _34f = _337("dijit._editor.plugins._FontSizeDropDown", _342, {
                    command: "fontSize",
                    comboClass: "dijitFontSizeCombo",
                    values: [1, 2, 3, 4, 5, 6, 7],
                    getLabel: function(_350, name) { if (this.plainText) { return name; } else { return "<font size=" + _350 + "'>" + name + "</font>"; } },
                    _setValueAttr: function(_351, _352) {
                        _352 = _352 !== false;
                        if (_351.indexOf && _351.indexOf("px") != -1) {
                            var _353 = parseInt(_351, 10);
                            _351 = { 10: 1, 13: 2, 16: 3, 18: 4, 24: 5, 32: 6, 48: 7 }[_353] || _351;
                        }
                        this.inherited(arguments, [_351, _352]);
                    }
                });
                var _354 = _337("dijit._editor.plugins._FormatBlockDropDown", _342, {
                    command: "formatBlock",
                    comboClass: "dijitFormatBlockCombo",
                    values: ["noFormat", "p", "h1", "h2", "h3", "pre"],
                    postCreate: function() {
                        this.inherited(arguments);
                        this.set("value", "noFormat", false);
                    },
                    getLabel: function(_355, name) { if (this.plainText || _355 == "noFormat") { return name; } else { return "<" + _355 + ">" + name + "</" + _355 + ">"; } },
                    _execCommand: function(_356, _357, _358) {
                        if (_358 === "noFormat") {
                            var _359;
                            var end;
                            var sel = _341.getSelection(_356.window);
                            if (sel && sel.rangeCount > 0) {
                                var _35a = sel.getRangeAt(0);
                                var node, tag;
                                if (_35a) {
                                    _359 = _35a.startContainer;
                                    end = _35a.endContainer;
                                    while (_359 && _359 !== _356.editNode && _359 !== _356.document.body && _359.nodeType !== 1) { _359 = _359.parentNode; }
                                    while (end && end !== _356.editNode && end !== _356.document.body && end.nodeType !== 1) { end = end.parentNode; }
                                    var _35b = lang.hitch(this, function(node, ary) {
                                        if (node.childNodes && node.childNodes.length) {
                                            var i;
                                            for (i = 0; i < node.childNodes.length; i++) {
                                                var c = node.childNodes[i];
                                                if (c.nodeType == 1) {
                                                    if (_356.selection.inSelection(c)) {
                                                        var tag = c.tagName ? c.tagName.toLowerCase() : "";
                                                        if (_336.indexOf(this.values, tag) !== -1) { ary.push(c); }
                                                        _35b(c, ary);
                                                    }
                                                }
                                            }
                                        }
                                    });
                                    var _35c = lang.hitch(this, function(_35d) {
                                        if (_35d && _35d.length) {
                                            _356.beginEditing();
                                            while (_35d.length) { this._removeFormat(_356, _35d.pop()); }
                                            _356.endEditing();
                                        }
                                    });
                                    var _35e = [];
                                    if (_359 == end) {
                                        var _35f;
                                        node = _359;
                                        while (node && node !== _356.editNode && node !== _356.document.body) {
                                            if (node.nodeType == 1) { tag = node.tagName ? node.tagName.toLowerCase() : ""; if (_336.indexOf(this.values, tag) !== -1) { _35f = node; break; } }
                                            node = node.parentNode;
                                        }
                                        _35b(_359, _35e);
                                        if (_35f) { _35e = [_35f].concat(_35e); }
                                        _35c(_35e);
                                    } else {
                                        node = _359;
                                        while (_356.selection.inSelection(node)) {
                                            if (node.nodeType == 1) {
                                                tag = node.tagName ? node.tagName.toLowerCase() : "";
                                                if (_336.indexOf(this.values, tag) !== -1) { _35e.push(node); }
                                                _35b(node, _35e);
                                            }
                                            node = node.nextSibling;
                                        }
                                        _35c(_35e);
                                    }
                                    _356.onDisplayChanged();
                                }
                            }
                        } else { _356.execCommand(_357, _358); }
                    },
                    _removeFormat: function(_360, node) {
                        if (_360.customUndo) {
                            while (node.firstChild) { _338.place(node.firstChild, node, "before"); }
                            node.parentNode.removeChild(node);
                        } else {
                            _360.selection.selectElementChildren(node);
                            var html = _360.selection.getSelectedHtml();
                            _360.selection.selectElement(node);
                            _360.execCommand("inserthtml", html || "");
                        }
                    }
                });
                var _361 = _337("dijit._editor.plugins.FontChoice", _340, {
                    useDefaultCommand: false,
                    _initButton: function() {
                        var _362 = { fontName: _347, fontSize: _34f, formatBlock: _354 }[this.command],
                            _363 = this.params;
                        if (this.params.custom) { _363.values = this.params.custom; }
                        var _364 = this.editor;
                        this.button = new _362(lang.delegate({ dir: _364.dir, lang: _364.lang }, _363));
                        this.own(this.button.select.on("change", lang.hitch(this, function(_365) { if (this.editor.focused) { this.editor.focus(); } if (this.command == "fontName" && _365.indexOf(" ") != -1) { _365 = "'" + _365 + "'"; } if (this.button._execCommand) { this.button._execCommand(this.editor, this.command, _365); } else { this.editor.execCommand(this.command, _365); } })));
                    },
                    updateState: function() {
                        var _366 = this.editor;
                        var _367 = this.command;
                        if (!_366 || !_366.isLoaded || !_367.length) { return; }
                        if (this.button) {
                            var _368 = this.get("disabled");
                            this.button.set("disabled", _368);
                            if (_368) { return; }
                            var _369;
                            try { _369 = _366.queryCommandValue(_367) || ""; } catch (e) { _369 = ""; }
                            var _36a = lang.isString(_369) && (_369.match(/'([^']*)'/) || _369.match(/"([^"]*)"/));
                            if (_36a) { _369 = _36a[1]; }
                            if (_367 === "fontSize" && !_369) { _369 = 3; }
                            if (_367 === "formatBlock") {
                                if (!_369 || _369 == "p") {
                                    _369 = null;
                                    var elem;
                                    var sel = _341.getSelection(this.editor.window);
                                    if (sel && sel.rangeCount > 0) { var _36b = sel.getRangeAt(0); if (_36b) { elem = _36b.endContainer; } }
                                    while (elem && elem !== _366.editNode && elem !== _366.document) {
                                        var tg = elem.tagName ? elem.tagName.toLowerCase() : "";
                                        if (tg && _336.indexOf(this.button.values, tg) > -1) { _369 = tg; break; }
                                        elem = elem.parentNode;
                                    }
                                    if (!_369) { _369 = "noFormat"; }
                                } else { if (_336.indexOf(this.button.values, _369) < 0) { _369 = "noFormat"; } }
                            }
                            if (_369 !== this.button.get("value")) { this.button.set("value", _369, false); }
                        }
                    }
                });
                _336.forEach(["fontName", "fontSize", "formatBlock"], function(name) { _340.registry[name] = function(args) { return new _361({ command: name, plainText: args.plainText }); }; });
                _361._FontDropDown = _342;
                _361._FontNameDropDown = _347;
                _361._FontSizeDropDown = _34f;
                _361._FormatBlockDropDown = _354;
                return _361;
            });
        },
        "dojo/store/Memory": function() {
            define(["../_base/declare", "./util/QueryResults", "./util/SimpleQueryEngine"], function(_36c, _36d, _36e) {
                var base = null;
                return _36c("dojo.store.Memory", base, {
                    constructor: function(_36f) {
                        for (var i in _36f) { this[i] = _36f[i]; }
                        this.setData(this.data || []);
                    },
                    data: null,
                    idProperty: "id",
                    index: null,
                    queryEngine: _36e,
                    get: function(id) { return this.data[this.index[id]]; },
                    getIdentity: function(_370) { return _370[this.idProperty]; },
                    put: function(_371, _372) {
                        var data = this.data,
                            _373 = this.index,
                            _374 = this.idProperty;
                        var id = _371[_374] = (_372 && "id" in _372) ? _372.id : _374 in _371 ? _371[_374] : Math.random();
                        if (id in _373) {
                            if (_372 && _372.overwrite === false) { throw new Error("Object already exists"); }
                            data[_373[id]] = _371;
                        } else { _373[id] = data.push(_371) - 1; }
                        return id;
                    },
                    add: function(_375, _376) {
                        (_376 = _376 || {}).overwrite = false;
                        return this.put(_375, _376);
                    },
                    remove: function(id) {
                        var _377 = this.index;
                        var data = this.data;
                        if (id in _377) {
                            data.splice(_377[id], 1);
                            this.setData(data);
                            return true;
                        }
                    },
                    query: function(_378, _379) { return _36d(this.queryEngine(_378, _379)(this.data)); },
                    setData: function(data) {
                        if (data.items) {
                            this.idProperty = data.identifier || this.idProperty;
                            data = this.data = data.items;
                        } else { this.data = data; }
                        this.index = {};
                        for (var i = 0, l = data.length; i < l; i++) { this.index[data[i][this.idProperty]] = i; }
                    }
                });
            });
        },
        "dojo/store/util/QueryResults": function() {
            define(["../../_base/array", "../../_base/lang", "../../when"], function(_37a, lang, when) {
                var _37b = function(_37c) {
                    if (!_37c) { return _37c; }
                    var _37d = !!_37c.then;
                    if (_37d) { _37c = lang.delegate(_37c); }

                    function _37e(_37f) { _37c[_37f] = function() { var args = arguments; var _380 = when(_37c, function(_381) { Array.prototype.unshift.call(args, _381); return _37b(_37a[_37f].apply(_37a, args)); }); if (_37f !== "forEach" || _37d) { return _380; } }; };
                    _37e("forEach");
                    _37e("filter");
                    _37e("map");
                    if (_37c.total == null) { _37c.total = when(_37c, function(_382) { return _382.length; }); }
                    return _37c;
                };
                lang.setObject("dojo.store.util.QueryResults", _37b);
                return _37b;
            });
        },
        "dojo/store/util/SimpleQueryEngine": function() {
            define(["../../_base/array"], function(_383) {
                return function(_384, _385) {
                    switch (typeof _384) {
                        default: throw new Error("Can not query with a " + typeof _384);
                        case "object":
                                case "undefined":
                                var _386 = _384;_384 = function(_387) { for (var key in _386) { var _388 = _386[key]; if (_388 && _388.test) { if (!_388.test(_387[key], _387)) { return false; } } else { if (_388 != _387[key]) { return false; } } } return true; };
                            break;
                        case "string":
                                if (!this[_384]) { throw new Error("No filter function " + _384 + " was found in store"); }_384 = this[_384];
                        case "function":
                    }

                    function _389(_38a) {
                        var _38b = _383.filter(_38a, _384);
                        var _38c = _385 && _385.sort;
                        if (_38c) {
                            _38b.sort(typeof _38c == "function" ? _38c : function(a, b) {
                                for (var sort, i = 0; sort = _38c[i]; i++) {
                                    var _38d = a[sort.attribute];
                                    var _38e = b[sort.attribute];
                                    _38d = _38d != null ? _38d.valueOf() : _38d;
                                    _38e = _38e != null ? _38e.valueOf() : _38e;
                                    if (_38d != _38e) { return !!sort.descending == (_38d == null || _38d > _38e) ? -1 : 1; }
                                }
                                return 0;
                            });
                        }
                        if (_385 && (_385.start || _385.count)) {
                            var _38f = _38b.length;
                            _38b = _38b.slice(_385.start || 0, (_385.start || 0) + (_385.count || Infinity));
                            _38b.total = _38f;
                        }
                        return _38b;
                    };
                    _389.matches = _384;
                    return _389;
                };
            });
        },
        "dijit/form/FilteringSelect": function() {
            define(["dojo/_base/declare", "dojo/_base/lang", "dojo/when", "./MappedTextBox", "./ComboBoxMixin"], function(_390, lang, when, _391, _392) {
                return _390("dijit.form.FilteringSelect", [_391, _392], {
                    required: true,
                    _lastDisplayedValue: "",
                    _isValidSubset: function() { return this._opened; },
                    isValid: function() { return !!this.item || (!this.required && this.get("displayedValue") == ""); },
                    _refreshState: function() { if (!this.searchTimer) { this.inherited(arguments); } },
                    _callbackSetLabel: function(_393, _394, _395, _396) { if ((_394 && _394[this.searchAttr] !== this._lastQuery) || (!_394 && _393.length && this.store.getIdentity(_393[0]) != this._lastQuery)) { return; } if (!_393.length) { this.set("value", "", _396 || (_396 === undefined && !this.focused), this.textbox.value, null); } else { this.set("item", _393[0], _396); } },
                    _openResultList: function(_397, _398, _399) {
                        if (_398[this.searchAttr] !== this._lastQuery) { return; }
                        this.inherited(arguments);
                        if (this.item === undefined) { this.validate(true); }
                    },
                    _getValueAttr: function() { return this.valueNode.value; },
                    _getValueField: function() { return "value"; },
                    _setValueAttr: function(_39a, _39b, _39c, item) {
                        if (!this._onChangeActive) { _39b = null; }
                        if (item === undefined) {
                            if (_39a === null || _39a === "") { _39a = ""; if (!lang.isString(_39c)) { this._setDisplayedValueAttr(_39c || "", _39b); return; } }
                            var self = this;
                            this._lastQuery = _39a;
                            when(this.store.get(_39a), function(item) { self._callbackSetLabel(item ? [item] : [], undefined, undefined, _39b); });
                        } else {
                            this.valueNode.value = _39a;
                            this.inherited(arguments, [_39a, _39b, _39c, item]);
                        }
                    },
                    _setItemAttr: function(item, _39d, _39e) {
                        this.inherited(arguments);
                        this._lastDisplayedValue = this.textbox.value;
                    },
                    _getDisplayQueryString: function(text) { return text.replace(/([\\\*\?])/g, "\\$1"); },
                    _setDisplayedValueAttr: function(_39f, _3a0) {
                        if (_39f == null) { _39f = ""; }
                        if (!this._created) {
                            if (!("displayedValue" in this.params)) { return; }
                            _3a0 = false;
                        }
                        if (this.store) {
                            this.closeDropDown();
                            var _3a1 = lang.clone(this.query);
                            var qs = this._getDisplayQueryString(_39f),
                                q;
                            if (this.store._oldAPI) { q = qs; } else {
                                q = this._patternToRegExp(qs);
                                q.toString = function() { return qs; };
                            }
                            this._lastQuery = _3a1[this.searchAttr] = q;
                            this.textbox.value = _39f;
                            this._lastDisplayedValue = _39f;
                            this._set("displayedValue", _39f);
                            var _3a2 = this;
                            var _3a3 = { queryOptions: { ignoreCase: this.ignoreCase, deep: true } };
                            lang.mixin(_3a3, this.fetchProperties);
                            this._fetchHandle = this.store.query(_3a1, _3a3);
                            when(this._fetchHandle, function(_3a4) {
                                _3a2._fetchHandle = null;
                                _3a2._callbackSetLabel(_3a4 || [], _3a1, _3a3, _3a0);
                            }, function(err) { _3a2._fetchHandle = null; if (!_3a2._cancelingQuery) { console.error("dijit.form.FilteringSelect: " + err.toString()); } });
                        }
                    },
                    undo: function() { this.set("displayedValue", this._lastDisplayedValue); }
                });
            });
        },
        "dijit/form/MappedTextBox": function() {
            define(["dojo/_base/declare", "dojo/sniff", "dojo/dom-construct", "./ValidationTextBox"], function(_3a5, has, _3a6, _3a7) {
                return _3a5("dijit.form.MappedTextBox", _3a7, {
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this.nameAttrSetting = "";
                    },
                    _setNameAttr: "valueNode",
                    serialize: function(val) { return val.toString ? val.toString() : ""; },
                    toString: function() { var val = this.filter(this.get("value")); return val != null ? (typeof val == "string" ? val : this.serialize(val, this.constraints)) : ""; },
                    validate: function() { this.valueNode.value = this.toString(); return this.inherited(arguments); },
                    buildRendering: function() {
                        this.inherited(arguments);
                        this.valueNode = _3a6.place("<input type='hidden'" + ((this.name && !has("msapp")) ? " name=\"" + this.name.replace(/"/g, "&quot;") + "\"" : "") + "/>", this.textbox, "after");
                    },
                    reset: function() {
                        this.valueNode.value = "";
                        this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/form/ValidationTextBox": function() {
            define(["dojo/_base/declare", "dojo/_base/kernel", "dojo/_base/lang", "dojo/i18n", "./TextBox", "../Tooltip", "dojo/text!./templates/ValidationTextBox.html", "dojo/i18n!./nls/validate"], function(_3a8, _3a9, lang, i18n, _3aa, _3ab, _3ac) {
                var _3ad = _3a8("dijit.form.ValidationTextBox", _3aa, {
                    templateString: _3ac,
                    required: false,
                    promptMessage: "",
                    invalidMessage: "$_unset_$",
                    missingMessage: "$_unset_$",
                    message: "",
                    constraints: {},
                    pattern: ".*",
                    regExp: "",
                    regExpGen: function() {},
                    state: "",
                    tooltipPosition: [],
                    _deprecateRegExp: function(attr, _3ae) {
                        if (_3ae != _3ad.prototype[attr]) {
                            _3a9.deprecated("ValidationTextBox id=" + this.id + ", set('" + attr + "', ...) is deprecated.  Use set('pattern', ...) instead.", "", "2.0");
                            this.set("pattern", _3ae);
                        }
                    },
                    _setRegExpGenAttr: function(_3af) {
                        this._deprecateRegExp("regExpGen", _3af);
                        this._set("regExpGen", this._computeRegexp);
                    },
                    _setRegExpAttr: function(_3b0) { this._deprecateRegExp("regExp", _3b0); },
                    _setValueAttr: function() {
                        this.inherited(arguments);
                        this._refreshState();
                    },
                    validator: function(_3b1, _3b2) { return (new RegExp("^(?:" + this._computeRegexp(_3b2) + ")" + (this.required ? "" : "?") + "$")).test(_3b1) && (!this.required || !this._isEmpty(_3b1)) && (this._isEmpty(_3b1) || this.parse(_3b1, _3b2) !== undefined); },
                    _isValidSubset: function() { return this.textbox.value.search(this._partialre) == 0; },
                    isValid: function() { return this.validator(this.textbox.value, this.get("constraints")); },
                    _isEmpty: function(_3b3) { return (this.trim ? /^\s*$/ : /^$/).test(_3b3); },
                    getErrorMessage: function() { var _3b4 = this.invalidMessage == "$_unset_$" ? this.messages.invalidMessage : !this.invalidMessage ? this.promptMessage : this.invalidMessage; var _3b5 = this.missingMessage == "$_unset_$" ? this.messages.missingMessage : !this.missingMessage ? _3b4 : this.missingMessage; return (this.required && this._isEmpty(this.textbox.value)) ? _3b5 : _3b4; },
                    getPromptMessage: function() { return this.promptMessage; },
                    _maskValidSubsetError: true,
                    validate: function(_3b6) {
                        var _3b7 = "";
                        var _3b8 = this.disabled || this.isValid(_3b6);
                        if (_3b8) { this._maskValidSubsetError = true; }
                        var _3b9 = this._isEmpty(this.textbox.value);
                        var _3ba = !_3b8 && _3b6 && this._isValidSubset();
                        this._set("state", _3b8 ? "" : (((((!this._hasBeenBlurred || _3b6) && _3b9) || _3ba) && (this._maskValidSubsetError || (_3ba && !this._hasBeenBlurred && _3b6))) ? "Incomplete" : "Error"));
                        this.focusNode.setAttribute("aria-invalid", this.state == "Error" ? "true" : "false");
                        if (this.state == "Error") {
                            this._maskValidSubsetError = _3b6 && _3ba;
                            _3b7 = this.getErrorMessage(_3b6);
                        } else {
                            if (this.state == "Incomplete") {
                                _3b7 = this.getPromptMessage(_3b6);
                                this._maskValidSubsetError = !this._hasBeenBlurred || _3b6;
                            } else { if (_3b9) { _3b7 = this.getPromptMessage(_3b6); } }
                        }
                        this.set("message", _3b7);
                        return _3b8;
                    },
                    displayMessage: function(_3bb) { if (_3bb && this.focused) { _3ab.show(_3bb, this.domNode, this.tooltipPosition, !this.isLeftToRight()); } else { _3ab.hide(this.domNode); } },
                    _refreshState: function() {
                        if (this._created) { this.validate(this.focused); }
                        this.inherited(arguments);
                    },
                    constructor: function(_3bc) {
                        this.constraints = lang.clone(this.constraints);
                        this.baseClass += " dijitValidationTextBox";
                    },
                    startup: function() {
                        this.inherited(arguments);
                        this._refreshState();
                    },
                    _setConstraintsAttr: function(_3bd) {
                        if (!_3bd.locale && this.lang) { _3bd.locale = this.lang; }
                        this._set("constraints", _3bd);
                        this._refreshState();
                    },
                    _setPatternAttr: function(_3be) {
                        this._set("pattern", _3be);
                        this._refreshState();
                    },
                    _computeRegexp: function(_3bf) {
                        var p = this.pattern;
                        if (typeof p == "function") { p = p.call(this, _3bf); }
                        if (p != this._lastRegExp) {
                            var _3c0 = "";
                            this._lastRegExp = p;
                            if (p != ".*") {
                                p.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g, function(re) {
                                    switch (re.charAt(0)) {
                                        case "{":
                                        case "+":
                                        case "?":
                                        case "*":
                                        case "^":
                                        case "$":
                                        case "|":
                                        case "(":
                                            _3c0 += re;
                                            break;
                                        case ")":
                                            _3c0 += "|$)";
                                            break;
                                        default:
                                            _3c0 += "(?:" + re + "|$)";
                                            break;
                                    }
                                });
                            }
                            try { "".search(_3c0); } catch (e) {
                                _3c0 = this.pattern;
                                console.warn("RegExp error in " + this.declaredClass + ": " + this.pattern);
                            }
                            this._partialre = "^(?:" + _3c0 + ")$";
                        }
                        return p;
                    },
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this.messages = i18n.getLocalization("dijit.form", "validate", this.lang);
                        this._setConstraintsAttr(this.constraints);
                    },
                    _setDisabledAttr: function(_3c1) {
                        this.inherited(arguments);
                        this._refreshState();
                    },
                    _setRequiredAttr: function(_3c2) {
                        this._set("required", _3c2);
                        this.focusNode.setAttribute("aria-required", _3c2);
                        this._refreshState();
                    },
                    _setMessageAttr: function(_3c3) {
                        this._set("message", _3c3);
                        this.displayMessage(_3c3);
                    },
                    reset: function() {
                        this._maskValidSubsetError = true;
                        this.inherited(arguments);
                    },
                    _onBlur: function() {
                        this.displayMessage("");
                        this.inherited(arguments);
                    },
                    destroy: function() {
                        _3ab.hide(this.domNode);
                        this.inherited(arguments);
                    }
                });
                return _3ad;
            });
        },
        "dijit/form/TextBox": function() {
            define(["dojo/_base/declare", "dojo/dom-construct", "dojo/dom-style", "dojo/_base/kernel", "dojo/_base/lang", "dojo/on", "dojo/sniff", "./_FormValueWidget", "./_TextBoxMixin", "dojo/text!./templates/TextBox.html", "../main"], function(_3c4, _3c5, _3c6, _3c7, lang, on, has, _3c8, _3c9, _3ca, _3cb) {
                var _3cc = _3c4("dijit.form.TextBox" + (has("dojo-bidi") ? "_NoBidi" : ""), [_3c8, _3c9], {
                    templateString: _3ca,
                    _singleNodeTemplate: "<input class=\"dijit dijitReset dijitLeft dijitInputField\" data-dojo-attach-point=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",
                    _buttonInputDisabled: has("ie") ? "disabled" : "",
                    baseClass: "dijitTextBox",
                    postMixInProperties: function() {
                        var type = this.type.toLowerCase();
                        if (this.templateString && this.templateString.toLowerCase() == "input" || ((type == "hidden" || type == "file") && this.templateString == this.constructor.prototype.templateString)) { this.templateString = this._singleNodeTemplate; }
                        this.inherited(arguments);
                    },
                    postCreate: function() { this.inherited(arguments); if (has("ie") < 9) { this.defer(function() { try { var s = _3c6.getComputedStyle(this.domNode); if (s) { var ff = s.fontFamily; if (ff) { var _3cd = this.domNode.getElementsByTagName("INPUT"); if (_3cd) { for (var i = 0; i < _3cd.length; i++) { _3cd[i].style.fontFamily = ff; } } } } } catch (e) {} }); } },
                    _setPlaceHolderAttr: function(v) {
                        this._set("placeHolder", v);
                        if (!this._phspan) {
                            this._attachPoints.push("_phspan");
                            this._phspan = _3c5.create("span", { className: "dijitPlaceHolder dijitInputField" }, this.textbox, "after");
                            this.own(on(this._phspan, "mousedown", function(evt) { evt.preventDefault(); }), on(this._phspan, "touchend, pointerup, MSPointerUp", lang.hitch(this, function() { this.focus(); })));
                        }
                        this._phspan.innerHTML = "";
                        this._phspan.appendChild(this._phspan.ownerDocument.createTextNode(v));
                        this._updatePlaceHolder();
                    },
                    _onInput: function(evt) {
                        this.inherited(arguments);
                        this._updatePlaceHolder();
                    },
                    _updatePlaceHolder: function() { if (this._phspan) { this._phspan.style.display = (this.placeHolder && !this.textbox.value) ? "" : "none"; } },
                    _setValueAttr: function(_3ce, _3cf, _3d0) {
                        this.inherited(arguments);
                        this._updatePlaceHolder();
                    },
                    getDisplayedValue: function() { _3c7.deprecated(this.declaredClass + "::getDisplayedValue() is deprecated. Use get('displayedValue') instead.", "", "2.0"); return this.get("displayedValue"); },
                    setDisplayedValue: function(_3d1) {
                        _3c7.deprecated(this.declaredClass + "::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.", "", "2.0");
                        this.set("displayedValue", _3d1);
                    },
                    _onBlur: function(e) {
                        if (this.disabled) { return; }
                        this.inherited(arguments);
                        this._updatePlaceHolder();
                        if (has("mozilla")) { if (this.selectOnClick) { this.textbox.selectionStart = this.textbox.selectionEnd = undefined; } }
                    },
                    _onFocus: function(by) {
                        if (this.disabled || this.readOnly) { return; }
                        this.inherited(arguments);
                        this._updatePlaceHolder();
                    }
                });
                if (has("ie") < 9) {
                    _3cc.prototype._isTextSelected = function() { var _3d2 = this.ownerDocument.selection.createRange(); var _3d3 = _3d2.parentElement(); return _3d3 == this.textbox && _3d2.text.length > 0; };
                    _3cb._setSelectionRange = _3c9._setSelectionRange = function(_3d4, _3d5, stop) {
                        if (_3d4.createTextRange) {
                            var r = _3d4.createTextRange();
                            r.collapse(true);
                            r.moveStart("character", -99999);
                            r.moveStart("character", _3d5);
                            r.moveEnd("character", stop - _3d5);
                            r.select();
                        }
                    };
                }
                if (has("dojo-bidi")) {
                    _3cc = _3c4("dijit.form.TextBox", _3cc, {
                        _setPlaceHolderAttr: function(v) {
                            this.inherited(arguments);
                            this.applyTextDir(this._phspan);
                        }
                    });
                }
                return _3cc;
            });
        },
        "dijit/form/_TextBoxMixin": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom", "dojo/sniff", "dojo/keys", "dojo/_base/lang", "dojo/on", "../main"], function(_3d6, _3d7, dom, has, keys, lang, on, _3d8) {
                var _3d9 = _3d7("dijit.form._TextBoxMixin" + (has("dojo-bidi") ? "_NoBidi" : ""), null, {
                    trim: false,
                    uppercase: false,
                    lowercase: false,
                    propercase: false,
                    maxLength: "",
                    selectOnClick: false,
                    placeHolder: "",
                    _getValueAttr: function() { return this.parse(this.get("displayedValue"), this.constraints); },
                    _setValueAttr: function(_3da, _3db, _3dc) {
                        var _3dd;
                        if (_3da !== undefined) { _3dd = this.filter(_3da); if (typeof _3dc != "string") { if (_3dd !== null && ((typeof _3dd != "number") || !isNaN(_3dd))) { _3dc = this.filter(this.format(_3dd, this.constraints)); } else { _3dc = ""; } if (this.compare(_3dd, this.filter(this.parse(_3dc, this.constraints))) != 0) { _3dc = null; } } }
                        if (_3dc != null && ((typeof _3dc) != "number" || !isNaN(_3dc)) && this.textbox.value != _3dc) {
                            this.textbox.value = _3dc;
                            this._set("displayedValue", this.get("displayedValue"));
                        }
                        this.inherited(arguments, [_3dd, _3db]);
                    },
                    displayedValue: "",
                    _getDisplayedValueAttr: function() { return this.filter(this.textbox.value); },
                    _setDisplayedValueAttr: function(_3de) {
                        if (_3de == null) { _3de = ""; } else { if (typeof _3de != "string") { _3de = String(_3de); } }
                        this.textbox.value = _3de;
                        this._setValueAttr(this.get("value"), undefined);
                        this._set("displayedValue", this.get("displayedValue"));
                    },
                    format: function(_3df) { return _3df == null ? "" : (_3df.toString ? _3df.toString() : _3df); },
                    parse: function(_3e0) { return _3e0; },
                    _refreshState: function() {},
                    onInput: function() {},
                    _onInput: function(evt) {
                        this._lastInputEventValue = this.textbox.value;
                        this._processInput(this._lastInputProducingEvent || evt);
                        delete this._lastInputProducingEvent;
                        if (this.intermediateChanges) { this._handleOnChange(this.get("value"), false); }
                    },
                    _processInput: function() {
                        this._refreshState();
                        this._set("displayedValue", this.get("displayedValue"));
                    },
                    postCreate: function() {
                        this.textbox.setAttribute("value", this.textbox.value);
                        this.inherited(arguments);

                        function _3e1(e) {
                            var _3e2;
                            if (e.type == "keydown" && e.keyCode != 229) {
                                _3e2 = e.keyCode;
                                switch (_3e2) {
                                    case keys.SHIFT:
                                    case keys.ALT:
                                    case keys.CTRL:
                                    case keys.META:
                                    case keys.CAPS_LOCK:
                                    case keys.NUM_LOCK:
                                    case keys.SCROLL_LOCK:
                                        return;
                                }
                                if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                                    switch (_3e2) {
                                        case keys.NUMPAD_0:
                                        case keys.NUMPAD_1:
                                        case keys.NUMPAD_2:
                                        case keys.NUMPAD_3:
                                        case keys.NUMPAD_4:
                                        case keys.NUMPAD_5:
                                        case keys.NUMPAD_6:
                                        case keys.NUMPAD_7:
                                        case keys.NUMPAD_8:
                                        case keys.NUMPAD_9:
                                        case keys.NUMPAD_MULTIPLY:
                                        case keys.NUMPAD_PLUS:
                                        case keys.NUMPAD_ENTER:
                                        case keys.NUMPAD_MINUS:
                                        case keys.NUMPAD_PERIOD:
                                        case keys.NUMPAD_DIVIDE:
                                            return;
                                    }
                                    if ((_3e2 >= 65 && _3e2 <= 90) || (_3e2 >= 48 && _3e2 <= 57) || _3e2 == keys.SPACE) { return; }
                                    var _3e3 = false;
                                    for (var i in keys) { if (keys[i] === e.keyCode) { _3e3 = true; break; } }
                                    if (!_3e3) { return; }
                                }
                            }
                            _3e2 = e.charCode >= 32 ? String.fromCharCode(e.charCode) : e.charCode;
                            if (!_3e2) { _3e2 = (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == keys.SPACE ? String.fromCharCode(e.keyCode) : e.keyCode; }
                            if (!_3e2) { _3e2 = 229; }
                            if (e.type == "keypress") { if (typeof _3e2 != "string") { return; } if ((_3e2 >= "a" && _3e2 <= "z") || (_3e2 >= "A" && _3e2 <= "Z") || (_3e2 >= "0" && _3e2 <= "9") || (_3e2 === " ")) { if (e.ctrlKey || e.metaKey || e.altKey) { return; } } }
                            var faux = { faux: true },
                                attr;
                            for (attr in e) { if (!/^(layer[XY]|returnValue|keyLocation)$/.test(attr)) { var v = e[attr]; if (typeof v != "function" && typeof v != "undefined") { faux[attr] = v; } } }
                            lang.mixin(faux, {
                                charOrCode: _3e2,
                                _wasConsumed: false,
                                preventDefault: function() {
                                    faux._wasConsumed = true;
                                    e.preventDefault();
                                },
                                stopPropagation: function() { e.stopPropagation(); }
                            });
                            this._lastInputProducingEvent = faux;
                            if (this.onInput(faux) === false) {
                                faux.preventDefault();
                                faux.stopPropagation();
                            }
                            if (faux._wasConsumed) { return; }
                            if (has("ie") <= 9) {
                                switch (e.keyCode) {
                                    case keys.TAB:
                                    case keys.ESCAPE:
                                    case keys.DOWN_ARROW:
                                    case keys.UP_ARROW:
                                    case keys.LEFT_ARROW:
                                    case keys.RIGHT_ARROW:
                                        break;
                                    default:
                                        if (e.keyCode == keys.ENTER && this.textbox.tagName.toLowerCase() != "textarea") { break; }
                                        this.defer(function() { if (this.textbox.value !== this._lastInputEventValue) { on.emit(this.textbox, "input", { bubbles: true }); } });
                                }
                            }
                        };
                        this.own(on(this.textbox, "keydown, keypress, paste, cut, compositionend", lang.hitch(this, _3e1)), on(this.textbox, "input", lang.hitch(this, "_onInput")), on(this.domNode, "keypress", function(e) { e.stopPropagation(); }));
                    },
                    _blankValue: "",
                    filter: function(val) { if (val === null) { return this._blankValue; } if (typeof val != "string") { return val; } if (this.trim) { val = lang.trim(val); } if (this.uppercase) { val = val.toUpperCase(); } if (this.lowercase) { val = val.toLowerCase(); } if (this.propercase) { val = val.replace(/[^\s]+/g, function(word) { return word.substring(0, 1).toUpperCase() + word.substring(1); }); } return val; },
                    _setBlurValue: function() { this._setValueAttr(this.get("value"), true); },
                    _onBlur: function(e) {
                        if (this.disabled) { return; }
                        this._setBlurValue();
                        this.inherited(arguments);
                    },
                    _isTextSelected: function() { return this.textbox.selectionStart != this.textbox.selectionEnd; },
                    _onFocus: function(by) {
                        if (this.disabled || this.readOnly) { return; }
                        if (this.selectOnClick && by == "mouse") {
                            this._selectOnClickHandle = on.once(this.domNode, "mouseup, touchend", lang.hitch(this, function(evt) { if (!this._isTextSelected()) { _3d9.selectInputText(this.textbox); } }));
                            this.own(this._selectOnClickHandle);
                            this.defer(function() {
                                if (this._selectOnClickHandle) {
                                    this._selectOnClickHandle.remove();
                                    this._selectOnClickHandle = null;
                                }
                            }, 500);
                        }
                        this.inherited(arguments);
                        this._refreshState();
                    },
                    reset: function() {
                        this.textbox.value = "";
                        this.inherited(arguments);
                    }
                });
                if (has("dojo-bidi")) {
                    _3d9 = _3d7("dijit.form._TextBoxMixin", _3d9, {
                        _setValueAttr: function() {
                            this.inherited(arguments);
                            this.applyTextDir(this.focusNode);
                        },
                        _setDisplayedValueAttr: function() {
                            this.inherited(arguments);
                            this.applyTextDir(this.focusNode);
                        },
                        _onInput: function() {
                            this.applyTextDir(this.focusNode);
                            this.inherited(arguments);
                        }
                    });
                }
                _3d9._setSelectionRange = _3d8._setSelectionRange = function(_3e4, _3e5, stop) { if (_3e4.setSelectionRange) { _3e4.setSelectionRange(_3e5, stop); } };
                _3d9.selectInputText = _3d8.selectInputText = function(_3e6, _3e7, stop) {
                    _3e6 = dom.byId(_3e6);
                    if (isNaN(_3e7)) { _3e7 = 0; }
                    if (isNaN(stop)) { stop = _3e6.value ? _3e6.value.length : 0; }
                    try {
                        _3e6.focus();
                        _3d9._setSelectionRange(_3e6, _3e7, stop);
                    } catch (e) {}
                };
                return _3d9;
            });
        },
        "dijit/Tooltip": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/_base/fx", "dojo/dom", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/lang", "dojo/mouse", "dojo/on", "dojo/sniff", "./_base/manager", "./place", "./_Widget", "./_TemplatedMixin", "./BackgroundIframe", "dojo/text!./templates/Tooltip.html", "./main"], function(_3e8, _3e9, fx, dom, _3ea, _3eb, _3ec, lang, _3ed, on, has, _3ee, _3ef, _3f0, _3f1, _3f2, _3f3, _3f4) {
                var _3f5 = _3e9("dijit._MasterTooltip", [_3f0, _3f1], {
                    duration: _3ee.defaultDuration,
                    templateString: _3f3,
                    postCreate: function() {
                        this.ownerDocumentBody.appendChild(this.domNode);
                        this.bgIframe = new _3f2(this.domNode);
                        this.fadeIn = fx.fadeIn({ node: this.domNode, duration: this.duration, onEnd: lang.hitch(this, "_onShow") });
                        this.fadeOut = fx.fadeOut({ node: this.domNode, duration: this.duration, onEnd: lang.hitch(this, "_onHide") });
                    },
                    show: function(_3f6, _3f7, _3f8, rtl, _3f9, _3fa, _3fb) {
                        if (this.aroundNode && this.aroundNode === _3f7 && this.containerNode.innerHTML == _3f6) { return; }
                        if (this.fadeOut.status() == "playing") { this._onDeck = arguments; return; }
                        this.containerNode.innerHTML = _3f6;
                        if (_3f9) { this.set("textDir", _3f9); }
                        this.containerNode.align = rtl ? "right" : "left";
                        var pos = _3ef.around(this.domNode, _3f7, _3f8 && _3f8.length ? _3f8 : _3fc.defaultPosition, !rtl, lang.hitch(this, "orient"));
                        var _3fd = pos.aroundNodePos;
                        if (pos.corner.charAt(0) == "M" && pos.aroundCorner.charAt(0) == "M") {
                            this.connectorNode.style.top = _3fd.y + ((_3fd.h - this.connectorNode.offsetHeight) >> 1) - pos.y + "px";
                            this.connectorNode.style.left = "";
                        } else {
                            if (pos.corner.charAt(1) == "M" && pos.aroundCorner.charAt(1) == "M") { this.connectorNode.style.left = _3fd.x + ((_3fd.w - this.connectorNode.offsetWidth) >> 1) - pos.x + "px"; } else {
                                this.connectorNode.style.left = "";
                                this.connectorNode.style.top = "";
                            }
                        }
                        _3ec.set(this.domNode, "opacity", 0);
                        this.fadeIn.play();
                        this.isShowingNow = true;
                        this.aroundNode = _3f7;
                        this.onMouseEnter = _3fa || noop;
                        this.onMouseLeave = _3fb || noop;
                    },
                    orient: function(node, _3fe, _3ff, _400, _401) {
                        this.connectorNode.style.top = "";
                        var _402 = _400.h,
                            _403 = _400.w;
                        node.className = "dijitTooltip " + { "MR-ML": "dijitTooltipRight", "ML-MR": "dijitTooltipLeft", "TM-BM": "dijitTooltipAbove", "BM-TM": "dijitTooltipBelow", "BL-TL": "dijitTooltipBelow dijitTooltipABLeft", "TL-BL": "dijitTooltipAbove dijitTooltipABLeft", "BR-TR": "dijitTooltipBelow dijitTooltipABRight", "TR-BR": "dijitTooltipAbove dijitTooltipABRight", "BR-BL": "dijitTooltipRight", "BL-BR": "dijitTooltipLeft" }[_3fe + "-" + _3ff];
                        this.domNode.style.width = "auto";
                        var size = _3eb.position(this.domNode);
                        if (has("ie") || has("trident")) { size.w += 2; }
                        var _404 = Math.min((Math.max(_403, 1)), size.w);
                        _3eb.setMarginBox(this.domNode, { w: _404 });
                        if (_3ff.charAt(0) == "B" && _3fe.charAt(0) == "B") {
                            var bb = _3eb.position(node);
                            var _405 = this.connectorNode.offsetHeight;
                            if (bb.h > _402) {
                                var _406 = _402 - ((_401.h + _405) >> 1);
                                this.connectorNode.style.top = _406 + "px";
                                this.connectorNode.style.bottom = "";
                            } else {
                                this.connectorNode.style.bottom = Math.min(Math.max(_401.h / 2 - _405 / 2, 0), bb.h - _405) + "px";
                                this.connectorNode.style.top = "";
                            }
                        } else {
                            this.connectorNode.style.top = "";
                            this.connectorNode.style.bottom = "";
                        }
                        return Math.max(0, size.w - _403);
                    },
                    _onShow: function() { if (has("ie")) { this.domNode.style.filter = ""; } },
                    hide: function(_407) {
                        if (this._onDeck && this._onDeck[1] == _407) { this._onDeck = null; } else {
                            if (this.aroundNode === _407) {
                                this.fadeIn.stop();
                                this.isShowingNow = false;
                                this.aroundNode = null;
                                this.fadeOut.play();
                            } else {}
                        }
                        this.onMouseEnter = this.onMouseLeave = noop;
                    },
                    _onHide: function() {
                        this.domNode.style.cssText = "";
                        this.containerNode.innerHTML = "";
                        if (this._onDeck) {
                            this.show.apply(this, this._onDeck);
                            this._onDeck = null;
                        }
                    }
                });
                if (has("dojo-bidi")) {
                    _3f5.extend({
                        _setAutoTextDir: function(node) {
                            this.applyTextDir(node);
                            _3e8.forEach(node.children, function(_408) { this._setAutoTextDir(_408); }, this);
                        },
                        _setTextDirAttr: function(_409) { this._set("textDir", _409); if (_409 == "auto") { this._setAutoTextDir(this.containerNode); } else { this.containerNode.dir = this.textDir; } }
                    });
                }
                _3f4.showTooltip = function(_40a, _40b, _40c, rtl, _40d, _40e, _40f) { if (_40c) { _40c = _3e8.map(_40c, function(val) { return { after: "after-centered", before: "before-centered" }[val] || val; }); } if (!_3fc._masterTT) { _3f4._masterTT = _3fc._masterTT = new _3f5(); } return _3fc._masterTT.show(_40a, _40b, _40c, rtl, _40d, _40e, _40f); };
                _3f4.hideTooltip = function(_410) { return _3fc._masterTT && _3fc._masterTT.hide(_410); };
                var _411 = "DORMANT",
                    _412 = "SHOW TIMER",
                    _413 = "SHOWING",
                    _414 = "HIDE TIMER";

                function noop() {};
                var _3fc = _3e9("dijit.Tooltip", _3f0, {
                    label: "",
                    showDelay: 400,
                    hideDelay: 400,
                    connectId: [],
                    position: [],
                    selector: "",
                    _setConnectIdAttr: function(_415) {
                        _3e8.forEach(this._connections || [], function(_416) { _3e8.forEach(_416, function(_417) { _417.remove(); }); }, this);
                        this._connectIds = _3e8.filter(lang.isArrayLike(_415) ? _415 : (_415 ? [_415] : []), function(id) { return dom.byId(id, this.ownerDocument); }, this);
                        this._connections = _3e8.map(this._connectIds, function(id) {
                            var node = dom.byId(id, this.ownerDocument),
                                _418 = this.selector,
                                _419 = _418 ? function(_41a) { return on.selector(_418, _41a); } : function(_41b) { return _41b; },
                                self = this;
                            return [on(node, _419(_3ed.enter), function() { self._onHover(this); }), on(node, _419("focusin"), function() { self._onHover(this); }), on(node, _419(_3ed.leave), lang.hitch(self, "_onUnHover")), on(node, _419("focusout"), lang.hitch(self, "set", "state", _411))];
                        }, this);
                        this._set("connectId", _415);
                    },
                    addTarget: function(node) { var id = node.id || node; if (_3e8.indexOf(this._connectIds, id) == -1) { this.set("connectId", this._connectIds.concat(id)); } },
                    removeTarget: function(node) {
                        var id = node.id || node,
                            idx = _3e8.indexOf(this._connectIds, id);
                        if (idx >= 0) {
                            this._connectIds.splice(idx, 1);
                            this.set("connectId", this._connectIds);
                        }
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        _3ea.add(this.domNode, "dijitTooltipData");
                    },
                    startup: function() {
                        this.inherited(arguments);
                        var ids = this.connectId;
                        _3e8.forEach(lang.isArrayLike(ids) ? ids : [ids], this.addTarget, this);
                    },
                    getContent: function(node) { return this.label || this.domNode.innerHTML; },
                    state: _411,
                    _setStateAttr: function(val) {
                        if (this.state == val || (val == _412 && this.state == _413) || (val == _414 && this.state == _411)) { return; }
                        if (this._hideTimer) {
                            this._hideTimer.remove();
                            delete this._hideTimer;
                        }
                        if (this._showTimer) {
                            this._showTimer.remove();
                            delete this._showTimer;
                        }
                        switch (val) {
                            case _411:
                                if (this._connectNode) {
                                    _3fc.hide(this._connectNode);
                                    delete this._connectNode;
                                    this.onHide();
                                }
                                break;
                            case _412:
                                if (this.state != _413) { this._showTimer = this.defer(function() { this.set("state", _413); }, this.showDelay); }
                                break;
                            case _413:
                                var _41c = this.getContent(this._connectNode);
                                if (!_41c) { this.set("state", _411); return; }
                                _3fc.show(_41c, this._connectNode, this.position, !this.isLeftToRight(), this.textDir, lang.hitch(this, "set", "state", _413), lang.hitch(this, "set", "state", _414));
                                this.onShow(this._connectNode, this.position);
                                break;
                            case _414:
                                this._hideTimer = this.defer(function() { this.set("state", _411); }, this.hideDelay);
                                break;
                        }
                        this._set("state", val);
                    },
                    _onHover: function(_41d) {
                        if (this._connectNode && _41d != this._connectNode) { this.set("state", _411); }
                        this._connectNode = _41d;
                        this.set("state", _412);
                    },
                    _onUnHover: function(_41e) { this.set("state", _414); },
                    open: function(_41f) {
                        this.set("state", _411);
                        this._connectNode = _41f;
                        this.set("state", _413);
                    },
                    close: function() { this.set("state", _411); },
                    onShow: function() {},
                    onHide: function() {},
                    destroy: function() {
                        this.set("state", _411);
                        _3e8.forEach(this._connections || [], function(_420) { _3e8.forEach(_420, function(_421) { _421.remove(); }); }, this);
                        this.inherited(arguments);
                    }
                });
                _3fc._MasterTooltip = _3f5;
                _3fc.show = _3f4.showTooltip;
                _3fc.hide = _3f4.hideTooltip;
                _3fc.defaultPosition = ["after-centered", "before-centered"];
                return _3fc;
            });
        },
        "dijit/form/ComboBoxMixin": function() {
            define(["dojo/_base/declare", "dojo/Deferred", "dojo/_base/kernel", "dojo/_base/lang", "dojo/store/util/QueryResults", "./_AutoCompleterMixin", "./_ComboBoxMenu", "../_HasDropDown", "dojo/text!./templates/DropDownBox.html"], function(_422, _423, _424, lang, _425, _426, _427, _428, _429) {
                return _422("dijit.form.ComboBoxMixin", [_428, _426], {
                    dropDownClass: _427,
                    hasDownArrow: true,
                    templateString: _429,
                    baseClass: "dijitTextBox dijitComboBox",
                    cssStateNodes: { "_buttonNode": "dijitDownArrowButton" },
                    _setHasDownArrowAttr: function(val) {
                        this._set("hasDownArrow", val);
                        this._buttonNode.style.display = val ? "" : "none";
                    },
                    _showResultList: function() {
                        this.displayMessage("");
                        this.inherited(arguments);
                    },
                    _setStoreAttr: function(_42a) {
                        if (!_42a.get) {
                            lang.mixin(_42a, {
                                _oldAPI: true,
                                get: function(id) {
                                    var _42b = new _423();
                                    this.fetchItemByIdentity({ identity: id, onItem: function(_42c) { _42b.resolve(_42c); }, onError: function(_42d) { _42b.reject(_42d); } });
                                    return _42b.promise;
                                },
                                query: function(_42e, _42f) {
                                    var _430 = new _423(function() { _431.abort && _431.abort(); });
                                    _430.total = new _423();
                                    var _431 = this.fetch(lang.mixin({ query: _42e, onBegin: function(_432) { _430.total.resolve(_432); }, onComplete: function(_433) { _430.resolve(_433); }, onError: function(_434) { _430.reject(_434); } }, _42f));
                                    return _425(_430);
                                }
                            });
                        }
                        this._set("store", _42a);
                    },
                    postMixInProperties: function() {
                        var _435 = this.params.store || this.store;
                        if (_435) { this._setStoreAttr(_435); }
                        this.inherited(arguments);
                        if (!this.params.store && this.store && !this.store._oldAPI) {
                            var _436 = this.declaredClass;
                            lang.mixin(this.store, {
                                getValue: function(item, attr) { _424.deprecated(_436 + ".store.getValue(item, attr) is deprecated for builtin store.  Use item.attr directly", "", "2.0"); return item[attr]; },
                                getLabel: function(item) { _424.deprecated(_436 + ".store.getLabel(item) is deprecated for builtin store.  Use item.label directly", "", "2.0"); return item.name; },
                                fetch: function(args) {
                                    _424.deprecated(_436 + ".store.fetch() is deprecated for builtin store.", "Use store.query()", "2.0");
                                    var shim = ["dojo/data/ObjectStore"];
                                    require(shim, lang.hitch(this, function(_437) { new _437({ objectStore: this }).fetch(args); }));
                                }
                            });
                        }
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        this.focusNode.setAttribute("aria-autocomplete", this.autoComplete ? "both" : "list");
                    }
                });
            });
        },
        "dijit/form/_AutoCompleterMixin": function() {
            define(["dojo/aspect", "dojo/_base/declare", "dojo/dom-attr", "dojo/keys", "dojo/_base/lang", "dojo/query", "dojo/regexp", "dojo/sniff", "./DataList", "./_TextBoxMixin", "./_SearchMixin"], function(_438, _439, _43a, keys, lang, _43b, _43c, has, _43d, _43e, _43f) {
                var _440 = _439("dijit.form._AutoCompleterMixin", _43f, {
                    item: null,
                    autoComplete: true,
                    highlightMatch: "first",
                    labelAttr: "",
                    labelType: "text",
                    maxHeight: -1,
                    _stopClickEvents: false,
                    _getCaretPos: function(_441) {
                        var pos = 0;
                        if (typeof(_441.selectionStart) == "number") { pos = _441.selectionStart; } else {
                            if (has("ie")) {
                                var tr = _441.ownerDocument.selection.createRange().duplicate();
                                var ntr = _441.createTextRange();
                                tr.move("character", 0);
                                ntr.move("character", 0);
                                try {
                                    ntr.setEndPoint("EndToEnd", tr);
                                    pos = String(ntr.text).replace(/\r/g, "").length;
                                } catch (e) {}
                            }
                        }
                        return pos;
                    },
                    _setCaretPos: function(_442, _443) {
                        _443 = parseInt(_443);
                        _43e.selectInputText(_442, _443, _443);
                    },
                    _setDisabledAttr: function(_444) {
                        this.inherited(arguments);
                        this.domNode.setAttribute("aria-disabled", _444 ? "true" : "false");
                    },
                    _onKey: function(evt) {
                        if (evt.charCode >= 32) { return; }
                        var key = evt.charCode || evt.keyCode;
                        if (key == keys.ALT || key == keys.CTRL || key == keys.META || key == keys.SHIFT) { return; }
                        var pw = this.dropDown;
                        var _445 = null;
                        this._abortQuery();
                        this.inherited(arguments);
                        if (evt.altKey || evt.ctrlKey || evt.metaKey) { return; }
                        if (this._opened) { _445 = pw.getHighlightedOption(); }
                        switch (key) {
                            case keys.PAGE_DOWN:
                            case keys.DOWN_ARROW:
                            case keys.PAGE_UP:
                            case keys.UP_ARROW:
                                if (this._opened) { this._announceOption(_445); }
                                evt.stopPropagation();
                                evt.preventDefault();
                                break;
                            case keys.ENTER:
                                if (_445) {
                                    if (_445 == pw.nextButton) {
                                        this._nextSearch(1);
                                        evt.stopPropagation();
                                        evt.preventDefault();
                                        break;
                                    } else {
                                        if (_445 == pw.previousButton) {
                                            this._nextSearch(-1);
                                            evt.stopPropagation();
                                            evt.preventDefault();
                                            break;
                                        }
                                    }
                                    evt.stopPropagation();
                                    evt.preventDefault();
                                } else {
                                    this._setBlurValue();
                                    this._setCaretPos(this.focusNode, this.focusNode.value.length);
                                }
                            case keys.TAB:
                                var _446 = this.get("displayedValue");
                                if (pw && (_446 == pw._messages["previousMessage"] || _446 == pw._messages["nextMessage"])) { break; }
                                if (_445) { this._selectOption(_445); }
                            case keys.ESCAPE:
                                if (this._opened) {
                                    this._lastQuery = null;
                                    this.closeDropDown();
                                }
                                break;
                        }
                    },
                    _autoCompleteText: function(text) {
                        var fn = this.focusNode;
                        _43e.selectInputText(fn, fn.value.length);
                        var _447 = this.ignoreCase ? "toLowerCase" : "substr";
                        if (text[_447](0).indexOf(this.focusNode.value[_447](0)) == 0) {
                            var cpos = this.autoComplete ? this._getCaretPos(fn) : fn.value.length;
                            if ((cpos + 1) > fn.value.length) {
                                fn.value = text;
                                _43e.selectInputText(fn, cpos);
                            }
                        } else {
                            fn.value = text;
                            _43e.selectInputText(fn);
                        }
                    },
                    _openResultList: function(_448, _449, _44a) {
                        var _44b = this.dropDown.getHighlightedOption();
                        this.dropDown.clearResultList();
                        if (!_448.length && _44a.start == 0) { this.closeDropDown(); return; }
                        this._nextSearch = this.dropDown.onPage = lang.hitch(this, function(_44c) {
                            _448.nextPage(_44c !== -1);
                            this.focus();
                        });
                        this.dropDown.createOptions(_448, _44a, lang.hitch(this, "_getMenuLabelFromItem"));
                        this._showResultList();
                        if ("direction" in _44a) { if (_44a.direction) { this.dropDown.highlightFirstOption(); } else { if (!_44a.direction) { this.dropDown.highlightLastOption(); } } if (_44b) { this._announceOption(this.dropDown.getHighlightedOption()); } } else { if (this.autoComplete && !this._prev_key_backspace && !/^[*]+$/.test(_449[this.searchAttr].toString())) { this._announceOption(this.dropDown.containerNode.firstChild.nextSibling); } }
                    },
                    _showResultList: function() {
                        this.closeDropDown(true);
                        this.openDropDown();
                        this.domNode.setAttribute("aria-expanded", "true");
                    },
                    loadDropDown: function() { this._startSearchAll(); },
                    isLoaded: function() { return false; },
                    closeDropDown: function() {
                        this._abortQuery();
                        if (this._opened) {
                            this.inherited(arguments);
                            this.domNode.setAttribute("aria-expanded", "false");
                        }
                    },
                    _setBlurValue: function() {
                        var _44d = this.get("displayedValue");
                        var pw = this.dropDown;
                        if (pw && (_44d == pw._messages["previousMessage"] || _44d == pw._messages["nextMessage"])) { this._setValueAttr(this._lastValueReported, true); } else {
                            if (typeof this.item == "undefined") {
                                this.item = null;
                                this.set("displayedValue", _44d);
                            } else {
                                if (this.value != this._lastValueReported) { this._handleOnChange(this.value, true); }
                                this._refreshState();
                            }
                        }
                        this.focusNode.removeAttribute("aria-activedescendant");
                    },
                    _setItemAttr: function(item, _44e, _44f) {
                        var _450 = "";
                        if (item) {
                            if (!_44f) { _44f = this.store._oldAPI ? this.store.getValue(item, this.searchAttr) : item[this.searchAttr]; }
                            _450 = this._getValueField() != this.searchAttr ? this.store.getIdentity(item) : _44f;
                        }
                        this.set("value", _450, _44e, _44f, item);
                    },
                    _announceOption: function(node) {
                        if (!node) { return; }
                        var _451;
                        if (node == this.dropDown.nextButton || node == this.dropDown.previousButton) {
                            _451 = node.innerHTML;
                            this.item = undefined;
                            this.value = "";
                        } else {
                            var item = this.dropDown.items[node.getAttribute("item")];
                            _451 = (this.store._oldAPI ? this.store.getValue(item, this.searchAttr) : item[this.searchAttr]).toString();
                            this.set("item", item, false, _451);
                        }
                        this.focusNode.value = this.focusNode.value.substring(0, this._lastInput.length);
                        this.focusNode.setAttribute("aria-activedescendant", _43a.get(node, "id"));
                        this._autoCompleteText(_451);
                    },
                    _selectOption: function(_452) {
                        this.closeDropDown();
                        if (_452) { this._announceOption(_452); }
                        this._setCaretPos(this.focusNode, this.focusNode.value.length);
                        this._handleOnChange(this.value, true);
                        this.focusNode.removeAttribute("aria-activedescendant");
                    },
                    _startSearchAll: function() { this._startSearch(""); },
                    _startSearchFromInput: function() {
                        this.item = undefined;
                        this.inherited(arguments);
                    },
                    _startSearch: function(key) {
                        if (!this.dropDown) {
                            var _453 = this.id + "_popup",
                                _454 = lang.isString(this.dropDownClass) ? lang.getObject(this.dropDownClass, false) : this.dropDownClass;
                            this.dropDown = new _454({ onChange: lang.hitch(this, this._selectOption), id: _453, dir: this.dir, textDir: this.textDir });
                        }
                        this._lastInput = key;
                        this.inherited(arguments);
                    },
                    _getValueField: function() { return this.searchAttr; },
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        if (!this.store && this.srcNodeRef) {
                            var _455 = this.srcNodeRef;
                            this.store = new _43d({}, _455);
                            if (!("value" in this.params)) {
                                var item = (this.item = this.store.fetchSelectedItem());
                                if (item) {
                                    var _456 = this._getValueField();
                                    this.value = this.store._oldAPI ? this.store.getValue(item, _456) : item[_456];
                                }
                            }
                        }
                    },
                    postCreate: function() {
                        var _457 = _43b("label[for=\"" + this.id + "\"]");
                        if (_457.length) {
                            if (!_457[0].id) { _457[0].id = this.id + "_label"; }
                            this.domNode.setAttribute("aria-labelledby", _457[0].id);
                        }
                        this.inherited(arguments);
                        _438.after(this, "onSearch", lang.hitch(this, "_openResultList"), true);
                    },
                    _getMenuLabelFromItem: function(item) {
                        var _458 = this.labelFunc(item, this.store),
                            _459 = this.labelType;
                        if (this.highlightMatch != "none" && this.labelType == "text" && this._lastInput) {
                            _458 = this.doHighlight(_458, this._lastInput);
                            _459 = "html";
                        }
                        return { html: _459 == "html", label: _458 };
                    },
                    doHighlight: function(_45a, find) {
                        var _45b = (this.ignoreCase ? "i" : "") + (this.highlightMatch == "all" ? "g" : ""),
                            i = this.queryExpr.indexOf("${0}");
                        find = _43c.escapeString(find);
                        return this._escapeHtml(_45a.replace(new RegExp((i == 0 ? "^" : "") + "(" + find + ")" + (i == (this.queryExpr.length - 4) ? "$" : ""), _45b), "\uffff$1\uffff")).replace(/\uFFFF([^\uFFFF]+)\uFFFF/g, "<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
                    },
                    _escapeHtml: function(str) { str = String(str).replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;"); return str; },
                    reset: function() {
                        this.item = null;
                        this.inherited(arguments);
                    },
                    labelFunc: function(item, _45c) { return (_45c._oldAPI ? _45c.getValue(item, this.labelAttr || this.searchAttr) : item[this.labelAttr || this.searchAttr]).toString(); },
                    _setValueAttr: function(_45d, _45e, _45f, item) {
                        this._set("item", item || null);
                        if (_45d == null) { _45d = ""; }
                        this.inherited(arguments);
                    }
                });
                if (has("dojo-bidi")) { _440.extend({ _setTextDirAttr: function(_460) { this.inherited(arguments); if (this.dropDown) { this.dropDown._set("textDir", _460); } } }); }
                return _440;
            });
        },
        "dojo/regexp": function() {
            define(["./_base/kernel", "./_base/lang"], function(dojo, lang) {
                var _461 = {};
                lang.setObject("dojo.regexp", _461);
                _461.escapeString = function(str, _462) { return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+\-^])/g, function(ch) { if (_462 && _462.indexOf(ch) != -1) { return ch; } return "\\" + ch; }); };
                _461.buildGroupRE = function(arr, re, _463) { if (!(arr instanceof Array)) { return re(arr); } var b = []; for (var i = 0; i < arr.length; i++) { b.push(re(arr[i])); } return _461.group(b.join("|"), _463); };
                _461.group = function(_464, _465) { return "(" + (_465 ? "?:" : "") + _464 + ")"; };
                return _461;
            });
        },
        "dijit/form/DataList": function() {
            define(["dojo/_base/declare", "dojo/dom", "dojo/_base/lang", "dojo/query", "dojo/store/Memory", "../registry"], function(_466, dom, lang, _467, _468, _469) {
                function _46a(_46b) { return { id: _46b.value, value: _46b.value, name: lang.trim(_46b.innerText || _46b.textContent || "") }; };
                return _466("dijit.form.DataList", _468, {
                    constructor: function(_46c, _46d) {
                        this.domNode = dom.byId(_46d);
                        lang.mixin(this, _46c);
                        if (this.id) { _469.add(this); }
                        this.domNode.style.display = "none";
                        this.inherited(arguments, [{ data: _467("option", this.domNode).map(_46a) }]);
                    },
                    destroy: function() { _469.remove(this.id); },
                    fetchSelectedItem: function() { var _46e = _467("> option[selected]", this.domNode)[0] || _467("> option", this.domNode)[0]; return _46e && _46a(_46e); }
                });
            });
        },
        "dijit/form/_SearchMixin": function() {
            define(["dojo/_base/declare", "dojo/keys", "dojo/_base/lang", "dojo/query", "dojo/string", "dojo/when", "../registry"], function(_46f, keys, lang, _470, _471, when, _472) {
                return _46f("dijit.form._SearchMixin", null, {
                    pageSize: Infinity,
                    store: null,
                    fetchProperties: {},
                    query: {},
                    list: "",
                    _setListAttr: function(list) { this._set("list", list); },
                    searchDelay: 200,
                    searchAttr: "name",
                    queryExpr: "${0}*",
                    ignoreCase: true,
                    _patternToRegExp: function(_473) { return new RegExp("^" + _473.replace(/(\\.)|(\*)|(\?)|\W/g, function(str, _474, star, _475) { return star ? ".*" : _475 ? "." : _474 ? _474 : "\\" + str; }) + "$", this.ignoreCase ? "mi" : "m"); },
                    _abortQuery: function() {
                        if (this.searchTimer) { this.searchTimer = this.searchTimer.remove(); }
                        if (this._queryDeferHandle) { this._queryDeferHandle = this._queryDeferHandle.remove(); }
                        if (this._fetchHandle) {
                            if (this._fetchHandle.abort) {
                                this._cancelingQuery = true;
                                this._fetchHandle.abort();
                                this._cancelingQuery = false;
                            }
                            if (this._fetchHandle.cancel) {
                                this._cancelingQuery = true;
                                this._fetchHandle.cancel();
                                this._cancelingQuery = false;
                            }
                            this._fetchHandle = null;
                        }
                    },
                    _processInput: function(evt) {
                        if (this.disabled || this.readOnly) { return; }
                        var key = evt.charOrCode;
                        this._prev_key_backspace = false;
                        if (key == keys.DELETE || key == keys.BACKSPACE) {
                            this._prev_key_backspace = true;
                            this._maskValidSubsetError = true;
                        }
                        if (!this.store) { this.onSearch(); } else { this.searchTimer = this.defer("_startSearchFromInput", 1); }
                    },
                    onSearch: function() {},
                    _startSearchFromInput: function() { this._startSearch(this.focusNode.value); },
                    _startSearch: function(text) {
                        this._abortQuery();
                        var _476 = this,
                            _470 = lang.clone(this.query),
                            _477 = { start: 0, count: this.pageSize, queryOptions: { ignoreCase: this.ignoreCase, deep: true } },
                            qs = _471.substitute(this.queryExpr, [text.replace(/([\\\*\?])/g, "\\$1")]),
                            q, _478 = function() {
                                var _479 = _476._fetchHandle = _476.store.query(_470, _477);
                                if (_476.disabled || _476.readOnly || (q !== _476._lastQuery)) { return; }
                                when(_479, function(res) {
                                    _476._fetchHandle = null;
                                    if (!_476.disabled && !_476.readOnly && (q === _476._lastQuery)) {
                                        when(_479.total, function(_47a) {
                                            res.total = _47a;
                                            var _47b = _476.pageSize;
                                            if (isNaN(_47b) || _47b > res.total) { _47b = res.total; }
                                            res.nextPage = function(_47c) {
                                                _477.direction = _47c = _47c !== false;
                                                _477.count = _47b;
                                                if (_47c) { _477.start += res.length; if (_477.start >= res.total) { _477.count = 0; } } else {
                                                    _477.start -= _47b;
                                                    if (_477.start < 0) {
                                                        _477.count = Math.max(_47b + _477.start, 0);
                                                        _477.start = 0;
                                                    }
                                                }
                                                if (_477.count <= 0) {
                                                    res.length = 0;
                                                    _476.onSearch(res, _470, _477);
                                                } else { _478(); }
                                            };
                                            _476.onSearch(res, _470, _477);
                                        });
                                    }
                                }, function(err) { _476._fetchHandle = null; if (!_476._cancelingQuery) { console.error(_476.declaredClass + " " + err.toString()); } });
                            };
                        lang.mixin(_477, this.fetchProperties);
                        if (this.store._oldAPI) { q = qs; } else {
                            q = this._patternToRegExp(qs);
                            q.toString = function() { return qs; };
                        }
                        this._lastQuery = _470[this.searchAttr] = q;
                        this._queryDeferHandle = this.defer(_478, this.searchDelay);
                    },
                    constructor: function() {
                        this.query = {};
                        this.fetchProperties = {};
                    },
                    postMixInProperties: function() {
                        if (!this.store) { var list = this.list; if (list) { this.store = _472.byId(list); } }
                        this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/form/_ComboBoxMenu": function() {
            define(["dojo/_base/declare", "dojo/dom-class", "dojo/dom-style", "dojo/keys", "../_WidgetBase", "../_TemplatedMixin", "./_ComboBoxMenuMixin", "./_ListMouseMixin"], function(_47d, _47e, _47f, keys, _480, _481, _482, _483) {
                return _47d("dijit.form._ComboBoxMenu", [_480, _481, _483, _482], {
                    templateString: "<div class='dijitReset dijitMenu' data-dojo-attach-point='containerNode' style='overflow: auto; overflow-x: hidden;' role='listbox'>" + "<div class='dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point='previousButton' role='option'></div>" + "<div class='dijitMenuItem dijitMenuNextButton' data-dojo-attach-point='nextButton' role='option'></div>" + "</div>",
                    baseClass: "dijitComboBoxMenu",
                    postCreate: function() {
                        this.inherited(arguments);
                        if (!this.isLeftToRight()) {
                            _47e.add(this.previousButton, "dijitMenuItemRtl");
                            _47e.add(this.nextButton, "dijitMenuItemRtl");
                        }
                        this.containerNode.setAttribute("role", "listbox");
                    },
                    _createMenuItem: function() {
                        var item = this.ownerDocument.createElement("div");
                        item.className = "dijitReset dijitMenuItem" + (this.isLeftToRight() ? "" : " dijitMenuItemRtl");
                        item.setAttribute("role", "option");
                        return item;
                    },
                    onHover: function(node) { _47e.add(node, "dijitMenuItemHover"); },
                    onUnhover: function(node) { _47e.remove(node, "dijitMenuItemHover"); },
                    onSelect: function(node) { _47e.add(node, "dijitMenuItemSelected"); },
                    onDeselect: function(node) { _47e.remove(node, "dijitMenuItemSelected"); },
                    _page: function(up) {
                        var _484 = 0;
                        var _485 = this.domNode.scrollTop;
                        var _486 = _47f.get(this.domNode, "height");
                        if (!this.getHighlightedOption()) { this.selectNextNode(); }
                        while (_484 < _486) {
                            var _487 = this.getHighlightedOption();
                            if (up) {
                                if (!_487.previousSibling || _487.previousSibling.style.display == "none") { break; }
                                this.selectPreviousNode();
                            } else {
                                if (!_487.nextSibling || _487.nextSibling.style.display == "none") { break; }
                                this.selectNextNode();
                            }
                            var _488 = this.domNode.scrollTop;
                            _484 += (_488 - _485) * (up ? -1 : 1);
                            _485 = _488;
                        }
                    },
                    handleKey: function(evt) {
                        switch (evt.keyCode) {
                            case keys.DOWN_ARROW:
                                this.selectNextNode();
                                return false;
                            case keys.PAGE_DOWN:
                                this._page(false);
                                return false;
                            case keys.UP_ARROW:
                                this.selectPreviousNode();
                                return false;
                            case keys.PAGE_UP:
                                this._page(true);
                                return false;
                            default:
                                return true;
                        }
                    }
                });
            });
        },
        "dijit/form/_ComboBoxMenuMixin": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-attr", "dojo/has", "dojo/i18n", "dojo/i18n!./nls/ComboBox"], function(_489, _48a, _48b, has, i18n) {
                var _48c = _48a("dijit.form._ComboBoxMenuMixin" + (has("dojo-bidi") ? "_NoBidi" : ""), null, {
                    _messages: null,
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this._messages = i18n.getLocalization("dijit.form", "ComboBox", this.lang);
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        this.previousButton.innerHTML = this._messages["previousMessage"];
                        this.nextButton.innerHTML = this._messages["nextMessage"];
                    },
                    _setValueAttr: function(_48d) {
                        this._set("value", _48d);
                        this.onChange(_48d);
                    },
                    onClick: function(node) {
                        if (node == this.previousButton) {
                            this._setSelectedAttr(null);
                            this.onPage(-1);
                        } else {
                            if (node == this.nextButton) {
                                this._setSelectedAttr(null);
                                this.onPage(1);
                            } else { this.onChange(node); }
                        }
                    },
                    onChange: function() {},
                    onPage: function() {},
                    onClose: function() { this._setSelectedAttr(null); },
                    _createOption: function(item, _48e) { var _48f = this._createMenuItem(); var _490 = _48e(item); if (_490.html) { _48f.innerHTML = _490.label; } else { _48f.appendChild(_48f.ownerDocument.createTextNode(_490.label)); } if (_48f.innerHTML == "") { _48f.innerHTML = "&#160;"; } return _48f; },
                    createOptions: function(_491, _492, _493) {
                        this.items = _491;
                        this.previousButton.style.display = (_492.start == 0) ? "none" : "";
                        _48b.set(this.previousButton, "id", this.id + "_prev");
                        _489.forEach(_491, function(item, i) {
                            var _494 = this._createOption(item, _493);
                            _494.setAttribute("item", i);
                            _48b.set(_494, "id", this.id + i);
                            this.nextButton.parentNode.insertBefore(_494, this.nextButton);
                        }, this);
                        var _495 = false;
                        if (_491.total && !_491.total.then && _491.total != -1) { if ((_492.start + _492.count) < _491.total) { _495 = true; } else { if ((_492.start + _492.count) > _491.total && _492.count == _491.length) { _495 = true; } } } else { if (_492.count == _491.length) { _495 = true; } }
                        this.nextButton.style.display = _495 ? "" : "none";
                        _48b.set(this.nextButton, "id", this.id + "_next");
                    },
                    clearResultList: function() {
                        var _496 = this.containerNode;
                        while (_496.childNodes.length > 2) { _496.removeChild(_496.childNodes[_496.childNodes.length - 2]); }
                        this._setSelectedAttr(null);
                    },
                    highlightFirstOption: function() { this.selectFirstNode(); },
                    highlightLastOption: function() { this.selectLastNode(); },
                    selectFirstNode: function() { this.inherited(arguments); if (this.getHighlightedOption() == this.previousButton) { this.selectNextNode(); } },
                    selectLastNode: function() { this.inherited(arguments); if (this.getHighlightedOption() == this.nextButton) { this.selectPreviousNode(); } },
                    getHighlightedOption: function() { return this.selected; }
                });
                if (has("dojo-bidi")) {
                    _48c = _48a("dijit.form._ComboBoxMenuMixin", _48c, {
                        _createOption: function() {
                            var _497 = this.inherited(arguments);
                            this.applyTextDir(_497);
                            return _497;
                        }
                    });
                }
                return _48c;
            });
        },
        "dijit/form/_ListMouseMixin": function() {
            define(["dojo/_base/declare", "dojo/on", "dojo/touch", "./_ListBase"], function(_498, on, _499, _49a) {
                return _498("dijit.form._ListMouseMixin", _49a, {
                    postCreate: function() {
                        this.inherited(arguments);
                        this.domNode.dojoClick = true;
                        this._listConnect("click", "_onClick");
                        this._listConnect("mousedown", "_onMouseDown");
                        this._listConnect("mouseup", "_onMouseUp");
                        this._listConnect("mouseover", "_onMouseOver");
                        this._listConnect("mouseout", "_onMouseOut");
                    },
                    _onClick: function(evt, _49b) {
                        this._setSelectedAttr(_49b, false);
                        if (this._deferredClick) { this._deferredClick.remove(); }
                        this._deferredClick = this.defer(function() {
                            this._deferredClick = null;
                            this.onClick(_49b);
                        });
                    },
                    _onMouseDown: function(evt, _49c) {
                        if (this._hoveredNode) {
                            this.onUnhover(this._hoveredNode);
                            this._hoveredNode = null;
                        }
                        this._isDragging = true;
                        this._setSelectedAttr(_49c, false);
                    },
                    _onMouseUp: function(evt, _49d) { this._isDragging = false; var _49e = this.selected; var _49f = this._hoveredNode; if (_49e && _49d == _49e) { this.defer(function() { this._onClick(evt, _49e); }); } else { if (_49f) { this.defer(function() { this._onClick(evt, _49f); }); } } },
                    _onMouseOut: function(evt, _4a0) {
                        if (this._hoveredNode) {
                            this.onUnhover(this._hoveredNode);
                            this._hoveredNode = null;
                        }
                        if (this._isDragging) { this._cancelDrag = (new Date()).getTime() + 1000; }
                    },
                    _onMouseOver: function(evt, _4a1) {
                        if (this._cancelDrag) {
                            var time = (new Date()).getTime();
                            if (time > this._cancelDrag) { this._isDragging = false; }
                            this._cancelDrag = null;
                        }
                        this._hoveredNode = _4a1;
                        this.onHover(_4a1);
                        if (this._isDragging) { this._setSelectedAttr(_4a1, false); }
                    }
                });
            });
        },
        "dijit/form/_ListBase": function() {
            define(["dojo/_base/declare", "dojo/on", "dojo/window"], function(_4a2, on, _4a3) {
                return _4a2("dijit.form._ListBase", null, {
                    selected: null,
                    _listConnect: function(_4a4, _4a5) { var self = this; return self.own(on(self.containerNode, on.selector(function(_4a6, _4a7, _4a8) { return _4a6.parentNode == _4a8; }, _4a4), function(evt) { self[_4a5](evt, this); })); },
                    selectFirstNode: function() {
                        var _4a9 = this.containerNode.firstChild;
                        while (_4a9 && _4a9.style.display == "none") { _4a9 = _4a9.nextSibling; }
                        this._setSelectedAttr(_4a9, true);
                    },
                    selectLastNode: function() {
                        var last = this.containerNode.lastChild;
                        while (last && last.style.display == "none") { last = last.previousSibling; }
                        this._setSelectedAttr(last, true);
                    },
                    selectNextNode: function() { var _4aa = this.selected; if (!_4aa) { this.selectFirstNode(); } else { var next = _4aa.nextSibling; while (next && next.style.display == "none") { next = next.nextSibling; } if (!next) { this.selectFirstNode(); } else { this._setSelectedAttr(next, true); } } },
                    selectPreviousNode: function() { var _4ab = this.selected; if (!_4ab) { this.selectLastNode(); } else { var prev = _4ab.previousSibling; while (prev && prev.style.display == "none") { prev = prev.previousSibling; } if (!prev) { this.selectLastNode(); } else { this._setSelectedAttr(prev, true); } } },
                    _setSelectedAttr: function(node, _4ac) {
                        if (this.selected != node) {
                            var _4ad = this.selected;
                            if (_4ad) { this.onDeselect(_4ad); }
                            if (node) {
                                if (_4ac) { _4a3.scrollIntoView(node); }
                                this.onSelect(node);
                            }
                            this._set("selected", node);
                        } else { if (node) { this.onSelect(node); } }
                    }
                });
            });
        },
        "dijit/_HasDropDown": function() {
            define(["dojo/_base/declare", "dojo/_base/Deferred", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/has", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/touch", "./registry", "./focus", "./popup", "./_FocusMixin"], function(_4ae, _4af, dom, _4b0, _4b1, _4b2, _4b3, has, keys, lang, on, _4b4, _4b5, _4b6, _4b7, _4b8) {
                return _4ae("dijit._HasDropDown", _4b8, {
                    _buttonNode: null,
                    _arrowWrapperNode: null,
                    _popupStateNode: null,
                    _aroundNode: null,
                    dropDown: null,
                    autoWidth: true,
                    forceWidth: false,
                    maxHeight: -1,
                    dropDownPosition: ["below", "above"],
                    _stopClickEvents: true,
                    _onDropDownMouseDown: function(e) {
                        if (this.disabled || this.readOnly) { return; }
                        if (e.type != "MSPointerDown") { e.preventDefault(); }
                        this.own(on.once(this.ownerDocument, _4b4.release, lang.hitch(this, "_onDropDownMouseUp")));
                        this.toggleDropDown();
                    },
                    _onDropDownMouseUp: function(e) {
                        var _4b9 = this.dropDown,
                            _4ba = false;
                        if (e && this._opened) { var c = _4b2.position(this._buttonNode, true); if (!(e.pageX >= c.x && e.pageX <= c.x + c.w) || !(e.pageY >= c.y && e.pageY <= c.y + c.h)) { var t = e.target; while (t && !_4ba) { if (_4b1.contains(t, "dijitPopup")) { _4ba = true; } else { t = t.parentNode; } } if (_4ba) { t = e.target; if (_4b9.onItemClick) { var _4bb; while (t && !(_4bb = _4b5.byNode(t))) { t = t.parentNode; } if (_4bb && _4bb.onClick && _4bb.getParent) { _4bb.getParent().onItemClick(_4bb, e); } } return; } } }
                        if (this._opened) {
                            if (_4b9.focus && (_4b9.autoFocus !== false || (e.type == "mouseup" && !this.hovering))) {
                                this._focusDropDownTimer = this.defer(function() {
                                    _4b9.focus();
                                    delete this._focusDropDownTimer;
                                });
                            }
                        } else { if (this.focus) { this.defer("focus"); } }
                    },
                    _onDropDownClick: function(e) {
                        if (this._stopClickEvents) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        this._buttonNode = this._buttonNode || this.focusNode || this.domNode;
                        this._popupStateNode = this._popupStateNode || this.focusNode || this._buttonNode;
                        var _4bc = { "after": this.isLeftToRight() ? "Right" : "Left", "before": this.isLeftToRight() ? "Left" : "Right", "above": "Up", "below": "Down", "left": "Left", "right": "Right" }[this.dropDownPosition[0]] || this.dropDownPosition[0] || "Down";
                        _4b1.add(this._arrowWrapperNode || this._buttonNode, "dijit" + _4bc + "ArrowButton");
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        var _4bd = this.focusNode || this.domNode;
                        this.own(on(this._buttonNode, _4b4.press, lang.hitch(this, "_onDropDownMouseDown")), on(this._buttonNode, "click", lang.hitch(this, "_onDropDownClick")), on(_4bd, "keydown", lang.hitch(this, "_onKey")), on(_4bd, "keyup", lang.hitch(this, "_onKeyUp")));
                    },
                    destroy: function() {
                        if (this._opened) { this.closeDropDown(true); }
                        if (this.dropDown) {
                            if (!this.dropDown._destroyed) { this.dropDown.destroyRecursive(); }
                            delete this.dropDown;
                        }
                        this.inherited(arguments);
                    },
                    _onKey: function(e) {
                        if (this.disabled || this.readOnly) { return; }
                        var d = this.dropDown,
                            _4be = e.target;
                        if (d && this._opened && d.handleKey) {
                            if (d.handleKey(e) === false) {
                                e.stopPropagation();
                                e.preventDefault();
                                return;
                            }
                        }
                        if (d && this._opened && e.keyCode == keys.ESCAPE) {
                            this.closeDropDown();
                            e.stopPropagation();
                            e.preventDefault();
                        } else {
                            if (!this._opened && (e.keyCode == keys.DOWN_ARROW || ((e.keyCode == keys.ENTER || (e.keyCode == keys.SPACE && (!this._searchTimer || (e.ctrlKey || e.altKey || e.metaKey)))) && ((_4be.tagName || "").toLowerCase() !== "input" || (_4be.type && _4be.type.toLowerCase() !== "text"))))) {
                                this._toggleOnKeyUp = true;
                                e.stopPropagation();
                                e.preventDefault();
                            }
                        }
                    },
                    _onKeyUp: function() {
                        if (this._toggleOnKeyUp) {
                            delete this._toggleOnKeyUp;
                            this.toggleDropDown();
                            var d = this.dropDown;
                            if (d && d.focus) { this.defer(lang.hitch(d, "focus"), 1); }
                        }
                    },
                    _onBlur: function() {
                        this.closeDropDown(false);
                        this.inherited(arguments);
                    },
                    isLoaded: function() { return true; },
                    loadDropDown: function(_4bf) { _4bf(); },
                    loadAndOpenDropDown: function() {
                        var d = new _4af(),
                            _4c0 = lang.hitch(this, function() {
                                this.openDropDown();
                                d.resolve(this.dropDown);
                            });
                        if (!this.isLoaded()) { this.loadDropDown(_4c0); } else { _4c0(); }
                        return d;
                    },
                    toggleDropDown: function() { if (this.disabled || this.readOnly) { return; } if (!this._opened) { this.loadAndOpenDropDown(); } else { this.closeDropDown(true); } },
                    openDropDown: function() {
                        var _4c1 = this.dropDown,
                            _4c2 = _4c1.domNode,
                            _4c3 = this._aroundNode || this.domNode,
                            self = this;
                        var _4c4 = _4b7.open({
                            parent: this,
                            popup: _4c1,
                            around: _4c3,
                            orient: this.dropDownPosition,
                            maxHeight: this.maxHeight,
                            onExecute: function() { self.closeDropDown(true); },
                            onCancel: function() { self.closeDropDown(true); },
                            onClose: function() {
                                _4b0.set(self._popupStateNode, "popupActive", false);
                                _4b1.remove(self._popupStateNode, "dijitHasDropDownOpen");
                                self._set("_opened", false);
                            }
                        });
                        if (this.forceWidth || (this.autoWidth && _4c3.offsetWidth > _4c1._popupWrapper.offsetWidth)) {
                            var _4c5 = _4c3.offsetWidth - _4c1._popupWrapper.offsetWidth;
                            var _4c6 = { w: _4c1.domNode.offsetWidth + _4c5 };
                            this._origStyle = _4c2.style.cssText;
                            if (lang.isFunction(_4c1.resize)) { _4c1.resize(_4c6); } else { _4b2.setMarginBox(_4c2, _4c6); }
                            if (_4c4.corner[1] == "R") { _4c1._popupWrapper.style.left = (_4c1._popupWrapper.style.left.replace("px", "") - _4c5) + "px"; }
                        }
                        _4b0.set(this._popupStateNode, "popupActive", "true");
                        _4b1.add(this._popupStateNode, "dijitHasDropDownOpen");
                        this._set("_opened", true);
                        this._popupStateNode.setAttribute("aria-expanded", "true");
                        this._popupStateNode.setAttribute("aria-owns", _4c1.id);
                        if (_4c2.getAttribute("role") !== "presentation" && !_4c2.getAttribute("aria-labelledby")) { _4c2.setAttribute("aria-labelledby", this.id); }
                        return _4c4;
                    },
                    closeDropDown: function(_4c7) {
                        if (this._focusDropDownTimer) {
                            this._focusDropDownTimer.remove();
                            delete this._focusDropDownTimer;
                        }
                        if (this._opened) {
                            this._popupStateNode.setAttribute("aria-expanded", "false");
                            if (_4c7 && this.focus) { this.focus(); }
                            _4b7.close(this.dropDown);
                            this._opened = false;
                        }
                        if (this._origStyle) {
                            this.dropDown.domNode.style.cssText = this._origStyle;
                            delete this._origStyle;
                        }
                    }
                });
            });
        },
        "dijit/_editor/plugins/LinkDialog": function() {
            define(["require", "dojo/_base/array", "dojo/_base/declare", "dojo/dom-attr", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/sniff", "dojo/query", "dojo/string", "../_Plugin", "../../form/DropDownButton", "../range"], function(_4c8, _4c9, _4ca, _4cb, keys, lang, on, has, _4cc, _4cd, _4ce, _4cf, _4d0) {
                var _4d1 = _4ca("dijit._editor.plugins.LinkDialog", _4ce, {
                    allowUnsafeHtml: false,
                    linkFilter: [
                        [/</g, "&lt;"]
                    ],
                    buttonClass: _4cf,
                    useDefaultCommand: false,
                    urlRegExp: "((https?|ftps?|file)\\://|./|../|/|)(/[a-zA-Z]{1,1}:/|)(((?:(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)\\.)*(?:[a-zA-Z](?:[-\\da-zA-Z]{0,80}[\\da-zA-Z])?)\\.?)|(((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])|(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]|(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]|(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])|0[xX]0*[\\da-fA-F]{1,8}|([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}|([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])))(\\:\\d+)?(/(?:[^?#\\s/]+/)*(?:[^?#\\s/]{0,}(?:\\?[^?#\\s/]*)?(?:#.*)?)?)?",
                    emailRegExp: "<?(mailto\\:)([!#-'*+\\-\\/-9=?A-Z^-~]+[.])*[!#-'*+\\-\\/-9=?A-Z^-~]+" + "@" + "((?:(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)\\.)+(?:[a-zA-Z](?:[-\\da-zA-Z]{0,6}[\\da-zA-Z])?)\\.?)|localhost|^[^-][a-zA-Z0-9_-]*>?",
                    htmlTemplate: "<a href=\"${urlInput}\" _djrealurl=\"${urlInput}\"" + " target=\"${targetSelect}\"" + ">${textInput}</a>",
                    tag: "a",
                    _hostRxp: /^((([^\[:]+):)?([^@]+)@)?(\[([^\]]+)\]|([^\[:]*))(:([0-9]+))?$/,
                    _userAtRxp: /^([!#-'*+\-\/-9=?A-Z^-~]+[.])*[!#-'*+\-\/-9=?A-Z^-~]+@/i,
                    linkDialogTemplate: ["<table role='presentation'><tr><td>", "<label for='${id}_urlInput'>${url}</label>", "</td><td>", "<input data-dojo-type='dijit.form.ValidationTextBox' required='true' " + "id='${id}_urlInput' name='urlInput' data-dojo-props='intermediateChanges:true'/>", "</td></tr><tr><td>", "<label for='${id}_textInput'>${text}</label>", "</td><td>", "<input data-dojo-type='dijit.form.ValidationTextBox' required='true' id='${id}_textInput' " + "name='textInput' data-dojo-props='intermediateChanges:true'/>", "</td></tr><tr><td>", "<label for='${id}_targetSelect'>${target}</label>", "</td><td>", "<select id='${id}_targetSelect' name='targetSelect' data-dojo-type='dijit.form.Select'>", "<option selected='selected' value='_self'>${currentWindow}</option>", "<option value='_blank'>${newWindow}</option>", "<option value='_top'>${topWindow}</option>", "<option value='_parent'>${parentWindow}</option>", "</select>", "</td></tr><tr><td colspan='2'>", "<button data-dojo-type='dijit.form.Button' type='submit' id='${id}_setButton'>${set}</button>", "<button data-dojo-type='dijit.form.Button' type='button' id='${id}_cancelButton'>${buttonCancel}</button>", "</td></tr></table>"].join(""),
                    _initButton: function() {
                        this.inherited(arguments);
                        this.button.loadDropDown = lang.hitch(this, "_loadDropDown");
                        this._connectTagEvents();
                    },
                    _loadDropDown: function(_4d2) {
                        _4c8(["dojo/i18n", "../../TooltipDialog", "../../registry", "../../form/Button", "../../form/Select", "../../form/ValidationTextBox", "dojo/i18n!../../nls/common", "dojo/i18n!../nls/LinkDialog"], lang.hitch(this, function(i18n, _4d3, _4d4) {
                            var _4d5 = this;
                            this.tag = this.command == "insertImage" ? "img" : "a";
                            var _4d6 = lang.delegate(i18n.getLocalization("dijit", "common", this.lang), i18n.getLocalization("dijit._editor", "LinkDialog", this.lang));
                            var _4d7 = (this.dropDown = this.button.dropDown = new _4d3({
                                title: _4d6[this.command + "Title"],
                                ownerDocument: this.editor.ownerDocument,
                                dir: this.editor.dir,
                                execute: lang.hitch(this, "setValue"),
                                onOpen: function() {
                                    _4d5._onOpenDialog();
                                    _4d3.prototype.onOpen.apply(this, arguments);
                                },
                                onCancel: function() { setTimeout(lang.hitch(_4d5, "_onCloseDialog"), 0); }
                            }));
                            _4d6.urlRegExp = this.urlRegExp;
                            _4d6.id = _4d4.getUniqueId(this.editor.id);
                            this._uniqueId = _4d6.id;
                            this._setContent(_4d7.title + "<div style='border-bottom: 1px black solid;padding-bottom:2pt;margin-bottom:4pt'></div>" + _4cd.substitute(this.linkDialogTemplate, _4d6));
                            _4d7.startup();
                            this._urlInput = _4d4.byId(this._uniqueId + "_urlInput");
                            this._textInput = _4d4.byId(this._uniqueId + "_textInput");
                            this._setButton = _4d4.byId(this._uniqueId + "_setButton");
                            this.own(_4d4.byId(this._uniqueId + "_cancelButton").on("click", lang.hitch(this.dropDown, "onCancel")));
                            if (this._urlInput) { this.own(this._urlInput.on("change", lang.hitch(this, "_checkAndFixInput"))); }
                            if (this._textInput) { this.own(this._textInput.on("change", lang.hitch(this, "_checkAndFixInput"))); }
                            this._urlRegExp = new RegExp("^" + this.urlRegExp + "$", "i");
                            this._emailRegExp = new RegExp("^" + this.emailRegExp + "$", "i");
                            this._urlInput.isValid = lang.hitch(this, function() { var _4d8 = this._urlInput.get("value"); return this._urlRegExp.test(_4d8) || this._emailRegExp.test(_4d8); });
                            this.own(on(_4d7.domNode, "keydown", lang.hitch(this, lang.hitch(this, function(e) {
                                if (e && e.keyCode == keys.ENTER && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
                                    if (!this._setButton.get("disabled")) {
                                        _4d7.onExecute();
                                        _4d7.execute(_4d7.get("value"));
                                    }
                                }
                            }))));
                            _4d2();
                        }));
                    },
                    _checkAndFixInput: function() {
                        var self = this;
                        var url = this._urlInput.get("value");
                        var _4d9 = function(url) {
                            var _4da = false;
                            var _4db = false;
                            if (url && url.length > 1) { url = lang.trim(url); if (url.indexOf("mailto:") !== 0) { if (url.indexOf("/") > 0) { if (url.indexOf("://") === -1) { if (url.charAt(0) !== "/" && url.indexOf("./") && url.indexOf("../") !== 0) { if (self._hostRxp.test(url)) { _4da = true; } } } } else { if (self._userAtRxp.test(url)) { _4db = true; } } } }
                            if (_4da) { self._urlInput.set("value", "http://" + url); }
                            if (_4db) { self._urlInput.set("value", "mailto:" + url); }
                            self._setButton.set("disabled", !self._isValid());
                        };
                        if (this._delayedCheck) {
                            clearTimeout(this._delayedCheck);
                            this._delayedCheck = null;
                        }
                        this._delayedCheck = setTimeout(function() { _4d9(url); }, 250);
                    },
                    _connectTagEvents: function() {
                        this.editor.onLoadDeferred.then(lang.hitch(this, function() {
                            this.own(on(this.editor.editNode, "mouseup", lang.hitch(this, "_onMouseUp")));
                            this.own(on(this.editor.editNode, "dblclick", lang.hitch(this, "_onDblClick")));
                        }));
                    },
                    _isValid: function() { return this._urlInput.isValid() && this._textInput.isValid(); },
                    _setContent: function(_4dc) { this.dropDown.set({ parserScope: "dojo", content: _4dc }); },
                    _checkValues: function(args) { if (args && args.urlInput) { args.urlInput = args.urlInput.replace(/"/g, "&quot;"); } if (!this.allowUnsafeHtml && args && args.textInput) { if (typeof this.linkFilter === "function") { args.textInput = this.linkFilter(args.textInput); } else { _4c9.forEach(this.linkFilter, function(_4dd) { args.textInput = args.textInput.replace(_4dd[0], _4dd[1]); }); } } return args; },
                    _createlinkEnabledImpl: function() { return true; },
                    setValue: function(args) {
                        this._onCloseDialog();
                        if (has("ie") < 9) {
                            var sel = _4d0.getSelection(this.editor.window);
                            var _4de = sel.getRangeAt(0);
                            var a = _4de.endContainer;
                            if (a.nodeType === 3) { a = a.parentNode; }
                            if (a && (a.nodeName && a.nodeName.toLowerCase() !== this.tag)) { a = this.editor.selection.getSelectedElement(this.tag); }
                            if (a && (a.nodeName && a.nodeName.toLowerCase() === this.tag)) {
                                if (this.editor.queryCommandEnabled("unlink")) {
                                    this.editor.selection.selectElementChildren(a);
                                    this.editor.execCommand("unlink");
                                }
                            }
                        }
                        args = this._checkValues(args);
                        this.editor.execCommand("inserthtml", _4cd.substitute(this.htmlTemplate, args));
                        _4cc("a", this.editor.document).forEach(function(a) { if (!a.innerHTML && !_4cb.has(a, "name")) { a.parentNode.removeChild(a); } }, this);
                    },
                    _onCloseDialog: function() { if (this.editor.focused) { this.editor.focus(); } },
                    _getCurrentValues: function(a) {
                        var url, text, _4df;
                        if (a && a.tagName.toLowerCase() === this.tag) {
                            url = a.getAttribute("_djrealurl") || a.getAttribute("href");
                            _4df = a.getAttribute("target") || "_self";
                            text = a.textContent || a.innerText;
                            this.editor.selection.selectElement(a, true);
                        } else { text = this.editor.selection.getSelectedText(); }
                        return { urlInput: url || "", textInput: text || "", targetSelect: _4df || "" };
                    },
                    _onOpenDialog: function() {
                        var a, b, fc;
                        if (has("ie")) {
                            var sel = _4d0.getSelection(this.editor.window);
                            if (sel.rangeCount) {
                                var _4e0 = sel.getRangeAt(0);
                                a = _4e0.endContainer;
                                if (a.nodeType === 3) { a = a.parentNode; }
                                if (a && (a.nodeName && a.nodeName.toLowerCase() !== this.tag)) { a = this.editor.selection.getSelectedElement(this.tag); }
                                if (!a || (a.nodeName && a.nodeName.toLowerCase() !== this.tag)) {
                                    b = this.editor.selection.getAncestorElement(this.tag);
                                    if (b && (b.nodeName && b.nodeName.toLowerCase() == this.tag)) {
                                        a = b;
                                        this.editor.selection.selectElement(a);
                                    } else {
                                        if (_4e0.startContainer === _4e0.endContainer) {
                                            fc = _4e0.startContainer.firstChild;
                                            if (fc && (fc.nodeName && fc.nodeName.toLowerCase() == this.tag)) {
                                                a = fc;
                                                this.editor.selection.selectElement(a);
                                            }
                                        }
                                    }
                                }
                            }
                        } else { a = this.editor.selection.getAncestorElement(this.tag); }
                        this.dropDown.reset();
                        this._setButton.set("disabled", true);
                        this.dropDown.set("value", this._getCurrentValues(a));
                    },
                    _onDblClick: function(e) {
                        if (e && e.target) {
                            var t = e.target;
                            var tg = t.tagName ? t.tagName.toLowerCase() : "";
                            if (tg === this.tag && _4cb.get(t, "href")) {
                                var _4e1 = this.editor;
                                this.editor.selection.selectElement(t);
                                _4e1.onDisplayChanged();
                                if (_4e1._updateTimer) {
                                    _4e1._updateTimer.remove();
                                    delete _4e1._updateTimer;
                                }
                                _4e1.onNormalizedDisplayChanged();
                                var _4e2 = this.button;
                                setTimeout(function() {
                                    _4e2.set("disabled", false);
                                    _4e2.loadAndOpenDropDown().then(function() { if (_4e2.dropDown.focus) { _4e2.dropDown.focus(); } });
                                }, 10);
                            }
                        }
                    },
                    _onMouseUp: function() {
                        if (has("ff")) {
                            var a = this.editor.selection.getAncestorElement(this.tag);
                            if (a) {
                                var _4e3 = _4d0.getSelection(this.editor.window);
                                var _4e4 = _4e3.getRangeAt(0);
                                if (_4e4.collapsed && a.childNodes.length) {
                                    var test = _4e4.cloneRange();
                                    test.selectNodeContents(a.childNodes[a.childNodes.length - 1]);
                                    test.setStart(a.childNodes[0], 0);
                                    if (_4e4.compareBoundaryPoints(test.START_TO_START, test) !== 1) { _4e4.setStartBefore(a); } else { if (_4e4.compareBoundaryPoints(test.END_TO_START, test) !== -1) { _4e4.setStartAfter(a); } }
                                }
                            }
                        }
                    }
                });
                var _4e5 = _4ca("dijit._editor.plugins.ImgLinkDialog", [_4d1], {
                    linkDialogTemplate: ["<table role='presentation'><tr><td>", "<label for='${id}_urlInput'>${url}</label>", "</td><td>", "<input dojoType='dijit.form.ValidationTextBox' regExp='${urlRegExp}' " + "required='true' id='${id}_urlInput' name='urlInput' data-dojo-props='intermediateChanges:true'/>", "</td></tr><tr><td>", "<label for='${id}_textInput'>${text}</label>", "</td><td>", "<input data-dojo-type='dijit.form.ValidationTextBox' required='false' id='${id}_textInput' " + "name='textInput' data-dojo-props='intermediateChanges:true'/>", "</td></tr><tr><td>", "</td><td>", "</td></tr><tr><td colspan='2'>", "<button data-dojo-type='dijit.form.Button' type='submit' id='${id}_setButton'>${set}</button>", "<button data-dojo-type='dijit.form.Button' type='button' id='${id}_cancelButton'>${buttonCancel}</button>", "</td></tr></table>"].join(""),
                    htmlTemplate: "<img src=\"${urlInput}\" _djrealurl=\"${urlInput}\" alt=\"${textInput}\" />",
                    tag: "img",
                    _getCurrentValues: function(img) {
                        var url, text;
                        if (img && img.tagName.toLowerCase() === this.tag) {
                            url = img.getAttribute("_djrealurl") || img.getAttribute("src");
                            text = img.getAttribute("alt");
                            this.editor.selection.selectElement(img, true);
                        } else { text = this.editor.selection.getSelectedText(); }
                        return { urlInput: url || "", textInput: text || "" };
                    },
                    _isValid: function() { return this._urlInput.isValid(); },
                    _connectTagEvents: function() {
                        this.inherited(arguments);
                        this.editor.onLoadDeferred.then(lang.hitch(this, function() { this.own(on(this.editor.editNode, "mousedown", lang.hitch(this, "_selectTag"))); }));
                    },
                    _selectTag: function(e) { if (e && e.target) { var t = e.target; var tg = t.tagName ? t.tagName.toLowerCase() : ""; if (tg === this.tag) { this.editor.selection.selectElement(t); } } },
                    _checkValues: function(args) { if (args && args.urlInput) { args.urlInput = args.urlInput.replace(/"/g, "&quot;"); } if (args && args.textInput) { args.textInput = args.textInput.replace(/"/g, "&quot;"); } return args; },
                    _onDblClick: function(e) {
                        if (e && e.target) {
                            var t = e.target;
                            var tg = t.tagName ? t.tagName.toLowerCase() : "";
                            if (tg === this.tag && _4cb.get(t, "src")) {
                                var _4e6 = this.editor;
                                this.editor.selection.selectElement(t);
                                _4e6.onDisplayChanged();
                                if (_4e6._updateTimer) {
                                    _4e6._updateTimer.remove();
                                    delete _4e6._updateTimer;
                                }
                                _4e6.onNormalizedDisplayChanged();
                                var _4e7 = this.button;
                                setTimeout(function() {
                                    _4e7.set("disabled", false);
                                    _4e7.loadAndOpenDropDown().then(function() { if (_4e7.dropDown.focus) { _4e7.dropDown.focus(); } });
                                }, 10);
                            }
                        }
                    }
                });
                _4ce.registry["createLink"] = function(args) { var _4e8 = { command: "createLink", allowUnsafeHtml: ("allowUnsafeHtml" in args) ? args.allowUnsafeHtml : false }; if ("linkFilter" in args) { _4e8.linkFilter = args.linkFilter; } return new _4d1(_4e8); };
                _4ce.registry["insertImage"] = function() { return new _4e5({ command: "insertImage" }); };
                _4d1.ImgLinkDialog = _4e5;
                return _4d1;
            });
        },
        "dijit/form/DropDownButton": function() {
            define(["dojo/_base/declare", "dojo/_base/kernel", "dojo/_base/lang", "dojo/query", "../registry", "../popup", "./Button", "../_Container", "../_HasDropDown", "dojo/text!./templates/DropDownButton.html", "../a11yclick"], function(_4e9, _4ea, lang, _4eb, _4ec, _4ed, _4ee, _4ef, _4f0, _4f1) {
                return _4e9("dijit.form.DropDownButton", [_4ee, _4ef, _4f0], {
                    baseClass: "dijitDropDownButton",
                    templateString: _4f1,
                    _fillContent: function() {
                        var _4f2 = this.srcNodeRef;
                        var dest = this.containerNode;
                        if (_4f2 && dest) {
                            while (_4f2.hasChildNodes()) {
                                var _4f3 = _4f2.firstChild;
                                if (_4f3.hasAttribute && (_4f3.hasAttribute("data-dojo-type") || _4f3.hasAttribute("dojoType") || _4f3.hasAttribute("data-" + _4ea._scopeName + "-type") || _4f3.hasAttribute(_4ea._scopeName + "Type"))) {
                                    this.dropDownContainer = this.ownerDocument.createElement("div");
                                    this.dropDownContainer.appendChild(_4f3);
                                } else { dest.appendChild(_4f3); }
                            }
                        }
                    },
                    startup: function() {
                        if (this._started) { return; }
                        if (!this.dropDown && this.dropDownContainer) {
                            this.dropDown = _4ec.byNode(this.dropDownContainer.firstChild);
                            delete this.dropDownContainer;
                        }
                        if (this.dropDown) { _4ed.hide(this.dropDown); }
                        this.inherited(arguments);
                    },
                    isLoaded: function() { var _4f4 = this.dropDown; return (!!_4f4 && (!_4f4.href || _4f4.isLoaded)); },
                    loadDropDown: function(_4f5) {
                        var _4f6 = this.dropDown;
                        var _4f7 = _4f6.on("load", lang.hitch(this, function() {
                            _4f7.remove();
                            _4f5();
                        }));
                        _4f6.refresh();
                    },
                    isFocusable: function() { return this.inherited(arguments) && !this._mouseDown; }
                });
            });
        },
        "dijit/Menu": function() {
            define(["require", "dojo/_base/array", "dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-geometry", "dojo/dom-style", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/sniff", "dojo/_base/window", "dojo/window", "./popup", "./DropDownMenu", "dojo/ready"], function(_4f8, _4f9, _4fa, dom, _4fb, _4fc, _4fd, keys, lang, on, has, win, _4fe, pm, _4ff, _500) {
                if (has("dijit-legacy-requires")) {
                    _500(0, function() {
                        var _501 = ["dijit/MenuItem", "dijit/PopupMenuItem", "dijit/CheckedMenuItem", "dijit/MenuSeparator"];
                        _4f8(_501);
                    });
                }
                return _4fa("dijit.Menu", _4ff, {
                    constructor: function() { this._bindings = []; },
                    targetNodeIds: [],
                    selector: "",
                    contextMenuForWindow: false,
                    leftClickToOpen: false,
                    refocus: true,
                    postCreate: function() {
                        if (this.contextMenuForWindow) { this.bindDomNode(this.ownerDocumentBody); } else { _4f9.forEach(this.targetNodeIds, this.bindDomNode, this); }
                        this.inherited(arguments);
                    },
                    _iframeContentWindow: function(_502) { return _4fe.get(this._iframeContentDocument(_502)) || this._iframeContentDocument(_502)["__parent__"] || (_502.name && document.frames[_502.name]) || null; },
                    _iframeContentDocument: function(_503) { return _503.contentDocument || (_503.contentWindow && _503.contentWindow.document) || (_503.name && document.frames[_503.name] && document.frames[_503.name].document) || null; },
                    bindDomNode: function(node) {
                        node = dom.byId(node, this.ownerDocument);
                        var cn;
                        if (node.tagName.toLowerCase() == "iframe") {
                            var _504 = node,
                                _505 = this._iframeContentWindow(_504);
                            cn = win.body(_505.document);
                        } else { cn = (node == win.body(this.ownerDocument) ? this.ownerDocument.documentElement : node); }
                        var _506 = { node: node, iframe: _504 };
                        _4fb.set(node, "_dijitMenu" + this.id, this._bindings.push(_506));
                        var _507 = lang.hitch(this, function(cn) {
                            var _508 = this.selector,
                                _509 = _508 ? function(_50a) { return on.selector(_508, _50a); } : function(_50b) { return _50b; },
                                self = this;
                            return [on(cn, _509(this.leftClickToOpen ? "click" : "contextmenu"), function(evt) {
                                evt.stopPropagation();
                                evt.preventDefault();
                                if ((new Date()).getTime() < self._lastKeyDown + 500) { return; }
                                self._scheduleOpen(this, _504, { x: evt.pageX, y: evt.pageY }, evt.target);
                            }), on(cn, _509("keydown"), function(evt) {
                                if (evt.keyCode == 93 || (evt.shiftKey && evt.keyCode == keys.F10) || (self.leftClickToOpen && evt.keyCode == keys.SPACE)) {
                                    evt.stopPropagation();
                                    evt.preventDefault();
                                    self._scheduleOpen(this, _504, null, evt.target);
                                    self._lastKeyDown = (new Date()).getTime();
                                }
                            })];
                        });
                        _506.connects = cn ? _507(cn) : [];
                        if (_504) {
                            _506.onloadHandler = lang.hitch(this, function() {
                                var _50c = this._iframeContentWindow(_504),
                                    cn = win.body(_50c.document);
                                _506.connects = _507(cn);
                            });
                            if (_504.addEventListener) { _504.addEventListener("load", _506.onloadHandler, false); } else { _504.attachEvent("onload", _506.onloadHandler); }
                        }
                    },
                    unBindDomNode: function(_50d) {
                        var node;
                        try { node = dom.byId(_50d, this.ownerDocument); } catch (e) { return; }
                        var _50e = "_dijitMenu" + this.id;
                        if (node && _4fb.has(node, _50e)) {
                            var bid = _4fb.get(node, _50e) - 1,
                                b = this._bindings[bid],
                                h;
                            while ((h = b.connects.pop())) { h.remove(); }
                            var _50f = b.iframe;
                            if (_50f) { if (_50f.removeEventListener) { _50f.removeEventListener("load", b.onloadHandler, false); } else { _50f.detachEvent("onload", b.onloadHandler); } }
                            _4fb.remove(node, _50e);
                            delete this._bindings[bid];
                        }
                    },
                    _scheduleOpen: function(_510, _511, _512, _513) {
                        if (!this._openTimer) {
                            this._openTimer = this.defer(function() {
                                delete this._openTimer;
                                this._openMyself({ target: _513, delegatedTarget: _510, iframe: _511, coords: _512 });
                            }, 1);
                        }
                    },
                    _openMyself: function(args) {
                        var _514 = args.target,
                            _515 = args.iframe,
                            _516 = args.coords,
                            _517 = !_516;
                        this.currentTarget = args.delegatedTarget;
                        if (_516) {
                            if (_515) {
                                var ifc = _4fc.position(_515, true),
                                    _518 = this._iframeContentWindow(_515),
                                    _519 = _4fc.docScroll(_518.document);
                                var cs = _4fd.getComputedStyle(_515),
                                    tp = _4fd.toPixelValue,
                                    left = (has("ie") && has("quirks") ? 0 : tp(_515, cs.paddingLeft)) + (has("ie") && has("quirks") ? tp(_515, cs.borderLeftWidth) : 0),
                                    top = (has("ie") && has("quirks") ? 0 : tp(_515, cs.paddingTop)) + (has("ie") && has("quirks") ? tp(_515, cs.borderTopWidth) : 0);
                                _516.x += ifc.x + left - _519.x;
                                _516.y += ifc.y + top - _519.y;
                            }
                        } else {
                            _516 = _4fc.position(_514, true);
                            _516.x += 10;
                            _516.y += 10;
                        }
                        var self = this;
                        var _51a = this._focusManager.get("prevNode");
                        var _51b = this._focusManager.get("curNode");
                        var _51c = !_51b || (dom.isDescendant(_51b, this.domNode)) ? _51a : _51b;

                        function _51d() {
                            if (self.refocus && _51c) { _51c.focus(); }
                            pm.close(self);
                        };
                        pm.open({ popup: this, x: _516.x, y: _516.y, onExecute: _51d, onCancel: _51d, orient: this.isLeftToRight() ? "L" : "R" });
                        this.focus();
                        if (!_517) { this.defer(function() { this._cleanUp(true); }); }
                        this._onBlur = function() {
                            this.inherited("_onBlur", arguments);
                            pm.close(this);
                        };
                    },
                    destroy: function() {
                        _4f9.forEach(this._bindings, function(b) { if (b) { this.unBindDomNode(b.node); } }, this);
                        this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/DropDownMenu": function() {
            define(["dojo/_base/declare", "dojo/keys", "dojo/text!./templates/Menu.html", "./_MenuBase"], function(_51e, keys, _51f, _520) {
                return _51e("dijit.DropDownMenu", _520, {
                    templateString: _51f,
                    baseClass: "dijitMenu",
                    _onUpArrow: function() { this.focusPrev(); },
                    _onDownArrow: function() { this.focusNext(); },
                    _onRightArrow: function(evt) {
                        this._moveToPopup(evt);
                        evt.stopPropagation();
                        evt.preventDefault();
                    },
                    _onLeftArrow: function(evt) {
                        if (this.parentMenu) { if (this.parentMenu._isMenuBar) { this.parentMenu.focusPrev(); } else { this.onCancel(false); } } else {
                            evt.stopPropagation();
                            evt.preventDefault();
                        }
                    }
                });
            });
        },
        "dijit/_MenuBase": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/_base/lang", "dojo/mouse", "dojo/on", "dojo/window", "./a11yclick", "./registry", "./_Widget", "./_CssStateMixin", "./_KeyNavContainer", "./_TemplatedMixin"], function(_521, _522, dom, _523, _524, lang, _525, on, _526, _527, _528, _529, _52a, _52b, _52c) {
                return _522("dijit._MenuBase", [_529, _52c, _52b, _52a], {
                    selected: null,
                    _setSelectedAttr: function(item) {
                        if (this.selected != item) {
                            if (this.selected) {
                                this.selected._setSelected(false);
                                this._onChildDeselect(this.selected);
                            }
                            if (item) { item._setSelected(true); }
                            this._set("selected", item);
                        }
                    },
                    activated: false,
                    _setActivatedAttr: function(val) {
                        _524.toggle(this.domNode, "dijitMenuActive", val);
                        _524.toggle(this.domNode, "dijitMenuPassive", !val);
                        this._set("activated", val);
                    },
                    parentMenu: null,
                    popupDelay: 500,
                    passivePopupDelay: Infinity,
                    autoFocus: false,
                    childSelector: function(node) { var _52d = _528.byNode(node); return node.parentNode == this.containerNode && _52d && _52d.focus; },
                    postCreate: function() {
                        var self = this,
                            _52e = typeof this.childSelector == "string" ? this.childSelector : lang.hitch(this, "childSelector");
                        this.own(on(this.containerNode, on.selector(_52e, _525.enter), function() { self.onItemHover(_528.byNode(this)); }), on(this.containerNode, on.selector(_52e, _525.leave), function() { self.onItemUnhover(_528.byNode(this)); }), on(this.containerNode, on.selector(_52e, _527), function(evt) {
                            self.onItemClick(_528.byNode(this), evt);
                            evt.stopPropagation();
                        }), on(this.containerNode, on.selector(_52e, "focusin"), function() { self._onItemFocus(_528.byNode(this)); }));
                        this.inherited(arguments);
                    },
                    onKeyboardSearch: function(item, evt, _52f, _530) { this.inherited(arguments); if (!!item && (_530 == -1 || (!!item.popup && _530 == 1))) { this.onItemClick(item, evt); } },
                    _keyboardSearchCompare: function(item, _531) { if (!!item.shortcutKey) { return _531 == item.shortcutKey.toLowerCase() ? -1 : 0; } return this.inherited(arguments) ? 1 : 0; },
                    onExecute: function() {},
                    onCancel: function() {},
                    _moveToPopup: function(evt) { if (this.focusedChild && this.focusedChild.popup && !this.focusedChild.disabled) { this.onItemClick(this.focusedChild, evt); } else { var _532 = this._getTopMenu(); if (_532 && _532._isMenuBar) { _532.focusNext(); } } },
                    _onPopupHover: function() {
                        this.set("selected", this.currentPopupItem);
                        this._stopPendingCloseTimer();
                    },
                    onItemHover: function(item) {
                        if (this.activated) { this.set("selected", item); if (item.popup && !item.disabled && !this.hover_timer) { this.hover_timer = this.defer(function() { this._openItemPopup(item); }, this.popupDelay); } } else {
                            if (this.passivePopupDelay < Infinity) {
                                if (this.passive_hover_timer) { this.passive_hover_timer.remove(); }
                                this.passive_hover_timer = this.defer(function() { this.onItemClick(item, { type: "click" }); }, this.passivePopupDelay);
                            }
                        }
                        this._hoveredChild = item;
                        item._set("hovering", true);
                    },
                    _onChildDeselect: function(item) {
                        this._stopPopupTimer();
                        if (this.currentPopupItem == item) {
                            this._stopPendingCloseTimer();
                            this._pendingClose_timer = this.defer(function() {
                                this._pendingClose_timer = null;
                                this.currentPopupItem = null;
                                item._closePopup();
                            }, this.popupDelay);
                        }
                    },
                    onItemUnhover: function(item) {
                        if (this._hoveredChild == item) { this._hoveredChild = null; }
                        if (this.passive_hover_timer) {
                            this.passive_hover_timer.remove();
                            this.passive_hover_timer = null;
                        }
                        item._set("hovering", false);
                    },
                    _stopPopupTimer: function() { if (this.hover_timer) { this.hover_timer = this.hover_timer.remove(); } },
                    _stopPendingCloseTimer: function() { if (this._pendingClose_timer) { this._pendingClose_timer = this._pendingClose_timer.remove(); } },
                    _getTopMenu: function() { for (var top = this; top.parentMenu; top = top.parentMenu) {} return top; },
                    onItemClick: function(item, evt) {
                        if (this.passive_hover_timer) { this.passive_hover_timer.remove(); }
                        this.focusChild(item);
                        if (item.disabled) { return false; }
                        if (item.popup) {
                            this.set("selected", item);
                            this.set("activated", true);
                            var _533 = /^key/.test(evt._origType || evt.type) || (evt.clientX == 0 && evt.clientY == 0);
                            this._openItemPopup(item, _533);
                        } else {
                            this.onExecute();
                            item._onClick ? item._onClick(evt) : item.onClick(evt);
                        }
                    },
                    _openItemPopup: function(_534, _535) {
                        if (_534 == this.currentPopupItem) { return; }
                        if (this.currentPopupItem) {
                            this._stopPendingCloseTimer();
                            this.currentPopupItem._closePopup();
                        }
                        this._stopPopupTimer();
                        var _536 = _534.popup;
                        _536.parentMenu = this;
                        this.own(this._mouseoverHandle = on.once(_536.domNode, "mouseover", lang.hitch(this, "_onPopupHover")));
                        var self = this;
                        _534._openPopup({
                            parent: this,
                            orient: this._orient || ["after", "before"],
                            onCancel: function() {
                                if (_535) { self.focusChild(_534); }
                                self._cleanUp();
                            },
                            onExecute: lang.hitch(this, "_cleanUp", true),
                            onClose: function() {
                                if (self._mouseoverHandle) {
                                    self._mouseoverHandle.remove();
                                    delete self._mouseoverHandle;
                                }
                            }
                        }, _535);
                        this.currentPopupItem = _534;
                    },
                    onOpen: function() {
                        this.isShowingNow = true;
                        this.set("activated", true);
                    },
                    onClose: function() {
                        this.set("activated", false);
                        this.set("selected", null);
                        this.isShowingNow = false;
                        this.parentMenu = null;
                    },
                    _closeChild: function() {
                        this._stopPopupTimer();
                        if (this.currentPopupItem) {
                            if (this.focused) {
                                _523.set(this.selected.focusNode, "tabIndex", this.tabIndex);
                                this.selected.focusNode.focus();
                            }
                            this.currentPopupItem._closePopup();
                            this.currentPopupItem = null;
                        }
                    },
                    _onItemFocus: function(item) {
                        if (this._hoveredChild && this._hoveredChild != item) { this.onItemUnhover(this._hoveredChild); }
                        this.set("selected", item);
                    },
                    _onBlur: function() {
                        this._cleanUp(true);
                        this.inherited(arguments);
                    },
                    _cleanUp: function(_537) { this._closeChild(); if (typeof this.isShowingNow == "undefined") { this.set("activated", false); } if (_537) { this.set("selected", null); } }
                });
            });
        },
        "dijit/MenuItem": function() {
            define(["dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/_base/kernel", "dojo/sniff", "dojo/_base/lang", "./_Widget", "./_TemplatedMixin", "./_Contained", "./_CssStateMixin", "dojo/text!./templates/MenuItem.html"], function(_538, dom, _539, _53a, _53b, has, lang, _53c, _53d, _53e, _53f, _540) {
                var _541 = _538("dijit.MenuItem" + (has("dojo-bidi") ? "_NoBidi" : ""), [_53c, _53d, _53e, _53f], {
                    templateString: _540,
                    baseClass: "dijitMenuItem",
                    label: "",
                    _setLabelAttr: function(val) {
                        this._set("label", val);
                        var _542 = "";
                        var text;
                        var ndx = val.search(/{\S}/);
                        if (ndx >= 0) {
                            _542 = val.charAt(ndx + 1);
                            var _543 = val.substr(0, ndx);
                            var _544 = val.substr(ndx + 3);
                            text = _543 + _542 + _544;
                            val = _543 + "<span class=\"dijitMenuItemShortcutKey\">" + _542 + "</span>" + _544;
                        } else { text = val; }
                        this.domNode.setAttribute("aria-label", text + " " + this.accelKey);
                        this.containerNode.innerHTML = val;
                        this._set("shortcutKey", _542);
                    },
                    iconClass: "dijitNoIcon",
                    _setIconClassAttr: { node: "iconNode", type: "class" },
                    accelKey: "",
                    disabled: false,
                    _fillContent: function(_545) { if (_545 && !("label" in this.params)) { this._set("label", _545.innerHTML); } },
                    buildRendering: function() {
                        this.inherited(arguments);
                        var _546 = this.id + "_text";
                        _539.set(this.containerNode, "id", _546);
                        if (this.accelKeyNode) { _539.set(this.accelKeyNode, "id", this.id + "_accel"); }
                        dom.setSelectable(this.domNode, false);
                    },
                    onClick: function() {},
                    focus: function() {
                        try {
                            if (has("ie") == 8) { this.containerNode.focus(); }
                            this.focusNode.focus();
                        } catch (e) {}
                    },
                    _setSelected: function(_547) { _53a.toggle(this.domNode, "dijitMenuItemSelected", _547); },
                    setLabel: function(_548) {
                        _53b.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.", "", "2.0");
                        this.set("label", _548);
                    },
                    setDisabled: function(_549) {
                        _53b.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.", "", "2.0");
                        this.set("disabled", _549);
                    },
                    _setDisabledAttr: function(_54a) {
                        this.focusNode.setAttribute("aria-disabled", _54a ? "true" : "false");
                        this._set("disabled", _54a);
                    },
                    _setAccelKeyAttr: function(_54b) {
                        if (this.accelKeyNode) {
                            this.accelKeyNode.style.display = _54b ? "" : "none";
                            this.accelKeyNode.innerHTML = _54b;
                            _539.set(this.containerNode, "colSpan", _54b ? "1" : "2");
                        }
                        this._set("accelKey", _54b);
                    }
                });
                if (has("dojo-bidi")) { _541 = _538("dijit.MenuItem", _541, { _setLabelAttr: function(val) { this.inherited(arguments); if (this.textDir === "auto") { this.applyTextDir(this.textDirNode); } } }); }
                return _541;
            });
        },
        "dijit/PopupMenuItem": function() {
            define(["dojo/_base/declare", "dojo/dom-style", "dojo/_base/lang", "dojo/query", "./popup", "./registry", "./MenuItem", "./hccss"], function(_54c, _54d, lang, _54e, pm, _54f, _550) {
                return _54c("dijit.PopupMenuItem", _550, {
                    baseClass: "dijitMenuItem dijitPopupMenuItem",
                    _fillContent: function() {
                        if (this.srcNodeRef) {
                            var _551 = _54e("*", this.srcNodeRef);
                            this.inherited(arguments, [_551[0]]);
                            this.dropDownContainer = this.srcNodeRef;
                        }
                    },
                    _openPopup: function(_552, _553) {
                        var _554 = this.popup;
                        pm.open(lang.delegate(_552, { popup: this.popup, around: this.domNode }));
                        if (_553 && _554.focus) { _554.focus(); }
                    },
                    _closePopup: function() {
                        pm.close(this.popup);
                        this.popup.parentMenu = null;
                    },
                    startup: function() {
                        if (this._started) { return; }
                        this.inherited(arguments);
                        if (!this.popup) {
                            var node = _54e("[widgetId]", this.dropDownContainer)[0];
                            this.popup = _54f.byNode(node);
                        }
                        this.ownerDocumentBody.appendChild(this.popup.domNode);
                        this.popup.domNode.setAttribute("aria-labelledby", this.containerNode.id);
                        this.popup.startup();
                        this.popup.domNode.style.display = "none";
                        if (this.arrowWrapper) { _54d.set(this.arrowWrapper, "visibility", ""); }
                        this.focusNode.setAttribute("aria-haspopup", "true");
                    },
                    destroyDescendants: function(_555) {
                        if (this.popup) {
                            if (!this.popup._destroyed) { this.popup.destroyRecursive(_555); }
                            delete this.popup;
                        }
                        this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/CheckedMenuItem": function() {
            define(["dojo/_base/declare", "dojo/dom-class", "./MenuItem", "dojo/text!./templates/CheckedMenuItem.html", "./hccss"], function(_556, _557, _558, _559) {
                return _556("dijit.CheckedMenuItem", _558, {
                    baseClass: "dijitMenuItem dijitCheckedMenuItem",
                    templateString: _559,
                    checked: false,
                    _setCheckedAttr: function(_55a) {
                        this.domNode.setAttribute("aria-checked", _55a ? "true" : "false");
                        this._set("checked", _55a);
                    },
                    iconClass: "",
                    role: "menuitemcheckbox",
                    checkedChar: "&#10003;",
                    onChange: function() {},
                    _onClick: function(evt) {
                        if (!this.disabled) {
                            this.set("checked", !this.checked);
                            this.onChange(this.checked);
                        }
                        this.onClick(evt);
                    }
                });
            });
        },
        "dijit/MenuBar": function() {
            define(["dojo/_base/declare", "dojo/keys", "./_MenuBase", "dojo/text!./templates/MenuBar.html"], function(_55b, keys, _55c, _55d) {
                return _55b("dijit.MenuBar", _55c, {
                    templateString: _55d,
                    baseClass: "dijitMenuBar",
                    popupDelay: 0,
                    _isMenuBar: true,
                    _orient: ["below"],
                    _moveToPopup: function(evt) { if (this.focusedChild && this.focusedChild.popup && !this.focusedChild.disabled) { this.onItemClick(this.focusedChild, evt); } },
                    focusChild: function(item) { this.inherited(arguments); if (this.activated && item.popup && !item.disabled) { this._openItemPopup(item, true); } },
                    _onChildDeselect: function(item) {
                        if (this.currentPopupItem == item) {
                            this.currentPopupItem = null;
                            item._closePopup();
                        }
                        this.inherited(arguments);
                    },
                    _onLeftArrow: function() { this.focusPrev(); },
                    _onRightArrow: function() { this.focusNext(); },
                    _onDownArrow: function(evt) { this._moveToPopup(evt); },
                    _onUpArrow: function() {},
                    onItemClick: function(item, evt) {
                        if (item.popup && item.popup.isShowingNow && (!/^key/.test(evt.type) || evt.keyCode !== keys.DOWN_ARROW)) {
                            item.focusNode.focus();
                            this._cleanUp(true);
                        } else { this.inherited(arguments); }
                    }
                });
            });
        },
        "dijit/MenuBarItem": function() {
            define(["dojo/_base/declare", "./MenuItem", "dojo/text!./templates/MenuBarItem.html"], function(_55e, _55f, _560) {
                var _561 = _55e("dijit._MenuBarItemMixin", null, { templateString: _560, _setIconClassAttr: null });
                var _562 = _55e("dijit.MenuBarItem", [_55f, _561], {});
                _562._MenuBarItemMixin = _561;
                return _562;
            });
        },
        "dijit/PopupMenuBarItem": function() { define(["dojo/_base/declare", "./PopupMenuItem", "./MenuBarItem"], function(_563, _564, _565) { var _566 = _565._MenuBarItemMixin; return _563("dijit.PopupMenuBarItem", [_564, _566], {}); }); },
        "dijit/MenuSeparator": function() {
            define(["dojo/_base/declare", "dojo/dom", "./_WidgetBase", "./_TemplatedMixin", "./_Contained", "dojo/text!./templates/MenuSeparator.html"], function(_567, dom, _568, _569, _56a, _56b) {
                return _567("dijit.MenuSeparator", [_568, _569, _56a], {
                    templateString: _56b,
                    buildRendering: function() {
                        this.inherited(arguments);
                        dom.setSelectable(this.domNode, false);
                    },
                    isFocusable: function() { return false; }
                });
            });
        },
        "dijit/ProgressBar": function() {
            define(["require", "dojo/_base/declare", "dojo/dom-class", "dojo/_base/lang", "dojo/number", "./_Widget", "./_TemplatedMixin", "dojo/text!./templates/ProgressBar.html"], function(_56c, _56d, _56e, lang, _56f, _570, _571, _572) {
                return _56d("dijit.ProgressBar", [_570, _571], {
                    progress: "0",
                    value: "",
                    maximum: 100,
                    places: 0,
                    indeterminate: false,
                    label: "",
                    name: "",
                    templateString: _572,
                    _indeterminateHighContrastImagePath: _56c.toUrl("./themes/a11y/indeterminate_progress.gif"),
                    postMixInProperties: function() { this.inherited(arguments); if (!(this.params && "value" in this.params)) { this.value = this.indeterminate ? Infinity : this.progress; } },
                    buildRendering: function() {
                        this.inherited(arguments);
                        this.indeterminateHighContrastImage.setAttribute("src", this._indeterminateHighContrastImagePath.toString());
                        this.update();
                    },
                    _setDirAttr: function(val) {
                        var rtl = val.toLowerCase() == "rtl";
                        _56e.toggle(this.domNode, "dijitProgressBarRtl", rtl);
                        _56e.toggle(this.domNode, "dijitProgressBarIndeterminateRtl", this.indeterminate && rtl);
                        this.inherited(arguments);
                    },
                    update: function(_573) {
                        lang.mixin(this, _573 || {});
                        var tip = this.internalProgress,
                            ap = this.domNode;
                        var _574 = 1;
                        if (this.indeterminate) { ap.removeAttribute("aria-valuenow"); } else {
                            if (String(this.progress).indexOf("%") != -1) {
                                _574 = Math.min(parseFloat(this.progress) / 100, 1);
                                this.progress = _574 * this.maximum;
                            } else {
                                this.progress = Math.min(this.progress, this.maximum);
                                _574 = this.maximum ? this.progress / this.maximum : 0;
                            }
                            ap.setAttribute("aria-valuenow", this.progress);
                        }
                        ap.setAttribute("aria-labelledby", this.labelNode.id);
                        ap.setAttribute("aria-valuemin", 0);
                        ap.setAttribute("aria-valuemax", this.maximum);
                        this.labelNode.innerHTML = this.report(_574);
                        _56e.toggle(this.domNode, "dijitProgressBarIndeterminate", this.indeterminate);
                        _56e.toggle(this.domNode, "dijitProgressBarIndeterminateRtl", this.indeterminate && !this.isLeftToRight());
                        tip.style.width = (_574 * 100) + "%";
                        this.onChange();
                    },
                    _setValueAttr: function(v) { this._set("value", v); if (v == Infinity) { this.update({ indeterminate: true }); } else { this.update({ indeterminate: false, progress: v }); } },
                    _setLabelAttr: function(_575) {
                        this._set("label", _575);
                        this.update();
                    },
                    _setIndeterminateAttr: function(_576) {
                        this._set("indeterminate", _576);
                        this.update();
                    },
                    report: function(_577) { return this.label ? this.label : (this.indeterminate ? "&#160;" : _56f.format(_577, { type: "percent", places: this.places, locale: this.lang })); },
                    onChange: function() {}
                });
            });
        },
        "dojo/number": function() {
            define(["./_base/lang", "./i18n", "./i18n!./cldr/nls/number", "./string", "./regexp"], function(lang, i18n, _578, _579, _57a) {
                var _57b = {};
                lang.setObject("dojo.number", _57b);
                _57b.format = function(_57c, _57d) {
                    _57d = lang.mixin({}, _57d || {});
                    var _57e = i18n.normalizeLocale(_57d.locale),
                        _57f = i18n.getLocalization("dojo.cldr", "number", _57e);
                    _57d.customs = _57f;
                    var _580 = _57d.pattern || _57f[(_57d.type || "decimal") + "Format"];
                    if (isNaN(_57c) || Math.abs(_57c) == Infinity) { return null; }
                    return _57b._applyPattern(_57c, _580, _57d);
                };
                _57b._numberPatternRE = /[#0,]*[#0](?:\.0*#*)?/;
                _57b._applyPattern = function(_581, _582, _583) {
                    _583 = _583 || {};
                    var _584 = _583.customs.group,
                        _585 = _583.customs.decimal,
                        _586 = _582.split(";"),
                        _587 = _586[0];
                    _582 = _586[(_581 < 0) ? 1 : 0] || ("-" + _587);
                    if (_582.indexOf("%") != -1) { _581 *= 100; } else {
                        if (_582.indexOf("‰") != -1) { _581 *= 1000; } else {
                            if (_582.indexOf("¤") != -1) {
                                _584 = _583.customs.currencyGroup || _584;
                                _585 = _583.customs.currencyDecimal || _585;
                                _582 = _582.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/, function(_588, _589, _58a, _58b) {
                                    var prop = ["symbol", "currency", "displayName"][_58a.length - 1],
                                        _58c = _583[prop] || _583.currency || "";
                                    if (!_58c) { return ""; }
                                    return _589 + _58c + _58b;
                                });
                            } else { if (_582.indexOf("E") != -1) { throw new Error("exponential notation not supported"); } }
                        }
                    }
                    var _58d = _57b._numberPatternRE;
                    var _58e = _587.match(_58d);
                    if (!_58e) { throw new Error("unable to find a number expression in pattern: " + _582); }
                    if (_583.fractional === false) { _583.places = 0; }
                    return _582.replace(_58d, _57b._formatAbsolute(_581, _58e[0], { decimal: _585, group: _584, places: _583.places, round: _583.round }));
                };
                _57b.round = function(_58f, _590, _591) { var _592 = 10 / (_591 || 10); return (_592 * +_58f).toFixed(_590) / _592; };
                if ((0.9).toFixed() == 0) {
                    var _593 = _57b.round;
                    _57b.round = function(v, p, m) {
                        var d = Math.pow(10, -p || 0),
                            a = Math.abs(v);
                        if (!v || a >= d) { d = 0; } else { a /= d; if (a < 0.5 || a >= 0.95) { d = 0; } }
                        return _593(v, p, m) + (v > 0 ? d : -d);
                    };
                }
                _57b._formatAbsolute = function(_594, _595, _596) {
                    _596 = _596 || {};
                    if (_596.places === true) { _596.places = 0; }
                    if (_596.places === Infinity) { _596.places = 6; }
                    var _597 = _595.split("."),
                        _598 = typeof _596.places == "string" && _596.places.indexOf(","),
                        _599 = _596.places;
                    if (_598) { _599 = _596.places.substring(_598 + 1); } else { if (!(_599 >= 0)) { _599 = (_597[1] || []).length; } }
                    if (!(_596.round < 0)) { _594 = _57b.round(_594, _599, _596.round); }
                    var _59a = String(Math.abs(_594)).split("."),
                        _59b = _59a[1] || "";
                    if (_597[1] || _596.places) { if (_598) { _596.places = _596.places.substring(0, _598); } var pad = _596.places !== undefined ? _596.places : (_597[1] && _597[1].lastIndexOf("0") + 1); if (pad > _59b.length) { _59a[1] = _579.pad(_59b, pad, "0", true); } if (_599 < _59b.length) { _59a[1] = _59b.substr(0, _599); } } else { if (_59a[1]) { _59a.pop(); } }
                    var _59c = _597[0].replace(",", "");
                    pad = _59c.indexOf("0");
                    if (pad != -1) { pad = _59c.length - pad; if (pad > _59a[0].length) { _59a[0] = _579.pad(_59a[0], pad); } if (_59c.indexOf("#") == -1) { _59a[0] = _59a[0].substr(_59a[0].length - pad); } }
                    var _59d = _597[0].lastIndexOf(","),
                        _59e, _59f;
                    if (_59d != -1) {
                        _59e = _597[0].length - _59d - 1;
                        var _5a0 = _597[0].substr(0, _59d);
                        _59d = _5a0.lastIndexOf(",");
                        if (_59d != -1) { _59f = _5a0.length - _59d - 1; }
                    }
                    var _5a1 = [];
                    for (var _5a2 = _59a[0]; _5a2;) {
                        var off = _5a2.length - _59e;
                        _5a1.push((off > 0) ? _5a2.substr(off) : _5a2);
                        _5a2 = (off > 0) ? _5a2.slice(0, off) : "";
                        if (_59f) {
                            _59e = _59f;
                            _59f = undefined;
                        }
                    }
                    _59a[0] = _5a1.reverse().join(_596.group || ",");
                    return _59a.join(_596.decimal || ".");
                };
                _57b.regexp = function(_5a3) { return _57b._parseInfo(_5a3).regexp; };
                _57b._parseInfo = function(_5a4) {
                    _5a4 = _5a4 || {};
                    var _5a5 = i18n.normalizeLocale(_5a4.locale),
                        _5a6 = i18n.getLocalization("dojo.cldr", "number", _5a5),
                        _5a7 = _5a4.pattern || _5a6[(_5a4.type || "decimal") + "Format"],
                        _5a8 = _5a6.group,
                        _5a9 = _5a6.decimal,
                        _5aa = 1;
                    if (_5a7.indexOf("%") != -1) { _5aa /= 100; } else {
                        if (_5a7.indexOf("‰") != -1) { _5aa /= 1000; } else {
                            var _5ab = _5a7.indexOf("¤") != -1;
                            if (_5ab) {
                                _5a8 = _5a6.currencyGroup || _5a8;
                                _5a9 = _5a6.currencyDecimal || _5a9;
                            }
                        }
                    }
                    var _5ac = _5a7.split(";");
                    if (_5ac.length == 1) { _5ac.push("-" + _5ac[0]); }
                    var re = _57a.buildGroupRE(_5ac, function(_5ad) {
                        _5ad = "(?:" + _57a.escapeString(_5ad, ".") + ")";
                        return _5ad.replace(_57b._numberPatternRE, function(_5ae) {
                            var _5af = { signed: false, separator: _5a4.strict ? _5a8 : [_5a8, ""], fractional: _5a4.fractional, decimal: _5a9, exponent: false },
                                _5b0 = _5ae.split("."),
                                _5b1 = _5a4.places;
                            if (_5b0.length == 1 && _5aa != 1) { _5b0[1] = "###"; }
                            if (_5b0.length == 1 || _5b1 === 0) { _5af.fractional = false; } else {
                                if (_5b1 === undefined) { _5b1 = _5a4.pattern ? _5b0[1].lastIndexOf("0") + 1 : Infinity; }
                                if (_5b1 && _5a4.fractional == undefined) { _5af.fractional = true; }
                                if (!_5a4.places && (_5b1 < _5b0[1].length)) { _5b1 += "," + _5b0[1].length; }
                                _5af.places = _5b1;
                            }
                            var _5b2 = _5b0[0].split(",");
                            if (_5b2.length > 1) { _5af.groupSize = _5b2.pop().length; if (_5b2.length > 1) { _5af.groupSize2 = _5b2.pop().length; } }
                            return "(" + _57b._realNumberRegexp(_5af) + ")";
                        });
                    }, true);
                    if (_5ab) {
                        re = re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g, function(_5b3, _5b4, _5b5, _5b6) {
                            var prop = ["symbol", "currency", "displayName"][_5b5.length - 1],
                                _5b7 = _57a.escapeString(_5a4[prop] || _5a4.currency || "");
                            if (!_5b7) { return ""; }
                            _5b4 = _5b4 ? "[\\s\\xa0]" : "";
                            _5b6 = _5b6 ? "[\\s\\xa0]" : "";
                            if (!_5a4.strict) { if (_5b4) { _5b4 += "*"; } if (_5b6) { _5b6 += "*"; } return "(?:" + _5b4 + _5b7 + _5b6 + ")?"; }
                            return _5b4 + _5b7 + _5b6;
                        });
                    }
                    return { regexp: re.replace(/[\xa0 ]/g, "[\\s\\xa0]"), group: _5a8, decimal: _5a9, factor: _5aa };
                };
                _57b.parse = function(_5b8, _5b9) {
                    var info = _57b._parseInfo(_5b9),
                        _5ba = (new RegExp("^" + info.regexp + "$")).exec(_5b8);
                    if (!_5ba) { return NaN; }
                    var _5bb = _5ba[1];
                    if (!_5ba[1]) {
                        if (!_5ba[2]) { return NaN; }
                        _5bb = _5ba[2];
                        info.factor *= -1;
                    }
                    _5bb = _5bb.replace(new RegExp("[" + info.group + "\\s\\xa0" + "]", "g"), "").replace(info.decimal, ".");
                    return _5bb * info.factor;
                };
                _57b._realNumberRegexp = function(_5bc) {
                    _5bc = _5bc || {};
                    if (!("places" in _5bc)) { _5bc.places = Infinity; }
                    if (typeof _5bc.decimal != "string") { _5bc.decimal = "."; }
                    if (!("fractional" in _5bc) || /^0/.test(_5bc.places)) { _5bc.fractional = [true, false]; }
                    if (!("exponent" in _5bc)) { _5bc.exponent = [true, false]; }
                    if (!("eSigned" in _5bc)) { _5bc.eSigned = [true, false]; }
                    var _5bd = _57b._integerRegexp(_5bc),
                        _5be = _57a.buildGroupRE(_5bc.fractional, function(q) { var re = ""; if (q && (_5bc.places !== 0)) { re = "\\" + _5bc.decimal; if (_5bc.places == Infinity) { re = "(?:" + re + "\\d+)?"; } else { re += "\\d{" + _5bc.places + "}"; } } return re; }, true);
                    var _5bf = _57a.buildGroupRE(_5bc.exponent, function(q) { if (q) { return "([eE]" + _57b._integerRegexp({ signed: _5bc.eSigned }) + ")"; } return ""; });
                    var _5c0 = _5bd + _5be;
                    if (_5be) { _5c0 = "(?:(?:" + _5c0 + ")|(?:" + _5be + "))"; }
                    return _5c0 + _5bf;
                };
                _57b._integerRegexp = function(_5c1) {
                    _5c1 = _5c1 || {};
                    if (!("signed" in _5c1)) { _5c1.signed = [true, false]; }
                    if (!("separator" in _5c1)) { _5c1.separator = ""; } else { if (!("groupSize" in _5c1)) { _5c1.groupSize = 3; } }
                    var _5c2 = _57a.buildGroupRE(_5c1.signed, function(q) { return q ? "[-+]" : ""; }, true);
                    var _5c3 = _57a.buildGroupRE(_5c1.separator, function(sep) {
                        if (!sep) { return "(?:\\d+)"; }
                        sep = _57a.escapeString(sep);
                        if (sep == " ") { sep = "\\s"; } else { if (sep == " ") { sep = "\\s\\xa0"; } }
                        var grp = _5c1.groupSize,
                            grp2 = _5c1.groupSize2;
                        if (grp2) { var _5c4 = "(?:0|[1-9]\\d{0," + (grp2 - 1) + "}(?:[" + sep + "]\\d{" + grp2 + "})*[" + sep + "]\\d{" + grp + "})"; return ((grp - grp2) > 0) ? "(?:" + _5c4 + "|(?:0|[1-9]\\d{0," + (grp - 1) + "}))" : _5c4; }
                        return "(?:0|[1-9]\\d{0," + (grp - 1) + "}(?:[" + sep + "]\\d{" + grp + "})*)";
                    }, true);
                    return _5c2 + _5c3;
                };
                return _57b;
            });
        },
        "dijit/TitlePane": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-geometry", "dojo/fx", "dojo/has", "dojo/_base/kernel", "dojo/keys", "./_CssStateMixin", "./_TemplatedMixin", "./layout/ContentPane", "dojo/text!./templates/TitlePane.html", "./_base/manager", "./a11yclick"], function(_5c5, _5c6, dom, _5c7, _5c8, _5c9, _5ca, has, _5cb, keys, _5cc, _5cd, _5ce, _5cf, _5d0) {
                var _5d1 = _5c6("dijit.TitlePane", [_5ce, _5cd, _5cc], {
                    title: "",
                    _setTitleAttr: { node: "titleNode", type: "innerHTML" },
                    open: true,
                    toggleable: true,
                    tabIndex: "0",
                    duration: _5d0.defaultDuration,
                    baseClass: "dijitTitlePane",
                    templateString: _5cf,
                    doLayout: false,
                    _setTooltipAttr: { node: "focusNode", type: "attribute", attribute: "title" },
                    buildRendering: function() {
                        this.inherited(arguments);
                        dom.setSelectable(this.titleNode, false);
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        if (this.toggleable) { this._trackMouseState(this.titleBarNode, this.baseClass + "Title"); }
                        var _5d2 = this.hideNode,
                            _5d3 = this.wipeNode;
                        this._wipeIn = _5ca.wipeIn({ node: _5d3, duration: this.duration, beforeBegin: function() { _5d2.style.display = ""; } });
                        this._wipeOut = _5ca.wipeOut({ node: _5d3, duration: this.duration, onEnd: function() { _5d2.style.display = "none"; } });
                    },
                    _setOpenAttr: function(open, _5d4) {
                        _5c5.forEach([this._wipeIn, this._wipeOut], function(_5d5) { if (_5d5 && _5d5.status() == "playing") { _5d5.stop(); } });
                        if (_5d4) {
                            var anim = this[open ? "_wipeIn" : "_wipeOut"];
                            anim.play();
                        } else { this.hideNode.style.display = this.wipeNode.style.display = open ? "" : "none"; }
                        if (this._started) { if (open) { this._onShow(); } else { this.onHide(); } }
                        this.containerNode.setAttribute("aria-hidden", open ? "false" : "true");
                        this.focusNode.setAttribute("aria-pressed", open ? "true" : "false");
                        this._set("open", open);
                        this._setCss();
                    },
                    _setToggleableAttr: function(_5d6) {
                        this.focusNode.setAttribute("role", _5d6 ? "button" : "heading");
                        if (_5d6) {
                            this.focusNode.setAttribute("aria-controls", this.id + "_pane");
                            this.focusNode.setAttribute("tabIndex", this.tabIndex);
                            this.focusNode.setAttribute("aria-pressed", this.open);
                        } else {
                            _5c7.remove(this.focusNode, "aria-controls");
                            _5c7.remove(this.focusNode, "tabIndex");
                            _5c7.remove(this.focusNode, "aria-pressed");
                        }
                        this._set("toggleable", _5d6);
                        this._setCss();
                    },
                    _setContentAttr: function(_5d7) {
                        if (!this.open || !this._wipeOut || this._wipeOut.status() == "playing") { this.inherited(arguments); } else {
                            if (this._wipeIn && this._wipeIn.status() == "playing") { this._wipeIn.stop(); }
                            _5c9.setMarginBox(this.wipeNode, { h: _5c9.getMarginBox(this.wipeNode).h });
                            this.inherited(arguments);
                            if (this._wipeIn) { this._wipeIn.play(); } else { this.hideNode.style.display = ""; }
                        }
                    },
                    toggle: function() { this._setOpenAttr(!this.open, true); },
                    _setCss: function() {
                        var node = this.titleBarNode || this.focusNode;
                        var _5d8 = this._titleBarClass;
                        this._titleBarClass = this.baseClass + "Title" + (this.toggleable ? "" : "Fixed") + (this.open ? "Open" : "Closed");
                        _5c8.replace(node, this._titleBarClass, _5d8 || "");
                        _5c8.replace(node, this._titleBarClass.replace("TitlePaneTitle", ""), (_5d8 || "").replace("TitlePaneTitle", ""));
                        this.arrowNodeInner.innerHTML = this.open ? "-" : "+";
                    },
                    _onTitleKey: function(e) {
                        if (e.keyCode == keys.DOWN_ARROW && this.open) {
                            this.containerNode.focus();
                            e.preventDefault();
                        }
                    },
                    _onTitleClick: function() { if (this.toggleable) { this.toggle(); } },
                    setTitle: function(_5d9) {
                        _5cb.deprecated("dijit.TitlePane.setTitle() is deprecated.  Use set('title', ...) instead.", "", "2.0");
                        this.set("title", _5d9);
                    }
                });
                if (has("dojo-bidi")) {
                    _5d1.extend({
                        _setTitleAttr: function(_5da) {
                            this._set("title", _5da);
                            this.titleNode.innerHTML = _5da;
                            this.applyTextDir(this.titleNode);
                        },
                        _setTooltipAttr: function(_5db) {
                            this._set("tooltip", _5db);
                            if (this.textDir) { _5db = this.enforceTextDirWithUcc(null, _5db); }
                            _5c7.set(this.focusNode, "title", _5db);
                        },
                        _setTextDirAttr: function(_5dc) {
                            if (this._created && this.textDir != _5dc) {
                                this._set("textDir", _5dc);
                                this.set("title", this.title);
                                this.set("tooltip", this.tooltip);
                            }
                        }
                    });
                }
                return _5d1;
            });
        },
        "dojo/fx": function() {
            define(["./_base/lang", "./Evented", "./_base/kernel", "./_base/array", "./aspect", "./_base/fx", "./dom", "./dom-style", "./dom-geometry", "./ready", "require"], function(lang, _5dd, dojo, _5de, _5df, _5e0, dom, _5e1, geom, _5e2, _5e3) {
                if (!dojo.isAsync) {
                    _5e2(0, function() {
                        var _5e4 = ["./fx/Toggler"];
                        _5e3(_5e4);
                    });
                }
                var _5e5 = dojo.fx = {};
                var _5e6 = { _fire: function(evt, args) { if (this[evt]) { this[evt].apply(this, args || []); } return this; } };
                var _5e7 = function(_5e8) {
                    this._index = -1;
                    this._animations = _5e8 || [];
                    this._current = this._onAnimateCtx = this._onEndCtx = null;
                    this.duration = 0;
                    _5de.forEach(this._animations, function(a) { if (a) { if (typeof a.duration != "undefined") { this.duration += a.duration; } if (a.delay) { this.duration += a.delay; } } }, this);
                };
                _5e7.prototype = new _5dd();
                lang.extend(_5e7, {
                    _onAnimate: function() { this._fire("onAnimate", arguments); },
                    _onEnd: function() {
                        this._onAnimateCtx.remove();
                        this._onEndCtx.remove();
                        this._onAnimateCtx = this._onEndCtx = null;
                        if (this._index + 1 == this._animations.length) { this._fire("onEnd"); } else {
                            this._current = this._animations[++this._index];
                            this._onAnimateCtx = _5df.after(this._current, "onAnimate", lang.hitch(this, "_onAnimate"), true);
                            this._onEndCtx = _5df.after(this._current, "onEnd", lang.hitch(this, "_onEnd"), true);
                            this._current.play(0, true);
                        }
                    },
                    play: function(_5e9, _5ea) {
                        if (!this._current) { this._current = this._animations[this._index = 0]; }
                        if (!_5ea && this._current.status() == "playing") { return this; }
                        var _5eb = _5df.after(this._current, "beforeBegin", lang.hitch(this, function() { this._fire("beforeBegin"); }), true),
                            _5ec = _5df.after(this._current, "onBegin", lang.hitch(this, function(arg) { this._fire("onBegin", arguments); }), true),
                            _5ed = _5df.after(this._current, "onPlay", lang.hitch(this, function(arg) {
                                this._fire("onPlay", arguments);
                                _5eb.remove();
                                _5ec.remove();
                                _5ed.remove();
                            }));
                        if (this._onAnimateCtx) { this._onAnimateCtx.remove(); }
                        this._onAnimateCtx = _5df.after(this._current, "onAnimate", lang.hitch(this, "_onAnimate"), true);
                        if (this._onEndCtx) { this._onEndCtx.remove(); }
                        this._onEndCtx = _5df.after(this._current, "onEnd", lang.hitch(this, "_onEnd"), true);
                        this._current.play.apply(this._current, arguments);
                        return this;
                    },
                    pause: function() {
                        if (this._current) {
                            var e = _5df.after(this._current, "onPause", lang.hitch(this, function(arg) {
                                this._fire("onPause", arguments);
                                e.remove();
                            }), true);
                            this._current.pause();
                        }
                        return this;
                    },
                    gotoPercent: function(_5ee, _5ef) {
                        this.pause();
                        var _5f0 = this.duration * _5ee;
                        this._current = null;
                        _5de.some(this._animations, function(a, _5f1) {
                            if (_5f0 <= a.duration) {
                                this._current = a;
                                this._index = _5f1;
                                return true;
                            }
                            _5f0 -= a.duration;
                            return false;
                        }, this);
                        if (this._current) { this._current.gotoPercent(_5f0 / this._current.duration); }
                        if (_5ef) { this.play(); }
                        return this;
                    },
                    stop: function(_5f2) {
                        if (this._current) {
                            if (_5f2) {
                                for (; this._index + 1 < this._animations.length; ++this._index) { this._animations[this._index].stop(true); }
                                this._current = this._animations[this._index];
                            }
                            var e = _5df.after(this._current, "onStop", lang.hitch(this, function(arg) {
                                this._fire("onStop", arguments);
                                e.remove();
                            }), true);
                            this._current.stop();
                        }
                        return this;
                    },
                    status: function() { return this._current ? this._current.status() : "stopped"; },
                    destroy: function() { this.stop(); if (this._onAnimateCtx) { this._onAnimateCtx.remove(); } if (this._onEndCtx) { this._onEndCtx.remove(); } }
                });
                lang.extend(_5e7, _5e6);
                _5e5.chain = function(_5f3) { return new _5e7(lang.isArray(_5f3) ? _5f3 : Array.prototype.slice.call(_5f3, 0)); };
                var _5f4 = function(_5f5) {
                    this._animations = _5f5 || [];
                    this._connects = [];
                    this._finished = 0;
                    this.duration = 0;
                    _5de.forEach(_5f5, function(a) {
                        var _5f6 = a.duration;
                        if (a.delay) { _5f6 += a.delay; }
                        if (this.duration < _5f6) { this.duration = _5f6; }
                        this._connects.push(_5df.after(a, "onEnd", lang.hitch(this, "_onEnd"), true));
                    }, this);
                    this._pseudoAnimation = new _5e0.Animation({ curve: [0, 1], duration: this.duration });
                    var self = this;
                    _5de.forEach(["beforeBegin", "onBegin", "onPlay", "onAnimate", "onPause", "onStop", "onEnd"], function(evt) { self._connects.push(_5df.after(self._pseudoAnimation, evt, function() { self._fire(evt, arguments); }, true)); });
                };
                lang.extend(_5f4, {
                    _doAction: function(_5f7, args) { _5de.forEach(this._animations, function(a) { a[_5f7].apply(a, args); }); return this; },
                    _onEnd: function() { if (++this._finished > this._animations.length) { this._fire("onEnd"); } },
                    _call: function(_5f8, args) {
                        var t = this._pseudoAnimation;
                        t[_5f8].apply(t, args);
                    },
                    play: function(_5f9, _5fa) {
                        this._finished = 0;
                        this._doAction("play", arguments);
                        this._call("play", arguments);
                        return this;
                    },
                    pause: function() {
                        this._doAction("pause", arguments);
                        this._call("pause", arguments);
                        return this;
                    },
                    gotoPercent: function(_5fb, _5fc) {
                        var ms = this.duration * _5fb;
                        _5de.forEach(this._animations, function(a) { a.gotoPercent(a.duration < ms ? 1 : (ms / a.duration), _5fc); });
                        this._call("gotoPercent", arguments);
                        return this;
                    },
                    stop: function(_5fd) {
                        this._doAction("stop", arguments);
                        this._call("stop", arguments);
                        return this;
                    },
                    status: function() { return this._pseudoAnimation.status(); },
                    destroy: function() {
                        this.stop();
                        _5de.forEach(this._connects, function(_5fe) { _5fe.remove(); });
                    }
                });
                lang.extend(_5f4, _5e6);
                _5e5.combine = function(_5ff) { return new _5f4(lang.isArray(_5ff) ? _5ff : Array.prototype.slice.call(_5ff, 0)); };
                _5e5.wipeIn = function(args) {
                    var node = args.node = dom.byId(args.node),
                        s = node.style,
                        o;
                    var anim = _5e0.animateProperty(lang.mixin({
                        properties: {
                            height: {
                                start: function() {
                                    o = s.overflow;
                                    s.overflow = "hidden";
                                    if (s.visibility == "hidden" || s.display == "none") {
                                        s.height = "1px";
                                        s.display = "";
                                        s.visibility = "";
                                        return 1;
                                    } else { var _600 = _5e1.get(node, "height"); return Math.max(_600, 1); }
                                },
                                end: function() { return node.scrollHeight; }
                            }
                        }
                    }, args));
                    var fini = function() {
                        s.height = "auto";
                        s.overflow = o;
                    };
                    _5df.after(anim, "onStop", fini, true);
                    _5df.after(anim, "onEnd", fini, true);
                    return anim;
                };
                _5e5.wipeOut = function(args) {
                    var node = args.node = dom.byId(args.node),
                        s = node.style,
                        o;
                    var anim = _5e0.animateProperty(lang.mixin({ properties: { height: { end: 1 } } }, args));
                    _5df.after(anim, "beforeBegin", function() {
                        o = s.overflow;
                        s.overflow = "hidden";
                        s.display = "";
                    }, true);
                    var fini = function() {
                        s.overflow = o;
                        s.height = "auto";
                        s.display = "none";
                    };
                    _5df.after(anim, "onStop", fini, true);
                    _5df.after(anim, "onEnd", fini, true);
                    return anim;
                };
                _5e5.slideTo = function(args) {
                    var node = args.node = dom.byId(args.node),
                        top = null,
                        left = null;
                    var init = (function(n) {
                        return function() {
                            var cs = _5e1.getComputedStyle(n);
                            var pos = cs.position;
                            top = (pos == "absolute" ? n.offsetTop : parseInt(cs.top) || 0);
                            left = (pos == "absolute" ? n.offsetLeft : parseInt(cs.left) || 0);
                            if (pos != "absolute" && pos != "relative") {
                                var ret = geom.position(n, true);
                                top = ret.y;
                                left = ret.x;
                                n.style.position = "absolute";
                                n.style.top = top + "px";
                                n.style.left = left + "px";
                            }
                        };
                    })(node);
                    init();
                    var anim = _5e0.animateProperty(lang.mixin({ properties: { top: args.top || 0, left: args.left || 0 } }, args));
                    _5df.after(anim, "beforeBegin", init, true);
                    return anim;
                };
                return _5e5;
            });
        },
        "dijit/Tree": function() {
            define(["dojo/_base/array", "dojo/aspect", "dojo/cookie", "dojo/_base/declare", "dojo/Deferred", "dojo/promise/all", "dojo/dom", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/errors/create", "dojo/fx", "dojo/has", "dojo/_base/kernel", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/topic", "dojo/touch", "dojo/when", "./a11yclick", "./focus", "./registry", "./_base/manager", "./_Widget", "./_TemplatedMixin", "./_Container", "./_Contained", "./_CssStateMixin", "./_KeyNavMixin", "dojo/text!./templates/TreeNode.html", "dojo/text!./templates/Tree.html", "./tree/TreeStoreModel", "./tree/ForestStoreModel", "./tree/_dndSelector", "dojo/query!css2"], function(_601, _602, _603, _604, _605, all, dom, _606, _607, _608, _609, _60a, has, _60b, keys, lang, on, _60c, _60d, when, _60e, _60f, _610, _611, _612, _613, _614, _615, _616, _617, _618, _619, _61a, _61b, _61c) {
                function _61d(d) { return lang.delegate(d.promise || d, { addCallback: function(_61e) { this.then(_61e); }, addErrback: function(_61f) { this.otherwise(_61f); } }); };
                var _620 = _604("dijit._TreeNode", [_612, _613, _614, _615, _616], {
                    item: null,
                    isTreeNode: true,
                    label: "",
                    _setLabelAttr: function(val) {
                        this.labelNode[this.labelType == "html" ? "innerHTML" : "innerText" in this.labelNode ? "innerText" : "textContent"] = val;
                        this._set("label", val);
                        if (has("dojo-bidi")) { this.applyTextDir(this.labelNode); }
                    },
                    labelType: "text",
                    isExpandable: null,
                    isExpanded: false,
                    state: "NotLoaded",
                    templateString: _618,
                    baseClass: "dijitTreeNode",
                    cssStateNodes: { rowNode: "dijitTreeRow" },
                    _setTooltipAttr: { node: "rowNode", type: "attribute", attribute: "title" },
                    buildRendering: function() {
                        this.inherited(arguments);
                        this._setExpando();
                        this._updateItemClasses(this.item);
                        if (this.isExpandable) { this.labelNode.setAttribute("aria-expanded", this.isExpanded); }
                        this.setSelected(false);
                    },
                    _setIndentAttr: function(_621) {
                        var _622 = (Math.max(_621, 0) * this.tree._nodePixelIndent) + "px";
                        _608.set(this.domNode, "backgroundPosition", _622 + " 0px");
                        _608.set(this.rowNode, this.isLeftToRight() ? "paddingLeft" : "paddingRight", _622);
                        _601.forEach(this.getChildren(), function(_623) { _623.set("indent", _621 + 1); });
                        this._set("indent", _621);
                    },
                    markProcessing: function() {
                        this.state = "Loading";
                        this._setExpando(true);
                    },
                    unmarkProcessing: function() { this._setExpando(false); },
                    _updateItemClasses: function(item) {
                        var tree = this.tree,
                            _624 = tree.model;
                        if (tree._v10Compat && item === _624.root) { item = null; }
                        this._applyClassAndStyle(item, "icon", "Icon");
                        this._applyClassAndStyle(item, "label", "Label");
                        this._applyClassAndStyle(item, "row", "Row");
                        this.tree._startPaint(true);
                    },
                    _applyClassAndStyle: function(item, _625, _626) {
                        var _627 = "_" + _625 + "Class";
                        var _628 = _625 + "Node";
                        var _629 = this[_627];
                        this[_627] = this.tree["get" + _626 + "Class"](item, this.isExpanded);
                        _606.replace(this[_628], this[_627] || "", _629 || "");
                        _608.set(this[_628], this.tree["get" + _626 + "Style"](item, this.isExpanded) || {});
                    },
                    _updateLayout: function() {
                        var _62a = this.getParent(),
                            _62b = !_62a || !_62a.rowNode || _62a.rowNode.style.display == "none";
                        _606.toggle(this.domNode, "dijitTreeIsRoot", _62b);
                        _606.toggle(this.domNode, "dijitTreeIsLast", !_62b && !this.getNextSibling());
                    },
                    _setExpando: function(_62c) {
                        var _62d = ["dijitTreeExpandoLoading", "dijitTreeExpandoOpened", "dijitTreeExpandoClosed", "dijitTreeExpandoLeaf"],
                            _62e = ["*", "-", "+", "*"],
                            idx = _62c ? 0 : (this.isExpandable ? (this.isExpanded ? 1 : 2) : 3);
                        _606.replace(this.expandoNode, _62d[idx], _62d);
                        this.expandoNodeText.innerHTML = _62e[idx];
                    },
                    expand: function() {
                        if (this._expandDeferred) { return _61d(this._expandDeferred); }
                        if (this._collapseDeferred) {
                            this._collapseDeferred.cancel();
                            delete this._collapseDeferred;
                        }
                        this.isExpanded = true;
                        this.labelNode.setAttribute("aria-expanded", "true");
                        if (this.tree.showRoot || this !== this.tree.rootNode) { this.containerNode.setAttribute("role", "group"); }
                        _606.add(this.contentNode, "dijitTreeContentExpanded");
                        this._setExpando();
                        this._updateItemClasses(this.item);
                        if (this == this.tree.rootNode && this.tree.showRoot) { this.tree.domNode.setAttribute("aria-expanded", "true"); }
                        var _62f = _60a.wipeIn({ node: this.containerNode, duration: _611.defaultDuration });
                        var def = (this._expandDeferred = new _605(function() { _62f.stop(); }));
                        _602.after(_62f, "onEnd", function() { def.resolve(true); }, true);
                        _62f.play();
                        return _61d(def);
                    },
                    collapse: function() {
                        if (this._collapseDeferred) { return _61d(this._collapseDeferred); }
                        if (this._expandDeferred) {
                            this._expandDeferred.cancel();
                            delete this._expandDeferred;
                        }
                        this.isExpanded = false;
                        this.labelNode.setAttribute("aria-expanded", "false");
                        if (this == this.tree.rootNode && this.tree.showRoot) { this.tree.domNode.setAttribute("aria-expanded", "false"); }
                        _606.remove(this.contentNode, "dijitTreeContentExpanded");
                        this._setExpando();
                        this._updateItemClasses(this.item);
                        var _630 = _60a.wipeOut({ node: this.containerNode, duration: _611.defaultDuration });
                        var def = (this._collapseDeferred = new _605(function() { _630.stop(); }));
                        _602.after(_630, "onEnd", function() { def.resolve(true); }, true);
                        _630.play();
                        return _61d(def);
                    },
                    indent: 0,
                    setChildItems: function(_631) {
                        var tree = this.tree,
                            _632 = tree.model,
                            defs = [];
                        var _633 = tree.focusedChild;
                        var _634 = this.getChildren();
                        _601.forEach(_634, function(_635) { _614.prototype.removeChild.call(this, _635); }, this);
                        this.defer(function() {
                            _601.forEach(_634, function(node) {
                                if (!node._destroyed && !node.getParent()) {
                                    tree.dndController.removeTreeNode(node);

                                    function _636(node) {
                                        var id = _632.getIdentity(node.item),
                                            ary = tree._itemNodesMap[id];
                                        if (ary.length == 1) { delete tree._itemNodesMap[id]; } else { var _637 = _601.indexOf(ary, node); if (_637 != -1) { ary.splice(_637, 1); } }
                                        _601.forEach(node.getChildren(), _636);
                                    };
                                    _636(node);
                                    if (tree.persist) {
                                        var _638 = _601.map(node.getTreePath(), function(item) { return tree.model.getIdentity(item); }).join("/");
                                        for (var path in tree._openedNodes) { if (path.substr(0, _638.length) == _638) { delete tree._openedNodes[path]; } }
                                        tree._saveExpandedNodes();
                                    }
                                    if (tree.lastFocusedChild && !dom.isDescendant(tree.lastFocusedChild.domNode, tree.domNode)) { delete tree.lastFocusedChild; }
                                    if (_633 && !dom.isDescendant(_633.domNode, tree.domNode)) { tree.focus(); }
                                    node.destroyRecursive();
                                }
                            });
                        });
                        this.state = "Loaded";
                        if (_631 && _631.length > 0) {
                            this.isExpandable = true;
                            _601.forEach(_631, function(item) {
                                var id = _632.getIdentity(item),
                                    _639 = tree._itemNodesMap[id],
                                    node;
                                if (_639) {
                                    for (var i = 0; i < _639.length; i++) {
                                        if (_639[i] && !_639[i].getParent()) {
                                            node = _639[i];
                                            node.set("indent", this.indent + 1);
                                            break;
                                        }
                                    }
                                }
                                if (!node) { node = this.tree._createTreeNode({ item: item, tree: tree, isExpandable: _632.mayHaveChildren(item), label: tree.getLabel(item), labelType: (tree.model && tree.model.labelType) || "text", tooltip: tree.getTooltip(item), ownerDocument: tree.ownerDocument, dir: tree.dir, lang: tree.lang, textDir: tree.textDir, indent: this.indent + 1 }); if (_639) { _639.push(node); } else { tree._itemNodesMap[id] = [node]; } }
                                this.addChild(node);
                                if (this.tree.autoExpand || this.tree._state(node)) { defs.push(tree._expandNode(node)); }
                            }, this);
                            _601.forEach(this.getChildren(), function(_63a) { _63a._updateLayout(); });
                        } else { this.isExpandable = false; }
                        if (this._setExpando) { this._setExpando(false); }
                        this._updateItemClasses(this.item);
                        var def = all(defs);
                        this.tree._startPaint(def);
                        return _61d(def);
                    },
                    getTreePath: function() {
                        var node = this;
                        var path = [];
                        while (node && node !== this.tree.rootNode) {
                            path.unshift(node.item);
                            node = node.getParent();
                        }
                        path.unshift(this.tree.rootNode.item);
                        return path;
                    },
                    getIdentity: function() { return this.tree.model.getIdentity(this.item); },
                    removeChild: function(node) {
                        this.inherited(arguments);
                        var _63b = this.getChildren();
                        if (_63b.length == 0) {
                            this.isExpandable = false;
                            this.collapse();
                        }
                        _601.forEach(_63b, function(_63c) { _63c._updateLayout(); });
                    },
                    makeExpandable: function() {
                        this.isExpandable = true;
                        this._setExpando(false);
                    },
                    setSelected: function(_63d) {
                        this.labelNode.setAttribute("aria-selected", _63d ? "true" : "false");
                        _606.toggle(this.rowNode, "dijitTreeRowSelected", _63d);
                    },
                    focus: function() { _60f.focus(this.focusNode); }
                });
                if (has("dojo-bidi")) {
                    _620.extend({
                        _setTextDirAttr: function(_63e) {
                            if (_63e && ((this.textDir != _63e) || !this._created)) {
                                this._set("textDir", _63e);
                                this.applyTextDir(this.labelNode);
                                _601.forEach(this.getChildren(), function(_63f) { _63f.set("textDir", _63e); }, this);
                            }
                        }
                    });
                }
                var Tree = _604("dijit.Tree", [_612, _617, _613, _616], {
                    baseClass: "dijitTree",
                    store: null,
                    model: null,
                    query: null,
                    label: "",
                    showRoot: true,
                    childrenAttr: ["children"],
                    paths: [],
                    path: [],
                    selectedItems: null,
                    selectedItem: null,
                    openOnClick: false,
                    openOnDblClick: false,
                    templateString: _619,
                    persist: false,
                    autoExpand: false,
                    dndController: _61c,
                    dndParams: ["onDndDrop", "itemCreator", "onDndCancel", "checkAcceptance", "checkItemAcceptance", "dragThreshold", "betweenThreshold"],
                    onDndDrop: null,
                    itemCreator: null,
                    onDndCancel: null,
                    checkAcceptance: null,
                    checkItemAcceptance: null,
                    dragThreshold: 5,
                    betweenThreshold: 0,
                    _nodePixelIndent: 19,
                    _publish: function(_640, _641) { _60c.publish(this.id, lang.mixin({ tree: this, event: _640 }, _641 || {})); },
                    postMixInProperties: function() {
                        this.tree = this;
                        if (this.autoExpand) { this.persist = false; }
                        this._itemNodesMap = {};
                        if (!this.cookieName && this.id) { this.cookieName = this.id + "SaveStateCookie"; }
                        this.expandChildrenDeferred = new _605();
                        this.pendingCommandsPromise = this.expandChildrenDeferred.promise;
                        this.inherited(arguments);
                    },
                    postCreate: function() {
                        this._initState();
                        var self = this;
                        this.own(on(this.containerNode, on.selector(".dijitTreeNode", _60d.enter), function(evt) { self._onNodeMouseEnter(_610.byNode(this), evt); }), on(this.containerNode, on.selector(".dijitTreeNode", _60d.leave), function(evt) { self._onNodeMouseLeave(_610.byNode(this), evt); }), on(this.containerNode, on.selector(".dijitTreeRow", _60e.press), function(evt) { self._onNodePress(_610.getEnclosingWidget(this), evt); }), on(this.containerNode, on.selector(".dijitTreeRow", _60e), function(evt) { self._onClick(_610.getEnclosingWidget(this), evt); }), on(this.containerNode, on.selector(".dijitTreeRow", "dblclick"), function(evt) { self._onDblClick(_610.getEnclosingWidget(this), evt); }));
                        if (!this.model) { this._store2model(); }
                        this.own(_602.after(this.model, "onChange", lang.hitch(this, "_onItemChange"), true), _602.after(this.model, "onChildrenChange", lang.hitch(this, "_onItemChildrenChange"), true), _602.after(this.model, "onDelete", lang.hitch(this, "_onItemDelete"), true));
                        this.inherited(arguments);
                        if (this.dndController) {
                            if (lang.isString(this.dndController)) { this.dndController = lang.getObject(this.dndController); }
                            var _642 = {};
                            for (var i = 0; i < this.dndParams.length; i++) { if (this[this.dndParams[i]]) { _642[this.dndParams[i]] = this[this.dndParams[i]]; } }
                            this.dndController = new this.dndController(this, _642);
                        }
                        this._load();
                        this.onLoadDeferred = _61d(this.pendingCommandsPromise);
                        this.onLoadDeferred.then(lang.hitch(this, "onLoad"));
                    },
                    _store2model: function() {
                        this._v10Compat = true;
                        _60b.deprecated("Tree: from version 2.0, should specify a model object rather than a store/query");
                        var _643 = { id: this.id + "_ForestStoreModel", store: this.store, query: this.query, childrenAttrs: this.childrenAttr };
                        if (this.params.mayHaveChildren) { _643.mayHaveChildren = lang.hitch(this, "mayHaveChildren"); }
                        if (this.params.getItemChildren) { _643.getChildren = lang.hitch(this, function(item, _644, _645) { this.getItemChildren((this._v10Compat && item === this.model.root) ? null : item, _644, _645); }); }
                        this.model = new _61b(_643);
                        this.showRoot = Boolean(this.label);
                    },
                    onLoad: function() {},
                    _load: function() {
                        this.model.getRoot(lang.hitch(this, function(item) {
                            var rn = (this.rootNode = this.tree._createTreeNode({ item: item, tree: this, isExpandable: true, label: this.label || this.getLabel(item), labelType: this.model.labelType || "text", textDir: this.textDir, indent: this.showRoot ? 0 : -1 }));
                            if (!this.showRoot) {
                                rn.rowNode.style.display = "none";
                                this.domNode.setAttribute("role", "presentation");
                                this.domNode.removeAttribute("aria-expanded");
                                this.domNode.removeAttribute("aria-multiselectable");
                                if (this["aria-label"]) {
                                    rn.containerNode.setAttribute("aria-label", this["aria-label"]);
                                    this.domNode.removeAttribute("aria-label");
                                } else {
                                    if (this["aria-labelledby"]) {
                                        rn.containerNode.setAttribute("aria-labelledby", this["aria-labelledby"]);
                                        this.domNode.removeAttribute("aria-labelledby");
                                    }
                                }
                                rn.labelNode.setAttribute("role", "presentation");
                                rn.labelNode.removeAttribute("aria-selected");
                                rn.containerNode.setAttribute("role", "tree");
                                rn.containerNode.setAttribute("aria-expanded", "true");
                                rn.containerNode.setAttribute("aria-multiselectable", !this.dndController.singular);
                            } else {
                                this.domNode.setAttribute("aria-multiselectable", !this.dndController.singular);
                                this.rootLoadingIndicator.style.display = "none";
                            }
                            this.containerNode.appendChild(rn.domNode);
                            var _646 = this.model.getIdentity(item);
                            if (this._itemNodesMap[_646]) { this._itemNodesMap[_646].push(rn); } else { this._itemNodesMap[_646] = [rn]; }
                            rn._updateLayout();
                            this._expandNode(rn).then(lang.hitch(this, function() {
                                if (!this._destroyed) {
                                    this.rootLoadingIndicator.style.display = "none";
                                    this.expandChildrenDeferred.resolve(true);
                                }
                            }));
                        }), lang.hitch(this, function(err) { console.error(this, ": error loading root: ", err); }));
                    },
                    getNodesByItem: function(item) { if (!item) { return []; } var _647 = lang.isString(item) ? item : this.model.getIdentity(item); return [].concat(this._itemNodesMap[_647]); },
                    _setSelectedItemAttr: function(item) { this.set("selectedItems", [item]); },
                    _setSelectedItemsAttr: function(_648) {
                        var tree = this;
                        return this.pendingCommandsPromise = this.pendingCommandsPromise.always(lang.hitch(this, function() {
                            var _649 = _601.map(_648, function(item) { return (!item || lang.isString(item)) ? item : tree.model.getIdentity(item); });
                            var _64a = [];
                            _601.forEach(_649, function(id) { _64a = _64a.concat(tree._itemNodesMap[id] || []); });
                            this.set("selectedNodes", _64a);
                        }));
                    },
                    _setPathAttr: function(path) { if (path.length) { return _61d(this.set("paths", [path]).then(function(_64b) { return _64b[0]; })); } else { return _61d(this.set("paths", []).then(function(_64c) { return _64c[0]; })); } },
                    _setPathsAttr: function(_64d) {
                        var tree = this;

                        function _64e(path, _64f) { var _650 = path.shift(); var _651 = _601.filter(_64f, function(node) { return node.getIdentity() == _650; })[0]; if (!!_651) { if (path.length) { return tree._expandNode(_651).then(function() { return _64e(path, _651.getChildren()); }); } else { return _651; } } else { throw new Tree.PathError("Could not expand path at " + _650); } };
                        return _61d(this.pendingCommandsPromise = this.pendingCommandsPromise.always(function() { return all(_601.map(_64d, function(path) { path = _601.map(path, function(item) { return item && lang.isObject(item) ? tree.model.getIdentity(item) : item; }); if (path.length) { return _64e(path, [tree.rootNode]); } else { throw new Tree.PathError("Empty path"); } })); }).then(function setNodes(_652) { tree.set("selectedNodes", _652); return tree.paths; }));
                    },
                    _setSelectedNodeAttr: function(node) { this.set("selectedNodes", [node]); },
                    _setSelectedNodesAttr: function(_653) { this.dndController.setSelection(_653); },
                    expandAll: function() {
                        var _654 = this;

                        function _655(node) { return _654._expandNode(node).then(function() { var _656 = _601.filter(node.getChildren() || [], function(node) { return node.isExpandable; }); return all(_601.map(_656, _655)); }); };
                        return _61d(_655(this.rootNode));
                    },
                    collapseAll: function() {
                        var _657 = this;

                        function _658(node) {
                            var _659 = _601.filter(node.getChildren() || [], function(node) { return node.isExpandable; }),
                                defs = all(_601.map(_659, _658));
                            if (!node.isExpanded || (node == _657.rootNode && !_657.showRoot)) { return defs; } else { return defs.then(function() { return _657._collapseNode(node); }); }
                        };
                        return _61d(_658(this.rootNode));
                    },
                    mayHaveChildren: function() {},
                    getItemChildren: function() {},
                    getLabel: function(item) { return this.model.getLabel(item); },
                    getIconClass: function(item, _65a) { return (!item || this.model.mayHaveChildren(item)) ? (_65a ? "dijitFolderOpened" : "dijitFolderClosed") : "dijitLeaf"; },
                    getLabelClass: function() {},
                    getRowClass: function() {},
                    getIconStyle: function() {},
                    getLabelStyle: function() {},
                    getRowStyle: function() {},
                    getTooltip: function() { return ""; },
                    _onDownArrow: function(evt, node) { var _65b = this._getNext(node); if (_65b && _65b.isTreeNode) { this.focusNode(_65b); } },
                    _onUpArrow: function(evt, node) {
                        var _65c = node.getPreviousSibling();
                        if (_65c) {
                            node = _65c;
                            while (node.isExpandable && node.isExpanded && node.hasChildren()) {
                                var _65d = node.getChildren();
                                node = _65d[_65d.length - 1];
                            }
                        } else { var _65e = node.getParent(); if (!(!this.showRoot && _65e === this.rootNode)) { node = _65e; } }
                        if (node && node.isTreeNode) { this.focusNode(node); }
                    },
                    _onRightArrow: function(evt, node) { if (node.isExpandable && !node.isExpanded) { this._expandNode(node); } else { if (node.hasChildren()) { node = node.getChildren()[0]; if (node && node.isTreeNode) { this.focusNode(node); } } } },
                    _onLeftArrow: function(evt, node) { if (node.isExpandable && node.isExpanded) { this._collapseNode(node); } else { var _65f = node.getParent(); if (_65f && _65f.isTreeNode && !(!this.showRoot && _65f === this.rootNode)) { this.focusNode(_65f); } } },
                    focusLastChild: function() { var node = this._getLast(); if (node && node.isTreeNode) { this.focusNode(node); } },
                    _getFirst: function() { return this.showRoot ? this.rootNode : this.rootNode.getChildren()[0]; },
                    _getLast: function() {
                        var node = this.rootNode;
                        while (node.isExpanded) {
                            var c = node.getChildren();
                            if (!c.length) { break; }
                            node = c[c.length - 1];
                        }
                        return node;
                    },
                    _getNext: function(node) {
                        if (node.isExpandable && node.isExpanded && node.hasChildren()) { return node.getChildren()[0]; } else {
                            while (node && node.isTreeNode) {
                                var _660 = node.getNextSibling();
                                if (_660) { return _660; }
                                node = node.getParent();
                            }
                            return null;
                        }
                    },
                    childSelector: ".dijitTreeRow",
                    isExpandoNode: function(node, _661) { return dom.isDescendant(node, _661.expandoNode) || dom.isDescendant(node, _661.expandoNodeText); },
                    _onNodePress: function(_662, e) { this.focusNode(_662); },
                    __click: function(_663, e, _664, func) {
                        var _665 = e.target,
                            _666 = this.isExpandoNode(_665, _663);
                        if (_663.isExpandable && (_664 || _666)) { this._onExpandoClick({ node: _663 }); } else {
                            this._publish("execute", { item: _663.item, node: _663, evt: e });
                            this[func](_663.item, _663, e);
                            this.focusNode(_663);
                        }
                        e.stopPropagation();
                        e.preventDefault();
                    },
                    _onClick: function(_667, e) { this.__click(_667, e, this.openOnClick, "onClick"); },
                    _onDblClick: function(_668, e) { this.__click(_668, e, this.openOnDblClick, "onDblClick"); },
                    _onExpandoClick: function(_669) {
                        var node = _669.node;
                        this.focusNode(node);
                        if (node.isExpanded) { this._collapseNode(node); } else { this._expandNode(node); }
                    },
                    onClick: function() {},
                    onDblClick: function() {},
                    onOpen: function() {},
                    onClose: function() {},
                    _getNextNode: function(node) { _60b.deprecated(this.declaredClass + "::_getNextNode(node) is deprecated. Use _getNext(node) instead.", "", "2.0"); return this._getNext(node); },
                    _getRootOrFirstNode: function() { _60b.deprecated(this.declaredClass + "::_getRootOrFirstNode() is deprecated. Use _getFirst() instead.", "", "2.0"); return this._getFirst(); },
                    _collapseNode: function(node) {
                        if (node._expandNodeDeferred) { delete node._expandNodeDeferred; }
                        if (node.state == "Loading") { return; }
                        if (node.isExpanded) {
                            var ret = node.collapse();
                            this.onClose(node.item, node);
                            this._state(node, false);
                            this._startPaint(ret);
                            return ret;
                        }
                    },
                    _expandNode: function(node) {
                        if (node._expandNodeDeferred) { return node._expandNodeDeferred; }
                        var _66a = this.model,
                            item = node.item,
                            _66b = this;
                        if (!node._loadDeferred) {
                            node.markProcessing();
                            node._loadDeferred = new _605();
                            _66a.getChildren(item, function(_66c) {
                                node.unmarkProcessing();
                                node.setChildItems(_66c).then(function() { node._loadDeferred.resolve(_66c); });
                            }, function(err) {
                                console.error(_66b, ": error loading " + node.label + " children: ", err);
                                node._loadDeferred.reject(err);
                            });
                        }
                        var def = node._loadDeferred.then(lang.hitch(this, function() {
                            var def2 = node.expand();
                            this.onOpen(node.item, node);
                            this._state(node, true);
                            return def2;
                        }));
                        this._startPaint(def);
                        return def;
                    },
                    focusNode: function(node) {
                        var tmp = [];
                        for (var _66d = this.domNode; _66d && _66d.tagName && _66d.tagName.toUpperCase() !== "IFRAME"; _66d = _66d.parentNode) { tmp.push({ domNode: _66d.contentWindow || _66d, scrollLeft: _66d.scrollLeft || 0, scrollTop: _66d.scrollTop || 0 }); }
                        this.focusChild(node);
                        this.defer(function() {
                            for (var i = 0, max = tmp.length; i < max; i++) {
                                tmp[i].domNode.scrollLeft = tmp[i].scrollLeft;
                                tmp[i].domNode.scrollTop = tmp[i].scrollTop;
                            }
                        }, 0);
                    },
                    _onNodeMouseEnter: function() {},
                    _onNodeMouseLeave: function() {},
                    _onItemChange: function(item) {
                        var _66e = this.model,
                            _66f = _66e.getIdentity(item),
                            _670 = this._itemNodesMap[_66f];
                        if (_670) {
                            var _671 = this.getLabel(item),
                                _672 = this.getTooltip(item);
                            _601.forEach(_670, function(node) {
                                node.set({ item: item, label: _671, tooltip: _672 });
                                node._updateItemClasses(item);
                            });
                        }
                    },
                    _onItemChildrenChange: function(_673, _674) {
                        var _675 = this.model,
                            _676 = _675.getIdentity(_673),
                            _677 = this._itemNodesMap[_676];
                        if (_677) { _601.forEach(_677, function(_678) { _678.setChildItems(_674); }); }
                    },
                    _onItemDelete: function(item) {
                        var _679 = this.model,
                            _67a = _679.getIdentity(item),
                            _67b = this._itemNodesMap[_67a];
                        if (_67b) {
                            _601.forEach(_67b, function(node) {
                                this.dndController.removeTreeNode(node);
                                var _67c = node.getParent();
                                if (_67c) { _67c.removeChild(node); }
                                if (this.lastFocusedChild && !dom.isDescendant(this.lastFocusedChild.domNode, this.domNode)) { delete this.lastFocusedChild; }
                                if (this.focusedChild && !dom.isDescendant(this.focusedChild.domNode, this.domNode)) { this.focus(); }
                                node.destroyRecursive();
                            }, this);
                            delete this._itemNodesMap[_67a];
                        }
                    },
                    _initState: function() { this._openedNodes = {}; if (this.persist && this.cookieName) { var oreo = _603(this.cookieName); if (oreo) { _601.forEach(oreo.split(","), function(item) { this._openedNodes[item] = true; }, this); } } },
                    _state: function(node, _67d) {
                        if (!this.persist) { return false; }
                        var path = _601.map(node.getTreePath(), function(item) { return this.model.getIdentity(item); }, this).join("/");
                        if (arguments.length === 1) { return this._openedNodes[path]; } else {
                            if (_67d) { this._openedNodes[path] = true; } else { delete this._openedNodes[path]; }
                            this._saveExpandedNodes();
                        }
                    },
                    _saveExpandedNodes: function() {
                        if (this.persist && this.cookieName) {
                            var ary = [];
                            for (var id in this._openedNodes) { ary.push(id); }
                            _603(this.cookieName, ary.join(","), { expires: 365 });
                        }
                    },
                    destroy: function() {
                        if (this._curSearch) {
                            this._curSearch.timer.remove();
                            delete this._curSearch;
                        }
                        if (this.rootNode) { this.rootNode.destroyRecursive(); }
                        if (this.dndController && !lang.isString(this.dndController)) { this.dndController.destroy(); }
                        this.rootNode = null;
                        this.inherited(arguments);
                    },
                    destroyRecursive: function() { this.destroy(); },
                    resize: function(_67e) {
                        if (_67e) { _607.setMarginBox(this.domNode, _67e); }
                        this._nodePixelIndent = _607.position(this.tree.indentDetector).w || this._nodePixelIndent;
                        this.expandChildrenDeferred.then(lang.hitch(this, function() {
                            this.rootNode.set("indent", this.showRoot ? 0 : -1);
                            this._adjustWidths();
                        }));
                    },
                    _outstandingPaintOperations: 0,
                    _startPaint: function(p) {
                        this._outstandingPaintOperations++;
                        if (this._adjustWidthsTimer) {
                            this._adjustWidthsTimer.remove();
                            delete this._adjustWidthsTimer;
                        }
                        var oc = lang.hitch(this, function() { this._outstandingPaintOperations--; if (this._outstandingPaintOperations <= 0 && !this._adjustWidthsTimer && this._started) { this._adjustWidthsTimer = this.defer("_adjustWidths"); } });
                        when(p, oc, oc);
                    },
                    _adjustWidths: function() {
                        if (this._adjustWidthsTimer) {
                            this._adjustWidthsTimer.remove();
                            delete this._adjustWidthsTimer;
                        }
                        this.containerNode.style.width = "auto";
                        this.containerNode.style.width = this.domNode.scrollWidth > this.domNode.offsetWidth ? "auto" : "100%";
                    },
                    _createTreeNode: function(args) { return new _620(args); },
                    focus: function() { if (this.lastFocusedChild) { this.focusNode(this.lastFocusedChild); } else { this.focusFirstChild(); } }
                });
                if (has("dojo-bidi")) {
                    Tree.extend({
                        _setTextDirAttr: function(_67f) {
                            if (_67f && this.textDir != _67f) {
                                this._set("textDir", _67f);
                                this.rootNode.set("textDir", _67f);
                            }
                        }
                    });
                }
                Tree.PathError = _609("TreePathError");
                Tree._TreeNode = _620;
                return Tree;
            });
        },
        "dojo/cookie": function() {
            define(["./_base/kernel", "./regexp"], function(dojo, _680) {
                dojo.cookie = function(name, _681, _682) {
                    var c = document.cookie,
                        ret;
                    if (arguments.length == 1) {
                        var _683 = c.match(new RegExp("(?:^|; )" + _680.escapeString(name) + "=([^;]*)"));
                        ret = _683 ? decodeURIComponent(_683[1]) : undefined;
                    } else {
                        _682 = _682 || {};
                        var exp = _682.expires;
                        if (typeof exp == "number") {
                            var d = new Date();
                            d.setTime(d.getTime() + exp * 24 * 60 * 60 * 1000);
                            exp = _682.expires = d;
                        }
                        if (exp && exp.toUTCString) { _682.expires = exp.toUTCString(); }
                        _681 = encodeURIComponent(_681);
                        var _684 = name + "=" + _681,
                            _685;
                        for (_685 in _682) { _684 += "; " + _685; var _686 = _682[_685]; if (_686 !== true) { _684 += "=" + _686; } }
                        document.cookie = _684;
                    }
                    return ret;
                };
                dojo.cookie.isSupported = function() {
                    if (!("cookieEnabled" in navigator)) {
                        this("__djCookieTest__", "CookiesAllowed");
                        navigator.cookieEnabled = this("__djCookieTest__") == "CookiesAllowed";
                        if (navigator.cookieEnabled) { this("__djCookieTest__", "", { expires: -1 }); }
                    }
                    return navigator.cookieEnabled;
                };
                return dojo.cookie;
            });
        },
        "dijit/tree/TreeStoreModel": function() {
            define(["dojo/_base/array", "dojo/aspect", "dojo/_base/declare", "dojo/_base/lang"], function(_687, _688, _689, lang) {
                return _689("dijit.tree.TreeStoreModel", null, {
                    store: null,
                    childrenAttrs: ["children"],
                    newItemIdAttr: "id",
                    labelAttr: "",
                    root: null,
                    query: null,
                    deferItemLoadingUntilExpand: false,
                    constructor: function(args) {
                        lang.mixin(this, args);
                        this.connects = [];
                        var _68a = this.store;
                        if (!_68a.getFeatures()["dojo.data.api.Identity"]) { throw new Error("dijit.tree.TreeStoreModel: store must support dojo.data.Identity"); }
                        if (_68a.getFeatures()["dojo.data.api.Notification"]) { this.connects = this.connects.concat([_688.after(_68a, "onNew", lang.hitch(this, "onNewItem"), true), _688.after(_68a, "onDelete", lang.hitch(this, "onDeleteItem"), true), _688.after(_68a, "onSet", lang.hitch(this, "onSetItem"), true)]); }
                    },
                    destroy: function() { var h; while (h = this.connects.pop()) { h.remove(); } },
                    getRoot: function(_68b, _68c) {
                        if (this.root) { _68b(this.root); } else {
                            this.store.fetch({
                                query: this.query,
                                onComplete: lang.hitch(this, function(_68d) {
                                    if (_68d.length != 1) { throw new Error("dijit.tree.TreeStoreModel: root query returned " + _68d.length + " items, but must return exactly one"); }
                                    this.root = _68d[0];
                                    _68b(this.root);
                                }),
                                onError: _68c
                            });
                        }
                    },
                    mayHaveChildren: function(item) { return _687.some(this.childrenAttrs, function(attr) { return this.store.hasAttribute(item, attr); }, this); },
                    getChildren: function(_68e, _68f, _690) {
                        var _691 = this.store;
                        if (!_691.isItemLoaded(_68e)) {
                            var _692 = lang.hitch(this, arguments.callee);
                            _691.loadItem({ item: _68e, onItem: function(_693) { _692(_693, _68f, _690); }, onError: _690 });
                            return;
                        }
                        var _694 = [];
                        for (var i = 0; i < this.childrenAttrs.length; i++) {
                            var vals = _691.getValues(_68e, this.childrenAttrs[i]);
                            _694 = _694.concat(vals);
                        }
                        var _695 = 0;
                        if (!this.deferItemLoadingUntilExpand) { _687.forEach(_694, function(item) { if (!_691.isItemLoaded(item)) { _695++; } }); }
                        if (_695 == 0) { _68f(_694); } else { _687.forEach(_694, function(item, idx) { if (!_691.isItemLoaded(item)) { _691.loadItem({ item: item, onItem: function(item) { _694[idx] = item; if (--_695 == 0) { _68f(_694); } }, onError: _690 }); } }); }
                    },
                    isItem: function(_696) { return this.store.isItem(_696); },
                    fetchItemByIdentity: function(_697) { this.store.fetchItemByIdentity(_697); },
                    getIdentity: function(item) { return this.store.getIdentity(item); },
                    getLabel: function(item) { if (this.labelAttr) { return this.store.getValue(item, this.labelAttr); } else { return this.store.getLabel(item); } },
                    newItem: function(args, _698, _699) {
                        var _69a = { parent: _698, attribute: this.childrenAttrs[0] },
                            _69b;
                        if (this.newItemIdAttr && args[this.newItemIdAttr]) { this.fetchItemByIdentity({ identity: args[this.newItemIdAttr], scope: this, onItem: function(item) { if (item) { this.pasteItem(item, null, _698, true, _699); } else { _69b = this.store.newItem(args, _69a); if (_69b && (_699 != undefined)) { this.pasteItem(_69b, _698, _698, false, _699); } } } }); } else { _69b = this.store.newItem(args, _69a); if (_69b && (_699 != undefined)) { this.pasteItem(_69b, _698, _698, false, _699); } }
                    },
                    pasteItem: function(_69c, _69d, _69e, _69f, _6a0) {
                        var _6a1 = this.store,
                            _6a2 = this.childrenAttrs[0];
                        if (_69d) {
                            _687.forEach(this.childrenAttrs, function(attr) {
                                if (_6a1.containsValue(_69d, attr, _69c)) {
                                    if (!_69f) {
                                        var _6a3 = _687.filter(_6a1.getValues(_69d, attr), function(x) { return x != _69c; });
                                        _6a1.setValues(_69d, attr, _6a3);
                                    }
                                    _6a2 = attr;
                                }
                            });
                        }
                        if (_69e) {
                            if (typeof _6a0 == "number") {
                                var _6a4 = _6a1.getValues(_69e, _6a2).slice();
                                _6a4.splice(_6a0, 0, _69c);
                                _6a1.setValues(_69e, _6a2, _6a4);
                            } else { _6a1.setValues(_69e, _6a2, _6a1.getValues(_69e, _6a2).concat(_69c)); }
                        }
                    },
                    onChange: function() {},
                    onChildrenChange: function() {},
                    onDelete: function() {},
                    onNewItem: function(item, _6a5) {
                        if (!_6a5) { return; }
                        this.getChildren(_6a5.item, lang.hitch(this, function(_6a6) { this.onChildrenChange(_6a5.item, _6a6); }));
                    },
                    onDeleteItem: function(item) { this.onDelete(item); },
                    onSetItem: function(item, _6a7) { if (_687.indexOf(this.childrenAttrs, _6a7) != -1) { this.getChildren(item, lang.hitch(this, function(_6a8) { this.onChildrenChange(item, _6a8); })); } else { this.onChange(item); } }
                });
            });
        },
        "dijit/tree/ForestStoreModel": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/_base/kernel", "dojo/_base/lang", "./TreeStoreModel"], function(_6a9, _6aa, _6ab, lang, _6ac) {
                return _6aa("dijit.tree.ForestStoreModel", _6ac, {
                    rootId: "$root$",
                    rootLabel: "ROOT",
                    query: null,
                    constructor: function(_6ad) { this.root = { store: this, root: true, id: _6ad.rootId, label: _6ad.rootLabel, children: _6ad.rootChildren }; },
                    mayHaveChildren: function(item) { return item === this.root || this.inherited(arguments); },
                    getChildren: function(_6ae, _6af, _6b0) {
                        if (_6ae === this.root) {
                            if (this.root.children) { _6af(this.root.children); } else {
                                this.store.fetch({
                                    query: this.query,
                                    onComplete: lang.hitch(this, function(_6b1) {
                                        this.root.children = _6b1;
                                        _6af(_6b1);
                                    }),
                                    onError: _6b0
                                });
                            }
                        } else { this.inherited(arguments); }
                    },
                    isItem: function(_6b2) { return (_6b2 === this.root) ? true : this.inherited(arguments); },
                    fetchItemByIdentity: function(_6b3) { if (_6b3.identity == this.root.id) { var _6b4 = _6b3.scope || _6ab.global; if (_6b3.onItem) { _6b3.onItem.call(_6b4, this.root); } } else { this.inherited(arguments); } },
                    getIdentity: function(item) { return (item === this.root) ? this.root.id : this.inherited(arguments); },
                    getLabel: function(item) { return (item === this.root) ? this.root.label : this.inherited(arguments); },
                    newItem: function(args, _6b5, _6b6) { if (_6b5 === this.root) { this.onNewRootItem(args); return this.store.newItem(args); } else { return this.inherited(arguments); } },
                    onNewRootItem: function() {},
                    pasteItem: function(_6b7, _6b8, _6b9, _6ba, _6bb) {
                        if (_6b8 === this.root) { if (!_6ba) { this.onLeaveRoot(_6b7); } }
                        this.inherited(arguments, [_6b7, _6b8 === this.root ? null : _6b8, _6b9 === this.root ? null : _6b9, _6ba, _6bb]);
                        if (_6b9 === this.root) { this.onAddToRoot(_6b7); }
                    },
                    onAddToRoot: function(item) {},
                    onLeaveRoot: function(item) {},
                    _requeryTop: function() {
                        var _6bc = this.root.children || [];
                        this.store.fetch({ query: this.query, onComplete: lang.hitch(this, function(_6bd) { this.root.children = _6bd; if (_6bc.length != _6bd.length || _6a9.some(_6bc, function(item, idx) { return _6bd[idx] != item; })) { this.onChildrenChange(this.root, _6bd); } }) });
                    },
                    onNewItem: function(item, _6be) {
                        this._requeryTop();
                        this.inherited(arguments);
                    },
                    onDeleteItem: function(item) {
                        if (_6a9.indexOf(this.root.children, item) != -1) { this._requeryTop(); }
                        this.inherited(arguments);
                    },
                    onSetItem: function(item, _6bf, _6c0, _6c1) {
                        this._requeryTop();
                        this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/tree/_dndSelector": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/_base/kernel", "dojo/_base/lang", "dojo/dnd/common", "dojo/dom", "dojo/mouse", "dojo/on", "dojo/touch", "../a11yclick", "./_dndContainer"], function(_6c2, _6c3, _6c4, lang, _6c5, dom, _6c6, on, _6c7, _6c8, _6c9) {
                return _6c3("dijit.tree._dndSelector", _6c9, {
                    constructor: function() {
                        this.selection = {};
                        this.anchor = null;
                        this.events.push(on(this.tree.domNode, _6c7.press, lang.hitch(this, "onMouseDown")), on(this.tree.domNode, _6c7.release, lang.hitch(this, "onMouseUp")), on(this.tree.domNode, _6c7.move, lang.hitch(this, "onMouseMove")), on(this.tree.domNode, _6c8.press, lang.hitch(this, "onClickPress")), on(this.tree.domNode, _6c8.release, lang.hitch(this, "onClickRelease")));
                    },
                    singular: false,
                    getSelectedTreeNodes: function() {
                        var _6ca = [],
                            sel = this.selection;
                        for (var i in sel) { _6ca.push(sel[i]); }
                        return _6ca;
                    },
                    selectNone: function() { this.setSelection([]); return this; },
                    destroy: function() {
                        this.inherited(arguments);
                        this.selection = this.anchor = null;
                    },
                    addTreeNode: function(node, _6cb) { this.setSelection(this.getSelectedTreeNodes().concat([node])); if (_6cb) { this.anchor = node; } return node; },
                    removeTreeNode: function(node) {
                        var _6cc = _6c2.filter(this.getSelectedTreeNodes(), function(_6cd) { return !dom.isDescendant(_6cd.domNode, node.domNode); });
                        this.setSelection(_6cc);
                        return node;
                    },
                    isTreeNodeSelected: function(node) { return node.id && !!this.selection[node.id]; },
                    setSelection: function(_6ce) {
                        var _6cf = this.getSelectedTreeNodes();
                        _6c2.forEach(this._setDifference(_6cf, _6ce), lang.hitch(this, function(node) {
                            node.setSelected(false);
                            if (this.anchor == node) { delete this.anchor; }
                            delete this.selection[node.id];
                        }));
                        _6c2.forEach(this._setDifference(_6ce, _6cf), lang.hitch(this, function(node) {
                            node.setSelected(true);
                            this.selection[node.id] = node;
                        }));
                        this._updateSelectionProperties();
                    },
                    _setDifference: function(xs, ys) {
                        _6c2.forEach(ys, function(y) { y.__exclude__ = true; });
                        var ret = _6c2.filter(xs, function(x) { return !x.__exclude__; });
                        _6c2.forEach(ys, function(y) { delete y["__exclude__"]; });
                        return ret;
                    },
                    _updateSelectionProperties: function() {
                        var _6d0 = this.getSelectedTreeNodes();
                        var _6d1 = [],
                            _6d2 = [];
                        _6c2.forEach(_6d0, function(node) {
                            var ary = node.getTreePath();
                            _6d2.push(node);
                            _6d1.push(ary);
                        }, this);
                        var _6d3 = _6c2.map(_6d2, function(node) { return node.item; });
                        this.tree._set("paths", _6d1);
                        this.tree._set("path", _6d1[0] || []);
                        this.tree._set("selectedNodes", _6d2);
                        this.tree._set("selectedNode", _6d2[0] || null);
                        this.tree._set("selectedItems", _6d3);
                        this.tree._set("selectedItem", _6d3[0] || null);
                    },
                    onClickPress: function(e) {
                        if (this.current && this.current.isExpandable && this.tree.isExpandoNode(e.target, this.current)) { return; }
                        if (e.type == "mousedown" && _6c6.isLeft(e)) { e.preventDefault(); }
                        var _6d4 = e.type == "keydown" ? this.tree.focusedChild : this.current;
                        if (!_6d4) { return; }
                        var copy = _6c5.getCopyKeyState(e),
                            id = _6d4.id;
                        if (!this.singular && !e.shiftKey && this.selection[id]) { this._doDeselect = true; return; } else { this._doDeselect = false; }
                        this.userSelect(_6d4, copy, e.shiftKey);
                    },
                    onClickRelease: function(e) {
                        if (!this._doDeselect) { return; }
                        this._doDeselect = false;
                        this.userSelect(e.type == "keyup" ? this.tree.focusedChild : this.current, _6c5.getCopyKeyState(e), e.shiftKey);
                    },
                    onMouseMove: function() { this._doDeselect = false; },
                    onMouseDown: function() {},
                    onMouseUp: function() {},
                    _compareNodes: function(n1, n2) {
                        if (n1 === n2) { return 0; }
                        if ("sourceIndex" in document.documentElement) { return n1.sourceIndex - n2.sourceIndex; } else {
                            if ("compareDocumentPosition" in document.documentElement) { return n1.compareDocumentPosition(n2) & 2 ? 1 : -1; } else {
                                if (document.createRange) {
                                    var r1 = doc.createRange();
                                    r1.setStartBefore(n1);
                                    var r2 = doc.createRange();
                                    r2.setStartBefore(n2);
                                    return r1.compareBoundaryPoints(r1.END_TO_END, r2);
                                } else { throw Error("dijit.tree._compareNodes don't know how to compare two different nodes in this browser"); }
                            }
                        }
                    },
                    userSelect: function(node, _6d5, _6d6) {
                        if (this.singular) {
                            if (this.anchor == node && _6d5) { this.selectNone(); } else {
                                this.setSelection([node]);
                                this.anchor = node;
                            }
                        } else {
                            if (_6d6 && this.anchor) {
                                var cr = this._compareNodes(this.anchor.rowNode, node.rowNode),
                                    _6d7, end, _6d8 = this.anchor;
                                if (cr < 0) {
                                    _6d7 = _6d8;
                                    end = node;
                                } else {
                                    _6d7 = node;
                                    end = _6d8;
                                }
                                var _6d9 = [];
                                while (_6d7 != end) {
                                    _6d9.push(_6d7);
                                    _6d7 = this.tree._getNext(_6d7);
                                }
                                _6d9.push(end);
                                this.setSelection(_6d9);
                            } else {
                                if (this.selection[node.id] && _6d5) { this.removeTreeNode(node); } else {
                                    if (_6d5) { this.addTreeNode(node, true); } else {
                                        this.setSelection([node]);
                                        this.anchor = node;
                                    }
                                }
                            }
                        }
                    },
                    getItem: function(key) { var _6da = this.selection[key]; return { data: _6da, type: ["treeNode"] }; },
                    forInSelectedItems: function(f, o) { o = o || _6c4.global; for (var id in this.selection) { f.call(o, this.getItem(id), id, this); } }
                });
            });
        },
        "dijit/tree/_dndContainer": function() {
            define(["dojo/aspect", "dojo/_base/declare", "dojo/dom-class", "dojo/_base/lang", "dojo/on", "dojo/touch"], function(_6db, _6dc, _6dd, lang, on, _6de) {
                return _6dc("dijit.tree._dndContainer", null, {
                    constructor: function(tree, _6df) {
                        this.tree = tree;
                        this.node = tree.domNode;
                        lang.mixin(this, _6df);
                        this.containerState = "";
                        _6dd.add(this.node, "dojoDndContainer");
                        this.events = [on(this.node, _6de.enter, lang.hitch(this, "onOverEvent")), on(this.node, _6de.leave, lang.hitch(this, "onOutEvent")), _6db.after(this.tree, "_onNodeMouseEnter", lang.hitch(this, "onMouseOver"), true), _6db.after(this.tree, "_onNodeMouseLeave", lang.hitch(this, "onMouseOut"), true), on(this.node, "dragstart, selectstart", function(evt) { evt.preventDefault(); })];
                    },
                    destroy: function() {
                        var h;
                        while (h = this.events.pop()) { h.remove(); }
                        this.node = this.parent = null;
                    },
                    onMouseOver: function(_6e0) { this.current = _6e0; },
                    onMouseOut: function() { this.current = null; },
                    _changeState: function(type, _6e1) {
                        var _6e2 = "dojoDnd" + type;
                        var _6e3 = type.toLowerCase() + "State";
                        _6dd.replace(this.node, _6e2 + _6e1, _6e2 + this[_6e3]);
                        this[_6e3] = _6e1;
                    },
                    _addItemClass: function(node, type) { _6dd.add(node, "dojoDndItem" + type); },
                    _removeItemClass: function(node, type) { _6dd.remove(node, "dojoDndItem" + type); },
                    onOverEvent: function() { this._changeState("Container", "Over"); },
                    onOutEvent: function() { this._changeState("Container", ""); }
                });
            });
        },
        "dijit/InlineEditBox": function() {
            define(["require", "dojo/_base/array", "dojo/aspect", "dojo/_base/declare", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-style", "dojo/i18n", "dojo/_base/kernel", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/sniff", "dojo/when", "./a11yclick", "./focus", "./_Widget", "./_TemplatedMixin", "./_WidgetsInTemplateMixin", "./_Container", "./form/Button", "./form/_TextBoxMixin", "./form/TextBox", "dojo/text!./templates/InlineEditBox.html", "dojo/i18n!./nls/common"], function(_6e4, _6e5, _6e6, _6e7, _6e8, _6e9, _6ea, _6eb, i18n, _6ec, keys, lang, on, has, when, _6ed, fm, _6ee, _6ef, _6f0, _6f1, _6f2, _6f3, _6f4, _6f5) {
                var _6f6 = _6e7("dijit._InlineEditor", [_6ee, _6ef, _6f0], {
                    templateString: _6f5,
                    contextRequire: _6e4,
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this.messages = i18n.getLocalization("dijit", "common", this.lang);
                        _6e5.forEach(["buttonSave", "buttonCancel"], function(prop) { if (!this[prop]) { this[prop] = this.messages[prop]; } }, this);
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        var Cls = typeof this.editor == "string" ? (lang.getObject(this.editor) || _6e4(this.editor)) : this.editor;
                        var _6f7 = this.sourceStyle,
                            _6f8 = "line-height:" + _6f7.lineHeight + ";",
                            _6f9 = _6eb.getComputedStyle(this.domNode);
                        _6e5.forEach(["Weight", "Family", "Size", "Style"], function(prop) {
                            var _6fa = _6f7["font" + prop],
                                _6fb = _6f9["font" + prop];
                            if (_6fb != _6fa) { _6f8 += "font-" + prop + ":" + _6f7["font" + prop] + ";"; }
                        }, this);
                        _6e5.forEach(["marginTop", "marginBottom", "marginLeft", "marginRight", "position", "left", "top", "right", "bottom", "float", "clear", "display"], function(prop) { this.domNode.style[prop] = _6f7[prop]; }, this);
                        var _6fc = this.inlineEditBox.width;
                        if (_6fc == "100%") {
                            _6f8 += "width:100%;";
                            this.domNode.style.display = "block";
                        } else { _6f8 += "width:" + (_6fc + (Number(_6fc) == _6fc ? "px" : "")) + ";"; }
                        var _6fd = lang.delegate(this.inlineEditBox.editorParams, { style: _6f8, dir: this.dir, lang: this.lang, textDir: this.textDir });
                        this.editWidget = new Cls(_6fd, this.editorPlaceholder);
                        if (this.inlineEditBox.autoSave) {
                            this.saveButton.destroy();
                            this.cancelButton.destroy();
                            this.saveButton = this.cancelButton = null;
                            _6ea.destroy(this.buttonContainer);
                        }
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        var ew = this.editWidget;
                        if (this.inlineEditBox.autoSave) { this.own(_6e6.after(ew, "onChange", lang.hitch(this, "_onChange"), true), on(ew, "keydown", lang.hitch(this, "_onKeyDown"))); } else {
                            if ("intermediateChanges" in ew) {
                                ew.set("intermediateChanges", true);
                                this.own(_6e6.after(ew, "onChange", lang.hitch(this, "_onIntermediateChange"), true));
                                this.saveButton.set("disabled", true);
                            }
                        }
                    },
                    startup: function() {
                        this.editWidget.startup();
                        this.inherited(arguments);
                    },
                    _onIntermediateChange: function() { this.saveButton.set("disabled", (this.getValue() == this._resetValue) || !this.enableSave()); },
                    destroy: function() {
                        this.editWidget.destroy(true);
                        this.inherited(arguments);
                    },
                    getValue: function() { var ew = this.editWidget; return String(ew.get(("displayedValue" in ew || "_getDisplayedValueAttr" in ew) ? "displayedValue" : "value")); },
                    _onKeyDown: function(e) {
                        if (this.inlineEditBox.autoSave && this.inlineEditBox.editing) {
                            if (e.altKey || e.ctrlKey) { return; }
                            if (e.keyCode == keys.ESCAPE) {
                                e.stopPropagation();
                                e.preventDefault();
                                this.cancel(true);
                            } else {
                                if (e.keyCode == keys.ENTER && e.target.tagName == "INPUT") {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this._onChange();
                                }
                            }
                        }
                    },
                    _onBlur: function() { this.inherited(arguments); if (this.inlineEditBox.autoSave && this.inlineEditBox.editing) { if (this.getValue() == this._resetValue) { this.cancel(false); } else { if (this.enableSave()) { this.save(false); } } } },
                    _onChange: function() { if (this.inlineEditBox.autoSave && this.inlineEditBox.editing && this.enableSave()) { fm.focus(this.inlineEditBox.displayNode); } },
                    enableSave: function() { return this.editWidget.isValid ? this.editWidget.isValid() : true; },
                    focus: function() { this.editWidget.focus(); if (this.editWidget.focusNode) { fm._onFocusNode(this.editWidget.focusNode); if (this.editWidget.focusNode.tagName == "INPUT") { this.defer(function() { _6f3.selectInputText(this.editWidget.focusNode); }); } } }
                });
                var _6fe = _6e7("dijit.InlineEditBox" + (has("dojo-bidi") ? "_NoBidi" : ""), _6ee, {
                    editing: false,
                    autoSave: true,
                    buttonSave: "",
                    buttonCancel: "",
                    renderAsHtml: false,
                    editor: _6f4,
                    editorWrapper: _6f6,
                    editorParams: {},
                    disabled: false,
                    onChange: function() {},
                    onCancel: function() {},
                    width: "100%",
                    value: "",
                    noValueIndicator: has("ie") <= 6 ? "<span style='font-family: wingdings; text-decoration: underline;'>&#160;&#160;&#160;&#160;&#x270d;&#160;&#160;&#160;&#160;</span>" : "<span style='text-decoration: underline;'>&#160;&#160;&#160;&#160;&#x270d;&#160;&#160;&#160;&#160;</span>",
                    constructor: function() { this.editorParams = {}; },
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this.displayNode = this.srcNodeRef;
                        this.own(on(this.displayNode, _6ed, lang.hitch(this, "_onClick")), on(this.displayNode, "mouseover, focus", lang.hitch(this, "_onMouseOver")), on(this.displayNode, "mouseout, blur", lang.hitch(this, "_onMouseOut")));
                        this.displayNode.setAttribute("role", "button");
                        if (!this.displayNode.getAttribute("tabIndex")) { this.displayNode.setAttribute("tabIndex", 0); }
                        if (!this.value && !("value" in this.params)) { this.value = lang.trim(this.renderAsHtml ? this.displayNode.innerHTML : (this.displayNode.innerText || this.displayNode.textContent || "")); }
                        if (!this.value) { this.displayNode.innerHTML = this.noValueIndicator; }
                        _6e9.add(this.displayNode, "dijitInlineEditBoxDisplayMode");
                    },
                    setDisabled: function(_6ff) {
                        _6ec.deprecated("dijit.InlineEditBox.setDisabled() is deprecated.  Use set('disabled', bool) instead.", "", "2.0");
                        this.set("disabled", _6ff);
                    },
                    _setDisabledAttr: function(_700) {
                        this.domNode.setAttribute("aria-disabled", _700 ? "true" : "false");
                        if (_700) { this.displayNode.removeAttribute("tabIndex"); } else { this.displayNode.setAttribute("tabIndex", 0); }
                        _6e9.toggle(this.displayNode, "dijitInlineEditBoxDisplayModeDisabled", _700);
                        this._set("disabled", _700);
                    },
                    _onMouseOver: function() { if (!this.disabled) { _6e9.add(this.displayNode, "dijitInlineEditBoxDisplayModeHover"); } },
                    _onMouseOut: function() { _6e9.remove(this.displayNode, "dijitInlineEditBoxDisplayModeHover"); },
                    _onClick: function(e) {
                        if (this.disabled) { return; }
                        if (e) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        this._onMouseOut();
                        this.defer("edit");
                    },
                    edit: function() {
                        if (this.disabled || this.editing) { return; }
                        this._set("editing", true);
                        this._savedTabIndex = _6e8.get(this.displayNode, "tabIndex") || "0";
                        if (!this.wrapperWidget) {
                            var _701 = _6ea.create("span", null, this.domNode, "before");
                            var Ewc = typeof this.editorWrapper == "string" ? lang.getObject(this.editorWrapper) : this.editorWrapper;
                            this.wrapperWidget = new Ewc({ value: this.value, buttonSave: this.buttonSave, buttonCancel: this.buttonCancel, dir: this.dir, lang: this.lang, tabIndex: this._savedTabIndex, editor: this.editor, inlineEditBox: this, sourceStyle: _6eb.getComputedStyle(this.displayNode), save: lang.hitch(this, "save"), cancel: lang.hitch(this, "cancel"), textDir: this.textDir }, _701);
                            if (!this.wrapperWidget._started) { this.wrapperWidget.startup(); }
                            if (!this._started) { this.startup(); }
                        }
                        var ww = this.wrapperWidget;
                        _6e9.add(this.displayNode, "dijitOffScreen");
                        _6e9.remove(ww.domNode, "dijitOffScreen");
                        _6eb.set(ww.domNode, { visibility: "visible" });
                        _6e8.set(this.displayNode, "tabIndex", "-1");
                        var ew = ww.editWidget;
                        var self = this;
                        when(ew.onLoadDeferred, lang.hitch(ww, function() {
                            ew.set(("displayedValue" in ew || "_setDisplayedValueAttr" in ew) ? "displayedValue" : "value", self.value);
                            this.defer(function() {
                                if (ww.saveButton) { ww.saveButton.set("disabled", "intermediateChanges" in ew); }
                                this.focus();
                                this._resetValue = this.getValue();
                            });
                        }));
                    },
                    _onBlur: function() { this.inherited(arguments); if (!this.editing) {} },
                    destroy: function() {
                        if (this.wrapperWidget && !this.wrapperWidget._destroyed) {
                            this.wrapperWidget.destroy();
                            delete this.wrapperWidget;
                        }
                        this.inherited(arguments);
                    },
                    _showText: function(_702) {
                        var ww = this.wrapperWidget;
                        _6eb.set(ww.domNode, { visibility: "hidden" });
                        _6e9.add(ww.domNode, "dijitOffScreen");
                        _6e9.remove(this.displayNode, "dijitOffScreen");
                        _6e8.set(this.displayNode, "tabIndex", this._savedTabIndex);
                        if (_702) { fm.focus(this.displayNode); }
                    },
                    save: function(_703) {
                        if (this.disabled || !this.editing) { return; }
                        this._set("editing", false);
                        var ww = this.wrapperWidget;
                        var _704 = ww.getValue();
                        this.set("value", _704);
                        this._showText(_703);
                    },
                    setValue: function(val) { _6ec.deprecated("dijit.InlineEditBox.setValue() is deprecated.  Use set('value', ...) instead.", "", "2.0"); return this.set("value", val); },
                    _setValueAttr: function(val) {
                        val = lang.trim(val);
                        var _705 = this.renderAsHtml ? val : val.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;").replace(/\n/g, "<br>");
                        if (this.editorParams && this.editorParams.type === "password") { this.displayNode.innerHTML = "********"; } else { this.displayNode.innerHTML = _705 || this.noValueIndicator; }
                        this._set("value", val);
                        if (this._started) { this.defer(function() { this.onChange(val); }); }
                    },
                    getValue: function() { _6ec.deprecated("dijit.InlineEditBox.getValue() is deprecated.  Use get('value') instead.", "", "2.0"); return this.get("value"); },
                    cancel: function(_706) {
                        if (this.disabled || !this.editing) { return; }
                        this._set("editing", false);
                        this.defer("onCancel");
                        this._showText(_706);
                    }
                });
                if (has("dojo-bidi")) {
                    _6fe = _6e7("dijit.InlineEditBox", _6fe, {
                        _setValueAttr: function() {
                            this.inherited(arguments);
                            this.applyTextDir(this.displayNode);
                        }
                    });
                }
                _6fe._InlineEditor = _6f6;
                return _6fe;
            });
        },
        "dijit/form/Form": function() {
            define(["dojo/_base/declare", "dojo/dom-attr", "dojo/_base/kernel", "dojo/sniff", "../_Widget", "../_TemplatedMixin", "./_FormMixin", "../layout/_ContentPaneResizeMixin"], function(_707, _708, _709, has, _70a, _70b, _70c, _70d) {
                return _707("dijit.form.Form", [_70a, _70b, _70c, _70d], {
                    name: "",
                    action: "",
                    method: "",
                    encType: "",
                    "accept-charset": "",
                    accept: "",
                    target: "",
                    templateString: "<form data-dojo-attach-point='containerNode' data-dojo-attach-event='onreset:_onReset,onsubmit:_onSubmit' ${!nameAttrSetting}></form>",
                    postMixInProperties: function() {
                        this.nameAttrSetting = this.name ? ("name='" + this.name + "'") : "";
                        this.inherited(arguments);
                    },
                    execute: function() {},
                    onExecute: function() {},
                    _setEncTypeAttr: function(_70e) {
                        _708.set(this.domNode, "encType", _70e);
                        if (has("ie")) { this.domNode.encoding = _70e; }
                        this._set("encType", _70e);
                    },
                    reset: function(e) { var faux = { returnValue: true, preventDefault: function() { this.returnValue = false; }, stopPropagation: function() {}, currentTarget: e ? e.target : this.domNode, target: e ? e.target : this.domNode }; if (!(this.onReset(faux) === false) && faux.returnValue) { this.inherited(arguments, []); } },
                    onReset: function() { return true; },
                    _onReset: function(e) {
                        this.reset(e);
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    },
                    _onSubmit: function(e) {
                        var fp = this.constructor.prototype;
                        if (this.execute != fp.execute || this.onExecute != fp.onExecute) {
                            _709.deprecated("dijit.form.Form:execute()/onExecute() are deprecated. Use onSubmit() instead.", "", "2.0");
                            this.onExecute();
                            this.execute(this.getValues());
                        }
                        if (this.onSubmit(e) === false) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                    },
                    onSubmit: function() { return this.isValid(); },
                    submit: function() { if (!(this.onSubmit() === false)) { this.containerNode.submit(); } }
                });
            });
        },
        "dijit/form/ComboButton": function() {
            define(["dojo/_base/declare", "dojo/keys", "../focus", "./DropDownButton", "dojo/text!./templates/ComboButton.html", "../a11yclick"], function(_70f, keys, _710, _711, _712) {
                return _70f("dijit.form.ComboButton", _711, {
                    templateString: _712,
                    _setIdAttr: "",
                    _setTabIndexAttr: ["focusNode", "titleNode"],
                    _setTitleAttr: "titleNode",
                    optionsTitle: "",
                    baseClass: "dijitComboButton",
                    cssStateNodes: { "buttonNode": "dijitButtonNode", "titleNode": "dijitButtonContents", "_popupStateNode": "dijitDownArrowButton" },
                    _focusedNode: null,
                    _onButtonKeyDown: function(evt) {
                        if (evt.keyCode == keys[this.isLeftToRight() ? "RIGHT_ARROW" : "LEFT_ARROW"]) {
                            _710.focus(this._popupStateNode);
                            evt.stopPropagation();
                            evt.preventDefault();
                        }
                    },
                    _onArrowKeyDown: function(evt) {
                        if (evt.keyCode == keys[this.isLeftToRight() ? "LEFT_ARROW" : "RIGHT_ARROW"]) {
                            _710.focus(this.titleNode);
                            evt.stopPropagation();
                            evt.preventDefault();
                        }
                    },
                    focus: function(_713) { if (!this.disabled) { _710.focus(_713 == "start" ? this.titleNode : this._popupStateNode); } }
                });
            });
        },
        "dijit/form/CheckBox": function() {
            define(["require", "dojo/_base/declare", "dojo/dom-attr", "dojo/has", "dojo/query", "dojo/ready", "./ToggleButton", "./_CheckBoxMixin", "dojo/text!./templates/CheckBox.html", "dojo/NodeList-dom", "../a11yclick"], function(_714, _715, _716, has, _717, _718, _719, _71a, _71b) {
                if (has("dijit-legacy-requires")) {
                    _718(0, function() {
                        var _71c = ["dijit/form/RadioButton"];
                        _714(_71c);
                    });
                }
                return _715("dijit.form.CheckBox", [_719, _71a], {
                    templateString: _71b,
                    baseClass: "dijitCheckBox",
                    _setValueAttr: function(_71d, _71e) {
                        if (typeof _71d == "string") {
                            this.inherited(arguments);
                            _71d = true;
                        }
                        if (this._created) { this.set("checked", _71d, _71e); }
                    },
                    _getValueAttr: function() { return this.checked && this._get("value"); },
                    _setIconClassAttr: null,
                    _setNameAttr: "focusNode",
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this.checkedAttrSetting = "";
                    },
                    _fillContent: function() {},
                    _onFocus: function() {
                        if (this.id) { _717("label[for='" + this.id + "']").addClass("dijitFocusedLabel"); }
                        this.inherited(arguments);
                    },
                    _onBlur: function() {
                        if (this.id) { _717("label[for='" + this.id + "']").removeClass("dijitFocusedLabel"); }
                        this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/form/_CheckBoxMixin": function() {
            define(["dojo/_base/declare", "dojo/dom-attr"], function(_71f, _720) {
                return _71f("dijit.form._CheckBoxMixin", null, {
                    type: "checkbox",
                    value: "on",
                    readOnly: false,
                    _aria_attr: "aria-checked",
                    _setReadOnlyAttr: function(_721) {
                        this._set("readOnly", _721);
                        _720.set(this.focusNode, "readOnly", _721);
                    },
                    _setLabelAttr: undefined,
                    _getSubmitValue: function(_722) { return (_722 == null || _722 === "") ? "on" : _722; },
                    _setValueAttr: function(_723) {
                        _723 = this._getSubmitValue(_723);
                        this._set("value", _723);
                        _720.set(this.focusNode, "value", _723);
                    },
                    reset: function() {
                        this.inherited(arguments);
                        this._set("value", this._getSubmitValue(this.params.value));
                        _720.set(this.focusNode, "value", this.value);
                    },
                    _onClick: function(e) {
                        if (this.readOnly) {
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        }
                        return this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/form/RadioButton": function() { define(["dojo/_base/declare", "./CheckBox", "./_RadioButtonMixin"], function(_724, _725, _726) { return _724("dijit.form.RadioButton", [_725, _726], { baseClass: "dijitRadio" }); }); },
        "dijit/form/_RadioButtonMixin": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-attr", "dojo/_base/lang", "dojo/query!css2", "../registry"], function(_727, _728, _729, lang, _72a, _72b) {
                return _728("dijit.form._RadioButtonMixin", null, {
                    type: "radio",
                    _getRelatedWidgets: function() {
                        var ary = [];
                        _72a("input[type=radio]", this.focusNode.form || this.ownerDocument).forEach(lang.hitch(this, function(_72c) { if (_72c.name == this.name && _72c.form == this.focusNode.form) { var _72d = _72b.getEnclosingWidget(_72c); if (_72d) { ary.push(_72d); } } }));
                        return ary;
                    },
                    _setCheckedAttr: function(_72e) { this.inherited(arguments); if (!this._created) { return; } if (_72e) { _727.forEach(this._getRelatedWidgets(), lang.hitch(this, function(_72f) { if (_72f != this && _72f.checked) { _72f.set("checked", false); } })); } },
                    _getSubmitValue: function(_730) { return _730 == null ? "on" : _730; },
                    _onClick: function(e) {
                        if (this.checked || this.disabled) {
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        }
                        if (this.readOnly) {
                            e.stopPropagation();
                            e.preventDefault();
                            _727.forEach(this._getRelatedWidgets(), lang.hitch(this, function(_731) { _729.set(this.focusNode || this.domNode, "checked", _731.checked); }));
                            return false;
                        }
                        var _732 = false;
                        var _733;
                        _727.some(this._getRelatedWidgets(), function(_734) { if (_734.checked) { _733 = _734; return true; } return false; });
                        this.checked = true;
                        _733 && (_733.checked = false);
                        if (this.onClick(e) === false || e.defaultPrevented) { _732 = true; }
                        this.checked = false;
                        _733 && (_733.checked = true);
                        if (_732) { e.preventDefault(); } else { this.set("checked", true); }
                        return !_732;
                    }
                });
            });
        },
        "dijit/form/CurrencyTextBox": function() {
            define(["dojo/currency", "dojo/_base/declare", "dojo/_base/lang", "./NumberTextBox"], function(_735, _736, lang, _737) {
                var _738 = _736("dijit.form.CurrencyTextBox", _737, {
                    currency: "",
                    baseClass: "dijitTextBox dijitCurrencyTextBox",
                    _formatter: _735.format,
                    _parser: _735.parse,
                    _regExpGenerator: _735.regexp,
                    parse: function(_739, _73a) { var v = this.inherited(arguments); if (isNaN(v) && /\d+/.test(_739)) { v = lang.hitch(lang.delegate(this, { _parser: _737.prototype._parser }), "inherited")(arguments); } return v; },
                    _setConstraintsAttr: function(_73b) {
                        if (!_73b.currency && this.currency) { _73b.currency = this.currency; }
                        this.inherited(arguments, [_735._mixInDefaults(lang.mixin(_73b, { exponent: false }))]);
                    }
                });
                return _738;
            });
        },
        "dojo/currency": function() {
            define(["./_base/array", "./_base/lang", "./number", "./i18n", "./i18n!./cldr/nls/currency", "./cldr/monetary"], function(_73c, lang, _73d, i18n, _73e, _73f) {
                var _740 = {};
                lang.setObject("dojo.currency", _740);
                _740._mixInDefaults = function(_741) {
                    _741 = _741 || {};
                    _741.type = "currency";
                    var _742 = i18n.getLocalization("dojo.cldr", "currency", _741.locale) || {};
                    var iso = _741.currency;
                    var data = _73f.getData(iso);
                    _73c.forEach(["displayName", "symbol", "group", "decimal"], function(prop) { data[prop] = _742[iso + "_" + prop]; });
                    data.fractional = [true, false];
                    return lang.mixin(data, _741);
                };
                _740.format = function(_743, _744) { return _73d.format(_743, _740._mixInDefaults(_744)); };
                _740.regexp = function(_745) { return _73d.regexp(_740._mixInDefaults(_745)); };
                _740.parse = function(_746, _747) { return _73d.parse(_746, _740._mixInDefaults(_747)); };
                return _740;
            });
        },
        "dojo/cldr/monetary": function() {
            define(["../_base/kernel", "../_base/lang"], function(dojo, lang) {
                var _748 = {};
                lang.setObject("dojo.cldr.monetary", _748);
                _748.getData = function(code) {
                    var _749 = { ADP: 0, AFN: 0, ALL: 0, AMD: 0, BHD: 3, BIF: 0, BYR: 0, CLF: 0, CLP: 0, COP: 0, CRC: 0, DJF: 0, ESP: 0, GNF: 0, GYD: 0, HUF: 0, IDR: 0, IQD: 0, IRR: 3, ISK: 0, ITL: 0, JOD: 3, JPY: 0, KMF: 0, KPW: 0, KRW: 0, KWD: 3, LAK: 0, LBP: 0, LUF: 0, LYD: 3, MGA: 0, MGF: 0, MMK: 0, MNT: 0, MRO: 0, MUR: 0, OMR: 3, PKR: 2, PYG: 0, RSD: 0, RWF: 0, SLL: 0, SOS: 0, STD: 0, SYP: 0, TMM: 0, TND: 3, TRL: 0, TZS: 0, UGX: 0, UZS: 0, VND: 0, VUV: 0, XAF: 0, XOF: 0, XPF: 0, YER: 0, ZMK: 0, ZWD: 0 };
                    var _74a = {};
                    var _74b = _749[code],
                        _74c = _74a[code];
                    if (typeof _74b == "undefined") { _74b = 2; }
                    if (typeof _74c == "undefined") { _74c = 0; }
                    return { places: _74b, round: _74c };
                };
                return _748;
            });
        },
        "dijit/form/NumberTextBox": function() {
            define(["dojo/_base/declare", "dojo/_base/lang", "dojo/i18n", "dojo/string", "dojo/number", "./RangeBoundTextBox"], function(_74d, lang, i18n, _74e, _74f, _750) {
                var _751 = function(_752) {
                    var _752 = _752 || {},
                        _753 = i18n.getLocalization("dojo.cldr", "number", i18n.normalizeLocale(_752.locale)),
                        _754 = _752.pattern ? _752.pattern : _753[(_752.type || "decimal") + "Format"];
                    var _755;
                    if (typeof _752.places == "number") { _755 = _752.places; } else { if (typeof _752.places === "string" && _752.places.length > 0) { _755 = _752.places.replace(/.*,/, ""); } else { _755 = (_754.indexOf(".") != -1 ? _754.split(".")[1].replace(/[^#0]/g, "").length : 0); } }
                    return { sep: _753.decimal, places: _755 };
                };
                var _756 = _74d("dijit.form.NumberTextBoxMixin", null, {
                    pattern: function(_757) { return "(" + (this.focused && this.editOptions ? this._regExpGenerator(lang.delegate(_757, this.editOptions)) + "|" : "") + this._regExpGenerator(_757) + ")"; },
                    value: NaN,
                    editOptions: { pattern: "#.######" },
                    _formatter: _74f.format,
                    _regExpGenerator: _74f.regexp,
                    _decimalInfo: _751(),
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this._set("type", "text");
                    },
                    _setConstraintsAttr: function(_758) {
                        var _759 = typeof _758.places == "number" ? _758.places : 0;
                        if (_759) { _759++; }
                        if (typeof _758.max != "number") { _758.max = 9 * Math.pow(10, 15 - _759); }
                        if (typeof _758.min != "number") { _758.min = -9 * Math.pow(10, 15 - _759); }
                        this.inherited(arguments, [_758]);
                        if (this.focusNode && this.focusNode.value && !isNaN(this.value)) { this.set("value", this.value); }
                        this._decimalInfo = _751(_758);
                    },
                    _onFocus: function(by) {
                        if (this.disabled || this.readOnly) { return; }
                        var val = this.get("value");
                        if (typeof val == "number" && !isNaN(val)) { var _75a = this.format(val, this.constraints); if (_75a !== undefined) { this.textbox.value = _75a; if (by !== "mouse") { this.textbox.select(); } } }
                        this.inherited(arguments);
                    },
                    format: function(_75b, _75c) { var _75d = String(_75b); if (typeof _75b != "number") { return _75d; } if (isNaN(_75b)) { return ""; } if (!("rangeCheck" in this && this.rangeCheck(_75b, _75c)) && _75c.exponent !== false && /\de[-+]?\d/i.test(_75d)) { return _75d; } if (this.editOptions && this.focused) { _75c = lang.mixin({}, _75c, this.editOptions); } return this._formatter(_75b, _75c); },
                    _parser: _74f.parse,
                    parse: function(_75e, _75f) {
                        var _760 = lang.mixin({}, _75f, (this.editOptions && this.focused) ? this.editOptions : {});
                        if (this.focused && _760.places != null) {
                            var _761 = _760.places;
                            var _762 = typeof _761 === "number" ? _761 : Number(_761.split(",").pop());
                            _760.places = "0," + _762;
                        }
                        var v = this._parser(_75e, _760);
                        if (this.editOptions && this.focused && isNaN(v)) { v = this._parser(_75e, _75f); }
                        return v;
                    },
                    _getDisplayedValueAttr: function() { var v = this.inherited(arguments); return isNaN(v) ? this.textbox.value : v; },
                    filter: function(_763) { if (_763 == null || typeof _763 == "string" && _763 == "") { return NaN; } else { if (typeof _763 == "number" && !isNaN(_763) && _763 != 0) { _763 = _74f.round(_763, this._decimalInfo.places); } } return this.inherited(arguments, [_763]); },
                    serialize: function(_764, _765) { return (typeof _764 != "number" || isNaN(_764)) ? "" : this.inherited(arguments); },
                    _setBlurValue: function() {
                        var val = lang.hitch(lang.delegate(this, { focused: true }), "get")("value");
                        this._setValueAttr(val, true);
                    },
                    _setValueAttr: function(_766, _767, _768) {
                        if (_766 !== undefined && _768 === undefined) {
                            _768 = String(_766);
                            if (typeof _766 == "number") { if (isNaN(_766)) { _768 = ""; } else { if (("rangeCheck" in this && this.rangeCheck(_766, this.constraints)) || this.constraints.exponent === false || !/\de[-+]?\d/i.test(_768)) { _768 = undefined; } } } else {
                                if (!_766) {
                                    _768 = "";
                                    _766 = NaN;
                                } else { _766 = undefined; }
                            }
                        }
                        this.inherited(arguments, [_766, _767, _768]);
                    },
                    _getValueAttr: function() { var v = this.inherited(arguments); if (isNaN(v) && this.textbox.value !== "") { if (this.constraints.exponent !== false && /\de[-+]?\d/i.test(this.textbox.value) && (new RegExp("^" + _74f._realNumberRegexp(lang.delegate(this.constraints)) + "$").test(this.textbox.value))) { var n = Number(this.textbox.value); return isNaN(n) ? undefined : n; } else { return undefined; } } else { return v; } },
                    isValid: function(_769) { if (!this.focused || this._isEmpty(this.textbox.value)) { return this.inherited(arguments); } else { var v = this.get("value"); if (!isNaN(v) && this.rangeCheck(v, this.constraints)) { if (this.constraints.exponent !== false && /\de[-+]?\d/i.test(this.textbox.value)) { return true; } else { return this.inherited(arguments); } } else { return false; } } },
                    _isValidSubset: function() {
                        var _76a = (typeof this.constraints.min == "number"),
                            _76b = (typeof this.constraints.max == "number"),
                            _76c = this.get("value");
                        if (isNaN(_76c) || (!_76a && !_76b)) { return this.inherited(arguments); }
                        var _76d = _76c | 0,
                            _76e = _76c < 0,
                            _76f = this.textbox.value.indexOf(this._decimalInfo.sep) != -1,
                            _770 = this.maxLength || 20,
                            _771 = _770 - this.textbox.value.length,
                            _772 = _76f ? this.textbox.value.split(this._decimalInfo.sep)[1].replace(/[^0-9]/g, "") : "";
                        var _773 = _76f ? _76d + "." + _772 : _76d + "";
                        var _774 = _74e.rep("9", _771),
                            _775 = _76c,
                            _776 = _76c;
                        if (_76e) { _775 = Number(_773 + _774); } else { _776 = Number(_773 + _774); }
                        return !((_76a && _776 < this.constraints.min) || (_76b && _775 > this.constraints.max));
                    }
                });
                var _777 = _74d("dijit.form.NumberTextBox", [_750, _756], { baseClass: "dijitTextBox dijitNumberTextBox" });
                _777.Mixin = _756;
                return _777;
            });
        },
        "dijit/form/RangeBoundTextBox": function() {
            define(["dojo/_base/declare", "dojo/i18n", "./MappedTextBox", "dojo/i18n!./nls/validate"], function(_778, i18n, _779) {
                var _77a = _778("dijit.form.RangeBoundTextBox", _779, {
                    rangeMessage: "",
                    rangeCheck: function(_77b, _77c) { return ("min" in _77c ? (this.compare(_77b, _77c.min) >= 0) : true) && ("max" in _77c ? (this.compare(_77b, _77c.max) <= 0) : true); },
                    isInRange: function() { return this.rangeCheck(this.get("value"), this.constraints); },
                    _isDefinitelyOutOfRange: function() {
                        var val = this.get("value");
                        if (val == null) { return false; }
                        var _77d = false;
                        if ("min" in this.constraints) {
                            var min = this.constraints.min;
                            _77d = this.compare(val, ((typeof min == "number") && min >= 0 && val != 0) ? 0 : min) < 0;
                        }
                        if (!_77d && ("max" in this.constraints)) {
                            var max = this.constraints.max;
                            _77d = this.compare(val, ((typeof max != "number") || max > 0) ? max : 0) > 0;
                        }
                        return _77d;
                    },
                    _isValidSubset: function() { return this.inherited(arguments) && !this._isDefinitelyOutOfRange(); },
                    isValid: function(_77e) { return this.inherited(arguments) && ((this._isEmpty(this.textbox.value) && !this.required) || this.isInRange(_77e)); },
                    getErrorMessage: function(_77f) { var v = this.get("value"); if (v != null && v !== "" && (typeof v != "number" || !isNaN(v)) && !this.isInRange(_77f)) { return this.rangeMessage; } return this.inherited(arguments); },
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        if (!this.rangeMessage) {
                            this.messages = i18n.getLocalization("dijit.form", "validate", this.lang);
                            this.rangeMessage = this.messages.rangeMessage;
                        }
                    }
                });
                return _77a;
            });
        },
        "dijit/form/DateTextBox": function() { define(["dojo/_base/declare", "../Calendar", "./_DateTimeTextBox"], function(_780, _781, _782) { return _780("dijit.form.DateTextBox", _782, { baseClass: "dijitTextBox dijitComboBox dijitDateTextBox", popupClass: _781, _selector: "date", maxHeight: Infinity, value: new Date("") }); }); },
        "dijit/Calendar": function() {
            define(["dojo/_base/array", "dojo/date", "dojo/date/locale", "dojo/_base/declare", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/_base/kernel", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/sniff", "./CalendarLite", "./_Widget", "./_CssStateMixin", "./_TemplatedMixin", "./form/DropDownButton"], function(_783, date, _784, _785, _786, _787, _788, _789, keys, lang, on, has, _78a, _78b, _78c, _78d, _78e) {
                var _78f = _785("dijit.Calendar", [_78a, _78b, _78c], {
                    baseClass: "dijitCalendar",
                    cssStateNodes: { "decrementMonth": "dijitCalendarArrow", "incrementMonth": "dijitCalendarArrow", "previousYearLabelNode": "dijitCalendarPreviousYear", "nextYearLabelNode": "dijitCalendarNextYear" },
                    setValue: function(_790) {
                        _789.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.", "", "2.0");
                        this.set("value", _790);
                    },
                    _createMonthWidget: function() { return new _78f._MonthDropDownButton({ id: this.id + "_mddb", tabIndex: -1, onMonthSelect: lang.hitch(this, "_onMonthSelect"), lang: this.lang, dateLocaleModule: this.dateLocaleModule }, this.monthNode); },
                    postCreate: function() {
                        this.inherited(arguments);
                        this.own(on(this.domNode, "keydown", lang.hitch(this, "_onKeyDown")), on(this.dateRowsNode, "mouseover", lang.hitch(this, "_onDayMouseOver")), on(this.dateRowsNode, "mouseout", lang.hitch(this, "_onDayMouseOut")), on(this.dateRowsNode, "mousedown", lang.hitch(this, "_onDayMouseDown")), on(this.dateRowsNode, "mouseup", lang.hitch(this, "_onDayMouseUp")));
                    },
                    _onMonthSelect: function(_791) {
                        var date = new this.dateClassObj(this.currentFocus);
                        date.setDate(1);
                        date.setMonth(_791);
                        var _792 = this.dateModule.getDaysInMonth(date);
                        var _793 = this.currentFocus.getDate();
                        date.setDate(Math.min(_793, _792));
                        this._setCurrentFocusAttr(date);
                    },
                    _onDayMouseOver: function(evt) {
                        var node = _787.contains(evt.target, "dijitCalendarDateLabel") ? evt.target.parentNode : evt.target;
                        if (node && ((node.dijitDateValue && !_787.contains(node, "dijitCalendarDisabledDate")) || node == this.previousYearLabelNode || node == this.nextYearLabelNode)) {
                            _787.add(node, "dijitCalendarHoveredDate");
                            this._currentNode = node;
                        }
                    },
                    _onDayMouseOut: function(evt) {
                        if (!this._currentNode) { return; }
                        if (evt.relatedTarget && evt.relatedTarget.parentNode == this._currentNode) { return; }
                        var cls = "dijitCalendarHoveredDate";
                        if (_787.contains(this._currentNode, "dijitCalendarActiveDate")) { cls += " dijitCalendarActiveDate"; }
                        _787.remove(this._currentNode, cls);
                        this._currentNode = null;
                    },
                    _onDayMouseDown: function(evt) {
                        var node = evt.target.parentNode;
                        if (node && node.dijitDateValue && !_787.contains(node, "dijitCalendarDisabledDate")) {
                            _787.add(node, "dijitCalendarActiveDate");
                            this._currentNode = node;
                        }
                    },
                    _onDayMouseUp: function(evt) { var node = evt.target.parentNode; if (node && node.dijitDateValue) { _787.remove(node, "dijitCalendarActiveDate"); } },
                    handleKey: function(evt) {
                        var _794 = -1,
                            _795, _796 = this.currentFocus;
                        switch (evt.keyCode) {
                            case keys.RIGHT_ARROW:
                                _794 = 1;
                            case keys.LEFT_ARROW:
                                _795 = "day";
                                if (!this.isLeftToRight()) { _794 *= -1; }
                                break;
                            case keys.DOWN_ARROW:
                                _794 = 1;
                            case keys.UP_ARROW:
                                _795 = "week";
                                break;
                            case keys.PAGE_DOWN:
                                _794 = 1;
                            case keys.PAGE_UP:
                                _795 = evt.ctrlKey || evt.altKey ? "year" : "month";
                                break;
                            case keys.END:
                                _796 = this.dateModule.add(_796, "month", 1);
                                _795 = "day";
                            case keys.HOME:
                                _796 = new this.dateClassObj(_796);
                                _796.setDate(1);
                                break;
                            default:
                                return true;
                        }
                        if (_795) { _796 = this.dateModule.add(_796, _795, _794); }
                        this._setCurrentFocusAttr(_796);
                        return false;
                    },
                    _onKeyDown: function(evt) {
                        if (!this.handleKey(evt)) {
                            evt.stopPropagation();
                            evt.preventDefault();
                        }
                    },
                    onValueSelected: function() {},
                    onChange: function(_797) { this.onValueSelected(_797); },
                    getClassForDate: function() {}
                });
                _78f._MonthDropDownButton = _785("dijit.Calendar._MonthDropDownButton", _78e, {
                    onMonthSelect: function() {},
                    postCreate: function() {
                        this.inherited(arguments);
                        this.dropDown = new _78f._MonthDropDown({ id: this.id + "_mdd", onChange: this.onMonthSelect });
                    },
                    _setMonthAttr: function(_798) {
                        var _799 = this.dateLocaleModule.getNames("months", "wide", "standAlone", this.lang, _798);
                        this.dropDown.set("months", _799);
                        this.containerNode.innerHTML = (has("ie") == 6 ? "" : "<div class='dijitSpacer'>" + this.dropDown.domNode.innerHTML + "</div>") + "<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>" + _799[_798.getMonth()] + "</div>";
                    }
                });
                _78f._MonthDropDown = _785("dijit.Calendar._MonthDropDown", [_78b, _78d, _78c], {
                    months: [],
                    baseClass: "dijitCalendarMonthMenu dijitMenu",
                    templateString: "<div data-dojo-attach-event='ondijitclick:_onClick'></div>",
                    _setMonthsAttr: function(_79a) {
                        this.domNode.innerHTML = "";
                        _783.forEach(_79a, function(_79b, idx) {
                            var div = _788.create("div", { className: "dijitCalendarMonthLabel", month: idx, innerHTML: _79b }, this.domNode);
                            div._cssState = "dijitCalendarMonthLabel";
                        }, this);
                    },
                    _onClick: function(evt) { this.onChange(_786.get(evt.target, "month")); },
                    onChange: function() {}
                });
                return _78f;
            });
        },
        "dojo/date": function() {
            define(["./has", "./_base/lang"], function(has, lang) {
                var date = {};
                date.getDaysInMonth = function(_79c) { var _79d = _79c.getMonth(); var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; if (_79d == 1 && date.isLeapYear(_79c)) { return 29; } return days[_79d]; };
                date.isLeapYear = function(_79e) { var year = _79e.getFullYear(); return !(year % 400) || (!(year % 4) && !!(year % 100)); };
                date.getTimezoneName = function(_79f) {
                    var str = _79f.toString();
                    var tz = "";
                    var _7a0;
                    var pos = str.indexOf("(");
                    if (pos > -1) { tz = str.substring(++pos, str.indexOf(")")); } else {
                        var pat = /([A-Z\/]+) \d{4}$/;
                        if ((_7a0 = str.match(pat))) { tz = _7a0[1]; } else {
                            str = _79f.toLocaleString();
                            pat = / ([A-Z\/]+)$/;
                            if ((_7a0 = str.match(pat))) { tz = _7a0[1]; }
                        }
                    }
                    return (tz == "AM" || tz == "PM") ? "" : tz;
                };
                date.compare = function(_7a1, _7a2, _7a3) {
                    _7a1 = new Date(+_7a1);
                    _7a2 = new Date(+(_7a2 || new Date()));
                    if (_7a3 == "date") {
                        _7a1.setHours(0, 0, 0, 0);
                        _7a2.setHours(0, 0, 0, 0);
                    } else {
                        if (_7a3 == "time") {
                            _7a1.setFullYear(0, 0, 0);
                            _7a2.setFullYear(0, 0, 0);
                        }
                    }
                    if (_7a1 > _7a2) { return 1; }
                    if (_7a1 < _7a2) { return -1; }
                    return 0;
                };
                date.add = function(date, _7a4, _7a5) {
                    var sum = new Date(+date);
                    var _7a6 = false;
                    var _7a7 = "Date";
                    switch (_7a4) {
                        case "day":
                            break;
                        case "weekday":
                            var days, _7a8;
                            var mod = _7a5 % 5;
                            if (!mod) {
                                days = (_7a5 > 0) ? 5 : -5;
                                _7a8 = (_7a5 > 0) ? ((_7a5 - 5) / 5) : ((_7a5 + 5) / 5);
                            } else {
                                days = mod;
                                _7a8 = parseInt(_7a5 / 5);
                            }
                            var strt = date.getDay();
                            var adj = 0;
                            if (strt == 6 && _7a5 > 0) { adj = 1; } else { if (strt == 0 && _7a5 < 0) { adj = -1; } }
                            var trgt = strt + days;
                            if (trgt == 0 || trgt == 6) { adj = (_7a5 > 0) ? 2 : -2; }
                            _7a5 = (7 * _7a8) + days + adj;
                            break;
                        case "year":
                            _7a7 = "FullYear";
                            _7a6 = true;
                            break;
                        case "week":
                            _7a5 *= 7;
                            break;
                        case "quarter":
                            _7a5 *= 3;
                        case "month":
                            _7a6 = true;
                            _7a7 = "Month";
                            break;
                        default:
                            _7a7 = "UTC" + _7a4.charAt(0).toUpperCase() + _7a4.substring(1) + "s";
                    }
                    if (_7a7) { sum["set" + _7a7](sum["get" + _7a7]() + _7a5); }
                    if (_7a6 && (sum.getDate() < date.getDate())) { sum.setDate(0); }
                    return sum;
                };
                date.difference = function(_7a9, _7aa, _7ab) {
                    _7aa = _7aa || new Date();
                    _7ab = _7ab || "day";
                    var _7ac = _7aa.getFullYear() - _7a9.getFullYear();
                    var _7ad = 1;
                    switch (_7ab) {
                        case "quarter":
                            var m1 = _7a9.getMonth();
                            var m2 = _7aa.getMonth();
                            var q1 = Math.floor(m1 / 3) + 1;
                            var q2 = Math.floor(m2 / 3) + 1;
                            q2 += (_7ac * 4);
                            _7ad = q2 - q1;
                            break;
                        case "weekday":
                            var days = Math.round(date.difference(_7a9, _7aa, "day"));
                            var _7ae = parseInt(date.difference(_7a9, _7aa, "week"));
                            var mod = days % 7;
                            if (mod == 0) { days = _7ae * 5; } else {
                                var adj = 0;
                                var aDay = _7a9.getDay();
                                var bDay = _7aa.getDay();
                                _7ae = parseInt(days / 7);
                                mod = days % 7;
                                var _7af = new Date(_7a9);
                                _7af.setDate(_7af.getDate() + (_7ae * 7));
                                var _7b0 = _7af.getDay();
                                if (days > 0) {
                                    switch (true) {
                                        case aDay == 6:
                                            adj = -1;
                                            break;
                                        case aDay == 0:
                                            adj = 0;
                                            break;
                                        case bDay == 6:
                                            adj = -1;
                                            break;
                                        case bDay == 0:
                                            adj = -2;
                                            break;
                                        case (_7b0 + mod) > 5:
                                            adj = -2;
                                    }
                                } else {
                                    if (days < 0) {
                                        switch (true) {
                                            case aDay == 6:
                                                adj = 0;
                                                break;
                                            case aDay == 0:
                                                adj = 1;
                                                break;
                                            case bDay == 6:
                                                adj = 2;
                                                break;
                                            case bDay == 0:
                                                adj = 1;
                                                break;
                                            case (_7b0 + mod) < 0:
                                                adj = 2;
                                        }
                                    }
                                }
                                days += adj;
                                days -= (_7ae * 2);
                            }
                            _7ad = days;
                            break;
                        case "year":
                            _7ad = _7ac;
                            break;
                        case "month":
                            _7ad = (_7aa.getMonth() - _7a9.getMonth()) + (_7ac * 12);
                            break;
                        case "week":
                            _7ad = parseInt(date.difference(_7a9, _7aa, "day") / 7);
                            break;
                        case "day":
                            _7ad /= 24;
                        case "hour":
                            _7ad /= 60;
                        case "minute":
                            _7ad /= 60;
                        case "second":
                            _7ad /= 1000;
                        case "millisecond":
                            _7ad *= _7aa.getTime() - _7a9.getTime();
                    }
                    return Math.round(_7ad);
                };
                1 && lang.mixin(lang.getObject("dojo.date", true), date);
                return date;
            });
        },
        "dojo/date/locale": function() {
            define(["../_base/lang", "../_base/array", "../date", "../cldr/supplemental", "../i18n", "../regexp", "../string", "../i18n!../cldr/nls/gregorian", "module"], function(lang, _7b1, date, _7b2, i18n, _7b3, _7b4, _7b5, _7b6) {
                var _7b7 = {};
                lang.setObject(_7b6.id.replace(/\//g, "."), _7b7);

                function _7b8(_7b9, _7ba, _7bb, _7bc) {
                    return _7bc.replace(/([a-z])\1*/ig, function(_7bd) {
                        var s, pad, c = _7bd.charAt(0),
                            l = _7bd.length,
                            _7be = ["abbr", "wide", "narrow"];
                        switch (c) {
                            case "G":
                                s = _7ba[(l < 4) ? "eraAbbr" : "eraNames"][_7b9.getFullYear() < 0 ? 0 : 1];
                                break;
                            case "y":
                                s = _7b9.getFullYear();
                                switch (l) {
                                    case 1:
                                        break;
                                    case 2:
                                        if (!_7bb.fullYear) {
                                            s = String(s);
                                            s = s.substr(s.length - 2);
                                            break;
                                        }
                                    default:
                                        pad = true;
                                }
                                break;
                            case "Q":
                            case "q":
                                s = Math.ceil((_7b9.getMonth() + 1) / 3);
                                pad = true;
                                break;
                            case "M":
                            case "L":
                                var m = _7b9.getMonth();
                                if (l < 3) {
                                    s = m + 1;
                                    pad = true;
                                } else {
                                    var _7bf = ["months", c == "L" ? "standAlone" : "format", _7be[l - 3]].join("-");
                                    s = _7ba[_7bf][m];
                                }
                                break;
                            case "w":
                                var _7c0 = 0;
                                s = _7b7._getWeekOfYear(_7b9, _7c0);
                                pad = true;
                                break;
                            case "d":
                                s = _7b9.getDate();
                                pad = true;
                                break;
                            case "D":
                                s = _7b7._getDayOfYear(_7b9);
                                pad = true;
                                break;
                            case "e":
                            case "c":
                                var d = _7b9.getDay();
                                if (l < 2) { s = (d - _7b2.getFirstDayOfWeek(_7bb.locale) + 8) % 7; break; }
                            case "E":
                                d = _7b9.getDay();
                                if (l < 3) {
                                    s = d + 1;
                                    pad = true;
                                } else {
                                    var _7c1 = ["days", c == "c" ? "standAlone" : "format", _7be[l - 3]].join("-");
                                    s = _7ba[_7c1][d];
                                }
                                break;
                            case "a":
                                var _7c2 = _7b9.getHours() < 12 ? "am" : "pm";
                                s = _7bb[_7c2] || _7ba["dayPeriods-format-wide-" + _7c2];
                                break;
                            case "h":
                            case "H":
                            case "K":
                            case "k":
                                var h = _7b9.getHours();
                                switch (c) {
                                    case "h":
                                        s = (h % 12) || 12;
                                        break;
                                    case "H":
                                        s = h;
                                        break;
                                    case "K":
                                        s = (h % 12);
                                        break;
                                    case "k":
                                        s = h || 24;
                                        break;
                                }
                                pad = true;
                                break;
                            case "m":
                                s = _7b9.getMinutes();
                                pad = true;
                                break;
                            case "s":
                                s = _7b9.getSeconds();
                                pad = true;
                                break;
                            case "S":
                                s = Math.round(_7b9.getMilliseconds() * Math.pow(10, l - 3));
                                pad = true;
                                break;
                            case "v":
                            case "z":
                                s = _7b7._getZone(_7b9, true, _7bb);
                                if (s) { break; }
                                l = 4;
                            case "Z":
                                var _7c3 = _7b7._getZone(_7b9, false, _7bb);
                                var tz = [(_7c3 <= 0 ? "+" : "-"), _7b4.pad(Math.floor(Math.abs(_7c3) / 60), 2), _7b4.pad(Math.abs(_7c3) % 60, 2)];
                                if (l == 4) {
                                    tz.splice(0, 0, "GMT");
                                    tz.splice(3, 0, ":");
                                }
                                s = tz.join("");
                                break;
                            default:
                                throw new Error("dojo.date.locale.format: invalid pattern char: " + _7bc);
                        }
                        if (pad) { s = _7b4.pad(s, l); }
                        return s;
                    });
                };
                _7b7._getZone = function(_7c4, _7c5, _7c6) { if (_7c5) { return date.getTimezoneName(_7c4); } else { return _7c4.getTimezoneOffset(); } };
                _7b7.format = function(_7c7, _7c8) {
                    _7c8 = _7c8 || {};
                    var _7c9 = i18n.normalizeLocale(_7c8.locale),
                        _7ca = _7c8.formatLength || "short",
                        _7cb = _7b7._getGregorianBundle(_7c9),
                        str = [],
                        _7cc = lang.hitch(this, _7b8, _7c7, _7cb, _7c8);
                    if (_7c8.selector == "year") { return _7cd(_7cb["dateFormatItem-yyyy"] || "yyyy", _7cc); }
                    var _7ce;
                    if (_7c8.selector != "date") { _7ce = _7c8.timePattern || _7cb["timeFormat-" + _7ca]; if (_7ce) { str.push(_7cd(_7ce, _7cc)); } }
                    if (_7c8.selector != "time") { _7ce = _7c8.datePattern || _7cb["dateFormat-" + _7ca]; if (_7ce) { str.push(_7cd(_7ce, _7cc)); } }
                    return str.length == 1 ? str[0] : _7cb["dateTimeFormat-" + _7ca].replace(/\'/g, "").replace(/\{(\d+)\}/g, function(_7cf, key) { return str[key]; });
                };
                _7b7.regexp = function(_7d0) { return _7b7._parseInfo(_7d0).regexp; };
                _7b7._parseInfo = function(_7d1) {
                    _7d1 = _7d1 || {};
                    var _7d2 = i18n.normalizeLocale(_7d1.locale),
                        _7d3 = _7b7._getGregorianBundle(_7d2),
                        _7d4 = _7d1.formatLength || "short",
                        _7d5 = _7d1.datePattern || _7d3["dateFormat-" + _7d4],
                        _7d6 = _7d1.timePattern || _7d3["timeFormat-" + _7d4],
                        _7d7;
                    if (_7d1.selector == "date") { _7d7 = _7d5; } else { if (_7d1.selector == "time") { _7d7 = _7d6; } else { _7d7 = _7d3["dateTimeFormat-" + _7d4].replace(/\{(\d+)\}/g, function(_7d8, key) { return [_7d6, _7d5][key]; }); } }
                    var _7d9 = [],
                        re = _7cd(_7d7, lang.hitch(this, _7da, _7d9, _7d3, _7d1));
                    return { regexp: re, tokens: _7d9, bundle: _7d3 };
                };
                _7b7.parse = function(_7db, _7dc) {
                    var _7dd = /[\u200E\u200F\u202A\u202E]/g,
                        info = _7b7._parseInfo(_7dc),
                        _7de = info.tokens,
                        _7df = info.bundle,
                        re = new RegExp("^" + info.regexp.replace(_7dd, "") + "$", info.strict ? "" : "i"),
                        _7e0 = re.exec(_7db && _7db.replace(_7dd, ""));
                    if (!_7e0) { return null; }
                    var _7e1 = ["abbr", "wide", "narrow"],
                        _7e2 = [1970, 0, 1, 0, 0, 0, 0],
                        amPm = "",
                        _7e3 = _7b1.every(_7e0, function(v, i) {
                            if (!i) { return true; }
                            var _7e4 = _7de[i - 1],
                                l = _7e4.length,
                                c = _7e4.charAt(0);
                            switch (c) {
                                case "y":
                                    if (l != 2 && _7dc.strict) { _7e2[0] = v; } else {
                                        if (v < 100) {
                                            v = Number(v);
                                            var year = "" + new Date().getFullYear(),
                                                _7e5 = year.substring(0, 2) * 100,
                                                _7e6 = Math.min(Number(year.substring(2, 4)) + 20, 99);
                                            _7e2[0] = (v < _7e6) ? _7e5 + v : _7e5 - 100 + v;
                                        } else {
                                            if (_7dc.strict) { return false; }
                                            _7e2[0] = v;
                                        }
                                    }
                                    break;
                                case "M":
                                case "L":
                                    if (l > 2) {
                                        var _7e7 = _7df["months-" + (c == "L" ? "standAlone" : "format") + "-" + _7e1[l - 3]].concat();
                                        if (!_7dc.strict) {
                                            v = v.replace(".", "").toLowerCase();
                                            _7e7 = _7b1.map(_7e7, function(s) { return s.replace(".", "").toLowerCase(); });
                                        }
                                        v = _7b1.indexOf(_7e7, v);
                                        if (v == -1) { return false; }
                                    } else { v--; }
                                    _7e2[1] = v;
                                    break;
                                case "E":
                                case "e":
                                case "c":
                                    var days = _7df["days-" + (c == "c" ? "standAlone" : "format") + "-" + _7e1[l - 3]].concat();
                                    if (!_7dc.strict) {
                                        v = v.toLowerCase();
                                        days = _7b1.map(days, function(d) { return d.toLowerCase(); });
                                    }
                                    v = _7b1.indexOf(days, v);
                                    if (v == -1) { return false; }
                                    break;
                                case "D":
                                    _7e2[1] = 0;
                                case "d":
                                    _7e2[2] = v;
                                    break;
                                case "a":
                                    var am = _7dc.am || _7df["dayPeriods-format-wide-am"],
                                        pm = _7dc.pm || _7df["dayPeriods-format-wide-pm"];
                                    if (!_7dc.strict) {
                                        var _7e8 = /\./g;
                                        v = v.replace(_7e8, "").toLowerCase();
                                        am = am.replace(_7e8, "").toLowerCase();
                                        pm = pm.replace(_7e8, "").toLowerCase();
                                    }
                                    if (_7dc.strict && v != am && v != pm) { return false; }
                                    amPm = (v == pm) ? "p" : (v == am) ? "a" : "";
                                    break;
                                case "K":
                                    if (v == 24) { v = 0; }
                                case "h":
                                case "H":
                                case "k":
                                    if (v > 23) { return false; }
                                    _7e2[3] = v;
                                    break;
                                case "m":
                                    _7e2[4] = v;
                                    break;
                                case "s":
                                    _7e2[5] = v;
                                    break;
                                case "S":
                                    _7e2[6] = v;
                            }
                            return true;
                        });
                    var _7e9 = +_7e2[3];
                    if (amPm === "p" && _7e9 < 12) { _7e2[3] = _7e9 + 12; } else { if (amPm === "a" && _7e9 == 12) { _7e2[3] = 0; } }
                    var _7ea = new Date(_7e2[0], _7e2[1], _7e2[2], _7e2[3], _7e2[4], _7e2[5], _7e2[6]);
                    if (_7dc.strict) { _7ea.setFullYear(_7e2[0]); }
                    var _7eb = _7de.join(""),
                        _7ec = _7eb.indexOf("d") != -1,
                        _7ed = _7eb.indexOf("M") != -1;
                    if (!_7e3 || (_7ed && _7ea.getMonth() > _7e2[1]) || (_7ec && _7ea.getDate() > _7e2[2])) { return null; }
                    if ((_7ed && _7ea.getMonth() < _7e2[1]) || (_7ec && _7ea.getDate() < _7e2[2])) { _7ea = date.add(_7ea, "hour", 1); }
                    return _7ea;
                };

                function _7cd(_7ee, _7ef, _7f0, _7f1) {
                    var _7f2 = function(x) { return x; };
                    _7ef = _7ef || _7f2;
                    _7f0 = _7f0 || _7f2;
                    _7f1 = _7f1 || _7f2;
                    var _7f3 = _7ee.match(/(''|[^'])+/g),
                        _7f4 = _7ee.charAt(0) == "'";
                    _7b1.forEach(_7f3, function(_7f5, i) {
                        if (!_7f5) { _7f3[i] = ""; } else {
                            _7f3[i] = (_7f4 ? _7f0 : _7ef)(_7f5.replace(/''/g, "'"));
                            _7f4 = !_7f4;
                        }
                    });
                    return _7f1(_7f3.join(""));
                };
                var _7f6 = ["abbr", "wide", "narrow"];

                function _7da(_7f7, _7f8, _7f9, _7fa) {
                    _7fa = _7b3.escapeString(_7fa);
                    if (!_7f9.strict) { _7fa = _7fa.replace(" a", " ?a"); }
                    return _7fa.replace(/([a-z])\1*/ig, function(_7fb) {
                        var s, c = _7fb.charAt(0),
                            l = _7fb.length,
                            p2 = "",
                            p3 = "";
                        if (_7f9.strict) { if (l > 1) { p2 = "0" + "{" + (l - 1) + "}"; } if (l > 2) { p3 = "0" + "{" + (l - 2) + "}"; } } else {
                            p2 = "0?";
                            p3 = "0{0,2}";
                        }
                        switch (c) {
                            case "y":
                                s = "\\d{2,4}";
                                break;
                            case "M":
                            case "L":
                                if (l > 2) {
                                    var _7fc = _7f8["months-" + (c == "L" ? "standAlone" : "format") + "-" + _7f6[l - 3]].slice(0);
                                    s = _7fc.join("|");
                                    if (!_7f9.strict) {
                                        s = s.replace(/\./g, "");
                                        s = "(?:" + s + ")\\.?";
                                    }
                                } else { s = "1[0-2]|" + p2 + "[1-9]"; }
                                break;
                            case "D":
                                s = "[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|" + p2 + "[1-9][0-9]|" + p3 + "[1-9]";
                                break;
                            case "d":
                                s = "3[01]|[12]\\d|" + p2 + "[1-9]";
                                break;
                            case "w":
                                s = "[1-4][0-9]|5[0-3]|" + p2 + "[1-9]";
                                break;
                            case "E":
                            case "e":
                            case "c":
                                s = ".+?";
                                break;
                            case "h":
                                s = "1[0-2]|" + p2 + "[1-9]";
                                break;
                            case "k":
                                s = "1[01]|" + p2 + "\\d";
                                break;
                            case "H":
                                s = "1\\d|2[0-3]|" + p2 + "\\d";
                                break;
                            case "K":
                                s = "1\\d|2[0-4]|" + p2 + "[1-9]";
                                break;
                            case "m":
                            case "s":
                                s = "[0-5]\\d";
                                break;
                            case "S":
                                s = "\\d{" + l + "}";
                                break;
                            case "a":
                                var am = _7f9.am || _7f8["dayPeriods-format-wide-am"],
                                    pm = _7f9.pm || _7f8["dayPeriods-format-wide-pm"];
                                s = am + "|" + pm;
                                if (!_7f9.strict) { if (am != am.toLowerCase()) { s += "|" + am.toLowerCase(); } if (pm != pm.toLowerCase()) { s += "|" + pm.toLowerCase(); } if (s.indexOf(".") != -1) { s += "|" + s.replace(/\./g, ""); } }
                                s = s.replace(/\./g, "\\.");
                                break;
                            default:
                                s = ".*";
                        }
                        if (_7f7) { _7f7.push(_7fb); }
                        return "(" + s + ")";
                    }).replace(/[\xa0 ]/g, "[\\s\\xa0]");
                };
                var _7fd = [];
                var _7fe = {};
                _7b7.addCustomFormats = function(_7ff, _800) {
                    _7fd.push({ pkg: _7ff, name: _800 });
                    _7fe = {};
                };
                _7b7._getGregorianBundle = function(_801) {
                    if (_7fe[_801]) { return _7fe[_801]; }
                    var _802 = {};
                    _7b1.forEach(_7fd, function(desc) {
                        var _803 = i18n.getLocalization(desc.pkg, desc.name, _801);
                        _802 = lang.mixin(_802, _803);
                    }, this);
                    return _7fe[_801] = _802;
                };
                _7b7.addCustomFormats(_7b6.id.replace(/\/date\/locale$/, ".cldr"), "gregorian");
                _7b7.getNames = function(item, type, _804, _805) {
                    var _806, _807 = _7b7._getGregorianBundle(_805),
                        _808 = [item, _804, type];
                    if (_804 == "standAlone") {
                        var key = _808.join("-");
                        _806 = _807[key];
                        if (_806[0] == 1) { _806 = undefined; }
                    }
                    _808[1] = "format";
                    return (_806 || _807[_808.join("-")]).concat();
                };
                _7b7.isWeekend = function(_809, _80a) {
                    var _80b = _7b2.getWeekend(_80a),
                        day = (_809 || new Date()).getDay();
                    if (_80b.end < _80b.start) { _80b.end += 7; if (day < _80b.start) { day += 7; } }
                    return day >= _80b.start && day <= _80b.end;
                };
                _7b7._getDayOfYear = function(_80c) { return date.difference(new Date(_80c.getFullYear(), 0, 1, _80c.getHours()), _80c) + 1; };
                _7b7._getWeekOfYear = function(_80d, _80e) {
                    if (arguments.length == 1) { _80e = 0; }
                    var _80f = new Date(_80d.getFullYear(), 0, 1).getDay(),
                        adj = (_80f - _80e + 7) % 7,
                        week = Math.floor((_7b7._getDayOfYear(_80d) + adj - 1) / 7);
                    if (_80f == _80e) { week++; }
                    return week;
                };
                return _7b7;
            });
        },
        "dojo/cldr/supplemental": function() {
            define(["../_base/lang", "../i18n"], function(lang, i18n) {
                var _810 = {};
                lang.setObject("dojo.cldr.supplemental", _810);
                _810.getFirstDayOfWeek = function(_811) { var _812 = { bd: 5, mv: 5, ae: 6, af: 6, bh: 6, dj: 6, dz: 6, eg: 6, iq: 6, ir: 6, jo: 6, kw: 6, ly: 6, ma: 6, om: 6, qa: 6, sa: 6, sd: 6, sy: 6, ye: 6, ag: 0, ar: 0, as: 0, au: 0, br: 0, bs: 0, bt: 0, bw: 0, by: 0, bz: 0, ca: 0, cn: 0, co: 0, dm: 0, "do": 0, et: 0, gt: 0, gu: 0, hk: 0, hn: 0, id: 0, ie: 0, il: 0, "in": 0, jm: 0, jp: 0, ke: 0, kh: 0, kr: 0, la: 0, mh: 0, mm: 0, mo: 0, mt: 0, mx: 0, mz: 0, ni: 0, np: 0, nz: 0, pa: 0, pe: 0, ph: 0, pk: 0, pr: 0, py: 0, sg: 0, sv: 0, th: 0, tn: 0, tt: 0, tw: 0, um: 0, us: 0, ve: 0, vi: 0, ws: 0, za: 0, zw: 0 }; var _813 = _810._region(_811); var dow = _812[_813]; return (dow === undefined) ? 1 : dow; };
                _810._region = function(_814) { _814 = i18n.normalizeLocale(_814); var tags = _814.split("-"); var _815 = tags[1]; if (!_815) { _815 = { aa: "et", ab: "ge", af: "za", ak: "gh", am: "et", ar: "eg", as: "in", av: "ru", ay: "bo", az: "az", ba: "ru", be: "by", bg: "bg", bi: "vu", bm: "ml", bn: "bd", bo: "cn", br: "fr", bs: "ba", ca: "es", ce: "ru", ch: "gu", co: "fr", cr: "ca", cs: "cz", cv: "ru", cy: "gb", da: "dk", de: "de", dv: "mv", dz: "bt", ee: "gh", el: "gr", en: "us", es: "es", et: "ee", eu: "es", fa: "ir", ff: "sn", fi: "fi", fj: "fj", fo: "fo", fr: "fr", fy: "nl", ga: "ie", gd: "gb", gl: "es", gn: "py", gu: "in", gv: "gb", ha: "ng", he: "il", hi: "in", ho: "pg", hr: "hr", ht: "ht", hu: "hu", hy: "am", ia: "fr", id: "id", ig: "ng", ii: "cn", ik: "us", "in": "id", is: "is", it: "it", iu: "ca", iw: "il", ja: "jp", ji: "ua", jv: "id", jw: "id", ka: "ge", kg: "cd", ki: "ke", kj: "na", kk: "kz", kl: "gl", km: "kh", kn: "in", ko: "kr", ks: "in", ku: "tr", kv: "ru", kw: "gb", ky: "kg", la: "va", lb: "lu", lg: "ug", li: "nl", ln: "cd", lo: "la", lt: "lt", lu: "cd", lv: "lv", mg: "mg", mh: "mh", mi: "nz", mk: "mk", ml: "in", mn: "mn", mo: "ro", mr: "in", ms: "my", mt: "mt", my: "mm", na: "nr", nb: "no", nd: "zw", ne: "np", ng: "na", nl: "nl", nn: "no", no: "no", nr: "za", nv: "us", ny: "mw", oc: "fr", om: "et", or: "in", os: "ge", pa: "in", pl: "pl", ps: "af", pt: "br", qu: "pe", rm: "ch", rn: "bi", ro: "ro", ru: "ru", rw: "rw", sa: "in", sd: "in", se: "no", sg: "cf", si: "lk", sk: "sk", sl: "si", sm: "ws", sn: "zw", so: "so", sq: "al", sr: "rs", ss: "za", st: "za", su: "id", sv: "se", sw: "tz", ta: "in", te: "in", tg: "tj", th: "th", ti: "et", tk: "tm", tl: "ph", tn: "za", to: "to", tr: "tr", ts: "za", tt: "ru", ty: "pf", ug: "cn", uk: "ua", ur: "pk", uz: "uz", ve: "za", vi: "vn", wa: "be", wo: "sn", xh: "za", yi: "il", yo: "ng", za: "cn", zh: "cn", zu: "za", ace: "id", ady: "ru", agq: "cm", alt: "ru", amo: "ng", asa: "tz", ast: "es", awa: "in", bal: "pk", ban: "id", bas: "cm", bax: "cm", bbc: "id", bem: "zm", bez: "tz", bfq: "in", bft: "pk", bfy: "in", bhb: "in", bho: "in", bik: "ph", bin: "ng", bjj: "in", bku: "ph", bqv: "ci", bra: "in", brx: "in", bss: "cm", btv: "pk", bua: "ru", buc: "yt", bug: "id", bya: "id", byn: "er", cch: "ng", ccp: "in", ceb: "ph", cgg: "ug", chk: "fm", chm: "ru", chp: "ca", chr: "us", cja: "kh", cjm: "vn", ckb: "iq", crk: "ca", csb: "pl", dar: "ru", dav: "ke", den: "ca", dgr: "ca", dje: "ne", doi: "in", dsb: "de", dua: "cm", dyo: "sn", dyu: "bf", ebu: "ke", efi: "ng", ewo: "cm", fan: "gq", fil: "ph", fon: "bj", fur: "it", gaa: "gh", gag: "md", gbm: "in", gcr: "gf", gez: "et", gil: "ki", gon: "in", gor: "id", grt: "in", gsw: "ch", guz: "ke", gwi: "ca", haw: "us", hil: "ph", hne: "in", hnn: "ph", hoc: "in", hoj: "in", ibb: "ng", ilo: "ph", inh: "ru", jgo: "cm", jmc: "tz", kaa: "uz", kab: "dz", kaj: "ng", kam: "ke", kbd: "ru", kcg: "ng", kde: "tz", kdt: "th", kea: "cv", ken: "cm", kfo: "ci", kfr: "in", kha: "in", khb: "cn", khq: "ml", kht: "in", kkj: "cm", kln: "ke", kmb: "ao", koi: "ru", kok: "in", kos: "fm", kpe: "lr", krc: "ru", kri: "sl", krl: "ru", kru: "in", ksb: "tz", ksf: "cm", ksh: "de", kum: "ru", lag: "tz", lah: "pk", lbe: "ru", lcp: "cn", lep: "in", lez: "ru", lif: "np", lis: "cn", lki: "ir", lmn: "in", lol: "cd", lua: "cd", luo: "ke", luy: "ke", lwl: "th", mad: "id", mag: "in", mai: "in", mak: "id", man: "gn", mas: "ke", mdf: "ru", mdh: "ph", mdr: "id", men: "sl", mer: "ke", mfe: "mu", mgh: "mz", mgo: "cm", min: "id", mni: "in", mnk: "gm", mnw: "mm", mos: "bf", mua: "cm", mwr: "in", myv: "ru", nap: "it", naq: "na", nds: "de", "new": "np", niu: "nu", nmg: "cm", nnh: "cm", nod: "th", nso: "za", nus: "sd", nym: "tz", nyn: "ug", pag: "ph", pam: "ph", pap: "bq", pau: "pw", pon: "fm", prd: "ir", raj: "in", rcf: "re", rej: "id", rjs: "np", rkt: "in", rof: "tz", rwk: "tz", saf: "gh", sah: "ru", saq: "ke", sas: "id", sat: "in", saz: "in", sbp: "tz", scn: "it", sco: "gb", sdh: "ir", seh: "mz", ses: "ml", shi: "ma", shn: "mm", sid: "et", sma: "se", smj: "se", smn: "fi", sms: "fi", snk: "ml", srn: "sr", srr: "sn", ssy: "er", suk: "tz", sus: "gn", swb: "yt", swc: "cd", syl: "bd", syr: "sy", tbw: "ph", tcy: "in", tdd: "cn", tem: "sl", teo: "ug", tet: "tl", tig: "er", tiv: "ng", tkl: "tk", tmh: "ne", tpi: "pg", trv: "tw", tsg: "ph", tts: "th", tum: "mw", tvl: "tv", twq: "ne", tyv: "ru", tzm: "ma", udm: "ru", uli: "fm", umb: "ao", unr: "in", unx: "in", vai: "lr", vun: "tz", wae: "ch", wal: "et", war: "ph", xog: "ug", xsr: "np", yao: "mz", yap: "fm", yav: "cm", zza: "tr" }[tags[0]]; } else { if (_815.length == 4) { _815 = tags[2]; } } return _815; };
                _810.getWeekend = function(_816) {
                    var _817 = { "in": 0, af: 4, dz: 4, ir: 4, om: 4, sa: 4, ye: 4, ae: 5, bh: 5, eg: 5, il: 5, iq: 5, jo: 5, kw: 5, ly: 5, ma: 5, qa: 5, sd: 5, sy: 5, tn: 5 },
                        _818 = { af: 5, dz: 5, ir: 5, om: 5, sa: 5, ye: 5, ae: 6, bh: 5, eg: 6, il: 6, iq: 6, jo: 6, kw: 6, ly: 6, ma: 6, qa: 6, sd: 6, sy: 6, tn: 6 },
                        _819 = _810._region(_816),
                        _81a = _817[_819],
                        end = _818[_819];
                    if (_81a === undefined) { _81a = 6; }
                    if (end === undefined) { end = 0; }
                    return { start: _81a, end: end };
                };
                return _810;
            });
        },
        "dijit/CalendarLite": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/cldr/supplemental", "dojo/date", "dojo/date/locale", "dojo/date/stamp", "dojo/dom", "dojo/dom-class", "dojo/dom-attr", "dojo/_base/lang", "dojo/on", "dojo/sniff", "dojo/string", "./_WidgetBase", "./_TemplatedMixin", "dojo/text!./templates/Calendar.html", "./a11yclick", "./hccss"], function(_81b, _81c, _81d, date, _81e, _81f, dom, _820, _821, lang, on, has, _822, _823, _824, _825) {
                var _826 = _81c("dijit.CalendarLite", [_823, _824], {
                    templateString: _825,
                    dowTemplateString: "<th class=\"dijitReset dijitCalendarDayLabelTemplate\" role=\"columnheader\" scope=\"col\"><span class=\"dijitCalendarDayLabel\">${d}</span></th>",
                    dateTemplateString: "<td class=\"dijitReset\" role=\"gridcell\" data-dojo-attach-point=\"dateCells\"><span class=\"dijitCalendarDateLabel\" data-dojo-attach-point=\"dateLabels\"></span></td>",
                    weekTemplateString: "<tr class=\"dijitReset dijitCalendarWeekTemplate\" role=\"row\">${d}${d}${d}${d}${d}${d}${d}</tr>",
                    value: new Date(""),
                    datePackage: "",
                    dayWidth: "narrow",
                    tabIndex: "0",
                    dayOffset: -1,
                    currentFocus: new Date(),
                    _setSummaryAttr: "gridNode",
                    baseClass: "dijitCalendar dijitCalendarLite",
                    _isValidDate: function(_827) { return _827 && !isNaN(_827) && typeof _827 == "object" && _827.toString() != this.constructor.prototype.value.toString(); },
                    _getValueAttr: function() {
                        var _828 = this._get("value");
                        if (_828 && !isNaN(_828)) {
                            var _829 = new this.dateClassObj(_828);
                            _829.setHours(0, 0, 0, 0);
                            if (_829.getDate() < _828.getDate()) { _829 = this.dateModule.add(_829, "hour", 1); }
                            return _829;
                        } else { return null; }
                    },
                    _setValueAttr: function(_82a, _82b) {
                        if (typeof _82a == "string") { _82a = _81f.fromISOString(_82a); }
                        _82a = this._patchDate(_82a);
                        if (this._isValidDate(_82a) && !this.isDisabledDate(_82a, this.lang)) {
                            this._set("value", _82a);
                            this.set("currentFocus", _82a);
                            this._markSelectedDates([_82a]);
                            if (this._created && (_82b || typeof _82b == "undefined")) { this.onChange(this.get("value")); }
                        } else {
                            this._set("value", null);
                            this._markSelectedDates([]);
                        }
                    },
                    _patchDate: function(_82c) {
                        if (_82c || _82c === 0) {
                            _82c = new this.dateClassObj(_82c);
                            _82c.setHours(1, 0, 0, 0);
                        }
                        return _82c;
                    },
                    _setText: function(node, text) {
                        while (node.firstChild) { node.removeChild(node.firstChild); }
                        node.appendChild(node.ownerDocument.createTextNode(text));
                    },
                    _populateGrid: function() {
                        var _82d = new this.dateClassObj(this.currentFocus);
                        _82d.setDate(1);
                        _82d = this._patchDate(_82d);
                        var _82e = _82d.getDay(),
                            _82f = this.dateModule.getDaysInMonth(_82d),
                            _830 = this.dateModule.getDaysInMonth(this.dateModule.add(_82d, "month", -1)),
                            _831 = new this.dateClassObj(),
                            _832 = this.dayOffset >= 0 ? this.dayOffset : _81d.getFirstDayOfWeek(this.lang);
                        if (_832 > _82e) { _832 -= 7; }
                        if (!this.summary) {
                            var _833 = this.dateLocaleModule.getNames("months", "wide", "standAlone", this.lang, _82d);
                            this.gridNode.setAttribute("summary", _833[_82d.getMonth()]);
                        }
                        this._date2cell = {};
                        _81b.forEach(this.dateCells, function(_834, idx) {
                            var i = idx + _832;
                            var date = new this.dateClassObj(_82d),
                                _835, _836 = "dijitCalendar",
                                adj = 0;
                            if (i < _82e) {
                                _835 = _830 - _82e + i + 1;
                                adj = -1;
                                _836 += "Previous";
                            } else {
                                if (i >= (_82e + _82f)) {
                                    _835 = i - _82e - _82f + 1;
                                    adj = 1;
                                    _836 += "Next";
                                } else {
                                    _835 = i - _82e + 1;
                                    _836 += "Current";
                                }
                            }
                            if (adj) { date = this.dateModule.add(date, "month", adj); }
                            date.setDate(_835);
                            if (!this.dateModule.compare(date, _831, "date")) { _836 = "dijitCalendarCurrentDate " + _836; }
                            if (this.isDisabledDate(date, this.lang)) {
                                _836 = "dijitCalendarDisabledDate " + _836;
                                _834.setAttribute("aria-disabled", "true");
                            } else {
                                _836 = "dijitCalendarEnabledDate " + _836;
                                _834.removeAttribute("aria-disabled");
                                _834.setAttribute("aria-selected", "false");
                            }
                            var _837 = this.getClassForDate(date, this.lang);
                            if (_837) { _836 = _837 + " " + _836; }
                            _834.className = _836 + "Month dijitCalendarDateTemplate";
                            var _838 = date.valueOf();
                            this._date2cell[_838] = _834;
                            _834.dijitDateValue = _838;
                            var _839 = date.getDateLocalized ? date.getDateLocalized(this.lang) : date.getDate();
                            this._setText(this.dateLabels[idx], _839);
                            _821.set(_834, "aria-label", _81e.format(date, { selector: "date", formatLength: "long" }));
                        }, this);
                    },
                    _populateControls: function() {
                        var _83a = new this.dateClassObj(this.currentFocus);
                        _83a.setDate(1);
                        this.monthWidget.set("month", _83a);
                        var y = _83a.getFullYear() - 1;
                        var d = new this.dateClassObj();
                        _81b.forEach(["previous", "current", "next"], function(name) {
                            d.setFullYear(y++);
                            this._setText(this[name + "YearLabelNode"], this.dateLocaleModule.format(d, { selector: "year", locale: this.lang }));
                        }, this);
                    },
                    goToToday: function() { this.set("value", new this.dateClassObj()); },
                    constructor: function(_83b) {
                        this.dateModule = _83b.datePackage ? lang.getObject(_83b.datePackage, false) : date;
                        this.dateClassObj = this.dateModule.Date || Date;
                        this.dateLocaleModule = _83b.datePackage ? lang.getObject(_83b.datePackage + ".locale", false) : _81e;
                    },
                    _createMonthWidget: function() { return _826._MonthWidget({ id: this.id + "_mddb", lang: this.lang, dateLocaleModule: this.dateLocaleModule }, this.monthNode); },
                    buildRendering: function() {
                        var d = this.dowTemplateString,
                            _83c = this.dateLocaleModule.getNames("days", this.dayWidth, "standAlone", this.lang),
                            _83d = this.dayOffset >= 0 ? this.dayOffset : _81d.getFirstDayOfWeek(this.lang);
                        this.dayCellsHtml = _822.substitute([d, d, d, d, d, d, d].join(""), { d: "" }, function() { return _83c[_83d++ % 7]; });
                        var r = _822.substitute(this.weekTemplateString, { d: this.dateTemplateString });
                        this.dateRowsHtml = [r, r, r, r, r, r].join("");
                        this.dateCells = [];
                        this.dateLabels = [];
                        this.inherited(arguments);
                        dom.setSelectable(this.domNode, false);
                        var _83e = new this.dateClassObj(this.currentFocus);
                        this.monthWidget = this._createMonthWidget();
                        this.set("currentFocus", _83e, false);
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        this._connectControls();
                    },
                    _connectControls: function() {
                        var _83f = lang.hitch(this, function(_840, part, _841) { this[_840].dojoClick = true; return on(this[_840], "click", lang.hitch(this, function() { this._setCurrentFocusAttr(this.dateModule.add(this.currentFocus, part, _841)); })); });
                        this.own(_83f("incrementMonth", "month", 1), _83f("decrementMonth", "month", -1), _83f("nextYearLabelNode", "year", 1), _83f("previousYearLabelNode", "year", -1));
                    },
                    _setCurrentFocusAttr: function(date, _842) {
                        var _843 = this.currentFocus,
                            _844 = this._getNodeByDate(_843);
                        date = this._patchDate(date);
                        this._set("currentFocus", date);
                        if (!this._date2cell || this.dateModule.difference(_843, date, "month") != 0) {
                            this._populateGrid();
                            this._populateControls();
                            this._markSelectedDates([this.value]);
                        }
                        var _845 = this._getNodeByDate(date);
                        _845.setAttribute("tabIndex", this.tabIndex);
                        if (this.focused || _842) { _845.focus(); }
                        if (_844 && _844 != _845) { if (has("webkit")) { _844.setAttribute("tabIndex", "-1"); } else { _844.removeAttribute("tabIndex"); } }
                    },
                    focus: function() { this._setCurrentFocusAttr(this.currentFocus, true); },
                    _onDayClick: function(evt) {
                        evt.stopPropagation();
                        evt.preventDefault();
                        for (var node = evt.target; node && !node.dijitDateValue && node.dijitDateValue !== 0; node = node.parentNode) {}
                        if (node && !_820.contains(node, "dijitCalendarDisabledDate")) { this.set("value", node.dijitDateValue); }
                    },
                    _getNodeByDate: function(_846) { _846 = this._patchDate(_846); return _846 && this._date2cell ? this._date2cell[_846.valueOf()] : null; },
                    _markSelectedDates: function(_847) {
                        function mark(_848, cell) {
                            _820.toggle(cell, "dijitCalendarSelectedDate", _848);
                            cell.setAttribute("aria-selected", _848 ? "true" : "false");
                        };
                        _81b.forEach(this._selectedCells || [], lang.partial(mark, false));
                        this._selectedCells = _81b.filter(_81b.map(_847, this._getNodeByDate, this), function(n) { return n; });
                        _81b.forEach(this._selectedCells, lang.partial(mark, true));
                    },
                    onChange: function() {},
                    isDisabledDate: function() {},
                    getClassForDate: function() {}
                });
                _826._MonthWidget = _81c("dijit.CalendarLite._MonthWidget", _823, {
                    _setMonthAttr: function(_849) {
                        var _84a = this.dateLocaleModule.getNames("months", "wide", "standAlone", this.lang, _849),
                            _84b = (has("ie") == 6 ? "" : "<div class='dijitSpacer'>" + _81b.map(_84a, function(s) { return "<div>" + s + "</div>"; }).join("") + "</div>");
                        this.domNode.innerHTML = _84b + "<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>" + _84a[_849.getMonth()] + "</div>";
                    }
                });
                return _826;
            });
        },
        "dijit/form/_DateTimeTextBox": function() {
            define(["dojo/date", "dojo/date/locale", "dojo/date/stamp", "dojo/_base/declare", "dojo/_base/lang", "./RangeBoundTextBox", "../_HasDropDown", "dojo/text!./templates/DropDownBox.html"], function(date, _84c, _84d, _84e, lang, _84f, _850, _851) {
                new Date("X");
                var _852 = _84e("dijit.form._DateTimeTextBox", [_84f, _850], {
                    templateString: _851,
                    hasDownArrow: true,
                    cssStateNodes: { "_buttonNode": "dijitDownArrowButton" },
                    _unboundedConstraints: {},
                    pattern: _84c.regexp,
                    datePackage: "",
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this._set("type", "text");
                    },
                    compare: function(val1, val2) {
                        var _853 = this._isInvalidDate(val1);
                        var _854 = this._isInvalidDate(val2);
                        if (_853 || _854) { return (_853 && _854) ? 0 : (!_853 ? 1 : -1); }
                        var _855 = this.format(val1, this._unboundedConstraints),
                            _856 = this.format(val2, this._unboundedConstraints),
                            _857 = this.parse(_855, this._unboundedConstraints),
                            _858 = this.parse(_856, this._unboundedConstraints);
                        return _855 == _856 ? 0 : date.compare(_857, _858, this._selector);
                    },
                    autoWidth: true,
                    format: function(_859, _85a) { if (!_859) { return ""; } return this.dateLocaleModule.format(_859, _85a); },
                    "parse": function(_85b, _85c) { return this.dateLocaleModule.parse(_85b, _85c) || (this._isEmpty(_85b) ? null : undefined); },
                    serialize: function(val, _85d) { if (val.toGregorian) { val = val.toGregorian(); } return _84d.toISOString(val, _85d); },
                    dropDownDefaultValue: new Date(),
                    value: new Date(""),
                    _blankValue: null,
                    popupClass: "",
                    _selector: "",
                    constructor: function(_85e) {
                        _85e = _85e || {};
                        this.dateModule = _85e.datePackage ? lang.getObject(_85e.datePackage, false) : date;
                        this.dateClassObj = this.dateModule.Date || Date;
                        if (!(this.dateClassObj instanceof Date)) { this.value = new this.dateClassObj(this.value); }
                        this.dateLocaleModule = _85e.datePackage ? lang.getObject(_85e.datePackage + ".locale", false) : _84c;
                        this._set("pattern", this.dateLocaleModule.regexp);
                        this._invalidDate = this.constructor.prototype.value.toString();
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        if (!this.hasDownArrow) { this._buttonNode.style.display = "none"; }
                        if (!this.hasDownArrow) {
                            this._buttonNode = this.domNode;
                            this.baseClass += " dijitComboBoxOpenOnClick";
                        }
                    },
                    _setConstraintsAttr: function(_85f) {
                        _85f.selector = this._selector;
                        _85f.fullYear = true;
                        var _860 = _84d.fromISOString;
                        if (typeof _85f.min == "string") { _85f.min = _860(_85f.min); if (!(this.dateClassObj instanceof Date)) { _85f.min = new this.dateClassObj(_85f.min); } }
                        if (typeof _85f.max == "string") { _85f.max = _860(_85f.max); if (!(this.dateClassObj instanceof Date)) { _85f.max = new this.dateClassObj(_85f.max); } }
                        this.inherited(arguments);
                        this._unboundedConstraints = lang.mixin({}, this.constraints, { min: null, max: null });
                    },
                    _isInvalidDate: function(_861) { return !_861 || isNaN(_861) || typeof _861 != "object" || _861.toString() == this._invalidDate; },
                    _setValueAttr: function(_862, _863, _864) {
                        if (_862 !== undefined) { if (typeof _862 == "string") { _862 = _84d.fromISOString(_862); } if (this._isInvalidDate(_862)) { _862 = null; } if (_862 instanceof Date && !(this.dateClassObj instanceof Date)) { _862 = new this.dateClassObj(_862); } }
                        this.inherited(arguments, [_862, _863, _864]);
                        if (this.value instanceof Date) { this.filterString = ""; }
                        if (_863 !== false && this.dropDown) { this.dropDown.set("value", _862, false); }
                    },
                    _set: function(attr, _865) {
                        if (attr == "value") { if (_865 instanceof Date && !(this.dateClassObj instanceof Date)) { _865 = new this.dateClassObj(_865); } var _866 = this._get("value"); if (_866 instanceof this.dateClassObj && this.compare(_865, _866) == 0) { return; } }
                        this.inherited(arguments);
                    },
                    _setDropDownDefaultValueAttr: function(val) {
                        if (this._isInvalidDate(val)) { val = new this.dateClassObj(); }
                        this._set("dropDownDefaultValue", val);
                    },
                    openDropDown: function(_867) {
                        if (this.dropDown) { this.dropDown.destroy(); }
                        var _868 = lang.isString(this.popupClass) ? lang.getObject(this.popupClass, false) : this.popupClass,
                            _869 = this,
                            _86a = this.get("value");
                        this.dropDown = new _868({ onChange: function(_86b) { _869.set("value", _86b, true); }, id: this.id + "_popup", dir: _869.dir, lang: _869.lang, value: _86a, textDir: _869.textDir, currentFocus: !this._isInvalidDate(_86a) ? _86a : this.dropDownDefaultValue, constraints: _869.constraints, filterString: _869.filterString, datePackage: _869.datePackage, isDisabledDate: function(date) { return !_869.rangeCheck(date, _869.constraints); } });
                        this.inherited(arguments);
                    },
                    _getDisplayedValueAttr: function() { return this.textbox.value; },
                    _setDisplayedValueAttr: function(_86c, _86d) { this._setValueAttr(this.parse(_86c, this.constraints), _86d, _86c); }
                });
                return _852;
            });
        },
        "dijit/form/TimeTextBox": function() {
            define(["dojo/_base/declare", "dojo/keys", "dojo/query", "dojo/_base/lang", "../_TimePicker", "./_DateTimeTextBox"], function(_86e, keys, _86f, lang, _870, _871) {
                var _872 = _86e("dijit.form.TimeTextBox", _871, {
                    baseClass: "dijitTextBox dijitComboBox dijitTimeTextBox",
                    popupClass: _870,
                    _selector: "time",
                    value: new Date(""),
                    maxHeight: -1,
                    openDropDown: function(_873) {
                        this.inherited(arguments);
                        var _874 = _86f(".dijitTimePickerItemSelected", this.dropDown.domNode),
                            _875 = this.dropDown.domNode.parentNode;
                        if (_874[0]) { _875.scrollTop = _874[0].offsetTop - (_875.clientHeight - _874[0].clientHeight) / 2; } else { _875.scrollTop = (_875.scrollHeight - _875.clientHeight) / 2; }
                        this.dropDown.on("input", lang.hitch(this, function() { this.set("value", this.dropDown.get("value"), false); }));
                    },
                    _onInput: function() {
                        this.inherited(arguments);
                        var val = this.get("displayedValue");
                        this.filterString = (val && !this.parse(val, this.constraints)) ? val.toLowerCase() : "";
                        if (this._opened) { this.closeDropDown(); }
                        this.openDropDown();
                    }
                });
                return _872;
            });
        },
        "dijit/_TimePicker": function() {
            define(["dojo/_base/array", "dojo/date", "dojo/date/locale", "dojo/date/stamp", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-construct", "dojo/_base/kernel", "dojo/keys", "dojo/_base/lang", "dojo/sniff", "dojo/query", "dojo/mouse", "dojo/on", "./_WidgetBase", "./form/_ListMouseMixin"], function(_876, _877, _878, _879, _87a, _87b, _87c, _87d, keys, lang, has, _87e, _87f, on, _880, _881) {
                var _882 = _87a("dijit._TimePicker", [_880, _881], {
                    baseClass: "dijitTimePicker",
                    pickerMin: "T00:00:00",
                    pickerMax: "T23:59:59",
                    clickableIncrement: "T00:15:00",
                    visibleIncrement: "T01:00:00",
                    value: new Date(),
                    _visibleIncrement: 2,
                    _clickableIncrement: 1,
                    _totalIncrements: 10,
                    constraints: {},
                    serialize: _879.toISOString,
                    buildRendering: function() {
                        this.inherited(arguments);
                        this.containerNode = this.domNode;
                        this.timeMenu = this.domNode;
                    },
                    setValue: function(_883) {
                        _87d.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.", "", "2.0");
                        this.set("value", _883);
                    },
                    _setValueAttr: function(date) {
                        this._set("value", date);
                        this._showText();
                    },
                    _setFilterStringAttr: function(val) {
                        this._set("filterString", val);
                        this._showText();
                    },
                    isDisabledDate: function() { return false; },
                    _getFilteredNodes: function(_884, _885, _886, _887) { var _888 = this.ownerDocument.createDocumentFragment(); for (var i = 0; i < this._maxIncrement; i++) { var n = this._createOption(i); if (n) { _888.appendChild(n); } } return _888; },
                    _showText: function() {
                        var _889 = _879.fromISOString;
                        this.domNode.innerHTML = "";
                        this._clickableIncrementDate = _889(this.clickableIncrement);
                        this._visibleIncrementDate = _889(this.visibleIncrement);
                        var _88a = function(date) { return date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds(); },
                            _88b = _88a(this._clickableIncrementDate),
                            _88c = _88a(this._visibleIncrementDate),
                            time = (this.value || this.currentFocus).getTime();
                        this._refDate = _889(this.pickerMin);
                        this._refDate.setFullYear(1970, 0, 1);
                        this._clickableIncrement = 1;
                        this._visibleIncrement = _88c / _88b;
                        var _88d = _889(this.pickerMax);
                        _88d.setFullYear(1970, 0, 1);
                        var _88e = (_88d.getTime() - this._refDate.getTime()) * 0.001;
                        this._maxIncrement = Math.ceil((_88e + 1) / _88b);
                        var _88f = this._getFilteredNodes();
                        if (!_88f.firstChild && this.filterString) {
                            this.filterString = "";
                            this._showText();
                        } else { this.domNode.appendChild(_88f); }
                    },
                    constructor: function() { this.constraints = {}; },
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this._setConstraintsAttr(this.constraints);
                    },
                    _setConstraintsAttr: function(_890) { for (var key in { clickableIncrement: 1, visibleIncrement: 1, pickerMin: 1, pickerMax: 1 }) { if (key in _890) { this[key] = _890[key]; } } if (!_890.locale) { _890.locale = this.lang; } },
                    _createOption: function(_891) {
                        var date = new Date(this._refDate);
                        var _892 = this._clickableIncrementDate;
                        date.setHours(date.getHours() + _892.getHours() * _891, date.getMinutes() + _892.getMinutes() * _891, date.getSeconds() + _892.getSeconds() * _891);
                        if (this.constraints.selector == "time") { date.setFullYear(1970, 0, 1); }
                        var _893 = _878.format(date, this.constraints);
                        if (this.filterString && _893.toLowerCase().indexOf(this.filterString) !== 0) { return null; }
                        var div = this.ownerDocument.createElement("div");
                        div.className = this.baseClass + "Item";
                        div.date = date;
                        div.idx = _891;
                        _87c.create("div", { "class": this.baseClass + "ItemInner", innerHTML: _893 }, div);
                        var _894 = _891 % this._visibleIncrement < 1 && _891 % this._visibleIncrement > -1,
                            tick = !_894 && !(_891 % this._clickableIncrement);
                        if (_894) { div.className += " " + this.baseClass + "Marker"; } else { if (tick) { div.className += " " + this.baseClass + "Tick"; } }
                        if (this.isDisabledDate(date)) { div.className += " " + this.baseClass + "ItemDisabled"; }
                        if (this.value && !_877.compare(this.value, date, this.constraints.selector)) {
                            div.selected = true;
                            div.className += " " + this.baseClass + "ItemSelected";
                            this._selectedDiv = div;
                            if (_894) { div.className += " " + this.baseClass + "MarkerSelected"; } else { if (tick) { div.className += " " + this.baseClass + "TickSelected"; } }
                            this._highlightOption(div, true);
                        }
                        return div;
                    },
                    onOpen: function() {
                        this.inherited(arguments);
                        this.set("selected", this._selectedDiv);
                    },
                    _onOptionSelected: function(tgt, _895) {
                        var _896 = tgt.target.date || tgt.target.parentNode.date;
                        if (!_896 || this.isDisabledDate(_896)) { return; }
                        this._set("value", _896);
                        this.emit("input");
                        if (_895) {
                            this._highlighted_option = null;
                            this.set("value", _896);
                            this.onChange(_896);
                        }
                    },
                    onChange: function() {},
                    _highlightOption: function(node, _897) {
                        if (!node) { return; }
                        if (_897) {
                            if (this._highlighted_option) { this._highlightOption(this._highlighted_option, false); }
                            this._highlighted_option = node;
                        } else { if (this._highlighted_option !== node) { return; } else { this._highlighted_option = null; } }
                        _87b.toggle(node, this.baseClass + "ItemHover", _897);
                        if (_87b.contains(node, this.baseClass + "Marker")) { _87b.toggle(node, this.baseClass + "MarkerHover", _897); } else { _87b.toggle(node, this.baseClass + "TickHover", _897); }
                    },
                    handleKey: function(e) {
                        if (e.keyCode == keys.DOWN_ARROW) {
                            this.selectNextNode();
                            this._onOptionSelected({ target: this._highlighted_option }, false);
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        } else {
                            if (e.keyCode == keys.UP_ARROW) {
                                this.selectPreviousNode();
                                this._onOptionSelected({ target: this._highlighted_option }, false);
                                e.stopPropagation();
                                e.preventDefault();
                                return false;
                            } else { if (e.keyCode == keys.ENTER || e.keyCode === keys.TAB) { if (!this._keyboardSelected && e.keyCode === keys.TAB) { return true; } if (this._highlighted_option) { this._onOptionSelected({ target: this._highlighted_option }, true); } return e.keyCode === keys.TAB; } }
                        }
                        return undefined;
                    },
                    onHover: function(node) { this._highlightOption(node, true); },
                    onUnhover: function(node) { this._highlightOption(node, false); },
                    onSelect: function(node) { this._highlightOption(node, true); },
                    onDeselect: function(node) { this._highlightOption(node, false); },
                    onClick: function(node) { this._onOptionSelected({ target: node }, true); }
                });
                return _882;
            });
        },
        "dijit/form/NumberSpinner": function() {
            define(["dojo/_base/declare", "dojo/keys", "./_Spinner", "./NumberTextBox"], function(_898, keys, _899, _89a) {
                return _898("dijit.form.NumberSpinner", [_899, _89a.Mixin], {
                    baseClass: "dijitTextBox dijitSpinner dijitNumberTextBox",
                    adjust: function(val, _89b) {
                        var tc = this.constraints,
                            v = isNaN(val),
                            _89c = !isNaN(tc.max),
                            _89d = !isNaN(tc.min);
                        if (v && _89b != 0) { val = (_89b > 0) ? _89d ? tc.min : _89c ? tc.max : 0 : _89c ? this.constraints.max : _89d ? tc.min : 0; }
                        var _89e = val + _89b;
                        if (v || isNaN(_89e)) { return val; }
                        if (_89c && (_89e > tc.max)) { _89e = tc.max; }
                        if (_89d && (_89e < tc.min)) { _89e = tc.min; }
                        return _89e;
                    },
                    _onKeyDown: function(e) {
                        if (this.disabled || this.readOnly) { return; }
                        if ((e.keyCode == keys.HOME || e.keyCode == keys.END) && !(e.ctrlKey || e.altKey || e.metaKey) && typeof this.get("value") != "undefined") {
                            var _89f = this.constraints[(e.keyCode == keys.HOME ? "min" : "max")];
                            if (typeof _89f == "number") { this._setValueAttr(_89f, false); }
                            e.stopPropagation();
                            e.preventDefault();
                        }
                    }
                });
            });
        },
        "dijit/form/_Spinner": function() {
            define(["dojo/_base/declare", "dojo/keys", "dojo/_base/lang", "dojo/sniff", "dojo/mouse", "dojo/on", "../typematic", "./RangeBoundTextBox", "dojo/text!./templates/Spinner.html", "./_TextBoxMixin"], function(_8a0, keys, lang, has, _8a1, on, _8a2, _8a3, _8a4, _8a5) {
                return _8a0("dijit.form._Spinner", _8a3, {
                    defaultTimeout: 500,
                    minimumTimeout: 10,
                    timeoutChangeRate: 0.9,
                    smallDelta: 1,
                    largeDelta: 10,
                    templateString: _8a4,
                    baseClass: "dijitTextBox dijitSpinner",
                    cssStateNodes: { "upArrowNode": "dijitUpArrowButton", "downArrowNode": "dijitDownArrowButton" },
                    adjust: function(val) { return val; },
                    _arrowPressed: function(_8a6, _8a7, _8a8) {
                        if (this.disabled || this.readOnly) { return; }
                        this._setValueAttr(this.adjust(this.get("value"), _8a7 * _8a8), false);
                        _8a5.selectInputText(this.textbox, this.textbox.value.length);
                    },
                    _arrowReleased: function() { this._wheelTimer = null; },
                    _typematicCallback: function(_8a9, node, evt) {
                        var inc = this.smallDelta;
                        if (node == this.textbox) {
                            var key = evt.keyCode;
                            inc = (key == keys.PAGE_UP || key == keys.PAGE_DOWN) ? this.largeDelta : this.smallDelta;
                            node = (key == keys.UP_ARROW || key == keys.PAGE_UP) ? this.upArrowNode : this.downArrowNode;
                        }
                        if (_8a9 == -1) { this._arrowReleased(node); } else { this._arrowPressed(node, (node == this.upArrowNode) ? 1 : -1, inc); }
                    },
                    _wheelTimer: null,
                    _mouseWheeled: function(evt) {
                        if (!this.focused) { return; }
                        evt.stopPropagation();
                        evt.preventDefault();
                        var _8aa = evt.wheelDelta / 120;
                        if (Math.floor(_8aa) != _8aa) { _8aa = evt.wheelDelta > 0 ? 1 : -1; }
                        var _8ab = evt.detail ? (evt.detail * -1) : _8aa;
                        if (_8ab !== 0) {
                            var node = this[(_8ab > 0 ? "upArrowNode" : "downArrowNode")];
                            this._arrowPressed(node, _8ab, this.smallDelta);
                            if (this._wheelTimer) { this._wheelTimer.remove(); }
                            this._wheelTimer = this.defer(function() { this._arrowReleased(node); }, 50);
                        }
                    },
                    _setConstraintsAttr: function(_8ac) { this.inherited(arguments); if (this.focusNode) { if (this.constraints.min !== undefined) { this.focusNode.setAttribute("aria-valuemin", this.constraints.min); } else { this.focusNode.removeAttribute("aria-valuemin"); } if (this.constraints.max !== undefined) { this.focusNode.setAttribute("aria-valuemax", this.constraints.max); } else { this.focusNode.removeAttribute("aria-valuemax"); } } },
                    _setValueAttr: function(_8ad, _8ae) {
                        this.focusNode.setAttribute("aria-valuenow", _8ad);
                        this.inherited(arguments);
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        this.own(on(this.domNode, _8a1.wheel, lang.hitch(this, "_mouseWheeled")), _8a2.addListener(this.upArrowNode, this.textbox, { keyCode: keys.UP_ARROW, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false }, this, "_typematicCallback", this.timeoutChangeRate, this.defaultTimeout, this.minimumTimeout), _8a2.addListener(this.downArrowNode, this.textbox, { keyCode: keys.DOWN_ARROW, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false }, this, "_typematicCallback", this.timeoutChangeRate, this.defaultTimeout, this.minimumTimeout), _8a2.addListener(this.upArrowNode, this.textbox, { keyCode: keys.PAGE_UP, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false }, this, "_typematicCallback", this.timeoutChangeRate, this.defaultTimeout, this.minimumTimeout), _8a2.addListener(this.downArrowNode, this.textbox, { keyCode: keys.PAGE_DOWN, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false }, this, "_typematicCallback", this.timeoutChangeRate, this.defaultTimeout, this.minimumTimeout));
                    }
                });
            });
        },
        "dijit/form/ComboBox": function() { define(["dojo/_base/declare", "./ValidationTextBox", "./ComboBoxMixin"], function(_8af, _8b0, _8b1) { return _8af("dijit.form.ComboBox", [_8b0, _8b1], {}); }); },
        "dijit/form/MultiSelect": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-geometry", "dojo/sniff", "dojo/query", "./_FormValueWidget", "dojo/NodeList-dom"], function(_8b2, _8b3, _8b4, has, _8b5, _8b6) {
                var _8b7 = _8b3("dijit.form.MultiSelect" + (has("dojo-bidi") ? "_NoBidi" : ""), _8b6, {
                    size: 7,
                    baseClass: "dijitMultiSelect",
                    templateString: "<select multiple='multiple' ${!nameAttrSetting} data-dojo-attach-point='containerNode,focusNode' data-dojo-attach-event='onchange: _onChange'></select>",
                    addSelected: function(_8b8) {
                        _8b8.getSelected().forEach(function(n) {
                            this.containerNode.appendChild(n);
                            this.domNode.scrollTop = this.domNode.offsetHeight;
                            var _8b9 = _8b8.domNode.scrollTop;
                            _8b8.domNode.scrollTop = 0;
                            _8b8.domNode.scrollTop = _8b9;
                        }, this);
                        this._set("value", this.get("value"));
                    },
                    getSelected: function() { return _8b5("option", this.containerNode).filter(function(n) { return n.selected; }); },
                    _getValueAttr: function() { return _8b2.map(this.getSelected(), function(n) { return n.value; }); },
                    multiple: true,
                    _setMultipleAttr: function(val) {},
                    _setValueAttr: function(_8ba) {
                        if (has("android")) {
                            _8b5("option", this.containerNode).orphan().forEach(function(n) {
                                var _8bb = n.ownerDocument.createElement("option");
                                _8bb.value = n.value;
                                _8bb.selected = (_8b2.indexOf(_8ba, n.value) != -1);
                                _8bb.text = n.text;
                                _8bb.originalText = n.originalText;
                                this.containerNode.appendChild(_8bb);
                            }, this);
                        } else { _8b5("option", this.containerNode).forEach(function(n) { n.selected = (_8b2.indexOf(_8ba, n.value) != -1); }); }
                        this.inherited(arguments);
                    },
                    invertSelection: function(_8bc) {
                        var val = [];
                        _8b5("option", this.containerNode).forEach(function(n) { if (!n.selected) { val.push(n.value); } });
                        this._setValueAttr(val, !(_8bc === false || _8bc == null));
                    },
                    _onChange: function() { this._handleOnChange(this.get("value"), true); },
                    resize: function(size) { if (size) { _8b4.setMarginBox(this.domNode, size); } },
                    postCreate: function() {
                        this._set("value", this.get("value"));
                        this.inherited(arguments);
                    }
                });
                if (has("dojo-bidi")) {
                    _8b7 = _8b3("dijit.form.MultiSelect", _8b7, {
                        addSelected: function(_8bd) {
                            _8bd.getSelected().forEach(function(n) { n.text = this.enforceTextDirWithUcc(this.restoreOriginalText(n), n.text); }, this);
                            this.inherited(arguments);
                        },
                        _setTextDirAttr: function(_8be) {
                            if ((this.textDir != _8be || !this._created) && this.enforceTextDirWithUcc) {
                                this._set("textDir", _8be);
                                _8b5("option", this.containerNode).forEach(function(_8bf) {
                                    if (!this._created && _8bf.value === _8bf.text) { _8bf.value = _8bf.text; }
                                    _8bf.text = this.enforceTextDirWithUcc(_8bf, _8bf.originalText || _8bf.text);
                                }, this);
                            }
                        }
                    });
                }
                return _8b7;
            });
        },
        "dijit/form/Select": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-geometry", "dojo/i18n", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/sniff", "./_FormSelectWidget", "../_HasDropDown", "../DropDownMenu", "../MenuItem", "../MenuSeparator", "../Tooltip", "../_KeyNavMixin", "../registry", "dojo/text!./templates/Select.html", "dojo/i18n!./nls/validate"], function(_8c0, _8c1, _8c2, _8c3, _8c4, i18n, keys, lang, on, has, _8c5, _8c6, _8c7, _8c8, _8c9, _8ca, _8cb, _8cc, _8cd) {
                var _8ce = _8c1("dijit.form._SelectMenu", _8c7, {
                    autoFocus: true,
                    buildRendering: function() {
                        this.inherited(arguments);
                        this.domNode.setAttribute("role", "listbox");
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        this.own(on(this.domNode, "selectstart", function(evt) {
                            evt.preventDefault();
                            evt.stopPropagation();
                        }));
                    },
                    focus: function() {
                        var _8cf = false,
                            val = this.parentWidget.value;
                        if (lang.isArray(val)) { val = val[val.length - 1]; }
                        if (val) {
                            _8c0.forEach(this.parentWidget._getChildren(), function(_8d0) {
                                if (_8d0.option && (val === _8d0.option.value)) {
                                    _8cf = true;
                                    this.focusChild(_8d0, false);
                                }
                            }, this);
                        }
                        if (!_8cf) { this.inherited(arguments); }
                    }
                });
                var _8d1 = _8c1("dijit.form.Select" + (has("dojo-bidi") ? "_NoBidi" : ""), [_8c5, _8c6, _8cb], {
                    baseClass: "dijitSelect dijitValidationTextBox",
                    templateString: _8cd,
                    _buttonInputDisabled: has("ie") ? "disabled" : "",
                    required: false,
                    state: "",
                    message: "",
                    tooltipPosition: [],
                    emptyLabel: "&#160;",
                    _isLoaded: false,
                    _childrenLoaded: false,
                    labelType: "html",
                    _fillContent: function() {
                        this.inherited(arguments);
                        if (this.options.length && !this.value && this.srcNodeRef) {
                            var si = this.srcNodeRef.selectedIndex || 0;
                            this._set("value", this.options[si >= 0 ? si : 0].value);
                        }
                        this.dropDown = new _8ce({ id: this.id + "_menu", parentWidget: this });
                        _8c3.add(this.dropDown.domNode, this.baseClass.replace(/\s+|$/g, "Menu "));
                    },
                    _getMenuItemForOption: function(_8d2) {
                        if (!_8d2.value && !_8d2.label) { return new _8c9({ ownerDocument: this.ownerDocument }); } else {
                            var _8d3 = lang.hitch(this, "_setValueAttr", _8d2);
                            var item = new _8c8({ option: _8d2, label: (this.labelType === "text" ? (_8d2.label || "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;") : _8d2.label) || this.emptyLabel, onClick: _8d3, ownerDocument: this.ownerDocument, dir: this.dir, textDir: this.textDir, disabled: _8d2.disabled || false });
                            item.focusNode.setAttribute("role", "option");
                            return item;
                        }
                    },
                    _addOptionItem: function(_8d4) { if (this.dropDown) { this.dropDown.addChild(this._getMenuItemForOption(_8d4)); } },
                    _getChildren: function() { if (!this.dropDown) { return []; } return this.dropDown.getChildren(); },
                    focus: function() { if (!this.disabled && this.focusNode.focus) { try { this.focusNode.focus(); } catch (e) {} } },
                    focusChild: function(_8d5) { if (_8d5) { this.set("value", _8d5.option); } },
                    _getFirst: function() { var _8d6 = this._getChildren(); return _8d6.length ? _8d6[0] : null; },
                    _getLast: function() { var _8d7 = this._getChildren(); return _8d7.length ? _8d7[_8d7.length - 1] : null; },
                    childSelector: function(node) { var node = _8cc.byNode(node); return node && node.getParent() == this.dropDown; },
                    onKeyboardSearch: function(item, evt, _8d8, _8d9) { if (item) { this.focusChild(item); } },
                    _loadChildren: function(_8da) {
                        if (_8da === true) {
                            if (this.dropDown) {
                                delete this.dropDown.focusedChild;
                                this.focusedChild = null;
                            }
                            if (this.options.length) { this.inherited(arguments); } else {
                                _8c0.forEach(this._getChildren(), function(_8db) { _8db.destroyRecursive(); });
                                var item = new _8c8({ ownerDocument: this.ownerDocument, label: this.emptyLabel });
                                this.dropDown.addChild(item);
                            }
                        } else { this._updateSelection(); }
                        this._isLoaded = false;
                        this._childrenLoaded = true;
                        if (!this._loadingStore) { this._setValueAttr(this.value, false); }
                    },
                    _refreshState: function() { if (this._started) { this.validate(this.focused); } },
                    startup: function() {
                        this.inherited(arguments);
                        this._refreshState();
                    },
                    _setValueAttr: function(_8dc) {
                        this.inherited(arguments);
                        _8c2.set(this.valueNode, "value", this.get("value"));
                        this._refreshState();
                    },
                    _setNameAttr: "valueNode",
                    _setDisabledAttr: function(_8dd) {
                        this.inherited(arguments);
                        this._refreshState();
                    },
                    _setRequiredAttr: function(_8de) {
                        this._set("required", _8de);
                        this.focusNode.setAttribute("aria-required", _8de);
                        this._refreshState();
                    },
                    _setOptionsAttr: function(_8df) {
                        this._isLoaded = false;
                        this._set("options", _8df);
                    },
                    _setDisplay: function(_8e0) {
                        var lbl = (this.labelType === "text" ? (_8e0 || "").replace(/&/g, "&amp;").replace(/</g, "&lt;") : _8e0) || this.emptyLabel;
                        this.containerNode.innerHTML = "<span role=\"option\" aria-selected=\"true\" class=\"dijitReset dijitInline " + this.baseClass.replace(/\s+|$/g, "Label ") + "\">" + lbl + "</span>";
                    },
                    validate: function(_8e1) {
                        var _8e2 = this.disabled || this.isValid(_8e1);
                        this._set("state", _8e2 ? "" : (this._hasBeenBlurred ? "Error" : "Incomplete"));
                        this.focusNode.setAttribute("aria-invalid", _8e2 ? "false" : "true");
                        var _8e3 = _8e2 ? "" : this._missingMsg;
                        if (_8e3 && this.focused && this._hasBeenBlurred) { _8ca.show(_8e3, this.domNode, this.tooltipPosition, !this.isLeftToRight()); } else { _8ca.hide(this.domNode); }
                        this._set("message", _8e3);
                        return _8e2;
                    },
                    isValid: function() { return (!this.required || this.value === 0 || !(/^\s*$/.test(this.value || ""))); },
                    reset: function() {
                        this.inherited(arguments);
                        _8ca.hide(this.domNode);
                        this._refreshState();
                    },
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this._missingMsg = i18n.getLocalization("dijit.form", "validate", this.lang).missingMessage;
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        this.own(on(this.domNode, "selectstart", function(evt) {
                            evt.preventDefault();
                            evt.stopPropagation();
                        }));
                        this.domNode.setAttribute("aria-expanded", "false");
                        var _8e4 = this._keyNavCodes;
                        delete _8e4[keys.LEFT_ARROW];
                        delete _8e4[keys.RIGHT_ARROW];
                    },
                    _setStyleAttr: function(_8e5) {
                        this.inherited(arguments);
                        _8c3.toggle(this.domNode, this.baseClass.replace(/\s+|$/g, "FixedWidth "), !!this.domNode.style.width);
                    },
                    isLoaded: function() { return this._isLoaded; },
                    loadDropDown: function(_8e6) {
                        this._loadChildren(true);
                        this._isLoaded = true;
                        _8e6();
                    },
                    destroy: function(_8e7) {
                        if (this.dropDown && !this.dropDown._destroyed) {
                            this.dropDown.destroyRecursive(_8e7);
                            delete this.dropDown;
                        }
                        _8ca.hide(this.domNode);
                        this.inherited(arguments);
                    },
                    _onFocus: function() { this.validate(true); },
                    _onBlur: function() {
                        _8ca.hide(this.domNode);
                        this.inherited(arguments);
                        this.validate(false);
                    }
                });
                if (has("dojo-bidi")) {
                    _8d1 = _8c1("dijit.form.Select", _8d1, {
                        _setDisplay: function(_8e8) {
                            this.inherited(arguments);
                            this.applyTextDir(this.containerNode);
                        }
                    });
                }
                _8d1._Menu = _8ce;

                function _8e9(_8ea) { return function(evt) { if (!this._isLoaded) { this.loadDropDown(lang.hitch(this, _8ea, evt)); } else { this.inherited(_8ea, arguments); } }; };
                _8d1.prototype._onContainerKeydown = _8e9("_onContainerKeydown");
                _8d1.prototype._onContainerKeypress = _8e9("_onContainerKeypress");
                return _8d1;
            });
        },
        "dijit/form/_FormSelectWidget": function() {
            define(["dojo/_base/array", "dojo/_base/Deferred", "dojo/aspect", "dojo/data/util/sorter", "dojo/_base/declare", "dojo/dom", "dojo/dom-class", "dojo/_base/kernel", "dojo/_base/lang", "dojo/query", "dojo/when", "dojo/store/util/QueryResults", "./_FormValueWidget"], function(_8eb, _8ec, _8ed, _8ee, _8ef, dom, _8f0, _8f1, lang, _8f2, when, _8f3, _8f4) {
                var _8f5 = _8ef("dijit.form._FormSelectWidget", _8f4, {
                    multiple: false,
                    options: null,
                    store: null,
                    _setStoreAttr: function(val) { if (this._created) { this._deprecatedSetStore(val); } },
                    query: null,
                    _setQueryAttr: function(_8f6) { if (this._created) { this._deprecatedSetStore(this.store, this.selectedValue, { query: _8f6 }); } },
                    queryOptions: null,
                    _setQueryOptionsAttr: function(_8f7) { if (this._created) { this._deprecatedSetStore(this.store, this.selectedValue, { queryOptions: _8f7 }); } },
                    labelAttr: "",
                    onFetch: null,
                    sortByLabel: true,
                    loadChildrenOnOpen: false,
                    onLoadDeferred: null,
                    getOptions: function(_8f8) {
                        var opts = this.options || [];
                        if (_8f8 == null) { return opts; }
                        if (lang.isArrayLike(_8f8)) { return _8eb.map(_8f8, "return this.getOptions(item);", this); }
                        if (lang.isString(_8f8)) { _8f8 = { value: _8f8 }; }
                        if (lang.isObject(_8f8)) {
                            if (!_8eb.some(opts, function(_8f9, idx) {
                                    for (var a in _8f8) { if (!(a in _8f9) || _8f9[a] != _8f8[a]) { return false; } }
                                    _8f8 = idx;
                                    return true;
                                })) { _8f8 = -1; }
                        }
                        if (_8f8 >= 0 && _8f8 < opts.length) { return opts[_8f8]; }
                        return null;
                    },
                    addOption: function(_8fa) {
                        _8eb.forEach(lang.isArrayLike(_8fa) ? _8fa : [_8fa], function(i) { if (i && lang.isObject(i)) { this.options.push(i); } }, this);
                        this._loadChildren();
                    },
                    removeOption: function(_8fb) {
                        var _8fc = this.getOptions(lang.isArrayLike(_8fb) ? _8fb : [_8fb]);
                        _8eb.forEach(_8fc, function(_8fd) {
                            if (_8fd) {
                                this.options = _8eb.filter(this.options, function(node) { return (node.value !== _8fd.value || node.label !== _8fd.label); });
                                this._removeOptionItem(_8fd);
                            }
                        }, this);
                        this._loadChildren();
                    },
                    updateOption: function(_8fe) {
                        _8eb.forEach(lang.isArrayLike(_8fe) ? _8fe : [_8fe], function(i) {
                            var _8ff = this.getOptions({ value: i.value }),
                                k;
                            if (_8ff) { for (k in i) { _8ff[k] = i[k]; } }
                        }, this);
                        this._loadChildren();
                    },
                    setStore: function(_900, _901, _902) {
                        _8f1.deprecated(this.declaredClass + "::setStore(store, selectedValue, fetchArgs) is deprecated. Use set('query', fetchArgs.query), set('queryOptions', fetchArgs.queryOptions), set('store', store), or set('value', selectedValue) instead.", "", "2.0");
                        this._deprecatedSetStore(_900, _901, _902);
                    },
                    _deprecatedSetStore: function(_903, _904, _905) {
                        var _906 = this.store;
                        _905 = _905 || {};
                        if (_906 !== _903) {
                            var h;
                            while ((h = this._notifyConnections.pop())) { h.remove(); }
                            if (!_903.get) {
                                lang.mixin(_903, {
                                    _oldAPI: true,
                                    get: function(id) {
                                        var _907 = new _8ec();
                                        this.fetchItemByIdentity({ identity: id, onItem: function(_908) { _907.resolve(_908); }, onError: function(_909) { _907.reject(_909); } });
                                        return _907.promise;
                                    },
                                    query: function(_90a, _90b) {
                                        var _90c = new _8ec(function() { if (_90d.abort) { _90d.abort(); } });
                                        _90c.total = new _8ec();
                                        var _90d = this.fetch(lang.mixin({ query: _90a, onBegin: function(_90e) { _90c.total.resolve(_90e); }, onComplete: function(_90f) { _90c.resolve(_90f); }, onError: function(_910) { _90c.reject(_910); } }, _90b));
                                        return new _8f3(_90c);
                                    }
                                });
                                if (_903.getFeatures()["dojo.data.api.Notification"]) { this._notifyConnections = [_8ed.after(_903, "onNew", lang.hitch(this, "_onNewItem"), true), _8ed.after(_903, "onDelete", lang.hitch(this, "_onDeleteItem"), true), _8ed.after(_903, "onSet", lang.hitch(this, "_onSetItem"), true)]; }
                            }
                            this._set("store", _903);
                        }
                        if (this.options && this.options.length) { this.removeOption(this.options); }
                        if (this._queryRes && this._queryRes.close) { this._queryRes.close(); }
                        if (this._observeHandle && this._observeHandle.remove) {
                            this._observeHandle.remove();
                            this._observeHandle = null;
                        }
                        if (_905.query) { this._set("query", _905.query); }
                        if (_905.queryOptions) { this._set("queryOptions", _905.queryOptions); }
                        if (_903 && _903.query) {
                            this._loadingStore = true;
                            this.onLoadDeferred = new _8ec();
                            this._queryRes = _903.query(this.query, this.queryOptions);
                            when(this._queryRes, lang.hitch(this, function(_911) {
                                if (this.sortByLabel && !_905.sort && _911.length) {
                                    if (_903.getValue) { _911.sort(_8ee.createSortFunction([{ attribute: _903.getLabelAttributes(_911[0])[0] }], _903)); } else {
                                        var _912 = this.labelAttr;
                                        _911.sort(function(a, b) { return a[_912] > b[_912] ? 1 : b[_912] > a[_912] ? -1 : 0; });
                                    }
                                }
                                if (_905.onFetch) { _911 = _905.onFetch.call(this, _911, _905); }
                                _8eb.forEach(_911, function(i) { this._addOptionForItem(i); }, this);
                                if (this._queryRes.observe) { this._observeHandle = this._queryRes.observe(lang.hitch(this, function(_913, _914, _915) { if (_914 == _915) { this._onSetItem(_913); } else { if (_914 != -1) { this._onDeleteItem(_913); } if (_915 != -1) { this._onNewItem(_913); } } }), true); }
                                this._loadingStore = false;
                                this.set("value", "_pendingValue" in this ? this._pendingValue : _904);
                                delete this._pendingValue;
                                if (!this.loadChildrenOnOpen) { this._loadChildren(); } else { this._pseudoLoadChildren(_911); }
                                this.onLoadDeferred.resolve(true);
                                this.onSetStore();
                            }), lang.hitch(this, function(err) {
                                console.error("dijit.form.Select: " + err.toString());
                                this.onLoadDeferred.reject(err);
                            }));
                        }
                        return _906;
                    },
                    _setValueAttr: function(_916, _917) {
                        if (!this._onChangeActive) { _917 = null; }
                        if (this._loadingStore) { this._pendingValue = _916; return; }
                        if (_916 == null) { return; }
                        if (lang.isArrayLike(_916)) { _916 = _8eb.map(_916, function(_918) { return lang.isObject(_918) ? _918 : { value: _918 }; }); } else { if (lang.isObject(_916)) { _916 = [_916]; } else { _916 = [{ value: _916 }]; } }
                        _916 = _8eb.filter(this.getOptions(_916), function(i) { return i && i.value; });
                        var opts = this.getOptions() || [];
                        if (!this.multiple && (!_916[0] || !_916[0].value) && !!opts.length) { _916[0] = opts[0]; }
                        _8eb.forEach(opts, function(opt) { opt.selected = _8eb.some(_916, function(v) { return v.value === opt.value; }); });
                        var val = _8eb.map(_916, function(opt) { return opt.value; });
                        if (typeof val == "undefined" || typeof val[0] == "undefined") { return; }
                        var disp = _8eb.map(_916, function(opt) { return opt.label; });
                        this._setDisplay(this.multiple ? disp : disp[0]);
                        this.inherited(arguments, [this.multiple ? val : val[0], _917]);
                        this._updateSelection();
                    },
                    _getDisplayedValueAttr: function() { var ret = _8eb.map([].concat(this.get("selectedOptions")), function(v) { if (v && "label" in v) { return v.label; } else { if (v) { return v.value; } } return null; }, this); return this.multiple ? ret : ret[0]; },
                    _setDisplayedValueAttr: function(_919) { this.set("value", this.getOptions(typeof _919 == "string" ? { label: _919 } : _919)); },
                    _loadChildren: function() {
                        if (this._loadingStore) { return; }
                        _8eb.forEach(this._getChildren(), function(_91a) { _91a.destroyRecursive(); });
                        _8eb.forEach(this.options, this._addOptionItem, this);
                        this._updateSelection();
                    },
                    _updateSelection: function() {
                        this.focusedChild = null;
                        this._set("value", this._getValueFromOpts());
                        var val = [].concat(this.value);
                        if (val && val[0]) {
                            var self = this;
                            _8eb.forEach(this._getChildren(), function(_91b) {
                                var _91c = _8eb.some(val, function(v) { return _91b.option && (v === _91b.option.value); });
                                if (_91c && !self.multiple) { self.focusedChild = _91b; }
                                _8f0.toggle(_91b.domNode, this.baseClass.replace(/\s+|$/g, "SelectedOption "), _91c);
                                _91b.domNode.setAttribute("aria-selected", _91c ? "true" : "false");
                            }, this);
                        }
                    },
                    _getValueFromOpts: function() { var opts = this.getOptions() || []; if (!this.multiple && opts.length) { var opt = _8eb.filter(opts, function(i) { return i.selected; })[0]; if (opt && opt.value) { return opt.value; } else { opts[0].selected = true; return opts[0].value; } } else { if (this.multiple) { return _8eb.map(_8eb.filter(opts, function(i) { return i.selected; }), function(i) { return i.value; }) || []; } } return ""; },
                    _onNewItem: function(item, _91d) { if (!_91d || !_91d.parent) { this._addOptionForItem(item); } },
                    _onDeleteItem: function(item) {
                        var _91e = this.store;
                        this.removeOption({ value: _91e.getIdentity(item) });
                    },
                    _onSetItem: function(item) { this.updateOption(this._getOptionObjForItem(item)); },
                    _getOptionObjForItem: function(item) {
                        var _91f = this.store,
                            _920 = (this.labelAttr && this.labelAttr in item) ? item[this.labelAttr] : _91f.getLabel(item),
                            _921 = (_920 ? _91f.getIdentity(item) : null);
                        return { value: _921, label: _920, item: item };
                    },
                    _addOptionForItem: function(item) {
                        var _922 = this.store;
                        if (_922.isItemLoaded && !_922.isItemLoaded(item)) { _922.loadItem({ item: item, onItem: function(i) { this._addOptionForItem(i); }, scope: this }); return; }
                        var _923 = this._getOptionObjForItem(item);
                        this.addOption(_923);
                    },
                    constructor: function(_924) {
                        this._oValue = (_924 || {}).value || null;
                        this._notifyConnections = [];
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        dom.setSelectable(this.focusNode, false);
                    },
                    _fillContent: function() { if (!this.options) { this.options = this.srcNodeRef ? _8f2("> *", this.srcNodeRef).map(function(node) { if (node.getAttribute("type") === "separator") { return { value: "", label: "", selected: false, disabled: false }; } return { value: (node.getAttribute("data-" + _8f1._scopeName + "-value") || node.getAttribute("value")), label: String(node.innerHTML), selected: node.getAttribute("selected") || false, disabled: node.getAttribute("disabled") || false }; }, this) : []; } if (!this.value) { this._set("value", this._getValueFromOpts()); } else { if (this.multiple && typeof this.value == "string") { this._set("value", this.value.split(",")); } } },
                    postCreate: function() {
                        this.inherited(arguments);
                        _8ed.after(this, "onChange", lang.hitch(this, "_updateSelection"));
                        var _925 = this.store;
                        if (_925 && (_925.getIdentity || _925.getFeatures()["dojo.data.api.Identity"])) {
                            this.store = null;
                            this._deprecatedSetStore(_925, this._oValue, { query: this.query, queryOptions: this.queryOptions });
                        }
                        this._storeInitialized = true;
                    },
                    startup: function() {
                        this._loadChildren();
                        this.inherited(arguments);
                    },
                    destroy: function() {
                        var h;
                        while ((h = this._notifyConnections.pop())) { h.remove(); }
                        if (this._queryRes && this._queryRes.close) { this._queryRes.close(); }
                        if (this._observeHandle && this._observeHandle.remove) {
                            this._observeHandle.remove();
                            this._observeHandle = null;
                        }
                        this.inherited(arguments);
                    },
                    _addOptionItem: function() {},
                    _removeOptionItem: function() {},
                    _setDisplay: function() {},
                    _getChildren: function() { return []; },
                    _getSelectedOptionsAttr: function() { return this.getOptions({ selected: true }); },
                    _pseudoLoadChildren: function() {},
                    onSetStore: function() {}
                });
                return _8f5;
            });
        },
        "dojo/data/util/sorter": function() {
            define(["../../_base/lang"], function(lang) {
                var _926 = {};
                lang.setObject("dojo.data.util.sorter", _926);
                _926.basicComparator = function(a, b) { var r = -1; if (a === null) { a = undefined; } if (b === null) { b = undefined; } if (a == b) { r = 0; } else { if (a > b || a == null) { r = 1; } } return r; };
                _926.createSortFunction = function(_927, _928) {
                    var _929 = [];

                    function _92a(attr, dir, comp, s) { return function(_92b, _92c) { var a = s.getValue(_92b, attr); var b = s.getValue(_92c, attr); return dir * comp(a, b); }; };
                    var _92d;
                    var map = _928.comparatorMap;
                    var bc = _926.basicComparator;
                    for (var i = 0; i < _927.length; i++) {
                        _92d = _927[i];
                        var attr = _92d.attribute;
                        if (attr) {
                            var dir = (_92d.descending) ? -1 : 1;
                            var comp = bc;
                            if (map) {
                                if (typeof attr !== "string" && ("toString" in attr)) { attr = attr.toString(); }
                                comp = map[attr] || bc;
                            }
                            _929.push(_92a(attr, dir, comp, _928));
                        }
                    }
                    return function(rowA, rowB) { var i = 0; while (i < _929.length) { var ret = _929[i++](rowA, rowB); if (ret !== 0) { return ret; } } return 0; };
                };
                return _926;
            });
        },
        "dijit/form/HorizontalSlider": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dnd/move", "dojo/_base/fx", "dojo/dom-geometry", "dojo/dom-style", "dojo/keys", "dojo/_base/lang", "dojo/sniff", "dojo/dnd/Moveable", "dojo/dnd/Mover", "dojo/query", "dojo/mouse", "dojo/on", "../_base/manager", "../focus", "../typematic", "./Button", "./_FormValueWidget", "../_Container", "dojo/text!./templates/HorizontalSlider.html"], function(_92e, _92f, move, fx, _930, _931, keys, lang, has, _932, _933, _934, _935, on, _936, _937, _938, _939, _93a, _93b, _93c) {
                var _93d = _92f("dijit.form._SliderMover", _933, {
                    onMouseMove: function(e) {
                        var _93e = this.widget;
                        var _93f = _93e._abspos;
                        if (!_93f) {
                            _93f = _93e._abspos = _930.position(_93e.sliderBarContainer, true);
                            _93e._setPixelValue_ = lang.hitch(_93e, "_setPixelValue");
                            _93e._isReversed_ = _93e._isReversed();
                        }
                        var _940 = e[_93e._mousePixelCoord] - _93f[_93e._startingPixelCoord];
                        _93e._setPixelValue_(_93e._isReversed_ ? (_93f[_93e._pixelCount] - _940) : _940, _93f[_93e._pixelCount], false);
                    },
                    destroy: function(e) {
                        _933.prototype.destroy.apply(this, arguments);
                        var _941 = this.widget;
                        _941._abspos = null;
                        _941._setValueAttr(_941.value, true);
                    }
                });
                var _942 = _92f("dijit.form.HorizontalSlider", [_93a, _93b], {
                    templateString: _93c,
                    value: 0,
                    showButtons: true,
                    minimum: 0,
                    maximum: 100,
                    discreteValues: Infinity,
                    pageIncrement: 2,
                    clickSelect: true,
                    slideDuration: _936.defaultDuration,
                    _setIdAttr: "",
                    _setNameAttr: "valueNode",
                    baseClass: "dijitSlider",
                    cssStateNodes: { incrementButton: "dijitSliderIncrementButton", decrementButton: "dijitSliderDecrementButton", focusNode: "dijitSliderThumb" },
                    _mousePixelCoord: "pageX",
                    _pixelCount: "w",
                    _startingPixelCoord: "x",
                    _handleOffsetCoord: "left",
                    _progressPixelSize: "width",
                    _onKeyUp: function(e) {
                        if (this.disabled || this.readOnly || e.altKey || e.ctrlKey || e.metaKey) { return; }
                        this._setValueAttr(this.value, true);
                    },
                    _onKeyDown: function(e) {
                        if (this.disabled || this.readOnly || e.altKey || e.ctrlKey || e.metaKey) { return; }
                        switch (e.keyCode) {
                            case keys.HOME:
                                this._setValueAttr(this.minimum, false);
                                break;
                            case keys.END:
                                this._setValueAttr(this.maximum, false);
                                break;
                            case ((this._descending || this.isLeftToRight()) ? keys.RIGHT_ARROW : keys.LEFT_ARROW):
                            case (this._descending === false ? keys.DOWN_ARROW : keys.UP_ARROW):
                            case (this._descending === false ? keys.PAGE_DOWN : keys.PAGE_UP):
                                this.increment(e);
                                break;
                            case ((this._descending || this.isLeftToRight()) ? keys.LEFT_ARROW : keys.RIGHT_ARROW):
                            case (this._descending === false ? keys.UP_ARROW : keys.DOWN_ARROW):
                            case (this._descending === false ? keys.PAGE_UP : keys.PAGE_DOWN):
                                this.decrement(e);
                                break;
                            default:
                                return;
                        }
                        e.stopPropagation();
                        e.preventDefault();
                    },
                    _onHandleClick: function(e) {
                        if (this.disabled || this.readOnly) { return; }
                        if (!has("ie")) { _937.focus(this.sliderHandle); }
                        e.stopPropagation();
                        e.preventDefault();
                    },
                    _isReversed: function() { return !this.isLeftToRight(); },
                    _onBarClick: function(e) {
                        if (this.disabled || this.readOnly || !this.clickSelect) { return; }
                        _937.focus(this.sliderHandle);
                        e.stopPropagation();
                        e.preventDefault();
                        var _943 = _930.position(this.sliderBarContainer, true);
                        var _944 = e[this._mousePixelCoord] - _943[this._startingPixelCoord];
                        this._setPixelValue(this._isReversed() ? (_943[this._pixelCount] - _944) : _944, _943[this._pixelCount], true);
                        this._movable.onMouseDown(e);
                    },
                    _setPixelValue: function(_945, _946, _947) {
                        if (this.disabled || this.readOnly) { return; }
                        var _948 = this.discreteValues;
                        if (_948 <= 1 || _948 == Infinity) { _948 = _946; }
                        _948--;
                        var _949 = _946 / _948;
                        var _94a = Math.round(_945 / _949);
                        this._setValueAttr(Math.max(Math.min((this.maximum - this.minimum) * _94a / _948 + this.minimum, this.maximum), this.minimum), _947);
                    },
                    _setValueAttr: function(_94b, _94c) {
                        this._set("value", _94b);
                        this.valueNode.value = _94b;
                        this.focusNode.setAttribute("aria-valuenow", _94b);
                        this.inherited(arguments);
                        var _94d = this.maximum > this.minimum ? ((_94b - this.minimum) / (this.maximum - this.minimum)) : 0;
                        var _94e = (this._descending === false) ? this.remainingBar : this.progressBar;
                        var _94f = (this._descending === false) ? this.progressBar : this.remainingBar;
                        if (this._inProgressAnim && this._inProgressAnim.status != "stopped") { this._inProgressAnim.stop(true); }
                        if (_94c && this.slideDuration > 0 && _94e.style[this._progressPixelSize]) {
                            var _950 = this;
                            var _951 = {};
                            var _952 = parseFloat(_94e.style[this._progressPixelSize]);
                            var _953 = this.slideDuration * (_94d - _952 / 100);
                            if (_953 == 0) { return; }
                            if (_953 < 0) { _953 = 0 - _953; }
                            _951[this._progressPixelSize] = { start: _952, end: _94d * 100, units: "%" };
                            this._inProgressAnim = fx.animateProperty({ node: _94e, duration: _953, onAnimate: function(v) { _94f.style[_950._progressPixelSize] = (100 - parseFloat(v[_950._progressPixelSize])) + "%"; }, onEnd: function() { delete _950._inProgressAnim; }, properties: _951 });
                            this._inProgressAnim.play();
                        } else {
                            _94e.style[this._progressPixelSize] = (_94d * 100) + "%";
                            _94f.style[this._progressPixelSize] = ((1 - _94d) * 100) + "%";
                        }
                    },
                    _bumpValue: function(_954, _955) {
                        if (this.disabled || this.readOnly || (this.maximum <= this.minimum)) { return; }
                        var s = _931.getComputedStyle(this.sliderBarContainer);
                        var c = _930.getContentBox(this.sliderBarContainer, s);
                        var _956 = this.discreteValues;
                        if (_956 <= 1 || _956 == Infinity) { _956 = c[this._pixelCount]; }
                        _956--;
                        var _957 = Math.round((this.value - this.minimum) * _956 / (this.maximum - this.minimum)) + _954;
                        if (_957 < 0) { _957 = 0; }
                        if (_957 > _956) { _957 = _956; }
                        _957 = _957 * (this.maximum - this.minimum) / _956 + this.minimum;
                        this._setValueAttr(_957, _955);
                    },
                    _onClkBumper: function(val) {
                        if (this.disabled || this.readOnly || !this.clickSelect) { return; }
                        this._setValueAttr(val, true);
                    },
                    _onClkIncBumper: function() { this._onClkBumper(this._descending === false ? this.minimum : this.maximum); },
                    _onClkDecBumper: function() { this._onClkBumper(this._descending === false ? this.maximum : this.minimum); },
                    decrement: function(e) { this._bumpValue(e.keyCode == keys.PAGE_DOWN ? -this.pageIncrement : -1); },
                    increment: function(e) { this._bumpValue(e.keyCode == keys.PAGE_UP ? this.pageIncrement : 1); },
                    _mouseWheeled: function(evt) {
                        if (!this.focused) { return; }
                        evt.stopPropagation();
                        evt.preventDefault();
                        this._bumpValue(evt.wheelDelta < 0 ? -1 : 1, true);
                    },
                    startup: function() {
                        if (this._started) { return; }
                        _92e.forEach(this.getChildren(), function(_958) { if (this[_958.container] != this.containerNode) { this[_958.container].appendChild(_958.domNode); } }, this);
                        this.inherited(arguments);
                    },
                    _typematicCallback: function(_959, _95a, e) { if (_959 == -1) { this._setValueAttr(this.value, true); } else { this[(_95a == (this._descending ? this.incrementButton : this.decrementButton)) ? "decrement" : "increment"](e); } },
                    buildRendering: function() {
                        this.inherited(arguments);
                        if (this.showButtons) {
                            this.incrementButton.style.display = "";
                            this.decrementButton.style.display = "";
                        }
                        var _95b = _934("label[for=\"" + this.id + "\"]");
                        if (_95b.length) {
                            if (!_95b[0].id) { _95b[0].id = this.id + "_label"; }
                            this.focusNode.setAttribute("aria-labelledby", _95b[0].id);
                        }
                        this.focusNode.setAttribute("aria-valuemin", this.minimum);
                        this.focusNode.setAttribute("aria-valuemax", this.maximum);
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        if (this.showButtons) { this.own(_938.addMouseListener(this.decrementButton, this, "_typematicCallback", 25, 500), _938.addMouseListener(this.incrementButton, this, "_typematicCallback", 25, 500)); }
                        this.own(on(this.domNode, _935.wheel, lang.hitch(this, "_mouseWheeled")));
                        var _95c = _92f(_93d, { widget: this });
                        this._movable = new _932(this.sliderHandle, { mover: _95c });
                        this._layoutHackIE7();
                    },
                    destroy: function() {
                        this._movable.destroy();
                        if (this._inProgressAnim && this._inProgressAnim.status != "stopped") { this._inProgressAnim.stop(true); }
                        this.inherited(arguments);
                    }
                });
                _942._Mover = _93d;
                return _942;
            });
        },
        "dojo/dnd/move": function() {
            define(["../_base/declare", "../dom-geometry", "../dom-style", "./common", "./Mover", "./Moveable"], function(_95d, _95e, _95f, dnd, _960, _961) {
                var _962 = _95d("dojo.dnd.move.constrainedMoveable", _961, {
                    constraints: function() {},
                    within: false,
                    constructor: function(node, _963) {
                        if (!_963) { _963 = {}; }
                        this.constraints = _963.constraints;
                        this.within = _963.within;
                    },
                    onFirstMove: function(_964) {
                        var c = this.constraintBox = this.constraints.call(this, _964);
                        c.r = c.l + c.w;
                        c.b = c.t + c.h;
                        if (this.within) {
                            var mb = _95e.getMarginSize(_964.node);
                            c.r -= mb.w;
                            c.b -= mb.h;
                        }
                    },
                    onMove: function(_965, _966) {
                        var c = this.constraintBox,
                            s = _965.node.style;
                        this.onMoving(_965, _966);
                        _966.l = _966.l < c.l ? c.l : c.r < _966.l ? c.r : _966.l;
                        _966.t = _966.t < c.t ? c.t : c.b < _966.t ? c.b : _966.t;
                        s.left = _966.l + "px";
                        s.top = _966.t + "px";
                        this.onMoved(_965, _966);
                    }
                });
                var _967 = _95d("dojo.dnd.move.boxConstrainedMoveable", _962, {
                    box: {},
                    constructor: function(node, _968) {
                        var box = _968 && _968.box;
                        this.constraints = function() { return box; };
                    }
                });
                var _969 = _95d("dojo.dnd.move.parentConstrainedMoveable", _962, {
                    area: "content",
                    constructor: function(node, _96a) {
                        var area = _96a && _96a.area;
                        this.constraints = function() {
                            var n = this.node.parentNode,
                                s = _95f.getComputedStyle(n),
                                mb = _95e.getMarginBox(n, s);
                            if (area == "margin") { return mb; }
                            var t = _95e.getMarginExtents(n, s);
                            mb.l += t.l, mb.t += t.t, mb.w -= t.w, mb.h -= t.h;
                            if (area == "border") { return mb; }
                            t = _95e.getBorderExtents(n, s);
                            mb.l += t.l, mb.t += t.t, mb.w -= t.w, mb.h -= t.h;
                            if (area == "padding") { return mb; }
                            t = _95e.getPadExtents(n, s);
                            mb.l += t.l, mb.t += t.t, mb.w -= t.w, mb.h -= t.h;
                            return mb;
                        };
                    }
                });
                return { constrainedMoveable: _962, boxConstrainedMoveable: _967, parentConstrainedMoveable: _969 };
            });
        },
        "dijit/form/VerticalSlider": function() { define(["dojo/_base/declare", "./HorizontalSlider", "dojo/text!./templates/VerticalSlider.html"], function(_96b, _96c, _96d) { return _96b("dijit.form.VerticalSlider", _96c, { templateString: _96d, _mousePixelCoord: "pageY", _pixelCount: "h", _startingPixelCoord: "y", _handleOffsetCoord: "top", _progressPixelSize: "height", _descending: true, _isReversed: function() { return this._descending; } }); }); },
        "dijit/form/HorizontalRule": function() {
            define(["dojo/_base/declare", "../_Widget", "../_TemplatedMixin"], function(_96e, _96f, _970) {
                return _96e("dijit.form.HorizontalRule", [_96f, _970], {
                    templateString: "<div class=\"dijitRuleContainer dijitRuleContainerH\"></div>",
                    count: 3,
                    container: "containerNode",
                    ruleStyle: "",
                    _positionPrefix: "<div class=\"dijitRuleMark dijitRuleMarkH\" style=\"left:",
                    _positionSuffix: "%;",
                    _suffix: "\"></div>",
                    _genHTML: function(pos) { return this._positionPrefix + pos + this._positionSuffix + this.ruleStyle + this._suffix; },
                    _isHorizontal: true,
                    buildRendering: function() {
                        this.inherited(arguments);
                        var _971;
                        if (this.count == 1) { _971 = this._genHTML(50, 0); } else {
                            var i;
                            var _972 = 100 / (this.count - 1);
                            if (!this._isHorizontal || this.isLeftToRight()) {
                                _971 = this._genHTML(0, 0);
                                for (i = 1; i < this.count - 1; i++) { _971 += this._genHTML(_972 * i, i); }
                                _971 += this._genHTML(100, this.count - 1);
                            } else {
                                _971 = this._genHTML(100, 0);
                                for (i = 1; i < this.count - 1; i++) { _971 += this._genHTML(100 - _972 * i, i); }
                                _971 += this._genHTML(0, this.count - 1);
                            }
                        }
                        this.domNode.innerHTML = _971;
                    }
                });
            });
        },
        "dijit/form/VerticalRule": function() { define(["dojo/_base/declare", "./HorizontalRule"], function(_973, _974) { return _973("dijit.form.VerticalRule", _974, { templateString: "<div class=\"dijitRuleContainer dijitRuleContainerV\"></div>", _positionPrefix: "<div class=\"dijitRuleMark dijitRuleMarkV\" style=\"top:", _isHorizontal: false }); }); },
        "dijit/form/HorizontalRuleLabels": function() {
            define(["dojo/_base/declare", "dojo/has", "dojo/number", "dojo/query", "dojo/_base/lang", "./HorizontalRule"], function(_975, has, _976, _977, lang, _978) {
                var _979 = _975("dijit.form.HorizontalRuleLabels", _978, {
                    templateString: "<div class=\"dijitRuleContainer dijitRuleContainerH dijitRuleLabelsContainer dijitRuleLabelsContainerH\"></div>",
                    labelStyle: "",
                    labels: [],
                    numericMargin: 0,
                    minimum: 0,
                    maximum: 1,
                    constraints: { pattern: "#%" },
                    _positionPrefix: "<div class=\"dijitRuleLabelContainer dijitRuleLabelContainerH\" style=\"left:",
                    _labelPrefix: "\"><div class=\"dijitRuleLabel dijitRuleLabelH\">",
                    _suffix: "</div></div>",
                    _calcPosition: function(pos) { return pos; },
                    _genHTML: function(pos, ndx) { var _97a = this.labels[ndx]; return this._positionPrefix + this._calcPosition(pos) + this._positionSuffix + this.labelStyle + this._genDirectionHTML(_97a) + this._labelPrefix + _97a + this._suffix; },
                    _genDirectionHTML: function(_97b) { return ""; },
                    getLabels: function() {
                        var _97c = this.labels;
                        if (!_97c.length && this.srcNodeRef) { _97c = _977("> li", this.srcNodeRef).map(function(node) { return String(node.innerHTML); }); }
                        if (!_97c.length && this.count > 1) {
                            _97c = [];
                            var _97d = this.minimum;
                            var inc = (this.maximum - _97d) / (this.count - 1);
                            for (var i = 0; i < this.count; i++) {
                                _97c.push((i < this.numericMargin || i >= (this.count - this.numericMargin)) ? "" : _976.format(_97d, this.constraints));
                                _97d += inc;
                            }
                        }
                        return _97c;
                    },
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this.labels = this.getLabels();
                        this.count = this.labels.length;
                    }
                });
                if (has("dojo-bidi")) {
                    _979.extend({
                        _setTextDirAttr: function(_97e) {
                            if (this.textDir != _97e) {
                                this._set("textDir", _97e);
                                _977(".dijitRuleLabelContainer", this.domNode).forEach(lang.hitch(this, function(_97f) { _97f.style.direction = this.getTextDir(_97f.innerText || _97f.textContent || ""); }));
                            }
                        },
                        _genDirectionHTML: function(_980) { return (this.textDir ? ("direction:" + this.getTextDir(_980) + ";") : ""); }
                    });
                }
                return _979;
            });
        },
        "dijit/form/VerticalRuleLabels": function() { define(["dojo/_base/declare", "./HorizontalRuleLabels"], function(_981, _982) { return _981("dijit.form.VerticalRuleLabels", _982, { templateString: "<div class=\"dijitRuleContainer dijitRuleContainerV dijitRuleLabelsContainer dijitRuleLabelsContainerV\"></div>", _positionPrefix: "<div class=\"dijitRuleLabelContainer dijitRuleLabelContainerV\" style=\"top:", _labelPrefix: "\"><span class=\"dijitRuleLabel dijitRuleLabelV\">", _calcPosition: function(pos) { return 100 - pos; }, _isHorizontal: false }); }); },
        "dijit/form/SimpleTextarea": function() {
            define(["dojo/_base/declare", "dojo/dom-class", "dojo/sniff", "./TextBox"], function(_983, _984, has, _985) {
                return _983("dijit.form.SimpleTextarea", _985, {
                    baseClass: "dijitTextBox dijitTextArea",
                    rows: "3",
                    cols: "20",
                    templateString: "<textarea ${!nameAttrSetting} data-dojo-attach-point='focusNode,containerNode,textbox' autocomplete='off'></textarea>",
                    postMixInProperties: function() {
                        if (!this.value && this.srcNodeRef) { this.value = this.srcNodeRef.value; }
                        this.inherited(arguments);
                    },
                    buildRendering: function() { this.inherited(arguments); if (has("ie") && this.cols) { _984.add(this.textbox, "dijitTextAreaCols"); } },
                    filter: function(_986) { if (_986) { _986 = _986.replace(/\r/g, ""); } return this.inherited(arguments); },
                    _onInput: function(e) {
                        if (this.maxLength) {
                            var _987 = parseInt(this.maxLength);
                            var _988 = this.textbox.value.replace(/\r/g, "");
                            var _989 = _988.length - _987;
                            if (_989 > 0) {
                                var _98a = this.textbox;
                                if (_98a.selectionStart) {
                                    var pos = _98a.selectionStart;
                                    var cr = 0;
                                    if (has("opera")) { cr = (this.textbox.value.substring(0, pos).match(/\r/g) || []).length; }
                                    this.textbox.value = _988.substring(0, pos - _989 - cr) + _988.substring(pos - cr);
                                    _98a.setSelectionRange(pos - _989, pos - _989);
                                } else {
                                    if (this.ownerDocument.selection) {
                                        _98a.focus();
                                        var _98b = this.ownerDocument.selection.createRange();
                                        _98b.moveStart("character", -_989);
                                        _98b.text = "";
                                        _98b.select();
                                    }
                                }
                            }
                        }
                        this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/form/Textarea": function() {
            define(["dojo/_base/declare", "dojo/dom-style", "./_ExpandingTextAreaMixin", "./SimpleTextarea"], function(_98c, _98d, _98e, _98f) {
                return _98c("dijit.form.Textarea", [_98f, _98e], {
                    baseClass: "dijitTextBox dijitTextArea dijitExpandingTextArea",
                    cols: "",
                    buildRendering: function() {
                        this.inherited(arguments);
                        _98d.set(this.textbox, { overflowY: "hidden", overflowX: "auto", boxSizing: "border-box", MsBoxSizing: "border-box", WebkitBoxSizing: "border-box", MozBoxSizing: "border-box" });
                    }
                });
            });
        },
        "dijit/form/_ExpandingTextAreaMixin": function() {
            define(["dojo/_base/declare", "dojo/dom-construct", "dojo/has", "dojo/_base/lang", "dojo/on", "dojo/_base/window", "../Viewport"], function(_990, _991, has, lang, on, win, _992) {
                has.add("textarea-needs-help-shrinking", function() {
                    var body = win.body(),
                        te = _991.create("textarea", { rows: "5", cols: "20", value: " ", style: { zoom: 1, fontSize: "12px", height: "96px", overflow: "hidden", visibility: "hidden", position: "absolute", border: "5px solid white", margin: "0", padding: "0", boxSizing: "border-box", MsBoxSizing: "border-box", WebkitBoxSizing: "border-box", MozBoxSizing: "border-box" } }, body, "last");
                    var _993 = te.scrollHeight >= te.clientHeight;
                    body.removeChild(te);
                    return _993;
                });
                return _990("dijit.form._ExpandingTextAreaMixin", null, {
                    _setValueAttr: function() {
                        this.inherited(arguments);
                        this.resize();
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        var _994 = this.textbox;
                        _994.style.overflowY = "hidden";
                        this.own(on(_994, "focus, resize", lang.hitch(this, "_resizeLater")));
                    },
                    startup: function() {
                        this.inherited(arguments);
                        this.own(_992.on("resize", lang.hitch(this, "_resizeLater")));
                        this._resizeLater();
                    },
                    _onInput: function(e) {
                        this.inherited(arguments);
                        this.resize();
                    },
                    _estimateHeight: function() {
                        var _995 = this.textbox;
                        _995.rows = (_995.value.match(/\n/g) || []).length + 1;
                    },
                    _resizeLater: function() { this.defer("resize"); },
                    resize: function() {
                        var _996 = this.textbox;

                        function _997() {
                            var _998 = false;
                            if (_996.value === "") {
                                _996.value = " ";
                                _998 = true;
                            }
                            var sh = _996.scrollHeight;
                            if (_998) { _996.value = ""; }
                            return sh;
                        };
                        if (_996.style.overflowY == "hidden") { _996.scrollTop = 0; }
                        if (this.busyResizing) { return; }
                        this.busyResizing = true;
                        if (_997() || _996.offsetHeight) {
                            var newH = _997() + Math.max(_996.offsetHeight - _996.clientHeight, 0);
                            var _999 = newH + "px";
                            if (_999 != _996.style.height) {
                                _996.style.height = _999;
                                _996.rows = 1;
                            }
                            if (has("textarea-needs-help-shrinking")) {
                                var _99a = _997(),
                                    _99b = _99a,
                                    _99c = _996.style.minHeight,
                                    _99d = 4,
                                    _99e, _99f = _996.scrollTop;
                                _996.style.minHeight = _999;
                                _996.style.height = "auto";
                                while (newH > 0) {
                                    _996.style.minHeight = Math.max(newH - _99d, 4) + "px";
                                    _99e = _997();
                                    var _9a0 = _99b - _99e;
                                    newH -= _9a0;
                                    if (_9a0 < _99d) { break; }
                                    _99b = _99e;
                                    _99d <<= 1;
                                }
                                _996.style.height = newH + "px";
                                _996.style.minHeight = _99c;
                                _996.scrollTop = _99f;
                            }
                            _996.style.overflowY = _997() > _996.clientHeight ? "auto" : "hidden";
                            if (_996.style.overflowY == "hidden") { _996.scrollTop = 0; }
                        } else { this._estimateHeight(); }
                        this.busyResizing = false;
                    }
                });
            });
        },
        "dijit/layout/AccordionContainer": function() {
            define(["require", "dojo/_base/array", "dojo/_base/declare", "dojo/_base/fx", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/keys", "dojo/_base/lang", "dojo/sniff", "dojo/topic", "../focus", "../_base/manager", "dojo/ready", "../_Widget", "../_Container", "../_TemplatedMixin", "../_CssStateMixin", "./StackContainer", "./ContentPane", "dojo/text!./templates/AccordionButton.html", "../a11yclick"], function(_9a1, _9a2, _9a3, fx, dom, _9a4, _9a5, _9a6, _9a7, keys, lang, has, _9a8, _9a9, _9aa, _9ab, _9ac, _9ad, _9ae, _9af, _9b0, _9b1, _9b2) {
                function size(_9b3, dim) { _9b3.resize ? _9b3.resize(dim) : _9a7.setMarginBox(_9b3.domNode, dim); };
                var _9b4 = _9a3("dijit.layout._AccordionButton", [_9ac, _9ae, _9af], {
                    templateString: _9b2,
                    label: "",
                    _setLabelAttr: { node: "titleTextNode", type: "innerHTML" },
                    title: "",
                    _setTitleAttr: { node: "titleTextNode", type: "attribute", attribute: "title" },
                    iconClassAttr: "",
                    _setIconClassAttr: { node: "iconNode", type: "class" },
                    baseClass: "dijitAccordionTitle",
                    getParent: function() { return this.parent; },
                    buildRendering: function() {
                        this.inherited(arguments);
                        var _9b5 = this.id.replace(" ", "_");
                        _9a4.set(this.titleTextNode, "id", _9b5 + "_title");
                        this.focusNode.setAttribute("aria-labelledby", _9a4.get(this.titleTextNode, "id"));
                        dom.setSelectable(this.domNode, false);
                    },
                    getTitleHeight: function() { return _9a7.getMarginSize(this.domNode).h; },
                    _onTitleClick: function() {
                        var _9b6 = this.getParent();
                        _9b6.selectChild(this.contentWidget, true);
                        _9a9.focus(this.focusNode);
                    },
                    _onTitleKeyDown: function(evt) { return this.getParent()._onKeyDown(evt, this.contentWidget); },
                    _setSelectedAttr: function(_9b7) {
                        this._set("selected", _9b7);
                        this.focusNode.setAttribute("aria-expanded", _9b7 ? "true" : "false");
                        this.focusNode.setAttribute("aria-selected", _9b7 ? "true" : "false");
                        this.focusNode.setAttribute("tabIndex", _9b7 ? "0" : "-1");
                    }
                });
                if (has("dojo-bidi")) {
                    _9b4.extend({
                        _setLabelAttr: function(_9b8) {
                            this._set("label", _9b8);
                            _9a4.set(this.titleTextNode, "innerHTML", _9b8);
                            this.applyTextDir(this.titleTextNode);
                        },
                        _setTitleAttr: function(_9b9) {
                            this._set("title", _9b9);
                            _9a4.set(this.titleTextNode, "title", _9b9);
                            this.applyTextDir(this.titleTextNode);
                        }
                    });
                }
                var _9ba = _9a3("dijit.layout._AccordionInnerContainer" + (has("dojo-bidi") ? "_NoBidi" : ""), [_9ac, _9af], {
                    baseClass: "dijitAccordionInnerContainer",
                    isLayoutContainer: true,
                    buildRendering: function() {
                        this.domNode = _9a6.place("<div class='" + this.baseClass + "' role='presentation'>", this.contentWidget.domNode, "after");
                        var _9bb = this.contentWidget,
                            cls = lang.isString(this.buttonWidget) ? lang.getObject(this.buttonWidget) : this.buttonWidget;
                        this.button = _9bb._buttonWidget = (new cls({ contentWidget: _9bb, label: _9bb.title, title: _9bb.tooltip, dir: _9bb.dir, lang: _9bb.lang, textDir: _9bb.textDir || this.textDir, iconClass: _9bb.iconClass, id: _9bb.id + "_button", parent: this.parent })).placeAt(this.domNode);
                        this.containerNode = _9a6.place("<div class='dijitAccordionChildWrapper' role='tabpanel' style='display:none'>", this.domNode);
                        this.containerNode.setAttribute("aria-labelledby", this.button.id);
                        _9a6.place(this.contentWidget.domNode, this.containerNode);
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        var _9bc = this.button,
                            cw = this.contentWidget;
                        this._contentWidgetWatches = [cw.watch("title", lang.hitch(this, function(name, _9bd, _9be) { _9bc.set("label", _9be); })), cw.watch("tooltip", lang.hitch(this, function(name, _9bf, _9c0) { _9bc.set("title", _9c0); })), cw.watch("iconClass", lang.hitch(this, function(name, _9c1, _9c2) { _9bc.set("iconClass", _9c2); }))];
                    },
                    _setSelectedAttr: function(_9c3) {
                        this._set("selected", _9c3);
                        this.button.set("selected", _9c3);
                        if (_9c3) { var cw = this.contentWidget; if (cw.onSelected) { cw.onSelected(); } }
                    },
                    startup: function() { this.contentWidget.startup(); },
                    destroy: function() {
                        this.button.destroyRecursive();
                        _9a2.forEach(this._contentWidgetWatches || [], function(w) { w.unwatch(); });
                        delete this.contentWidget._buttonWidget;
                        delete this.contentWidget._wrapperWidget;
                        this.inherited(arguments);
                    },
                    destroyDescendants: function(_9c4) { this.contentWidget.destroyRecursive(_9c4); }
                });
                if (has("dojo-bidi")) {
                    _9ba = _9a3("dijit.layout._AccordionInnerContainer", _9ba, {
                        postCreate: function() {
                            this.inherited(arguments);
                            var _9c5 = this.button;
                            this._contentWidgetWatches.push(this.contentWidget.watch("textDir", function(name, _9c6, _9c7) { _9c5.set("textDir", _9c7); }));
                        }
                    });
                }
                var _9c8 = _9a3("dijit.layout.AccordionContainer", _9b0, {
                    duration: _9aa.defaultDuration,
                    buttonWidget: _9b4,
                    baseClass: "dijitAccordionContainer",
                    buildRendering: function() {
                        this.inherited(arguments);
                        this.domNode.style.overflow = "hidden";
                        this.domNode.setAttribute("role", "tablist");
                    },
                    startup: function() {
                        if (this._started) { return; }
                        this.inherited(arguments);
                        if (this.selectedChildWidget) { this.selectedChildWidget._wrapperWidget.set("selected", true); }
                    },
                    layout: function() {
                        var _9c9 = this.selectedChildWidget;
                        if (!_9c9) { return; }
                        var _9ca = _9c9._wrapperWidget.domNode,
                            _9cb = _9a7.getMarginExtents(_9ca),
                            _9cc = _9a7.getPadBorderExtents(_9ca),
                            _9cd = _9c9._wrapperWidget.containerNode,
                            _9ce = _9a7.getMarginExtents(_9cd),
                            _9cf = _9a7.getPadBorderExtents(_9cd),
                            _9d0 = this._contentBox;
                        var _9d1 = 0;
                        _9a2.forEach(this.getChildren(), function(_9d2) { if (_9d2 != _9c9) { _9d1 += _9a7.getMarginSize(_9d2._wrapperWidget.domNode).h; } });
                        this._verticalSpace = _9d0.h - _9d1 - _9cb.h - _9cc.h - _9ce.h - _9cf.h - _9c9._buttonWidget.getTitleHeight();
                        this._containerContentBox = { h: this._verticalSpace, w: this._contentBox.w - _9cb.w - _9cc.w - _9ce.w - _9cf.w };
                        if (_9c9) { size(_9c9, this._containerContentBox); }
                    },
                    _setupChild: function(_9d3) {
                        _9d3._wrapperWidget = _9ba({ contentWidget: _9d3, buttonWidget: this.buttonWidget, id: _9d3.id + "_wrapper", dir: _9d3.dir, lang: _9d3.lang, textDir: _9d3.textDir || this.textDir, parent: this });
                        this.inherited(arguments);
                        _9a6.place(_9d3.domNode, _9d3._wrapper, "replace");
                    },
                    removeChild: function(_9d4) {
                        if (_9d4._wrapperWidget) {
                            _9a6.place(_9d4.domNode, _9d4._wrapperWidget.domNode, "after");
                            _9d4._wrapperWidget.destroy();
                            delete _9d4._wrapperWidget;
                        }
                        _9a5.remove(_9d4.domNode, "dijitHidden");
                        this.inherited(arguments);
                    },
                    getChildren: function() { return _9a2.map(this.inherited(arguments), function(_9d5) { return _9d5.declaredClass == "dijit.layout._AccordionInnerContainer" ? _9d5.contentWidget : _9d5; }, this); },
                    destroy: function() {
                        if (this._animation) { this._animation.stop(); }
                        _9a2.forEach(this.getChildren(), function(_9d6) { if (_9d6._wrapperWidget) { _9d6._wrapperWidget.destroy(); } else { _9d6.destroyRecursive(); } });
                        this.inherited(arguments);
                    },
                    _showChild: function(_9d7) { _9d7._wrapperWidget.containerNode.style.display = "block"; return this.inherited(arguments); },
                    _hideChild: function(_9d8) {
                        _9d8._wrapperWidget.containerNode.style.display = "none";
                        this.inherited(arguments);
                    },
                    _transition: function(_9d9, _9da, _9db) {
                        if (has("ie") < 8) { _9db = false; }
                        if (this._animation) {
                            this._animation.stop(true);
                            delete this._animation;
                        }
                        var self = this;
                        if (_9d9) { _9d9._wrapperWidget.set("selected", true); var d = this._showChild(_9d9); if (this.doLayout) { size(_9d9, this._containerContentBox); } }
                        if (_9da) { _9da._wrapperWidget.set("selected", false); if (!_9db) { this._hideChild(_9da); } }
                        if (_9db) {
                            var _9dc = _9d9._wrapperWidget.containerNode,
                                _9dd = _9da._wrapperWidget.containerNode;
                            var _9de = _9d9._wrapperWidget.containerNode,
                                _9df = _9a7.getMarginExtents(_9de),
                                _9e0 = _9a7.getPadBorderExtents(_9de),
                                _9e1 = _9df.h + _9e0.h;
                            _9dd.style.height = (self._verticalSpace - _9e1) + "px";
                            this._animation = new fx.Animation({
                                node: _9dc,
                                duration: this.duration,
                                curve: [1, this._verticalSpace - _9e1 - 1],
                                onAnimate: function(_9e2) {
                                    _9e2 = Math.floor(_9e2);
                                    _9dc.style.height = _9e2 + "px";
                                    _9dd.style.height = (self._verticalSpace - _9e1 - _9e2) + "px";
                                },
                                onEnd: function() {
                                    delete self._animation;
                                    _9dc.style.height = "auto";
                                    _9da._wrapperWidget.containerNode.style.display = "none";
                                    _9dd.style.height = "auto";
                                    self._hideChild(_9da);
                                }
                            });
                            this._animation.onStop = this._animation.onEnd;
                            this._animation.play();
                        }
                        return d;
                    },
                    _onKeyDown: function(e, _9e3) {
                        if (this.disabled || e.altKey || !(_9e3 || e.ctrlKey)) { return; }
                        var c = e.keyCode;
                        if ((_9e3 && (c == keys.LEFT_ARROW || c == keys.UP_ARROW)) || (e.ctrlKey && c == keys.PAGE_UP)) {
                            this._adjacent(false)._buttonWidget._onTitleClick();
                            e.stopPropagation();
                            e.preventDefault();
                        } else {
                            if ((_9e3 && (c == keys.RIGHT_ARROW || c == keys.DOWN_ARROW)) || (e.ctrlKey && (c == keys.PAGE_DOWN || c == keys.TAB))) {
                                this._adjacent(true)._buttonWidget._onTitleClick();
                                e.stopPropagation();
                                e.preventDefault();
                            }
                        }
                    }
                });
                if (has("dijit-legacy-requires")) {
                    _9ab(0, function() {
                        var _9e4 = ["dijit/layout/AccordionPane"];
                        _9a1(_9e4);
                    });
                }
                _9c8._InnerContainer = _9ba;
                _9c8._Button = _9b4;
                return _9c8;
            });
        },
        "dijit/layout/StackContainer": function() {
            define(["dojo/_base/array", "dojo/cookie", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-construct", "dojo/has", "dojo/_base/lang", "dojo/on", "dojo/ready", "dojo/topic", "dojo/when", "../registry", "../_WidgetBase", "./_LayoutWidget"], function(_9e5, _9e6, _9e7, _9e8, _9e9, has, lang, on, _9ea, _9eb, when, _9ec, _9ed, _9ee) {
                if (has("dijit-legacy-requires")) {
                    _9ea(0, function() {
                        var _9ef = ["dijit/layout/StackController"];
                        require(_9ef);
                    });
                }
                var _9f0 = _9e7("dijit.layout.StackContainer", _9ee, {
                    doLayout: true,
                    persist: false,
                    baseClass: "dijitStackContainer",
                    buildRendering: function() {
                        this.inherited(arguments);
                        _9e8.add(this.domNode, "dijitLayoutContainer");
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        this.own(on(this.domNode, "keydown", lang.hitch(this, "_onKeyDown")));
                    },
                    startup: function() {
                        if (this._started) { return; }
                        var _9f1 = this.getChildren();
                        _9e5.forEach(_9f1, this._setupChild, this);
                        if (this.persist) { this.selectedChildWidget = _9ec.byId(_9e6(this.id + "_selectedChild")); } else { _9e5.some(_9f1, function(_9f2) { if (_9f2.selected) { this.selectedChildWidget = _9f2; } return _9f2.selected; }, this); }
                        var _9f3 = this.selectedChildWidget;
                        if (!_9f3 && _9f1[0]) {
                            _9f3 = this.selectedChildWidget = _9f1[0];
                            _9f3.selected = true;
                        }
                        _9eb.publish(this.id + "-startup", { children: _9f1, selected: _9f3, textDir: this.textDir });
                        this.inherited(arguments);
                    },
                    resize: function() {
                        if (!this._hasBeenShown) { this._hasBeenShown = true; var _9f4 = this.selectedChildWidget; if (_9f4) { this._showChild(_9f4); } }
                        this.inherited(arguments);
                    },
                    _setupChild: function(_9f5) {
                        var _9f6 = _9f5.domNode,
                            _9f7 = _9e9.place("<div role='tabpanel' class='" + this.baseClass + "ChildWrapper dijitHidden'>", _9f5.domNode, "replace"),
                            _9f8 = _9f5["aria-label"] || _9f5.title || _9f5.label;
                        if (_9f8) { _9f7.setAttribute("aria-label", _9f8); }
                        _9e9.place(_9f6, _9f7);
                        _9f5._wrapper = _9f7;
                        this.inherited(arguments);
                        if (_9f6.style.display == "none") { _9f6.style.display = "block"; }
                        _9f5.domNode.removeAttribute("title");
                    },
                    addChild: function(_9f9, _9fa) {
                        this.inherited(arguments);
                        if (this._started) {
                            _9eb.publish(this.id + "-addChild", _9f9, _9fa);
                            this.layout();
                            if (!this.selectedChildWidget) { this.selectChild(_9f9); }
                        }
                    },
                    removeChild: function(page) {
                        var idx = _9e5.indexOf(this.getChildren(), page);
                        this.inherited(arguments);
                        _9e9.destroy(page._wrapper);
                        delete page._wrapper;
                        if (this._started) { _9eb.publish(this.id + "-removeChild", page); }
                        if (this._descendantsBeingDestroyed) { return; }
                        if (this.selectedChildWidget === page) { this.selectedChildWidget = undefined; if (this._started) { var _9fb = this.getChildren(); if (_9fb.length) { this.selectChild(_9fb[Math.max(idx - 1, 0)]); } } }
                        if (this._started) { this.layout(); }
                    },
                    selectChild: function(page, _9fc) {
                        var d;
                        page = _9ec.byId(page);
                        if (this.selectedChildWidget != page) {
                            d = this._transition(page, this.selectedChildWidget, _9fc);
                            this._set("selectedChildWidget", page);
                            _9eb.publish(this.id + "-selectChild", page, this._focused);
                            if (this.persist) { _9e6(this.id + "_selectedChild", this.selectedChildWidget.id); }
                        }
                        return when(d || true);
                    },
                    _transition: function(_9fd, _9fe) { if (_9fe) { this._hideChild(_9fe); } var d = this._showChild(_9fd); if (_9fd.resize) { if (this.doLayout) { _9fd.resize(this._containerContentBox || this._contentBox); } else { _9fd.resize(); } } return d; },
                    _adjacent: function(_9ff) {
                        var _a00 = this.getChildren();
                        var _a01 = _9e5.indexOf(_a00, this.selectedChildWidget);
                        _a01 += _9ff ? 1 : _a00.length - 1;
                        return _a00[_a01 % _a00.length];
                    },
                    forward: function() { return this.selectChild(this._adjacent(true), true); },
                    back: function() { return this.selectChild(this._adjacent(false), true); },
                    _onKeyDown: function(e) { _9eb.publish(this.id + "-containerKeyDown", { e: e, page: this }); },
                    layout: function() { var _a02 = this.selectedChildWidget; if (_a02 && _a02.resize) { if (this.doLayout) { _a02.resize(this._containerContentBox || this._contentBox); } else { _a02.resize(); } } },
                    _showChild: function(page) {
                        var _a03 = this.getChildren();
                        page.isFirstChild = (page == _a03[0]);
                        page.isLastChild = (page == _a03[_a03.length - 1]);
                        page._set("selected", true);
                        if (page._wrapper) { _9e8.replace(page._wrapper, "dijitVisible", "dijitHidden"); }
                        return (page._onShow && page._onShow()) || true;
                    },
                    _hideChild: function(page) {
                        page._set("selected", false);
                        if (page._wrapper) { _9e8.replace(page._wrapper, "dijitHidden", "dijitVisible"); }
                        page.onHide && page.onHide();
                    },
                    closeChild: function(page) {
                        var _a04 = !page.onClose || page.onClose(this, page);
                        if (_a04) {
                            this.removeChild(page);
                            page.destroyRecursive();
                        }
                    },
                    destroyDescendants: function(_a05) {
                        this._descendantsBeingDestroyed = true;
                        this.selectedChildWidget = undefined;
                        _9e5.forEach(this.getChildren(), function(_a06) {
                            if (!_a05) { this.removeChild(_a06); }
                            _a06.destroyRecursive(_a05);
                        }, this);
                        this._descendantsBeingDestroyed = false;
                    }
                });
                _9f0.ChildWidgetProperties = { selected: false, disabled: false, closable: false, iconClass: "dijitNoIcon", showTitle: true };
                lang.extend(_9ed, _9f0.ChildWidgetProperties);
                return _9f0;
            });
        },
        "dijit/layout/BorderContainer": function() {
            define(["dojo/_base/array", "dojo/cookie", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/dom-style", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/touch", "../_WidgetBase", "../_Widget", "../_TemplatedMixin", "./LayoutContainer", "./utils"], function(_a07, _a08, _a09, _a0a, _a0b, _a0c, _a0d, keys, lang, on, _a0e, _a0f, _a10, _a11, _a12, _a13) {
                var _a14 = _a09("dijit.layout._Splitter", [_a10, _a11], {
                    live: true,
                    templateString: "<div class=\"dijitSplitter\" data-dojo-attach-event=\"onkeydown:_onKeyDown,press:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse\" tabIndex=\"0\" role=\"separator\"><div class=\"dijitSplitterThumb\"></div></div>",
                    constructor: function() { this._handlers = []; },
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this.horizontal = /top|bottom/.test(this.region);
                        this._factor = /top|left/.test(this.region) ? 1 : -1;
                        this._cookieName = this.container.id + "_" + this.region;
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        _a0a.add(this.domNode, "dijitSplitter" + (this.horizontal ? "H" : "V"));
                        if (this.container.persist) { var _a15 = _a08(this._cookieName); if (_a15) { this.child.domNode.style[this.horizontal ? "height" : "width"] = _a15; } }
                    },
                    _computeMaxSize: function() {
                        var dim = this.horizontal ? "h" : "w",
                            _a16 = _a0c.getMarginBox(this.child.domNode)[dim],
                            _a17 = _a07.filter(this.container.getChildren(), function(_a18) { return _a18.region == "center"; })[0];
                        var _a19 = _a0c.getContentBox(_a17.domNode)[dim] - 10;
                        return Math.min(this.child.maxSize, _a16 + _a19);
                    },
                    _startDrag: function(e) {
                        if (!this.cover) { this.cover = _a0b.place("<div class=dijitSplitterCover></div>", this.child.domNode, "after"); }
                        _a0a.add(this.cover, "dijitSplitterCoverActive");
                        if (this.fake) { _a0b.destroy(this.fake); }
                        if (!(this._resize = this.live)) {
                            (this.fake = this.domNode.cloneNode(true)).removeAttribute("id");
                            _a0a.add(this.domNode, "dijitSplitterShadow");
                            _a0b.place(this.fake, this.domNode, "after");
                        }
                        _a0a.add(this.domNode, "dijitSplitterActive dijitSplitter" + (this.horizontal ? "H" : "V") + "Active");
                        if (this.fake) { _a0a.remove(this.fake, "dijitSplitterHover dijitSplitter" + (this.horizontal ? "H" : "V") + "Hover"); }
                        var _a1a = this._factor,
                            _a1b = this.horizontal,
                            axis = _a1b ? "pageY" : "pageX",
                            _a1c = e[axis],
                            _a1d = this.domNode.style,
                            dim = _a1b ? "h" : "w",
                            _a1e = _a0d.getComputedStyle(this.child.domNode),
                            _a1f = _a0c.getMarginBox(this.child.domNode, _a1e)[dim],
                            max = this._computeMaxSize(),
                            min = Math.max(this.child.minSize, _a0c.getPadBorderExtents(this.child.domNode, _a1e)[dim] + 10),
                            _a20 = this.region,
                            _a21 = _a20 == "top" || _a20 == "bottom" ? "top" : "left",
                            _a22 = parseInt(_a1d[_a21], 10),
                            _a23 = this._resize,
                            _a24 = lang.hitch(this.container, "_layoutChildren", this.child.id),
                            de = this.ownerDocument;
                        this._handlers = this._handlers.concat([on(de, _a0e.move, this._drag = function(e, _a25) {
                            var _a26 = e[axis] - _a1c,
                                _a27 = _a1a * _a26 + _a1f,
                                _a28 = Math.max(Math.min(_a27, max), min);
                            if (_a23 || _a25) { _a24(_a28); }
                            _a1d[_a21] = _a26 + _a22 + _a1a * (_a28 - _a27) + "px";
                        }), on(de, "dragstart", function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                        }), on(this.ownerDocumentBody, "selectstart", function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                        }), on(de, _a0e.release, lang.hitch(this, "_stopDrag"))]);
                        e.stopPropagation();
                        e.preventDefault();
                    },
                    _onMouse: function(e) {
                        var o = (e.type == "mouseover" || e.type == "mouseenter");
                        _a0a.toggle(this.domNode, "dijitSplitterHover", o);
                        _a0a.toggle(this.domNode, "dijitSplitter" + (this.horizontal ? "H" : "V") + "Hover", o);
                    },
                    _stopDrag: function(e) {
                        try {
                            if (this.cover) { _a0a.remove(this.cover, "dijitSplitterCoverActive"); }
                            if (this.fake) { _a0b.destroy(this.fake); }
                            _a0a.remove(this.domNode, "dijitSplitterActive dijitSplitter" + (this.horizontal ? "H" : "V") + "Active dijitSplitterShadow");
                            this._drag(e);
                            this._drag(e, true);
                        } finally {
                            this._cleanupHandlers();
                            delete this._drag;
                        }
                        if (this.container.persist) { _a08(this._cookieName, this.child.domNode.style[this.horizontal ? "height" : "width"], { expires: 365 }); }
                    },
                    _cleanupHandlers: function() { var h; while (h = this._handlers.pop()) { h.remove(); } },
                    _onKeyDown: function(e) {
                        this._resize = true;
                        var _a29 = this.horizontal;
                        var tick = 1;
                        switch (e.keyCode) {
                            case _a29 ? keys.UP_ARROW:
                                keys.LEFT_ARROW: tick *= -1;
                            case _a29 ? keys.DOWN_ARROW:
                                keys.RIGHT_ARROW: break;
                            default:
                                return;
                        }
                        var _a2a = _a0c.getMarginSize(this.child.domNode)[_a29 ? "h" : "w"] + this._factor * tick;
                        this.container._layoutChildren(this.child.id, Math.max(Math.min(_a2a, this._computeMaxSize()), this.child.minSize));
                        e.stopPropagation();
                        e.preventDefault();
                    },
                    destroy: function() {
                        this._cleanupHandlers();
                        delete this.child;
                        delete this.container;
                        delete this.cover;
                        delete this.fake;
                        this.inherited(arguments);
                    }
                });
                var _a2b = _a09("dijit.layout._Gutter", [_a10, _a11], {
                    templateString: "<div class=\"dijitGutter\" role=\"presentation\"></div>",
                    postMixInProperties: function() {
                        this.inherited(arguments);
                        this.horizontal = /top|bottom/.test(this.region);
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        _a0a.add(this.domNode, "dijitGutter" + (this.horizontal ? "H" : "V"));
                    }
                });
                var _a2c = _a09("dijit.layout.BorderContainer", _a12, {
                    gutters: true,
                    liveSplitters: true,
                    persist: false,
                    baseClass: "dijitBorderContainer",
                    _splitterClass: _a14,
                    postMixInProperties: function() {
                        if (!this.gutters) { this.baseClass += "NoGutter"; }
                        this.inherited(arguments);
                    },
                    _setupChild: function(_a2d) {
                        this.inherited(arguments);
                        var _a2e = _a2d.region,
                            ltr = _a2d.isLeftToRight();
                        if (_a2e == "leading") { _a2e = ltr ? "left" : "right"; }
                        if (_a2e == "trailing") { _a2e = ltr ? "right" : "left"; }
                        if (_a2e) {
                            if (_a2e != "center" && (_a2d.splitter || this.gutters) && !_a2d._splitterWidget) {
                                var _a2f = _a2d.splitter ? this._splitterClass : _a2b;
                                if (lang.isString(_a2f)) { _a2f = lang.getObject(_a2f); }
                                var _a30 = new _a2f({ id: _a2d.id + "_splitter", container: this, child: _a2d, region: _a2e, live: this.liveSplitters });
                                _a30.isSplitter = true;
                                _a2d._splitterWidget = _a30;
                                var _a31 = _a2e == "bottom" || _a2e == (this.isLeftToRight() ? "right" : "left");
                                _a0b.place(_a30.domNode, _a2d.domNode, _a31 ? "before" : "after");
                                _a30.startup();
                            }
                        }
                    },
                    layout: function() { this._layoutChildren(); },
                    removeChild: function(_a32) {
                        var _a33 = _a32._splitterWidget;
                        if (_a33) {
                            _a33.destroy();
                            delete _a32._splitterWidget;
                        }
                        this.inherited(arguments);
                    },
                    getChildren: function() { return _a07.filter(this.inherited(arguments), function(_a34) { return !_a34.isSplitter; }); },
                    getSplitter: function(_a35) { return _a07.filter(this.getChildren(), function(_a36) { return _a36.region == _a35; })[0]._splitterWidget; },
                    resize: function(_a37, _a38) {
                        if (!this.cs || !this.pe) {
                            var node = this.domNode;
                            this.cs = _a0d.getComputedStyle(node);
                            this.pe = _a0c.getPadExtents(node, this.cs);
                            this.pe.r = _a0d.toPixelValue(node, this.cs.paddingRight);
                            this.pe.b = _a0d.toPixelValue(node, this.cs.paddingBottom);
                            _a0d.set(node, "padding", "0px");
                        }
                        this.inherited(arguments);
                    },
                    _layoutChildren: function(_a39, _a3a) {
                        if (!this._borderBox || !this._borderBox.h) { return; }
                        var _a3b = [];
                        _a07.forEach(this._getOrderedChildren(), function(pane) { _a3b.push(pane); if (pane._splitterWidget) { _a3b.push(pane._splitterWidget); } });
                        var dim = { l: this.pe.l, t: this.pe.t, w: this._borderBox.w - this.pe.w, h: this._borderBox.h - this.pe.h };
                        _a13.layoutChildren(this.domNode, dim, _a3b, _a39, _a3a);
                    },
                    destroyRecursive: function() {
                        _a07.forEach(this.getChildren(), function(_a3c) {
                            var _a3d = _a3c._splitterWidget;
                            if (_a3d) { _a3d.destroy(); }
                            delete _a3c._splitterWidget;
                        });
                        this.inherited(arguments);
                    }
                });
                _a2c.ChildWidgetProperties = { splitter: false, minSize: 0, maxSize: Infinity };
                lang.mixin(_a2c.ChildWidgetProperties, _a12.ChildWidgetProperties);
                lang.extend(_a0f, _a2c.ChildWidgetProperties);
                _a2c._Splitter = _a14;
                _a2c._Gutter = _a2b;
                return _a2c;
            });
        },
        "dijit/layout/LayoutContainer": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-style", "dojo/_base/lang", "../_WidgetBase", "./_LayoutWidget", "./utils"], function(_a3e, _a3f, _a40, _a41, lang, _a42, _a43, _a44) {
                var _a45 = _a3f("dijit.layout.LayoutContainer", _a43, {
                    design: "headline",
                    baseClass: "dijitLayoutContainer",
                    startup: function() {
                        if (this._started) { return; }
                        _a3e.forEach(this.getChildren(), this._setupChild, this);
                        this.inherited(arguments);
                    },
                    _setupChild: function(_a46) { this.inherited(arguments); var _a47 = _a46.region; if (_a47) { _a40.add(_a46.domNode, this.baseClass + "Pane"); } },
                    _getOrderedChildren: function() {
                        var _a48 = _a3e.map(this.getChildren(), function(_a49, idx) { return { pane: _a49, weight: [_a49.region == "center" ? Infinity : 0, _a49.layoutPriority, (this.design == "sidebar" ? 1 : -1) * (/top|bottom/.test(_a49.region) ? 1 : -1), idx] }; }, this);
                        _a48.sort(function(a, b) {
                            var aw = a.weight,
                                bw = b.weight;
                            for (var i = 0; i < aw.length; i++) { if (aw[i] != bw[i]) { return aw[i] - bw[i]; } }
                            return 0;
                        });
                        return _a3e.map(_a48, function(w) { return w.pane; });
                    },
                    layout: function() { _a44.layoutChildren(this.domNode, this._contentBox, this._getOrderedChildren()); },
                    addChild: function(_a4a, _a4b) { this.inherited(arguments); if (this._started) { this.layout(); } },
                    removeChild: function(_a4c) {
                        this.inherited(arguments);
                        if (this._started) { this.layout(); }
                        _a40.remove(_a4c.domNode, this.baseClass + "Pane");
                        _a41.set(_a4c.domNode, { top: "auto", bottom: "auto", left: "auto", right: "auto", position: "static" });
                        _a41.set(_a4c.domNode, /top|bottom/.test(_a4c.region) ? "width" : "height", "auto");
                    }
                });
                _a45.ChildWidgetProperties = { region: "", layoutAlign: "", layoutPriority: 0 };
                lang.extend(_a42, _a45.ChildWidgetProperties);
                return _a45;
            });
        },
        "dijit/layout/LinkPane": function() {
            define(["./ContentPane", "../_TemplatedMixin", "dojo/_base/declare"], function(_a4d, _a4e, _a4f) {
                return _a4f("dijit.layout.LinkPane", [_a4d, _a4e], {
                    templateString: "<div class=\"dijitLinkPane\" data-dojo-attach-point=\"containerNode\"></div>",
                    postMixInProperties: function() {
                        if (this.srcNodeRef) { this.title += this.srcNodeRef.innerHTML; }
                        this.inherited(arguments);
                    },
                    _fillContent: function() {}
                });
            });
        },
        "dijit/layout/SplitContainer": function() {
            define(["dojo/_base/array", "dojo/cookie", "dojo/_base/declare", "dojo/dom", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/event", "dojo/_base/kernel", "dojo/_base/lang", "dojo/on", "dojo/sniff", "../registry", "../_WidgetBase", "./_LayoutWidget"], function(_a50, _a51, _a52, dom, _a53, _a54, _a55, _a56, _a57, _a58, lang, on, has, _a59, _a5a, _a5b) {
                var _a5c = _a52("dijit.layout.SplitContainer", _a5b, {
                    constructor: function() { _a58.deprecated("dijit.layout.SplitContainer is deprecated", "use BorderContainer with splitter instead", 2); },
                    activeSizing: false,
                    sizerWidth: 7,
                    orientation: "horizontal",
                    persist: true,
                    baseClass: "dijitSplitContainer",
                    postMixInProperties: function() {
                        this.inherited("postMixInProperties", arguments);
                        this.isHorizontal = (this.orientation == "horizontal");
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        this.sizers = [];
                        if (has("mozilla")) { this.domNode.style.overflow = "-moz-scrollbars-none"; }
                        if (typeof this.sizerWidth == "object") { try { this.sizerWidth = parseInt(this.sizerWidth.toString()); } catch (e) { this.sizerWidth = 7; } }
                        var _a5d = this.ownerDocument.createElement("div");
                        this.virtualSizer = _a5d;
                        _a5d.style.position = "relative";
                        _a5d.style.zIndex = 10;
                        _a5d.className = this.isHorizontal ? "dijitSplitContainerVirtualSizerH" : "dijitSplitContainerVirtualSizerV";
                        this.domNode.appendChild(_a5d);
                        dom.setSelectable(_a5d, false);
                    },
                    destroy: function() {
                        delete this.virtualSizer;
                        if (this._ownconnects) { var h; while (h = this._ownconnects.pop()) { h.remove(); } }
                        this.inherited(arguments);
                    },
                    startup: function() {
                        if (this._started) { return; }
                        _a50.forEach(this.getChildren(), function(_a5e, i, _a5f) { this._setupChild(_a5e); if (i < _a5f.length - 1) { this._addSizer(); } }, this);
                        if (this.persist) { this._restoreState(); }
                        this.inherited(arguments);
                    },
                    _setupChild: function(_a60) {
                        this.inherited(arguments);
                        _a60.domNode.style.position = "absolute";
                        _a53.add(_a60.domNode, "dijitSplitPane");
                    },
                    _onSizerMouseDown: function(e) { if (e.target.id) { for (var i = 0; i < this.sizers.length; i++) { if (this.sizers[i].id == e.target.id) { break; } } if (i < this.sizers.length) { this.beginSizing(e, i); } } },
                    _addSizer: function(_a61) {
                        _a61 = _a61 === undefined ? this.sizers.length : _a61;
                        var _a62 = this.ownerDocument.createElement("div");
                        _a62.id = _a59.getUniqueId("dijit_layout_SplitterContainer_Splitter");
                        this.sizers.splice(_a61, 0, _a62);
                        this.domNode.appendChild(_a62);
                        _a62.className = this.isHorizontal ? "dijitSplitContainerSizerH" : "dijitSplitContainerSizerV";
                        var _a63 = this.ownerDocument.createElement("div");
                        _a63.className = "thumb";
                        _a62.appendChild(_a63);
                        this.connect(_a62, "onmousedown", "_onSizerMouseDown");
                        dom.setSelectable(_a62, false);
                    },
                    removeChild: function(_a64) {
                        if (this.sizers.length) {
                            var i = _a50.indexOf(this.getChildren(), _a64);
                            if (i != -1) {
                                if (i == this.sizers.length) { i--; }
                                _a54.destroy(this.sizers[i]);
                                this.sizers.splice(i, 1);
                            }
                        }
                        this.inherited(arguments);
                        if (this._started) { this.layout(); }
                    },
                    addChild: function(_a65, _a66) {
                        if (typeof _a66 == "undefined" || _a66 == "last") { _a66 = this.getChildren().length; }
                        this.inherited(arguments, [_a65, _a66]);
                        if (this._started) {
                            var _a67 = this.getChildren();
                            if (_a67.length > 1) { this._addSizer(_a66); }
                            this.layout();
                        }
                    },
                    layout: function() {
                        this.paneWidth = this._contentBox.w;
                        this.paneHeight = this._contentBox.h;
                        var _a68 = this.getChildren();
                        if (!_a68.length) { return; }
                        var _a69 = this.isHorizontal ? this.paneWidth : this.paneHeight;
                        if (_a68.length > 1) { _a69 -= this.sizerWidth * (_a68.length - 1); }
                        var _a6a = 0;
                        _a50.forEach(_a68, function(_a6b) { _a6a += _a6b.sizeShare; });
                        var _a6c = _a69 / _a6a;
                        var _a6d = 0;
                        _a50.forEach(_a68.slice(0, _a68.length - 1), function(_a6e) {
                            var size = Math.round(_a6c * _a6e.sizeShare);
                            _a6e.sizeActual = size;
                            _a6d += size;
                        });
                        _a68[_a68.length - 1].sizeActual = _a69 - _a6d;
                        this._checkSizes();
                        var pos = 0;
                        var size = _a68[0].sizeActual;
                        this._movePanel(_a68[0], pos, size);
                        _a68[0].position = pos;
                        pos += size;
                        if (!this.sizers) { return; }
                        _a50.some(_a68.slice(1), function(_a6f, i) {
                            if (!this.sizers[i]) { return true; }
                            this._moveSlider(this.sizers[i], pos, this.sizerWidth);
                            this.sizers[i].position = pos;
                            pos += this.sizerWidth;
                            size = _a6f.sizeActual;
                            this._movePanel(_a6f, pos, size);
                            _a6f.position = pos;
                            pos += size;
                        }, this);
                    },
                    _movePanel: function(_a70, pos, size) {
                        var box;
                        if (this.isHorizontal) {
                            _a70.domNode.style.left = pos + "px";
                            _a70.domNode.style.top = 0;
                            box = { w: size, h: this.paneHeight };
                            if (_a70.resize) { _a70.resize(box); } else { _a55.setMarginBox(_a70.domNode, box); }
                        } else {
                            _a70.domNode.style.left = 0;
                            _a70.domNode.style.top = pos + "px";
                            box = { w: this.paneWidth, h: size };
                            if (_a70.resize) { _a70.resize(box); } else { _a55.setMarginBox(_a70.domNode, box); }
                        }
                    },
                    _moveSlider: function(_a71, pos, size) {
                        if (this.isHorizontal) {
                            _a71.style.left = pos + "px";
                            _a71.style.top = 0;
                            _a55.setMarginBox(_a71, { w: size, h: this.paneHeight });
                        } else {
                            _a71.style.left = 0;
                            _a71.style.top = pos + "px";
                            _a55.setMarginBox(_a71, { w: this.paneWidth, h: size });
                        }
                    },
                    _growPane: function(_a72, pane) {
                        if (_a72 > 0) {
                            if (pane.sizeActual > pane.sizeMin) {
                                if ((pane.sizeActual - pane.sizeMin) > _a72) {
                                    pane.sizeActual = pane.sizeActual - _a72;
                                    _a72 = 0;
                                } else {
                                    _a72 -= pane.sizeActual - pane.sizeMin;
                                    pane.sizeActual = pane.sizeMin;
                                }
                            }
                        }
                        return _a72;
                    },
                    _checkSizes: function() {
                        var _a73 = 0;
                        var _a74 = 0;
                        var _a75 = this.getChildren();
                        _a50.forEach(_a75, function(_a76) {
                            _a74 += _a76.sizeActual;
                            _a73 += _a76.sizeMin;
                        });
                        if (_a73 <= _a74) {
                            var _a77 = 0;
                            _a50.forEach(_a75, function(_a78) {
                                if (_a78.sizeActual < _a78.sizeMin) {
                                    _a77 += _a78.sizeMin - _a78.sizeActual;
                                    _a78.sizeActual = _a78.sizeMin;
                                }
                            });
                            if (_a77 > 0) {
                                var list = this.isDraggingLeft ? _a75.reverse() : _a75;
                                _a50.forEach(list, function(_a79) { _a77 = this._growPane(_a77, _a79); }, this);
                            }
                        } else { _a50.forEach(_a75, function(_a7a) { _a7a.sizeActual = Math.round(_a74 * (_a7a.sizeMin / _a73)); }); }
                    },
                    beginSizing: function(e, i) {
                        var _a7b = this.getChildren();
                        this.paneBefore = _a7b[i];
                        this.paneAfter = _a7b[i + 1];
                        this.paneBefore.sizeBeforeDrag = this.paneBefore.sizeActual;
                        this.paneAfter.sizeBeforeDrag = this.paneAfter.sizeActual;
                        this.paneAfter.positionBeforeDrag = this.paneAfter.position;
                        this.isSizing = true;
                        this.sizingSplitter = this.sizers[i];
                        this.sizingSplitter.positionBeforeDrag = _a56.get(this.sizingSplitter, (this.isHorizontal ? "left" : "top"));
                        if (!this.cover) { this.cover = _a54.create("div", { style: { position: "absolute", zIndex: 5, top: 0, left: 0, width: "100%", height: "100%" } }, this.domNode); } else { this.cover.style.zIndex = 5; }
                        this.sizingSplitter.style.zIndex = 6;
                        this.startPoint = this.lastPoint = (this.isHorizontal ? e.pageX : e.pageY);
                        this.maxDelta = this.paneAfter.sizeActual - this.paneAfter.sizeMin;
                        this.minDelta = -1 * (this.paneBefore.sizeActual - this.paneBefore.sizeMin);
                        if (!this.activeSizing) { this._showSizingLine(); }
                        this._ownconnects = [on(this.ownerDocument.documentElement, "mousemove", lang.hitch(this, "changeSizing")), on(this.ownerDocument.documentElement, "mouseup", lang.hitch(this, "endSizing"))];
                        _a57.stop(e);
                    },
                    changeSizing: function(e) {
                        if (!this.isSizing) { return; }
                        this.lastPoint = this.isHorizontal ? e.pageX : e.pageY;
                        var _a7c = Math.max(Math.min(this.lastPoint - this.startPoint, this.maxDelta), this.minDelta);
                        if (this.activeSizing) { this._updateSize(_a7c); } else { this._moveSizingLine(_a7c); }
                        _a57.stop(e);
                    },
                    endSizing: function() {
                        if (!this.isSizing) { return; }
                        if (this.cover) { this.cover.style.zIndex = -1; }
                        if (!this.activeSizing) { this._hideSizingLine(); }
                        var _a7d = Math.max(Math.min(this.lastPoint - this.startPoint, this.maxDelta), this.minDelta);
                        this._updateSize(_a7d);
                        this.isSizing = false;
                        if (this.persist) { this._saveState(this); }
                        var h;
                        while (h = this._ownconnects.pop()) { h.remove(); }
                    },
                    _updateSize: function(_a7e) {
                        this.paneBefore.sizeActual = this.paneBefore.sizeBeforeDrag + _a7e;
                        this.paneAfter.position = this.paneAfter.positionBeforeDrag + _a7e;
                        this.paneAfter.sizeActual = this.paneAfter.sizeBeforeDrag - _a7e;
                        _a50.forEach(this.getChildren(), function(_a7f) { _a7f.sizeShare = _a7f.sizeActual; });
                        if (this._started) { this.layout(); }
                    },
                    _showSizingLine: function() {
                        this._moveSizingLine(0);
                        _a55.setMarginBox(this.virtualSizer, this.isHorizontal ? { w: this.sizerWidth, h: this.paneHeight } : { w: this.paneWidth, h: this.sizerWidth });
                        this.virtualSizer.style.display = "block";
                    },
                    _hideSizingLine: function() { this.virtualSizer.style.display = "none"; },
                    _moveSizingLine: function(_a80) {
                        var pos = _a80 + this.sizingSplitter.positionBeforeDrag;
                        _a56.set(this.virtualSizer, (this.isHorizontal ? "left" : "top"), pos + "px");
                    },
                    _getCookieName: function(i) { return this.id + "_" + i; },
                    _restoreState: function() { _a50.forEach(this.getChildren(), function(_a81, i) { var _a82 = this._getCookieName(i); var _a83 = _a51(_a82); if (_a83) { var pos = parseInt(_a83); if (typeof pos == "number") { _a81.sizeShare = pos; } } }, this); },
                    _saveState: function() {
                        if (!this.persist) { return; }
                        _a50.forEach(this.getChildren(), function(_a84, i) { _a51(this._getCookieName(i), _a84.sizeShare, { expires: 365 }); }, this);
                    }
                });
                _a5c.ChildWidgetProperties = { sizeMin: 10, sizeShare: 10 };
                lang.extend(_a5a, _a5c.ChildWidgetProperties);
                return _a5c;
            });
        },
        "dijit/layout/TabContainer": function() {
            define(["dojo/_base/lang", "dojo/_base/declare", "./_TabContainerBase", "./TabController", "./ScrollingTabController"], function(lang, _a85, _a86, _a87, _a88) {
                return _a85("dijit.layout.TabContainer", _a86, {
                    useMenu: true,
                    useSlider: true,
                    controllerWidget: "",
                    _makeController: function(_a89) {
                        var cls = this.baseClass + "-tabs" + (this.doLayout ? "" : " dijitTabNoLayout"),
                            _a87 = typeof this.controllerWidget == "string" ? lang.getObject(this.controllerWidget) : this.controllerWidget;
                        return new _a87({ id: this.id + "_tablist", ownerDocument: this.ownerDocument, dir: this.dir, lang: this.lang, textDir: this.textDir, tabPosition: this.tabPosition, doLayout: this.doLayout, containerId: this.id, "class": cls, nested: this.nested, useMenu: this.useMenu, useSlider: this.useSlider, tabStripClass: this.tabStrip ? this.baseClass + (this.tabStrip ? "" : "No") + "Strip" : null }, _a89);
                    },
                    postMixInProperties: function() { this.inherited(arguments); if (!this.controllerWidget) { this.controllerWidget = (this.tabPosition == "top" || this.tabPosition == "bottom") && !this.nested ? _a88 : _a87; } }
                });
            });
        },
        "dijit/layout/_TabContainerBase": function() {
            define(["dojo/_base/declare", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "./StackContainer", "./utils", "../_TemplatedMixin", "dojo/text!./templates/TabContainer.html"], function(_a8a, _a8b, _a8c, _a8d, _a8e, _a8f, _a90, _a91) {
                return _a8a("dijit.layout._TabContainerBase", [_a8e, _a90], {
                    tabPosition: "top",
                    baseClass: "dijitTabContainer",
                    tabStrip: false,
                    nested: false,
                    templateString: _a91,
                    postMixInProperties: function() {
                        this.baseClass += this.tabPosition.charAt(0).toUpperCase() + this.tabPosition.substr(1).replace(/-.*/, "");
                        this.srcNodeRef && _a8d.set(this.srcNodeRef, "visibility", "hidden");
                        this.inherited(arguments);
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        this.tablist = this._makeController(this.tablistNode);
                        if (!this.doLayout) { _a8b.add(this.domNode, "dijitTabContainerNoLayout"); }
                        if (this.nested) {
                            _a8b.add(this.domNode, "dijitTabContainerNested");
                            _a8b.add(this.tablist.containerNode, "dijitTabContainerTabListNested");
                            _a8b.add(this.tablistSpacer, "dijitTabContainerSpacerNested");
                            _a8b.add(this.containerNode, "dijitTabPaneWrapperNested");
                        } else { _a8b.add(this.domNode, "tabStrip-" + (this.tabStrip ? "enabled" : "disabled")); }
                    },
                    _setupChild: function(tab) {
                        _a8b.add(tab.domNode, "dijitTabPane");
                        this.inherited(arguments);
                    },
                    removeChild: function(_a92) {
                        _a8b.remove(_a92.domNode, "dijitTabPane");
                        this.inherited(arguments);
                    },
                    startup: function() {
                        if (this._started) { return; }
                        this.tablist.startup();
                        this.inherited(arguments);
                    },
                    layout: function() {
                        if (!this._contentBox || typeof(this._contentBox.l) == "undefined") { return; }
                        var sc = this.selectedChildWidget;
                        if (this.doLayout) {
                            var _a93 = this.tabPosition.replace(/-h/, "");
                            this.tablist.region = _a93;
                            var _a94 = [this.tablist, { domNode: this.tablistSpacer, region: _a93 }, { domNode: this.containerNode, region: "center" }];
                            _a8f.layoutChildren(this.domNode, this._contentBox, _a94);
                            this._containerContentBox = _a8f.marginBox2contentBox(this.containerNode, _a94[2]);
                            if (sc && sc.resize) { sc.resize(this._containerContentBox); }
                        } else {
                            if (this.tablist.resize) {
                                var s = this.tablist.domNode.style;
                                s.width = "0";
                                var _a95 = _a8c.getContentBox(this.domNode).w;
                                s.width = "";
                                this.tablist.resize({ w: _a95 });
                            }
                            if (sc && sc.resize) { sc.resize(); }
                        }
                    },
                    destroy: function(_a96) {
                        if (this.tablist) { this.tablist.destroy(_a96); }
                        this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/layout/TabController": function() {
            define(["dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/has", "dojo/i18n", "dojo/_base/lang", "./StackController", "../registry", "../Menu", "../MenuItem", "dojo/text!./templates/_TabButton.html", "dojo/i18n!../nls/common"], function(_a97, dom, _a98, _a99, has, i18n, lang, _a9a, _a9b, Menu, _a9c, _a9d) {
                var _a9e = _a97("dijit.layout._TabButton" + (has("dojo-bidi") ? "_NoBidi" : ""), _a9a.StackButton, {
                    baseClass: "dijitTab",
                    cssStateNodes: { closeNode: "dijitTabCloseButton" },
                    templateString: _a9d,
                    _setNameAttr: "focusNode",
                    scrollOnFocus: false,
                    buildRendering: function() {
                        this.inherited(arguments);
                        dom.setSelectable(this.containerNode, false);
                    },
                    startup: function() {
                        this.inherited(arguments);
                        var n = this.domNode;
                        this.defer(function() { n.className = n.className; }, 1);
                    },
                    _setCloseButtonAttr: function(disp) {
                        this._set("closeButton", disp);
                        _a99.toggle(this.domNode, "dijitClosable", disp);
                        this.closeNode.style.display = disp ? "" : "none";
                        if (disp) { var _a9f = i18n.getLocalization("dijit", "common"); if (this.closeNode) { _a98.set(this.closeNode, "title", _a9f.itemClose); } }
                    },
                    _setDisabledAttr: function(_aa0) {
                        this.inherited(arguments);
                        if (this.closeNode) {
                            if (_aa0) { _a98.remove(this.closeNode, "title"); } else {
                                var _aa1 = i18n.getLocalization("dijit", "common");
                                _a98.set(this.closeNode, "title", _aa1.itemClose);
                            }
                        }
                    },
                    _setLabelAttr: function(_aa2) { this.inherited(arguments); if (!this.showLabel && !this.params.title) { this.iconNode.alt = lang.trim(this.containerNode.innerText || this.containerNode.textContent || ""); } }
                });
                if (has("dojo-bidi")) {
                    _a9e = _a97("dijit.layout._TabButton", _a9e, {
                        _setLabelAttr: function(_aa3) {
                            this.inherited(arguments);
                            this.applyTextDir(this.iconNode, this.iconNode.alt);
                        }
                    });
                }
                var _aa4 = _a97("dijit.layout.TabController", _a9a, {
                    baseClass: "dijitTabController",
                    templateString: "<div role='tablist' data-dojo-attach-event='onkeydown:onkeydown'></div>",
                    tabPosition: "top",
                    buttonWidget: _a9e,
                    buttonWidgetCloseClass: "dijitTabCloseButton",
                    postCreate: function() {
                        this.inherited(arguments);
                        var _aa5 = new Menu({ id: this.id + "_Menu", ownerDocument: this.ownerDocument, dir: this.dir, lang: this.lang, textDir: this.textDir, targetNodeIds: [this.domNode], selector: function(node) { return _a99.contains(node, "dijitClosable") && !_a99.contains(node, "dijitTabDisabled"); } });
                        this.own(_aa5);
                        var _aa6 = i18n.getLocalization("dijit", "common"),
                            _aa7 = this;
                        _aa5.addChild(new _a9c({
                            label: _aa6.itemClose,
                            ownerDocument: this.ownerDocument,
                            dir: this.dir,
                            lang: this.lang,
                            textDir: this.textDir,
                            onClick: function(evt) {
                                var _aa8 = _a9b.byNode(this.getParent().currentTarget);
                                _aa7.onCloseButtonClick(_aa8.page);
                            }
                        }));
                    }
                });
                _aa4.TabButton = _a9e;
                return _aa4;
            });
        },
        "dijit/layout/StackController": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-construct", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/topic", "../focus", "../registry", "../_Widget", "../_TemplatedMixin", "../_Container", "../form/ToggleButton", "dojo/touch"], function(_aa9, _aaa, _aab, _aac, keys, lang, on, _aad, _aae, _aaf, _ab0, _ab1, _ab2, _ab3) {
                var _ab4 = _aaa("dijit.layout._StackButton", _ab3, {
                    tabIndex: "-1",
                    closeButton: false,
                    _aria_attr: "aria-selected",
                    buildRendering: function(evt) {
                        this.inherited(arguments);
                        (this.focusNode || this.domNode).setAttribute("role", "tab");
                    }
                });
                var _ab5 = _aaa("dijit.layout.StackController", [_ab0, _ab1, _ab2], {
                    baseClass: "dijitStackController",
                    templateString: "<span role='tablist' data-dojo-attach-event='onkeydown'></span>",
                    containerId: "",
                    buttonWidget: _ab4,
                    buttonWidgetCloseClass: "dijitStackCloseButton",
                    pane2button: function(id) { return _aaf.byId(this.id + "_" + id); },
                    postCreate: function() {
                        this.inherited(arguments);
                        this.own(_aad.subscribe(this.containerId + "-startup", lang.hitch(this, "onStartup")), _aad.subscribe(this.containerId + "-addChild", lang.hitch(this, "onAddChild")), _aad.subscribe(this.containerId + "-removeChild", lang.hitch(this, "onRemoveChild")), _aad.subscribe(this.containerId + "-selectChild", lang.hitch(this, "onSelectChild")), _aad.subscribe(this.containerId + "-containerKeyDown", lang.hitch(this, "onContainerKeyDown")));
                        this.containerNode.dojoClick = true;
                        this.own(on(this.containerNode, "click", lang.hitch(this, function(evt) { var _ab6 = _aaf.getEnclosingWidget(evt.target); if (_ab6 != this.containerNode && !_ab6.disabled && _ab6.page) { for (var _ab7 = evt.target; _ab7 !== this.containerNode; _ab7 = _ab7.parentNode) { if (_aab.contains(_ab7, this.buttonWidgetCloseClass)) { this.onCloseButtonClick(_ab6.page); break; } else { if (_ab7 == _ab6.domNode) { this.onButtonClick(_ab6.page); break; } } } } })));
                    },
                    onStartup: function(info) {
                        this.textDir = info.textDir;
                        _aa9.forEach(info.children, this.onAddChild, this);
                        if (info.selected) { this.onSelectChild(info.selected); }
                        var _ab8 = _aaf.byId(this.containerId).containerNode,
                            _ab9 = lang.hitch(this, "pane2button"),
                            _aba = { "title": "label", "showtitle": "showLabel", "iconclass": "iconClass", "closable": "closeButton", "tooltip": "title", "disabled": "disabled", "textdir": "textdir" },
                            _abb = function(attr, _abc) { return on(_ab8, "attrmodified-" + attr, function(evt) { var _abd = _ab9(evt.detail && evt.detail.widget && evt.detail.widget.id); if (_abd) { _abd.set(_abc, evt.detail.newValue); } }); };
                        for (var attr in _aba) { this.own(_abb(attr, _aba[attr])); }
                    },
                    destroy: function(_abe) {
                        this.destroyDescendants(_abe);
                        this.inherited(arguments);
                    },
                    onAddChild: function(page, _abf) {
                        var Cls = lang.isString(this.buttonWidget) ? lang.getObject(this.buttonWidget) : this.buttonWidget;
                        var _ac0 = new Cls({ id: this.id + "_" + page.id, name: this.id + "_" + page.id, label: page.title, disabled: page.disabled, ownerDocument: this.ownerDocument, dir: page.dir, lang: page.lang, textDir: page.textDir || this.textDir, showLabel: page.showTitle, iconClass: page.iconClass, closeButton: page.closable, title: page.tooltip, page: page });
                        this.addChild(_ac0, _abf);
                        page.controlButton = _ac0;
                        if (!this._currentChild) { this.onSelectChild(page); }
                        var _ac1 = page._wrapper.getAttribute("aria-labelledby") ? page._wrapper.getAttribute("aria-labelledby") + " " + _ac0.id : _ac0.id;
                        page._wrapper.removeAttribute("aria-label");
                        page._wrapper.setAttribute("aria-labelledby", _ac1);
                    },
                    onRemoveChild: function(page) {
                        if (this._currentChild === page) { this._currentChild = null; }
                        var _ac2 = this.pane2button(page.id);
                        if (_ac2) {
                            this.removeChild(_ac2);
                            _ac2.destroy();
                        }
                        delete page.controlButton;
                    },
                    onSelectChild: function(page) {
                        if (!page) { return; }
                        if (this._currentChild) {
                            var _ac3 = this.pane2button(this._currentChild.id);
                            _ac3.set("checked", false);
                            _ac3.focusNode.setAttribute("tabIndex", "-1");
                        }
                        var _ac4 = this.pane2button(page.id);
                        _ac4.set("checked", true);
                        this._currentChild = page;
                        _ac4.focusNode.setAttribute("tabIndex", "0");
                        var _ac5 = _aaf.byId(this.containerId);
                    },
                    onButtonClick: function(page) {
                        var _ac6 = this.pane2button(page.id);
                        _aae.focus(_ac6.focusNode);
                        if (this._currentChild && this._currentChild.id === page.id) { _ac6.set("checked", true); }
                        var _ac7 = _aaf.byId(this.containerId);
                        _ac7.selectChild(page);
                    },
                    onCloseButtonClick: function(page) {
                        var _ac8 = _aaf.byId(this.containerId);
                        _ac8.closeChild(page);
                        if (this._currentChild) { var b = this.pane2button(this._currentChild.id); if (b) { _aae.focus(b.focusNode || b.domNode); } }
                    },
                    adjacent: function(_ac9) {
                        if (!this.isLeftToRight() && (!this.tabPosition || /top|bottom/.test(this.tabPosition))) { _ac9 = !_ac9; }
                        var _aca = this.getChildren();
                        var idx = _aa9.indexOf(_aca, this.pane2button(this._currentChild.id)),
                            _acb = _aca[idx];
                        var _acc;
                        do {
                            idx = (idx + (_ac9 ? 1 : _aca.length - 1)) % _aca.length;
                            _acc = _aca[idx];
                        } while (_acc.disabled && _acc != _acb);
                        return _acc;
                    },
                    onkeydown: function(e, _acd) {
                        if (this.disabled || e.altKey) { return; }
                        var _ace = null;
                        if (e.ctrlKey || !e._djpage) {
                            switch (e.keyCode) {
                                case keys.LEFT_ARROW:
                                case keys.UP_ARROW:
                                    if (!e._djpage) { _ace = false; }
                                    break;
                                case keys.PAGE_UP:
                                    if (e.ctrlKey) { _ace = false; }
                                    break;
                                case keys.RIGHT_ARROW:
                                case keys.DOWN_ARROW:
                                    if (!e._djpage) { _ace = true; }
                                    break;
                                case keys.PAGE_DOWN:
                                    if (e.ctrlKey) { _ace = true; }
                                    break;
                                case keys.HOME:
                                    var _acf = this.getChildren();
                                    for (var idx = 0; idx < _acf.length; idx++) { var _ad0 = _acf[idx]; if (!_ad0.disabled) { this.onButtonClick(_ad0.page); break; } }
                                    e.stopPropagation();
                                    e.preventDefault();
                                    break;
                                case keys.END:
                                    var _acf = this.getChildren();
                                    for (var idx = _acf.length - 1; idx >= 0; idx--) { var _ad0 = _acf[idx]; if (!_ad0.disabled) { this.onButtonClick(_ad0.page); break; } }
                                    e.stopPropagation();
                                    e.preventDefault();
                                    break;
                                case keys.DELETE:
                                case "W".charCodeAt(0):
                                    if (this._currentChild.closable && (e.keyCode == keys.DELETE || e.ctrlKey)) {
                                        this.onCloseButtonClick(this._currentChild);
                                        e.stopPropagation();
                                        e.preventDefault();
                                    }
                                    break;
                                case keys.TAB:
                                    if (e.ctrlKey) {
                                        this.onButtonClick(this.adjacent(!e.shiftKey).page);
                                        e.stopPropagation();
                                        e.preventDefault();
                                    }
                                    break;
                            }
                            if (_ace !== null) {
                                this.onButtonClick(this.adjacent(_ace).page);
                                e.stopPropagation();
                                e.preventDefault();
                            }
                        }
                    },
                    onContainerKeyDown: function(info) {
                        info.e._djpage = info.page;
                        this.onkeydown(info.e);
                    }
                });
                _ab5.StackButton = _ab4;
                return _ab5;
            });
        },
        "dijit/layout/ScrollingTabController": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/fx", "dojo/_base/lang", "dojo/on", "dojo/query", "dojo/sniff", "../registry", "dojo/text!./templates/ScrollingTabController.html", "dojo/text!./templates/_ScrollingTabControllerButton.html", "./TabController", "./utils", "../_WidgetsInTemplateMixin", "../Menu", "../MenuItem", "../form/Button", "../_HasDropDown", "dojo/NodeList-dom", "../a11yclick"], function(_ad1, _ad2, _ad3, _ad4, _ad5, fx, lang, on, _ad6, has, _ad7, _ad8, _ad9, _ada, _adb, _adc, Menu, _add, _ade, _adf) {
                var _ae0 = _ad2("dijit.layout.ScrollingTabController", [_ada, _adc], {
                    baseClass: "dijitTabController dijitScrollingTabController",
                    templateString: _ad8,
                    useMenu: true,
                    useSlider: true,
                    tabStripClass: "",
                    _minScroll: 5,
                    _setClassAttr: { node: "containerNode", type: "class" },
                    buildRendering: function() {
                        this.inherited(arguments);
                        var n = this.domNode;
                        this.scrollNode = this.tablistWrapper;
                        this._initButtons();
                        if (!this.tabStripClass) {
                            this.tabStripClass = "dijitTabContainer" + this.tabPosition.charAt(0).toUpperCase() + this.tabPosition.substr(1).replace(/-.*/, "") + "None";
                            _ad3.add(n, "tabStrip-disabled");
                        }
                        _ad3.add(this.tablistWrapper, this.tabStripClass);
                    },
                    onStartup: function() {
                        this.inherited(arguments);
                        _ad5.set(this.domNode, "visibility", "");
                        this._postStartup = true;
                        this.own(on(this.containerNode, "attrmodified-label, attrmodified-iconclass", lang.hitch(this, function(evt) { if (this._dim) { this.resize(this._dim); } })));
                    },
                    onAddChild: function(page, _ae1) {
                        this.inherited(arguments);
                        _ad5.set(this.containerNode, "width", (_ad5.get(this.containerNode, "width") + 200) + "px");
                    },
                    onRemoveChild: function(page, _ae2) {
                        var _ae3 = this.pane2button(page.id);
                        if (this._selectedTab === _ae3.domNode) { this._selectedTab = null; }
                        this.inherited(arguments);
                    },
                    _initButtons: function() {
                        this._btnWidth = 0;
                        this._buttons = _ad6("> .tabStripButton", this.domNode).filter(function(btn) { if ((this.useMenu && btn == this._menuBtn.domNode) || (this.useSlider && (btn == this._rightBtn.domNode || btn == this._leftBtn.domNode))) { this._btnWidth += _ad4.getMarginSize(btn).w; return true; } else { _ad5.set(btn, "display", "none"); return false; } }, this);
                    },
                    _getTabsWidth: function() {
                        var _ae4 = this.getChildren();
                        if (_ae4.length) {
                            var _ae5 = _ae4[this.isLeftToRight() ? 0 : _ae4.length - 1].domNode,
                                _ae6 = _ae4[this.isLeftToRight() ? _ae4.length - 1 : 0].domNode;
                            return _ae6.offsetLeft + _ae6.offsetWidth - _ae5.offsetLeft;
                        } else { return 0; }
                    },
                    _enableBtn: function(_ae7) {
                        var _ae8 = this._getTabsWidth();
                        _ae7 = _ae7 || _ad5.get(this.scrollNode, "width");
                        return _ae8 > 0 && _ae7 < _ae8;
                    },
                    resize: function(dim) {
                        this._dim = dim;
                        this.scrollNode.style.height = "auto";
                        var cb = this._contentBox = _adb.marginBox2contentBox(this.domNode, { h: 0, w: dim.w });
                        cb.h = this.scrollNode.offsetHeight;
                        _ad4.setContentSize(this.domNode, cb);
                        var _ae9 = this._enableBtn(this._contentBox.w);
                        this._buttons.style("display", _ae9 ? "" : "none");
                        this._leftBtn.region = "left";
                        this._rightBtn.region = "right";
                        this._menuBtn.region = this.isLeftToRight() ? "right" : "left";
                        _adb.layoutChildren(this.domNode, this._contentBox, [this._menuBtn, this._leftBtn, this._rightBtn, { domNode: this.scrollNode, region: "center" }]);
                        if (this._selectedTab) {
                            if (this._anim && this._anim.status() == "playing") { this._anim.stop(); }
                            this.scrollNode.scrollLeft = this._convertToScrollLeft(this._getScrollForSelectedTab());
                        }
                        this._setButtonClass(this._getScroll());
                        this._postResize = true;
                        return { h: this._contentBox.h, w: dim.w };
                    },
                    _getScroll: function() { return (this.isLeftToRight() || has("ie") < 8 || (has("trident") && has("quirks")) || has("webkit")) ? this.scrollNode.scrollLeft : _ad5.get(this.containerNode, "width") - _ad5.get(this.scrollNode, "width") + (has("trident") || has("edge") ? -1 : 1) * this.scrollNode.scrollLeft; },
                    _convertToScrollLeft: function(val) { if (this.isLeftToRight() || has("ie") < 8 || (has("trident") && has("quirks")) || has("webkit")) { return val; } else { var _aea = _ad5.get(this.containerNode, "width") - _ad5.get(this.scrollNode, "width"); return (has("trident") || has("edge") ? -1 : 1) * (val - _aea); } },
                    onSelectChild: function(page, _aeb) {
                        var tab = this.pane2button(page.id);
                        if (!tab) { return; }
                        var node = tab.domNode;
                        if (node != this._selectedTab) {
                            this._selectedTab = node;
                            if (this._postResize) {
                                var sl = this._getScroll();
                                if (sl > node.offsetLeft || sl + _ad5.get(this.scrollNode, "width") < node.offsetLeft + _ad5.get(node, "width")) {
                                    var anim = this.createSmoothScroll();
                                    if (_aeb) { anim.onEnd = function() { tab.focus(); }; }
                                    anim.play();
                                } else { if (_aeb) { tab.focus(); } }
                            }
                        }
                        this.inherited(arguments);
                    },
                    _getScrollBounds: function() {
                        var _aec = this.getChildren(),
                            _aed = _ad5.get(this.scrollNode, "width"),
                            _aee = _ad5.get(this.containerNode, "width"),
                            _aef = _aee - _aed,
                            _af0 = this._getTabsWidth();
                        if (_aec.length && _af0 > _aed) { return { min: this.isLeftToRight() ? 0 : _aec[_aec.length - 1].domNode.offsetLeft, max: this.isLeftToRight() ? (_aec[_aec.length - 1].domNode.offsetLeft + _aec[_aec.length - 1].domNode.offsetWidth) - _aed : _aef }; } else { var _af1 = this.isLeftToRight() ? 0 : _aef; return { min: _af1, max: _af1 }; }
                    },
                    _getScrollForSelectedTab: function() {
                        var w = this.scrollNode,
                            n = this._selectedTab,
                            _af2 = _ad5.get(this.scrollNode, "width"),
                            _af3 = this._getScrollBounds();
                        var pos = (n.offsetLeft + _ad5.get(n, "width") / 2) - _af2 / 2;
                        pos = Math.min(Math.max(pos, _af3.min), _af3.max);
                        return pos;
                    },
                    createSmoothScroll: function(x) {
                        if (arguments.length > 0) {
                            var _af4 = this._getScrollBounds();
                            x = Math.min(Math.max(x, _af4.min), _af4.max);
                        } else { x = this._getScrollForSelectedTab(); }
                        if (this._anim && this._anim.status() == "playing") { this._anim.stop(); }
                        var self = this,
                            w = this.scrollNode,
                            anim = new fx.Animation({
                                beforeBegin: function() {
                                    if (this.curve) { delete this.curve; }
                                    var oldS = w.scrollLeft,
                                        newS = self._convertToScrollLeft(x);
                                    anim.curve = new fx._Line(oldS, newS);
                                },
                                onAnimate: function(val) { w.scrollLeft = val; }
                            });
                        this._anim = anim;
                        this._setButtonClass(x);
                        return anim;
                    },
                    _getBtnNode: function(e) { var n = e.target; while (n && !_ad3.contains(n, "tabStripButton")) { n = n.parentNode; } return n; },
                    doSlideRight: function(e) { this.doSlide(1, this._getBtnNode(e)); },
                    doSlideLeft: function(e) { this.doSlide(-1, this._getBtnNode(e)); },
                    doSlide: function(_af5, node) {
                        if (node && _ad3.contains(node, "dijitTabDisabled")) { return; }
                        var _af6 = _ad5.get(this.scrollNode, "width");
                        var d = (_af6 * 0.75) * _af5;
                        var to = this._getScroll() + d;
                        this._setButtonClass(to);
                        this.createSmoothScroll(to).play();
                    },
                    _setButtonClass: function(_af7) {
                        var _af8 = this._getScrollBounds();
                        this._leftBtn.set("disabled", _af7 <= _af8.min);
                        this._rightBtn.set("disabled", _af7 >= _af8.max);
                    }
                });
                var _af9 = _ad2("dijit.layout._ScrollingTabControllerButtonMixin", null, { baseClass: "dijitTab tabStripButton", templateString: _ad9, tabIndex: "", isFocusable: function() { return false; } });
                _ad2("dijit.layout._ScrollingTabControllerButton", [_ade, _af9]);
                _ad2("dijit.layout._ScrollingTabControllerMenuButton", [_ade, _adf, _af9], {
                    containerId: "",
                    tabIndex: "-1",
                    isLoaded: function() { return false; },
                    loadDropDown: function(_afa) {
                        this.dropDown = new Menu({ id: this.containerId + "_menu", ownerDocument: this.ownerDocument, dir: this.dir, lang: this.lang, textDir: this.textDir });
                        var _afb = _ad7.byId(this.containerId);
                        _ad1.forEach(_afb.getChildren(), function(page) {
                            var _afc = new _add({ id: page.id + "_stcMi", label: page.title, iconClass: page.iconClass, disabled: page.disabled, ownerDocument: this.ownerDocument, dir: page.dir, lang: page.lang, textDir: page.textDir || _afb.textDir, onClick: function() { _afb.selectChild(page); } });
                            this.dropDown.addChild(_afc);
                        }, this);
                        _afa();
                    },
                    closeDropDown: function(_afd) {
                        this.inherited(arguments);
                        if (this.dropDown) {
                            this._popupStateNode.removeAttribute("aria-owns");
                            this.dropDown.destroyRecursive();
                            delete this.dropDown;
                        }
                    }
                });
                return _ae0;
            });
        },
        "url:dijit/templates/ColorPalette.html": "<div class=\"dijitInline dijitColorPalette\" role=\"grid\">\n\t<table data-dojo-attach-point=\"paletteTableNode\" class=\"dijitPaletteTable\" cellSpacing=\"0\" cellPadding=\"0\" role=\"presentation\">\n\t\t<tbody data-dojo-attach-point=\"gridNode\"></tbody>\n\t</table>\n</div>\n",
        "url:dijit/templates/Dialog.html": "<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"\n\t\t\t\trole=\"heading\" level=\"1\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabindex=\"-1\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t\t</span>\n\t</div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n\t${!actionBarTemplate}\n</div>\n\n",
        "url:dijit/templates/TooltipDialog.html": "<div role=\"alertdialog\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div data-dojo-attach-point=\"contentsNode\" class=\"dijitTooltipContents dijitTooltipFocusNode\">\n\t\t\t<div data-dojo-attach-point=\"containerNode\"></div>\n\t\t\t${!actionBarTemplate}\n\t\t</div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\" data-dojo-attach-point=\"connectorNode\"></div>\n</div>\n",
        "url:dijit/form/templates/Button.html": "<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:__onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\tdata-dojo-attach-event=\"onclick:_onClick\"\n\t\ttabIndex=\"-1\" aria-hidden=\"true\" data-dojo-attach-point=\"valueNode\"\n/></span>\n",
        "url:dijit/form/templates/TextBox.html": "<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n",
        "url:dijit/templates/Tooltip.html": "<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\" data-dojo-attach-event=\"mouseenter:onMouseEnter,mouseleave:onMouseLeave\"\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n></div>\n",
        "url:dijit/form/templates/ValidationTextBox.html": "<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n",
        "url:dijit/form/templates/DropDownBox.html": "<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\taria-haspopup=\"true\"\n\tdata-dojo-attach-point=\"_popupStateNode\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"button presentation\" aria-hidden=\"true\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"${type}\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\"\n\t/></div\n></div>\n",
        "url:dijit/form/templates/DropDownButton.html": "<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:__onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode,_popupStateNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onclick:_onClick\" data-dojo-attach-point=\"valueNode\" aria-hidden=\"true\"\n/></span>\n",
        "url:dijit/templates/Menu.html": "<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\"\n\t   cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n",
        "url:dijit/templates/MenuItem.html": "<tr class=\"dijitReset\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,textDirNode\"\n\t\trole=\"presentation\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<span data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<span class=\"dijitInline dijitIcon dijitMenuExpand\"></span>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</span>\n\t</td>\n</tr>\n",
        "url:dijit/templates/CheckedMenuItem.html": "<tr class=\"dijitReset\" data-dojo-attach-point=\"focusNode\" role=\"${role}\" tabIndex=\"-1\" aria-checked=\"${checked}\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<span class=\"dijitInline dijitIcon dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t\t<span class=\"dijitMenuItemIconChar dijitCheckedMenuItemIconChar\">${!checkedChar}</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode,textDirNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n",
        "url:dijit/templates/MenuBar.html": "<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\" role=\"menubar\" tabIndex=\"${tabIndex}\"\n\t ></div>\n",
        "url:dijit/templates/MenuBarItem.html": "<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\"\n\t \trole=\"menuitem\" tabIndex=\"-1\">\n\t<span data-dojo-attach-point=\"containerNode,textDirNode\"></span>\n</div>\n",
        "url:dijit/templates/MenuSeparator.html": "<tr class=\"dijitMenuSeparator\" role=\"separator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>\n",
        "url:dijit/templates/ProgressBar.html": "<div class=\"dijitProgressBar dijitProgressBarEmpty\" role=\"progressbar\"\n\t><div  data-dojo-attach-point=\"internalProgress\" class=\"dijitProgressBarFull\"\n\t\t><div class=\"dijitProgressBarTile\" role=\"presentation\"></div\n\t\t><span style=\"visibility:hidden\">&#160;</span\n\t></div\n\t><div data-dojo-attach-point=\"labelNode\" class=\"dijitProgressBarLabel\" id=\"${id}_label\"></div\n\t><span data-dojo-attach-point=\"indeterminateHighContrastImage\"\n\t\t   class=\"dijitInline dijitProgressBarIndeterminateHighContrastImage\"></span\n></div>\n",
        "url:dijit/templates/TitlePane.html": "<div>\n\t<div data-dojo-attach-event=\"ondijitclick:_onTitleClick, onkeydown:_onTitleKey\"\n\t\t\tclass=\"dijitTitlePaneTitle\" data-dojo-attach-point=\"titleBarNode\" id=\"${id}_titleBarNode\">\n\t\t<div class=\"dijitTitlePaneTitleFocus\" data-dojo-attach-point=\"focusNode\">\n\t\t\t<span data-dojo-attach-point=\"arrowNode\" class=\"dijitInline dijitArrowNode\" role=\"presentation\"></span\n\t\t\t><span data-dojo-attach-point=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t\t><span data-dojo-attach-point=\"titleNode\" class=\"dijitTitlePaneTextNode\"></span>\n\t\t</div>\n\t</div>\n\t<div class=\"dijitTitlePaneContentOuter\" data-dojo-attach-point=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" data-dojo-attach-point=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitTitlePaneContentInner\" data-dojo-attach-point=\"containerNode\" role=\"region\" id=\"${id}_pane\" aria-labelledby=\"${id}_titleBarNode\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n",
        "url:dijit/templates/TreeNode.html": "<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow\" role=\"presentation\"\n\t\t><span data-dojo-attach-point=\"expandoNode\" class=\"dijitInline dijitTreeExpando\" role=\"presentation\"></span\n\t\t><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitTreeIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span data-dojo-attach-point=\"labelNode,focusNode\" class=\"dijitTreeLabel\" role=\"treeitem\"\n\t\t\t\t   tabindex=\"-1\" aria-selected=\"false\" id=\"${id}_label\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeNodeContainer\" role=\"presentation\"\n\t\t style=\"display: none;\" aria-labelledby=\"${id}_label\"></div>\n</div>\n",
        "url:dijit/templates/Tree.html": "<div role=\"tree\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" data-dojo-attach-point=\"indentDetector\"></div>\n\t<div class=\"dijitTreeExpando dijitTreeExpandoLoading\" data-dojo-attach-point=\"rootLoadingIndicator\"></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\">\n\t</div>\n</div>\n",
        "url:dijit/templates/InlineEditBox.html": "<span data-dojo-attach-point=\"editNode\" role=\"presentation\" class=\"dijitReset dijitInline dijitOffScreen\"\n\t><span data-dojo-attach-point=\"editorPlaceholder\"></span\n\t><span data-dojo-attach-point=\"buttonContainer\"\n\t\t><button data-dojo-type=\"./form/Button\" data-dojo-props=\"label: '${buttonSave}', 'class': 'saveButton'\"\n\t\t\tdata-dojo-attach-point=\"saveButton\" data-dojo-attach-event=\"onClick:save\"></button\n\t\t><button data-dojo-type=\"./form/Button\"  data-dojo-props=\"label: '${buttonCancel}', 'class': 'cancelButton'\"\n\t\t\tdata-dojo-attach-point=\"cancelButton\" data-dojo-attach-event=\"onClick:cancel\"></button\n\t></span\n></span>\n",
        "url:dijit/form/templates/ComboButton.html": "<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:__onClick,onkeydown:_onButtonKeyDown\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeydown:_onArrowKeyDown\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\"\n\t\t\t\tclass=\"dijitOffScreen\" aria-hidden=\"true\" data-dojo-attach-event=\"onclick:_onClick\"\n\t\t/></td></tr></tbody\n></table>\n",
        "url:dijit/form/templates/CheckBox.html": "<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><input\n\t \t${!nameAttrSetting} type=\"${type}\" role=\"${type}\" aria-checked=\"false\" ${checkedAttrSetting}\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\tdata-dojo-attach-point=\"focusNode\"\n\t \tdata-dojo-attach-event=\"ondijitclick:_onClick\"\n/></div>\n",
        "url:dijit/templates/Calendar.html": "<div class=\"dijitCalendarContainer dijitInline\" role=\"presentation\" aria-labelledby=\"${id}_mddb ${id}_year\">\n\t<div class=\"dijitReset dijitCalendarMonthContainer\" role=\"presentation\">\n\t\t<div class='dijitReset dijitCalendarArrow dijitCalendarDecrementArrow' data-dojo-attach-point=\"decrementMonth\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"/>\n\t\t\t<span data-dojo-attach-point=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\n\t\t</div>\n\t\t<div class='dijitReset dijitCalendarArrow dijitCalendarIncrementArrow' data-dojo-attach-point=\"incrementMonth\">\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"/>\n\t\t\t<span data-dojo-attach-point=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\n\t\t</div>\n\t\t<div data-dojo-attach-point=\"monthNode\" class=\"dijitInline\"></div>\n\t</div>\n\t<table cellspacing=\"0\" cellpadding=\"0\" role=\"grid\" data-dojo-attach-point=\"gridNode\">\n\t\t<thead>\n\t\t\t<tr role=\"row\">\n\t\t\t\t${!dayCellsHtml}\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody data-dojo-attach-point=\"dateRowsNode\" data-dojo-attach-event=\"ondijitclick: _onDayClick\" class=\"dijitReset dijitCalendarBodyContainer\">\n\t\t\t\t${!dateRowsHtml}\n\t\t</tbody>\n\t</table>\n\t<div class=\"dijitReset dijitCalendarYearContainer\" role=\"presentation\">\n\t\t<div class=\"dijitCalendarYearLabel\">\n\t\t\t<span data-dojo-attach-point=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\" role=\"button\"></span>\n\t\t\t<span data-dojo-attach-point=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" role=\"button\" id=\"${id}_year\"></span>\n\t\t\t<span data-dojo-attach-point=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\" role=\"button\"></span>\n\t\t</div>\n\t</div>\n</div>\n",
        "url:dijit/form/templates/Spinner.html": "<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitButtonNode dijitSpinnerButtonContainer\"\n\t\t><input class=\"dijitReset dijitInputField dijitSpinnerButtonInner\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t/><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitUpArrowButton\"\n\t\t\tdata-dojo-attach-point=\"upArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9650; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\tdata-dojo-attach-point=\"downArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' data-dojo-attach-point=\"textbox,focusNode\" type=\"${type}\" data-dojo-attach-event=\"onkeydown:_onKeyDown\"\n\t\t\trole=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}\n\t/></div\n></div>\n",
        "url:dijit/form/templates/Select.html": "<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode,_popupStateNode\" cellspacing='0' cellpadding='0'\n\trole=\"listbox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitInputField dijitButtonText\"  data-dojo-attach-point=\"containerNode,textDirNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitValidationContainer\"\n\t\t\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t/></div\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td\n\t\t><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer\"\n\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t${_buttonInputDisabled}\n\t\t/></td\n\t></tr></tbody\n></table>\n",
        "url:dijit/form/templates/HorizontalSlider.html": "<table class=\"dijit dijitReset dijitSlider dijitSliderH\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" data-dojo-attach-event=\"onkeydown:_onKeyDown, onkeyup:_onKeyUp\"\n\trole=\"presentation\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td data-dojo-attach-point=\"topDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationT dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderDecrementIconH\" style=\"display:none\" data-dojo-attach-point=\"decrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderLeftBumper\" data-dojo-attach-event=\"press:_onClkDecBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><input data-dojo-attach-point=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><div class=\"dijitReset dijitSliderBarContainerH\" role=\"presentation\" data-dojo-attach-point=\"sliderBarContainer\"\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"progressBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderProgressBar dijitSliderProgressBarH\" data-dojo-attach-event=\"press:_onBarClick\"\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableH\"\n\t\t\t\t\t\t><div data-dojo-attach-point=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleH\" data-dojo-attach-event=\"press:_onHandleClick\" role=\"slider\"></div\n\t\t\t\t\t></div\n\t\t\t\t></div\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderRemainingBar dijitSliderRemainingBarH\" data-dojo-attach-event=\"press:_onBarClick\"></div\n\t\t\t></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderRightBumper\" data-dojo-attach-event=\"press:_onClkIncBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderIncrementIconH\" style=\"display:none\" data-dojo-attach-point=\"incrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td data-dojo-attach-point=\"containerNode,bottomDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationB dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n></table>\n",
        "url:dijit/form/templates/VerticalSlider.html": "<table class=\"dijit dijitReset dijitSlider dijitSliderV\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" data-dojo-attach-event=\"onkeydown:_onKeyDown,onkeyup:_onKeyUp\"\n\trole=\"presentation\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\n\t\t\t><div class=\"dijitSliderIncrementIconV\" style=\"display:none\" data-dojo-attach-point=\"decrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderTopBumper\" data-dojo-attach-event=\"press:_onClkIncBumper\"></div></center\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td data-dojo-attach-point=\"leftDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationL dijitSliderDecorationV\"></td\n\t\t><td class=\"dijitReset dijitSliderDecorationC\" style=\"height:100%;\"\n\t\t\t><input data-dojo-attach-point=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><center class=\"dijitReset dijitSliderBarContainerV\" role=\"presentation\" data-dojo-attach-point=\"sliderBarContainer\"\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderRemainingBar dijitSliderRemainingBarV\" data-dojo-attach-event=\"press:_onBarClick\"><!--#5629--></div\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"progressBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderProgressBar dijitSliderProgressBarV\" data-dojo-attach-event=\"press:_onBarClick\"\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableV\" style=\"vertical-align:top;\"\n\t\t\t\t\t\t><div data-dojo-attach-point=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleV\" data-dojo-attach-event=\"press:_onHandleClick\" role=\"slider\"></div\n\t\t\t\t\t></div\n\t\t\t\t></div\n\t\t\t></center\n\t\t></td\n\t\t><td data-dojo-attach-point=\"containerNode,rightDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationR dijitSliderDecorationV\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderBottomBumper\" data-dojo-attach-event=\"press:_onClkDecBumper\"></div></center\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\n\t\t\t><div class=\"dijitSliderDecrementIconV\" style=\"display:none\" data-dojo-attach-point=\"incrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n></table>\n",
        "url:dijit/layout/templates/AccordionButton.html": "<div data-dojo-attach-event='ondijitclick:_onTitleClick' class='dijitAccordionTitle' role=\"presentation\">\n\t<div data-dojo-attach-point='titleNode,focusNode' data-dojo-attach-event='onkeydown:_onTitleKeyDown'\n\t\t\tclass='dijitAccordionTitleFocus' role=\"tab\" aria-expanded=\"false\"\n\t\t><span class='dijitInline dijitAccordionArrow' role=\"presentation\"></span\n\t\t><span class='arrowTextUp' role=\"presentation\">+</span\n\t\t><span class='arrowTextDown' role=\"presentation\">-</span\n\t\t><span role=\"presentation\" class=\"dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t\t<span role=\"presentation\" data-dojo-attach-point='titleTextNode, textDirNode' class='dijitAccordionText'></span>\n\t</div>\n</div>\n",
        "url:dijit/layout/templates/TabContainer.html": "<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n",
        "url:dijit/layout/templates/_TabButton.html": "<div role=\"presentation\" data-dojo-attach-point=\"titleNode,innerDiv,tabContent\" class=\"dijitTabInner dijitTabContent\">\n\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitTabButtonIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t<span data-dojo-attach-point='containerNode,focusNode' class='tabLabel'></span>\n\t<span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t  role=\"presentation\">\n\t\t<span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t\t\t></span>\n</div>\n",
        "url:dijit/layout/templates/ScrollingTabController.html": "<div class=\"dijitTabListContainer-${tabPosition}\" style=\"visibility:hidden\">\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\n\t\t class=\"tabStripButton-${tabPosition}\"\n\t\t id=\"${id}_menuBtn\"\n\t\t data-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\n\t\t data-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t class=\"tabStripButton-${tabPosition}\"\n\t\t id=\"${id}_leftBtn\"\n\t\t data-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\n\t\t data-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t class=\"tabStripButton-${tabPosition}\"\n\t\t id=\"${id}_rightBtn\"\n\t\t data-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\n\t\t data-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\n\t<div class='dijitTabListWrapper' data-dojo-attach-point='tablistWrapper'>\n\t\t<div role='tablist' data-dojo-attach-event='onkeydown:onkeydown'\n\t\t\t data-dojo-attach-point='containerNode' class='nowrapTabStrip'></div>\n\t</div>\n</div>",
        "url:dijit/layout/templates/_ScrollingTabControllerButton.html": "<div data-dojo-attach-event=\"ondijitclick:_onClick\" class=\"dijitTabInnerDiv dijitTabContent dijitButtonContents\"  data-dojo-attach-point=\"focusNode\" role=\"button\">\n\t<span role=\"presentation\" class=\"dijitInline dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n</div>",
        "*now": function(r) { r(["dojo/i18n!*preload*dijit/nls/dijit-all*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]); }
    }
});
define("dijit/dijit-all", ["./main", "./dijit", "./ColorPalette", "./Declaration", "./Dialog", "./DialogUnderlay", "./TooltipDialog", "./Editor", "./_editor/plugins/FontChoice", "./_editor/plugins/LinkDialog", "./Menu", "./MenuItem", "./PopupMenuItem", "./CheckedMenuItem", "./MenuBar", "./MenuBarItem", "./PopupMenuBarItem", "./MenuSeparator", "./ProgressBar", "./TitlePane", "./Toolbar", "./Tooltip", "./Tree", "./InlineEditBox", "./form/Form", "./form/Button", "./form/DropDownButton", "./form/ComboButton", "./form/ToggleButton", "./form/CheckBox", "./form/RadioButton", "./form/TextBox", "./form/ValidationTextBox", "./form/CurrencyTextBox", "./form/DateTextBox", "./form/TimeTextBox", "./form/NumberSpinner", "./form/NumberTextBox", "./form/ComboBox", "./form/FilteringSelect", "./form/MultiSelect", "./form/Select", "./form/HorizontalSlider", "./form/VerticalSlider", "./form/HorizontalRule", "./form/VerticalRule", "./form/HorizontalRuleLabels", "./form/VerticalRuleLabels", "./form/SimpleTextarea", "./form/Textarea", "./layout/AccordionContainer", "./layout/ContentPane", "./layout/BorderContainer", "./layout/LayoutContainer", "./layout/LinkPane", "./layout/SplitContainer", "./layout/StackContainer", "./layout/TabContainer"], function(_afe) { console.warn("dijit-all may include much more code than your application actually requires. We strongly recommend that you investigate a custom build or the web build tool"); return _afe; });