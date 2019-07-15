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
    <a href="/logout.php">
        <button class="btn btn-danger">Odhlásit se</button>
    </a>
</div>
<div class="container-fluid">
    <div class="mt-5 row">
        <div class="col-12 col-md-6">
            <div class="row uk-section uk-container">
                <div class="col">
                    <h2>Nástěnka</h2>
                    <p>Přihlášený email: <?php echo $User->email; ?>, přihlášení v <?php echo $User->reg_time; ?></p>
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
                        <th>Čas kontroly</th>
                    </tr>
                    </thead>
                    <?php
                    $logList = $con->prepare("SELECT * FROM `logs` ORDER BY id DESC LIMIT 10");
                    $logList->execute();
                    $logs = $logList->fetchAll();
                    foreach ($logs as $log) {
                        echo '<tr><td>' . $log['id'] . '</td><td>' . $log['server_id'] . '</td><td>' . $log['message'] . '</td><td>' . $log['status'] . '</td><td>' . $log['date'] .'</td></tr>';
                    }
                    ?>
                </table>
            </div>
        </div>
        <div class="col-12 col-md-6">
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
                function showStatus($serverId) {
                    $con = DB::getConnection();
                    $logList = $con->prepare("SELECT * FROM `logs` WHERE server_id = $serverId ORDER BY date DESC LIMIT 1");
                    $logList->execute();
                    $logs = $logList->fetchAll();
                    foreach ($logs as $log) {
                        return $log['status'];
                    }
                }

                $serversList = $con->prepare("SELECT * FROM `servers` ORDER BY `id`");
                $serversList->execute();
                $servers = $serversList->fetchAll();

                foreach ($servers as $server) {

                    $serverId = $server['id'];

                    if ( showStatus($serverId) === 1) {
                        echo '<tr><td>' . $server['id'] . '</td><td>' . $server['ip'] . '</td><td>' . $server['name'] . '</td><td>' . $server['description'] . '</td><td><div class="dot--online"></div></td></tr>';
                    } else {
                        echo '<tr><td>' . $server['id'] . '</td><td>' . $server['ip'] . '</td><td>' . $server['name'] . '</td><td>' . $server['description'] . '</td><td><div class="dot--offline"></div></td></tr>';
                    }
                }
                ?>
            </table>
        </div>
    </div>
</div>

<?php require_once "inc/footer.php"; ?>
</body>
</html>
