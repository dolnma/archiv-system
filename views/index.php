<?php 

	// Allow the config
	define('__CONFIG__', true);
	// Require the config
	require_once "inc/config.php"; 
	require_once "inc/header.php";

	Page::ForceDashboard();
?>

  <body>
	  <div class="row align-items-center h-100 justify-content-center">
		  <form class="js-login border p-5 col-8 col-lg-4">
				
              <h1 class="py-4">Přihlášení</h1>

              <div class="row flex-column">
			        <label class="uk-form-label" for="form-stacked-text">Email</label>
                    <input class="uk-input" id="form-stacked-text" type="email" required='required' placeholder="Uživatelský email">
              </div>

              <div class="pt-3 row flex-column">
			        <label class="uk-form-label" for="form-stacked-text">Heslo</label>
                    <input class="uk-input" id="form-stacked-text" type="password" required='required' placeholder="Heslo">
              </div>

			    <div class="uk-margin uk-alert uk-alert-danger js-error" style='display: none;'></div>

              <div class="py-4 row justify-content-center">
			        <button class="btn btn-success btn-lg col-12" type="submit">Přihlásit se</button>
              </div>


          </form>
	  </div>

  	<?php require_once "inc/footer.php"; ?> 
  </body>
</html>
