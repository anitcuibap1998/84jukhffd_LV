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
    "widget/dsBNWidget.js",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo,declare, baseFx, lang, domStyle, mouse,Toggler, on, query ,request,JSON, WidgetBase, TemplatedMixin, template,newBenhNhanWidget,danhSachLichHenWidget,dsBNWidget,Attr,dom,registry,Memory, ComboBox){
    console.log("vao duoc file tiepTanWidget")
    return declare([WidgetBase, TemplatedMixin], {
        id: "tiepTanWidget",
        
        urlServer:"http://localhost:8088",
        
        
        templateString: template,

        
        nameUserNode:null,
        mailUserNode:null,
        phoneUserNode:null,
        maBNNode:null,

        newBenhNhan:null,
        danhSachLichHen:null,
        dsBN:null,

        
        indexLoadNewBenhNhan:null,
     
        //test
        nameUser:null,
        postCreate: function () {
            this.checkRole();
            this.infoAccount();
            
     

            this.inherited(arguments);

            this.own(
                on(this.newBenhNhan, "click", lang.hitch(this, "loadNewBenhNhan")),
                on(this.danhSachLichHen, "click", lang.hitch(this, "loadDanhSachLichHen")),
                on(this.dsBN, "click", lang.hitch(this, "loadDSBN")),
            );
        },
       
        checkRole: function(){
            if(localStorage.getItem("tokenAC")!=null){
                //gọi hàm check role
                request(this.urlServer+"/user/checkRole",{
                    headers: {
                        "tokenAC":localStorage.getItem("tokenAC")
                    }
                }).then(function(data){
                    // do something with handled data
                    if(data < 30 || data == 404){
                        alert("Bạn Không Có Quyền Truy Cập Trang Này, Bạn Hãy Đăng Nhập Lại!!!");
                        window.location.href = "../index.html";
                    }
                  }, function(err){
                    // handle an error condition
                    alert("không có kết nối tới server !!!");
                  });
            }else{
                alert("Bạn Không Có Quyền Truy Cập Trang Này, Bạn Hãy Đăng Nhập Lại !!!");
                window.location.href = "../index.html";
            }
        },

        infoAccount: function(){
            var that = this;
            request(this.urlServer+"/user/getOne",{
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

              request.get(this.urlServer+"/benh_nhan/getOneBNLasted",{
                headers: {
                    "tokenAC":localStorage.getItem("tokenAC")
                }
            }).then(function(data){
                result = JSON.parse(data,true)
                console.log(JSON.parse(data,true))
                // do something with handled data
               
                that.maBNNode.innerHTML = result.id;
               
              }, function(err){
                // handle an error condition
                alert("không có kết nối tới server !!!");
              });
              
        },
        loadNewBenhNhan: function(){
            let kq = confirm("Bạn Có Muốn Thực Hiện");
            if(kq==true){
            console.log("Vào hàm load new bệnh nhân");
            let contentTiepTanWidget = dom.byId("contentTiepTanWidget");
            console.log("kq: "+kq);
            this.indexLoadNewBenhNhan.innerHTML="";
            console.log("newBenhNhanID: "+contentTiepTanWidget);
            var widget = new newBenhNhanWidget().placeAt(contentTiepTanWidget);
            }
          
        },
        loadDanhSachLichHen: function(){
            let kq = confirm("Bạn Có Muốn Thực Hiện");
            if(kq==true){
            console.log("Vào hàm load danh sách lịch hẹn !!!");
            let contentTiepTanWidget = dom.byId("contentTiepTanWidget");
            console.log("kq: "+kq);
            this.indexLoadNewBenhNhan.innerHTML="";
            console.log("loadDanhSachLichHen: "+contentTiepTanWidget);
            var widget1 = new danhSachLichHenWidget().placeAt(contentTiepTanWidget);
            }
        },
  
        loadDSBN: function(){
            let kq = confirm("Bạn Có Muốn Thực Hiện");
            if(kq==true){
            let contentTiepTanWidget = dom.byId("contentTiepTanWidget");
            console.log("kq: "+kq);
            this.indexLoadNewBenhNhan.innerHTML="";
            console.log("DSBNTiepTanWidget: "+contentTiepTanWidget);
            var widget3 = new dsBNWidget().placeAt(contentTiepTanWidget);
            }
        },


    });
});