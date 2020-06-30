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
    "dojo/text!./demo/bacSiWidget.html",
    "widget/dsBNWidget.js",
    "widget/timkiemBNWidget.js",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function (dojo, declare, baseFx, lang, domStyle, mouse, Toggler, on, query, request, JSON, WidgetBase, TemplatedMixin, template, dsBNWidget, timkiemBNWidget, Attr, dom, registry, Memory, ComboBox) {
    console.log("vao duoc file bacSiWidget")
    return declare([WidgetBase, TemplatedMixin], {

        id: "bacSiWidget",
        urlServer: "http://localhost:8088",
        // userName: null,
        // passWord: null,
        // login: null,
        


        // -----btn------
        btnLogout:null,
        btnSearchNode:null,
        dsBN:null,
        indexLoadNewBenhNhan: null,
        // Our template - important!
        templateString: template,





        postCreate: function () {
            this.checkRole();

            this.infoAccount();
            this.own(
                on(this.btnLogout, "click", lang.hitch(this, "logout")),
                on(this.btnSearchNode, "click", lang.hitch(this, "searchBN")),
                on(this.dsBN, "click", lang.hitch(this, "loadDSBN")),
                // on(this.btnLogout, "click", lang.hitch(this, "logout")),
            );
        },
        checkRole: function () {
            if (localStorage.getItem("tokenAC") != null) {
                //gọi hàm check role
                request(this.urlServer + "/user/checkRole", {
                    headers: {
                        "tokenAC": localStorage.getItem("tokenAC")
                    }
                }).then(function (data) {
                    // do something with handled data
                    if (data != 99 || data == 404) {
                        alert("Bạn Không Có Quyền Truy Cập Trang Này");
                        window.location.href = "../index.html";
                    }
                }, function (err) {
                    // handle an error condition
                    alert("không có kết nối tới server !!!");
                });
            } else {
                alert("Bạn Không Có Quyền Truy Cập Trang Này");
                window.location.href = "../index.html";
            }
        },
        logout: function () {
            let selected = confirm("Bạn Có Muốn Thoát!!!");
            if (selected) {
                localStorage.removeItem("tokenAC");
                window.location.href = "../index.html";
            }
        },
        infoAccount: function () {
            var that = this;
            request(this.urlServer + "/user/getOne", {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function (data) {
                result = JSON.parse(data, true)
                console.log(JSON.parse(data, true))
                // do something with handled data
                that.nameUserNode.innerHTML = result.first_name + " " + result.last_name;
                that.mailUserNode.innerHTML = result.email;
                that.phoneUserNode.innerHTML = "0" + result.phone;

            }, function (err) {
                // handle an error condition
                alert("không có kết nối tới server !!!");
            });
            request.get(this.urlServer + "/benh_nhan/getOneBNLasted", {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function (data) {
                result = JSON.parse(data, true)
                console.log(JSON.parse(data, true))
                // do something with handled data

                that.maBNNode.innerHTML = result.id;

            }, function (err) {
                // handle an error condition
                alert("không có kết nối tới server !!!");
            });

        },
        loadDSBN: function () {
            let kq = confirm("Bạn Có Muốn Thực Hiện");
            if (kq == true) {
                this._resetDSBN();
                let contentTiepTanWidget = dom.byId("contentTiepTanWidget");
                console.log("kq: " + kq);
                this.indexLoadNewBenhNhan.innerHTML = "";
                console.log("DSBNTiepTanWidget: " + contentTiepTanWidget);
                var widget3 = new dsBNWidget().placeAt(contentTiepTanWidget);
            }
        },
        searchBN: function () {
            console.log("vào hàm tìm kiếm bệnh nhân");
            let keysearch = this.inputSearchNode.value;
            console.log("keysearch: " + keysearch.lenght);
            if (keysearch.lenght < 1 || keysearch == "") {
                alert("Không Được Để Trống Từ Khóa Cần Tìm Kiếm");
            }
            else {
                localStorage.setItem("keysearch",keysearch);
                let kq = confirm("Bạn Có Chắc Thực Hiện Hành Động Này !!!");
                if (kq == true) {
                    this._resetDSBN();
                    this.indexLoadNewBenhNhan.innerHTML = "";
                    console.log("inputSearchNode: " + keysearch);
                   
                    var widget3 = new timkiemBNWidget().placeAt(contentTiepTanWidget);
                }
            }
        },
        _resetDSBN: function(){
            dojo.forEach(dijit.findWidgets(this.indexLoadNewBenhNhan), function(w) {
            w.destroyRecursive();
            });
        },
    });
});