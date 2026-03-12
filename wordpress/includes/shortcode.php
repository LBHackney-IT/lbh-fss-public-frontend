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
		if ( ! defined( 'ERW_WIDGET_SHORTCODE_USED' ) ) {
			define( 'ERW_WIDGET_SHORTCODE_USED', true );
		}
		$manifest_ok = defined( 'ERW_ASSET_MANIFEST' ) && is_readable( ERW_ASSET_MANIFEST );
		$path        = defined( 'ERW_ASSET_MANIFEST' ) ? ERW_ASSET_MANIFEST : '(not set)';

		$out = "<div class='fss-directory-embed'><div id='root' class='fss-directory-app' data-erw-manifest='" . esc_attr( $path ) . "' data-erw-readable='" . ( $manifest_ok ? 'yes' : 'no' ) . "'></div></div>";

		if ( $manifest_ok && defined( 'ERW_BUILD_URL' ) ) {
			// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- Local manifest file, not remote.
			$raw      = file_get_contents( ERW_ASSET_MANIFEST );
			$manifest = is_string( $raw ) ? json_decode( $raw, true ) : null;
			$files    = ( isset( $manifest['files'] ) && is_array( $manifest['files'] ) ) ? $manifest['files'] : array();
			$base     = rtrim( ERW_BUILD_URL, '/' ) . '/';
			if ( ! empty( $files ) ) {
				if ( ! empty( $files['main.css'] ) ) {
					// phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedStylesheet -- Shortcode outputs link intentionally; assets loaded from manifest.
					$out .= '<link rel="stylesheet" href="' . esc_url( $base . ltrim( $files['main.css'], '/' ) ) . '" />';
				}
				if ( ! empty( $files['runtime-main.js'] ) ) {
					// phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedScript -- Shortcode outputs script intentionally; assets loaded from manifest.
					$out .= '<script defer src="' . esc_url( $base . ltrim( $files['runtime-main.js'], '/' ) ) . '"></script>';
				}
				if ( ! empty( $files['main.js'] ) ) {
					// phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedScript -- Shortcode outputs script intentionally; assets loaded from manifest.
					$out .= '<script defer src="' . esc_url( $base . ltrim( $files['main.js'], '/' ) ) . '"></script>';
				}
			}
		}

		if ( ! $manifest_ok ) {
			$out .= '<p class="erw-build-missing" style="padding:1em;background:#fef3cd;color:#856404;">FSS Directory: build not loaded. Plugin cannot read <code>asset-manifest.json</code>. Path: <code>' . esc_html( $path ) . '</code></p>';
		}
		return $out;
	}
);
