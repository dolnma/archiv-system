<?php 

	// Allow the config
	define('__CONFIG__', true);

	// Require the config
	require_once "../inc/config.php"; 

	if($_SERVER['REQUEST_METHOD'] == 'POST') {
		// Always return JSON format
		// header('Content-Type: application/json');

		$return = [];

		$serverId = Filter::String( $_POST['serverId'] );


			$statusIcon = $con->prepare("SELECT status, date FROM `logs` WHERE server_id = $serverId ORDER BY date DESC LIMIT 1");
			$statusIcon->execute();
        	$status = $logList->fetchAll();

		echo json_encode($status, JSON_PRETTY_PRINT); exit;
	} else {
		// Die. Kill the script. Redirect the user. Do something regardless.
		exit('Invalid URL');
	}
?>
