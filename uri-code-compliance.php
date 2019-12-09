<?php
/**
 * Plugin Name: URI Code Compliance
 * Plugin URI: http://www.uri.edu
 * Description: Checks for ADA compliance and other coding issues.
 * Version: 0.1.0
 * Author: URI Web Communications
 * Author URI: https://today.uri.edu/
 *
 * @author: Brandon Fuller <bjcfuller@uri.edu>
 * @package uri-code-compliance
 */

// Block direct requests
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/**
 * Include css and js
 */
function uri_code_compliance_enqueues() {

	wp_register_style( 'uri-code-compliance-css', plugins_url( '/css/style.built.css', __FILE__ ) );
	wp_enqueue_style( 'uri-code-compliance-css' );

	wp_register_script( 'uri-code-compliance-js', plugins_url( '/js/script.built.js', __FILE__ ) );
	wp_enqueue_script( 'uri-code-compliance-js' );

}
add_action( 'wp_enqueue_scripts', 'uri_code_compliance_enqueues' );
