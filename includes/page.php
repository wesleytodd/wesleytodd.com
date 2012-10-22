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
	protected $_pages_config;

	/**
	 * The requested page
	 */
	protected $_requested_page = NULL;

	/**
	 * Page Exists
	 */
	protected $_page_exists;

	/**
	 * Constructor
	 */
	public function __construct($config, $request) {
		// Set local references to global settings
		$this->_global_config = $config;
		$this->_global_request = $request;

		// Load in pages config
		$config_file = $this->_global_config->get('pages');
		$this->_pages_config = new Config(DOCROOT . '/' . $config_file);

		// Check if requested page exists and set variables
		if ($this->exists()) {
			$this->setTemplate($this->determineTemplate());
			$this->_templatePath = $this->getTemplatePath();
			$this->_templateConfig = $this->getTemplateConfig();

			if ($this->_templateConfig->get('template-engine') == 'mustache') {
				$this->engine = new Mustache();
			}
		} else {
			$this->_page_exists = FALSE;
		}
	}

	/**
	 * Check if page exists
	 */
	public function exists() {
		// If no url was specified and $_page_exists 
		// has been set then return for requested page.
		if (isset($this->_page_exists)) {
			return $this->_page_exists;
		}

		// Else if no url was specified, set it to the currently
		// requested url and check the config.
		$url = $this->_global_request->uri();
		$pages = $this->_pages_config->get();
		foreach ($pages as $page) {
			if ($page['url'] == $url) {
				$this->_requested_page = $page;
				$this->_page_exists = TRUE;
				return $this->_page_exists;
			}
		}

		// Page does not exist
		$this->_page_exists = FALSE;
		return $this->_page_exists;
	}

	/**
	 * Get current page config
	 */
	public function requestedPage() {
		// If requested page has already been set
		if (isset($this->_requested_page)) {
			return $this->_requested_page;
		}
		
		// Else, set it in exists function
		if ($this->exists()) {
			return $this->_requested_page;
		}

		// Page wasn't found
		return FALSE;
	}

	/**
	 * Figure out which template to use
	 */
	public function determineTemplate($page = NULL) {
		if ($page === NULL) {
			$page = $this->requestedPage();
		}

		if ($this->_global_request->isAjax()) {
			return $this->_global_config->get('ajax-template');
		} elseif (isset($page['template'])) {
			return $page['template'];
		} else {
			return $this->_global_config->get('default-template');
		}
	}

	/**
	 * Set the template
	 */
	public function setTemplate($template) {
		$this->_template = $template;
	}

	/**
	 * Get template file
	 */
	public function getTemplatePath() {
		if (isset($this->_templatePath)) {
			return $this->_templatePath;
		}
		$template = $this->_global_config->get('templates');
		return $template[$this->_template];
	}

	/**
	 * Get template config file
	 */
	public function getTemplateConfig() {
		if (isset($this->_templateConfig)) {
			return $this->_templateConfig;
		}
		return new Config(DOCROOT . $this->_templatePath . 'config.json');
	}

	/**
	 * Get template file contents
	 */
	public function getTemplateFile($path = NULL, $file = NULL) {
		if ($path === NULL) {
			$path = $this->_templatePath;
		}
		if ($file === NULL) {
			$file = $this->_templateConfig->get('file');
		}
		return file_get_contents(DOCROOT . $path . $file);
	}

	/**
	 * Render page
	 */
	public function render() {
		$template_file = $this->getTemplateFile();
		echo $this->engine->render($template_file, $this);
	}
}
