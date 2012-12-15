<?php
/*
Plugin Name: WP Custom Admin Bar
Plugin URI: http://wesleytodd.com/?custom-plugin=admin-bar-control
Description: Added control of the Admin Bar. Hide it based on user roles, modify the styling, or disable it completely.
Author: Wes Todd
Version: 1.3.5
Author URI: http://wesleytodd.com
*/

require_once 'custom-admin-bar-admin.php';
require_once 'custom-admin-bar-functions.php';

register_activation_hook(__FILE__, 'cab_setup_defaults');