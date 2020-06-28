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
    "dojo/text!./demo/rowBNWidget.html",
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
        id:null,
        full_name:null,
        phone:null,
        address:null,
        sex:null,
        tien_su_benh:null,
        birth_date:null,
        ghi_chu:null,
       
        ///các node tương tác ui
        editBenhNhan:null,
        datlichBenhNhan:null,
        khambenhBenhNhan:null,
        // Our template - important!
        templateString: template,

        postCreate: function() {
            // this.checkRole();
            // var domNode = this.domNode;
            this.inherited(arguments);
            
            this.own(
                 on(this.editBenhNhan, "click", lang.hitch(this, "editBN")),
                 on(this.datlichBenhNhan, "click", lang.hitch(this, "datlichBN")),
                 on(this.khambenhBenhNhan, "click", lang.hitch(this, "khambenhBN")),
            );
        },
        
        editBN: function(){
            console.log("vào hàm sửa bệnh nhân !!!")
        },
        datlichBN: function(){
            console.log("vào hàm đặt lịch cho bệnh nhân !!!")
        },
        khambenhBN: function(){
            console.log("vào hàm khám bệnh cho bệnh nhân !!!")
        }
    });
});