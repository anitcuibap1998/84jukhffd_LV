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
        infoToaThuoc: null,
        infoPhongKham: null,
        infoBenhNhan: null,
        listThuoc: null,




        tuoi: null,
        ///các node tương tác ui

        printToaThuocNode: null,
        // Our template - important!
        templateString: template,

        postCreate: function() {
            // this.checkRole();
            // var domNode = this.domNode;
            this.inherited(arguments);
            this.___showData();
            this.own(
                on(this.printToaThuocNode, "click", lang.hitch(this, "printToaThuoc"))
            );
        },

        printToaThuoc: function() {
            console.log("vao ham in ra toa thuoc !!!");
        },
        ___showData: function() {
            console.log("vao ham in ra toa thuoc !!!");
            dateNow = new Date();
            namSinh = new Date(this.infoBenhNhan.birth_date);
            console.log(dateNow.getFullYear(), namSinh.getFullYear());
            let tuoidoi = dateNow.getFullYear() - namSinh.getFullYear();
            this.tuoi.innerHTML = "Tuổi: " + tuoidoi;
        },
    });
});