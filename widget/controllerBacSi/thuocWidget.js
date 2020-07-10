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
    "dojo/text!../demo/templateBacSi/thuocWidget.html",
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
        // node element
        idThuocNode: null,
        tenThuocNode: null,
        hamLuongNode: null,
        donViTinhNode: null,
        soLuongNode: null,
        cachDungNode: null,


        ///các node tương tác ui
        btnChonThuocNode: null,
        // Our template - important!
        templateString: template,

        postCreate: function() {
            // this.checkRole();
            // var domNode = this.domNode;
            this.inherited(arguments);

            this.own(
                on(this.btnChonThuocNode, "click", lang.hitch(this, "chonThuoc")),
            );
        },


        chonThuoc: function() {
            console.log("vào hàm chọn thuốc !!!");
            console.log("Id Thuốc: " + this.id_thuoc);
            console.log("Tên Thuốc: " + this.ten_thuoc);
            console.log("hàm Lượng: " + this.ham_luong);
            console.log("Đơn Vị Tính: " + this.don_vi_tinh);
            console.log("Số Lượng: " + this.soLuongNode.value);
            console.log("Chỉ Định: " + this.cachDungNode.value);
            //new 1 object thuoc để push vào arrayToaThuoc
            let thuocSelected = {
                "id_thuoc": this.id_thuoc,
                "ten_thuoc": this.ten_thuoc,
                "ham_luong": this.ham_luong,
                "don_vi_tinh": this.don_vi_tinh,
                "so_luong_thuoc": this.soLuongNode.value,
                "cach_dung": this.cachDungNode.value,
            };
            console.log("Object Thuốc:", thuocSelected);
            console.log("arrToathuoc trước khi add: ", registry.byId("khamBenhWidgetId").arrayToaThuoc);
            let arrToaThuoc = registry.byId("khamBenhWidgetId").arrayToaThuoc.slice();
            console.log("array tạm: ", arrToaThuoc);
            let kqXuLyInput = this.xuLyInputChonThuoc(this.soLuongNode.value, this.cachDungNode.value, this.id_thuoc, arrToaThuoc);
            if (kqXuLyInput) {
                registry.byId("khamBenhWidgetId").arrayToaThuoc.push(thuocSelected);
                console.log("arrToathuoc sau khi add: ", registry.byId("khamBenhWidgetId").arrayToaThuoc);
                registry.byId("khamBenhWidgetId").renderTblToaThuoc(registry.byId("khamBenhWidgetId").arrayToaThuoc);
            }

        },
        xuLyInputChonThuoc: function(inputSL, inputChiDan, inputIdThuoc, arrToaThuoc) {
            if (inputSL == undefined || inputSL == "" || inputSL < 1) {
                alert("Không Được bỏ trống trường số lượng, mời bạn kiểm tra lại");
                return false;
            }
            if (inputChiDan == undefined || inputChiDan == "") {
                alert("Không Được bỏ trống trường chỉ dẫn, mời bạn kiểm tra lại");
                return false;
            }
            const found = arrToaThuoc.find(element => element.id_thuoc == inputIdThuoc);
            if (found != undefined) {
                alert("Thuốc này đã có trong toa thuốc Mời bác sĩ xem lại!!!");
                return false;
            }
            return true;
        }

    });
});