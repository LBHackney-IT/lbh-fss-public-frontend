<?php
defined( 'ABSPATH' ) or die( 'Direct script access disallowed.' );

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

				$asset_manifest = json_decode( file_get_contents( ERW_ASSET_MANIFEST ), true )['files'];

				if ( isset( $asset_manifest['main.css'] ) ) {
					wp_enqueue_style( 'erw', get_site_url() . $asset_manifest['main.css'], array(), null );
				}

				if ( isset( $asset_manifest['main.js'] ) ) {
					wp_enqueue_script( 'erw-main', get_site_url() . $asset_manifest['main.js'], array(), null, true );
				}
			}
		);
	}
);
