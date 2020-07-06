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
    "dojo/text!./demo/danhSachLichHenWidget.html",
    "widget/tiepTanWidget",
    "widget/bacSiWidget",
    "widget/duocSiWidget",
    "widget/rowBNWidgetSelected",
    "widget/rowLichHenWidget",
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom",
    "dojo/dom-class",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/FilteringSelect",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo, declare, baseFx, lang, domStyle, mouse, Toggler, on, query, request, JSON, WidgetBase, TemplatedMixin, template, tiepTanWidget, bacSiWidget, duocSiWidget, rowBNWidget, rowLichHenWidget, arrayUtil, Attr, dom, domClass, registry, Memory, FilteringSelect) {
    console.log("vao duoc file containerWidget")
    return declare([WidgetBase, TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor
        id: "danhSachLichHenWidgetId",

        //==== url =====
        urlServer: "http://localhost:8088",
        //------btn------
        btnDatLich: null,
        dateLichHenNode: null,
        timeStartNode: null,
        ghiChuNode: null,
        loaiKhamBenhNode: null,
        txtDataSearch: null,
        rowBN: null,
        rowLichHen: null,
        mesNode: null,
        fullNameNode: null,

        valueOfDayTimKiemNode: null,
        timKiemDSLichHenTheoNgayNode: null,
        // Our template - important!
        valueDateSelected: null,
        ngayDuocChon: null,

        templateString: template,

        postCreate: function() {
            let current_datetime = new Date()
            let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
            this.valueDateSelected.innerHTML = formatted_date
            var domNode = this.domNode;
            // this.checkRole();
            this.mesNode.hidden = true;
            this.inherited(arguments);
            // init widget
            this._resetWidgetLichHen();
            this.loadLichHenToDay();
            this.loadLoaiKhamBenh();
            this.own(
                on(this.btnDatLich, "click", lang.hitch(this, "datLich")),
                on(this.loaiKhamBenhNode, "change", lang.hitch(this, "loadDSBN")),
                on(this.timKiemDSLichHenTheoNgayNode, "click", lang.hitch(this, "timKiemLichHenTheoNgay")),
            );
        },
        datLich: function() {
            var that = this;
            name = this.fullNameNode.value;
            let dateSelected = this.dateLichHenNode.value;
            console.log("vào hàm đặt lịch");
            console.log("timeStart: " + this.dateLichHenNode.value);
            console.log("timeStartNode: " + this.timeStartNode.value);
            console.log("ghiChuNode: " + this.ghiChuNode.value);
            console.log("id loại khám: ", +dijit.byId('stateSelect').get('value'));
            console.log("id bệnh nhân: ", +dom.byId('searchtest').value);
            console.log("full name: " + name);
            // xử lý ngày đặt lịch
            request.post(this.urlServer + "/lich_hen/addOne", {
                data: dojo.toJson({
                    time: this.timeStartNode.value + ":00",
                    id_benh_nhan: dom.byId('searchtest').value,
                    id_loai_kham: dijit.byId('stateSelect').get('value'),
                    status: "Blocked",
                    ghi_chu: this.ghiChuNode.value,
                    date: this.dateLichHenNode.value,
                    last_name: name
                }),
                headers: {
                    "Content-Type": 'application/json; charset=utf-8',
                    "Accept": "application/json",
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function(value) {
                console.log("The server returned: ");
                console.log(JSON.parse(value, true));
                value = JSON.parse(value, true);
                console.log(typeof value);
                console.log(value.token);
                // let name = value.last_name + " " + value.first_name;
                if (value.statusCode != 404) {
                    console.log("Reset Đặt Lịch");
                    that.dateLichHenNode.value = "";
                    that.timeStartNode.value = "";
                    that.ghiChuNode.value = "";
                    dom.byId('searchtest').value = "";
                    that.fullNameNode.value = "";
                    that.loadLichHenTheoNgayTimKiem(dateSelected);
                    alert("Bạn Vừa Thêm Lịch Hẹn Thành Công !!!");
                } else {
                    alert("Bạn Không Đủ Quyền Để Thêm Lịch Hẹn");
                }
            }, function(err) {
                alert("Lỗi Kết Nối Mạng");
            });
        },
        loadLoaiKhamBenh: function() {
            request(this.urlServer + "/loai_kham/getAll", {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function(datas) {
                    // do something with handled data
                    datas = JSON.parse(datas, true)
                    var stateStore = new Memory({
                        data: datas
                    });
                    console.log(stateStore);
                    let filteringSelect = new FilteringSelect({
                        id: "stateSelect",
                        ten_hinh_thuc: "",
                        value: datas[0].id,
                        store: stateStore,
                        searchAttr: "ten_hinh_thuc",
                        class: "form-control",
                    }, "stateSelect").startup();
                },
                function(err) {
                    // handle an error condition
                    alert("không có kết nối tới server !!!");
                });
        },
        loadDSBN: function() {
            this._resetDSBN();
            this.rowBN.innerHTML = "";
            this.rowBN.hidden = false;
            console.log(this.txtDataSearch.value);
            console.log('vào hàm load danh sách bệnh nhân !!!')
            request(this.urlServer + "/benh_nhan/timkiemTuongDoi?keysearch=" + this.txtDataSearch.value, {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function(datas) {
                    // do something with handled data
                    datas = JSON.parse(datas)
                    console.log(datas)
                    if (datas.statusCode == 1000) {
                        console.log("ko thay")
                        this.mesNode.hidden = false;
                    }
                    if (datas.statusCode != 1000) {
                        console.log("tim thay")
                        this.mesNode.hidden = true;
                    }
                    if (datas.statusCode == 404) {
                        alert("Bạn Bị Từ Chối Truy Cập Vì không Đủ Quyền, Chúng Tôi Sẽ Chuyển Bạn Về Màng Hình Đăng Nhập!!!");
                        window.location.href = "../index.html";
                    } else {
                        console.log("load thành công danh sách bệnh nhân !!!")
                            // Our template - important!
                        var rowBNWidget1 = dom.byId("rowBNWidget");
                        arrayUtil.forEach(datas, function(item) {
                            item.birth_date = item.birth_date.split("T", 1);
                            if (item.sex == 1) {
                                item.sex = "Nam";
                            } else if (item.sex == 0) {
                                item.sex = "Nữ";
                            } else {
                                item.sex = "Không Xác Định";
                            }
                            var widget = new rowBNWidget(item).placeAt(rowBNWidget1);
                        });
                    }
                },
                function(err) {
                    // handle an error condition
                    alert("không có kết nối tới server !!!")
                    window.location.href = "../index.html";
                });
        },
        _resetDSBN: function() {
            dojo.forEach(dijit.findWidgets(this.rowBN), function(w) {
                w.destroyRecursive();
            });
        },
        _resetWidgetLichHen: function() {
            dojo.forEach(dijit.findWidgets(this.rowLichHen), function(w) {
                w.destroyRecursive();
            });
        },

        loadLichHenToDay: function() {
            console.log("Load Lịch Hẹn Của Ngày Hôm Nay");
            let current_datetime = new Date()
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
    });
});