<?php

Class Request {

	/**
	 * Request URI
	 */
	protected $_uri;

	/**
	 * Request POST
	 */
	protected $_post;

	/**
	 * Request GET
	 */
	protected $_get;

	/**
	 * Request Method
	 */
	protected $_method;

	/**
	 * Initialize Request
	 */
	public function __construct() {
		$this->_uri = $_SERVER['REQUEST_URI'];
		$this->_post = $_POST;
		$this->_get = $_GET;
		$this->_method = $_SERVER['REQUEST_METHOD'];
	}

	public function uri() {
		return $this->_uri;
	}

	public function post() {
		return $this->_post;
	}

	public function get() {
		return $this->_get;
	}

	public function method() {
		return $this->_method;
	}

	public function isAjax() {
		return strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
	}

}
