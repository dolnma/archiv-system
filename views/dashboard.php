<?php 

	// Allow the config
	define('__CONFIG__', true);
	// Require the config
	require_once "inc/config.php"; 

	Page::ForceLogin();

  $User = new User($_SESSION['user_id']);

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="follow">

    <title>Úvodní stránka</title>

    <base href="/" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.24/css/uikit.min.css" />
  </head>

  <body>

  	<div class="uk-section uk-container">
  		<h2>Úvodní stránka</h2>
      <p>Přihlášený email: <?php echo $User->email; ?>, přihlášení v <?php echo $User->reg_time; ?></p>
      <p><a href="/logout.php">Odhlásit se</a></p>
  	</div>

  	<?php require_once "inc/footer.php"; ?> 
  </body>
</html>
