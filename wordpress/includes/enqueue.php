<?php
/**
 * Enqueues scripts and styles for the FSS Directory embed.
 *
 * @package Fss_Directory
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
				// Use defer only (not async) so runtime and main load in order; async can break dependency order.
				return str_replace( ' src', ' defer src', $tag );
			},
			10,
			2
		);

		add_action(
			'wp_enqueue_scripts',
			function () {
				global $post;
				if ( ! is_a( $post, 'WP_Post' ) || ! has_shortcode( $post->post_content, 'erw_widget' ) ) {
					return;
				}

				if ( ! defined( 'ERW_ASSET_MANIFEST' ) || ! is_readable( ERW_ASSET_MANIFEST ) ) {
					return;
				}

				$raw            = file_get_contents( ERW_ASSET_MANIFEST ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- Local file path (asset manifest), not remote.
				$manifest       = is_string( $raw ) ? json_decode( $raw, true ) : null;
				$asset_manifest = ( isset( $manifest['files'] ) && is_array( $manifest['files'] ) ) ? $manifest['files'] : array();

				if ( empty( $asset_manifest ) ) {
					return;
				}

				$base_url = defined( 'ERW_BUILD_URL' ) ? rtrim( ERW_BUILD_URL, '/' ) . '/' : get_site_url() . '/';
				$version  = filemtime( ERW_ASSET_MANIFEST );

				if ( isset( $asset_manifest['main.css'] ) ) {
					wp_enqueue_style( 'erw', $base_url . ltrim( $asset_manifest['main.css'], '/' ), array(), $version );
					// Constrain FSS app when embedded in page (map + sidebar stay inside this box).
					$embed_css = '
                .fss-directory-embed { position: relative; height: calc(100vh - 120px); overflow: hidden; z-index: 0; padding: 0; margin: 0; }
                .fss-directory-embed #root { position: relative; height: 100%; padding: 0; margin: 0; }
                .fss-directory-embed #root .App { height: 100%; position: relative; }
                /* Content after the embed (e.g. Highlights) stays on top of the map */
                .fss-directory-embed + * { position: relative; z-index: 1; }
                .fss-directory-embed ~ .lbh-container { position: relative; z-index: 1; }
                ';
					wp_add_inline_style( 'erw', $embed_css );
				}

				if ( ! empty( $asset_manifest['runtime-main.js'] ) ) {
					wp_enqueue_script( 'erw-runtime', $base_url . ltrim( $asset_manifest['runtime-main.js'], '/' ), array(), $version, true );
				}

				if ( ! empty( $asset_manifest['main.js'] ) ) {
					wp_enqueue_script( 'erw-main', $base_url . ltrim( $asset_manifest['main.js'], '/' ), array( 'erw-runtime' ), $version, true );
				}

				foreach ( $asset_manifest as $key => $value ) {
					if ( preg_match( '@static/js/(.*)\.chunk\.js@', $key, $matches ) ) {
						if ( $matches && is_array( $matches ) && count( $matches ) === 2 ) {
							$name = 'erw-' . preg_replace( '/[^A-Za-z0-9_]/', '-', $matches[1] );
							wp_enqueue_script( $name, $base_url . ltrim( $value, '/' ), array( 'erw-main' ), $version, true );
						}
					}

					if ( preg_match( '@static/css/(.*)\.chunk\.css@', $key, $matches ) ) {
						if ( $matches && is_array( $matches ) && count( $matches ) === 2 ) {
							$name = 'erw-' . preg_replace( '/[^A-Za-z0-9_]/', '-', $matches[1] );
							wp_enqueue_style( $name, $base_url . ltrim( $value, '/' ), array( 'erw' ), $version );
						}
					}
				}
			}
		);
	}
);
