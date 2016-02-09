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
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",

    "ScrollToAnchor/lib/jquery-1.11.2"
], function(declare, _WidgetBase, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, dojoLang, dojoText, dojoHtml, dojoEvent, _jQuery) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    // Declare widget's prototype.
    return declare("ScrollToAnchor.widget.ScrollToAnchor", [ _WidgetBase], {

        // _TemplatedMixin will create our dom node using this HTML template.

        // Parameters configured in the Modeler.
        scrollTo: "",
        regionToScroll: "",
        offset: "",
		scroll: "",

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
			
            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + '.update');
			
            this._contextObj = obj;
            this._resetSubscriptions();
			if (this.scroll === 'OnLoad' || this.scroll === 'All'){
				this._updateRendering();
			}
            

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
                    if ($(`.${_scrollTo}`)[0]){
                        $(self.regionToScroll).animate({
                            scrollTop: $(`.${_scrollTo}`).offset().top -this.offset
                                }, 1000);

                        dojoStyle.set(this.domNode, 'display', 'block');
                    }
                }
            }
             else {
                dojoStyle.set(this.domNode, 'display', 'none');
            }
        },
       
		 _resetSubscriptions: function() {
            logger.debug(this.id + "._resetSubscriptions");
            // Release handles on previous object, if any.
            if (this._handles) {
                dojoArray.forEach(this._handles, function (handle) {
                    mx.data.unsubscribe(handle);
                });
                this._handles = [];
            }

            // When a mendix object exists create subscribtions.
            if (this._contextObj) {
				if(this.scroll === 'OnUpdate' || this.scroll === 'All'){
                		var objectHandle = this.subscribe({
							guid: this._contextObj.getGuid(),
                    		callback: dojoLang.hitch(this, function(guid) {
                        		this._updateRendering();
                    		})
                		});
					
					this._handles.push(objectHandle);
				}
				if(this.scroll === 'OnAttribute' || this.scroll === 'All'){
					var attrHandle = this.subscribe({
						guid: this._contextObj.getGuid(),
						attr: this._contextObj.get(this.scrollTo),
						callback: dojoLang.hitch(this, function(guid, attr, attrValue) {
							this._updateRendering();
						})
					});
					this._handles.push(attrHandle);
				}
				if(this.scroll === 'OnValidation' || this.scroll === 'All'){
					var validationHandle = this.subscribe({
                    	guid: this._contextObj.getGuid(),
						val: true,
                    	callback: dojoLang.hitch(this, this._updateRendering)
                	});
					this._handles.push(validationHandle);
				}
            }
        }
		
		
		
    });
});
require(['ScrollToAnchor/widget/ScrollToAnchor'], function () {
    'use strict';
});