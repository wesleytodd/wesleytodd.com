<?php

Class Core {
	
	/**
	 * Constructor
	 */
	public function __construct() {
		// Setup autoloader
		spl_autoload_register(array('Core', 'autoloader'));

		// Setup Config Object
		$this->config = new Config(DOCROOT . '/config.json');

		// Setup Request Object
		$this->request = new Request();

		// Setup Page
		$this->page = new Page($this->config, $this->request);

		// Check if the page exists
		if ($this->page->page_exists) {

			// Setup the template
			$this->template = new Template($this->config, $this->request, $this->page);

			//$output = $this->template->render();

		} else {
			// 404
			echo "404";
		}

	}

	/**
	 * Auto Loader Method
	 */
	public static function autoloader($class) {
		try {
			include INCLUDES . "/" . strtolower($class) . ".php";
		} catch (Exception $e) {
			Core::debug($e);
		}
	}

	/**
	 * Debug
	 */
	public static function debug($var) {
		echo "<pre>";
		var_dump($var);
		echo "</pre>";
	}


}
