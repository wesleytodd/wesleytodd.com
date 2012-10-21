<?php

Class Request {

	/**
	 * Request URI
	 */
	protected $uri;

	/**
	 * Request POST
	 */
	protected $post;

	/**
	 * Request GET
	 */
	protected $get;

	/**
	 * Initialize Request
	 */
	public function __construct() {
		$this->uri = $_SERVER['REQUEST_URI'];
		$this->post = $_POST;
		$this->get = $_GET;
	}

	public function uri() {
		return $this->uri;
	}

	public function post() {
		return $this->post;
	}

	public function get() {
		return $this->get;
	}

	public function isAjax() {
		return strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
	}

}
