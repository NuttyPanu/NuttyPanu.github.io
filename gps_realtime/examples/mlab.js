var myDB = "location";
var myCollection = "gps";
var apiKey = "zCxIftNnbizcCTl61rydbRWUcFevJ5TR";

var myAPIKey ="zCxIftNnbizcCTl61rydbRWUcFevJ5TR";
var URL_mlab = 'https://api.mlab.com/api/1/databases/location/collections/gps?apiKey='.$api_key;



$( document ).ready(function() {

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		alert('Mobile');
	}
	else{
		alert('Desktop');
	}


});












	$("#add_data").click(function(e){







		$.ajax( { url: "https://api.mlab.com/api/1/databases/location/collections/gps?apiKey=zCxIftNnbizcCTl61rydbRWUcFevJ5TR",
			  //data: JSON.stringify( {"distinct": "users","key": "account","query": {"active":true}} ),
			  data: JSON.stringify( {"name": "nut","username": "panukorn","password": "1234","email": "panukorn@gmail.com","line": "Nutty",
									"pic": "ssssadadwfasdfdsfssdfsdf","latlng": "12.5,105","status": "offline","date": "2019-02-07"} ),
			  type: "POST",
			  contentType: "application/json",
			  //contentType: "application/json;charset=utf-8",
			  success: function(returnedData) {
				   alert(returnedData._id["$oid"]);
				   alert(returnedData.name);
				   //alert( msg );
				   localStorage.setItem("oid", returnedData._id["$oid"]);
			  }
		
		});
		//Optional parameters:
		//[q=<query>][&m=true][&u=true]
		//q=<query> - only update document(s) matching the specified JSON query
		//m=true - update all documents collection or query (if specified). By default only one document is modified
		//u=true - “upsert”: insert the document defined in the request body if none match the specified query


	});
	$("#update_data").click(function(e){

		if (localStorage.oid){

			$.ajax( { url: 'https://api.mlab.com/api/1/databases/location/collections/gps?apiKey=zCxIftNnbizcCTl61rydbRWUcFevJ5TR&q={"_id": {"$oid": "'+localStorage.oid+'"}}',
			//$.ajax( { url: 'https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey&q={"_id": {"$oid": "5b20c03e1f6e4f75faafd9f9"}',
					  data: JSON.stringify( { "$set" :{"latlng": "10.1,100.14","status": "online"}} ),
					  //data: JSON.stringify( { "$set" : { "latlng": "12,102"}} ),
					  type: "PUT",
					  contentType: "application/json",
					  success: function(returnedData) {
						  //var jsontotxt = JSON.stringify(returnedData);   //JSON.parse() - To parse a JSON string and convert it to a JavaScript object.
																		//JSON.stringify() - Convert a JavaScript object into a string. You can also apply indentation by passing an optional value.
						  //alert(returnedData._id["$oid"]);
						  //alert(jsontotxt);  //{"n": 1} ¼Å¡ÒÃ¤é¹ËÒ
						  alert('update');
					  }		  
			});

		}
		else{
			alert("โปรดล๊อคอิน");
		}

		/*
		Optional parameters:
		[q=<query>][&m=true][&u=true]
		Optional parameters:

		q=<query> - only update document(s) matching the specified JSON query
		m=true - update all documents collection or query (if specified). By default only one document is modified
		u=true - “upsert”: insert the document defined in the request body if none match the specified query
		So, you can think of PUT like “update”; with u=true added, it becomes “update or insert”, or “upsert” for short.
			*/
	});
	$("#delete_data").click(function(e){
		if (localStorage.oid){
			//Delete Document API call
			$.ajax({ url: "https://api.mlab.com/api/1/databases/" + myDB + "/collections/" + myCollection + "/" + encodeURIComponent(localStorage.oid) + "?apiKey=" + apiKey,
			   type: "DELETE",
			   timeout: 200000, // 5 minutes
			   success: function(data) {
					localStorage.removeItem("oid");
					alert(localStorage.getItem("oid"));
			   // TODO: remove the contact. We’ll do this in a follow-up post.
			   },
			   error: function(xhr, status, err) {
			   // TODO: surface the error to the user.
			   }
			});
			//Optional parameters:
			//[q=<query>]
		}
		else{
			alert('โปรดล๊อคอิน');

		}
	});
	$("#query_data").click(function(e){
		var php_sql = 'https://api.mlab.com/api/1/databases/location/collections/gps?apiKey=zCxIftNnbizcCTl61rydbRWUcFevJ5TR&q={"status": "online"}';
		$.ajax({url: php_sql,
				//async:false,
				success: function(result){
					$.each(result, function() {
						alert(this._id.$oid+','+this.name+','+this.latlng);
					});	
				}
		});

	});


	

//		{
//			"_id": {
//				"$oid": "5b20c03e1f6e4f75faafd9f9"
//			},
//			"latlng": "13,100",
//			"user": "panukorn",
//			"password": "1234",
//			"name": "nutty",
//			"status": "on",
//			"date": "2019-02-05"
//		}
		
		//var Q = '&q={"user": "panukorn"}';
		//var php_sql = 'https://api.mlab.com/api/1/databases/location/collections/gps?apiKey=zCxIftNnbizcCTl61rydbRWUcFevJ5TR'+Q;
//		var php_sql = 'https://api.mlab.com/api/1/databases/location/collections/gps?apiKey=zCxIftNnbizcCTl61rydbRWUcFevJ5TR&q={"user": "panukorn"}';
//		$.ajax({url: php_sql,
//				//async:false,
//				success: function(result){
//					//alert(result._id.$oid);
////					var sum_count = 0;
////					var a_other_stat0=0;
//					$.each(result, function() {
//						alert(this._id);
//						alert(this._id.$oid);
//						alert(this.latlng);
//					});	
//				}
//		});


		//		$.get('path/to/api', function(data){
		//		  // you may use "data" to access the underlying data
		//		)
		//
		//		$.ajax({
		//		  url: 'path/to/api',
		//		  type: 'GET' // this is default, but worth pointing out
		//		}).done(function(data){
		//		  // you may use "data" to access the underlying data
		//		}



		//Optional parameters
		//[q=<query>][&c=true][&f=<fields>][&fo=true][&s=<order>][&sk=<skip>][&l=<limit>]
		
		//Optional parameters (MongoDB reference):
		//q=<query> - restrict results by the specified JSON query
		//c=true - return the result count for this query
		//f=<set of fields> - specify the set of fields to include or exclude in each document (1 - include; 0 - exclude)
		//fo=true - return a single document from the result set (same as findOne() using the mongo shell
		//s=<sort order> - specify the order in which to sort each specified field (1- ascending; -1 - descending)
		//sk=<num results to skip> - specify the number of results to skip in the result set; useful for paging
		//l=<limit> - specify the limit for the number of results (default is 1000)

		//Examples using these parameters:
		//"q" example - return all documents with "active" field of true:
		//https://api.mlab.com/api/1/databases/my-db/collections/my-coll?q={"active": true}&apiKey=myAPIKey
		//
		//"c" example - return the count of documents with "active" of true:
		//https://api.mlab.com/api/1/databases/my-db/collections/my-coll?q={"active": true}&c=true&apiKey=myAPIKey
		//
		//"f" example (include) - return all documents but include only the "firstName" and "lastName" fields: áÊ´§¼Åá¤è·ÕèÊ¹ã¨
		//https://api.mlab.com/api/1/databases/my-db/collections/my-coll?f={"firstName": 1, "lastName": 1}&apiKey=myAPIKey
		//
		//"f" example (exclude) - return all documents but exclude the "notes" field:
		//https://api.mlab.com/api/1/databases/my-db/collections/my-coll?f={"notes": 0}&apiKey=myAPIKey
		//
		//"fo" example - return a single document matching "active" field of true:
		//https://api.mlab.com/api/1/databases/my-db/collections/my-coll?q={"active": true}&fo=true&apiKey=myAPIKey
		//
		//"s" example - return all documents sorted by "priority" ascending and "difficulty" descending:
		// https://api.mlab.com/api/1/databases/my-db/collections/my-coll?s={"priority": 1, "difficulty": -1}&apiKey=myAPIKey
		//
		//"sk" and "l" example - sort by "name" ascending and return 10 documents after skipping 20
		// https://api.mlab.com/api/1/databases/my-db/collections/my-coll?s={"name":1}&sk=20&l=10&apiKey=myAPIKey
		//	});
