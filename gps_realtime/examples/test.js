		undefined
		{
			"type": "Feature",
			"properties": {
				"name": "nut",
				"status": "online",
				"popupContent": "จุดที่1"
			},
			"geometry": {
				"type": "Point",
				"coordinates": [104.5788452,9.1933755]
			}
		}
		
		var geojsonFeature = 
		[
		{
			"type": "Feature",
			"properties": {
				"name": "nut",
				"status": "online",
				"popupContent": "จุดที่1",
			},
			"geometry": {
				"type": "Point",
				"coordinates": [104.9788452,9.6933755]
			}
		},
		{
			"type": "Feature",
			"properties": {
				"name": "bel",
				"status": "online",
				"popupContent": "จุดที่2",
			},
			"geometry": {
				"type": "Point",
				"coordinates": [104.5788452,9.1933755]
			}
		},
		]
		
<script>

var txtgeojson="";
txtgeojson+= '[';
k=1;

	//------------start each-----------
	if(k>1){
		txtgeojson+= ',';
	}
	txtgeojson+= '{';
	txtgeojson+=	'"type": "Feature",';
	txtgeojson+=	'"properties": {';
	txtgeojson+=		'"name": "nut",';
	txtgeojson+=		'"status": "online",';
	txtgeojson+=		'"popupContent": "จุดที่1"';
	txtgeojson+=	'},';
	txtgeojson+=	'"geometry": {';
	txtgeojson+=		'"type": "Point",';
	txtgeojson+=		'"coordinates": [104.5788452,9.1933755]';
	txtgeojson+=	'}';
	txtgeojson+= '}';
	//------------end each------------

	k+= 1;


txtgeojson+= ']';


//txtgeojson ='{ "name":"John", "age":30, "city":"New York"}';
//alert(txtgeojson);
//txtgeojson ='{"type": "Feature","properties": {"name": "nut","status": "online","popupContent": "จุดที่1"},"geometry": {"type": "Point","coordinates": [104.5788452,9.1933755]}}';
var obj = JSON.parse(txtgeojson);
//var objtxt = JSON.stringify(obj);
alert(obj[0].properties.popupContent);
//alert(obj.name);
//alert(obj.properties.popupContent);


</script>
