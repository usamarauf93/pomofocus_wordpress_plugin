<?php
/**
 * Plugin Name: Pomodoro Timer
 * Plugin URI: https://technstack.com
 * Description: A WordPress Pomodoro timer plugin based on Pomofocus.io, with no user logins required.
 * Version: 1.0
 * Author: Usama Rauf (usamarauf93@gmail.com)
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
            time(),  // Version number
        );
        wp_enqueue_style(
            'pomodoro-timer-settings-style',  // Changed handle to be unique
            plugin_dir_url(__FILE__) . 'assets/css/settingsCss.css',
            array(), // No dependencies
            time(),
        );
        // Enqueue the JS file
        wp_enqueue_script(
            'pomodoro-timer-script',
            plugin_dir_url(__FILE__) . 'assets/js/script.js',
            array('jquery'), // Dependencies
           time(), // Version number
            true      // Load in footer
        );
        // Enqueue the JS file
        wp_enqueue_script(
            'pomodoro-timer-script2',
            plugin_dir_url(__FILE__) . 'assets/js/setting_view.js',
            array('jquery'), // Dependencies
            time(), // Version number
            true      // Load in footer
        );

        // Pass settings to JS
        wp_localize_script('pomodoro-timer-script', 'pomodoroTimerSettings', array(
            'colorTheme' => [
                'theme1' => '#38b6ff',
                'theme2' => 'rgb(56, 133, 138)',
                'theme3' => 'rgb(57, 112, 151)'
            ],
            'tickFast' => plugins_url('assets/sounds/tickingFast.mp3', __FILE__),
            'tickSlow' => plugins_url('assets/sounds/tickingSlow.mp3', __FILE__),
            'alarm' => plugins_url('assets/sounds/alarm.mp3', __FILE__),
            'bird' => plugins_url('assets/sounds/bird.mp3', __FILE__),
            'digital' => plugins_url('assets/sounds/digital.mp3', __FILE__),
            'kitchen' => plugins_url('assets/sounds/kitchen.mp3', __FILE__),
            'wood' => plugins_url('assets/sounds/wood.mp3', __FILE__)
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
            'width'    => '1900px', // Default width
            'height'   => '800px', // Default height
        ),
        $atts,
        'pomodoro_timer'
    );

    // Sanitize and prepare variables
    $duration = intval($atts['duration']);
    $width = esc_attr($atts['width']);
    $height = esc_attr($atts['height']);

    ob_start();

    // Construct the absolute path to the frontend_view.php file
    $file_path = plugin_dir_path(__FILE__) . 'views/frontend_view.php';

    // Check if the file exists to prevent errors
    if (file_exists($file_path)) {
        echo '<div class="pomodoro-timer-container" style="min-width:' . $width . '; min-height:' . $height . '; overflow: auto;">';
        include $file_path;
        echo '</div>';
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

    add_option('my_plugin_option', 'default_value', '', 'yes');
    error_log('Plugin activated, option added');


}
register_activation_hook(__FILE__, 'pomodoro_timer_activate');

/**
 * Deactivation Hook
 */
function pomodoro_timer_deactivate() {
    // Clean up tasks like removing options or temporary data
    // Example: delete_option('pomodoro_timer_option');


    delete_option('my_plugin_option');
    error_log('Plugin deactivated, option removed');



}
register_deactivation_hook(__FILE__, 'pomodoro_timer_deactivate');


// Use the option somewhere in your plugin
function my_plugin_display_option() {
    $option_value = get_option('my_plugin_option', 'default_value');
    echo "The current value of the plugin option is: " . esc_html($option_value);
}

// Example usage on the admin dashboard
add_action('admin_notices', function () {
    echo '<div class="notice notice-success"><p>';
    my_plugin_display_option();
    echo '</p></div>';
});