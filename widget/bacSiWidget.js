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
    "widget/rowLichHenWidget.js",
    "widget/khamBenhWidget",
    "widget/controllerBacSi/lichSuKhamBenhWidget",
    "widget/controllerCommon/xuatDonThuocWidget",
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo, declare, baseFx, lang, domStyle, mouse, Toggler, on, query, request, JSON, WidgetBase, TemplatedMixin, template, dsBNWidget, timkiemBNWidget, rowLichHenWidget, khamBenhWidget, lichSuKhamBenhWidget, xuatDonThuocWidget, arrayUtil, Attr, dom, registry, Memory, ComboBox) {
    console.log("vao duoc file bacSiWidget")
    return declare([WidgetBase, TemplatedMixin], {

        id: "bacSiWidget",
        urlServer: "http://localhost:8088",
        // userName: null,
        // passWord: null,
        // login: null,


        anHienDanhSachMatDinh: null,
        // -----btn------
        btnLogout: null,
        btnSearchNode: null,
        dsBN: null,
        indexLoadNewBenhNhan: null,
        // btn*****
        danhSachLichHenNode: null,
        valueOfDayTimKiemNode: null,
        timKiemDSLichHenTheoNgayNode: null,
        khamBenhNodeBtn: null,
        lichSuKhamBenhNodeBtn: null,
        valueDateSelected: null,
        // Our template - important!
        templateString: template,


        index: 0,
        pageSise: 10,



        postCreate: function() {


            this.checkRole();
            //Mặc Định load danh sách lịch hẹn trong ngày trước
            this.infoAccount();
            this.own(
                on(this.btnLogout, "click", lang.hitch(this, "logout")),
                on(this.btnSearchNode, "click", lang.hitch(this, "searchBN")),
                on(this.danhSachLichHenNode, "click", lang.hitch(this, "_reloadTrang")),
                on(this.dsBN, "click", lang.hitch(this, "loadDSBN")),
                on(this.timKiemDSLichHenTheoNgayNode, "click", lang.hitch(this, "timKiemLichHenTheoNgay")),
                on(this.khamBenhNodeBtn, "click", lang.hitch(this, "khamBenh")),
                on(this.lichSuKhamBenhNodeBtn, "click", lang.hitch(this, "lichSuKhamBenh")),
            );
            this._loadDSLichHenHomNay();

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
                    if (data != 99 || data == 404) {
                        alert("Bạn Không Có Quyền Truy Cập Trang Này");
                        window.location.href = "../index.html";
                    }
                }, function(err) {
                    // handle an error condition
                    alert("không có kết nối tới server !!!");
                });
            } else {
                alert("Bạn Không Có Quyền Truy Cập Trang Này");
                window.location.href = "../index.html";
            }
        },
        logout: function() {
            let selected = confirm("Bạn Có Muốn Thoát!!!");
            if (selected) {
                localStorage.removeItem("tokenAC");
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
                result = JSON.parse(data, true)
                console.log(JSON.parse(data, true))
                    // do something with handled data
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
        loadDSBN: function() {
            let kq = confirm("Bạn Có Muốn Thực Hiện");
            if (kq == true) {
                this._resetDSBN();
                let contentBacSiWidget = dom.byId("contentBacSiWidget");
                console.log("kq: " + kq);
                this.indexLoadNewBenhNhan.innerHTML = "";
                console.log("DSBNTiepTanWidget: ", contentBacSiWidget);
                var widget3 = new dsBNWidget().placeAt(contentBacSiWidget);
            }
        },
        searchBN: function() {
            console.log("vào hàm tìm kiếm bệnh nhân");
            let keysearch = this.inputSearchNode.value;
            console.log("keysearch: ", keysearch.lenght);
            if (keysearch.lenght < 1 || keysearch == "") {
                alert("Không Được Để Trống Từ Khóa Cần Tìm Kiếm");
            } else {
                localStorage.setItem("keysearch", keysearch);
                let kq = confirm("Bạn Có Chắc Thực Hiện Hành Động Này !!!");
                if (kq == true) {
                    this._resetDSBN();
                    this.indexLoadNewBenhNhan.innerHTML = "";
                    console.log("inputSearchNode: ", keysearch);

                    var widget3 = new timkiemBNWidget().placeAt(contentBacSiWidget);
                }
            }
        },
        _resetDSBN: function() {
            dojo.forEach(dijit.findWidgets(this.indexLoadNewBenhNhan), function(w) {
                w.destroyRecursive();
            });
        },
        _reloadTrang: function() {
            location.reload();
        },
        _loadDSLichHenHomNay: function() {
            // this._resetDSBN();
            console.log("Load Lịch Hẹn Của Ngày Hôm Nay");
            let current_datetime = new Date()
            let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear();
            let formatted_date1 = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
            this.valueDateSelected.innerHTML = "";
            this.valueDateSelected.innerHTML = formatted_date
            console.log(formatted_date);
            var that = this;
            request(this.urlServer + "/lich_hen/getAllByDay/?inputdate=" + formatted_date1, {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function(datas) {
                datas = JSON.parse(datas, true);
                console.log(datas)
                if (datas.statusCode == 1000) {
                    alert("Không Có Lịch Hẹn Trong Ngày Hiện Tại !!!")
                }
                console.log("load thành công danh sách Lịch Hẹn !!!");
                var rowLichHenWidget1 = dom.byId("rowLichHenWidget");
                arrayUtil.forEach(datas, function(item) {
                    var widget = new rowLichHenWidget(item).placeAt(rowLichHenWidget1);
                });

            }, function(err) {
                alert("không có kết nối tới server !!!");
            });
        },
        _resetMenuLichHen: function() {
            dojo.forEach(dijit.findWidgets(this.indexLoadNewBenhNhan), function(w) {
                w.destroyRecursive();
            });
        },
        loadLichHenTheoNgayTimKiem: function(date) {
            console.log("Load Lịch Hẹn Theo Ngày Tìm Kiếm");
            this._resetWidgetLichHen();
            let current_datetime = new Date(date);
            let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
            this.valueDateSelected.innerHTML = "";
            this.valueDateSelected.innerHTML = formatted_date
            console.log(formatted_date);
            //thực thi gọi hàm get danh sách lịch hẹn theo ngày hiện tại và render ra màn hình lịch hẹn
            var that = this;
            request(this.urlServer + "/lich_hen/getAllByDay/?inputdate=" + formatted_date, {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function(datas) {
                datas = JSON.parse(datas, true);
                console.log(datas)
                if (datas.statusCode == 1000) {
                    alert("Không Có Lịch Hẹn Trong Ngày Này !!!")
                }
                console.log("load thành công danh sách Lịch Hẹn !!!");
                var rowLichHenWidget1 = dom.byId("rowLichHenWidget");
                arrayUtil.forEach(datas, function(item) {
                    var widget = new rowLichHenWidget(item).placeAt(rowLichHenWidget1);
                });

            }, function(err) {
                alert("không có kết nối tới server !!!");
            });
        },
        timKiemLichHenTheoNgay: function() {
            console.log("vào hàm tìm kiếm lịch hẹn theo ngày!!!");
            //lấy value của ô input ngày tìm kiếm vào 
            let ngaytimkiem = this.valueOfDayTimKiemNode.value;
            if (ngaytimkiem == null) {
                alert("Không Được Bỏ Trống Ngày !!!")
            } else {
                this.loadLichHenTheoNgayTimKiem(ngaytimkiem);
            }
        },
        _resetWidgetLichHen: function() {
            dojo.forEach(dijit.findWidgets(this.rowLichHen), function(w) {
                w.destroyRecursive();
            });
        },
        khamBenh: function() {
            localStorage.setItem("trangthai", 0);

            console.log("vào khám bệnh nha");
            let kq = confirm("Bạn Có Muốn Thực Hiện");
            if (kq == true) {
                this._resetDSBN();
                let contentBacSiWidget = dom.byId("contentBacSiWidget");
                console.log("kq: " + kq);
                this.indexLoadNewBenhNhan.innerHTML = "";
                console.log("khamBenhWidget: " + contentBacSiWidget);
                var widget3 = new khamBenhWidget().placeAt(contentBacSiWidget);
            }
        },
        lichSuKhamBenh: function() {
            localStorage.setItem("trangthai", 1);
            alert("vào lịch sử khám bệnh nha");
            this._resetDSBN();
            this.indexLoadNewBenhNhan.innerHTML = "";
            console.log("khamBenhWidget: " + contentBacSiWidget);
            var widget3 = new lichSuKhamBenhWidget().placeAt(contentBacSiWidget);
        },
        //render don thuoc sau khi tao toa thuoc thanh cong
        ___renderDonThuoc: function(idToaThuoc) {

            console.log("go to function renderDonThuoc");

            request(this.urlServer + "/toa_thuoc/detailDonThuoc?idToaThuoc=" + idToaThuoc, {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function(datas) {
                    // do something with handled data
                    datas = JSON.parse(datas, true);
                    console.log("chi tiet cua mot toa thuoc: ", datas);
                    var xuatDonThuocWidget1 = dom.byId("contentBacSiWidget");
                    console.log(datas.infoBenhNhan.sex);
                    if (datas.infoBenhNhan.sex == 1) {
                        datas.infoBenhNhan.sex = "Nam";
                    } else if (datas.infoBenhNhan.sex == 0) {
                        datas.infoBenhNhan.sex = "Nữ";
                    } else {
                        datas.infoBenhNhan.sex = "Khác";
                    }
                    var widget = new xuatDonThuocWidget(datas).placeAt(xuatDonThuocWidget1);
                },
                function(err) {
                    // handle an error condition
                    alert("không có kết nối tới server !!!");
                });
        },
    });
});