var urlServer="http://localhost:8088";
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
    "dojo/text!./demo/tiepTanWidget.html",
    "widget/newBenhNhanWidget.js",
    "widget/danhSachLichHenWidget.js",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo,declare, baseFx, lang, domStyle, mouse,Toggler, on, query ,request,JSON, WidgetBase, TemplatedMixin, template,newBenhNhanWidget,danhSachLichHenWidget,Attr,dom,registry,Memory, ComboBox){
    console.log("vao duoc file tiepTanWidget")
    return declare([WidgetBase, TemplatedMixin], {
        id: "tiepTanWidget",
        
     
        templateString: template,

        
        nameUserNode:null,
        mailUserNode:null,
        phoneUserNode:null,
        newBenhNhan:null,
        danhSachLichHen:null,
        indexLoadNewBenhNhan:null,

        //test
        nameUser:null,
        postCreate: function () {
            this.checkRole();
            this.infoAccount();
            var domNode = this.domNode;

            this.inherited(arguments);

            this.own(
                on(this.newBenhNhan, "click", lang.hitch(this, "loadNewBenhNhan")),
                on(this.danhSachLichHen, "click", lang.hitch(this, "loadDanhSachLichHen")),
            );
        },
       
        checkRole: function(){
            if(localStorage.getItem("tokenAC")!=null){
                //gọi hàm check role
                request(urlServer+"/user/checkRole",{
                    headers: {
                        "tokenAC":localStorage.getItem("tokenAC")
                    }
                }).then(function(data){
                    // do something with handled data
                    if(data < 30){
                        alert("Bạn Không Có Quyền Truy Cập Trang Này");
                        window.location.href = "../index.html";
                    }
                  }, function(err){
                    // handle an error condition
                    alert("không có kết nối tới server !!!");
                  });
            }else{
                alert("Bạn Không Có Quyền Truy Cập Trang Này");
                window.location.href = "../index.html";
            }
        },

        infoAccount: function(){
            var that = this;
            request(urlServer+"/user/getOne",{
                headers: {
                    "tokenAC":localStorage.getItem("tokenAC")
                }
            }).then(function(data){
                result = JSON.parse(data,true)
                console.log(JSON.parse(data,true))
                // do something with handled data
                that.nameUserNode.innerHTML = result.first_name+" "+result.last_name;
                that.mailUserNode.innerHTML = result.email;
                that.phoneUserNode.innerHTML = result.phone;
               
              }, function(err){
                // handle an error condition
                alert("không có kết nối tới server !!!");
              });
        },
        loadNewBenhNhan: function(){
            this.indexLoadNewBenhNhan.innerHTML = "";
            console.log("Vào hàm load new bệnh nhân");
            let kq = confirm("Bạn Có Chắc Muốn Chuyển Trang!!!")
            if(kq==true){
            let newBenhNhanID = dom.byId("contentTiepTanWidget");
            console.log("newBenhNhanID: "+newBenhNhanID);
            var widget = new newBenhNhanWidget().placeAt(newBenhNhanID);
            }else if(kq==false){
                
            }
        },
        loadDanhSachLichHen: function(){
            this.indexLoadNewBenhNhan.innerHTML = "";
            console.log("Vào hàm load danh sách lịch hẹn !!!");
            let kq = confirm("Bạn Có Chắc Muốn Chuyển Trang!!!")
            if(kq==true){
            let newBenhNhanID = dom.byId("contentTiepTanWidget");
            console.log("newBenhNhanID: "+newBenhNhanID);
            var widget1 = new danhSachLichHenWidget().placeAt(newBenhNhanID);
            }else if(kq==false){
                
            }
        },
        loadDatLichHen: function(){
            this.indexLoadNewBenhNhan.innerHTML = "";
            console.log("Vào hàm load danh sách lịch hẹn !!!");
            let kq = confirm("Bạn Có Chắc Muốn Chuyển Trang!!!")
            if(kq==true){
            let newBenhNhanID = dom.byId("contentTiepTanWidget");
            console.log("newBenhNhanID: "+newBenhNhanID);
            var widget1 = new newBenhNhanWidget().placeAt(newBenhNhanID);
            }else if(kq==false){
                
            }
        },
        

    });
});