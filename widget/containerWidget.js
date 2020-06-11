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
    "dojo/text!./demo/containerWidget.html",
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
], function(dojo,declare, baseFx, lang, domStyle, mouse,Toggler, on, query ,request,JSON, WidgetBase, TemplatedMixin, template,tiepTanWidget,bacSiWidget,duocSiWidget,Attr,dom,registry,Memory, ComboBox){
    console.log("vao duoc file containerWidget")
    return declare([WidgetBase, TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor
        idContent: "widgetRoot",
      
       
        //====
        userName: null,
        passWord: null,
        login: null,
        //===
        login_:null,
        tiepTan_:null,
        bacSi_:null,
        duocSi_:null,
        // Our template - important!
        templateString: template,

        // A class to be applied to the root node in our template
        // baseClass: "authorWidget",

        // A reference to our background animation
        mouseAnim: null,

        // Colors for our background animation
        baseBackgroundColor: "#ece0e0",
        mouseBackgroundColor: "#5485ba",
        postCreate: function () {
            // Get a DOM node reference for the root of our widget
            var domNode = this.domNode;

            // Run any parent postCreate processes - can be done at any point
            this.inherited(arguments);

            // Set our DOM node's background color to white -
            // smoothes out the mouseenter/leave event animations
            domStyle.set(domNode, "backgroundColor", this.baseBackgroundColor);
            // Set up our mouseenter/leave events
            // Using dijit/Destroyable's "own" method ensures that event handlers are unregistered when the widget is destroyed
            // Using dojo/mouse normalizes the non-standard mouseenter/leave events across browsers
            // Passing a third parameter to lang.hitch allows us to specify not only the context,
            // but also the first parameter passed to _changeBackground
            this.own(
                // on(domNode, mouse.enter, lang.hitch(this, "_changeBackground", this.mouseBackgroundColor)),
                // on(domNode, mouse.leave, lang.hitch(this, "_changeBackground", this.baseBackgroundColor)),
                on(this.login, "click", lang.hitch(this, "_login")),
            );
        },
        _changeBackground: function (newColor) {
            // If we have an animation, stop it
            if (this.mouseAnim) {
                this.mouseAnim.stop();
            }

            // Set up the new animation
            this.mouseAnim = baseFx.animateProperty({
                node: this.domNode,
                properties: {
                    backgroundColor: newColor
                },
                onEnd: lang.hitch(this, function () {
                    // Clean up our mouseAnim property
                    this.mouseAnim = null;
                })
            }).play();
        },
        _login: function () {
            var that = this;
            console.log("Đăng Nhập");
            let userName = this.userName.value;
            let passWord = this.passWord.value;
            console.log(userName + " -- " + passWord);
            request.post("http://localhost:8088/user/getOne", {
                data: dojo.toJson( {
                    "username":userName,
                    "pass":passWord
               }),
                headers: {
                    "Content-Type": 'application/json; charset=utf-8',
                    "Accept": "application/json"
                }
            }).then(function (value) {
                console.log("The server returned: ");
                console.log(JSON.parse(value, true));
                console.log(typeof value);
                value = JSON.parse(value, true);
                if (value.role == 30) {
                     alert("Là Tiếp Tân");
                     that.loadTiepTanWidget();
                }
                else if(value.role == 99){
                     alert("Là Bác Sĩ!!");
                     that.loadBacSiWidget();
                }else if(value.role == 20){
                    alert("Là Dược Sĩ!!");
                    that.loadDuocSiWidget();
                }else{
                    alert("Bạn Đăng Nhập Sai");
                }
            });
        },
        _hiddenLogin: function(){
            domStyle.set(this.login_, "display", "none");
            domStyle.set(this.tiepTan_, "display", "none");
            domStyle.set(this.bacSi_, "display", "none");
            domStyle.set(this.duocSi_, "display", "none");
        },
        loadTiepTanWidget: function(){
            this._hiddenLogin();
            domStyle.set(this.tiepTan_, "display", "block");
            console.log("Load Tiếp Tân");
            let tiepTanWidget1 = dom.byId("tiepTan");
            let widget = new tiepTanWidget().placeAt(tiepTanWidget1);
        },
        loadBacSiWidget: function(){
            this._hiddenLogin();
            domStyle.set(this.bacSi_, "display", "block");
            console.log("Load Bác Sĩ");
            let bacSiWidget1 = dom.byId("bacSi");
            let widget = new bacSiWidget().placeAt(bacSiWidget1);
        },
        loadDuocSiWidget: function(){
            this._hiddenLogin();
            domStyle.set(this.duocSi_, "display", "block");
            console.log("Load Dược Sĩ");
            let duocSiWidget1 = dom.byId("duocSi");
            let widget = new duocSiWidget().placeAt(duocSiWidget1);
        }
    });
});