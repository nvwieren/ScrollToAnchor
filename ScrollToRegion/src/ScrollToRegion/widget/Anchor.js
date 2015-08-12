/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console, document, jQuery */
/*mendix */
/*
    Anchor
    ========================

    @file      : Anchor.js
    @version   : 1.0
    @author    : Christopher James Hodges
    @date      : 10/08/2015
    @copyright : 
    @license   : Apache2

    Documentation
    ========================
    This widget creates a simple div for anchoring
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_TemplatedMixin',
    'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/dom-construct', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/text', 'dojo/html', 'dojo/_base/event'
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, domQuery, domProp, domGeom, domClass, domStyle, domConstruct, dojoArray, lang, text, html, event) {
    'use strict';
    
    // Declare widget's prototype.
    return declare('ScrollToRegion.widget.Anchor', [_WidgetBase], {

        // _TemplatedMixin will create our dom node using this HTML template.

        // Parameters configured in the Modeler.
        anchorClass: "",

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {

        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            console.log(this.id + '.postCreate');
            this._updateRendering();
            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + '.update');

            callback();
        },

     
        // Attach events to HTML dom elements
        _setupEvents: function () {

        },

        // Rerender the interface.
        _updateRendering: function () {
            
            domClass.add(this.domNode, this.anchorClass);
            //var anchorDiv = mxui.dom.div({
               //"class": this.anchorClass
            //});	
            
           //domConstruct.place(anchorDiv, this.domNode, "first");
            
        }
    });
});
require(['ScrollToRegion/widget/ScrollToRegion'], function () {
    'use strict';
});