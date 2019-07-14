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

	public static function ServersTable() {

		$con = DB::getConnection();

		$serversList = $con->prepare("SELECT id,ip FROM `servers` ORDER BY `id`");
		$serversList->execute();

		return $serversList->fetch(PDO::FETCH_ASSOC);
	}


}
?>
