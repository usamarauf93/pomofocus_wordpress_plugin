// JavaScript to save settings to localStorage with named HTML elements
document.addEventListener('DOMContentLoaded', () => {
    const saveSettingsButton = document.getElementById('saveSettingsButton');
    // Select the range input and the display element
    const rangeInput = document.getElementById('myRange2');
    const valueDisplay = document.getElementById('ticking-sound-value');
    
    // Check if elements exist
    if (rangeInput && valueDisplay) {
        rangeInput.addEventListener('input', function() {
            valueDisplay.innerText = rangeInput.value;
        });
    } else {
        console.error('Slider or display element not found.');
    }

    // Alarm Sound Slider
    const alarmSoundSlider = document.getElementById('myRange');
    const alarmSoundDisplay = document.getElementById('alarm-sound-value');

    if (alarmSoundSlider && alarmSoundDisplay) {
        alarmSoundSlider.addEventListener('input', function() {
        alarmSoundDisplay.innerText = alarmSoundSlider.value;
        });
    } else {
        console.error('Alarm Sound slider or display element not found.');
    }
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

