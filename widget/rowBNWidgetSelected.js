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
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor
        idContent: "rowBN",

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
            console.log("vào hàm chọn bệnh nhân: " + this.id);
            console.log("vào hàm chọn bệnh nhân: " + this.full_name);
            registry.byId("danhSachLichHenWidgetId").txtDataSearch.value = this.id;
            registry.byId("danhSachLichHenWidgetId").fullNameNode.value = this.full_name;
            // localStorage.setItem("fullNameBnSelected", this.full_name);

            registry.byId("danhSachLichHenWidgetId").rowBN.hidden = true;
            // registry.byId("danhSachLichHenWidgetId")._resetDSBN();
        },

    });
});