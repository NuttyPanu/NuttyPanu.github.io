<?php
	date_default_timezone_set("Asia/Bangkok");
	//@ini_set('display_errors', '1'); //แสดงerror
	@ini_set('display_errors', '0'); //ไม่แสดงerror

	//ini_set('memory_limit', '-1'); 
	session_start();
	//ini_set('memory_limit', '512M');
	//-------------------------------


	$n=10;
	function getRandomString($n) {
	    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    $randomString = '';
	  
	    for ($i = 0; $i < $n; $i++) {
	        $index = rand(0, strlen($characters) - 1);
	        $randomString .= $characters[$index];
	    }
	  
	    return $randomString;
	}
	  
	//echo getRandomString($n);


	$uid = '12974';
	$area='5';
	$pwacode='5552011';

	//require 'chk_permiss.php';

	$data = array();


	if($uid != '' && $area != '' && $pwacode != ''){
			$uid_ori=$uid;
			$uid = 'u'.md5($uid);

			$folder='../comment/'.$uid.'/';

			$myfileread = fopen($folder.$uid.".txt", "r") or die("Unable to open file!");
			// Output one character until end-of-file
			$a = 1;
			while ($line = fgets($myfileread)) {
			 //echo("<br>".$a." ".$line);
			 $a++;
				$res = explode(" | ",$line);

				$date= $res[0];

				$pwacode= str_replace("pwacode:","",$res[1]);
				$comment= str_replace("\r\n","",str_replace( "comment:" , "" ,$res[2]) );


				array_push($data, array(
							'result' => 'Found',											
							'pwacode' => $pwacode,
							'comment' => $comment,											
							'date' => $date
				));

			}
			/*
			while(!feof($myfileread)) {
			  echo fgetc($myfileread)."<br>";
			}
			*/
			fclose($myfileread);

			if(count($data) == 0){
				array_push($data, array(
								'result' => 'Not Found',
					));
			}

			header('Content-Type: application/json; charset=utf-8');
			echo json_encode($data);
			
	}
	else{
			array_push($data, array(
							'result' => 'Not Found',
				));

			header('Content-Type: application/json; charset=utf-8');
			echo json_encode($data);
			


	}


?>
