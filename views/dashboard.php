<?php

// Allow the config
define('__CONFIG__', true);
// Require the config
require_once "inc/config.php";
require_once "inc/header.php";

Page::ForceLogin();

$User = new User($_SESSION['user_id']);

?>
<body>
<div class="row justify-content-between align-items-center px-5 horni-lista">
    <span>Administrace archivních serverů</span>
    <a href="/logout.php"><button class="btn btn-danger">Odhlásit se</button></a>
</div>
<div class="container-fluid">
    <div class="mt-5 row">
        <div class="col-6">
            <div class="row uk-section uk-container">
                <div class="col">
                    <h2>Nástěnka</h2>
                    <p>Přihlášený email: <?php echo $User->email; ?>, přihlášení v <?php echo $User->reg_time; ?></p>
                    <p><a href="/logout.php">Odhlásit se</a></p>
                </div>
            </div>
            <div class="row p-5">
                <table class="table log-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>IP serveru</th>
                        <th>Zpráva</th>
                        <th>Dostupnost</th>
                    </tr>
                    </thead>
                    <?php
                    $logList = $con->prepare("SELECT id,server_id,message,status,date FROM `logs` ORDER BY `id` LIMIT 20");
                    $logList->execute();
                    $logs = $logList->fetchAll();
                    foreach ($logs as $log) {
                        echo '<tr><td>'. $log['id'] .'</td><td>'. $log['server_id'] .'</td><td>'. $log['message'] .'</td><td>'. $log['status'] .'</td></tr>';
                    }
                    ?>
                </table>
            </div>
        </div>
        <div class="col-6">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>IP serveru</th>
                    <th>Jméno</th>
                    <th>Popis</th>
                    <th>Aktuální stav</th>
                </tr>
                </thead>
                <?php
                $serversList = $con->prepare("SELECT id,ip,name,description FROM `servers` ORDER BY `id`");
                $serversList->execute();
                $servers = $serversList->fetchAll();
                foreach ($servers as $server) {
                    echo '<tr><td>'. $server['id'] .'</td><td>'. $server['ip'] .'</td><td>'. $server['name'] .'</td><td>'. $server['description'] .'</td></tr>';
                }
                ?>
            </table>
        </div>
    </div>
</div>

<?php require_once "inc/footer.php"; ?>
</body>
</html>
