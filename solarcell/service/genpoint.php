<?php
	date_default_timezone_set("Asia/Bangkok");
	//@ini_set('display_errors', '1'); //แสดงerror
	@ini_set('display_errors', '0'); //ไม่แสดงerror

	//ini_set('memory_limit', '-1'); 
	session_start();
	ini_set('memory_limit', '512M');
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



	//$_REQUEST['pwacode']= '5552017';
	//$_REQUEST['comment']= 'ไม่เหมาะสมที่จะติดตั้ง Solar cell';


	$uid = '12974';
	$area='5';
	$pwacode='5552011';

	//require 'chk_permiss.php';
	$res = array();

	if($uid != '' && $area != '' && $pwacode != ''){

			$detail='';

			$uid = 'u'.md5($uid);
			//$act=$_REQUEST['act'];	
			//$id=$_REQUEST['id'];
			//$lat=$_REQUEST['lat'];
			//$lng=$_REQUEST['lng'];
			$pwacode1=$_REQUEST['pwacode'];
			$comment1=$_REQUEST['comment'];
			$folder1='../comment/'.$uid.'/';
			
			$line_del;
			$myfile1 = fopen($folder1.$uid.".txt", "r") or die("Unable to open file!");
				while ($liner = fgets($myfile1)) {
					//echo $liner;
					$data = explode(" | ",$liner);
					$code= $data[1];
					//echo $code;
					if($code == "pwacode:".$_REQUEST['pwacode']){
						//echo $liner;
						$line_del=$liner;
						//echo $d;
						break;
					}
					else{
						
					}
					
				}

			fclose($myfile1);


			if($line_del!= ''){
				echo $line_del;
		    	//$txt = 'ลบ ' . $line_del;

		    	$txt = 'ลบ '.str_replace('\r\n', '', $line_del);
		    	$myfile = file_put_contents('../comment/'.$uid.'/'.'backup.txt', $txt , FILE_APPEND | LOCK_EX);
				
				//$f1 = fopen ($folder1."backup.txt", "wb"); 
				//fwrite($f1, 'ลบ ' . $line_del);
				//fclose($f1);


				$dir= $folder1.$uid.".txt";

				$contents = file_get_contents($dir);
				//$contents = str_replace('\r\n', '', $contents);
				$contents = str_replace($line_del, '', $contents);
				
				file_put_contents($dir, $contents);				
			}

						
			/*
			$mystring = fgets ($myfile1);
			$mystring = rtrim ($mystring, PHP_EOL);
			

			fclose($myfile1);
			*/


			//$nameimg='';
			//$gen_name = getRandomString($n);

			//$reg=$_POST['reg'];
			//$pwa_code= $_POST['pwa_code'];
			//$custcode= $_POST['custcode'];
			//$table=" meterstat.r".$reg."_metercheck";		
			//$folder_out='../img_meter/'.$reg.'_'.$pwa_code.'/';

			$folder_out='../comment/'.$uid.'/';
			$time_curr =time();

			//$keyid= 'p'.$gen_name.$time_curr;

			if (!file_exists($folder_out)) {
				mkdir($folder_out, 0777, true);
			}

			if(isset($_FILES["upload_img"])){
				
				//include 'connect.php';
				$i = 0;
				foreach($_FILES['upload_img_meter']['tmp_name'] as $key => $val){
						
						$file_name = $_FILES['upload_img_meter']['name'][$key];
						$file_size =$_FILES['upload_img_meter']['size'][$key];
						$file_tmp =$_FILES['upload_img_meter']['tmp_name'][$key];
						$file_type=$_FILES['upload_img_meter']['type'][$key];  
						//echo 'file_type='.$file_type;

						$typ = array_pop(explode('.', $file_name));
						$splitnewname = $time_curr.'.'.$typ;
						
						//move_uploaded_file($file_tmp,"../b_code/".$b_code."/public/".$file_name);
						//$new_name=$uid.'_'.$gen_name_img.$file_name;
						$new_name='img_'.$gen_name.'_'.$splitnewname;
						$images = $folder_out."/".$new_name;

						$nameimg=$new_name; //change name and keep in log

						$images_new=$images;
						
						$size_ = getimagesize($file_tmp);  // $size[2] ¤×Íª¹Ô´ä¿Åì
						$ho = $size_[1];
						$wo = $size_[0];
						/* 				// ÃÙ»¨µØÃÑÊ
						if ($ho == $wo){
							if ($ho <= 1024){
								$height1 = $ho;
								$width1 = $wo;
							}
						
							else if ($ho> 1024){
								$height1 = 1024; //¡ÓË¹´¢¹Ò´¤ÇÒÁÊÙ§
								$width1 = 1024; //¢¹Ò´¤ÇÒÁ¡ÇéèÒ§¤Ó¹Ç¹à¾×èÍ¤ÇÒÁÊÁÊèÇ¹¢Í§ÃÙ»
							}
						} */				
						// ¶éÒ ¤ÇÒÁÊÙ§ ÁÒ¡¡ÇèÒ ¤ÇÒÁ¡ÇéÒ§
						if ($ho > $wo){
							if ($ho <= 1024){
								$height1 = $ho;
								$width1 = $wo;
							}
						
							else if ($ho> 1024){
								$height1 = 1024; //¡ÓË¹´¢¹Ò´¤ÇÒÁÊÙ§
								$width1 = round($height1*$wo/$ho); //¢¹Ò´¤ÇÒÁ¡ÇéèÒ§¤Ó¹Ç¹à¾×èÍ¤ÇÒÁÊÁÊèÇ¹¢Í§ÃÙ»
							}
						}
						
						// ¶éÒ ¤ÇÒÁÊÙ§ ¹éÍÂ¡ÇèÒËÃ×Íà·èÒ¡Ñº ¤ÇÒÁ¡ÇéÒ§
						else if ($ho <= $wo){
							if ($wo <= 1024){
								$height1 = $ho;
								$width1 = $wo;
							}
						
							else if ($wo> 1024){
								$width1 = 1024; //¡ÓË¹´¢¹Ò´¤ÇÒÁ¡ÇéÒ§
								$height1 = round($width1*$ho/$wo); //¢¹Ò´¤ÇÒÁÊÙ§¤Ó¹Ç¹à¾×èÍ¤ÇÒÁÊÁÊèÇ¹¢Í§ÃÙ»
							}
						}
						if($file_type == 'image/jpeg')  {
							//image/jpeg
							//echo "jpg =" .$typepic;
							$images_orig1 = imagecreatefromjpeg($file_tmp); //resize ÃÙ»»ÃÐàÀ· JPEG
						}
						else if($file_type == 'image/png') {
							//image/png
							//echo "png =" .$typepic;
							$images_orig1 = imagecreatefrompng($file_tmp); //resize ÃÙ»»ÃÐàÀ·png
						}
						else if($file_type == 'image/gif') {
							//image/gif
							//echo "gif =" .$typepic;
							$images_orig1 = imagecreatefromgif($file_tmp); //resize ÃÙ»»ÃÐàÀ· GIF
						}

						$photoX1 = imagesx($images_orig1);
						$photoY1 = imagesy($images_orig1);
						$images_fin1 = imagecreatetruecolor($width1, $height1);

						imagefilledrectangle($images_fin1, 0, 0, $width1, $height1, imagecolorallocate($images_fin1, 255, 255, 255)); //ãÊè¾×é¹ÊÕ¢ÒÇ

						imagecopyresampled($images_fin1, $images_orig1, 0, 0, 0, 0, $width1+1, $height1+1, $photoX1, $photoY1);
						imagejpeg($images_fin1, $images); //ª×èÍä¿ÅìãËÁè
						imagedestroy($images_orig1);
						imagedestroy($images_fin1);
						/*if($i==0){
							$default_public_pic = 's_img/'.$file_name;
						}
						else{
						} */
						
						$i+=1;
				}
				
				
				//echo  "UPDATE $table SET img_meter='$new_name' WHERE custcode='$custcode'";
				/*
				$res=pg_query($connection, "UPDATE $table SET img_meter='$new_name' WHERE custcode='$custcode'");
				if($res){
					echo $new_name;
				}else{
					echo 'no file';
				}
				*/
				//pg_close($connection); 
				$detail= 'have image'; 
			}
			else{
				$detail= 'no image';
			}


			if($pwacode1 == ''){
				$pwacode1 = '-';
			}
			if($comment1 == ''){
				$comment1 = '-';
			}

			
			//-----------------log----------------//
		    $action= 'point'; 
		    $by= $uid;
		    //$by= $_SESSION['uid'];
		    //$pwacode = $_SESSION['pwacode'];
		    //$txt = date('Y-m-d H:i:s').' '.$action.' '.$pwacode.' '.$by;
		    $txt = date('Y-m-d H:i:s').' | pwacode:'.$pwacode1.' | comment:'.$comment1;
		    $myfile = file_put_contents('../comment/'.$uid.'/'.$uid.'.txt', $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
			//-----------------log----------------//
			
			//echo 'success';
			array_push($res, array(
							'result' => 'success',
							//'del' => $line_del,
							//'detail' => $detail
							));
			header('Content-Type: application/json; charset=utf-8');
			echo json_encode($res);
	


	}
	else{
			array_push($res, array(
							'result' => 'warning',
							));
			header('Content-Type: application/json; charset=utf-8');
			echo json_encode($res);
		/*
			//-----------------log----------------//
		    $action= 'warning'; 
		    $by= $uid;
		    $txt = $action.' '.date('Y-m-d H:i:s').' | '.$lat.','.$lng.' | meterno:'.$meterno.' | housenum:'.$housenum.' | img:'.$nameimg;
		    $myfile = file_put_contents('../data/point/log_other.txt', $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
			//-----------------log----------------//		
		*/

		//echo 'warning';
	}

?>
