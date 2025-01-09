<?php
/**
 * Plugin Name: Pomodoro Timer
 * Plugin URI: https://technstack.com
 * Description: A WordPress Pomodoro timer plugin based on Pomofocus.io, with no user logins required.
 * Version: 1.0
 * Author: Usama
 * Author URI: https://technstack.com
 * License: GPL2
 * Text Domain: pomodoro-timer
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue Plugin Assets
 */
function pomodoro_timer_enqueue_assets() {
    wp_enqueue_style('pomodoro-timer-style', plugins_url('/assets/css/style.css', __FILE__));
    wp_enqueue_script('pomodoro-timer-script', plugins_url('/assets/js/script.js', __FILE__), array('jquery'), null, true);

    // Pass settings (color scheme) to JS
    wp_localize_script('pomodoro-timer-script', 'PomodoroTimerSettings', array(
        'primaryColor' => '#38b6ff',
        'secondaryColor' => '#ffffff',
        'backgroundColor' => '#d9d9d9',
    ));
}
add_action('wp_enqueue_scripts', 'pomodoro_timer_enqueue_assets');

/**
 * Shortcode for Pomodoro Timer
 */
function pomodoro_timer_shortcode() {
    ob_start();
    ?>
    <div id="pomodoro-timer">
        <h1>Pomodoro Timer</h1>
        <div class="timer-display">
            <span id="minutes">25</span>:<span id="seconds">00</span>
        </div>
        <div class="timer-controls">
            <button id="start-button">Start</button>
            <button id="pause-button">Pause</button>
            <button id="reset-button">Reset</button>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('pomodoro_timer', 'pomodoro_timer_shortcode');

/**
 * Activation Hook
 */
function pomodoro_timer_activate() {
    // Perform tasks like creating default options or database setup
}
register_activation_hook(__FILE__, 'pomodoro_timer_activate');

/**
 * Deactivation Hook
 */
function pomodoro_timer_deactivate() {
    // Clean up tasks like removing options or temporary data
}
register_deactivation_hook(__FILE__, 'pomodoro_timer_deactivate');
