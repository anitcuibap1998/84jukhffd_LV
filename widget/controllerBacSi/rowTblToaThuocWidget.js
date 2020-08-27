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
    "dojo/text!../demo/templateBacSi/rowTblToaThuocWidget.html",
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


        //==== input data=====
        id_thuoc: null,
        ten_thuoc: null,
        ham_luong: null,
        don_vi_tinh: null,
        so_luong_thuoc: null,
        cach_dung: null,
        // node element
        idThuocNode: null,
        tenThuocNode: null,
        hamLuongNode: null,
        donViTinhNode: null,
        soLuongNode: null,
        cachDungNode: null,



        ///các node tương tác ui
        btnXongThuocNode: null,
        btnEditThuocNode: null,
        btnDeleteThuocNode: null,
        txtDataSearch: null,
        // Our template - important!
        templateString: template,

        postCreate: function() {
            // this.checkRole();
            // var domNode = this.domNode;
            this.inherited(arguments);

            this.own(
                on(this.btnXongThuocNode, "click", lang.hitch(this, "editXongThuoc")),
                on(this.btnEditThuocNode, "click", lang.hitch(this, "editThuoc")),
                on(this.btnDeleteThuocNode, "click", lang.hitch(this, "deleteThuoc")),
            );
        },

        editXongThuoc: function() {
            console.log("vào hàm sửa xong thuốc");
            //xử lý arrayToaThuoc.
            console.log("arrToathuoc trước khi add: ", registry.byId("khamBenhWidgetId").arrayToaThuoc);
            registry.byId("khamBenhWidgetId").arrayToaThuoc.forEach(item => {
                if (item.id_thuoc == this.id_thuoc) {
                    item.so_luong_thuoc = this.soLuongNode.value;
                    item.cach_dung = this.cachDungNode.value;
                }
            });
            this.soLuongNode.disabled = true;
            this.cachDungNode.disabled = true;
            this.btnXongThuocNode.hidden = true;
            this.btnEditThuocNode.hidden = false;
        },
        editThuoc: function() {
            console.log("vào hàm sửa thuốc");
            this.soLuongNode.disabled = false;
            this.cachDungNode.disabled = false;
            this.btnXongThuocNode.hidden = false;
            this.btnEditThuocNode.hidden = true;
        },
        deleteThuoc: function() {
            console.log("vào hàm xóa thuốc");
            console.log("arrToathuoc trước khi add: ", registry.byId("khamBenhWidgetId").arrayToaThuoc);
            registry.byId("khamBenhWidgetId").arrayToaThuoc;
            const result = registry.byId("khamBenhWidgetId").arrayToaThuoc.find(item => item.id_thuoc == this.id_thuoc);
            registry.byId("khamBenhWidgetId").arrayToaThuoc.splice(result, 1);
            registry.byId("khamBenhWidgetId").renderTblToaThuoc(registry.byId("khamBenhWidgetId").arrayToaThuoc);
        },


    });
});