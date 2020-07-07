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
    "dojo/text!./demo/rowLichHenWidget.html",
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
        // idContent: "rowBN",
        //-----url-----
        urlServer: "http://localhost:8088",
        //==== input data=====
        id: null,
        time: null,
        id_benh_nhan: null,
        last_name: null,
        ghi_chu: null,
        status: null,


        ///các node tương tác ui
        deleteLichHenNode: null,
        editLichHenNode: null,

        // Our template - important!
        templateString: template,

        postCreate: function() {
            this.inherited(arguments);

            this.own(
                on(this.editLichHenNode, "click", lang.hitch(this, "editLichHen")),
                on(this.deleteLichHenNode, "click", lang.hitch(this, "deleteLichHen")),
            );
        },

        editLichHen: function() {
            console.log("vào hàm sửa Lịch Hẹn !!!")
            alert("dạ chưa làm kịp chức năng này ạ !!!")
        },
        deleteLichHen: function() {
            console.log("vào hàm xóa 1 Lịch Hẹn !!!");
            let IDLichHen = this.id;

            // alert(this.id);
            request(this.urlServer + "/lich_hen/deleteLichHen/?idLH=" + IDLichHen, {
                headers: {
                    "tokenAC": localStorage.getItem("tokenAC")
                }
            }).then(function(datas) {
                datas = JSON.parse(datas, true);
                console.log(datas)
                if (datas == 0) {
                    // alert("Có Lỗi Xảy Ra Trong Quá Trình Xóa Vui Lòng Thử Lại !!!")
                } else {
                    alert("Xóa Thành Công")
                }
            }, function(err) {
                alert("không có kết nối tới server !!!");
            });
            //gọi lại hàm của widget cha reload lịch hẹn by date
            let date = registry.byId("danhSachLichHenWidgetId").valueDateSelected.textContent;
            console.log("---------");
            console.log("date duoc chon: " + date);
            registry.byId("danhSachLichHenWidgetId").loadLichHenTheoNgayTimKiem(date);
        },

    });
});