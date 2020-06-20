let urlServer="http://localhost:8088";
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
    "dojo/text!./demo/newBenhNhanWidget.html",
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
        idContent: "newBenhNhanWidget",


        //====
       
        // Our template - important!
        templateString: template,

        postCreate: function() {
            // this.checkRole();
            // var domNode = this.domNode;
            this.inherited(arguments);
            
            this.own(
            );
        },
       
       
        checkRole: function() {
            if(localStorage.getItem("tokenAC")!=null){
                //gọi hàm check role
                request(urlServer+"/user/checkRole",{
                    headers: {
                        "tokenAC":localStorage.getItem("tokenAC")
                    }
                }).then(function(data){
                    // do something with handled data
                    if(data == 99){
                        alert("Bạn Đã Đăng Nhập !!!");
                        window.location.href = "../bacsi.html";
                    }else if(data == 30){
                        alert("Bạn Đã Đăng Nhập !!!");
                        window.location.href = "../tieptan.html";
                    }else if(data == 20){
                        alert("Bạn Đã Đăng Nhập !!!");
                        window.location.href = "../duocsi.html";
                    }
                  }, function(err){
                    // handle an error condition
                    alert("không có kết nối tới server !!!")
                  });
            }
        }
    });
});