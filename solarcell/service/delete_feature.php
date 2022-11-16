<?php
	date_default_timezone_set("Asia/Bangkok");
	//@ini_set('display_errors', '1'); //แสดงerror
	@ini_set('display_errors', '0'); //ไม่แสดงerror
	//ini_set('memory_limit', '-1'); 
	session_start();

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



	$uid = '';
	$area='';
	$pwacode='';

	require 'chk_permiss.php';
	$res = array();

	if($uid != '' && $area != '' && $pwacode != ''){

			$type=$_REQUEST['type'];	
			$keyid= $_REQUEST['id'];

			
			//echo $keyid;
			//echo '<br>';

			if($type == 'point'){
				$folder='../data/point/u'.md5($uid).'/u'.md5($uid).".txt";
				//echo $folder;
				
				$a = 1;
				$d;
				$line_del;
				$myfile = fopen($folder, "r") or die("Unable to open file!");
					while ($liner = fgets($myfile)) {
						//echo $liner;
						$data = explode(" | ",$liner);
						$id= $data[2];
						
					
						if($keyid == $id){
							//echo $id;
							$line_del=$liner;
							$d =$a;

							//echo $d;
							break;
						}
						else{
							
						}
						$a++;
					}
				fclose($myfile);
				
				/*
				if($d!= null){
					//echo '<br><br><br>'.$d;

					$myfilew = fopen($folder, "w+") or die("Unable to open file!");
					//unset($lines[$key]);
					unset(fgets($myfilew)[$d]);
					fclose($myfilew);  
				}
				*/

				if($line_del!= null){
					$split = explode(" | ",$line_del);
					$img_file= str_replace("\r\n","",str_replace( "img:" , "" ,$split[5]) );
					$contents = file_get_contents($folder);
					$contents = str_replace($line_del, '', $contents);
					file_put_contents($folder, $contents);		
					if($img_file!='-' && $img_file!=''){
						unlink("../data/point/u".md5($uid)."/".$img_file);
					}
				}
				else{


				}

				array_push($res, array(
							'result' => 'success',
								'id' => $keyid,							
								'type' => $type,
							));

				header('Content-Type: application/json; charset=utf-8');
				echo json_encode($res);

			}
			else if($type == 'line'){
				
				$folder='../data/line/u'.md5($uid).'/u'.md5($uid).".txt";
				//echo $folder;
				
				$a = 1;
				$d;
				$line_del;
				$myfile = fopen($folder, "r") or die("Unable to open file!");
					while ($liner = fgets($myfile)) {
						//echo $liner;
						$data = explode(" | ",$liner);
						$id= $data[2];
						
					
						if($keyid == $id){
							//echo $id;
							$line_del=$liner;
							$d =$a;

							//echo $d;
							break;
						}
						else{
							
						}
						$a++;
					}
				fclose($myfile);
				
				/*
				if($d!= null){
					//echo '<br><br><br>'.$d;

					$myfilew = fopen($folder, "w+") or die("Unable to open file!");
					//unset($lines[$key]);
					unset(fgets($myfilew)[$d]);
					fclose($myfilew);  
				}
				*/

				if($line_del!= null){
					$contents = file_get_contents($folder);
					$contents = str_replace($line_del, '', $contents);
					file_put_contents($folder, $contents);		
				}
				else{


				}

				array_push($res, array(
							'result' => 'success',
								'id' => $keyid,							
								'type' => $type,
							));

				header('Content-Type: application/json; charset=utf-8');
				echo json_encode($res);


			}
			else if($type == 'polygon'){
				$folder='../data/polygon/u'.md5($uid).'/u'.md5($uid).".txt";
				$a = 1;
				$d;
				$line_del;
				$myfile = fopen($folder, "r") or die("Unable to open file!");
					while ($liner = fgets($myfile)) {
						//echo $liner;
						$data = explode(" | ",$liner);
						$id= $data[2];
						
					
						if($keyid == $id){
							//echo $id;
							$line_del=$liner;
							$d =$a;

							//echo $d;
							break;
						}
						else{
							
						}
						$a++;
					}
				fclose($myfile);
				
				/*
				if($d!= null){
					//echo '<br><br><br>'.$d;

					$myfilew = fopen($folder, "w+") or die("Unable to open file!");
					//unset($lines[$key]);
					unset(fgets($myfilew)[$d]);
					fclose($myfilew);  
				}
				*/

				if($line_del!= null){
					$contents = file_get_contents($folder);
					$contents = str_replace($line_del, '', $contents);
					file_put_contents($folder, $contents);		
				}
				else{


				}

				array_push($res, array(
							'result' => 'success',
								'id' => $keyid,							
								'type' => $type,
							));

				header('Content-Type: application/json; charset=utf-8');
				echo json_encode($res);


			}


	}
	else{
			array_push($res, array(
							'result' => 'warning',
							));
			header('Content-Type: application/json; charset=utf-8');
			echo json_encode($res);
		
	}

?>
