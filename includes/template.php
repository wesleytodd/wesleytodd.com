<?php

Class Template {

	/**
	 * Global Config
	 */
	protected $_config;

	/**
	 * Global Request
	 */
	protected $_request;

	/**
	 * Page Object
	 */
	protected $_page;

	/**
	 * Constructor
	 */
	public function __construct($config, $request, $page) {
		$this->_config = $config;
		$this->_request = $request;
		$this->_page = $page->requested_page;

		$this->setTemplate($this->determineTemplate());
		$this->_templatePath = $this->getTemplatePath();
		$this->_templateConfig = $this->getTemplateConfig();

		$template_file = $this->getTemplateFile();

		if ($this->_templateConfig->get('template-type') == 'mustache') {
			require INCLUDES . "/mustache/src/Mustache/Autoloader.php";
			Mustache_Autoloader::register();
			$mustache = new Mustache_Engine();
			echo $mustache->render($template_file, array(
				'content' => 'This is some content'
			));
		}
	}

	/**
	 * Figure out which template to use
	 */
	public function determineTemplate($config = NULL, $page = NULL) {
		if ($config === NULL) {
			$config = $this->_config;
		}
		if ($page === NULL) {
			$page = $this->_page;
		}

		if ($this->_request->isAjax()) {
			return $config->get('ajax-template');
		} elseif (isset($page['template'])) {
			return $page['template'];
		} else {
			return $config->get('default-template');
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
		$template = $this->_config->get('templates');
		return $template[$this->_template];
	}

	/**
	 * Get template config file
	 */
	public function getTemplateConfig() {
		return new Config(DOCROOT . $this->_templatePath . 'config.json');
	}

	/**
	 * Get template file contents
	 */
	public function getTemplateFile() {
		return file_get_contents(DOCROOT . $this->_templatePath . $this->_templateConfig->get('index-file'));
	}

}
