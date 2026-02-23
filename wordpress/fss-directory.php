<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://nudgedigital.co.uk
 * @since             1.0.0
 * @package           Fss_Directory
 *
 * @wordpress-plugin
 * Plugin Name:       FSS Directory
 * Plugin URI:        http://nudgedigital.co.uk
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Nudge Digital
 * Author URI:        http://nudgedigital.co.uk
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       fss-directory
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('FSS_DIRECTORY_VERSION', '1.0.0');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-fss-directory-activator.php
 */
function activate_fss_directory()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-fss-directory-activator.php';
	Fss_Directory_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-fss-directory-deactivator.php
 */
function deactivate_fss_directory()
{
	require_once plugin_dir_path(__FILE__) . 'includes/class-fss-directory-deactivator.php';
	Fss_Directory_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_fss_directory');
register_deactivation_hook(__FILE__, 'deactivate_fss_directory');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-fss-directory.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_fss_directory()
{

	$plugin = new Fss_Directory();
	$plugin->run();
}
run_fss_directory();

define('ERW_WIDGET_PATH', plugin_dir_path(__FILE__) . '/lbh-fss-public-frontend');
define('ERW_ASSET_MANIFEST', ERW_WIDGET_PATH . '/build/asset-manifest.json');
define('ERW_INCLUDES', plugin_dir_path(__FILE__) . '/includes');

require_once(ERW_INCLUDES . '/enqueue.php');
require_once(ERW_INCLUDES . '/shortcode.php');
