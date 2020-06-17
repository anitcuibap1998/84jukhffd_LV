define([
    "dojo",
    "dojo/_base/declare",
    "dojo/_base/fx",
    "dojo/_base/lang",
    "dojo/dom-style",
    "dojo/mouse",
    "dojo/fx/Toggler",
    "dojo/on",
    "dojo/query",
    "dojo/request",
    "dojo/json",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./demo/containerWidget.html",
    "widget/tiepTanWidget",
    "widget/bacSiWidget",
    "widget/duocSiWidget",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo, declare, baseFx, lang, domStyle, mouse, Toggler, on, query, request, JSON, WidgetBase, TemplatedMixin, template, tiepTanWidget, bacSiWidget, duocSiWidget, Attr, dom, registry, Memory, ComboBox) {
    console.log("vao duoc file containerWidget")
    return declare([WidgetBase, TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor
        idContent: "widgetRoot",


        //====
        userName: null,
        passWord: null,
        login: null,
        //===
        login_: null,
        tiepTan_: null,
        bacSi_: null,
        duocSi_: null,
        // Our template - important!
        templateString: template,

        // A reference to our background animation
        mouseAnim: null,

        baseBackgroundColor: "#ece0e0",
        mouseBackgroundColor: "#5485ba",
        postCreate: function() {
            var domNode = this.domNode;
            this.inherited(arguments);
            this.checkRole();
            domStyle.set(domNode, "backgroundColor", this.baseBackgroundColor);

            this.own(
                on(this.login, "click", lang.hitch(this, "_login")),
            );
        },
        _changeBackground: function(newColor) {
            // If we have an animation, stop it
            if (this.mouseAnim) {
                this.mouseAnim.stop();
            }

            // Set up the new animation
            this.mouseAnim = baseFx.animateProperty({
                node: this.domNode,
                properties: {
                    backgroundColor: newColor
                },
                onEnd: lang.hitch(this, function() {
                    // Clean up our mouseAnim property
                    this.mouseAnim = null;
                })
            }).play();
        },
        _login: function() {
            var that = this;
            console.log("Đăng Nhập");
            let userName = this.userName.value;
            let passWord = this.passWord.value;
            console.log(userName + " -- " + passWord);
            request.post("http://localhost:8088/user/login", {
                data: dojo.toJson({
                    "username": userName,
                    "pass": passWord
                }),
                headers: {
                    "Content-Type": 'application/json; charset=utf-8',
                    "Accept": "application/json",
                    // "token":"123245adasdsa"
                }
            }).then(function(value) {
                console.log("The server returned: ");
                console.log(JSON.parse(value, true));
                value = JSON.parse(value, true);
                console.log(typeof value);

                console.log(value);
                let name = value.last_name + " " + value.first_name;
                if (value.role == 30) {
                    alert("Chào Mừng Tiếp Tân: " + name + " Đã Quay Trở Lại");
                    that.loadTiepTanWidget();
                } else if (value.role == 99) {
                    alert("Chào Mừng Bác Sĩ: " + name + " Đã Quay Trở Lại");
                    that.loadBacSiWidget();
                } else if (value.role == 20) {
                    alert("Chào Mừng Dược Sĩ:" + +name + " Đã Quay Trở Lại");
                    that.loadDuocSiWidget();
                } else if (value == 404) {
                    alert("Bạn Đăng Nhập Sai Mời Bạn Nhập Lại");
                } else if (value.statusCode == 404) {
                    console.log("code: " + value.statusCode);
                    alert("Bạn Đăng Nhập Sai Mời Bạn Nhập Lại");
                } else {
                    alert("Bạn Đăng Nhập Sai");
                }
            });
        },
        _hiddenLogin: function() {
            domStyle.set(this.login_, "display", "none");
            domStyle.set(this.tiepTan_, "display", "none");
            domStyle.set(this.bacSi_, "display", "none");
            domStyle.set(this.duocSi_, "display", "none");
        },
        loadTiepTanWidget: function() {
            this._hiddenLogin();
            domStyle.set(this.tiepTan_, "display", "block");
            console.log("Load Tiếp Tân");

            window.location.href = "../tieptan.html";
        },
        loadBacSiWidget: function() {
            this._hiddenLogin();
            domStyle.set(this.bacSi_, "display", "block");
            console.log("Load Bác Sĩ");

            window.location.href = "../bacsi.html";
        },
        loadDuocSiWidget: function() {
            this._hiddenLogin();
            domStyle.set(this.duocSi_, "display", "block");
            console.log("Load Dược Sĩ");

            window.location.href = "../duocsi.html";
        },
        checkRole: function() {
            
        }
    });
});