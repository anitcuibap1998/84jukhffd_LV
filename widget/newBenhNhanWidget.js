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
        id: "newBenhNhanWidget",
        urlServer: "http://localhost:8088",

        btnAddNewBN: null,


        regSpecialCharactersed: /\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\<|\>|\?|\:|\"|\;|\,|\.|\/|\\|\{|\}|\*|\-|\+|\[|\]|\`|\~|\'/g,
        regUsername: /^[A-Za-z0-9 ]+$/,
        regFullname: /^[A-Za-z ]+$/,
        regEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        regPhone: /^[0]+\d{9}$/,
        regPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        //====
        flagCallAdduser: true,

        // Our template - important!
        templateString: template,

        postCreate: function() {
            // this.checkRole();
            // var domNode = this.domNode;
            this.inherited(arguments);

            this.own(
                on(this.btnAddNewBN, "click", lang.hitch(this, "addNewBenhNhan")),
            );
        },

        addNewBenhNhan: function() {
            var that = this;
            let fullname = dom.byId("full_name").value;
            let sex = dom.byId("sex").value;
            let phone = dom.byId("phone").value;
            let mail = dom.byId("mail").value;
            let birthday = dom.byId("birthday").value;
            let diachi = dom.byId("diachi").value;
            let tsbenh = dom.byId("tsbenh").value;
            let note = dom.byId("note").value;

            let kq = true;
            if (kq == true) {
                kq = that.validateFormBenhNhanNotNull(fullname);
            }
            if (kq == true) {
                kq = that.validatePhone(phone);
            }
            if (kq == true) {
                kq = that.validateMail(mail);
            }
            if (kq == true) {
                kq = that.valedateBirthday(birthday);
            }
            if (kq == true) {
                kq = that.validateFormBenhNhanNotNull(diachi);
            }
            if (kq == true) {
                kq = that.validateFormBenhNhanNotNull(tsbenh);
            }
            if (kq == true) {
                kq = that.validateFormBenhNhanNotNull(note);
            }
            if (this.flagCallAdduser == true) {
                console.log("vào loading.....");
                console.log(this.btnAddNewBN);
                this.btnAddNewBN.disabled = true;
                this.btnAddNewBN.value = "";
                this.btnAddNewBN.value = "Loading...";
                request.post(this.urlServer + "/benh_nhan/addOne", {
                    data: dojo.toJson({
                        "user_create": 1,
                        "user_update": 0,
                        "create_date": new Date(),
                        "full_name": fullname,
                        "phone": phone,
                        "mail": mail,
                        "address": diachi,
                        "sex": sex,
                        "tien_su_benh": tsbenh,
                        "birth_date": birthday,
                        "ghi_chu": note
                    }),
                    headers: {
                        "Content-Type": 'application/json; charset=utf-8',
                        "Accept": "application/json",
                        "tokenAC": localStorage.getItem("tokenAC")
                    }
                }).then(function(value) {
                    console.log("The server returned: ");
                    console.log(JSON.parse(value, true));
                    value = JSON.parse(value, true);
                    console.log(typeof value);

                    console.log(value.token);
                    let name = value.last_name + " " + value.first_name;
                    if (value.statusCode != 404 && value.statusCode != 999) {
                        registry.byId("tiepTanWidget").maBNNode.innerHTML = value.id;
                        alert("Bạn Vừa Thêm Thành Công, Mã Số Bệnh Nhân Là: " + value.id);
                    } else if (value.statusCode == 999) {
                        alert(value.message);
                    } else if (value.statusCode == 404) {
                        alert(value.message);
                    }
                    console.log("đã tải xong....");
                    console.log(that.btnAddNewBN);
                    that.btnAddNewBN.disabled = false;
                    that.btnAddNewBN.value = "";
                    that.btnAddNewBN.value = "Thêm mới";
                }, function(err) {
                    alert("Không kết nối được tới server");
                });
            }
        },
        editBenhnhan: function() {
            console.log("Vào hàm sửa bệnh nhân !!!");
        },
        formatDateToDate: function() {
            let today = new Date();
            let dd = today.getDate();
            let MM = today.getMonth() + 1;
            let yyyy = today.getFullYear();
            let hh = today.getHours();
            let mm = today.getMinutes();
            let ss = today.getSeconds();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            today = yyyy + '-' + MM + '-' + dd + " " + hh + ":" + mm + ":" + ss;
            console.log(today);
            return today;
        },
        valedateBirthday: function(input) {
            if (input == null || input == "") {
                alert("Phải Chọn Ngày Sinh");
                this.flagCallAdduser = false;
                return false;
            }
            return true;
        },
        validateMail: function(input) {
            if (!this.regEmail.test(input) && input != "") {
                alert("Mail Không Hợp Lệ");
                this.flagCallAdduser = false;
                return false;
            }
            return true;
        },
        validatePhone: function(input) {
            if (input == "") {
                alert("Không Được Để Trống Số Điện Thoại");
                this.flagCallAdduser = false;
                return false;
            }
            if (!this.regPhone.test(input)) {
                alert("Số Điện Thoại Không Hợp Lệ");
                this.flagCallAdduser = false;
                return false;
            }
            return true;
        },
        validateFormBenhNhanNotNull: function(input) {
            if (input == "") {
                alert("Chuỗi Không Được Để Trống");
                this.lagCallAdduser = false;
                return false;
            }
            if (this.regSpecialCharactersed.test(input)) {
                alert("Chuỗi Không Được Chứ Ký Tự Đặc Biệt");
                this.flagCallAdduser = false;
                return false;
            }
            return true;
        },
    });
});