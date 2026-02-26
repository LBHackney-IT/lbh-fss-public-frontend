<?php
/**
 * Enqueue plugin scripts and styles.
 *
 * @link       http://nudgedigital.co.uk
 * @since      1.0.0
 * @package    Fss_Directory
 */

defined( 'ABSPATH' ) || die( 'Direct script access disallowed.' );

add_action(
	'init',
	function () {

		add_filter(
			'script_loader_tag',
			function ( $tag, $handle ) {
				if ( ! preg_match( '/^erw-/', $handle ) ) {
					return $tag;
				}
				return str_replace( ' src', ' async defer src', $tag );
			},
			10,
			2
		);

		add_action(
			'wp_enqueue_scripts',
			function () {

				// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- Local file, not remote.
				$asset_manifest = json_decode( file_get_contents( ERW_ASSET_MANIFEST ), true )['files'];

				if ( isset( $asset_manifest['main.css'] ) ) {
					// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion -- Version from build.
					wp_enqueue_style( 'erw', get_site_url() . $asset_manifest['main.css'], array(), null );
				}

				if ( isset( $asset_manifest['main.js'] ) ) {
					// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion -- Version from build.
					wp_enqueue_script( 'erw-main', get_site_url() . $asset_manifest['main.js'], array(), null, true );
				}
			}
		);
	}
);
