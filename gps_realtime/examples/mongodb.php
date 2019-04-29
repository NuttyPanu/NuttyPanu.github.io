<?php
date_default_timezone_set('Asia/Bangkok');
header('Content-Type: text/html; charset=utf-8');

session_start();


$username = $_REQUEST['username'];
$password = $_REQUEST['password'];

$_SESSION[ses_userid] = session_id();
$_SESSION[username]= $username;
$_SESSION[password]= $password;
$_SESSION[hashid]= md5($username.$password);

echo $_SESSION[ses_userid].','.$_SESSION[username].','.$_SESSION[password];

/*
{
    "_id": {
        "$oid": "5b20c03e1f6e4f75faafd9f9"
    },
    "latlng": "13,100",
	"user": "panukorn",
	"password": "1234",
    "name": "nutty",
	"status": "on",
	"date": "2019-02-05"
}
*/

//$api_key="zCxIftNnbizcCTl61rydbRWUcFevJ5TR";
//$url = 'https://api.mlab.com/api/1/databases/location/collections/gps?apiKey='.$api_key;

////count-question---------//
//$json_c = file_get_contents('https://api.mlab.com/api/1/databases/location/collections/gps?apiKey='.$api_key.'&q={"question":"'.$_question.'"}&c=true');
//$count = json_decode($json_c);  //จำนวนที่นับได้
////count-question---------//
 
 
//https://api.mlab.com/api/1/databases/location/collections/gps?apiKey=zCxIftNnbizcCTl61rydbRWUcFevJ5TR&q={%22user%22:%22panukorn%22,%22password%22:%20%221234%22}&c=true



//$api_key="zCxIftNnbizcCTl61rydbRWUcFevJ5TR";
//$url = 'https://api.mlab.com/api/1/databases/location/collections/gps?apiKey='.$api_key;


if ($_REQUEST['act'] == "view"){


//
//						$pieces = explode("|", $msg);
//						$_sel = $pieces[1];
//
//						$api_key="zCxIftNnbizcCTl61rydbRWUcFevJ5TR";
//
//						$msg_encode = urlencode($_sel);
//						$json_cmsg = file_get_contents('https://api.mlab.com/api/1/databases/linedb/collections/meter_gis?apiKey='.$api_key.'&q={"question":"'.$msg_encode.'"}');
//						$q_msg = json_decode($json_cmsg); 
//				 
//						if($q_msg){
//							foreach($q_msg as $rec){
//								$a = array(
//											array(
//												'type' => 'text',
//												'text' => $rec->name     
//												//'text' => $rec->originalContentUrl 					
//											),
//											array(
//													'type' => 'image',
//													'originalContentUrl' => $rec->originalContentUrl ,
//													'previewImageUrl' => $rec->originalContentUrl 
//												)
//										);
//								$client->replyMessage1($event['replyToken'],$a);
//							}
//						}



}
else if ($_REQUEST['act'] == "add"){


//                //count-question---------//
//                $json_c = file_get_contents('https://api.mlab.com/api/1/databases/linedb/collections/meter_gis?apiKey='.$api_key.'&q={"question":"'.$_question.'"}&c=true');
//                $count = json_decode($json_c);  //จำนวนที่นับได้
//                //count-question---------//
// 
// 
// 
//						$id = $event['source']['userId'];
//                        $urlp = 'https://api.line.me/v2/bot/profile/'.$id;
//                        $channelAccessToken2 = '4D1qNJmm0xAaMRZCABdcz8+X/IH2eMKuKqD/1nSrWdPCQLiOZGlaD6tY4FUQ9spusBUSwAPR7D2W1hmnRHuPEk0X6a1YOKZfNYXFxAWvSKmH1ORbJ9vt6bW6HKAckdjKT6FYmQcJ9U95orRuBD1QTgdB04t89/1O/w1cDnyilFU=';
// 
//                        $header = array(
//                            "Content-Type: application/json",
//                            'Authorization: Bearer '.$channelAccessToken2,
//                        );
// 
//                        $ch = curl_init();
//                        //curl_setopt($ch, CURLOPT_HTTP_VERSION, 'CURL_HTTP_VERSION_1_1');
//                        //curl_setopt($ch, CURLOPT_VERBOSE, 1);
//                        //curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)');
//                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//                        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
//                        //curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
//                        curl_setopt($ch, CURLOPT_FAILONERROR, 0);       ;
//                        //curl_setopt($ch, CURLOPT_HTTPGET, 1);
//                        //curl_setopt($ch, CURLOPT_USERAGENT, $agent);
//                        //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
//                        curl_setopt($ch, CURLOPT_HEADER, 0);
//                        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
//                        curl_setopt($ch, CURLOPT_URL, $urlp);
//                         
//                        $profile =  curl_exec($ch);
//                        curl_close($ch);
//                        $obj = json_decode($profile);
// 
// 
//                        $pathpic = explode("cdn.net/", $obj->pictureUrl);
// 
// 
// 
//                if ($count == 0){
// 
//                    //Post New Data--------------------------//
//                    $newData = json_encode(
//                      array(
//                        'question' => $_question,
//                        'answer'=> $_answer,
//                        'uid'=> $uid,
//                        'name'=> $obj->displayName,
//                        'originalContentUrl' => 'https://obs.line-apps.com/'.$pathpic[1]
//                      )
//                    );
// 
//                    $opts = array(
//                      'http' => array(
//                          'method' => "POST",
//                          'header' => "Content-type: application/json",
//                          'content' => $newData
//                       )
//                    );
//                    $context = stream_context_create($opts);
//                    $returnValue = file_get_contents($url,false,$context);
//                    //Post New Data--------------------------//
// 
// 
//                    $sec = explode('"$oid" : "', $returnValue);
//                    $sec_id = explode('"', $sec[1]);
// 
//                     
//                    $t=array("น่ารักที่สุดอ่ะเราน่ะ","ต่อไปเราจะตอบเธอแบบนี้นะ","ขอบคุณที่สอนเรานะ","เข้าใจแล้วล่ะว่าต้องตอบเธอยังไง");
//                    $random_keys=array_rand($t,1);
//                    $txt = $t[$random_keys];
//                    $a = array(
//                                array(
//                                    'type' => 'text',
//                                    //'text' => $txt." เพิ่ม id:".$sec_id[0]." count:".$count
//                                    'text' => $txt
//                                )
//                            );
//                    $client->replyMessage1($event['replyToken'],$a);
// 
// 
//                }
//                else if ($count == 1){  
// 
//                    //query-คำถามที่เคยถามในdb----------------------------------//
//                    $json_f = file_get_contents('https://api.mlab.com/api/1/databases/linedb/collections/meter_gis?apiKey='.$api_key.'&q={"question":"'.$_question.'"}');
//                    $q_json_f = json_decode($json_f); 
//                    $q_json_id = $q_json_f[0]->_id;
//                    $q_json_oid = '';
//                    foreach ($q_json_id as $k=>$v){
//                        $q_json_oid = $v; // etc.
//                    }
// 
//                    //update-----------------------------------//
//                    //$_id = '59fb2268bd966f7657da67cc';
//                    $url_up = 'https://api.mlab.com/api/1/databases/linedb/collections/meter_gis/'.$q_json_oid.'?apiKey='.$api_key;
// 
//                    $newupdate = json_encode(
//                        array(
//                            '$set' => array('answer'=> $_answer)
//                        )
//                    );
// 
//                    $optsu = array(
//                        'http' => array(
//                            'method' => "PUT",
//                            'header' => "Content-type: application/json",
//                            'content' => $newupdate
//                        )
//                    );
// 
//                    $contextu = stream_context_create($optsu);
//                    $returnValup = file_get_contents($url_up, false, $contextu);
// 
// 
//                    $t=array("คำถามนี้เคยสอนแล้วนะ แต่ไม่เปงไร จำใหม่ก็ได้","สอนซ้ำๆแบบนี้ เมมจะเต็มแล้วนะ");
//                    $random_keys=array_rand($t,1);
//                    $txt = $t[$random_keys];
//                    //$txt = 'มีคำถามนี้แล้ว-อัพเดท $oid:';
//                    $a = array(
//                                array(
//                                    'type' => 'text',
//                                    //'text' => $txt." อัพเดท id:".$q_json_oid." count:".$count
//                                    'text' => $txt
//                                )
//                            );
//                    $client->replyMessage1($event['replyToken'],$a);
//                }


}
else if ($_REQUEST['act'] == "del"){
/*
		$pieces = explode(" ", $msg);
		$_sel = $pieces[1];

		$api_key="zCxIftNnbizcCTl61rydbRWUcFevJ5TR";

		//query-คำถามที่เคยถามในdb----------------------------------//
		$json_f = file_get_contents('https://api.mlab.com/api/1/databases/linedb/collections/meter_gis?apiKey='.$api_key.'&q={"question":"'.$_sel.'"}');
		$q_json_f = json_decode($json_f); 
		$q_json_id = $q_json_f[0]->_id;
		$q_json_oid = '';
		foreach ($q_json_id as $k=>$v){
			$q_json_oid = $v; // etc.
		}

		//$_id = '59fb2268bd966f7657da67cc';
		$url_d = 'https://api.mlab.com/api/1/databases/linedb/collections/meter_gis/'.$q_json_oid.'?apiKey='.$api_key;

		$optsd = array(
				'http' => array(
				'method' => "DELETE",
				'header' => "Content-type: application/json"
			)
		);

		$contextd = stream_context_create($optsd);
		$returnValdel = file_get_contents($url_d, false, $contextd);
*/

}


?>