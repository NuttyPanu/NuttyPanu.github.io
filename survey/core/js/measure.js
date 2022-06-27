// Load the Visualization API and the columnchart package.
//google.load('visualization', '1', {packages: ['columnchart']});
	

var del_draw,obj_draw;
var drawFrom = '';
var drawnItems = new L.FeatureGroup();
var drawnItems_2 = new L.FeatureGroup();
var drawControl = new L.Control.Draw({
		edit: {
		featureGroup: drawnItems,
                featureGroup: drawnItems_2
		}
	});

var path;
var path_for_marker;
var dma_polygon;
var dma_popup;


var popup_1;
var height_polyline;

var popup_new ='<div id="chart-elevation" style="width: 300px; ">Loading...</div>'+
					'<a onclick="map.removeLayer(height_polyline);  map.removeLayer(route); map.closePopup();">ลบ</a>';
var height_polyline_new = L.polyline([],{color: 'red'}).bindPopup(popup_new);//

var elevation_coor;
var elevation_popup;
var route;

var arrlabel = [];
var arrsample = [];
var arrlatlng = [];
var arrheight = [];

var c_btn=1;

$(document).ready(function() {

  $('#measure_line').click(function(){
	  	$("#pano").hide();
		if( c_btn == 2){
			obj_draw.disable();
			c_btn =1;
		}

		$('#toggle-trigger1').bootstrapToggle('off') ;
		$('#toggle-trigger').bootstrapToggle('off') ;
		map.off('click', stview);
		map.off('click', sheight);
		map.off('click', share_location);

		if (ch==1){
			map.removeLayer(AddMarker1); // remove
		}

		if (c==1){
			map.removeLayer(AddMarker); // remove
		}

	  //clr_obj();
		drawFrom='measure_line';
		$('.leaflet-container').css('cursor','crosshair');
	  //$('.leaflet-container').css('cursor','');
		obj_draw=new L.Draw.Polyline(map, {shapeOptions: {
		color: '#97009c'}
		});
        obj_draw.enable();
		c_btn += 1;
  }) 

  //$('#measure_polyline').click(function()
  $('button[title="คำนวณระยะทาง"]').click(function(){
  		//alert('measure');
	  	//$("#pano").hide();
		if( c_btn == 2){
			obj_draw.disable();
			c_btn =1;
		}

		//$('#toggle-trigger1').bootstrapToggle('off') ;
		//$('#toggle-trigger').bootstrapToggle('off') ;
		//map.off('click', stview);
		//map.off('click', sheight);
		//map.off('click', share_location);

		/*
		if (ch==1){
			map.removeLayer(AddMarker1); // remove
		}

		if (c==1){
			map.removeLayer(AddMarker); // remove
		}
		*/

	  //clr_obj();
		drawFrom='measure_polyline';
		$('.leaflet-container').css('cursor','crosshair');
	  //$('.leaflet-container').css('cursor','');
	  	
		obj_draw=new L.Draw.Polyline(map, {shapeOptions: {
		color: '#97009c'},metric: true,feet: false,nautic: false,showLength: true
		});
		

		/*
		obj_draw=new L.Draw.Polyline(map, {
			shapeOptions: {
				color: '#97009c',
				weight: 3,
				opacity: 0.5,
				smoothFactor: 1

			}
		});
		*/

        obj_draw.enable();
		c_btn += 1;
  }) 


//$('#measure_polygon').click(function()
  $('button[title="คำนวณพื้นที่').click(function(){
  		/*
		if(upwa.substr(0, 1) == 'p'){
			zoompwa_for_measure_polygon();
		}
		else{
			$('#analysis_modal').modal();
			zoompwa_for_measure_polygon();
		}

	  	$("#pano").hide();
	  	*/
		if( c_btn == 2){
			obj_draw.disable();
			c_btn =1;
		}

		/*
		$('#toggle-trigger1').bootstrapToggle('off') ;
		$('#toggle-trigger').bootstrapToggle('off') ;
		map.off('click', stview);
		map.off('click', sheight);
		map.off('click', share_location);
		if (ch==1){
			map.removeLayer(AddMarker1); // remove
		}

		if (c==1){
			map.removeLayer(AddMarker); // remove
		}
		*/
		
	  //clr_obj();
		drawFrom='measure_polygon';
		$('.leaflet-container').css('cursor','crosshair');
	  //$('.leaflet-container').css('cursor','');
		obj_draw=new L.Draw.Polygon(map, {shapeOptions: {
		color: '#97009c'},showArea: true,metric: true
		});
        obj_draw.enable();
		c_btn += 1;
  }) 


  $('#elevation_profile').click(function(){

	  	$("#pano").hide();
		if( c_btn == 2){
			obj_draw.disable();
			c_btn =1;
		}

		$('#toggle-trigger1').bootstrapToggle('off') ;
		$('#toggle-trigger').bootstrapToggle('off') ;
		map.off('click', stview);
		map.off('click', sheight);
		map.off('click', share_location);
		if (ch==1){
			map.removeLayer(AddMarker1); // remove
		}

		if (c==1){
			map.removeLayer(AddMarker); // remove
		}

		drawFrom='elevation_profile';
		$('.leaflet-container').css('cursor','crosshair');

		obj_draw=new L.Draw.Polyline(map, {shapeOptions: {
		color: 'red'}
		});
        obj_draw.enable();		
		c_btn += 1;
  }) 


  L.Draw.Polyline.prototype.addVertex = function (latlng) {

	  console.log(latlng);
            var markersLength = this._markers.length;

            // markersLength must be greater than or equal to 2 before intersections can occur

            if (markersLength >= 2 && !this.options.allowIntersection && this._poly.newLatLngIntersects(latlng)) {
                this._showErrorTooltip();
                //console.log(this._showErrorTooltip());
                return;
            }
            else if (this._errorShown) {
                this._hideErrorTooltip();
            }

            this._markers.push(this._createMarker(latlng));

            this._poly.addLatLng(latlng);

            if (this._poly.getLatLngs().length === 2) {
                this._map.addLayer(this._poly);
            }

            this._vertexChanged(latlng, true);

            markersLength = this._markers.length;
            if (markersLength == 2 && (drawFrom=='draw_line' || drawFrom=='measure_line' )) {
                this._fireCreatedEvent();
                this.disable();
            }
};

			
});

//map.on('draw:cursor-move', function (e, latlng, options) { console.log(latlng); })
map.on(L.Draw.Event.DRAWSTART, function(event) {
	console.log(event);

	//L.drawLocal.draw.handlers.polygon.tooltip.start = "<your text here>";
	//L.drawLocal.draw.handlers.polyline.tooltip.start = "คลิกจุดบนแผนที่เพื่อวาดเส้น/กดปุ่ม esc เพื่อยกเลิก";
	//event.tooltip='';
});

map.on(L.Draw.Event.DRAWVERTEX, function(event) {
	console.log(event);
});
map.on(L.Draw.Event.DRAWSTOP, function(event) {
	console.log(event);
});




map.on(L.Draw.Event.CREATED, function(event) {

	c_btn -= 1;

	clr_obj();

	var layer = event.layer;
	var coor = layer.getLatLngs();
	//var coorpoly1 = layer.getLatLngs()[0].lat;
	//var coorpoly1 = layer.getLatLngs()[0].lng;
	//var count = layer.getLatLngs().length;
	//console.log(count);
	//console.log(coorpoly1);

	//alert(coor);
	if (drawFrom == 'measure_line'){
			//count_function(3);
			//map.off('click', share_location);
			var m_line =L.polyline(coor,{color: '#97009c'}).addTo(map).showMeasurements();
			m_line.on('click', function (e) {
			map.removeLayer(m_line);
			});
			//m_line.bindTooltip('คลิกเพื่อลบเส้น');
	}
	else if (drawFrom == 'measure_polyline'){
			//count_function(3);
			//map.off('click', share_location);
			var m_polyline = L.polyline(coor,{color: '#97009c',metric: true,feet: false,nautic: false,showLength: true}).addTo(map).showMeasurements();
			m_polyline.on('click', function (e) {
			map.removeLayer(m_polyline);
			});
			m_polyline.bindTooltip('คลิกเพื่อลบเส้น');
	}

	else if (drawFrom == 'elevation_profile'){
		count_function(5);
		map.off('click', share_location);
		
		if(height_polyline != null){
			map.removeLayer(height_polyline);
			map.removeLayer(route); 
			map.closePopup();
		}
		else{
		}
		if(hg != null){
			geojson_profile.clearLayers(); 
			map.removeControl(hg); 
			map.closePopup();
		}
		else{
		}

		//alert(coor);
		path = [];
		path_for_marker = [];

		$.each(coor,function(key,value){
			//console.log(key + ": " + value);
			var Obj = {              
				lat: value.lat,
				lng: value.lng
			}; 

			var Obj2 = [              
				value.lat,
				value.lng
			]; 

			path.push(Obj);
			path_for_marker.push(Obj2);
		});	

			//alert(coor);

			//var txt_coor = ','+coor;
			//var Arraycoor = txt_coor.split(',LatLng(');

			//path = [];
			/*
			for (i = 1; i <= Arraycoor.length; i++) {
					var tmp = Arraycoor[i];
					tmp = Arraycoor[1].replace(')' , '');
					tmp = tmp.replace(',' , ', lng:');


					//var obj = jQuery.parse( '{ "lat": "John" }' );
					//var obj = jQuery.parseJSON( '{lat: '+tmp+'}');
					//console.log( obj[0].lat);
					//console.log( obj[0].lng);



					path.push('{lat: '+tmp+'}');
			}

			console.log(path.toString());
			console.log(path);
			*/
			/*
			var Obj = {              
				lat: 17.39258, 
				lng: 95.07568
			}; 

			var Obj1 = {              
				lat: 17.39258, 
				lng: 96.07568
			}; 

			path.push(Obj);
			path.push(Obj1);

			console.log(path);
			*/
			


		// Create an ElevationService.
		var elevator1 = new google.maps.ElevationService;


			//dispaly marker
			//var marker = new L.marker(latlng).addTo(map);

			//var popup = L.popup()
			//    .setLatLng(latlng)
			//    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
			//    .openOn(map);

			/*
			// Draw the path, using the Visualization API and the Elevation service.
			//var m_polyline = L.polyline(coor,{color: '#97009c'}).addTo(map).showMeasurements();
			var m_polyline = L.polyline(coor,{color: 'red'}).addTo(map).showMeasurements();
			m_polyline.on('click', function (e) {
			map.removeLayer(m_polyline);
			});
			*/

			elevation_coor = coor;
			// Create a PathElevationRequest object using this array.
			// Ask for 256 samples along that path.
			// Initiate the path request.
			elevator1.getElevationAlongPath({
				'path': path,
				'samples': 100
				//'samples': 256
			}, plotElevation);
			
	}

	else if (drawFrom == 'measure_polygon'){
		//count_function(4);
		//alert(coor);

		var txt_coor = ','+coor;

		//alert(txt_coor);

		var res = txt_coor.split(',LatLng(');

		//alert(res.length);

		if(res.length >= 4){

			 var coorpolygon ='POLYGON((';

  			 for (i = 1; i <= res.length; i++) {
				if(i == res.length){
					var tmp1 = res[1].replace(',' , '');
					tmp1 = tmp1.replace(')' , '');
                    //alert(i+'_last '+tmp1);
					tmp1 = tmp1.split(' ');
					tmp1 = tmp1[1]+' '+tmp1[0];
					coorpolygon+= tmp1+'))';
				}
                else{
                    var tmp = res[i].replace(',' , '');
                    tmp = tmp.replace(')' , '');
                    //alert(i+' '+tmp);
					tmp = tmp.split(' ');
					tmp = tmp[1]+' '+tmp[0];
					coorpolygon += tmp+',';
			       }
			}
			//alert(coorpolygon);

			//var reg = '2';
			//var pwacode = '5541026';
			//var coorpolygon = 'POLYGON((100.59591634199026 13.999026485541505,100.5953178741038 13.979813030432227,100.62829261645678 13.979680614755091,100.62734160572292 13.998357304677876,100.59591634199026 13.999026485541505))';
			
			//var reg = $( "#reg_no option:selected" ).val();
			//var pwacode =	 $( "#branch option:selected" ).val();	
	
			/*
			var reg = $( "[name='reg_no'] option:selected" ).val();
			var pwacode =	 $( "[name='branch'] option:selected" ).val();	
				

			if (reg == 0){
				alert('โปรดเลือกเขต');	
				
				return;
			}
			else if (pwacode == 'เลือกสาขา'){
				alert('โปรดเลือกสาขา');	
				return;
			}		
			*/

			var popup;
			dma_polygon=  L.polygon(coor,{color: '#97009c',showArea: true,metric: true,}).addTo(map).showMeasurements();//
			var id = dma_polygon._leaflet_id;
			/*
			//var coorpolygon ='POLYGON((100.59591634199026%2013.999026485541505,100.5953178741038%2013.979813030432227,100.62829261645678%2013.979680614755091,100.62734160572292%2013.998357304677876,100.59591634199026%2013.999026485541505))';
			$.ajax({
					type:"POST",			
					url:"./query/q_meterstat_by_polygon.php",
					async:false,
					data: {reg: reg, pwa_code: pwacode, coor: coorpolygon},
					//jsonp: 'callback',
					error: function(xhr, errorString, exception) {
						alert(xhr+" "+errorString+" "+exception);
					},
					success: function(res){		

						$.each(res, function() {

							if(!this.meter_count || this.meter_count == 0){
								//alert('ไม่พบมาตรฯ โปรดตรวจสอบการเลือก กปภ.ข. และกปภ.สาขา อีกครั้ง');			
								popup = '<label>พื้นที่ '+this.pwa_name+'</label><br>'+
									'จำนวนมาตร: 0 <br>'+
										'<table>'+
											'<thead>'+
												'<tr>'+
													'<th class="col-md-3" style="text-align:center;"></th> '+
													'<th class="col-md-3" style="text-align:center;">'+m+'</th>'+ 
													'<th class="col-md-3" style="text-align:center;">'+m1+'</th> '+
													'<th class="col-md-3" style="text-align:center;">'+m2+'</th> '+
												'</tr>'+
											'</thead>'+
											'<tbody>'+
												'<tr>'+
													'<td class="col-md-3" style="text-align:center;">หน่วยน้ำรวม</td> '+
													'<td class="col-md-3" style="text-align:center;"></td>'+ 
													'<td class="col-md-3" style="text-align:center;"></td> '+
													'<td class="col-md-3" style="text-align:center;"></td> '+
												'</tr>'+
												'<tr>'+
													'<td class="col-md-3" style="text-align:center;">หน่วยน้ำเฉลี่ย</td> '+
													'<td class="col-md-3" style="text-align:center;"></td>'+ 
													'<td class="col-md-3" style="text-align:center;"></td> '+
													'<td class="col-md-3" style="text-align:center;"></td> '+
												'</tr>'+
											'</tbody>'+
										'</table>'+
										'<br>'+
										'<a onclick="map.removeLayer(map._layers['+id+']); map.closePopup();">ลบ</a>';

							}
							else{
						
								popup = '<label>พื้นที่ '+this.pwa_name+'</label><br>';
								//popup = '<label>กปภ.ข.'+this.reg+' '+ 'กปภ.สาขา'+this.pwa_name+' ('+this.pwa_code+')</label><br>'+
										
										//'จำนวนมาตร: '+addCommas(this.meter_count)+'<br>'+
										//'หน่วยน้ำรวมเดือนล่าสุด: '+addCommas(this.s_prswtusg)+'<br>'+
										//'หน่วยน้ำเฉลี่ยเดือนล่าสุด: '+addCommas(parseFloat(this.a_prswtusg).toFixed(2))+'<br>'+
										//'<a onclick="map.removeLayer(map._layers['+id+']); map.closePopup();">ลบ</a>';
										
								//2021-09-08
								if (this.meter_count<=1000){
									popup +='จำนวนมาตร: <a href="#" OnClick="ListMeterByPolygon('+reg+',\''+pwacode+"','"+coorpolygon+"','"+this.pwa_name+'\');" >'+addCommas(this.meter_count)+'</a><br>';
								}else{
									popup +='จำนวนมาตร: '+addCommas(this.meter_count)+'<br>';
								}
										
								popup +=		'<table >'+
											'<thead>'+
												'<tr>'+
													'<th class="col-md-3" style="text-align:center;"></th> '+
													'<th class="col-md-3" style="text-align:center;">'+m+'</th>'+ 
													'<th class="col-md-3" style="text-align:center;">'+m1+'</th> '+
													'<th class="col-md-3" style="text-align:center;">'+m2+'</th> '+
												'</tr>'+
											'</thead>'+
											'<tbody>'+
												'<tr>'+
													'<td class="col-md-3" style="text-align:center;">หน่วยน้ำรวม</td> '+
													'<td class="col-md-3" style="text-align:center;">'+addCommas(this.s_prswtusg)+'</td>'+ 
													'<td class="col-md-3" style="text-align:center;">'+addCommas(this.s_lstwtusg1)+'</td> '+
													'<td class="col-md-3" style="text-align:center;">'+addCommas(this.s_lstwtusg2)+'</td> '+
												'</tr>'+
												'<tr>'+
													'<td class="col-md-3" style="text-align:center;">หน่วยน้ำเฉลี่ย</td> '+
													'<td class="col-md-3" style="text-align:center;">'+addCommas(parseFloat(this.a_prswtusg).toFixed(2))+'</td>'+ 
													'<td class="col-md-3" style="text-align:center;">'+addCommas(parseFloat(this.a_lstwtusg1).toFixed(2))+'</td> '+
													'<td class="col-md-3" style="text-align:center;">'+addCommas(parseFloat(this.a_lstwtusg2).toFixed(2))+'</td> '+
												'</tr>'+
											'</tbody>'+
										'</table>'+									
										'<br>'+
										'<a href="#" onclick="map.removeLayer(map._layers['+id+']); map.closePopup();">ลบ</a>';

								
							}


						});		

					}		
			});
			*/

		}
		else{
			 alert('จุดของท่านไม่เพียงพอต่อการสร้างรูปปิด');
		}


			//LatLng(17.70683, 95.42725),LatLng(14.75364, 97.20703),LatLng(15.9402, 93.64746),LatLng(16.84661, 93.58154)

			//POLYGON((100.49074944108726 13.740431827761324, 13.735061936089478,100.49074944108726 13.740431827761324))

			//var poly1 = L.polygon(coordinatesForPolygon1).bindPopup('One');
			//var m_polygon= L.polygon(coor,{color: '#97009c'}).bindTooltip("My polygon",{permanent: true, direction:"center"}).addTo(map);//				
			//var m_polygon= L.polygon(coor,{color: '#97009c'}).bindPopup("My polygon").addTo(map);//
			//var m_polygon= L.polygon(coor,{color: '#97009c'}).addTo(map).showMeasurements();//.bindTooltip("My polygon",{permanent: true, direction:"center"}).openTooltip();
			//dma_polygon= L.polygon(coor,{color: '#97009c'}).bindPopup(popup).addTo(map).openPopup();//

			//dma_polygon=  L.polygon(coor,{color: '#97009c'}).bindPopup(popup).addTo(map);//
			//dma_polygon.showMeasurements();//

			//dma_polygon.bindPopup(popup).addTo(map);//
			popup = '<a href="" onclick="dma_popup.remove();map.removeLayer(dma_polygon);return false;">ลบ</a>';
			dma_polygon.bindPopup(popup)//
			dma_polygon.showMeasurements();//
			//alert(dma_polygon.getBounds().getCenter());

			dma_popup = L.popup()
			.setLatLng(dma_polygon.getBounds().getCenter())
			.setContent(popup)
			.openOn(map);


			dma_polygon.on('click', function (e) {
				//map.removeLayer(dma_polygon);
			});
	}
   
	else{

	}


});

/*
  	          var polyline = L.polyline([
                [12.69, 101.89],
                [13.69, 100.89],
                [14.69, 100.89]
            ], { showMeasurements: true })
            .addTo(map);
*/


function clr_obj()
{	
	$('.leaflet-container').css('cursor','');
	//alert(obj_draw);

     if(obj_draw != 'undefined')
       {
           obj_draw.disable();
           obj_draw=null;
        
       }   

    /*
	if ($('#toggle-trigger1').prop('checked') == true)
	{//alert("true");
		$('#toggle-trigger1').bootstrapToggle('off') 
			map.off('click', sheight);

			if (ch==1){
			map.removeLayer(AddMarker1); // remove

			}
			//$("#pano").hide();

	}
	if ($('#toggle-trigger').prop('checked') == true)
	{//alert("true");
	$('#toggle-trigger').bootstrapToggle('off') 
		map.off('click', stview);

		if (c==1){
		map.removeLayer(AddMarker); // remove
		}
		$("#pano").hide();

	}

	
	if ($('#toggle-trigger').prop('checked') == false && $('#toggle-trigger1').prop('checked') == false )
	{		
		$('.leaflet-container').css('cursor','');
	}
	else{
		$('.leaflet-container').css('cursor','crosshair');
	}
	*/

}


// Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a Visualization API ColumnChart.
function plotElevation(elevations, status) {

		//console.log(elevations);

		/*
		 var chartDiv = document.getElementById('elevation_chart');
		 if (status !== 'OK') {
		 // Show the error code inside the chartDiv.
		 chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
		 status;
		 return;
		 }


		 // Create a new chart in the elevation_chart DIV.
		 var chart = new google.visualization.ColumnChart(chartDiv);

		 // Extract the data from which to populate the chart.
		 // Because the samples are equidistant, the 'Sample'
		 // column here does double duty as distance along the
		 // X axis.

		 var data = new google.visualization.DataTable();
		 data.addColumn('string', 'Sample');
		 data.addColumn('number', 'Elevation');

		 for (var i = 0; i < elevations.length; i++) {
		 data.addRow(['', elevations[i].elevation]);
		 }

		 // Draw the chart using the data within its DIV.
		 chart.draw(data, {
		 height: 250,
		 width: 700,
		 legend: 'none',
		 titleY: 'Elevation (m)',
		 });

		console.log(data);
		*/


		arrlabel = [];
		arrsample = [];
		arrlatlng = [];
		arrheight = [];


		 var chartDiv = document.getElementById('elevation_chart');

		if (status !== 'OK') {
		 // Show the error code inside the chartDiv.
		 chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
		 status;
		 return;
		}
		else{
			//console.log(elevations.length);
			//console.log(JSON.stringify(elevations));
			//console.log(JSON.stringify(elevations[0].location));

			//console.log(elevation_coor[0].lat);
			//console.log(elevation_coor[0].lng);
			//console.log(JSON.stringify(elevation_coor));
			//console.log(JSON.stringify(path_for_marker));
			
			var markers = path_for_marker;
			/*
			var markers = [[13, 100],
					[13, 100.1],
					[13, 100.2],
					[13, 100.3],
					[13.5, 100.5]];
			*/
			route = new L.featureGroup();

			var n = markers.length;

			for (var i = 0; i < n-1; i++) {
					//alert(markers[i]);
						var marker = new L.Marker(markers[i], {icon: new L.NumberedDivIcon({number: i+1})} );
						//var marker = new L.Marker(markers[i], {icon: new L.NumberedDivIcon({number: i})} );
						//var marker = new L.Marker(markers[i]);
						var line = new L.polyline([markers[i],markers[i+1]]);

						route.addLayer(marker);
						//route.addLayer(line);

			};

			var markerend = new L.Marker( markers[n-1] , {icon: new L.NumberedDivIcon({number: n}) } );

			route.addLayer(markerend);


			var vmax=0;
			var vmin=0;
			//var sum=0;
			var mean;
			//var sd;
			var count=0;

			var latlng=[];

			var coors=[];
			var coors1=[];

			var txt_coor;

			for (var i = 0; i < elevations.length; i++) {

				var height =parseFloat(elevations[i].elevation).toFixed(2);

				if(count == 0){
					vmax =height;
					vmin =height;
				}
				else{
					if(height>=vmax){
						 vmax = height;
					}
					if(height<=vmin){
						 vmin = height;
					}
				}

				count+=1;


				var tmp = JSON.stringify(elevations[i].location)
				tmp = JSON.parse(tmp);

				//console.log(tmp.lat);
				//console.log(tmp.lng);
						//console.log(i+": "+elevations[i]);
						//console.log(i+": "+JSON.stringify(elevations[i]));
						arrsample.push({"value":i});
						//arrheight.push({"value":elevations[i].elevation});
						//arrheight.push({"value":addCommas(parseFloat(elevations[i].elevation).toFixed(2))});
						arrheight.push({
							"label": 'LatLng('+tmp.lat+', '+tmp.lng+')',
							"value":addCommas(parseFloat(elevations[i].elevation).toFixed(2)),
							//"color": '#9b59b6'
							"color": '#0075c2'
								});
						//console.log('lat: '+elevations[i].location[0].lat +' lng: '+elevations[i].location[0].lng+' elevation: '+elevations[i].elevation+ ' resolution: '+elevations[i].resolution);

				if(i == 128){
					latlng.push(tmp.lat);
					latlng.push(tmp.lng);
				}

				var coor_push = [             
					tmp.lat, tmp.lng, elevations[i].elevation				
					//tmp.lat, tmp.lng, parseFloat(elevations[i].elevation).toFixed(2)
				]; 
				coors.push(coor_push);

				var coor_push1 = [              
					tmp.lat, tmp.lng
				]; 
				coors1.push(coor_push1);

				
				if (i==0){
					//txt_coor = '['+tmp.lat+', '+tmp.lng+', '+elevations[i].elevation+']';
					txt_coor = '['+tmp.lng+', '+tmp.lat+', '+elevations[i].elevation+']';

				}
				else{
					//txt_coor += ', ['+tmp.lat+', '+tmp.lng+', '+elevations[i].elevation+']';
					txt_coor += ', ['+tmp.lng+', '+tmp.lat+', '+elevations[i].elevation+']';
				}

			}
			

			//add by nut2020
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

				if(height_polyline != null){
					map.removeLayer(height_polyline);
					map.removeLayer(route); 
					map.closePopup();
				}
				else{
				}


				//mean = sum/count;

				popup_1 ='<div id="chart-elevation" style="width: 300px; ">Loading...</div>'+
						'<a onclick="map.removeLayer(height_polyline);  map.removeLayer(route); map.closePopup();">ลบ</a>';
				
				//height_polyline = L.polyline(elevation_coor,{color: 'red'}).bindPopup(popup_1);//
				height_polyline = new L.polyline(elevation_coor,{color: 'red'}).bindPopup(popup_new).addTo(map);//
				height_polyline.openPopup();
				height_polyline.showMeasurements();//

				//route.addLayer(height_polyline);

				map.fitBounds(route.getBounds());
				map.addLayer(route);

				/*
				elevation_popup = L.popup()
				.setLatLng(latlng)
				.setContent(popup_new)
				.openOn(map);
				*/

				showelevation(arrsample, arrheight,vmax,vmin);


				height_polyline.on('click', function (e) {
				//map.removeLayer(height_polyline);
					//alert(e.latlng);
					//console.log(arrheight);
					showelevation(arrsample, arrheight,vmax,vmin);
				});

			}
			else if( /Mac/i.test(navigator.userAgent) ) {
				//console.log(hg);
				if(hg != null){
					geojson_profile.clearLayers(); 
					map.removeControl(hg); 
					map.closePopup();
				}
				else{
				}

				//console.log(txt_coor);
				new_profile(coors,txt_coor);
			}
			else{
				//console.log(hg);
				if(hg != null){
					geojson_profile.clearLayers(); 
					map.removeControl(hg); 
					map.closePopup();
				}
				else{
				}

				//console.log(txt_coor);
				new_profile(coors,txt_coor);
			}



		}//end for

}


function showelevation(arrsample, arrheight,vmax,vmin) {
	//alert(vmax+'\n'+vmin+'\n');
			var HeightChart = new FusionCharts({
				//type: 'mscombidy2d',
				type: 'mscombi2D',
				renderAt: 'chart-elevation',
				width: '100%',
				height: '250',
				dataFormat: 'json',
				dataSource: {
					"chart": {
						"caption": "ค่าระดับความสูง (เมตร)",
						//"subCaption": "(อ้างอิงค่าจาก Google Map)",
						//"xAxisname": "",
						//"pYAxisName": "ค่าระดับ (เมตร)",
						//"sYAxisName": "%",


						//"numberPrefix": "Q",
						//"sNumberSuffix" : "%",

						//"setAdaptiveYMin" : 1,

						"yAxisMaxValue" : vmax,
						"yAxisMinValue" : vmin,

						//"formatNumberScale": "0",
						//"decimalSeparator": ",",
						"thousandSeparator": ",",

						//Cosmetics
						"paletteColors" : "#0075c2,#1aaf5d,#f2c500",
						"baseFontColor" : "#333333",
						//"baseFont" : "Helvetica Neue,Arial",
						"baseFont" : "Prompt,sans-serif",
						"captionFontSize" : "14",
						"subcaptionFontSize" : "14",
						"subcaptionFontBold" : "0",

						"showBorder" : "1",
						"bgColor" : "#ffffff",
						"showShadow" : "0",

						"canvasBgColor" : "#ffffff",
						"canvasBorderAlpha" : "0",
						"divlineAlpha" : "100",
						"divlineColor" : "#999999",
						"divlineThickness" : "1",
						"divLineIsDashed" : "1",
						"divLineDashLen" : "1",
						"divLineGapLen" : "1",
						"usePlotGradientColor" : "0",
						"showplotborder" : "0",

						"showXAxisLine" : "1",
						"xAxisLineThickness" : "1",
						"xAxisLineColor" : "#999999",

						"showAlternateHGridColor" : "0",
						"showAlternateVGridColor" : "0",

						"legendBgAlpha" : "0",
						"legendBorderAlpha" : "0",
						"legendShadow" : "0",
						"legendItemFontSize" : "10",
						"legendItemFontColor" : "#666666",

						"showHoverEffect":"1",


					},
					"categories": [{
						"category": arrsample
					}
								  ],
					"dataset": [
						{
							//"seriesName": "Bar",
							"showValues": "0",
							"data": arrheight
						},
	

					]
				}
			});

			var chart = HeightChart.render();
			//console.log(chart);
			//popup_1 = chart;
}



var geojson;
var geojson_profile;
var hg;
function new_profile(elevation,elevation1){

	//elevation = JSON.stringify(elevation)
	//elevation = JSON.parse(elevation);

	//console.log('elevation'+elevation1);
	/*
	 elevation1 = [
                [8.108683, 47.323989, 455],
                [8.108757, 47.323535, 54],
                [8.108906, 47.323077, 454.4],
                [8.10933, 47.322295, 454.1],
                [8.109772, 47.321403, 452.7],
                [8.109773, 47.321174, 5.2],
                [8.109714, 47.320953, 451.9],
                [8.109679, 47.320695, 452],
                [8.109719, 47.320506, 452.4],
                [8.109849, 47.320243, 43.1],
                [8.110078, 47.319857, 454.3],
                [8.11022, 47.319656, 455]
            ]
	*/
	/*
		geojson = [{
			"type": "FeatureCollection",
			"features": [{
				"type": "Feature",
				"geometry": {
					"type": "LineString",
					"coordinates": [
						[8.108683, 47.323989, 455],
						[8.108757, 47.323535, 454],
						[8.108906, 47.323077, 454.4],
						[8.10933, 47.322295, 454.1],
						[8.109772, 47.321403, 452.7],
						[8.109773, 47.321174, 452.2],
						[8.109714, 47.320953, 451.9],
						[8.109679, 47.320695, 452],
						[8.109719, 47.320506, 452.4],
						[8.109849, 47.320243, 453.1],
						[8.110078, 47.319857, 454.3],
						[8.11022, 47.319656, 455]
					]
        },
			"properties": {
				"attributeType": 0
			}
		}],
		"properties": {
			"Creator": "GIS-PWA",
			"records": 1,
			"summary": "surface"
		}
	}];

	geojson[0].features[0].geometry['coordinates'] = elevation;
	*/


	var	txt = '[{';
			txt+=		'"type": "FeatureCollection",'
			txt+=		'"features": [{';
			txt+=			'"type": "Feature",';
			txt+=			'"geometry": {';
			txt+=				'"type": "LineString",';

			/*
			txt+=				 '"coordinates": [';
			txt+=				 '[8.031568, 46.96513, 697.5],';
			txt+=				 '[8.031397, 46.965021, 697.6],';
			txt+=				 '[8.031256, 46.964973, 697.8],';
			txt+=				 '[8.031135, 46.965156, 697.9],';
			txt+=				 '[8.031042, 46.96526, 698],';
			txt+=				 '[8.03079, 46.965205, 697.9],';
			txt+=				 '[8.02999, 46.964887, 698.3],';
			txt+=				 '[8.029803, 46.96485, 698.5]';
			*/

			
			txt+=				'"coordinates": [';
			txt+=					elevation1;
			

			txt+=				']';
			txt+=			'},';
			txt+=			'"properties": {';
			txt+=				'"attributeType": 0';
			txt+=			'}';
			txt+=		'}],';
			txt+=		'"properties": {';
			txt+=			'"Creator": "GIS-PWA",';
			txt+=			'"records": 1,';
			txt+=			'"summary": "surface"';
			txt+=		'}';
			txt+=	'}]';

	//console.log(txt);

	geojson =  JSON.parse(txt);
	//console.log(geojson);

 //const bounds = new L.LatLngBounds(new L.LatLng(47.323989, 8.108683), new L.LatLng(46.96485, 8.029803));

	hg = L.control.heightgraph({
		 position: 'bottomright',
		 mappings: colorMappings,
		 translation: {
			 distance: "My custom distance"
		 },
		 expandCallback(expand) {
			 //console.log("Expand: "+expand)
		 }
	 });

	hg.addTo(map);

	hg.addData(geojson);

	//$('svg.heightgraph-container').css('width','100%');

	//geojson_profile =  L.geoJson(geojson).addTo(map);
	//geojson_profile =  L.geoJson().addTo(map);
	//geojson_profile.addData(elevation1);
	 //map.fitBounds(bounds);

	addmap(geojson);
}


function addmap(profile_eleva){
	/*
	var popup_new ='<a style="margin-left:15px;cursor:pointer;padding:0px;text-align: center;vertical-align:middle;"onclick="geojson_profile.clearLayers(); map.removeControl(hg); map.closePopup();">ลบ</a>';
	geojson_profile =  L.geoJson(profile_eleva).bindPopup(popup_new).addTo(map);
	geojson_profile.bindTooltip('คลิกเพื่อลบเส้นและข้อมูลความสูง');	
	*/

	geojson_profile =  L.geoJson(profile_eleva).addTo(map);
	geojson_profile.on('click', function (e) {
		geojson_profile.clearLayers(); 
		map.removeControl(hg); 
		map.closePopup();
		map.removeLayer(geojson_profile);
	});
	geojson_profile.bindTooltip('คลิกเพื่อลบเส้นและข้อมูลความสูง');	

}



$(document).keyup(function(e) {
     if (e.key === "Escape") { // escape key maps to keycode `27`

        $('.leaflet-container').css('cursor','');

		//$('#toggle-trigger1').bootstrapToggle('off') ;
		//$('#toggle-trigger').bootstrapToggle('off') ;

		//map.off('click', stview);
		//map.off('click', sheight);
		//map.off('click', share_location);

		//$("#pano").hide();

		if(obj_draw) {
			//console.log('');
			obj_draw.disable();
		}   

		/*
		if (ch==1){
			map.removeLayer(AddMarker1); // remove
		}

		if (c==1){
			map.removeLayer(AddMarker); // remove
		}
		*/

		/*
		if (m_line){
			map.removeLayer(m_line);
		}
		if (m_polyline){
			map.removeLayer(m_polyline);
		}
		if (route){
			map.removeLayer(route);
		}
		if (height_polyline){
			map.removeLayer(height_polyline);
		}
		*/

    }
});



$( "#analysis_modal [name='branch']").change(function() {
	//console.log($( "#analysis_modal [name='branch'] option:selected").val());


	if($( "[name='reg_no']  option:selected" ).val() == 0 || $( "[name='branch']  option:selected" ).text() == 'เลือกสาขา'){
		return;
	}
	else{

	var php_sql ="./query/q_branch_for_analysis.php";
	$.ajax({url: php_sql,
		type: "POST",
		 async:false,
		dataType: 'json',
		data: {reg: $( "#analysis_modal [name='reg_no'] option:selected").val(), pwacode: $( "#analysis_modal [name='branch'] option:selected").val()},
		success: function(result){
			//console.log(result[0].branch_name);
			//console.log(result[0].pwa_code);
			//console.log(result[0].lat);
			//console.log(result[0].lng);
			 map.setView([result[0].lat, result[0].lng], 15);
		}
	});
		
	}
});

function zoompwa_for_measure_polygon(){

	if($( "[name='reg_no']  option:selected" ).val() == 0 || $( "[name='branch']  option:selected" ).text() == 'เลือกสาขา'){
		return;
	}
	else{

	var php_sql ="./query/q_branch_for_analysis.php";
	$.ajax({url: php_sql,
		type: "POST",
		 async:false,
		dataType: 'json',
		data: {reg: $( "#analysis_modal [name='reg_no'] option:selected").val(), pwacode: $( "#analysis_modal [name='branch'] option:selected").val()},
		success: function(result){
			//console.log(result[0].branch_name);
			//console.log(result[0].pwa_code);
			//console.log(result[0].lat);
			//console.log(result[0].lng);
			 map.setView([result[0].lat, result[0].lng], 15);
		}
	});
		
	}

}