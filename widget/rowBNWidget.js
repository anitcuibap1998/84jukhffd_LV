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
    console.log("vao duoc file load row benh nhan");
    return declare([WidgetBase, TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor

        //==== input data=====
        id: null,
        full_name: null,
        phone: null,
        address: null,
        sex: null,
        tien_su_benh: null,
        birth_date: null,
        ghi_chu: null,
        mail: null,

        ///các node tương tác ui
        editBenhNhan: null,
        datlichBenhNhan: null,
        khambenhBenhNhan: null,
        // Our template - important!
        templateString: template,

        postCreate: function() {
            // this.checkRole();
            if (registry.byId("tiepTanWidget").role < 99) {
                this.khambenhBenhNhan.hidden = true;
            };
            this.own(
                on(this.editBenhNhan, "click", lang.hitch(this, "editBN")),
                on(this.datlichBenhNhan, "click", lang.hitch(this, "datlichBN")),
                // on(this.khambenhBenhNhan, "click", lang.hitch(this, "khambenhBN")),
            );
        },

        editBN: function() {
            console.log("vào hàm sửa bệnh nhân !!!");
            console.log(this.id);
            let data = {
                maBN: this.id,
                tenBN: this.full_name,
                sdt: "0" + this.phone,
                mail: this.mail,
                diaChi: this.address,
                // sex: 1,
                tsb: this.tien_su_benh,
                // ngaySinh: "12-8-1998",
                note: this.ghi_chu,
            };
            registry.byId("tiepTanWidget").loadEditBenhNhan(data);
            registry.byId("newBenhNhanWidget").maBNNode.hidden = false;
            registry.byId("newBenhNhanWidget").tieuDeBNNode.innerHTML = "";
            registry.byId("newBenhNhanWidget").tieuDeBNNode.innerHTML = "Chỉnh Sửa Thông Tin Bệnh Nhân " + '<h3 style="color:#895656">' + this.full_name + '</h3>';
            if (this.sex == "Nam") {
                registry.byId("newBenhNhanWidget").sexNode.options[0].selected = 'selected';
            } else if (this.sex == "Nữ") {
                registry.byId("newBenhNhanWidget").sexNode.options[1].selected = 'selected';
            } else {
                registry.byId("newBenhNhanWidget").sexNode.options[-1].selected = 'selected';
            }
            let res = this.birth_date.split("-");
            registry.byId("newBenhNhanWidget").birthdayNode.value = res[2] + "-" + res[1] + "-" + res[0];
            registry.byId("newBenhNhanWidget").btnAddNewBN.hidden = true;
            registry.byId("newBenhNhanWidget").btnEditBNNode.hidden = false;

        },
        datlichBN: function() {
            console.log("vào hàm đặt lịch cho bệnh nhân !!!");
            registry.byId("tiepTanWidget").loadDanhSachLichHen();
        },
        khambenhBN: function() {
            console.log("vào hàm khám bệnh cho bệnh nhân !!!");
        }
    });
});