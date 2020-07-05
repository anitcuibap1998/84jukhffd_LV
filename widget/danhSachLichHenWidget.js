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
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom",
    "dojo/dom-class",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/FilteringSelect",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo, declare, baseFx, lang, domStyle, mouse, Toggler, on, query, request, JSON, WidgetBase, TemplatedMixin, template, tiepTanWidget, bacSiWidget, duocSiWidget, rowBNWidget, arrayUtil, Attr, dom, domClass, registry, Memory, FilteringSelect) {
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
        mesNode: null,
        fullNameNode: null,
        // Our template - important!
        templateString: template,

        postCreate: function() {
            var domNode = this.domNode;
            // this.checkRole();
            this.mesNode.hidden = true;
            this.inherited(arguments);
            this.loadLoaiKhamBenh();
            this.own(
                on(this.btnDatLich, "click", lang.hitch(this, "datLich")),
                on(this.loaiKhamBenhNode, "change", lang.hitch(this, "loadDSBN")),
            );

        },
        datLich: function() {
            // let name = localStorage.getItem("fullNameBnSelected");
            name1 = this.fullNameNode.value;
            // console.log("aaa: " + name);
            console.log("vào hàm đặt lịch");
            console.log("timeStart: " + this.dateLichHenNode.value);
            console.log("timeStartNode: " + this.timeStartNode.value);
            console.log("ghiChuNode: " + this.ghiChuNode.value);
            console.log("id loại khám: ", +dijit.byId('stateSelect').get('value'));
            console.log("id bệnh nhân: ", +dom.byId('searchtest').value);
            console.log("full name: " + name1);



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


    });
});