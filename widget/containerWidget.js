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
        urlServer: "http://localhost:8088",

        //====
        userName: null,
        passWord: null,
        login: null,
        //===
        login_: null,
        tiepTan_: null,
        bacSi_: null,
        duocSi_: null,


        regSpecialCharactersed: /\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\<|\>|\?|\:|\"|\;|\,|\.|\/|\\|\{|\}|\*|\-|\+|\[|\]|\`|\~|\'/g,
        flagCallAdduser: true,
        // Our template - important!
        templateString: template,

        // A reference to our background animation
        postCreate: function() {
            this.checkRole();

            this.own(
                on(this.login, "click", lang.hitch(this, "_login")),
            );
        },
        _login: function() {

            var that = this;
            console.log("Đăng Nhập");
            let userName = this.userName.value;
            let passWord = this.passWord.value;
            console.log(userName + " -- " + passWord);
            let kq = true;
            if (kq == true) {
                kq = that.validateUserName(userName);
            }
            if (kq == true) {
                kq = that.validatePass(passWord);
            }
            if (this.flagCallAdduser == true) {
                request.post(this.urlServer + "/user/login", {
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

                    console.log(value.token);
                    let name = value.last_name + " " + value.first_name;
                    if (value.role == 30) {
                        alert("Chào Mừng Tiếp Tân: " + name + " Đã Quay Trở Lại");
                        localStorage.setItem("tokenAC", value.token);
                        that.loadTiepTanWidget();
                    } else if (value.role == 99) {
                        alert("Chào Mừng Bác Sĩ: " + name + " Đã Quay Trở Lại");
                        localStorage.setItem("tokenAC", value.token);
                        that.loadBacSiWidget();
                    } else if (value.role == 20) {
                        alert("Chào Mừng Dược Sĩ:" + +name + " Đã Quay Trở Lại");
                        localStorage.setItem("tokenAC", value.token);
                        that.loadDuocSiWidget();
                    } else if (value == 404) {
                        alert("Bạn Đăng Nhập Sai Mời Bạn Nhập Lại");
                    } else if (value.statusCode == 404) {
                        console.log("code: " + value.statusCode);
                        alert("Bạn Đăng Nhập Sai Mời Bạn Nhập Lại");
                    } else {
                        alert("Bạn Đăng Nhập Sai");
                    }
                }, function(err) {
                    alert("Không kết nối được tới server");
                });
            }
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
            if (localStorage.getItem("tokenAC") != null) {
                //gọi hàm check role
                request(this.urlServer + "/user/checkRole", {
                    headers: {
                        "tokenAC": localStorage.getItem("tokenAC")
                    }
                }).then(function(data) {
                    // do something with handled data
                    if (data == 99) {
                        alert("Bạn Đã Đăng Nhập !!!");
                        window.location.href = "../bacsi.html";
                    } else if (data == 30) {
                        alert("Bạn Đã Đăng Nhập !!!");
                        window.location.href = "../tieptan.html";
                    } else if (data == 20) {
                        alert("Bạn Đã Đăng Nhập !!!");
                        window.location.href = "../duocsi.html";
                    } else if (data == 404) {
                        localStorage.removeItem("tokenAC");
                    }
                }, function(err) {
                    // handle an error condition
                    alert("không có kết nối tới server !!!")
                });
            }
        },
        validateUserName: function(input) {
            console.log("validate username");
            console.log(input);
            console.log(input.length);
            if (input == "") {
                alert("User Name Không Được Để Trống");
                this.lagCallAdduser = false;
                return false;
            }
            if (this.regSpecialCharactersed.test(input)) {
                alert("User Name Không Được Chứ Ký Tự Đặc Biệt");
                this.flagCallAdduser = false;
                return false;
            }
            // if (input.length < 8 || input.length > 32) {
            //     alert("User Name Độ Dài Chỉ Từ 8 Đến 32 Ký Tự");
            //     this.flagCallAdduser = false;
            //     return false;
            // }
            this.flagCallAdduser = true;
            return true;
        },
        validatePass: function(input) {
            console.log("validate pass");
            if (input == "") {
                alert("Pass Không Được Để Trống");
                this.lagCallAdduser = false;
                return false;
            }
            if (this.regSpecialCharactersed.test(input)) {
                alert("Pass Không Được Chứ Ký Tự Đặc Biệt");
                this.flagCallAdduser = false;
                return false;
            }
            // if (input.length < 8 || input.length > 32) {
            //     alert("Pass Độ Dài Chỉ Từ 8 Đến 32 Ký Tự");
            //     this.flagCallAdduser = false;
            //     return false;
            // }
            this.flagCallAdduser = true;
            return true;
        },
    });
});