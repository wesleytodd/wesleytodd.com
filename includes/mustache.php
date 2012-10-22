<?php
// Include Mustache.php
require INCLUDES . "/template_engines/mustache/src/Mustache/Autoloader.php";

Class Mustache {

	/**
	 * Constructor
	 */
	public function __construct() {
		Mustache_Autoloader::register();
		$this->engine = new Mustache_Engine();
	}

	/**
	 * Render
	 */
	public function render($template, $content) {
		return $this->engine->render($template, $content);
	}
}
