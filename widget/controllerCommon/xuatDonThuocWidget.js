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
    "dojo/text!../demo/templateCommon/xuatDonThuocWidget.html",
    "widget/controllerCommon/rowDonThuocWidget",
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo, declare, baseFx, lang, domStyle, mouse, Toggler, on, query, request, JSON, WidgetBase, TemplatedMixin, template, rowDonThuocWidget, arrayUtil, Attr, dom, registry, Memory, ComboBox) {
    console.log("vao duoc file containerWidget")
    return declare([WidgetBase, TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor


        //==== input data=====
        infoToaThuoc: null,
        infoPhongKham: null,
        infoBenhNhan: null,
        listThuoc: null,




        tuoi: null,
        ///các node tương tác ui
        rowDetailDonThuocNode: null,
        printToaThuocNode: null,
        copyAsNewNode: null,
        printDonThuocNode: null,
        // Our template - important!
        templateString: template,

        postCreate: function() {
            this.own(
                on(this.printToaThuocNode, "click", lang.hitch(this, "printToaThuoc")),
                on(this.copyAsNewNode, "click", lang.hitch(this, "copyAsNew")),
            );
            this.___showData();
        },

        printToaThuoc: function() {
            console.log("vao ham in ra toa thuoc !!!");
            var printContents = this.printDonThuocNode.innerHTML;
            var originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        },
        copyAsNew: function() {
            console.log("vao ham copy as new!!!");
        },
        ___showData: function() {
            console.log("vao ham in ra toa thuoc !!!");
            dateNow = new Date();
            namSinh = new Date(this.infoBenhNhan.birth_date);
            console.log(dateNow.getFullYear(), namSinh.getFullYear());
            let tuoidoi = dateNow.getFullYear() - namSinh.getFullYear();
            this.tuoi.innerHTML = "Tuổi: " + tuoidoi;
            //render Don Thuoc
            console.log(this.listThuoc);
            console.log(this.rowDetailDonThuocNode);
            var those = this;
            arrayUtil.forEach(this.listThuoc, function(item) {
                var widget = new rowDonThuocWidget(item).placeAt(those.rowDetailDonThuocNode);
            })
        },
    });
});