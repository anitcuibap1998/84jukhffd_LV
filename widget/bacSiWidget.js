let urlServer="http://localhost:8088";
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
    "dojo/text!./demo/bacSiWidget.html",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo,declare, baseFx, lang, domStyle, mouse,Toggler, on, query ,request,JSON, WidgetBase, TemplatedMixin, template,Attr,dom,registry,Memory, ComboBox){
    console.log("vao duoc file bacSiWidget")
    return declare([WidgetBase, TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor
        id: "bacSiWidget",
        // Using require.toUrl, we can get a path to our AuthorWidget's space
        // and we want to have a default avatar, just in case
        // userName: null,
        // passWord: null,
        // login: null,
        // Our template - important!
        templateString: template,

      
        mouseAnim: null,


        baseBackgroundColor: "#ece0e0",
        mouseBackgroundColor: "#5485ba",
        postCreate: function () {
            // Get a DOM node reference for the root of our widget
            var domNode = this.domNode;

            // Run any parent postCreate processes - can be done at any point
            this.inherited(arguments);

          
            domStyle.set(domNode, "backgroundColor", this.baseBackgroundColor);
       
            this.own(
                on(domNode, mouse.enter, lang.hitch(this, "_changeBackground", this.mouseBackgroundColor)),
                on(domNode, mouse.leave, lang.hitch(this, "_changeBackground", this.baseBackgroundColor))
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
       
    });
});