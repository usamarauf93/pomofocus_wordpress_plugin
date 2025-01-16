// JavaScript to save settings to localStorage with named HTML elements
document.addEventListener('DOMContentLoaded', () => {
    const saveSettingsButton = document.getElementById('saveSettingsButton');

    saveSettingsButton.addEventListener('click', () => {
        const settings = {};

        // Timer settings
        settings.pomodoro = document.getElementById('pomodoroTime').value;
        settings.shortBreak = document.getElementById('shortBreakTime').value;
        settings.longBreak = document.getElementById('longBreakTime').value;
        settings.longBreakInterval = document.getElementById('longBreakInterval').value;

        // Switch settings
        settings.autoStartBreaks = document.getElementById('autoStartBreaksToggle').classList.contains('active');
        settings.autoStartPomodoros = document.getElementById('autoStartPomodorosToggle').classList.contains('active');
        settings.autoCheckTasks = document.getElementById('autoCheckTasksToggle').classList.contains('active');
        settings.autoSwitchTasks = document.getElementById('autoSwitchTasksToggle').classList.contains('active');

        // Sound settings
        settings.alarmSound = document.getElementById('alarmSound').value;
        settings.tickingSound = document.getElementById('tickingSound').value;

        // Notification settings
        settings.reminderFrequency = document.getElementById('reminderFrequency').value;

        // Save settings to localStorage
        localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
        alert('Settings saved successfully!');
    });
});
