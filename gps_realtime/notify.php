<?php 


			///*

			//$opt = '('.$id13.' stcard = '.$stcard.')';
			//$detail ='มีความพยายามแก้ไขสถานะการยืนยันบัตรฯ โดยผู้ใช้งาน '.$_SESSION[uname].' (รหัส พ. '.$_SESSION[uid].') เมื่อเวลา '.$timeserv.' '.$opt;
			$detail ='test1';
			//
			//$url_line = 'https://gis.pwa.co.th/dga/service/send_line.php';
			$url_line = 'https://gis.pwa.co.th/dga/service/notify.php';
					$chl = curl_init();
					curl_setopt( $chl, CURLOPT_URL, $url_line); 
					curl_setopt($chl, CURLOPT_RETURNTRANSFER , 1);
					curl_setopt($chl, CURLOPT_POST, 1);
					$values = array(
						'send' => 'line',
						'type' => 'dga',
						'detail' => $detail
					);
					$params = http_build_query($values);
					curl_setopt($chl, CURLOPT_POSTFIELDS,$params); 
					curl_exec($chl);		
					curl_close($chl);
			//*/	



			echo 'pass';




/*
//$message = $_REQUEST['message'];
$message = "ทดสอบแจ้งเตือน";
$chOne = curl_init(); 
curl_setopt( $chOne, CURLOPT_URL, "https://notify-api.line.me/api/notify"); 
// SSL USE 
curl_setopt( $chOne, CURLOPT_SSL_VERIFYHOST, 0); 
curl_setopt( $chOne, CURLOPT_SSL_VERIFYPEER, 0); 
//POST 
curl_setopt( $chOne, CURLOPT_POST, 1); 
// Message 
//curl_setopt( $chOne, CURLOPT_POSTFIELDS, $message); 
curl_setopt( $chOne, CURLOPT_POSTFIELDS, "message=$message"); 
// follow redirects 
curl_setopt( $chOne, CURLOPT_FOLLOWLOCATION, 1); 
//ADD header array 
//TDJ8h9FaJiVeGNjOAypTrha9kDptBUQpACv5GyCbdxA -- test   //nut   DVMpQwBLAEEQ0ICTs5uJ35d845GdLFOBJtHrqmcU01m
//$headers = array( 'Content-type: application/x-www-form-urlencoded', 'Authorization: Bearer XOGpKZf9YGtNX7y3hJZmjpfgvjdHzvXLEOJlahn46Av', ); // dga
$headers = array( 'Content-type: application/x-www-form-urlencoded', 'Authorization: Bearer XOGpKZf9YGtNX7y3hJZmjpfgvjdHzvXLEOJlahn46Av', );

curl_setopt($chOne, CURLOPT_HTTPHEADER, $headers); 
//RETURN 
curl_setopt( $chOne, CURLOPT_RETURNTRANSFER, 1); 
$result = curl_exec( $chOne ); 
//Check error 
if(curl_error($chOne)) { echo 'error:' . curl_error($chOne); } 
else { $result_ = json_decode($result, true); 
echo "status : ".$result_['status']; echo "message : ". $result_['message']; } 
//Close connect 
curl_close( $chOne ); 
*/
?>