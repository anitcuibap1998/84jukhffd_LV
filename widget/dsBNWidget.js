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
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo, declare, baseFx, lang, domStyle, mouse, Toggler, on, query, request, JSON, WidgetBase, TemplatedMixin, template, rowBNWidget, domConstruct, arrayUtil, Attr, dom, registry, Memory, ComboBox) {
    console.log("vao duoc file containerWidget")
    return declare([WidgetBase, TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor
        idContent: "dsBNWidget",
        btnAddNewBN: null,

        //==== url =====
        urlServer: "http://192.168.74.106:8088",

        index: 0,
        pageSize: 10,

        activeLoad: true,
        // Our template - important!
        templateString: template,

        postCreate: function() {
            // this.checkRole();

            this.loadDSBenhNhan();

            this.own(
                on(window, "scroll", lang.hitch(this, "lazyLoads")),
            );
        },

        loadDSBenhNhan: function() {
            var that = this;
            console.log(this.index);
            console.log('vào hàm load danh sách bệnh nhân !!!')
            request(this.urlServer + "/benh_nhan/getAll?index=" + this.index + "&pageSize=" + this.pageSize, {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function(datas) {
                // do something with handled data
                datas = JSON.parse(datas);
                console.log(datas)
                if (datas.length == 0) {
                    that.activeLoad = false;
                }
                if (datas.statusCode == 404) {
                    alert("Bạn Bị Từ Chối Truy Cập Vì không Đủ Quyền, Chúng Tôi Sẽ Chuyển Bạn Về Màng Hình Đăng Nhập!!!");
                    window.location.href = "../index.html";
                } else {
                    console.log("load thành công danh sách bệnh nhân !!!");
                    // Our template - important!

                    arrayUtil.forEach(datas, function(item) {
                        item.birth_date = item.birth_date.split("T", 1);
                        if (item.sex == 1) {
                            item.sex = "Nam";
                        } else if (item.sex == 0) {
                            item.sex = "Nữ";
                        } else {
                            item.sex = "Không Xác Định";
                        }
                        item.birth_date = that.getFormattedDate(new Date(item.birth_date));
                        var widget = new rowBNWidget(item).placeAt(that.rowBN);
                    });
                }
            }, function(err) {
                // handle an error condition
                alert("không có kết nối tới server !!!")
                window.location.href = "../index.html";
            });
            this.index++;

        },

        lazyLoads: function() {
            if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight && this.activeLoad == true) {
                this.loadDSBenhNhan();
            }
        },
        getFormattedDate: function(date) {
            let year = date.getFullYear();
            let month = (1 + date.getMonth()).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');

            return day + '-' + month + '-' + year;
        },
    });
});