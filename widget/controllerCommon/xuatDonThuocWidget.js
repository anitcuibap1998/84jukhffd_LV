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
    "dojo/text!../demo/templateCommon/xuatDonThuocWidget.html",
    "widget/controllerCommon/rowDonThuocWidget",
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom",
    "dijit/registry",
    "dojo/store/Memory",
    "dijit/form/ComboBox",
    "dojo/NodeList-dom",
    "dojo/domReady!",
], function(dojo, declare, baseFx, lang, domStyle, mouse, Toggler, on, query, request, JSON, WidgetBase, TemplatedMixin, template, rowDonThuocWidget, arrayUtil, Attr, dom, registry, Memory, ComboBox) {
    console.log("vao duoc file containerWidget")
    return declare([WidgetBase, TemplatedMixin], {
        // Some default values for our author
        // These typically map to whatever you're passing to the constructor


        //==== input data=====
        infoToaThuoc: null,
        infoPhongKham: null,
        infoBenhNhan: null,
        listThuoc: null,

        tuoi: null,
        ///các node tương tác ui
        rowDetailDonThuocNode: null,
        printToaThuocNode: null,
        copyAsNewNode: null,
        printDonThuocNode: null,
        // Our template - important!
        templateString: template,

        postCreate: function() {
            this.own(
                on(this.printToaThuocNode, "click", lang.hitch(this, "printToaThuoc")),
                on(this.copyAsNewNode, "click", lang.hitch(this, "copyAsNew")),
            );
            this.___showData();
        },

        printToaThuoc: function() {
            console.log("vao ham in ra toa thuoc !!!");
            var newWindow = window.open();
            newWindow.document.open();
            newWindow.document.write('<html><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Bác Sĩ</title> <link rel="stylesheet" href="css/core.css"> <link rel="stylesheet" href="css/main.css"> <!-- <link rel="stylesheet" href="css/index.css"> --> <script src="js/main.js"></script> <link rel="stylesheet" href="fontawesome-free-5.13.0-web/css/all.min.css"> <link rel="stylesheet" href="dojo-release-1.16.3/dijit/themes/claro/claro.css"> <!-- booststrap --> <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css"> <script src="bootstrap/js/bootstrap.min.js"></script> </head> <body>');
            newWindow.document.write('<div class="col-sm-8">');
            newWindow.document.write(this.printDonThuocNode.innerHTML);
            newWindow.document.write('</div></body></html>');
            newWindow.document.close();

            newWindow.print();
        },
        copyAsNew: function() {
            console.log("vao ham copy as new!!!");
        },
        ___showData: function() {
            console.log("vao ham in ra toa thuoc !!!");
            dateNow = new Date();
            namSinh = new Date(this.infoBenhNhan.birth_date);
            console.log(dateNow.getFullYear(), namSinh.getFullYear());
            let tuoidoi = dateNow.getFullYear() - namSinh.getFullYear();
            this.tuoi.innerHTML = "Tuổi: " + tuoidoi;
            //render Don Thuoc
            console.log(this.listThuoc);
            console.log(this.rowDetailDonThuocNode);
            var those = this;
            arrayUtil.forEach(this.listThuoc, function(item) {
                var widget = new rowDonThuocWidget(item).placeAt(those.rowDetailDonThuocNode);
            })
        },
    });
});