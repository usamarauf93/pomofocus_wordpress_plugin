<?php
/**
 * Plugin Name: Pomodoro Timer
 * Plugin URI: https://technstack.com
 * Description: A WordPress Pomodoro timer plugin based on Pomofocus.io, with no user logins required.
 * Version: 1.0
 * Author: Usama & Rizwan
 * Author URI: https://technstack.com
 * License: GPL2
 * Text Domain: pomodoro-timer
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue Plugin Assets Conditionally
 */
function pomodoro_timer_enqueue_assets() {
    // Check if we're on a singular post/page and the shortcode is present
    if (is_singular() && has_shortcode(get_post()->post_content, 'pomodoro_timer')) {
        // Enqueue the CSS file
        wp_enqueue_style(
            'pomodoro-timer-style',
            plugin_dir_url(__FILE__) . 'assets/css/style.css',
            array(), // No dependencies
            '1.0.0'  // Version number
        );

        // Enqueue the JS file
        wp_enqueue_script(
            'pomodoro-timer-script',
            plugin_dir_url(__FILE__) . 'assets/js/script.js',
            array('jquery'), // Dependencies
            '1.0.0', // Version number
            true      // Load in footer
        );

        // Pass settings to JS
        wp_localize_script('pomodoro-timer-script', 'PomodoroTimerSettings', array(
            'primaryColor'    => '#38B6FF',
            'secondaryColor'  => '#FFFFFF',
            'backgroundColor' => '#D9D9D9',
            // Add more settings as needed
        ));
    }
}
add_action('wp_enqueue_scripts', 'pomodoro_timer_enqueue_assets');

/**
 * Shortcode for Pomodoro Timer
 */
function pomodoro_timer_shortcode($atts) {
    // Handle shortcode attributes with defaults
    $atts = shortcode_atts(
        array(
            'duration' => '25', // Default duration in minutes
        ),
        $atts,
        'pomodoro_timer'
    );

    // Sanitize and prepare variables
    $duration = intval($atts['duration']);

    // Make variables available to the view if needed
    // You can pass variables via global scope or use other methods
    // For simplicity, variables can be accessed directly in the view

    ob_start();

    // Construct the absolute path to the frontend_view.php file
    $file_path = plugin_dir_path(__FILE__) . 'views/frontend_view.php';

    // Check if the file exists to prevent errors
    if (file_exists($file_path)) {
        include $file_path;
    } else {
        echo '<p>Frontend view not found.</p>';
    }

    return ob_get_clean();
}
add_shortcode('pomodoro_timer', 'pomodoro_timer_shortcode');

/**
 * Activation Hook
 */
function pomodoro_timer_activate() {
    // Perform tasks like creating default options or database setup
    // Example: add_option('pomodoro_timer_option', 'default_value');
}
register_activation_hook(__FILE__, 'pomodoro_timer_activate');

/**
 * Deactivation Hook
 */
function pomodoro_timer_deactivate() {
    // Clean up tasks like removing options or temporary data
    // Example: delete_option('pomodoro_timer_option');
}
register_deactivation_hook(__FILE__, 'pomodoro_timer_deactivate');
