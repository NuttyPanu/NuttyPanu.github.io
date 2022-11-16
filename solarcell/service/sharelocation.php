<?php
	date_default_timezone_set("Asia/Bangkok");
	//@ini_set('display_errors', '1'); //แสดงerror
	@ini_set('display_errors', '0'); //ไม่แสดงerror
	//ini_set('memory_limit', '-1'); 


session_start();

$res = array();




$uid = '';
$area='';
$pwacode='';

require 'chk_permiss.php';

if($uid != '' && $area != '' && $pwacode != ''){

	if($_POST['act'] == 'get'){
		foreach (glob("location/u*.txt") as $filename) {
		    //echo $filename."<br />";

			$myfile = fopen($filename, "r") or die("Unable to open file!");
			//$result= fread($myfile,filesize("u12974.txt"));
			$id= explode('location/u', explode('.txt', $filename)[0])[1];
			$result = explode(',', fgets($myfile));
			//echo fread($myfile,filesize("u12974.txt"));
			fclose($myfile);
			if($id!='u'.$uid){
				array_push($res, array(
							'result' => 'Found',
							//'user' => $_SESSION['uid'],
							'id' => $id,
							'lat' => $result[0],
							'lng' => $result[1],
							'status' => $result[2],
							'accuracy' => $result[3],							
							'date' => $result[4]
							));
			}

		}
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($res);
	}
	else if($_POST['act'] == 'up'){

		
		$_POST['time']=date('Y-m-d H:i:s');
		$txt = $_POST['lat'].','.$_POST['lng'].',Online,'.$_POST['accuracy'].','.$_POST['time'];

		$myfile = fopen("location/u".$_SESSION['uid'].".txt", "w") or die("Unable to open file!");
		fwrite($myfile, $txt);
		fclose($myfile);
		array_push($res, array(
						'result' => 'ดำเนินการสำเร็จ'
						)
						);
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($res);

	}
	else if($_POST['act'] == 'del'){

		//$_POST['time']=date('Y-m-d H:i:s');
		/*
		$txt = '-,-,Offline,-,'.$_POST['time'];
		$myfile = fopen("u".$_SESSION['uid'].".txt", "w") or die("Unable to open file!");
		fwrite($myfile, $txt);
		fclose($myfile);
		*/
		unlink("location/u".$_SESSION['uid'].".txt");
		array_push($res, array(
						'result' => 'ดำเนินการสำเร็จ'
						)
						);
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($res);
	}




 }else {
	
	array_push($res, array(
					'result' => 'ไม่พบสิทธิ์การใช้งาน โปรดล็อคอิน'
					)
					);
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($res);
	
 }


?>
