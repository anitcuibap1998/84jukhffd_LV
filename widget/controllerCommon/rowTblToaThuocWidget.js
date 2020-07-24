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
    "dojo/text!../demo/templateCommon/rowTblToaThuocWidget.html",
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
        maThuoc: null,
        //btn tuong tac ui
        btnChiTietDonThuocNode: null,
        // Our template - important!
        templateString: template,

        postCreate: function() {
            // this.checkRole();
            // var domNode = this.domNode;
            this.inherited(arguments);

            this.own(
                on(this.btnChiTietDonThuocNode, "click", lang.hitch(this, "showChiTietToaThuoc")),
            );
        },

        showChiTietToaThuoc: function() {
            console.log("vào hiển thị chi tiết đơn thuốc");
            idtoathuoc = this.maThuoc;
            registry.byId("bacSiWidget")._resetMenuLichHen();
            registry.byId("bacSiWidget").___renderDonThuoc(idtoathuoc);
        },

    });
});