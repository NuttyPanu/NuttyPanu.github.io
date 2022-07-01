var statLocateMouse=0;

L.Control.MousePosition = L.Control.extend({
  options: {
    position: 'bottomleft',
    separator: ' : ',
    //emptyString: 'Unavailable',
    emptyString: '',
    lngFirst: false,
    numDigits: 5,
    lngFormatter: undefined,
    latFormatter: undefined,
    prefix: ""
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
    L.DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML=this.options.emptyString;
    return this._container;
  },

  onRemove: function (map) {
    map.off('mousemove', this._onMouseMove)
  },

  _onMouseMove: function (e) {
    var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
    var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);

    var value = this.options.lngFirst ? lng +this.options.separator + lat :  'lat: '+lat +' , ' + 'lng: '+ lng;
    //var value = this.options.lngFirst ? lng +this.options.separator + lat :  'lat-'+lat + this.options.separator + 'lng-'+ lng;

    var prefixAndValue = this.options.prefix + ' ' + value;

    //console.log(e.latlng.utm().toString({decimals: 0, format: '{x} {y} {zone} {hemi}'}));
    var UTM = e.latlng.utm().toString({decimals: 0, format: 'x: {x} , y: {y} (zone{zone})'});
    //console.log(e.latlng.utm().toString({decimals: 0, format: '{x} {y} {sep} {zone}{band} {hemi} {sep} {datum}'}));
    //console.log(e.latlng.utm());
    //$('div.leaflet-control-mouseposition leaflet-control').remove();
    //this._container.innerHTML = '<div id="ControlDesc">ระบบพิกัด: WGS84 <a onclick="changeControllocateMouse();">(-)</a></div><div id="controlLatLng">'+prefixAndValue+'</div><div id="controlUtm">'+UTM+'</div>';    
    //this._container.innerHTML = 'ระบบพิกัด: WGS84<br>'+prefixAndValue+'<br>'+UTM;

    if(statLocateMouse == 0){
      this._container.innerHTML = '<div id="ControlDesc">ระบบพิกัด: WGS84 <a style="cursor:pointer;" onclick="changeControllocateMouse();"><span id="lbltxt" title="แสดง/ซ่อน ค่าพิกัด">(-)</span></a></div><div id="controlLatLng">'+prefixAndValue+'</div><div id="controlUtm">'+UTM+'</div>';    
      statLocateMouse=1;
    }
    else{
      $('#controlLatLng').html(prefixAndValue);
      $('#controlUtm').html(UTM);
    }


  }

});

function changeControllocateMouse(){
 //console.log('ok');
 
 /*
  if($('#ControlDesc').html() == 'ระบบพิกัด: WGS84 <a style="cursor:pointer;" onclick="changeControllocateMouse();">(-)</a>'){

      $('#controlLatLng').hide();
      $('#controlUtm').hide();
      $('#ControlDesc').html('ระบบพิกัด: WGS84 <a style="cursor:pointer;" onclick="changeControllocateMouse();">(+)</a>');
  }
  else{   
 
      $('#controlLatLng').show();
      $('#controlUtm').show();
      $('#ControlDesc').html('ระบบพิกัด: WGS84 <a style="cursor:pointer;" onclick="changeControllocateMouse();">(-)</a>');
  }
  */
  if($('#controlUtm').css('display') == 'none'){
      $('#controlLatLng').show();
      $('#controlUtm').show();
      $('#lbltxt').html('(-)');

  }
  else{
      $('#controlLatLng').hide();
      $('#controlUtm').hide();
      $('#lbltxt').html('(+)');
  }


}


L.Map.mergeOptions({
    positionControl: false
});

L.Map.addInitHook(function () {
    if (this.options.positionControl) {
        this.positionControl = new L.Control.MousePosition();
        this.addControl(this.positionControl);
    }

});

L.control.mousePosition = function (options) {
    return new L.Control.MousePosition(options);
};
