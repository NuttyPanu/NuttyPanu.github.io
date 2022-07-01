		var buff10 = new L.FeatureGroup();
		var buff100 = new L.FeatureGroup();


		$( document ).ready(function() {	
			//console.log(document.documentElement.scrollTop);
			//console.log(document.documentElement.scrollHeight);
			//console.log(document.documentElement.clientHeight);
			$("#w_more").click(function(){
				$("[name='widget']").show();
				$("#w_more").hide();
				//$(document).scrollTop( document.documentElement.scrollTop );
			});
			$("#w_back").click(function(){
				$("[name='widget']").hide();
				$("#w_more").show();
				//$(document).scrollTop( document.documentElement.scrollTop );
			});


			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){


			}
			else{

			}


		});


		$(window).click(function( event ) {
		//$( "body" ).click(function( event ) {
		  //console.log(event);
		  //console.log(event.target);
		  //console.log(event.target.nodeName);

			// console.log(event);
			//console.log(event.target);
			//console.log(event.target.nodeName);
			//console.log(event.target.classList[0]);
			// console.log(event.target.classList[1]);
			//console.log(event);
			//console.log(event.target);
			//console.log(event.target.nodeName);


			//console.log(event.target.offsetParent);

			//console.log(event.target.parentElement);
			//console.log(event.target.parentElement.parentElement);
			//console.log(event.target.parentElement.parentElement.parentElement);
			//console.log(event.target.parentElement.parentElement.parentElement.parentElement);
			//console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement);


			if(event.target.attributes.name === undefined){

				if($("#w_more").css('display') == 'none'){
						$("[name='widget']").hide();
						$("#w_more").show();
				}
				else{


				}

			}
			else{

				//console.log(event.target.attributes.name);

			}

		  //console.log($(this).attr('name'));
		  //console.log($(this).attr('id'));
		  //alert(event.target.nodeName);
		});



		var exportfile;



		function widgetModal(type){

			if (type == 'about'){
				$("#result").val('');

				$("#widgetModal input").val('');
				$("#widgetModal").modal('show');
			}
			else if (type == 'buffer'){
				if(!pointImport._leaflet_id){
					alert('ไม่พบชั้นข้อมูล โปรดนำเข้าข้อมูลก่อนครับ');
				}
				else{
					alert('ทดสอบสร้างบัฟเฟอร์ 10 กิโลเมตร');

						buff10.clearLayers();

						/*
						if(buff10!=null){
							map.removeLayer(buff10);
							buff10=''	
							buff10 = new L.featureGroup();
						}
						else{
							buff10 = new L.featureGroup();
						}
						*/

						//buff10.clearLayers(); 

					$.each(pointImport._layers, function(key, value) {
						console.log('detail_layer: '+key+', '+value.feature.geometry.type);

						if(value.feature.geometry.type == 'Point'){

							$.each(value, function(key1, value1) {
								//console.log(key1+value1);
								//console.log('type_layer: '+value1.feature.geometry.type);
								if(key1=='_latlng'){
									//point
									var lng=value1.lng;
									var lat=value1.lat;
									console.log(lng);
									console.log(lat);

									var poi = turf.point([lng,lat]);
									var buff = turf.buffer(poi, 10,{units: 'kilometers'});

									//map.removeLayer(buff10);
									//buff10 = L.geoJSON(buff,{

									buff10.addLayer(new L.geoJSON(buff,{
										style: function (feature){
											return {color: 'blue'};
										}
									}));
									/*
									new L.geoJSON(buff,{
										style: function (feature){
											return {color: 'blue'};
										}
									//}).bindPopup('บัปเฟอร์ 10 กิโลเมตร').openPopup().addTo(map);
									}).addTo(map);
									*/
									/*
									var point = turf.point([lng,lat]);
									var buff = turf.buffer(point, 10,{units: 'kilometers'});
									*/
									//console.log(buff);
									//map.addLayer(buff);
								}

							});


						}
						else if(value.feature.geometry.type == 'LineString'){
							console.log(value.feature.geometry.type);

							var buff = turf.buffer(jQuery.parseJSON(localStorage.getItem("import_layer")), 10, {units: 'kilometers'});
									
							buff10.addLayer(new L.geoJSON(buff,{
								style: function (feature){
									return {color: '#59c2ff8c'};
								}
							}));

						}
						else if(value.feature.geometry.type == 'Polygon'){
							console.log(value.feature.geometry.type);
							var buff = turf.buffer(jQuery.parseJSON(localStorage.getItem("import_layer")), 10, {units: 'kilometers'});
									
							buff10.addLayer(new L.geoJSON(buff,{
								style: function (feature){
									return {color: '#59c2ff8c'};
								}
							}));							
						}	
						else{ //MultiPoint MultiPolygon MultiLineString
							console.log(value.feature.geometry.type);
						}

						buff10.addTo(map);
						layerControl.addOverlay( buff10, "Buffer 10 กม.","วิเคราะห์ข้อมูลเชิงพื้นที่");

            		});

					
				}

				//$("#widgetModal").modal('show');
			}
			else if (type == 'intersect'){
				if(!pointImport._leaflet_id){
					alert('ไม่พบชั้นข้อมูล โปรดนำเข้าข้อมูลก่อนครับ');
				}
				else{
					alert('ทดสอบสร้างintersectบัฟเฟอร์ 140 กิโลเมตร');

					var lyarr=[];

					$.each(pointImport._layers, function(key, value) {
						console.log(key+value);

						$.each(value, function(key1, value1) {
							//console.log(key1+value1);
							if(key1=='_latlng'){
								var lng=value1.lng;
								var lat=value1.lat;
								console.log(lng);
								console.log(lat);

								var poi = turf.point([lng,lat]);
								var buff = turf.buffer(poi, 140,{units: 'kilometers'});
								lyarr.push(buff);

								new L.geoJSON(buff,{
									style: function (feature){
										return {color: 'blue'};
									}
								//}).bindPopup('บัปเฟอร์ 10 กิโลเมตร').openPopup().addTo(map);
								}).addTo(map);
								
								/*
								var point = turf.point([lng,lat]);
								var buff = turf.buffer(point, 10,{units: 'kilometers'});
								*/
								//console.log(buff);
								//map.addLayer(buff);
							}
						});

            		});
					if(lyarr.length == 2){

	            		console.log(lyarr.length);
	            		
	            		console.log(lyarr[0]);
	            		console.log(lyarr[1]);

						var intersection = turf.intersect(lyarr[0],lyarr[1]);

						exportfile=intersection;
						var polyintersect = new L.geoJSON(intersection,{
							style: function (feature){
								return {color: 'red'};
							}
							//}).bindPopup('บัปเฟอร์ 10 กิโลเมตร').openPopup().addTo(map);
						}).addTo(map);
		
					}
					else if(lyarr.length == 3){

	            		console.log(lyarr.length);
	            		
	            		console.log(lyarr[0]);
	            		console.log(lyarr[1]);
						console.log(lyarr[2]);

						var intersection = turf.intersect(lyarr[0],lyarr[1]);
						    intersection = turf.intersect(intersection,lyarr[2]);


						exportfile=intersection;
						var polyintersect = new L.geoJSON(intersection,{
							style: function (feature){
								return {color: 'red'};
							}
							//}).bindPopup('บัปเฟอร์ 10 กิโลเมตร').openPopup().addTo(map);
						}).addTo(map);
		
					}
					else{
						alert('ระบบยังไม่รองรับการฟาพื้นที่ซ้อนทับจากจุดที่มีจำนวนน้อยกว่า2จุด/มากกว่า3จุด โปรดรอไปก่อน');
					}

				}

				//$("#widgetModal").modal('show');
			}		
			else if (type == 'export'){

				function saveToFile(content, filename) {
				      var file = filename + '.geojson';
				      saveAs(new File([JSON.stringify(content)], file, {
				        type: "text/plain;charset=utf-8"
				      }), file);
				}

					 var freeBus = {
					      "type": "FeatureCollection",
					      "features": [{
					          "type": "Feature",
					          "geometry": {
					            "type": "LineString",
					            "coordinates": [
					              [100.00341892242432, 12.75383843460583],
					              [100.0008225440979, 12.751891803969535]
					            ]
					          },
					          "properties": {
					            "popupContent": "This is free bus that will take you across downtown.",
					          },
					          "id": 1
					        },
					        {
					          "type": "Feature",
					          "geometry": {
					            "type": "LineString",
					            "coordinates": [
					              [100.0008225440979, 12.751891803969535],
					              [100.99820470809937, 12.74979664004068]
					            ]
					          },
					          "properties": {
					            "popupContent": "This is free bus that will take you across downtown.",
					          },
					          "id": 2
					        },
					        {
					          "type": "Feature",
					          "geometry": {
					            "type": "LineString",
					            "coordinates": [
					              [100.99820470809937, 12.74979664004068],
					              [100.98689651489258, 12.741052354709055]
					            ]
					          },
					          "properties": {
					            "popupContent": "This is free bus that will take you across downtown.",
					          },
					          "id": 3
					        }
					      ]
					    };

					if(!pointImport._leaflet_id){
						alert('ไม่พบชั้นข้อมูล โปรดนำเข้าข้อมูลก่อนครับ');
					}
					else{
						saveToFile(exportfile, 'intersect');
					}

					/*
				    if(exportfile != null||exportfile != undefined){
						saveToFile(exportfile, 'intersect');
				    }
				    else{
				    	//var layer = L.geoJson(freeBus).addTo(map);
				    	//saveToFile(layer.toGeoJSON(), 'test');
				    	saveToFile(freeBus, 'test');
				    }
					*/
			}	


			
		}

		if($( window ).height() <= 450){

			$("[name='widget']").css("padding","13px");
			$("#w_more").css("padding","13px");

			$("[name='widget']").css("right","21px");
			$("#w_more").css("right","21px");

			$("[name='widget']").css("background-size","20px");
			$("#w_more").css("background-size","20px");

			$("#w_more").css("bottom","5px");
			$("#w_about").css("bottom","145px");
			$("#w_contact").css("bottom","110px");
			$("#w_faq").css("bottom","75px");
			$("#w_manual").css("bottom","40px");
			$("#w_back").css("bottom","5px");
		}
		else{
			/*
			$("[name='widget']").css("padding","20px");
			$("#w_more").css("padding","20px");

			$("[name='widget']").css("right","15px");
			$("#w_more").css("right","15px");

			$("[name='widget']").css("background-size","35px");
			$("#w_more").css("background-size","35px");

			$("#w_more").css("bottom","15px");
			$("#w_about").css("bottom","235px");
			$("#w_contact").css("bottom","180px");
			$("#w_faq").css("bottom","125px");
			$("#w_manual").css("bottom","70px");
			$("#w_back").css("bottom","15px");
			*/

			$("[name='widget']").css("padding","13px");
			$("#w_more").css("padding","13px");

			$("[name='widget']").css("right","21px");
			$("#w_more").css("right","21px");

			$("[name='widget']").css("background-size","20px");
			$("#w_more").css("background-size","20px");

			$("#w_more").css("bottom","5px");
			$("#w_about").css("bottom","145px");
			$("#w_contact").css("bottom","110px");
			$("#w_faq").css("bottom","75px");
			$("#w_manual").css("bottom","40px");
			$("#w_back").css("bottom","5px");


		}



		
		$( window ).resize(function() {

			if($( window ).height() <= 450){
				$("[name='widget']").css("padding","13px");
				$("#w_more").css("padding","13px");

				$("[name='widget']").css("right","21px");
				$("#w_more").css("right","21px");

				$("[name='widget']").css("background-size","20px");
				$("#w_more").css("background-size","20px");

				$("#w_more").css("bottom","5px");
				$("#w_about").css("bottom","145px");
				$("#w_contact").css("bottom","110px");
				$("#w_faq").css("bottom","75px");
				$("#w_manual").css("bottom","40px");
				$("#w_back").css("bottom","5px");
			}
			else{
				/*
				$("[name='widget']").css("padding","20px");
				$("#w_more").css("padding","20px");

				$("[name='widget']").css("right","15px");
				$("#w_more").css("right","15px");

				$("[name='widget']").css("background-size","35px");
				$("#w_more").css("background-size","35px");

				$("#w_more").css("bottom","15px");
				$("#w_about").css("bottom","235px");
				$("#w_contact").css("bottom","180px");
				$("#w_faq").css("bottom","125px");
				$("#w_manual").css("bottom","70px");
				$("#w_back").css("bottom","15px");
				*/
				$("[name='widget']").css("padding","13px");
				$("#w_more").css("padding","13px");

				$("[name='widget']").css("right","21px");
				$("#w_more").css("right","21px");

				$("[name='widget']").css("background-size","20px");
				$("#w_more").css("background-size","20px");

				$("#w_more").css("bottom","5px");
				$("#w_about").css("bottom","145px");
				$("#w_contact").css("bottom","110px");
				$("#w_faq").css("bottom","75px");
				$("#w_manual").css("bottom","40px");
				$("#w_back").css("bottom","5px");
			}

		});
