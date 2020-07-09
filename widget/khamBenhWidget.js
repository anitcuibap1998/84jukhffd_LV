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
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo, declare, baseFx, lang, domStyle, mouse, Toggler, on, query, request, JSON, WidgetBase, TemplatedMixin, template, tiepTanWidget, bacSiWidget, rowBNWidget, arrayUtil, Attr, dom, registry, Memory, ComboBox) {
    console.log("vao duoc file containerWidget")
    return declare([WidgetBase, TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor
        id: "khamBenhWidgetID",
        urlServer: "http://localhost:8088",
        //==== input data=====


        ///các node tương tác ui
        editBenhNhan: null,
        datlichBenhNhan: null,
        khambenhBenhNhan: null,
        // Our template - important!
        txtDataSearch: null,
        fullNameNode: null,
        rowBN: null,
        templateString: template,


        postCreate: function() {
            // this.checkRole();
            // var domNode = this.domNode;
            this.inherited(arguments);

            this.own(
                // on(this.editBenhNhan, "click", lang.hitch(this, "editBN")),

            );
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