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
    "dojo/text!./demo/duocSiWidget.html",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo,declare, baseFx, lang, domStyle, mouse,Toggler, on, query ,request,JSON, WidgetBase, TemplatedMixin, template,Attr,dom,registry,Memory, ComboBox){
    console.log("vao duoc file duocSiWidget")
    return declare([WidgetBase, TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor
        id: "duocSiWidget",
        urlServer:"http://localhost:8088",
        templateString: template,

      
        postCreate: function () {
       
            this.own(
              
            );
        },
         checkRole: function() {
            if(localStorage.getItem("tokenAC")!=null){
                //gọi hàm check role
                request(this.urlServer+"/user/checkRole",{
                    headers: {
                        "tokenAC":localStorage.getItem("tokenAC")
                    }
                }).then(function(data){
                    // do something with handled data
                    if(data < 20 || data == 404){
                        alert("Bạn Không Có Quyền Truy Cập Trang Này, Bạn Hãy Đăng Nhập Lại!!!");
                        window.location.href = "../index.html";
                    }
                  }, function(err){
                    // handle an error condition
                    alert("không có kết nối tới server !!!")
                  });
            }else{
                alert("Bạn Không Đủ Quyền, Hãy Đăng Nhập Lại !!!");
                window.location.href = "../index.html";
            }
        },
    });
});