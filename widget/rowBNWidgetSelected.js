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
    "dojo/text!./demo/rowBNWidgetSelected.html",
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
        //==== url =====
        urlServer: "http://localhost:8088",
        //==== input data=====
        id: null,
        full_name: null,
        phone: null,
        address: null,
        sex: null,
        tien_su_benh: null,
        birth_date: null,
        ghi_chu: null,
        anKQNode: null,
        ///các node tương tác ui
        benhNhanSelectNode: null,
        idBN: null,
        // Our template - important!
        templateString: template,

        postCreate: function() {
            // this.checkRole();
            // var domNode = this.domNode;
            this.inherited(arguments);

            this.own(
                on(this.benhNhanSelectNode, "click", lang.hitch(this, "chonBN")),

            );
        },

        chonBN: function() {
            var that = this;
            console.log("vào hàm chọn bệnh nhân: " + this.id);
            console.log("vào hàm chọn bệnh nhân: " + this.full_name);
            if (localStorage.getItem("tokenAC") != null) {
                //gọi hàm check role
                request(this.urlServer + "/user/checkRole", {
                    headers: {
                        "tokenAC": localStorage.getItem("tokenAC")
                    }
                }).then(function(data) {
                    // do something with handled data
                    if (data == 99) {
                        registry.byId("khamBenhWidgetID").txtDataSearch.value = that.id;
                        registry.byId("khamBenhWidgetID").fullNameNode.value = that.full_name;
                        registry.byId("khamBenhWidgetID").rowBN.hidden = true;
                    }
                    if (data == 30) {
                        registry.byId("danhSachLichHenWidgetId").txtDataSearch.value = that.id;
                        registry.byId("danhSachLichHenWidgetId").fullNameNode.value = that.full_name;
                        registry.byId("danhSachLichHenWidgetId").rowBN.hidden = true;
                    }
                    if (data == 20) {

                    }
                    if (data == 404) {
                        alert("Sự cố kết nối internet!!!");
                    }
                }, function(err) {
                    // handle an error condition
                    alert("không có kết nối tới server !!!");
                });
            } else {
                alert("Bạn Không Có Quyền Truy Cập Trang Này");
                window.location.href = "../index.html";
            }

            // registry.byId("danhSachLichHenWidgetId")._resetDSBN();
        },

    });
});