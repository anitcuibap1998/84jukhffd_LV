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
    "dojo/text!./demo/dsBNWidget.html",
    "widget/rowBNWidget",
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo, declare, baseFx, lang, domStyle, mouse, Toggler, on, query, request, JSON, WidgetBase, TemplatedMixin, template, rowBNWidget, arrayUtil,Attr, dom, registry, Memory, ComboBox) {
    console.log("vao duoc file containerWidget")
    return declare([WidgetBase, TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor
        idContent: "dsBNWidget",
        btnAddNewBN:null,
        
        //==== url =====
        urlServer: "http://localhost:8088",
       
        // Our template - important!
        templateString: template,

        postCreate: function() {
            // this.checkRole();
           
            this.loadDSBenhNhan();
            this.own(
                // on(this.btnAddNewBN, "click", lang.hitch(this, "addNewBenhNhan")),s
            );
        },
       
        loadDSBenhNhan: function () {
            console.log('vào hàm load danh sách bệnh nhân !!!')
            request(this.urlServer + "/benh_nhan/getAll", {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function (datas) {
                // do something with handled data
                console.log(datas)
                datas = JSON.parse(datas)
                console.log("*****************")
                console.log(datas)
                if (datas.statusCode == 404) {
                    alert("Bạn Bị Từ Chối Truy Cập Vì không Đủ Quyền, Chúng Tôi Sẽ Chuyển Bạn Về Màng Hình Đăng Nhập!!!");
                    window.location.href = "../index.html";
                } else {
                    console.log("load thành công danh sách bệnh nhân !!!")
                    // Our template - important!
                    var rowBNWidget1 = dom.byId("rowBNWidget");
                    arrayUtil.forEach(datas, function(item){
                        item.birth_date = item.birth_date.split("T", 1);
                        var widget = new rowBNWidget(item).placeAt(rowBNWidget1);
                    });
                }
            }, function (err) {
                // handle an error condition
                alert("không có kết nối tới server !!!")
                window.location.href = "../index.html";
            });
        }
    });
});