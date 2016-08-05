<?php
try{
	$con = new PDO('mysql:host=localhost;dbname=procric_avakaash', "root","" );
	//echo "connected";
}catch(Exception $e){
	echo $e;
}
