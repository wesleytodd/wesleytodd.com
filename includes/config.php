<?php

Class Config {
	
	/**
	 * Config settings
	 */
	protected $_config;

	/**
	 * Constructor
	 */
	public function __construct($file) {
		$this->_config = json_decode(file_get_contents($file), TRUE);
	}

	/**
	 * Get a configuration value
	 */
	public function get($key = NULL) {
		if (isset($this->_config[$key])) {
			return $this->_config[$key];
		} elseif ($key === NULL) {
			return $this->_config;
		} else {
			return NULL;
		}
	}

	/**
	 * Set a configuration value
	 */
	public function set($key, $val) {
		$this->_config = $val;
	}

}
