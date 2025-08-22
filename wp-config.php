<?php
set_time_limit(300);
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'youtube' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'S::FCzx15r[UP&k*p[#h$C{O9_a&[_i.2gYms[exY5t4W^Y3h*X.{Kdpv{ND$Xm~' );
define( 'SECURE_AUTH_KEY',  '/))|KU,{JE&Mh[fD>.wt4(t5U!#X}:H>67?$41{j<9ySnzk}UW17|=/7~Z+B9;2=' );
define( 'LOGGED_IN_KEY',    '[bR.q7m`P0*TEKI=<%N-QfUB)qTOrl5V1%|9`;su[H+ht?;2(5rWq?+7M<*3/8_1' );
define( 'NONCE_KEY',        '&?*#<2`T7z0Ddng[Po91nEU<|+uu<&`iPpT$vNb>&Xas}W^!+eR^U6_F/)Q= W20' );
define( 'AUTH_SALT',        'Y2q;.5ZBSsV4K~a%pqZCxk-?jDnTl[s{IX&J{k}I8_T9l8N2wpV[Ior:78/qw-a[' );
define( 'SECURE_AUTH_SALT', '1(W)8:&ROUc$UT1u?U0nRT &@0{}a}R4pFk/P/R?,-$zkZ&$$CuJJj&[-^kJ/}`$' );
define( 'LOGGED_IN_SALT',   'J5uu;! . d&&.-L#4-|m?P7~opvH%;vr9opkfe:nT.QrqB;|1NTpzSg+c2vCRi)6' );
define( 'NONCE_SALT',       'N{ =+P&;,9.) rTUZUG 7<t(okV$z&CHmh@fi8pMqPn:ORTA<-^q,LyBazz?gOk:' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', true );

/* Add any custom values between this line and the "stop editing" line. */


/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
