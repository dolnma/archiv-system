<?php

// If there is no constant defined called __CONFIG__, do not load this file 
if(!defined('__CONFIG__')) {
	exit('You do not have a config file');
}


class Servers {

	private $con;

	public $user_id;
	public $email;
	public $reg_time;
    public $id;

    public static function ServersTable($id) {

		$con = DB::getConnection();
        $logList = $con->prepare("SELECT id,server_id, message, status, date FROM `logs` WHERE server_id = ".$id." ORDER BY date DESC LIMIT 20");
        $logList->execute();
        $logs = $logList->fetchAll();
        foreach ($logs as $log) {
            return '<tr><td>' . $log['id'] . '</td><td>' . $log['server_id'] . '</td><td>' . $log['message'] . '</td><td>' . $log['status'] . '</td><td>' . $log['date'] .'</td></tr>';
        }
	}


}
?>
