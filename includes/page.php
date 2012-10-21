<?php

Class Page {

	/**
	 * Global Config
	 */
	protected $_global_config;

	/**
	 * Global Request
	 */
	 protected $_global_request;

	/**
	 * Pages Config
	 */
	protected $_config;

	/**
	 * The requested page
	 */
	public $requested_page;

	/**
	 * Page Exists
	 */
	public $page_exists;

	/**
	 * Constructor
	 */
	public function __construct($config, $request) {
		$this->_global_config = $config;
		$this->_global_request = $request;

		// Load in pages config
		$config_file = $this->_global_config->get('pages');
		$this->_config = new Config(DOCROOT . '/' . $config_file);

		$page_index = $this->exists($this->_global_request->uri(), TRUE);
		if ($page_index !== FALSE) {
			$this->page_exists = TRUE;
			$this->requested_page = $this->_config->get($page_index);
		} else {
			$this->page_exists = FALSE;
		}
	}

	/**
	 * Check if page exists
	 */
	public function exists($url = NULL, $return_index = FALSE) {
		if ($url === NULL) {
			$url = $this->_global_request->uri();
		}
		$pages = $this->_config->get();
		foreach ($pages as $index => $page) {
			if ($page['url'] == $url) {
				if ($return_index) {
					return $index;
				} else {
					return TRUE;
				}
			}
		}
		return FALSE;
	}
}
