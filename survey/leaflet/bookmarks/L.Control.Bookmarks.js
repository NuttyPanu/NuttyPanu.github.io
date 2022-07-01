/**
 * L.Control.Bookmarks v0.4.0
 * Leaflet plugin for user-generated bookmarks
 *
 * @author Alexander Milevski
 * @license MIT
 * @preserve
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('leaflet')) :
  typeof define === 'function' && define.amd ? define(['leaflet'], factory) :
  (global = global || self, (global.L = global.L || {}, global.L.Control = global.L.Control || {}, global.L.Control.Bookmarks = factory(global.L)));
}(this, (function (L) { 'use strict';

  L = L && Object.prototype.hasOwnProperty.call(L, 'default') ? L['default'] : L;

  /**
   * Substitutes {{ obj.field }} in strings
   *
   * @param  {String}  str
   * @param  {Object}  object
   * @param  {RegExp=} regexp
   * @return {String}
   */
  function substitute(str, object, regexp) {
    return str.replace(regexp || (/{{([\s\S]+?)}}/g), function(match, name) {
      name = trim(name);

      if (name.indexOf('.') === -1) {
        if (match.charAt(0) == '\\') { return match.slice(1); }
        return (object[name] != null) ? object[name] : '';

      } else { // nested
        var result = object;
        name = name.split('.');
        for (var i = 0, len = name.length; i < len; i++) {
          if (name[i] in result) { result = result[name[i]]; }
          else { return ''; }
        }
        return result;
      }
    });
  }

  var alpha = 'abcdefghijklmnopqrstuvwxyz';
  /**
   * Unique string from date. Puts character at the beginning,
   * for the sake of good manners
   *
   * @return {String}
   */
  function unique(prefix) {
    return (prefix || alpha[Math.floor(Math.random() * alpha.length)]) +
      (new Date()).getTime().toString(16);
  }

  /**
   * Trim whitespace
   * @param  {String} str
   * @return {String}
   */
  function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }

  /**
   * @type {Object}
   */
  var data = {};

  /**
   * Object based storage
   * @class Storage.Engine.Global
   * @constructor
   */
  var GlobalStorage = function GlobalStorage (prefix) {

    /**
     * @type {String}
     */
    this._prefix = prefix;
  };

  /**
   * @param{String} key
   * @param{Function} callback
   */
  GlobalStorage.prototype.getItem = function getItem (key, callback) {
    callback(data[this._prefix + key]);
  };

  /**
   * @param {String} key
   * @param {*}      item
   * @param {Function} callback
   */
  GlobalStorage.prototype.setItem = function setItem (key, item, callback) {
    data[this._prefix + key] = item;
    callback(item);
  };

  /**
   * @param{Function} callback
   */
  GlobalStorage.prototype.getAllItems = function getAllItems (callback) {
    var items = [];
    for (var key in data) {
      if (data.hasOwnProperty(key) && key.indexOf(this_prefix) === 0) {
        items.push(data[key]);
      }
    }
    callback(items);
  };

  /**
   * @param{String} key
   * @param{Function} callback
   */
  GlobalStorage.prototype.removeItem = function removeItem (key, callback) {
      var this$1 = this;

    this.getItem(key, function (item) {
      if (item) {
        delete data[this$1._prefix + key];
      } else {
        item = null;
      }
      if (callback) { callback(item); }
    });
  };

  /**
   * @const
   * @type {RegExp}
   */
  var JSON_RE = /^[\{\[](.)*[\]\}]$/;

  /**
   * LocalStoarge based storage
   */
  var LocalStorage = function LocalStorage (prefix) {
    /**
     * @type {String}
     */
    this._prefix = prefix;

    /**
     * @type {LocalStorage}
     */
    this._storage = window.localStorage;
  };

  /**
   * @param{String} key
   * @param{Function} callback
   */
  LocalStorage.prototype.getItem = function getItem (key, callback) {
    var item = this._storage.getItem(this._prefix + key);
    if (item && JSON_RE.test(item)) {
      item = JSON.parse(item);
    }
    callback(item);
  };

  /**
   * @param{Function} callback
   */
  LocalStorage.prototype.getAllItems = function getAllItems (callback) {
    var items = [];
    var prefixLength = this._prefix.length;
    for (var key in this._storage) {
      if (this._storage.getItem(key) !== null &&
        key.indexOf(this._prefix) === 0) {
        this.getItem(key.substring(prefixLength), function (item) { return items.push(item); });
      }
    }
    callback(items);
  };

  /**
   * @param{String} key
   * @param{Function} callback
   */
  LocalStorage.prototype.removeItem = function removeItem (key, callback) {
      var this$1 = this;

    var self = this;
    this.getItem(key, function (item) {
      this$1._storage.removeItem(self._prefix + key);
      if (callback) { callback(item); }
    });
  };

  /**
   * @param{String} key
   * @param{*}      item
   * @param{Function} callback
   */
  LocalStorage.prototype.setItem = function setItem (key, item, callback) {
    var itemStr = item.toString();
    if (itemStr === '[object Object]') {
      itemStr = JSON.stringify(item);
    }
    this._storage.setItem(this._prefix + key, itemStr);
    callback(item);
  };

  /**
   * @const
   * @enum {Number}
   */
  var EngineType = {
    // XHR: 1, // we don't have it included
    GLOBALSTORAGE: 2,
    LOCALSTORAGE: 3
  };

  /**
   * Persistent storage, depends on engine choice: localStorage/ajax
   * @param {String} name
   */
  var Storage = function Storage(name, engineType) {

    if (typeof name !== 'string') {
      engineType = name;
      name = unique();
    }

    /**
     * @type {String}
     */
    this._name = name;

    /**
     * @type {Storage.Engine}
     */
    this._engine = Storage.createEngine(engineType,
      this._name, Array.prototype.slice.call(arguments, 2));
  };

  /**
   * Engine factory
   * @param{Number} type
   * @param{String} prefix
   * @return {Storage.Engine}
   */
  Storage.createEngine = function createEngine (type, prefix, args) {
    if (type === EngineType.GLOBALSTORAGE) {
      return new GlobalStorage(prefix);
    }
    if (type === EngineType.LOCALSTORAGE) {
      return new LocalStorage(prefix);
    }
  };

  /**
   * @param {String} key
   * @param {*}      item
   * @param {Function} callback
   */
  Storage.prototype.setItem = function setItem (key, item, callback) {
    this._engine.setItem(key, item, callback);
    return this;
  };

  /**
   * @param{String} key
   * @param{Function} callback
   */
  Storage.prototype.getItem = function getItem (key, callback) {
    this._engine.getItem(key, callback);
    return this;
  };

  /**
   * @param{Function} callback
   */
  Storage.prototype.getAllItems = function getAllItems (callback) {
    this._engine.getAllItems(callback);
  };

  /**
   * @param{String} key
   * @param{Function} callback
   */
  Storage.prototype.removeItem = function removeItem (key, callback) {
    this._engine.removeItem(key, callback);
  };

  var modes = {
    CREATE: 1,
    UPDATE: 2,
    SHOW: 3,
    OPTIONS: 4
  };

  /**
   * New bookmark form popup
   *
   * @class  FormPopup
   * @extends {L.Popup}
   */
  var camAndroid='';

  if( /Android/i.test(navigator.userAgent)){
    camAndroid  = ' capture="camera" ';
    //alert('android');
  }

  var FormPopup = L.Popup.extend( /** @lends FormPopup.prototype */ {

    statics: { modes: modes },

    /**
     * @type {Object}
     */
    options: {
      mode: modes.CREATE,
      className: 'leaflet-bookmarks-form-popup',
      templateOptions: {
        formClass: 'leaflet-bookmarks-form',
        inputClass: 'leaflet-bookmarks-form-input',
        inputErrorClass: 'has-error',
        idInputClass: 'leaflet-bookmarks-form-id',
        coordsClass: 'leaflet-bookmarks-form-coords',
        submitClass: 'leaflet-bookmarks-form-submit',
        inputPlaceholder: 'รายละเอียด',
        removeClass: 'leaflet-bookmarks-form-remove',
        editClass: 'leaflet-bookmarks-form-edit',
        cancelClass: 'leaflet-bookmarks-form-cancel',
        editableClass: 'editable',
        removableClass: 'removable',
        menuItemClass: 'nav-item',
        editMenuText: 'แก้ไข',
        removeMenuText: 'ลบ',
        cancelMenuText: 'ยกเลิก',
        submitTextCreate: '+',
        submitTextEdit: '<span class="icon-checkmark"></span>'
      },
      generateNames: false,
      minWidth: 160,
      generateNamesPrefix: 'Bookmark ',
      template: '<form class="{{ formClass }}">' +
        '<div class="input-group"><input type="text" name="bookmark-name" ' +
        'placeholder="{{ inputPlaceholder }}" class="form-control {{ inputClass }}" value="{{ name }}">' +
        '<input type="hidden" class={{ idInputClass }} value="{{ id }}">' +
        '<button type="submit" class="input-group-addon {{ submitClass }}">' +
        '{{ submitText }}</button></div>' +
        '<div class="{{ coordsClass }}">{{ coords }}</div>' +
        '<input name="upload_img_local" style="margin-top:3px;" class="form-control form-control-sm" id="upload_img_local" type="file" accept=".jpg, .png, .jpeg, .gif" {{ camAndroid }}/>' +
        '<img style="display:block;" id="imgtmp" class="img-bookmark rounded mx-auto d-block img-fluid" style="max-height:128px;"/>' +
        '<img style="display:none!important;" id="imgtmp_history" class="img-bookmark rounded mx-auto d-block img-fluid" style="max-height:128px;"/>' +
        '</form>',
      menuTemplate: '<ul class="nav {{ mode }}" role="menu">' +
        '<li class="{{ editClass }}"><a href="#" class="{{ menuItemClass }}">{{ editMenuText }}</a></li>' +
        '<li class="{{ removeClass }}"><a href="#" class="{{ menuItemClass }}">{{ removeMenuText }}</a></li>' +
        '<li><a href="#" class="{{ menuItemClass }} {{ cancelClass }}">{{ cancelMenuText }}</a></li>' +
        '</ul>'
    },

    /**
     * @param  {Object}  options
     * @param  {L.Layer} source
     * @param  {Object=} bookmark
     *
     * @constructor
     */
    initialize: function(options, source, control, bookmark) {
      //console.log(this);
      /**
       * @type {Object}
       */
      this._bookmark = bookmark;

      /**
       * @type {L.Control.Bookmarks}
       */
      this._control = control;

      /**
       * @type {L.LatLng}
       */
      this._latlng = source.getLatLng();

      /**
       * For dragging purposes we're not maintaining the usual
       * link between the marker and Popup, otherwise it will simply be destroyed
       */
      source._popup_ = this;

      L.Popup.prototype.initialize.call(this, options, source);


    },

    /**
     * Add menu button
     */
    _initLayout: function() {
      L.Popup.prototype._initLayout.call(this);

      if (this.options.mode === modes.SHOW &&
        (this._bookmark.editable || this._bookmark.removable)) {

        var menuButton = this._menuButton =
          L.DomUtil.create('a', 'leaflet-popup-menu-button');
        this._container.insertBefore(menuButton, this._closeButton);
        menuButton.href = '#menu';
        menuButton.innerHTML = '<span class="menu-icon"></span>';
        L.DomEvent.disableClickPropagation(menuButton);
        L.DomEvent.on(menuButton, 'click', this._onMenuButtonClick, this);
      }
    },

    /**
     * Show options menu
     */
    _showMenu: function() {
      this._map.fire('bookmark:options', { data: this._bookmark });
    },

    /**
     * @param  {MouseEvent} evt
     */
    _onMenuButtonClick: function(evt) {
      L.DomEvent.preventDefault(evt);
      this._showMenu();
      this._close();
    },

    /**
     * Renders template only
     * @override
     */
    _updateContent: function() {
      //console.log('_updateContent');
      var content;
      if (this.options.mode === modes.SHOW) {
        content = this._control._getPopupContent(this._bookmark);
      } else {
        var template = this.options.template;
        var submitText = this.options.templateOptions.submitTextCreate;
        if (this.options.mode === modes.OPTIONS) {
          template = this.options.menuTemplate;
        }
        if (this.options.mode === modes.UPDATE) {
          submitText = this.options.templateOptions.submitTextEdit;
        }
        var modeClass = [];
        if (this._bookmark.editable) {
          modeClass.push(this.options.templateOptions.editableClass);
        }
        if (this._bookmark.removable) {
          modeClass.push(this.options.templateOptions.removableClass);
        }
        content = substitute(template,
          L.Util.extend({}, this._bookmark || {}, this.options.templateOptions, {
            submitText: submitText,
            coords: this.formatCoords(
              this._source.getLatLng(),
              this._map.getZoom()
            ),
            mode: modeClass.join(' ')
          }));
      }
      this._content = content;
      L.Popup.prototype._updateContent.call(this);
      this._onRendered();
    },

    /**
     * Form rendered, set up create or edit
     */
    _onRendered: function() {
      if (
        this.options.mode === modes.CREATE ||
        this.options.mode === modes.UPDATE
      ) {
        var form = this._contentNode.querySelector('.' +
          this.options.templateOptions.formClass);
        var input = form.querySelector('.' +
          this.options.templateOptions.inputClass);

        L.DomEvent.on(form, 'submit', this._onSubmit, this);
        setTimeout(this._setFocus.bind(this), 250);
      } else if (this.options.mode === modes.OPTIONS) {
        L.DomEvent.delegate(this._container,
          '.' + this.options.templateOptions.editClass,
          'click', this._onEditClick, this);
        L.DomEvent.delegate(this._container,
          '.' + this.options.templateOptions.removeClass,
          'click', this._onRemoveClick, this);
        L.DomEvent.delegate(this._container,
          '.' + this.options.templateOptions.cancelClass,
          'click', this._onCancelClick, this);
      }
    },

    /**
     * Set focus at the end of input
     */
    _setFocus: function() {
      var input = this._contentNode.querySelector('.' +
        this.options.templateOptions.inputClass);
      // Multiply by 2 to ensure the cursor always ends up at the end;
      // Opera sometimes sees a carriage return as 2 characters.
      var strLength = input.value.length * 2;
      input.focus();
      input.setSelectionRange(strLength, strLength);
    },

    /**
     * Edit button clicked
     * @param  {Event} evt
     */
    _onEditClick: function(evt) {
      L.DomEvent.preventDefault(evt);
      this._map.fire('bookmark:edit', { data: this._bookmark });
      this._close();
    },

    /**
     * Remove button clicked
     * @param  {Event} evt
     */
    _onRemoveClick: function(evt) {
      L.DomEvent.preventDefault(evt);
      this._map.fire('bookmark:remove', { data: this._bookmark });
      this._close();
    },

    /**
     * Back from options view
     * @param  {Event} evt
     */
    _onCancelClick: function(evt) {
      L.DomEvent.preventDefault(evt);
      this._map.fire('bookmark:show', { data: this._bookmark });
      this._close();
    },

    /**
     * Creates bookmark object from form data
     * @return {Object}
     */
    _getBookmarkData: function() {
      //console.log('_getBookmarkData');
      var options = this.options;
      if (options.getBookmarkData) {
        return options.getBookmarkData.call(this);
      }
      var input = this._contentNode.querySelector('.' +
        options.templateOptions.inputClass);
      var idInput = this._contentNode.querySelector('.' +
        options.templateOptions.idInputClass);
      /*
      var urlbase64 = this._contentNode.querySelector('.' +
        options.templateOptions.urlbase64Class);
      */

      //var default_img_base64 ='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';

      var imgori = document.getElementById("imgtmp");
      var default_img_base64_='';

      if(imgori.src == '' || !imgori.src){
        default_img_base64_ = '';
      }
      
      else if (imgori.src.indexOf('data:image/png;base64,') > -1) {
        //เป็นรูปเดิมที่เคยอัพไปแล้ว
        default_img_base64_ = imgori.src.split('base64,')[1];
      }
      
      else{
        var canvastmp = document.createElement("canvas");
        //canvastmp.width = imgori.width;
        //canvastmp.height = imgori.height;
        canvastmp.width = 64; // target width
        canvastmp.height = 64; // target height

        var ctx = canvastmp.getContext("2d");
        //ctx.drawImage(imgori, 0, 0);
        ctx.drawImage(imgori, 0, 0 ,canvastmp.width, canvastmp.height);

        // create a new base64 encoding
        var imgb64 = new Image();
        imgb64.src = canvastmp.toDataURL();

        //document.getElementById("preview").appendChild(imgb64);

        /* //example
        image.src = "data:image/png; base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABaFBMVEVMoUNNoURNokROokVPokZQo0dRpEhSpElTpUpUpUtVpk1Wpk1Xp09ZqFBZqFFaqFJbqVJbqVNdqlVeqlVeq1Zgq1hgrFhirFpirVtlrl5mr15nr2BpsGFqsWNssmRus2dvs2hwtGlxtGlytWtztWx4uHF5uXJ6uXR+u3d/vHiAvHqBvXqCvXyDvn2Evn6HwIGMw4aPxImRxYuUx46Vx5CWyJGbypacy5egzZuizp2kz5+kz6Cm0KGn0aKp0qSp0qWs1Kiu1Kmw1ayy1q602LC12LG627e83Lm+3bvF4cPI4sXJ48bK48jL5MjM5MrN5cvP5szQ5s7R58/S59DU6dLV6dPa7Nnf7t7g79/h79/i8OHj8OLk8ePm8uXn8ubp9Ojq9Onr9ers9evt9ezu9u3v9+7w9+/x+PDy+PHy+PL0+fP0+fT1+vX2+vX3+/f4+/j5/Pj5/Pn6/Pr7/fv9/v3+/v7+//7////VxbUKAAABVElEQVR4Ae3L65cKcQDH4e9YYe2utMnFsuu+rCyFKDVyKSTG/X6RVO5Ums+/r3HQOZz5zcyb7U3P+0drbcLKVRVF/DacVQSbnkL/oCJY+Axv4orgpAvOlMJYvJXU0GWgqBBSDd4ekhR7CINjClYGellJ21rwfocCWYUBcDUmHfkBj2IKlv4EPEhI54GKQlh4DjQOyKoBp2Syf1qemZtAN6PZV/Btr/xNdz5cnNeQVXKBK+uXvsNd+TsH9K4taujEF+D+1iw35uTP7gK4zlFL2vMCeL1vWUaJC208jzMbNFsHzijIxtPP8LzLz62z3UsKwTp+D8/Xyq7DUzKZ36nflq73AXpbZFSi49irKXm2lz9CVWZ3+KVVL6aT0ubcy90ye8JIs1ZYiStIYqVQa/JXXr4A/ZFMF+stPMsSYAojqVXbac+EDiPmwD/GH/431mAwhmA28RMGFbXqgVfHnwAAAABJRU5ErkJggg==";
        */
        default_img_base64_ = canvastmp.toDataURL().split('base64,')[1];

        /*
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg|gif|jpeg);base64,/, "");
        */

        //var default_img_base64_ = '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';
      }
      //console.error(default_img_base64_);
      //var urlbase64 = 'urlbase64';
      var urlbase64 = default_img_base64_;

      return {
        latlng: this._source.getLatLng(),
        zoom: this._map.getZoom(),
        name: input.value,
        id: idInput.value || unique(),
        imgbase64: urlbase64, //edit for image
      };
    },

    /**
     * Form submit, dispatch eventm close popup
     * @param {Event} evt
     */
    _onSubmit: function(evt) {
      console.log('_onSubmit');

      L.DomEvent.stop(evt);

      var input = this._contentNode.querySelector('.' +
        this.options.templateOptions.inputClass);
      input.classList.remove(this.options.templateOptions.inputErrorClass);

      if (input.value === '' && this.options.generateNames) {
        input.value = unique(this.options.generateNamesPrefix);
      }

      var validate = this.options.validateInput || (function () { return true; });

      if (input.value !== '' && validate.call(this, input.value)) {
        var bookmark = L.Util.extend({}, this._bookmark, this._getBookmarkData());
        var map = this._map;

        console.log(bookmark); 

        this._close();
        if (this.options.mode === modes.CREATE) {
          map.fire('bookmark:add', { data: bookmark });
        } else {
          map.fire('bookmark:edited', { data: bookmark });
        }
      } else {
        input.classList.add(this.options.templateOptions.inputErrorClass);
      }

      chksizelocalstorage();

    },

    /**
     * @param  {L.LatLng} coords
     * @param  {Number=}  zoom
     * @return {String}
     */
    formatCoords: function(coords, zoom) {
      if (this.options.formatCoords) {
        return this.options.formatCoords.call(this, coords, zoom);
      }
      return [coords.lat.toFixed(12), coords.lng.toFixed(12), zoom]
        .join(',&nbsp;');
    },

    /**
     * Hook to source movements
     * @param  {L.Map} map
     * @return {Element}
     */
    onAdd: function(map) {
      this._source.on('dragend', this._onSourceMoved, this);
      this._source.on('dragstart', this._onSourceMoveStart, this);
      return L.Popup.prototype.onAdd.call(this, map);
    },

    /**
     * @param  {L.Map} map
     */
    onRemove: function(map) {
      this._source.off('dragend', this._onSourceMoved, this);
      L.Popup.prototype.onRemove.call(this, map);
    },

    /**
     * Marker drag
     */
    _onSourceMoveStart: function() {
      console.log('_onSourceMoveStart'); // when move start
      //console.log(this._source);
      console.log(this._bookmark);//ข้อมูลoriginal
      console.log(this._getBookmarkData());//ข้อมูลที่อัพเดทตามหน้าpopup

      // store อัพเดทข้อมูลลงstore
      //this._bookmark = L.Util.extend(this._bookmark || {}, this._getBookmarkData());
      this._container.style.display = 'none';
    },

    /**
     * Marker moved
     * @param  {Event} e
     */
    _onSourceMoved: function(e) {
      console.log('_onSourceMoved'); // when moved
      //console.log(this._source);
      //console.log(e);
      console.log(e.target._popup_._bookmark);//ข้อมูลoriginal
      console.log(this._getBookmarkData());//ข้อมูลที่อัพเดทตามหน้าpopup
      console.log(this._bookmark);//ข้อมูลoriginal


      //console.log(e.target._popup_._bookmark.imgbase64);
      this._latlng = this._source.getLatLng();
      this._container.style.display = '';
      this._source.openPopup();
      this.update();
      
      //alert('move:'+e.target._popup_._bookmark.imgbase64);
      
      if(e.target._popup_._bookmark.imgbase64 != '' && e.target._popup_._bookmark.imgbase64  && e.target._popup_._bookmark.imgbase64.length > 64){
        document.getElementById('imgtmp').src = 'data:image/png;base64,'+e.target._popup_._bookmark.imgbase64;
        document.getElementById('imgtmp_history').src = 'data:image/png;base64,'+e.target._popup_._bookmark.imgbase64;
      }
      
      document.getElementById('upload_img_local').onchange = function () {
        try{
          var src1 = URL.createObjectURL(this.files[0]);
          document.getElementById('imgtmp').src = src1;
          //console.log('src1: '+src1);
        }catch (err){
          console.log(err.message);
          if(document.getElementById('imgtmp_history').src == ''){
            document.getElementById('imgtmp').removeAttribute('src');
          }
          else{
            document.getElementById('imgtmp').src = document.getElementById('imgtmp_history').src;
          }
        }
      }
      

    }
  });

  /**
   * Courtesy of https://github.com/component/matches-selector
   */
  var matchesSelector = (function (ElementPrototype) {
    var matches = ElementPrototype.matches ||
      ElementPrototype.webkitMatchesSelector ||
      ElementPrototype.mozMatchesSelector ||
      ElementPrototype.msMatchesSelector ||
      ElementPrototype.oMatchesSelector ||
      // hello IE
      function(selector) {
        var node = this,
          parent = (node.parentNode || node.document),
          nodes = parent.querySelectorAll(selector);

        for (var i = 0, len = nodes.length; i < len; ++i) {
          if (nodes[i] == node) { return true; }
        }
        return false;
      };

    /**
     * @param  {Element} element
     * @param  {String} selector
     * @return {Boolean}
     */
    return function(element, selector) {
      return matches.call(element, selector);
    };
  })(Element.prototype);

  /**
   * Courtesy of https://github.com/component/closest
   *
   * @param  {Element} element
   * @param  {String}  selector
   * @param  {Boolean} checkSelf
   * @param  {Element} root
   *
   * @return {Element|Null}
   */
  function closest(element, selector, checkSelf, root) {
    element = checkSelf ? {
      parentNode: element
    } : element;

    root = root || document;

    // Make sure `element !== document` and `element != null`
    // otherwise we get an illegal invocation
    while ((element = element.parentNode) && element !== document) {
      if (matchesSelector(element, selector)) { return element }
      // After `matches` on the edge case that
      // the selector matches the root
      // (when the root is not the document)
      if (element === root) { return null; }
    }
  }

  /**
   * Based on https://github.com/component/delegate
   *
   * @param  {Element}  el
   * @param  {String}   selector
   * @param  {String}   type
   * @param  {Function} fn
   *
   * @return {Function}
   */
  L.DomEvent.delegate = function(el, selector, type, fn, bind) {
    return L.DomEvent.on(el, type, function (evt) {
      var target = evt.target || evt.srcElement;
      evt.delegateTarget = closest(target, selector, true, el);
      if (evt.delegateTarget && !evt.propagationStopped) {
        fn.call(bind || el, evt);
      }
    });
  };

  // expose
  L.Util._template = L.Util._template || substitute;

  /**
   * Bookmarks control
   * @class  L.Control.Bookmarks
   * @extends {L.Control}
   */
  var Bookmarks = L.Control.extend( /**  @lends Bookmarks.prototype */ {

    statics: {
      Storage: Storage,
      FormPopup: FormPopup
    },

    /**
     * @type {Object}
     */
    options: {
      localStorage: true,

      /* you can provide access to your own storage,
       * xhr for example, but make sure it has all
       * required endpoints:
       *
       * .getItem(id, callback)
       * .setItem(id, callback)
       * .getAllItems(callback)
       * .removeItem(id, callback)
       */
      storage: null,
      name: 'leaflet-bookmarks',
      position: 'topright', // chose your own if you want

      containerClass: 'leaflet-bar leaflet-bookmarks-control',
      expandedClass: 'expanded',
      headerClass: 'bookmarks-header',
      listClass: 'bookmarks-list',
      iconClass: 'bookmarks-icon',
      iconWrapperClass: 'bookmarks-icon-wrapper',
      listWrapperClass: 'bookmarks-list-wrapper',
      listWrapperClassAdd: 'list-with-button',
      wrapperClass: 'bookmarks-container',
      addBookmarkButtonCss: 'add-bookmark-button',

      animateClass: 'bookmark-added-anim',
      animateDuration: 150,

      formPopup: {
        popupClass: 'bookmarks-popup'
      },

      bookmarkTemplate: '<li class="{{ itemClass }}" data-id="{{ data.id }}">' +
        '<span class="{{ removeClass }}">&times;</span>' +
        '<span class="{{ nameClass }}">{{ data.name }}</span>' +
        '<span class="{{ coordsClass }}">{{ data.coords }}</span>' +
        '</li>',

      emptyTemplate: '<li class="{{ itemClass }} {{ emptyClass }}">' +
        '{{ data.emptyMessage }}</li>',

      dividerTemplate: '<li class="divider"></li>',

      bookmarkTemplateOptions: {
        itemClass: 'bookmark-item',
        nameClass: 'bookmark-name',
        coordsClass: 'bookmark-coords',
        removeClass: 'bookmark-remove',
        emptyClass: 'bookmarks-empty'
      },

      defaultBookmarkOptions: {
        editable: true,
        removable: true
      },

      title: 'สถานที่ของคุณ',
      emptyMessage: 'ไม่มีรายการ',
      addBookmarkMessage: 'เพิ่มรายการใหม่',
      collapseOnClick: true,
      scrollOnAdd: true,
      scrollDuration: 1000,
      popupOnShow: true,
      addNewOption: true,

      /**
       * This you can change easily to output
       * whatever you have stored in bookmark
       *
       * @type {String}
       */
       //edit for image
      //popupTemplate: '<div><h5>{{ name }}</h5><p>{{ latlng }}, {{ zoom }}</p><img src="data:image/png;base64,{{ imgbase64 }}" class="img-bookmark rounded mx-auto d-block img-fluid" style="max-height:128px;"/></div>',
      
      popupTemplate: '<div><h5>{{ name }}</h5><p>{{ latlng }}, {{ zoom }}</p><img src="{{ imgbase64 }}" class="img-bookmark rounded mx-auto d-block img-fluid" style="max-height:128px;"/></div>',

      /**
       * Prepare your bookmark data for template.
       * If you don't change it, the context of this
       * function will be bookmarks control, so you can
       * access the map or other things from here
       *
       * @param  {Object} bookmark
       * @return {Object}
       */

      getPopupContent: function(bookmark) {
        //alert('getPopup:'+bookmark.imgbase64);
        return substitute(this.options.popupTemplate, {
          latlng: this.formatCoords(bookmark.latlng),
          name: bookmark.name,
          zoom: bookmark.zoom,
          imgbase64: chk_img_base64(bookmark.imgbase64)  //edit for image
          //zoom: this._map.getZoom()
        });
      }
    },

    /**
     * @param  {Object} options
     * @constructor
     */
    initialize: function(options) {

      options = options || {};

      /**
       * Bookmarks array
       * @type {Array}
       */
      this._data = [];

      /**
       * @type {Element}
       */
      this._list = null;

      /**
       * @type {L.Marker}
       */
      this._marker = null;

      /**
       * @type {HTMLElement}
       */
      this._addButton = null;

      /**
       * @type {Element}
       */
      this._icon = null;

      /**
       * @type {Boolean}
       */
      this._isCollapsed = true;

      L.Util.setOptions(this, options);

      /**
       * @type {Storage}
       */
      this._storage = options.storage ||
        (this.options.localStorage ?
          new Storage(this.options.name, EngineType.LOCALSTORAGE) :
          new Storage(this.options.name, EngineType.GLOBALSTORAGE));

      L.Control.prototype.initialize.call(this, this.options);
    },

    /**
     * @param {L.Map} map
     */
    onAdd: function(map) {
      var container = this._container = L.DomUtil.create('div',
        this.options.containerClass
      );

      L.DomEvent
        .disableClickPropagation(container)
        .disableScrollPropagation(container);
      container.innerHTML = '<div class="' + this.options.headerClass +
        '"><span class="' + this.options.iconWrapperClass + '">' +
        '<span class="' + this.options.iconClass + '"></span></span>';

      this._icon = container.querySelector('.' + this.options.iconClass);
      this._icon.title = this.options.title;

      this._createList(this.options.bookmarks);

      var wrapper = L.DomUtil.create('div',
        this.options.wrapperClass, this._container);
      wrapper.appendChild(this._listwrapper);

      this._initLayout();

      L.DomEvent
        .on(container, 'click', this._onClick, this)
        .on(container, 'contextmenu', L.DomEvent.stopPropagation);

      map
        .on('bookmark:new', this._onBookmarkAddStart, this)
        .on('bookmark:add', this._onBookmarkAdd, this)
        .on('bookmark:edited', this._onBookmarkEdited, this)
        .on('bookmark:show', this._onBookmarkShow, this)
        .on('bookmark:edit', this._onBookmarkEdit, this)
        .on('bookmark:options', this._onBookmarkOptions, this)
        .on('bookmark:remove', this._onBookmarkRemove, this)
        .on('resize', this._initLayout, this);

      return container;
    },

    /**
     * @param  {L.Map} map
     */
    onRemove: function(map) {
      //console.log('onRemove');
      map
        .off('bookmark:new', this._onBookmarkAddStart, this)
        .off('bookmark:add', this._onBookmarkAdd, this)
        .off('bookmark:edited', this._onBookmarkEdited, this)
        .off('bookmark:show', this._onBookmarkShow, this)
        .off('bookmark:edit', this._onBookmarkEdit, this)
        .off('bookmark:options', this._onBookmarkOptions, this)
        .off('bookmark:remove', this._onBookmarkRemove, this)
        .off('resize', this._initLayout, this);

      if (this._marker) { this._marker._popup_._close(); }

      if (this.options.addNewOption) {
        L.DomEvent.off(this._container.querySelector('.' +
            this.options.addBookmarkButtonCss), 'click',
          this._onAddButtonPressed, this);
      }

      this._marker = null;
      this._popup = null;
      this._container = null;
    },

    /**
     * @return {Array.<Object>}
     */
    getData: function() {

      return this._filterBookmarksOutput(this._data);
    },

    /**
     * @param  {Array.<Number>|Function|null} bookmarks
     */
    _createList: function(bookmarks) {
      var this$1 = this;
      //console.log(this$1)
      this._listwrapper = L.DomUtil.create(
        'div', this.options.listWrapperClass, this._container);
      this._list = L.DomUtil.create(
        'ul', this.options.listClass, this._listwrapper);

      // select bookmark
      L.DomEvent.delegate(
        this._list,
        '.' + this.options.bookmarkTemplateOptions.itemClass,
        'click',
        this._onBookmarkClick,
        this
      );

      this._setEmptyListContent();

      if (L.Util.isArray(bookmarks)) {
        this._appendItems(bookmarks);
      } else if (typeof bookmarks === 'function') {
        this._appendItems(bookmarks());
      } else {
        this._storage.getAllItems(function (bookmarks) { return this$1._appendItems(bookmarks); });
      }
    },

    /**
     * Empty list
     */
    _setEmptyListContent: function() {
      this._list.innerHTML = substitute(this.options.emptyTemplate,
        L.Util.extend(this.options.bookmarkTemplateOptions, {
          data: {
            emptyMessage: this.options.emptyMessage
          }
        }));
    },

    /**
     * Sees that the list size is not too big
     */
    _initLayout: function() {
      var size = this._map.getSize();
      this._listwrapper.style.maxHeight =
        Math.min(size.y * 0.6, size.y - 100) + 'px';

      if (this.options.position === 'topleft') {
        L.DomUtil.addClass(this._container, 'leaflet-bookmarks-to-right');
      }
      if (this.options.addNewOption) {
        var addButton = L.DomUtil.create('div', this.options.addBookmarkButtonCss);
        if (this._addButton === null) {
          this._listwrapper.parentNode.appendChild(addButton);
          this._addButton = addButton;
          this._listwrapper.parentNode
            .classList.add(this.options.listWrapperClassAdd);
          addButton.innerHTML = '<span class="plus">+</span>' +
            '<span class="content">' +
            this.options.addBookmarkMessage + '</span>';
          L.DomEvent.on(addButton, 'click', this._onAddButtonPressed, this);
        }
      }
    },

    /**
     * @param  {MouseEvent} evt
     */
    _onAddButtonPressed: function(evt) {
      console.log('_onAddButtonPressed');
      L.DomEvent.stop(evt);
      this.collapse();
      this._map.fire('bookmark:new', {
        latlng: this._map.getCenter()
      });

      document.getElementById('upload_img_local').onchange = function () {
        try{
          var src1 = URL.createObjectURL(this.files[0]);
          document.getElementById('imgtmp').src = src1;
          //console.log('src1: '+src1);
        }catch (err){
          console.log(err.message);
          document.getElementById('imgtmp').removeAttribute('src');
        }
      }


    },

    /**
     * I don't care if they're unique or not,
     * if you do - handle this
     *
     * @param {Array.<Object>} bookmarks
     * @return {Array.<Object>}
     */
    _filterBookmarks: function(bookmarks) {
      if (this.options.filterBookmarks) {
        return this.options.filterBookmarks.call(this, bookmarks);
      }
      return bookmarks;
    },

    /**
     * Filter bookmarks for output. This one allows you to save dividers as well
     *
     * @param {Array.<Object>} bookmarks
     * @return {Array.<Object>}
     */
    _filterBookmarksOutput: function(bookmarks) {
      if (this.options.filterBookmarksOutput) {
        return this.options.filterBookmarksOutput.call(this, bookmarks);
      }
      return bookmarks;
    },

    /**
     * Append list items(render)
     * @param  {Array.<Object>} bookmarks
     */
    _appendItems: function(bookmarks) {
      var html = '';
      var wasEmpty = this._data.length === 0;

      // maybe you have something in mind?
      bookmarks = this._filterBookmarks(bookmarks);

      // store
      this._data = this._data.concat(bookmarks);

      for (var i = 0, len = bookmarks.length; i < len; i++) {
        html += this._renderBookmarkItem(bookmarks[i]);
      }

      if (html !== '') {
        // replace `empty` message if needed
        if (wasEmpty) {
          this._list.innerHTML = html;
        } else {
          this._list.innerHTML += html;
        }
      }

      if (this._isCollapsed) {
        var container = this._container;
        var className = this.options.animateClass;
        container.classList.add(className);
        window.setTimeout(function() {
          container.classList.remove(className);
        }, this.options.animateDuration);
      } else {
        this._scrollToLast();
      }
    },

    /**
     * Scrolls to last element of the list
     */
    _scrollToLast: function() {
      var listwrapper = this._listwrapper;
      var pos = this._listwrapper.scrollTop;
      var targetVal = this._list.lastChild.offsetTop;

      var step = (targetVal - pos) / (this.options.scrollDuration / (1000 / 16));

      function scroll(timestamp) {
        //var progress = timestamp - start;

        pos = Math.min(pos + step, targetVal);
        listwrapper.scrollTop = pos;
        if (pos !== targetVal) {
          L.Util.requestAnimFrame(scroll);
        }
      }
      L.Util.requestAnimFrame(scroll);
    },

    /**
     * Render single bookmark item
     * @param  {Object} bookmark
     * @return {String}
     */
    _renderBookmarkItem: function(bookmark) {
      if (bookmark.divider) {
        return substitute(this.options.dividerTemplate, bookmark);
      }

      this.options.bookmarkTemplateOptions.data =
        this._getBookmarkDataForTemplate(bookmark);

      return substitute(
        this.options.bookmarkTemplate,
        this.options.bookmarkTemplateOptions
      );
    },

    /**
     * Extracts data and style expressions for item template
     * @param  {Object} bookmark
     * @return {Object}
     */
    _getBookmarkDataForTemplate: function(bookmark) {
      console.log('_getBookmarkDataForTemplate');
      if (this.options.getBookmarkDataForTemplate) {
        return this.options.getBookmarkDataForTemplate.call(this, bookmark);
      }
      return {
        coords: this.formatCoords(bookmark.latlng),
        name: this.formatName(bookmark.name),
        zoom: bookmark.zoom,
        id: bookmark.id,
        imgbase64: bookmark.urlbase64, //edit for image
      };
    },

    /**
     * @param  {L.LatLng} latlng
     * @return {String}
     */
    formatCoords: function(latlng) {
      
      if (this.options.formatCoords) {
        //console.log('in'+this.options.formatCoords);
        return this.options.formatCoords.call(this, latlng);
      }
      //console.log('edit'+latlng.lat); 
      try{
           return latlng[0].toFixed(12) + ',&nbsp;' + latlng[1].toFixed(12);   
      }
      catch (err){
           return latlng.lat.toFixed(12) + ',&nbsp;' + latlng.lng.toFixed(12);  
      }    

    },

    /**
     * @param  {String} name
     * @return {String}
     */
    formatName: function(name) {
      if (this.options.formatName) {
        return this.options.formatName.call(this, name);
      }
      return name;
    },

    /**
     * Shows bookmarks list
     */
    expand: function() {
      L.DomUtil.addClass(this._container, this.options.expandedClass);
      this._isCollapsed = false;
    },

    /**
     * Hides bookmarks list and the form
     */
    collapse: function() {
      L.DomUtil.removeClass(this._container, this.options.expandedClass);
      this._isCollapsed = true;
    },

    /**
     * @param  {Event} evt
     */
    _onClick: function(evt) {
      var expanded = L.DomUtil.hasClass(this._container, this.options.expandedClass);
      var target = evt.target || evt.srcElement;

      if (expanded) {
        if (target === this._container) {
          return this.collapse();
        }
        // check if it's inside the header
        while (target !== this._container) {
          if (L.DomUtil.hasClass(target, this.options.headerClass) ||
            L.DomUtil.hasClass(target, this.options.listWrapperClass)) {
            this.collapse();
            break;
          }
          target = target.parentNode;
        }
      } else { this.expand(); }
    },

    /**
     * @param  {Object} evt
     */

     //generate marker and content when click btn(add) on list bookmark
    _onBookmarkAddStart: function(evt) {

      if (this._marker) { this._popup._close(); }

      this._marker = new L.Marker(evt.latlng, {
        icon: this.options.icon || new L.Icon.Default(),
        draggable: true,
        riseOnHover: true
      }).addTo(this._map);

      this._marker.on('popupclose', this._onPopupClosed, this);

      // open form
      this._popup = new L.Control.Bookmarks.FormPopup(
        L.Util.extend(this.options.formPopup, {
          mode: L.Control.Bookmarks.FormPopup.modes.CREATE
        }),
        this._marker,
        this,
        L.Util.extend({}, evt.data, this.options.defaultBookmarkOptions)
      ).addTo(this._map);
    },

    /**
     * Bookmark added
     * @param  {Object} bookmark
     */
    _onBookmarkAdd: function(bookmark) {
      var this$1 = this;

      var map = this._map;
      bookmark = this._cleanBookmark(bookmark.data);
      this._storage.setItem(bookmark.id, bookmark, function (item) {
        map.fire('bookmark:saved', {
          data: item
        });
        this$1._appendItems([item]);
      });
      this._showBookmark(bookmark);
    },

    /**
     * Update done
     * @param  {Event} evt
     */
    _onBookmarkEdited: function(evt) {
      console.log('_onBookmarkEdited');
      var this$1 = this;

      var map = this._map;
      var bookmark = this._cleanBookmark(evt.data);
      this._storage.setItem(bookmark.id, bookmark, function (item) {
        map.fire('bookmark:saved', { data: item });
        var data = this$1._data;
        this$1._data = [];
        for (var i = 0, len = data.length; i < len; i++) {
          if (data[i].id === bookmark.id) {
            data.splice(i, 1, bookmark);
          }
        }
        this$1._appendItems(data);
      });
      this._showBookmark(bookmark);


    },

    /**
     * Cleans circular reference for JSON
     * @param  {Object} bookmark
     * @return {Object}
     */
    _cleanBookmark: function(bookmark) {
      if (!L.Util.isArray(bookmark.latlng)) {
        bookmark.latlng = [bookmark.latlng.lat, bookmark.latlng.lng];
      }
      return bookmark;
    },

    /**
     * Form closed
     * @param  {Object} evt
     */
    _onPopupClosed: function(evt) {
      //console.log('_onPopupClosed');
      this._map.removeLayer(this._marker);
      this._marker = null;
      this._popup = null;
    },

    /**
     * @param  {String} id
     * @return {Object|Null}
     */
    _getBookmark: function(id) {
      for (var i = 0, len = this._data.length; i < len; i++) {
        if (this._data[i].id === id) { return this._data[i]; }
      }
      return null;
    },

    /**
     * @param  {Object} evt
     */
    _onBookmarkShow: function(evt) {
      this._gotoBookmark(evt.data);
    },

    /**
     * Event handler for edit
     * @param  {Object} evt
     */
    _onBookmarkEdit: function(evt) {
      console.log('_onBookmarkEdit');
      console.log(evt.data);

      this._editBookmark(evt.data,evt.data.imgbase64); 

    },

    /**
     * Remove bookmark triggered
     * @param  {Event} evt
     */
    _onBookmarkRemove: function(evt) {
      this._removeBookmark(evt.data);
    },

    /**
     * Bookmark options called
     * @param  {Event} evt
     */
    _onBookmarkOptions: function(evt) {
      this._bookmarkOptions(evt.data);
    },

    /**
     * Show menu popup
     * @param  {Object} bookmark
     */
    _bookmarkOptions: function(bookmark) {
      var coords = L.latLng(bookmark.latlng);
      var marker = this._marker = this._createMarker(coords, bookmark);
      // open form
      this._popup = new L.Control.Bookmarks.FormPopup(
        L.Util.extend(this.options.formPopup, {
          mode: L.Control.Bookmarks.FormPopup.modes.OPTIONS
        }),
        marker,
        this,
        bookmark
      ).addTo(this._map);
    },

    /**
     * Call edit popup
     * @param  {Object} bookmark
     */
    _editBookmark: function(bookmark,imgbase64) {
      //รับค่ามา bookmark.imgbase64

      var coords = L.latLng(bookmark.latlng);
      var marker = this._marker = this._createMarker(coords, bookmark);
      marker.dragging.enable();
      // open form
      this._popup = new L.Control.Bookmarks.FormPopup(
        L.Util.extend(this.options.formPopup, {
          mode: L.Control.Bookmarks.FormPopup.modes.UPDATE
        }),
        marker,
        this,
        bookmark
      ).addTo(this._map);

      
      //alert('edit:'+bookmark.imgbase64);
      //console.log(imgbase64);

      if(bookmark.imgbase64 != '' && bookmark.imgbase64.length > 64){
        //alert('wow');
        document.getElementById('imgtmp').src = 'data:image/png;base64,'+bookmark.imgbase64;
        document.getElementById('imgtmp_history').src = 'data:image/png;base64,'+bookmark.imgbase64;
      }
      
      document.getElementById('upload_img_local').onchange = function () {
        try{
          var src1 = URL.createObjectURL(this.files[0]);
          document.getElementById('imgtmp').src = src1;
          //console.log('src1: '+src1);
        }catch (err){
          console.log(err.message);
          if(bookmark.imgbase64 == ''){
            document.getElementById('imgtmp').removeAttribute('src');
          }
          else{
            document.getElementById('imgtmp').src = 'data:image/png;base64,'+bookmark.imgbase64;
          }

          
        }
      }
      
    },

    /**
     * Returns a handler that will remove the bookmark from map
     * in case it got removed from the list
     * @param  {Object}   bookmark
     * @param  {L.Marker} marker
     * @return {Function}
     */
    _getOnRemoveHandler: function(bookmark, marker) {
      return function (evt) {
        console.log(evt);
        if (evt.data.id === bookmark.id) {
          marker.clearAllEventListeners();
          if (marker._popup_) { marker._popup_._close(); }
          this.removeLayer(marker);
        }
      };
    },

    /**
     * Creates bookmark marker
     * @param  {L.LatLng} coords
     * @param  {Object}   bookmark
     * @return {L.Marker}
     */
    _createMarker: function(coords, bookmark) {
      
      var this$1 = this;
      //console.log(this$1._map);
      var marker = new L.Marker(coords, {
        icon: this.options.icon || new L.Icon.Default(),
        riseOnHover: true
      }).addTo(this._map);

      var removeIfRemoved = this._getOnRemoveHandler(bookmark, marker);
      this._map.on('bookmark:removed', removeIfRemoved, this._map);

      marker
        //.on('popupclose', function () {  return this$1._map.removeLayer(this$1); })    
        .on('popupclose', function () {  return this$1._map.removeLayer(marker); })//edit
        .on('remove', function () { return this$1._map.off('bookmark:removed', removeIfRemoved); });

      return marker;
    },

    /**
     * Shows bookmark, nothing else
     * @param  {Object} bookmark
     */
    _showBookmark: function(bookmark) {
      console.log('_showBookmark');
      if (this._marker) { this._marker._popup_._close(); }
      var coords = L.latLng(bookmark.latlng);
      var marker = this._createMarker(coords, bookmark);
      var popup = new L.Control.Bookmarks.FormPopup(
        L.Util.extend(this.options.formPopup, {
          mode: L.Control.Bookmarks.FormPopup.modes.SHOW
        }),
        marker,
        this,
        bookmark
      );

      if (this.options.popupOnShow) { popup.addTo(this._map); /*alert('show popup');*/}
      this._popup = popup;
      this._marker = marker;

    },

    /**
     * @param  {Object} bookmark
     */
    _gotoBookmark: function(bookmark) {
      this._map.setView(bookmark.latlng, bookmark.zoom);
      this._showBookmark(bookmark);
    },

    /**
     * @param  {Object} bookmark
     */
    _removeBookmark: function(bookmark) {
      var this$1 = this;

      var remove = function (proceed) {
        if (!proceed) { return this$1._showBookmark(bookmark); }

        this$1._data.splice(this$1._data.indexOf(bookmark), 1);
        this$1._storage.removeItem(bookmark.id, function (bookmark) {
          this$1._onBookmarkRemoved(bookmark);
        });
      };

      if (typeof this.options.onRemove === 'function') {
        this.options.onRemove(bookmark, remove);
      } else {
        remove(true);
      }
    },

    /**
     * @param  {Object} bookmark
     */
    _onBookmarkRemoved: function(bookmark) {
      var this$1 = this;

      var li = this._list.querySelector('.' +
          this.options.bookmarkTemplateOptions.itemClass +
          "[data-id='" + bookmark.id + "']");

      this._map.fire('bookmark:removed', { data: bookmark });

      if (li) {
        L.DomUtil.setOpacity(li, 0);
        setTimeout(function () {
          if (li.parentNode) { li.parentNode.removeChild(li); }
          if (this$1._data.length === 0) { this$1._setEmptyListContent(); }
        }, 250);
      }
    },

    /**
     * Gets popup content
     * @param  {Object} bookmark
     * @return {String}
     */
    _getPopupContent: function(bookmark) {
      if (this.options.getPopupContent) {
        return this.options.getPopupContent.call(this, bookmark);
      }
      return JSON.stringify(bookmark);
    },

    /**
     * @param  {Event} e
     */
    _onBookmarkClick: function(evt) {
      console.log('_onBookmarkClick');
      var bookmark = this._getBookmarkFromListItem(evt.delegateTarget);
      if (!bookmark) { return; }
      L.DomEvent.stopPropagation(evt);

      // remove button hit
      if (L.DomUtil.hasClass(evt.target || evt.srcElement,
          this.options.bookmarkTemplateOptions.removeClass)) {
        this._removeBookmark(bookmark);
      } else {
        this._map.fire('bookmark:show', { data: bookmark });
        if (this.options.collapseOnClick) { this.collapse(); }
      }
    },

    /**
     * In case you've decided to play with ids - we've got you covered
     * @param  {Element} li
     * @return {Object|Null}
     */
    _getBookmarkFromListItem: function(li) {
      if (this.options.getBookmarkFromListItem) {
        return this.options.getBookmarkFromListItem.call(this, li);
      }
      return this._getBookmark(li.getAttribute('data-id'));
    },

    /**
     * GeoJSON feature out of a bookmark
     * @param  {Object} bookmark
     * @return {Object}
     */
    bookmarkToFeature: function(bookmark) {
      var coords = this._getBookmarkCoords(bookmark);
      bookmark = JSON.parse(JSON.stringify(bookmark)); // quick copy
      delete bookmark.latlng;

      return L.GeoJSON.getFeature({
        feature: {
          type: 'Feature',
          id: bookmark.id,
          properties: bookmark
        }
      }, {
        type: 'Point',
        coordinates: coords
      });
    },

    /**
     * @param  {Object} bookmark
     * @return {Array.<Number>}
     */
    _getBookmarkCoords: function(bookmark) {
      if (bookmark.latlng instanceof L.LatLng) {
        return [bookmark.latlng.lat, bookmark.latlng.lng];
      }
      return bookmark.latlng.reverse();
    },

    /**
     * Read bookmarks from GeoJSON FeatureCollectio
     * @param  {Object} geojson
     * @return {Object}
     */
    fromGeoJSON: function(geojson) {
      var bookmarks = [];
      for (var i = 0, len = geojson.features.length; i < len; i++) {
        var bookmark = geojson.features[i];
        if (!bookmark.properties.divider) {
          bookmark.properties.latlng = bookmark.geometry
            .coordinates.concat().reverse();
        }
        bookmarks.push(bookmark.properties);
      }
      return bookmarks;
    },

    /**
     * @return {Object}
     */
    toGeoJSON: function() {
      var this$1 = this;

      return {
        type: 'FeatureCollection',
        features: (function (data) {
          var result = [];
          for (var i = 0, len = data.length; i < len; i++) {
            if (!data[i].divider) {
              result.push(this$1.bookmarkToFeature(data[i]));
            }
          }
          return result;
        })(this._data)
      };
    }
  });

  L.Control.Bookmarks = Bookmarks;

  return Bookmarks;

})));
//# sourceMappingURL=L.Control.Bookmarks.js.map


 function chk_img_base64(img){
    if(img != '' && img.length > 64){
      return 'data:image/png;base64,'+img;
    }else{
      //alert(img);
      return '';
    } 
 }


