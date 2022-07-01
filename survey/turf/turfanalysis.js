
    //turf analysis

      var pointImport = new L.geoJson(null, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {

            icon: L.icon({
            iconUrl: "icons/location.png",

            iconSize: [30, 30],
            iconAnchor: [15, 30.5],
            //popupAnchor: [0, 0]
            }),
            /*
            title:  "พิกัด = "+latlng+
                    " \nที่อยู่ = "+feature.properties.address+
                    " \nสถานะ = "+ feature.properties.status+ feature.properties.pwaname+ feature.properties.pwacode+
                    " \nระยะทาง = "+ feature.properties.measure,    
            */

            //title:  `พิกัด = ${latlng} \nที่อยู่ = ${feature.properties.address} \n\nสถานะ = ${feature.properties.status} \nรายละเอียด = ${feature.properties.pwaname} (${feature.properties.pwacode}) \nระยะทาง = ${feature.properties.measure} ม.`,                                       

            title:  `พิกัด: ${latlng}`,                                       
            
            riseOnHover: true

          });

          },

        onEachFeature: function (feature, layer) {
          //console.log(layer)
          if (feature.properties) {
            var content =`พิกัด: ${layer._latlng} <br>`;

            $.each(feature.properties, function(key, value) {
              if(key == 'imgbase64' && (value != '' && value != 'urlbase64') ) {
                content+=`<img src="data:image/png;base64,${ value }" class="img-bookmark rounded mx-auto d-block img-fluid" style="max-width:200px;max-height:128px;" id="${key}"/><br>`;
              }
              else{
                content+=`${key}: ${value} <br>`;
              }
            });

            layer.bindPopup(
              content
              //`พิกัด = ${layer._latlng} <br>ที่อยู่ = ${feature.properties.address} <br><br>สถานะ = ${feature.properties.status} <br>รายละเอียด = ${feature.properties.pwaname} (${feature.properties.pwacode}) <br>ระยะทาง = ${feature.properties.measure} ม.`
              );
            
          }
          /*            
            layer.bindPopup("latlng = "+layer._latlng+" detail = "+feature.properties.address+"<br>"+"<a id='myLink' href='#' onclick='del_obj("+feature.properties.id+",\"SURVEY\");'>ลบ</a>");  
          }
          */
        }
      }); 

      //โชว์tooltip สำหรับpolygon
      // pointGeojson.bindTooltip(function (layer) {
      //     return "prv = "+layer.feature.properties.name+" detail = "+layer.feature.properties.p;
      //     //return layer.feature.properties.detail;
      //  }
      // );
      //map.addLayer(pointGeojson);




        $(document).ready(function() {
          //$('#place_holder').load("load_me.html");
          $("#importModal").modal('show');
        });



        document.getElementById('import').onclick = function() {

          var files = document.getElementById('selectFiles').files;
          console.log(files);
          if (files.length <= 0) {
            return false;
          }
          
          var fr = new FileReader();
          
          fr.onload = function(e) { 
          console.log(e);
            var result = JSON.parse(e.target.result);
            var formatted = JSON.stringify(result, null, 2);
            document.getElementById('result').value = formatted;
          }
          
          fr.readAsText(files.item(0));
        };



        function readURL_Point(input) {
          //console.log($('input#PointInp')[0].files);
          //console.log($('input#PointInp')[0].files[0]);
          //var files = document.getElementById('#PointInp')[0].files;
         // console.log(files);
          var files = $('input#PointInp')[0].files;
          console.log(files);

          if (files.length <= 0) {
            return false;
          }

          var fr = new FileReader();
          
          fr.onload = function(e) { 
            //console.log('load data');
            console.log(e);

            var result = JSON.parse(e.target.result);

            //alert(result.features[0].geometry.type);

            //alert(result.some(elem => elem === 'Polygon'));
            
            var formatted = JSON.stringify(result, null, 2);
            localStorage.setItem("import_layer", formatted);
            document.getElementById('result').value = formatted;

            var name=files[0]['name'];
            layerControl.addOverlay( pointImport, name,"วิเคราะห์ข้อมูลเชิงพื้นที่");
            //alert(data.features.length);

            buff10.clearLayers();
            buff100.clearLayers();

            if(buff10._layers){
              map.removeLayer(buff10);       
            }
            if(buff100._layers){
              map.removeLayer(buff100);       
            }





            pointImport.clearLayers();
            pointImport.addData(result);
            map.addLayer(pointImport);
            map.fitBounds(pointImport.getBounds().pad(Math.sqrt(2) / 2));
            //map.setZoom(12);
                /*
                    var pwa = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[lng,lat]},"properties":{"status":data.features[0].properties.status,"measure":data.features[0].properties.measure,"pwacode":data.features[0].properties.pwacode,"pwaname":data.features[0].properties.pwaname,"address":address}}]};
                    pointGeojson.clearLayers();
                    pointGeojson.addData(pwa);
                    map.addLayer(pointGeojson);


                    var popup_ = L.popup({
                        offset: [0, -20]
                    })
                    .setContent(`พิกัด = LatLng(${lat}, ${lng}) <br>ที่อยู่ = ${pwa.features[0].properties.address} <br><br>สถานะ = ${pwa.features[0].properties.status} <br>รายละเอียด = ${pwa.features[0].properties.pwaname} (${pwa.features[0].properties.pwacode}) <br>ระยะทาง = ${pwa.features[0].properties.measure} ม.`);

                    pointGeojson.bindPopup(popup_).openPopup();
                */


          }
          
          fr.readAsText(files.item(0));


            /*
                      //var data = new window.FormData($('input#PointInp')[0].files[0]);
                      var data = new window.FormData($('#PointInp')[0]);

                var form_data = new FormData();
                var files1 = $('#imgInp')[0].files;
                document.getElementById('inp_img_public').value = '';
                for (var i = 0; i < files1.length; i++) {
                  var fname_img = files1[i].name;
                  name_public.push(fname_img);
                }

                var files2 = $('#imgInp2')[0].files;
                document.getElementById('inp_img_private').value = '';
                for (var i = 0; i < files2.length; i++) {
                  var fname_img2 = files2[i].name;
                  name_private.push(fname_img2);
                }

                form_data.append("url_public", tmp_url_public);
                form_data.append("url_public_Thumbnails", tmp_url_public_Thumbnails);
                form_data.append("name_public", name_public);

                form_data.append("url_private", tmp_url_private);
                form_data.append("url_private_Thumbnails", tmp_url_private_Thumbnails);
                form_data.append("name_private", name_private);

                form_data.append("ref_no", $('#i_ref_no').val());
                form_data.append("current_menu", $("#current_menu").text());
                      $.each(data,function(key, val){
                        console.log(key+val);
                      });
            */



          //console.log(input[0].files[0]);
          //console.log(input.files[0]);
          /*
          if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
              console.log(e.target.result);
              //$('#img-upload-preview').attr('src', e.target.result);
            }
            console.log(input.files[0]);
            reader.readAsDataURL(input.files[0]);
          }
          */
        }


        function readURL_Line(input) {
          if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
              //$('#img-upload-preview2').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
          }
        }
        /*
        $("#PointInp").change(function(){
          readURL_Point(this);
        }); 
        $("#LineInp").change(function(){
          readURL_Line(this);
        });   
          */



         /*      
        //jQuery.getJSON( url [, data ] [, success ] )
        var filePath = '/js/country_codes.json';

        $.getJSON(filePath, function( data ) {
          $.each( data, function( key, val ) {
            console.log(val['country']);
          });
        });
        */
        function resetImport() {
          try {
            pointImport.clearLayers();
            map.removeLayer(pointImport);
            layerControl.removeLayer(pointImport);
          }
          catch(err) {
            
          }
          try {

            buff10.clearLayers();
            map.removeLayer(buff10); 
            layerControl.removeLayer(buff10);
          }
          catch(err) {
            
          }
          try {
            buff100.clearLayers();
            map.removeLayer(buff100);  
            layerControl.removeLayer(buff100);                    
          }
          catch(err) {
            
          }

          try {
            localStorage.removeItem('import_layer');                    
          }
          catch(err) {
            
          }



        }