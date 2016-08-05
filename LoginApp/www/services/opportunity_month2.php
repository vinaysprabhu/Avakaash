<?php
require("../js/conn.php");
$stmt = $con->prepare("SELECT * FROM opportunity_master WHERE YEAR(opportunity_date) = YEAR(NOW() + INTERVAL 1 MONTH) AND MONTH(opportunity_date)=MONTH(NOW() + INTERVAL 1 MONTH) AND
        opportunity_date >= CURDATE() ORDER BY opportunity_date ASC");

 $stmt->execute();
  $response["opportunity_master"] = array();
while($row =$stmt->fetch()){
	$opportunity_master = array();
    $opportunity_master["id"]=$row['opportunity_id'];
    $opportunity_master["catagoryid"]=$row['categoryId'];
    $opportunity_master["website"]=$row['opportunity_type'];
    //print_r($row['opportunity_date']);
    $time=strtotime($row['opportunity_date']);
    $month=date("F",$time);

    $opportunity_master["opportunity_date"]=$month;
    $opportunity_master["opportunity_title"]=$row['opportunity_title'];
    $opportunity_master["opportunity_desc"]=$row['opportunity_desc'];
    $opportunity_master["event_start_date"]=$row['event_start_date'];
    $opportunity_master["description"]=$row['event_end_date'];
    $opportunity_master["from_age"]=$row['from_age'];
    $opportunity_master["from_class"]=$row['from_class'];
    $opportunity_master["to_age"]=$row['to_age'];
    $opportunity_master["to_class"]=$row['to_class'];
    $opportunity_master["website"]=$row['website'];
    $opportunity_master["date_added"]=$row['date_added'];
    $opportunity_master["state"]=   $row['state'];
    $response["success"] = TRUE;
 array_push($response["opportunity_master"], $opportunity_master);
  
}
 echo json_encode($response);
  
   ?>