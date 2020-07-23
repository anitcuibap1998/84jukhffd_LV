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
    "dojo/text!./demo/khamBenhWidget.html",
    "widget/tiepTanWidget",
    "widget/bacSiWidget",
    "widget/rowBNWidgetSelected",
    "widget/controllerBacSi/thuocWidget",
    "widget/controllerBacSi/rowTblToaThuocWidget",
    "widget/controllerCommon/xuatDonThuocWidget",
    "dijit/form/FilteringSelect",
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo, declare, baseFx, lang, domStyle, mouse, Toggler, on, query, request, JSON, WidgetBase, TemplatedMixin, template, tiepTanWidget, bacSiWidget, rowBNWidget, thuocWidget, rowTblToaThuocWidget, xuatDonThuocWidget, FilteringSelect, arrayUtil, Attr, dom, registry, Memory, ComboBox) {
    console.log("vao duoc file containerWidget")
    return declare([WidgetBase, TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor
        id: "khamBenhWidgetId",
        urlServer: "http://localhost:8088",
        //==== input data=====
        //data import Array
        arrayToaThuoc: [],
        ///các node tương tác ui
        editBenhNhan: null,
        datlichBenhNhan: null,
        khambenhBenhNhan: null,
        // Our template - important!
        txtDataSearch: null,
        txtSearchThuocNode: null,
        fullNameNode: null,
        rowBN: null,
        dsThuocTimKiemNode: null,
        mesthuocNode: null,
        fullNameThuocNode: null,
        headTblTimKiemThuocNode: null,
        tblBenhNhanSelectedNode: null,
        ketQuaKhamNode: null,
        danDoNode: null,
        createToaThuocNode: null,

        templateString: template,


        postCreate: function() {
            // import ClassToaThuoc from "././listToaThuocModel"
            // this.checkRole();
            // var domNode = this.domNode;
            // this.inherited(arguments);
            this.arrayToaThuoc.splice(0, this.arrayToaThuoc.length);
            this.loadLoaiKhamBenh();

            this.own(
                on(this.createToaThuocNode, "click", lang.hitch(this, "createToaThuocBN")),

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
        loadDSThuoc: function() {
            var that = this;
            this._resetDSThuoc();
            this.dsThuocTimKiemNode.innerHTML = "";
            this.dsThuocTimKiemNode.hidden = false;
            console.log(this.txtSearchThuocNode.value);
            console.log('vào hàm load danh sách bệnh nhân !!!')
            this.fullNameThuocNode.disabled = true;
            request(this.urlServer + "/thuoc/getListByName?name=" + this.txtSearchThuocNode.value, {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function(datas) {
                    that.fullNameThuocNode.disabled = false;
                    // do something with handled data
                    datas = JSON.parse(datas)
                    console.log(datas)
                    if (datas.statusCode == 1000) {
                        console.log("ko thay")
                        that.mesthuocNode.hidden = false;
                        that.headTblTimKiemThuocNode.hidden = true;
                    }
                    if (datas.statusCode != 1000) {
                        console.log("tim thay")
                        that.mesthuocNode.hidden = true;
                        that.headTblTimKiemThuocNode.hidden = false;
                    }
                    if (datas.statusCode == 404) {
                        alert("Bạn Bị Từ Chối Truy Cập Vì không Đủ Quyền, Chúng Tôi Sẽ Chuyển Bạn Về Màng Hình Đăng Nhập!!!");
                        window.location.href = "../index.html";
                    } else {
                        console.log("load thành công danh sách bệnh nhân !!!")
                            // Our template - important!
                        var dsThuocTimKiem1 = dom.byId("dsThuocTimKiem");
                        arrayUtil.forEach(datas, function(item) {
                            var widget = new thuocWidget(item).placeAt(dsThuocTimKiem1);
                        });
                    }
                },
                function(err) {
                    // handle an error condition
                    alert("không có kết nối tới server !!!")
                    window.location.href = "../index.html";
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
                        id: "loaiKhamId",
                        ten_hinh_thuc: "",
                        value: datas[0].id,
                        store: stateStore,
                        searchAttr: "ten_hinh_thuc",
                        class: "form-control",
                    }, "loaiKhamId").startup();
                },
                function(err) {
                    // handle an error condition
                    alert("không có kết nối tới server !!!");
                });
        },


        renderTblToaThuoc: function(arrThuoc) {
            console.log("vào hàm render ra tblToaThuoc");
            this._resetTblToaThuoc
            console.log("arrThuoc: ", arrThuoc);
            var tblToaThuocId = dom.byId("tblToaThuocId");
            tblToaThuocId.innerHTML = "";
            arrayUtil.forEach(arrThuoc, function(item) {
                var widget = new rowTblToaThuocWidget(item).placeAt(tblToaThuocId);
            });

        },

        createToaThuocBN: function() {
            var that = this;
            console.log("Vào hàm tạo toa thuốc");
            let idLoaiKham = dijit.byId('loaiKhamId').get('value');
            let idBN = this.txtDataSearch.value;
            let ketQuaKham = this.ketQuaKhamNode.value;
            let danDoNode = this.danDoNode.value;
            let result = this.__validateInputToaThuoc(idLoaiKham, idBN, this.arrayToaThuoc, ketQuaKham, danDoNode);
            console.log("result: ", result)
            this.createToaThuocNode.disabled = true;
            if (result) {
                request.post(this.urlServer + "/toa_thuoc/addOne", {
                    data: dojo.toJson({
                        "id_benh_nhan": idBN,
                        "chuan_doan": ketQuaKham,
                        "dan_do": danDoNode,
                        "id_gia_kham": idLoaiKham
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

                    if (value.statusCode != 404) {
                        that.__taoChiTietToaThuoc(value.id);
                    } else {
                        alert("Bạn Không Đủ Quyền Để Thêm Bệnh Nhân");
                    }
                }, function(err) {
                    alert("Không kết nối được tới server");
                });
            }
        },
        __xuLyArray: function(idToaThuoc) {
            this.arrayToaThuoc.forEach((item) => {
                item.id_toa_thuoc = idToaThuoc;
            })
        },
        __taoChiTietToaThuoc: function(idToaThuoc) {
            this.__xuLyArray(idToaThuoc);
            var that = this;
            console.log("Vào hàm tạo chi tiết toa thuốc");
            request.post(this.urlServer + "/chi_tiet_toa_thuoc/addOne", {
                data: dojo.toJson(this.arrayToaThuoc),
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

                if (value.statusCode != 404) {
                    console.log("id toa thuoc: ", idToaThuoc);
                    alert("Bạn Tạo Toa Thuốc Thành Công Mã Toa: " + idToaThuoc);
                    that.createToaThuocBN.disabled = false;
                    console.log("array: ", that.arrayToaThuoc);
                    that.arrayToaThuoc.splice(0, that.arrayToaThuoc.length);
                    console.log("array sau khi xóa rỗng: ", that.arrayToaThuoc);
                    that.___renderDonThuoc(idToaThuoc);
                } else {
                    alert("Bạn Không Đủ Quyền Để Thêm Bệnh Nhân");
                }
            }, function(err) {
                alert("Không kết nối được tới server");
            });
            // registry.byId("bacSiWidget").khamBenh();
        },

        __validateInputToaThuoc: function(idLoaiKham, idBenhNhan, arrayToaThuoc, ketQuaKham, danDoNode) {
            console.log("a:", idLoaiKham, "b:", idBenhNhan, "c:", arrayToaThuoc, "d:", ketQuaKham);
            if (idLoaiKham < 0 || idLoaiKham == undefined || idLoaiKham == null) {
                alert("Chưa Chọn Hình Thức Khám, Mời Bạn Chọn Lại !!!");
                return false;
            }
            if (idBenhNhan == undefined || idBenhNhan < 0 || idBenhNhan == null) {
                alert("Chưa Chọn Bệnh Nhân, Mời Bạn Chọn Lại !!!");
                return false;
            }
            if (arrayToaThuoc.lenght < 1 || arrayToaThuoc == undefined || arrayToaThuoc == null) {
                alert("Chưa Chọn Thuốc, Mời Bạn Chọn Lại !!!");
                return false;
            }
            if (ketQuaKham == "" || ketQuaKham == undefined || ketQuaKham == null) {
                alert("Chưa điền kết quả khám bệnh, Mời Bác Sĩ Điền Vào !!!");
                return false;
            }
            return true;
        },
        _resetDSBN: function() {
            dojo.forEach(dijit.findWidgets(this.rowBN), function(w) {
                w.destroyRecursive();
            });
        },
        _resetDSThuoc: function() {
            dojo.forEach(dijit.findWidgets(this.dsThuocTimKiemNode), function(w) {
                w.destroyRecursive();
            });
        },
        _resetTblToaThuoc: function() {
            dojo.forEach(dijit.findWidgets(this.tblToaThuocNode), function(w) {
                w.destroyRecursive();
            });
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
                    var xuatDonThuocWidget1 = dom.byId("indexLoadNewBenhNhan");
                    var widget = new xuatDonThuocWidget().placeAt(xuatDonThuocWidget1);

                },
                function(err) {
                    // handle an error condition
                    alert("không có kết nối tới server !!!");
                });
        },

    });
});