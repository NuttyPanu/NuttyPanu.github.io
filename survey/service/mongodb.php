<?php

date_default_timezone_set("Asia/Bangkok");

@ini_set('display_errors', '0'); //ไม่แสดงerror

//https://www.mongodb.com/docs/atlas/api/data-api/  document
//https://www.mongodb.com/docs/atlas/api/data-api-resources/

if($_REQUEST['act'] == 'q'){

 // A sample PHP Script to POST data using cURL
  /* 1 doc
  $data = array(
      'dataSource' => 'Clusterpwa',
      'database' => 'pwa',
      'collection' => 'gis',
      //'filter'=> array( '_id' => '5e7e14555d0e655ff451c574' ),
       //"sort"=> array( "name" => 1 ),
      //"limit" => 10,
      //"skip" => 2,      
      //'projection'=> array( '_id' => '5e7e14555d0e655ff451c574'),    
      'filter'=> array( 'act' => 'a' )  
      //'projection'=> array( 'status' => 1, 'date'=> 1 )  //multi 
      
  );
  */
  ///*multi doc
  $data = array(
      'dataSource' => 'Clusterpwa',
      'database' => 'pwa',
      'collection' => 'gis',
      'filter'=> array( 'housenum' => '45' ) 
      //'filter'=> array( 'act' => 'a' ),
      //'sort'=> array( "meterno" => '1' ),
      //'limit' => 1000
      //'filter'=> array( '_id' => '5e7e14555d0e655ff451c574' ),
       //
      //"limit" => 10,
      //"skip" => 2,      
      //'projection'=> array( '_id' => '5e7e14555d0e655ff451c574'),    
      //
      //'projection'=> array( 'status' => 1, 'date'=> 1 )  //multi 
      
  );


  $post_data = json_encode($data);
  //*/
  //echo $post_data;

  /*
  $post_data = "{
      'dataSource': 'Clusterpwa',
      'database': 'linedb',
      'collection': 'stat',
      'filter': { 'status': 'add_friend' }   
  }";
  */

  // Prepare new cURL resource
  $crl = curl_init('https://data.mongodb-api.com/app/data-uigdl/endpoint/data/v1/action/findOne');
  
  curl_setopt($crl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);
  //curl_setopt($crl, CURLINFO_HEADER_OUT, true);
  curl_setopt($crl, CURLOPT_POST, true);

  curl_setopt($crl, CURLOPT_POSTFIELDS, $post_data); //1
    
  /*2
  curl_setopt($crl, CURLOPT_POSTFIELDS, array(
      "dataSource"=> "Clusterpwa",
      "database"=> "linedb",
      "collection"=> "stat",
      "filter"=> array( "status"=> "add_friend" )
  )); 
  */

  // Set HTTP Header for POST request 
  curl_setopt($crl, CURLOPT_HTTPHEADER, array(
  	  //'Content-Type: text/plain',
      'Content-Type: application/json',
      'Access-Control-Request-Headers: *',
      'api-key: 62ad1fc151d9920abb15aeec'
      //'Accept: application/ejson',		
      //'Content-Length: ' . strlen($payload))
  ));


  // Submit the POST request
  $result = curl_exec($crl);
  //$err = curl_error($crl);

  // handle curl error
  if ($result === false) {
      // throw new Exception('Curl error: ' . curl_error($crl));
      //print_r('Curl error: ' . curl_error($crl));
      echo $result_noti = 0; die();
  } else {

  	echo $result;

	  $data =json_decode($result);
	  //echo $data->document->lat;


      //echo $result_noti = 1; die();
  }
  // Close cURL session handle
  curl_close($crl);

  
}
else if($_REQUEST['act'] == 'qm'){

 // A sample PHP Script to POST data using cURL
  /* 1 doc
  $data = array(
      'dataSource' => 'Clusterpwa',
      'database' => 'pwa',
      'collection' => 'gis',
      //'filter'=> array( '_id' => '5e7e14555d0e655ff451c574' ),
       //"sort"=> array( "name" => 1 ),
      //"limit" => 10,
      //"skip" => 2,      
      //'projection'=> array( '_id' => '5e7e14555d0e655ff451c574'),    
      'filter'=> array( 'act' => 'a' )  
      //'projection'=> array( 'status' => 1, 'date'=> 1 )  //multi 
      
  );
  */
  ///*multi doc
  $data = array(
      'dataSource' => 'Clusterpwa',
      'database' => 'pwa',
      'collection' => 'gis',
      'filter'=> array( 'act' => 'a' ),
      'sort'=> array( "meterno" => 1 ),
      'limit' => 1000
      //'filter'=> array( '_id' => '5e7e14555d0e655ff451c574' ),
       //
      //"limit" => 10,
      //"skip" => 2,      
      //'projection'=> array( '_id' => '5e7e14555d0e655ff451c574'),    
      //
      //'projection'=> array( 'status' => 1, 'date'=> 1 )  //multi 
      
  );


  $post_data = json_encode($data);

  //*/
  //echo $post_data;

  /*
  $post_data = "{
      'dataSource': 'Clusterpwa',
      'database': 'linedb',
      'collection': 'stat',
      'filter': { 'status': 'add_friend' }   
  }";
  */

  // Prepare new cURL resource
  $crl = curl_init('https://data.mongodb-api.com/app/data-uigdl/endpoint/data/v1/action/find');
  
  curl_setopt($crl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);
  //curl_setopt($crl, CURLINFO_HEADER_OUT, true);
  curl_setopt($crl, CURLOPT_POST, true);

  curl_setopt($crl, CURLOPT_POSTFIELDS, $post_data); //1
    
  /*2
  curl_setopt($crl, CURLOPT_POSTFIELDS, array(
      "dataSource"=> "Clusterpwa",
      "database"=> "linedb",
      "collection"=> "stat",
      "filter"=> array( "status"=> "add_friend" )
  )); 
  */

  // Set HTTP Header for POST request 
  curl_setopt($crl, CURLOPT_HTTPHEADER, array(
      //'Content-Type: text/plain',
      'Content-Type: application/json',
      'Access-Control-Request-Headers: *',
      'api-key: 62ad1fc151d9920abb15aeec'
      //'Accept: application/ejson',    
      //'Content-Length: ' . strlen($payload))
  ));


  // Submit the POST request
  $result = curl_exec($crl);
  //$err = curl_error($crl);

  // handle curl error
  if ($result === false) {
      // throw new Exception('Curl error: ' . curl_error($crl));
      //print_r('Curl error: ' . curl_error($crl));
      echo $result_noti = 0; die();
  } else {

    echo $result;

    //$data =json_decode($result);

    //echo $data->document->lat;

    //header('Content-Type: application/json; charset=utf-8');
    //echo json_encode($json_data);  // send data as json format

      //echo $result_noti = 1; die();
  }
  // Close cURL session handle
  curl_close($crl);

  
}


else if($_REQUEST['act'] == 'a'){


  // A sample PHP Script to POST data using cURL
  ///*1
  $data = array(
      'dataSource' => 'Clusterpwa',
      'database' => 'pwa',
      'collection' => 'gis',
      "document"=>  array(

        "act"=> $_REQUEST['act'],
        "lat"=> $_REQUEST['lat'],        
        "lng"=> $_REQUEST['lng'],
        "housenum"=> $_REQUEST['housenum'],
        "meterno"=> $_REQUEST['meterno'],
        "image"=> $_REQUEST['image'],
        "date"=>  date('Y-m-d H:i:s')

      )


  );
  $post_data = json_encode($data);
  //*/
  //echo $post_data;


  // Prepare new cURL resource
  $crl = curl_init('https://data.mongodb-api.com/app/data-uigdl/endpoint/data/v1/action/insertOne');
  
  curl_setopt($crl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);
  //curl_setopt($crl, CURLINFO_HEADER_OUT, true);
  curl_setopt($crl, CURLOPT_POST, true);

  curl_setopt($crl, CURLOPT_POSTFIELDS, $post_data); //1
    
  // Set HTTP Header for POST request 
  curl_setopt($crl, CURLOPT_HTTPHEADER, array(
      //'Content-Type: text/plain',
      'Content-Type: application/json',
      'Access-Control-Request-Headers: *',
      'api-key: 62ad1fc151d9920abb15aeec'
      //'Accept: application/ejson',    
      //'Content-Length: ' . strlen($payload))
  ));


  // Submit the POST request
  $result = curl_exec($crl);
  //$err = curl_error($crl);

  // handle curl error
  if ($result === false) {
      // throw new Exception('Curl error: ' . curl_error($crl));
      //print_r('Curl error: ' . curl_error($crl));
      echo $result_noti = 0; die();
  } else {

    echo $result;
    $data =json_decode($result);
    echo $data->insertedId;


      echo $result_noti = 1; die();
  }
  // Close cURL session handle
  curl_close($crl);


}


else if($_REQUEST['act'] == 'am'){
  // A sample PHP Script to POST data using cURL
  ///*1
  $data = array(
      'dataSource' => 'Clusterpwa',
      'database' => 'linedb',
      'collection' => 'stat',
      "documents"=>  array(
        array(  
          "text"=> "Hello1",
          "name"=> "n1234",
          "Year"=> 2022,
          "Weight"=> "9823.1297",
          "Date"=> "2022-01-12T02:33:23.067Z"
        ),
        array(  
          "text"=> "Hello2",
          "name"=> "n2345",
          "Year"=> 2022,
          "Weight"=> "9823.1297",
          "Date"=> "2022-01-12T02:33:23.067Z"
        )
      )


  );
  $post_data = json_encode($data);
  //*/
  //echo $post_data;


  // Prepare new cURL resource
  $crl = curl_init('https://data.mongodb-api.com/app/data-uigdl/endpoint/data/v1/action/insertMany');
  
  curl_setopt($crl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);
  //curl_setopt($crl, CURLINFO_HEADER_OUT, true);
  curl_setopt($crl, CURLOPT_POST, true);

  curl_setopt($crl, CURLOPT_POSTFIELDS, $post_data); //1
    
  // Set HTTP Header for POST request 
  curl_setopt($crl, CURLOPT_HTTPHEADER, array(
      //'Content-Type: text/plain',
      'Content-Type: application/json',
      'Access-Control-Request-Headers: *',
      'api-key: 62ad1fc151d9920abb15aeec'
      //'Accept: application/ejson',    
      //'Content-Length: ' . strlen($payload))
  ));


  // Submit the POST request
  $result = curl_exec($crl);
  //$err = curl_error($crl);

  // handle curl error
  if ($result === false) {
      // throw new Exception('Curl error: ' . curl_error($crl));
      //print_r('Curl error: ' . curl_error($crl));
      echo $result_noti = 0; die();
  } else {

    echo $result;
    $data =json_decode($result);
    echo $data->insertedId;


      echo $result_noti = 1; die();
  }
  // Close cURL session handle
  curl_close($crl);


}

else if($_REQUEST['act'] == 'e'){
 // A sample PHP Script to POST data using cURL
  ///*1
  $data = array(
      'dataSource' => 'Clusterpwa',
      'database' => 'linedb',
      'collection' => 'stat',
      'filter'=> array( 'status' => 'not' ),
      'update'=> array('$set' => array( 'status' => 'not fount' )),
      "upsert"=> true,

      //upsert true ถ้าไม่เจอเงื่อนไขนี้จะ insert เพิ่มให้ใหม่  );
  );
  $post_data = json_encode($data);
  //*/
  //echo $post_data;


  // Prepare new cURL resource
  $crl = curl_init('https://data.mongodb-api.com/app/data-uigdl/endpoint/data/v1/action/updateOne');
  
  curl_setopt($crl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);
  //curl_setopt($crl, CURLINFO_HEADER_OUT, true);
  curl_setopt($crl, CURLOPT_POST, true);

  curl_setopt($crl, CURLOPT_POSTFIELDS, $post_data); //1
    
  // Set HTTP Header for POST request 
  curl_setopt($crl, CURLOPT_HTTPHEADER, array(
      //'Content-Type: text/plain',
      'Content-Type: application/json',
      'Access-Control-Request-Headers: *',
      'api-key: 62ad1fc151d9920abb15aeec'
      //'Accept: application/ejson',    
      //'Content-Length: ' . strlen($payload))
  ));


  // Submit the POST request
  $result = curl_exec($crl);
  //$err = curl_error($crl);

  // handle curl error
  if ($result === false) {
      // throw new Exception('Curl error: ' . curl_error($crl));
      //print_r('Curl error: ' . curl_error($crl));
      echo $result_noti = 0; die();
  } else {

    echo $result;
    $data =json_decode($result);
    echo $data->matchedCount.','.$data->modifiedCount;


      echo $result_noti = 1; die();
  }
  // Close cURL session handle
  curl_close($crl);




}
else if($_REQUEST['act'] == 'em'){
 // A sample PHP Script to POST data using cURL
  ///*1
  $data = array(
      'dataSource' => 'Clusterpwa',
      'database' => 'linedb',
      'collection' => 'stat',
      'filter'=> array( 'name' => 'test' ),
      'update'=> array('$set' => array( 'name' => 'nedit', 'date' => array( "$numberLong" => "1637083942954" ) ) ), 
      //"upsert"=> true|false
      "upsert"=> true,
      //upsert true ถ้าไม่เจอเงื่อนไขนี้จะ insert เพิ่มให้ใหม่  );        
  );
  $post_data = json_encode($data);
  //*/
  //echo $post_data;


  // Prepare new cURL resource
  $crl = curl_init('https://data.mongodb-api.com/app/data-uigdl/endpoint/data/v1/action/updateMany');
  
  curl_setopt($crl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);
  //curl_setopt($crl, CURLINFO_HEADER_OUT, true);
  curl_setopt($crl, CURLOPT_POST, true);

  curl_setopt($crl, CURLOPT_POSTFIELDS, $post_data); //1
    
  // Set HTTP Header for POST request 
  curl_setopt($crl, CURLOPT_HTTPHEADER, array(
      //'Content-Type: text/plain',
      'Content-Type: application/json',
      'Access-Control-Request-Headers: *',
      'api-key: 62ad1fc151d9920abb15aeec'
      //'Accept: application/ejson',    
      //'Content-Length: ' . strlen($payload))
  ));


  // Submit the POST request
  $result = curl_exec($crl);
  //$err = curl_error($crl);

  // handle curl error
  if ($result === false) {
      // throw new Exception('Curl error: ' . curl_error($crl));
      //print_r('Curl error: ' . curl_error($crl));
      echo $result_noti = 0; die();
  } else {

    echo $result;
    $data =json_decode($result);
    echo $data->matchedCount.','.$data->modifiedCount;


      echo $result_noti = 1; die();
  }
  // Close cURL session handle
  curl_close($crl);




}

else if($_REQUEST['act'] == 'r'){
 // A sample PHP Script to POST data using cURL
  ///*1
  $data = array(
      'dataSource' => 'Clusterpwa',
      'database' => 'linedb',
      'collection' => 'stat',
      'filter'=> array( 'text' => 'Hello2' ),
      'replacement'=> array( 'text' => 'nedit', 'date' => 2000 ),
      //"upsert"=> true|false
      "upsert"=> true,
      //upsert true ถ้าไม่เจอเงื่อนไขนี้จะ insert เพิ่มให้ใหม่  );         
  );
  $post_data = json_encode($data);
  //*/
  //echo $post_data;


  // Prepare new cURL resource
  $crl = curl_init('https://data.mongodb-api.com/app/data-uigdl/endpoint/data/v1/action/replaceOne');
  
  curl_setopt($crl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);
  //curl_setopt($crl, CURLINFO_HEADER_OUT, true);
  curl_setopt($crl, CURLOPT_POST, true);

  curl_setopt($crl, CURLOPT_POSTFIELDS, $post_data); //1
    
  // Set HTTP Header for POST request 
  curl_setopt($crl, CURLOPT_HTTPHEADER, array(
      //'Content-Type: text/plain',
      'Content-Type: application/json',
      'Access-Control-Request-Headers: *',
      'api-key: 62ad1fc151d9920abb15aeec'
      //'Accept: application/ejson',    
      //'Content-Length: ' . strlen($payload))
  ));


  // Submit the POST request
  $result = curl_exec($crl);
  //$err = curl_error($crl);

  // handle curl error
  if ($result === false) {
      // throw new Exception('Curl error: ' . curl_error($crl));
      //print_r('Curl error: ' . curl_error($crl));
      echo $result_noti = 0; die();
  } else {

    echo $result;
    $data =json_decode($result);
    echo $data->matchedCount.','.$data->modifiedCount;


      echo $result_noti = 1; die();
  }
  // Close cURL session handle
  curl_close($crl);


}

else if($_REQUEST['act'] == 'd'){
 // A sample PHP Script to POST data using cURL
  ///*1
  $data = array(
      'dataSource' => 'Clusterpwa',
      'database' => 'linedb',
      'collection' => 'stat',
      'filter'=> array( 'name' => 'nut' )   


  );
  $post_data = json_encode($data);
  //*/
  //echo $post_data;


  // Prepare new cURL resource
  $crl = curl_init('https://data.mongodb-api.com/app/data-uigdl/endpoint/data/v1/action/deleteOne');
  
  curl_setopt($crl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);
  //curl_setopt($crl, CURLINFO_HEADER_OUT, true);
  curl_setopt($crl, CURLOPT_POST, true);

  curl_setopt($crl, CURLOPT_POSTFIELDS, $post_data); //1
    
  // Set HTTP Header for POST request 
  curl_setopt($crl, CURLOPT_HTTPHEADER, array(
      //'Content-Type: text/plain',
      'Content-Type: application/json',
      'Access-Control-Request-Headers: *',
      'api-key: 62ad1fc151d9920abb15aeec'
      //'Accept: application/ejson',    
      //'Content-Length: ' . strlen($payload))
  ));


  // Submit the POST request
  $result = curl_exec($crl);
  //$err = curl_error($crl);

  // handle curl error
  if ($result === false) {
      // throw new Exception('Curl error: ' . curl_error($crl));
      //print_r('Curl error: ' . curl_error($crl));
      echo $result_noti = 0; die();
  } else {
    echo $result;

    $data =json_decode($result);
    echo $data->deletedCount;


      echo $result_noti = 1; die();
  }
  // Close cURL session handle
  curl_close($crl);



}
else if($_REQUEST['act'] == 'dm'){
 // A sample PHP Script to POST data using cURL
  ///*1
  $data = array(
      'dataSource' => 'Clusterpwa',
      'database' => 'linedb',
      'collection' => 'stat',
      'filter'=> array( 'name' => 'nut' )   


  );
  $post_data = json_encode($data);
  //*/
  //echo $post_data;


  // Prepare new cURL resource
  $crl = curl_init('https://data.mongodb-api.com/app/data-uigdl/endpoint/data/v1/action/deleteMany');
  
  curl_setopt($crl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);
  //curl_setopt($crl, CURLINFO_HEADER_OUT, true);
  curl_setopt($crl, CURLOPT_POST, true);

  curl_setopt($crl, CURLOPT_POSTFIELDS, $post_data); //1
    
  // Set HTTP Header for POST request 
  curl_setopt($crl, CURLOPT_HTTPHEADER, array(
      //'Content-Type: text/plain',
      'Content-Type: application/json',
      'Access-Control-Request-Headers: *',
      'api-key: 62ad1fc151d9920abb15aeec'
      //'Accept: application/ejson',    
      //'Content-Length: ' . strlen($payload))
  ));


  // Submit the POST request
  $result = curl_exec($crl);
  //$err = curl_error($crl);

  // handle curl error
  if ($result === false) {
      // throw new Exception('Curl error: ' . curl_error($crl));
      //print_r('Curl error: ' . curl_error($crl));
      echo $result_noti = 0; die();
  } else {
    echo $result;

    $data =json_decode($result);
    echo $data->deletedCount;


      echo $result_noti = 1; die();
  }
  // Close cURL session handle
  curl_close($crl);



}


else{
  echo 'no data';
}

?>


