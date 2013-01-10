<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'westodd');

/** MySQL database username */
define('DB_USER', 'wesleytodd_com');

/** MySQL database password */
define('DB_PASSWORD', 'Y6DYtfvzfj3DVJKA');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         't-9BGl$9a8GCWW]d`o|B(wi!?Nb7OUoL*6};?IYJow5?Lwej,f8c%NsZ7hRwe_[P');
define('SECURE_AUTH_KEY',  'RbFTCFv}RT#8?DeS2|Wg-qV%tFqD![bn>vHFulJ0eR 3t/KMX7HGXcMp}7HNz,ek');
define('LOGGED_IN_KEY',    ']V!ZbSuy^Wx%])AB0PGr[Vc-+)|#}A6UrP+IP^8Xg{{UUzs<)@*Pzwlj@<yUGmWF');
define('NONCE_KEY',        '[Qf1&n&,7G+wA[yd(^,onG_X5i40@l+@*YXw+H+{x3qL%zI$scEHMCuN1<0M_9n~');
define('AUTH_SALT',        'O,w%IF0.4#luR<EROu+~nrwwu~=}7#2;Kg1RHMQ?H~u$*h4%6}KIw)pcS0)d#l t');
define('SECURE_AUTH_SALT', 'P=8rcod!o(-~3G9R5zL6*~2=7eG]!01JV2L+?vXU]Vmb*6+W/j.XW@@q7>~ |.Y@');
define('LOGGED_IN_SALT',   'F5d=C#a#&/v+uCIN[3aS=vi3X4&QX;1=LG#<~3We9-Pa)|6+)flis95oT- KI!U0');
define('NONCE_SALT',       ' nP02GTit[M.3]@F9|C;B]O- AGN$xRJRDfn/:0xl]vTg+oZT;^?E99pzlLOlMe|');


/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'jwt_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/*
 * Contact Form 7 Custom Changes
 */ 
if ( ! defined( 'WPCF7_LOAD_JS' ) )
	define( 'WPCF7_LOAD_JS', false );
if ( ! defined( 'WPCF7_SHOW_DONATION_LINK' ) )
	define( 'WPCF7_SHOW_DONATION_LINK', false );
 
/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
