<?php
/**
 * Shortcode registration for the plugin.
 *
 * @link       http://nudgedigital.co.uk
 * @since      1.0.0
 * @package    Fss_Directory
 */

defined( 'ABSPATH' ) || die( 'Direct script access disallowed.' );

add_shortcode(
	'erw_widget',
	function ( $atts ) {
		$default_atts = array();
		$args         = shortcode_atts( $default_atts, $atts );

		return "<div id='root'></div>";
	}
);
