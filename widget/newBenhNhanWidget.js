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
        btnAddNewBN:null,
        
        //====
       
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
       
        addNewBenhNhan: function(){
            var that = this;
            let firstname = dom.byId("firstname").value;
            let lastname = dom.byId("lastname").value;
            let sex = dom.byId("sex").value;
            let phone = dom.byId("phone").value;
            let birthday = dom.byId("birthday").value;
            let diachi = dom.byId("diachi").value;
            let tsbenh = dom.byId("tsbenh").value;
            let note = dom.byId("note").value;
            console.log("firstname: "+firstname);
            console.log("lastname: "+lastname);
            console.log("sex: "+sex);
            console.log("phone: "+phone);
            console.log("birthday: "+birthday);
            console.log("diachi: "+diachi);
            console.log("tsbenh: "+tsbenh);
            console.log("note: "+note);
            request.post(urlServer+"/benh_nhan/addOne", {
                data: dojo.toJson({
                    "first_name": firstname,
                    "last_name": lastname,
                    "phone":  phone,
                    "address": diachi,
                    "sex": sex,
                    "tien_su_benh":tsbenh,
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
                if (value.statusCode != 404) {
                    registry.byId("tiepTanWidget").maBNNode.innerHTML = value.id;
                    alert("Bạn Vừa Thêm Thành Công, Mã Số Bệnh Nhân Là: "+value.id);
                } else{
                    alert("Bạn Không Đủ Quyền Để Thêm Bệnh Nhân");
                }
            },function(err){
                alert("Không kết nối được tới server");
            });
        }
    });
});