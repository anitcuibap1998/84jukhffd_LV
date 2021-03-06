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
    "dojo/text!./demo/tiepTanWidget.html",
    "widget/newBenhNhanWidget.js",
    "widget/danhSachLichHenWidget.js",
    "widget/dsBNWidget.js",
    "widget/timkiemBNWidget.js",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo, declare, baseFx, lang, domStyle, mouse, Toggler, on, query, request, JSON, WidgetBase, TemplatedMixin, template, newBenhNhanWidget, danhSachLichHenWidget, dsBNWidget, timkiemBNWidget, Attr, dom, registry, Memory, ComboBox) {
    console.log("vao duoc file tiepTanWidget")
    return declare([WidgetBase, TemplatedMixin], {
        id: "tiepTanWidget",

        urlServer: "http://localhost:8088",


        templateString: template,

        idUserNode: null,
        nameUserNode: null,
        mailUserNode: null,
        phoneUserNode: null,
        maBNNode: null,

        newBenhNhan: null,
        danhSachLichHen: null,
        dsBN: null,
        btnLogout: null,
        btnSearchNode: null,
        inputSearchNode: null,
        role: null,
        indexLoadNewBenhNhan: null,

        regSpecialCharactersed: /\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\<|\>|\?|\:|\"|\;|\,|\.|\/|\\|\{|\}|\*|\-|\+|\[|\]|\`|\~|\'/g,
        flagCallAdduser: true,
        //test
        nameUser: null,
        postCreate: function() {
            this.checkRole();
            this.infoAccount();
            this.inherited(arguments);
            this.own(
                on(this.newBenhNhan, "click", lang.hitch(this, "loadNewBenhNhan")),
                on(this.danhSachLichHen, "click", lang.hitch(this, "loadDanhSachLichHen")),
                on(this.dsBN, "click", lang.hitch(this, "loadDSBN")),
                on(this.btnLogout, "click", lang.hitch(this, "logout")),
                on(this.btnSearchNode, "click", lang.hitch(this, "searchBN")),
            );
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
                    if (data < 30 || data == 404) {
                        alert("Bạn Không Có Quyền Truy Cập Trang Này, Bạn Hãy Đăng Nhập Lại!!!");
                        window.location.href = "../index.html";
                    }
                }, function(err) {
                    // handle an error condition
                    alert("không có kết nối tới server !!!");
                });
            } else {
                alert("Bạn Không Có Quyền Truy Cập Trang Này, Bạn Hãy Đăng Nhập Lại !!!");
                window.location.href = "../index.html";
            }
        },
        infoAccount: function() {
            var that = this;
            request(this.urlServer + "/user/getOne", {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function(data) {
                result = JSON.parse(data, true);
                console.log(JSON.parse(data, true));
                // do something with handled data
                that.role = result.role;
                that.idUserNode.innerHTML = result.id;
                that.nameUserNode.innerHTML = result.first_name + " " + result.last_name;
                that.mailUserNode.innerHTML = result.email;
                that.phoneUserNode.innerHTML = "0" + result.phone;

            }, function(err) {
                // handle an error condition
                alert("không có kết nối tới server !!!");
            });
            request.get(this.urlServer + "/benh_nhan/getOneBNLasted", {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function(data) {
                result = JSON.parse(data, true)
                console.log(JSON.parse(data, true))
                    // do something with handled data

                that.maBNNode.innerHTML = result.id;

            }, function(err) {
                // handle an error condition
                alert("không có kết nối tới server !!!");
            });

        },
        loadNewBenhNhan: function() {
            this._resetMenuLichHen();
            let kq = confirm("Bạn Có Muốn Thực Hiện");
            if (kq == true) {
                console.log("Vào hàm load new bệnh nhân");
                let contentTiepTanWidget = dom.byId("contentTiepTanWidget");
                console.log("kq: " + kq);
                this.indexLoadNewBenhNhan.innerHTML = "";
                console.log("newBenhNhanID: " + contentTiepTanWidget);
                var widget = new newBenhNhanWidget().placeAt(contentTiepTanWidget);
            }

        },
        loadEditBenhNhan: function(data) {
            this._resetMenuLichHen();
            let kq = confirm("Bạn Có Muốn Thực Hiện");
            if (kq == true) {
                console.log("Vào hàm load new bệnh nhân");
                let contentTiepTanWidget = dom.byId("contentTiepTanWidget");
                console.log("kq: " + kq);
                this.indexLoadNewBenhNhan.innerHTML = "";
                console.log("newBenhNhanID: " + contentTiepTanWidget);
                var widget = new newBenhNhanWidget(data).placeAt(contentTiepTanWidget);
            }
        },
        loadDanhSachLichHen: function() {

            let kq = confirm("Bạn Có Muốn Thực Hiện");
            if (kq == true) {
                this._resetMenuLichHen();
                console.log("Vào hàm load danh sách lịch hẹn !!!");
                let contentTiepTanWidget = dom.byId("contentTiepTanWidget");
                console.log("kq: " + kq);
                this.indexLoadNewBenhNhan.innerHTML = "";
                console.log("loadDanhSachLichHen: " + contentTiepTanWidget);
                var widget1 = new danhSachLichHenWidget().placeAt(contentTiepTanWidget);
            }
        },

        loadDSBN: function() {
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
        logout: function() {
            let selected = confirm("Bạn Có Muốn Thoát!!!");
            if (selected) {
                localStorage.removeItem("tokenAC");
                window.location.href = "../index.html";
            }
        },
        searchBN: function() {
            var that = this;
            console.log("vào hàm tìm kiếm bệnh nhân");
            let keysearch = this.inputSearchNode.value;

            console.log(keysearch);

            let _kq_ = true;
            if (_kq_ == true) {
                _kq = this.validateFormBenhNhanNotNull(keysearch);
            }
            if (this.flagCallAdduser == true) {
                this.btnSearchNode.disabled = true;
                this.btnSearchNode.innerHTML = "";
                this.btnSearchNode.innerHTML = "Loading...";
                localStorage.setItem("keysearch", keysearch);
                let kq = confirm("Bạn Có Chắc Thực Hiện Hành Động Này !!!");
                if (kq == true) {
                    this._resetDSBN();
                    this.indexLoadNewBenhNhan.innerHTML = "";
                    console.log(keysearch);
                    let widget3 = new timkiemBNWidget().placeAt(contentTiepTanWidget);
                }
            }
        },
        _resetDSBN: function() {
            dojo.forEach(dijit.findWidgets(this.indexLoadNewBenhNhan), function(w) {
                w.destroyRecursive();
            });
        },
        _resetMenuLichHen: function() {
            dojo.forEach(dijit.findWidgets(this.indexLoadNewBenhNhan), function(w) {
                w.destroyRecursive();
            });
        },
        validateFormBenhNhanNotNull: function(input) {
            if (input == "") {
                alert("Chuỗi Không Được Để Trống");
                this.flagCallAdduser = false;
                return false;
            }
            if (this.regSpecialCharactersed.test(input)) {
                alert("Chuỗi Không Được Chứ Ký Tự Đặc Biệt");
                this.flagCallAdduser = false;
                return false;
            }
            this.flagCallAdduser = true;
            return true;
        },
    });
});