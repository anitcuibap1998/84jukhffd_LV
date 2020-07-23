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
    "dojo/text!../demo/templateBacSi/lichSuKhamBenhWidget.html",
    "widget/tiepTanWidget",
    "widget/bacSiWidget",
    "widget/duocSiWidget",
    "widget/rowBNWidgetSelected",
    "widget/controllerCommon/rowTblToaThuocWidget",
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo, declare, baseFx, lang, domStyle, mouse, Toggler, on, query, request, JSON, WidgetBase, TemplatedMixin, template, tiepTanWidget, bacSiWidget, duocSiWidget, rowBNWidget, rowTblToaThuocWidget, arrayUtil, Attr, dom, registry, Memory, ComboBox) {
    console.log("vao duoc file containerWidget")
    return declare([WidgetBase, TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor
        id: "lichSuKhamBenhWidgetId",

        // url sever
        urlServer: "http://localhost:8088",
        //==== input data=====


        full_name: null,
        phone: null,
        address: null,
        sex: null,
        tien_su_benh: null,
        birth_date: null,
        ghi_chu: null,

        ///các node tương tác ui
        txtDataSearch: null,
        tblBenhNhanSelectedNode: null,
        rowBN: null,
        fullNameNode: null,
        mesNode: null,
        rowToaThuocNode: null,
        // Our template - important!
        templateString: template,

        postCreate: function() {
            // this.checkRole();
            // var domNode = this.domNode;
            this.inherited(arguments);
            this.__loadRowTblLichSuKham();
            this.own(
                // on(this.editBenhNhan, "click", lang.hitch(this, "editBN")),
                // on(this.datlichBenhNhan, "click", lang.hitch(this, "datlichBN")),
                // on(this.khambenhBenhNhan, "click", lang.hitch(this, "khambenhBN")),
            );
        },
        loadDSBN: function() {
            var that = this;
            this._resetDSBN();
            this.rowBN.innerHTML = "";
            this.rowBN.hidden = false;
            console.log(this.txtDataSearch.value);
            console.log('vào hàm load danh sách bệnh nhân !!!')
            this.fullNameNode.disabled = true;
            request(this.urlServer + "/benh_nhan/timkiemTuongDoi?keysearch=" + this.txtDataSearch.value, {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function(datas) {
                    that.fullNameNode.disabled = false;
                    // do something with handled data
                    datas = JSON.parse(datas)
                    console.log(datas)
                    if (datas.statusCode == 1000) {
                        console.log("ko thay")
                        that.mesNode.hidden = false;
                        that.tblBenhNhanSelectedNode.hidden = true;
                    }
                    if (datas.statusCode != 1000) {
                        console.log("tim thay")
                        that.mesNode.hidden = true;
                        that.tblBenhNhanSelectedNode.hidden = false;
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
        loadDSToaThuoc: function() {
            console.log("vào hàm load toa thuoc all chưa lazy load ");
        },
        loadDSToaThuocByIdBN: function() {
            console.log("vào hàm load toa thuoc by id benh nhan");
        },
        _resetDSBN: function() {
            dojo.forEach(dijit.findWidgets(this.rowBN), function(w) {
                w.destroyRecursive();
            });
        },
        _resetLichSuKham: function() {
            dojo.forEach(dijit.findWidgets(this.rowBN), function(w) {
                w.destroyRecursive();
            });
        },
        editBN: function() {
            console.log("vào hàm sửa bệnh nhân !!!")
        },
        __loadRowTblLichSuKham: function() {
            var that = this;
            this._resetLichSuKham();
            this.rowToaThuocNode.innerHTML = "";
            this.rowToaThuocNode.hidden = false;
            console.log('vào hàm load danh sách lich su !!!')
            request(this.urlServer + "/toa_thuoc/lichSuKhamAll", {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function(datas) {
                    // do something with handled data
                    datas = JSON.parse(datas)
                    console.log(datas)

                    if (datas.statusCode == 404) {
                        alert("Bạn Bị Từ Chối Truy Cập Vì không Đủ Quyền, Chúng Tôi Sẽ Chuyển Bạn Về Màng Hình Đăng Nhập!!!");
                        window.location.href = "../index.html";
                    } else {
                        console.log("load thành công danh sách bệnh nhân !!!")
                            // Our template - important!
                        var rowToaThuocWidget1 = dom.byId("rowToaThuocWidget");
                        arrayUtil.forEach(datas, function(item) {
                            item.namSinh = that.getFormattedDate(new Date(item.namSinh));
                            item.ngayKeToa = that.getFormattedDate(new Date(item.ngayKeToa));
                            var widget = new rowTblToaThuocWidget(item).placeAt(rowToaThuocWidget1);
                        });
                    }
                },
                function(err) {
                    // handle an error condition
                    alert("không có kết nối tới server !!!")
                    window.location.href = "../index.html";
                });
        },
        getFormattedDate: function(date) {
            let year = date.getFullYear();
            let month = (1 + date.getMonth()).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');

            return day + '-' + month + '-' + year;
        },
    });
});