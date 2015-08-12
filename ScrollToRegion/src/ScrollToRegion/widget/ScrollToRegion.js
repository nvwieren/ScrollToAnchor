/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console, document, jQuery */
/*mendix */
/*
    ScrollToRegion
    ========================

    @file      : ScrollToRegion.js
    @version   : 1.0
    @author    : Simon Black & Chris Hodges
    @date      : Thu, 06 Aug 2015 16:30:30 GMT
    @copyright : 
    @license   : Apache2

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_TemplatedMixin',
    'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/dom-construct', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/text', 'dojo/html', 'dojo/_base/event',
    'ScrollToRegion/lib/jquery-1.11.2.min'
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, domQuery, domProp, domGeom, domClass, domStyle, domConstruct, dojoArray, lang, text, html, event, _jQuery) {
    'use strict';

    var $ = jQuery.noConflict(true);
    
    // Declare widget's prototype.
    return declare('ScrollToRegion.widget.ScrollToRegion', [_WidgetBase], {

        // _TemplatedMixin will create our dom node using this HTML template.

        // Parameters configured in the Modeler.
        scrollTo: "",
        regionToScroll: "",
        offset: "",

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handles: null,
        _contextObj: null,
        _alertDiv: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._handles = [];
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

            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering();

            callback();
        },

     
        // Attach events to HTML dom elements
        _setupEvents: function () {


        },

        // Rerender the interface.
        _updateRendering: function () {
            if (this._contextObj !== null) {
                var _scrollTo = this._contextObj.get(this.scrollTo);
                var self = this;
                
                if (_scrollTo != ""){
                    if (this.exists(_scrollTo) == true){
                        
                        $(self.regionToScroll).animate({
                            scrollTop: $(_scrollTo).offset().top
                                }, 1000);

                        domStyle.set(this.domNode, 'display', 'block');
                    }
                }
            }
             else {
                domStyle.set(this.domNode, 'display', 'none');
            }
        },
        
        exists: function (className){
            
            return $(className).length > 0;
        },
       
        // Reset subscriptions.
        _resetSubscriptions: function () {
            var _objectHandle = null,
                _attrHandle = null,
                _validationHandle = null;

            // Release handles on previous object, if any.
            if (this._handles) {
                this._handles.forEach(function (handle, i) {
                    mx.data.unsubscribe(handle);
                });
                this._handles = [];
            }

            // When a mendix object exists create subscribtions. 
            if (this._contextObj) {

//                _objectHandle = this.subscribe({
//                    guid: this._contextObj.getGuid(),
//                    callback: lang.hitch(this, function (guid) {
//                        this._updateRendering();
//                    })
//                });

                _attrHandle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    attr: this.scrollTo,
                    callback: lang.hitch(this, function (guid, attr, attrValue) {
                        this._updateRendering();
                    })
                });

                this._handles = [_objectHandle];
            }
        }
    });
});
require(['ScrollToRegion/widget/ScrollToRegion'], function () {
    'use strict';
});