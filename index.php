<?php
try {
	// Define DOCROOT
	define('DOCROOT', __DIR__);

	// Define INCLUDES
	define('INCLUDES', DOCROOT . "/includes");


	// Require Core Library
	require "./includes/core.php";

	// Initialize
	new Core();

} catch (Exception $e) {
	echo "<pre>";
	var_dump($e);
}
